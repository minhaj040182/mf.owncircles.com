import { VideoItem, MostViewedResponse } from '../types';

const LOCAL_STORAGE_KEY = 'trendpulse_product_video_views';

// Custom event to trigger re-fetch on the top panel instantly across components
export const VIDEO_VIEW_EVENT = 'trendpulse_video_viewed';

/**
 * Records a video view in MySQL database table `product_video_views`
 */
export async function recordVideoView(video: VideoItem): Promise<boolean> {
  if (!video || !video.id) return false;

  const timestamp = new Date().toISOString();

  // 1. Send to server-side MySQL database API (Tries PHP endpoint first on PHP hosting, then Node.js proxy)
  try {
    const postPayload = JSON.stringify({
      video,
      viewedAt: timestamp,
    });

    fetch('/api_mysql.php?action=record_view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: postPayload,
    }).then(res => {
      if (!res.ok) {
        return fetch('/api/video-views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: postPayload,
        });
      }
    }).catch(() => {
      // Fallback to /api/video-views
      fetch('/api/video-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: postPayload,
      }).catch(err => {
        console.warn('[MySQL Views DB] Network view recording fallback:', err);
      });
    });
  } catch (err) {
    console.warn('[MySQL Views DB] Failed to post view to backend:', err);
  }

  // 2. Persist in local client storage cache for instant offline responsiveness
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const views = raw ? JSON.parse(raw) : [];
    views.push({
      video_id: video.id,
      youtube_id: video.youtubeId || video.id,
      title: video.title,
      rephrased_title: video.rephrasedTitle || video.title,
      category: video.category,
      thumbnail_url: video.thumbnailUrl,
      view_count: video.viewCount,
      viral_score: video.pulse?.viralPotentialScore || 0,
      video_payload: video,
      viewed_at: timestamp,
    });
    // Keep max 500 records in local backup
    const trimmed = views.slice(-500);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.warn('[MySQL Views DB] localStorage write error:', err);
  }

  // 3. Dispatch custom window event to notify UI panels
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(VIDEO_VIEW_EVENT, { detail: { video, timestamp } }));
  }

  return true;
}

/**
 * Fetches the most viewed videos from MySQL database backend
 * with the exact required fallback logic:
 * 1. Today (past 24h / today)
 * 2. If < 20, backfill from previous 1 week
 * 3. If < 20, backfill from previous 1 month
 * 4. Limit max 20
 */
export async function fetchMostViewedVideos(): Promise<MostViewedResponse> {
  // Try direct PHP endpoint first on PHP hosting, then Node.js API endpoint
  try {
    let res = await fetch('/api_mysql.php?action=most_viewed', {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) {
      res = await fetch('/api/video-views/most-viewed', {
        headers: { 'Accept': 'application/json' }
      });
    }
    if (res.ok) {
      const data: MostViewedResponse = await res.json();
      if (data && data.success) {
        return data;
      }
    }
  } catch (err) {
    try {
      const res = await fetch('/api/video-views/most-viewed', {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const data: MostViewedResponse = await res.json();
        return data;
      }
    } catch {
      console.warn('[MySQL Views DB] Using local fallback computation');
    }
  }

  // Client-side fallback computation from localStorage
  return computeFallbackMostViewed();
}

function computeFallbackMostViewed(): MostViewedResponse {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return {
        success: true,
        timeframe: 'none',
        timeframeLabel: 'No Views Recorded',
        count: 0,
        totalViewsInPeriod: 0,
        videos: [],
      };
    }

    const records: any[] = JSON.parse(raw);
    if (!records || records.length === 0) {
      return {
        success: true,
        timeframe: 'none',
        timeframeLabel: 'No Views Recorded',
        count: 0,
        totalViewsInPeriod: 0,
        videos: [],
      };
    }

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const oneWeekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
    const oneMonthAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;

    const aggregateViews = (list: any[]) => {
      const map = new Map<string, { video: VideoItem; count: number; lastViewed: number }>();
      for (const rec of list) {
        const vId = rec.video_id || rec.youtube_id;
        if (!vId) continue;
        const vTime = new Date(rec.viewed_at).getTime();
        const existing = map.get(vId);
        if (!existing) {
          map.set(vId, { video: rec.video_payload, count: 1, lastViewed: vTime });
        } else {
          existing.count += 1;
          if (vTime > existing.lastViewed) {
            existing.lastViewed = vTime;
            if (rec.video_payload) existing.video = rec.video_payload;
          }
        }
      }
      return Array.from(map.values()).sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return b.lastViewed - a.lastViewed;
      });
    };

    // 1. Today
    const todayRecs = records.filter(r => new Date(r.viewed_at).getTime() >= startOfToday);
    const todayAgg = aggregateViews(todayRecs);
    const selected: VideoItem[] = [];
    const addedIds = new Set<string>();

    for (const item of todayAgg) {
      if (item.video && !addedIds.has(item.video.id)) {
        addedIds.add(item.video.id);
        selected.push(item.video);
      }
      if (selected.length >= 20) break;
    }

    let timeframe: 'today' | 'week' | 'month' = 'today';
    let timeframeLabel = 'Today';

    // 2. Week
    if (selected.length < 20) {
      const weekRecs = records.filter(r => new Date(r.viewed_at).getTime() >= oneWeekAgo);
      const weekAgg = aggregateViews(weekRecs);
      for (const item of weekAgg) {
        if (item.video && !addedIds.has(item.video.id)) {
          addedIds.add(item.video.id);
          selected.push(item.video);
          if (timeframe === 'today' && todayAgg.length === 0) {
            timeframe = 'week';
            timeframeLabel = 'Past 7 Days';
          }
        }
        if (selected.length >= 20) break;
      }
      if (todayAgg.length > 0 && selected.length > todayAgg.length) {
        timeframeLabel = 'Today + Past 7 Days';
      }
    }

    // 3. Month
    if (selected.length < 20) {
      const monthRecs = records.filter(r => new Date(r.viewed_at).getTime() >= oneMonthAgo);
      const monthAgg = aggregateViews(monthRecs);
      for (const item of monthAgg) {
        if (item.video && !addedIds.has(item.video.id)) {
          addedIds.add(item.video.id);
          selected.push(item.video);
          if (timeframe !== 'month' && addedIds.size <= item.count) {
            timeframe = 'month';
            timeframeLabel = 'Past 30 Days';
          }
        }
        if (selected.length >= 20) break;
      }
      if (selected.length > 0 && timeframeLabel === 'Today') {
        timeframeLabel = 'Past 30 Days';
        timeframe = 'month';
      }
    }

    const finalVids = selected.slice(0, 20);

    return {
      success: true,
      timeframe,
      timeframeLabel,
      count: finalVids.length,
      totalViewsInPeriod: records.length,
      videos: finalVids,
    };
  } catch (err) {
    console.error('[MySQL Views DB] Error computing fallback views:', err);
    return {
      success: true,
      timeframe: 'none',
      timeframeLabel: 'No Views Recorded',
      count: 0,
      totalViewsInPeriod: 0,
      videos: [],
    };
  }
}
