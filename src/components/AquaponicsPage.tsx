import React, { useState, useRef, useEffect } from "react";
import { 
  Leaf, Calculator, Info, HelpCircle, CheckCircle2, 
  Sprout, Layers, ArrowRight, Sparkles, Activity, 
  Check, AlertTriangle, ShieldAlert, Scale, Thermometer, Gauge, Settings, BookOpen,
  Droplet, Microscope, HeartPulse, ShieldCheck, ChevronDown, ChevronRight, Play,
  TrendingUp, Award, Hammer, MessageSquareCode, Waves,
  Flame, ChevronLeft, ThumbsUp
} from "lucide-react";
import { Video } from "../types";
import VideoCard from "./VideoCard";
import { fetchYouTubeChannelVideos, fetchTrendingTopicVideos } from "../youtubeFeed";
import TechnologyComparison from "./TechnologyComparison";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

const isVideoViral = (v: Video) => {
  const viewsStr = v.views.toLowerCase();
  if (viewsStr.includes("m")) return true;
  if (viewsStr.includes("k")) {
    const num = parseFloat(viewsStr);
    if (!isNaN(num) && num >= 100) return true;
  }
  return false;
};

// Real, highly educational Aquaponics YouTube Shorts
const AQUAPONICS_YOUTUBE_VIDEOS: Video[] = [
  {
    id: "aquaponics-short-1",
    title: "DIY Auto Bell Siphon Hack in 60 seconds!",
    description: "Watch a high-flow 3/4\" standpipe bell siphon kick-start. Learn how an airtight dome and snorkel tube create instant suction vacuum.",
    thumbnail: "https://images.unsplash.com/photo-1516715094727-ec48be335d79?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/26xpMCXP9W0",
    duration: "0:58",
    views: "1.2M views",
    type: "youtube",
    creator: "Rob Bob's DIY Aquaponics",
    publishDate: "2 weeks ago",
    category: "Aquaponics",
    likes: 45000
  },
  {
    id: "aquaponics-short-2",
    title: "Why pH 6.8 is the Magic Compromise point",
    description: "Fish prefer 7.4+, plants prefer 5.8-, and nitrifying bacteria prefer 7.8+. We explain why 6.8 pH is the magic compromise number.",
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/qS6A3N8Xvto",
    duration: "0:45",
    views: "340K views",
    type: "youtube",
    creator: "Modern Fisheries Academy",
    publishDate: "1 month ago",
    category: "Water Quality",
    likes: 18500
  },
  {
    id: "aquaponics-short-3",
    title: "Coupled vs Decoupled loop explained simply",
    description: "Stop returning crop runoff back to your fish! Decoupled loops let you feed plants custom organic supplements without poisoning your Tilapia.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/mCg9_nZ9bS0",
    duration: "0:52",
    views: "520K views",
    type: "youtube",
    creator: "Greenhouse Tech Hub",
    publishDate: "3 weeks ago",
    category: "Aquaponics",
    likes: 29000
  },
  {
    id: "aquaponics-short-4",
    title: "How to Dose Chelated Iron Safely",
    description: "Leaves turning yellow? It's iron chlorosis. Learn why you must use DTPA chelated iron below pH 7.0 and Fe-EDDHA for alkaline setups.",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/K6V86n8N9w0",
    duration: "0:59",
    views: "180K views",
    type: "youtube",
    creator: "Urban Agriculture Pros",
    publishDate: "2 months ago",
    category: "Feeding",
    likes: 9200
  },
  {
    id: "aquaponics-short-5",
    title: "How a Radial Flow Filter removes heavy waste",
    description: "Tired of fish poop clogging your lettuce roots? See how water enters a central baffle, letting heavy solids sink to the bottom cone instantly.",
    thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/5T7C0lG1S8w",
    duration: "0:50",
    views: "710K views",
    type: "youtube",
    creator: "Aqua Bio-Chemists",
    publishDate: "1 month ago",
    category: "Aquaponics",
    likes: 38000
  },
  {
    id: "aquaponics-short-6",
    title: "Kill Aphids organically inside your greenhouse!",
    description: "Do not use chemical pesticides; they will kill your fish. Use Ladybugs or potassium bicarbonate sprays on leaves during twilight.",
    thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/fK_AclwM-9k",
    duration: "0:55",
    views: "215K views",
    type: "youtube",
    creator: "Pest Control Organic",
    publishDate: "4 months ago",
    category: "Diseases",
    likes: 11000
  },
  {
    id: "aquaponics-video-7",
    title: "Commercial Aquaponics: Inside a 1-Acre Deep Water Culture Greenhouse",
    description: "Tour a commercial lettuce and tilapia farm. Learn about continuous aeration, seedling transplantation, and professional harvesting workflows.",
    thumbnail: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/H6Uo4W_YmY4",
    duration: "18:45",
    views: "890K views",
    type: "youtube",
    creator: "Acre Growers",
    publishDate: "3 months ago",
    category: "Aquaponics",
    likes: 34000
  },
  {
    id: "aquaponics-video-8",
    title: "Step-by-Step DIY Aquaponics System for Beginners",
    description: "Build a complete backyard IBC tank aquaponics system. Step-by-step plumbing, grow-bed media selection, and fish stocking density guidelines.",
    thumbnail: "https://images.unsplash.com/photo-1558905619-172530a2701b?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/26xpMCXP9W0",
    duration: "25:30",
    views: "1.5M views",
    type: "youtube",
    creator: "Backyard Aquaponics",
    publishDate: "6 months ago",
    category: "Aquaponics",
    likes: 85000
  },
  {
    id: "aquaponics-video-9",
    title: "The Science of Nitrification in Aquaponic Filters",
    description: "A deep dive into Nitrosomonas and Nitrobacter bacteria colony development. Understand how toxic ammonia converts to nitrite, and then to nitrate.",
    thumbnail: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/qS6A3N8Xvto",
    duration: "14:15",
    views: "240K views",
    type: "youtube",
    creator: "Bio-Science Lab",
    publishDate: "5 months ago",
    category: "Water Quality",
    likes: 12500
  },
  {
    id: "aquaponics-video-10",
    title: "Tilapia Stocking Density Calculations Explained",
    description: "How many fish can you safely keep per gallon? Learn how feeding rates, biofilter surface area, and oxygen levels limit fish biomass.",
    thumbnail: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/mCg9_nZ9bS0",
    duration: "11:20",
    views: "185K views",
    type: "youtube",
    creator: "Aquaponics Pro",
    publishDate: "2 months ago",
    category: "Aquaponics",
    likes: 9200
  },
  {
    id: "aquaponics-video-11",
    title: "Best Crops for Aquaponics (And What to Avoid!)",
    description: "From leafy greens like lettuce and mint to heavy feeders like tomatoes and cucumbers. Learn standard organic nutrient requirements.",
    thumbnail: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/K6V86n8N9w0",
    duration: "16:10",
    views: "620K views",
    type: "youtube",
    creator: "Greenhouse Tech Hub",
    publishDate: "4 weeks ago",
    category: "Aquaponics",
    likes: 31000
  },
  {
    id: "aquaponics-video-12",
    title: "How to Cycle an Aquaponic System Without Fish",
    description: "Fishless cycling using pure ammonium chloride. Establish your nitrifying bacteria colony before introducing your expensive fingerlings.",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/5T7C0lG1S8w",
    duration: "13:40",
    views: "310K views",
    type: "youtube",
    creator: "Modern Fisheries Academy",
    publishDate: "8 months ago",
    category: "Water Quality",
    likes: 15400
  },
  {
    id: "aquaponics-video-13",
    title: "Solids Filtration: Swirl Separators vs Radial Flow",
    description: "Compare the efficiency of mechanical solid waste removal. See how settling velocity affects water clarity and biofilter health.",
    thumbnail: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/fK_AclwM-9k",
    duration: "10:50",
    views: "410K views",
    type: "youtube",
    creator: "Aqua Bio-Chemists",
    publishDate: "1 year ago",
    category: "Aquaponics",
    likes: 19800
  },
  {
    id: "aquaponics-video-14",
    title: "Buffer Up! How to Raise pH Safely in Aquaponics",
    description: "Nitrification naturally lowers pH. Learn why you should use calcium hydroxide and potassium carbonate to buffer your system.",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/H6Uo4W_YmY4",
    duration: "9:15",
    views: "115K views",
    type: "youtube",
    creator: "Urban Agriculture Pros",
    publishDate: "7 months ago",
    category: "Water Quality",
    likes: 4800
  },
  {
    id: "aquaponics-video-15",
    title: "Vertical Grow Towers: Quadruple Your Aquaponic Yield",
    description: "Maximize vertical space using modular zip-style towers. Perfect for strawberries and herbs in compact greenhouse environments.",
    thumbnail: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/26xpMCXP9W0",
    duration: "20:15",
    views: "2.1M views",
    type: "youtube",
    creator: "Vertical Farm Tech",
    publishDate: "4 months ago",
    category: "Aquaponics",
    likes: 96000
  },
  {
    id: "aquaponics-video-16",
    title: "Duckweed: The Ultimate Free Fish Food?",
    description: "Grow duckweed using nutrient-rich aquaponic discharge water. Analyze its crude protein profile and see if it replaces pellets.",
    thumbnail: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/qS6A3N8Xvto",
    duration: "12:55",
    views: "750K views",
    type: "youtube",
    creator: "Organic Farm Solutions",
    publishDate: "5 months ago",
    category: "Feeding",
    likes: 28500
  },
  {
    id: "aquaponics-video-17",
    title: "Troubleshooting Siphon Failure: Why Your Bell Won't Drain",
    description: "Is your siphon trickling continuously instead of flushing? Fix common air leaks, adjust flow rates, and tune the snorkel tube.",
    thumbnail: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/mCg9_nZ9bS0",
    duration: "15:40",
    views: "530K views",
    type: "youtube",
    creator: "Rob Bob's DIY Aquaponics",
    publishDate: "10 months ago",
    category: "Aquaponics",
    likes: 22000
  },
  {
    id: "aquaponics-video-18",
    title: "Mineralization Tank Setup: Turn Poop Into Liquid Gold",
    description: "Don't throw away filter solids! Learn how aerobic mineralization breaks down solid fish waste to release bio-available iron and phosphorus.",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/K6V86n8N9w0",
    duration: "18:22",
    views: "290K views",
    type: "youtube",
    creator: "Eco-Agri Engineers",
    publishDate: "3 months ago",
    category: "Aquaponics",
    likes: 11200
  },
  {
    id: "aquaponics-video-19",
    title: "Red Wiggler Worms in Media Grow Beds",
    description: "Why vermiponics is a game changer. How red wigglers consume solids, prevent anaerobic zones, and fertilize plant roots.",
    thumbnail: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/5T7C0lG1S8w",
    duration: "14:50",
    views: "640K views",
    type: "youtube",
    creator: "Worm Farm Pioneers",
    publishDate: "2 years ago",
    category: "Aquaponics",
    likes: 32400
  },
  {
    id: "aquaponics-video-20",
    title: "Greenhouse Aquaponics: Winter Heating on a Budget",
    description: "Keep your Tilapia active and feeding during winter. Solar compost heating, thermal mass barrels, and double-walled polycarbonate hacks.",
    thumbnail: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&h=711&q=80",
    videoUrl: "https://www.youtube.com/embed/fK_AclwM-9k",
    duration: "21:10",
    views: "480K views",
    type: "youtube",
    creator: "Off-Grid Aquaculture",
    publishDate: "11 months ago",
    category: "Pond Setup",
    likes: 18900
  }
];

