import React, { useState } from "react";
import { 
  Sparkles, ChevronLeft, ArrowRight, Info, ShieldAlert, CheckCircle2,
  HelpCircle, Droplet, Scale, Check, DollarSign, TrendingUp, AlertTriangle, Activity
} from "lucide-react";
import { Video } from "../types";
import VideoCard from "./VideoCard";
import TechnologyComparison from "./TechnologyComparison";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface PondFarmingPageProps {
  onVideoClick?: (video: Video) => void;
  onBackToDashboard?: () => void;
}

export default function PondFarmingPage({ onVideoClick, onBackToDashboard }: PondFarmingPageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "problems" | "comparison" | "calculator" | "videos">("overview");

  // Lime & Starter Manure Calculator State
  const [pondArea, setPondArea] = useState<number>(1); // In Acres
  const [soilPh, setSoilPh] = useState<number>(6.0); // pH units

  // Sizing Calculations
  const calculateLimeRequirement = (area: number, ph: number): number => {
    if (ph < 5.0) return Math.round(area * 1000); // 1000 kg/acre
    if (ph < 5.6) return Math.round(area * 600);  // 600 kg/acre
    if (ph < 6.5) return Math.round(area * 400);  // 400 kg/acre
    if (ph <= 7.5) return Math.round(area * 150); // 150 kg/acre (maintenance)
    return 0; // Alkaline - no lime needed
  };

  const calculatedLime = calculateLimeRequirement(pondArea, soilPh);
  const calculatedCowDung = Math.round(pondArea * 2000); // 2000 kg/acre
  const calculatedUrea = Math.round(pondArea * 20); // 20 kg/acre
  const calculatedSSP = Math.round(pondArea * 30); // 30 kg/acre

  // Curated Pond Farming Videos matching our data model structure
  const pondVideos: Video[] = [
    {
      id: "pond-yt-1",
      title: "DIY Earthen Pond Setup: Liming and Conditioning",
      description: "Detailed walkthrough on preparation of earthen ponds before stocking. Learn how to calculate agricultural lime requirements (CaCO3) based on soil pH, plus pre-stocking fertilization techniques to cultivate natural bloom.",
      thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/V38vD53_7S0",
      duration: "24:10",
      views: "19.2K views",
      type: "youtube",
      creator: "Modern Fisheries",
      publishDate: "2 weeks ago",
      category: "Pond Setup",
      likes: 822
    },
    {
      id: "pond-yt-2",
      title: "Managing Algae Blooms and Plankton Crashes in Earthen Ponds",
      description: "Learn how to regulate phytoplankton blooms, detect high-risk morning oxygen crashes, and apply emergency aeration or gypsum treatment safely.",
      thumbnail: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/P_Yw8O76Z0Q",
      duration: "15:45",
      views: "45K views",
      type: "youtube",
      creator: "Global Fisheries Academy",
      publishDate: "1 month ago",
      category: "Water Quality",
      likes: 1200
    },
    {
      id: "pond-yt-3",
      title: "Polyculture Carp Stocking Strategies: Indian Major Carps",
      description: "Maximize your pond's ecological niches. How to stock Catla (surface), Rohu (column), and Mrigal (bottom) in optimal 3:4:3 ratios for organic growth.",
      thumbnail: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/F1h36_vWk0w",
      duration: "18:20",
      views: "62K views",
      type: "youtube",
      creator: "Carp Masters",
      publishDate: "2 months ago",
      category: "Pond Setup",
      likes: 2150
    },
    {
      id: "pond-yt-4",
      title: "Earthen Pond Harvesting Techniques & Drag Netting Masterclass",
      description: "Watch a professional team drag net a 1-acre commercial carp pond. Techniques to reduce fish stress, minimize turbid mud disruption, and grade weight classes.",
      thumbnail: "https://images.unsplash.com/photo-1516715094727-ec48be335d79?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/Wp198F0R9oA",
      duration: "12:30",
      views: "34K views",
      type: "youtube",
      creator: "Fisheries Technology Desk",
      publishDate: "3 months ago",
      category: "Pond Setup",
      likes: 980
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Banner Container */}
      <div className="relative bg-gradient-to-r from-emerald-900 to-green-950 text-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8 overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.12),transparent_60%)]"></div>
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
            
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] sm:text-[10px] font-mono uppercase tracking-widest font-black px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Traditional Open-Water Aquaculture
            </div>
            <h1 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-white leading-tight">
              Pond Fish Farming
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-xl">
              Understand the biological principles, structural standards, benefits, risks, and economic configurations of traditional earthen pond fisheries.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl backdrop-blur-md self-start md:self-center w-full md:w-auto">
            <span className="block text-[10px] font-mono tracking-widest uppercase text-emerald-300 font-bold mb-0.5 sm:mb-1">Stocking Benchmark</span>
            <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight text-white">2 - 10 kg / m³</span>
            <span className="block text-[11px] sm:text-xs text-emerald-100/70 mt-1 leading-snug">Ideal for low-capex polyculture carp and tilapia.</span>
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

      {/* Tabs Menu Navigation */}
      <div className="sticky top-14 sm:top-16 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 sm:py-3 overflow-x-auto scrollbar-none max-w-full -mx-3 px-3 sm:mx-0 sm:px-0">
            {[
              { id: "overview", label: "System Overview" },
              { id: "problems", label: "Benefits & Problems" },
              { id: "comparison", label: "Feasibility Matrix" },
              { id: "calculator", label: "Lime & Fertilizer Calc" },
              { id: "videos", label: "Video Masterclasses" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-emerald-650 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 items-start">
          <div className="flex-1 min-w-0 space-y-6 sm:space-y-12 w-full">
        
        {/* Tab 1: Overview & Ecology */}
        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Introductory Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-2.5 sm:space-y-3 shadow-xs">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <Droplet className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">Natural Nutrient Cycles</h3>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
                  Utilizes solar energy to drive organic phytoplankton and zooplankton photosynthesis, creating a self-sustaining aquatic food web that feeds stock naturally.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-2.5 sm:space-y-3 shadow-xs">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">Earthen Buffer Stability</h3>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
                  Large volume and organic benthic soil mud work as dynamic chemical sponges, naturally neutralizing harmful nitrogen toxins and buffering water temperature changes.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-2.5 sm:space-y-3 shadow-xs">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">Polyculture Optimization</h3>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
                  Enables simultaneous stocking of multiple species occupying separate ecological layers (e.g. Surface: Catla; Mid-water: Rohu; Bottom: Mrigal).
                </p>
              </div>
            </div>

            {/* In-depth Article Section */}
            <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-xs">
              <div className="space-y-1.5 border-b border-slate-100 pb-3 sm:pb-4">
                <span className="text-[10px] font-mono text-emerald-700 font-extrabold uppercase tracking-widest block">Structural Protocol</span>
                <h2 className="text-lg sm:text-2xl font-sans font-black text-slate-950 tracking-tight">
                  Earthen Pond Architecture & Pre-Stocking Operations
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Standard structural criteria to prevent bank erosion, limit water leakage, and establish healthy microbial/plankton blooms.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-4 bg-emerald-600 rounded-sm"></span>
                    1. Site Selection & Clay Core Dykes
                  </h4>
                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    The absolute prerequisite for a viable earthen pond is soil clay content (minimum 30-35% clay) to secure high water retention and block excessive seepage. Dykes or bunds must feature a 2:1 slope ratio with a central clay puddle trench to prevent structural cave-ins and lateral seepage. 
                  </p>
                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    Optimal pond depth must range between <strong>1.5m to 2.0m</strong>. Ponds shallower than 1.0m overheat rapidly in summer and promote weeds, whereas depths exceeding 2.5m cause solar thermal stratification, leading to cold, completely anaerobic bottom layers.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-4 bg-emerald-600 rounded-sm"></span>
                    2. Drying, Liming & Inoculation sequence
                  </h4>
                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    Prior to stocking, the pond bottom must be sun-dried for 10-14 days until the clay layer cracks. This process oxidizes accumulated organic gases (H2S, CH4) and kills wild pathogens. 
                  </p>
                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    Agricultural Lime (CaCO3) is then applied uniformly to elevate soil pH above 7.0 and maintain water alkalinity above 100 mg/L. Once limed, the pond is filled with water and fertilized with organic manure (cow dung) and nitrogenous compounds (Urea, Single Super Phosphate) to trigger the growth of beneficial green phytoplankton and nutrient-dense zooplankton.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Benefits & Problems Column Comparison */}
        {activeTab === "problems" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">
                Pond Farming: Benefits & Structural Limitations
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                While earthen pond farming has the lowest barrier to entry, it faces severe resource constraints and biological vulnerabilities. Review the comprehensive column breakdown.
              </p>
            </div>

            {/* Direct Side-by-Side Benefit vs Problem Comparison Table / Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              
              {/* Core Benefits Column */}
              <div className="bg-white border border-emerald-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-sm">
                <div className="flex items-center gap-2.5 pb-3 sm:pb-4 border-b border-emerald-50">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-slate-900 text-xs sm:text-base">Key Agronomic Benefits</h3>
                    <p className="text-[9px] sm:text-[10px] text-emerald-600 font-mono uppercase tracking-wider font-bold">Why farmers prefer ponds</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Lowest Capital Investment (CapEx)",
                      desc: "No expensive structural fiberglass tanks, advanced multi-stage recirculating filters, or oxygen injection pumps. The main cost is excavation machinery."
                    },
                    {
                      title: "Extremely Low Operating Cost (OpEx)",
                      desc: "Natural plankton productivity provides up to 30% of daily feeding requirements. Cheap, lower-protein feeds can be used instead of specialized feeds."
                    },
                    {
                      title: "High Thermal and Biological Buffer",
                      desc: "The immense water volume and soil interactions absorb dramatic environmental shocks, protecting stock from sudden pH spikes or rapid temperature drops."
                    },
                    {
                      title: "Ideal for High-Value Carp Polyculture",
                      desc: "Allows stocking multiple fish species together (Rohu, Catla, Mrigal) that occupy and clean distinct water column niches, maximizing pond space."
                    }
                  ].map((b, i) => (
                    <div key={`benefit-${i}`} className="flex gap-2.5 sm:gap-3 items-start text-xs">
                      <div className="p-1 rounded-md bg-emerald-50 text-emerald-700 shrink-0 mt-0.5 font-bold font-mono text-[10px] sm:text-xs">✓</div>
                      <div className="space-y-0.5 min-w-0">
                        <h4 className="font-sans font-extrabold text-slate-900 text-xs">{b.title}</h4>
                        <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Problems Column */}
              <div className="bg-white border border-rose-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-sm">
                <div className="flex items-center gap-2.5 pb-3 sm:pb-4 border-b border-rose-50">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-slate-900 text-xs sm:text-base">Inherent System Problems</h3>
                    <p className="text-[9px] sm:text-[10px] text-rose-600 font-mono uppercase tracking-wider font-bold">Operating risks & limitations</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Excessive Water Seepage & Waste",
                      desc: "Massive evaporation and soil seepage require continuous water replenishment from local groundwater sources. Unsuitable for water-scarce regions."
                    },
                    {
                      title: "High Vulnerability to Pathogens",
                      desc: "Stock is in direct contact with natural soil pathogens, wild fish, and bird disease vectors. Controlling parasites and viruses is highly difficult."
                    },
                    {
                      title: "Low Stocking Density Limits",
                      desc: "Without mechanical aeration and active waste removal, biological carrying capacity is severely limited to only 2-5 kg/m³ to prevent oxygen starvation."
                    },
                    {
                      title: "Nocturnal Plankton Oxygen Crashes",
                      desc: "Heavy algae blooms consume oxygen instead of producing it during dark night hours. Sudden cloud cover or bloom decay can crash DO levels to zero in minutes."
                    },
                    {
                      title: "Complicated Harvesting Logistics",
                      desc: "Requires either heavy manpower to drag large seine nets or complete pond draining, which creates turbid mud stress and disrupts the stock."
                    }
                  ].map((p, i) => (
                    <div key={`problem-${i}`} className="flex gap-2.5 sm:gap-3 items-start text-xs">
                      <div className="p-1 rounded-md bg-rose-50 text-rose-700 shrink-0 mt-0.5 font-bold font-mono text-[10px] sm:text-xs">✗</div>
                      <div className="space-y-0.5 min-w-0">
                        <h4 className="font-sans font-extrabold text-slate-900 text-xs">{p.title}</h4>
                        <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Warning Panel */}
            <div className="p-3.5 sm:p-5 bg-amber-50 border border-amber-100 rounded-xl sm:rounded-2xl flex gap-2.5 sm:gap-3 items-start">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-[11px] sm:text-xs text-amber-900 leading-relaxed">
                <strong>Agronomy Note on Pond Management:</strong> To mitigate pond vulnerabilities, farmers should maintain paddlewheel or aspirator aerators on standby. Weekly water quality monitoring of pH, ammonium (NH4+), and dissolved oxygen (DO) at dawn is highly recommended to catch nocturnal drops before catastrophic fish mortality occurs.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Complete Feasibility Matrix (Comparing all technologies) */}
        {activeTab === "comparison" && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">
                Technology Feasibility & Column Comparison Matrix
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Analyze and compare the newly introduced <strong>Pond Farming</strong> parameters alongside <strong>RAS, Biofloc, Aquaponics, and Hydroponics</strong> columns.
              </p>
            </div>
            <TechnologyComparison activeTech="pond" />
          </div>
        )}

        {/* Tab 4: Interactive Lime & Fertilizer Calculator */}
        {activeTab === "calculator" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-fade-in">
            
            {/* Input Controls Panel */}
            <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-xs self-start">
              <div className="space-y-1">
                <h3 className="font-sans font-black text-slate-950 text-sm sm:text-base">Pond Preparation Config</h3>
                <p className="text-[11px] sm:text-xs text-slate-500">Adjust the dimensions and soil acidity of your pond to calculate conditioning inputs.</p>
              </div>

              {/* Slider 1: Area */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-sans font-bold text-slate-700">Pond Water Area</label>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px] sm:text-xs">{pondArea} Acre(s)</span>
                </div>
                <input 
                  type="range" 
                  min={0.1} 
                  max={20} 
                  step={0.1}
                  value={pondArea}
                  onChange={(e) => setPondArea(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-400 font-mono">
                  <span>0.1 Acre</span>
                  <span>10.0 Acres</span>
                  <span>20.0 Acres</span>
                </div>
              </div>

              {/* Slider 2: Soil pH */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-sans font-bold text-slate-700">Soil Acidity (pH)</label>
                  <span className={`font-mono font-bold px-2 py-0.5 rounded-md text-[11px] sm:text-xs ${
                    soilPh < 5.5 ? "bg-red-50 text-red-700" : soilPh > 7.5 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                  }`}>{soilPh.toFixed(1)} pH</span>
                </div>
                <input 
                  type="range" 
                  min={4.0} 
                  max={9.0} 
                  step={0.1}
                  value={soilPh}
                  onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-400 font-mono">
                  <span>4.0 (Acidic)</span>
                  <span>7.0 (Neutral)</span>
                  <span>9.0 (Alkaline)</span>
                </div>
              </div>

              {/* Diagnostic Guidance */}
              <div className="p-3 sm:p-4 bg-emerald-50/40 border border-emerald-100/50 rounded-xl sm:rounded-2xl flex gap-2 sm:gap-2.5 items-start">
                <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-[10px] sm:text-[11px] text-emerald-950 leading-relaxed font-sans">
                  <strong>pH Diagnosis:</strong> {soilPh < 5.0 ? (
                    "Soil is highly acidic. Severe danger of toxic aluminum leaching. Demands massive agricultural lime dosages to raise pH and trigger microbial nutrient cycles."
                  ) : soilPh < 6.5 ? (
                    "Moderately acidic soil. Lime application is required to optimize microbial decomposition and secure bicarbonate carbonate buffer systems."
                  ) : soilPh <= 7.5 ? (
                    "Optimal neutral soil. Maintenance liming dosage is recommended to settle suspended organic sediment and preserve calcium hardness."
                  ) : (
                    "Alkaline soil. Liming is strictly discouraged. Excessive calcium will complex phosphates and make them unavailable for primary plankton growth."
                  )}
                </p>
              </div>
            </div>

            {/* Results Display Panel */}
            <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-3 sm:space-y-4">
                <div className="border-b border-slate-100 pb-3 sm:pb-4">
                  <h3 className="font-sans font-black text-slate-950 text-sm sm:text-base">Pre-Stocking Soil & Fertilization Formula</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">Estimations based on standard fisheries agronomy models for earthen pond biological conditioning.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  
                  {/* Result Card 1: Lime */}
                  <div className="bg-emerald-50/20 border border-emerald-100/30 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl space-y-1 sm:space-y-2 text-left">
                    <span className="text-[9px] sm:text-[10px] font-mono text-emerald-700 uppercase font-bold tracking-widest block">Agricultural Lime (CaCO3)</span>
                    <span className="font-mono font-black text-xl sm:text-2xl text-emerald-850 block">{calculatedLime.toLocaleString()} kg</span>
                    <p className="text-slate-500 text-[11px] sm:text-xs">Spread dry on the cracked sun-dried bottom soil before filling.</p>
                  </div>

                  {/* Result Card 2: Cow dung */}
                  <div className="bg-amber-50/20 border border-amber-100/30 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl space-y-1 sm:space-y-2 text-left">
                    <span className="text-[9px] sm:text-[10px] font-mono text-amber-700 uppercase font-bold tracking-widest block">Decomposed Cow Manure</span>
                    <span className="font-mono font-black text-xl sm:text-2xl text-amber-850 block">{calculatedCowDung.toLocaleString()} kg</span>
                    <p className="text-slate-500 text-[11px] sm:text-xs">Aids heterotrophic bacteria colonies and natural detritus web.</p>
                  </div>

                  {/* Result Card 3: SSP */}
                  <div className="bg-indigo-50/20 border border-indigo-100/30 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl space-y-1 sm:space-y-2 text-left">
                    <span className="text-[9px] sm:text-[10px] font-mono text-indigo-700 uppercase font-bold tracking-widest block">Single Super Phosphate (SSP)</span>
                    <span className="font-mono font-black text-xl sm:text-2xl text-indigo-850 block">{calculatedSSP} kg</span>
                    <p className="text-slate-500 text-[11px] sm:text-xs">Supplies phosphorus to stimulate green algae growth.</p>
                  </div>

                  {/* Result Card 4: Urea */}
                  <div className="bg-blue-50/20 border border-blue-100/30 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl space-y-1 sm:space-y-2 text-left">
                    <span className="text-[9px] sm:text-[10px] font-mono text-blue-700 uppercase font-bold tracking-widest block">Urea (Nitrogen Source)</span>
                    <span className="font-mono font-black text-xl sm:text-2xl text-blue-850 block">{calculatedUrea} kg</span>
                    <p className="text-slate-500 text-[11px] sm:text-xs">Drives nitrogenous compound reserves for natural diatoms.</p>
                  </div>

                </div>
              </div>

              {/* Chemical Reaction Overview */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-5 border-t border-slate-100 space-y-2">
                <h4 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">Recommended Application Protocol:</h4>
                <ol className="text-[11px] sm:text-xs text-slate-500 space-y-1 sm:space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Dry the pond bottom completely until soil cracks (10-15 days).</li>
                  <li>Broadcast the full calculated <strong>{calculatedLime.toLocaleString()} kg</strong> of Calcium Carbonate lime uniformly on the dried bed.</li>
                  <li>Inlet water slowly to a depth of 1-1.5 feet.</li>
                  <li>Mix and dissolve the decomposed Cow Manure, SSP, and Urea in a slurry barrel, then distribute it across the surface.</li>
                  <li>Allow 7-10 days for water color to turn light green (plankton bloom) before introducing fingerlings.</li>
                </ol>
              </div>

            </div>
          </div>
        )}

        {/* Tab 5: Curated Video Masterclass Guides */}
        {activeTab === "videos" && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <div className="text-left space-y-1">
              <span className="text-[10px] font-mono text-emerald-700 font-extrabold uppercase tracking-widest block">Pond Broadcast Station</span>
              <h2 className="text-lg sm:text-2xl font-sans font-black text-slate-900 tracking-tight">
                Curated Earthen Pond Masterclasses
              </h2>
              <p className="text-xs text-slate-500">
                Learn from commercial farmers and researchers on the site construction, water preparation, stocking ratios, and net harvesting of earthen ponds.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {pondVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onVideoClick={onVideoClick || (() => {})}
                />
              ))}
            </div>
          </div>
        )}

          </div>
          <div className="hidden xl:block shrink-0 sticky top-20">
            <RightSidebarAd reloadKey="pond-sidebar-ad" />
          </div>
        </div>
      </main>
    </div>
  );
}
