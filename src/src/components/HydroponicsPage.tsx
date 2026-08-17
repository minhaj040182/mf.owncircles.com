import React, { useState, useEffect, useRef } from "react";
import { 
  Sprout, Calculator, Info, Compass, CheckCircle2, 
  Sliders, Layers, RefreshCw, Sparkles, Activity, 
  AlertTriangle, ShieldAlert, Thermometer, Gauge, Settings, BookOpen, Check,
  Droplet, Plus, Trash2, Search, Download, FileText, Calendar, Clock,
  ChevronLeft, ChevronRight, ThumbsUp, Flame
} from "lucide-react";
import { Video } from "../types";
import VideoCard from "./VideoCard";
import { fetchYouTubeChannelVideos, fetchTrendingTopicVideos } from "../youtubeFeed";
import TechnologyComparison from "./TechnologyComparison";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

// Check if a video is considered "viral" or highly viewed
const isVideoViral = (v: Video) => {
  const viewsStr = v.views.toLowerCase();
  if (viewsStr.includes("m")) return true;
  const num = parseFloat(viewsStr);
  if (!isNaN(num) && num >= 50) return true;
  return false;
};

// Static fallbacks for Hydroponic masterclass YouTube videos
const STATIC_HYDROPONIC_VIDEOS: Video[] = [
  {
    id: "hydro-yt-1",
    title: "Hydroponics for Beginners: Complete Step-by-Step DWC Setup",
    description: "Learn how to build a high-performance Deep Water Culture system at home. We detail reservoir selection, air stone placement, net pots, and seedling transplantation.",
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/3Ww2TP_tU7o",
    duration: "18:30",
    views: "340K views",
    type: "youtube",
    creator: "Grower's Network",
    publishDate: "2 months ago",
    category: "Hydroponics",
    likes: 12500
  },
  {
    id: "hydro-yt-2",
    title: "DIY Nutrient Film Technique (NFT) Lettuce Channel Build",
    description: "How to level and construct custom sloped PVC channels for optimal nutrient film flow rate. Includes reservoir plumbing, siphon controls, and harvesting schedules.",
    thumbnail: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/7mN8_yS_xZ8",
    duration: "14:15",
    views: "210K views",
    type: "youtube",
    creator: "Hydroponic Engineers",
    publishDate: "1 month ago",
    category: "Hydroponics",
    likes: 8400
  },
  {
    id: "hydro-yt-3",
    title: "Mixing 3-Part Masterblend Hydroponic Nutrient Solution",
    description: "A clinical walkthrough of mixing Masterblend 4-18-38, Magnesium Sulfate (Epsom Salt), and Calcium Nitrate without causing nutrient lockout or chemical precipitation.",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/v9b_QvCAnC8",
    duration: "11:50",
    views: "95K views",
    type: "youtube",
    creator: "Master Nutrient Labs",
    publishDate: "3 weeks ago",
    category: "Hydroponics",
    likes: 3100
  },
  {
    id: "hydro-yt-4",
    title: "Indoor Aeroponics Misting Interval & High Pressure Calibration",
    description: "Achieve explosive root growth and double your cloning speeds. Learn how to configure digital cycle timers, misting nozzle microns, and high-pressure pumps.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/k8UuP8vI130",
    duration: "16:25",
    views: "180K views",
    type: "youtube",
    creator: "Aeroponic Lab",
    publishDate: "4 months ago",
    category: "Hydroponics",
    likes: 6200
  },
  {
    id: "hydro-yt-5",
    title: "Passive Wicking Systems: Soil-less Herbs in Your Kitchen",
    description: "No electricity? No problem. This step-by-step guide demonstrates how to design a completely passive wick system utilizing capillary action for continuous root moisture.",
    thumbnail: "https://images.unsplash.com/photo-1516715094727-ec48be335d79?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/u0F7fD4O-7I",
    duration: "12:05",
    views: "145K views",
    type: "youtube",
    creator: "Homestead Hydroponics",
    publishDate: "5 months ago",
    category: "Hydroponics",
    likes: 4900
  },
  {
    id: "hydro-yt-6",
    title: "Supercharging Root Oxygen with H2O2 in Hydroponics",
    description: "Learn why adding highly diluted food-grade hydrogen peroxide prevents root rot, sterilizes pathogens, and boosts root zone oxygenation.",
    thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/fK_AclwM-9k",
    duration: "08:45",
    views: "120K views",
    type: "youtube",
    creator: "Science of Roots",
    publishDate: "1 month ago",
    category: "Water Quality",
    likes: 4200
  },
  {
    id: "hydro-yt-7",
    title: "Kratky Method vs. Active DWC: Lettuce Growth Comparison",
    description: "A side-by-side comparison of active Deep Water Culture vs completely passive Kratky method over a 35-day grow cycle.",
    thumbnail: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/H6Uo4W_YmY4",
    duration: "22:15",
    views: "580K views",
    type: "youtube",
    creator: "Hydroponic Labs",
    publishDate: "2 months ago",
    category: "Hydroponics",
    likes: 18000
  },
  {
    id: "hydro-yt-8",
    title: "Setting Up Your First Dutch Bucket System for Tomatoes",
    description: "Build a highly productive Dutch Bucket system with siphon return drains, perfect for heavy vining crops like cucumbers and tomatoes.",
    thumbnail: "https://images.unsplash.com/photo-1558905619-172530a2701b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/26xpMCXP9W0",
    duration: "19:40",
    views: "290K views",
    type: "youtube",
    creator: "Vine Crop Engineers",
    publishDate: "3 months ago",
    category: "Hydroponics",
    likes: 11000
  },
  {
    id: "hydro-yt-9",
    title: "How to Clean and Sanitize Your System Between Crops",
    description: "Eliminate algae, pythium, and heavy mineral salt buildup using organic citric acid flushes and hydrogen peroxide sanitizing sweeps.",
    thumbnail: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/qS6A3N8Xvto",
    duration: "11:15",
    views: "85K views",
    type: "youtube",
    creator: "Hygiene Farms",
    publishDate: "3 weeks ago",
    category: "Water Quality",
    likes: 3500
  },
  {
    id: "hydro-yt-10",
    title: "Optimal LED Grow Light Spectrum and PPFD for Greens",
    description: "Understand micromoles, PAR, PPFD, and lighting photoperiod schedules for microgreens, butterhead lettuce, and culinary herbs.",
    thumbnail: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/mCg9_nZ9bS0",
    duration: "15:50",
    views: "210K views",
    type: "youtube",
    creator: "Photon Tech Labs",
    publishDate: "1 month ago",
    category: "Hydroponics",
    likes: 8900
  },
  {
    id: "hydro-yt-11",
    title: "Ebb and Flow (Flood and Drain) DIY System Guide",
    description: "Construct a durable flood tray setup using expanded clay pebbles, simple siphon fittings, and digital timer-controlled pumps.",
    thumbnail: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/K6V86n8N9w0",
    duration: "13:20",
    views: "175K views",
    type: "youtube",
    creator: "DIY Hydro Growers",
    publishDate: "5 months ago",
    category: "Hydroponics",
    likes: 5400
  },
  {
    id: "hydro-yt-12",
    title: "Managing Reservoir Water Temp: Chiller vs. Insulation",
    description: "Avoid pythium root rot. Learn why keeping your water between 18°C and 21°C is absolutely critical for stable nutrient absorption.",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/5T7C0lG1S8w",
    duration: "10:35",
    views: "140K views",
    type: "youtube",
    creator: "Climate Control Farms",
    publishDate: "4 months ago",
    category: "Water Quality",
    likes: 4900
  },
  {
    id: "hydro-yt-13",
    title: "pH Drift Explained: Why Your Nutrient pH Rises Daily",
    description: "Explore the biochemistry of ion absorption and find out how plants drinking nitrates triggers a natural rise in reservoir pH.",
    thumbnail: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/fK_AclwM-9k",
    duration: "14:10",
    views: "95K views",
    type: "youtube",
    creator: "Plant Chemists",
    publishDate: "2 weeks ago",
    category: "Water Quality",
    likes: 3100
  },
  {
    id: "hydro-yt-14",
    title: "Hydroponic Strawberries: NFT vs Vertical Tower Yields",
    description: "Compare vertical zip towers and flat NFT channels for sweet, high-sugar winter strawberries in tight spaces.",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/H6Uo4W_YmY4",
    duration: "18:55",
    views: "430K views",
    type: "youtube",
    creator: "Vertical Farm Tech",
    publishDate: "6 months ago",
    category: "Hydroponics",
    likes: 19500
  },
  {
    id: "hydro-yt-15",
    title: "Foliar Feeding Hacks: Spraying Calcium and Silica",
    description: "Prevent leaf tipburn in romaine and powdery mildew in English cucumbers by spraying organic mineral solutions directly onto leaves.",
    thumbnail: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/26xpMCXP9W0",
    duration: "12:15",
    views: "112K views",
    type: "youtube",
    creator: "Greenhouse Tech Hub",
    publishDate: "3 months ago",
    category: "Hydroponics",
    likes: 4100
  },
  {
    id: "hydro-yt-16",
    title: "Growing Microgreens for Profit in a 1020 Tray Setup",
    description: "A complete walkthrough of planting densities, blackout dome schedules, and rapid harvesting techniques for organic sunflower and radish greens.",
    thumbnail: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/qS6A3N8Xvto",
    duration: "21:30",
    views: "850K views",
    type: "youtube",
    creator: "Acre Growers",
    publishDate: "7 months ago",
    category: "Hydroponics",
    likes: 38000
  },
  {
    id: "hydro-yt-17",
    title: "Automatic Nutrient Dosing with Raspberry Pi",
    description: "Automate EC, TDS, and pH corrections using low-cost pH probes, peristaltic pump shields, and open-source python scripts.",
    thumbnail: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/mCg9_nZ9bS0",
    duration: "25:40",
    views: "340K views",
    type: "youtube",
    creator: "Automation Pioneers",
    publishDate: "9 months ago",
    category: "Hydroponics",
    likes: 12500
  },
  {
    id: "hydro-yt-18",
    title: "Recognizing Nutrient Deficiencies: N, Ca, and Fe",
    description: "Zoom in on leaf veins to identify early-stage chlorosis, interveinal necrosis, and calcium tipburn symptoms immediately.",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/K6V86n8N9w0",
    duration: "16:05",
    views: "195K views",
    type: "youtube",
    creator: "Plant Chemists",
    publishDate: "8 months ago",
    category: "Water Quality",
    likes: 7200
  },
  {
    id: "hydro-yt-19",
    title: "DIY Vertical Hydroponic Rain Tower (PVC Pipe Hack)",
    description: "Drill 2-inch pot holes in a heavy-duty PVC conduit to construct a high-density vertical tower fed by an internal sprinkler line.",
    thumbnail: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/5T7C0lG1S8w",
    duration: "14:45",
    views: "1.2M views",
    type: "youtube",
    creator: "DIY Hydro Growers",
    publishDate: "1 year ago",
    category: "Hydroponics",
    likes: 45000
  },
  {
    id: "hydro-yt-20",
    title: "Commercial Hydroponics: Scaling to a 10K Head NFT Farm",
    description: "Tour a commercial lettuce and leafy green NFT greenhouse, analyzing setup costs, packing lines, and crop turnaround schedules.",
    thumbnail: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/fK_AclwM-9k",
    duration: "32:10",
    views: "640K views",
    type: "youtube",
    creator: "Acre Growers",
    publishDate: "11 months ago",
    category: "Hydroponics",
    likes: 29000
  }
];

