import React, { useState } from "react";
import { 
  HeartPulse, ShieldAlert, CheckCircle2, AlertTriangle, Info, Search,
  TrendingUp, Activity, HelpCircle, ChevronRight, CornerDownRight,
  Sparkles, RotateCcw, Plus, Check, ShieldCheck
} from "lucide-react";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface DiseasesPageProps {
  onBackToDashboard?: () => void;
}

// Full disease list structured according to categories requested
interface Disease {
  id: string;
  name: string;
  scientificName: string;
  category: "common" | "rare" | "dangerous";
  agentType: "Parasitic" | "Bacterial" | "Fungal" | "Viral";
  description: string;
  symptoms: string[];
  mortalityRate: number; // percentage
  contagionRate: number; // percentage
  treatmentDifficulty: number; // percentage (10 = very easy, 100 = impossible)
  proneFish: string[];
  precautions: string[];
  solutions: string[];
}

const DISEASES_DATA: Disease[] = [
  // MOST COMMON
  {
    id: "ich",
    name: "Ich (White Spot Disease)",
    scientificName: "Ichthyophthirius multifiliis",
    category: "common",
    agentType: "Parasitic",
    description: "The single most widespread parasite in freshwater aquaculture. It burrows under the skin of the fish, forming visible salt-like white cysts. Highly contagious and causes severe skin irritation and respiratory distress.",
    symptoms: [
      "Small white spots (size of salt grains) on fins and body",
      "Fish rubbing/flashing against pond walls or bottom",
      "Clamped fins and lethargic swimming",
      "Gasping for air at the water surface due to gill damage"
    ],
    mortalityRate: 50,
    contagionRate: 95,
    treatmentDifficulty: 30,
    proneFish: ["Indian Major Carps (Rohu, Catla, Mrigal)", "Tilapia", "Common Carp", "Pangasius Catfish"],
    precautions: [
      "Quarantine all new fingerlings for at least 10 days before stocking.",
      "Maintain water temperature stability; rapid drops trigger Ich spore release.",
      "Maintain stable organic loads and avoid overcrowding stress."
    ],
    solutions: [
      "Raise pond water temperature above 30°C if the fish species permits (speeds up the parasite lifecycle).",
      "Add non-iodized salt (NaCl) at 3-5 kg per 1000 liters (3-5 ppt salinity) for 7-10 days.",
      "In commercial tanks, apply formalin-malachite green solution strictly according to volume."
    ]
  },
  {
    id: "finrot",
    name: "Fin and Tail Rot",
    scientificName: "Aeromonas & Pseudomonas bacteria",
    category: "common",
    agentType: "Bacterial",
    description: "A common opportunistic bacterial infection that attacks the edges of fins and tail. It is highly linked to high organic ammonia levels, poor water quality, or physical damage from netting.",
    symptoms: [
      "Frayed, ragged, or decaying edges on fins and tail",
      "Fins showing a whitish or red-inflamed border",
      "Fins eating away down to the fleshy base",
      "Sluggishness and refusal of feed"
    ],
    mortalityRate: 35,
    contagionRate: 60,
    treatmentDifficulty: 25,
    proneFish: ["Tilapia", "Walking Catfish (Magur)", "Indian Major Carps", "Shrimp"],
    precautions: [
      "Keep unionized ammonia (NH3) at 0 ppm and nitrite below 0.5 ppm.",
      "Handle fish with soft knotless nylon nets to prevent scaling and slime layer scratches.",
      "Incorporate probiotic strain Bacillus subtilis in biofloc or pond feed to suppress pathogen count."
    ],
    solutions: [
      "Perform a 30-50% water exchange immediately to drop the toxic organic load.",
      "Apply potassium permanganate (KMnO4) bath treatment at 2-4 mg/L in the water column.",
      "Incorporate Oxytetracycline (antibiotic) into feed at 50-75 mg per kg of biomass for 7 consecutive days."
    ]
  },
  {
    id: "saprolegnia",
    name: "Saprolegniasis (Cotton Wool Disease)",
    scientificName: "Saprolegnia species",
    category: "common",
    agentType: "Fungal",
    description: "An opportunistic fungal pathogen that targets damaged skin tissue, unfertilized eggs, or stressed fish in cold climates. Produces highly characteristic fuzzy, cotton-like growths.",
    symptoms: [
      "Cotton-like fluffy white, grey, or greenish patches on body or head",
      "Fungal threads trapping mud and turning dirty brown",
      "Rapid destruction of skin layers underneath the fungus",
      "High mortality in hatchery egg incubation trays"
    ],
    mortalityRate: 40,
    contagionRate: 45,
    treatmentDifficulty: 30,
    proneFish: ["Salmonids (Trout, Salmon)", "Rohu & Catla Eggs", "Tilapia Broodstock", "Catfish"],
    precautions: [
      "Routinely remove dead eggs and organic debris from hatchery channels.",
      "Avoid handling fish during winter months when their immune response is sluggish.",
      "Maintain general calcium hardness above 80 ppm to ensure dynamic slime layer formation."
    ],
    solutions: [
      "Dip infected fish or broodstock in a Salt Bath (20-30 g/L or 2-3% salt solution) for 10-15 minutes.",
      "Apply Hydrogen Peroxide at 250-500 mg/L for 15 minutes as a highly effective eco-friendly fungicide.",
      "In hatcheries, treat water with Methylene Blue (1-3 mg/L) to prevent fungal spreading on egg masses."
    ]
  },

  // MOST DANGEROUS
  {
    id: "khv",
    name: "Koi Herpesvirus (KHV)",
    scientificName: "Cyprinid herpesvirus 3 (CyHV-3)",
    category: "dangerous",
    agentType: "Viral",
    description: "An extremely lethal, contagious viral disease targeting common carp and koi. It triggers catastrophic mass mortalities (up to 100%) within days of outbreak, especially at water temperatures between 18°C and 28°C.",
    symptoms: [
      "Severe gill necrosis (white, mottled, or bleeding gills)",
      "Sunken eyes (enophthalmos) and rough sandpaper-like skin",
      "Excessive mucus secretion or complete dryness of skin",
      "Erratic gasping and swimming at water surface or bottom"
    ],
    mortalityRate: 98,
    contagionRate: 100,
    treatmentDifficulty: 95,
    proneFish: ["Common Carp", "Koi Carp", "Rohu (minor susceptibility)"],
    precautions: [
      "Ensure all stocking seeds are sourced from certified KHV-free SPF (Specific Pathogen Free) hatcheries.",
      "Maintain strict farm-level biosecurity. Disinfect nets, boots, and tools in chlorine before moving between ponds.",
      "Never mix new carps directly with existing stocks. Establish a 30-day quarantine at 25°C."
    ],
    solutions: [
      "There is NO effective chemical cure or antiviral treatment for KHV once infected.",
      "Immediate action: Isolate the entire pond, stop water discharge to other sectors, and humanely depopulate infected ponds.",
      "Raise pond temperature above 30°C if feasible—this can stop viral replication and allow surviving fish to build antibodies, but they remain lifelong carriers."
    ]
  },
  {
    id: "eus",
    name: "EUS (Red Spot Disease)",
    scientificName: "Aphanomyces invadans (fungus) & Aeromonas",
    category: "dangerous",
    agentType: "Fungal",
    description: "Epizootic Ulcerative Syndrome is an invasive oomycete fungus that bores deep into skin layers, causing gruesome bleeding red ulcers. Highly lethal and leads to rapid destruction of muscle tissue.",
    symptoms: [
      "Red spots or bloody petechiae on body surfaces",
      "Deep, hollowed-out red circular ulcers exposing raw muscle tissue",
      "Erosion of head bones or tail tip",
      "Fish swimming lethargically near edges, completely ignoring feed"
    ],
    mortalityRate: 85,
    contagionRate: 80,
    treatmentDifficulty: 70,
    proneFish: ["Snakehead (Channa)", "Indian Major Carps (Catla, Rohu)", "Walking Catfish (Magur)", "Pangasius"],
    precautions: [
      "Avoid introducing surface river or canal water directly without prior filtration and chlorination.",
      "Maintain pond pH above 7.0; acidic waters below 6.2 dramatically trigger EUS spore germinations.",
      "Broadcast agricultural lime during rainy seasons to prevent run-off acidity spikes."
    ],
    solutions: [
      "Apply Calcium Oxide (Quicklime) at 50-100 kg per acre to elevate pH and disinfect the water column.",
      "Apply Potassium Permanganate (KMnO4) at 3-5 mg/L across the pond to burn away fungal spores.",
      "In tank farms, apply a targeted bath of copper sulfate (CuSO4) at 0.5 mg/L, monitoring dissolved oxygen closely."
    ]
  },
  {
    id: "vibriosis",
    name: "Vibriosis & Hemorrhagic Septicemia",
    scientificName: "Vibrio anguillarum / Vibrio harveyi",
    category: "dangerous",
    agentType: "Bacterial",
    description: "A rapid, highly destructive bacterial infection prominent in marine, brackish, and intensive biofloc systems. Causes severe internal bleeding, toxic shock, and organ failure within 24 hours.",
    symptoms: [
      "Red bleeding spots on mouth, base of fins, and anus",
      "Bloated belly filled with yellow/bloody fluid (dropsy)",
      "Bulging eyes (exophthalmia) with bloody rings",
      "Shrimp showing black necrotic spots on carapace and tail"
    ],
    mortalityRate: 80,
    contagionRate: 85,
    treatmentDifficulty: 60,
    proneFish: ["Asian Seabass (Barramundi)", "Whiteleg Shrimp (L. vannamei)", "Tilapia in brackish waters"],
    precautions: [
      "Maintain active organic carbon ratios in biofloc (C:N ratio > 15:1) to allow heterotrophs to outcompete Vibrio.",
      "Minimize salinity fluctuations and maintain dissolved oxygen strictly above 5.5 ppm.",
      "Utilize water filtration with UV sterilizers or ozone injection in intensive RAS setups."
    ],
    solutions: [
      "Feed garlic extract or organic acids to help suppress gut-level Vibrio loading.",
      "Apply sanitizer chloramine-T or copper sulfate bath in controlled treatment tanks.",
      "Incorporate Florfenicol or Oxytetracycline antibiotics in feed strictly under veterinary prescription."
    ]
  },

  // MOST RARE
  {
    id: "whirling",
    name: "Whirling Disease",
    scientificName: "Myxobolus cerebralis Spores",
    category: "rare",
    agentType: "Parasitic",
    description: "A rare but highly destructive spore-forming parasite that attacks the skeletal cartilage of juvenile trout and salmon. It causes neurological damage, forcing the fish to swim in erratic circular patterns.",
    symptoms: [
      "Erratic, rapid tail-chasing 'whirling' swimming pattern when startled",
      "Severe spinal deformities (scoliosis) and bent tails",
      "Blackening of the tail region (loss of pigment control)",
      "Extremely high mortality in fingerlings"
    ],
    mortalityRate: 90,
    contagionRate: 50,
    treatmentDifficulty: 90,
    proneFish: ["Rainbow Trout", "Atlantic Salmon", "Brown Trout"],
    precautions: [
      "Never use unfiltered stream or river water containing wild tubifex worms (the secondary host).",
      "Source trout fingerlings exclusively from certified land-locked borewell spring hatcheries.",
      "Pave pond bottoms or use heavy HDPE liners to prevent tubifex worms from colonizing mud."
    ],
    solutions: [
      "No chemical treatment or cure exists for Myxobolus spores inside cartilaginous tissues.",
      "Total depopulation and complete drying/chlorination of infected tanks is mandatory.",
      "Expose infected soil beds to heavy dry-lime treatment (Calcium Cyanamide) at 1000 kg/acre."
    ]
  },
  {
    id: "lymphocystis",
    name: "Lymphocystis Disease",
    scientificName: "Lymphocystivirus (Iridovirus)",
    category: "rare",
    agentType: "Viral",
    description: "A chronic, self-limiting viral disease that causes immense cell enlargement. It produces wart-like, cauliflower-like growths on the skin and fins. Rarely fatal but causes extreme cosmetic degradation.",
    symptoms: [
      "Wart-like, fleshy, or cauliflower-like nodules on fins, tail, and body",
      "Clusters of tiny white/pink spherical cysts grouping together",
      "Normal swimming and feeding patterns unless growths block mouth",
      "Nodules slowly shrinking and peeling off after several weeks"
    ],
    mortalityRate: 10,
    contagionRate: 30,
    treatmentDifficulty: 80,
    proneFish: ["Asian Seabass (Barramundi)", "Gourami", "Cichlids (Tilapia)"],
    precautions: [
      "Ensure sorting and grading tools are completely sanitized to avoid shedding viral particles.",
      "Avoid rough manual handling that strips the defensive slime skin coating.",
      "Optimize stocking density to lower intra-species fin-nipping behavior."
    ],
    solutions: [
      "There is no chemical cure or vaccine available for Lymphocystis virus.",
      "The infection is naturally self-limiting. Keep infected fish in stable, low-stress conditions.",
      "Surviving fish will shed the nodules and develop systemic immunity within 4-6 weeks."
    ]
  },
  {
    id: "neonsporid",
    name: "Microsporidian Muscle Necrosis",
    scientificName: "Pleistophora hyphessobryconis",
    category: "rare",
    agentType: "Parasitic",
    description: "An intracellular microsporidian parasite that embeds within fish muscle tissues, causing muscular decay and structural failure. Highly rare in large-scale food-fish farms but devastating in aquarium stocks.",
    symptoms: [
      "Milky white, faded, or opaque areas beneath the skin (decaying muscle)",
      "Loss of pigmentation or faded bands along the spine",
      "Progressive spinal curvature and muscular wasting",
      "Lethargy, separation from the school, and sinking to bottom"
    ],
    mortalityRate: 80,
    contagionRate: 40,
    treatmentDifficulty: 95,
    proneFish: ["Ornamental Barbs", "Tetras", "Rasboras", "Zebrafish"],
    precautions: [
      "Maintain a strictly controlled live-feed protocol; avoid wild-harvested daphnia or tubifex.",
      "Immediately cull and remove any fish displaying bleached white muscular patches.",
      "Maintain active UV sterilization loops to kill free-floating infectious spores."
    ],
    solutions: [
      "There are no effective medications or therapeutics to clear microsporidians inside muscle fibers.",
      "Immediately cull infected individuals. Promptly remove carcasses to prevent healthy fish from scavenging infected flesh.",
      "Perform thorough sterilization of the tank with heavy sodium hypochlorite (chlorine bleaching)."
    ]
  }
];

