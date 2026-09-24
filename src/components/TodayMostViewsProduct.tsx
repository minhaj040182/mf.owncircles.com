import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { VideoItem, MostViewedResponse } from '../types';
import { VideoCard } from './VideoCard';
import { MostViewedAdCard } from './MostViewedAdCard';
import { RegionCode } from '../utils/localization';
import { CurrencyCode } from '../utils/currency';
import { fetchMostViewedVideos, VIDEO_VIEW_EVENT } from '../utils/videoViewsDb';

interface TodayMostViewsProductProps {
  onSelectVideo: (video: VideoItem) => void;
  onSelectCategory?: (category: string) => void;
  region: RegionCode;
  savedVideoIds?: string[];
  onToggleBookmark?: (videoId: string) => void;
  selectedCurrency?: CurrencyCode;
}

export const TodayMostViewsProduct: React.FC<TodayMostViewsProductProps> = ({
  onSelectVideo,
  onSelectCategory,
  region,
  savedVideoIds = [],
  onToggleBookmark,
  selectedCurrency = 'USD',
}) => {
  const [data, setData] = useState<MostViewedResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const mostViewsRef = useRef<HTMLDivElement>(null);

  const loadData = async () => {
    try {
      const res = await fetchMostViewedVideos();
      setData(res);
    } catch (err) {
      console.warn('[TodayMostViewsProduct] Load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Listen for new video views across the app and re-fetch instantly
    const handleVideoViewed = () => {
      loadData();
    };

    window.addEventListener(VIDEO_VIEW_EVENT, handleVideoViewed);
    return () => {
      window.removeEventListener(VIDEO_VIEW_EVENT, handleVideoViewed);
    };
  }, []);

  // Auto slide similar to other horizontal rails
  useEffect(() => {
    const interval = setInterval(() => {
      if (mostViewsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = mostViewsRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          mostViewsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          mostViewsRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollContainer = (direction: 'left' | 'right') => {
    if (mostViewsRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      mostViewsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // If loading and no data yet, or if videos array is empty, HIDE THIS PANEL COMPLETELY as requested
  if (isLoading && (!data || data.videos.length === 0)) {
    return null;
  }

  if (!data || !data.videos || data.videos.length === 0) {
    return null; // Completely hide when no videos exist
  }

  const seen = new Set<string>();
  const videos = (data.videos || []).filter(v => {
    const id = v.id || v.youtubeId;
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  }).slice(0, 20); // strictly capped at 20 max

  return (
    <section id="today-most-views-section" className="space-y-4">
      {/* Header bar styled exactly like Trending Mobiles & Laptop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 border border-blue-600/20 flex items-center justify-center font-black">
            <Flame className="w-5 h-5 fill-blue-600 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>Today Most Views Product</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase border border-blue-200">
                  🔥 Most Viewed
                </span>
                {data.timeframe !== 'today' && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase border border-amber-200 flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" />
                    <span>{data.timeframeLabel}</span>
                  </span>
                )}
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Most viewed product reviews ranked by live community video engagement (Max 20)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {onSelectCategory && (
            <button
              onClick={() => onSelectCategory('all')}
              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-extrabold text-blue-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-102"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => scrollContainer('left')}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-2xs cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollContainer('right')}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-2xs cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Rail using identical VideoCard cards and styling as Trending Mobiles & Laptop */}
      <div 
        ref={mostViewsRef}
        className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video, idx) => (
          <React.Fragment key={`most-viewed-${video.id}-${idx}`}>
            <div className="w-[300px] sm:w-[340px] shrink-0 snap-start flex flex-col">
              <VideoCard 
                video={video} 
                onSelect={onSelectVideo} 
                region={region} 
                isBookmarked={savedVideoIds.includes(video.id)}
                onToggleBookmark={onToggleBookmark}
                selectedCurrency={selectedCurrency}
              />
            </div>

            {/* In-content Advertisement: cleanly inserted after the first 2 real items without displacing real records */}
            {((idx === 1) || (videos.length === 1 && idx === 0)) && (
              <div key="most-viewed-ad-item" className="w-[300px] sm:w-[340px] shrink-0 snap-start flex flex-col">
                <MostViewedAdCard />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
