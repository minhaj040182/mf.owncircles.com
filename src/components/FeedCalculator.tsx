import React, { useState, useEffect } from "react";
import { CalculatorInput, CalculatorResult } from "../types";
import { Calculator, Sparkles, Scale, AlertTriangle, CheckCircle2, Waves, Thermometer, ShoppingBag } from "lucide-react";

export default function FeedCalculator() {
  const [input, setInput] = useState<CalculatorInput>({
    species: "Tilapia",
    stockingDensity: 30, // fish/m3
    pondVolume: 100, // m3
    averageWeight: 150, // grams
    waterTemp: 27, // °C
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);

  // Constants / coefficients for aquaculture math
  const speciesConfigs = {
    Tilapia: {
      optimalTempMin: 25,
      optimalTempMax: 31,
      targetHarvestWeight: 500, // grams
      growthRatePerDay: 3.5, // grams/day average
      baseFcr: 1.3, // Feed Conversion Ratio
    },
    Catfish: {
      optimalTempMin: 26,
      optimalTempMax: 32,
      targetHarvestWeight: 800,
      growthRatePerDay: 5.5,
      baseFcr: 1.2,
    },
    Carp: {
      optimalTempMin: 22,
      optimalTempMax: 29,
      targetHarvestWeight: 1000,
      growthRatePerDay: 4.0,
      baseFcr: 1.5,
    },
    Trout: {
      optimalTempMin: 12,
      optimalTempMax: 18,
      targetHarvestWeight: 450,
      growthRatePerDay: 2.8,
      baseFcr: 1.1,
    },
    Shrimp: {
      optimalTempMin: 26,
      optimalTempMax: 31,
      targetHarvestWeight: 25,
      growthRatePerDay: 0.3,
      baseFcr: 1.4,
    }
  };

  const calculateBiomassAndFeed = () => {
    const config = speciesConfigs[input.species];
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
      feedPct = 0.02;
    } else {
      feedPct = 0.015; // 1.5% for near-harvest fish
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sliders & Controls */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-emerald-100/70 shadow-xs space-y-6">
          <h2 className="font-sans font-bold text-slate-800 text-base border-b border-emerald-50 pb-3 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Pond Parameters</span>
          </h2>

          {/* Species Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Fish Species</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(["Tilapia", "Catfish", "Carp", "Trout", "Shrimp"] as const).map((spec) => (
                <button
                  key={spec}
                  onClick={() => setInput({ ...input, species: spec })}
                  className={`py-2 px-1 rounded-xl text-xs font-sans font-semibold border transition-all ${
                    input.species === spec
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                      : "bg-emerald-50/20 border-emerald-50 hover:bg-emerald-50 text-emerald-900"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Pond/Tank Volume Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500">Pond/Tank Volume</label>
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
              (Approx. {(input.pondVolume * 1000).toLocaleString()} Liters)
            </span>
          </div>

          {/* Stocking Density Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500">Stocking Density</label>
              <span className="text-sm font-mono font-bold text-emerald-700">{input.stockingDensity} fish/m³</span>
            </div>
            <input
              id="stocking-density-range"
              type="range"
              min="5"
              max="150"
              value={input.stockingDensity}
              onChange={(e) => setInput({ ...input, stockingDensity: parseInt(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 font-sans block mt-1">
              (RAS supports 80-120; biofloc 30-50; traditional ponds 5-15)
            </span>
          </div>

          {/* Average Weight Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500">Average Individual Weight</label>
              <span className="text-sm font-mono font-bold text-emerald-700">{input.averageWeight} grams</span>
            </div>
            <input
              id="average-weight-range"
              type="range"
              min="2"
              max="1200"
              value={input.averageWeight}
              onChange={(e) => setInput({ ...input, averageWeight: parseInt(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
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
              min="5"
              max="38"
              value={input.waterTemp}
              onChange={(e) => setInput({ ...input, waterTemp: parseInt(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>Cold (5°C)</span>
              <span>Tropical (28°C)</span>
              <span>Hot (38°C)</span>
            </div>
          </div>

        </div>

        {/* Right 2 Columns: Mathematical Outputs & Guidelines */}
        <div className="lg:col-span-2 space-y-6">
          
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
