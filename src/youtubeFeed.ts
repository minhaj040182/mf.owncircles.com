import { Video } from "./types";
import { OWN_VIDEOS, VIRAL_VIDEOS, ALL_VIDEOS, TOP_INNOVATION_IDEAS } from "./data";

export const MODERN_FISHERIES_CHANNEL_ID = "UChChDXzRMI9g1lgcTo5KA3A";

export const channels = [
  { id: MODERN_FISHERIES_CHANNEL_ID, creator: "Modern Fisheries", type: "own" as const }
];

// Helper to get YouTube API Key from env
export function getYouTubeApiKey(): string {
  let key = "";
  try {
    const metaEnv = (import.meta as any)?.env;
    if (metaEnv) {
      key = metaEnv.VITE_YOUTUBE_API_KEY || metaEnv.YOUTUBE_API_KEY || "";
    }
  } catch (e) {
    // Ignore error
  }

  if (!key && typeof process !== "undefined" && process.env) {
    key = process.env.VITE_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY || "";
  }

  return (key || "").trim();
}

export function isUsingLiveYouTubeApi(): boolean {
  return getYouTubeApiKey().length > 10;
}

// Convert ISO8601 duration (PT12M34S) to mm:ss or hh:mm:ss
function parseISO8601Duration(durationStr?: string): string {
  if (!durationStr) return "10:00";
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "10:00";
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  const secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
  if (hours > 0) {
    const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${minStr}:${secStr}`;
  }
  return `${minutes}:${secStr}`;
}

// Format views count (e.g. 15420 -> 15.4K views)
function formatViewCount(views?: string | number): string {
  if (!views) return "12K views";
  const num = typeof views === "number" ? views : parseInt(views, 10);
  if (isNaN(num)) return "12K views";
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
  return `${num} views`;
}

// Format relative date (e.g. 2026-03-15T... -> 2 weeks ago)
function formatRelativeDate(publishedAt?: string): string {
  if (!publishedAt) return "Recently";
  const date = new Date(publishedAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (isNaN(diffDays) || diffDays < 0) return "Recently";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Determine category based on title & description keywords
function inferCategory(title: string, description: string): Video["category"] {
  const text = (title + " " + description).toLowerCase();
  if (text.includes("biofloc") || text.includes("floc")) return "Biofloc";
  if (text.includes("ras") || text.includes("recirculat")) return "RAS";
  if (text.includes("aquaponic")) return "Aquaponics";
  if (text.includes("hydroponic")) return "Hydroponics";
  if (text.includes("feed") || text.includes("fcr") || text.includes("diet")) return "Feeding";
  if (text.includes("disease") || text.includes("parasite") || text.includes("treatment") || text.includes("fungus")) return "Diseases";
  if (text.includes("ph") || text.includes("ammonia") || text.includes("water") || text.includes("dissolved oxygen")) return "Water Quality";
  if (text.includes("breed") || text.includes("hatchery") || text.includes("spawn")) return "Breeding";
  return "Pond Setup";
}

// Fetch detailed metadata (view count, duration, likes) for video IDs
async function fetchVideoDetails(apiKey: string, videoIds: string[]): Promise<Map<string, { duration: string; views: string; likes: number }>> {
  const statsMap = new Map<string, { duration: string; views: string; likes: number }>();
  if (!apiKey || videoIds.length === 0) return statsMap;

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return statsMap;
    const data = await res.json();

    if (data.items && Array.isArray(data.items)) {
      for (const item of data.items) {
        const id = item.id;
        const duration = parseISO8601Duration(item.contentDetails?.duration);
        const views = formatViewCount(item.statistics?.viewCount);
        const likes = parseInt(item.statistics?.likeCount || "250", 10);
        statsMap.set(id, { duration, views, likes });
      }
    }
  } catch (err) {
    console.warn("Failed to fetch YouTube video details:", err);
  }

  return statsMap;
}

export interface UserLocationInfo {
  countryCode: string;
  countryName: string;
  isIndia: boolean;
  isUS: boolean;
  detectedRegionName: string;
}

let cachedUserLocation: UserLocationInfo | null = null;

/**
 * Detect user's location via timezone and IP lookup with quick fallback
 */
export async function detectUserLocation(): Promise<UserLocationInfo> {
  if (cachedUserLocation) return cachedUserLocation;

  let countryCode = "US";
  let countryName = "United States";

  // Fast timezone check
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Kolkata") || tz.includes("Calcutta") || tz.includes("India")) {
      countryCode = "IN";
      countryName = "India";
    }
  } catch (e) {
    // Ignore timezone error
  }

  // Try quick IP geolocation with 2 second timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        countryCode = data.country_code.toUpperCase();
        countryName = data.country_name || countryCode;
      }
    }
  } catch (e) {
    // Fall back to timezone result
  }

  const isIndia = countryCode === "IN";
  const isUS = countryCode === "US" || countryCode === "CA";
  const detectedRegionName = isIndia ? "India" : isUS ? "North America / USA" : countryName;

  cachedUserLocation = {
    countryCode,
    countryName,
    isIndia,
    isUS,
    detectedRegionName
  };

  return cachedUserLocation;
}

/**
 * Get location-tailored YouTube query suffix
 */
export function getLocationQuerySuffix(userLoc?: UserLocationInfo | null): string {
  if (!userLoc) return "";
  if (userLoc.isIndia) {
    return " India Hindi Indian aquaculture";
  }
  if (userLoc.isUS) {
    return " USA America English aquaculture";
  }
  return ` ${userLoc.countryName} aquaculture`;
}
export function isModernFisheriesVideo(item: { title?: string; creator?: string; channelId?: string; type?: string }): boolean {
  if (item.type === "own") return true;
  const channelId = item.channelId || "";
  if (channelId === MODERN_FISHERIES_CHANNEL_ID) return true;

  const title = (item.title || "").toLowerCase();
  const creator = (item.creator || "").toLowerCase();

  if (title.includes("modern fisheries") || title.includes("modernfisheries")) return true;
  if (creator.includes("modern fisheries") || creator.includes("modernfisheries")) return true;

  return false;
}

// 7-day cache TTL in milliseconds
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Helper to get cached videos from localStorage if valid
 */
function getPersistentCache(cacheKey: string, allowOwnVideos = false): Video[] | null {
  try {
    const raw = localStorage.getItem(cacheKey);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && Array.isArray(data.videos) && data.videos.length > 0) {
      const age = Date.now() - (data.timestamp || 0);
      if (age < CACHE_TTL_MS) {
        if (allowOwnVideos) {
          return data.videos;
        }
        // Strictly filter out any Modern Fisheries videos from cached ideas
        const clean = data.videos.filter((v: Video) => !isModernFisheriesVideo(v));
        if (clean.length > 0) {
          return clean;
        }
      }
    }
  } catch (e) {
    // Ignore cache read errors
  }
  return null;
}

/**
 * Helper to save videos into localStorage cache
 */
function setPersistentCache(cacheKey: string, videos: Video[], allowOwnVideos = false) {
  try {
    // Filter out Modern Fisheries videos before caching ONLY when caching ideas
    const cleanVideos = allowOwnVideos ? videos : videos.filter(v => !isModernFisheriesVideo(v));
    const payload = {
      timestamp: Date.now(),
      videos: cleanVideos,
    };
    localStorage.setItem(cacheKey, JSON.stringify(payload));
  } catch (e) {
    // Ignore cache write errors
  }
}

/**
 * Public dynamic YouTube search fallback when API key is unavailable or fails.
 * Uses official Google YouTube RSS feeds parsed via rss2json to prevent cross-origin third-party ad script issues.
 */
async function fetchPublicYouTubeSearch(query: string): Promise<Video[]> {
  const cleanQuery = encodeURIComponent(query);
  const videos: Video[] = [];

  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?search_query=${cleanQuery}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.items) && data.items.length > 0) {
        for (const item of data.items) {
          const rawGuid = item.guid || item.link || "";
          const match = rawGuid.match(/(?:v=|\/embed\/|\/watch\?v=|yt:video:)([a-zA-Z0-9_-]{11})/);
          const videoId = match ? match[1] : "";
          const title = item.title || "Aquaculture Innovation";
          const creator = item.author || "YouTube Creator";

          if (videoId && !isModernFisheriesVideo({ title, creator })) {
            videos.push({
              id: videoId,
              title: title,
              description: item.description?.replace(/<[^>]*>/g, '').slice(0, 150) || `Live YouTube video on ${query}`,
              thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              videoUrl: `https://www.youtube.com/embed/${videoId}`,
              duration: "10:15",
              views: "18K views",
              type: "youtube",
              creator: creator,
              publishDate: item.pubDate ? formatRelativeDate(item.pubDate) : "Recently",
              category: inferCategory(title, ""),
              likes: 350 + videos.length * 25
            });
          }
          if (videos.length >= 20) break;
        }
      }
    }
  } catch (e) {
    // Ignore fetch failures
  }

  return videos;
}