// Symptoms dictionary for diagnostic wizard
interface Symptom {
  id: string;
  label: string;
  description: string;
  relatedDiseases: string[]; // disease IDs
}

const SYMPTOMS_LIST: Symptom[] = [
  { id: "symp_spots", label: "White salt-like spots", description: "Small, grain-like white dots scattered across body and fins.", relatedDiseases: ["ich"] },
  { id: "symp_rot", label: "Frayed/decaying fins", description: "Fin edges are ragged, tearing away, or showing red/white margins.", relatedDiseases: ["finrot"] },
  { id: "symp_cotton", label: "Cotton-like wooly growths", description: "Fluffy, wooly white or grey growth patches on skin or head.", relatedDiseases: ["saprolegnia"] },
  { id: "symp_ulcers", label: "Deep bloody red ulcers", description: "Bleeding open craters eating directly into the muscle tissue.", relatedDiseases: ["eus", "vibriosis"] },
  { id: "symp_gasping", label: "Gasping at water surface", description: "Fish hanging at surface, breathing rapidly, showing pale or necrotic gills.", relatedDiseases: ["ich", "khv", "eus"] },
  { id: "symp_spin", label: "Erratic spinning/whirling", description: "Losing equilibrium, chasing tail, or swimming in tight circles.", relatedDiseases: ["whirling"] },
  { id: "symp_bloat", label: "Bloated belly & bulging eyes", description: "Accumulation of yellow/bloody internal fluids, scales sticking out.", relatedDiseases: ["vibriosis"] },
  { id: "symp_warts", label: "Cauliflower/wart nodules", description: "Pink or white textured growths clustered on the fins or lips.", relatedDiseases: ["lymphocystis"] }
];

