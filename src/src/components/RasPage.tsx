import React, { useState, useRef, useEffect } from "react";
import { Video } from "../types";
import VideoCard from "./VideoCard";
import { fetchYouTubeChannelVideos, fetchTrendingTopicVideos } from "../youtubeFeed";
import TechnologyComparison from "./TechnologyComparison";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";
import { 
  Waves, Cpu, RefreshCw, Layers, CheckCircle2, Sliders, Play, AlertCircle, 
  Info, Calculator, Droplet, DollarSign, Building, Sparkles, Phone, 
  FileText, ChevronRight, Check, Hammer, Activity, Shield, Thermometer, 
  Gauge, TrendingUp, Settings, Eye, MessageSquare, ChevronDown, ChevronLeft,
  ArrowRight, Flame, Mail
} from "lucide-react";

import { RAS_YOUTUBE_VIDEOS as SHARED_RAS_YOUTUBE_VIDEOS, isVideoViral } from "../data";
const RAS_YOUTUBE_VIDEOS: Video[] = SHARED_RAS_YOUTUBE_VIDEOS;
/*
const OLD_RAS_YOUTUBE_VIDEOS: Video[] = [
  {
    id: "ras-yt-1",
    title: "10,000 Ton Commercial RAS Salmon Farm: Deep Dive Tour",
    description: "Take a walkthrough of one of the world's largest land-based salmon recirculating aquaculture facilities. See the scale of drum filters, degassers, and biosecurity protocols.",
    thumbnail: "https://images.unsplash.com/photo-1516715094727-ec48be335d79?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/_yIAtn2zU0A",
    duration: "22:15",
    views: "124K views",
    type: "youtube",
    creator: "Aquaculture Systems International",
    publishDate: "2 months ago",
    category: "RAS",
    likes: 4850
  },
  {
    id: "ras-yt-2",
    title: "How to Size your Biological MBBR Biofilter for RAS",
    description: "Step-by-step engineering tutorial on calculating moving bed biofilm reactor (MBBR) volume, specific surface area, and oxygen requirements for feed-based nitrification.",
    thumbnail: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/V-26oO46rB4",
    duration: "18:40",
    views: "85K views",
    type: "youtube",
    creator: "Aqua Engineers Hub",
    publishDate: "1 month ago",
    category: "RAS",
    likes: 3120
  },
  {
    id: "ras-yt-3",
    title: "The Science of Rotating Micro-Screen Drum Filters in RAS",
    description: "An in-depth look at mechanical solids filtration. Understand mesh size selection (60 vs 90 microns), backwash frequency, and sludge removal efficiency.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/m5x6U7xT8fI",
    duration: "14:10",
    views: "62K views",
    type: "youtube",
    creator: "Hatchery Systems Tech",
    publishDate: "3 weeks ago",
    category: "RAS",
    likes: 2150
  },
  {
    id: "ras-yt-4",
    title: "Pure Oxygen Injection vs Aeration: High Density Trials",
    description: "Comparing the operating efficiency of low head oxygenators (LHO) and Speece cones versus traditional air diffusers in intensive stocking density tanks.",
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/pL7r69uCHsc",
    duration: "15:25",
    views: "54K views",
    type: "youtube",
    creator: "Oxygenation Labs",
    publishDate: "3 days ago",
    category: "RAS",
    likes: 1980
  },
  {
    id: "ras-yt-5",
    title: "CO2 Degassing Column Sizing and Air-Stripping Calculations",
    description: "Excess carbon dioxide limits fish growth. Learn how to calculate gas-liquid ratios and design structured media trickling filters for efficient CO2 removal.",
    thumbnail: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/T_8R7S6W5Q8",
    duration: "19:50",
    views: "43K views",
    type: "youtube",
    creator: "RAS Mechanics",
    publishDate: "1 week ago",
    category: "RAS",
    likes: 1420
  },
  {
    id: "ras-yt-6",
    title: "Advanced Biosecurity Protocols in Closed-Loop Aquaculture",
    description: "Minimize pathogen entry risks. Expert guidelines on quarantine designs, egg disinfection, water ozonization, and high-efficiency UV sterilization loops.",
    thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/D3_4g6u7x8M",
    duration: "11:30",
    views: "29K views",
    type: "youtube",
    creator: "Bio-Security Pro",
    publishDate: "4 days ago",
    category: "RAS",
    likes: 1200
  },
  {
    id: "ras-yt-7",
    title: "Unboxing & Calibrating Industrial Optical Dissolved Oxygen Sensors",
    description: "Avoid toxic crashes. Learn how to wire, configure, and calibrate membrane-free optical DO probes for 24/7 continuous SCADA monitoring.",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/L_2H3K8S9J4",
    duration: "10:15",
    views: "35K views",
    type: "youtube",
    creator: "SensorTech Systems",
    publishDate: "5 days ago",
    category: "RAS",
    likes: 1540
  },
  {
    id: "ras-yt-8",
    title: "Automatic Sludge Dewatering Systems for Commercial Fish Farms",
    description: "How to handle concentrated waste stream. Explaining filter presses, belt thickeners, and settling ponds to turn fish waste into rich organic fertilizer.",
    thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/R_2S4T6Y8U0",
    duration: "16:45",
    views: "48K views",
    type: "youtube",
    creator: "WasteWater Innovators",
    publishDate: "2 weeks ago",
    category: "RAS",
    likes: 1890
  },
  {
    id: "ras-yt-9",
    title: "High-Density Siberian Sturgeon Farming: 5-Year Case Study",
    description: "A detailed breakdown of capital expenses, water quality logs, growth kinetics, and cavitation prevention in a temperature-controlled Sturgeon loop.",
    thumbnail: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/3S9R6W_LwVw",
    duration: "25:30",
    views: "93K views",
    type: "youtube",
    creator: "Siberian Sturgeon Group",
    publishDate: "3 months ago",
    category: "RAS",
    likes: 3820
  },
  {
    id: "ras-yt-10",
    title: "Setting up a Backyard 3-Tank RAS for Tilapia: DIY Guide",
    description: "Budget-friendly 3000L recirculating setup using food-grade IBC totes, radial flow settlers, and a constant-height pump loop for urban homesteads.",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/8F-Bf6t67Y4",
    duration: "13:50",
    views: "210K views",
    type: "youtube",
    creator: "DIY Backyard Tech",
    publishDate: "1 month ago",
    category: "RAS",
    likes: 9200
  },
  {
    id: "ras-yt-11",
    title: "UV Sterilization vs Ozone Dosages for Water-Borne Pathogens",
    description: "Learn how to establish correct micro-joule UV dosages and ozone redox potential (ORP) targets to eliminate Vibrio and columnaris without harming fish.",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/D3_4g6u7x8M",
    duration: "14:55",
    views: "37K views",
    type: "youtube",
    creator: "Aquatic Science Lab",
    publishDate: "6 days ago",
    category: "RAS",
    likes: 1250
  },
  {
    id: "ras-yt-12",
    title: "Managing Ammonia and Nitrite Spikes in Newly Seeded Biofilters",
    description: "Avoid toxic losses during biofilter cycling. Learn when to restrict feed, use sodium chloride for nitrite toxicity, and boost beneficial Nitrosomonas/Nitrobacter.",
    thumbnail: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/T_8R7S6W5Q8",
    duration: "17:20",
    views: "52K views",
    type: "youtube",
    creator: "Nitrification Masters",
    publishDate: "1 week ago",
    category: "RAS",
    likes: 1980
  },
  {
    id: "ras-yt-13",
    title: "Optimal Water Velocity and Circular Flow Dynamics in RAS Tanks",
    description: "Water rotation is crucial. We explain rotational velocity calculations, self-cleaning bottom shear force, and swimming speeds for muscle development.",
    thumbnail: "https://images.unsplash.com/photo-1472214222541-d510753a8707?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/17f96R_LwVw",
    duration: "15:40",
    views: "44K views",
    type: "youtube",
    creator: "Fluid Dynamics Aqua",
    publishDate: "2 weeks ago",
    category: "RAS",
    likes: 1640
  },
  {
    id: "ras-yt-14",
    title: "Selecting the Best Biomedia: K1 vs K3 vs Ceramic Rings",
    description: "Not all media is created equal. Comparing protected surface area, clogging rates, fluidized drag coefficients, and degassing efficiency.",
    thumbnail: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/fK97V60h8xI",
    duration: "12:10",
    views: "61K views",
    type: "youtube",
    creator: "Biofilter Media Reviews",
    publishDate: "10 days ago",
    category: "RAS",
    likes: 2450
  },
  {
    id: "ras-yt-15",
    title: "Calculating the True Energy Footprint of a 24/7 Pumping Loop",
    description: "Reduce high operating costs. Designing pump curves, head loss estimations, and variable frequency drive (VFD) setups to slash power bills.",
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/8F-Bf6t67Y4",
    duration: "21:15",
    views: "28K views",
    type: "youtube",
    creator: "Agri-Energy Engineers",
    publishDate: "4 weeks ago",
    category: "RAS",
    likes: 1100
  },
  {
    id: "ras-yt-16",
    title: "African Catfish Growth Rates at 120kg/m³ in Closed Systems",
    description: "Staggering yields. Watch our harvest and inspect the water chemistry results supporting extreme biosecurity and extreme stocking density.",
    thumbnail: "https://images.unsplash.com/photo-1516715094727-ec48be335d79?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/p_X6R3S9H94",
    duration: "18:10",
    views: "81K views",
    type: "youtube",
    creator: "Modern Fisheries",
    publishDate: "1 month ago",
    category: "RAS",
    likes: 3120
  },
  {
    id: "ras-yt-17",
    title: "Automatic Alarm Systems & Generator ATS Backups in Aquaculture",
    description: "When power fails, fish can die in minutes. Complete walkthrough of automatic transfer switches (ATS) and remote dial-out oxygen warnings.",
    thumbnail: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/P_4R7W8Q9K1",
    duration: "16:30",
    views: "33K views",
    type: "youtube",
    creator: "Aquaculture Safety Systems",
    publishDate: "2 months ago",
    category: "RAS",
    likes: 1450
  },
  {
    id: "ras-yt-18",
    title: "pH Control Using Sodium Bicarbonate: Carbonate Buffer Chemistry",
    description: "Dosing ratios decoded. Maintain stable alkalinity above 120 ppm to prevent acidic crashes caused by continuous microbial biofiltration.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/S_5T6Y7U8I9",
    duration: "14:15",
    views: "41K views",
    type: "youtube",
    creator: "Modern Fisheries Academy",
    publishDate: "1 year ago",
    category: "RAS",
    likes: 1800
  },
  {
    id: "ras-yt-19",
    title: "Farming Barramundi in Brackish Water RAS: Salt-Water Loop Setups",
    description: "Adapting freshwater filtration for marine species. How to design protein skimmers, foam fractionators, and manage specific gravity levels.",
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/B_7R8S9T0W1",
    duration: "23:10",
    views: "57K views",
    type: "youtube",
    creator: "Marine Recirc",
    publishDate: "2 months ago",
    category: "RAS",
    likes: 2490
  },
  {
    id: "ras-yt-20",
    title: "Designing an Inline Heat Exchanger for Temperature Regulation",
    description: "Maintain perfect species thermoclines year-round. Comparing geothermal heat pumps, boiler loops, and titanium plate heat exchanger efficiencies.",
    thumbnail: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/V_3R7S4W8Q1",
    duration: "19:40",
    views: "31K views",
    type: "youtube",
    creator: "Thermal Aquaculture Design",
    publishDate: "1 month ago",
    category: "RAS",
    likes: 1320
  }
];
*/

