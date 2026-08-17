import React, { useState } from "react";
import { 
  HelpCircle, Search, ChevronDown, ThumbsUp, ThumbsDown, 
  Sparkles, Layers, Waves, Sprout, Droplet, Fish, HeartPulse, Calculator, Phone, CheckCircle2, MessageSquare, ChevronLeft
} from "lucide-react";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "biofloc" | "ras" | "aquaponics" | "pond" | "diseases" | "feeding" | "services";
  categoryLabel: string;
  tags: string[];
}

const FAQ_DATA: FaqItem[] = [
  // --- BIOFLOC ---
  {
    id: "faq-biofloc-1",
    question: "What is Biofloc Technology (BFT) and how does it benefit fish farming?",
    answer: "Biofloc Technology is a sustainable aquaculture system where beneficial heterotrophic bacteria convert toxic ammonia waste into nutrient-rich microbial protein (floc). It operates with zero or minimal water exchange, dramatically reducing water usage and feed costs while enabling high stocking density in tarpaulin tanks.",
    category: "biofloc",
    categoryLabel: "Biofloc Systems",
    tags: ["biofloc", "ammonia", "floc", "tank", "tarpaulin"]
  },
  {
    id: "faq-biofloc-2",
    question: "How do I calculate and dose molasses to maintain the 15:1 C:N ratio in Biofloc?",
    answer: "To maintain a 15:1 Carbon-to-Nitrogen ratio, add organic carbon (like molasses or sugar) based on the crude protein percentage and weight of the daily feed. For example, for 1 kg of 32% protein feed, roughly 100-150g of pre-dissolved molasses is required. You can use our interactive Biofloc Carbon Calculator on this site to get exact dosage amounts.",
    category: "biofloc",
    categoryLabel: "Biofloc Systems",
    tags: ["cn ratio", "molasses", "carbon", "dosing", "calculator"]
  },
  {
    id: "faq-biofloc-3",
    question: "What is the ideal Floc Volume Index (FVI) in an Imhoff cone?",
    answer: "For tilapia and catfish, the target floc volume is 25 ml to 35 ml per litre of tank water measured after 30 minutes of settling in an Imhoff cone. If floc volume exceeds 40 ml/L, run sludge drain valves or reduce carbon dosing; if below 15 ml/L, boost probiotic and carbon supplementation.",
    category: "biofloc",
    categoryLabel: "Biofloc Systems",
    tags: ["imhoff cone", "floc volume", "fvi", "sludge", "probiotic"]
  },
  {
    id: "faq-biofloc-4",
    question: "Why is continuous 24/7 aeration critical for Biofloc tarpaulin tanks?",
    answer: "Biofloc bacteria and dense fish populations both consume large amounts of oxygen. If aeration stops for even 30–60 minutes, Dissolved Oxygen (DO) plummets, causing floc to die and collapse into toxic sludge, resulting in immediate fish mortality. Always maintain backup power or air ring blowers.",
    category: "biofloc",
    categoryLabel: "Biofloc Systems",
    tags: ["aeration", "blower", "dissolved oxygen", "power backup", "tarpaulin"]
  },

  // --- RAS ---
  {
    id: "faq-ras-1",
    question: "What are the core filtration stages in a Recirculating Aquaculture System (RAS)?",
    answer: "A complete commercial RAS includes: 1) Swirl Separator/Drum Filter for solid waste removal, 2) Moving Bed Biofilm Reactor (MBBR) for nitrifying bacteria (converting Ammonia → Nitrite → Nitrate), 3) Protein Skimmer/Degasser for CO2 stripping, and 4) UV Sterilizer/Ozone for pathogen disinfections before re-entering culture tanks.",
    category: "ras",
    categoryLabel: "RAS Technology",
    tags: ["ras", "drum filter", "mbbr", "biofilter", "uv sterilizer", "recirculating"]
  },
  {
    id: "faq-ras-2",
    question: "How does the MBBR biofilter convert toxic Ammonia into harmless Nitrate?",
    answer: "The MBBR biofilter holds plastic media (K1/K3/MBBR media) colonized by two strains of nitrifying bacteria: Nitrosomonas (converts toxic Total Ammonia Nitrogen into toxic Nitrite) and Nitrospira/Nitrobacter (converts Nitrite into relatively harmless Nitrate). Constant air fluidization keeps media suspended.",
    category: "ras",
    categoryLabel: "RAS Technology",
    tags: ["mbbr", "nitrosomonas", "nitrite", "nitrate", "ammonia", "media"]
  },
  {
    id: "faq-ras-3",
    question: "What water flow turnover rate is recommended for intensive RAS?",
    answer: "In commercial fish culture setups, the entire water volume of culture tanks should pass through the filtration loop at least 1.0 to 1.5 times per hour. High stocking density (60-100 kg/m³) requires even faster circulation rates to prevent ammonia accumulation.",
    category: "ras",
    categoryLabel: "RAS Technology",
    tags: ["flow rate", "turnover", "pumps", "circulation", "water exchange"]
  },

  // --- AQUAPONICS & HYDROPONICS ---
  {
    id: "faq-aqua-1",
    question: "How do fish waste nutrients feed crops in an Aquaponic system?",
    answer: "Fish excrete ammonia through their gills and feces. Nitrifying bacteria in grow beds convert ammonia into nitrates, which serve as primary organic liquid fertilizer for plants (lettuce, spinach, tomatoes, herbs). The plants clean the water by absorbing nitrates before returning safe water back to the fish.",
    category: "aquaponics",
    categoryLabel: "Aquaponics & Hydroponics",
    tags: ["aquaponics", "grow beds", "nitrate", "vegetables", "organic fertilizer"]
  },
  {
    id: "faq-aqua-2",
    question: "What are the optimal pH and Electrical Conductivity (EC) levels for hydroponics?",
    answer: "For leafy greens (lettuce, spinach, basil), target a pH range of 5.8 to 6.5 and an EC level of 1.2 to 2.0 mS/cm. In coupled aquaponics, a pH around 6.8 is the ideal compromise between fish safety (6.5-8.0), bacteria efficiency (7.5-8.0), and plant nutrient availability (5.5-6.5).",
    category: "aquaponics",
    categoryLabel: "Aquaponics & Hydroponics",
    tags: ["ph", "ec", "electrical conductivity", "hydroponics", "nutrients"]
  },

  // --- POND FARMING ---
  {
    id: "faq-pond-1",
    question: "What is the recommended stocking density for semi-intensive earthen ponds?",
    answer: "For traditional Indian Major Carp (Rohu, Catla, Mrigal) polyculture, stock 4,000 to 5,000 fingerlings per acre (10,000 to 12,500 per hectare). For intensive feeding ponds with paddlewheel aerators, density can be increased up to 10,000-15,000 fingerlings per acre.",
    category: "pond",
    categoryLabel: "Pond Farming",
    tags: ["pond", "earthen pond", "stocking density", "rohu", "catla", "acre"]
  },
  {
    id: "faq-pond-2",
    question: "Why do Dissolved Oxygen levels drop before sunrise and how can paddlewheels help?",
    answer: "During daytime, pond algae produce oxygen via photosynthesis. At night, algae and fish both consume oxygen, causing DO levels to crash to critical lows (below 3 mg/L) around 3:00 AM – 6:00 AM. Operating paddlewheel aerators overnight circulates surface water and maintains vital oxygen balance.",
    category: "pond",
    categoryLabel: "Pond Farming",
    tags: ["paddlewheel", "dissolved oxygen", "algae", "photosynthesis", "night DO"]
  },
  {
    id: "faq-pond-3",
    question: "What are the benefits of Polyculture farming in Indian freshwater ponds?",
    answer: "Polyculture maximizes natural pond feed across all water layers: Catla feeds on surface plankton, Rohu feeds on mid-water vegetation, and Mrigal/Cyprinus feeds on bottom detritus. This prevents feed waste and yields higher total tonnage per acre.",
    category: "pond",
    categoryLabel: "Pond Farming",
    tags: ["polyculture", "rohu", "catla", "mrigal", "bottom feeder", "carps"]
  },

  // --- DISEASES & WATER QUALITY ---
  {
    id: "faq-disease-1",
    question: "How do I diagnose and treat White Spot Disease (Ich) in fish tanks?",
    answer: "White Spot (Ichthyophthirius multifiliis) presents as tiny white sugar-like dots on fish skin and fins, accompanied by 'flashing' (fish scraping against tank walls). Isolate affected tanks, raise water temperature slightly (if species permits), and perform a 2-3% salt bath (20-30g salt per litre of water for 10-15 minutes) or treat with formalin/malachite green under expert guidance.",
    category: "diseases",
    categoryLabel: "Fish Diseases & Safety",
    tags: ["white spot", "ich", "salt bath", "flashing", "parasite", "disease"]
  },
  {
    id: "faq-disease-2",
    question: "What are safe water parameter limits for freshwater fish culture?",
    answer: "Ideal parameters for most tropical species (Tilapia, Carps, Catfish):\n• Dissolved Oxygen (DO): > 5.0 mg/L\n• pH: 6.8 – 8.2\n• Total Ammonia Nitrogen (TAN): < 0.5 mg/L\n• Un-ionized Ammonia (NH3): < 0.05 mg/L\n• Nitrite (NO2): < 0.2 mg/L\n• Water Temperature: 26°C – 32°C",
    category: "diseases",
    categoryLabel: "Fish Diseases & Safety",
    tags: ["water quality", "ph", "ammonia", "nitrite", "temperature", "dissolved oxygen"]
  },
  {
    id: "faq-disease-3",
    question: "When should I perform a Potassium Permanganate (KMnO4) bath?",
    answer: "Potassium Permanganate is an effective broad-spectrum disinfectant for external bacterial gill rot, body fungus, and protozoan parasites. Apply a short dip at 2 to 4 mg/L in a clean quarantine tank. Avoid over-dosing as high concentrations can damage delicate fish gill filaments.",
    category: "diseases",
    categoryLabel: "Fish Diseases & Safety",
    tags: ["potassium permanganate", "kmno4", "gill rot", "fungus", "disinfectant"]
  },

  // --- FEEDING & FCR ---
  {
    id: "faq-feed-1",
    question: "What is Feed Conversion Ratio (FCR) and what is considered a good value?",
    answer: "FCR measures how many kilograms of feed are required to grow 1 kilogram of fish body weight (FCR = Total Feed Given ÷ Total Weight Gained). An FCR of 1.2 to 1.4 is excellent in commercial aquaculture. Lower FCR means less feed waste and higher profitability.",
    category: "feeding",
    categoryLabel: "Feeding & Nutrition",
    tags: ["fcr", "feed conversion ratio", "pellets", "growth rate", "profitability"]
  },
  {
    id: "faq-feed-2",
    question: "What crude protein percentage should be fed at different growth stages?",
    answer: "Protein requirements decrease as fish mature:\n• Fry / Nursery (0.5g – 10g): 40% – 45% protein micro-pellets\n• Fingerlings (10g – 100g): 32% – 36% floating pellets\n• Grow-out (100g to harvest): 28% – 32% floating pellets",
    category: "feeding",
    categoryLabel: "Feeding & Nutrition",
    tags: ["crude protein", "floating feed", "fry", "fingerling", "grow out"]
  },

  // --- SERVICES & BUSINESS ---
  {
    id: "faq-service-1",
    question: "Does Modern Fisheries supply high-quality fish seed / fingerlings?",
    answer: "Yes! Modern Fisheries provides certified disease-free high-growth fish seed (Mono-sex Tilapia, Jayanti Rohu, Catla, Pangasius, Magur, and Shrimp post-larvae) with doorstep delivery support and oxygen-packing protocols across major farming regions.",
    category: "services",
    categoryLabel: "Services & Supplies",
    tags: ["seed", "fingerlings", "monosex tilapia", "jayanti rohu", "delivery", "supplies"]
  },
  {
    id: "faq-service-2",
    question: "Can Modern Fisheries help me design and set up Biofloc or RAS plants?",
    answer: "Absolutely. We offer complete turn-key engineering solutions including site survey, tarpaulin tank setup, aeration system design, MBBR biofilter sizing, probiotic starter kits, and hands-on staff training. Contact our help desk (+919748952342) to request consultation.",
    category: "services",
    categoryLabel: "Services & Supplies",
    tags: ["turnkey", "consultation", "ras setup", "biofloc tank", "engineering"]
  }
];

