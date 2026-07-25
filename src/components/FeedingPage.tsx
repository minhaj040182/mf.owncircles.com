import React, { useState } from "react";
import { 
  ArrowLeft, Calculator, Scale, Sparkles, CheckCircle2, 
  Info, ShieldCheck, Layers, Activity, TrendingUp, HelpCircle,
  Award, Fish, Thermometer, Droplet, Zap, HeartPulse
} from "lucide-react";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface FeedingPageProps {
  onBackToDashboard?: () => void;
}

// Data structures for the Feeding System guidelines
interface AgeWiseStage {
  id: string;
  stage: string;
  ageDays: string;
  averageWeight: string;
  pelletSize: string;
  proteinRequired: string;
  feedRatePct: string;
  frequency: string;
  description: string;
}

interface NutritionComponent {
  name: string;
  percentage: string;
  role: string;
  subComponents: string[];
  color: string;
  icon: any;
}

interface FishFeedingConfig {
  species: string;
  feedType: string;
  growoutProtein: string;
  fcrRange: string;
  dailyRateRange: string;
  frequency: string;
  optimalTemp: string;
  keyStrategy: string;
  details: string;
}

const AGE_WISE_STAGES: AgeWiseStage[] = [
  {
    id: "spawn",
    stage: "Spawn / Hatchlings",
    ageDays: "1 - 10 Days",
    averageWeight: "< 0.05 grams",
    pelletSize: "Micro-dust / Powder (< 0.3mm)",
    proteinRequired: "45% - 50%",
    feedRatePct: "15% - 20% of Biomass",
    frequency: "6 - 8 times / day",
    description: "Larval nutrition requires ultra-high water-soluble protein and highly digestible amino acids. Sieve powder finely to prevent gill choking."
  },
  {
    id: "fry",
    stage: "Early Fry Stage",
    ageDays: "11 - 30 Days",
    averageWeight: "0.05 - 2.0 grams",
    pelletSize: "Starter Crumble (0.5mm - 0.8mm)",
    proteinRequired: "40% - 45%",
    feedRatePct: "10% - 15% of Biomass",
    frequency: "5 - 6 times / day",
    description: "Rapid skeletal development occurs during this phase. High calcium, phosphorus, and vitamin C levels are vital to avoid skeletal deformities."
  },
  {
    id: "fingerling",
    stage: "Fingerlings (Nursery)",
    ageDays: "31 - 60 Days",
    averageWeight: "2.0 - 15.0 grams",
    pelletSize: "1.2mm - 1.5mm Micro Pellets",
    proteinRequired: "38% - 40%",
    feedRatePct: "6% - 10% of Biomass",
    frequency: "4 times / day",
    description: "Active transition phase where digestive enzymes mature. Begin utilizing highly stable floating starter feeds."
  },
  {
    id: "juvenile",
    stage: "Juveniles / Advanced Fingerlings",
    ageDays: "61 - 90 Days",
    averageWeight: "15.0 - 50.0 grams",
    pelletSize: "1.8mm - 2.5mm Floating Pellets",
    proteinRequired: "32% - 35%",
    feedRatePct: "4% - 6% of Biomass",
    frequency: "3 - 4 times / day",
    description: "Peak muscle fiber recruitment. Maintain highly oxidized lipid sources and balanced protein-to-energy ratios for fat-free growth."
  },
  {
    id: "growout",
    stage: "Active Grow-Out Phase",
    ageDays: "91 - 150 Days",
    averageWeight: "50.0 - 250.0 grams",
    pelletSize: "3.0mm - 4.0mm Floating/Sinking",
    proteinRequired: "30% - 32%",
    feedRatePct: "2.5% - 4% of Biomass",
    frequency: "2 - 3 times / day",
    description: "Standard commercial growth period. Pellets must have excellent water stability (at least 20 minutes) to prevent nutrient leaching."
  },
  {
    id: "finisher",
    stage: "Finishing / Pre-Harvest",
    ageDays: "151+ Days",
    averageWeight: "250.0 - 600.0+ grams",
    pelletSize: "4.5mm - 6.0mm Large Pellets",
    proteinRequired: "28% - 30%",
    feedRatePct: "1.5% - 2.5% of Biomass",
    frequency: "2 times / day",
    description: "Optimized for market muscle retention. Avoid excessive carbohydrates in this phase to prevent oily flesh and improve shelf life."
  }
];

