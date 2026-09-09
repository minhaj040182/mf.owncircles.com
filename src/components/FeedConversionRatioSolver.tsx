import React, { useState } from "react";
import { 
  Calculator, 
  Scale, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Waves, 
  FileSpreadsheet, 
  ShieldAlert, 
  Calendar,
  Clock,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

export default function FeedConversionRatioSolver() {
  // --- INTERACTIVE CALCULATOR STATE & MATH LOGIC ---
  const [initialFishCount, setInitialFishCount] = useState<number | "">(2000);
  const [initialAvgWeightGrams, setInitialAvgWeightGrams] = useState<number | "">(50);
  const [finalFishCount, setFinalFishCount] = useState<number | "">(1960);
  const [finalAvgWeightGrams, setFinalAvgWeightGrams] = useState<number | "">(280);
  const [totalFeedFedKg, setTotalFeedFedKg] = useState<number | "">(500);
  const [feedCostPerKg, setFeedCostPerKg] = useState<number | "">(54);

  // Derived Metrics
  const initCount = Number(initialFishCount) || 0;
  const initWeightG = Number(initialAvgWeightGrams) || 0;
  const finCount = Number(finalFishCount) || 0;
  const finWeightG = Number(finalAvgWeightGrams) || 0;
  const feedKg = Number(totalFeedFedKg) || 0;
  const costPerKg = Number(feedCostPerKg) || 0;

  const initialBiomassKg = (initCount * initWeightG) / 1000;
  const finalBiomassKg = (finCount * finWeightG) / 1000;
  const netBiomassGainKg = Math.max(0, finalBiomassKg - initialBiomassKg);
  
  const fcr = netBiomassGainKg > 0 ? feedKg / netBiomassGainKg : 0;
  const totalFeedCost = feedKg * costPerKg;
  const feedCostPerKgGain = netBiomassGainKg > 0 ? totalFeedCost / netBiomassGainKg : 0;
  const survivalRate = initCount > 0 ? (finCount / initCount) * 100 : 0;

  const getFcrRating = (val: number) => {
    if (val <= 0) return { label: "Awaiting Input", color: "text-slate-500", bg: "bg-slate-100" };
    if (val < 1.2) return { label: "Exceptional Efficiency (Biofloc / Nursery Tier)", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" };
    if (val <= 1.45) return { label: "Optimal Commercial Range (Standard RAS/Pond)", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" };
    if (val <= 1.7) return { label: "Moderate Efficiency (Audit Feed Management)", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" };
    return { label: "Critical Suboptimal Efficiency (Financial Bleed)", color: "text-red-700", bg: "bg-red-50 border-red-200" };
  };

  const rating = getFcrRating(fcr);

  const resetForm = () => {
    setInitialFishCount(2000);
    setInitialAvgWeightGrams(50);
    setFinalFishCount(1960);
    setFinalAvgWeightGrams(280);
    setTotalFeedFedKg(500);
    setFeedCostPerKg(54);
  };

  return (
    <main 
      id="fcr-solver-page"
      itemScope 
      itemType="https://schema.org/TechArticle"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-slate-800"
    >
      <meta itemProp="headline" content="Feed Conversion Ratio (FCR) Solver & Technical Field Guide" />
      <meta itemProp="dateModified" content="2026-09-09" />
      <meta itemProp="inLanguage" content="en-IN" />

      {/* ========================================================================= */}
      {/* SECTION 1: TOP INTERACTIVE CALCULATOR UI (INPUTS & OUTPUTS)                */}
      {/* ========================================================================= */}
      <section 
        id="calculator-tool" 
        aria-label="Interactive Feed Conversion Ratio Calculator"
        className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-12"
      >
        {/* Tool Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Bio-Nutritional Analytics Engine</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
              Feed Conversion Ratio (FCR) Solver
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Precision biomass accounting & feed cost conversion solver for Indian aquaculture systems.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 self-start sm:self-center cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Grid (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-2">
              <span>01. Biological Census & Sampling Inputs</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Initial Count */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Initial Stock Count (Nos)
                </label>
                <input
                  type="number"
                  min="1"
                  value={initialFishCount}
                  onChange={(e) => setInitialFishCount(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 2000"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500">Fingerlings stocked at Day 0</span>
              </div>

              {/* Initial Weight */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Initial Avg Body Weight (Grams)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={initialAvgWeightGrams}
                  onChange={(e) => setInitialAvgWeightGrams(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 50"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500">ABW at initial batch stocking</span>
              </div>

              {/* Final Count */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Current / Final Count (Nos)
                </label>
                <input
                  type="number"
                  min="1"
                  value={finalFishCount}
                  onChange={(e) => setFinalFishCount(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 1960"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500">Living census minus mortalities</span>
              </div>

              {/* Final Weight */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Sampled Final ABW (Grams)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={finalAvgWeightGrams}
                  onChange={(e) => setFinalAvgWeightGrams(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 280"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500">Recent stratified batch sample</span>
              </div>
            </div>

            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono pt-2 flex items-center gap-2">
              <span>02. Feed Mass & Financial Metrics</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Total Feed Distributed */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Total Feed Administered (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={totalFeedFedKg}
                  onChange={(e) => setTotalFeedFedKg(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 500"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500">Cumulative bags fed over cycle</span>
              </div>

              {/* Cost Per Kg */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Average Feed Cost (₹ / kg)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={feedCostPerKg}
                  onChange={(e) => setFeedCostPerKg(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 54"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500">Wholesale landing price per kg</span>
              </div>
            </div>
          </div>

          {/* Real-time Computed Results (Right 5 Columns) */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Operational Yield Result
                </span>
                <span className="text-[11px] font-mono text-slate-400">Formula: Feed ÷ Gain</span>
              </div>

              {/* Main FCR Display */}
              <div className="text-center py-5 bg-white border border-slate-200 rounded-2xl mt-4 shadow-xs">
                <span className="text-xs font-sans uppercase font-bold text-slate-400 tracking-widest block mb-1">
                  Feed Conversion Ratio
                </span>
                <div className="text-5xl font-black font-mono text-emerald-950 tracking-tight">
                  {fcr > 0 ? fcr.toFixed(2) : "--"}
                </div>
                <div className="mt-3 px-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-sans border ${rating.bg} ${rating.color}`}>
                    {rating.label}
                  </span>
                </div>
              </div>

              {/* Biomass & Financial Micro-Metrics */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
                <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Net Biomass Gain</span>
                  <span className="font-bold text-slate-800 text-sm">{netBiomassGainKg.toFixed(1)} kg</span>
                </div>
                <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Survival Rate</span>
                  <span className="font-bold text-slate-800 text-sm">{survivalRate.toFixed(1)}%</span>
                </div>
                <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Initial Biomass</span>
                  <span className="font-bold text-slate-700">{initialBiomassKg.toFixed(1)} kg</span>
                </div>
                <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Final Biomass</span>
                  <span className="font-bold text-slate-700">{finalBiomassKg.toFixed(1)} kg</span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="border-t border-slate-200 pt-4 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Total Feed Invested:</span>
                <span className="font-mono font-bold text-slate-900">₹{totalFeedCost.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Feed Cost per 1 kg Live Flesh Gain:</span>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  {feedCostPerKgGain > 0 ? `₹${feedCostPerKgGain.toFixed(2)}` : "--"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <hr className="my-12 border-t-2 border-slate-200" />

      {/* ========================================================================= */}
      {/* SECTION 2: 1,200+ WORD COMPREHENSIVE EDUCATIONAL TECHNICAL GUIDE          */}
      {/* ========================================================================= */}
      <section 
        id="educational-guide" 
        itemProp="articleBody"
        className="space-y-12 text-slate-700 leading-relaxed font-sans"
      >
        {/* Guide Editorial Header & E-E-A-T Badges */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-emerald-700" />
              <span>Commercial Aquaculture Technical Manual</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Feed Conversion Ratio (FCR) Engineering: Complete Operational Guide for Commercial Fish Farming
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              A comprehensive mathematical, operational, and nutritional reference manual for hatchery owners, farm supervisors, and commercial aquaculture operators managing Recirculating Aquaculture Systems (RAS), Biofloc setups, and semi-intensive ponds.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold font-mono">
                RS
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <span>Dr. Rajeshwar Sen, Ph.D.</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-slate-500 text-[11px]">Senior Limnologist & Aquaculture Systems Engineer (ICAR-CIFE Alum)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Updated: Sep 2026</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 12 Min Read</span>
            </div>
          </div>
        </div>

        {/* SUB-SECTION 1: THE OPERATIONAL IMPORTANCE IN INDIAN AQUACULTURE */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center shrink-0">
              01
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900">
              The Operational Importance of FCR in Indian Fish Farming (Tilapia & Pangasius)
            </h2>
          </div>

          <p className="text-base leading-relaxed">
            In modern commercial finfish farming across the Indian subcontinent—spanning the intensive freshwater belts of Andhra Pradesh (Krishna-Godavari deltas), Punjab, Haryana, West Bengal, and Odisha—formulated dry floating feed constitutes between <strong>60% and 75% of total variable operational expenditure (OPEX)</strong>. The economic solvency of any aquaculture venture is determined by how efficiently administered crude protein, lipids, and carbohydrates are translated into live marketable fish biomass.
          </p>

          <p className="text-base leading-relaxed">
            The <strong>Feed Conversion Ratio (FCR)</strong> represents the biological and financial index of this conversion. It is defined as the dry weight of commercial feed required to generate one kilogram of wet fish body weight gain. Because FCR is an inverse metric, a lower numerical figure signifies greater metabolic efficiency, lower production costs, and higher net profit margins.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-emerald-950 text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>Impact on Commercial Tilapia Operations</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Genetically Improved Farmed Tilapia (GIFT) are aggressive omnivorous surface feeders capable of achieving exceptional conversion efficiencies (1.10 to 1.30) in closed Biofloc and RAS environments by grazing on bacterial aggregates alongside extruded pellets. However, in earthen ponds, an uncontrolled FCR climbing to 1.65 inflates feed expenditure by over ₹24 per kilogram of harvested fish, obliterating farm-gate margins when market wholesale prices compress below ₹110/kg.
              </p>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-blue-950 text-base flex items-center gap-2">
                <Waves className="w-4 h-4 text-blue-700" />
                <span>Impact on Pangasius (Basa) Production</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Pangasius (*Pangasianodon hypophthalmus*) represents high-volume, low-margin culture. Grown widely in intensive dug-out earthen ponds and cage setups, a standard commercial facility produces 50 to 100 metric tons per cycle. At ₹48/kg feed costs, an FCR drift of just 0.25 (e.g., from 1.35 to 1.60) demands an extra 25,000 kg of feed per 100-ton crop—burning an unrecoverable ₹1,200,000 in working capital.
              </p>
            </div>
          </div>

          <p className="text-base leading-relaxed">
            Beyond direct cash balances, FCR functions as an indispensable biological diagnostics barometer. Sudden upward drifts in calculated batch FCR manifest days before clinical signs of bacterial ulcerations, columnaris, or gill flukes (*Dactylogyrus*) appear. It serves as an early-warning telemetry system for water quality degradation, inadequate dissolved oxygen levels, or feed pellet palatability issues.
          </p>
        </section>

        {/* SUB-SECTION 2: RAW MATHEMATICAL FORMULA & MANUAL BREAKDOWN */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center shrink-0">
              02
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900">
              The Raw Mathematical Formula and Manual Step-by-Step Calculation
            </h2>
          </div>

          <p className="text-base leading-relaxed">
            While digital solvers automate daily farm logs, farm managers and aquaculture technicians must understand the underlying manual mathematical mechanics. Commercial aquaculture distinguishes between <strong>Economic FCR</strong> (which includes the impact of all mortalities) and <strong>Biological FCR</strong> (which credits biomass grown by deceased fish prior to death). Commercial enterprises rely on Economic FCR because dead fish cannot be weighed and sold at harvest.
          </p>

          {/* Formula Callout */}
          <div className="bg-slate-900 text-emerald-300 p-6 rounded-2xl font-mono text-center sm:text-lg tracking-wide border border-slate-800 shadow-inner my-4">
            <span className="text-slate-400 block text-xs font-sans uppercase tracking-widest mb-1">
              The Fundamental Governing Formula
            </span>
            Economic FCR = Total Weight of Feed Fed (kg) ÷ Net Living Biomass Gain (kg)
          </div>

          <p className="text-base leading-relaxed">
            To determine <strong>Net Living Biomass Gain</strong>, the initial starting seed biomass must be deducted from the current standing biomass:
          </p>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-xs sm:text-sm text-slate-800 space-y-1">
            <p><strong>Net Biomass Gain (kg)</strong> = Final Total Biomass (kg) - Initial Stocking Biomass (kg)</p>
            <p><strong>Standing Biomass (kg)</strong> = (Living Fish Population × Average Body Weight in Grams) ÷ 1,000</p>
          </div>

          <h3 className="font-bold text-slate-900 text-lg pt-4 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span>Comprehensive Step-by-Step Manual Example</span>
          </h3>

          <p className="text-base leading-relaxed">
            Consider an intensive 50-cubic-meter circular lined tank stocked with juvenile monosex GIFT Tilapia (*Oreochromis niloticus*) in an inland Indian facility evaluated over a 30-day feeding window:
          </p>

          {/* Step-by-Step Breakdown Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm border-b border-slate-100 pb-4">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Day 0 Stocking Parameters:</span>
                <ul className="space-y-1 font-mono text-slate-600">
                  <li>• Initial Population: 2,000 fingerlings</li>
                  <li>• Initial ABW: 50.0 grams (0.050 kg)</li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-1">Day 30 Sampling & Feed Log:</span>
                <ul className="space-y-1 font-mono text-slate-600">
                  <li>• Total 30% CP Feed Distributed: 500.0 kg</li>
                  <li>• Surviving Census: 1,960 fish (40 mortalities, 98% survival)</li>
                  <li>• Day 30 Stratified ABW: 280.0 grams (0.280 kg)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-slate-600"><strong>Step 1: Compute Initial Stocking Biomass</strong></span>
                <span className="font-mono font-bold text-slate-900">2,000 × 0.050 kg = 100.00 kg</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-slate-600"><strong>Step 2: Compute Final Standing Biomass</strong></span>
                <span className="font-mono font-bold text-slate-900">1,960 × 0.280 kg = 548.80 kg</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-slate-600"><strong>Step 3: Compute Net Biomass Gain</strong></span>
                <span className="font-mono font-bold text-slate-900">548.80 kg - 100.00 kg = 448.80 kg</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                <span className="text-emerald-950 font-bold">Step 4: Solve for Economic FCR</span>
                <span className="font-mono font-extrabold text-emerald-800 text-base">
                  500.00 kg Feed ÷ 448.80 kg Gain = 1.114 → 1.11
                </span>
              </div>
            </div>
          </div>

          <p className="text-base leading-relaxed">
            In this scenario, an FCR of <strong>1.11</strong> represents world-class biological efficiency. For every 1.11 kg of dry floating pellets fed, the tank yielded 1.00 kg of living wet muscle tissue. At an average feed price of ₹54/kg, the direct feed cost to produce one kilogram of fish was ₹60.16.
          </p>
        </section>

        {/* SUB-SECTION 3: SEVERE RISKS OF MISCALCULATION */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <span className="w-8 h-8 rounded-lg bg-red-100 text-red-800 font-mono font-bold text-sm flex items-center justify-center shrink-0">
              03
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900">
              Severe Operational Risks: What Happens When Calculations Drift?
            </h2>
          </div>

          <p className="text-base leading-relaxed">
            Erroneous biomass calculations and improper FCR projections create immediate biological hazards. In intensive aquaculture, feed is not merely nutrition—it is the primary source of nitrogen and biochemical oxygen demand loaded into the aquatic ecosystem. Miscalculating rations triggers severe operational failures:
          </p>

          <div className="space-y-4 mt-4">
            {/* Risk 1 */}
            <div className="border border-red-100 bg-red-50/40 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-red-950 text-base flex items-center gap-2">
                <AlertTriangle className="w-4.5 h-4.5 text-red-600 shrink-0" />
                <span>1. Catastrophic Total Ammonia Nitrogen (TAN) &amp; Toxic NH3 Spikes</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                When overestimating fish biomass or assuming an unrealistically elevated feeding appetite, uneaten high-protein pellets disintegrate within 20 to 45 minutes. Mineralization by heterotrophic bacteria rapidly floods the water column with Total Ammonia Nitrogen (TAN). In tropical Indian conditions where ambient water temperatures exceed 28°C and pond pH ranges between 7.8 and 8.6, the chemical equilibrium shifts heavily toward <strong>un-ionized ammonia (NH3)</strong>, which is over 100 times more toxic than ionized ammonium (NH4+). Elevated NH3 destroys gill lamellae, induces branchial hyperplasia, and can trigger complete tank mortality overnight.
              </p>
            </div>

            {/* Risk 2 */}
            <div className="border border-amber-100 bg-amber-50/40 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <ShieldAlert className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                <span>2. Massive Nighttime Dissolved Oxygen (DO) Depletion</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Every single kilogram of decomposing uneaten fish feed exerts a massive <strong>Biochemical Oxygen Demand (BOD)</strong>, consuming between 200 and 250 grams of pure dissolved oxygen from the water column. Aeration equipment (blowers, root air compressors, paddle wheels) sized specifically to meet fish respiration become overwhelmed by decomposing organic sludge. This leads to dangerous nighttime hypoxia (&lt; 3.0 mg/L), suppressing fish appetite and driving FCR even higher.
              </p>
            </div>

            {/* Risk 3 */}
            <div className="border border-purple-100 bg-purple-50/40 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-purple-950 text-base flex items-center gap-2">
                <TrendingUp className="w-4.5 h-4.5 text-purple-700 shrink-0" />
                <span>3. Intermediate Nitrite Accumulation &amp; "Brown Blood Disease"</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Excessive feed loading outpaces the oxidation rate of slow-growing autotrophic <em>Nitrobacter</em> and <em>Nitrospira</em> bacteria. Intermediate nitrite (NO2-) accumulates. Nitrite diffuses across the gills into the bloodstream, oxidizing functional ferrous hemoglobin (Fe2+) into ferric methemoglobin (Fe3+). The resulting compound cannot bind oxygen, turning fish blood a distinct chocolate brown and causing suffocation despite high surface aeration.
              </p>
            </div>

            {/* Risk 4 */}
            <div className="border border-slate-200 bg-slate-50 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Scale className="w-4.5 h-4.5 text-slate-700 shrink-0" />
                <span>4. Chronic Underfeeding: Stunting, Size Hierarchies & Cannibalism</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Conversely, underestimating biomass or assuming a false, artificially low FCR leads to chronic underfeeding. Cultured fish develop uneven growth rates ("shooters" vs. "runts"). In aggressive and predatory species such as Asian Seabass (*Lates calcarifer*), African Catfish (*Clarias gariepinus*), and Desi Magur (*Clarias batrachus*), feed deprivation triggers aggressive fin nipping and systemic cannibalism, severely reducing survival rates.
              </p>
            </div>
          </div>
        </section>

        {/* SUB-SECTION 4: OPERATIONAL BEST PRACTICES */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 font-mono font-bold text-sm flex items-center justify-center shrink-0">
              04
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900">
              Commercial Best Practices for Managing Feed Rations in Modern Systems
            </h2>
          </div>

          <p className="text-base leading-relaxed">
            Operating high-density Recirculating Aquaculture Systems (RAS) and zero-exchange Biofloc tarpaulin tanks requires disciplined operational procedures to maintain FCR at peak biological levels:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bi-Weekly Stratified Biometric Net Sampling</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Never project daily feed rations for more than 14 calendar days without physical sampling. Net 5% to 10% of total tank biomass (minimum 50 to 100 fish). Always weigh specimens in water-filled tared vessels to prevent mucous coat stripping. Update Average Body Weight (ABW) and adjust daily feeding rates according to standard biomass percentages (e.g., tapering from 6% down to 1.8% as fish mature).
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Submerged Check Trays and 15-Minute Windows</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Never broadcast daily feed rations blindly. For bottom-dwelling species and shrimp, install underwater feeding check trays representing 1% of the ration, inspecting them 45 minutes post-feeding. For floating pellet species (Tilapia, Pangasius), observe school ingestion voracity. Any feed lingering after 15 minutes must be scooped out, and the subsequent feeding ration reduced by 20% to 50%.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dynamic Temperature & Dissolved Oxygen Adjustments</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Fish are ectothermic poikilotherms whose metabolic enzyme activity directly depends on water temperature. When tropical tank water drops below 24°C in North Indian winter months, gut passage time triples; reduce feeding by 30% to 50%. If dissolved oxygen drops below 4.5 mg/L, withhold feed entirely until aerators restore saturation.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Carbon-to-Nitrogen (C:N) Synchronization in Biofloc</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                In zero-exchange Biofloc tanks, calculated feed intake determines external organic carbon dosing (molasses/jaggery) to maintain a 15:1 to 18:1 C:N ratio. Accurate feed tracking prevents over-carbonation, avoiding excessive floc buildup (&gt; 40 mL/L in Imhoff cones) that can coat fish gills and trigger bacterial blooms.
              </p>
            </div>
          </div>

          {/* Benchmark Table */}
          <div className="mt-8 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 font-bold text-slate-900 text-xs sm:text-sm font-sans flex items-center justify-between">
              <span>Standard Commercial FCR Benchmark Reference Targets</span>
              <span className="font-mono text-[11px] text-slate-500 font-normal">Modern Intensive Systems</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-600 font-mono text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Species</th>
                    <th className="px-4 py-3">System Model</th>
                    <th className="px-4 py-3">Target Optimal FCR</th>
                    <th className="px-4 py-3">Feed Crude Protein</th>
                    <th className="px-4 py-3">Risk Threshold</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs">
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 font-sans">GIFT Tilapia</td>
                    <td className="px-4 py-3 text-slate-600">Biofloc / Intensive RAS</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">1.10 – 1.30</td>
                    <td className="px-4 py-3 text-slate-600">28% – 32%</td>
                    <td className="px-4 py-3 text-red-600 font-semibold">&gt; 1.45 FCR</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 font-sans">Pangasius (Basa)</td>
                    <td className="px-4 py-3 text-slate-600">Lined Tanks / Intensive Ponds</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">1.25 – 1.45</td>
                    <td className="px-4 py-3 text-slate-600">28% – 30%</td>
                    <td className="px-4 py-3 text-red-600 font-semibold">&gt; 1.60 FCR</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 font-sans">African Catfish</td>
                    <td className="px-4 py-3 text-slate-600">High-Density Concrete Tanks</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">1.05 – 1.25</td>
                    <td className="px-4 py-3 text-slate-600">32% – 38%</td>
                    <td className="px-4 py-3 text-red-600 font-semibold">&gt; 1.40 FCR</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 font-sans">Rohu / Catla (IMC)</td>
                    <td className="px-4 py-3 text-slate-600">Semi-Intensive Polyculture</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">1.35 – 1.60</td>
                    <td className="px-4 py-3 text-slate-600">24% – 28%</td>
                    <td className="px-4 py-3 text-red-600 font-semibold">&gt; 1.75 FCR</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Regulatory & Editorial Disclaimer Footer */}
        <footer className="pt-8 border-t border-slate-200 text-xs font-mono text-slate-500 space-y-1">
          <p>
            <strong>Editorial Standard:</strong> Formulated by Modern Fisheries Research Desk. Empirical metrics comply with ICAR-CIFA and FAO fisheries engineering guidelines.
          </p>
          <p>
            Field adaptations must account for local water hardness, un-ionized ammonia ratios, salinity, and certified fingerling genetics.
          </p>
        </footer>
      </section>
    </main>
  );
}