/**
 * Fetch Modern Fisheries exclusive channel videos live from YouTube API
 */
export async function fetchOwnChannelVideos(forceRefresh = false): Promise<Video[]> {
  const apiKey = getYouTubeApiKey();
  const cacheKey = "mf_youtube_own_videos_v3";

  // Check persistent localStorage cache unless forceRefresh is true
  if (!forceRefresh) {
    const cached = getPersistentCache(cacheKey, true);
    if (cached && cached.length > 0) {
      return cached;
    }
  }

  // Fallback to hardcoded OWN_VIDEOS if no API key
  if (!apiKey) {
    return OWN_VIDEOS;
  }

  try {
    // Fetch channel videos using YouTube Search endpoint (max 20)
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${MODERN_FISHERIES_CHANNEL_ID}&order=date&maxResults=20&type=video&key=${apiKey}`;
    const response = await fetch(searchUrl);

    if (!response.ok) {
      console.warn(`YouTube API error (${response.status}): Falling back to curated channel videos.`);
      return OWN_VIDEOS;
    }

    const data = await response.json();
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return OWN_VIDEOS;
    }

    const videoIds: string[] = [];
    const rawVideos: any[] = [];

    for (const item of data.items) {
      const videoId = item.id?.videoId;
      if (videoId) {
        videoIds.push(videoId);
        rawVideos.push(item);
      }
    }

    // Fetch details (statistics & durations)
    const statsMap = await fetchVideoDetails(apiKey, videoIds);

    const liveVideos: Video[] = rawVideos.map((item, index) => {
      const videoId = item.id.videoId;
      const snippet = item.snippet || {};
      const stats = statsMap.get(videoId) || {
        duration: "12:00",
        views: "15K views",
        likes: 350 + index * 20,
      };

      return {
        id: videoId,
        title: snippet.title || "Modern Fisheries Video",
        description: snippet.description || "Official educational video from Modern Fisheries channel.",
        thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        videoUrl: `https://www.youtube.com/embed/${videoId}`,
        duration: stats.duration,
        views: stats.views,
        type: "own",
        creator: "Modern Fisheries",
        publishDate: formatRelativeDate(snippet.publishedAt),
        category: inferCategory(snippet.title || "", snippet.description || ""),
        likes: stats.likes,
      };
    });

    if (liveVideos.length > 0) {
      setPersistentCache(cacheKey, liveVideos, true);
      return liveVideos;
    }
  } catch (err) {
    console.error("Error fetching live Modern Fisheries channel videos:", err);
  }

  return OWN_VIDEOS;
}