const NUTRITION_COMPONENTS: NutritionComponent[] = [
  {
    name: "Crude Protein",
    percentage: "28% - 48%",
    role: "The structural foundation of fish tissues. Dictates weight gain and feed conversion efficiency.",
    subComponents: [
      "Essential Amino Acids (Lysine, Methionine)",
      "Highly digestible fish meal (anchovy/herring)",
      "Premium soybean meal protein isolates"
    ],
    color: "emerald",
    icon: Layers
  },
  {
    name: "Crude Lipids & Fats",
    percentage: "5% - 12%",
    role: "Primary concentrated energy source. Spares proteins from being metabolized for energy.",
    subComponents: [
      "Highly Unsaturated Fatty Acids (HUFA)",
      "Omega-3 & Omega-6 marine fish oils",
      "Phospholipids (Lecithin) for cell membrane fluidness"
    ],
    color: "sky",
    icon: Droplet
  },
  {
    name: "Carbohydrates",
    percentage: "15% - 25%",
    role: "Supplies metabolic energy. Serves as a binder for feed pellet structural buoyancy.",
    subComponents: [
      "Extruded corn starch & wheat flour",
      "Gelatinized carbohydrates for optimal digestibility",
      "Strict control: excess triggers liver fat storage"
    ],
    color: "amber",
    icon: Zap
  },
  {
    name: "Minerals & Ash",
    percentage: "8% - 11%",
    role: "Crucial for bone density, osmotic pressure, and heavy enzyme pathways.",
    subComponents: [
      "Mono-calcium phosphate (highly bioavailable)",
      "Divalent trace elements (Iron, Zinc, Manganese)",
      "Electrolytes (Sodium, Potassium) for cellular equilibrium"
    ],
    color: "indigo",
    icon: Scale
  },
  {
    name: "Vitamins & Trace Nutrients",
    percentage: "1.5% - 3%",
    role: "Fortifies the immune barrier, disease resistance, and prevents skin/gill lesions.",
    subComponents: [
      "Stable L-ascorbyl-2-polyphosphate (Vitamin C)",
      "Alpha-tocopherol acetate (Vitamin E - antioxidant)",
      "B-Complex mix (metabolic speed & cell division)"
    ],
    color: "rose",
    icon: HeartPulse
  },
  {
    name: "Growth Boosters & Immuno-Stimulants",
    percentage: "0.5% - 1.5%",
    role: "Triggers macrophage cell response and thickens mucous slime coat layers.",
    subComponents: [
      "Yeast Beta-Glucans (brewing origin)",
      "Mannan-oligosaccharides (MOS) gut prebiotic",
      "Probiotic blends (Bacillus subtilis, Lactobacillus)"
    ],
    color: "purple",
    icon: Sparkles
  }
];

