import React, { useState, useEffect } from "react";
import { CalculatorInput, CalculatorResult } from "../types";
import { Calculator, Sparkles, Scale, AlertTriangle, CheckCircle2, Waves, Thermometer, ShoppingBag, Info, Award, ChevronRight } from "lucide-react";

// AI Generated authentic aquaculture biological photos
import tilapiaImg from "../assets/images/tilapia_fish_aquaculture_1788981758389.jpg";
import rohuImg from "../assets/images/rohu_fish_aquaculture_1788981770084.jpg";
import catlaImg from "../assets/images/catla_fish_aquaculture_1788981783353.jpg";
import pangasiusImg from "../assets/images/pangasius_fish_aquaculture_1788981794331.jpg";
import mangurImg from "../assets/images/mangur_fish_aquaculture_1788981806883.jpg";
import shrimpImg from "../assets/images/shrimp_aquaculture_1788981819089.jpg";

interface CommercialSpeciesProfile {
  id: "Tilapia" | "Rohu" | "Catla" | "Pangasius" | "Mangur" | "Shrimp";
  commonName: string;
  scientificName: string;
  tagline: string;
  image: string;
  optimalTempMin: number;
  optimalTempMax: number;
  targetHarvestWeight: number; // grams
  growthRatePerDay: number; // grams/day
  baseFcr: number;
  crudeProteinReq: string;
  feedingBehavior: string;
}

const COMMERCIAL_SPECIES_DATA: CommercialSpeciesProfile[] = [
  {
    id: "Tilapia",
    commonName: "Nile / GIFT Tilapia",
    scientificName: "Oreochromis niloticus",
    tagline: "High density Biofloc & RAS favorite",
    image: tilapiaImg,
    optimalTempMin: 26,
    optimalTempMax: 32,
    targetHarvestWeight: 500,
    growthRatePerDay: 3.5,
    baseFcr: 1.25,
    crudeProteinReq: "28% – 32%",
    feedingBehavior: "Surface & Column grazer, rapid pellet acceptance"
  },
  {
    id: "Rohu",
    commonName: "Rohu (Indian Major Carp)",
    scientificName: "Labeo rohita",
    tagline: "Premium market demand across India",
    image: rohuImg,
    optimalTempMin: 24,
    optimalTempMax: 31,
    targetHarvestWeight: 1000,
    growthRatePerDay: 4.2,
    baseFcr: 1.45,
    crudeProteinReq: "26% – 30%",
    feedingBehavior: "Column feeder, prefers slow-sinking or floating pellets"
  },
  {
    id: "Catla",
    commonName: "Catla (Bhakur)",
    scientificName: "Gibelion catla",
    tagline: "Fastest growing Indian Major Carp",
    image: catlaImg,
    optimalTempMin: 25,
    optimalTempMax: 32,
    targetHarvestWeight: 1500,
    growthRatePerDay: 5.5,
    baseFcr: 1.5,
    crudeProteinReq: "28% – 32%",
    feedingBehavior: "Surface planktivore & floating feed consumer"
  },
  {
    id: "Pangasius",
    commonName: "Pangasius (Basa / Sutchi)",
    scientificName: "Pangasianodon hypophthalmus",
    tagline: "Super high biomass density champion",
    image: pangasiusImg,
    optimalTempMin: 27,
    optimalTempMax: 33,
    targetHarvestWeight: 1000,
    growthRatePerDay: 6.0,
    baseFcr: 1.35,
    crudeProteinReq: "28% – 32%",
    feedingBehavior: "Voracious feeder, adapts instantly to floating pellets"
  },
  {
    id: "Mangur",
    commonName: "Desi Magur / Catfish",
    scientificName: "Clarias batrachus / magur",
    tagline: "High medicinal value & top market price",
    image: mangurImg,
    optimalTempMin: 26,
    optimalTempMax: 33,
    targetHarvestWeight: 200,
    growthRatePerDay: 1.8,
    baseFcr: 1.2,
    crudeProteinReq: "34% – 40%",
    feedingBehavior: "Nocturnal / crepuscular benthic carnivorous feeder"
  },
  {
    id: "Shrimp",
    commonName: "Whiteleg Shrimp (Vannamei)",
    scientificName: "Litopenaeus vannamei",
    tagline: "Export grade brackish & freshwater RAS",
    image: shrimpImg,
    optimalTempMin: 27,
    optimalTempMax: 31,
    targetHarvestWeight: 25,
    growthRatePerDay: 0.35,
    baseFcr: 1.3,
    crudeProteinReq: "35% – 38%",
    feedingBehavior: "Bottom-grazing crumbling & micro-pellet feeder"
  }
];

