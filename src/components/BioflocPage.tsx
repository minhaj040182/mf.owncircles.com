import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, ChevronLeft, ChevronRight, CircleDot, Activity, 
  Settings, Thermometer, Gauge, Phone, FlaskConical, 
  AlertTriangle, Info, ArrowRight, Leaf, ShieldAlert, 
  CheckCircle2, Users, Beaker, HelpCircle, Flame, 
  Droplet, Microscope, Scale, Check
} from "lucide-react";
import { Video } from "../types";
import VideoCard from "./VideoCard";
import { fetchYouTubeChannelVideos, fetchTrendingTopicVideos } from "../youtubeFeed";
import TechnologyComparison from "./TechnologyComparison";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

// Real, educational Biofloc fish farming YouTube video masterclass guides
import { BIOFLOC_YOUTUBE_VIDEOS as SHARED_BIOFLOC_YOUTUBE_VIDEOS, isVideoViral } from "../data";
const BIOFLOC_YOUTUBE_VIDEOS: Video[] = SHARED_BIOFLOC_YOUTUBE_VIDEOS;
/*
const OLD_BIOFLOC_YOUTUBE_VIDEOS: Video[] = [
  {
    id: "biofloc-yt-1",
    title: "Complete 10,000L Biofloc Fish Farm Setup Step-by-Step Guide",
    description: "Learn how to prepare the tarpaulin pond, install the micro-pore aeration lines, and activate the soil-less microbial biofloc community.",
    thumbnail: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/H6Uo4W_YmY4",
    duration: "24:15",
    views: "185K views",
    type: "youtube",
    creator: "Biofloc Pioneers",
    publishDate: "2 weeks ago",
    category: "Biofloc",
    likes: 5400
  },
  {
    id: "biofloc-yt-2",
    title: "How to Calculate the Perfect Carbon-Nitrogen (C:N) Ratio",
    description: "Nitrification engineering masterclass. Calculations for molasses dosing based on fish protein feed percentages to eliminate toxic ammonia spikes.",
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/V-26oO46rB4",
    duration: "15:30",
    views: "94K views",
    type: "youtube",
    creator: "Aqua Bio-Chemists",
    publishDate: "1 month ago",
    category: "Biofloc",
    likes: 3100
  },
  {
    id: "biofloc-yt-3",
    title: "Commercial Shrimp Biofloc Farming at Extreme Stocking Density",
    description: "Walkthrough of intensive Litopenaeus vannamei shrimp culture in 100m² biofloc pools. See harvest yields, feed conversion ratios (FCR), and aeration loops.",
    thumbnail: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/m5x6U7xT8fI",
    duration: "19:10",
    views: "142K views",
    type: "youtube",
    creator: "Vannamei Tech",
    publishDate: "3 weeks ago",
    category: "Biofloc",
    likes: 4200
  },
  {
    id: "biofloc-yt-4",
    title: "Understanding Bacillus Probiotics & Microbial Floc Inoculation",
    description: "Under the microscope: How heterotrophic bacteria assimilate ammonium into high-protein bacterial meal. Species selection of Bacillus subtilis vs licheniformis.",
    thumbnail: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/fK97V60h8xI",
    duration: "12:45",
    views: "61K views",
    type: "youtube",
    creator: "Modern Fisheries Academy",
    publishDate: "1 month ago",
    category: "Biofloc",
    likes: 2400
  },
  {
    id: "biofloc-yt-5",
    title: "Sizing Roots Blowers & Ring Blowers for Biofloc Aeration Systems",
    description: "Why continuous high-dissolved oxygen (DO > 5.5 mg/L) is critical to prevent biofloc anaerobic collapse. Learn pressure piping calculations and air-stone counts.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/pL7r69uCHsc",
    duration: "18:20",
    views: "72K views",
    type: "youtube",
    creator: "Agri-Energy Engineers",
    publishDate: "2 months ago",
    category: "Biofloc",
    likes: 1950
  },
  {
    id: "biofloc-yt-6",
    title: "Imhoff Cone Diagnostics: Testing Floc Volume (ml/L) Like a Pro",
    description: "Practical guide to managing suspended solids. Learn the differences between brown biofloc (carbohydrate driven) and green biofloc (mixotrophic plankton driven).",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/T_8R7S6W5Q8",
    duration: "11:50",
    views: "48K views",
    type: "youtube",
    creator: "Aquaculture Diagnostics",
    publishDate: "3 months ago",
    category: "Biofloc",
    likes: 1300
  },
  {
    id: "biofloc-yt-7",
    title: "Super-Intensive Tilapia Harvest from a 4-Tank Biofloc Farm",
    description: "We harvest 1.2 metric tons of premium Gift Tilapia from four 4-meter diameter tarpaulin tanks. Complete financial ledger, feed consumption, and pricing analysis.",
    thumbnail: "https://images.unsplash.com/photo-1516715094727-ec48be335d79?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/_yIAtn2zU0A",
    duration: "21:35",
    views: "230K views",
    type: "youtube",
    creator: "Modern Fisheries",
    publishDate: "1 month ago",
    category: "Biofloc",
    likes: 8100
  },
  {
    id: "biofloc-yt-8",
    title: "Molasses vs Wheat Flour vs Tapioca: Carbon Source Experiments",
    description: "Scientific comparison of cost, fermentation speed, and flock stability using different carbohydrate sources. Finding the lowest cost carbohydrate in BFT.",
    thumbnail: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/8F-Bf6t67Y4",
    duration: "16:15",
    views: "55K views",
    type: "youtube",
    creator: "Aqua Bio-Chemists",
    publishDate: "2 months ago",
    category: "Biofloc",
    likes: 2100
  },
  {
    id: "biofloc-yt-9",
    title: "African Catfish Growth Rates in Heterotrophic Water Loops",
    description: "Farming Clarias gariepinus in high floc concentrations. Watch our weekly biological monitoring logs, water chemistry profiles, and feed adjustments.",
    thumbnail: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/p_X6R3S9H94",
    duration: "17:40",
    views: "89K views",
    type: "youtube",
    creator: "Catfish Specialists",
    publishDate: "1 month ago",
    category: "Biofloc",
    likes: 3400
  },
  {
    id: "biofloc-yt-10",
    title: "Ammonia & Nitrite Crashing: Critical Recovery Protocol",
    description: "What to do when Nitrite spikes to lethal ranges. Safe guidelines on adding sea salt to block gill uptake, adding carbon, and temporary feed restrictions.",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/D3_4g6u7x8M",
    duration: "14:50",
    views: "64K views",
    type: "youtube",
    creator: "Modern Fisheries Academy",
    publishDate: "5 months ago",
    category: "Biofloc",
    likes: 2600
  },
  {
    id: "biofloc-yt-11",
    title: "Managing pH and Alkalinity Buffers in Biofloc Aquaculture",
    description: "Maintaining total alkalinity above 150 mg/L CaC03. Practical demonstrations on dosing agricultural limestone, dolomite, and sodium bicarbonate.",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/S_5T6Y7U8I9",
    duration: "15:10",
    views: "42K views",
    type: "youtube",
    creator: "Aquaculture Chemistry Labs",
    publishDate: "3 months ago",
    category: "Biofloc",
    likes: 1750
  },
  {
    id: "biofloc-yt-12",
    title: "DIY Circular Tarpaulin Tank Assembly for Urban Home Yards",
    description: "Building a budget-friendly 4-meter diameter circular fish culture tank with protective welded wire mesh framing and food-grade tarps.",
    thumbnail: "https://images.unsplash.com/photo-1516715094727-ec48be335d79?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/8F-Bf6t67Y4",
    duration: "20:55",
    views: "118K views",
    type: "youtube",
    creator: "Backyard Fish Homestead",
    publishDate: "6 months ago",
    category: "Biofloc",
    likes: 4100
  },
  {
    id: "biofloc-yt-13",
    title: "Siberian Sturgeon in High Density Mixotrophic Systems",
    description: "Feasibility of farming premium sturgeon using heterotrophic biofloc techniques. Inspecting daily thermal controls, DO logs, and FCR results.",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/3S9R6W_LwVw",
    duration: "22:40",
    views: "53K views",
    type: "youtube",
    creator: "Sturgeon Specialists",
    publishDate: "4 months ago",
    category: "Biofloc",
    likes: 1980
  },
  {
    id: "biofloc-yt-14",
    title: "How to Design bottom drains for Biofloc Sludge Removal",
    description: "Eliminating heavy biological sediments. Why a center-slope drain is necessary to purge dead floc, fecal solids, and excess organic particles safely.",
    thumbnail: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/17f96R_LwVw",
    duration: "13:45",
    views: "39K views",
    type: "youtube",
    creator: "Aqua Bio-Chemists",
    publishDate: "7 months ago",
    category: "Biofloc",
    likes: 1200
  },
  {
    id: "biofloc-yt-15",
    title: "Probiotics Activation Guide: Pre-Fermentation Protocol",
    description: "Maximize your colony's efficiency. How to activate Bacillus spores using molasses, salt water, and vigorous yeast starter aeration before tank inoculation.",
    thumbnail: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/V-26oO46rB4",
    duration: "12:10",
    views: "51K views",
    type: "youtube",
    creator: "Biofloc Pioneers",
    publishDate: "8 months ago",
    category: "Biofloc",
    likes: 1650
  },
  {
    id: "biofloc-yt-16",
    title: "DO Emergency backup Power Systems for Biofloc Farms",
    description: "Avoid toxic oxygen crashes when power fails. Complete review of heavy diesel generators, automatic transfer switches (ATS), and 12V backup blowers.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/P_4R7W8Q9K1",
    duration: "18:40",
    views: "29K views",
    type: "youtube",
    creator: "Aquaculture Safety Systems",
    publishDate: "9 months ago",
    category: "Biofloc",
    likes: 950
  },
  {
    id: "biofloc-yt-17",
    title: "Water Management & Zero Exchange Operations in BFT",
    description: "The science of nitrogen assimilation over nitrification. Understanding how BFT achieves minimal water use by recycling microbial water internally.",
    thumbnail: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // general fallback or another educational ID
    duration: "14:15",
    views: "33K views",
    type: "youtube",
    creator: "Aqua Bio-Chemists",
    publishDate: "10 months ago",
    category: "Biofloc",
    likes: 1100
  },
  {
    id: "biofloc-yt-18",
    title: "Economics & Feasibility Study: 10-Tank Commercial Project",
    description: "Full capital expense (CAPEX) and operating expense (OPEX) cost analysis for a small-scale biofloc enterprise. Calculating internal rate of return.",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/V_3R7S4W8Q1",
    duration: "25:10",
    views: "98K views",
    type: "youtube",
    creator: "Agri-Business Consultants",
    publishDate: "1 year ago",
    category: "Biofloc",
    likes: 3800
  },
  {
    id: "biofloc-yt-19",
    title: "Pangasius (Striped Catfish) Intensive Growth in Biofloc Pools",
    description: "Staggering stocking densities for warm-water pangasius. Monitoring water alkalinity, ammonia levels, and average daily gain (ADG).",
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/B_7R8S9T0W1",
    duration: "21:15",
    views: "44K views",
    type: "youtube",
    creator: "Fisheries Academy",
    publishDate: "1 year ago",
    category: "Biofloc",
    likes: 1540
  },
  {
    id: "biofloc-yt-20",
    title: "Shrimp Biofloc vs RAS: Detailed Comparison for Investors",
    description: "In-depth debate comparing energy footprint, initial investment, disease risk controls, and land-to-yield ratio between BFT and RAS.",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "28:30",
    views: "67K views",
    type: "youtube",
    creator: "Aquaculture Safety Systems",
    publishDate: "1 year ago",
    category: "Biofloc",
    likes: 2150
  }
];
*/

