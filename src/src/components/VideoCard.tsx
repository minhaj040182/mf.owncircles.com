import React from "react";
import { Video } from "../types";
import { Play, Eye, ThumbsUp, Calendar, MonitorPlay, Youtube } from "lucide-react";

interface VideoCardProps {
  video: Video;
  onVideoClick: (video: Video) => void;
  key?: string;
}

export default function VideoCard({ video, onVideoClick }: VideoCardProps) {
  const creatorLower = (video.creator || "").toLowerCase();
  const titleLower = (video.title || "").toLowerCase();
  const isOwnVideo = video.type === "own" || creatorLower.includes("modern fisheries") || titleLower.includes("modern fisheries");
  const channelName = isOwnVideo ? "Modern Fisheries" : (video.creator || "YouTube Channel");

  return (
    <div 
      id={`video-card-${video.id}`}
      onClick={() => onVideoClick(video)}
      className="group bg-white rounded-2xl border border-emerald-100/60 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
          <div className="p-3.5 bg-white/95 rounded-full text-emerald-700 shadow-md transform scale-90 group-hover:scale-100 transition-all duration-300">
            <Play className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10 max-w-[85%] overflow-hidden">
          {isOwnVideo ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs whitespace-nowrap">
              Modern Fisheries
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-red-600 text-white shadow-xs flex items-center gap-1 max-w-[140px] truncate">
              <Youtube className="w-3 h-3 shrink-0" />
              <span className="truncate">{channelName}</span>
            </span>
          )}
          {video.category && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/70 text-white backdrop-blur-xs whitespace-nowrap hidden sm:inline-block">
              {video.category}
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-950/80 text-white backdrop-blur-xs">
          {video.duration || "10:00"}
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1.5 font-sans font-medium">
            {isOwnVideo ? (
              <MonitorPlay className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <Youtube className="w-3.5 h-3.5 text-red-600 shrink-0" />
            )}
            <span className="truncate font-semibold text-slate-700">{channelName}</span>
          </div>
          <h4 className="font-sans font-semibold text-slate-900 group-hover:text-emerald-700 text-sm leading-snug line-clamp-2 transition-colors mb-2" title={video.title}>
            {video.title}
          </h4>
          <p className="text-slate-500 text-xs line-clamp-2 font-sans mb-3">
            {video.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="flex justify-between items-center pt-3 border-t border-emerald-50 text-[10px] font-mono text-slate-500 mt-2">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-slate-400" />
            <span>{video.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-3 h-3 text-emerald-600" />
            <span className="text-slate-600 font-medium">
              {typeof video.likes === 'number' ? video.likes.toLocaleString() : video.likes}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{video.publishDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