interface FaqSectionProps {
  className?: string;
  onContactClick?: () => void;
  onBackToDashboard?: () => void;
}

export default function FaqSection({ className = "", onContactClick, onBackToDashboard }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>("faq-biofloc-1"); // Default open first FAQ
  const [helpfulState, setHelpfulState] = useState<Record<string, "yes" | "no">>({});

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "biofloc", label: "Biofloc Systems", icon: Waves },
    { id: "ras", label: "RAS (Recirculating)", icon: Layers },
    { id: "aquaponics", label: "Aquaponics & Hydro", icon: Sprout },
    { id: "pond", label: "Pond Farming", icon: Fish },
    { id: "diseases", label: "Diseases & Water", icon: HeartPulse },
    { id: "feeding", label: "Feeding & FCR", icon: Calculator },
    { id: "services", label: "Seed & Services", icon: Sparkles },
  ];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleHelpfulClick = (id: string, choice: "yes" | "no", e: React.MouseEvent) => {
    e.stopPropagation();
    setHelpfulState((prev) => ({ ...prev, [id]: choice }));
  };

  return (
    <div className="bg-slate-50 min-h-screen">    
      {/* Premium Dark Theme Hero Banner (Biofloc Page Style) */}
      <div className="relative bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900 text-white p-5 sm:p-10 overflow-hidden shadow-xl border border-teal-800/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-600/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-teal-500/10 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4 text-left">
         
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-800/60 border border-teal-700/50 text-teal-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider animate-pulse">
              <HelpCircle className="w-3.5 h-3.5 text-teal-300" />
              Aquaculture FAQ Knowledge Base
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tight leading-tight">
            Frequently Asked Questions: <span className="text-teal-400">Expert Guidance</span>
          </h1>
          <p className="text-teal-100/90 text-xs sm:text-base leading-relaxed font-sans">
            Expert answers on Biofloc C:N ratios, RAS bio-filtration, fish stocking densities, disease treatments, and feed schedules.
          </p>
        </div>
      </div>

      {/* Sticky Top Advertisement Banner */}
      <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-0.5 my-1 transition-all border-y border-slate-200/80 shadow-xs -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 w-auto">
        <div className="max-w-[1440px] mx-auto">
          <AdBanner reloadKey="faq-main-ad" />
        </div>
      </div>

      {/* Mobile Announcement Card */}
      <div className="lg:hidden my-1 px-3 sm:px-6">
        <OwnCirclesAnnouncement mode="mobile" />
      </div>

      {/* Main Page Content 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 sm:gap-8 items-start w-full min-w-0 p-3 sm:p-6 lg:p-8">
        <div className="lg:col-span-8 xl:col-span-9 space-y-6 sm:space-y-12 w-full min-w-0">

          <section id="faq-section" className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/80 shadow-sm space-y-6 w-full max-w-full overflow-hidden ${className}`}>
            
            {/* Header Bar with Live Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1 text-left">
                <h2 className="font-sans font-black text-lg sm:text-xl text-slate-900 tracking-tight">
                  Search Topics & Query Library
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Filter by category or type keywords to find solutions fast.
                </p>
              </div>

              {/* Live Search Bar */}
              <div className="relative w-full md:w-72 lg:w-80 shrink-0">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search FAQs (e.g. C:N ratio, FCR, Ich)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 focus:border-emerald-600 focus:bg-white rounded-xl text-xs sm:text-sm font-sans focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs Scrollable Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl font-sans font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 ${
                      isActive
                        ? "bg-[#1877F2] text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200/80 text-slate-600"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* FAQ Accordion List */}
            <div className="space-y-3 w-full">
              {filteredFaqs.length === 0 ? (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-2">
                  <HelpCircle className="w-8 h-8 text-slate-400 mx-auto animate-bounce" />
                  <h3 className="font-bold text-slate-800 text-sm">No matching questions found</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Try adjusting your search terms or browse all categories to explore technical aquaculture topics.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = expandedId === faq.id;
                  const userFeedback = helpfulState[faq.id];

                  return (
                    <div
                      key={faq.id}
                      className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? "border-blue-300 bg-blue-50/20 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      {/* Question Accordion Header */}
                      <button
                        type="button"
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer group"
                      >
                        <div className="space-y-1.5 min-w-0 pr-2">
                          <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                            {faq.categoryLabel}
                          </span>
                          <h3 className="font-sans font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#1877F2] transition-colors leading-snug">
                            {faq.question}
                          </h3>
                        </div>

                        <div className={`p-1.5 rounded-full shrink-0 transition-transform duration-200 ${isOpen ? "bg-blue-100 text-[#1877F2] rotate-180" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Answer Accordion Content */}
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 text-left space-y-4 animate-fadeIn">
                          <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans font-normal bg-white p-3.5 sm:p-4 rounded-xl border border-slate-100 shadow-2xs">
                            {faq.answer}
                          </div>

                          {/* Interactive "Was this helpful?" Footer Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-500">Was this answer helpful?</span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={(e) => handleHelpfulClick(faq.id, "yes", e)}
                                  className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                    userFeedback === "yes"
                                      ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                                      : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>Yes</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleHelpfulClick(faq.id, "no", e)}
                                  className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                    userFeedback === "no"
                                      ? "bg-rose-100 border-rose-300 text-rose-800"
                                      : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                  <span>No</span>
                                </button>
                              </div>
                              {userFeedback && (
                                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 ml-1 animate-fadeIn">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Thanks for your feedback!</span>
                                </span>
                              )}
                            </div>

                            {/* Tag list */}
                            <div className="hidden sm:flex items-center gap-1 flex-wrap">
                              {faq.tags.slice(0, 3).map((tag, tIdx) => (
                                <span key={`tag-${tIdx}`} className="text-[9px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Callout Box for Additional Questions */}
            <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-950 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-emerald-800/40 text-left">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>Have a Specific Farming Query?</span>
                </div>
                <h3 className="font-sans font-extrabold text-base sm:text-lg text-white tracking-tight">
                  Need Direct Consultation or Technical Assistance?
                </h3>
                <p className="text-slate-300 text-xs max-w-xl leading-relaxed">
                  Our aquaculture experts offer technical guidance on tarpaulin tank setups, feed optimization, seed supply, and disease management.
                </p>
              </div>

              <button
                onClick={onContactClick}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-sans font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
              >
                <Phone className="w-4 h-4 animate-pulse shrink-0" />
                <span>Ask Our Experts (+919748952342)</span>
              </button>
            </div>

          </section>

        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-20">
          <RightSidebarAd reloadKey="faq-sidebar" />
        </div>
      </div>
    </div>
  );
}
