import React, { useState, useMemo } from "react";
import { 
  Wrench, Layers, Waves, Fish, Sprout, HeartPulse, Boxes, 
  Wind, Droplets, Filter, Activity, Utensils, PackageCheck, 
  Snowflake, Search, SlidersHorizontal, MapPin, Building2, 
  CheckCircle2, ArrowRight, Calculator, HelpCircle, ShieldCheck, 
  ChevronRight, Sparkles, RefreshCw, AlertTriangle,
  Zap, MessageCircle, Mail, Phone, ChevronDown, ChevronUp, Send
} from "lucide-react";
import BreadcrumbSchema from "./BreadcrumbSchema";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import EquipmentCard from "./EquipmentCard";
import QuoteRequestModal from "./QuoteRequestModal";

import { 
  FarmingSystemId, 
  EquipmentCategory, 
  EquipmentItem, 
  SupplierItem 
} from "../types";

import { 
  FARMING_SYSTEMS, 
  EQUIPMENT_CATEGORIES, 
  EQUIPMENT_DATABASE 
} from "../data/equipmentData";

import { 
  SUPPLIERS_DATABASE, 
  INDIAN_STATES, 
  CITIES_BY_STATE 
} from "../data/supplierData";

interface EquipmentFinderPageProps {
  onBackToDashboard?: () => void;
  onNavigatePage?: (page: string) => void;
}

