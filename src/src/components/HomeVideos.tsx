import React, { useRef, useState, useEffect } from "react";
import { Video } from "../types";
import { OWN_VIDEOS, TOP_INNOVATION_IDEAS } from "../data";
import { 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  ChevronLeft, 
  Youtube, 
  RotateCw, 
  Flame, 
  Radio, 
  ExternalLink,
  Lightbulb
} from "lucide-react";
import { 
  fetchOwnChannelVideos, 
  fetchTrendingTopicVideos, 
  isUsingLiveYouTubeApi 
} from "../youtubeFeed";
import VideoCard from "./VideoCard";

interface HomeVideosProps {
  onVideoClick: (video: Video) => void;
  onViewMore: () => void;
}

export default function HomeVideos({ onVideoClick, onViewMore }: HomeVideosProps) {
  const ownScrollRef = useRef<HTMLDivElement>(null);
  const ideasScrollRef = useRef<HTMLDivElement>(null);

  const [isOwnHovered, setIsOwnHovered] = useState(false);
  const [isIdeasHovered, setIsIdeasHovered] = useState(false);

  const [ownVideos, setOwnVideos] = useState<Video[]>(OWN_VIDEOS);
  const [trendingVideos, setTrendingVideos] = useState<Video[]>(TOP_INNOVATION_IDEAS);

  const [isLoadingOwn, setIsLoadingOwn] = useState(false);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const isLiveApi = isUsingLiveYouTubeApi();

  const ownPosRef = useRef(0);
  const ideasPosRef = useRef(0);

  // Load feeds on mount
  useEffect(() => {
    loadFeeds(false);
  }, []);

  async function loadFeeds(forceRefresh = false) {
    setIsLoadingOwn(true);
    setIsLoadingIdeas(true);

    try {
      // Modern Fisheries Channel exclusive videos
      const ownRes = await fetchOwnChannelVideos(forceRefresh);
      if (ownRes && ownRes.length > 0) {
        setOwnVideos(ownRes);
      }
    } catch (err) {
      console.error("Failed loading own videos:", err);
    } finally {
      setIsLoadingOwn(false);
    }

    try {
      // Trending topic-specific viral videos / best ideas from YouTube
      const trendingRes = await fetchTrendingTopicVideos(forceRefresh);
      if (trendingRes && trendingRes.length > 0) {
        setTrendingVideos(trendingRes);
      }
    } catch (err) {
      console.error("Failed loading trending ideas:", err);
    } finally {
      setIsLoadingIdeas(false);
    }
  }

  // Handle category filter change for Ideas section
  const handleTopicFilter = async (filter: string, query: string) => {
    setActiveCategoryFilter(filter);
    setIsLoadingIdeas(true);
    try {
      const res = await fetchTrendingTopicVideos(false, query);
      if (res && res.length > 0) {
        setTrendingVideos(res);
      }
    } catch (e) {
      console.error("Filter fetch error:", e);
    } finally {
      setIsLoadingIdeas(false);
    }
  };

  // Sync scroll listeners
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

  useEffect(() => {
    const ideasEl = ideasScrollRef.current;
    const handleIdeasScroll = () => {
      if (ideasEl) ideasPosRef.current = ideasEl.scrollLeft;
    };
    if (ideasEl) {
      ideasEl.addEventListener("scroll", handleIdeasScroll, { passive: true });
      ideasPosRef.current = ideasEl.scrollLeft;
    }
    return () => {
      if (ideasEl) ideasEl.removeEventListener("scroll", handleIdeasScroll);
    };
  }, [trendingVideos]);

  // Smooth auto-scroll for own videos
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateSliding = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      const clampedDelta = Math.min(delta, 100);
      const speed = 0.035;

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

  return (
    <section id="top-10-videos-section" className="py-10 bg-gradient-to-b from-green-50/20 via-white to-slate-50/50 border-b border-green-100/60 space-y-10">
      <div className="w-full max-w-full px-2 sm:px-4 2xl:px-8">
        
        {/* Main Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-green-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-green-700 font-mono text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-green-600 animate-pulse" />
              <span>Modern Fisheries Broadcast Hub</span>
              {isLiveApi ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 ml-2">
                  <Radio className="w-3 h-3 text-emerald-600 animate-ping" />
                  YouTube Live Sync Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200/60 ml-2">
                  Curated Catalog Sync
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm mt-1 font-sans">
              Official releases from Modern Fisheries alongside live trending aquaculture innovations directly from YouTube.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <button
              onClick={() => loadFeeds(true)}
              disabled={isLoadingOwn || isLoadingIdeas}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-sans font-semibold text-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              title="Refresh Live YouTube Feed"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoadingOwn || isLoadingIdeas ? "animate-spin text-green-600" : ""}`} />
              <span>Refresh Live Feed</span>
            </button>

            <button
              id="view-more-button-top"
              onClick={onViewMore}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl font-sans font-semibold text-sm shadow-xs transition-all hover:translate-x-0.5 active:scale-95 cursor-pointer"
            >
              <span>Browse Full Video Archive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PANEL 1: Modern Fisheries Exclusive Videos (Own Channel) */}
        <div className="relative bg-white rounded-3xl p-6 border border-green-100/80 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <h3 className="font-sans font-black text-lg sm:text-xl text-green-950 tracking-tight">
                  Modern Fisheries Exclusive Videos
                </h3>
              </div>
              <p className="text-slate-500 text-xs font-sans mt-0.5">
                Official releases, system builds, and field operations from our primary YouTube channel.
              </p>
            </div>
            
            <div className="flex items-center gap-3 self-start sm:self-center">
              <a 
                href="https://www.youtube.com/channel/UChChDXzRMI9g1lgcTo5KA3A" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-105"
              >
                <Youtube className="w-4 h-4 fill-current" />
                <span>Subscribe Channel</span>
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

          {/* Carousel for Own Channel Videos */}
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

        {/* PANEL 2: Latest Best Ideas & Innovations from YouTube */}
        <div className="relative bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30 rounded-3xl p-6 border border-amber-200/60 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4 border-b border-amber-100/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-700">
                  <Lightbulb className="w-5 h-5 text-amber-600 animate-bounce" />
                </div>
                <h3 className="font-sans font-black text-lg sm:text-xl text-slate-900 tracking-tight">
                  Latest Aquaculture Ideas & Innovations
                </h3>
              </div>
              <p className="text-slate-500 text-xs font-sans mt-1">
                Real-time pull of top trending aquaculture concepts, RAS tech, biofloc setups, and smart farming ideas.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-center">
              <div className="flex gap-1 border-l border-amber-200/60 pl-3">
                <button 
                  onClick={() => handleArrowScroll(ideasScrollRef, "left")}
                  className="p-1.5 rounded-lg border border-amber-200 bg-white text-slate-800 hover:bg-amber-50 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleArrowScroll(ideasScrollRef, "right")}
                  className="p-1.5 rounded-lg border border-amber-200 bg-white text-slate-800 hover:bg-amber-50 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Topic Quick Filters for Best Ideas */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none text-xs font-semibold">
            <button
              onClick={() => handleTopicFilter("all", "modern fish farming technology aquaponics biofloc ras innovations")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === "all"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
              }`}
            >
              🔥 All Top Innovations
            </button>
            <button
              onClick={() => handleTopicFilter("ras", "recirculating aquaculture system setup RAS fish farming")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === "ras"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
              }`}
            >
              💧 RAS Tech Ideas
            </button>
            <button
              onClick={() => handleTopicFilter("biofloc", "biofloc technology fish farming setup C/N ratio")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === "biofloc"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
              }`}
            >
              🦠 Biofloc Innovations
            </button>
            <button
              onClick={() => handleTopicFilter("aquaponics", "commercial aquaponics farming vertical fish plant setup")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === "aquaponics"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
              }`}
            >
              🌿 Smart Aquaponics
            </button>
            <button
              onClick={() => handleTopicFilter("feeding", "automatic fish feeder smart aquaculture feeding management")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === "feeding"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
              }`}
            >
              🐟 Smart Feeding & Automation
            </button>
          </div>

          {/* Carousel for Best Ideas */}
          {isLoadingIdeas ? (
            <div className="flex items-center justify-center py-12 gap-3 text-amber-700 font-sans font-semibold text-sm">
              <RotateCw className="w-5 h-5 animate-spin" />
              <span>Pulling latest aquaculture ideas live from YouTube...</span>
            </div>
          ) : (
            <div 
              ref={ideasScrollRef}
              onMouseEnter={() => setIsIdeasHovered(true)}
              onMouseLeave={() => setIsIdeasHovered(false)}
              onTouchStart={() => setIsIdeasHovered(true)}
              onTouchEnd={() => setIsIdeasHovered(false)}
              className="flex gap-5 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent select-none"
              style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
            >
              {trendingVideos.map((video, index) => (
                <div key={`${video.id}-idea-${index}`} className="w-[260px] max-w-[80vw] sm:max-w-none sm:w-[320px] shrink-0">
                  <VideoCard video={video} onVideoClick={onVideoClick} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
