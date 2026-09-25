import { EquipmentItem, FarmingSystemId, EquipmentCategory } from "../types";

export interface FarmingSystemMeta {
  id: FarmingSystemId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  typicalVolume: string;
  stockingDensity: string;
  iconName: string;
  linkPath: string;
  color: string;
}

export const FARMING_SYSTEMS: FarmingSystemMeta[] = [
  {
    id: "ras",
    name: "Recirculating Aquaculture Systems (RAS)",
    shortName: "RAS",
    tagline: "Indoor closed-loop aquaculture with >95% water recycling",
    description: "High-density indoor culture utilizing mechanical drum filtration, biological nitrification (MBBR), CO2 degassing, and UV sterilization for year-round biosecure fish production.",
    typicalVolume: "50 - 500 m³ (Multi-tank system)",
    stockingDensity: "40 - 80 kg/m³",
    iconName: "Layers",
    linkPath: "/aquaponic",
    color: "blue"
  },
  {
    id: "biofloc",
    name: "Biofloc Technology (BFT)",
    shortName: "Biofloc",
    tagline: "Zero water-exchange microbial waste assimilation",
    description: "Intensive circular tarpaulin tank culture maintaining heterotrophic bacterial flocs to assimilate toxic ammonia into protein feed with continuous bottom aeration.",
    typicalVolume: "10 - 100 m³ (4m - 10m diameter tanks)",
    stockingDensity: "25 - 50 kg/m³",
    iconName: "Waves",
    linkPath: "/bioflock",
    color: "emerald"
  },
  {
    id: "pond",
    name: "Earthen Pond Farming",
    shortName: "Pond",
    tagline: "Semi-intensive freshwater aquaculture limnology",
    description: "Large natural soil basins utilizing photosynthesis, natural plankton blooms, liming, organic manuring, and paddle wheel aeration for carps, pangasius, and tilapia.",
    typicalVolume: "1,000 - 20,000 m³ (0.25 - 5.0 Acres)",
    stockingDensity: "3 - 12 kg/m³",
    iconName: "Fish",
    linkPath: "/pond-farming",
    color: "green"
  },
  {
    id: "aquaponics",
    name: "Commercial Aquaponics",
    shortName: "Aquaponics",
    tagline: "Symbiotic integration of fish culture and hydroponic plants",
    description: "Closed dual-crop agro-aquaculture where fish metabolic effluent is mineralized and biologically converted into nutrients for leafy greens, herbs, and fruiting vegetables.",
    typicalVolume: "20 - 200 m³",
    stockingDensity: "20 - 45 kg/m³",
    iconName: "Sprout",
    linkPath: "/aquaponics-farming",
    color: "teal"
  },
  {
    id: "hatchery",
    name: "Fish Hatchery & Nursery",
    shortName: "Hatchery",
    tagline: "Egg incubation, larval rearing, and fingerling staging",
    description: "Precision-controlled breeding tanks, spawning pools, gentle incubation jars, and nursery rearing systems requiring pristine water quality and micron-level hygiene.",
    typicalVolume: "5 - 50 m³",
    stockingDensity: "Variable (500 - 5,000 fry/m³)",
    iconName: "HeartPulse",
    linkPath: "/ourservices",
    color: "amber"
  },
  {
    id: "cage",
    name: "Cage Aquaculture (Reservoir / Lake)",
    shortName: "Cage Farming",
    tagline: "Open-water reservoir and lake culture in floating HDPE pens",
    description: "Floating square or circular net enclosures deployed in reservoirs, lakes, or protected coastal bays utilizing natural water currents for oxygen replenishment.",
    typicalVolume: "100 - 1,000 m³ per cage",
    stockingDensity: "20 - 40 kg/m³",
    iconName: "Boxes",
    linkPath: "/pond-farming",
    color: "indigo"
  }
];

export interface EquipmentCategoryMeta {
  id: EquipmentCategory;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
}

export const EQUIPMENT_CATEGORIES: EquipmentCategoryMeta[] = [
  {
    id: "aeration",
    name: "Aeration & Oxygenation",
    shortName: "Aeration",
    tagline: "Dissolved oxygen supply and water-column gas exchange",
    description: "Blowers, paddle wheels, micro-bubble diffusers, and pure oxygen injection systems critical for fish respiration and bacterial nitrification.",
    iconName: "Wind"
  },
  {
    id: "pumping",
    name: "Water Circulation & Pumping",
    shortName: "Pumping",
    tagline: "Hydraulic flow, continuous circulation, and dewatering",
    description: "Submersible circulation pumps, fish-friendly impeller transfer pumps, and bottom sludge extraction units.",
    iconName: "Droplets"
  },
  {
    id: "filtration",
    name: "Mechanical & Biological Filtration",
    shortName: "Filtration",
    tagline: "Solid waste separation and bio-chemical nitrification",
    description: "Micro-screen rotary drum filters, MBBR biological reactors, rapid sand filters, and ultraviolet (UV) pathogen sanitizers.",
    iconName: "Filter"
  },
  {
    id: "monitoring",
    name: "Water Quality & Telemetry",
    shortName: "Monitoring",
    tagline: "Real-time parameter measurement and diagnostic testing",
    description: "Optical dissolved oxygen meters, continuous digital pH/temperature probes, and photometric ammonium-nitrite chemical analyzers.",
    iconName: "Activity"
  },
  {
    id: "feeding",
    name: "Feeding Automation & Milling",
    shortName: "Feeding",
    tagline: "Scheduled feed dispensing and on-farm feed production",
    description: "Programmable solar automatic feeders, on-farm pellet extruders, hammer mills, and horizontal ingredient mixers.",
    iconName: "Utensils"
  },
  {
    id: "handling",
    name: "Fish Handling & Harvesting",
    shortName: "Handling",
    tagline: "Size grading, low-stress transfer, and seine harvesting",
    description: "Mechanical bar fish graders, knotless harvest nets, insulated live hauling transport tanks, and oxygenated transfer bins.",
    iconName: "PackageCheck"
  },
  {
    id: "processing",
    name: "Processing & Preservation",
    shortName: "Processing",
    tagline: "Post-harvest scaling, gutting, chilling, and cold chain",
    description: "Stainless steel descalers, ergonomic evisceration tables, flake ice machines, and PUF-insulated cold storage crates.",
    iconName: "Snowflake"
  }
];

