import { Video } from "../types";

/**
 * Parses view string like "34.1K views", "1.2M views", "1500 views" into a numeric value for sorting.
 */
export function parseViewCount(viewsStr?: string): number {
  if (!viewsStr) return 0;
  const str = viewsStr.toUpperCase().replace(/,/g, "");
  const match = str.match(/([\d.]+)\s*([KM]?)/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const multiplier = match[2] === "M" ? 1000000 : match[2] === "K" ? 1000 : 1;
  return num * multiplier;
}

/**
 * Sorts video array by viral popularity (highest views/likes first).
 */
export function sortByViral(videos: Video[]): Video[] {
  return [...videos].sort((a, b) => {
    const viewsA = parseViewCount(a.views);
    const viewsB = parseViewCount(b.views);
    if (viewsB !== viewsA) {
      return viewsB - viewsA;
    }
    return (b.likes || 0) - (a.likes || 0);
  });
}

/**
 * Cleans video metadata ensuring consistency for Modern Fisheries channel.
 */
export function enrichVideoMetrics(video: Video, index: number): Video {
  return {
    ...video,
    type: "own",
    creator: "Modern Fisheries"
  };
}

/**
 * Returns clean list of videos sorted by viral popularity
 */
export function getEnrichedVideosList(videos: Video[]): Video[] {
  return sortByViral(videos.map((v, idx) => enrichVideoMetrics(v, idx)));
}
