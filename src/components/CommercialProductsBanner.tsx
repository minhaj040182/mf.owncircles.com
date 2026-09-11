import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, Calculator, Layers, Waves, Droplet, Microscope,
  ChevronLeft, ChevronRight, Sparkles, CheckCircle2, 
  FileText, ArrowRight, Binary, Compass, Activity, ShieldCheck
} from "lucide-react";

export interface ResearchSlide {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accentColor: string;
  borderColor: string;
  bgGlow: string;
  icon: React.ElementType;
  specs: { label: string; detail: string }[];
  bulletPoints: string[];
  formulaHint: string;
  formulaCode: string;
}

const RESEARCH_SLIDES: ResearchSlide[] = [
  {
    id: "nutrition-hub",
    category: "Fish Nutrition & FCR",
    badge: "Open-Access Nutritional Science",
    title: "The Open-Access Research Hub for Fish Nutrition, FCR Optimization, and Protein Metrics",
    subtitle: "Ontogenetic Amino Acid Profiles • Bioenergetics • Apparent Digestibility Models",
    description: "A comprehensive scientific repository documenting the biochemical requirements of finfish across life stages. Investigates digestible protein-to-energy ratios (DP:DE), micro-extruded pellet buoyancy mechanics, and mathematical feed conversion ratio (FCR) formulas designed to minimize nitrogenous aquatic discharge.",
    gradient: "from-slate-900 via-teal-950 to-slate-950",
    accentColor: "teal",
    borderColor: "border-teal-500/30",
    bgGlow: "bg-teal-500/15",
    icon: Calculator,
    specs: [
      { label: "Crude Protein Range", detail: "28% to 45% Ontogenetic Scale" },
      { label: "Optimal Target FCR", detail: "1.10 - 1.25 Conversion Efficiency" },
      { label: "Digestible Energy", detail: "14.5 - 17.0 MJ/kg Formulation" },
      { label: "Pellet Water Stability", detail: "> 4 Hours Flotation Integrity" }
    ],
    bulletPoints: [
      "Mathematical biomass sampling equations for dynamic feed rationing",
      "Essential amino acid balance curves: Lysine (5.1%) and Methionine (2.8%) benchmarks",
      "Digestibility coefficients for alternative insect meals and single-cell proteins"
    ],
    formulaHint: "Mathematical FCR Equation: FCR = Total Dry Feed Distributed (kg) ÷ Wet Biomass Weight Gained (kg)",
    formulaCode: "FCR = Σ(Feed_Distributed_kg) / (Biomass_Harvest_kg - Biomass_Stocked_kg)"
  },
  {
    id: "ras-blueprints",
    category: "RAS Design Matrix",
    badge: "Hydraulic Engineering Schematics",
    title: "Educational Blueprint Matrix for Recirculating Aquaculture Systems Design",
    subtitle: "Mass-Balance Sizing • Moving Bed Biofilm Kinetics • Solid Partitioning Schematics",
    description: "Engineering design framework providing open mathematical formulas and schematics for closed-loop Recirculating Aquaculture Systems (RAS). Explores hydraulic residence times, micro-screen drum filtration solid-liquid separation, moving bed biofilm reactor (MBBR) ammonia oxidation rates, and germicidal UV dosage calculations.",
    gradient: "from-slate-900 via-blue-950 to-slate-950",
    accentColor: "blue",
    borderColor: "border-blue-500/30",
    bgGlow: "bg-blue-500/15",
    icon: Layers,
    specs: [
      { label: "Hydraulic Turnover", detail: "1.0 to 1.5 System Volumes / Hour" },
      { label: "Drum Filter Mesh", detail: "60 to 80 Micron Micro-screen" },
      { label: "MBBR Specific Surface", detail: "≥ 800 m²/m³ Protected Surface Area" },
      { label: "UV Radiation Dose", detail: "≥ 30,000 µW·s/cm² Disinfection Index" }
    ],
    bulletPoints: [
      "Volumetric TAN removal kinetics: 0.8 to 1.2 g TAN/m²/day for Nitrosomonas biofilms",
      "Counter-current cascade degassing equations for dissolved CO₂ stripping",
      "Total dynamic head (TDH) and pump friction loss hydraulic computations"
    ],
    formulaHint: "Flow Turnover Equation: Q (m³/h) = Tank Culture Volume (m³) × Turnover Frequency (h⁻¹)",
    formulaCode: "Q_required = V_total × 1.25 hr⁻¹ | TAN_Load = Biomass_kg × Feed_Rate% × Protein% × 0.092"
  },
  {
    id: "biofloc-dynamics",
    category: "Biofloc Equilibrium",
    badge: "Microbial Ecology Dynamics",
    title: "Heterotrophic Microbial Consortiums and C:N Equilibrium in Biofloc Systems",
    subtitle: "Nitrogen Immobilization Dynamics • Floc Volume Indexing • Zero-Water Remediation",
    description: "Academic guide explaining the microbiological conversion of toxic nitrogenous metabolites into single-cell protein aggregates. Models the carbon-to-nitrogen stoichiometric threshold (15:1) required for heterotrophic bacteria to assimilate ammonium without requiring mechanical water replacement.",
    gradient: "from-slate-900 via-emerald-950 to-slate-950",
    accentColor: "emerald",
    borderColor: "border-emerald-500/30",
    bgGlow: "bg-emerald-500/15",
    icon: Waves,
    specs: [
      { label: "Stoichiometric C:N", detail: "15:1 Carbon-to-Nitrogen Ratio" },
      { label: "Target Floc Volume", detail: "25 - 35 mL/L in Imhoff Settling Cone" },
      { label: "Dissolved O₂ Threshold", detail: "≥ 5.5 mg/L Continuous Saturation" },
      { label: "Alkalinity Reserve", detail: "120 - 180 mg/L as CaCO₃" }
    ],
    bulletPoints: [
      "Heterotrophic ammonium assimilation stoichiometry using molasses and sucrose",
      "Imhoff cone settling curves for monitoring bacterial floc density",
      "Alkalinity depletion mitigation via agricultural limestone and calcium hydroxide"
    ],
    formulaHint: "Carbon Requirement: ΔCarbon = [Feed_kg × %CP × 0.16] × Target C:N ÷ Carbon_Purity%",
    formulaCode: "ΔC_Molasses = (Feed_kg × 0.32 × 0.16 × 15) / 0.50 ≈ 1.53 kg Molasses per kg 32% Feed"
  },
  {
    id: "aeration-kinetics",
    category: "Aeration & Hydrodynamics",
    badge: "Gas Transfer Modeling",
    title: "Hydrodynamic Aeration Modeling and Dissolved Oxygen Kinetics in Aquaculture",
    subtitle: "Standard Oxygen Transfer Rate (SOTR) • Fine-Bubble Diffusers • Mass-Transfer (KLa)",
    description: "Computational guide on gas dissolution physics in high-density aquaculture tanks. Analyzes the two-film theory of gas transfer, Standard Oxygen Transfer Rate (SOTR), Standard Aeration Efficiency (SAE), and aerodynamic friction coefficients across microporous diffuser tubes and venturi injectors.",
    gradient: "from-slate-900 via-cyan-950 to-slate-950",
    accentColor: "cyan",
    borderColor: "border-cyan-500/30",
    bgGlow: "bg-cyan-500/15",
    icon: Droplet,
    specs: [
      { label: "Standard Aeration Eff.", detail: "2.0 - 3.5 kg O₂ / kWh Energy Index" },
      { label: "Microbubble Diameter", detail: "1.0 - 2.5 mm High-Transfer Size" },
      { label: "Blower Pressure Range", detail: "18 - 25 kPa Head Calibration" },
      { label: "Oxygen Saturation Target", detail: "> 85% Saturated Dissolved O₂" }
    ],
    bulletPoints: [
      "Oxygen transfer coefficient (KLa) optimization under variable salinity and temperature",
      "Roots blower dynamic displacement sizing for continuous 24/7 industrial culture",
      "Power consumption minimization algorithms using dissolved oxygen sensor feedback loops"
    ],
    formulaHint: "SOTR Formulation: SOTR = KLa20 × C*20 × V (Two-Film Gas Absorption Theory)",
    formulaCode: "SOTR = [V × (Cs - C0) / Δt] × α × β × θ^(T-20) | SAE = SOTR / Power_Input_kW"
  }
];

