import React, { useState, useEffect } from "react";
import { Video } from "../types";
import { OWN_VIDEOS } from "../data";
import VideoCard from "./VideoCard";
import { Search, Tv, Sparkles, Youtube, Play, BookOpen, Flame, ChevronLeft } from "lucide-react";
import { fetchOwnChannelVideos } from "../youtubeFeed";
import { getEnrichedVideosList } from "../utils/videoMetrics";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface VideosPageProps {
  onVideoSelect: (video: Video) => void;
  onBackToDashboard?: () => void;
}

export default function VideosPage({ onVideoSelect, onBackToDashboard }: VideosPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopicCategory, setSelectedTopicCategory] = useState<string>("All");
  const [ownVideos, setOwnVideos] = useState<Video[]>(getEnrichedVideosList(OWN_VIDEOS));

  // Load latest channel videos on mount
  useEffect(() => {
    async function loadChannelVideos() {
      try {
        const ownRes = await fetchOwnChannelVideos();
        if (ownRes && ownRes.length > 0) {
          setOwnVideos(getEnrichedVideosList(ownRes));
        }
      } catch (err) {
        console.error("Error fetching own channel videos:", err);
      }
    }
    loadChannelVideos();
  }, []);

  const categories = [
    { key: "All", label: "All Systems" },
    { key: "RAS", label: "Recirculating Aqua System (RAS)" },
    { key: "Biofloc", label: "Biofloc Systems" },
    { key: "Aquaponics", label: "Aquaponics" },
    { key: "Hydroponics", label: "Hydroponics" },
    { key: "Feeding", label: "Fish Feeding Guides" },
    { key: "Water Quality", label: "Water Quality Management" },
    { key: "Breeding", label: "Breeding & Hatcheries" },
    { key: "Diseases", label: "Disease Control & Biosecurity" }
  ];

  // Apply search & category filters to own videos
  const filteredVideos = ownVideos.filter((video) => {
    const matchesSearch = 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.category || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedTopicCategory === "All" || video.category === selectedTopicCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured video is the first matched video
  const featuredVideo = filteredVideos[0];
  // Remaining videos are the rest of the matches
  const archiveVideos = filteredVideos.slice(1);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-4 sm:space-y-6">
      
      {/* Page Title & Search bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-green-100 pb-3 sm:pb-4">
        <div>
          {onBackToDashboard && (
            <button 
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-900 text-xs font-sans font-bold tracking-tight bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs mb-2"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-emerald-700" />
              <span>&lt;- Back to Dashboard</span>
            </button>
          )}
          <h1 className="font-sans font-black text-2xl sm:text-3xl text-green-950 tracking-tight flex items-center gap-2">
            <Tv className="w-8 h-8 text-green-700 animate-pulse" />
            <span>Modern Fisheries Channel Archive</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Browse official releases, system build tutorials, and guided educational modules.
          </p>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-700/60" />
            <input
              id="search-videos-input"
              type="text"
              placeholder="Search guides, systems, or parameters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-green-100 bg-white text-slate-800 placeholder-slate-400 font-sans text-xs focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Top Advertisement Banner (Placed AFTER the Page Title & Search bar) */}
      <div className="bg-slate-50/95 backdrop-blur-md py-0.5 my-1 transition-all border-y border-slate-200/80 shadow-xs -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 w-auto">
        <div className="max-w-[1440px] mx-auto">
          <AdBanner reloadKey="videos-main-ad" />
        </div>
      </div>

      {/* Mobile Announcement Card (Not Sticky - scrolls up naturally) */}
      <div className="lg:hidden my-1">
        <OwnCirclesAnnouncement mode="mobile" />
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        <div className="flex-1 min-w-0 space-y-12">

      {/* Category Pill Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-slate-400" />
          <span>Filter by Technology Category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedTopicCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium border transition-all cursor-pointer ${
                selectedTopicCategory === cat.key
                  ? "bg-green-700 border-green-700 text-white shadow-xs"
                  : "bg-white border-green-100 hover:bg-green-50 text-slate-700 hover:text-green-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Display */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-green-150 rounded-3xl bg-slate-50/50">
          <Sparkles className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <h3 className="font-sans font-bold text-slate-800 text-base">No matching video guides found</h3>
          <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different technology category.
          </p>
          <button
            onClick={() => { setSearchTerm(""); setSelectedTopicCategory("All"); }}
            className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg text-xs font-semibold hover:bg-green-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          
          {/* Featured Video Card */}
          {featuredVideo && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-green-700 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-green-600 animate-pulse" />
                <span>Featured Masterclass Release</span>
              </div>
              
              <div className="bg-white rounded-3xl border border-green-100/50 shadow-md p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                  
                  {/* Thumbnail Side */}
                  <div 
                    onClick={() => onVideoSelect(featuredVideo)}
                    className="md:col-span-6 lg:col-span-5 group relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-150 bg-slate-900 shadow-xs cursor-pointer"
                  >
                    <img 
                      src={featuredVideo.thumbnail} 
                      alt={featuredVideo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-green-950/20 group-hover:bg-green-950/30 flex items-center justify-center transition-all">
                      <div className="p-4 bg-white/95 text-green-700 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300">
                        <Play className="w-6 h-6 fill-current text-green-700 ml-0.5" />
                      </div>
                    </div>

                    {/* Category tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-800 text-white shadow-xs">
                        {featuredVideo.category}
                      </span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4 px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-slate-950/80 text-white backdrop-blur-xs">
                      {featuredVideo.duration}
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="md:col-span-6 lg:col-span-7 space-y-4 text-left">
                    <div className="flex items-center gap-2">
                      <Youtube className="w-5 h-5 text-red-600 fill-current" />
                      <span className="font-sans font-extrabold text-sm text-slate-800">{featuredVideo.creator}</span>
                    </div>

                    <h2 
                      onClick={() => onVideoSelect(featuredVideo)}
                      className="font-sans font-black text-xl sm:text-2xl md:text-3xl text-slate-900 hover:text-green-700 transition-colors cursor-pointer tracking-tight leading-snug"
                    >
                      {featuredVideo.title}
                    </h2>

                    <p className="text-slate-600 text-sm font-sans leading-relaxed">
                      {featuredVideo.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 bg-slate-50 p-2.5 sm:p-3 rounded-2xl border border-slate-100 text-center font-mono text-xs text-slate-500 max-w-md">
                      <div>
                        <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px] mb-0.5">Views</span>
                        <span className="font-extrabold text-slate-800 text-sm sm:text-base">{featuredVideo.views}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px] mb-0.5">Likes</span>
                        <span className="font-extrabold text-green-700 text-sm sm:text-base">{featuredVideo.likes.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px] mb-0.5">Released</span>
                        <span className="font-extrabold text-slate-800 text-sm sm:text-base">{featuredVideo.publishDate}</span>
                      </div>
                    </div>

                    {/* Action trigger button */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => onVideoSelect(featuredVideo)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white font-sans font-extrabold text-xs rounded-xl shadow-xs transition-all hover:translate-x-0.5 active:scale-95 cursor-pointer"
                      >
                        <span>Watch Presentation</span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                      
                      <a 
                        href="https://www.youtube.com/channel/UChChDXzRMI9g1lgcTo5KA3A" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-sans font-extrabold text-xs rounded-xl shadow-xs transition-all hover:scale-105"
                      >
                        <Youtube className="w-4 h-4 fill-current" />
                        <span>Subscribe</span>
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Archive Grid */}
          {archiveVideos.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>All Guides & Video Modules ({archiveVideos.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {archiveVideos.map((video) => (
                  <div key={video.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all">
                    <VideoCard video={video} onVideoClick={onVideoSelect} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

        </div>
        <div className="hidden xl:block shrink-0 sticky top-20">
          <RightSidebarAd reloadKey="videos-sidebar-ad" />
        </div>
      </div>
    </div>
  );
}