interface RasPageProps {
  onVideoClick?: (video: Video) => void;
  onBackToDashboard?: () => void;
}

export default function RasPage({ onVideoClick, onBackToDashboard }: RasPageProps) {
  // Page Navigation Tabs (for deep study/learning experience)
  const [activeTab, setActiveTab] = useState<"overview" | "components" | "works" | "feasibility" | "fishes" | "provider">("overview");

  // State to hold active RAS videos (either curated or dynamic live searches)
  const [rasVideos, setRasVideos] = useState<Video[]>(RAS_YOUTUBE_VIDEOS);
  const [showViralOnly, setShowViralOnly] = useState<boolean>(false);

  // Dynamic YouTube API Key query support
  useEffect(() => {
    async function loadDynamicRasVideos() {
      try {
        const [channelVids, trendingVids] = await Promise.all([
          fetchYouTubeChannelVideos().catch(() => []),
          fetchTrendingTopicVideos(false, "RAS recirculating aquaculture system fish farming viral").catch(() => [])
        ]);

        const combined = [...channelVids, ...trendingVids];
        if (combined.length > 0) {
          const filtered = combined.filter(v => {
            const titleLower = (v.title || "").toLowerCase();
            const descLower = (v.description || "").toLowerCase();
            const catLower = (v.category || "").toLowerCase();

            return (
              catLower === "ras" || 
              titleLower.includes("recirculating") || 
              titleLower.includes("ras") ||
              titleLower.includes("drum filter") ||
              titleLower.includes("mbbr") ||
              titleLower.includes("degasser") ||
              titleLower.includes("biofilter") ||
              descLower.includes("recirculating aquaculture")
            );
          });

          if (filtered.length > 0) {
            setRasVideos(prev => {
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
        console.error("Error loading RAS YouTube videos:", err);
      }
    }
    loadDynamicRasVideos();
  }, []);

  // Scrolling YouTube Slider states & refs
  const rasScrollRef = useRef<HTMLDivElement>(null);
  const [isRasHovered, setIsRasHovered] = useState(false);
  const rasPosRef = useRef(0);

  // Sync decimal coordinates with manual scrolling
  useEffect(() => {
    const el = rasScrollRef.current;
    const handleScroll = () => {
      if (el) rasPosRef.current = el.scrollLeft;
    };
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      rasPosRef.current = el.scrollLeft;
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

      if (rasScrollRef.current) {
        const el = rasScrollRef.current;
        if (isRasHovered) {
          rasPosRef.current = el.scrollLeft;
        } else {
          const { scrollWidth, clientWidth } = el;
          const halfWidth = scrollWidth / 2;
          if (scrollWidth > clientWidth) {
            rasPosRef.current += speed * clampedDelta;
            
            // Seamless wrap-around
            if (rasPosRef.current >= halfWidth) {
              rasPosRef.current -= halfWidth;
            } else if (rasPosRef.current < 0) {
              rasPosRef.current += halfWidth;
            }
            
            el.scrollLeft = Math.round(rasPosRef.current);
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateSliding);
    };

    animationFrameId = requestAnimationFrame(updateSliding);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRasHovered]);

  const scrollRas = (direction: "left" | "right") => {
    if (rasScrollRef.current) {
      const scrollAmount = 340;
      rasScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Feasibility Calculator States
  const [farmCapacity, setFarmCapacity] = useState<number>(20); // tons per year
  const [marketPrice, setMarketPrice] = useState<number>(5.5); // USD/kg
  const [fcr, setFcr] = useState<number>(1.2); // Feed Conversion Ratio
  const [feedPrice, setFeedPrice] = useState<number>(1.1); // USD/kg
  const [energyCost, setEnergyCost] = useState<number>(12000); // USD/year electricity
  const [laborCost, setLaborCost] = useState<number>(8000); // USD/year labor

  // Fish Species Data
  const suitableFishes = [
    {
      name: "GIFT Tilapia",
      scientific: "Oreochromis niloticus",
      density: "60 - 80 kg/m³",
      temp: "26°C - 30°C",
      ph: "7.0 - 8.0",
      cycle: "5 - 6 Months",
      fcr: "1.1 - 1.3",
      survival: "92% - 95%",
      marketPrice: "Low-Medium",
      color: "from-blue-500 to-cyan-500",
      desc: "Extremely hardy, high tolerance for dense crowding and lower dissolved oxygen levels. Excellent species for beginners and commercial scaling."
    },
    {
      name: "African Catfish",
      scientific: "Clarias gariepinus",
      density: "100 - 150 kg/m³",
      temp: "25°C - 28°C",
      ph: "6.5 - 8.0",
      cycle: "4 - 5 Months",
      fcr: "0.9 - 1.1",
      survival: "95% - 98%",
      marketPrice: "Medium",
      color: "from-slate-600 to-slate-800",
      desc: "Has an auxiliary breathing organ (can breathe atmospheric air), allowing extreme stocking densities. Very fast growth rate and outstanding FCR."
    },
    {
      name: "Pangasius (Striped Catfish)",
      scientific: "Pangasianodon hypophthalmus",
      density: "80 - 100 kg/m³",
      temp: "26°C - 30°C",
      ph: "6.5 - 7.5",
      cycle: "6 - 8 Months",
      fcr: "1.3 - 1.5",
      survival: "90% - 94%",
      marketPrice: "Medium",
      color: "from-sky-400 to-blue-600",
      desc: "Very popular for white-fillet export. Thrives in warm-water recirculating systems with high biofilter nitrification capacities."
    },
    {
      name: "Rainbow Trout",
      scientific: "Oncorhynchus mykiss",
      density: "40 - 60 kg/m³",
      temp: "12°C - 16°C",
      ph: "6.8 - 7.5",
      cycle: "8 - 10 Months",
      fcr: "1.0 - 1.2",
      survival: "88% - 92%",
      marketPrice: "High",
      color: "from-rose-500 to-amber-500",
      desc: "Cold-water premium carnivorous species. Demands absolute pristine water quality, ultra-high oxygen levels (DO > 8mg/L), and dedicated chillers."
    },
    {
      name: "Barramundi (Asian Seabass)",
      scientific: "Lates calcarifer",
      density: "50 - 75 kg/m³",
      temp: "26°C - 29°C",
      ph: "7.2 - 8.2",
      cycle: "6 - 8 Months",
      fcr: "1.2 - 1.4",
      survival: "90% - 93%",
      marketPrice: "High",
      color: "from-teal-500 to-emerald-600",
      desc: "Highly valued premium table fish. Can adapt smoothly to fresh, brackish, or marine salinity levels within RAS systems."
    },
    {
      name: "Sturgeon",
      scientific: "Acipenseridae",
      density: "30 - 50 kg/m³",
      temp: "15°C - 20°C",
      ph: "7.0 - 8.0",
      cycle: "12+ Months (Meat)",
      fcr: "1.4 - 1.6",
      survival: "85% - 90%",
      marketPrice: "Very High",
      color: "from-indigo-600 to-purple-800",
      desc: "Grown for high-value meat and black caviar. Requires very long-term investment and highly stable recirculating parameters."
    }
  ];

  const [selectedFish, setSelectedFish] = useState<number>(0);

  // Components Needed Data Categorized
  const componentsNeeded = [
    {
      category: "Civil & Structural Layout",
      icon: Building,
      items: [
        { name: "Insulated Shed / Building", desc: "Maintains stable water temperature, prevents algae growth, and shields electronic gear from environmental hazards." },
        { name: "Feed & Accessories Store", desc: "A dry, vermin-proof storage area with temperature control to maintain pellet freshness and accessory longevity." },
        { name: "Pump House", desc: "Central dry station housing primary high-flow water pumps, backwash blowers, and electrical control panels." },
        { name: "Office / Laboratory", desc: "A clean station for water testing kits, microscope assessments, daily logs, and farm management." }
      ]
    },
    {
      category: "Culture & Sump Tanks",
      icon: Waves,
      items: [
        { name: "Grow-Out Tanks", desc: "Circular cement or FRP (fiberglass) tanks with smooth gel coatings, featuring inward-slanted bottom drainage inlets for rapid waste flushing." },
        { name: "Settling Tanks", desc: "Sloped gravity settling basins designed to extract heavy sludge sediments before the water enters mechanical screen filters." },
        { name: "Water Storage / Sump Tanks", desc: "Underground or low-elevation reservoir tanks storing water during backwashes and balancing overall volume drops." },
        { name: "Overhead Emergency Tanks", desc: "Gravity-fed water supply reserve placed on elevation to flush culture tanks automatically during power/pump outages." }
      ]
    },
    {
      category: "Mechanical & Biological Filtration",
      icon: Cpu,
      items: [
        { name: "Mechanical Drum Filters", desc: "Micro-screen rotating hydraulic or drum filters (60-80 microns) that automatically extract solid feces and uneaten feed." },
        { name: "Biological Filters (MBBR)", desc: "Moving Bed Biofilm Reactors hosting nitrifying bacteria (Nitrosomonas & Nitrobacter) on suspended K1 biomedia to detoxify ammonia." },
        { name: "Carbon Dioxide Degasser", desc: "Trickling towers or air-stripping units that agitate treated water, causing dissolved carbon dioxide to degas into the atmosphere." },
        { name: "UV Sterilizers & Ozone Units", desc: "Destroys water-borne pathogens, viruses, and parasites. Ozone also breaks down dissolved organic compounds and increases clarity." }
      ]
    },
    {
      category: "Support Infrastructure",
      icon: Settings,
      items: [
        { name: "Aeration & Oxygen Cones", desc: "High-efficiency diffusers, air blowers, or pure oxygen dissolution cones ensuring dissolved oxygen remains above 6.0 mg/L." },
        { name: "Pumps & Motors", desc: "Industrial-grade magnetic-drive or centrifugal water pumps designed for continuous 24/7 heavy recirculation cycles." },
        { name: "Power Redundancy (Generator)", desc: "Diesel or gas generator coupled with an Automatic Transfer Switch (ATS) to instantly boot up during main power failure." },
        { name: "Water Testing Kit & Sensors", desc: "Digital sensors monitoring Dissolved Oxygen (DO), temperature, pH, and chemical kits for Ammonia, Nitrite, and Nitrate." }
      ]
    }
  ];

  // Feasibility Calculations
  const pricePerTon = marketPrice * 1000; // USD per ton
  const totalRevenue = farmCapacity * pricePerTon; // USD per year
  
  const totalFeedNeeded = farmCapacity * fcr * 1000; // kg of feed per year
  const annualFeedCost = totalFeedNeeded * feedPrice; // USD per year
  
  const fingerlingCost = (farmCapacity * 1000 / 0.45) * 0.12; // Estimate: 1 fingerling yields 450g, priced at $0.12/pc with buffer
  const otherOpex = (annualFeedCost + energyCost + laborCost) * 0.15; // 15% miscellaneous cost (supplements, maintenance, water topups)
  
  const totalOpex = annualFeedCost + energyCost + laborCost + fingerlingCost + otherOpex;
  const netProfit = totalRevenue - totalOpex;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  
  // Approximate capital investment based on capacity
  const estimatedCapEx = farmCapacity * 12000 + 45000; // $12k per ton capacity + $45k base setup civil infrastructure
  const paybackPeriod = netProfit > 0 ? estimatedCapEx / netProfit : 99; // years
  const roi = estimatedCapEx > 0 ? (netProfit / estimatedCapEx) * 100 : 0;

  // Service Provider Inquiry Form States
  const [providerStep, setProviderStep] = useState<"form" | "success">("form");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [clientCapacity, setClientCapacity] = useState("10-30 Tons");
  const [clientService, setClientService] = useState("Complete RAS Turnkey Setup");

  const handleSubmitProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName.trim() && clientPhone.trim()) {
      setProviderStep("success");
    }
  };

  return (
   <div className="bg-slate-50 min-h-screen">      

      {/* Hero Banner Container */}
      <div className="relative bg-gradient-to-r from-emerald-900 to-green-950 text-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8 overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.12),transparent_60%)]"></div>
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3 max-w-3xl">           
            <h1 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white leading-tight">
              Recirculating Aquaculture Systems (RAS) 
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-xl">
              As global demand for seafood rises, traditional open farming is hitting limits. Discover the science of RAS—the revolutionary technology-driven method that recycles up to 99% of culture water in a closed loop, ensuring biosecurity, explosive yields, and absolute sustainability.
            </p>
          </div>         
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full min-w-0">
        <div className="lg:col-span-8 xl:col-span-9 space-y-6 sm:space-y-12 w-full min-w-0">

      {/* 2. Custom Navigation Tabs for the Study Center */}
      <div className="bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-xs flex overflow-x-auto no-scrollbar gap-1.5 w-full min-w-0 scroll-smooth">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "overview" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Course Introduction</span>
        </button>
        <button
          onClick={() => setActiveTab("works")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "works" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>How RAS Works</span>
        </button>
        <button
          onClick={() => setActiveTab("components")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "components" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Components Needed</span>
        </button>
        <button
          onClick={() => setActiveTab("fishes")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "fishes" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Suitable Fishes</span>
        </button>
        <button
          onClick={() => setActiveTab("feasibility")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "feasibility" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Feasibility Study Sandbox</span>
        </button>
        <button
          onClick={() => setActiveTab("provider")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "provider" 
              ? "bg-emerald-800 text-white shadow-sm" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Looking for Service Provider?</span>
        </button>
      </div>

      {/* Tab Contents */}
      
      {/* TAB 1: OVERVIEW & ADVANTAGES */}
      {activeTab === "overview" && (
        <div className="space-y-12 animate-fade-in">
          
          {/* Main Introduction Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xs">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-snug">
                Sustainable Fish Farming in a Controlled Environment
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Traditional aquaculture methods (open-net marine cages or vast outdoor dirt ponds) are being pushed to their environmental limits. Concerns about wild stock overfishing, massive effluent pollution, diseases, and rapid climate changes have turned standard fisheries high-risk.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                <strong>What is a Recirculating Aquaculture System?</strong> A technology-driven method of farming aquatic species in a closed, completely controlled land-based environment. Rather than continuously flushing fresh water, RAS filters and recirculates the <em>same</em> volume of water. It is clean, bio-secured, highly dense, and uses up to 95% to 99% less water than outdoor ponds.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl">
                  <Check className="w-4 h-4 stroke-[3px]" />
                  <span>Up to 99% Water Recycled</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl">
                  <Check className="w-4 h-4 stroke-[3px]" />
                  <span>10x Higher Stocking Density</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl">
                  <Check className="w-4 h-4 stroke-[3px]" />
                  <span>Absolute Pathogen Biosecurity</span>
                </div>
              </div>
            </div>
            
            {/* Visual Vector Layout of System Diagram (Diagram 2 Representation) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 rounded-2xl border border-emerald-100 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              <div className="absolute top-2 right-2 bg-emerald-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                3D Tank Farm Layout Schematic
              </div>
              
              {/* Isometric Tank Drawing using CSS/SVG */}
              <div className="relative w-full h-48 flex items-center justify-center">
                <svg viewBox="0 0 400 220" className="w-full h-full drop-shadow-md">
                  {/* Background filter shed */}
                  <path d="M 280,30 L 370,55 L 370,105 L 280,80 Z" fill="#475569" opacity="0.9" />
                  <path d="M 280,30 L 325,10 L 370,55" fill="none" stroke="#334155" strokeWidth="2" />
                  <polygon points="280,30 325,10 370,55 370,30" fill="#64748b" />
                  
                  {/* Connective pipes */}
                  <path d="M 100,165 Q 200,160 290,90" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
                  <path d="M 80,115 Q 180,110 290,75" fill="none" stroke="#ef4444" strokeWidth="3" />
                  
                  {/* Grid of Circular Tanks (Isometric Projection) */}
                  {/* Row 1 Left */}
                  <g transform="translate(60, 140)">
                    <ellipse cx="40" cy="20" rx="35" ry="15" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
                    <ellipse cx="40" cy="22" rx="31" ry="12" fill="#38bdf8" />
                    <text x="40" y="24" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1" fontFamily="sans-serif">Tank A1</text>
                  </g>
                  {/* Row 1 Right */}
                  <g transform="translate(150, 110)">
                    <ellipse cx="40" cy="20" rx="35" ry="15" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
                    <ellipse cx="40" cy="22" rx="31" ry="12" fill="#38bdf8" />
                    <text x="40" y="24" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1" fontFamily="sans-serif">Tank A2</text>
                  </g>
                  
                  {/* Row 2 Left */}
                  <g transform="translate(100, 95)">
                    <ellipse cx="40" cy="20" rx="32" ry="13" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
                    <ellipse cx="40" cy="21" rx="28" ry="10" fill="#38bdf8" />
                    <text x="40" y="23" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0369a1" fontFamily="sans-serif">Tank B1</text>
                  </g>
                  {/* Row 2 Right */}
                  <g transform="translate(180, 70)">
                    <ellipse cx="40" cy="20" rx="32" ry="13" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
                    <ellipse cx="40" cy="21" rx="28" ry="10" fill="#38bdf8" />
                    <text x="40" y="23" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0369a1" fontFamily="sans-serif">Tank B2</text>
                  </g>
                  
                  {/* Labels */}
                  <rect x="270" y="140" width="110" height="40" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="280" y="154" fontSize="8" fontWeight="bold" fill="#1e293b" fontFamily="sans-serif">Filter Building</text>
                  <text x="280" y="166" fontSize="7" fill="#64748b" fontFamily="sans-serif">Hydraulic biofilters & UV</text>
                </svg>
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs font-mono font-bold text-emerald-800">10-Tank Symmetrical Recirculation Group Setup</span>
                <p className="text-[10px] text-slate-500 font-sans mt-0.5">High density FRP tanks paired with central bottom sediment flushing pipes.</p>
              </div>
            </div>
          </div>

          {/* Advantages Grid */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-sans font-black text-2xl text-slate-900 tracking-tight">Key Advantages of RAS</h3>
              <p className="text-slate-500 text-sm">Why modern commercial entrepreneurs are shifting away from traditional ponds to recirculating loops.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">1</div>
                <h4 className="font-sans font-bold text-slate-900 text-base">Unmatched Water Sustainability</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  RAS is highly efficient, recycling up to <strong>99%</strong> of the culture water in the system. Solid wastes are flushed out, and the water is continuously biologically processed. It is ideal for regions with strict water extraction limits or seasonal droughts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">2</div>
                <h4 className="font-sans font-bold text-slate-900 text-base">Absolute Environmental Protection</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Operating in a land-based closed system minimizes the risk of direct environmental contamination, effluent pollution, and pathogen outbreaks. It completely eliminates disease transmission risks to local wild marine populations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">3</div>
                <h4 className="font-sans font-bold text-slate-900 text-base">Space & Logistics Efficiency</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  RAS doesn't need to be placed near natural rivers or seas. It can be built anywhere, including arid regions and industrial zones near metropolitan consumer markets, greatly slashing cold-chain transportation carbon footprints.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">4</div>
                <h4 className="font-sans font-bold text-slate-900 text-base">Supercharged Stocking Densities</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  With 24/7 liquid oxygenation and mechanical solids scrubbing, farmers can load fish up to <strong>40-120 kg per cubic meter</strong>. That is up to 10 to 15 times higher than standard extensive ponds!
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">5</div>
                <h4 className="font-sans font-bold text-slate-900 text-base">Precision Control & Forecasting</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Because every environmental variable (temperature, dissolved oxygen, pH, salinity, feeding) is actively tracked and controlled inside a building, growth curves are incredibly predictable and feed conversion ratios (FCR) stay optimal.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-800 flex items-center justify-center font-bold">⚠️</div>
                <h4 className="font-sans font-bold text-slate-900 text-base">Critical Challenges & Capital</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  RAS demands heavy initial capital, continuous electricity for high-volume pumping, and specialized biological training. Lapses in oxygenation can result in catastrophic biomass crashes in under 45 minutes without back-ups.
                </p>
              </div>

            </div>
          </div>

          {/* Action Footer banner */}
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-sans font-bold text-emerald-950 text-sm sm:text-base">Ready to study the core mechanics of water purification?</h4>
              <p className="text-emerald-800 text-xs mt-0.5">Explore our interactive mechanical, chemical, and biological filtration flowchart.</p>
            </div>
            <button
              onClick={() => setActiveTab("works")}
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Learn How RAS Works</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* YouTube RAS Slider Section */}
          <div id="youtube-ras-slider" className="mt-12 pt-8 px-4 sm:px-6 lg:px-8 border-t border-slate-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold uppercase tracking-widest mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>Interactive Training Materials</span>
                </div>
                <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  Recirculating Aquaculture (RAS) Viral Ideas
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Explore 20 viral ideas, farm walk-throughs, and biological filtration science.
                </p>
              </div>

              {/* Scroll Navigation Controls & Viral Filter */}
              <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
                <button
                  id="ras-viral-toggle-btn"
                  onClick={() => setShowViralOnly(!showViralOnly)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans text-xs font-bold transition-all border shrink-0 ${
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
                  id="ras-slide-left-btn"
                  onClick={() => scrollRas("left")}
                  className="p-2 rounded-xl border border-emerald-100 bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 transition-all shadow-xs cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  id="ras-slide-right-btn"
                  onClick={() => scrollRas("right")}
                  className="p-2 rounded-xl border border-emerald-100 bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 transition-all shadow-xs cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrolling Carousel */}
            <div className="relative">
              <div
                id="ras-video-scroll-container"
                ref={rasScrollRef}
                onMouseEnter={() => setIsRasHovered(true)}
                onMouseLeave={() => setIsRasHovered(false)}
                onTouchStart={() => setIsRasHovered(true)}
                onTouchEnd={() => setIsRasHovered(false)}
                className="flex gap-5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-emerald-100 scrollbar-track-transparent select-none"
                style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch', scrollBehavior: 'auto' }}
              >
                {(() => {
                  const displayedRasVideos = showViralOnly ? rasVideos.filter(isVideoViral) : rasVideos;
                  const listToRender = displayedRasVideos.length > 0 ? displayedRasVideos : rasVideos;
                  return [...listToRender, ...listToRender].map((video, index) => (
                    <div key={`${video.id}-ras-clone-${index}`} className="w-[260px] max-w-[80vw] sm:max-w-none sm:w-[320px] shrink-0">
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
      )}

      {/* TAB 2: HOW IT WORKS (FLOWCHART & SCIENCE) */}
      {activeTab === "works" && (
        <div className="space-y-12 animate-fade-in">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-widest">Process Engineering</span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">The 24/7 Water Purification Loop</h2>
            <p className="text-slate-500 text-sm">See how toxic dissolved nitrogen and feces are extracted and replaced with oxygenated, disinfected water.</p>
          </div>

          {/* Core Interactive Diagram (Representing Diagram 1) */}
          <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-sky-400 font-mono text-[10px] uppercase font-bold tracking-wider">Interactive Flow Diagram</span>
                <h3 className="font-sans font-black text-xl text-white mt-1">Multi-Stage Filtration & Gas Balance</h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="font-mono text-cyan-300">Active Flow Rate: Continuous</span>
              </div>
            </div>

            {/* SVG Interactive Loop representation */}
            <div className="w-full overflow-x-auto no-scrollbar py-2">
              <div className="min-w-[650px] lg:min-w-0 w-full max-w-5xl mx-auto">
                <svg viewBox="0 0 900 240" className="w-full h-auto">
                  {/* Define markers for arrows */}
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                    </marker>
                    <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                    </marker>
                  </defs>

                  {/* Node 1: Circular Tank */}
                  <g transform="translate(10, 40)">
                    <rect x="0" y="0" width="130" height="70" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                    <ellipse cx="65" cy="15" rx="55" ry="10" fill="#0284c7" />
                    <text x="65" y="42" textAnchor="middle" fontSize="11" fontWeight="extrabold" fill="#ffffff" fontFamily="sans-serif">1. Circular Tank</text>
                    <text x="65" y="56" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="sans-serif">Fishes & Waste Out</text>
                  </g>

                  {/* Connector 1 -> 2 */}
                  <line x1="140" y1="75" x2="190" y2="75" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow)" />

                  {/* Node 2: Solids Filtration (Drum Filter) */}
                  <g transform="translate(200, 40)">
                    <rect x="0" y="0" width="130" height="70" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                    <rect x="15" y="10" width="100" height="15" rx="4" fill="#334155" />
                    <text x="65" y="21" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#38bdf8" fontFamily="mono">Drum Filter</text>
                    <text x="65" y="42" textAnchor="middle" fontSize="10" fontWeight="extrabold" fill="#ffffff" fontFamily="sans-serif">2. Solids Filter</text>
                    <text x="65" y="56" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="sans-serif">Removes heavy feces</text>
                  </g>

                  {/* Connector 2 -> 3 */}
                  <line x1="330" y1="75" x2="380" y2="75" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow)" />

                  {/* Node 3: Biofiltration (MBBR) */}
                  <g transform="translate(390, 40)">
                    <rect x="0" y="0" width="130" height="70" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                    {/* Tiny biomedia particles inside */}
                    <circle cx="20" cy="15" r="3" fill="#10b981" opacity="0.6" />
                    <circle cx="110" cy="18" r="4" fill="#10b981" opacity="0.7" />
                    <circle cx="95" cy="12" r="3" fill="#10b981" opacity="0.5" />
                    <text x="65" y="42" textAnchor="middle" fontSize="10" fontWeight="extrabold" fill="#ffffff" fontFamily="sans-serif">3. Biofiltration</text>
                    <text x="65" y="56" textAnchor="middle" fontSize="8" fill="#a7f3d0" fontFamily="sans-serif">NH₄⁺ → NO₂⁻ → NO₃⁻</text>
                  </g>

                  {/* Connector 3 -> 4 */}
                  <line x1="520" y1="75" x2="570" y2="75" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />

                  {/* Node 4: CO2 Removal (Degasser) */}
                  <g transform="translate(580, 40)">
                    <rect x="0" y="0" width="130" height="70" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="65" y="42" textAnchor="middle" fontSize="10" fontWeight="extrabold" fill="#ffffff" fontFamily="sans-serif">4. CO2 Removal</text>
                    <text x="65" y="56" textAnchor="middle" fontSize="8" fill="#fde68a" fontFamily="sans-serif">Stripping gas out</text>
                    {/* Upward gaseous arrows */}
                    <path d="M 65,15 L 65,5" fill="none" stroke="#fde68a" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  </g>

                  {/* Connector 4 -> Down */}
                  <path d="M 710,75 L 760,75 Q 780,75 780,105 L 780,120" fill="none" stroke="#f59e0b" strokeWidth="3" />

                  {/* Node 5: Pumping & Disinfection (UV) */}
                  <g transform="translate(710, 130)">
                    <rect x="0" y="0" width="140" height="70" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                    <text x="70" y="42" textAnchor="middle" fontSize="10" fontWeight="extrabold" fill="#ffffff" fontFamily="sans-serif">5. UV & Pump</text>
                    <text x="70" y="56" textAnchor="middle" fontSize="8" fill="#ddd6fe" fontFamily="sans-serif">Pathogen sterilization</text>
                  </g>

                  {/* Connector 5 -> 6 (Oxygenation) */}
                  <line x1="710" y1="165" x2="490" y2="165" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrow)" />

                  {/* Node 6: Oxygenation (Oxygen Cone) */}
                  <g transform="translate(340, 130)">
                    <rect x="0" y="0" width="140" height="70" rx="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2.5" />
                    <text x="70" y="42" textAnchor="middle" fontSize="10" fontWeight="extrabold" fill="#ffffff" fontFamily="sans-serif">6. Oxygenation</text>
                    <text x="70" y="56" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="sans-serif">DO saturation & pH adjust</text>
                  </g>

                  {/* Connector 6 -> 1 (Back to Circular Tank) */}
                  <path d="M 340,165 L 75,165 Q 40,165 40,120" fill="none" stroke="#0ea5e9" strokeWidth="3.5" markerEnd="url(#arrow)" />

                  {/* Central Flow Arrow Annotation */}
                  <text x="450" y="218" textAnchor="middle" fontSize="9" fill="#64748b" fontStyle="italic" fontFamily="sans-serif">
                    Continuous Closed treatment cycle runs every 40-50 minutes per tank volume
                  </text>
                </svg>
              </div>
            </div>

            {/* Scientific Breakdown Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5 border-t border-slate-800">
              <div className="space-y-2">
                <span className="text-cyan-400 font-mono text-xs font-bold uppercase">1. Mechanical Filtration</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  Suspended organic solids (feces and uneaten feed) represent the primary source of dissolved nitrogen. If left in the tank, they rot, releasing huge levels of toxic ammonia and feeding pathogenic fungus. Rotating drum screen filters extract these solids in minutes.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-emerald-400 font-mono text-xs font-bold uppercase">2. Biological Nitrification</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  The heart of biological filtration. Millions of nitrifying bacteria grow on microscopic suspended bio-media. Nitrosomonas bacteria oxidize toxic Ammonia (<span className="text-emerald-300 font-mono">NH₃</span>) into Nitrite (<span className="text-emerald-300 font-mono">NO₂⁻</span>), and Nitrobacter bacteria rapidly convert Nitrite into harmless Nitrate (<span className="text-emerald-300 font-mono">NO₃⁻</span>).
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-purple-400 font-mono text-xs font-bold uppercase">3. Degassing & Pure O₂</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  Carbon Dioxide build-up from fish respiration triggers lethal blood acidosis and drops pH. High degassing cascades strip CO₂ gas out. Afterwards, pure oxygen is injected through high-pressure oxygenation cones to super-saturate water before it flows back to the fish.
                </p>
              </div>
            </div>
          </div>

          {/* Operational Water Quality Parameters */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h3 className="font-sans font-black text-xl text-slate-900">Standard Optimal Water Chemistry for RAS</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block">Dissolved Oxygen (DO)</span>
                <span className="text-xl font-mono font-bold text-slate-800 block mt-1">5.5 - 8.5 mg/L</span>
                <p className="text-[11px] text-slate-500 mt-1 font-sans">Critical limit. Drops under 4.0 mg/L trigger feed cessation and respiratory distress.</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block">Ammonia (TAN) & Nitrite</span>
                <span className="text-xl font-mono font-bold text-red-600 block mt-1">{"< 0.5 mg/L"}</span>
                <p className="text-[11px] text-slate-500 mt-1 font-sans">Toxic nitrogenous waste. Biofilter bacterial colony health must be maintained daily.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block">Water pH & Alkalinity</span>
                <span className="text-xl font-mono font-bold text-slate-800 block mt-1">7.0 - 7.8 pH</span>
                <p className="text-[11px] text-slate-500 mt-1 font-sans">Alkalinity above 120 mg/L acts as buffer against nitric acid produced by nitrifiers.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block">Carbon Dioxide (CO₂)</span>
                <span className="text-xl font-mono font-bold text-slate-800 block mt-1">{"< 15 mg/L"}</span>
                <p className="text-[11px] text-slate-500 mt-1 font-sans">High levels reduce oxygen binding efficiency in fish hemoglobin (bhor effect).</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: COMPONENTS NEEDED (CATEGORIZED INVENTORY) */}
      {activeTab === "components" && (
        <div className="space-y-12 animate-fade-in">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-widest">Inventory checklist</span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">Technical Hardware & Facilities</h2>
            <p className="text-slate-500 text-sm">Comprehensive inventory blueprint required to set up a commercial-grade RAS project.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {componentsNeeded.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-black text-slate-900 text-lg sm:text-xl">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-100/50 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="font-sans font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            {item.name}
                          </h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed font-sans">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick study alert */}
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-sans font-bold text-red-950 text-sm">Critical Engineering Warning: Sizing Proportions</h4>
              <p className="text-red-900 text-xs leading-relaxed font-sans">
                Never undersize biological MBBR tanks. Heterotrophic bacteria degrade bio-filter performance if solid organic waste is allowed to bypass mechanical drum screens. Standard guidelines mandate <strong>1.5 to 2.0 fold turnover rates</strong> of entire farm volume hourly.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: SUITABLE FISH SPECIES */}
      {activeTab === "fishes" && (
        <div className="space-y-12 animate-fade-in">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-widest">Species Selection</span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">Best Aquaculture Species for RAS</h2>
            <p className="text-slate-500 text-sm">High stocking-density candidates that thrive under mechanical flows and controlled feeds.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Species Selector List */}
            <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 pb-2 lg:pb-0 w-full min-w-0">
              {suitableFishes.map((fish, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFish(idx)}
                  className={`shrink-0 lg:shrink w-[180px] sm:w-[220px] lg:w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    idx === selectedFish
                      ? "bg-slate-900 border-slate-900 text-white shadow-md scale-[1.01]"
                      : "bg-white border-slate-100 text-slate-700 hover:border-emerald-200"
                  }`}
                >
                  <div>
                    <h4 className="font-sans font-black text-xs sm:text-sm line-clamp-1">{fish.name}</h4>
                    <span className="font-mono text-[9px] sm:text-[10px] italic opacity-85 line-clamp-1">{fish.scientific}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform shrink-0 ${idx === selectedFish ? "translate-x-1" : "text-slate-400"}`} />
                </button>
              ))}
            </div>

            {/* Active Species Detail Card */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
              <div className={`p-6 sm:p-8 bg-gradient-to-r ${suitableFishes[selectedFish].color} text-white`}>
                <span className="font-mono text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Species Guide Profile
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight mt-3">
                  {suitableFishes[selectedFish].name}
                </h3>
                <p className="font-mono text-xs sm:text-sm italic opacity-90 mt-0.5">
                  {suitableFishes[selectedFish].scientific}
                </p>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  {suitableFishes[selectedFish].desc}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Stocking Density</span>
                    <span className="font-sans font-black text-slate-800 text-sm block">{suitableFishes[selectedFish].density}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Water Temperature</span>
                    <span className="font-sans font-black text-slate-800 text-sm block">{suitableFishes[selectedFish].temp}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Optimal pH Range</span>
                    <span className="font-sans font-black text-slate-800 text-sm block">{suitableFishes[selectedFish].ph}</span>
                  </div>
                  <div className="space-y-0.5 pt-3 sm:pt-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Growth Cycle Duration</span>
                    <span className="font-sans font-black text-slate-800 text-sm block">{suitableFishes[selectedFish].cycle}</span>
                  </div>
                  <div className="space-y-0.5 pt-3 sm:pt-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Estimated FCR</span>
                    <span className="font-sans font-black text-slate-800 text-sm block">{suitableFishes[selectedFish].fcr}</span>
                  </div>
                  <div className="space-y-0.5 pt-3 sm:pt-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Avg. Survival Rate</span>
                    <span className="font-sans font-black text-emerald-700 text-sm block">{suitableFishes[selectedFish].survival}</span>
                  </div>
                </div>

                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    Species listed are highly compatible with automatic mechanical screen extraction and oxygenation lines. Tilapia and Catfish represent the lowest financial and technical barrier for new RAS entrants.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 5: FEASIBILITY STUDY & ROI SANDBOX */}
      {activeTab === "feasibility" && (
        <div className="space-y-12 animate-fade-in">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-widest">Financial Engineering</span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">Commercial Feasibility sandbox</h2>
            <p className="text-slate-500 text-sm">Calculate upfront investments, operating costs, revenues, and estimated ROI payback durations.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sandbox Controllers */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-sans font-black text-slate-900 text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  Feasibility Parameter Tuner
                </h3>
                <p className="text-slate-400 text-xs">Adjust target production and localized feed costs to see real-time profitability.</p>
              </div>

              <div className="space-y-5">
                
                {/* Target Capacity */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <label>Target Farm Output</label>
                    <span className="font-mono text-emerald-700 font-bold">{farmCapacity} Tons / Year</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={farmCapacity}
                    onChange={(e) => setFarmCapacity(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>5 Tons</span>
                    <span>100 Tons (Semi-Commercial)</span>
                  </div>
                </div>

                {/* Market Selling Price */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <label>Average Market Price (Live Fish)</label>
                    <span className="font-mono text-emerald-700 font-bold">${marketPrice.toFixed(2)} / kg</span>
                  </div>
                  <input
                    type="range"
                    min="2.0"
                    max="12.0"
                    step="0.5"
                    value={marketPrice}
                    onChange={(e) => setMarketPrice(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>$2.00</span>
                    <span>$12.00 (High-Value Trout/Salmon)</span>
                  </div>
                </div>

                {/* Feed Conversion Ratio (FCR) */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <label>Target Feed Conversion Ratio (FCR)</label>
                    <span className="font-mono text-amber-700 font-bold">{fcr.toFixed(1)} : 1</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="1.8"
                    step="0.1"
                    value={fcr}
                    onChange={(e) => setFcr(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>1.0 (Optimal Bio-efficiency)</span>
                    <span>1.8 (Poor Feeding Control)</span>
                  </div>
                </div>

                {/* Feed Price */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <label>Commercial Pellet Price</label>
                    <span className="font-mono text-emerald-700 font-bold">${feedPrice.toFixed(2)} / kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="2.0"
                    step="0.1"
                    value={feedPrice}
                    onChange={(e) => setFeedPrice(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>$0.70</span>
                    <span>$2.00 (High-Protein Trout Feed)</span>
                  </div>
                </div>

                {/* Utilities Cost Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <label>Annual Power Electricity Cost</label>
                    <span className="font-mono text-emerald-700 font-bold">${energyCost.toLocaleString()} / year</span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="35000"
                    step="1000"
                    value={energyCost}
                    onChange={(e) => setEnergyCost(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Labor Cost Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <label>Annual Lab & Labor Cost</label>
                    <span className="font-mono text-emerald-700 font-bold">${laborCost.toLocaleString()} / year</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="25000"
                    step="1000"
                    value={laborCost}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                </div>

              </div>
            </div>

            {/* Right Financial Dashboard */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-slate-900 text-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-lg space-y-5 sm:space-y-6">
                <div className="border-b border-slate-800 pb-3 sm:pb-4">
                  <h4 className="font-sans font-black text-base sm:text-lg text-white">Dynamic Cost-Benefit Forecast</h4>
                  <p className="text-slate-400 text-[11px] sm:text-xs">Annual financial projections for {farmCapacity} Tons/Year commercial operation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  
                  <div className="bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">Gross Annual Revenue</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-mono font-black text-cyan-400 block mt-1 break-words">${totalRevenue.toLocaleString()}</span>
                    <p className="text-[10px] text-slate-400 mt-1 font-sans">Based on {farmCapacity * 1000} kg grown and sold.</p>
                  </div>

                  <div className="bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">Total Annual Operating Cost</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-mono font-black text-amber-500 block mt-1 break-words">${Math.round(totalOpex).toLocaleString()}</span>
                    <p className="text-[10px] text-slate-400 mt-1 font-sans">Includes feed, utilities, fingerlings & buffer.</p>
                  </div>

                  <div className="bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">Estimated Net Profit</span>
                    <span className={`text-xl sm:text-2xl lg:text-3xl font-mono font-black block mt-1 break-words ${netProfit > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      ${Math.round(netProfit).toLocaleString()}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1 font-sans">Net profit pre-tax cash flow balance.</p>
                  </div>

                  <div className="bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">Net Profit Margin</span>
                    <span className={`text-xl sm:text-2xl lg:text-3xl font-mono font-black block mt-1 break-words ${profitMargin > 15 ? "text-emerald-400" : profitMargin > 0 ? "text-amber-400" : "text-red-400"}`}>
                      {profitMargin.toFixed(1)}%
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1 font-sans">Overall operating efficiency coefficient.</p>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Estimated CAPEX Setup</span>
                    <span className="font-sans font-black text-white text-lg block">${estimatedCapEx.toLocaleString()}</span>
                    <p className="text-[9px] text-slate-500 font-sans">Civil works, drum filters, biofilters & pumps.</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Estimated Payback Period</span>
                    <span className="font-sans font-black text-emerald-400 text-lg block">
                      {netProfit > 0 ? `${paybackPeriod.toFixed(1)} Years` : "Infeasible Operation"}
                    </span>
                    <p className="text-[9px] text-slate-500 font-sans">Calculated via Capex / Net Annual Cash Flow.</p>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50 space-y-1">
                  <span className="text-xs font-mono font-bold text-white block">★ Feasibility Verdict:</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    {netProfit <= 0 
                      ? "❌ INFEASIBLE: Your operating costs currently exceed your revenue. Increase fish density or target a premium local market with higher wholesale prices to balance costs."
                      : profitMargin < 15 
                        ? "⚠️ MODERATELY FEASIBLE: Operation yields a narrow margin. Fine-tune your FCR (target < 1.2) and secure stable water temperatures to avoid disease lags."
                        : "✅ HIGHLY FEASIBLE: Strong profit margin and comfortable cash flows. Payback is under 3 years. This capacity is highly suitable for scalable investment."
                    }
                  </p>
                </div>

              </div>

              {/* Feed Cost Explanation Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
                <h4 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Feed constitutes 55% - 65% of RAS OPEX
                </h4>
                <p className="text-slate-500 text-xs font-sans leading-relaxed">
                  In recirculating aquaculture, fish feed is the largest single variable cost. Overfeeding not only inflates your expenses, but instantly spikes dissolved Ammonia, taxing your biological filter bacteria and compromising fish gills. Absolute feeding precision using automatic timer-controlled feeders is crucial.
                </p>
              </div>

            </div>

          </div>

          {/* Comparative Feasibility Section across all 4 Technologies */}
          <div className="pt-8 border-t border-slate-200">
            <TechnologyComparison activeTech="ras" />
          </div>

        </div>
      )}

      {/* TAB 6: SERVICE PROVIDER & CONSULTING */}
      {activeTab === "provider" && (
        <div className="space-y-12 animate-fade-in">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-widest">RAS Engineering Consultants</span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">Are you looking for a Service Provider?</h2>
            <p className="text-slate-500 text-sm">Consult our certified aquaculture engineering team for custom drawings, biological filtration, and turnkey setups.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Consulting detail block */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                Get Certified RAS Design & Training Solutions
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                Our team designs high-performance recirculating aquaculture loops specifically tailored for local water parameters and fish types. From backyard family hobby setups of 10 m³ to industrial 500 m³ intensive systems, we provide full support.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                  </div>
                  <div>
                    <h5 className="font-sans font-extrabold text-slate-800 text-xs sm:text-sm">Turnkey Filtration Assemblies</h5>
                    <p className="text-slate-500 text-[11px] font-sans">We supply mesh drum filters, customized biomedia MBBR vessels, and medical-grade UV loops.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                  </div>
                  <div>
                    <h5 className="font-sans font-extrabold text-slate-800 text-xs sm:text-sm">Water Quality Telemetry Monitoring</h5>
                    <p className="text-slate-500 text-[11px] font-sans">Complete IoT sensor integration for 24/7 smartphone alerts on Dissolved Oxygen, pH, and Temperature.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                  </div>
                  <div>
                    <h5 className="font-sans font-extrabold text-slate-800 text-xs sm:text-sm">Farmer On-Site Training Courses</h5>
                    <p className="text-slate-500 text-[11px] font-sans">Hands-on guidance on biofilter bacteria inoculation, pH buffer chemistry, and fish sorting metrics.</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center gap-4">
                <Shield className="w-8 h-8 text-emerald-700 shrink-0" />
                <div className="space-y-0.5">
                  <h5 className="font-sans font-bold text-slate-800 text-xs sm:text-sm">100% Biosecurity Guarantee</h5>
                  <p className="text-slate-500 text-[11px] font-sans">All civil setup designs strictly comply with international biosecurity standards to safeguard fingerlings from disease entries.</p>
                </div>
              </div>
            </div>

            {/* Callback Request Form card replaced with static secure options */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
              
              <div className="border-b border-slate-100 pb-4 text-center sm:text-left">
                <span className="text-emerald-700 font-mono text-[10px] uppercase font-bold tracking-wider">Secure Engineering Consultation</span>
                <h3 className="font-sans font-black text-slate-900 text-lg sm:text-xl">Request a Callback & Layout Estimate</h3>
                <p className="text-slate-400 text-xs mt-0.5">To safeguard user information, all active form data storage and transmission have been removed.</p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                <h4 className="font-sans font-bold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-200 pb-2">Direct Contact Channels:</h4>
                
                <div className="space-y-4 font-sans text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 bg-green-100 text-green-800 rounded-lg shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-800">WhatsApp Support (No call-dial link)</span>
                      <p className="mb-1">Message our chief RAS design engineer directly at:</p>
                      <span className="font-mono font-bold text-slate-900 text-sm select-all bg-white px-2.5 py-1 rounded border border-slate-200">+919748952342</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2">
                    <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-800">Email Engineering Desk</span>
                      <p className="mb-1">Click below to send your proposed water volume or coordinates:</p>
                      <a 
                        href="mailto:mf@modernfisheries.com"
                        className="font-mono font-bold text-emerald-700 text-sm hover:underline select-all bg-white px-2.5 py-1 rounded border border-slate-200"
                        title="Draft email in default application"
                      >
                        mf@modernfisheries.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

        </div>
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 min-w-0 space-y-6 lg:sticky lg:top-20">
          <RightSidebarAd reloadKey="ras-sidebar-ad" />
        </div>
      </div>
    </div>
  );
}
