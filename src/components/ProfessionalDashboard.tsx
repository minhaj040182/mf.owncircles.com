import React, { useState, useEffect } from "react";
import { 
  Search, BookOpen, Calculator, Sparkles, Droplet, 
  ChevronRight, Play, Info, FileText, ArrowRight, Zap, Layers, HeartPulse, Sprout, Waves, Fish
} from "lucide-react";
import { Video } from "../types";
import { getEnrichedVideosList } from "../utils/videoMetrics";

// Types
interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  readTime: string;
}

interface Species {
  id: string;
  name: string;
  scientific: string;
  density: string;
  growth: string;
  protein: string;
  temp: string;
  ph: string;
  description: string;
  marketPrice: string;
}

interface ProfessionalDashboardProps {
  onVideoClick: (video: Video) => void;
  onNavigate: (page: "home" | "ras" | "biofloc" | "aquaponics" | "hydroponics" | "pond" | "diseases" | "feed" | "calculators" | "services" | "about" | "videos") => void;
  trendingVideos: Video[];
}

// ----------------- STATIC/STRUCTURED DATA -----------------
const ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Beginner's Guide to Biofloc Culture",
    category: "Biofloc",
    readTime: "6 min read",
    summary: "Establish a stable floc, balance Carbon to Nitrogen (C:N) ratios, and optimize Tarpaulin Tank survival rates.",
    content: "Biofloc technology (BFT) is a revolutionary low-water exchange system. To begin, maintain a strict 15:1 C:N ratio by adding organic carbon (molasses/sugar) based on feed nitrogen. Aeration is critical; keep continuous air injection to maintain floc in suspension and Dissolved Oxygen above 5 mg/L. Test total ammonia nitrogen (TAN), nitrite (NO2), and floc volume index (FVI) daily."
  },
  {
    id: "art-2",
    title: "RAS Filtration Sizing & Hydraulics",
    category: "RAS",
    readTime: "8 min read",
    summary: "Learn to design solids separators, calculate MBBR bio-filter surface areas, and spec UV sterilization loops.",
    content: "Recirculating Aquaculture Systems rely on mechanical and biological filtration. The first stage is solids separation using a swirl or drum filter, extracting 80% of suspended feces. Next, water enters the MBBR (Moving Bed Biofilm Reactor) where Nitrosomonas and Nitrospira bacteria convert toxic Ammonia into Nitrates. Ensure a total flow turnover rate of 1.5 times the culture volume per hour."
  },
  {
    id: "art-3",
    title: "Hydroponic Nutrient Management Profiles",
    category: "Hydroponics",
    readTime: "5 min read",
    summary: "Master Electrical Conductivity (EC), target pH ranges, and mineral dose profiles for maximum leaf growth.",
    content: "In hydroponic grow-loops, mineral balance is vital. Maintain pH between 5.8 and 6.5 for optimal nutrient uptake. Monitor EC (typically 1.2 to 2.0 mS/cm) depending on growth stages. Ensure trace elements like chelated iron are added bi-weekly to prevent leaf yellowing (chlorosis)."
  },
  {
    id: "art-4",
    title: "Pond Aeration & Plankton Blooms",
    category: "Pond Farming",
    readTime: "7 min read",
    summary: "Optimize paddlewheel placement, measure morning DO dips, and safely manage dense blue-green algae.",
    content: "Earth ponds rely heavily on natural photosynthesis. However, heavy algae blooms consume oxygen at night. Position paddlewheel aerators to create a circular current, gathering sediment in the pond center for easy purging. Run aerators continuously from midnight to sunrise when DO dips lowest."
  },
  {
    id: "art-5",
    title: "Fish Diseases: Diagnostic & Controls",
    category: "Fish Diseases",
    readTime: "9 min read",
    summary: "Rapidly identify White Spot (Ich), Gill Flukes, and Fin Rot with clear chemical dosing and quarantine protocols.",
    content: "Early detection saves crops. Watch for 'flashing' (fish rubbing against walls) or surface gasping. Isolate infected batches immediately in a dedicated quarantine tank. Apply a 3% salinity salt bath for 15 minutes to defeat external parasites like Ich, or dose copper sulfate under expert monitoring."
  },
  {
    id: "art-6",
    title: "Optimal Protein Schedules for Grow-Out",
    category: "Fish Feed",
    readTime: "5 min read",
    summary: "Match feed pellet sizes and protein concentrations with progressive fish body-weight thresholds.",
    content: "Fish require different nutrition as they mature. Early fry require micro-crumbs with 40-45% protein. During the active grow-out phase (100g to 500g), scale down to 30-32% floating pellets. Overfeeding wastes money and fouls bio-filters; feed exactly 2.5% of total biomass daily split across 3 sessions."
  }
];

