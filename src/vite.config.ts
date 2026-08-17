import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function isModernFisheries(title: string, creator: string, channelId: string): boolean {
  if (channelId === 'UChChDXzRMI9g1lgcTo5KA3A') return true;
  const t = (title || '').toLowerCase();
  const c = (creator || '').toLowerCase();
  return t.includes('modern fisheries') || t.includes('modernfisheries') || c.includes('modern fisheries') || c.includes('modernfisheries');
}

function parseViewsNum(viewStr: string): number {
  if (!viewStr) return 0;
  const clean = viewStr.toLowerCase().replace(/,/g, '').replace(/views/g, '').replace(/view/g, '').trim();
  if (clean.includes('m')) {
    return (parseFloat(clean) || 0) * 1000000;
  }
  if (clean.includes('k')) {
    return (parseFloat(clean) || 0) * 1000;
  }
  return parseInt(clean, 10) || 0;
}

function parseIsoDuration(duration: string): string {
  if (!duration) return '10:00';
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '10:00';
  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatViewCount(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
  return `${num} views`;
}

function youtubeApiPlugin() {
  return {
    name: 'youtube-api-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/youtube-ideas', async (req: any, res: any) => {
        try {
          const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          const searchQuery = urlObj.searchParams.get('q') || 'viral modern fish farming technology aquaponics biofloc ras innovations';
          
          const apiKey = process.env.VITE_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY || '';
          let videos: any[] = [];

          if (apiKey) {
            try {
              // Order by viewCount for top viral videos
              const apiRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&order=viewCount&maxResults=25&type=video&key=${apiKey}`);
              if (apiRes.ok) {
                const data = await apiRes.json();
                if (data.items && Array.isArray(data.items)) {
                  const videoIds: string[] = [];
                  const rawItems: any[] = [];

                  for (const item of data.items) {
                    const videoId = item.id?.videoId;
                    const snippet = item.snippet || {};
                    const title = snippet.title || 'Aquaculture Idea';
                    const creator = snippet.channelTitle || 'Aquaculture Expert';
                    const channelId = snippet.channelId || '';

                    if (videoId && !isModernFisheries(title, creator, channelId)) {
                      videoIds.push(videoId);
                      rawItems.push(item);
                    }
                  }

                  // Fetch details for exact viewCount, likeCount, and duration
                  let detailsMap = new Map();
                  if (videoIds.length > 0) {
                    try {
                      const detRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds.join(',')}&key=${apiKey}`);
                      if (detRes.ok) {
                        const detData = await detRes.json();
                        if (detData.items && Array.isArray(detData.items)) {
                          for (const vDet of detData.items) {
                            detailsMap.set(vDet.id, {
                              views: formatViewCount(parseInt(vDet.statistics?.viewCount || '15000', 10)),
                              likes: parseInt(vDet.statistics?.likeCount || '500', 10),
                              duration: parseIsoDuration(vDet.contentDetails?.duration)
                            });
                          }
                        }
                      }
                    } catch (e) {
                      console.warn('YouTube video details fetch error:', e);
                    }
                  }

                  for (const item of rawItems) {
                    const videoId = item.id.videoId;
                    const snippet = item.snippet || {};
                    const title = snippet.title || 'Aquaculture Idea';
                    const creator = snippet.channelTitle || 'Aquaculture Expert';
                    const det = detailsMap.get(videoId) || {
                      views: '45K views',
                      likes: 1200,
                      duration: '10:00'
                    };

                    videos.push({
                      id: videoId,
                      title,
                      description: snippet.description || `Live viral aquaculture video by ${creator}`,
                      thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                      videoUrl: `https://www.youtube.com/embed/${videoId}`,
                      duration: det.duration,
                      views: det.views,
                      type: 'youtube',
                      creator,
                      channelId: snippet.channelId || '',
                      publishDate: snippet.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString() : 'Recently',
                      category: 'Innovation',
                      likes: det.likes
                    });
                  }
                }
              }
            } catch (e) {
              console.warn('Vite middleware YouTube API fetch error:', e);
            }
          }

          if (videos.length === 0) {
            // Direct live scrape from YouTube
            const scrapeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
            const htmlRes = await fetch(scrapeUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
              }
            });

            if (htmlRes.ok) {
              const html = await htmlRes.text();
              const match = html.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
              if (match) {
                const data = JSON.parse(match[1]);
                const contents = data?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents;
                if (Array.isArray(contents)) {
                  for (const section of contents) {
                    const items = section?.itemSectionRenderer?.contents;
                    if (Array.isArray(items)) {
                      for (const item of items) {
                        const v = item.videoRenderer;
                        if (v && v.videoId) {
                          const title = v.title?.runs?.[0]?.text || 'Aquaculture Video';
                          const creator = v.ownerText?.runs?.[0]?.text || 'YouTube Creator';
                          const channelId = v.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || '';
                          const views = v.viewCountText?.simpleText || v.shortViewCountText?.simpleText || '25K views';
                          const duration = v.lengthText?.simpleText || '10:00';
                          const published = v.publishedTimeText?.simpleText || 'Recently';

                          if (!isModernFisheries(title, creator, channelId)) {
                            const viewNum = parseViewsNum(views);
                            const likes = viewNum > 0 ? Math.round(viewNum * 0.03) : 500;

                            videos.push({
                              id: v.videoId,
                              title,
                              description: `Live YouTube video on ${searchQuery}`,
                              thumbnail: `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`,
                              videoUrl: `https://www.youtube.com/embed/${v.videoId}`,
                              duration,
                              views,
                              viewNum,
                              type: 'youtube',
                              creator,
                              channelId,
                              publishDate: published,
                              category: 'Innovation',
                              likes
                            });
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            // Sort scraped videos by view count descending to show ONLY viral top videos first
            videos.sort((a, b) => (b.viewNum || 0) - (a.viewNum || 0));
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok', items: videos }));
        } catch (err: any) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.end(JSON.stringify({ status: 'error', message: err?.message || 'Server error' }));
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), youtubeApiPlugin()],
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