const FISH_WISE_CONFIGS: FishFeedingConfig[] = [
  {
    species: "Nile Tilapia (Surface Feeder)",
    feedType: "Floating",
    growoutProtein: "30% - 32%",
    fcrRange: "1.2 - 1.4",
    dailyRateRange: "2.0% - 3.5% body wt",
    frequency: "2 - 3 times / day",
    optimalTemp: "26°C - 31°C",
    keyStrategy: "Satiation feeding up to 80% to avoid waste. Adapts well to agricultural byproducts.",
    details: "Tilapia are aggressive surface feeders. Always use floating extruded pellets to easily monitor intake and prevent uneaten feed from sinking and spoiling biofloc/pond beds. Feed should be split across morning (9:00 AM) and mid-afternoon (3:00 PM) sessions."
  },
  {
    species: "Pangasius Catfish (Column/Bottom)",
    feedType: "Sinking / Slow-sinking",
    growoutProtein: "26% - 28%",
    fcrRange: "1.3 - 1.5",
    dailyRateRange: "1.8% - 3.0% body wt",
    frequency: "2 times / day",
    optimalTemp: "27°C - 32°C",
    keyStrategy: "Steady dispersion over a wider surface. Prone to fat build-up if overfed high-protein feeds.",
    details: "Pangasius are extremely high-density bottom and water column feeders. Sinking or slow-sinking pellets are preferred to match their native bottom scavenging instincts. Avoid overfeeding as they have an incredibly fast digestion cycle, but high conversion variance."
  },
  {
    species: "Rohu / Catla (Indian Major Carps)",
    feedType: "Sinking / Slow-sinking",
    growoutProtein: "28% - 32%",
    fcrRange: "1.5 - 1.8",
    dailyRateRange: "2.0% - 3.0% body wt",
    frequency: "2 - 3 times / day",
    optimalTemp: "24°C - 30°C",
    keyStrategy: "Maintain stable plankton blooms to supplement commercial feeds with natural micro-fauna.",
    details: "Rohu and Catla are polyculture staples. Catla feeds mostly at the surface (can accept floating), while Rohu is a column feeder. Ensure sinking crumbles are placed on designated underwater feeding trays or broadcast uniformly to minimize sediment waste."
  },
  {
    species: "Asian Seabass (Barramundi - Carnivorous)",
    feedType: "High-Energy Floating",
    growoutProtein: "42% - 45%",
    fcrRange: "1.1 - 1.3",
    dailyRateRange: "1.5% - 2.5% body wt",
    frequency: "1 - 2 times / day",
    optimalTemp: "26°C - 30°C",
    keyStrategy: "Strict sizing matching; carnivorous behavior triggers severe cannibalism if sizes vary.",
    details: "Seabass require highly specialized, marine-sourced fishmeal protein with high lipid energy (8-12%). Feed is highly expensive, so automated timer feeders are recommended to provide precise portions. Perform frequent grading of stock to keep sizes uniform."
  },
  {
    species: "Common Carp (Bottom Forager)",
    feedType: "Sinking",
    growoutProtein: "30% - 34%",
    fcrRange: "1.4 - 1.6",
    dailyRateRange: "2.0% - 3.0% body wt",
    frequency: "2 times / day",
    optimalTemp: "22°C - 28°C",
    keyStrategy: "Avoid dusty/crumbled sinking feeds; pellets must be highly compact and clay-bound.",
    details: "Common carps are bottom rooters that sift sediment. Use hard-pressed sinking pellets that do not disintegrate instantly on contact with water. High carbohydrate levels (up to 30%) are acceptable due to their highly developed intestinal amylase activity."
  }
];