// Initial components required list as described in the user prompt
const REQUIRED_COMPONENTS_DATA = [
  { id: "comp-1", name: "Deep Water Culture (DWC) Setup", desc: "Floating raft boards, net pots, and seedling inserts.", category: "System Specifics", required: true },
  { id: "comp-2", name: "Nutrient Film Technique (NFT) Channels", desc: "Sloped PVC grow channels with custom pre-drilled holes.", category: "System Specifics", required: true },
  { id: "comp-3", name: "Media-Based Grow Bed", desc: "Sturdy flood trays filled with clay pebbles or perlite growing media.", category: "System Specifics", required: true },
  { id: "comp-4", name: "Insulated Shed / Building", desc: "Provides absolute biosecurity and environmental temperature containment.", category: "Infrastructure", required: true },
  { id: "comp-5", name: "Store cum Office for Feed & Accessories", desc: "Dry, climate-controlled zone to inventory mineral salts and electrical kits.", category: "Infrastructure", required: true },
  { id: "comp-6", name: "Pump House", desc: "Secure housing shield for high-pressure irrigation and distribution pumps.", category: "Infrastructure", required: true },
  { id: "comp-7", name: "Pumps and Motors", desc: "Water distribution pumps, high-volume plumbing motors.", category: "Mechanicals", required: true },
  { id: "comp-8", name: "Power Generator", desc: "Emergency backup power unit to prevent rapid root desiccation during outages.", category: "Mechanicals", required: true },
  { id: "comp-9", name: "Electrification Systems", desc: "Waterproof electrical boards, safety GFCIs, timers, and ambient wiring.", category: "Mechanicals", required: true },
  { id: "comp-10", name: "Automatic Feeder (Optional)", desc: "Schedules delivery of nutritional additives or biological dosing if automated.", category: "Automation", required: false },
  { id: "comp-11", name: "Aeration System & CO2 Degasser", desc: "High-volume air blowers, oxygen diffusers, and carbon dioxide stripping columns.", category: "Automation", required: true },
  { id: "comp-12", name: "Water Testing Kit", desc: "Precise pH meters, EC/TDS probes, and calibration solutions (pH 4.0 & 7.0).", category: "Monitoring", required: true }
];