const SPECIES: Species[] = [
  {
    id: "sp-1",
    name: "Tilapia",
    scientific: "Oreochromis niloticus",
    density: "40 - 80 fish/m³ (Biofloc/RAS)",
    growth: "5 - 6 months to 500g",
    protein: "30% - 35% Grow-out",
    temp: "25°C - 32°C",
    ph: "6.5 - 8.5",
    marketPrice: "₹140 - ₹185 / kg",
    description: "Extremely hardy, omnivorous surface feeders. Perfect for high-density Biofloc and RAS setups as they adapt easily to high turbidity and suspended solids."
  },
  {
    id: "sp-2",
    name: "Rohu",
    scientific: "Labeo rohita",
    density: "5 - 10 fish/m³ (Semi-Intensive)",
    growth: "10 - 12 months to 1kg",
    protein: "28% - 32% Grow-out",
    temp: "20°C - 30°C",
    ph: "7.0 - 8.5",
    marketPrice: "₹160 - ₹220 / kg",
    description: "Indian Major Carp, highly popular in South Asia. A mid-water feeder, excellent for polyculture setups alongside Catla and Mrigal to optimize feed utilization."
  },
  {
    id: "sp-3",
    name: "Catla",
    scientific: "Labeo catla",
    density: "4 - 8 fish/m³ (Semi-Intensive)",
    growth: "10 - 12 months to 1.2kg",
    protein: "28% - 32%",
    temp: "22°C - 32°C",
    ph: "7.0 - 8.2",
    marketPrice: "₹180 - ₹240 / kg",
    description: "A surface-feeding major carp known for rapid initial growth. Ideal for larger earth ponds where natural plankton blooms can supplement formulated feeds."
  },
  {
    id: "sp-4",
    name: "Pangasius",
    scientific: "Pangasianodon hypophthalmus",
    density: "15 - 30 fish/m³ (Intensive)",
    growth: "6 - 8 months to 800g",
    protein: "25% - 28%",
    temp: "26°C - 30°C",
    ph: "6.5 - 7.8",
    marketPrice: "₹110 - ₹140 / kg",
    description: "An incredibly fast-growing river catfish. Possesses accessory air-breathing organs, letting it survive in highly dense, lower dissolved oxygen water profiles."
  },
  {
    id: "sp-5",
    name: "Magur",
    scientific: "Clarias batrachus",
    density: "100 - 150 fish/m³ (Shallow tanks)",
    growth: "8 - 10 months to 200g",
    protein: "35% - 40%",
    temp: "22°C - 30°C",
    ph: "6.0 - 8.0",
    marketPrice: "₹350 - ₹500 / kg",
    description: "Walking catfish, fetches premium market prices due to delicious taste and high nutritional values. Prefers mud bottom setups or shallow intensive nursery tanks."
  },
  {
    id: "sp-6",
    name: "Shrimp",
    scientific: "Litopenaeus vannamei",
    density: "60 - 150 PL/m² (Intensive raceway)",
    growth: "3 - 4 months to 25g",
    protein: "35% - 40%",
    temp: "26°C - 32°C",
    ph: "7.5 - 8.3",
    marketPrice: "₹380 - ₹550 / kg",
    description: "Pacific white shrimp, highly lucrative export product. Demands strict water biosecurity, steady salinity profiles (10-25 ppt), and high minerals for molting."
  }
];

const TIPS = [
  "Maintain dissolved oxygen above 5 mg/L for most freshwater species to ensure optimal digestion and growth.",
  "In Biofloc systems, verify your Floc Volume Index (FVI) daily using an Imhoff cone. Target 25-35 ml/L.",
  "Never add fresh molasses directly to water. Pre-dissolve it in lukewarm water and activate with yeast for 2 hours.",
  "In Recirculating Aquaculture Systems, ensure your MBBR bio-filter is fluidized uniformly. Dead zones cause ammonia spikes.",
  "Keep stocking density low (less than 10 kg/m³) if you do not have continuous, 24/7 auxiliary generator power backups.",
  "During cold winters, reduce daily feed rations by 50% as fish digestion rates crawl down dramatically."
];