const REAL_AQUACULTURE_FAQS = [
  {
    q: "What equipment do I need for a 10,000 liter Biofloc fish tank?",
    a: "A 10,000-liter (10 m³) commercial Biofloc tank requires: (1) High-pressure Roots air blower or diaphragm pump delivering 250–350 LPM at ≥140 mbar, (2) 16mm micro-pore aeration diffuser rings, (3) Optical DO meter for monitoring dissolved oxygen above 5.0 mg/L, (4) Commercial tarpaulin circular tank (550–650 GSM PVC/HDPE with GI mesh frame), (5) Imhoff cone for floc volume tracking (15–25 mL/L target), and (6) Emergency generator backup with an ATS switch.",
    highlight: "Sizing Benchmark: 10 m³ water × 30 LPM/m³ = 300 LPM continuous air supply against 1.2m hydrostatic head."
  },
  {
    q: "What is the typical price range and cost of aquaculture equipment in India?",
    a: "Commercial equipment prices in India vary by capacity and motor specification: (1) Twin-Lobe Roots Blowers (1.5 HP to 3 HP): ₹24,000 – ₹58,000, (2) Rotary Drum Filters (20 m³/hr to 60 m³/hr capacity): ₹95,000 – ₹2,40,000, (3) 1 HP to 2 HP 4-Paddle Wheel Aerators: ₹18,000 – ₹32,000, (4) Optical Dissolved Oxygen (DO) Meters: ₹35,000 – ₹65,000, (5) Circular Tarpaulin Tanks (10,000L to 30,000L): ₹12,000 – ₹35,000, and (6) Submersible Solids-Handling Sludge Pumps: ₹8,500 – ₹22,000.",
    highlight: "Pricing Notice: Ex-factory estimates in INR. Excludes GST (typically 12–18%) and interstate freight logistics."
  },
  {
    q: "How do I calculate air blower size (CFM & LPM) for Biofloc aeration?",
    a: "In intensive Biofloc systems, heterotrophic bacteria and fish create massive continuous biological oxygen demand (BOD). The engineering standard is 25 to 35 Litres Per Minute (LPM) of air per cubic meter (m³) of water. For example, a 60 m³ system requires: 60 m³ × 30 LPM = 1,800 LPM. To convert LPM to CFM (Cubic Feet per Minute), divide by 28.317: 1,800 LPM ÷ 28.317 ≈ 63.6 CFM.",
    highlight: "Critical Rule: The blower MUST be rated for continuous working pressure at your tank depth (e.g. ≥140 mbar at 1.2m depth). Low-pressure blowers will burn out."
  },
  {
    q: "Why do ring blowers fail in deep fish tanks and what is the alternative?",
    a: "Ring blowers (regenerative blowers) are designed to move high volumes of air at low static head pressure (typically <80–100 mbar). When submerged diffusers are placed at 1.2m to 1.5m water depth, the hydrostatic water column pushes back with 120–150 mbar of head pressure. This forces the ring blower into stall mode, causing the motor coils to overheat and trip the thermal breaker. The correct engineering solution is a positive-displacement Twin-Lobe Roots Blower, which maintains constant volumetric displacement regardless of water depth.",
    highlight: "Design Selection: Choose Ring Blowers only for shallow water (<0.8m). Use Roots Blowers for intensive tanks (1.2m to 2.0m depth)."
  },
  {
    q: "What micron rating is required for an automatic drum filter in RAS?",
    a: "For Recirculating Aquaculture Systems (RAS), micro-screen drum filters must use a 40 to 60 micron mesh (316L stainless steel or woven polyester). A mesh coarser than 70–80 microns allows intact fecal pellets to degrade into dissolved toxic ammonia (TAN). Conversely, a mesh finer than 30 microns blinds within minutes, triggering non-stop backwashing and wasting system water.",
    highlight: "Flow Turnover Sizing: Size the drum filter to process 100% to 150% of the entire farm water volume every single hour."
  },
  {
    q: "How many paddle wheel aerators do I need per acre of earthen pond?",
    a: "The standard rule of thumb for semi-intensive fish and shrimp farming is 1.0 HP of paddle wheel aeration for every 1,000 kg of target harvest biomass. For a pond with a harvest target of 4,000 kg per acre, deploy four 1.0 HP units or two 2.0 HP units. Position aerators in opposing corners to create a circular water current that concentrates pond sediment in the center drain.",
    highlight: "Energy Ratio: 1.0 HP aeration per 1,000 kg harvest biomass. Run nighttime aeration from 11:00 PM to 06:00 AM."
  },
  {
    q: "Can commercial aquaculture machinery run on domestic single-phase electricity in India?",
    a: "Small-scale equipment up to 1.5 HP (such as small blowers, mini aeration pumps, and dosing units) can run on 220V single-phase power. However, commercial 2.0 HP+ Roots blowers, industrial drum filters, and large circulation pumps require 415V 3-phase industrial power to prevent excessive starting current draws and voltage drops. If 3-phase is unavailable at your site, you must install a single-phase to 3-phase Variable Frequency Drive (VFD).",
    highlight: "Electrical Requirement: Verify phase type with our desk before ordering motors to ensure site compatibility."
  },
  {
    q: "What fish processing and handling machinery is required for commercial fish harvesting?",
    a: "A commercial aquaculture harvest line requires: (1) Knotless seine nets and live fish transfer pumps (4-inch to 6-inch non-clog vortex or vacuum) to move fish without scale loss, (2) Stainless steel (SS304) live fish grading boxes to sort fingerlings or market biomass by size, (3) Rotary fish descaling machines capable of scaling 25–30 kg per 3-minute batch, (4) Food-grade SS304 filleting and evisceration tables with overhead washdown nozzles, and (5) Commercial flake ice machines (1 to 3 tons/day) maintaining a 1:1 ice-to-fish rapid chilling ratio for cold chain transport.",
    highlight: "Quality Standard: Use only food-grade AISI 304 or 316 stainless steel to comply with FSSAI hygiene standards and avoid rust."
  },
  {
    q: "How does a pond bottom sludge cleaner work in earthen fish ponds?",
    a: "A submersible pond bottom sludge cleaner utilizes a heavy-duty slurry pump fitted with a tungsten-carbide vortex cutter impeller. Guided along the pond floor via floating pontoons or telescopic booms, it vacuums accumulated black anaerobic muck (decaying feed and fecal waste) and pumps it out through a 3-inch discharge hose to exterior drying beds. This clears toxic hydrogen sulfide (H2S) deposits without draining the pond or halting fish growth.",
    highlight: "Sediment Management: Eliminates deadly benthic anoxic zones and maintains pond depth in commercial carp and catfish farms."
  },
  {
    q: "What is an all-in-one compact indoor RAS skid and what tank volume does it support?",
    a: "An all-in-one indoor RAS skid is a factory pre-engineered, plug-and-play water treatment station combining a 50-micron automatic rotary drum filter, an aerated moving bed biofilm reactor (MBBR) filled with K1 virgin media, a counter-current protein skimmer, an inline amalgam UV-C sterilizer, and a high-flow circulation pump on a single structural base. Modular skids typically support culture volumes between 10 m³ and 60 m³ with zero on-site piping errors.",
    highlight: "Turnkey Benefit: Installs in hours with standard union fittings, delivering 100% hourly water filtration turnover."
  },
  {
    q: "How do live fish transfer pumps move fish without mortality or scale damage?",
    a: "Modern fish transfer pumps utilize recessed vortex impellers or dual-chamber vacuum suction tanks where live fish are suspended in a continuous water stream (typically 3 parts water to 1 part fish). Because fish never touch moving mechanical impeller blades directly, scale mucus membranes remain intact, eliminating transit abrasions and stress-induced bacterial ulcers during grading or harvest loading.",
    highlight: "Harvest Velocity: Moves 5 to 10 tons of live fish per hour from ponds directly into oxygenated transport hauling trucks."
  }
];