export default function FeedCalculator() {
  const [input, setInput] = useState<CalculatorInput>({
    species: "Tilapia",
    stockingDensity: 35, // fish/m3
    pondVolume: 50, // m3
    averageWeight: 150, // grams
    waterTemp: 28, // °C
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);

  const activeSpeciesProfile = COMMERCIAL_SPECIES_DATA.find(s => s.id === input.species) || COMMERCIAL_SPECIES_DATA[0];

  const calculateBiomassAndFeed = () => {
    const config = activeSpeciesProfile;
    const totalFish = input.stockingDensity * input.pondVolume;
    const totalBiomass = (totalFish * input.averageWeight) / 1000; // in kg

    // Determine feed percentage of body weight based on individual fish size
    // Small fingerlings eat 6-10% body weight. Growouts eat 1.5 - 3%
    let feedPct = 0.02; // default 2%
    if (input.averageWeight < 10) {
      feedPct = 0.08;
    } else if (input.averageWeight < 50) {
      feedPct = 0.05;
    } else if (input.averageWeight < 150) {
      feedPct = 0.03;
    } else if (input.averageWeight < 350) {
      feedPct = 0.022;
    } else {
      feedPct = 0.016; // 1.6% for near-harvest fish
    }

    // Temperature modifier: Fish metabolic rates depend heavily on water temperature
    let tempModifier = 1.0;
    let healthStatus: "Excellent" | "Optimal" | "Warning (Water Temp)" | "Critical (Temp)" = "Optimal";

    if (input.waterTemp < config.optimalTempMin - 4 || input.waterTemp > config.optimalTempMax + 4) {
      tempModifier = 0.2; // severe stress, feed very little
      healthStatus = "Critical (Temp)";
    } else if (input.waterTemp < config.optimalTempMin || input.waterTemp > config.optimalTempMax) {
      tempModifier = 0.65; // suboptimal, slow metabolic rate
      healthStatus = "Warning (Water Temp)";
    } else if (input.waterTemp >= config.optimalTempMin + 1 && input.waterTemp <= config.optimalTempMax - 1) {
      tempModifier = 1.05; // peak feeding metabolism
      healthStatus = "Excellent";
    }

    const dailyFeedRequired = totalBiomass * feedPct * tempModifier;

    // Determine feed size/type recommendations
    let feedType = "2.0 mm Floating Pellets (Grower)";
    if (input.averageWeight < 5) {
      feedType = "Starter Crumble (40% Protein)";
    } else if (input.averageWeight < 20) {
      feedType = "1.2 mm Floating Pellets (Nursery)";
    } else if (input.averageWeight < 100) {
      feedType = "1.8 mm Floating Pellets";
    } else if (input.averageWeight < 300) {
      feedType = "3.0 mm Floating Pellets (Grower-1)";
    } else {
      feedType = "4.5 mm Floating Pellets (Grower-2 / Finisher)";
    }

    // Days remaining to harvest weight
    const remainingWeight = Math.max(0, config.targetHarvestWeight - input.averageWeight);
    const daysToHarvest = Math.ceil(remainingWeight / config.growthRatePerDay);

    setResult({
      totalFish,
      totalBiomass,
      dailyFeedRequired: parseFloat(dailyFeedRequired.toFixed(2)),
      feedType,
      estimatedHarvestWeight: config.targetHarvestWeight,
      daysToHarvest,
      healthStatus,
    });
  };

  useEffect(() => {
    calculateBiomassAndFeed();
  }, [input]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title */}
      <div className="mb-8 border-b border-emerald-50 pb-6">
        <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-emerald-950 tracking-tight flex items-center gap-2">
          <Calculator className="w-8 h-8 text-emerald-600 animate-pulse" />
          <span>Scientific Feeding & Biomass Calculator</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Adjust parameters to determine optimal daily feed ratios, pellet sizes, and days left to harvest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Species Gallery & Sliders Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Visual AI Generated Species Selector Panel */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-emerald-100/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-50 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">
                  Select Culture Species
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Bio-Profiles
              </span>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed">
              Choose your target commercial fish or shrimp species to load species-specific growth equations, optimal temperatures, and nutritional requirements:
            </p>

            {/* Species 2-Column Photo Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {COMMERCIAL_SPECIES_DATA.map((spec) => {
                const isSelected = input.species === spec.id;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setInput({ ...input, species: spec.id })}
                    className={`relative text-left p-2 rounded-2xl border transition-all duration-200 group overflow-hidden ${
                      isSelected
                        ? "bg-gradient-to-b from-emerald-50 to-emerald-100/50 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20"
                        : "bg-white border-slate-200/80 hover:border-emerald-300 hover:bg-slate-50/60"
                    }`}
                  >
                    {/* Species Thumbnail with Badge */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-2 bg-slate-100 border border-slate-200/60">
                      <img
                        src={spec.image}
                        alt={`${spec.commonName} aquaculture specimen`}
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                          isSelected ? "scale-105" : ""
                        }`}
                        loading="lazy"
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span className="absolute bottom-1 left-1 bg-slate-900/80 backdrop-blur-xs text-[9px] font-mono text-white px-1.5 py-0.5 rounded-md">
                        FCR ~{spec.baseFcr}
                      </span>
                    </div>

                    {/* Text Details */}
                    <div className="space-y-0.5">
                      <div className="flex items-baseline justify-between gap-1">
                        <span className={`font-sans font-bold text-xs leading-tight line-clamp-1 ${
                          isSelected ? "text-emerald-950" : "text-slate-800"
                        }`}>
                          {spec.commonName}
                        </span>
                      </div>
                      <span className="text-[10px] font-serif italic text-slate-400 block truncate">
                        {spec.scientificName}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-700 block font-semibold">
                        Protein: {spec.crudeProteinReq}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Species Biological Snapshot Card */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-4 rounded-2xl shadow-sm space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs border-b border-emerald-700/50 pb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-emerald-200">{activeSpeciesProfile.commonName}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 font-semibold">
                  Target: {activeSpeciesProfile.targetHarvestWeight}g
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90 leading-relaxed font-sans">
                {activeSpeciesProfile.tagline}. {activeSpeciesProfile.feedingBehavior}.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] font-mono text-emerald-300">
                <div>
                  <span className="text-emerald-400/80 block">Optimal Temp:</span>
                  <span className="font-bold text-white">{activeSpeciesProfile.optimalTempMin}°C – {activeSpeciesProfile.optimalTempMax}°C</span>
                </div>
                <div>
                  <span className="text-emerald-400/80 block">Avg Growth Rate:</span>
                  <span className="font-bold text-white">~{activeSpeciesProfile.growthRatePerDay} g/day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pond & Water Physical Controls */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-emerald-100/80 shadow-xs space-y-6">
            <h3 className="font-sans font-bold text-slate-800 text-sm sm:text-base border-b border-emerald-50 pb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>Operational Tank & Water Parameters</span>
            </h3>

            {/* Pond/Tank Volume Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-500">Pond / Tank Volume</label>
                <span className="text-sm font-mono font-bold text-emerald-700">{input.pondVolume} m³</span>
              </div>
              <input
                id="pond-volume-range"
                type="range"
                min="5"
                max="1000"
                value={input.pondVolume}
                onChange={(e) => setInput({ ...input, pondVolume: parseInt(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-sans block mt-1">
                (Approx. {(input.pondVolume * 1000).toLocaleString()} Liters of working volume)
              </span>
            </div>

            {/* Stocking Density Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-500">Stocking Density</label>
                <span className="text-sm font-mono font-bold text-emerald-700">{input.stockingDensity} {input.species === "Shrimp" ? "pcs" : "fish"}/m³</span>
              </div>
              <input
                id="stocking-density-range"
                type="range"
                min="5"
                max={input.species === "Shrimp" ? 150 : 120}
                value={input.stockingDensity}
                onChange={(e) => setInput({ ...input, stockingDensity: parseInt(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-sans block mt-1">
                (RAS: 80–120; Biofloc: 30–50; Earthen Ponds: 5–15 per m³)
              </span>
            </div>

            {/* Average Weight Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-500">Average Current Weight</label>
                <span className="text-sm font-mono font-bold text-emerald-700">{input.averageWeight} grams</span>
              </div>
              <input
                id="average-weight-range"
                type="range"
                min="2"
                max={Math.max(1200, activeSpeciesProfile.targetHarvestWeight + 200)}
                value={input.averageWeight}
                onChange={(e) => setInput({ ...input, averageWeight: parseInt(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-sans block mt-1">
                Sample weekly weight across 20-30 specimens for accuracy
              </span>
            </div>

            {/* Water Temperature Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-500">Water Temperature</label>
                <span className="text-sm font-mono font-bold text-emerald-700">{input.waterTemp} °C</span>
              </div>
              <input
                id="water-temp-range"
                type="range"
                min="10"
                max="38"
                value={input.waterTemp}
                onChange={(e) => setInput({ ...input, waterTemp: parseInt(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>Cold (10°C)</span>
                <span className="text-emerald-700 font-bold">Optimal ({activeSpeciesProfile.optimalTempMin}–{activeSpeciesProfile.optimalTempMax}°C)</span>
                <span>Hot (38°C)</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Columns: Mathematical Outputs & Diagnostics */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Dashboard Panel */}
          {result && (
            <div className="bg-gradient-to-br from-white to-emerald-50/30 p-6 rounded-2xl border border-emerald-100/80 shadow-xs">
              <h2 className="font-sans font-extrabold text-emerald-950 text-lg mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 animate-spin-slow" />
                <span>Growth & Feeding Diagnostics</span>
              </h2>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                
                {/* Metric 1 */}
                <div className="bg-white p-4 rounded-xl border border-emerald-50 shadow-xs">
                  <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">Total Stock Count</span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-slate-800 block mt-1">
                    {result.totalFish.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1 block">Live Fish</span>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-4 rounded-xl border border-emerald-50 shadow-xs">
                  <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">Estimated Biomass</span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-slate-800 block mt-1">
                    {result.totalBiomass.toFixed(1)} kg
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans mt-1 block">Total standing stock</span>
                </div>

                {/* Metric 3: Daily Feed Required - CRITICAL */}
                <div className="bg-emerald-600 p-4 rounded-xl text-white shadow-md shadow-emerald-100 col-span-2 sm:col-span-1">
                  <span className="block text-[10px] font-mono uppercase text-emerald-100 tracking-wider font-semibold">Daily Feed Required</span>
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold block mt-0.5">
                    {result.dailyFeedRequired} kg
                  </span>
                  <span className="text-[10px] text-emerald-100 font-sans mt-1 block font-medium">Split in 3-4 feeds</span>
                </div>

              </div>

              {/* Status Indicator Bar */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-emerald-100/60 rounded-xl gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    result.healthStatus === "Excellent" || result.healthStatus === "Optimal"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {result.healthStatus === "Excellent" || result.healthStatus === "Optimal" ? (
                      <CheckCircle2 className="w-5 h-5 animate-pulse" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 animate-bounce" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Metabolic Safety Level</span>
                    <h4 className="font-sans font-bold text-sm text-slate-800 mt-0.5">
                      {result.healthStatus}
                    </h4>
                  </div>
                </div>

                {/* Status Advice text */}
                <p className="text-xs text-slate-500 font-sans max-w-sm">
                  {result.healthStatus === "Critical (Temp)" && "Warning: Water temperature extreme. Fish feeding dropped by 80% to avoid oxygen crash and high mortality."}
                  {result.healthStatus === "Warning (Water Temp)" && "Suboptimal temperature. Metabolic feed absorption is limited. Avoid overfeeding to prevent water toxicity."}
                  {(result.healthStatus === "Optimal" || result.healthStatus === "Excellent") && "Optimal feeding temperature. Growth performance is maximized. Keep feeding consistently."}
                </p>
              </div>

              {/* Feed specifications & Harvest projections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                
                {/* Pellet specs */}
                <div className="bg-white p-4 rounded-xl border border-emerald-50 shadow-xs flex gap-3.5">
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Recommended Feed Size</span>
                    <h4 className="font-sans font-bold text-sm text-slate-800 mt-1">{result.feedType}</h4>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">Adjust to avoid size-mismatch waste</p>
                  </div>
                </div>

                {/* Harvest timer */}
                <div className="bg-white p-4 rounded-xl border border-emerald-50 shadow-xs flex gap-3.5">
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                    <Waves className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Days to Harvest</span>
                    <h4 className="font-sans font-bold text-sm text-slate-800 mt-1">
                      {result.daysToHarvest > 0 ? `${result.daysToHarvest} days` : "Harvest Ready!"}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                      Target harvest weight: {result.estimatedHarvestWeight}g
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Educational Best Practices for engagement */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-100/60 shadow-xs">
            <h3 className="font-sans font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-emerald-600" />
              <span>Scientific Feeding Rules to Remember</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-slate-600">
              <div className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-50/50">
                <span className="font-bold text-emerald-950 block mb-1">1. The Secchi Disk Rule</span>
                Measure water turbidity. If visibility is less than 25cm, your algae bloom is heavy—reduce artificial feeding to prevent overnight oxygen crashes.
              </div>
              <div className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-50/50">
                <span className="font-bold text-emerald-950 block mb-1">2. Split Feedings</span>
                Never dump the daily feed allocation all at once. Split it into 3-4 separate hand-feedings. This minimizes wastage and ensures even sizing.
              </div>
              <div className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-50/50">
                <span className="font-bold text-emerald-950 block mb-1">3. Temp & Metabolic Intake</span>
                Fish are poikilotherms (cold-blooded). At temperatures below 20°C (for tropical fish like Tilapia), they physically cannot digest feed quickly.
              </div>
              <div className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-50/50">
                <span className="font-bold text-emerald-950 block mb-1">4. Survival Rates</span>
                The math assumes 100% survival. In real aquaculture conditions, calculate with a 10-15% fingerling mortality loss factor depending on biosecurity.
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