interface HydroponicsPageProps {
  onVideoClick?: (video: Video) => void;
  onBackToDashboard?: () => void;
}

export default function HydroponicsPage({ onVideoClick, onBackToDashboard }: HydroponicsPageProps) {
  // Navigation & Tabs State
  const [activeTab, setActiveTab] = useState<"overview" | "systems" | "matrix" | "components" | "feasibility">("overview");

  // Calculator States
  const [reservoirVolume, setReservoirVolume] = useState<number>(100); // Liters
  const [targetPpm, setTargetPpm] = useState<number>(1000); // PPM

  // Calculations for Masterblend formula
  const ppmFactor = targetPpm / 1000;
  const totalVolumeGallons = reservoirVolume / 3.785;

  const masterblendGrams = 2.4 * totalVolumeGallons * ppmFactor;
  const calciumNitrateGrams = 2.4 * totalVolumeGallons * ppmFactor;
  const epsomSaltGrams = 1.2 * totalVolumeGallons * ppmFactor;

  // Active crop selection state
  const [selectedCrop, setSelectedCrop] = useState<string>("Lettuce");

  // Selected hydroponic system details state
  const [selectedSystem, setSelectedSystem] = useState<"dwc" | "nft" | "drip" | "aeroponics" | "wick">("dwc");

  // Components Checklist State
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  // YouTube Videos State
  const [hydroVideos, setHydroVideos] = useState<Video[]>(STATIC_HYDROPONIC_VIDEOS);
  const [showViralOnly, setShowViralOnly] = useState<boolean>(false);
  const [isVideosHovered, setIsVideosHovered] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);

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

  // Load dynamic YouTube Videos
  useEffect(() => {
    async function loadDynamicHydroVideos() {
      try {
        const [channelVids, trendingVids] = await Promise.all([
          fetchYouTubeChannelVideos().catch(() => []),
          fetchTrendingTopicVideos(false, "hydroponic farming system NFT DWC soilless viral").catch(() => [])
        ]);

        const combined = [...channelVids, ...trendingVids];
        if (combined.length > 0) {
          const filtered = combined.filter(v => {
            const titleLower = (v.title || "").toLowerCase();
            const descLower = (v.description || "").toLowerCase();
            const catLower = (v.category || "").toLowerCase();

            return (
              catLower === "hydroponics" || 
              titleLower.includes("hydroponic") || 
              titleLower.includes("soilless") ||
              titleLower.includes("nutrient") || 
              titleLower.includes("nft") ||
              titleLower.includes("dwc") ||
              descLower.includes("hydroponic")
            );
          });

          if (filtered.length > 0) {
            setHydroVideos(prev => {
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
        console.error("Error loading Hydroponics YouTube videos:", err);
      }
    }
    loadDynamicHydroVideos();
  }, []);

  const handleToggleChecklist = (id: string) => {
    setChecklist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  const cropGuidelines = [
    { name: "Lettuce", ph: "5.5 - 6.0", ec: "1.2 - 1.8", ppm: "600 - 900", temp: "16°C - 22°C", notes: "Prefers cooler temperatures. High heat triggers bolting (bitter seed stalks)." },
    { name: "Basil", ph: "5.6 - 6.2", ec: "1.4 - 2.2", ppm: "700 - 1100", temp: "20°C - 26°C", notes: "Thrives in warm, brightly lit environments. Requires heavy nitrogen during vegetative stage." },
    { name: "Tomato", ph: "6.0 - 6.5", ec: "2.0 - 3.5", ppm: "1200 - 1800", temp: "18°C - 25°C", notes: "Heavy feeder. Requires high levels of Potassium (K) and Calcium (Ca) once fruit clusters form." },
    { name: "Strawberry", ph: "5.5 - 6.2", ec: "1.0 - 1.6", ppm: "500 - 800", temp: "15°C - 20°C", notes: "Fragile root systems sensitive to high salt accumulation. Keep electrical conductivity (EC) low." },
    { name: "Cucumber", ph: "5.8 - 6.2", ec: "1.8 - 2.4", ppm: "900 - 1200", temp: "20°C - 28°C", notes: "Grows very rapidly. Demands high water volume and consistent magnesium/iron ratios." }
  ];

  const currentCropInfo = cropGuidelines.find(c => c.name === selectedCrop) || cropGuidelines[0];

  const hydroponicSystems = {
    dwc: {
      title: "Deep Water Culture (DWC)",
      desc: "In this system, plant roots are suspended directly in a reservoir filled with a highly oxygenated, nutrient-rich mineral solution. An active air pump and air stones supply continuous oxygen so roots do not drown.",
      suitability: "Best for leafy greens, lettuce, herbs, and fast-growing vegetative crops.",
      difficulty: "Very Easy (Perfect for beginners)",
      components: "Reservoir tank, floating raft, air pump, air stone, net pots, grow medium."
    },
    nft: {
      title: "Nutrient Film Technique (NFT)",
      desc: "Plants are held in net pots along slightly sloped, horizontal channels. A water pump constantly circulates a highly shallow stream (a 'film') of nutrient solution down the channel, flowing directly over the bare tip of the roots.",
      suitability: "Highly suited for smaller, short-term crops like lettuce, spinach, and strawberries.",
      difficulty: "Medium (Requires careful channel leveling)",
      components: "Sloped channels, water pump, nutrient reservoir, return drain plumbing, feed lines."
    },
    drip: {
      title: "Drip System",
      desc: "An active system where nutrient solution is pumped from a reservoir and delivered directly to the base of each individual plant through small drip lines and emitters. Excess runoff can either be recycled (recovery) or discarded (non-recovery).",
      suitability: "Extremely versatile. Best for large, long-term fruiting plants like tomatoes, cucumbers, peppers, and eggplants.",
      difficulty: "Medium",
      components: "Nutrient reservoir, water pump, drip tubes, drip emitters, timer, grow pots."
    },
    aeroponics: {
      title: "Aeroponic Cultivation",
      desc: "In aeroponics, plant roots are suspended in the air inside a sealed chamber. A high-pressure water pump mists the roots with a nutrient solution at regular intervals, maximizing oxygen and water absorption.",
      suitability: "Excellent for cloning, potato seed production, and extreme growth speed.",
      difficulty: "Hard (Highly technical, misting nozzles can clog easily)",
      components: "High-pressure pump, misting nozzles, root chamber, digital timer, reservoir."
    },
    wick: {
      title: "Wicking System",
      desc: "A completely passive hydroponic method requiring no water or air pumps. Plants sit in a grow medium above the reservoir, and draw up nutrient solution through a fibrous wick (like cotton or felt) using capillary action.",
      suitability: "Best for small house plants, simple microgreens, or classroom science experiments.",
      difficulty: "Very Easy (No mechanical failure risks)",
      components: "Grow tray, reservoir, wicking cords, porous grow medium."
    }
  };

  const startupSteps = [
    { step: "1", title: "Choose Your System", detail: "Decide on the system type that fits your space, budget, and crops. For beginners, a Deep Water Culture (DWC) or a simple passive wick system is highly recommended." },
    { step: "2", title: "Select Your Plants", detail: "Leafy greens (lettuce, spinach), herbs (basil, mint), and strawberries are excellent starting crops. Advanced growers can transition to tomatoes or cucumbers." },
    { step: "3", title: "Set Up the Hardware", detail: "Assemble your reservoir, grow trays or channels, and connect the water/air pumps. If growing indoors, set up dedicated full-spectrum LED lighting to mimic sunlight." },
    { step: "4", title: "Mix the Nutrient Solution", detail: "Add clean water to your reservoir, and mix dry or liquid mineral nutrients (like the 3-part Masterblend formula) carefully. Adjust pH using a tester to the optimal range (5.5 - 6.5)." },
    { step: "5", title: "Monitor & Maintain", detail: "Check nutrient levels (TDS/PPM), pH, and water temperature regularly. Flush and replace the reservoir water every 10-14 days to prevent nutrient lockouts." }
  ];

  const acquiredCount = REQUIRED_COMPONENTS_DATA.filter(c => checklist[c.id]).length;
  const totalComponents = REQUIRED_COMPONENTS_DATA.length;
  const progressPercentage = Math.round((acquiredCount / totalComponents) * 100);

  return (
    <div className="bg-slate-50 min-h-screen"> 
      
      {/* Banner */}
      <div className="relative bg-teal-950 text-white p-4 sm:p-8 md:p-12 overflow-hidden shadow-xl border border-teal-800">
        <div className="absolute inset-0  from-teal-800/40 via-teal-950 to-teal-950"></div>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl space-y-3 sm:space-y-4">
         
          <div className="flex flex-wrap gap-1.5 sm:gap-2 animate-fade-in">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-800/60 border border-emerald-700 text-emerald-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
              <Sprout className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Soil-less Precision Agriculture
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-800/60 border border-slate-700 text-slate-300 text-[10px] sm:text-xs font-mono font-bold">
              Pure Mineral Formulation
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight leading-tight">
            Hydroponics: <span className="text-emerald-400">Revolutionizing Modern Agriculture Without Soil</span>
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-base leading-relaxed max-w-3xl">
            In the face of growing concerns about food security, climate change, and land degradation, hydroponics is emerging as a game-changing agricultural technique. By allowing plants to grow without soil, hydroponics offers a sustainable and efficient alternative to traditional farming. 
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

      <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 items-start">
        <div className="flex-1 min-w-0 space-y-6 sm:space-y-12 w-full">

      {/* Main Tabbed Navigation bar */}
      <div className="bg-white border border-slate-100 p-1.5 sm:p-2 rounded-2xl shadow-xs flex overflow-x-auto gap-1 scrollbar-none max-w-full -mx-3 px-3 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "overview" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Sprout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Soil-less Revolution</span>
        </button>
        <button
          onClick={() => setActiveTab("systems")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "systems" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>System Architectures</span>
        </button>
        <button
          onClick={() => setActiveTab("matrix")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "matrix" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Formulations & Crops</span>
        </button>
        <button
          onClick={() => setActiveTab("components")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "components" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Components Needed</span>
        </button>
        <button
          onClick={() => setActiveTab("feasibility")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "feasibility" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Feasibility Comparison</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[300px] p-12">

        {/* Tab 1: Soil-less Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div>
                  <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900 tracking-tight leading-snug">
                    A Cleaner, Smarter Agricultural Pathway
                  </h2>
                  <div className="h-1 w-20 bg-teal-600 mt-2 rounded-full"></div>
                </div>

                <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-sans">
                  Whether you're a home gardener or a commercial grower, hydroponics can provide a pathway to higher yields, faster growth, and reduced resource consumption. This soilless approach allows plants to absorb nutrients more efficiently, leading to faster growth and higher yields.
                </p>

                <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-sans">
                  By delivering essential mineral ions directly to the bare root systems, hydroponics completely bypasses the biological limitation of traditional farming, where plants must expend immense cellular energy extending root systems to scavenge for trace minerals in solid soil matrixes.
                </p>

                <div className="bg-teal-50 border-l-4 border-teal-600 p-4 sm:p-5 rounded-r-2xl space-y-2">
                  <h4 className="font-sans font-bold text-teal-950 text-xs sm:text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 animate-pulse" />
                    What is Hydroponics?
                  </h4>
                  <p className="text-teal-900 text-xs sm:text-sm leading-relaxed font-sans">
                    Hydroponics is a method of growing plants in a water-based, nutrient-rich solution instead of soil. The roots are directly exposed to the nutrient solution or suspended in an inert medium, such as perlite, rock wool, or coconut coir, that supports the plant and retains moisture. This soilless approach allows plants to absorb nutrients more efficiently, leading to faster growth and higher yields.
                  </p>
                </div>
              </div>

              {/* Core Benefits */}
              <div className="lg:col-span-5 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xs space-y-4 sm:space-y-6">
                <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  Key Benefits of Hydroponics
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                      <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Faster Growth & Higher Yields</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Optimized nutrient delivery ensures crops develop up to 50% faster than dirt equivalents.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                      <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Water Conservation (Up to 90%)</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Water is recirculated continuously inside closed loops, minimizing waste and runoff.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                      <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Space & Land Efficiency</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Vertical stacking allows massive commercial output from small warehouses or balconies.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">No Soil-Borne Pathogens</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Soil-less growth eradicates insects, nematodes, weeds, and molds, eliminating toxic chemicals.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Core Mechanics Section */}
            <div className="bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-xs space-y-5 sm:space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
                <span className="text-teal-700 font-mono text-xs font-bold uppercase tracking-wider">The Engineering of Soilless Growth</span>
                <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">How Does Hydroponics Work?</h2>
                <p className="text-slate-500 text-xs sm:text-sm">By delivering mineral water mixtures directly to the root zone, the plant can maximize its vegetative and fruit production.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-2">
                <div className="p-3.5 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 sm:space-y-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-900 text-white flex items-center justify-center font-bold font-mono text-xs sm:text-sm">1</div>
                  <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Nutrient Solution</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    A carefully balanced dissolved mineral solution containing Nitrogen (N), Phosphorus (P), Potassium (K), Calcium, and trace minerals tailored to crop stages.
                  </p>
                </div>

                <div className="p-3.5 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 sm:space-y-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-900 text-white flex items-center justify-center font-bold font-mono text-xs sm:text-sm">2</div>
                  <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Growing Medium</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Inert media like clay pebbles (hydroton), rock wool, or coco coir anchor the root systems, providing structure while ensuring high gas-exchange ratios.
                  </p>
                </div>

                <div className="p-3.5 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 sm:space-y-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-900 text-white flex items-center justify-center font-bold font-mono text-xs sm:text-sm">3</div>
                  <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Water & Air Pumps</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Water pumps circulate nutrients continuously, while robust aeration pumps introduce oxygen directly, preventing root asphyxiation and damping-off.
                  </p>
                </div>

                <div className="p-3.5 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 sm:space-y-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-900 text-white flex items-center justify-center font-bold font-mono text-xs sm:text-sm">4</div>
                  <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Full Spectrum Lighting</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Indoor systems employ advanced, high-efficiency photosynthetic LED panels to deliver optimal red and blue light wavelengths to accelerate chlorophyll production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: System Architectures & Diagram */}
        {activeTab === "systems" && (
          <div className="space-y-6 sm:space-y-12 animate-fade-in">
            
            {/* Visual Header */}
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
              <span className="text-teal-700 font-mono text-xs font-bold uppercase tracking-wider">Visual Architectural Layout</span>
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">Hydroponic Growing Systems</h2>
              <p className="text-slate-500 text-xs sm:text-sm">Explore how nutrient delivery can be structurally customized. Compare passives, actives, and aeroponics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Left Column: Interactive Diagram Image */}
              <div className="lg:col-span-7 bg-white p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm space-y-3 sm:space-y-4">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200">
                  <img 
                    src="/src/assets/images/aquaponic_diagram_1784222908220.jpg" 
                    alt="Types of Hydroponics Farming diagram" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-teal-950/90 text-white text-[9px] sm:text-[10px] font-mono font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider border border-teal-800">
                    Official Types of Hydroponics Farming Diagram
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 text-xs text-slate-500 leading-relaxed bg-slate-50 rounded-xl border border-slate-100 flex gap-2">
                  <Info className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-teal-700 shrink-0 mt-0.5" />
                  <p className="text-[11px] sm:text-xs">
                    <strong>Diagram Guide:</strong> This schematic highlights the standard mechanical methods: <strong>Aeroponics System</strong> (suspended misting), <strong>Ebb & Flow</strong> (temporary flooding), <strong>Nutrient Film Technique</strong> (continuous shallow flow), <strong>Wick Hydroponics</strong> (passive capillary absorption), <strong>Drip System</strong> (precise base emitters), and <strong>Deep Water Culture</strong> (direct oxygenated submersion).
                  </p>
                </div>
              </div>

              {/* Right Column: Detailed Frameworks Selector */}
              <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-150 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold px-2 pb-1">Select a Framework</span>
                  <div className="grid grid-cols-1 gap-1 sm:gap-1.5">
                    {Object.keys(hydroponicSystems).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedSystem(key as any)}
                        className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                          selectedSystem === key
                            ? "bg-teal-800 text-white shadow-md"
                            : "text-slate-700 hover:bg-slate-50 border border-slate-100/50"
                        }`}
                      >
                        <span>{hydroponicSystems[key as keyof typeof hydroponicSystems].title}</span>
                        {selectedSystem === key && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 stroke-[3px]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4 animate-fade-in">
                  <h4 className="font-sans font-black text-teal-950 text-base sm:text-lg border-b border-slate-200/60 pb-2">
                    {hydroponicSystems[selectedSystem].title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {hydroponicSystems[selectedSystem].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Best Suited For:</span>
                      <span className="text-xs font-sans font-semibold text-slate-800 block mt-0.5 leading-tight">
                        {hydroponicSystems[selectedSystem].suitability}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Technical Difficulty:</span>
                      <span className="text-xs font-sans font-bold text-teal-800 block mt-0.5">
                        {hydroponicSystems[selectedSystem].difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block tracking-wider">Required Components Checklist:</span>
                    <p className="text-xs text-slate-700 font-sans mt-1">
                      {hydroponicSystems[selectedSystem].components}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Formulations & Crop Matrix */}
        {activeTab === "matrix" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
              <span className="text-teal-700 font-mono text-xs font-bold uppercase tracking-wider">Chemistry & Precision Dosing</span>
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">Precision Formulation Sandbox</h2>
              <p className="text-slate-500 text-xs sm:text-sm">Formulate dry mineral salts for your reservoir or select specific crop guidelines to display biological targets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Formulator */}
              <div className="lg:col-span-7 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-150 shadow-sm space-y-4 sm:space-y-6">
                <div className="border-b border-slate-100 pb-3 sm:pb-4">
                  <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    Masterblend 3-Part Nutrient Calculator
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Input your reservoir size and desired nutrient concentration (PPM) to calculate exact dry salt dosing weights.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Reservoir Size (Liters)</label>
                    <input
                      type="number"
                      value={reservoirVolume}
                      onChange={(e) => setReservoirVolume(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Total Dissolved Solids (PPM)</label>
                    <input
                      type="number"
                      step="50"
                      value={targetPpm}
                      onChange={(e) => setTargetPpm(Math.max(100, Number(e.target.value)))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Outputs stack */}
                <div className="bg-slate-50 p-3.5 sm:p-5 rounded-2xl border border-slate-150 space-y-3 sm:space-y-4">
                  <h4 className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Required Dry Salt Weights</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">Masterblend</span>
                      <span className="text-base sm:text-lg font-mono font-black text-slate-800 block mt-0.5">{masterblendGrams.toFixed(1)}g</span>
                      <span className="text-[9px] text-slate-400 font-mono">4-18-38</span>
                    </div>

                    <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">Cal-Nitrate</span>
                      <span className="text-base sm:text-lg font-mono font-black text-slate-800 block mt-0.5">{calciumNitrateGrams.toFixed(1)}g</span>
                      <span className="text-[9px] text-slate-400 font-mono">15.5-0-0</span>
                    </div>

                    <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">Epsom Salt</span>
                      <span className="text-base sm:text-lg font-mono font-black text-slate-800 block mt-0.5">{epsomSaltGrams.toFixed(1)}g</span>
                      <span className="text-[9px] text-slate-400 font-mono">MgSO₄</span>
                    </div>
                  </div>

                  <div className="flex gap-2 text-[11px] text-slate-500 leading-relaxed font-sans pt-1">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Mixing order is vital!</strong> Dissolve Masterblend and Epsom Salt completely first. Once fully transparent and mixed, add Calcium Nitrate last to prevent calcium precipitation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Crop guidelines matrix */}
              <div className="lg:col-span-5 bg-white p-4 sm:p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4 sm:space-y-6">
                <div className="border-b border-slate-100 pb-3 sm:pb-4">
                  <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    Crop Nutrient Guidelines
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Select a crop type to display recommended biological pH, EC limits, and temperature guidelines.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cropGuidelines.map((crop) => (
                    <button
                      key={crop.name}
                      onClick={() => setSelectedCrop(crop.name)}
                      className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border text-[11px] sm:text-xs font-bold font-sans transition-all cursor-pointer ${
                        selectedCrop === crop.name
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-xs font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {crop.name}
                    </button>
                  ))}
                </div>

                {/* Crop details */}
                <div className="bg-emerald-50/40 p-4 sm:p-5 rounded-2xl border border-emerald-150/40 space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Recommended pH</span>
                      <span className="text-base sm:text-lg font-mono font-black text-slate-800 block mt-0.5">{currentCropInfo.ph}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Target EC (mS/cm)</span>
                      <span className="text-base sm:text-lg font-mono font-black text-emerald-700 block mt-0.5">{currentCropInfo.ec}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total TDS (PPM)</span>
                      <span className="text-base sm:text-lg font-mono font-black text-slate-800 block mt-0.5">{currentCropInfo.ppm}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Ideal Temp Range</span>
                      <span className="text-base sm:text-lg font-mono font-black text-slate-800 block mt-0.5">{currentCropInfo.temp}</span>
                    </div>
                  </div>

                  <div className="border-t border-emerald-100/50 pt-2.5 sm:pt-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Agronomist Pro-Tip:</span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans">{currentCropInfo.notes}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Components Checklist */}
        {activeTab === "components" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
              <span className="text-teal-700 font-mono text-xs font-bold uppercase tracking-wider">Acquisition Planner</span>
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">Hydroponic Hardware Checklist</h2>
              <p className="text-slate-500 text-xs sm:text-sm">Verify and track physical components needed to initiate and construct a commercial soil-less facility.</p>
            </div>

            {/* Progress Bar Card */}
            <div className="bg-white border border-slate-150 rounded-2xl p-4 sm:p-6 shadow-sm max-w-4xl mx-auto space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-sans font-extrabold text-slate-900">Assembly Progress Tracker</h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Sourcing elements required for a functional system</p>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-mono font-black text-teal-800">{acquiredCount}</span>
                  <span className="text-xs text-slate-400"> / {totalComponents} acquired</span>
                </div>
              </div>

              <div className="relative w-full h-2.5 sm:h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-gradient-to-r from-emerald-500 to-teal-700 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {progressPercentage === 100 ? (
                <div className="flex gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-sans items-center border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                  <p><strong>Fully Sourced!</strong> All vital components, infrastructure, mechanicals, and testing kits have been acquired. Your facility is ready for seeding!</p>
                </div>
              ) : (
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>Keep checkmarking assets to complete your project setup timeline.</span>
                  <span className="font-bold text-slate-700">{progressPercentage}% Complete</span>
                </div>
              )}
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {REQUIRED_COMPONENTS_DATA.map((comp) => {
                const isAcquired = !!checklist[comp.id];
                return (
                  <div 
                    key={comp.id}
                    onClick={() => handleToggleChecklist(comp.id)}
                    className={`p-3 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-2.5 sm:gap-3 items-start select-none ${
                      isAcquired 
                        ? "bg-emerald-50/50 border-emerald-250 shadow-xs" 
                        : "bg-white border-slate-200 hover:border-slate-350"
                    }`}
                  >
                    <div className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isAcquired ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"
                    }`}>
                      {isAcquired && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3px]" />}
                    </div>
                    
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className={`text-xs sm:text-sm font-sans font-extrabold ${isAcquired ? "text-slate-900 line-through" : "text-slate-800"}`}>
                          {comp.name}
                        </h4>
                        {!comp.required && (
                          <span className="text-[8px] font-mono bg-slate-100 text-slate-500 px-1 rounded font-bold uppercase">Optional</span>
                        )}
                      </div>
                      <p className="text-slate-500 text-[11px] leading-tight font-sans">
                        {comp.desc}
                      </p>
                      <span className="inline-block text-[9px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">
                        {comp.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Setup Guide Step-by-Step */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <div className="space-y-1">
                <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-teal-800" />
                  Getting Started Timeline
                </h3>
                <p className="text-slate-400 text-xs">A logical step-by-step roadmap to transition from empty space to functional produce harvests.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                {startupSteps.map((step) => (
                  <div key={step.step} className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-150 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center font-bold font-mono text-xs">
                        {step.step}
                      </div>
                      <h4 className="font-sans font-extrabold text-slate-800 text-xs">{step.title}</h4>
                      <p className="text-slate-500 text-[10px] leading-relaxed font-sans">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 6: Feasibility & Technology Comparison */}
        {activeTab === "feasibility" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <TechnologyComparison activeTech="hydroponics" />
          </div>
        )}

      </div>

      {/* Challenges Section */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <h3 className="font-sans font-black text-slate-900 text-lg sm:text-xl flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-amber-500 animate-pulse" />
            Challenges of Hydroponics
          </h3>
          <p className="text-slate-400 text-xs">A balanced agronomic assessment of hydroponics challenges and technical risks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-3.5 sm:p-5 bg-white rounded-2xl border border-slate-150 space-y-1.5 sm:space-y-2">
            <h4 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">Upfront Capital Expenses</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Setting up a commercial hydroponic layout demands substantial starting expenses. High-pressure pumps, oxygen injectors, degasser tanks, filtration grids, and photosynthetic LED panels command initial capital.
            </p>
          </div>

          <div className="p-3.5 sm:p-5 bg-white rounded-2xl border border-slate-150 space-y-1.5 sm:space-y-2">
            <h4 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">Pump & Power Outage Risks</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Active systems like NFT or high-speed Aeroponics rely continuously on electric power. If pump circulation ceases due to outage or mechanical failures, delicate root systems will dry and perish in minutes.
            </p>
          </div>

          <div className="p-3.5 sm:p-5 bg-white rounded-2xl border border-slate-150 space-y-1.5 sm:space-y-2">
            <h4 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">Nutrient Burn & pH Drifts</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unlike dense field soils which naturally act as chemistry buffers, water-based solutions feel chemistry changes instantly. High mineral ratios or drastic pH drifts affect and stress plants immediately without buffer zones.
            </p>
          </div>
        </div>
      </div>

      {/* YouTube Guide Carousel Slider Section */}
      <div id="youtube-ras-slider" className="mt-12 pt-8 px-4 sm:px-6 lg:px-8 border-t border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 animate-pulse" />
              <span>Educational Video Series</span>
            </div>
            <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
              Hydroponics Viral Ideas
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Watch real expert masterclasses on building, mixing, and optimizing mineral-based agriculture.
            </p>
          </div>

          {/* Scroll Navigation Controls & Viral Filter */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto">
            <button
              id="hydroponics-viral-toggle-btn"
              onClick={() => setShowViralOnly(!showViralOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                showViralOnly 
                  ? "bg-amber-500 border-amber-500 text-white shadow-xs" 
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${showViralOnly ? "fill-current animate-pulse text-red-100" : "text-amber-500"}`} />
              <span>Only Viral (100K+)</span>
              {showViralOnly && <Check className="w-3 h-3 stroke-[3px]" />}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                id="hydroponics-slide-left-btn"
                onClick={() => scrollVideos("left")}
                className="p-1.5 sm:p-2 rounded-xl border border-teal-100 bg-white text-teal-800 hover:bg-teal-50 active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                id="hydroponics-slide-right-btn"
                onClick={() => scrollVideos("right")}
                className="p-1.5 sm:p-2 rounded-xl border border-teal-100 bg-white text-teal-800 hover:bg-teal-50 active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrolling Carousel */}
        <div className="relative">
          <div
            id="hydroponics-video-scroll-container"
            ref={scrollRef}
            onMouseEnter={() => setIsVideosHovered(true)}
            onMouseLeave={() => setIsVideosHovered(false)}
            onTouchStart={() => setIsVideosHovered(true)}
            onTouchEnd={() => setIsVideosHovered(false)}
            className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-teal-100 scrollbar-track-transparent select-none animate-fade-in"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', scrollBehavior: 'auto' }}
          >
            {(() => {
              const displayedVideos = showViralOnly ? hydroVideos.filter(isVideoViral) : hydroVideos;
              const listToRender = displayedVideos.length > 0 ? displayedVideos : hydroVideos;
              return [...listToRender, ...listToRender].map((video, index) => (
                <div 
                  key={`${video.id}-hydro-clone-${index}`} 
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
          
          {/* Fade Overlays for Elegant Sliding Appearance */}
          <div className="absolute top-0 bottom-4 left-0 w-8 bg-gradient-to-r from-slate-50/50 to-transparent pointer-events-none hidden sm:block"></div>
          <div className="absolute top-0 bottom-4 right-0 w-8 bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none hidden sm:block"></div>
        </div>
      </div>

        </div>
        <div className="hidden xl:block shrink-0 sticky top-20">
          <RightSidebarAd reloadKey="hydroponics-sidebar-ad" />
        </div>
      </div>
    </div>
  );
}
