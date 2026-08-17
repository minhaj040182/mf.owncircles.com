import React, { useRef, useState, useEffect } from "react";
import { Video } from "../types";
import { ChevronLeft, ChevronRight, Play, Youtube, ArrowRight } from "lucide-react";
import VideoCard from "./VideoCard";

interface ChannelVideosProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
  onViewMore: () => void;
}

export default function ChannelVideos({ videos, onVideoClick, onViewMore }: ChannelVideosProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Filter for Modern Fisheries / own videos
  const ownVideos = (videos || []).filter(
    (v) => v && (v.type === "own" || (v.creator || "").toLowerCase() === "modern fisheries")
  );

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (ownVideos.length === 0) return null;

  return (
    <section id="own-channel-videos-section" className="py-8 bg-green-50/10 border-t border-b border-green-100/50 space-y-6">
      <div className="w-full max-w-full px-2 sm:px-4 2xl:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h2 className="font-sans font-black text-xl sm:text-2xl text-green-950 tracking-tight leading-tight">
              Modern Fisheries Exclusive Channel Videos
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Official video releases, physical system setups, and guided biological tutorials from our primary channel.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
            {/* YouTube Subscribe Button */}
            <a 
              href="https://www.youtube.com/channel/UChChDXzRMI9g1lgcTo5KA3A" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-103 active:scale-95"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Subscribe on YouTube</span>
            </a>

            {/* Scrolling Controls */}
            <div className="flex gap-1 border-l border-slate-200 pl-3">
              <button 
                onClick={() => handleScroll("left")}
                className="p-1.5 rounded-lg border border-green-100 bg-white text-green-800 hover:bg-green-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleScroll("right")}
                className="p-1.5 rounded-lg border border-green-100 bg-white text-green-800 hover:bg-green-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrolling lane */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-green-200/60 scrollbar-track-transparent select-none"
          style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
        >
          {ownVideos.map((video, idx) => (
            <div 
              key={`${video.id}-own-${idx}`} 
              className="w-[260px] max-w-[80vw] sm:max-w-none sm:w-[310px] shrink-0"
            >
              <VideoCard video={video} onVideoClick={onVideoClick} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onViewMore}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white hover:bg-green-50 text-green-800 border border-green-200 hover:border-green-300 rounded-xl font-sans font-bold text-xs transition-all shadow-2xs hover:scale-[1.01] active:scale-95"
          >
            <span>Explore Entire Video Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