export default function FeedingPage({ onBackToDashboard }: FeedingPageProps) {
  const [activeTab, setActiveTab] = useState<"stages" | "nutrition" | "species" | "calibrator">("stages");

  // Calibrator Input State
  const [species, setSpecies] = useState<string>("Tilapia");
  const [totalFish, setTotalFish] = useState<number>(5000);
  const [avgWeight, setAvgWeight] = useState<number>(120); // in grams
  const [temp, setTemp] = useState<number>(27); // in Celsius

  // Calculation Logic for interactive Feed Calibrator
  const runCalibrations = () => {
    // 1. Determine Feed Rate % based on species and average weight
    let baseRate = 3.0; // default 3%
    let pelletSize = "3.0 mm";
    let proteinPct = "32%";
    let type = "Floating";

    if (species === "Tilapia") {
      type = "Floating Extruded";
      if (avgWeight < 5) { baseRate = 12.0; pelletSize = "0.5mm Crumble"; proteinPct = "45%"; }
      else if (avgWeight < 20) { baseRate = 8.0; pelletSize = "1.2mm Nursery"; proteinPct = "40%"; }
      else if (avgWeight < 100) { baseRate = 5.0; pelletSize = "1.8mm Grower"; proteinPct = "35%"; }
      else if (avgWeight < 300) { baseRate = 3.0; pelletSize = "3.0mm Grower-1"; proteinPct = "32%"; }
      else { baseRate = 2.0; pelletSize = "4.0mm Finisher"; proteinPct = "30%"; }
    } else if (species === "Pangasius Catfish") {
      type = "Sinking / Slow-sinking";
      if (avgWeight < 5) { baseRate = 10.0; pelletSize = "0.6mm Crumble"; proteinPct = "40%"; }
      else if (avgWeight < 20) { baseRate = 6.5; pelletSize = "1.5mm Nursery"; proteinPct = "35%"; }
      else if (avgWeight < 100) { baseRate = 4.0; pelletSize = "2.0mm Micro"; proteinPct = "32%"; }
      else if (avgWeight < 300) { baseRate = 2.5; pelletSize = "3.5mm Grower"; proteinPct = "28%"; }
      else { baseRate = 1.8; pelletSize = "4.5mm Finisher"; proteinPct = "26%"; }
    } else if (species === "Asian Seabass") {
      type = "High-Energy Floating";
      if (avgWeight < 5) { baseRate = 15.0; pelletSize = "0.5mm Starter"; proteinPct = "50%"; }
      else if (avgWeight < 20) { baseRate = 10.0; pelletSize = "1.2mm Nursery"; proteinPct = "48%"; }
      else if (avgWeight < 100) { baseRate = 4.5; pelletSize = "2.2mm Grower"; proteinPct = "45%"; }
      else if (avgWeight < 300) { baseRate = 2.5; pelletSize = "3.5mm Developer"; proteinPct = "42%"; }
      else { baseRate = 1.6; pelletSize = "5.0mm Finisher"; proteinPct = "40%"; }
    } else { // Carps / Others
      type = "Sinking Compact";
      if (avgWeight < 5) { baseRate = 10.0; pelletSize = "0.5mm Crumble"; proteinPct = "42%"; }
      else if (avgWeight < 20) { baseRate = 7.0; pelletSize = "1.2mm Nursery"; proteinPct = "38%"; }
      else if (avgWeight < 100) { baseRate = 4.0; pelletSize = "2.0mm Pellet"; proteinPct = "32%"; }
      else if (avgWeight < 300) { baseRate = 2.8; pelletSize = "3.0mm Pellet"; proteinPct = "30%"; }
      else { baseRate = 1.8; pelletSize = "4.0mm Pellet"; proteinPct = "28%"; }
    }

    // 2. Adjust rate based on temperature (metabolic modifier)
    let tempFactor = 1.0;
    let tempWarning = "";
    if (temp < 18) {
      tempFactor = 0.15;
      tempWarning = "Cold water! Fish metabolism has halted. Reduce feed drastically to prevent water contamination.";
    } else if (temp < 22) {
      tempFactor = 0.55;
      tempWarning = "Suboptimal cool water. Slow digestion detected. Reduce feed to 55% of standard rate.";
    } else if (temp > 33) {
      tempFactor = 0.40;
      tempWarning = "Extreme hot water! Danger of oxygen depletion and stress. Suspend feed or reduce to 40%.";
    } else if (temp >= 26 && temp <= 31) {
      tempFactor = 1.05; // Peak metabolic speed
    }

    const finalRate = baseRate * tempFactor;
    const totalBiomassKg = (totalFish * avgWeight) / 1000;
    const dailyFeedKg = (totalBiomassKg * (finalRate / 100));
    const feedPerSession = dailyFeedKg / (avgWeight < 15 ? 4 : 2);

    return {
      totalBiomassKg: Math.round(totalBiomassKg),
      feedRatePct: parseFloat(finalRate.toFixed(2)),
      dailyFeedKg: parseFloat(dailyFeedKg.toFixed(2)),
      feedPerSession: parseFloat(feedPerSession.toFixed(2)),
      pelletSize,
      proteinPct,
      type,
      tempWarning
    };
  };

  const calcs = runCalibrations();

  return (
    <div className="bg-slate-50 min-h-screen">  
    {/* Hero Section */}
        <div className="relative bg-emerald-950 text-white p-4 sm:p-8 md:p-12  overflow-hidden shadow-2xl border border-emerald-900">
 
          <div className="relative z-10 max-w-3xl space-y-4 text-left">
            <span className="bg-yellow-400/20 text-yellow-300 font-mono text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full">
              ★ Technical Expert Factsheet
            </span>
            <h1 className="font-serif italic font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Feeding & Nutrition Management System
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Precision feeding is the thin line between profitability and financial loss. Master feed pellet sizing, progressive protein ratios, and metabolic water temperature adjustments for sustainable grow-out cycles.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-semibold text-emerald-200">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Good Growth Standard</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span>Immunological Safety</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
                <Activity className="w-4 h-4 text-sky-400" />
                <span>FCR Optimization</span>
              </div>
            </div>
          </div>
        </div>
        
      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        
        

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

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/60 p-1.5 rounded-2xl mb-8">
          <button
            onClick={() => setActiveTab("stages")}
            className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all ${
              activeTab === "stages"
                ? "bg-white text-emerald-950 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Age-Wise Chart</span>
          </button>
          
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all ${
              activeTab === "nutrition"
                ? "bg-white text-emerald-950 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Protein Composition</span>
          </button>

          <button
            onClick={() => setActiveTab("species")}
            className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all ${
              activeTab === "species"
                ? "bg-white text-emerald-950 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <Fish className="w-4 h-4" />
            <span>Fish-Wise Sizing</span>
          </button>

          <button
            onClick={() => setActiveTab("calibrator")}
            className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all ${
              activeTab === "calibrator"
                ? "bg-white text-emerald-950 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Live Calibrator</span>
          </button>
        </div>

        {/* Tab 1: Age-wise feeding stages */}
        {activeTab === "stages" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                <div className="space-y-1">
                  <h3 className="font-sans font-black text-slate-950 text-lg tracking-tight">
                    Progressive Sizing and Feeding Rate Protocols
                  </h3>
                  <p className="text-slate-500 text-xs">
                    As fish mature, their absolute weight increases but metabolic energy requirements per gram decline.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 shrink-0 uppercase tracking-widest">
                  ⏱ Hatchery to grow-out schedules
                </span>
              </div>

              {/* Responsive Cards/Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AGE_WISE_STAGES.map((stage, i) => (
                  <div key={stage.id} className="bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-5 border border-slate-200/70 shadow-2xs hover:shadow-sm transition-all space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-100/60 px-2 py-0.5 rounded-md">
                          Stage 0{i + 1} • {stage.ageDays}
                        </span>
                        <h4 className="font-sans font-extrabold text-slate-900 text-sm leading-tight">
                          {stage.stage}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-black text-slate-400 bg-slate-100 border border-slate-200 w-6 h-6 flex items-center justify-center rounded-full shrink-0">
                        {i + 1}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed min-h-[48px]">
                      {stage.description}
                    </p>

                    <div className="pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="block text-xs sm:text-[13px] text-slate-500 font-bold uppercase tracking-wide">Avg Fish Wt</span>
                        <span className="font-extrabold text-slate-900 text-base sm:text-lg">{stage.averageWeight}</span>
                      </div>
                      <div>
                        <span className="block text-xs sm:text-[13px] text-slate-500 font-bold uppercase tracking-wide">Pellet Size</span>
                        <span className="font-extrabold text-slate-900 text-base sm:text-lg">{stage.pelletSize}</span>
                      </div>
                      <div className="pt-1">
                        <span className="block text-xs sm:text-[13px] text-slate-500 font-bold uppercase tracking-wide">Protein Target</span>
                        <span className="font-extrabold text-emerald-800 text-base sm:text-lg">{stage.proteinRequired}</span>
                      </div>
                      <div className="pt-1">
                        <span className="block text-xs sm:text-[13px] text-slate-500 font-bold uppercase tracking-wide">Daily Feed Pct</span>
                        <span className="font-extrabold text-blue-700 text-base sm:text-lg">{stage.feedRatePct}</span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-150 flex items-center gap-2 text-[11px] text-slate-600">
                      <Activity className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Frequency: <strong>{stage.frequency}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crucial Feed Practices Banner */}
            <div className="bg-emerald-50 border border-emerald-100/80 rounded-3xl p-6 flex flex-col md:flex-row gap-5 items-start">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-2 text-slate-700">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Optimal Feed Transition Guideline</h4>
                <p className="text-xs leading-relaxed">
                  Never change feed pellet sizes abruptly. Mix the older pellet size with the new size (e.g., 75/25, 50/50, 25/75 ratio) over a span of <strong>4 - 6 days</strong>. This ensures the fish digestive systems adapt to the altered hardness, swelling coefficients, and sink rates of different sized pellets, preventing bloating or localized stress.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Protein Composition & Nutrient formulas */}
        {activeTab === "nutrition" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-sans font-black text-slate-950 text-lg tracking-tight">
                  Commercial Feed Nutrient Breakdown & Composition Formula
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Each pellet is a complete biochemical packet. Understanding ingredient quality is key to high growth rates and strong immunity.
                </p>
              </div>

              {/* Bento Grid layout of Nutritional Components */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {NUTRITION_COMPONENTS.map((comp, idx) => {
                  const Icon = comp.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 shadow-2xs">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100`}>
                            <Icon className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="font-mono font-black text-slate-800 text-xs sm:text-sm bg-slate-100/80 px-2.5 py-1 rounded-full">
                            {comp.percentage}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-sans font-extrabold text-slate-900 text-sm">
                            {comp.name}
                          </h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed">
                            {comp.role}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 space-y-1.5">
                        <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">Key Elements:</span>
                        <ul className="text-[10px] text-slate-600 space-y-1">
                          {comp.subComponents.map((sub, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0" />
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feed Storage Protocol */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-sans font-extrabold text-slate-900 text-sm mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Good Storage and Security Practices (Anti-Mold)</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-xs space-y-1.5">
                    <span className="font-bold text-amber-800 uppercase text-[9px] tracking-wider block">1. Zero Moisture Contact</span>
                    <p className="text-slate-600 leading-relaxed">
                      Store bags on wooden pallets elevated 15cm off the floor and away from brick walls to prevent damp condensation and toxic Aflatoxin/molds.
                    </p>
                  </div>
                  <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 text-xs space-y-1.5">
                    <span className="font-bold text-sky-800 uppercase text-[9px] tracking-wider block">2. First-In, First-Out (FIFO)</span>
                    <p className="text-slate-600 leading-relaxed">
                      Vitamin C and lipid contents degrade gradually over time. Always use older inventory first. Discard feeds older than 90 days from manufacture.
                    </p>
                  </div>
                  <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 text-xs space-y-1.5">
                    <span className="font-bold text-rose-800 uppercase text-[9px] tracking-wider block">3. Temp & Pest Guard</span>
                    <p className="text-slate-600 leading-relaxed">
                      Keep feed warehouse temperatures below 28°C. Ensure tight physical rat/rodent proofing and use standard insect screen mesh.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Fish-Wise feeding guidelines */}
        {activeTab === "species" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-sans font-black text-slate-950 text-lg tracking-tight">
                  Species-Specific Sizing & Feeding Guidelines
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Every fish group has adapted oral dimensions and feeding behaviors. Customize density-rate ratios to eliminate wastage.
                </p>
              </div>

              {/* Species Feeding cards */}
              <div className="space-y-6">
                {FISH_WISE_CONFIGS.map((config, idx) => (
                  <div key={idx} className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col lg:flex-row gap-6">
                    {/* Left block - title */}
                    <div className="lg:w-1/3 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <Fish className="w-5 h-5" />
                        </div>
                        <h4 className="font-sans font-black text-slate-900 text-base">
                          {config.species}
                        </h4>
                      </div>
                      
                      <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span className="text-slate-400 text-[10px] uppercase">Pellet Nature:</span>
                          <span className="font-bold text-slate-800">{config.feedType}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span className="text-slate-400 text-[10px] uppercase">Protein target:</span>
                          <span className="font-bold text-emerald-800">{config.growoutProtein}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-[10px] uppercase">Target FCR:</span>
                          <span className="font-bold text-blue-700">{config.fcrRange}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right block - details and strategies */}
                    <div className="lg:w-2/3 space-y-4">
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {config.details}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs">
                          <span className="block font-bold text-slate-800 text-[11px] mb-1">Key Growth Strategy:</span>
                          <span className="text-slate-500 leading-relaxed block text-[11px]">{config.keyStrategy}</span>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs font-mono grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="block text-[9px] text-slate-400 uppercase">Optimal Temp</span>
                            <span className="font-bold text-slate-800 text-[11px]">{config.optimalTemp}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-slate-400 uppercase">Daily Rate</span>
                            <span className="font-bold text-slate-800 text-[11px]">{config.dailyRateRange}</span>
                          </div>
                          <div className="col-span-2 pt-1 border-t border-slate-100">
                            <span className="block text-[9px] text-slate-400 uppercase">Frequency</span>
                            <span className="font-bold text-slate-800 text-[11px]">{config.frequency}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Live Calibrator Tool */}
        {activeTab === "calibrator" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Sliders Block */}
              <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="font-sans font-black text-slate-950 text-base flex items-center gap-2">
                    <Scale className="w-5 h-5 text-emerald-600" />
                    <span>Calibrator Controls</span>
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-1">Adjust parameters to calculate physical feeding needs.</p>
                </div>

                {/* Species Choice */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">Species Selection</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {["Tilapia", "Pangasius Catfish", "Asian Seabass", "Carps / Others"].map((spec) => (
                      <button
                        key={spec}
                        onClick={() => setSpecies(spec)}
                        className={`py-2 px-2 rounded-xl text-xs font-sans font-bold border transition-all ${
                          species === spec
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider: Total Fish Stock */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Total Fish Stock</label>
                    <span className="text-xs font-mono font-black text-emerald-700">{totalFish.toLocaleString()} fish</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="50000"
                    step="100"
                    value={totalFish}
                    onChange={(e) => setTotalFish(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                {/* Slider: Avg Fish Weight */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Average Weight</label>
                    <span className="text-xs font-mono font-black text-emerald-700">{avgWeight} grams</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="1000"
                    step="1"
                    value={avgWeight}
                    onChange={(e) => setAvgWeight(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                    <span>1g (Early Fry)</span>
                    <span>1000g (Large Harvest)</span>
                  </div>
                </div>

                {/* Slider: Water Temperature */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Water Temperature</label>
                    <span className="text-xs font-mono font-black text-emerald-700">{temp} °C</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="36"
                    step="1"
                    value={temp}
                    onChange={(e) => setTemp(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                    <span>Cold (12°C)</span>
                    <span>Hot (36°C)</span>
                  </div>
                </div>
              </div>

              {/* Output Results Block */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Main calculation summary */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-sans font-black text-slate-950 text-base">
                      Precise Feed Requirement Result
                    </h3>
                    <p className="text-slate-400 text-[11px] mt-1">Calculations matched to real-world metabolic standards.</p>
                  </div>

                  {/* Temperature alert if any */}
                  {calcs.tempWarning && (
                    <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex gap-3 text-xs items-start">
                      <Thermometer className="w-5 h-5 text-amber-700 shrink-0 animate-bounce" />
                      <div className="text-slate-700 leading-relaxed">
                        <strong className="block text-amber-800">Metabolic Guard Alert:</strong>
                        {calcs.tempWarning}
                      </div>
                    </div>
                  )}

                  {/* High level visual cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-center space-y-1">
                      <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wide">Daily Feed Weight</span>
                      <span className="font-mono font-black text-emerald-800 text-2xl sm:text-3xl">{calcs.dailyFeedKg} <span className="text-sm font-bold">Kg</span></span>
                      <span className="block text-[9px] text-slate-500 font-medium">({((calcs.dailyFeedKg * 1000) / totalFish).toFixed(2)} g / fish)</span>
                    </div>

                    <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 text-center space-y-1">
                      <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wide">Pellet Dimension</span>
                      <span className="font-mono font-black text-sky-800 text-xl sm:text-2xl">{calcs.pelletSize}</span>
                      <span className="block text-[9px] text-sky-600 font-medium font-mono">{calcs.type}</span>
                    </div>

                    <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 text-center space-y-1">
                      <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wide">Protein Target</span>
                      <span className="font-mono font-black text-purple-800 text-xl sm:text-2xl">{calcs.proteinPct}</span>
                      <span className="block text-[9px] text-slate-500 font-medium">Crude Protein</span>
                    </div>
                  </div>

                  {/* Detailed Math parameters */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 space-y-3 font-mono text-xs text-slate-600">
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span>Total Farmed Biomass:</span>
                      <strong className="text-slate-800">{calcs.totalBiomassKg.toLocaleString()} Kg</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span>Effective Feed Rate (% body weight):</span>
                      <strong className="text-slate-800">{calcs.feedRatePct}%</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span>Feed Per Session ({avgWeight < 15 ? "4 sessions" : "2 sessions"}):</span>
                      <strong className="text-slate-800">{calcs.feedPerSession} Kg</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Water Oxygen Consumption:</span>
                      <span className="text-slate-500 font-bold">~{((calcs.dailyFeedKg * 0.25)).toFixed(1)} Kg of Oxygen/day</span>
                    </div>
                  </div>
                </div>

                {/* Practical tips */}
                <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 space-y-3">
                  <h4 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-700" />
                    <span>Scientific Feeding Tips</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                    <li>Maintain strong aeration (DO above 5 ppm) while feeding. Metabolic activity increases fish respiration rates.</li>
                    <li>If water transparency drops below <strong>25 cm</strong>, reduce feed dosage by 30% to prevent organic loading crashes.</li>
                    <li>Avoid feeding during peak mid-day heat or heavy rains, when sudden water parameter spikes are likely.</li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        )}

          </div>
          <div className="hidden xl:block shrink-0 sticky top-20">
            <RightSidebarAd reloadKey="feeding-sidebar-ad" />
          </div>
        </div>

      </div>
    </div>
  );
}
