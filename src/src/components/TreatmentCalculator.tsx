import React, { useState } from "react";
import { 
  ShieldAlert, 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Calculator, 
  Scale, 
  Droplets, 
  Printer, 
  Sparkles, 
  HelpCircle,
  Timer,
  RefreshCw,
  Waves
} from "lucide-react";

interface TreatmentPreset {
  id: string;
  name: string;
  category: "Parasite & Fungal" | "Disinfection & Sterilization" | "Water Treatment & Stress" | "Emergency";
  chemicalName: string;
  isLiquid: boolean;
  defaultPpm: number;
  stockPurity: number; // % strength (e.g. 100% for pure salt/KMnO4, 37% for formalin, 3% for peroxide)
  recommendedDuration: string;
  biofilterSafe: boolean;
  description: string;
  applicationSteps: string[];
  neutralizationGuide?: string;
  warningNotice?: string;
}

const TREATMENT_PRESETS: TreatmentPreset[] = [
  {
    id: "salt_stress",
    name: "Non-Iodized Rock Salt (NaCl) - Stress & Nitrite",
    category: "Water Treatment & Stress",
    chemicalName: "Non-Iodized Rock Salt (NaCl)",
    isLiquid: false,
    defaultPpm: 1000, // 1000 ppm = 1 g/L
    stockPurity: 100,
    recommendedDuration: "Continuous in tank",
    biofilterSafe: true,
    description: "Reduces osmotic stress during transport/stocking, treats leech & mild protozoa, and prevents Nitrite toxicity.",
    applicationSteps: [
      "Dissolve calculated salt quantity in a bucket of tank water before pouring.",
      "Distribute evenly around aeration points.",
      "Maintain salt concentration for 3-5 days; removed gradually during routine water changes."
    ],
    warningNotice: "Ensure salt is 100% non-iodized raw rock salt or sea salt."
  },
  {
    id: "salt_bath",
    name: "Rock Salt (NaCl) - High Density Dip Bath",
    category: "Parasite & Fungal",
    chemicalName: "Non-Iodized Rock Salt (NaCl)",
    isLiquid: false,
    defaultPpm: 15000, // 15 g/L
    stockPurity: 100,
    recommendedDuration: "10 to 15 Minutes Bath Dip",
    biofilterSafe: false,
    description: "Short bath dip for severe external parasites (Trichodina, Gyrodactylus) and cotton wool fungal infections.",
    applicationSteps: [
      "Prepare a separate isolated bath container filled with tank water.",
      "Add calculated salt dosage and aerate vigorously.",
      "Dip infected fish for 10-15 minutes while carefully observing for loss of equilibrium.",
      "Immediately transfer fish back to clean freshwater if fish turn sideways or gasp."
    ],
    warningNotice: "Perform treatment in a separate bath tank. Do not treat main biofilter tanks at 15,000 ppm!"
  },
  {
    id: "kmno4_pond",
    name: "Potassium Permanganate (KMnO₄) - Parasite & Flush",
    category: "Disinfection & Sterilization",
    chemicalName: "Potassium Permanganate (KMnO₄)",
    isLiquid: false,
    defaultPpm: 2.5, // 2.5 mg/L
    stockPurity: 100,
    recommendedDuration: "4 to 8 Hours (Pink color retention)",
    biofilterSafe: false,
    description: "Powerful oxidizing agent for external parasites (Dactylogyrus, Costia), gill flukes, and bacterial columnaris.",
    applicationSteps: [
      "Dissolve KMnO4 crystals completely in warm water in a plastic bucket (wear gloves & eye protection).",
      "Pour solution evenly across the water surface with high aeration.",
      "Water should turn light purple/pink. If color turns brown within 1 hour, organic load consumed the chemical; a second dose of 1-2 ppm may be needed.",
      "To stop oxidation, add Vitamin C (Ascorbic acid) or Hydrogen Peroxide."
    ],
    neutralizationGuide: "Neutralize remaining purple color by adding 1-2 ppm Ascorbic Acid (Vitamin C) or Hydrogen Peroxide.",
    warningNotice: "Bypass biofilters in RAS/Biofloc! High KMnO4 kills nitrifying biofilter bacteria."
  },
  {
    id: "formalin_bath",
    name: "Formalin (37% Formaldehyde) - Parasite Treatment",
    category: "Parasite & Fungal",
    chemicalName: "Commercial Formalin Solution (37%)",
    isLiquid: true,
    defaultPpm: 25, // 25 ppm
    stockPurity: 37,
    recommendedDuration: "4 to 6 Hours Prolonged Bath",
    biofilterSafe: false,
    description: "Highly effective against external protozoa (Ich, Costia, Chilodonella, Trichodina) and gill flukes.",
    applicationSteps: [
      "Measure calculated formalin volume using a graduated cylinder.",
      "Dilute in 10 liters of tank water prior to application.",
      "Maintain continuous MAXIMUM aeration during treatment (formalin strips dissolved oxygen from water!).",
      "Perform a 30-50% water change after 6 hours."
    ],
    warningNotice: "Formalin strips ~1 mg/L DO for every 5 ppm applied! Increase aeration to 100%. Toxic if white paraformaldehyde precipitate has formed in bottle."
  },
  {
    id: "h2o2_oxygen",
    name: "Hydrogen Peroxide (H₂O₂ - 3% Commercial) - Emergency Flush",
    category: "Emergency",
    chemicalName: "Hydrogen Peroxide (H₂O₂)",
    isLiquid: true,
    defaultPpm: 15, // 15 ppm active H2O2
    stockPurity: 3, // standard pharmacy 3%
    recommendedDuration: "1 to 2 Hours",
    biofilterSafe: false,
    description: "Emergency oxygen booster during power outages and treatment for external fungal infections & gill disease.",
    applicationSteps: [
      "Dilute required H2O2 volume with 10L clean water.",
      "Slowly add near water inlets or aeration bubble plumes.",
      "Decomposes into harmless water and oxygen (H₂O + O₂)."
    ],
    warningNotice: "Do not exceed recommended ppm; high concentration can burn fish gills."
  },
  {
    id: "bleaching_powder",
    name: "Bleaching Powder / Calcium Hypochlorite - Tank Disinfection",
    category: "Disinfection & Sterilization",
    chemicalName: "Calcium Hypochlorite (30-35% Cl)",
    isLiquid: false,
    defaultPpm: 25, // 25 ppm active Chlorine
    stockPurity: 30, // 30% available chlorine
    recommendedDuration: "24 Hours pre-stocking",
    biofilterSafe: false,
    description: "Pre-stocking sterilization of empty tanks, piping, and fresh water supplies to eliminate wild pathogens.",
    applicationSteps: [
      "Mix bleaching powder in water, let sediment settle, and use clear liquid.",
      "Apply to empty or pre-stocking water. Allow to sanitize for 24-48 hours.",
      "Aerate heavily for 3 days or neutralize residual chlorine with Sodium Thiosulfate before introducing seed fish."
    ],
    neutralizationGuide: "Neutralize 1 ppm chlorine by adding 2.5 ppm Sodium Thiosulfate (Na₂S₂O₃).",
    warningNotice: "NEVER use with fish present in the water! Strictly for empty tank / pre-stocking water preparation."
  },
  {
    id: "copper_sulfate",
    name: "Copper Sulfate (CuSO₄) - Algae & Protozoa Control",
    category: "Parasite & Fungal",
    chemicalName: "Copper Sulfate Crystals (CuSO₄)",
    isLiquid: false,
    defaultPpm: 0.3, // 0.3 ppm
    stockPurity: 100,
    recommendedDuration: "24 to 48 Hours",
    biofilterSafe: false,
    description: "Treats stubborn algae blooms and external protozoan parasites in earthen ponds.",
    applicationSteps: [
      "Check Total Alkalinity FIRST. If Alkalinity < 50 mg/L, Copper Sulfate is TOXIC to fish!",
      "Dissolve crystals completely in warm water.",
      "Distribute evenly over pond surface on a sunny morning."
    ],
    warningNotice: "DANGEROUS if Total Alkalinity is under 50 ppm. Dosage = (Total Alkalinity / 100) ppm Cu."
  },
  {
    id: "lime_pond",
    name: "Agricultural Lime / Calcium Carbonate (CaCO₃) - pH & Water",
    category: "Water Treatment & Stress",
    chemicalName: "Agricultural Lime (CaCO₃)",
    isLiquid: false,
    defaultPpm: 20, // 20 g/m3
    stockPurity: 100,
    recommendedDuration: "Continuous",
    biofilterSafe: true,
    description: "Stabilizes pH, increases alkalinity buffer, and cleans cloudy water.",
    applicationSteps: [
      "Slurry lime with water in a container.",
      "Broadcast slurry over pond/tank surface in early morning."
    ]
  },
  {
    id: "custom",
    name: "Custom Chemical / Antibiotic / Medication Calculator",
    category: "Water Treatment & Stress",
    chemicalName: "Custom Specified Agent",
    isLiquid: false,
    defaultPpm: 10,
    stockPurity: 100,
    recommendedDuration: "Custom Schedule",
    biofilterSafe: true,
    description: "Calculate exact required grams or mL for any custom medication, probiotic, or mineral supplement.",
    applicationSteps: [
      "Measure calculated quantity using a precision scale or measuring cylinder.",
      "Dissolve completely in clean water and distribute evenly around aeration points.",
      "Monitor fish behavior closely for 1 hour after application."
    ]
  }
];

