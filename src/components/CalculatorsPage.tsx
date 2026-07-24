import React, { useState } from "react";
import FeedCalculator from "./FeedCalculator";
import WaterDiagnosticWizard from "./WaterDiagnosticWizard";
import TreatmentCalculator from "./TreatmentCalculator";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import { 
  Calculator, 
  Scaling, 
  Cylinder, 
  Info, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  AlertTriangle, 
  Coins, 
  Activity, 
  Sparkles, 
  TrendingUp, 
  Scale,
  HeartPulse,
  FlaskConical
} from "lucide-react";

type CalculatorTab = "treatment" | "feed" | "water" | "stocking" | "volume" | "fcr" | "carbon" | "profit";

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("treatment");

  // 1. Stocking Density Calculator state
  const [cultureVolume, setCultureVolume] = useState<number>(50); // m3
  const [species, setSpecies] = useState<"Tilapia" | "Catfish" | "Shrimp">("Tilapia");
  const [aeration, setAeration] = useState<"None" | "Paddle Wheel" | "Continuous Diffuser">("Paddle Wheel");

  // 2. Volume Calculator state
  const [tankShape, setTankShape] = useState<"Round" | "Rectangular">("Round");
  const [diameter, setDiameter] = useState<number>(4); // meters
  const [depth, setDepth] = useState<number>(1.2); // meters
  const [length, setLength] = useState<number>(6); // meters
  const [width, setWidth] = useState<number>(4); // meters

  // 3. FCR Calculator state
  const [fcrFeed, setFcrFeed] = useState<number>(200); // kg
  const [fcrGain, setFcrGain] = useState<number>(140); // kg

  // 4. Biofloc Carbon state
  const [carbonFeed, setCarbonFeed] = useState<number>(5); // kg
  const [carbonProtein, setCarbonProtein] = useState<number>(32); // %
  const [carbonPurity, setCarbonPurity] = useState<number>(50); // % purity (molasses)

  // 5. Profit Calculator state
  const [profitStock, setProfitStock] = useState<number>(5000);
  const [profitSurvival, setProfitSurvival] = useState<number>(85); // %
  const [profitHarvestWt, setProfitHarvestWt] = useState<number>(0.5); // kg
  const [profitSalePrice, setProfitSalePrice] = useState<number>(160); // ₹/kg
  const [profitFeedCost, setProfitFeedCost] = useState<number>(48); // ₹/kg
  const [profitFcrValue, setProfitFcrValue] = useState<number>(1.3);

  // --- MATH OPERATIONS ---

  // Stocking Math
  const maxDensityKgM3 = 
    aeration === "None" ? 10 : aeration === "Paddle Wheel" ? 35 : 80;
  const targetHarvestWeightKg = species === "Tilapia" ? 0.5 : species === "Catfish" ? 0.8 : 0.025;
  const totalSafeBiomassKg = cultureVolume * maxDensityKgM3;
  const recommendedStockingCount = Math.round(totalSafeBiomassKg / targetHarvestWeightKg);

  // Volume Math
  let calculatedVolumeM3 = 0;
  if (tankShape === "Round") {
    const radius = diameter / 2;
    calculatedVolumeM3 = Math.PI * Math.pow(radius, 2) * depth;
  } else {
    calculatedVolumeM3 = length * width * depth;
  }
  const calculatedVolumeLiters = calculatedVolumeM3 * 1000;
  const calculatedVolumeGallons = calculatedVolumeLiters * 0.264172;
  const recommendedFlowRateM3Hr = calculatedVolumeM3 * 1.5;

  // FCR Math
  const calculatedFCRValue = fcrGain > 0 ? (fcrFeed / fcrGain) : 0;
  const getFcrRating = (val: number) => {
    if (val <= 0) return { label: "N/A", color: "text-slate-500 bg-slate-50" };
    if (val <= 1.2) return { label: "Excellent Efficiency", color: "text-green-700 bg-green-50 border-green-100" };
    if (val <= 1.5) return { label: "Good/Optimal", color: "text-emerald-700 bg-emerald-50 border-emerald-100" };
    if (val <= 1.9) return { label: "Suboptimal (Waste Risk)", color: "text-amber-700 bg-amber-50 border-amber-100" };
    return { label: "Critical Inefficient Feed", color: "text-red-700 bg-red-50 border-red-100" };
  };
  const fcrRating = getFcrRating(calculatedFCRValue);

  // Carbon Math (Molasses target dosage for C:N of 15:1)
  const feedG = carbonFeed * 1000;
  const nitrogenG = feedG * (carbonProtein / 100) * 0.16;
  const carbonPurityRatio = carbonPurity / 100;
  const carbonMolassesG = Math.round(nitrogenG * (15 - 4.6) / carbonPurityRatio);

  // Profit Math
  const finalCount = profitStock * (profitSurvival / 100);
  const totalHarvestBiomassKg = finalCount * profitHarvestWt;
  const grossRev = totalHarvestBiomassKg * profitSalePrice;
  const totalFeedKg = totalHarvestBiomassKg * profitFcrValue;
  const totalFeedCost = totalFeedKg * profitFeedCost;
  const operatingOverhead = grossRev * 0.15; // 15% estimated seed and power
  const netProfit = grossRev - totalFeedCost - operatingOverhead;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-green-150/50 pb-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 text-left">
        <div>
          <h1 className="font-sans font-black text-2xl sm:text-3xl text-green-950 tracking-tight flex items-center gap-2.5">
            <Calculator className="w-8 h-8 text-emerald-600 animate-pulse" />
            <span>Modern Fisheries Calculations Lab</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Complete high-precision interactive calculators to schedule feed, evaluate water volume, dose molasses, and project net crop yield profit margins.
          </p>
        </div>

        {/* Tab selector - Scrollable on mobile */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto scrollbar-none gap-1 max-w-full shrink-0">
          <button
            onClick={() => setActiveTab("treatment")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl font-sans transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === "treatment" ? "bg-blue-600 text-white shadow-sm font-black" : "text-blue-700 bg-blue-50 hover:bg-blue-100 font-bold"
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>🧪 Treatment Dosage</span>
          </button>
          <button
            onClick={() => setActiveTab("water")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl font-sans transition-all shrink-0 flex items-center gap-1 ${
              activeTab === "water" ? "bg-rose-600 text-white shadow-sm font-black" : "text-rose-700 bg-rose-50 hover:bg-rose-100"
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Water Diagnostics</span>
          </button>
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl font-sans transition-all shrink-0 ${
              activeTab === "feed" ? "bg-white text-green-950 shadow-sm font-black" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            ⚖ Feed & Biomass
          </button>
          <button
            onClick={() => setActiveTab("stocking")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl font-sans transition-all shrink-0 ${
              activeTab === "stocking" ? "bg-white text-green-950 shadow-sm font-black" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            🐟 Stocking Density
          </button>
          <button
            onClick={() => setActiveTab("volume")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl font-sans transition-all shrink-0 ${
              activeTab === "volume" ? "bg-white text-green-950 shadow-sm font-black" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            ⛁ Tank Volume
          </button>
          <button
            onClick={() => setActiveTab("fcr")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl font-sans transition-all shrink-0 ${
              activeTab === "fcr" ? "bg-white text-green-950 shadow-sm font-black" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            📊 FCR Calibration
          </button>
          <button
            onClick={() => setActiveTab("carbon")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl font-sans transition-all shrink-0 ${
              activeTab === "carbon" ? "bg-white text-green-950 shadow-sm font-black" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            🧫 Biofloc Carbon
          </button>
          <button
            onClick={() => setActiveTab("profit")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl font-sans transition-all shrink-0 ${
              activeTab === "profit" ? "bg-white text-green-950 shadow-sm font-black" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            💰 Profit Projection
          </button>
        </div>
      </div>

      {/* Dynamic Advertisement Banner */}
      <AdBanner reloadKey="calculators-main-ad" />

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        <div className="flex-1 min-w-0 space-y-12">

      {/* RENDER ACTIVE TAB */}

      {/* TAB TREATMENT: FISH HEALTH & CHEMICAL DOSAGE CALCULATOR */}
      {activeTab === "treatment" && (
        <div className="bg-white rounded-3xl border border-blue-100 p-2 shadow-xs">
          <TreatmentCalculator />
        </div>
      )}

      {/* TAB 1: FEED & BIOMASS */}
      {activeTab === "feed" && (
        <div className="bg-white rounded-3xl border border-green-100 p-2 shadow-xs">
          <FeedCalculator />
        </div>
      )}

      {/* TAB WATER: WATER QUALITY DIAGNOSTICS */}
      {activeTab === "water" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-2 shadow-xs">
          <WaterDiagnosticWizard />
        </div>
      )}

      {/* TAB 2: STOCKING DENSITY */}
      {activeTab === "stocking" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-green-100 shadow-sm space-y-6">
            <h3 className="font-sans font-black text-slate-900 text-lg flex items-center gap-2">
              <Scaling className="w-5 h-5 text-emerald-600" />
              <span>Stocking Parameters</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Culture Tank/Pond Volume (m³)</label>
                <input
                  type="number"
                  value={cultureVolume}
                  onChange={(e) => setCultureVolume(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Culture Species</label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                >
                  <option value="Tilapia">Tilapia (Target harvest weight: 500g)</option>
                  <option value="Catfish">Catfish (Target harvest weight: 800g)</option>
                  <option value="Shrimp">Whiteleg Shrimp (Target harvest weight: 25g)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pond Aeration Equipment</label>
                <div className="grid grid-cols-1 gap-2 mt-1">
                  {(["None", "Paddle Wheel", "Continuous Diffuser"] as const).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAeration(a)}
                      className={`px-4 py-3 text-left rounded-xl border text-xs font-bold font-sans transition-all ${
                        aeration === a
                          ? "bg-green-700 border-green-700 text-white shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {a === "None" && "∅ None (Extensive Backyard Pond)"}
                      {a === "Paddle Wheel" && "⚙ Paddle Wheel Aerator (Semi-Intensive Commercial)"}
                      {a === "Continuous Diffuser" && "⚡ Continuous Micro-Diffuser Venturi (Intensive)"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block">Safe Standing Biomass Limit</span>
                <span className="text-3xl font-mono font-black text-slate-900 block mt-1">{totalSafeBiomassKg.toLocaleString()} kg</span>
                <span className="text-[10px] text-slate-500 font-sans mt-1.5 block">Estimated maximum yield weight limit for water parameters.</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Recommended Biomass Density</span>
                <span className="text-3xl font-mono font-black text-emerald-700 block mt-1">{maxDensityKgM3} kg / m³</span>
                <span className="text-[10px] text-slate-500 font-sans mt-1.5 block">Maximum density allowed before organic nitrogen spikes.</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900 to-green-950 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-4">
              <span className="text-[10px] font-mono text-green-300 uppercase tracking-widest block font-bold">Safe Fingerling Stocking Advice</span>
              <h3 className="text-3xl sm:text-4xl font-mono font-black text-emerald-400">
                {recommendedStockingCount.toLocaleString()} Fingerlings
              </h3>
              <p className="text-sm text-green-100/90 leading-relaxed font-sans">
                Based on your {cultureVolume} m³ pool with {aeration === "None" ? "no mechanical aeration" : aeration}, you can safely release up to <strong>{recommendedStockingCount.toLocaleString()} pieces</strong> of young fingerlings to reach harvest weights without risking overnight water crashes.
              </p>

              <div className="border-t border-emerald-800 pt-4 flex gap-2 text-xs font-mono text-green-300">
                <AlertTriangle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Assumes standard 12% fingerling mortality margin is included.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TANK VOLUME */}
      {activeTab === "volume" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-green-100 shadow-sm space-y-6">
            <h3 className="font-sans font-black text-slate-900 text-lg flex items-center gap-2">
              <Cylinder className="w-5 h-5 text-emerald-600" />
              <span>Tank Shape & Dimensions</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Tank Shape</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => setTankShape("Round")}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold font-sans transition-all ${
                      tankShape === "Round" ? "bg-green-700 border-green-700 text-white" : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    ◯ Round Circular
                  </button>
                  <button
                    onClick={() => setTankShape("Rectangular")}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold font-sans transition-all ${
                      tankShape === "Rectangular" ? "bg-green-700 border-green-700 text-white" : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    ▭ Rectangular
                  </button>
                </div>
              </div>

              {tankShape === "Round" ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pond Diameter (Meters)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={diameter}
                      onChange={(e) => setDiameter(Math.max(0.5, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Water Depth (Meters)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={depth}
                      onChange={(e) => setDepth(Math.max(0.2, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Length (m)</label>
                      <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(Math.max(0.5, Number(e.target.value)))}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Width (m)</label>
                      <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Math.max(0.5, Number(e.target.value)))}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Depth (m)</label>
                      <input
                        type="number"
                        value={depth}
                        onChange={(e) => setDepth(Math.max(0.2, Number(e.target.value)))}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Volume output metrics */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Total Water Volume</span>
              <h4 className="text-4xl font-mono font-black text-slate-900 mt-1">{calculatedVolumeM3.toFixed(2)} m³</h4>
              <p className="text-xs text-slate-500 mt-1 font-sans">Equivalent to <strong>{calculatedVolumeLiters.toLocaleString(undefined, {maximumFractionDigits:0})} Liters</strong> or <strong>{Math.round(calculatedVolumeGallons).toLocaleString()} US Gallons</strong>.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Ideal Pump Recycle Capacity</span>
              <h4 className="text-4xl font-mono font-black text-emerald-700 mt-1">{recommendedFlowRateM3Hr.toFixed(1)} m³ / hour</h4>
              <p className="text-xs text-slate-500 mt-1 font-sans">For adequate biological waste removal, select a water pump capable of moving {recommendedFlowRateM3Hr.toFixed(1)} cubic meters of water per hour.</p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex gap-2 text-xs text-green-950 font-sans">
              <Info className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                <strong>Pro-Tip on Freeboard:</strong> Always leave 15-20cm of freeboard (dry tank space above water surface) to prevent hyperactive fish like Tilapia from jumping out.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FCR CALIBRATION */}
      {activeTab === "fcr" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-green-100 shadow-sm space-y-6">
            <h3 className="font-sans font-black text-slate-900 text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>Feed & Gain Parameters</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Distributed Feed Weight (kg)</label>
                <input
                  type="number"
                  value={fcrFeed}
                  onChange={(e) => setFcrFeed(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Accumulated total feed thrown in this batch/period.</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Net Body Weight Gain (kg)</label>
                <input
                  type="number"
                  value={fcrGain}
                  onChange={(e) => setFcrGain(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Total estimated biomass weight gain in the same period.</span>
              </div>
            </div>
          </div>

          {/* FCR Diagnostic Display */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Feed Conversion Ratio</span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-5xl font-mono font-black text-slate-900">{calculatedFCRValue.toFixed(2)}</span>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border uppercase tracking-wider ${fcrRating.color}`}>
                  {fcrRating.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-sans">For every <strong>{calculatedFCRValue.toFixed(2)} kg</strong> of feed distributed, you harvested exactly <strong>1 kg</strong> of live fish weight.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-3 font-sans">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>How to Improve Your Feed Conversion Ratio</span>
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 leading-relaxed text-slate-600">
                <li><strong>Feed in fractions:</strong> Break daily allotment into 3 small hand-feedings so dominant fish don't waste pellets.</li>
                <li><strong>Monitor DO:</strong> If dissolved oxygen drops below 4 ppm, fish metabolism slows down, wasting feed.</li>
                <li><strong>Select quality feed:</strong> Certified 28-32% crude protein floating feed minimizes fecal sludge loading.</li>
                <li><strong>Mortality logging:</strong> Ensure you subtract dead fish counts immediately to keep the active biomass weight math precise.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BIOFLOC CARBON */}
      {activeTab === "carbon" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-green-100 shadow-sm space-y-6">
            <h3 className="font-sans font-black text-slate-900 text-lg flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              <span>Biofloc Ammonia Parameters</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Daily Feed Thrown (kg)</label>
                <input
                  type="number"
                  value={carbonFeed}
                  onChange={(e) => setCarbonFeed(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Feed Crude Protein %</label>
                <input
                  type="number"
                  value={carbonProtein}
                  onChange={(e) => setCarbonProtein(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Molasses Sugar Carbon Content %</label>
                <input
                  type="number"
                  value={carbonPurity}
                  onChange={(e) => setCarbonPurity(Math.max(10, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Liquid molasses is typically around 50% carbon purity.</span>
              </div>
            </div>
          </div>

          {/* Output Carbon */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-4">
              <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest block font-bold">Inoculated Sugar/Molasses Dose</span>
              <h3 className="text-3xl sm:text-4xl font-mono font-black text-emerald-400">
                {carbonMolassesG.toLocaleString()} grams
              </h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed font-sans">
                To balance the nitrogen produced by your daily <strong>{carbonFeed} kg</strong> feed, add exactly <strong>{carbonMolassesG.toLocaleString()} grams</strong> of molasses carbon source to establish a healthy <strong>15:1 Carbon-to-Nitrogen (C:N) ratio</strong>.
              </p>
              <div className="border-t border-emerald-700/50 pt-4 flex gap-2 text-xs font-mono text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Supports heterotrophic bacterial protein production, reducing Ammonia.</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-green-100 flex gap-2 text-xs text-slate-700 font-sans">
              <Info className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Application Rule:</p>
                <p className="mt-0.5">Dilute the molasses in 5-10L of tank water, mix thoroughly, and spray evenly across the biofloc surface. Keep continuous air blowers on maximum to ensure proper oxygenation during bacterial metabolism.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PROFIT PROJECTION */}
      {activeTab === "profit" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Controls */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-green-100 shadow-sm space-y-6">
            <h3 className="font-sans font-black text-slate-900 text-lg flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-600" />
              <span>Yield Financial Inputs</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Stock Count</label>
                <input
                  type="number"
                  value={profitStock}
                  onChange={(e) => setProfitStock(Math.max(100, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Survival Rate %</label>
                <input
                  type="number"
                  value={profitSurvival}
                  onChange={(e) => setProfitSurvival(Math.max(10, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Average Weight at Harvest (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={profitHarvestWt}
                  onChange={(e) => setProfitHarvestWt(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Market Sale Price (₹ / kg)</label>
                <input
                  type="number"
                  value={profitSalePrice}
                  onChange={(e) => setProfitSalePrice(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Feed Cost (₹ / kg)</label>
                <input
                  type="number"
                  value={profitFeedCost}
                  onChange={(e) => setProfitFeedCost(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assumed Crop FCR</label>
                <input
                  type="number"
                  step="0.1"
                  value={profitFcrValue}
                  onChange={(e) => setProfitFcrValue(Math.max(0.5, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Profit Sheet Output */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-xs text-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Grow-Out Crop Metrics</span>
              
              <div className="grid grid-cols-2 gap-4 mt-3 text-xs sm:text-sm">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 block font-mono font-bold">SURVIVED STOCK</span>
                  <span className="font-mono font-black text-slate-800 text-lg">{(profitStock * profitSurvival / 100).toLocaleString(undefined, {maximumFractionDigits:0})} pcs</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 block font-mono font-bold">TOTAL HARVEST YIELD</span>
                  <span className="font-mono font-black text-slate-800 text-lg">{totalHarvestBiomassKg.toLocaleString(undefined, {maximumFractionDigits:0})} kg</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-xs space-y-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Financial Summary Slat</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-0.5">
                  <span className="text-slate-400 text-[10px] font-bold">GROSS REVENUE</span>
                  <span className="block font-mono text-base font-black text-slate-800">₹{grossRev.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-0.5">
                  <span className="text-slate-400 text-[10px] font-bold">TOTAL FEED USED</span>
                  <span className="block font-mono text-base font-black text-slate-800">{totalFeedKg.toLocaleString(undefined, {maximumFractionDigits:0})} kg</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-0.5">
                  <span className="text-slate-400 text-[10px] font-bold">FEED PROCUREMENT COST</span>
                  <span className="block font-mono text-base font-black text-slate-800">₹{totalFeedCost.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-0.5">
                  <span className="text-slate-400 text-[10px] font-bold">OVERHEAD (SEED & POWER 15%)</span>
                  <span className="block font-mono text-base font-black text-slate-800">₹{operatingOverhead.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">Projected Crop Net Profit</span>
                <span className="font-mono text-2xl sm:text-3xl font-black text-green-700 block mt-0.5">₹{netProfit.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                <span className="text-[10px] text-slate-400 font-sans block mt-1">Calculated as: Gross Revenue - Feed Cost - 15% estimated seed stocking and mechanical pump operations.</span>
              </div>
            </div>
          </div>
        </div>
      )}

        </div>
        <div className="hidden xl:block shrink-0 sticky top-20">
          <RightSidebarAd reloadKey="calculators-sidebar-ad" />
        </div>
      </div>
    </div>
  );
}