function ShortsCard({ video, onVideoClick }: { video: Video; onVideoClick: (v: Video) => void }) {
  return (
    <div 
      onClick={() => onVideoClick(video)}
      className="group relative bg-slate-950 rounded-2xl overflow-hidden aspect-[9/16] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-800 cursor-pointer flex flex-col h-full"
    >
      {/* Portrait Thumbnail */}
      <div className="absolute inset-0 w-full h-full bg-slate-900">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
        />
        {/* Ambient Dark Gradient Bottom-Up */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        {/* Ambient Dark Gradient Top-Down */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-transparent"></div>
      </div>

      {/* Floating Category Badge top left */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-red-600 text-white shadow-xs flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          Shorts
        </span>
        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-slate-900/80 text-emerald-400 border border-emerald-500/20 backdrop-blur-xs">
          {video.category}
        </span>
      </div>

      {/* Play Overlay Button in middle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <div className="p-3.5 bg-red-600 rounded-full text-white shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
          <Play className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* View count / Duration floating bottom right */}
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-slate-950/80 text-white backdrop-blur-xs z-10">
        {video.duration}
      </div>

      {/* Details overlay at bottom */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end space-y-1.5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
        <div className="space-y-0.5 text-left">
          <span className="text-[10px] font-bold text-slate-300 font-sans block truncate">@{video.creator}</span>
          <h4 className="font-sans font-black text-white text-xs leading-snug line-clamp-2 drop-shadow-md group-hover:text-red-400 transition-colors">
            {video.title}
          </h4>
          <p className="text-slate-300 text-[10px] leading-relaxed line-clamp-2 drop-shadow-sm font-sans opacity-90 group-hover:opacity-100 transition-opacity">
            {video.description}
          </p>
        </div>

        {/* Views and Likes footer */}
        <div className="flex justify-between items-center pt-2 border-t border-white/10 text-[9px] font-mono text-slate-300">
          <span className="font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {video.views}
          </span>
          <span className="flex items-center gap-1 text-slate-200">
            <ThumbsUp className="w-3 h-3 text-red-500 fill-current" />
            <span>{video.likes.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

interface AquaponicsPageProps {
  onVideoClick?: (video: Video) => void;
  onBackToDashboard?: () => void;
}

export default function AquaponicsPage({ onVideoClick, onBackToDashboard }: AquaponicsPageProps) {
  // Tab Navigation: overview, science, designs, comparison, sandbox, guide, faq
  const [activeTab, setActiveTab] = useState<"overview" | "science" | "designs" | "comparison" | "sandbox" | "guide" | "faq">("overview");

  // Interactive Schematic Explorer selection
  const [selectedComponent, setSelectedComponent] = useState<string>("fishtank");

  // System design modes (nested tab in Designs)
  const [selectedDesign, setSelectedDesign] = useState<"media" | "dwc" | "nft" | "drip">("media");

  // FAQ open/close states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // UVI Feeding Ratio Sandbox States
  const [fishCount, setFishCount] = useState<number>(150);
  const [avgFishWeight, setAvgFishWeight] = useState<number>(350); // grams
  const [feedRatePercent, setFeedRatePercent] = useState<number>(1.2); // 1.2% body weight daily
  const [cropCategory, setCropCategory] = useState<"leafy" | "fruiting">("leafy");

  // Bell Siphon Calculator States
  const [growBedLength, setGrowBedLength] = useState<number>(1.2); // meters
  const [growBedWidth, setGrowBedWidth] = useState<number>(0.8); // meters
  const [growBedDepth, setGrowBedDepth] = useState<number>(0.3); // meters (standard 30cm)
  const [mediaVoidRatio, setMediaVoidRatio] = useState<number>(0.4); // 40% void space for clay pebbles
  const [fillTimeTarget, setFillTimeTarget] = useState<number>(15); // target minutes to fill bed

  // Biofilter SSA (Specific Surface Area) Calculator States
  const [dailyFeedGramsInput, setDailyFeedGramsInput] = useState<number>(180);
  const [feedProteinPercent, setFeedProteinPercent] = useState<number>(32); // 32% protein standard
  const [biofilterMediaSSA, setBiofilterMediaSSA] = useState<number>(800); // m2/m3 (e.g. K1 media)

  // YouTube Carousel states
  const [aquaponicsVideos, setAquaponicsVideos] = useState<Video[]>(AQUAPONICS_YOUTUBE_VIDEOS);
  const [showViralOnly, setShowViralOnly] = useState<boolean>(false);
  const [isVideosHovered, setIsVideosHovered] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    async function loadDynamicAquaponicsVideos() {
      try {
        const [channelVids, trendingVids] = await Promise.all([
          fetchYouTubeChannelVideos().catch(() => []),
          fetchTrendingTopicVideos(false, "aquaponics fish vegetable farming system viral").catch(() => [])
        ]);

        const combined = [...channelVids, ...trendingVids];
        if (combined.length > 0) {
          const filtered = combined.filter(v => {
            const titleLower = (v.title || "").toLowerCase();
            const descLower = (v.description || "").toLowerCase();
            const catLower = (v.category || "").toLowerCase();

            return (
              catLower === "aquaponics" || 
              titleLower.includes("aquaponic") || 
              titleLower.includes("siphon") ||
              titleLower.includes("fish vegetable") ||
              titleLower.includes("dwc") ||
              titleLower.includes("nft") ||
              descLower.includes("aquaponics")
            );
          });

          if (filtered.length > 0) {
            setAquaponicsVideos(prev => {
              const merged = [...prev];
              filtered.forEach(v => {
                if (!merged.some(m => m.id === v.id || m.videoUrl === v.videoUrl)) {
                  merged.unshift(v);
                }
              });
              return merged;
            });
          }
        }
      } catch (err) {
        console.error("Error loading Aquaponics YouTube videos:", err);
      }
    }
    loadDynamicAquaponicsVideos();
  }, []);

  // Sync scroll coordinates
  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      if (el) scrollPosRef.current = el.scrollLeft;
    };
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      scrollPosRef.current = el.scrollLeft;
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth continuous slow auto-sliding
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateSliding = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      const clampedDelta = Math.min(delta, 100);
      const speed = 0.03; // matches 30px per sec smooth scrolling

      if (scrollRef.current) {
        const el = scrollRef.current;
        if (isVideosHovered) {
          scrollPosRef.current = el.scrollLeft;
        } else {
          const { scrollWidth, clientWidth } = el;
          const halfWidth = scrollWidth / 2;
          if (scrollWidth > clientWidth) {
            scrollPosRef.current += speed * clampedDelta;
            
            // Seamless wrap-around
            if (scrollPosRef.current >= halfWidth) {
              scrollPosRef.current -= halfWidth;
            } else if (scrollPosRef.current < 0) {
              scrollPosRef.current += halfWidth;
            }
            
            el.scrollLeft = Math.round(scrollPosRef.current);
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateSliding);
    };

    animationFrameId = requestAnimationFrame(updateSliding);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVideosHovered]);

  const scrollVideos = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = 340; // Approx card width + gap
      const newScrollLeft = direction === "left" 
        ? el.scrollLeft - scrollAmount 
        : el.scrollLeft + scrollAmount;
      
      el.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
      scrollPosRef.current = newScrollLeft;
    }
  };

  // Calculations: UVI Feeding Ratio
  const totalBiomassKg = (fishCount * avgFishWeight) / 1000;
  const dailyFeedGrams = totalBiomassKg * 1000 * (feedRatePercent / 100);
  const feedConstant = cropCategory === "leafy" ? 22 : 60; // grams of feed per m2 of plants per day (UVI formulas)
  const supportedAreaM2 = dailyFeedGrams / feedConstant;
  const estimatedPlantsSupported = Math.round(
    cropCategory === "leafy" ? supportedAreaM2 * 25 : supportedAreaM2 * 4
  );

  // Calculations: Bell Siphon Hydraulics
  const growBedVolumeLiters = growBedLength * growBedWidth * growBedDepth * 1000;
  const actualWaterVolumeLiters = growBedVolumeLiters * mediaVoidRatio;
  const flowRateRequiredLph = (actualWaterVolumeLiters / fillTimeTarget) * 60;
  const recommendedStandpipeDiameter = "12mm to 19mm (1/2\" to 3/4\" standard)";
  const recommendedBellDiameter = "25mm to 50mm (1\" to 2\" standard)";

  // Calculations: Biofilter Nitrification Sizing
  // 1g of fish feed (32% protein) produces ~0.03g of TAN (Total Ammonia Nitrogen)
  const tanFactor = (feedProteinPercent / 100) * 0.092; // Nitrogen content to TAN conversion constant
  const dailyTanGrams = dailyFeedGramsInput * tanFactor;
  // Nitrification rate of nitrifying bacteria is approx 0.57g of Ammonia per m2 of surface area per day at optimal pH/temp
  const surfaceAreaRequiredM2 = dailyTanGrams / 0.57;
  const requiredMediaVolumeLiters = (surfaceAreaRequiredM2 / biofilterMediaSSA) * 1000;

  // Species Database
  const suitableSpecies = [
    {
      name: "Nile Tilapia (Oreochromis niloticus)",
      type: "Fish",
      temp: "24°C - 30°C",
      hardiness: "Exceptional",
      ph: "6.5 - 8.0",
      notes: "The golden standard for aquaponics. Highly tolerant of high stocking densities, low dissolved oxygen, and fluctuations in pH."
    },
    {
      name: "Channel Catfish (Ictalurus punctatus)",
      type: "Fish",
      temp: "20°C - 28°C",
      hardiness: "Very High",
      ph: "6.5 - 7.5",
      notes: "Bottom feeders that tolerate wide temperature shifts. Excellent disease resistance and adapts well to floating pellet feed."
    },
    {
      name: "Rainbow Trout (Oncorhynchus mykiss)",
      type: "Fish",
      temp: "12°C - 18°C",
      hardiness: "Moderate",
      ph: "6.5 - 7.5",
      notes: "Premium cold-water species. Requires highly oxygenated water (>6 mg/L) and intensive filtration. Excellent growth rates in winter."
    },
    {
      name: "Koi / Fancy Goldfish",
      type: "Fish",
      temp: "15°C - 25°C",
      hardiness: "High",
      ph: "6.8 - 7.8",
      notes: "Best suited for non-food backyard setups. Highly resilient ornamentals that generate rich nutrient profiles."
    },
    {
      name: "Sweet Basil (Ocimum basilicum)",
      type: "Plant",
      temp: "20°C - 30°C",
      hardiness: "High",
      ph: "5.8 - 6.5",
      notes: "The most popular crop. Grows incredibly fast, taking advantage of fish nitrates. Benefited heavily by warm ambient air."
    },
    {
      name: "Butterhead Lettuce",
      type: "Plant",
      temp: "15°C - 22°C",
      hardiness: "Excellent",
      ph: "5.5 - 6.5",
      notes: "Highly efficient nitrate sponge. Perfect for raft/DWC systems. Highly sensitive to heat, which triggers bolting and bitterness."
    },
    {
      name: "Roma Tomato (Heavy Feeder)",
      type: "Plant",
      temp: "18°C - 28°C",
      hardiness: "Moderate",
      ph: "6.0 - 6.8",
      notes: "Requires deep root beds or drip systems. Heavy potassium, calcium, and chelated iron demands. Must be supported once fruit sets."
    }
  ];

  // Detailed System Designs Data
  const systemDesigns = {
    media: {
      title: "Media-Based Flood and Drain System",
      desc: "Uses a porous, inert media (such as expanded clay pebbles, river gravel, or lava rock) that physically supports the plant roots. It serves as a mechanical filter (capturing solid fish waste) and a biofilter (colonizing surface area for nitrifying bacteria) all in one simple structure.",
      pros: "Simplest layout, highly forgiving for beginners, supports larger root and fruiting crops, and requires no secondary solid separation filters.",
      cons: "Media is physically heavy, requires high physical labor to clean, and can accumulate sludge (clogging) over years if not maintained.",
      hydroFlow: "Continuous pumping with automatic rapid siphon discharge (Bell Siphon).",
      turnover: "Requires 1.0 to 1.5 tank volume turnover per hour.",
      mediaSpecs: "Standard size: 8-16mm expanded clay pebbles (neutral pH). Avoid limestone gravel which raises pH excessively."
    },
    dwc: {
      title: "Deep Water Culture (DWC) / Floating Raft",
      desc: "Plants are placed in holes on lightweight floating boards (rafts, usually food-grade polystyrene), floating on water about 30cm deep. Roots hang down directly into nutrient-rich water. Water is continuously circulated and heavily aerated with air stones.",
      pros: "Highly scalable, standard for commercial leafy cultivation, high thermal stability due to massive water volume, easy clean-up and rapid transplant cycles.",
      cons: "Requires separate mechanical filtration (swirl separators/radial flow filters) to extract solid fish waste before water enters the rafts to prevent root clogging.",
      hydroFlow: "Continuous fluid flow down shallow canals with auxiliary heavy aeration.",
      turnover: "Raft bed volume should be turned over once every 2 to 4 hours.",
      mediaSpecs: "Floating polystyrene rafts with 5cm (2\") net pots containing a tiny pinch of coco coir or rockwool."
    },
    nft: {
      title: "Nutrient Film Technique (NFT)",
      desc: "Plants are grown in horizontal sloped gullies (typically PVC pipes or specialized square vinyl channels). A thin stream ('film') of highly oxygenated, nutrient-rich water flows continuously down the channel, wetting the tips of the hanging roots.",
      pros: "Maximizes vertical space, extremely lightweight, low water footprint, pristine clean visual appearance, and easy harvest procedures.",
      cons: "Completely unsuitable for heavy fruiting or tuber plants; immediate crop death if a water pump fails for even 15 to 30 minutes.",
      hydroFlow: "Continuous gravity-drained capillary flow down sloped gully channels.",
      turnover: "Water must flow through each channel at a rate of 1.0 to 2.0 Liters per minute.",
      mediaSpecs: "Standard bare roots hanging inside 50mm to 75mm vinyl gullies."
    },
    drip: {
      title: "Vertical Drip Tower Systems",
      desc: "Plants are stacked vertically in hollow columns. A small pump pushes water to the top of the tower, and it cascades down through the center, dripping onto the root systems of the plants housed in staggered pockets along the column.",
      pros: "Extremely high density per square meter of footprint. Perfect for high-density greenhouse layouts or urban balconies.",
      cons: "Requires pressurized pumps, higher mechanical susceptibility to mineral clogs, and high vertical structural demands.",
      hydroFlow: "Interval drip irrigation (e.g. 15 minutes on, 15 minutes off via digital timer).",
      turnover: "Tower recirculation rate of 40 to 60 Liters per hour per tower.",
      mediaSpecs: "Net pots with expanded clay or coarse rockwool inserts inside vertical staggered pockets."
    }
  };

  // Step-by-Step Cycle Guide
  const startupSteps = [
    { step: "1", title: "Select Hydraulic Architecture", detail: "Choose between media-filled, Deep Water Culture (DWC), or Nutrient Film Technique (NFT) based on your target crops and physical spatial constraints." },
    { step: "2", title: "Plumbing and System Integration", detail: "Assemble the fish tank, mechanical filtration (swirl or radial flow separator), biofilter, and grow beds. Install the submersible pump and piping. Ensure high-quality continuous air pumps are running to support oxygen levels." },
    { step: "3", title: "Fishless Cycling (Microbial Colonization)", detail: "Run the system with clean water. Add tiny doses of pure ammonium chloride or fish feed over 3-5 weeks to seed Nitrosomonas and Nitrobacter bacteria. Wait until Ammonia and Nitrite drop to zero, leaving behind stable Nitrates." },
    { step: "4", title: "Introduce Hardy Stocks & Crops", detail: "Slowly introduce hardy species like Tilapia. Acclimate temperatures over 45 minutes to prevent osmotic or thermal shock. Plant leafy crops like Basil or Lettuce once nitrate baselines are established." },
    { step: "5", title: "Biomicrobial Diagnostics & Maintenance", detail: "Test pH daily (maintain strict target of 6.8 - 7.0). Perform weekly checks for Ammonia, Nitrite, and Nitrate. Clean filter screens, feed fish high-protein feed twice daily, and monitor plant leaf health." }
  ];

  // Component breakdown for Interactive Diagram Explorer
  const componentDetails: Record<string, { title: string; type: string; desc: string; sizing: string; risks: string; maintenance: string }> = {
    fishtank: {
      title: "Fish Stock Tank & Biomass Engine",
      type: "Mechanical & Biological Source",
      desc: "This is the primary habitat for your aquatic species. It serves as the reservoir of organic carbon, ammonia, and macro-nutrients. Proper sizing ensures stable temperature, chemical buffering, and safe oxygen thresholds.",
      sizing: "For beginners, size the tank at a minimum of 500 Liters to maintain chemical stability. Keep stocking rates below 10-15 kg of fish per 1000 Liters.",
      risks: "Overstocking leads to rapid dissolved oxygen crashes, lethal ammonia spikes, and high physiological stress (fin rot, disease).",
      maintenance: "Perform weekly siphoning of bottom solid feces. Ensure tank walls are clear of toxic build-up and screen meshes are intact."
    },
    pump: {
      title: "Submersible Hydraulic Pump & Feed Line",
      type: "Mechanical Circulation System",
      desc: "The active heart of the system. It continuously lifts nutrient-dense water from the bottom fish tank up to the overhead filtration and grow channels, enabling nutrients to reach the plant roots.",
      sizing: "Size your pump to lift the entire volume of your fish tank 1.5 times per hour, accounting for vertical head height friction loss.",
      risks: "Pump failure shuts down the recirculating loop. Without water circulation, plants in NFT and Drip towers dry up and die within minutes, while ammonia concentrations in the fish tank rise rapidly.",
      maintenance: "Check and clean the pump intake impeller monthly to remove plant roots, snail shells, or biological film build-up."
    },
    channel: {
      title: "Overhead Grow Channels (NFT/Pipes)",
      type: "Agricultural Filtration & Absorption Zone",
      desc: "Where the crops (like lettuce, herbs, and basil) are physically housed in net pots. Water flows over their roots, absorbing Nitrates (NO3-) and other minerals. This actively filters the water before it returns to the fish tank.",
      sizing: "Width should comfortably support root masses without clogging the water flow. Keep channels sloped at a 1% to 2% gradient for continuous flow.",
      risks: "Overcrowded root systems can trap solid debris, creating anaerobic dead zones (zero oxygen) that harbor root rot (Pythium).",
      maintenance: "Sanitize grow channels between harvest cycles. Thin out excessive root mass if water begins to back up or overflow."
    },
    drain: {
      title: "Gravity Return & Aeration Splash Drain",
      type: "Oxygenation & Hydraulic Return",
      desc: "As the filtered water leaves the grow channels, it falls back down into the fish tank. By utilizing a gravity-induced drop, the water splashes violently on the surface, dissolving fresh gaseous Oxygen (O2) into the tank water while venting off dissolved Carbon Dioxide (CO2).",
      sizing: "Ensure a drop height of at least 15cm to 30cm to create a splashing force. Install a T-fitting or spray bar to maximize surface contact area.",
      risks: "If the return line is submerged, there is no surface splash, leading to rapid Carbon Dioxide toxicity and suffocating oxygen drops.",
      maintenance: "Ensure the splash drain nozzle remains clean and free of organic algae mats or blockages."
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">  
      
      {/* Page Header Banner */}
      <div className="relative bg-emerald-950 text-white p-4 sm:p-8 md:p-12  overflow-hidden shadow-2xl border border-emerald-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-800/40 via-emerald-950 to-emerald-950"></div>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl space-y-3 sm:space-y-4">
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-emerald-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
              Ecological Symbiosis
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight leading-tight">
            Aquaponics Systems <span className="text-emerald-400 font-mono font-light">(Closed Loop)</span>
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-base leading-relaxed max-w-3xl">
            A comprehensive master class in Aquaponic science. Unlike Recirculating Aquaculture Systems (RAS) which discard solid waste, or Hydroponics which relies on chemical synthetic mineral salts, Aquaponics integrates fish, plants, and nitrifying bacteria in a fully balanced recirculating ecosystem.
          </p>
        </div>
      </div>

        {/* Sticky Top Advertisement Banner */}
        <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-0.5 my-1 transition-all border-y border-slate-200/80 shadow-xs -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 w-auto">
          <div className="max-w-[1440px] mx-auto">
            <AdBanner reloadKey="feeding-main-ad" />
          </div>
        </div>

        {/* Mobile Announcement Card (Not Sticky - scrolls up naturally) */}
        <div className="lg:hidden my-1">
          <OwnCirclesAnnouncement mode="mobile" />
        </div>

      <div className="bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-xs flex overflow-x-auto no-scrollbar gap-1.5 w-full min-w-0 scroll-smooth">
        <div className="flex-1 min-w-0 space-y-6 sm:space-y-12 w-full">

      {/* Main Tabbed Navigation bar */}
      <div className="flex overflow-x-auto gap-1.5 sm:gap-2 pb-2 border-b border-emerald-100/60 scrollbar-none max-w-full -mx-3 px-3 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab("overview")}
          id="tab-overview"
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "overview" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Ecosystem Overview</span>
        </button>
        <button
          onClick={() => setActiveTab("science")}
          id="tab-science"
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "science" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Biological Science</span>
        </button>
        <button
          onClick={() => setActiveTab("designs")}
          id="tab-designs"
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "designs" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Detailed System Designs</span>
        </button>
        <button
          onClick={() => setActiveTab("comparison")}
          id="tab-comparison"
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "comparison" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>System Comparison Matrix</span>
        </button>
        <button
          onClick={() => setActiveTab("sandbox")}
          id="tab-sandbox"
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "sandbox" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Biomicrobial Sandbox</span>
        </button>
        <button
          onClick={() => setActiveTab("guide")}
          id="tab-guide"
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "guide" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Recirculation Setup Guide</span>
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          id="tab-faq"
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "faq" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Biological Troubleshooting</span>
        </button>
      </div>

      {/* Tab Contents Container */}
      <div className="min-h-[500px] pl-12">

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-10 animate-fade-in">
            
            {/* Interactive schematic section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider block">Closed Loop Hardware Layout</span>
                <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900 tracking-tight mt-1">
                  Interactive System Schematic Explorer
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Click on any component below to explore the hydraulic and biological engineering details based on the physical design.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                
                {/* Left: Diagram Box */}
                <div className="lg:col-span-6 space-y-3 sm:space-y-4">
                  <div className="bg-white p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <img 
                      src="/src/assets/images/aquaponic_diagram_1784222908220.jpg" 
                      alt="Aquaponics System Schematic Diagram" 
                      referrerPolicy="no-referrer"
                      className="w-full h-auto rounded-xl sm:rounded-2xl object-cover border border-slate-100"
                    />
                    
                    {/* Hotspot indicators */}
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-emerald-950/90 text-white text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full font-sans font-bold flex items-center gap-1.5 shadow-lg">
                        <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-pulse" /> Use components buttons below to analyze
                      </span>
                    </div>
                  </div>

                  {/* Component Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "fishtank", label: "🐟 Fish Tank" },
                      { id: "pump", label: "🔌 Water Pump" },
                      { id: "channel", label: "🌱 Grow Bed" },
                      { id: "drain", label: "💦 Splash Drain" }
                    ].map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => setSelectedComponent(comp.id)}
                        id={`btn-comp-${comp.id}`}
                        className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedComponent === comp.id
                            ? "bg-emerald-800 border-emerald-800 text-white shadow-md font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xs block font-bold font-sans">{comp.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Component Detail Output Panel */}
                <div className="lg:col-span-6 bg-slate-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-4 sm:space-y-5 shadow-xs relative">
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-emerald-800 font-mono text-[9px] uppercase tracking-wider bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md">
                    Selected Element Specs
                  </div>

                  <div className="space-y-1">
                    <span className="text-emerald-800 font-mono text-[10px] font-bold uppercase block tracking-widest">
                      {componentDetails[selectedComponent].type}
                    </span>
                    <h3 className="font-sans font-black text-slate-900 text-lg sm:text-2xl leading-tight">
                      {componentDetails[selectedComponent].title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans border-b border-slate-200 pb-3 sm:pb-4">
                    {componentDetails[selectedComponent].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">Sizing Guidelines</span>
                      <p className="text-[11px] text-slate-700 font-sans mt-1 leading-normal">
                        {componentDetails[selectedComponent].sizing}
                      </p>
                    </div>

                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-mono text-amber-600 block font-bold uppercase">Potential Risks</span>
                      <p className="text-[11px] text-slate-700 font-sans mt-1 leading-normal">
                        {componentDetails[selectedComponent].risks}
                      </p>
                    </div>

                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-mono text-emerald-700 block font-bold uppercase">Maintenance Checklist</span>
                      <p className="text-[11px] text-slate-700 font-sans mt-1 leading-normal">
                        {componentDetails[selectedComponent].maintenance}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* General Description Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pt-6 border-t border-slate-100">
              
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div>
                  <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900 tracking-tight">
                    The Triple-Biological Symbiosis
                  </h2>
                  <div className="h-1 w-20 bg-emerald-600 mt-2 rounded-full"></div>
                </div>

                <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-sans">
                  The primary biological challenge in Aquaponics is managing three completely distinct organisms simultaneously: **fish**, **plants**, and **beneficial nitrifying micro-flora**. Each requires specific, conflicting environmental baselines. Successful operation requires continuous compromise.
                </p>

                <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-sans">
                  While fish prefer slightly alkaline conditions, plants absorb nutrients most efficiently in acidic conditions. Nitrifying bacteria, the essential bridge converting toxic ammonia, require a slightly alkaline pH to carry out nitrification efficiently. Our designs focus on the strict compromise point (6.8 to 7.0 pH).
                </p>

                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 sm:p-5 rounded-r-2xl space-y-2">
                  <h4 className="font-sans font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 animate-pulse" />
                    System Dynamics Core
                  </h4>
                  <p className="text-emerald-900 text-xs sm:text-sm leading-relaxed font-sans">
                    In a closed-loop recirculating aquaponics layout, fish excrete Ammonia (NH3) directly. If ammonia rises above 0.5 mg/L, it causes internal bleeding, gill damage, and immediate death in fish. Nitrifying bacteria oxidize this ammonia into Nitrite (also highly toxic), then into Nitrate, which is safe for fish and is actively absorbed as organic fertilizer by the plants.
                  </p>
                </div>
              </div>

              {/* Core Ecosystem Benefits */}
              <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-4 sm:space-y-6">
                <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  Ecosystem Highlights
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Ultra Water Savings</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Saves up to 95% of water compared to traditional soil farming. The only water loss is from plant transpiration and small evaporation cycles.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">No Synthetic Nutrient Salts</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Unlike hydroponics, nutrients are generated organically. Free of heavy sodium build-ups or chemical flushing requirements.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Pragmatic Biosecurity</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Synthetic pest sprays or chemical fish treatments are forbidden (as they kill the opposite side of the loop), leading to naturally organic outputs.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Science / Biochemistry */}
        {activeTab === "science" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
              <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider">The Biochemistry of Recirculation</span>
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">Biochemical Nitrification Mechanics</h2>
              <p className="text-slate-500 text-xs sm:text-sm">Nitrification is an active, oxygen-consuming acidifying reaction. Understanding the chemistry is key to system stability.</p>
            </div>

            {/* Scientific Formulas Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4">
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-150">Reaction Stage 1</span>
                <h4 className="font-sans font-black text-slate-900 text-base sm:text-lg">Ammonia Oxidation (Nitrosomonas)</h4>
                <div className="bg-slate-900 text-emerald-400 p-3 sm:p-4 rounded-xl font-mono text-[11px] sm:text-sm text-center leading-relaxed break-words overflow-x-auto">
                  2NH₄⁺ + 3O₂ → 2NO₂⁻ + 4H⁺ + 2H₂O + Energy
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Ammonia-Oxidizing Bacteria (AOB), primarily <strong>Nitrosomonas</strong>, utilize dissolved oxygen to convert toxic ammonium ions into toxic Nitrites (NO2-). This reaction releases hydrogen protons (H+), continuously driving down the water's pH (acidification).
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4">
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-150">Reaction Stage 2</span>
                <h4 className="font-sans font-black text-slate-900 text-base sm:text-lg">Nitrite Oxidation (Nitrobacter)</h4>
                <div className="bg-slate-900 text-emerald-400 p-3 sm:p-4 rounded-xl font-mono text-[11px] sm:text-sm text-center leading-relaxed break-words overflow-x-auto">
                  2NO₂⁻ + O₂ → 2NO₃⁻ + Energy
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Nitrite-Oxidizing Bacteria (NOB), primarily <strong>Nitrobacter</strong> or <strong>Nitrospira</strong>, oxidize Nitrite (NO2-) into stable, non-toxic Nitrate (NO3-). Nitrates are highly safe for fish up to 120-150 mg/L and serve as the main nitrogen source for plant growth.
                </p>
              </div>
            </div>

            {/* Micro-Nutrient Balance Card */}
            <div className="bg-slate-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-3 sm:space-y-4">
              <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                The Mineral Gap: Micronutrient Deficiencies
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                While fish feed provides major macro-nutrients (Nitrogen, Phosphorus, and trace elements), it lacks critical minerals required for crop growth. These minerals must be supplemented manually. If neglected, plants show rapid deficiencies:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-mono font-bold text-red-600 block">Iron (Fe) Deficiency</span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    Symptoms: Interveinal chlorosis (yellow leaves with dark green veins) on new growth.
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block mt-2">Cure: Supplement with 2 mg/L Chelated Iron (Fe-DTPA if pH is under 7.0; Fe-EDDHA if pH is over 7.0).</span>
                </div>

                <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-mono font-bold text-amber-600 block">Potassium (K) Deficiency</span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    Symptoms: Marginal cupping and scorching (browning of leaf borders) in mature fruiting crops.
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block mt-2">Cure: Buffer system with Potassium Hydroxide (KOH) or foliar spray with Potassium Sulfate.</span>
                </div>

                <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-mono font-bold text-indigo-600 block">Calcium (Ca) Deficiency</span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    Symptoms: Blossom-end rot in tomatoes (black rotting bottoms) and tip burn in crisp lettuces.
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block mt-2">Cure: Buffer with Calcium Hydroxide (hydrated lime Ca(OH)2) directly during pH adjustment cycles.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Detailed System Designs */}
        {activeTab === "designs" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
              <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider">Hydraulic Architecture Sizing</span>
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">Standard Aquaponic Designs</h2>
              <p className="text-slate-500 text-xs sm:text-sm">Select a system type to analyze water turnover requirements, plumbing flow dynamics, and media specifications.</p>
            </div>

            {/* Design selector tabs */}
            <div className="flex overflow-x-auto justify-start sm:justify-center gap-1 border-b border-slate-200 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
              {(["media", "dwc", "nft", "drip"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedDesign(tab)}
                  id={`btn-design-${tab}`}
                  className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans font-bold border-b-2 -mb-px transition-all whitespace-nowrap cursor-pointer ${
                    selectedDesign === tab
                      ? "border-emerald-600 text-emerald-700 font-black"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab === "media" ? "Media-based Bed" : tab === "dwc" ? "Deep Water (DWC)" : tab === "nft" ? "NFT Gully" : "Vertical Tower"}
                </button>
              ))}
            </div>

            {/* Design Specifications Panel */}
            <div className="bg-slate-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="font-sans font-black text-slate-900 text-lg sm:text-2xl leading-none">
                  {systemDesigns[selectedDesign].title}
                </h4>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
                  Turnover: {systemDesigns[selectedDesign].turnover}
                </span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans border-b border-slate-200 pb-3 sm:pb-4">
                {systemDesigns[selectedDesign].desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 bg-emerald-50 rounded-xl border border-emerald-100/80">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block tracking-wider">System Advantages</span>
                  <p className="text-xs text-slate-700 font-sans mt-1 leading-normal">{systemDesigns[selectedDesign].pros}</p>
                </div>
                <div className="p-3.5 sm:p-4 bg-amber-50 rounded-xl border border-amber-100/80">
                  <span className="text-[10px] font-mono font-bold text-amber-800 uppercase block tracking-wider">Limitations / Risks</span>
                  <p className="text-xs text-slate-700 font-sans mt-1 leading-normal">{systemDesigns[selectedDesign].cons}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
                <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Hydraulic Loop Mode</span>
                  <span className="text-xs font-sans font-extrabold text-slate-800 block mt-1">{systemDesigns[selectedDesign].hydroFlow}</span>
                </div>
                <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Required Media Specs</span>
                  <span className="text-xs font-sans font-extrabold text-slate-800 block mt-1">{systemDesigns[selectedDesign].mediaSpecs}</span>
                </div>
                <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Recommended Sump Volume</span>
                  <span className="text-xs font-sans font-extrabold text-slate-800 block mt-1">Minimum 25% of total grow bed water capacity.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Detailed Comparison Matrix */}
        {activeTab === "comparison" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <TechnologyComparison activeTech="aquaponics" />
          </div>
        )}

        {/* Tab 5: Carry Capacity Sandbox & Sizing Calculators */}
        {activeTab === "sandbox" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
              <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider">Dynamic Biomicrobial Sizing Modeling</span>
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">Biomass, Siphon, & Media Balancer</h2>
              <p className="text-slate-500 text-xs sm:text-sm">Tune biological and hardware inputs to calculate exact carrying capacities, siphon triggers, and biofiltration volumes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Sizing Selector List */}
              <div className="lg:col-span-5 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-5 sm:space-y-6">
                
                {/* Calculator 1: Biomass / Plant ratio */}
                <div className="space-y-3 sm:space-y-4 border-b border-slate-100 pb-4 sm:pb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs font-mono">C1</div>
                    <h3 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">UVI Feeding Ratio Calculator</h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Fish Count (Stocked)</label>
                      <input
                        type="number"
                        value={fishCount}
                        onChange={(e) => setFishCount(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 animate-pulse-once"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Avg Weight (g)</label>
                        <input
                          type="number"
                          value={avgFishWeight}
                          onChange={(e) => setAvgFishWeight(Math.max(1, Number(e.target.value)))}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Feeding (% Body Wt)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={feedRatePercent}
                          onChange={(e) => setFeedRatePercent(Math.max(0.1, Number(e.target.value)))}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Plant Crop Density</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                        <button
                          type="button"
                          onClick={() => setCropCategory("leafy")}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-sans transition-all cursor-pointer ${
                            cropCategory === "leafy"
                              ? "bg-emerald-600 border-emerald-600 text-white font-bold"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          🥬 Leafy Greens (22g/m²)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCropCategory("fruiting")}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-sans transition-all cursor-pointer ${
                            cropCategory === "fruiting"
                              ? "bg-emerald-600 border-emerald-600 text-white font-bold"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          🍅 Fruiting Crops (60g/m²)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculator 2: Bell Siphon sizing */}
                <div className="space-y-3 sm:space-y-4 border-b border-slate-100 pb-4 sm:pb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs font-mono">C2</div>
                    <h3 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">Bell Siphon Hydraulics</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Length (m)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={growBedLength}
                        onChange={(e) => setGrowBedLength(Math.max(0.1, Number(e.target.value)))}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Width (m)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={growBedWidth}
                        onChange={(e) => setGrowBedWidth(Math.max(0.1, Number(e.target.value)))}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Depth (m)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={growBedDepth}
                        onChange={(e) => setGrowBedDepth(Math.max(0.1, Number(e.target.value)))}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Media Void Space (%)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={mediaVoidRatio}
                        onChange={(e) => setMediaVoidRatio(Math.max(0.1, Math.min(1.0, Number(e.target.value))))}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Fill Target (Minutes)</label>
                      <input
                        type="number"
                        value={fillTimeTarget}
                        onChange={(e) => setFillTimeTarget(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculator 3: Biofilter Nitrification */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs font-mono">C3</div>
                    <h3 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">Biofilter SSA Estimator</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Daily Feed Input (g)</label>
                      <input
                        type="number"
                        value={dailyFeedGramsInput}
                        onChange={(e) => setDailyFeedGramsInput(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Feed Protein (%)</label>
                      <input
                        type="number"
                        value={feedProteinPercent}
                        onChange={(e) => setFeedProteinPercent(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Sizing Outputs Display Column */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                
                {/* UVI Output Card */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-mono text-emerald-800 font-bold uppercase tracking-wider block">
                      ✔ C1 Output: Symbiotic plant capacity
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-mono">UVI Standards</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Total Fish Weight</span>
                      <h4 className="text-xl sm:text-2xl font-mono font-black text-slate-900 mt-1">{totalBiomassKg.toFixed(2)} kg</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Biomass generated.</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Calculated Daily Feed</span>
                      <h4 className="text-xl sm:text-2xl font-mono font-black text-slate-900 mt-1">{dailyFeedGrams.toFixed(1)} grams</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Organic nutrient feed rate.</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Supported Crops</span>
                      <h4 className="text-xl sm:text-2xl font-mono font-black text-emerald-700 mt-1">{estimatedPlantsSupported} Plants</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Approx. {supportedAreaM2.toFixed(1)} m² area.</p>
                    </div>
                  </div>
                </div>

                {/* Bell Siphon Output Card */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-mono text-emerald-800 font-bold uppercase tracking-wider block">
                      ✔ C2 Output: Bed water dynamics
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-mono">Siphon Mechanics</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Water Volume of Media Bed</span>
                      <h4 className="text-xl sm:text-2xl font-mono font-black text-slate-900 mt-1">{actualWaterVolumeLiters.toFixed(1)} Liters</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Accounting for {mediaVoidRatio * 100}% void spaces.</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Required Pump Flow Rate</span>
                      <h4 className="text-xl sm:text-2xl font-mono font-black text-emerald-700 mt-1">{flowRateRequiredLph.toFixed(0)} L/hour</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Needed to flood bed in {fillTimeTarget} mins.</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    <div><strong>Recommended Plumbing Sizing:</strong></div>
                    <div className="font-sans text-[11px] mt-0.5">Standpipe: <span className="font-mono text-xs font-bold text-slate-800">{recommendedStandpipeDiameter}</span></div>
                    <div className="font-sans text-[11px]">Siphon Bell: <span className="font-mono text-xs font-bold text-slate-800">{recommendedBellDiameter}</span></div>
                  </div>
                </div>

                {/* Biofilter Nitrification Output Card */}
                <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-md space-y-3 sm:space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
                  
                  <div className="flex justify-between items-center border-b border-emerald-900 pb-3">
                    <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest font-bold block">
                      ✔ C3 Output: Nitrification sizing
                    </span>
                    <span className="text-[9px] bg-emerald-900/80 border border-emerald-800 text-emerald-300 px-2.5 py-0.5 rounded-md font-mono">Biofilter Sizer</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-emerald-300 uppercase block">Daily TAN Ammonia Produced</span>
                      <h3 className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">{dailyTanGrams.toFixed(2)} grams</h3>
                      <p className="text-[11px] text-emerald-100/80 leading-normal">Total Ammonia Nitrogen exuded.</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-emerald-300 uppercase block">Required Bio-Media Volume</span>
                      <h3 className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">{requiredMediaVolumeLiters.toFixed(1)} Liters</h3>
                      <p className="text-[11px] text-emerald-100/80 leading-normal">Assuming {biofilterMediaSSA} m²/m³ carrier SSA.</p>
                    </div>
                  </div>

                  <div className="border-t border-emerald-800 pt-3 text-xs font-sans text-emerald-100 leading-relaxed">
                    <strong>Nitrification Sizing Guideline:</strong> Nitrifying bacteria require approximately <strong>2.0 to 3.0 m² of colonized surface area</strong> per gram of daily fish protein feed to prevent dangerous, toxic chemical build-ups.
                  </div>
                </div>

              </div>

            </div>

            {/* Species Compatibility Matrix */}
            <div className="space-y-3 sm:space-y-4 pt-6 border-t border-slate-100">
              <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg">Biomicrobial Species Database</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {suitableSpecies.map((species, idx) => (
                  <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-base sm:text-lg font-sans font-black text-slate-800 leading-tight">{species.name}</span>
                      <span className={`text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-full shrink-0 ${
                        species.type === "Fish" ? "bg-blue-50 text-blue-800 border border-blue-100" : "bg-emerald-50 text-emerald-800 border border-emerald-100"
                      }`}>
                        {species.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-mono pt-1">
                      <div>
                        <span className="text-xs text-slate-500 block font-bold uppercase">Temperature Range</span>
                        <span className="text-slate-800 font-bold">{species.temp}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block font-bold uppercase">Ideal pH Range</span>
                        <span className="text-slate-800 font-bold">{species.ph}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-base leading-relaxed pt-3 border-t border-slate-100 font-sans">
                      {species.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Recirculation Setup Guide */}
        {activeTab === "guide" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Getting Started Loop */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div>
                  <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900 tracking-tight">Starting Your First Recirculating Loop</h2>
                  <div className="h-1 w-20 bg-emerald-600 mt-2 rounded-full"></div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {startupSteps.map((step) => (
                    <div key={step.step} className="flex gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold font-mono text-xs sm:text-sm shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">{step.title}</h4>
                        <p className="text-slate-500 text-xs sm:text-sm mt-0.5 leading-relaxed font-sans">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges Panel */}
              <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-4 sm:space-y-6">
                <div className="space-y-1.5">
                  <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" />
                    Critical Biological Challenges
                  </h3>
                  <div className="h-0.5 w-16 bg-amber-500 rounded-full"></div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  While aquaponics offers unmatched water conservation, managing a dual aquatic-vegetative system demands absolute balance. You must maintain continuous mechanical and chemical fail-safes.
                </p>

                <div className="bg-amber-50/60 p-3.5 sm:p-4 rounded-xl border border-amber-200/50 space-y-2.5 sm:space-y-3">
                  <h4 className="text-amber-800 font-sans font-bold text-xs uppercase tracking-wider font-mono">Key Operational Hurdles:</h4>
                  <ul className="text-slate-600 text-xs space-y-2 list-disc pl-4 font-sans">
                    <li><strong>Upfront Capital Expenses:</strong> Dual infrastructure costs (nursery fish tanks, high-surface-area filtration media, pump networks, linear siphons, LED arrays) are high.</li>
                    <li><strong>Continuous Electrical Reliance:</strong> Water circulation and air diffusers are electric. Any power outage over 1 hour results in total fish death due to lack of oxygen.</li>
                    <li><strong>The Dual Treatment Limit:</strong> Conventional fish medications (like copper sulphate or salt baths) will immediately poison your vegetable crop. Similarly, crop pesticides will immediately kill the fish stock.</li>
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-3 sm:pt-4">
                  <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Design Conclusion</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-normal font-sans">
                    By coordinating Nitrobacter microbial biological cycles, aquaponics completely replaces synthetic nutrient reliance, yielding safe, chemical-free food from a highly engineered closed loop.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 7: Frequently Asked Questions & Biological Troubleshooting */}
        {activeTab === "faq" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
              <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider">Troubleshooting & Biosecurity</span>
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">Aquaponics Diagnostic Manual</h2>
              <p className="text-slate-500 text-xs sm:text-sm">Expert guidelines for resolving biological, chemical, and hardware failures inside closed recirculating loops.</p>
            </div>

            {/* Accordion List */}
            <div className="max-w-4xl mx-auto space-y-2.5 sm:space-y-3">
              {[
                {
                  q: "What do I do if my system's ammonia level climbs above 1.0 mg/L (Ammonia Spike)?",
                  a: "Stop feeding the fish immediately. Feed is the root source of all ammonia. Increase aeration to maximum capacity to support bacteria activity and fish respiration. Add high-quality nitrifying bacteria culture directly to your biofilter. Test pH (if pH is above 7.6, ammonia is extremely toxic; lowering pH towards 6.8 minimizes toxicity). Perform small 15% water exchanges if levels threaten to surpass 2.0 mg/L."
                },
                {
                  q: "How can I combat plant pests (Aphids, Spider Mites) without killing my fish?",
                  a: "Standard chemical insecticides are strictly forbidden as they dissolve in the recirculated water and kill fish stocks. Use physical exclusion nets, high-pressure water sprays to mechanically dislodge insects, or release biological predators like Ladybugs or lacewings. For severe infestations, apply organic Neem oil or potassium silicate sprays purely onto the foliage during evening hours, avoiding any spray contact with the water surface."
                },
                {
                  q: "How do I treat fish illnesses (like Fin Rot or White Spot Ich) in an aquaponic loop?",
                  a: "Do not add chemicals directly to the main system. Isolate the affected fish into a separate quarantine/hospital tank. There, they can be safely treated with salt baths (5g/L), copper sulfate, or formalins. Return fish to the system only after completing the quarantine treatment and full freshwater rinsing."
                },
                {
                  q: "My bell siphon is trickling constantly and refuses to flush. What is wrong?",
                  a: "This is a classic 'siphon lock-up'. It occurs when the incoming water flow from the pump is too slow to trigger the vacuum, or the drainage standpipe has air leaks. To resolve: slightly increase the water pump flow rate, ensure the standpipe diameter is not too wide, or adjust the siphon bell dome to sit exactly 1.5cm above the gravel bottom. Ensure a clean airtight seal on the top breather lines."
                },
                {
                  q: "Why is pH so critical in aquaponics, and what is the target compromised point?",
                  a: "pH regulates chemical bioavailability. Plants prefer acidic pH (5.5 - 6.2) for maximum mineral absorption. Fish demand slightly alkaline pH (7.2 - 8.0) for blood buffering. Nitrifying bacteria demand slightly alkaline pH (7.5 - 8.2) for carbonaceous energy processing. Thus, we maintain a strict compromised pH target of 6.8 to 7.0. Adjust pH up using calcium hydroxide or potassium hydroxide, and adjust down using food-grade phosphoric acid."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left px-3.5 sm:px-5 py-3 sm:py-4 font-sans font-bold text-slate-800 text-xs sm:text-base flex items-center justify-between transition-colors hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Embedded Educational YouTube Resources */}
            <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8 border-t border-slate-150 max-w-4xl mx-auto">
              <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800 fill-emerald-800 shrink-0" />
                Educational Video Library
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">Explore specialized video instructions on bell siphon construction, biological cycling, and media bed setups.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-2 sm:space-y-3">
                  <div className="relative aspect-video bg-slate-100">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Bell Siphon Troubleshooting"
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-3 sm:p-4 space-y-1">
                    <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Bell Siphon Troubleshooting: Constant Flow Fixes</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">Fix suction problems, water flow rates, and seal issues causing siphons to trickle constantly.</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-2 sm:space-y-3">
                  <div className="relative aspect-video bg-slate-100">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Aquaponics Media Setup"
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-3 sm:p-4 space-y-1">
                    <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Aquaponics Grow Bed Media: Clay vs Gravel</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">Detailed analysis of expanded clay pebbles (hydroton), river gravel, and lava rock for biological surface area.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* YouTube Guide Carousel Slider Section */}
      <div 
        id="youtube-aquaponics-slider" 
        className="bg-gradient-to-b from-slate-50 to-emerald-50/20 border-t border-b border-slate-200/60 py-8 sm:py-16 px-3 sm:px-6 lg:px-8 mt-10 sm:mt-16 -mx-3 sm:mx-0"
        onMouseEnter={() => setIsVideosHovered(true)}
        onMouseLeave={() => setIsVideosHovered(false)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </span>
                <span className="text-emerald-800 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Aquaponics Masterclasses
                </span>
              </div>
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900 tracking-tight">
                Aquaponic Viral Ideas
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Explore 20 viral ideas, plumbing walk-throughs, and biological siphon masterclasses.
              </p>
            </div>

            {/* Sorting & Filter Controls */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowViralOnly(!showViralOnly)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  showViralOnly
                    ? "bg-emerald-800 text-white border-emerald-800 shadow-md scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:border-emerald-200"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Only Viral (100K+ views)
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollVideos("left")}
                  className="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollVideos("right")}
                  className="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrolling Grid */}
          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsVideosHovered(true)}
            onMouseLeave={() => setIsVideosHovered(false)}
            onTouchStart={() => setIsVideosHovered(true)}
            onTouchEnd={() => setIsVideosHovered(false)}
            className="flex gap-3 sm:gap-6 overflow-x-auto pb-4 pt-1 scrollbar-thin select-none animate-fade-in"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", scrollBehavior: "auto" }}
          >
            {(() => {
              const displayedVideos = showViralOnly ? aquaponicsVideos.filter(isVideoViral) : aquaponicsVideos;
              const listToRender = displayedVideos.length > 0 ? displayedVideos : aquaponicsVideos;
              return [...listToRender, ...listToRender].map((video, index) => (
                <div 
                  key={`${video.id}-aqua-clone-${index}`} 
                  className="w-[240px] xs:w-[270px] sm:w-[320px] shrink-0"
                >
                  <VideoCard 
                    video={video} 
                    onVideoClick={(v) => {
                      if (onVideoClick) {
                        onVideoClick(v);
                      }
                    }} 
                  />
                </div>
              ));
            })()}
          </div>
        </div>
      </div>

        </div>
        <div className="hidden xl:block shrink-0 sticky top-20">
          <RightSidebarAd reloadKey="aquaponics-sidebar-ad" />
        </div>
      </div>
    </div>
  );
}