export const EQUIPMENT_DATABASE: EquipmentItem[] = [
  // --------------------------------------------------------------------------
  // 1. AERATION & OXYGENATION
  // --------------------------------------------------------------------------
  {
    id: "eq-air-blower",
    slug: "air-blower",
    imageUrl: "/images/equipment/roots_air_blower.jpg",
    name: "Roots / Regenerative Ring Air Blower",
    category: "aeration",
    tagline: "Continuous high-volume low-pressure aeration for biofloc and RAS tanks",
    purpose: "Provides continuous non-pulsating pressurized air to submerged diffusers, keeping bacterial flocs in suspension and maintaining Dissolved Oxygen (DO) above 5.0 mg/L.",
    whyRequired: "In high-density Biofloc and RAS (>25 kg/m³), fish and nitrifying bacteria consume massive amounts of oxygen. If aeration stops for even 20-30 minutes, mass mortality ensues.",
    farmingSystems: ["biofloc", "ras", "hatchery", "aquaponics"],
    applicableSpecies: ["Tilapia", "Pangasius", "Mangur", "Shrimp", "Trout"],
    whenRequired: "Essential for any tank system deeper than 0.8m with stocking densities exceeding 15 kg/m³.",
    specificationGuidance: "Select based on required CFM (or LPM) and backpressure rating (mbar/kPa). For 1.2m water depth, ensure blower delivers rated output at ≥150 mbar backpressure.",
    sizingGuidance: "Standard sizing rule: 25 - 35 LPM (Liters Per Minute) of airflow per cubic meter of water, or approx. 1.0 - 1.5 HP per 50,000 Liters of culture water.",
    calculateRecommendedCapacity: (volM3, biomassKg) => {
      const lpm = Math.round(volM3 * 30);
      const cfm = Math.round(lpm / 28.317);
      const estHp = (volM3 / 35).toFixed(1);
      return {
        specification: `${lpm} LPM (${cfm} CFM) at 160-200 mbar`,
        unit: `${estHp} HP Continuous Duty Blower`,
        rationale: `Calculated for ${volM3} m³ volume (${biomassKg ? biomassKg + " kg biomass" : "normal biofloc load"}) at 30 LPM/m³ safety factor.`
      };
    },
    powerConsiderations: "Continuous 24/7 duty. Must be backed by an automatic generator (DG set) or inverter with auto-switchover within 60 seconds.",
    maintenanceGuidance: [
      "Clean air intake filter sponge weekly to avoid pressure drop and motor overheating.",
      "Check oil level in gear casings monthly (on Roots-type blowers).",
      "Inspect belt tension and alignment every 500 operating hours.",
      "Ensure ambient blower shelter temperature stays below 42°C with adequate ventilation."
    ],
    buyingChecklist: [
      "100% oil-free air delivery chamber to prevent toxic hydrocarbon poisoning of water.",
      "Cast iron or hard-anodized aluminum housing with IP55 rated TEFC copper-wound motor.",
      "Integrated pressure relief safety valve and check valve to prevent back-siphoning.",
      "Vibration dampening rubber mounting pads and flexible rubber connection sleeves."
    ],
    commonMistakes: [
      "Buying cheap vacuum-rated ring blowers unable to push against water head >1.0m.",
      "Operating without an intake filter, sucking abrasive dust into tight impellers.",
      "Omitting check valves, allowing water to back-siphon into the hot motor during power cuts."
    ],
    relatedCalculatorId: "volume",
    relatedArticlePath: "/bioflock",
    relatedArticleTitle: "Biofloc Ecology & Aeration Grid Setup",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-paddle-wheel",
    slug: "paddle-wheel-aerator",
    imageUrl: "/images/equipment/paddle_aerator.jpg",
    name: "Paddle Wheel Aerator (2HP / 4-Impeller)",
    category: "aeration",
    tagline: "Surface splashing, circular circulation, and rapid oxygenation for earthen ponds",
    purpose: "Mechanically breaks pond surface water into fine droplets for atmospheric gas exchange while generating directional currents that concentrate bottom sludge in the pond center.",
    whyRequired: "Earthen ponds suffer nocturnal dissolved oxygen crashes when phytoplankton cease photosynthesis. Paddle wheels prevent morning fish asphyxiation and de-stratify thermoclines.",
    farmingSystems: ["pond"],
    applicableSpecies: ["Rohu", "Catla", "Tilapia", "Pangasius", "Shrimp"],
    whenRequired: "Indispensable in semi-intensive and intensive earthen ponds exceeding 5 tons harvest biomass per hectare.",
    specificationGuidance: "Standard units: 2 HP (1.5 kW), 4-impeller or 6-impeller with nylon/PP blades, bevel gear or worm gear reducer in SS304 frame.",
    sizingGuidance: "General sizing: 1.0 HP of paddle wheel aeration per 500 - 750 kg of fish/shrimp biomass, or 2 to 4 HP per acre depending on stocking intensity.",
    calculateRecommendedCapacity: (volM3, biomassKg) => {
      const estimatedHp = Math.max(1, Math.round((volM3 / 2500) * 2));
      return {
        specification: `${estimatedHp} HP Total (${Math.ceil(estimatedHp / 2)} × 2HP Units)`,
        unit: "4-Impeller Surface Aerators",
        rationale: `Provides surface dissolved oxygen transfer rate (SOTR) of 1.8 - 2.2 kg O₂/kWh across ${volM3} m³ surface.`
      };
    },
    powerConsiderations: "Operates primarily from 10:00 PM to 06:00 AM and during overcast afternoons. 3-phase 415V supply recommended for balanced grid load.",
    maintenanceGuidance: [
      "Grease movable shaft bearings with marine-grade waterproof grease every 15 days.",
      "Check gear reducer oil level monthly; change oil every 1,500 run hours.",
      "Inspect nylon blades for cracking or entangling filamentous algae.",
      "Ensure stainless steel frame bolts are torqued and sacrificial zinc anodes (if in brackish water) are intact."
    ],
    buyingChecklist: [
      "Heavy-duty SS304 or SS316 drive shafts and hardware.",
      "Virgin HDPE floats with UV-stabilization to prevent sun brittleness.",
      "Energy-efficient high-efficiency bevel helical gearbox (85-90% mechanical efficiency).",
      "Submersible-grade mechanical motor seal with thermal overload protection."
    ],
    commonMistakes: [
      "Using undersized worm gearboxes that overheat and seize within 3 months.",
      "Incorrect placement in pond, creating cross-currents that erode pond dikes instead of sweeping waste to the center drain.",
      "Relying on paddle wheels without nocturnal dissolved oxygen testing."
    ],
    relatedCalculatorId: "stocking",
    relatedArticlePath: "/pond-farming",
    relatedArticleTitle: "Earthen Pond Management & Aeration Positioning",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-diffusers",
    slug: "micro-pore-diffusers",
    imageUrl: "/images/equipment/diffuser_tubes.jpg",
    name: "Micro-Pore Diffuser Tubes & Ceramic Discs",
    category: "aeration",
    tagline: "Fine-bubble gas transfer elements for maximum standard oxygen transfer efficiency (SOTE)",
    purpose: "Disperses pressurized air into millions of microscopic bubbles (<1-2mm diameter), dramatically maximizing air-water contact surface area and dissolved oxygen absorption.",
    whyRequired: "Coarse bubbles escape the water column within 1 second with <3% oxygen transfer efficiency. Fine-bubble diffusers provide 12% - 20% transfer efficiency, cutting electricity consumption in half.",
    farmingSystems: ["biofloc", "ras", "hatchery", "aquaponics"],
    applicableSpecies: ["Tilapia", "Shrimp", "Mangur", "Trout", "Catla"],
    whenRequired: "Required whenever blowers or air pumps are deployed in tanks, sumps, or nursery incubation trays.",
    specificationGuidance: "EPDM rubber micro-pore tubing (16mm ID / 25mm OD) or 8-12 inch microporous ceramic discs with 3/4 inch NPT brass/SS threads.",
    sizingGuidance: "For circular biofloc tanks, install 1.0 to 1.5 meters of micro-pore tube per cubic meter of water, arranged in a spider-leg grid or concentric rings.",
    calculateRecommendedCapacity: (volM3) => {
      const tubeMeters = Math.round(volM3 * 1.2);
      const discCount = Math.ceil(volM3 / 3);
      return {
        specification: `${tubeMeters} meters of Aero-Tube OR ${discCount} × 9" EPDM Discs`,
        unit: "Fine Bubble Grid Assembly",
        rationale: `Ensures complete floor coverage and prevents anaerobic dead spots in ${volM3} m³ volume.`
      };
    },
    powerConsiderations: "Passive pneumatic equipment. Backpressure should be kept <30-40 mbar to prevent overloading air blowers.",
    maintenanceGuidance: [
      "Soak in 10% hydrochloric acid (HCl) or bleaching solution annually to dissolve mineral carbonate encrustation.",
      "Perform periodic high-pressure air burst (blowdown) to clear biofloc particulate settling on pores.",
      "Inspect ring clamps for corrosion and air leaks during tank inter-crop downtime."
    ],
    buyingChecklist: [
      "High-grade virgin EPDM or nano-porous polymer that resists hardening and bio-fouling.",
      "Heavy-duty weighted sinker rings (PVC coated iron or concrete ring) to keep grid firmly on tank bottom.",
      "Stainless steel 316 hose clamps to avoid toxic rust in aquaculture water."
    ],
    commonMistakes: [
      "Using lightweight unweighted tubes that float to the surface during operation.",
      "Drilling holes manually in PVC pipes (coarse bubbles waste 95% of aeration energy).",
      "Allowing dead biological sludge to dry inside pores during tank drainage."
    ],
    relatedCalculatorId: "volume",
    relatedArticlePath: "/bioflock",
    relatedArticleTitle: "Aeration Grid Calculation & Assembly",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-oxygen-cone",
    slug: "oxygen-cone-saturator",
    imageUrl: "/images/equipment/oxygen_cone.jpg",
    name: "Downflow Pure Oxygen Saturator Cone",
    category: "aeration",
    tagline: "Super-saturates water with pure oxygen for ultra-high-density RAS (>60 kg/m³)",
    purpose: "Dissolves pure gaseous oxygen (from PSA generators or liquid O₂ cylinders) into water under pressure, achieving dissolved oxygen saturation levels of 150% to 300% (20 - 30 mg/L).",
    whyRequired: "Atmospheric air contains only 21% oxygen. In intensive salmonid, seabass, or super-intensive tilapia RAS, ambient air cannot supply the biological oxygen demand without extreme turbulence.",
    farmingSystems: ["ras", "hatchery"],
    applicableSpecies: ["Trout", "Tilapia", "Seabass", "Sturgeon"],
    whenRequired: "Indispensable in commercial RAS holding over 50 kg biomass per m³, or during live fish transport hauling.",
    specificationGuidance: "Fiberglass (FRP) vessel rated for 1.5 - 2.5 bar operating pressure with transparent acrylic observation window and auto-vent valve.",
    sizingGuidance: "Sized based on system side-stream flow: typically treats 15% to 30% of main recirculation loop flow.",
    powerConsiderations: "Operates in conjunction with a dedicated pressure booster pump (1.5 - 3.0 bar head).",
    maintenanceGuidance: [
      "Check automatic gas purge bleed valve monthly for bio-slime accumulation.",
      "Inspect pressure gauge and relief valve every 3 months.",
      "Calibrate pure oxygen flow rotameter quarterly."
    ],
    buyingChecklist: [
      "Seamless filament-wound FRP construction rated for continuous hydrostatic pressure.",
      "High-purity oxygen-compatible brass/bronze check valves.",
      "Integrated side-stream venturi injector for primary micro-gas dispersion."
    ],
    commonMistakes: [
      "Injecting pure oxygen through open stones (90% wastes into the atmosphere).",
      "Operating at insufficient water velocity, causing bubble pocketing at cone peak."
    ],
    relatedCalculatorId: "stocking",
    relatedArticlePath: "/aquaponic",
    relatedArticleTitle: "Pure Oxygen Injection & Mass Balance",
    importanceTier: "Advanced / Commercial"
  },

  // --------------------------------------------------------------------------
  // 2. WATER CIRCULATION & PUMPING
  // --------------------------------------------------------------------------
  {
    id: "eq-submersible-pump",
    slug: "submersible-water-pump",
    imageUrl: "/images/equipment/axial_flow_pump.jpg",
    name: "Submersible Low-Head Axial/Vortex Circulation Pump",
    category: "pumping",
    tagline: "High-volume, low-energy continuous water movement for RAS and aquaponics",
    purpose: "Lifts and circulates water continuously from the collection sump back through filters and fish culture tanks 1 to 2 times every hour.",
    whyRequired: "Continuous water movement prevents metabolic waste accumulation, delivers filtered oxygenated water, and powers gravity flow through biofilters and UV sanitizers.",
    farmingSystems: ["ras", "aquaponics", "biofloc", "hatchery"],
    applicableSpecies: ["Tilapia", "Trout", "Carp", "Catfish", "Shrimp"],
    whenRequired: "Fundamental equipment for all recirculating, sump-based, and flow-through aquaculture installations.",
    specificationGuidance: "Low-head, high-discharge axial-flow submersible pumps (2.0 - 5.0 meters head). Avoid high-pressure borewell pumps that waste 80% of power on unneeded head pressure.",
    sizingGuidance: "System flow rate must equal 100% of total farm water volume every 45 to 60 minutes. Example: A 100 m³ farm requires a pump rated for 100 - 130 m³/hr at 2.5m head.",
    calculateRecommendedCapacity: (volM3) => {
      const flowRateM3H = Math.round(volM3 * 1.2);
      const estWatts = Math.round(flowRateM3H * 18);
      return {
        specification: `${flowRateM3H} m³/hour (at 2.5 - 3.5m Head)`,
        unit: `${(estWatts / 1000).toFixed(2)} kW High-Flow Axial Pump`,
        rationale: `Ensures 100% complete water turnover every 50 minutes for ${volM3} m³ system volume.`
      };
    },
    powerConsiderations: "Continuous 24/7/365 electrical draw. Selecting high-efficiency motors (IE3/IE4) saves tens of thousands of rupees annually in electricity tariffs.",
    maintenanceGuidance: [
      "Inspect impeller chamber every 2 months for snail shells, hair, or fibrous debris.",
      "Check mechanical silicon carbide face seal for leakage annually.",
      "Monitor motor winding thermal temperature and amp draw."
    ],
    buyingChecklist: [
      "Ceramic or silicon carbide shaft and bearings resistant to abrasive aquatic particulates.",
      "Thermal overload protection built into stator windings.",
      "Non-corrosive composite or SS304 casing suited for freshwater and brackish salinity."
    ],
    commonMistakes: [
      "Using high-pressure agricultural monoblock pumps: consuming 5 kW where a 1 kW axial pump delivers equal flow.",
      "Placing pumps directly inside fish tanks without protective suction screens, leading to fish ingestion."
    ],
    relatedCalculatorId: "volume",
    relatedArticlePath: "/aquaponic",
    relatedArticleTitle: "Hydraulic Retention & Pump Turnover Sizing",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-fish-transfer-pump",
    slug: "fish-transfer-pump",
    imageUrl: "/images/equipment/fish_transfer_pump.jpg",
    name: "Non-Clog Gentle Fish Transfer Pump",
    category: "pumping",
    tagline: "High-capacity vacuum & vortex fish transport with zero scale damage or stress",
    purpose: "Hydraulically moves live fingerlings and market-sized fish from culture tanks to grading tables, harvesting trucks, or distant ponds without netting stress or physical injury.",
    whyRequired: "Manual harvesting and grading with hand nets scales down commercial efficiency, strips mucus membranes, causes skin abrasions, and induces fatal fungal infections.",
    farmingSystems: ["ras", "pond", "cage", "hatchery"],
    applicableSpecies: ["Tilapia", "Trout", "Catfish", "Carp", "Pangasius"],
    whenRequired: "Commercial hatcheries and farms harvesting over 10 tons annually or staging routine fingerling grading.",
    specificationGuidance: "Pneumatic vacuum chamber pump or gentle recessed vortex impeller pump (4 inch to 8 inch hose diameter) handling fish from 5g fingerlings to 2.5kg adults.",
    sizingGuidance: "6-inch mobile trailered unit moves up to 5 - 10 tons of live fish per hour with water-to-fish ratio of 3:1.",
    powerConsiderations: "Intermittent operation during harvesting and grading days. Powered by electric gear motor (3HP - 7.5HP) or mobile diesel engine.",
    maintenanceGuidance: [
      "Sanitize inner suction hoses and priming chambers with food-grade disinfectant post-operation.",
      "Inspect intake cam-lock gaskets and vacuum seals before each harvest batch.",
      "Check impeller clearance and lubricating grease levels."
    ],
    buyingChecklist: [
      "Mirror-polished cast aluminum or marine stainless wet end with smooth internal radiuses.",
      "Variable speed drive (VFD) to tune water velocity precisely to fish size.",
      "Quick-disconnect spiral suction hoses with smooth food-grade interior walls."
    ],
    commonMistakes: [
      "Using standard trash pumps with sharp impellers that decapitate or mutilate live fish.",
      "Excessive suction head lift (>2.5m), causing decompression trauma and swim bladder rupture."
    ],
    relatedCalculatorId: "stocking",
    relatedArticlePath: "/ourservices",
    relatedArticleTitle: "Harvest Logistics & Mechanical Fish Handling",
    importanceTier: "Advanced / Commercial"
  },
  {
    id: "eq-sludge-pump",
    slug: "sludge-dewatering-pump",
    imageUrl: "/images/equipment/sludge_pump.jpg",
    name: "Heavy-Duty Vortex Sludge & Dewatering Pump",
    category: "pumping",
    tagline: "Extracts concentrated settleable fish feces and anaerobic bottom sludge",
    purpose: "Pumps thick, semi-solid organic waste, biofloc settleable solids, and pond bottom silt from central drains and sedimentation sumps to drying beds or biogas digesters.",
    whyRequired: "Accumulated fish feces decay anaerobically, producing hydrogen sulfide ($H_2S$) and depleting oxygen. Routine bottom purging preserves pristine water conditions.",
    farmingSystems: ["biofloc", "ras", "pond"],
    applicableSpecies: ["Tilapia", "Catfish", "Pangasius", "Carp"],
    whenRequired: "Essential for central drain purges in biofloc tanks and drum filter backwash sludge sumps.",
    specificationGuidance: "Vortex non-clog impeller capable of passing spherical solids up to 35mm - 50mm diameter without clogging.",
    sizingGuidance: "0.75 kW - 1.5 kW submersible vortex pump with cast iron casing and tungsten carbide mechanical seals.",
    powerConsiderations: "Intermittent automatic duty controlled by float switches or timer relays (runs 2-5 minutes every 6 hours).",
    maintenanceGuidance: [
      "Flush pump with clean water after clearing heavy sludge.",
      "Inspect lower oil chamber for emulsion indicating seal wear."
    ],
    buyingChecklist: [
      "High-chrome vortex impeller resistant to grit and sand abrasion.",
      "Dual silicon carbide mechanical seals with oil bath isolation."
    ],
    commonMistakes: [
      "Using clean-water drainage pumps that instantly choke on fibrous fish feces and feed fines."
    ],
    relatedCalculatorId: "carbon",
    relatedArticlePath: "/bioflock",
    relatedArticleTitle: "Sludge Settling & Bottom Drain Purge",
    importanceTier: "Highly Recommended"
  },
  {
    id: "eq-pond-bottom-cleaner",
    slug: "pond-bottom-sludge-cleaner",
    imageUrl: "/images/equipment/pond_bottom_dredger.jpg",
    name: "Submersible Pond Bottom Sludge Cleaner & Dredger",
    category: "pumping",
    tagline: "Extracts anoxic black sediment, unconsumed feed decay, and toxic hydrogen sulfide (H2S) deposits",
    purpose: "Specialized suction dredge designed to glide along the floor of earthen fish ponds and large tanks, removing thick organic sludge blankets without requiring pond dewatering.",
    whyRequired: "Accumulated uneaten feed, algal detritus, and fish waste create anoxic dead zones on the pond floor. Under anaerobic conditions, sulfate-reducing bacteria produce hydrogen sulfide (H2S), lethal to bottom-dwelling carp, catfish, and shrimp at >0.03 mg/L.",
    farmingSystems: ["pond", "biofloc", "hatchery"],
    applicableSpecies: ["Rohu", "Catla", "Mrigal", "Pangasius", "Shrimp", "Tilapia"],
    whenRequired: "Recommended for commercial earthen ponds and nursery conditioning ponds after every production cycle or when bottom black soil depth exceeds 5 cm.",
    specificationGuidance: "2.2 kW to 3.7 kW (3 HP to 5 HP) heavy-duty slurry pump with tungsten-carbide mechanical face seals, vortex cutting impeller capable of pumping 30% solids by volume, and floating pontoons or telescopic guiding booms.",
    sizingGuidance: "Standard pond unit processes 25 to 50 m³/hour of sludge slurry, clearing a 1-acre earthen pond sediment hotspot in 4 to 6 operating hours.",
    calculateRecommendedCapacity: (volM3) => {
      const sludgeFlowM3H = Math.max(25, Math.round(volM3 / 100));
      return {
        specification: `${sludgeFlowM3H} m³/hour Sludge Dredging Capacity (3" Discharge)`,
        unit: "Heavy-Duty Vortex Cutter Sludge Cleaner",
        rationale: `Clears toxic benthic sediment blankets and restores natural water depth for ${volM3} m³ pond system.`
      };
    },
    powerConsiderations: "Operates on 415V 3-phase industrial power or standard farm diesel generator set (5 kVA to 7.5 kVA).",
    maintenanceGuidance: [
      "Flush cutter impeller and spiral volute casing with freshwater immediately after each dredging run to prevent dried mud hardening.",
      "Check oil chamber quarterly for moisture intrusion past the mechanical seals.",
      "Sharpen or replace tungsten cutter blades after 500 operating hours in sandy soil."
    ],
    buyingChecklist: [
      "High-chromium alloy vortex cutter impeller resistant to sand and clay silt abrasion.",
      "Thermal motor overload sensor preventing burnout if buried under heavy muck collapses.",
      "Flexible crush-proof helix suction and discharge delivery hoses with quick-camlock couplings."
    ],
    commonMistakes: [
      "Using standard dewatering water pumps with enclosed impellers that immediately jam on thick pond bottom clay.",
      "Dredging during peak afternoon heat when disturbing sediment depletes already stressed dissolved oxygen in the water column."
    ],
    relatedCalculatorId: "volume",
    relatedArticlePath: "/pond-farming",
    relatedArticleTitle: "Earthen Pond Bottom Rehabilitation & Soil Chemistry",
    importanceTier: "Highly Recommended"
  },

  // --------------------------------------------------------------------------
  // 3. MECHANICAL & BIOLOGICAL FILTRATION
  // --------------------------------------------------------------------------
  {
    id: "eq-drum-filter",
    slug: "automatic-rotary-drum-filter",
    imageUrl: "/images/equipment/drum_filter.jpg",
    name: "Automatic Micro-Screen Rotary Drum Filter",
    category: "filtration",
    tagline: "High-efficiency primary solid-liquid separation removing particles down to 40-70 microns",
    purpose: "Continuously captures and automatically rinses out suspended fish feces, uneaten feed fragments, and detached biofilm before they dissolve into toxic ammonia and organic BOD.",
    whyRequired: "Solids contribute over 70% of the biochemical oxygen demand (BOD) in RAS. Removing them intact via a drum filter reduces biofilter load and clears water turbidity.",
    farmingSystems: ["ras", "hatchery", "aquaponics"],
    applicableSpecies: ["Trout", "Tilapia", "Seabass", "Sturgeon", "Carp"],
    whenRequired: "Mandatory for commercial RAS exceeding 15 tons annual production capacity.",
    specificationGuidance: "Filter screen mesh: 40 to 60 microns (SS316 woven mesh). Flow capacity rating must exceed maximum system flow by at least 25% safety margin.",
    sizingGuidance: "Size based on hydraulic flow rate ($m^3/hr$) under peak feeding loads: e.g., a 100 m³ farm running 1.2 turnovers/hr requires a drum filter rated for at least 150 m³/hr.",
    calculateRecommendedCapacity: (volM3) => {
      const minFlow = Math.round(volM3 * 1.3);
      return {
        specification: `${minFlow} m³/hour Hydraulic Capacity (40-60 Micron Mesh)`,
        unit: "Stainless Steel 304/316 Automatic Drum Filter",
        rationale: `Handles peak post-feeding particulate loading with automated backwash pressure spray.`
      };
    },
    powerConsiderations: "Drum rotation motor (0.18 - 0.37 kW) and high-pressure backwash pump (0.75 - 1.5 kW) operate intermittently triggered by water level sensors.",
    maintenanceGuidance: [
      "Inspect high-pressure spray nozzles weekly for mineral clogging.",
      "Clean filter mesh panels with 5% oxalic acid or pressure washer monthly to remove bio-grease.",
      "Check drum drive chain/gear tension and lubricate food-grade drive points."
    ],
    buyingChecklist: [
      "All wetted parts in SS304/SS316 or heavy polypropylene (PP) casing.",
      "Automated optical or conductive level sensor switch with manual test override.",
      "Easy-replacement modular curved screen panels rather than glued-on mesh."
    ],
    commonMistakes: [
      "Sizing drum filter exactly to water flow without accounting for heavy post-feeding feces blinding the mesh, leading to continuous backwashing.",
      "Using cheap brass spray nozzles that corrode and distort spray fan angles."
    ],
    relatedCalculatorId: "volume",
    relatedArticlePath: "/aquaponic",
    relatedArticleTitle: "Mechanical Drum Filtration Engineering",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-biofilter-mbbr",
    slug: "mbbr-biofilter-reactor",
    imageUrl: "/images/equipment/mbbr_biofilter.jpg",
    name: "Moving Bed Biofilm Reactor (MBBR) & Media",
    category: "filtration",
    tagline: "Biological nitrification converting toxic ammonia into harmless nitrate",
    purpose: "Houses trillions of beneficial autotrophic nitrifying bacteria (*Nitrosomonas* and *Nitrobacter*) on suspended polyethylene media to oxidize toxic ammonia ($NH_3$) into nitrite ($NO_2^-$) and nitrate ($NO_3^-$).",
    whyRequired: "Fish excrete ammonia directly across their gills. Without active biofiltration in a closed RAS, ambient ammonia climbs to lethal thresholds within 24 to 48 hours.",
    farmingSystems: ["ras", "aquaponics", "hatchery"],
    applicableSpecies: ["Tilapia", "Trout", "Pangasius", "Catfish", "Carp"],
    whenRequired: "Indispensable core component of all Recirculating Aquaculture Systems and closed nursery hatcheries.",
    specificationGuidance: "Virgin HDPE K1, K3, or Kaldnes-style media with high protected specific surface area (600 - 1,000 $m^2/m^3$). Aeration grid keeps media in continuous fluid suspension.",
    sizingGuidance: "Rule of thumb: 1 $m^3$ of active K1 media (at 50% filling fraction) safely removes approximately 400 - 500 grams of Total Ammonia Nitrogen (TAN) daily at 25°C.",
    calculateRecommendedCapacity: (volM3, biomassKg) => {
      // Estimated daily feed = ~2% of biomass, protein ~32%, TAN = feed * 0.03
      const estBiomass = biomassKg || (volM3 * 35);
      const estFeedKg = estBiomass * 0.02;
      const tanGrams = Math.round(estFeedKg * 30);
      const mediaVolumeM3 = (tanGrams / 450).toFixed(2);
      const tankVolumeM3 = (parseFloat(mediaVolumeM3) * 2.0).toFixed(1);
      return {
        specification: `${mediaVolumeM3} m³ K1/K3 Media in ${tankVolumeM3} m³ Reactor Chamber`,
        unit: "Aerated MBBR Biological Filter Tank",
        rationale: `Nitrifies ~${tanGrams}g of daily TAN generated by ~${estFeedKg.toFixed(1)}kg daily feed load.`
      };
    },
    powerConsiderations: "Biofilter requires dedicated coarse-bubble bottom aeration grid operating 24/7 to supply 4.57g of $O_2$ per gram of ammonia oxidized and maintain media tumbling.",
    maintenanceGuidance: [
      "Verify media fluidization daily; ensure no dead stagnant corners.",
      "Check pH and total alkalinity daily; dose sodium bicarbonate ($NaHCO_3$) to maintain pH 7.2 - 7.6 (nitrification consumes 7.14g alkalinity per g TAN).",
      "Backflush / bottom-purge accumulated sloughed bio-floc monthly."
    ],
    buyingChecklist: [
      "100% virgin high-density polyethylene (HDPE) media with specific gravity 0.94-0.96 (neutral buoyancy).",
      "Avoid recycled plastic media that sinks or leaches toxic phthalates into culture water.",
      "Heavy-duty retention screens (wedge-wire or slotted pipe) to prevent media escape into pump sumps."
    ],
    commonMistakes: [
      "Packing biofilter beyond 65% media filling volume, causing media to lock up into a solid floating mat.",
      "Allowing alkalinity to drop below 80 mg/L $CaCO_3$, which abruptly stalls bacterial nitrification.",
      "Introducing ozone or antibiotics directly upstream into the active biofilter."
    ],
    relatedCalculatorId: "feed",
    relatedArticlePath: "/aquaponic",
    relatedArticleTitle: "Biofilter Sizing & Nitrification Kinetics",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-uv-sterilizer",
    slug: "uv-c-water-sterilizer",
    imageUrl: "/images/equipment/uv_water_sterilizer.jpg",
    name: "Industrial Germicidal UV-C Water Sterilizer",
    category: "filtration",
    tagline: "Pathogen and protozoan disinfection with zero chemical residue",
    purpose: "Emits 254 nm germicidal ultraviolet radiation through quartz sleeves to disrupt pathogen DNA/RNA, eradicating pathogenic bacteria (*Aeromonas*, *Vibrio*), viruses, and free-swimming parasites.",
    whyRequired: "Intensive closed culture water concentrates infectious disease vectors. UV sterilization stops disease transmission between connected tanks without adding harmful chemicals.",
    farmingSystems: ["ras", "hatchery", "aquaponics"],
    applicableSpecies: ["Tilapia", "Trout", "Seabass", "Shrimp", "Ornamental Fish"],
    whenRequired: "Essential for hatcheries, quarantine stations, and closed-loop RAS holding high-value broodstock or fingerlings.",
    specificationGuidance: "Low-pressure high-output (LPHO) or amalgam lamps providing minimum germicidal dosage of 30 - 45 mJ/cm² ($30,000 - 45,000 \\mu W\\cdot s/cm^2$) at end of lamp life.",
    sizingGuidance: "Size according to maximum flow rate and water clarity (UV transmittance %): e.g. 100 m³/hr clean water flow requires ~400W - 800W UV system.",
    powerConsiderations: "Continuous electrical draw matching lamp wattage (e.g. 240W to 1,200W). Electronic ballasts with digital run-hour timers.",
    maintenanceGuidance: [
      "Clean quartz sleeves of mineral scaling every 3-6 months using mild citric acid.",
      "Replace UV lamps every 9,000 to 12,000 operating hours (output degrades after 1 year).",
      "Inspect EPDM O-rings during lamp changes for heat embrittlement."
    ],
    buyingChecklist: [
      "Corrosion-proof 316L stainless steel or UV-stabilized UPVC/HDPE reaction chamber.",
      "High-transmittance pure fused quartz protective sleeves.",
      "Visual lamp operation LEDs and integrated run-time hour counter."
    ],
    commonMistakes: [
      "Installing UV unit before mechanical filtration: turbid water and suspended feces shadow bacteria from UV rays.",
      "Using cheap pond clarifier UVs delivering only 10 mJ/cm², which only clear green algae but fail to kill fish pathogens."
    ],
    relatedCalculatorId: "treatment",
    relatedArticlePath: "/fish-diseases",
    relatedArticleTitle: "Biosecurity Protocols & Water Disinfection",
    importanceTier: "Highly Recommended"
  },
  {
    id: "eq-protein-skimmer",
    slug: "protein-skimmer-fractionator",
    imageUrl: "/images/equipment/protein_skimmer.jpg",
    name: "Commercial Protein Skimmer / Foam Fractionator",
    category: "filtration",
    tagline: "Extracts dissolved proteins, lipids, and fine colloidal organics via micro-bubbles",
    purpose: "Injects dense micro-bubbles into a contact column; dissolved organic surfactants and protein molecules adhere to bubble surfaces and rise into a foam collection cup for disposal.",
    whyRequired: "Dissolved organic matter cannot be trapped by mechanical drum filters and creates yellowish water discoloration, bad odors, and fuel for heterotrophic bacteria spikes.",
    farmingSystems: ["ras", "hatchery", "cage"],
    applicableSpecies: ["Trout", "Tilapia", "Seabass", "Shrimp"],
    whenRequired: "Especially valuable in brackish/saline aquaculture and high-density freshwater RAS with intensive feeding.",
    specificationGuidance: "Heavy-duty acrylic or polypropylene counter-current column with venturi injector and automated wash-down top spray ring.",
    sizingGuidance: "Sized to treat 50% - 100% of total system volume every 2 to 3 hours.",
    powerConsiderations: "Powered by a dedicated venturi booster pump (0.75 - 2.2 kW) or side-stream aeration injector.",
    maintenanceGuidance: [
      "Rinse collection cup and riser neck weekly to remove accumulated protein grease.",
      "Clean venturi air-intake nozzle to prevent salt crusting."
    ],
    buyingChecklist: [
      "Self-cleaning top washdown nozzle to maintain clean column neck without manual scrubbing.",
      "Ozone-resistant materials (PVDF / acrylic) for optional ozone contact enhancement."
    ],
    commonMistakes: [
      "Expecting freshwater foam fractionation to work with standard coarse air stones (freshwater requires fine venturis or ozone addition)."
    ],
    relatedCalculatorId: "volume",
    relatedArticlePath: "/aquaponic",
    relatedArticleTitle: "Dissolved Organic Removal & Water Clarity",
    importanceTier: "Highly Recommended"
  },
  {
    id: "eq-all-in-one-ras-skid",
    slug: "all-in-one-indoor-ras-skid",
    imageUrl: "/images/equipment/ras_filtration_skid.jpg",
    name: "All-In-One Compact Modular Indoor RAS Skid",
    category: "filtration",
    tagline: "Factory pre-plumbed plug-and-play filtration station uniting drum filter, protein skimmer, MBBR & UV",
    purpose: "Provides complete turnkey water treatment for closed-loop indoor fish culture: strips solids to 50 microns, separates dissolved proteins, oxidizes ammonia through aerated K1 media, and sterilizes pathogens via ultraviolet light on a single integrated base frame.",
    whyRequired: "Site-plumbed RAS systems frequently suffer from hydraulic piping friction miscalculations, pipe head loss imbalances, and prolonged construction times. A pre-engineered skid eliminates engineering guesswork and connects directly to fish tanks with two union couplings.",
    farmingSystems: ["ras", "hatchery", "aquaponics"],
    applicableSpecies: ["Tilapia", "Trout", "Seabass", "Pangasius", "Ornamental Fish"],
    whenRequired: "Ideal for indoor urban aquaculture, hatchery quarantine units, research labs, and commercial RAS rearing tanks between 10 m³ and 60 m³.",
    specificationGuidance: "Rotary drum filter (SS316, 50 micron, 15–45 m³/hr), venturi-injected counter-current protein fractionator, 300L aerated moving bed bio-reactor with virgin K1 media, inline amalgam UV-C reactor (75W–150W), and energy-efficient frequency-variable water circulation pump.",
    sizingGuidance: "Size based on total water volume turnover: the skid must recycle 100% to 150% of the connected tank volume every hour.",
    calculateRecommendedCapacity: (volM3, biomassKg) => {
      const requiredTurnoverM3H = Math.round(volM3 * 1.25);
      return {
        specification: `${requiredTurnoverM3H} m³/hour Integrated Multi-Stage Skid Flow`,
        unit: "Compact Plug-and-Play RAS Filtration Station",
        rationale: `Provides 100% hourly mechanical, biological, fractionation, and UV disinfection for ${volM3} m³ rearing volume.`
      };
    },
    powerConsiderations: "Total integrated electrical load: 1.2 kW to 2.8 kW. Compatible with 220V single-phase or 415V 3-phase depending on pump specifications.",
    maintenanceGuidance: [
      "Inspect high-pressure drum backwash nozzles weekly for scale deposits.",
      "Check MBBR aeration fluidization daily to confirm continuous media movement with zero stagnant dead zones.",
      "Clean quartz sleeve of UV sterilizer every 60 days using dilute citric acid to maintain 254nm germicidal transmission."
    ],
    buyingChecklist: [
      "Rigid corrosion-proof welded polypropylene (PP) or 304 stainless structural base skid.",
      "Integrated electrical control panel with IP65 waterproof housing and pump run-dry protection.",
      "Transparent sight ports on protein skimmer and bio-filter to monitor foam collection and biofilm growth."
    ],
    commonMistakes: [
      "Feeding fish beyond the biological capacity of the K1 chamber before bacterial colonization has matured (allow 21-28 days cycling before peak stocking).",
      "Operating without a backup power UPS/generator, causing biological bacteria death during extended power interruptions."
    ],
    relatedCalculatorId: "volume",
    relatedArticlePath: "/aquaponic",
    relatedArticleTitle: "Modular Indoor RAS Engineering & Design",
    importanceTier: "Essential (Core)"
  },

  // --------------------------------------------------------------------------
  // 4. WATER QUALITY & TELEMETRY
  // --------------------------------------------------------------------------
  {
    id: "eq-do-meter",
    slug: "optical-dissolved-oxygen-meter",
    imageUrl: "/images/equipment/dissolved_oxygen_meter.jpg",
    name: "Optical Dissolved Oxygen (DO) Meter & Probe",
    category: "monitoring",
    tagline: "High-precision luminescent optical DO measurement with zero membrane maintenance",
    purpose: "Measures dissolved oxygen concentration (mg/L or ppm) and saturation percentage in culture water within seconds, alerting farmers to lethal low-oxygen events.",
    whyRequired: "Oxygen is the most critical limiting factor in fish farming. Drops below 4.0 mg/L halt feeding and growth; drops below 2.0 mg/L kill entire ponds within hours.",
    farmingSystems: ["biofloc", "ras", "pond", "aquaponics", "hatchery", "cage"],
    applicableSpecies: ["Tilapia", "Rohu", "Catla", "Pangasius", "Shrimp", "Trout"],
    whenRequired: "Essential daily management tool for any commercial fish farm operating beyond hobby scale.",
    specificationGuidance: "Luminescent Optical DO technology (LDO). Optical sensors do not consume oxygen during measurement, require no electrolyte refills, and withstand biofloc sludge.",
    sizingGuidance: "Handheld portable field meter with 3-meter or 5-meter submersible reinforced cable.",
    powerConsiderations: "Rechargeable Li-ion battery or standard AA batteries providing >100 hours of continuous field testing.",
    maintenanceGuidance: [
      "Wipe optical sensor cap with a soft wet cloth after testing in biofloc tanks.",
      "Perform simple 100% water-saturated air calibration every 2-4 weeks.",
      "Replace optical sensor cap every 12 to 24 months."
    ],
    buyingChecklist: [
      "IP67 waterproof rugged casing that floats if dropped into fish ponds.",
      "Built-in automatic temperature compensation (ATC) and salinity compensation.",
      "Instant dual reading: dissolved oxygen in mg/L (ppm) and saturation percentage (%)."
    ],
    commonMistakes: [
      "Buying cheap galvanometric membrane DO meters requiring finicky Teflon membrane replacement and electrolyte solution refills that fail in muddy ponds.",
      "Relying solely on visual fish surfacing behavior: by the time fish gasp at the surface, severe brain and gill damage has occurred."
    ],
    relatedCalculatorId: "treatment",
    relatedArticlePath: "/bioflock",
    relatedArticleTitle: "Dissolved Oxygen Benchmarks & Biofloc Respiration",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-ph-temp-meter",
    slug: "digital-ph-ec-temp-meter",
    imageUrl: "/images/equipment/water_tester.jpg",
    name: "Digital Multi-Parameter Water Quality Tester (pH / Temp / EC)",
    category: "monitoring",
    tagline: "Waterproof digital pocket tester for daily pH, conductivity, and temperature balance",
    purpose: "Monitors acidity/alkalinity balance (pH), water temperature, and dissolved ionic salts/nutrients (Electrical Conductivity) to ensure physiological equilibrium for aquatic species.",
    whyRequired: "pH fluctuations directly dictate toxic unionized ammonia proportions. At pH 8.5, ammonia is 10 times more toxic than at pH 7.2. Rapid pH drops indicate biofilter collapse.",
    farmingSystems: ["ras", "biofloc", "pond", "aquaponics", "hatchery"],
    applicableSpecies: ["Tilapia", "Rohu", "Catla", "Shrimp", "Trout"],
    whenRequired: "Essential daily testing instrument for every aquaculture farmer twice daily (morning and late afternoon).",
    specificationGuidance: "Digital multi-sensor probe measuring pH (0.00 - 14.00, ±0.05 accuracy), Temperature (0 - 50°C), and EC/TDS.",
    sizingGuidance: "Portable handheld pen or meter with replaceable glass bulb electrode.",
    powerConsiderations: "Standard button cell or AAA batteries with auto power-off.",
    maintenanceGuidance: [
      "Store probe tip in 3M KCl electrode storage solution; NEVER store in distilled or RO water.",
      "Perform 2-point buffer calibration (pH 4.01 and 7.00 or 10.01) monthly.",
      "Rinse glass bulb with clean water between sample readings."
    ],
    buyingChecklist: [
      "Replaceable electrode cartridge so the entire meter does not need discarding when the bulb ages.",
      "Automatic Temperature Compensation (ATC) to ensure correct pH readings across seasonal temperatures."
    ],
    commonMistakes: [
      "Allowing electrode to dry out in storage, permanently ruining the reference junction.",
      "Using aquarium test strips that have ±1.0 pH error margins and expire in humid farm conditions."
    ],
    relatedCalculatorId: "treatment",
    relatedArticlePath: "/feeding-management",
    relatedArticleTitle: "Water Parameter Thresholds & Species Safety",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-ammonia-test-kit",
    slug: "photometric-ammonia-test-kit",
    imageUrl: "/images/equipment/water_test_kit.jpg",
    name: "Aquaculture Chemical Photometer / Reagent Test Kit",
    category: "monitoring",
    tagline: "Laboratory-grade quantitative testing for Total Ammonia Nitrogen, Nitrite, and Nitrate",
    purpose: "Precisely measures dissolved nitrogenous metabolic wastes: Total Ammonia Nitrogen (TAN, 0 - 5.0 mg/L), Nitrite ($NO_2^-$, 0 - 2.0 mg/L), and Alkalinity ($CaCO_3$).",
    whyRequired: "Nitrite causes 'brown blood disease' by oxidizing hemoglobin into methemoglobin which cannot carry oxygen. Ammonia burns fish gills and destroys respiratory epithelium.",
    farmingSystems: ["ras", "biofloc", "aquaponics", "hatchery"],
    applicableSpecies: ["Tilapia", "Shrimp", "Pangasius", "Trout", "Catfish"],
    whenRequired: "Mandatory for startup tank cycling and at least twice-weekly monitoring in commercial production.",
    specificationGuidance: "Digital LED photometer or professional drop-titration liquid reagent kit. (Avoid unreliable 5-in-1 dip strips).",
    sizingGuidance: "Benchtop testing kit supporting 50 to 100 tests per reagent refill.",
    powerConsiderations: "Chemical test kit / battery-powered handheld photometer.",
    maintenanceGuidance: [
      "Store chemical reagents in a cool, dark cabinet away from direct sunlight.",
      "Rinse glass test cuvettes with sample water before testing and demineralized water after testing."
    ],
    buyingChecklist: [
      "Freshwater & saltwater compatible Nessler or Salicylate ammonia testing method.",
      "Certified expiration date on chemical reagent bottles at least 12 months in the future."
    ],
    commonMistakes: [
      "Misinterpreting Total Ammonia Nitrogen (TAN) without checking temperature and pH to calculate true toxic un-ionized ammonia ($NH_3$).",
      "Using expired test kits that falsely report zero ammonia while fish are dying."
    ],
    relatedCalculatorId: "carbon",
    relatedArticlePath: "/fish-diseases",
    relatedArticleTitle: "Diagnosing Ammonia and Nitrite Poisoning",
    importanceTier: "Essential (Core)"
  },

  // --------------------------------------------------------------------------
  // 5. FEEDING AUTOMATION & MILLING
  // --------------------------------------------------------------------------
  {
    id: "eq-auto-feeder",
    slug: "automatic-fish-feeder",
    imageUrl: "/images/equipment/auto_feeder.jpg",
    name: "Solar / Electric Programmable Automatic Fish Feeder",
    category: "feeding",
    tagline: "Frequent micro-rationing feeding automation to boost FCR and growth rates",
    purpose: "Disperses precise quantities of floating or sinking extruded pellets at scheduled intervals throughout the day using a high-speed centrifugal spreader or vibrating auger.",
    whyRequired: "Feeding small rations 6 to 12 times a day improves fish gut enzyme absorption, prevents feed wastage to tank bottoms, reduces FCR by 10-15%, and eliminates size disparity.",
    farmingSystems: ["ras", "biofloc", "pond", "cage"],
    applicableSpecies: ["Tilapia", "Pangasius", "Trout", "Shrimp", "Carp"],
    whenRequired: "Highly recommended for intensive operations managing multiple tanks or large commercial ponds.",
    specificationGuidance: "50kg - 120kg hopper capacity with 360-degree broadcast spinner (e.g. 5 - 12 meter throw radius in ponds) or down-drop funnel in tanks.",
    sizingGuidance: "1 feeder per 15,000 - 30,000 fish in ponds, or 1 dedicated 15kg - 30kg mini-feeder per indoor RAS/biofloc tank.",
    calculateRecommendedCapacity: (volM3, biomassKg) => {
      const estBiomass = biomassKg || (volM3 * 30);
      const dailyFeedKg = Math.round(estBiomass * 0.025);
      return {
        specification: `${dailyFeedKg} kg Daily Dispense Capacity`,
        unit: "Digital Timer Controlled Feeder",
        rationale: `Rations daily nutritional requirement into 8 automated feeding windows for ${estBiomass} kg fish biomass.`
      };
    },
    powerConsiderations: "12V DC battery with integrated monocrystalline solar panel, or standard 220V AC mains.",
    maintenanceGuidance: [
      "Inspect hopper lid seal to ensure rainwater never enters and clumps pellet feed.",
      "Clear feed fines and powder from spinner plate weekly.",
      "Lubricate electric motor shaft with silicone spray monthly."
    ],
    buyingChecklist: [
      "UV-stabilized virgin polyethylene hopper that prevents solar heat breakdown.",
      "Digital programmable timer with battery backup memory.",
      "Insect-proof and rodent-proof discharge chute design."
    ],
    commonMistakes: [
      "Allowing humid air to condense inside the hopper, causing feed to mold into toxic aflatoxin-bearing lumps.",
      "Over-feeding on overcast rainy days without checking water dissolved oxygen first."
    ],
    relatedCalculatorId: "fcr",
    relatedArticlePath: "/feeding-management",
    relatedArticleTitle: "Feed Conversion Ratio & Rationing Schedules",
    importanceTier: "Highly Recommended"
  },
  {
    id: "eq-feed-extruder",
    slug: "floating-feed-extruder",
    imageUrl: "/images/equipment/feed_extruder.jpg",
    name: "Small-Scale On-Farm Floating Feed Pellet Extruder",
    category: "feeding",
    tagline: "Produces floating and slow-sinking customized aquafeed pellets from local raw grains",
    purpose: "Cooks, gelatinizes, and expands conditioned raw feed dough under high temperature and pressure, cutting expanded floating pellets that stay buoyant for over 12 hours.",
    whyRequired: "Commercial bagged feed accounts for 65% to 75% of total aquaculture operational costs. Formulating feed on-farm using local ingredients cuts feed expense by ₹12 - ₹20 per kg.",
    farmingSystems: ["pond", "biofloc", "ras", "cage"],
    applicableSpecies: ["Tilapia", "Pangasius", "Carp", "Catfish"],
    whenRequired: "Commercial farms or farmer cooperatives harvesting over 30 tons of fish annually.",
    specificationGuidance: "Single-screw dry/wet extruder with capacity of 80 - 150 kg/hour, 15 HP - 25 HP 3-phase motor, with interchangeable pellet dies (1.0mm, 2.0mm, 3.0mm, 4.5mm).",
    sizingGuidance: "Small farm unit: 100 kg/hour outputs 800 kg of fresh feed in an 8-hour shift, enough to sustain 40 tons of growing fish biomass.",
    powerConsiderations: "Requires 3-phase industrial power (15 kW - 22 kW).",
    maintenanceGuidance: [
      "Disassemble and clean screw barrel immediately after each production run to prevent dough hardening.",
      "Inspect cutter blades and sharpen or replace weekly.",
      "Check barrel heating element thermocouples."
    ],
    buyingChecklist: [
      "Alloy steel screw barrel (38CrMoAlA) with nitriding surface hardening for long wear life.",
      "Independent variable-speed rotary pellet cutter motor to adjust pellet length.",
      "Temperature control cabinet with digital PID controllers."
    ],
    commonMistakes: [
      "Failing to grind raw ingredients fine enough (must pass through 60-mesh screen to avoid jamming extruder die).",
      "Using formulation with insufficient starch (<20%), resulting in pellets that sink immediately instead of floating."
    ],
    relatedCalculatorId: "feed",
    relatedArticlePath: "/feeding-management",
    relatedArticleTitle: "Formulating On-Farm Floating Fish Feed",
    importanceTier: "Advanced / Commercial"
  },

  // --------------------------------------------------------------------------
  // 6. FISH HANDLING & HARVESTING
  // --------------------------------------------------------------------------
  {
    id: "eq-fish-grader",
    slug: "mechanical-fish-grader",
    imageUrl: "/images/equipment/fish_grader.jpg",
    name: "Adjustable Aluminum Fish Grading Box & Bar Grader",
    category: "handling",
    tagline: "Fast size-sorting of fingerlings to prevent cannibalism and uniform market batches",
    purpose: "Allows smaller fish to swim freely through parallel spaced bars while retaining larger specimens, segregating batches into uniform size classes with minimal stress.",
    whyRequired: "Aggressive fish (such as Pangasius, Magur, Seabass, and Tilapia) exhibit cannibalism if fingerling sizes differ by >30%. Grading accelerates uniform feed competition.",
    farmingSystems: ["hatchery", "ras", "biofloc", "pond"],
    applicableSpecies: ["Tilapia", "Pangasius", "Mangur", "Trout", "Seabass"],
    whenRequired: "Essential in nurseries and fingerling rearing every 3 to 4 weeks during early growth phases.",
    specificationGuidance: "Anodized marine aluminum or PVC frame with smooth stainless steel rounded bars adjustable between 3mm to 35mm spacing.",
    sizingGuidance: "Floating grading cradle (60cm × 45cm) handling 2,000 - 5,000 fingerlings per batch in tank water.",
    powerConsiderations: "Manual floating operation or mechanical conveyor grader for large hatcheries.",
    maintenanceGuidance: [
      "Rinse with clean water and air dry in shade after grading.",
      "Disinfect with mild potassium permanganate ($KMnO_4$) solution between batches to prevent cross-contamination."
    ],
    buyingChecklist: [
      "Rounded, burr-free anodized bars that will not scratch fish cornea, gills, or scales.",
      "Accurate millimeter calibration scale engraved on adjuster screws."
    ],
    commonMistakes: [
      "Grading fish on dry land instead of in submerged water cradles, causing severe de-scaling and mortality."
    ],
    relatedCalculatorId: "stocking",
    relatedArticlePath: "/ourservices",
    relatedArticleTitle: "Fingerling Grading & Survival Optimization",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-harvest-nets",
    slug: "knotless-harvest-seine-nets",
    imageUrl: "/images/equipment/harvest_seine_net.jpg",
    name: "Knotless Nylon Seine & Pond Drag Nets",
    category: "handling",
    tagline: "High-strength knotless webbing for stress-free pond harvesting and sampling",
    purpose: "Encircles and concentrates live fish in ponds and reservoirs without stripping scale mucus or causing net burns.",
    whyRequired: "Knotted agricultural nets abrade fish skin, creating entry wounds for *Saprolegnia* fungus and *Aeromonas* ulcers during routine sampling and partial harvesting.",
    farmingSystems: ["pond", "cage", "biofloc"],
    applicableSpecies: ["Rohu", "Catla", "Tilapia", "Pangasius", "Carp"],
    whenRequired: "Essential for periodic biomass sampling, health checks, and complete market harvesting in ponds.",
    specificationGuidance: "High-tenacity knotless polyamide/nylon mesh (12mm - 32mm square mesh) with reinforced leaded sinker rope and EVA floating floats.",
    sizingGuidance: "Net length must be 1.3 to 1.5 times the pond width; net depth must be 1.5 times maximum pond depth to prevent fish swimming underneath.",
    powerConsiderations: "Manual pulling or tractor/winch assisted for nets >100 meters.",
    maintenanceGuidance: [
      "Never store wet nets in direct sunlight: UV radiation degrades nylon fibers.",
      "Mend broken mesh strands immediately with nylon twine."
    ],
    buyingChecklist: [
      "Genuine knotless weave with smooth interlock joints.",
      "Heavy weighted sinker line that hugs the pond floor tightly without snagging deep mud."
    ],
    commonMistakes: [
      "Using cheap knotted gill nets that gill and choke live fish during harvest.",
      "Dragging nets during midday heat when dissolved oxygen is stressed."
    ],
    relatedCalculatorId: "stocking",
    relatedArticlePath: "/pond-farming",
    relatedArticleTitle: "Pond Sampling & Safe Harvesting Protocol",
    importanceTier: "Essential (Core)"
  },
  {
    id: "eq-live-fish-transport-tank",
    slug: "insulated-live-fish-transport-tank",
    imageUrl: "/images/equipment/fish_transport_tank.jpg",
    name: "Insulated Live Fish Transport Hauling Tank",
    category: "handling",
    tagline: "Double-walled PUF insulated fiberglass transport tank with pure oxygen diffuser grid & quick discharge gate",
    purpose: "Safely transports live fingerlings, brooders, and market-ready harvest fish over highway distances of 300 km to 1,200 km with zero stress, temperature stability, and continuous dissolved oxygen saturation (>12 mg/L).",
    whyRequired: "Live fish command a 30% to 50% price premium in Indian metropolitan wholesale markets over iced fish. Transporting live fish in uninsulated, poorly aerated drums leads to ammonia buildup, asphyxiation, and catastrophic road transit mortality.",
    farmingSystems: ["hatchery", "ras", "pond", "cage", "biofloc"],
    applicableSpecies: ["Tilapia", "Rohu", "Catla", "Pangasius", "Catfish", "Trout"],
    whenRequired: "Indispensable for commercial hatcheries dispatching fingerlings across state lines and farms hauling live table fish to premium wet markets.",
    specificationGuidance: "1,000L to 2,500L capacity; seamless Food-Grade Fiberglass (FRP) with 50mm high-density polyurethane foam (PUF) insulation core; airtight anti-splash top loading hatch; 8-inch or 10-inch quick-open rubber-gasketed rear unloading slide valve; micro-pore pure oxygen diffuser grid with high-pressure gas cylinder manifold.",
    sizingGuidance: "Carrying density: 250 kg to 350 kg of live fish per 1,000 Liters of water under active oxygenation at <22°C.",
    calculateRecommendedCapacity: (volM3, biomassKg) => {
      const liveFishTargetKg = biomassKg ? Math.round(biomassKg * 0.25) : Math.round(volM3 * 8);
      const tankLiters = Math.ceil(liveFishTargetKg / 0.3);
      return {
        specification: `${tankLiters.toLocaleString()} Litre FRP Insulated Hauling Tank`,
        unit: "Vehicle-Mounted Live Transport Tank",
        rationale: `Safely hauls ~${liveFishTargetKg.toLocaleString()} kg live biomass at 300g/L loading density with continuous pure O2 aeration.`
      };
    },
    powerConsiderations: "Passive hydraulic & pneumatic operation; requires onboard 12V DC auxiliary aerator or pressurized oxygen cylinders.",
    maintenanceGuidance: [
      "Thoroughly pressure wash and sanitize internal gel-coat with food-grade hypochlorite or hydrogen peroxide after each shipment.",
      "Check quick-discharge rubber butterfly/slide valve seals for watertight sealing before loading fish.",
      "Inspect oxygen regulator, pressure hose clamps, and brass manifold before every highway departure."
    ],
    buyingChecklist: [
      "Food-grade smooth internal gelcoat without rough fiberglass strands that cause scale abrasions.",
      "Top hatch with liquid anti-surge baffle chambers to prevent water sloshing and vehicle instability during braking.",
      "Quick-release camlock water drainage gate allowing fish to slide directly into receiving ponds or market holding basins with zero netting."
    ],
    commonMistakes: [
      "Transporting fish with full digestive tracts (always fast fish for 24 to 48 hours prior to hauling to prevent ammonia spikes from excreted feces).",
      "Failing to pre-chill transport water by 3°C to 5°C, which lowers fish metabolic rate and respiration by 40%."
    ],
    relatedCalculatorId: "stocking",
    relatedArticlePath: "/ourservices",
    relatedArticleTitle: "Live Hauling Best Practices & Stress Reduction",
    importanceTier: "Essential (Core)"
  },

  // --------------------------------------------------------------------------
  // 7. PROCESSING & PRESERVATION
  // --------------------------------------------------------------------------
  {
    id: "eq-flake-ice-machine",
    slug: "commercial-flake-ice-machine",
    imageUrl: "/images/equipment/flake_ice_machine.jpg",
    name: "Commercial Industrial Flake Ice Machine (1T - 3T / Day)",
    category: "processing",
    tagline: "Sub-cooled flat dry ice flakes for rapid post-harvest chilling without bruising fish",
    purpose: "Freezes thin, flat sheets of dry sub-cooled ice (-5°C to -8°C) that slide smoothly around fresh fish bodies, cooling core temperature to 0°C within minutes.",
    whyRequired: "Fish enzyme activity and bacterial spoilage double for every 2°C rise in temperature. Chilling fish immediately in slurry ice preserves premium sushi-grade freshness for 12-16 days.",
    farmingSystems: ["pond", "ras", "biofloc", "cage"],
    applicableSpecies: ["Tilapia", "Rohu", "Catla", "Trout", "Shrimp", "Pangasius"],
    whenRequired: "Essential for commercial farms harvesting over 500 kg per batch transporting to distant city wholesale markets.",
    specificationGuidance: "Stainless steel evaporator drum with scraping blade, Bitzer/Copeland semi-hermetic compressor, 1,000 kg - 3,000 kg/24 hours capacity.",
    sizingGuidance: "General standard: 1 kg of flake ice per 1 kg of fresh fish harvested.",
    calculateRecommendedCapacity: (volM3, biomassKg) => {
      const harvestBatchKg = biomassKg ? Math.round(biomassKg * 0.3) : Math.round(volM3 * 10);
      return {
        specification: `${harvestBatchKg} kg Flake Ice per Harvest Batch`,
        unit: `${Math.ceil(harvestBatchKg / 1000)} Ton/Day Ice Maker`,
        rationale: `Achieves 1:1 ice-to-fish rapid chilling ratio preserving post-harvest cold chain.`
      };
    },
    powerConsiderations: "Industrial 3-phase power (4.5 kW to 12 kW depending on daily tonnage).",
    maintenanceGuidance: [
      "Descale water distributor tray and ice drum monthly to eliminate calcium mineral deposits.",
      "Inspect refrigerant pressures and oil sight glass quarterly."
    ],
    buyingChecklist: [
      "Food-grade SS304 internal evaporator drum and ice cutter blade.",
      "Automatic shutoff sensor when ice storage bin is full."
    ],
    commonMistakes: [
      "Using crushed block ice with sharp ragged edges that pierce fish skin and puncture bellies during transport.",
      "Harvesting into warm crates and adding ice hours later after bacterial spoilage has initiated."
    ],
    relatedCalculatorId: "profit",
    relatedArticlePath: "/ourservices",
    relatedArticleTitle: "Post-Harvest Cold Chain & Cold Storage Management",
    importanceTier: "Highly Recommended"
  },
  {
    id: "eq-processing-table",
    slug: "stainless-fish-processing-table",
    imageUrl: "/images/equipment/fish_processing_table.jpg",
    name: "Ergonomic SS304 Fish Evisceration & Filleting Table",
    category: "processing",
    tagline: "Food-grade hygienic stainless steel workstation with continuous water spray and waste chute",
    purpose: "Provides a sanitized, ergonomic station for rapid scaling, de-heading, gutting, and filleting of market fish with direct water flushing and separate waste disposal chutes.",
    whyRequired: "Hygienic processing prevents contamination from ruptured fish gallbladders and gut bacteria (*Salmonella*, *Listeria*), meeting FSSAI standards.",
    farmingSystems: ["pond", "ras", "biofloc", "cage"],
    applicableSpecies: ["Tilapia", "Pangasius", "Rohu", "Trout"],
    whenRequired: "Farms supplying dressed, filleted, or value-added clean fish to supermarkets, hotels, or direct consumers.",
    specificationGuidance: "Heavy-duty Food-Grade SS304 (1.5mm - 2.0mm thickness) with integrated PVC cutting board inserts, overhead water faucet, and waste disposal funnel.",
    sizingGuidance: "2-worker or 4-worker stations (1.8m - 2.4m length × 0.8m width × 0.85m height).",
    powerConsiderations: "Manual hygienic operation; requires pressurized washdown water supply.",
    maintenanceGuidance: [
      "Sanitize cutting surfaces with food-contact approved chlorine/peracetic acid solution daily.",
      "Replace knife-scored polyethylene cutting boards annually."
    ],
    buyingChecklist: [
      "Genuine non-magnetic Food-Grade AISI 304 stainless steel.",
      "Raised perimeter marine anti-drip splash edge.",
      "Center or side waste disposal hole with collection bag bracket."
    ],
    commonMistakes: [
      "Using porous wooden tables that harbor pathogenic bacteria inside cuts.",
      "Using cheap magnetic SS201 steel that rusts when exposed to fish blood and salt."
    ],
    relatedCalculatorId: "profit",
    relatedArticlePath: "/ourservices",
    relatedArticleTitle: "Value-Addition & Direct-to-Consumer Processing",
    importanceTier: "Highly Recommended"
  },
  {
    id: "eq-scaling-machine",
    slug: "commercial-fish-scaling-machine",
    imageUrl: "/images/equipment/fish_scaling_machine.jpg",
    name: "Automatic Commercial Rotary Fish Descaler",
    category: "processing",
    tagline: "High-speed scaling of 15-30 kg of fish per batch in under 3 minutes",
    purpose: "Rapidly removes stubborn scales from carps (Rohu, Catla, Grass Carp) and Tilapia using an abrasive rotating brush drum with continuous water spray.",
    whyRequired: "Manual hand-scaling is labor-intensive (taking 4-5 minutes per fish) and damages retail fish skin. Mechanical descaling processes 300-500 kg per hour.",
    farmingSystems: ["pond", "ras", "biofloc"],
    applicableSpecies: ["Rohu", "Catla", "Tilapia", "Carp"],
    whenRequired: "Commercial harvest processing centers and live-fish retail hubs.",
    specificationGuidance: "SS304 drum with food-grade nylon abrasive brush rollers, 1.5 kW motor, automatic timer with reverse rotation feature.",
    sizingGuidance: "25kg batch capacity (cycles in 90 - 180 seconds).",
    powerConsiderations: "Standard 220V single-phase or 415V 3-phase motor.",
    maintenanceGuidance: [
      "Flush drum with hose water immediately after use to expel fish scales.",
      "Inspect brush roller wear annually."
    ],
    buyingChecklist: [
      "Entire machine constructed from SS304 to prevent rust.",
      "Waterproof IP65 electrical control switch box."
    ],
    commonMistakes: [
      "Overloading drum with fish of widely differing sizes, bruising smaller specimens."
    ],
    relatedCalculatorId: "profit",
    relatedArticlePath: "/ourservices",
    relatedArticleTitle: "Processing Machinery & Market Realization",
    importanceTier: "Advanced / Commercial"
  }
];