export default function EquipmentFinderPage({
  onBackToDashboard,
  onNavigatePage
}: EquipmentFinderPageProps) {
  // --------------------------------------------------------------------------
  // 1. STATE MANAGEMENT
  // --------------------------------------------------------------------------
  
  // Step 1: Farming System
  const [selectedSystem, setSelectedSystem] = useState<FarmingSystemId>("biofloc");

  // Step 2: Equipment Category / Purpose
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Step 3: Farm Information & Sizing Parameters
  const [farmVolumeM3, setFarmVolumeM3] = useState<number>(50); // m3
  const [species, setSpecies] = useState<string>("Tilapia");
  const [stockingDensityKgM3, setStockingDensityKgM3] = useState<number>(35); // kg/m3

  // Search & Filter state
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");

  // Supplier Cascading Filters
  const [supplierState, setSupplierState] = useState<string>("All States (Pan-India)");
  const [supplierCity, setSupplierCity] = useState<string>("All Cities");
  const [onlyPanIndia, setOnlyPanIndia] = useState<boolean>(false);
  const [supplierSearchQuery, setSupplierSearchQuery] = useState("");

  // Modals state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeEquipmentForQuote, setActiveEquipmentForQuote] = useState<EquipmentItem | null>(null);
  const [activeSupplierForQuote, setActiveSupplierForQuote] = useState<SupplierItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active view tab: "equipment" or "suppliers" or "guide"
  const [activeTab, setActiveTab] = useState<"equipment" | "suppliers" | "guide">("equipment");

  // Deep-linking: Resolve /equipment/:slug or ?item=:slug on page load
  React.useEffect(() => {
    try {
      const pathname = window.location.pathname || "";
      const search = window.location.search || "";
      let targetSlug = "";

      if (pathname.startsWith("/equipment/")) {
        targetSlug = pathname.replace(/^\/equipment\/?/, "").replace(/\/+$/, "");
      } else if (search.includes("item=")) {
        const params = new URLSearchParams(search);
        targetSlug = params.get("item") || "";
      }

      if (targetSlug) {
        const matchedItem = EQUIPMENT_DATABASE.find((eq) => eq.slug === targetSlug);
        if (matchedItem) {
          // Auto-align selected farming system to one supported by the equipment
          if (!matchedItem.farmingSystems.includes(selectedSystem)) {
            setSelectedSystem(matchedItem.farmingSystems[0]);
          }
          setSelectedCategory(matchedItem.category);
          setEquipmentSearchQuery(matchedItem.name);
          setActiveTab("equipment");

          setTimeout(() => {
            const el = document.getElementById(`eq-${matchedItem.slug}`);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 300);
        }
      }
    } catch (err) {
      // Safe fallback
    }
  }, []);

  // Computed biomass and fish counts
  const totalBiomassKg = Math.round(farmVolumeM3 * stockingDensityKgM3);
  const avgHarvestWeightKg = species === "Tilapia" ? 0.5 : species === "Pangasius" ? 1.0 : species === "Rohu" ? 1.0 : 0.5;
  const estimatedFishCount = Math.round(totalBiomassKg / avgHarvestWeightKg);

  // Available cities for cascading dropdown
  const availableCities = useMemo(() => {
    if (supplierState === "All States (Pan-India)") return ["All Cities"];
    return CITIES_BY_STATE[supplierState] || ["All Cities"];
  }, [supplierState]);

  // Handle state change: reset city to "All Cities"
  const handleStateChange = (newState: string) => {
    setSupplierState(newState);
    setSupplierCity("All Cities");
  };

  // --------------------------------------------------------------------------
  // 2. FILTERED EQUIPMENT LIST
  // --------------------------------------------------------------------------
  const filteredEquipment = useMemo(() => {
    return EQUIPMENT_DATABASE.filter((item) => {
      // 1. System filter
      const matchesSystem = item.farmingSystems.includes(selectedSystem);
      if (!matchesSystem) return false;

      // 2. Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // 3. Importance Tier filter
      if (tierFilter === "essential" && !item.importanceTier.includes("Essential")) {
        return false;
      }
      if (tierFilter === "recommended" && !item.importanceTier.includes("Recommended")) {
        return false;
      }

      // 4. Search query
      if (equipmentSearchQuery.trim()) {
        const q = equipmentSearchQuery.toLowerCase();
        const matchesQuery = 
          item.name.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.purpose.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [selectedSystem, selectedCategory, tierFilter, equipmentSearchQuery]);

  // --------------------------------------------------------------------------
  // 3. FILTERED SUPPLIERS LIST (Authentic & Verified Submissions Only)
  // --------------------------------------------------------------------------
  const [registeredSuppliers] = useState<SupplierItem[]>(() => {
    try {
      const stored = localStorage.getItem("mf_supplier_applications");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((s: any) => s.verificationStatus === "Approved" || s.verificationStatus === "Verified");
        }
      }
    } catch (e) {}
    return [];
  });

  const allSuppliers = useMemo(() => {
    return [...SUPPLIERS_DATABASE, ...registeredSuppliers];
  }, [registeredSuppliers]);

  const filteredSuppliers = useMemo(() => {
    return allSuppliers.filter((sup) => {
      // Only approved/verified suppliers (moderation safeguard)
      if (sup.verificationStatus !== "Verified" && sup.verificationStatus !== "Approved") {
        return false;
      }

      // State filter
      if (supplierState !== "All States (Pan-India)") {
        const matchesState = sup.state === supplierState;
        // If supplier doesn't match state, check if user allows Pan-India delivery
        if (!matchesState && !sup.panIndiaDelivery) {
          return false;
        }
      }

      // City filter
      if (supplierCity !== "All Cities") {
        if (sup.city !== supplierCity && !sup.panIndiaDelivery) {
          return false;
        }
      }

      // Pan-India only toggle
      if (onlyPanIndia && !sup.panIndiaDelivery) {
        return false;
      }

      // Category matching (if a specific category is selected in the finder)
      if (selectedCategory !== "all") {
        if (!sup.equipmentCategories.includes(selectedCategory as EquipmentCategory)) {
          return false;
        }
      }

      // Search Query
      if (supplierSearchQuery.trim()) {
        const q = supplierSearchQuery.toLowerCase();
        const matchesQ = 
          sup.businessName.toLowerCase().includes(q) ||
          sup.city.toLowerCase().includes(q) ||
          sup.state.toLowerCase().includes(q) ||
          sup.description.toLowerCase().includes(q);
        if (!matchesQ) return false;
      }

      return true;
    });
  }, [allSuppliers, supplierState, supplierCity, onlyPanIndia, selectedCategory, supplierSearchQuery]);

  // Helper to find suppliers for a specific equipment
  const getSuppliersForEquipment = (equipmentSlug: string, category: EquipmentCategory) => {
    return allSuppliers.filter((sup) => {
      if (sup.verificationStatus !== "Verified" && sup.verificationStatus !== "Approved") return false;
      return sup.equipmentSlugs.includes(equipmentSlug) || sup.equipmentCategories.includes(category);
    });
  };

  const handleOpenQuoteForEquipment = (equipment: EquipmentItem) => {
    setActiveEquipmentForQuote(equipment);
    setActiveSupplierForQuote(null);
    setIsQuoteModalOpen(true);
  };

  const handleOpenQuoteForSupplier = (supplier: SupplierItem) => {
    setActiveSupplierForQuote(supplier);
    setActiveEquipmentForQuote(null);
    setIsQuoteModalOpen(true);
  };

  const currentSystemMeta = FARMING_SYSTEMS.find((s) => s.id === selectedSystem)!;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      
      {/* Breadcrumb Schema for SEO */}
      <BreadcrumbSchema 
        items={[
          { name: "Equipment Engineering Lab", url: "/equipment-finder" },
          { name: "What Equipment Do I Need?", url: "/equipment-finder" }
        ]} 
      />

      {/* Top Hero Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 text-white border-b border-teal-800/40 py-10 sm:py-14 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-4 text-center sm:text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-teal-400" />
            <span>Aquaculture Engineering Decision-Support Tool</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
                What Equipment Do I Need?
              </h1>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                Identify essential aquaculture machinery, size aeration blowers and drum filters for your exact water volume, and discover verified equipment suppliers across India.
              </p>
            </div>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0">
              <button
                onClick={() => onNavigatePage ? onNavigatePage("calculators") : null}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-xs"
              >
                <Calculator className="w-4 h-4 text-yellow-300" />
                <span>Calculators Lab</span>
              </button>
              
              <a
                href="https://wa.me/919748952342?text=Hello%20Modern%20Fisheries,%20I%20am%20inquiring%20about%20commercial%20aquaculture%20equipment%20specifications%20and%20procurement."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>WhatsApp Inquiry</span>
              </a>

              <a
                href="mailto:mf@owncircles.com?subject=Aquaculture%20Equipment%20Inquiry&body=Hello%20Modern%20Fisheries%20Engineering%20Desk,%0A%0AI%20am%20inquiring%20about%20equipment%20specifications%20and%20pricing.%0A%0AMy%20Farm%20System:%20%0AWater%20Volume%20(m3):%20%0ALocation%20(State/City):%20%0APhone%20Number:%20"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-teal-300" />
                <span>Email Desk</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Main Working Column (Left 8-9 Cols) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6 sm:space-y-8">
            
            {/* ================================================================ */}
            {/* STEP 1: CHOOSE FARMING SYSTEM */}
            {/* ================================================================ */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-teal-100 text-teal-800 font-mono font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h2 className="font-sans font-bold text-slate-900 text-base sm:text-lg">
                      Select Your Farming System Setup
                    </h2>
                    <p className="text-slate-500 text-xs">
                      Equipment requirements fundamentally depend on culture hydraulics and biological density.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 self-start sm:self-auto font-bold">
                  Active: {currentSystemMeta.name}
                </span>
              </div>

              {/* Systems Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {FARMING_SYSTEMS.map((system) => {
                  const isSelected = selectedSystem === system.id;
                  return (
                    <button
                      type="button"
                      key={system.id}
                      onClick={() => setSelectedSystem(system.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                        isSelected 
                          ? "bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20 shadow-xs" 
                          : "bg-slate-50/60 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-600" />
                      )}
                      <div>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                          {system.shortName}
                        </span>
                        <span className="text-[11px] text-slate-500 block line-clamp-2 mt-0.5">
                          {system.tagline}
                        </span>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>{system.stockingDensity}</span>
                        <span className={`font-bold ${isSelected ? "text-teal-700" : ""}`}>
                          {isSelected ? "Selected" : "Select"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* System Overview Details Banner */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <strong className="text-slate-900 block font-sans">
                    {currentSystemMeta.name} Engineering Profile:
                  </strong>
                  <p className="text-slate-600 text-[11px] leading-relaxed max-w-2xl">
                    {currentSystemMeta.description}
                  </p>
                </div>
                {currentSystemMeta.linkPath && onNavigatePage && (
                  <button
                    onClick={() => onNavigatePage(currentSystemMeta.linkPath.replace("/", ""))}
                    className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 font-bold text-xs shrink-0 cursor-pointer"
                  >
                    <span>Read Engineering Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* ================================================================ */}
            {/* STEP 2: FARM SIZING & TECHNICAL CALCULATOR */}
            {/* ================================================================ */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-800 font-mono font-black text-xs flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h2 className="font-sans font-bold text-slate-900 text-base sm:text-lg">
                      Enter Your Farm Dimensions (Dynamic Sizing)
                    </h2>
                    <p className="text-slate-500 text-xs">
                      Machinery capacities automatically calculate from your water volume and live fish biomass.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFarmVolumeM3(50);
                    setStockingDensityKgM3(35);
                    setSpecies("Tilapia");
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 inline-flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              {/* Sizing Input Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Water Volume */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700">Water Volume</label>
                    <span className="font-mono font-bold text-blue-700">{farmVolumeM3} m³</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={selectedSystem === "pond" ? 5000 : 300}
                    step={selectedSystem === "pond" ? 50 : 5}
                    value={farmVolumeM3}
                    onChange={(e) => setFarmVolumeM3(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>5 m³</span>
                    <span>~{(farmVolumeM3 * 1000).toLocaleString()} Litres</span>
                    <span>{selectedSystem === "pond" ? "5,000 m³" : "300 m³"}</span>
                  </div>
                </div>

                {/* Target Stocking Density */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700">Stocking Density</label>
                    <span className="font-mono font-bold text-blue-700">{stockingDensityKgM3} kg/m³</span>
                  </div>
                  <input
                    type="range"
                    min={selectedSystem === "pond" ? 2 : 10}
                    max={selectedSystem === "pond" ? 15 : 80}
                    step={1}
                    value={stockingDensityKgM3}
                    onChange={(e) => setStockingDensityKgM3(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{selectedSystem === "pond" ? "2 kg/m³" : "10 kg/m³"}</span>
                    <span>Target Intensity</span>
                    <span>{selectedSystem === "pond" ? "15 kg/m³" : "80 kg/m³"}</span>
                  </div>
                </div>

                {/* Cultured Species */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <label className="block font-bold text-slate-700 text-xs">Target Species</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Tilapia">Nile Tilapia (GIFT)</option>
                    <option value="Rohu">Rohu / Catla (Indian Major Carp)</option>
                    <option value="Pangasius">Pangasius Catfish</option>
                    <option value="Mangur">Desi Magur (Clarias)</option>
                    <option value="Shrimp">Vannamei Shrimp</option>
                    <option value="Trout">Rainbow Trout (Coldwater)</option>
                  </select>
                  <span className="text-[10px] text-slate-400 block pt-0.5">
                    Est. Harvest Biomass: <strong className="text-slate-700">{totalBiomassKg.toLocaleString()} kg</strong>
                  </span>
                </div>

              </div>

              {/* Dynamic Engineering Output Pill Strip */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-blue-200 uppercase tracking-wider block">Calculated System Biomass</span>
                    <span className="font-bold text-sm sm:text-base text-white">
                      {totalBiomassKg.toLocaleString()} kg (~{estimatedFishCount.toLocaleString()} fish)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-blue-100 font-mono">
                  <div>
                    <span className="text-[10px] text-blue-300 block uppercase">Min Airflow Needed:</span>
                    <span className="font-bold text-white text-sm">~{Math.round(farmVolumeM3 * 30)} LPM</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-300 block uppercase">Recirculation Turnover:</span>
                    <span className="font-bold text-white text-sm">~{Math.round(farmVolumeM3 * 1.2)} m³/hr</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-300 block uppercase">Daily Feed Estimate:</span>
                    <span className="font-bold text-white text-sm">~{(totalBiomassKg * 0.025).toFixed(1)} kg/day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================================================================ */}
            {/* STEP 3: EQUIPMENT CATEGORY & OPERATIONAL PURPOSE FILTER */}
            {/* ================================================================ */}
            <div className="space-y-4">
              
              {/* Category Nav Tabs */}
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === "all"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    All Equipment ({filteredEquipment.length})
                  </button>

                  {EQUIPMENT_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {cat.shortName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search & Importance Tier Sub-bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search equipment by keyword (e.g. blower, drum filter, DO meter, pump)..."
                    value={equipmentSearchQuery}
                    onChange={(e) => setEquipmentSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50/50"
                  />
                  {equipmentSearchQuery && (
                    <button
                      onClick={() => setEquipmentSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Tier Filter */}
                <div className="flex items-center gap-1.5 shrink-0 text-xs">
                  <span className="text-slate-400 font-mono text-[10px] uppercase">Priority:</span>
                  <button
                    type="button"
                    onClick={() => setTierFilter("all")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                      tierFilter === "all" ? "bg-slate-200 text-slate-900 font-bold" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setTierFilter("essential")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                      tierFilter === "essential" ? "bg-red-100 text-red-800 font-bold" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Essential
                  </button>
                  <button
                    type="button"
                    onClick={() => setTierFilter("recommended")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                      tierFilter === "recommended" ? "bg-amber-100 text-amber-800 font-bold" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Recommended
                  </button>
                </div>

              </div>
            </div>

            {/* ================================================================ */}
            {/* STEP 4: EQUIPMENT RESULTS GRID */}
            {/* ================================================================ */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900">
                    Recommended Equipment for {currentSystemMeta.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Showing {filteredEquipment.length} technical equipment specifications with dynamic sizing.
                  </p>
                </div>
              </div>

              {filteredEquipment.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">No Matching Equipment Found</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Try clearing search terms or selecting &ldquo;All Equipment&rdquo; to view complete machinery requirements for this system.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setEquipmentSearchQuery("");
                      setTierFilter("all");
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredEquipment.map((eq) => (
                    <EquipmentCard
                      key={eq.id}
                      equipment={eq}
                      farmVolumeM3={farmVolumeM3}
                      biomassKg={totalBiomassKg}
                      fishCount={estimatedFishCount}
                      onOpenCalculator={(calcId) => {
                        if (onNavigatePage) onNavigatePage("calculators");
                      }}
                      onNavigateArticle={(path) => {
                        if (onNavigatePage) onNavigatePage(path.replace("/", ""));
                      }}
                      onRequestQuote={handleOpenQuoteForEquipment}
                      relevantSuppliers={getSuppliersForEquipment(eq.slug, eq.category)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* In-content Responsive Ad Banner */}
            <div className="py-2">
              <AdBanner reloadKey="equipment-mid-content" />
            </div>

            {/* ================================================================ */}
            {/* STEP 5: DIRECT EQUIPMENT INQUIRY & ENGINEERING DESK */}
            {/* ================================================================ */}
            <div id="equipment-inquiry-section" className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-800/40 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/50 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Direct Machinery &amp; Technical Sizing Desk</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-sans text-white">
                    Send Equipment &amp; Sizing Inquiry
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                    Need factory quotes, power phase compatibility (single-phase vs 3-phase), or custom aeration manifold sizing for your farm? Contact our engineering desk directly via WhatsApp or Email.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveEquipmentForQuote(null);
                    setActiveSupplierForQuote(null);
                    setIsQuoteModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Open Inquiry Form</span>
                </button>
              </div>

              {/* Two Direct Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* WhatsApp Desk */}
                <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-5 hover:border-emerald-400/50 transition-colors flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        Fastest Response
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-base">Instant WhatsApp Desk</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Chat directly for instant equipment availability, motor phase advice, blower pressure sizing, and Pan-India freight dispatch.
                    </p>
                    <div className="text-xs font-mono text-emerald-300 font-bold pt-1">
                      +91 97489 52342
                    </div>
                  </div>

                  <a
                    href="https://wa.me/919748952342?text=Hello%20Modern%20Fisheries,%20I%20am%20inquiring%20about%20commercial%20aquaculture%20equipment%20specifications%20and%20procurement."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp (+91 97489 52342)</span>
                  </a>
                </div>

                {/* Email Desk */}
                <div className="bg-white/5 border border-slate-700 rounded-2xl p-5 hover:border-slate-600 transition-colors flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30">
                        Technical BOQ
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-base">Email Engineering Desk</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Submit project schematics, commercial farm blueprints, tenders, or itemized Bills of Quantities (BOQ) for technical vetting.
                    </p>
                    <div className="text-xs font-mono text-teal-300 font-bold pt-1">
                      mf@owncircles.com
                    </div>
                  </div>

                  <a
                    href="mailto:mf@owncircles.com?subject=Aquaculture%20Equipment%20and%20Machinery%20Inquiry&body=Hello%20Modern%20Fisheries%20Engineering%20Desk,%0A%0AI%20am%20requesting%20equipment%20specifications%20and%20commercial%20pricing%20details.%0A%0AFarm%20Type%20(Biofloc/RAS/Pond):%20%0AWater%20Volume%20(m3):%20%0ATarget%20Species:%20%0AState%20/%20City:%20%0APhone%20Number:%20"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black transition-all shadow-sm active:scale-95 border border-slate-600"
                  >
                    <Mail className="w-4 h-4 text-teal-300" />
                    <span>Send Email (mf@owncircles.com)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ================================================================ */}
            {/* STEP 6: AUTHORITATIVE EDUCATIONAL BUYING GUIDE (ADSENSE SAFE) */}
            {/* ================================================================ */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-xs space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 block mb-1">
                  Aquaculture Engineering Handbook
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-sans text-slate-900">
                  Commercial Aquaculture Equipment Procurement &amp; Sizing Principles
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                  Avoid costly operational mistakes by understanding the biological and mechanical engineering standards governing intensive fish farming systems.
                </p>
              </div>

              {/* Engineering Principle 1: Aeration Sizing */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <Wind className="w-4 h-4 text-teal-600" />
                  <span>1. Aeration Dynamics: Volume CFM vs Water Backpressure</span>
                </h4>
                <p>
                  Novice farmers frequently purchase high-volume, low-pressure ring blowers intended for ventilation or shallow spa pools. In intensive Biofloc tanks (1.2m water depth), water creates approximately 120 to 140 mbar of hydrostatic head pressure. Standard low-pressure fans overheat and choke under this load.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                  {"Hydrostatic Backpressure Formula: P(head) = \u03C1 \u00D7 g \u00D7 h + P(diffuser loss) (~140 mbar at 1.2m depth)"}
                </div>
                <p>
                  Always verify that the blower&rsquo;s flow-pressure curve delivers the required 25–35 LPM per cubic meter at <strong>≥150 mbar continuous working pressure</strong>.
                </p>
              </div>

              {/* Engineering Principle 2: Mechanical Drum Filtration */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span>2. Rotary Drum Filter Turnover Sizing in RAS</span>
                </h4>
                <p>
                  A Recirculating Aquaculture System relies entirely on micro-screen drum filters to strip intact fecal solids within seconds of excretion. If fecal pellets remain in the water column for longer than 30–45 minutes, hydraulic shear forces dissolve them into dissolved total ammonia nitrogen (TAN) and fine organic colloidal particles.
                </p>
                <p>
                  The mechanical drum filter should be sized to handle <strong>1.2 to 1.5 times total farm water volume per hour</strong> at a 40 to 60 micron mesh rating. Operating undersized drum filters causes rapid mesh blinding and continuous water loss from frequent backwash cycles.
                </p>
              </div>

              {/* Engineering Principle 3: Continuous Duty vs Standby Power */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>3. Power Redundancy &amp; Emergency Aeration Protocol</span>
                </h4>
                <p>
                  At commercial stocking densities exceeding 35 kg/m³, biological oxygen demand is relentless. If electrical grid power fails, dissolved oxygen levels fall from 6.0 mg/L to lethal hypoxia (&lt;1.5 mg/L) in less than 25 minutes.
                </p>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rule of Redundancy:</strong> Every commercial RAS or Biofloc setup must feature an automated Generator (DG set) with an Automatic Transfer Switch (ATS) capable of firing within 45 seconds of mains power failure.
                  </span>
                </div>
              </div>

            </div>

            {/* ================================================================ */}
            {/* STEP 7: REAL SEARCH QUERIES & TECHNICAL BUYING FAQ (PAGE 1 SEO) */}
            {/* ================================================================ */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-xs space-y-6">
              
              {/* FAQ Schema Script Injection for High-Ranking Google Snippets */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": REAL_AQUACULTURE_FAQS.map((faq) => ({
                      "@type": "Question",
                      "name": faq.q,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `${faq.a} ${faq.highlight || ""}`
                      }
                    }))
                  })
                }}
              />

              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold mb-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Real Search Queries &amp; Verification Benchmarks</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-sans text-slate-900">
                  Aquaculture Machinery &amp; Equipment FAQ
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                  Rigorous engineering answers addressing the exact queries searched by commercial fish farmers regarding equipment sizing, motor phase compatibility, pricing benchmarks across India, and operational failure prevention.
                </p>
              </div>

              <div className="space-y-3">
                {REAL_AQUACULTURE_FAQS.map((faq, idx) => (
                  <div 
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 bg-slate-50/70 hover:bg-slate-100/80 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                        {faq.q}
                      </span>
                      {openFaqIndex === idx ? (
                        <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white border-t border-slate-100 space-y-2">
                        <p>{faq.a}</p>
                        {faq.highlight && (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-2.5 rounded-xl font-mono text-xs">
                            {faq.highlight}
                          </div>
                        )}
                        <div className="pt-2 flex items-center gap-3">
                          <a
                            href={`https://wa.me/919748952342?text=${encodeURIComponent(`Hello Modern Fisheries, I have a question regarding: ${faq.q}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Ask on WhatsApp (+91 97489 52342)</span>
                          </a>
                          <span className="text-slate-300">•</span>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveEquipmentForQuote(null);
                              setActiveSupplierForQuote(null);
                              setIsQuoteModalOpen(true);
                            }}
                            className="text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                          >
                            Inquire via Desk Form →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Column (Right 3-4 Cols) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-20">
            
            {/* Quick Sizing Checklist Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Decision Framework
              </span>
              <h4 className="font-bold text-slate-900 text-sm">
                Farm Checklist for Equipment Sizing
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Measure total system water volume ($m^3$) accurately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Define maximum harvest biomass ($kg/m^3$) target.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Check single-phase vs 3-phase power availability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ensure automatic generator backup is budgeted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Verify local availability of replacement spares (filters, impellers).</span>
                </li>
              </ul>
            </div>

            {/* Link to Precision Calculators Lab */}
            <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-300 block">
                Scientific Calculators
              </span>
              <h4 className="font-bold text-white text-sm sm:text-base">
                Cross-Verify Tank &amp; Biomass Sizing
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Use our circular tarpaulin tank volume solver and stocking density algorithms to double-check biological carrying capacity.
              </p>
              <button
                onClick={() => onNavigatePage ? onNavigatePage("calculators") : null}
                className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Open Calculators Lab</span>
              </button>
            </div>

            {/* Right Sidebar Advertisement */}
            <RightSidebarAd reloadKey="equipment-finder-sidebar" />

          </div>

        </div>
      </div>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialEquipmentSlug={activeEquipmentForQuote?.slug}
        initialEquipmentName={activeEquipmentForQuote?.name}
        supplierName={activeSupplierForQuote?.businessName}
        farmingSystem={selectedSystem}
        farmVolumeM3={farmVolumeM3}
      />

    </div>
  );
}