interface BioflocPageProps {
  onVideoClick?: (video: Video) => void;
  onBackToDashboard?: () => void;
}

export default function BioflocPage({ onVideoClick, onBackToDashboard }: BioflocPageProps) {
  // Page Tabs: Overview, How BFT Works, Components, Species, Sandbox, Provider
  const [activeTab, setActiveTab] = useState<"overview" | "works" | "components" | "fishes" | "feasibility" | "provider">("overview");

  // Dynamic YouTube API Key query support
  const [bioflocVideos, setBioflocVideos] = useState<Video[]>(BIOFLOC_YOUTUBE_VIDEOS);
  const [showViralOnly, setShowViralOnly] = useState<boolean>(false);

  useEffect(() => {
    async function loadDynamicBioflocVideos() {
      try {
        const [channelVids, trendingVids] = await Promise.all([
          fetchYouTubeChannelVideos().catch(() => []),
          fetchTrendingTopicVideos(false, "biofloc fish farming technology C/N ratio viral").catch(() => [])
        ]);

        const combined = [...channelVids, ...trendingVids];
        if (combined.length > 0) {
          const filtered = combined.filter(v => {
            const titleLower = (v.title || "").toLowerCase();
            const descLower = (v.description || "").toLowerCase();
            const catLower = (v.category || "").toLowerCase();

            const isBioflocMatch = 
              catLower === "biofloc" ||
              titleLower.includes("biofloc") ||
              (titleLower.includes("floc") && !titleLower.includes("flock")) ||
              titleLower.includes("bft") ||
              titleLower.includes("probiotic") ||
              titleLower.includes("molasses") ||
              descLower.includes("biofloc") ||
              descLower.includes("bft");

            return isBioflocMatch;
          });

          if (filtered.length > 0) {
            setBioflocVideos(prev => {
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
        console.error("Error loading Biofloc YouTube videos:", err);
      }
    }
    loadDynamicBioflocVideos();
  }, []);

  // Scrolling YouTube Slider states & refs
  const bioflocScrollRef = useRef<HTMLDivElement>(null);
  const [isBioflocHovered, setIsBioflocHovered] = useState(false);
  const bioflocPosRef = useRef(0);

  // Sync scroll coordinates
  useEffect(() => {
    const el = bioflocScrollRef.current;
    const handleScroll = () => {
      if (el) bioflocPosRef.current = el.scrollLeft;
    };
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      bioflocPosRef.current = el.scrollLeft;
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

      if (bioflocScrollRef.current) {
        const el = bioflocScrollRef.current;
        if (isBioflocHovered) {
          bioflocPosRef.current = el.scrollLeft;
        } else {
          const { scrollWidth, clientWidth } = el;
          const halfWidth = scrollWidth / 2;
          if (scrollWidth > clientWidth) {
            bioflocPosRef.current += speed * clampedDelta;
            
            // Seamless wrap-around
            if (bioflocPosRef.current >= halfWidth) {
              bioflocPosRef.current -= halfWidth;
            } else if (bioflocPosRef.current < 0) {
              bioflocPosRef.current += halfWidth;
            }
            
            el.scrollLeft = Math.round(bioflocPosRef.current);
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateSliding);
    };

    animationFrameId = requestAnimationFrame(updateSliding);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isBioflocHovered]);

  const scrollBiofloc = (direction: "left" | "right") => {
    const el = bioflocScrollRef.current;
    if (el) {
      const scrollAmount = 340; // Approx card width + gap
      const newScrollLeft = direction === "left" 
        ? el.scrollLeft - scrollAmount 
        : el.scrollLeft + scrollAmount;
      
      el.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
      bioflocPosRef.current = newScrollLeft;
    }
  };

  // State for Carbon Dosing calculator
  const [tankVolume, setTankVolume] = useState<number>(10000); // Liters
  const [currentAmmonia, setCurrentAmmonia] = useState<number>(1.5); // ppm (mg/L)
  const [carbonSource, setCarbonSource] = useState<"Molasses" | "Wheat Flour" | "Tapioca Starch">("Molasses");
  const [targetRatio, setTargetRatio] = useState<number>(15); // standard recommendation 15:1

  // Carbon source carbon percentage guidelines
  const carbonContent = {
    "Molasses": 0.40, // 40% Carbon
    "Wheat Flour": 0.50, // 50% Carbon
    "Tapioca Starch": 0.52 // 52% Carbon
  };

  // Avnimelech equation: Carbon needed = (TAN in tank (g) * targetRatio) / Carbon content of source
  const totalAmmoniaGrams = (currentAmmonia * tankVolume) / 1000; // mg to g
  const carbohydrateNeededGrams = totalAmmoniaGrams > 0 
    ? (totalAmmoniaGrams * targetRatio) / carbonContent[carbonSource]
    : 0;

  // Imhoff Cone Settling state
  const [flocVolume, setFlocVolume] = useState<number>(15); // ml/L

  // Suitable Species Data structured specifically for Biofloc environment
  const bioflocSpecies = [
    {
      name: "GIFT Tilapia",
      scientific: "Oreochromis niloticus",
      density: "40 - 60 kg/m³",
      temp: "26°C - 31°C",
      ph: "7.0 - 8.5",
      cycle: "5 - 6 Months",
      fcr: "1.1 - 1.3",
      survival: "92% - 96%",
      marketPrice: "Medium",
      color: "from-teal-500 to-cyan-500",
      desc: "Ideal candidate for BFT. Directly consumes bacterial floc as protein-rich supplemental food, improving health and reducing feed bills up to 30%."
    },
    {
      name: "Whiteleg Shrimp",
      scientific: "Litopenaeus vannamei",
      density: "300 - 450 pcs/m³",
      temp: "28°C - 32°C",
      ph: "7.5 - 8.3",
      cycle: "3 - 4 Months",
      fcr: "1.2 - 1.4",
      survival: "85% - 92%",
      marketPrice: "Very High",
      color: "from-amber-500 to-orange-600",
      desc: "Thrives in shallow circular biofloc pools. Continuously grazes on floating biological aggregates, boosting carapace growth and reducing disease index."
    },
    {
      name: "African Catfish",
      scientific: "Clarias gariepinus",
      density: "80 - 120 kg/m³",
      temp: "25°C - 28°C",
      ph: "6.5 - 8.0",
      cycle: "4 - 5 Months",
      fcr: "1.0 - 1.2",
      survival: "95% - 98%",
      marketPrice: "Medium",
      color: "from-slate-600 to-slate-800",
      desc: "Exceptional tolerance to high stocking density and low dissolved oxygen levels. Air-breathing capabilities allow farming in intense floc concentration."
    },
    {
      name: "Pangasius Catfish",
      scientific: "Pangasianodon hypophthalmus",
      density: "60 - 80 kg/m³",
      temp: "26°C - 30°C",
      ph: "6.8 - 7.8",
      cycle: "6 - 8 Months",
      fcr: "1.3 - 1.5",
      survival: "90% - 95%",
      marketPrice: "Medium-High",
      color: "from-indigo-400 to-blue-600",
      desc: "Extremely fast-growing table fish. Readily consumes floc particles, making it efficient for intensive commercial farming under zero-water exchange."
    }
  ];

  const [selectedSpecies, setSelectedSpecies] = useState<number>(0);

  // Components Checklist categorizing everything needed for a Biofloc setup
  const componentsNeeded = [
    {
      category: "Culture & Containment",
      icon: CircleDot,
      items: [
        { name: "Circular Tarpaulin Tanks", desc: "Heavy-duty PVC tarpaulin (650+ GSM) with a protective welded wire mesh cage. Allows optimal circular water flow." },
        { name: "Central Sludge Bottom Drain", desc: "A sloping bottom (1:10) equipped with a central discharge line to purge dead floc, excess sludge, and waste safely." },
        { name: "Shed / Greenhouse Protective Roof", desc: "Shields tanks from rainfall (which changes water pH) and blocks direct sunlight to prevent toxic blue-green algae blooms." }
      ]
    },
    {
      category: "Aeration & Suspension Systems",
      icon: Activity,
      items: [
        { name: "Ring Blowers or Root Blowers", desc: "Provides high-volume, low-pressure continuous air supply. Blowers must run 24/7 without interruption." },
        { name: "Aero-Tube / Micro-Pore Hoses", desc: "Porous rubber oxygen tubing positioned on the tank floor to create tiny bubbles that suspend floc and maximize DO." },
        { name: "Automatic Power Failure Alarms", desc: "Emergency auto-dialers or loud horns triggered instantly when a power failure occurs to protect fish from oxygen crashes." }
      ]
    },
    {
      category: "Microbial & Chemical Inputs",
      icon: FlaskConical,
      items: [
        { name: "High-CFU Bacillus Probiotics", desc: "Heterotrophic probiotic bacteria strain (Bacillus subtilis, licheniformis) to kickstart nitrogen assimilation." },
        { name: "Carbohydrate Feedstock (Molasses)", desc: "Rich carbon supplement (at least 40% carbon) to feed heterotrophic bacteria and maintain target C:N ratios." },
        { name: "Dolomite & Agricultural Lime", desc: "High purity calcium carbonate/magnesium carbonate to maintain alkalinity above 120 ppm for stable pH buffer." }
      ]
    },
    {
      category: "Diagnostics & Water Testing Gear",
      icon: Microscope,
      items: [
        { name: "Imhoff Cone (1 Liter Graduated)", desc: "The definitive tool to measure Floc Settling Volume (FVI) in ml/L. Used daily to monitor community density." },
        { name: "Industrial Ammonia & Nitrite Kits", desc: "High-resolution colorimetric chemical water testing kits to track toxic nitrogen transition phases." },
        { name: "Optical Dissolved Oxygen (DO) Meter", desc: "Continuous portable DO probe to guarantee oxygen levels never slip below 5.0 ppm." }
      ]
    }
  ];

  // 14-day setup calendar
  const preparationCalendar = [
    { day: "Day 1-2", title: "Chlorine Scrub & Pre-Treatment", detail: "Fill circular tanks with clean ground or municipal water. Add 15 ppm bleaching powder. Aerate aggressively for 48 hours to fully gasify any residual toxic chlorine." },
    { day: "Day 3-4", title: "Mineralization & Salinity", detail: "Apply dolomite lime at 150g per 1000L. Add crude sea salt at 2-3 kg per 1000L (2-3 ppt) to optimize shrimp or Tilapia osmoregulation." },
    { day: "Day 5", title: "Bacillus Culture Activation", detail: "In a separate bucket, ferment 10g high-CFU Bacillus, 150g Molasses, and 100g wheat bran in warm aerated water for 12 hours. Pour uniformly into the tank." },
    { day: "Day 6-12", title: "Ecosystem Inoculation", detail: "Add 10g of molasses per 1000L daily. Keep aeration blowers running at full throttle. Observe the water changing from crystal clear to a golden-brown microbial suspension." },
    { day: "Day 14", title: "Fingerling Stocking & Acclimation", detail: "Once ammonia levels are completely stable near zero and Imhoff settling volume reaches 5 ml/L, safely stock healthy, quarantined fingerlings." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">    
      {/* Premium Dark Theme Hero Banner */}
      <div className="relative bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900 text-white p-5 sm:p-10  overflow-hidden shadow-xl border border-teal-800/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-600/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-teal-500/10 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-800/60 border border-teal-700/50 text-teal-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider animate-pulse">
              Zero-Water Exchange Biology
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tight leading-tight">
            Biofloc Fish Farming: <span className="text-teal-400">A Sustainable Revolution</span>
          </h1>
          <p className="text-teal-100/90 text-xs sm:text-base leading-relaxed font-sans">
            Harness the natural power of heterotrophic bacterial communities. Biofloc Technology (BFT) recycles toxic nitrogenous waste directly into high-protein feed, shrinking production costs, minimizing land footprint, and eliminating waste disposal completely.
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
        
      <div className="grid grid-cols-1 lg:grid-cols-12 sm:gap-8 items-start w-full min-w-0">
        <div className="lg:col-span-8 xl:col-span-9 space-y-6 sm:space-y-12 w-full min-w-0">

      {/* Main Tabbed Navigation bar */}
      <div className="bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-xs flex overflow-x-auto no-scrollbar gap-1.5 w-full min-w-0 scroll-smooth">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "overview" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Biological Revolution</span>
        </button>
        <button
          onClick={() => setActiveTab("works")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "works" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>How Biofloc Works</span>
        </button>
        <button
          onClick={() => setActiveTab("components")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "components" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Hardware & Inputs</span>
        </button>
        <button
          onClick={() => setActiveTab("fishes")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "fishes" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Suitable Species</span>
        </button>
        <button
          onClick={() => setActiveTab("feasibility")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "feasibility" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Dosing & Sandbox</span>
        </button>
        <button
          onClick={() => setActiveTab("provider")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-extrabold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "provider" 
              ? "bg-teal-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Service Desk</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[500px] pl-12">
        
        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div>
                  <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900 tracking-tight">
                    What is Biofloc Technology?
                  </h2>
                  <div className="h-1 w-16 sm:w-20 bg-teal-600 mt-2 rounded-full"></div>
                </div>

                <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                  Biofloc Technology (BFT) is a cutting-edge aquaculture technique that enhances water quality in fish farming by creating a natural, self-sustaining microbial community directly inside the water. 
                </p>

                <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                  This community, known as <strong>biofloc</strong>, consists of heterotrophic bacteria, algae, fungi, protozoa, and suspended organic matter. These microorganisms convert toxic fish excretions, like ammonia and uneaten feed, into protein-rich microbial biomass that the fish can re-consume as nutritious organic food.
                </p>

                {/* Highlight box */}
                <div className="bg-teal-50 border-l-4 border-teal-600 p-3.5 sm:p-5 rounded-r-2xl space-y-1.5 sm:space-y-2">
                  <h4 className="font-sans font-bold text-teal-950 text-xs sm:text-sm flex items-center gap-2">
                    <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 shrink-0" />
                    How Microbes Recycle Nitrogen
                  </h4>
                  <p className="text-teal-900 text-xs sm:text-sm leading-relaxed">
                    By adding cheap carbohydrates (like molasses or flour), we encourage beneficial heterotrophic bacteria to assimilate toxic ammonia-nitrogen. They convert it into microbial cellular protein, which clumps together into microscopic floc granules that fish can eat.
                  </p>
                </div>
              </div>

              {/* Benefits Panels */}
              <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 space-y-4 sm:space-y-6">
                <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0" />
                  Key Benefits of BFT
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Sustainability First</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Minimizes water usage by continuously recycling water, achieving near-zero external environmental discharge.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Superior Cost-Effectiveness</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Lowers required commercial feed quantities since fish recycle nitrogen waste into nutritious microbial biomass food.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Enhanced Fish Immunity</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Beneficial bacteria colonize fish intestines, acting as custom probiotics that protect against aggressive pathogens.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <Gauge className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">High Stocking Densities</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Supports heavy stocking loads safely, resulting in dramatically increased aquaculture yields per square meter.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Challenges & The Future Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-slate-100">
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-sans font-black text-slate-900 text-base sm:text-lg flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
                  Challenges & Critical Considerations
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Managing a biofloc system requires a good understanding of water chemistry and microbial dynamics, making proper training essential for farmers. Setup demands highly continuous aeration and specialized monitoring gear. Furthermore, species choice is critical; BFT requires hardy animals like Tilapia, shrimp, and catfish that can tolerate suspended solids and readily ingest floc biomass.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-sans font-black text-slate-900 text-base sm:text-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0" />
                  The Future of Biofloc Fish Farming
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  As the global population grows, the demand for sustainable and resource-efficient food production is soaring. Biofloc technology represents a significant leap forward in this quest. Paving the way for high-yield, low-footprint protein synthesis, BFT is set to become the gold standard of sustainable aquaculture.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: How Biofloc Works */}
        {activeTab === "works" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">
                The Science of Carbon-Nitrogen Balancing
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Understand the biological and mechanical processes that convert animal waste into nutritional organic biomass under BFT.
              </p>
            </div>

            {/* Circular Process Flow Diagram */}
            <div className="bg-teal-50/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-teal-100/50">
              <h4 className="font-sans font-extrabold text-teal-950 text-center text-[10px] sm:text-xs uppercase tracking-widest font-mono mb-4 sm:mb-6">
                Active Biological Feedback Loop
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative">
                
                <div className="bg-white p-5 rounded-2xl border border-teal-100/60 text-center space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-teal-800 text-white font-mono font-bold text-sm flex items-center justify-center mx-auto">1</span>
                  <h5 className="font-sans font-extrabold text-slate-900 text-base">Fish Excretion</h5>
                  <p className="text-slate-600 text-base leading-relaxed">Fish digest protein feeds and excrete toxic Ammonia nitrogen into water.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-teal-100/60 text-center space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-teal-800 text-white font-mono font-bold text-sm flex items-center justify-center mx-auto">2</span>
                  <h5 className="font-sans font-extrabold text-slate-900 text-base">Carbon Addition</h5>
                  <p className="text-slate-600 text-base leading-relaxed">Cheap carbohydrate (molasses/flour) is dosed to establish a 15:1 C:N ratio.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-teal-100/60 text-center space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-teal-800 text-white font-mono font-bold text-sm flex items-center justify-center mx-auto">3</span>
                  <h5 className="font-sans font-extrabold text-slate-900 text-base">Bacteria Assimilation</h5>
                  <p className="text-slate-600 text-base leading-relaxed">Beneficial heterotrophic bacteria digest ammonia and build cell protein.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-teal-100/60 text-center space-y-2 shadow-xs">
                  <span className="w-8 h-8 rounded-full bg-teal-800 text-white font-mono font-bold text-sm flex items-center justify-center mx-auto">4</span>
                  <h5 className="font-sans font-extrabold text-slate-900 text-base">Floc Consumed</h5>
                  <p className="text-slate-600 text-base leading-relaxed">Suspended biological flocs are re-ingested by fish, cutting feed cost.</p>
                </div>

              </div>
            </div>

            {/* Scientific Nitrogen Partitioning & Comparison (Requested Infographic implementation) */}
            <div className="bg-slate-950 text-white p-4 sm:p-10 rounded-2xl sm:rounded-3xl border border-teal-900/60 space-y-6 sm:space-y-8 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-800 pb-4 sm:pb-6">
                <div className="space-y-1">
                  <span className="text-teal-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest block">Comparative Science Modeling</span>
                  <h3 className="font-sans font-black text-xl sm:text-3xl tracking-tight text-slate-100">
                    Biofloc Pond vs. Traditional Pond
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Recreation of the nitrogen partitioning dynamics. See how BFT recycles 100% feed nitrogen into fish proteins instead of rotting sediment.
                  </p>
                </div>
                
                {/* Visual Legend / Metrics toggle */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-teal-900/40 border border-teal-800 text-teal-300 text-[10px] sm:text-xs font-mono font-bold">
                    Biofloc: Zero Exchange
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-red-950/40 border border-red-900/50 text-red-300 text-[10px] sm:text-xs font-mono font-bold">
                    Traditional: High Effluent
                  </span>
                </div>
              </div>

              {/* Responsive Double Column Interactive Pond Diagram */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                
                {/* Left Column: Biofloc Technology Pond */}
                <div className="relative bg-gradient-to-b from-teal-950 to-slate-900 p-4 sm:p-8 rounded-2xl border border-teal-800/40 space-y-4 sm:space-y-6 overflow-hidden">
                  <div className="absolute top-0 right-0 bg-teal-500/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-bl-xl border-l border-b border-teal-500/20 text-[9px] sm:text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest">
                    Biofloc System (BFT)
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <h4 className="font-sans font-extrabold text-teal-300 text-base sm:text-lg flex items-center gap-2">
                      <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 shrink-0" />
                      Active Microbial Recycling Pond
                    </h4>
                    <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
                      Continuous aeration via a bottom microporous pipe suspends flocs and drives out volatile geosmins. Adding carbon feedstock triggers heterotrophic bacteria to consume ammonia and synthesize high-protein biomass feed.
                    </p>
                  </div>

                  {/* Visual Pond Graphic Container */}
                  <div className="min-h-[220px] sm:h-56 bg-slate-950/80 rounded-xl relative border border-teal-900/30 overflow-hidden flex flex-col justify-between p-3 sm:p-4 gap-3">
                    
                    {/* Air Elimination and Geosmin strippings */}
                    <div className="flex flex-wrap justify-between items-start text-[9px] sm:text-[10px] font-mono text-slate-400 gap-1">
                      <div className="flex items-center gap-1 text-teal-300">
                        <Flame className="w-3.5 h-3.5 animate-pulse" />
                        <span>Carbon Source added</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-300">
                        <ArrowRight className="w-3.5 h-3.5 -rotate-90 animate-bounce" />
                        <span>2-MIB Geosmin Stripped</span>
                      </div>
                    </div>

                    {/* Middle: Bubbling & Flocs */}
                    <div className="relative my-2 sm:absolute sm:inset-x-0 sm:bottom-8 sm:top-10 pointer-events-none overflow-hidden min-h-[80px]">
                      {/* Animated Air Bubbles */}
                      <div className="absolute bottom-0 left-1/4 w-0.5 h-16 sm:h-20 bg-teal-400/30 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-2 left-1/2 w-0.5 h-20 sm:h-24 bg-teal-400/40 rounded-full animate-ping"></div>
                      <div className="absolute bottom-1 left-3/4 w-0.5 h-12 sm:h-16 bg-teal-400/20 rounded-full animate-pulse"></div>
                      
                      {/* Floating Microbial Floc Clumps */}
                      <div className="absolute top-1/4 left-2 sm:left-1/3 bg-amber-900/40 text-amber-200 border border-amber-800/60 px-2 py-0.5 rounded-full text-[9px] font-mono flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-ping"></span>
                        <span>Biofloc (~39% N)</span>
                      </div>

                      <div className="absolute bottom-1/3 right-2 sm:right-1/4 bg-teal-900/50 text-teal-200 border border-teal-800/60 px-2 py-0.5 rounded-full text-[9px] font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"></span>
                        <span>Bacteria & Algae</span>
                      </div>
                    </div>

                    {/* Fish with digest description */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                      <div className="bg-slate-900/90 border border-teal-500/30 p-2 sm:p-2.5 rounded-lg max-w-[180px] space-y-1">
                        <div className="text-[10px] font-bold text-teal-300 flex items-center gap-1">
                          <span>Fish: -42% Nitrogen</span>
                        </div>
                        <p className="text-[9px] text-slate-300 leading-normal">
                          Beneficial gut bacteria assist in high protein assimilation and FCR optimization.
                        </p>
                      </div>

                      <div className="text-right text-[9px] font-mono text-slate-400">
                        <div>Water: <span className="text-teal-400 font-bold">~14% N</span></div>
                        <div>Sediment: <span className="text-teal-400 font-bold">~5% N</span></div>
                      </div>
                    </div>

                    {/* Bottom: Microporous pipe */}
                    <div className="border-t border-teal-800/30 pt-1.5 flex flex-wrap justify-between items-center text-[9px] font-mono text-slate-500 gap-1">
                      <span>⭕ Microporous Aerator Tube</span>
                      <span className="text-teal-500 font-bold">Continuous DO &gt; 5.5 mg/L</span>
                    </div>

                  </div>

                  {/* Nitrogen Partitioning Progress bars */}
                  <div className="space-y-3 bg-slate-950/40 p-3.5 sm:p-4 rounded-xl border border-slate-800/40">
                    <h5 className="text-[10px] sm:text-xs font-mono font-bold text-teal-300 uppercase tracking-wider">
                      Nitrogen Allocation Budget (BFT)
                    </h5>
                    
                    <div className="space-y-2 sm:space-y-2.5">
                      <div>
                        <div className="flex flex-wrap justify-between text-[11px] sm:text-xs font-mono text-slate-300 gap-1">
                          <span>Growth & Carcass Retention</span>
                          <span className="text-teal-400 font-bold">42% Nitrogen</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1">
                          <div className="bg-teal-500 h-full rounded-full transition-all duration-1000" style={{ width: '42%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap justify-between text-[11px] sm:text-xs font-mono text-slate-300 gap-1">
                          <span>Microbial Biofloc Recycling</span>
                          <span className="text-teal-400 font-bold">39% Nitrogen</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1">
                          <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: '39%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap justify-between text-[11px] sm:text-xs font-mono text-slate-300 gap-1">
                          <span>Clean Recycled Water Column</span>
                          <span className="text-teal-400 font-bold">14% Nitrogen</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1">
                          <div className="bg-sky-500 h-full rounded-full transition-all duration-1000" style={{ width: '14%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap justify-between text-[11px] sm:text-xs font-mono text-slate-300 gap-1">
                          <span>Benthic Sludge & Sediment Waste</span>
                          <span className="text-teal-400 font-bold">5% Nitrogen</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1">
                          <div className="bg-emerald-600 h-full rounded-full transition-all duration-1000" style={{ width: '5%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Traditional Aquaculture Pond */}
                <div className="relative bg-gradient-to-b from-red-950/20 to-slate-900 p-4 sm:p-8 rounded-2xl border border-red-900/20 space-y-4 sm:space-y-6 overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-500/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-bl-xl border-l border-b border-red-500/20 text-[9px] sm:text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
                    Traditional System
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <h4 className="font-sans font-extrabold text-red-300 text-base sm:text-lg flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0" />
                      Accumulative Effluent Pond
                    </h4>
                    <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
                      Lacks carbon balancing or micro-aeration suspension. Uneaten feed and feces decompose anaerobically on the bottom, releasing toxic gasses. Volatile 2-MIB geosmins accumulate, causing fish to taste muddy.
                    </p>
                  </div>

                  {/* Visual Pond Graphic Container */}
                  <div className="min-h-[220px] sm:h-56 bg-slate-950/80 rounded-xl relative border border-red-950/30 overflow-hidden flex flex-col justify-between p-3 sm:p-4 gap-3">
                    
                    {/* Air Elimination and Geosmin strippings */}
                    <div className="flex flex-wrap justify-between items-start text-[9px] sm:text-[10px] font-mono text-slate-500 gap-1">
                      <span className="text-red-400">No Carbon Feed added</span>
                      <span className="text-red-400 flex items-center gap-1">
                        <span>Geosmin Trapped (Muddy Taste)</span>
                      </span>
                    </div>

                    {/* Middle: Decaying pellets, no flocs */}
                    <div className="relative my-2 sm:absolute sm:inset-x-0 sm:bottom-8 sm:top-10 pointer-events-none overflow-hidden min-h-[80px]">
                      {/* Heavy Decaying Pellets settling down */}
                      <div className="absolute bottom-2 left-1/3 w-2 h-2 rounded-full bg-red-900/60 border border-red-800"></div>
                      <div className="absolute bottom-1.5 left-2/3 w-2 h-2 rounded-full bg-red-900/80 border border-red-800"></div>
                      <div className="absolute bottom-3 left-1/2 w-1.5 h-1.5 rounded-full bg-red-900/50"></div>
                      
                      {/* Sparse Plankton */}
                      <div className="absolute top-1/3 left-2 sm:left-1/4 bg-slate-800/40 text-slate-400 border border-slate-700/60 px-2 py-0.5 rounded-full text-[9px] font-mono flex items-center gap-1">
                        <span>Natural Plankton (~1% N)</span>
                      </div>
                    </div>

                    {/* Fish with digest description */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                      <div className="bg-slate-900/90 border border-red-500/20 p-2 sm:p-2.5 rounded-lg max-w-[180px] space-y-1">
                        <div className="text-[10px] font-bold text-red-300 flex items-center gap-1">
                          <span>Fish: -28% Nitrogen</span>
                        </div>
                        <p className="text-[9px] text-slate-400 leading-normal">
                          Low assimilation rates due to standard metabolic limits and high ambient stress.
                        </p>
                      </div>

                      <div className="text-right text-[9px] font-mono text-slate-400">
                        <div>Water: <span className="text-red-400 font-bold">~22% N</span></div>
                        <div>Sediment: <span className="text-red-400 font-bold">~49% N</span></div>
                      </div>
                    </div>

                    {/* Bottom: No piping */}
                    <div className="border-t border-red-900/20 pt-1.5 flex flex-wrap justify-between items-center text-[9px] font-mono text-slate-600 gap-1">
                      <span>⚠️ No specialized aerator grid</span>
                      <span className="text-red-500 font-bold">Anaerobic benthic decay</span>
                    </div>

                  </div>

                  {/* Nitrogen Partitioning Progress bars */}
                  <div className="space-y-3 bg-slate-950/40 p-3.5 sm:p-4 rounded-xl border border-slate-800/40">
                    <h5 className="text-[10px] sm:text-xs font-mono font-bold text-red-300 uppercase tracking-wider">
                      Nitrogen Allocation Budget (Traditional)
                    </h5>
                    
                    <div className="space-y-2 sm:space-y-2.5">
                      <div>
                        <div className="flex flex-wrap justify-between text-[11px] sm:text-xs font-mono text-slate-300 gap-1">
                          <span>Growth & Carcass Retention</span>
                          <span className="text-red-400 font-bold">28% Nitrogen</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1">
                          <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: '28%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap justify-between text-[11px] sm:text-xs font-mono text-slate-300 gap-1">
                          <span>Microbial / Natural food (Algae)</span>
                          <span className="text-red-400 font-bold">1% Nitrogen</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1">
                          <div className="bg-slate-500 h-full rounded-full transition-all duration-1000" style={{ width: '1%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap justify-between text-[11px] sm:text-xs font-mono text-slate-300 gap-1">
                          <span>Dissolved in Wastewater Column</span>
                          <span className="text-red-400 font-bold">22% Nitrogen</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1">
                          <div className="bg-red-400 h-full rounded-full transition-all duration-1000" style={{ width: '22%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap justify-between text-[11px] sm:text-xs font-mono text-slate-300 gap-1">
                          <span>Benthic Sludge & Sediment Waste</span>
                          <span className="text-red-400 font-bold">49% Nitrogen</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1">
                          <div className="bg-red-600 h-full rounded-full transition-all duration-1000" style={{ width: '49%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Core process definitions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-teal-100/50 bg-white space-y-2 sm:space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">Continuous Aeration</h4>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Bioflocs are heavy and will settle quickly to the bottom if water movement slows down. Continuous, powerful aeration (using ring or roots blowers) is mandatory to keep flocs suspended in water and satisfy the high respiration demand of both the fish and microbial colonies.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-teal-100/50 bg-white space-y-2 sm:space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">Carbon Source Management</h4>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Standard fish feed does not have enough carbon to enable heterotrophic bacteria to assimilate all excreted nitrogen. Adding a localized carbon source like sugarcane molasses, wheat starch, or tapioca maintains a precise carbohydrate-to-nitrogen balance to drive assimilation.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-teal-100/50 bg-white space-y-2 sm:space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <Droplet className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">Zero-Water Exchange</h4>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Unlike traditional intensive aquaculture which requires throwing away massive amounts of water daily to dilute accumulated ammonia, Biofloc systems operate under zero-water exchange. The water is recycled, protecting wild ecosystems from effluent pollution.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-teal-100/50 bg-white space-y-2 sm:space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <Microscope className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">Meticulous Water Quality Monitoring</h4>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Farmers must test dissolved oxygen (DO), pH, alkalinity, and floc settled volume (ml/L) daily. Floc concentration must be managed to prevent gills from clogging while ensuring adequate bacterial populations are present to purify the water.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Tab 3: Hardware & Inputs Checklist */}
        {activeTab === "components" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">
                Equipment & Materials Checklist
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                A structured summary of all civil infrastructure, aeration hardware, bacterial cultures, and tools required for BFT setup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {componentsNeeded.map((cat, idx) => (
                <div key={idx} className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200/80 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-200/60 pb-3">
                    <div className="p-2 rounded-lg bg-teal-800 text-white shrink-0">
                      <cat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="font-sans font-black text-slate-900 text-sm sm:text-base">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3.5">
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/50 space-y-1 hover:border-teal-200 transition-all">
                        <h4 className="font-sans font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 shrink-0" />
                          {item.name}
                        </h4>
                        <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed pl-5 sm:pl-6">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Suitable Species */}
        {activeTab === "fishes" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">
                Highly Suitable Biofloc Species
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Since biofloc water is rich in suspended organic particles, choose hardy fish that can utilize microbial flocs as supplemental nutrition.
              </p>
            </div>

            {/* Selector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full min-w-0">
              
              {/* Left Selector Column */}
              <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 pb-2 lg:pb-0 w-full min-w-0">
                {bioflocSpecies.map((fish, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSpecies(index)}
                    className={`p-3 sm:p-4 rounded-xl text-left border transition-all flex justify-between items-center cursor-pointer shrink-0 lg:shrink w-[180px] sm:w-[220px] lg:w-full ${
                      selectedSpecies === index 
                        ? "bg-teal-50 border-teal-500 text-teal-950 font-extrabold shadow-xs" 
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700"
                    }`}
                  >
                    <div>
                      <span className="block text-[10px] sm:text-xs font-mono opacity-60">Candidate {index + 1}</span>
                      <span className="text-xs sm:text-base font-sans font-bold">{fish.name}</span>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-700 transition-transform ${selectedSpecies === index ? "translate-x-1" : ""}`} />
                  </button>
                ))}
              </div>

              {/* Right Details Panel */}
              <div className="lg:col-span-8 bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-teal-100/60 shadow-xs space-y-4 sm:space-y-6 w-full min-w-0">
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900">
                      {bioflocSpecies[selectedSpecies].name}
                    </h3>
                    <p className="text-teal-700 text-xs sm:text-sm font-mono italic mt-0.5">
                      {bioflocSpecies[selectedSpecies].scientific}
                    </p>
                  </div>
                  <span className="inline-flex px-2.5 py-1 bg-teal-50 border border-teal-100 text-teal-800 rounded-full font-mono text-[10px] sm:text-xs font-extrabold self-start sm:self-auto">
                    Market Value: {bioflocSpecies[selectedSpecies].marketPrice}
                  </span>
                </div>

                <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-sans">
                  {bioflocSpecies[selectedSpecies].desc}
                </p>

                {/* Specific Threshold Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 pt-2">
                  <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block uppercase">Stocking Density</span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-slate-800 block mt-0.5 sm:mt-1">{bioflocSpecies[selectedSpecies].density}</span>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block uppercase">Water Temperature</span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-slate-800 block mt-0.5 sm:mt-1">{bioflocSpecies[selectedSpecies].temp}</span>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block uppercase">Safe pH Range</span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-slate-800 block mt-0.5 sm:mt-1">{bioflocSpecies[selectedSpecies].ph}</span>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block uppercase">Grow-Out Cycle</span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-slate-800 block mt-0.5 sm:mt-1">{bioflocSpecies[selectedSpecies].cycle}</span>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block uppercase">Target FCR</span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-slate-800 block mt-0.5 sm:mt-1">{bioflocSpecies[selectedSpecies].fcr}</span>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block uppercase">Average Survival</span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-slate-800 block mt-0.5 sm:mt-1">{bioflocSpecies[selectedSpecies].survival}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 5: Carbon Calculator & Imhoff Diagnostics Sandbox */}
        {activeTab === "feasibility" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">
                Dosing Calibrators & Diagnostics
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Calculate carbohydrate dosing weight to maintain nitrogen balancing, and diagnose your biological floc health index.
              </p>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full min-w-0">
              
              {/* Carbon dose form */}
              <div className="lg:col-span-7 bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-teal-100/80 shadow-xs space-y-4 sm:space-y-6 w-full min-w-0">
                <div className="border-b border-slate-100 pb-3 sm:pb-4">
                  <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0" />
                    Carbon-to-Nitrogen Carbohydrate Calibrator
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Based on standard Avnimelech equation. Enter target water volumes and measured TAN (Ammonia) ppm to calculate correct molasses dosing weights.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tank Water Volume (Liters)</label>
                    <input
                      type="number"
                      value={tankVolume}
                      onChange={(e) => setTankVolume(Math.max(100, Number(e.target.value)))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Measured Ammonia Level (ppm / mg/L)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={currentAmmonia}
                      onChange={(e) => setCurrentAmmonia(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Carbon Feed Stock Source</label>
                    <select
                      value={carbonSource}
                      onChange={(e) => setCarbonSource(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 bg-white"
                    >
                      <option value="Molasses">Molasses (~40% Carbon)</option>
                      <option value="Wheat Flour">Wheat Flour (~50% Carbon)</option>
                      <option value="Tapioca Starch">Tapioca Starch (~52% Carbon)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Carbon-to-Nitrogen (C:N)</label>
                    <select
                      value={targetRatio}
                      onChange={(e) => setTargetRatio(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 bg-white"
                    >
                      <option value={10}>10:1 (Maintenance purification)</option>
                      <option value={15}>15:1 (Standard biofloc startup)</option>
                      <option value={20}>20:1 (Extreme nitrogen emergency purge)</option>
                    </select>
                  </div>
                </div>

                {/* Calculated Result Box */}
                <div className="bg-teal-50/75 p-4 sm:p-5 rounded-2xl border border-teal-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-teal-800 uppercase tracking-wider font-bold">Recommended Carbohydrate Dose</span>
                    <h4 className="text-2xl sm:text-4xl font-mono font-black text-teal-900 mt-1 break-words">
                      {carbohydrateNeededGrams.toFixed(1)} grams
                    </h4>
                    <p className="text-[11px] sm:text-xs text-teal-800/80 mt-1 font-sans leading-normal">
                      Dissolve thoroughly in water from the tank, stir well, and distribute evenly over the aeration diffuser lines.
                    </p>
                  </div>
                  <div className="bg-white px-3.5 py-2 rounded-xl border border-teal-100 text-center shrink-0 w-full sm:w-auto">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Carbon Weight</span>
                    <span className="text-sm sm:text-base font-mono font-bold text-slate-800">
                      {Math.round(carbohydrateNeededGrams * carbonContent[carbonSource])}g Carbon
                    </span>
                  </div>
                </div>

              </div>

              {/* Imhoff Cone Diagnostics */}
              <div className="lg:col-span-5 bg-white p-4 sm:p-6 rounded-2xl border border-teal-100/80 shadow-xs space-y-4 sm:space-y-6 w-full min-w-0">
                <div className="border-b border-slate-100 pb-3 sm:pb-4">
                  <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    <CircleDot className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0" />
                    Imhoff Cone Settled Floc Index
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Take a 1-Liter tank sample, let settle for 30 minutes in a graduated cone, and select your reading value.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Floc Volume Reading</span>
                    <span className="font-mono text-teal-700 font-extrabold">{flocVolume} ml/L</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={flocVolume}
                    onChange={(e) => setFlocVolume(Number(e.target.value))}
                    className="w-full accent-teal-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-400 mt-1 font-mono">
                    <span>0 ml/L (Zero)</span>
                    <span>50 ml/L (Extremely Dense)</span>
                  </div>
                </div>

                {/* Diagnostics Outcome */}
                <div className={`p-3.5 sm:p-4 rounded-xl border ${
                  flocVolume < 5 
                    ? "bg-amber-50 border-amber-200 text-amber-900"
                    : flocVolume <= 25
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : "bg-red-50 border-red-200 text-red-950"
                }`}>
                  <h4 className="font-sans font-bold text-xs sm:text-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {flocVolume < 5 
                      ? "Biological community underdeveloped" 
                      : flocVolume <= 25 
                      ? "Optimal biological density" 
                      : "Aggressive organic overload!"}
                  </h4>
                  <p className="text-[11px] sm:text-xs mt-1 leading-relaxed opacity-90">
                    {flocVolume < 5 
                      ? "Suspended flocs are sparse. Increase molasses/feed inputs by 10-15% daily, do not replace water, and keep aeration robust."
                      : flocVolume <= 25
                      ? "Healthy suspension density. Perfect for feed digestion and biological purification. Maintain normal dosing and continuous blowers."
                      : "Water has excessive floc aggregates, which can clog fish gills. Flush center bottom drains to discharge settled sludge particles immediately."}
                  </p>
                </div>

              </div>

            </div>

            {/* Comparative Feasibility Section across all 4 Technologies */}
            <div className="pt-6 sm:pt-8 border-t border-slate-200">
              <TechnologyComparison activeTech="biofloc" />
            </div>

          </div>
        )}

        {/* Tab 6: Provider & Consult */}
        {activeTab === "provider" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="bg-slate-50 border border-slate-150 p-5 sm:p-12 rounded-2xl sm:rounded-3xl text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900">
                  Looking for professional Biofloc Service Providers?
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
                  Our professional team provides premium circular PVC tanks, continuous high-volume ring blowers, activated Bacillus cultures, and direct seed shipping consults.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-slate-100 max-w-xl mx-auto">
                <div className="text-left space-y-2">
                  <span className="text-[10px] font-mono font-bold text-teal-800 uppercase tracking-widest block">Direct Communications Desk</span>
                  <div className="text-xs text-slate-600 space-y-2">
                    <p>
                      <strong>WhatsApp Support Helpline:</strong><br />
                      <span className="font-mono text-sm font-black text-slate-800 select-all">+919748952342</span>
                    </p>
                    <p>
                      <strong>Email Inquiries:</strong><br />
                      <a 
                        href="mailto:mf@modernfisheries.com" 
                        className="font-mono text-sm font-black text-teal-800 hover:underline select-all"
                        title="Click to open default mail client"
                      >
                        mf@modernfisheries.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-200 text-[10px] sm:text-xs text-slate-400 font-mono">
                Modern Fisheries Aquaculture desk is available Monday - Saturday, 9:00 AM - 6:00 PM (IST).
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 14-Day Setup Timeline Section */}
      <div className="bg-teal-950/5 p-4 sm:p-10 rounded-2xl sm:rounded-3xl border border-teal-900/10 space-y-6 sm:space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1 sm:space-y-1.5">
          <span className="text-teal-800 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">Culture Timeline</span>
          <h3 className="font-sans font-black text-slate-950 text-lg sm:text-2xl">
            14-Day Biofloc Water Culturing Protocol
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm">
            Follow this protocol step-by-step to establish a rich biological community before releasing fingerlings into high density tanks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {preparationCalendar.map((step, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl border border-teal-100 shadow-xs space-y-3 relative group hover:border-teal-200 transition-all">
              <span className="text-xs sm:text-sm font-mono font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full inline-block">
                {step.day}
              </span>
              <h4 className="font-sans font-black text-slate-900 text-base sm:text-lg leading-snug">
                {step.title}
              </h4>
              <p className="text-slate-600 text-base leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* YouTube Guide Carousel Slider Section */}
      <div id="youtube-ras-slider" className="mt-12 pt-8 px-4 sm:px-6 lg:px-8 border-t border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 animate-pulse" />
              <span>Interactive Training Materials</span>
            </div>
            <h3 className="font-sans font-black text-lg sm:text-2xl text-slate-900 tracking-tight">
              Biofloc Viral Ideas
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Explore 20 certified guides, water quality masterclasses, and intensive harvest walk-throughs.
            </p>
          </div>

          {/* Scroll Navigation Controls & Viral Filter */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
            <button
              id="biofloc-viral-toggle-btn"
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

            <button
              id="biofloc-slide-left-btn"
              onClick={() => scrollBiofloc("left")}
              className="p-2 rounded-xl border border-teal-100 bg-white text-teal-800 hover:bg-teal-50 active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              id="biofloc-slide-right-btn"
              onClick={() => scrollBiofloc("right")}
              className="p-2 rounded-xl border border-teal-100 bg-white text-teal-800 hover:bg-teal-50 active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Scrolling Carousel */}
        <div className="relative w-full overflow-hidden">
          <div
            id="biofloc-video-scroll-container"
            ref={bioflocScrollRef}
            onMouseEnter={() => setIsBioflocHovered(true)}
            onMouseLeave={() => setIsBioflocHovered(false)}
            onTouchStart={() => setIsBioflocHovered(true)}
            onTouchEnd={() => setIsBioflocHovered(false)}
            className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar select-none animate-fade-in"
            style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'auto' }}
          >
            {(() => {
              const displayedBioflocVideos = showViralOnly ? bioflocVideos.filter(isVideoViral) : bioflocVideos;
              const listToRender = displayedBioflocVideos.length > 0 ? displayedBioflocVideos : bioflocVideos;
              return [...listToRender, ...listToRender].map((video, index) => (
                <div key={`${video.id}-biofloc-clone-${index}`} className="w-[230px] sm:w-[320px] max-w-[80vw] sm:max-w-none shrink-0">
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
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 min-w-0 space-y-6 lg:sticky lg:top-20">
          <RightSidebarAd reloadKey="biofloc-sidebar-ad" />
        </div>
      </div>
    </div>
  );
}