export default function CommercialProductsBanner() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = RESEARCH_SLIDES[activeSlideIndex];

  // Auto-play sliding banner (6-second interval for educational reading)
  useEffect(() => {
    if (isPaused) return;

    autoSlideTimerRef.current = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % RESEARCH_SLIDES.length);
    }, 6500);

    return () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + RESEARCH_SLIDES.length) % RESEARCH_SLIDES.length);
  };

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % RESEARCH_SLIDES.length);
  };

  const handleCopyFormula = (formula: string, title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formula);
      setCopiedFormula(title);
      setTimeout(() => setCopiedFormula(null), 2500);
    }
  };

  const SlideIcon = activeSlide.icon;

  return (
    <section 
      id="research-blueprint-portal"
      aria-label="Open-Access Research Hub and Educational Blueprints"
      className="w-full my-6 rounded-3xl overflow-hidden shadow-xl border border-emerald-500/30 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Container Gradient & Glow */}
      <div className={`bg-gradient-to-br ${activeSlide.gradient} text-white p-5 sm:p-8 transition-all duration-700 relative`}>
        <div className={`absolute -right-16 -bottom-16 w-80 h-80 ${activeSlide.bgGlow} rounded-full blur-3xl pointer-events-none transition-all duration-700`}></div>
        <div className="absolute left-1/3 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          {/* Top Category Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest mr-1 hidden sm:inline">
                Research Modules:
              </span>
              {RESEARCH_SLIDES.map((slide, index) => {
                const IconComp = slide.icon;
                const isActive = index === activeSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlideIndex(index)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans font-bold text-xs transition-all cursor-pointer ${
                      isActive
                        ? "bg-emerald-500 text-slate-950 shadow-md scale-105 font-extrabold"
                        : "bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10"
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{slide.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Slide Navigation Buttons & Indicators */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer active:scale-95"
                title="Previous Research Module"
                aria-label="Previous Module"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-emerald-300 px-1">
                0{activeSlideIndex + 1} / 0{RESEARCH_SLIDES.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer active:scale-95"
                title="Next Research Module"
                aria-label="Next Module"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Slide Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Research Information & Scientific Principles */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Microscope className="w-4 h-4 text-emerald-400" />
                <span>{activeSlide.badge}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  {activeSlide.title}
                </h2>
                <h3 className="font-sans font-extrabold text-sm sm:text-base text-yellow-300 mt-1">
                  {activeSlide.subtitle}
                </h3>
              </div>

              <p className="text-slate-200/95 text-xs sm:text-sm leading-relaxed">
                {activeSlide.description}
              </p>

              {/* Research Highlight Bullets */}
              <div className="space-y-1.5 pt-1">
                {activeSlide.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-emerald-100/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Formula & Scientific Hint Bar */}
              <div className="p-3 bg-slate-950/70 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-300 flex items-start gap-2">
                <Binary className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="font-bold text-yellow-300 block text-[11px] uppercase tracking-wider">Scientific Formulation Rule</span>
                  <span className="text-slate-200 text-xs">{activeSlide.formulaHint}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Bio-Engineering Parameters & Formula Snippet */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="font-mono text-xs font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4" />
                    <span>Bio-Engineering Parameter Benchmarks</span>
                  </span>
                  <Activity className="w-4 h-4 text-emerald-400 opacity-80" />
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {activeSlide.specs.map((spec, idx) => (
                    <div key={idx} className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">{spec.label}</div>
                      <div className="text-xs font-sans font-bold text-white mt-0.5">{spec.detail}</div>
                    </div>
                  ))}
                </div>

                {/* Code / Mathematical Equation Block */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Mathematical Expression / Computation Algorithm:
                  </span>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 break-all leading-relaxed">
                    {activeSlide.formulaCode}
                  </div>
                </div>

                {/* Copy Formula Button */}
                <div className="pt-1">
                  <button
                    onClick={() => handleCopyFormula(activeSlide.formulaCode, activeSlide.category)}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Binary className="w-4 h-4" />
                    <span>Copy Mathematical Formula to Clipboard</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Slide Indicators Bar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {RESEARCH_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlideIndex(index)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    index === activeSlideIndex
                      ? "w-8 bg-emerald-400"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="text-[11px] text-emerald-200/70 font-mono hidden sm:block">
              Open-Access Educational Repository • Hover to pause
            </div>
          </div>

          {copiedFormula && (
            <div className="text-center text-xs font-bold text-emerald-300 bg-emerald-500/20 py-1.5 rounded-xl border border-emerald-500/30">
              ✓ {copiedFormula} formula copied to clipboard for computational modeling!
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
