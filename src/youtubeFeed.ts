import { Video } from "./types";
import { OWN_VIDEOS, ALL_VIDEOS } from "./data";

export const channels = [
  { id: "UChChDXzRMI9g1lgcTo5KA3A", creator: "Modern Fisheries", type: "own" as const }
];

export async function fetchChannelVideosWithFallback(chan?: typeof channels[0]): Promise<Video[]> {
  return OWN_VIDEOS;
}

export async function fetchYouTubeChannelVideos(): Promise<Video[]> {
  return ALL_VIDEOS;
}

export async function fetchOwnChannelVideos(): Promise<Video[]> {
  return OWN_VIDEOS;
}

export async function fetchTrendingTopicVideos(): Promise<Video[]> {
  return OWN_VIDEOS;
}
