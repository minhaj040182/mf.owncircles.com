import React, { useState } from "react";
import { 
  HeartPulse, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Droplets, 
  Flame, 
  Thermometer, 
  ShieldAlert, 
  RotateCcw, 
  Printer, 
  PhoneCall, 
  Sparkles,
  ArrowRight
} from "lucide-react";

interface ParameterStatus {
  value: number;
  unit: string;
  status: "optimal" | "warning" | "critical";
  message: string;
  remediation?: string[];
}

export default function WaterDiagnosticWizard() {
  // Water test inputs
  const [tan, setTan] = useState<number>(0.2); // TAN mg/L
  const [ph, setPh] = useState<number>(7.6);
  const [doVal, setDoVal] = useState<number>(5.5); // DO mg/L
  const [nitrite, setNitrite] = useState<number>(0.05); // NO2 mg/L
  const [temp, setTemp] = useState<number>(28); // °C
  const [alkalinity, setAlkalinity] = useState<number>(120); // mg/L CaCO3
  const [systemType, setSystemType] = useState<"biofloc" | "ras" | "pond">("biofloc");

  // Calculate Un-ionized toxic Ammonia (NH3) percentage based on pH and Temperature
  // Approximation formula for un-ionized ammonia fraction pKa = 0.09018 + (2729.92 / (temp + 273.15))
  const pKa = 0.09018 + (2729.92 / (temp + 273.15));
  const nh3Fraction = 1 / (Math.pow(10, pKa - ph) + 1);
  const toxicNh3 = tan * nh3Fraction; // mg/L toxic NH3

  // --- Parameter Diagnostics ---

  // 1. Toxic Ammonia (NH3)
  const getNh3Status = (): ParameterStatus => {
    if (toxicNh3 <= 0.05) {
      return {
        value: toxicNh3,
        unit: "mg/L NH₃",
        status: "optimal",
        message: "Toxic un-ionized ammonia is within safe limits for fish gill health."
      };
    } else if (toxicNh3 <= 0.2) {
      return {
        value: toxicNh3,
        unit: "mg/L NH₃",
        status: "warning",
        message: "Elevated un-ionized ammonia. Fish experiencing mild gill irritation.",
        remediation: [
          "Reduce daily feed ration by 50% immediately.",
          systemType === "biofloc" 
            ? "Add 100g pre-dissolved molasses per 1,000L to boost heterotrophic bacterial uptake." 
            : "Perform a 15-20% partial water exchange with treated clean water.",
          "Keep continuous aeration at maximum output."
        ]
      };
    } else {
      return {
        value: toxicNh3,
        unit: "mg/L NH₃",
        status: "critical",
        message: "CRITICAL AMMONIA TOXICITY HAZARD! Immediate mortality risk.",
        remediation: [
          "STOP FEEDING ENTIRELY for 24-48 hours.",
          systemType === "biofloc" 
            ? "Dose organic carbon (molasses) immediately at 15:1 C:N ratio." 
            : "Flush system with immediate 30-40% water replacement.",
          "Add biofilter starter probiotics or nitrifying bacteria culture.",
          "Maintain high dissolved oxygen (> 6 ppm) to reduce ammonia stress."
        ]
      };
    }
  };

  // 2. Dissolved Oxygen (DO)
  const getDoStatus = (): ParameterStatus => {
    if (doVal >= 5.0) {
      return {
        value: doVal,
        unit: "mg/L DO",
        status: "optimal",
        message: "Dissolved oxygen is optimal for maximum feed digestion and growth."
      };
    } else if (doVal >= 3.0) {
      return {
        value: doVal,
        unit: "mg/L DO",
        status: "warning",
        message: "Suboptimal DO. Fish appetite decreases; biofloc bacteria growth slowed.",
        remediation: [
          "Turn on backup paddlewheel or aeration blower rings.",
          "Avoid heavy afternoon feedings.",
          "Check air stone diffusers for bio-clogging."
        ]
      };
    } else {
      return {
        value: doVal,
        unit: "mg/L DO",
        status: "critical",
        message: "CRITICAL OXYGEN DEPRIVATION! Fish gasping at surface (piping).",
        remediation: [
          "Turn on ALL backup air blowers and splash surface water immediately.",
          "Add emergency hydrogen peroxide (3% H₂O₂) at 5-10 ml per 1,000L under emergency supervision.",
          "Stop all feed until DO climbs above 5.0 mg/L."
        ]
      };
    }
  };

  // 3. Nitrite (NO2-)
  const getNitriteStatus = (): ParameterStatus => {
    if (nitrite <= 0.2) {
      return {
        value: nitrite,
        unit: "mg/L NO₂⁻",
        status: "optimal",
        message: "Nitrite is safely converted into non-toxic nitrate by nitrifying bacteria."
      };
    } else if (nitrite <= 1.0) {
      return {
        value: nitrite,
        unit: "mg/L NO₂⁻",
        status: "warning",
        message: "Elevated Nitrite. Risk of Brown Blood Disease (Methemoglobinemia).",
        remediation: [
          "Add non-iodized raw rock salt (NaCl) at 50-100 g per 1,000L to protect fish hemoglobin.",
          "Reduce feed input by 30-50%.",
          "Ensure biofilter MBBR media is fluidizing freely."
        ]
      };
    } else {
      return {
        value: nitrite,
        unit: "mg/L NO₂⁻",
        status: "critical",
        message: "SEVERE NITRITE POISONING! Blood cannot transport oxygen.",
        remediation: [
          "Add non-iodized salt (NaCl) immediately to maintain Chloride:Nitrite ratio above 10:1 (approx. 200g salt per 1,000L).",
          "Perform 25% water refresh.",
          "Stop feeding for 24 hours until biofilter recovers."
        ]
      };
    }
  };

  // 4. pH Level
  const getPhStatus = (): ParameterStatus => {
    if (ph >= 6.8 && ph <= 8.2) {
      return {
        value: ph,
        unit: "pH",
        status: "optimal",
        message: "Perfect pH balance for tropical fish species and beneficial bacteria."
      };
    } else if (ph < 6.8) {
      return {
        value: ph,
        unit: "pH",
        status: "warning",
        message: "Acidic water drift. Biofilter bacteria activity decreases below pH 6.5.",
        remediation: [
          "Dose agricultural lime / calcium carbonate (CaCO₃) or sodium bicarbonate at 20-30g per 1,000L.",
          "Monitor total alkalinity."
        ]
      };
    } else {
      return {
        value: ph,
        unit: "pH",
        status: "warning",
        message: "Alkaline pH drift. Significantly increases ammonia toxicity!",
        remediation: [
          "Check for intense daytime algae blooms consuming CO₂.",
          "Avoid adding lime or alkaline chemicals.",
          "Use molasses or sugarcane juice to gently lower pH via organic acids."
        ]
      };
    }
  };

  // 5. Alkalinity
  const getAlkalinityStatus = (): ParameterStatus => {
    if (alkalinity >= 100 && alkalinity <= 200) {
      return {
        value: alkalinity,
        unit: "mg/L CaCO₃",
        status: "optimal",
        message: "Strong pH buffering capacity prevents dangerous morning/evening pH crashes."
      };
    } else if (alkalinity < 100) {
      return {
        value: alkalinity,
        unit: "mg/L CaCO₃",
        status: "warning",
        message: "Low buffering capacity. Tank vulnerable to rapid acid crashes.",
        remediation: [
          "Add sodium bicarbonate (baking soda) at 30-50g per 1,000L to boost alkalinity above 120 ppm."
        ]
      };
    } else {
      return {
        value: alkalinity,
        unit: "mg/L CaCO₃",
        status: "optimal",
        message: "High buffering capacity."
      };
    }
  };

  const nh3Diag = getNh3Status();
  const doDiag = getDoStatus();
  const nitriteDiag = getNitriteStatus();
  const phDiag = getPhStatus();
  const alkDiag = getAlkalinityStatus();

  // Overall Health Index Calculation
  const allStatuses = [nh3Diag.status, doDiag.status, nitriteDiag.status, phDiag.status, alkDiag.status];
  const criticalCount = allStatuses.filter((s) => s === "critical").length;
  const warningCount = allStatuses.filter((s) => s === "warning").length;

  let overallHealthScore = 100 - (criticalCount * 35) - (warningCount * 15);
  overallHealthScore = Math.max(10, Math.min(100, overallHealthScore));

  const applyPreset = (preset: "healthy" | "ammonia" | "oxygen" | "nitrite") => {
    if (preset === "healthy") {
      setTan(0.2); setPh(7.6); setDoVal(6.2); setNitrite(0.05); setTemp(28); setAlkalinity(130);
    } else if (preset === "ammonia") {
      setTan(3.5); setPh(8.4); setDoVal(5.0); setNitrite(0.2); setTemp(29); setAlkalinity(110);
    } else if (preset === "oxygen") {
      setTan(0.5); setPh(7.2); setDoVal(2.1); setNitrite(0.1); setTemp(31); setAlkalinity(90);
    } else if (preset === "nitrite") {
      setTan(0.4); setPh(7.5); setDoVal(5.2); setNitrite(1.8); setTemp(27); setAlkalinity(80);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/80 shadow-sm space-y-8 w-full text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60 text-xs font-bold uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>Emergency Water Quality Diagnostic System</span>
          </div>
          <h2 className="font-sans font-black text-xl sm:text-2xl lg:text-3xl text-slate-900 tracking-tight">
            Water Quality Health & Remediation Wizard
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Enter your water test parameters to calculate un-ionized toxic ammonia (NH₃), assess fish health risks, and receive instant step-by-step treatment protocols.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Preset Scenarios Buttons */}
      <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 space-y-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Quick Test Scenarios (Click to Load Presets):
        </span>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => applyPreset("healthy")}
            className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl font-bold transition-all cursor-pointer"
          >
            🟢 Optimal Biofloc Tank
          </button>
          <button
            type="button"
            onClick={() => applyPreset("ammonia")}
            className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold transition-all cursor-pointer"
          >
            🟡 High Ammonia Hazard
          </button>
          <button
            type="button"
            onClick={() => applyPreset("oxygen")}
            className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl font-bold transition-all cursor-pointer"
          >
            🔴 Night DO Drop Emergency
          </button>
          <button
            type="button"
            onClick={() => applyPreset("nitrite")}
            className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl font-bold transition-all cursor-pointer"
          >
            🟣 High Nitrite Poisoning
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs vs Health Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Input Panel (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-sans font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Droplets className="w-4.5 h-4.5 text-[#1877F2]" />
              <span>Water Test Inputs</span>
            </h3>
            
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value as any)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700"
            >
              <option value="biofloc">Biofloc System</option>
              <option value="ras">RAS System</option>
              <option value="pond">Earthen Pond</option>
            </select>
          </div>

          <div className="space-y-4 text-xs font-sans">
            
            {/* TAN */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Total Ammonia Nitrogen (TAN)</label>
                <span className="font-mono font-bold text-[#1877F2]">{tan} mg/L</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="8.0"
                step="0.1"
                value={tan}
                onChange={(e) => setTan(Number(e.target.value))}
                className="w-full accent-[#1877F2] cursor-pointer"
              />
            </div>

            {/* pH */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">pH Level</label>
                <span className="font-mono font-bold text-slate-900">{ph}</span>
              </div>
              <input
                type="range"
                min="5.5"
                max="9.5"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                className="w-full accent-slate-800 cursor-pointer"
              />
            </div>

            {/* Dissolved Oxygen */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Dissolved Oxygen (DO)</label>
                <span className="font-mono font-bold text-emerald-700">{doVal} mg/L</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="9.0"
                step="0.1"
                value={doVal}
                onChange={(e) => setDoVal(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Nitrite */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Nitrite (NO₂⁻)</label>
                <span className="font-mono font-bold text-purple-700">{nitrite} mg/L</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="3.0"
                step="0.05"
                value={nitrite}
                onChange={(e) => setNitrite(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {/* Temperature */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Water Temperature (°C)</label>
                <span className="font-mono font-bold text-amber-700">{temp} °C</span>
              </div>
              <input
                type="range"
                min="18"
                max="36"
                step="1"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            {/* Alkalinity */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Alkalinity (CaCO₃)</label>
                <span className="font-mono font-bold text-teal-700">{alkalinity} mg/L</span>
              </div>
              <input
                type="range"
                min="30"
                max="250"
                step="5"
                value={alkalinity}
                onChange={(e) => setAlkalinity(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

          </div>

          {/* Key formula indicator */}
          <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200/60 text-[11px] text-blue-900 leading-relaxed space-y-1">
            <span className="font-bold block flex items-center gap-1 text-blue-950">
              <Sparkles className="w-3.5 h-3.5 text-[#1877F2]" />
              Scientific Water Math:
            </span>
            <p>
              Un-ionized Toxic Ammonia (NH₃) increases exponentially as pH and temperature rise! At pH 8.4 and 29°C, over 10% of total ammonia turns into deadly free gas.
            </p>
          </div>
        </div>

        {/* Right Panel: Health Index & Action Plan (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Health Index Meter Banner */}
          <div className={`p-5 sm:p-6 rounded-2xl border text-white transition-all shadow-md ${
            overallHealthScore >= 80 
              ? "bg-gradient-to-r from-emerald-800 to-green-950 border-emerald-700" 
              : overallHealthScore >= 50 
              ? "bg-gradient-to-r from-amber-800 to-amber-950 border-amber-700" 
              : "bg-gradient-to-r from-rose-900 to-red-950 border-rose-800"
          }`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                  Water Quality Health Index
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight mt-0.5">
                  {overallHealthScore >= 80 ? "Optimal Water Condition" : overallHealthScore >= 50 ? "Suboptimal Water Warning" : "Hazardous Emergency Water State"}
                </h3>
                <p className="text-xs text-slate-200 mt-1 max-w-md font-sans">
                  {overallHealthScore >= 80 ? "Parameters are balanced. Fish metabolism, feeding efficiency, and biofilter nitrifying bacteria are performing normally." : "Action required to prevent biofilter failure, fish stress, or appetite drop."}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-4xl sm:text-5xl font-mono font-black block">
                  {overallHealthScore}<span className="text-lg font-normal">%</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 inline-block mt-1">
                  {criticalCount > 0 ? `${criticalCount} Critical Risks` : warningCount > 0 ? `${warningCount} Warnings` : "All Safe"}
                </span>
              </div>
            </div>
          </div>

          {/* Parameter Diagnostics Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* NH3 Card */}
            <div className={`p-4 rounded-xl border text-left space-y-1.5 transition-all ${
              nh3Diag.status === "optimal" ? "bg-emerald-50/50 border-emerald-200" : nh3Diag.status === "warning" ? "bg-amber-50/50 border-amber-200" : "bg-rose-50 border-rose-300"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Toxic Ammonia (NH₃)</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  nh3Diag.status === "optimal" ? "bg-emerald-100 text-emerald-800" : nh3Diag.status === "warning" ? "bg-amber-100 text-amber-900" : "bg-rose-100 text-rose-900"
                }`}>
                  {nh3Diag.status}
                </span>
              </div>
              <span className="text-2xl font-mono font-black text-slate-900 block">
                {nh3Diag.value.toFixed(3)} <span className="text-xs font-normal text-slate-500">mg/L</span>
              </span>
              <p className="text-xs text-slate-600 font-sans leading-snug">{nh3Diag.message}</p>
            </div>

            {/* DO Card */}
            <div className={`p-4 rounded-xl border text-left space-y-1.5 transition-all ${
              doDiag.status === "optimal" ? "bg-emerald-50/50 border-emerald-200" : doDiag.status === "warning" ? "bg-amber-50/50 border-amber-200" : "bg-rose-50 border-rose-300"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Dissolved Oxygen (DO)</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  doDiag.status === "optimal" ? "bg-emerald-100 text-emerald-800" : doDiag.status === "warning" ? "bg-amber-100 text-amber-900" : "bg-rose-100 text-rose-900"
                }`}>
                  {doDiag.status}
                </span>
              </div>
              <span className="text-2xl font-mono font-black text-slate-900 block">
                {doDiag.value} <span className="text-xs font-normal text-slate-500">mg/L</span>
              </span>
              <p className="text-xs text-slate-600 font-sans leading-snug">{doDiag.message}</p>
            </div>

            {/* Nitrite Card */}
            <div className={`p-4 rounded-xl border text-left space-y-1.5 transition-all ${
              nitriteDiag.status === "optimal" ? "bg-emerald-50/50 border-emerald-200" : nitriteDiag.status === "warning" ? "bg-amber-50/50 border-amber-200" : "bg-rose-50 border-rose-300"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Nitrite (NO₂⁻)</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  nitriteDiag.status === "optimal" ? "bg-emerald-100 text-emerald-800" : nitriteDiag.status === "warning" ? "bg-amber-100 text-amber-900" : "bg-rose-100 text-rose-900"
                }`}>
                  {nitriteDiag.status}
                </span>
              </div>
              <span className="text-2xl font-mono font-black text-slate-900 block">
                {nitriteDiag.value} <span className="text-xs font-normal text-slate-500">mg/L</span>
              </span>
              <p className="text-xs text-slate-600 font-sans leading-snug">{nitriteDiag.message}</p>
            </div>

            {/* pH Card */}
            <div className={`p-4 rounded-xl border text-left space-y-1.5 transition-all ${
              phDiag.status === "optimal" ? "bg-emerald-50/50 border-emerald-200" : "bg-amber-50/50 border-amber-200"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">pH Balance</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  phDiag.status === "optimal" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
                }`}>
                  {phDiag.status}
                </span>
              </div>
              <span className="text-2xl font-mono font-black text-slate-900 block">
                {phDiag.value}
              </span>
              <p className="text-xs text-slate-600 font-sans leading-snug">{phDiag.message}</p>
            </div>

          </div>

          {/* Emergency Remediation Step-by-Step Action Plan */}
          {(nh3Diag.remediation || doDiag.remediation || nitriteDiag.remediation || phDiag.remediation) ? (
            <div className="bg-amber-50/90 border border-amber-200 p-5 rounded-2xl space-y-3 font-sans text-left">
              <h4 className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 animate-bounce" />
                <span>Recommended Action Plan & Remediation Protocol</span>
              </h4>
              
              <div className="space-y-3 text-xs text-slate-800">
                {nh3Diag.remediation && (
                  <div className="space-y-1 bg-white p-3 rounded-xl border border-amber-200/80">
                    <span className="font-bold text-amber-900 block uppercase text-[10px] tracking-wider">
                      Ammonia Management:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700">
                      {nh3Diag.remediation.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {doDiag.remediation && (
                  <div className="space-y-1 bg-white p-3 rounded-xl border border-amber-200/80">
                    <span className="font-bold text-rose-900 block uppercase text-[10px] tracking-wider">
                      Dissolved Oxygen Emergency Actions:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700">
                      {doDiag.remediation.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {nitriteDiag.remediation && (
                  <div className="space-y-1 bg-white p-3 rounded-xl border border-amber-200/80">
                    <span className="font-bold text-purple-900 block uppercase text-[10px] tracking-wider">
                      Nitrite Toxicity Neutralization:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700">
                      {nitriteDiag.remediation.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-900 font-sans">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>All parameters are safely balanced. Continue standard daily feeding schedule and weekly water testing log.</span>
            </div>
          )}

          {/* Emergency Hotline Callout */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 rounded-xl flex items-center justify-between gap-4 text-xs font-sans">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
              <span>Need Urgent Help with Water Parameters or Fish Disease?</span>
            </div>
            <a
              href="tel:+919748952342"
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-lg shrink-0 transition-colors"
            >
              +919748952342
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
