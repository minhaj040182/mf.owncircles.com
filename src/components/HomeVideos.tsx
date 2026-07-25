import React, { useRef, useState, useEffect } from "react";
import { Video } from "../types";
import { OWN_VIDEOS, VIRAL_VIDEOS } from "../data";
import { ChevronRight, ArrowRight, Sparkles, ChevronLeft, Youtube, Play, Link2, Copy, Check } from "lucide-react";
import { fetchOwnChannelVideos, fetchTrendingTopicVideos } from "../youtubeFeed";
import VideoCard from "./VideoCard";

interface HomeVideosProps {
  onVideoClick: (video: Video) => void;
  onViewMore: () => void;
}

export default function HomeVideos({ onVideoClick, onViewMore }: HomeVideosProps) {
  const ownScrollRef = useRef<HTMLDivElement>(null);

  const [isOwnHovered, setIsOwnHovered] = useState(false);
  const [isTrendingHovered, setIsTrendingHovered] = useState(false);

  const [ownVideos, setOwnVideos] = useState<Video[]>(OWN_VIDEOS);
  const [trendingVideos, setTrendingVideos] = useState<Video[]>(
    VIRAL_VIDEOS.filter(v => v.type !== "own" && (v.creator || "").toLowerCase() !== "modern fisheries")
  );

  const [activeTrendingIndex, setActiveTrendingIndex] = useState(0);
  const [activeCopied, setActiveCopied] = useState(false);

  // Reset copy state when slides transition
  useEffect(() => {
    setActiveCopied(false);
  }, [activeTrendingIndex]);

  // Track coordinates for sub-pixel smooth sliding of ownVideos
  const ownPosRef = useRef(0);

  // Fetch from separated pipelines on mount
  useEffect(() => {
    async function loadSeparatedFeeds() {
      try {
        // Pipeline 1: Modern Fisheries Channel exclusive videos
        const ownRes = await fetchOwnChannelVideos();
        if (ownRes && ownRes.length > 0) {
          setOwnVideos(ownRes);
        }

        // Pipeline 2: Trending topic-specific viral videos
        const trendingRes = await fetchTrendingTopicVideos();
        if (trendingRes && trendingRes.length > 0) {
          setTrendingVideos(trendingRes);
        }
      } catch (err) {
        console.error("Failed to load separated feed calls:", err);
      }
    }
    loadSeparatedFeeds();
  }, []);

  // Sync scroll listeners for ownVideos
  useEffect(() => {
    const ownEl = ownScrollRef.current;
    const handleOwnScroll = () => {
      if (ownEl) ownPosRef.current = ownEl.scrollLeft;
    };
    if (ownEl) {
      ownEl.addEventListener("scroll", handleOwnScroll, { passive: true });
      ownPosRef.current = ownEl.scrollLeft;
    }
    return () => {
      if (ownEl) ownEl.removeEventListener("scroll", handleOwnScroll);
    };
  }, [ownVideos]);

  // Slideshow auto-sliding for trending videos
  useEffect(() => {
    if (trendingVideos.length === 0 || isTrendingHovered) return;
    const interval = setInterval(() => {
      setActiveTrendingIndex((prev) => (prev + 1) % trendingVideos.length);
    }, 5000); // auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [trendingVideos.length, isTrendingHovered]);

  // Cinematic slow auto-sliding animation for own videos only
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateSliding = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      const clampedDelta = Math.min(delta, 100);
      const speed = 0.035; // perfectly smooth slow motion

      // Slide own videos carousel
      if (ownScrollRef.current && ownVideos.length > 0 && !isOwnHovered) {
        const el = ownScrollRef.current;
        const { scrollWidth, clientWidth } = el;
        const halfWidth = scrollWidth / 2;
        if (scrollWidth > clientWidth) {
          ownPosRef.current += speed * clampedDelta;
          if (ownPosRef.current >= halfWidth) {
            ownPosRef.current -= halfWidth;
          }
          el.scrollLeft = Math.round(ownPosRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(updateSliding);
    };

    animationFrameId = requestAnimationFrame(updateSliding);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOwnHovered, ownVideos]);

  const handleArrowScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 340;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handlePrevTrending = () => {
    if (trendingVideos.length === 0) return;
    setActiveTrendingIndex((prev) => (prev - 1 + trendingVideos.length) % trendingVideos.length);
  };

  const handleNextTrending = () => {
    if (trendingVideos.length === 0) return;
    setActiveTrendingIndex((prev) => (prev + 1) % trendingVideos.length);
  };

  return (
    <section id="top-10-videos-section" className="py-10 bg-green-50/10 border-b border-green-100/60 space-y-12">
      <div className="w-full max-w-full px-2 sm:px-4 2xl:px-8">
        
        {/* Main Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-green-700 font-mono text-xs font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4 text-green-600 animate-pulse" />
              <span>Broadcast Center</span>
            </div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-green-950 tracking-tight leading-none">
              Modern Fisheries Video Portal
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-sans">
              Official video releases and guided system builds from our primary educational channel.
            </p>
          </div>
          <button
            id="view-more-button-top"
            onClick={onViewMore}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl font-sans font-semibold text-sm shadow-sm transition-all hover:translate-x-0.5 active:scale-95 self-start sm:self-center cursor-pointer"
          >
            <span>Browse Full Video Archive</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* SECTION: Modern Fisheries Exclusive Videos (Own Channel) */}
        <div className="relative bg-white rounded-3xl p-6 border border-green-100/50 shadow-xs mt-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-sans font-black text-lg sm:text-xl text-green-950 tracking-tight">
                Modern Fisheries Exclusive Videos
              </h3>
              <p className="text-slate-500 text-xs font-sans mt-0.5">
                Official releases and guided system builds from our primary educational channel.
              </p>
            </div>
            
            {/* Action Buttons: Subscribe & Arrows */}
            <div className="flex items-center gap-3 self-start sm:self-center">
              <a 
                href="https://www.youtube.com/channel/UChChDXzRMI9g1lgcTo5KA3A" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-105"
              >
                <Youtube className="w-4 h-4 fill-current" />
                <span>Subscribe on YouTube</span>
              </a>

              <div className="flex gap-1 border-l border-slate-200 pl-3">
                <button 
                  onClick={() => handleArrowScroll(ownScrollRef, "left")}
                  className="p-1.5 rounded-lg border border-green-100 bg-white text-green-800 hover:bg-green-50 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleArrowScroll(ownScrollRef, "right")}
                  className="p-1.5 rounded-lg border border-green-100 bg-white text-green-800 hover:bg-green-50 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrolling Container for Own Videos */}
          <div 
            ref={ownScrollRef}
            onMouseEnter={() => setIsOwnHovered(true)}
            onMouseLeave={() => setIsOwnHovered(false)}
            onTouchStart={() => setIsOwnHovered(true)}
            onTouchEnd={() => setIsOwnHovered(false)}
            className="flex gap-5 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-green-100 scrollbar-track-transparent select-none"
            style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch', scrollBehavior: 'auto' }}
          >
            {[...ownVideos, ...ownVideos].map((video, index) => (
              <div key={`${video.id}-own-${index}`} className="w-[260px] max-w-[80vw] sm:max-w-none sm:w-[320px] shrink-0">
                <VideoCard video={video} onVideoClick={onVideoClick} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
