import React from "react";
import { 
  DollarSign, Activity, Droplet, TrendingUp, Sparkles, 
  AlertTriangle, ShieldAlert, Check, HelpCircle, Info
} from "lucide-react";

export type TechType = "ras" | "biofloc" | "aquaponics" | "hydroponics" | "pond";

interface TechnologyComparisonProps {
  activeTech: TechType;
}

export default function TechnologyComparison({ activeTech }: TechnologyComparisonProps) {
  
  const techMetaData = {
    ras: {
      name: "Recirculating Aquaculture (RAS)",
      color: "border-blue-500 bg-blue-50/40 text-blue-800",
      accent: "blue",
      badge: "Pure Fish Farming"
    },
    biofloc: {
      name: "Biofloc Farming (BFT)",
      color: "border-indigo-500 bg-indigo-50/40 text-indigo-800",
      accent: "indigo",
      badge: "Microbial Floc Economy"
    },
    aquaponics: {
      name: "Aquaponics System",
      color: "border-emerald-500 bg-emerald-50/40 text-emerald-800",
      accent: "emerald",
      badge: "Symbiotic Ecosystem"
    },
    hydroponics: {
      name: "Hydroponics System",
      color: "border-teal-500 bg-teal-50/40 text-teal-800",
      accent: "teal",
      badge: "Soilless Soil Precision"
    },
    pond: {
      name: "Pond Fish Farming",
      color: "border-green-500 bg-green-50/40 text-green-800",
      accent: "green",
      badge: "Traditional Open Water"
    }
  };

  const criteria = [
    {
      label: "Initial Capital (CapEx)",
      icon: <DollarSign className="w-4 h-4 text-amber-600" />,
      desc: "Upfront cost for infrastructure, plumbing, tanks, & machinery.",
      ras: { text: "Very High", detail: "Advanced mechanical/bio filtration, heavy plumbing, oxygen systems." },
      biofloc: { text: "Medium-Low", detail: "Simple plastic/tarpaulin lined tanks & high-volume aeration blowers." },
      aquaponics: { text: "High", detail: "Dual setup combining full fish rearing plus hydroponic grow beds." },
      hydroponics: { text: "Medium", detail: "Pumps, grow channels (NFT/DWC), framing, & dedicated artificial lights." },
      pond: { text: "Low-Medium", detail: "Earthwork excavation, dyke reinforcement, water inlets, and basic paddlewheel aerators." }
    },
    {
      label: "Operating Expense (OpEx)",
      icon: <TrendingUp className="w-4 h-4 text-indigo-650" />,
      desc: "Ongoing expenses including electricity, nutrients, water, & feeds.",
      ras: { text: "High", detail: "Continuous electricity for water pressure, high-protein specialized feeds." },
      biofloc: { text: "Medium", detail: "High aeration power, cheap carbon source (molasses) offsets feed cost." },
      aquaponics: { text: "Low-Medium", detail: "Fish waste supplies plant nutrients naturally, lowering mineral salt costs." },
      hydroponics: { text: "Medium-High", detail: "Requires buying synthetic chemical mineral salts and water conditioners." },
      pond: { text: "Low", detail: "Leverages natural pond productivity, supplemental plankton, and lower-protein feeds." }
    },
    {
      label: "Water Conservation",
      icon: <Droplet className="w-4 h-4 text-blue-600" />,
      desc: "Water recycle & conservation ratio compared to standard open farming.",
      ras: { text: "Very High (95-99%)", detail: "Multi-stage filter loops recycle and retain almost all water." },
      biofloc: { text: "Extreme (99%+)", detail: "Zero-water exchange. Microbial floc self-purifies nitrogenous toxic load." },
      aquaponics: { text: "Extreme (97%+)", detail: "True closed-loop where plants continuously clean and return water." },
      hydroponics: { text: "Very High (90%+)", detail: "Continuous recirculation of mineral solution in closed reservoirs." },
      pond: { text: "Low (40-60%)", detail: "Subject to high seepage and evaporation. Requires periodic borewell or canal refills." }
    },
    {
      label: "Target Crop / Stock Yield",
      icon: <Activity className="w-4 h-4 text-emerald-600" />,
      desc: "The output productivity per cubic meter or square meter.",
      ras: { text: "Extreme Density", detail: "Supports up to 80-100 kg/m³ fish stocking density under oxygenation." },
      biofloc: { text: "High Density", detail: "Supports 30-45 kg/m³ stocking density. Floc supplies continuous diet." },
      aquaponics: { text: "Balanced Dual", detail: "Yields both animal protein (fish) and high-value leafy vegetables." },
      hydroponics: { text: "Maximum Vegetative", detail: "Explosive growth speeds with up to 50% faster crop harvest turnarounds." },
      pond: { text: "Semi-Intensive", detail: "Low to moderate density (2-10 kg/m³) to avoid water column oxygen crashes." }
    },
    {
      label: "Key Biological Agent",
      icon: <Sparkles className="w-4 h-4 text-teal-650" />,
      desc: "The critical biological process driving the system's viability.",
      ras: { text: "Autotrophic Nitrifiers", detail: "AOB and NOB bacteria oxidize ammonia to nitrite, then nitrate." },
      biofloc: { text: "Heterotrophic Bacteria", detail: "Bacteria assimilate ammonia into high-protein microbial biomass directly." },
      aquaponics: { text: "Tri-Symbiosis", detail: "Fish, nitrifying bacteria, and plant roots share a nutrient loop." },
      hydroponics: { text: "Direct Mineral Ions", detail: "Direct, instant absorption of chelated minerals at root membrane level." },
      pond: { text: "Plankton & Soil Ecology", detail: "Phytoplankton, zooplankton, and benthic mud microbes naturally digest wastes." }
    },
    {
      label: "Outage Vulnerability",
      icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
      desc: "The operational risk level if power or backup generators fail.",
      ras: { text: "Extreme Risk", detail: "Oxygen levels collapse within minutes; demands reliable automatic backups." },
      biofloc: { text: "High Risk", detail: "Floc settles and turns anaerobic without aeration, suffocating organisms." },
      aquaponics: { text: "Medium-High Risk", detail: "Pump failure dry-out is slower, but biological balance is sensitive." },
      hydroponics: { text: "Medium Risk", detail: "DWC has deep water buffer; NFT channels dry and wilt in hours." },
      pond: { text: "Low Risk", detail: "Large surface area promotes natural gas exchange; oxygen collapse is rare." }
    },
    {
      label: "Primary Outputs",
      icon: <Check className="w-4 h-4 text-teal-800" />,
      desc: "The physical market products generated by the system.",
      ras: { text: "Premium Fish", detail: "Tilapia, Trout, Barramundi, Salmon, Seabass, Carp." },
      biofloc: { text: "Hardy Fish & Shrimp", detail: "Whiteleg Shrimp, Tilapia, Catfish, Common Carp." },
      aquaponics: { text: "Fish & Leafy Greens", detail: "Tilapia/Koi plus Organic Lettuce, Herbs, Kale, Water Spinach." },
      hydroponics: { text: "Vegetables & Fruit", detail: "Gourmet Lettuce, Herbs, Strawberries, Vine Tomatoes, Cucumbers." },
      pond: { text: "Carps & Catfish", detail: "Indian Major Carps (Rohu, Catla, Mrigal), Grass Carp, Tilapia, and Pangasius." }
    }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 shadow-xs space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-mono text-teal-700 uppercase tracking-wider font-extrabold block">
            Agronomy Decision Matrix
          </span>
          <h3 className="text-xl sm:text-2xl font-sans font-black text-slate-950 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5.5 h-5.5 text-teal-800" />
            Feasibility Comparison & Trade-off Study
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Compare and analyze core parameters across our modern fisheries technologies. The active page column is highlighted below.
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
          <span className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider">
            Highlighting: {techMetaData[activeTech].name}
          </span>
        </div>
      </div>

      {/* Grid Container for Table with responsive horizontal scroll */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full border-collapse text-left min-w-[850px]">
          <thead>
            <tr className="bg-slate-50/60 border-b border-slate-200">
              <th className="p-4 text-xs font-mono font-extrabold uppercase text-slate-500 w-[240px]">Feasibility Parameter</th>
              
              {/* RAS Column Header */}
              <th className={`p-4 transition-all ${
                activeTech === "ras" 
                  ? "bg-blue-50/50 border-x-2 border-t-2 border-blue-400" 
                  : "border-b border-slate-200"
              }`}>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold uppercase text-blue-600 tracking-wider">RAS Technology</span>
                  <div className="font-sans font-extrabold text-xs sm:text-sm text-slate-900">Recirculating Aqua</div>
                  <span className="inline-block text-[9px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">Fish Production</span>
                </div>
              </th>

              {/* Biofloc Column Header */}
              <th className={`p-4 transition-all ${
                activeTech === "biofloc" 
                  ? "bg-indigo-50/50 border-x-2 border-t-2 border-indigo-400" 
                  : "border-b border-slate-200"
              }`}>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold uppercase text-indigo-650 tracking-wider">Biofloc System</span>
                  <div className="font-sans font-extrabold text-xs sm:text-sm text-slate-900">Bioflock (BFT)</div>
                  <span className="inline-block text-[9px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">Microbials & Floc</span>
                </div>
              </th>

              {/* Aquaponics Column Header */}
              <th className={`p-4 transition-all ${
                activeTech === "aquaponics" 
                  ? "bg-emerald-50/50 border-x-2 border-t-2 border-emerald-400" 
                  : "border-b border-slate-200"
              }`}>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold uppercase text-emerald-650 tracking-wider">Aquaponics</span>
                  <div className="font-sans font-extrabold text-xs sm:text-sm text-slate-900">Symbiotic Grow</div>
                  <span className="inline-block text-[9px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Fish + Plants</span>
                </div>
              </th>

              {/* Hydroponics Column Header */}
              <th className={`p-4 transition-all ${
                activeTech === "hydroponics" 
                  ? "bg-teal-50/50 border-x-2 border-t-2 border-teal-400" 
                  : "border-b border-slate-200"
              }`}>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold uppercase text-teal-650 tracking-wider">Hydroponics</span>
                  <div className="font-sans font-extrabold text-xs sm:text-sm text-slate-900">Soil-less Mineral</div>
                  <span className="inline-block text-[9px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">Pure Vegetation</span>
                </div>
              </th>

              {/* Pond Column Header */}
              <th className={`p-4 transition-all ${
                activeTech === "pond" 
                  ? "bg-emerald-50/50 border-x-2 border-t-2 border-emerald-400" 
                  : "border-b border-slate-200"
              }`}>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold uppercase text-emerald-600 tracking-wider">Pond Farming</span>
                  <div className="font-sans font-extrabold text-xs sm:text-sm text-slate-900">Traditional Pond</div>
                  <span className="inline-block text-[9px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Open Ecosystem</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((item, index) => {
              return (
                <tr 
                  key={index} 
                  className={`border-b border-slate-150 transition-colors hover:bg-slate-50/30 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/20"
                  }`}
                >
                  {/* Parameter Label */}
                  <td className="p-4 align-top">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-sans font-extrabold text-xs text-slate-900">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-sans leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </td>

                  {/* RAS Cell */}
                  <td className={`p-4 align-top text-xs transition-all ${
                    activeTech === "ras" 
                      ? "bg-blue-50/30 border-x-2 border-blue-200 font-medium" 
                      : ""
                  }`}>
                    <div className="space-y-1">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.ras.text.includes("Very High") || item.ras.text.includes("Extreme")
                          ? "bg-red-50 text-red-700 font-black" 
                          : "bg-slate-100 text-slate-800"
                      }`}>
                        {item.ras.text}
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                        {item.ras.detail}
                      </p>
                    </div>
                  </td>

                  {/* Biofloc Cell */}
                  <td className={`p-4 align-top text-xs transition-all ${
                    activeTech === "biofloc" 
                      ? "bg-indigo-50/30 border-x-2 border-indigo-200 font-medium" 
                      : ""
                  }`}>
                    <div className="space-y-1">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.biofloc.text.includes("Medium-Low") || item.biofloc.text.includes("Very High")
                          ? "bg-emerald-50 text-emerald-800" 
                          : "bg-slate-100 text-slate-800"
                      }`}>
                        {item.biofloc.text}
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                        {item.biofloc.detail}
                      </p>
                    </div>
                  </td>

                  {/* Aquaponics Cell */}
                  <td className={`p-4 align-top text-xs transition-all ${
                    activeTech === "aquaponics" 
                      ? "bg-emerald-50/30 border-x-2 border-emerald-200 font-medium" 
                      : ""
                  }`}>
                    <div className="space-y-1">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.aquaponics.text.includes("Low-Medium") || item.aquaponics.text.includes("Extreme")
                          ? "bg-emerald-50 text-emerald-800 font-black" 
                          : "bg-slate-100 text-slate-800"
                      }`}>
                        {item.aquaponics.text}
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                        {item.aquaponics.detail}
                      </p>
                    </div>
                  </td>

                  {/* Hydroponics Cell */}
                  <td className={`p-4 align-top text-xs transition-all ${
                    activeTech === "hydroponics" 
                      ? "bg-teal-50/30 border-x-2 border-teal-200 font-medium" 
                      : ""
                  } ${index === criteria.length - 1 && activeTech === "hydroponics" ? "border-b-2 border-teal-400" : ""}`}>
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                        {item.hydroponics.text}
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                        {item.hydroponics.detail}
                      </p>
                    </div>
                  </td>

                  {/* Pond Cell */}
                  <td className={`p-4 align-top text-xs transition-all ${
                    activeTech === "pond" 
                      ? "bg-emerald-50/30 border-x-2 border-emerald-200 font-medium" 
                      : ""
                  } ${index === criteria.length - 1 && activeTech === "pond" ? "border-b-2 border-emerald-400" : ""}`}>
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {item.pond.text}
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                        {item.pond.detail}
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Helpful tips panel below table */}
      <div className="p-4 bg-teal-50/30 border border-teal-100/50 rounded-2xl flex gap-2.5 items-start">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="text-xs text-teal-900 leading-relaxed font-sans">
          <strong>Strategic Agronomy Advice:</strong> Choosing the right technology is dependent on local water resources, initial capital, and land temperature profile. While <strong>RAS</strong> delivers the highest stocking output, it has heavy mechanical power requirements. <strong>Biofloc</strong> offers the best cost-to-protein conversion ratio, while <strong>Aquaponics</strong> and <strong>Hydroponics</strong> yield premium market leafy greens with extreme nutrient retention.
        </div>
      </div>
    </div>
  );
}