export default function DiseasesPage({ onBackToDashboard }: DiseasesPageProps) {
  const [activeTab, setActiveTab] = useState<"articles" | "chart" | "wizard" | "biosecurity">("articles");
  const [diseaseFilter, setDiseaseFilter] = useState<"all" | "common" | "rare" | "dangerous">("all");
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(DISEASES_DATA[0]);
  const [selectedSpeciesFilter, setSelectedSpeciesFilter] = useState<string>("All Species");

  // Wizard States
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [wizardResult, setWizardResult] = useState<Disease[]>([]);

  // Unique species list extracted
  const allSpecies = [
    "All Species",
    "Indian Major Carps (Rohu, Catla, Mrigal)",
    "Tilapia",
    "Common Carp",
    "Pangasius Catfish",
    "Salmonids (Trout, Salmon)",
    "Shrimp",
    "Asian Seabass (Barramundi)"
  ];

  // Filters diseases based on tab & species selectors
  const filteredDiseases = DISEASES_DATA.filter((d) => {
    const matchesCategory = diseaseFilter === "all" || d.category === diseaseFilter;
    const matchesSpecies = selectedSpeciesFilter === "All Species" || 
      d.proneFish.some((f) => f.toLowerCase().includes(selectedSpeciesFilter.toLowerCase()) || 
      selectedSpeciesFilter.toLowerCase().includes(f.toLowerCase()) ||
      // handle specific matching helpers
      (selectedSpeciesFilter.includes("Carps") && d.proneFish.some(pf => pf.includes("Carp") || pf.includes("Rohu") || pf.includes("Catla"))) ||
      (selectedSpeciesFilter.includes("Catfish") && d.proneFish.some(pf => pf.includes("Catfish") || pf.includes("Pangasius"))) ||
      (selectedSpeciesFilter.includes("Trout") && d.proneFish.some(pf => pf.includes("Trout") || pf.includes("Salmon")))
    );
    return matchesCategory && matchesSpecies;
  });

  // Handle wizard check changes
  const handleSymptomToggle = (id: string) => {
    setSelectedSymptoms((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      
      // Calculate matches live
      if (next.length === 0) {
        setWizardResult([]);
        return next;
      }
      
      // Find diseases that match most of selected symptoms
      const matches: { disease: Disease; score: number }[] = [];
      DISEASES_DATA.forEach((dis) => {
        let score = 0;
        // Check symptoms mapping
        SYMPTOMS_LIST.forEach((symp) => {
          if (next.includes(symp.id) && symp.relatedDiseases.includes(dis.id)) {
            score += 2; // direct link match
          }
        });
        
        // Also check keywords in symptoms text
        dis.symptoms.forEach((ds) => {
          next.forEach((nsId) => {
            const label = SYMPTOMS_LIST.find(s => s.id === nsId)?.label.toLowerCase() || "";
            const keyWords = label.split(" ");
            keyWords.forEach(kw => {
              if (kw.length > 3 && ds.toLowerCase().includes(kw)) {
                score += 0.5;
              }
            });
          });
        });

        if (score > 0) {
          matches.push({ disease: dis, score });
        }
      });

      // Sort by match score descending
      const sortedMatches = matches
        .sort((a, b) => b.score - a.score)
        .map((m) => m.disease);
      
      setWizardResult(sortedMatches);
      return next;
    });
  };

  const resetWizard = () => {
    setSelectedSymptoms([]);
    setWizardResult([]);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* HEADER HERO SLAT */}
      <div className="relative bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8 overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3 max-w-2xl text-left">
           
            <div className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px] sm:text-[10px] font-mono uppercase tracking-widest font-black px-2.5 py-1 rounded-full">
              <HeartPulse className="w-3 h-3 text-rose-400 animate-pulse" />
              Biosecurity, Diagnostics & Pathogens
            </div>
            <h1 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-white leading-tight">
              Aquaculture Disease & Diagnostics Manual
            </h1>
            <p className="text-rose-100/80 text-xs sm:text-sm leading-relaxed max-w-xl">
              Professional protocol for identifying, containing, and treating parasitic, bacterial, fungal, and viral infections in freshwater and marine systems.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl backdrop-blur-md self-start md:self-center w-full md:w-auto">
            <span className="block text-[10px] font-mono tracking-widest uppercase text-rose-300 font-bold mb-0.5 sm:mb-1">Alert Readiness Level</span>
            <span className="block font-sans font-black text-xl sm:text-2xl tracking-tight text-red-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 animate-pulse" />
              Pre-Emptive Active
            </span>
            <span className="block text-[11px] sm:text-xs text-rose-100/70 mt-1 leading-snug">Continuous water monitoring preserves stock immune barriers.</span>
          </div>
        </div>
      </div>

        {/* Sticky Top Advertisement Banner */}
        <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-0.5 my-1 transition-all border-y border-slate-200/80 shadow-xs -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 w-auto">
          <div className="max-w-[1440px] mx-auto">
            <AdBanner reloadKey="feeding-main-ad" />
          </div>
        </div>

        {/* Mobile Announcement Card (Not Sticky - scrolls up naturally) */}
        <div className="lg:hidden my-1">
          <OwnCirclesAnnouncement mode="mobile" />
        </div>

      {/* TABS MENU NAVIGATION */}
      <div className="sticky top-14 sm:top-16 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 sm:py-3 overflow-x-auto scrollbar-none max-w-full -mx-3 px-3 sm:mx-0 sm:px-0">
            {[
              { id: "articles", label: "Diagnostic Facts", icon: HeartPulse },
              { id: "chart", label: "Impact & Species Chart", icon: TrendingUp },
              { id: "wizard", label: "Symptom Diagnosis Wizard", icon: Search },
              { id: "biosecurity", label: "Biosecurity & Readiness", icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-rose-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 items-start">
          <div className="flex-1 min-w-0 space-y-6 sm:space-y-12 w-full">
        
        {/* TAB 1: DIAGNOSTIC ARTICLES & PROTOCOLS */}
        {activeTab === "articles" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in text-left">
            
            {/* Filtering Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 border border-slate-200/80 rounded-xl sm:rounded-2xl shadow-xs">
              
              {/* Category Filter */}
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto -mx-1 px-1 sm:mx-0 sm:px-0">
                {[
                  { id: "all", label: "All Severity Levels" },
                  { id: "common", label: "Most Common" },
                  { id: "dangerous", label: "Most Dangerous" },
                  { id: "rare", label: "Rare" }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => {
                      setDiseaseFilter(btn.id as any);
                      // Select first of filtered array automatically
                      const matched = DISEASES_DATA.filter(d => btn.id === "all" || d.category === btn.id);
                      if (matched.length > 0) setSelectedDisease(matched[0]);
                    }}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      diseaseFilter === btn.id
                        ? "bg-rose-100 text-rose-900"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Species Filter Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[11px] sm:text-xs text-slate-500 font-sans font-medium whitespace-nowrap">Species Filter:</span>
                <select
                  value={selectedSpeciesFilter}
                  onChange={(e) => {
                    setSelectedSpeciesFilter(e.target.value);
                    const matched = DISEASES_DATA.filter(d => {
                      const matchesCategory = diseaseFilter === "all" || d.category === diseaseFilter;
                      const matchesSpecies = e.target.value === "All Species" || d.proneFish.some(f => f.toLowerCase().includes(e.target.value.toLowerCase()));
                      return matchesCategory && matchesSpecies;
                    });
                    if (matched.length > 0) setSelectedDisease(matched[0]);
                  }}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] sm:text-xs font-sans font-bold px-2.5 py-1.5 sm:py-2 rounded-xl focus:outline-none focus:border-rose-500 w-full sm:w-auto cursor-pointer"
                >
                  {allSpecies.map((s, idx) => (
                    <option key={`opt-${idx}`} value={s}>{s}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Split Slat layout: Left Disease List (4 cols) | Right Full Details Sheet (8 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
              
              {/* Left Column list */}
              <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden divide-y divide-slate-100">
                <div className="p-3 sm:p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold">Matched Diseases ({filteredDiseases.length})</span>
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-bold">Select for details</span>
                </div>
                {filteredDiseases.length === 0 ? (
                  <div className="p-6 sm:p-8 text-center text-xs text-slate-500">No diseases match the active species and severity filter.</div>
                ) : (
                  <div className="max-h-[300px] sm:max-h-[500px] overflow-y-auto divide-y divide-slate-100">
                    {filteredDiseases.map((d) => {
                      const isSelected = selectedDisease?.id === d.id;
                      return (
                        <button
                          key={d.id}
                          onClick={() => setSelectedDisease(d)}
                          className={`w-full text-left p-3 sm:p-4 transition-all hover:bg-slate-50 flex items-center justify-between group cursor-pointer ${
                            isSelected ? "bg-rose-50/50 border-l-4 border-rose-600" : ""
                          }`}
                        >
                          <div className="space-y-1 pr-3 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`text-[9px] font-mono uppercase font-extrabold px-1.5 py-0.5 rounded-md ${
                                d.category === "dangerous" ? "bg-red-100 text-red-800" : 
                                d.category === "rare" ? "bg-indigo-100 text-indigo-800" : "bg-emerald-100 text-emerald-800"
                              }`}>
                                {d.category === "dangerous" ? "Dangerous" : d.category === "rare" ? "Rare" : "Common"}
                              </span>
                              <span className="text-[9px] font-mono text-slate-400 font-semibold">{d.agentType}</span>
                            </div>
                            <h4 className={`font-sans font-black text-xs tracking-tight truncate ${isSelected ? "text-rose-950" : "text-slate-800"}`}>
                              {d.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-serif italic truncate max-w-[200px]">
                              {d.scientificName}
                            </p>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-all ${
                            isSelected ? "text-rose-600 translate-x-1" : "group-hover:translate-x-0.5"
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column details sheet */}
              {selectedDisease ? (
                <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-xs relative">
                  
                  {/* Title block */}
                  <div className="border-b border-slate-100 pb-3 sm:pb-5 space-y-1.5 sm:space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-black ${
                        selectedDisease.category === "dangerous" ? "bg-red-500/10 text-red-700 border border-red-500/20" :
                        selectedDisease.category === "rare" ? "bg-indigo-500/10 text-indigo-700 border border-indigo-500/20" :
                        "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                      }`}>
                        {selectedDisease.category === "dangerous" ? "🚨 Highly Dangerous / Lethal" : 
                         selectedDisease.category === "rare" ? "🔍 Rare Pathogen" : "✓ Common Opportunistic"}
                      </span>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold">
                        Type: {selectedDisease.agentType}
                      </span>
                    </div>
                    <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900 tracking-tight">
                      {selectedDisease.name}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-serif italic">
                      Pathological classification: {selectedDisease.scientificName}
                    </p>
                  </div>

                  {/* General Summary */}
                  <div className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-sans bg-slate-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100">
                    <p>{selectedDisease.description}</p>
                  </div>

                  {/* Disease parameters / metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-red-50/20 border border-red-100/30 p-3.5 sm:p-4 rounded-xl">
                      <span className="block text-[9px] font-mono text-red-700 uppercase font-bold tracking-wider mb-1">Mortality Rate</span>
                      <span className="block font-sans font-black text-lg sm:text-xl text-red-900">{selectedDisease.mortalityRate}%</span>
                      <div className="w-full bg-red-100 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-red-600 h-full" style={{ width: `${selectedDisease.mortalityRate}%` }}></div>
                      </div>
                    </div>

                    <div className="bg-amber-50/20 border border-amber-100/30 p-3.5 sm:p-4 rounded-xl">
                      <span className="block text-[9px] font-mono text-amber-700 uppercase font-bold tracking-wider mb-1">Contagion Speed</span>
                      <span className="block font-sans font-black text-lg sm:text-xl text-amber-950">{selectedDisease.contagionRate}%</span>
                      <div className="w-full bg-amber-100 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-amber-600 h-full" style={{ width: `${selectedDisease.contagionRate}%` }}></div>
                      </div>
                    </div>

                    <div className="bg-indigo-50/20 border border-indigo-100/30 p-3.5 sm:p-4 rounded-xl">
                      <span className="block text-[9px] font-mono text-indigo-700 uppercase font-bold tracking-wider mb-1">Treatment Difficulty</span>
                      <span className="block font-sans font-black text-lg sm:text-xl text-indigo-900">
                        {selectedDisease.treatmentDifficulty >= 80 ? "Critical" : selectedDisease.treatmentDifficulty >= 50 ? "Moderate" : "Easy"}
                      </span>
                      <div className="w-full bg-indigo-100 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-indigo-600 h-full" style={{ width: `${selectedDisease.treatmentDifficulty}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    
                    {/* Symptoms */}
                    <div className="space-y-2.5 sm:space-y-3">
                      <h4 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider font-mono flex items-center gap-1 text-red-800">
                        <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                        Visible Symptoms (Diagnostics)
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedDisease.symptoms.map((s, idx) => (
                          <li key={`symp-${idx}`} className="flex gap-2 items-start">
                            <span className="text-red-500 font-bold shrink-0">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highly Prone Fishes */}
                    <div className="space-y-2.5 sm:space-y-3">
                      <h4 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider font-mono flex items-center gap-1 text-indigo-800">
                        <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                        Most Prone Fish & Stock
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDisease.proneFish.map((f, idx) => (
                          <span key={`prone-${idx}`} className="bg-slate-100 text-slate-800 text-[10px] font-sans font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-200">
                            {f}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1.5 sm:mt-2 leading-snug">
                        Fishes listed are highly susceptible to spawning or structural mortality if exposed to this pathogen.
                      </p>
                    </div>

                  </div>

                  {/* Interactive Action Plan */}
                  <div className="border-t border-slate-100 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                    <h3 className="font-sans font-black text-slate-950 text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600" />
                      Biosecurity Action Plan & Treatments
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                      
                      {/* Precautions */}
                      <div className="bg-emerald-50/20 border border-emerald-100/30 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl space-y-2 sm:space-y-2.5">
                        <span className="text-[9px] sm:text-[10px] font-mono text-emerald-700 uppercase font-bold tracking-widest block">1. Pre-emptive Precautions</span>
                        <ul className="space-y-1.5">
                          {selectedDisease.precautions.map((p, idx) => (
                            <li key={`prec-${idx}`} className="flex gap-2 items-start">
                              <span className="text-emerald-600 font-bold font-mono shrink-0">✓</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Immediate Solutions */}
                      <div className="bg-rose-50/20 border border-rose-100/30 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl space-y-2 sm:space-y-2.5">
                        <span className="text-[9px] sm:text-[10px] font-mono text-rose-700 uppercase font-bold tracking-widest block">2. Immediate Solutions</span>
                        <ul className="space-y-1.5">
                          {selectedDisease.solutions.map((s, idx) => (
                            <li key={`sol-${idx}`} className="flex gap-2 items-start">
                              <span className="text-rose-600 font-bold font-mono shrink-0">!</span>
                              <span className="text-rose-950 font-medium">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>

                </div>
              ) : (
                <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-xs text-slate-500 shadow-xs">
                  Please select a disease from the list to load details.
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE DISEASE IMPACT CHART */}
        {activeTab === "chart" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in text-left">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">
                Pathogen Lethality & Contagion Matrix
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Visualizing mortality speed, spreading rate, and difficulty across pathogens.
              </p>
            </div>

            {/* Custom Interactive SVG/HTML Bar Chart Matrix */}
            <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 sm:pb-4 gap-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Pathogen Risk Comparison Grid</span>
                <span className="text-[9px] sm:text-[10px] font-mono bg-red-100 text-red-800 px-2 py-0.5 rounded-md font-bold self-start sm:self-auto">Risk Index = (Mortality * Contagion) / 100</span>
              </div>

              <div className="space-y-4 sm:space-y-6 divide-y divide-slate-100 sm:divide-y-0">
                {DISEASES_DATA.map((dis) => {
                  const riskIndex = Math.round((dis.mortalityRate * dis.contagionRate) / 100);
                  const isDangerous = dis.category === "dangerous";
                  const isRare = dis.category === "rare";

                  return (
                    <div key={`chart-row-${dis.id}`} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center pt-3 sm:pt-0 pb-3 sm:pb-5 sm:border-b sm:border-slate-100 last:border-0 last:pb-0">
                      
                      {/* Name & Title */}
                      <div className="sm:col-span-4 md:col-span-3 space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[8px] font-mono font-black uppercase px-1 rounded-sm ${
                            isDangerous ? "bg-red-100 text-red-700" : isRare ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"
                          }`}>
                            {dis.category}
                          </span>
                          <span className="text-[8px] font-mono text-slate-400">{dis.agentType}</span>
                        </div>
                        <h4 className="font-sans font-black text-xs text-slate-950 tracking-tight">{dis.name}</h4>
                        <p className="text-[10px] text-slate-400 font-serif italic truncate">{dis.scientificName}</p>
                      </div>

                      {/* Mortality & Contagion Bars */}
                      <div className="sm:col-span-8 md:col-span-5 space-y-2">
                        {/* Mortality rate */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono">
                            <span className="text-slate-500">Mortality Speed (Lethality)</span>
                            <span className="font-bold text-red-600">{dis.mortalityRate}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${dis.mortalityRate}%` }}></div>
                          </div>
                        </div>

                        {/* Contagion rate */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono">
                            <span className="text-slate-500">Contagion Rate (Spreading)</span>
                            <span className="font-bold text-amber-600">{dis.contagionRate}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${dis.contagionRate}%` }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Prone Fishes List */}
                      <div className="sm:col-span-8 md:col-span-3">
                        <span className="block text-[8px] font-mono text-slate-400 uppercase font-bold mb-1">Most Prone Stock</span>
                        <div className="flex flex-wrap gap-1">
                          {dis.proneFish.slice(0, 2).map((pf, pidx) => (
                            <span key={pidx} className="bg-slate-50 border border-slate-200/50 text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-md text-slate-700 truncate max-w-[120px]">
                              {pf}
                            </span>
                          ))}
                          {dis.proneFish.length > 2 && (
                            <span className="text-[8px] font-mono text-slate-400 font-bold self-center">+{dis.proneFish.length - 2} more</span>
                          )}
                        </div>
                      </div>

                      {/* Risk Index Bubble */}
                      <div className="sm:col-span-4 md:col-span-1 text-center bg-slate-50 border border-slate-100 p-2 sm:p-2.5 rounded-xl self-center flex sm:flex-col justify-between items-center sm:justify-center">
                        <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">Risk Index</span>
                        <span className={`font-sans font-black text-sm sm:text-base ${
                          riskIndex >= 70 ? "text-red-600 font-black animate-pulse" : riskIndex >= 30 ? "text-amber-600 font-bold" : "text-emerald-700 font-bold"
                        }`}>{riskIndex}</span>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: DIAGNOSIS SYMPTOM WIZARD */}
        {activeTab === "wizard" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in text-left">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
              <h2 className="font-sans font-black text-xl sm:text-3xl text-slate-900">
                Symptom Diagnostic Wizard
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Select the visible physiological and behavioral symptoms of your stock to find immediate, actionable diagnostics and chemical solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
              
              {/* Symptom Checkboxes Selection (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-sans font-black text-slate-900 text-xs sm:text-sm">Select Active Symptoms</h3>
                  {selectedSymptoms.length > 0 && (
                    <button 
                      onClick={resetWizard}
                      className="text-[10px] font-mono text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {SYMPTOMS_LIST.map((symp) => {
                    const isChecked = selectedSymptoms.includes(symp.id);
                    return (
                      <button
                        key={symp.id}
                        onClick={() => handleSymptomToggle(symp.id)}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all flex items-start gap-2.5 sm:gap-3 cursor-pointer ${
                          isChecked 
                            ? "bg-rose-50 border-rose-300 text-rose-950 shadow-xs" 
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isChecked ? "bg-rose-600 border-rose-600 text-white" : "border-slate-300 bg-slate-50"
                        }`}>
                          {isChecked && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="block font-sans font-bold text-xs">{symp.label}</span>
                          <span className="block text-[10px] text-slate-400 leading-normal">{symp.description}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedSymptoms.length === 0 && (
                  <div className="p-3 sm:p-4 bg-slate-50/50 rounded-xl flex gap-2 items-center">
                    <Info className="w-4 h-4 text-slate-400 shrink-0" />
                    <p className="text-[10px] text-slate-400">Select one or more checkboxes above to activate diagnostics.</p>
                  </div>
                )}
              </div>

              {/* Live Diagnosis result cards (7 cols) */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                
                <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-sans font-black text-slate-900 text-xs sm:text-sm">Diagnostic Wizard Result</h3>
                    <p className="text-slate-400 text-[10px]">Ranked based on direct symptom connections.</p>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs bg-rose-100 text-rose-800 px-2.5 sm:px-3 py-1 rounded-full font-bold">
                    {wizardResult.length} Matched Diseases
                  </span>
                </div>

                {selectedSymptoms.length === 0 ? (
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-slate-400">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
                    </div>
                    <p className="text-xs font-sans font-semibold">Diagnostic Engine Idle</p>
                    <p className="text-[10px] text-slate-400 mt-1">Check one or more symptom parameters on the left panel to begin active tracking.</p>
                  </div>
                ) : wizardResult.length === 0 ? (
                  <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-slate-500">
                    <p className="text-xs">No direct matches found. Try selecting different symptoms.</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {wizardResult.slice(0, 3).map((dis, idx) => {
                      const isFirst = idx === 0;
                      return (
                        <div 
                          key={`wiz-res-${dis.id}`}
                          className={`bg-white border rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all shadow-xs space-y-3 sm:space-y-4 ${
                            isFirst ? "border-rose-400 ring-2 ring-rose-500/5" : "border-slate-200/80"
                          }`}
                        >
                          <div className="flex justify-between items-start border-b border-slate-100 pb-3 flex-wrap gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <span className={`text-[8px] font-mono uppercase font-black px-1.5 py-0.5 rounded ${
                                  dis.category === "dangerous" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                                }`}>
                                  {dis.category === "dangerous" ? "Highly Dangerous" : "Common"}
                                </span>
                                {isFirst && (
                                  <span className="bg-rose-600 text-white text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded animate-pulse">
                                    Primary Match
                                  </span>
                                )}
                              </div>
                              <h4 className="font-sans font-black text-xs sm:text-sm text-slate-900 tracking-tight">{dis.name}</h4>
                              <p className="text-[10px] text-slate-400 font-serif italic">{dis.scientificName}</p>
                            </div>
                            <div className="text-right">
                              <span className="block text-[8px] font-mono text-slate-400 uppercase font-bold">Mortality Risk</span>
                              <span className="block font-sans font-black text-sm sm:text-base text-red-600">{dis.mortalityRate}%</span>
                            </div>
                          </div>

                          {/* Quick details */}
                          <p className="text-slate-500 text-[10px] sm:text-[11px] leading-relaxed font-sans">{dis.description}</p>

                          {/* 1-2-3 treatment */}
                          <div className="p-3 sm:p-4 bg-rose-50/20 border border-rose-100/20 rounded-xl sm:rounded-2xl space-y-2 sm:space-y-2.5">
                            <span className="text-[9px] sm:text-[10px] font-mono text-rose-700 uppercase font-black tracking-widest block">Immediate Vet solutions</span>
                            <ol className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                              {dis.solutions.map((sol, sidx) => (
                                <li key={sidx} className="flex gap-2 items-start">
                                  <span className="text-rose-600 font-bold font-mono shrink-0">{sidx + 1}.</span>
                                  <span>{sol}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* TAB 4: BIOSECURITY PROTOCOL & MEDICINE CABINET */}
        {activeTab === "biosecurity" && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in text-left">
            
            {/* Introductory banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Box 1: Quarantine steps */}
              <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-3 sm:space-y-4 shadow-xs">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700">
                  <ShieldAlert className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase text-rose-600 tracking-wider font-black">Biosecurity Shield</span>
                  <h3 className="font-sans font-black text-slate-900 text-sm sm:text-base">Standard Seed Quarantine Protocol</h3>
                </div>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-sans">
                  Introducing un-isolated seeds directly into commercial RAS or biofloc tanks represents the absolute highest biosecurity risk. Apply this 3-step quarantine routine:
                </p>
                <div className="space-y-2 pt-1 sm:pt-2">
                  {[
                    { t: "1. Isolated Tanks", d: "Maintain dedicated quarantine glass aquarium or circular tanks completely segregated from standard operational water recirculation channels." },
                    { t: "2. Prophylactic Dip", d: "Subject incoming fingerlings to a Potassium Permanganate (KMnO4) bath at 2 mg/L for 5-10 minutes to burn off superficial parasites before entering quarantine." },
                    { t: "3. 14-Day Monitoring", d: "Hold seeds under quarantine for 14 days at normal temperatures. Observe daily swimming patterns and treat with NaCl (salt) immediately if symptoms arise." }
                  ].map((step, idx) => (
                    <div key={idx} className="space-y-0.5 border-l-2 border-slate-100 pl-2.5 sm:pl-3">
                      <span className="font-sans font-black text-slate-900 text-[11px] sm:text-xs">{step.t}</span>
                      <p className="text-slate-500 text-[10px] leading-relaxed">{step.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 2: Cabinet check */}
              <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-3 sm:space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-emerald-600 tracking-wider font-black">Emergency Readiness Kit</span>
                    <h3 className="font-sans font-black text-slate-900 text-sm sm:text-base">The Fisheries Medicine Cabinet Checklist</h3>
                  </div>
                  <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-sans">
                    Keep these basic compound reserves stocked on your farm at all times. Delayed chemical delivery by even 24 hours can double disease mortalities.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs pt-1 sm:pt-2">
                    {[
                      { n: "Non-iodized Coarse Salt", u: "Impedes parasite reproduction" },
                      { n: "Potassium Permanganate", u: "Strong superficial oxidizer" },
                      { n: "Calcium Oxide (Lime)", u: "Elevates pH & sanitizes bottom" },
                      { n: "Methylene Blue", u: "Hatchery egg antifungal agent" },
                      { n: "Hydrogen Peroxide", u: "Biodegradable algae & fungal control" },
                      { n: "Formalin (37%)", u: "Extreme bath treatment for Ich" }
                    ].map((med, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                        <span className="block font-sans font-bold text-slate-900 text-[10px] sm:text-[11px] leading-tight">{med.n}</span>
                        <span className="block text-[9px] text-slate-400 font-mono">{med.u}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-emerald-50/40 border border-emerald-100/50 rounded-xl sm:rounded-2xl flex gap-2 sm:gap-2.5 items-start mt-3 sm:mt-4">
                  <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-700 shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-[10px] sm:text-[10px] text-emerald-950 leading-relaxed font-sans">
                    <strong>Pro-Tip:</strong> Always store chemical containers in a dark, dry, cool storage locker away from direct sunlight to preserve active therapeutic compounds.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

          </div>
          <div className="hidden xl:block shrink-0 sticky top-20">
            <RightSidebarAd reloadKey="diseases-sidebar-ad" />
          </div>
        </div>
      </main>
    </div>
  );
}