export default function TreatmentCalculator() {
  // Volume state
  const [volMode, setVolMode] = useState<"direct" | "round" | "rect">("direct");
  const [volumeLiters, setVolumeLiters] = useState<number>(10000); // 10,000 Liters (10 m3)
  
  // Dimensions state
  const [diameter, setDiameter] = useState<number>(4); // meters
  const [depth, setDepth] = useState<number>(1.2); // meters
  const [length, setLength] = useState<number>(6); // meters
  const [width, setWidth] = useState<number>(4); // meters

  // Selected treatment preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>("kmno4_pond");
  
  // Custom or overridden parameters
  const activePreset = TREATMENT_PRESETS.find((p) => p.id === selectedPresetId) || TREATMENT_PRESETS[0];
  const [targetPpm, setTargetPpm] = useState<number>(activePreset.defaultPpm);
  const [stockPurity, setStockPurity] = useState<number>(activePreset.stockPurity);
  const [isLiquid, setIsLiquid] = useState<boolean>(activePreset.isLiquid);
  const [unitCost, setUnitCost] = useState<number>(0); // ₹ per kg or liter

  // Water Alkalinity check for copper sulfate
  const [alkalinity, setAlkalinity] = useState<number>(120); // ppm CaCO3

  // Handle preset change
  const handlePresetSelect = (id: string) => {
    setSelectedPresetId(id);
    const p = TREATMENT_PRESETS.find((item) => item.id === id);
    if (p) {
      setTargetPpm(p.defaultPpm);
      setStockPurity(p.stockPurity);
      setIsLiquid(p.isLiquid);
    }
  };

  // Calculate volume if shape mode selected
  const calculatedVolumeLiters = (): number => {
    if (volMode === "direct") return volumeLiters;
    if (volMode === "round") {
      const radius = diameter / 2;
      const volM3 = Math.PI * radius * radius * depth;
      return Math.round(volM3 * 1000);
    }
    if (volMode === "rect") {
      const volM3 = length * width * depth;
      return Math.round(volM3 * 1000);
    }
    return volumeLiters;
  };

  const finalVolumeLiters = calculatedVolumeLiters();
  const finalVolumeM3 = finalVolumeLiters / 1000;

  // --- DOSAGE MATHEMATICS ---
  // 1 ppm = 1 mg per Liter = 1 gram per 1,000 Liters (m³)
  // Total Active Chemical required (in grams) = (Volume in Liters * Target PPM) / 1000
  const activeGramsRequired = (finalVolumeLiters * targetPpm) / 1000;

  // Commercial Product Dosage accounting for Stock Purity %
  // E.g. For 3% H2O2, to get 15 grams active H2O2, need 15 / (3/100) = 500 grams product
  const commercialGramsOrMlRequired = activeGramsRequired / (stockPurity / 100);

  // Formatting output
  const displayAmount = (): { value: string; unit: string; secondary?: string } => {
    if (isLiquid) {
      if (commercialGramsOrMlRequired >= 1000) {
        return {
          value: (commercialGramsOrMlRequired / 1000).toFixed(2),
          unit: "Liters (L)",
          secondary: `${commercialGramsOrMlRequired.toFixed(0)} mL`
        };
      }
      return {
        value: commercialGramsOrMlRequired.toFixed(1),
        unit: "Milliliters (mL)"
      };
    } else {
      if (commercialGramsOrMlRequired >= 1000) {
        return {
          value: (commercialGramsOrMlRequired / 1000).toFixed(2),
          unit: "Kilograms (kg)",
          secondary: `${commercialGramsOrMlRequired.toFixed(0)} Grams`
        };
      }
      return {
        value: commercialGramsOrMlRequired.toFixed(1),
        unit: "Grams (g)"
      };
    }
  };

  const dosageResult = displayAmount();
  const estimatedTotalCost = unitCost > 0 ? (commercialGramsOrMlRequired / 1000) * unitCost : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/80 shadow-xs space-y-8 text-left font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1877F2] border border-blue-200/60 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
            <span>Precision Aquaculture Dosage Calculator</span>
          </div>
          <h2 className="font-black text-xl sm:text-2xl lg:text-3xl text-slate-900 tracking-tight">
            Fish Health & Water Treatment Dosage Calculator
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Calculate accurate chemical & medication dosages for fish ponds, Biofloc tanks, and RAS systems. Avoid under-dosing or lethal chemical overdose with precise volume math.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Treatment Sheet</span>
        </button>
      </div>

      {/* Main Grid: Inputs vs Dosage Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Input Configuration (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: Select Treatment / Medication Preset */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-[#1877F2]" />
                <span>1. Select Chemical or Treatment Agent</span>
              </label>
              <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                {TREATMENT_PRESETS.length} Standard Protocols
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TREATMENT_PRESETS.map((preset) => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePresetSelect(preset.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                        }`}>
                          {preset.category}
                        </span>
                        {!preset.biofilterSafe && (
                          <span className={`text-[9px] font-extrabold uppercase px-1 py-0.5 rounded ${
                            isSelected ? "bg-amber-400 text-slate-950" : "bg-amber-100 text-amber-900"
                          }`}>
                            Bypass Biofilter
                          </span>
                        )}
                      </div>
                      <span className="font-black text-xs block leading-snug mt-1">
                        {preset.name}
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] font-mono font-bold opacity-90">
                      Target: {preset.defaultPpm} {preset.isLiquid ? "ppm / mL" : "ppm (mg/L)"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Tank / Pond Water Volume */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-emerald-600" />
                <span>2. Water Volume Calculation</span>
              </label>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setVolMode("direct")}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    volMode === "direct" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Direct Liters
                </button>
                <button
                  type="button"
                  onClick={() => setVolMode("round")}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    volMode === "round" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Circular Tank
                </button>
                <button
                  type="button"
                  onClick={() => setVolMode("rect")}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    volMode === "rect" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Rectangular Pond
                </button>
              </div>
            </div>

            {/* Inputs based on VolMode */}
            {volMode === "direct" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Total System Water Volume:</span>
                  <span className="font-mono font-black text-slate-900 text-sm">
                    {volumeLiters.toLocaleString()} Liters ({ (volumeLiters / 1000).toFixed(1) } m³)
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="200000"
                  step="500"
                  value={volumeLiters}
                  onChange={(e) => setVolumeLiters(Number(e.target.value))}
                  className="w-full accent-[#1877F2] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>500 L (Small Tank)</span>
                  <span>10,000 L (Biofloc)</span>
                  <span>200,000 L (Large Pond)</span>
                </div>
              </div>
            )}

            {volMode === "round" && (
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tank Diameter (m):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={diameter}
                    onChange={(e) => setDiameter(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Water Depth (m):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div className="col-span-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60 text-xs font-mono text-emerald-900 font-bold">
                  Calculated Tank Volume: {finalVolumeLiters.toLocaleString()} Liters ({finalVolumeM3.toFixed(2)} m³)
                </div>
              </div>
            )}

            {volMode === "rect" && (
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Length (m):</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Width (m):</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Water Depth (m):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div className="col-span-3 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60 text-xs font-mono text-emerald-900 font-bold">
                  Calculated Pond Volume: {finalVolumeLiters.toLocaleString()} Liters ({finalVolumeM3.toFixed(2)} m³)
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: Dosage Parameters Fine-tuning */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200/60 pb-3">
              <Scale className="w-4 h-4 text-purple-600" />
              <span>3. Target Concentration & Product Purity</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Target Concentration (PPM or mg/L):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0.01"
                    value={targetPpm}
                    onChange={(e) => setTargetPpm(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                  <span className="font-mono text-slate-500 font-bold shrink-0">PPM</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Stock Commercial Purity / Strength (%):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max="100"
                    value={stockPurity}
                    onChange={(e) => setStockPurity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                  />
                  <span className="font-mono text-slate-500 font-bold shrink-0">%</span>
                </div>
              </div>

              {/* Unit price optional estimate */}
              <div className="sm:col-span-2 pt-2 border-t border-slate-200/60 flex items-center justify-between gap-4">
                <label className="font-bold text-slate-700 shrink-0">
                  Optional Product Unit Cost (₹ per Kg or Liter):
                </label>
                <input
                  type="number"
                  placeholder="e.g. ₹180"
                  value={unitCost || ""}
                  onChange={(e) => setUnitCost(Number(e.target.value))}
                  className="w-32 px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900 text-right"
                />
              </div>

              {/* Copper sulfate extra warning check */}
              {selectedPresetId === "copper_sulfate" && (
                <div className="sm:col-span-2 bg-amber-50 p-3 rounded-xl border border-amber-300 space-y-2 text-amber-950">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Total Alkalinity Safety Check for Copper Sulfate:</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs">Enter Water Alkalinity:</span>
                    <input
                      type="number"
                      value={alkalinity}
                      onChange={(e) => setAlkalinity(Number(e.target.value))}
                      className="w-28 px-2 py-1 bg-white border border-amber-300 rounded font-mono font-bold text-xs"
                    />
                  </div>
                  {alkalinity < 50 ? (
                    <p className="text-xs font-bold text-rose-700">
                      🚨 DANGER: Water Alkalinity is under 50 mg/L! Copper sulfate is highly toxic to fish in soft water. Do NOT apply CuSO₄!
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-700">
                      Safe max copper dosage = {(alkalinity / 100).toFixed(2)} ppm. Target {targetPpm} ppm is safe.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Dosage Results Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          
          {/* Main Result Card */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 block">
                  Calculated Treatment Dosage
                </span>
                <h3 className="text-lg font-extrabold font-sans text-white mt-0.5">
                  {activePreset.chemicalName}
                </h3>
              </div>
              <FlaskConical className="w-7 h-7 text-blue-400 shrink-0" />
            </div>

            {/* Dosage Big Number */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/15 text-center space-y-1">
              <span className="text-xs text-slate-300 font-sans font-bold uppercase tracking-wider block">
                Required Chemical Quantity:
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-black text-amber-300 tracking-tight">
                {dosageResult.value} <span className="text-xl font-bold text-white">{dosageResult.unit}</span>
              </div>
              {dosageResult.secondary && (
                <span className="text-xs font-mono text-slate-300 block pt-1">
                  ({dosageResult.secondary})
                </span>
              )}
            </div>

            {/* Breakdown Parameters */}
            <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
              <div className="flex justify-between text-slate-300">
                <span>System Water Volume:</span>
                <span className="font-bold text-white">{finalVolumeLiters.toLocaleString()} L ({finalVolumeM3.toFixed(1)} m³)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Target Concentration:</span>
                <span className="font-bold text-white">{targetPpm} PPM (mg/L)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Active Pure Chemical:</span>
                <span className="font-bold text-emerald-400">{activeGramsRequired.toFixed(1)} Grams</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Stock Purity:</span>
                <span className="font-bold text-white">{stockPurity}%</span>
              </div>
              {estimatedTotalCost > 0 && (
                <div className="flex justify-between text-amber-300 pt-2 border-t border-white/10 font-bold">
                  <span>Estimated Chemical Cost:</span>
                  <span>₹{estimatedTotalCost.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Biofilter Safety Badge */}
            <div className={`p-3 rounded-xl border text-xs font-sans font-bold flex items-center gap-2 ${
              activePreset.biofilterSafe 
                ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-200" 
                : "bg-amber-950/80 border-amber-500/50 text-amber-200"
            }`}>
              {activePreset.biofilterSafe ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Biofilter Safe: Can be applied directly in biofloc or RAS tank.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Biofilter Warning: Bypass nitrifying biofilters or treat in separate bath!</span>
                </>
              )}
            </div>

          </div>

          {/* Application Protocol & Neutralization */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4 text-xs font-sans text-left">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200/60 pb-2">
              <Timer className="w-4 h-4 text-[#1877F2]" />
              <span>Step-by-Step Application Protocol</span>
            </h4>

            <div className="space-y-1.5 text-slate-700">
              <p className="font-bold text-slate-900">Recommended Treatment Duration:</p>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-blue-900 font-bold">
                {activePreset.recommendedDuration}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-slate-900">Application Steps:</p>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                {activePreset.applicationSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            {activePreset.warningNotice && (
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-rose-900 font-sans text-xs space-y-1">
                <span className="font-bold block flex items-center gap-1 text-rose-950">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  Safety Precaution:
                </span>
                <p>{activePreset.warningNotice}</p>
              </div>
            )}

            {activePreset.neutralizationGuide && (
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-blue-950 font-sans text-xs space-y-1">
                <span className="font-bold block flex items-center gap-1 text-[#1877F2]">
                  <RefreshCw className="w-3.5 h-3.5 text-[#1877F2]" />
                  Chemical Neutralization:
                </span>
                <p>{activePreset.neutralizationGuide}</p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