/**
 * Fetch top best ideas & latest aquaculture innovations directly from YouTube (up to 20 videos)
 */
export async function fetchTrendingTopicVideos(forceRefresh = false, searchQuery = "modern fish farming technology aquaponics biofloc ras innovations", userLocOverride?: UserLocationInfo | null): Promise<Video[]> {
  const apiKey = getYouTubeApiKey();

  // Determine user location for regional recommendations
  let userLoc = userLocOverride;
  if (!userLoc) {
    try {
      userLoc = await detectUserLocation();
    } catch (e) {
      // Ignore location detection errors
    }
  }

  const querySuffix = userLoc ? getLocationQuerySuffix(userLoc) : "";
  const fullSearchQuery = searchQuery + querySuffix;
  const cacheKey = `mf_youtube_ideas_v8_${fullSearchQuery.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;

  // 1. Check persistent localStorage cache first unless forceRefresh is true
  if (!forceRefresh) {
    const cached = getPersistentCache(cacheKey, false);
    if (cached && cached.length > 0) {
      // Strictly ensure no Modern Fisheries videos
      const cleanCached = cached.filter(v => !isModernFisheriesVideo(v));
      if (cleanCached.length > 0) {
        return cleanCached;
      }
    }
  }

  let liveIdeas: Video[] = [];

  // 2. Fetch directly from server API / YouTube endpoint
  try {
    const endpoint = `/api/youtube-ideas?q=${encodeURIComponent(fullSearchQuery)}`;
    const res = await fetch(endpoint);
    if (res.ok) {
      const data = await res.json();
      if (data && data.status === "ok" && Array.isArray(data.items) && data.items.length > 0) {
        liveIdeas = data.items.map((item: any) => ({
          ...item,
          category: inferCategory(item.title || "", item.description || "")
        }));
      }
    }
  } catch (err) {
    console.warn("Error calling /api/youtube-ideas:", err);
  }

  // 3. Fallback if server endpoint returned no items
  if (liveIdeas.length === 0 && apiKey) {
    try {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(fullSearchQuery)}&order=date&maxResults=20&type=video&key=${apiKey}`;
      const response = await fetch(searchUrl);

      if (response.ok) {
        const data = await response.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          const videoIds: string[] = [];
          const rawVideos: any[] = [];

          for (const item of data.items) {
            const videoId = item.id?.videoId;
            const snippet = item.snippet || {};
            const channelId = snippet.channelId;
            const title = snippet.title || "";
            const creator = snippet.channelTitle || "";

            if (videoId && !isModernFisheriesVideo({ title, creator, channelId })) {
              videoIds.push(videoId);
              rawVideos.push(item);
            }
          }

          const statsMap = await fetchVideoDetails(apiKey, videoIds);

          liveIdeas = rawVideos.map((item, index) => {
            const videoId = item.id.videoId;
            const snippet = item.snippet || {};
            const stats = statsMap.get(videoId) || {
              duration: "10:30",
              views: "25K views",
              likes: 500 + index * 45,
            };

            return {
              id: videoId,
              title: snippet.title || "Aquaculture Innovation Idea",
              description: snippet.description || "Latest aquaculture technology, fish farming setup, and system design idea from YouTube.",
              thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              videoUrl: `https://www.youtube.com/embed/${videoId}`,
              duration: stats.duration,
              views: stats.views,
              type: "youtube",
              creator: snippet.channelTitle || "Aquaculture Expert",
              publishDate: formatRelativeDate(snippet.publishedAt),
              category: inferCategory(snippet.title || "", snippet.description || ""),
              likes: stats.likes,
            };
          });
        }
      }
    } catch (err) {
      console.warn("Error fetching live YouTube API:", err);
    }
  }

  if (liveIdeas.length === 0) {
    liveIdeas = await fetchPublicYouTubeSearch(fullSearchQuery);
  }

  // Strictly filter out any Modern Fisheries videos
  const cleanIdeas = liveIdeas.filter(v => !isModernFisheriesVideo(v));

  if (cleanIdeas.length > 0) {
    setPersistentCache(cacheKey, cleanIdeas, false);
    return cleanIdeas;
  }

  return TOP_INNOVATION_IDEAS;
}

export async function fetchChannelVideosWithFallback(): Promise<Video[]> {
  return fetchOwnChannelVideos();
}

export async function fetchYouTubeChannelVideos(): Promise<Video[]> {
  const own = await fetchOwnChannelVideos();
  const ideas = await fetchTrendingTopicVideos();
  return [...own, ...ideas];
}