export default function ProfessionalDashboard({ onVideoClick, onNavigate, trendingVideos }: ProfessionalDashboardProps) {
  const enrichedTrendingVideos = getEnrichedVideosList(trendingVideos);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [lastArticle, setLastArticle] = useState<Article | null>(null);
  const [lastVideo, setLastVideo] = useState<Video | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  const [activeArticleModal, setActiveArticleModal] = useState<Article | null>(null);
  const [activeSpeciesModal, setActiveSpeciesModal] = useState<Species | null>(null);
  const [activeInlineCalcTab, setActiveInlineCalcTab] = useState<"feed" | "stocking" | "volume" | "fcr" | "carbon" | "profit">("feed");

  const [calcInputs, setCalcInputs] = useState({
    feedWeight: 200,
    gain: 140,
    volume: 10,
    spec: "Tilapia",
    aer: "Paddle Wheel",
    feedAmt: 5,
    prot: 32,
    pur: 50,
    stock: 5000,
    survival: 85,
    harvestWt: 0.5,
    salePrice: 160,
    feedCost: 48,
    fcr: 1.3
  });

  // Load persistence on mount
  useEffect(() => {
    const savedArtId = localStorage.getItem("lastViewedArticleId");
    if (savedArtId) {
      const art = ARTICLES.find(a => a.id === savedArtId);
      if (art) setLastArticle(art);
    } else {
      setLastArticle(ARTICLES[0]);
    }

    const savedVidId = localStorage.getItem("lastWatchedVideoId");
    if (savedVidId && trendingVideos.length > 0) {
      const vid = trendingVideos.find(v => v.id === savedVidId);
      if (vid) setLastVideo(vid);
    } else if (trendingVideos.length > 0) {
      setLastVideo(trendingVideos[0]);
    }
  }, [trendingVideos]);

  // Rotator for tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const trackArticleView = (article: Article) => {
    localStorage.setItem("lastViewedArticleId", article.id);
    setLastArticle(article);
    setActiveArticleModal(article);
  };

  const trackVideoWatch = (video: Video) => {
    localStorage.setItem("lastWatchedVideoId", video.id);
    setLastVideo(video);
    onVideoClick(video);
  };

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const matchedArticles = ARTICLES.filter(a => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
      .map(a => ({ type: "article", label: `📚 Article: ${a.title}`, obj: a }));

    const matchedSpecies = SPECIES.filter(s => s.name.toLowerCase().includes(q) || s.scientific.toLowerCase().includes(q))
      .map(s => ({ type: "species", label: `🐟 Species: ${s.name} (${s.scientific})`, obj: s }));

    const calculators = [
      { name: "Feed Calculator", key: "feed" },
      { name: "Stocking Density", key: "stocking" },
      { name: "Water Volume", key: "volume" },
      { name: "FCR Calculator", key: "fcr" },
      { name: "Biofloc Carbon", key: "carbon" },
      { name: "Profit Calculator", key: "profit" }
    ];
    const matchedCalcs = calculators.filter(c => c.name.toLowerCase().includes(q))
      .map(c => ({ type: "calculator", label: `🧮 Calculator: ${c.name}`, key: c.key }));

    return [...matchedSpecies, ...matchedArticles, ...matchedCalcs].slice(0, 8);
  };

  const searchResults = getSearchResults();

  const handleSearchItemClick = (item: any) => {
    setSearchQuery("");
    setShowSearchDropdown(false);
    if (item.type === "article") {
      trackArticleView(item.obj);
    } else if (item.type === "species") {
      setActiveSpeciesModal(item.obj);
    } else if (item.type === "calculator") {
      setActiveInlineCalcTab(item.key);
    }
  };

  const runCalculatedMetrics = () => {
    const fcr = calcInputs.gain > 0 ? (calcInputs.feedWeight / calcInputs.gain).toFixed(2) : "0.00";
    const densityKg = calcInputs.aer === "None" ? 10 : calcInputs.aer === "Paddle Wheel" ? 35 : 80;
    const targetKg = calcInputs.spec === "Tilapia" ? 0.5 : calcInputs.spec === "Catfish" ? 0.8 : 0.025;
    const safeStockCount = Math.round((calcInputs.volume * densityKg) / targetKg);

    const feedG = calcInputs.feedAmt * 1000;
    const nitrogenG = feedG * (calcInputs.prot / 100) * 0.16;
    const carbonPurityRatio = calcInputs.pur / 100;
    const molassesG = Math.round(nitrogenG * (15 - 4.6) / carbonPurityRatio);

    const finalCount = calcInputs.stock * (calcInputs.survival / 100);
    const totalHarvestBiomassKg = finalCount * calcInputs.harvestWt;
    const grossRev = totalHarvestBiomassKg * calcInputs.salePrice;
    const totalFeedKg = totalHarvestBiomassKg * calcInputs.fcr;
    const totalFeedCost = totalFeedKg * calcInputs.feedCost;
    const operatingOverhead = grossRev * 0.15;
    const netProfit = grossRev - totalFeedCost - operatingOverhead;

    return { fcr, safeStockCount, molassesG, grossRev, totalFeedCost, netProfit, totalFeedKg };
  };

  const calcs = runCalculatedMetrics();

  return (
    <div id="professional-dashboard-wrapper" className="space-y-6 sm:space-y-8 py-2 sm:py-4 w-full max-w-full overflow-x-hidden">

      {/* 1. TOP COMMAND HEADER & SEARCH PANEL */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm w-full overflow-hidden space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse shrink-0" />
              <span>Modern Aquaculture Intelligence</span>
            </div>
            <h2 className="font-sans font-black text-xl sm:text-2xl lg:text-3xl text-slate-900 tracking-tight leading-tight">
              Operations & Technical Dashboard
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Real-time sizing calculators, commercial species parameters, bio-filtration design sheets, and expert technical guides.
            </p>
          </div>

          {/* 🔍 Search Input with Live Dropdown */}
          <div className="relative w-full lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 sm:top-3.5 w-4 h-4 text-slate-400" />
              <input
                id="dashboard-main-search-bar"
                type="text"
                placeholder="Search species, guides, calculators..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 focus:border-emerald-600 focus:bg-white rounded-xl sm:rounded-2xl text-xs sm:text-sm font-sans focus:outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Dropdown search panel */}
            {showSearchDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute top-12 sm:top-14 left-0 w-full bg-white rounded-2xl border border-slate-200 shadow-2xl z-40 max-h-80 overflow-y-auto divide-y divide-slate-100 p-2">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matching Aquaculture Assets</div>
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">No matching aquaculture assets found.</div>
                ) : (
                  searchResults.map((item, idx) => (
                    <button
                      key={`search-item-${idx}`}
                      onClick={() => handleSearchItemClick(item)}
                      className="w-full text-left px-3 py-2.5 hover:bg-emerald-50 text-xs text-slate-700 font-sans font-medium flex items-center justify-between group rounded-xl transition-colors cursor-pointer"
                    >
                      <span className="truncate pr-2">{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick KPI Stat Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
          <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl sm:rounded-2xl text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Target FCR</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Optimal</span>
            </div>
            <div className="text-slate-900 font-mono font-black text-lg sm:text-xl">1.2 - 1.4</div>
            <span className="text-slate-400 text-[10px] block truncate">Feed conversion index</span>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl sm:rounded-2xl text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">DO Level</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800">&gt; 5.0 mg/L</span>
            </div>
            <div className="text-slate-900 font-mono font-black text-lg sm:text-xl">6.2 mg/L</div>
            <span className="text-slate-400 text-[10px] block truncate">Dissolved Oxygen</span>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl sm:rounded-2xl text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Biofloc C:N</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">Target 15:1</span>
            </div>
            <div className="text-slate-900 font-mono font-black text-lg sm:text-xl">15 : 1 Ratio</div>
            <span className="text-slate-400 text-[10px] block truncate">Carbon/Nitrogen balance</span>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl sm:rounded-2xl text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Water Temp</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Ideal</span>
            </div>
            <div className="text-slate-900 font-mono font-black text-lg sm:text-xl">28°C - 30°C</div>
            <span className="text-slate-400 text-[10px] block truncate">Tropical species safe</span>
          </div>
        </div>
      </div>



      {/* 2. SYSTEM MODULE EXPLORER GRID */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4 text-left w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3 className="font-sans font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Farming Systems & Technical Modules</span>
          </h3>
          <p className="text-slate-500 text-xs">Tap any system module to launch technical field guides</p>
        </div>

        <div className="grid grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 w-full">
          {[
            { name: "Aquaponics", icon: Sprout, page: "aquaponics", color: "hover:border-emerald-400 hover:bg-emerald-50/50 text-emerald-800" },
            { name: "Hydroponics", icon: Droplet, page: "hydroponics", color: "hover:border-sky-400 hover:bg-sky-50/50 text-sky-800" },
            { name: "RAS Technology", icon: Waves, page: "ras", color: "hover:border-blue-400 hover:bg-blue-50/50 text-blue-800" },
            { name: "Biofloc Systems", icon: Layers, page: "biofloc", color: "hover:border-teal-400 hover:bg-teal-50/50 text-teal-800" },
            { name: "Pond Farming", icon: Fish, page: "pond", color: "hover:border-cyan-400 hover:bg-cyan-50/50 text-cyan-800" },
            { name: "Fish Diseases", icon: HeartPulse, page: "diseases", color: "hover:border-rose-400 hover:bg-rose-50/50 text-rose-800" },
            { name: "Fish Feed Plan", icon: Zap, page: "feed", color: "hover:border-amber-400 hover:bg-amber-50/50 text-amber-800" },
          ].map((topic) => {
            const Icon = topic.icon;
            return (
              <button
                key={topic.name}
                onClick={() => onNavigate(topic.page as any)}
                className={`bg-white rounded-xl sm:rounded-2xl p-3 border border-slate-200/80 transition-all active:scale-95 hover:scale-[1.02] shadow-2xs hover:shadow-md cursor-pointer flex flex-col items-center justify-center text-center gap-2 min-h-[85px] sm:min-h-[100px] w-full min-w-0 ${topic.color}`}
              >
                <div className="p-2 rounded-xl bg-slate-50 text-current shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-sans font-bold text-[11px] sm:text-xs tracking-tight leading-tight text-slate-800 break-words w-full">
                  {topic.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT (Full width layout without double grid column nesting) */}
      <div className="space-y-6 sm:space-y-8 w-full min-w-0">
        
        {/* SPECIES AGRONOMY & PROPERTY CARDS GRID */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4 sm:space-y-6 w-full overflow-hidden">
          <div className="text-left space-y-1 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Fish className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg tracking-tight">
                High-Yield Species Property Spec Sheets
              </h3>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Essential biological parameters, stocking density limits, and target market prices for commercial culture fish.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
            {SPECIES.map((spec) => (
              <div 
                key={spec.id} 
                className="bg-slate-50/80 border border-slate-200 hover:border-emerald-300 rounded-2xl p-3.5 sm:p-4 text-left space-y-3 transition-all hover:bg-white hover:shadow-md flex flex-col justify-between w-full min-w-0"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-sans font-extrabold text-sm sm:text-base text-slate-900 truncate min-w-0">{spec.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 shrink-0">
                      {spec.scientific.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 line-clamp-2 leading-relaxed">
                    {spec.description}
                  </p>
                </div>

                {/* 4-Box Metric Property Grid */}
                <div className="grid grid-cols-2 gap-2.5 bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 font-sans w-full min-w-0">
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-slate-500 block font-bold uppercase text-xs sm:text-[13px] tracking-wider truncate">Stocking</span>
                    <strong className="text-slate-900 block text-base sm:text-lg font-mono font-bold leading-tight break-words">{spec.density}</strong>
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-slate-500 block font-bold uppercase text-xs sm:text-[13px] tracking-wider truncate">Growth Cycle</span>
                    <strong className="text-slate-900 block text-base sm:text-lg font-mono font-bold leading-tight break-words">{spec.growth}</strong>
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-slate-500 block font-bold uppercase text-xs sm:text-[13px] tracking-wider truncate">Protein Target</span>
                    <strong className="text-slate-900 block text-base sm:text-lg font-mono font-bold leading-tight break-words">{spec.protein}</strong>
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-slate-500 block font-bold uppercase text-xs sm:text-[13px] tracking-wider truncate">Est. Price</span>
                    <strong className="text-emerald-700 block text-base sm:text-lg font-mono font-bold leading-tight break-words">{spec.marketPrice}</strong>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSpeciesModal(spec)}
                  className="w-full py-2 px-3 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Property Slat Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ALL CALCULATORS INLINE SECTION */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4 sm:space-y-6 w-full overflow-hidden">
          <div className="text-left space-y-1 border-b border-slate-100 pb-3 sm:pb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg tracking-tight">
                All Calculators Operations Center
              </h3>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Run immediate, precise operational calculations directly. Calibrate feed requirements, safe densities, and net profit projections.
            </p>
          </div>

          {/* Selector Tabs - Scrollable on Mobile, Grid on Tablet/Desktop */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl sm:rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar gap-1.5 sm:grid sm:grid-cols-3 lg:grid-cols-6 w-full min-w-0">
            {[
              { tab: "feed", name: "Feed Plan" },
              { tab: "stocking", name: "Stocking Density" },
              { tab: "volume", name: "Water Volume" },
              { tab: "fcr", name: "FCR Metrics" },
              { tab: "carbon", name: "Carbon Molasses" },
              { tab: "profit", name: "Profit Sizer" }
            ].map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveInlineCalcTab(item.tab as any)}
                className={`px-3 py-2 text-center text-xs font-bold rounded-lg sm:rounded-xl transition-all cursor-pointer shrink-0 sm:shrink sm:w-full min-w-max sm:min-w-0 ${
                  activeInlineCalcTab === item.tab
                    ? "bg-white text-emerald-950 shadow-xs font-black"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }`}
              >
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Inline Calculator Active Form */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 sm:p-6 rounded-2xl text-left space-y-4 w-full">
            
            {/* FEED PLAN */}
            {activeInlineCalcTab === "feed" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total stocked fish count</label>
                    <input 
                      type="number" 
                      value={calcInputs.stock} 
                      onChange={(e) => setCalcInputs({...calcInputs, stock: Math.max(1, Number(e.target.value))})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Average fish weight (grams)</label>
                    <input 
                      type="number" 
                      value={calcInputs.harvestWt * 1000} 
                      onChange={(e) => setCalcInputs({...calcInputs, harvestWt: Math.max(0.1, Number(e.target.value)) / 1000})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80">
                  <span className="block text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest">Calculated Daily Feeding Target</span>
                  <div className="font-extrabold text-sm sm:text-base text-slate-800 mt-1">
                    Required Feed: <span className="text-emerald-700 font-mono text-lg sm:text-xl block sm:inline mt-1 sm:mt-0 break-all">{((calcInputs.stock * calcInputs.harvestWt) * 0.025).toFixed(2)} kg / day</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Based on a standard 2.5% daily feed grow-out schedule split across 3 daily feeding cycles.
                  </p>
                </div>
              </div>
            )}

            {/* STOCKING DENSITY */}
            {activeInlineCalcTab === "stocking" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Culture volume (m³)</label>
                    <input 
                      type="number" 
                      value={calcInputs.volume} 
                      onChange={(e) => setCalcInputs({...calcInputs, volume: Math.max(1, Number(e.target.value))})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Culture species</label>
                    <select 
                      value={calcInputs.spec} 
                      onChange={(e) => setCalcInputs({...calcInputs, spec: e.target.value})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Tilapia">Tilapia</option>
                      <option value="Catfish">Catfish</option>
                      <option value="Shrimp">Shrimp</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Aeration Level</label>
                    <select 
                      value={calcInputs.aer} 
                      onChange={(e) => setCalcInputs({...calcInputs, aer: e.target.value})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:border-emerald-600"
                    >
                      <option value="None">None (Extremely Low)</option>
                      <option value="Paddle Wheel">Paddle Wheel (Medium)</option>
                      <option value="Continuous Diffuser">Continuous Air Diffuser (High)</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80">
                  <span className="block text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest">Safe Stock limits</span>
                  <div className="font-extrabold text-sm sm:text-base text-slate-800 mt-1">
                    Max Stock Density: <span className="text-emerald-700 font-mono text-lg sm:text-xl block sm:inline mt-1 sm:mt-0 break-all">{calcs.safeStockCount} Fingerlings</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Assumes target harvest weight of {calcInputs.spec === "Tilapia" ? "500g" : calcInputs.spec === "Catfish" ? "800g" : "25g"}.
                  </p>
                </div>
              </div>
            )}

            {/* WATER VOLUME */}
            {activeInlineCalcTab === "volume" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tank Diameter (m)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={(calcInputs.volume / 2.5).toFixed(1)} 
                      onChange={(e) => setCalcInputs({...calcInputs, volume: Math.max(1, Number(e.target.value) * 2.5)})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Water Depth (m)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      defaultValue="1.2" 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80">
                  <span className="block text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest">Calculated Water Capacity</span>
                  <div className="font-extrabold text-sm sm:text-base text-slate-800 mt-1">
                    Capacity: <span className="text-emerald-700 font-mono text-lg sm:text-xl block sm:inline mt-1 sm:mt-0 break-all">{(calcInputs.volume * 1000).toLocaleString()} Litres</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Calculated as cylindrical body of water with 15cm safety freeboard space.
                  </p>
                </div>
              </div>
            )}

            {/* FCR METRICS */}
            {activeInlineCalcTab === "fcr" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total Distributed Feed (kg)</label>
                    <input 
                      type="number" 
                      value={calcInputs.feedWeight} 
                      onChange={(e) => setCalcInputs({...calcInputs, feedWeight: Math.max(1, Number(e.target.value))})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total Biomass Weight Gained (kg)</label>
                    <input 
                      type="number" 
                      value={calcInputs.gain} 
                      onChange={(e) => setCalcInputs({...calcInputs, gain: Math.max(1, Number(e.target.value))})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80">
                  <span className="block text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest">Feed Conversion Ratio</span>
                  <div className="font-extrabold text-sm sm:text-base text-slate-800 mt-1">
                    FCR Value: <span className="text-emerald-700 font-mono text-lg sm:text-xl block sm:inline mt-1 sm:mt-0 break-all">{calcs.fcr}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Lower FCR represents higher feed assimilation efficiency. Target FCR below 1.4 for Tilapia.
                  </p>
                </div>
              </div>
            )}

            {/* CARBON MOLASSES */}
            {activeInlineCalcTab === "carbon" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Daily Feed Distributed (kg)</label>
                    <input 
                      type="number" 
                      value={calcInputs.feedAmt} 
                      onChange={(e) => setCalcInputs({...calcInputs, feedAmt: Math.max(0.1, Number(e.target.value))})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Feed Crude Protein %</label>
                    <input 
                      type="number" 
                      value={calcInputs.prot} 
                      onChange={(e) => setCalcInputs({...calcInputs, prot: Math.max(1, Number(e.target.value))})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sugar purity %</label>
                    <input 
                      type="number" 
                      value={calcInputs.pur} 
                      onChange={(e) => setCalcInputs({...calcInputs, pur: Math.max(10, Number(e.target.value))})} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600" 
                    />
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80">
                  <span className="block text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest">Recommended Organic Carbon Dosage</span>
                  <div className="font-extrabold text-sm sm:text-base text-slate-800 mt-1">
                    Molasses to add: <span className="text-emerald-700 font-mono text-lg sm:text-xl block sm:inline mt-1 sm:mt-0 break-all">{calcs.molassesG} grams</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Calculated to establish heterotrophic biological balance assuming a strict C:N index of 15:1.
                  </p>
                </div>
              </div>
            )}

            {/* PROFIT SIZER */}
            {activeInlineCalcTab === "profit" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total stock count</label>
                    <input type="number" value={calcInputs.stock} onChange={(e) => setCalcInputs({...calcInputs, stock: Math.max(1, Number(e.target.value))})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Survival Rate %</label>
                    <input type="number" value={calcInputs.survival} onChange={(e) => setCalcInputs({...calcInputs, survival: Math.max(1, Number(e.target.value))})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Harvest weight (kg)</label>
                    <input type="number" step="0.1" value={calcInputs.harvestWt} onChange={(e) => setCalcInputs({...calcInputs, harvestWt: Math.max(0.1, Number(e.target.value))})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sale price (₹/kg)</label>
                    <input type="number" value={calcInputs.salePrice} onChange={(e) => setCalcInputs({...calcInputs, salePrice: Math.max(1, Number(e.target.value))})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Feed Cost (₹/kg)</label>
                    <input type="number" value={calcInputs.feedCost} onChange={(e) => setCalcInputs({...calcInputs, feedCost: Math.max(1, Number(e.target.value))})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target FCR</label>
                    <input type="number" step="0.1" value={calcInputs.fcr} onChange={(e) => setCalcInputs({...calcInputs, fcr: Math.max(0.5, Number(e.target.value))})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono" />
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80 text-slate-800">
                  <span className="block text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest">Financial grow curves</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mt-2 font-bold text-xs sm:text-sm">
                    <div>Gross Revenue: <span className="text-slate-900 font-mono font-bold break-all">₹{calcs.grossRev.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                    <div>Total Feed Used: <span className="text-slate-900 font-mono font-bold break-all">{calcs.totalFeedKg.toFixed(0)} kg</span></div>
                    <div>Total Feed Cost: <span className="text-slate-900 font-mono font-bold break-all">₹{calcs.totalFeedCost.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                    <div className="text-emerald-700">Net Profit: <span className="font-mono font-black break-all">₹{calcs.netProfit.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RECOMMENDED TECHNICAL ARTICLES LIBRARY */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between w-full overflow-hidden">
          <div className="border-b border-slate-100 pb-3 text-left">
            <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Recommended Technical Articles</span>
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5 leading-relaxed">Verified biological and hydraulic grow-out methodologies for Indian farmers.</p>
          </div>

          <div className="divide-y divide-slate-100">
            {ARTICLES.map((art) => (
              <div key={art.id} className="py-3 flex items-start gap-3 sm:gap-4 text-left group min-w-0">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 group-hover:text-emerald-700" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 uppercase">{art.category}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{art.readTime}</span>
                  </div>
                  <h4 
                    onClick={() => trackArticleView(art)}
                    className="font-sans font-extrabold text-xs sm:text-sm text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer leading-snug break-words"
                  >
                    {art.title}
                  </h4>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{art.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

        {/* EXPERT TIP & QUICK RESOURCE CARDS (Responsive Bottom Strip) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full pt-2">

          {/* DAILY EXPERT TIP MODULE */}
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md flex flex-col justify-between text-left space-y-4 w-full overflow-hidden border border-emerald-900/50">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shrink-0">
                  <Zap className="w-3 h-3 fill-current" />
                  Daily Expert Tip
                </span>
                <span className="text-[10px] font-mono text-emerald-300">Ref: Bio-Log</span>
              </div>
              <p className="font-sans font-medium text-xs sm:text-sm leading-relaxed text-slate-100 italic min-h-[50px]">
                "{TIPS[tipIndex]}"
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-[10px] text-emerald-300">Auto-rotating daily</span>
              <button 
                onClick={() => setTipIndex((prev) => (prev + 1) % TIPS.length)}
                className="p-1.5 px-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Next Tip</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CONTINUE LEARNING PROGRESS WIDGET */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-4 sm:p-6 space-y-4 text-left w-full overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <BookOpen className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <h4 className="font-sans font-black text-slate-800 text-sm">Recently Viewed Resources</h4>
              </div>

              <div className="space-y-2 text-xs leading-snug">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Last Read Guide</span>
                  <p className="font-sans font-extrabold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1" onClick={() => lastArticle && trackArticleView(lastArticle)}>
                    {lastArticle ? lastArticle.title : "Beginner's Guide to Biofloc Culture"}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Last Watched Video</span>
                  <p className="font-sans font-extrabold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1" onClick={() => lastVideo && trackVideoWatch(lastVideo)}>
                    {lastVideo ? lastVideo.title : "Backyard RAS Setup Guide"}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onNavigate("videos")} 
              className="w-full text-center py-2 px-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-sans font-bold text-xs border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Browse Video Archive
            </button>
          </div>

        </div>

      {/* MODAL / DRAWER DIALOG POPUPS */}
      {/* 1. Article Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green-100 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-left animate-slide-in mx-2">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3 gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 inline-block">
                  {activeArticleModal.category}
                </span>
                <h3 className="font-sans font-black text-slate-900 text-base sm:text-xl mt-1 leading-snug">{activeArticleModal.title}</h3>
                <span className="text-xs text-slate-400 block mt-0.5">{activeArticleModal.readTime}</span>
              </div>
              <button 
                onClick={() => setActiveArticleModal(null)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-lg text-xs cursor-pointer font-bold shrink-0"
              >
                ✕
              </button>
            </div>
            
            <p className="font-sans font-medium text-xs sm:text-sm text-slate-700 italic border-l-4 border-emerald-500 pl-3 py-1 bg-slate-50 rounded-r-xl">
              "{activeArticleModal.summary}"
            </p>

            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-4">
              {activeArticleModal.content}
            </div>

            <div className="border-t border-slate-100 pt-3 mt-4 flex flex-wrap justify-between items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono text-[10px]">Verified by Modern Fisheries Solutions Sourcing Desk</span>
              <button 
                onClick={() => setActiveArticleModal(null)}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold cursor-pointer transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Species Modal */}
      {activeSpeciesModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green-100 shadow-2xl space-y-4 text-left animate-slide-in max-h-[90vh] overflow-y-auto mx-2">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3 gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 inline-block">
                  {activeSpeciesModal.scientific}
                </span>
                <h3 className="font-sans font-black text-slate-900 text-lg sm:text-xl mt-1 leading-snug">
                  {activeSpeciesModal.name} Slat Sheet
                </h3>
              </div>
              <button 
                onClick={() => setActiveSpeciesModal(null)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-lg text-xs cursor-pointer font-bold shrink-0"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans font-medium">
              {activeSpeciesModal.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-sans">
              <div>
                <span className="text-slate-500 block text-xs sm:text-[13px] font-bold uppercase tracking-wider">Stocking Density</span>
                <strong className="text-slate-900 font-mono text-base sm:text-lg block mt-0.5">{activeSpeciesModal.density}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-xs sm:text-[13px] font-bold uppercase tracking-wider">Growth Sizing</span>
                <strong className="text-slate-900 font-mono text-base sm:text-lg block mt-0.5">{activeSpeciesModal.growth}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-xs sm:text-[13px] font-bold uppercase tracking-wider">Crude Protein Target</span>
                <strong className="text-slate-900 font-mono text-base sm:text-lg block mt-0.5">{activeSpeciesModal.protein}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-xs sm:text-[13px] font-bold uppercase tracking-wider">Thermic Safe range</span>
                <strong className="text-slate-900 font-mono text-base sm:text-lg block mt-0.5">{activeSpeciesModal.temp}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-xs sm:text-[13px] font-bold uppercase tracking-wider">Water Safe pH</span>
                <strong className="text-slate-900 font-mono text-base sm:text-lg block mt-0.5">{activeSpeciesModal.ph}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-xs sm:text-[13px] font-bold uppercase tracking-wider">Est. Wholesale Price</span>
                <strong className="text-emerald-700 font-mono text-base sm:text-lg block mt-0.5 font-bold">{activeSpeciesModal.marketPrice}</strong>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 mt-4 flex flex-wrap justify-between items-center gap-2 text-[10px] text-slate-400">
              <span>* Wholesales are subject to change depending on season seeds.</span>
              <button 
                onClick={() => setActiveSpeciesModal(null)}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Dismiss Sheet
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
