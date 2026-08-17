import React, { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft, Calculator, Scale, Sparkles, CheckCircle2, 
  Info, ShieldCheck, Layers, Activity, TrendingUp, HelpCircle,
  Award, Fish, Thermometer, Droplet, Zap, HeartPulse, ChevronLeft, ChevronRight, Flame, Check,
  ShoppingBag, Package, ExternalLink, Truck, ShoppingCart, Mail, MessageSquare, Phone, Send, FileText, PhoneCall, Copy, MessageCircle
} from "lucide-react";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";
import { Video } from "../types";
import VideoCard from "./VideoCard";
import { fetchYouTubeChannelVideos, fetchTrendingTopicVideos } from "../youtubeFeed";

interface FeedingPageProps {
  onBackToDashboard?: () => void;
  onVideoClick?: (video: Video) => void;
}

const INITIAL_FEEDING_VIDEOS: Video[] = [
  {
    id: "feed-yt-1",
    title: "High-Density Catfish Feeding & Growth Rate Management",
    description: "Masterclass on optimizing feed conversion ratios (FCR), calculating biomass percentage, and automated feeding schedules for catfish.",
    thumbnail: "https://img.youtube.com/vi/JRuooOjHXQA/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/JRuooOjHXQA",
    duration: "13:25",
    views: "115K views",
    type: "youtube",
    creator: "Modern Fisheries",
    publishDate: "1 month ago",
    category: "Feeding",
    likes: 3800
  },
  {
    id: "feed-yt-2",
    title: "Automatic Fish Feeder Installation & Timer Calibration",
    description: "Step-by-step setup of solar belt feeders and electronic timer dispensers to eliminate feed waste and optimize growth rates.",
    thumbnail: "https://img.youtube.com/vi/YQ_6Q8j4Nf8/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/YQ_6Q8j4Nf8",
    duration: "14:15",
    views: "92K views",
    type: "youtube",
    creator: "Smart Farm Lab",
    publishDate: "2 weeks ago",
    category: "Feeding",
    likes: 2900
  },
  {
    id: "feed-yt-3",
    title: "How to Calculate Feed Conversion Ratio (FCR) & Daily Biomass Feed",
    description: "Mathematical formulas for calculating daily feed dosage based on average body weight, sampling protocols, and water temperature adjustments.",
    thumbnail: "https://img.youtube.com/vi/Vk4LjqlbwnU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Vk4LjqlbwnU",
    duration: "18:40",
    views: "81K views",
    type: "youtube",
    creator: "Aquaculture Feed Academy",
    publishDate: "3 weeks ago",
    category: "Feeding",
    likes: 2600
  },
  {
    id: "feed-yt-4",
    title: "Floating vs Sinking Fish Pellets: Protein % and Pellet Sizing",
    description: "Understanding floating extruded vs sinking compressed feeds for tilapia, carps, and pangasius catfish across different growth stages.",
    thumbnail: "https://img.youtube.com/vi/QycqPG5uQOQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/QycqPG5uQOQ",
    duration: "16:20",
    views: "74K views",
    type: "youtube",
    creator: "Modern Fisheries",
    publishDate: "2 months ago",
    category: "Feeding",
    likes: 2200
  },
  {
    id: "feed-yt-5",
    title: "Starter Crumble Feeding for Fry & Fingerlings in Hatcheries",
    description: "High-protein micro-crumble feeding routines for newborn fry to maximize survival rates and prevent skeletal deformities.",
    thumbnail: "https://img.youtube.com/vi/Ho7avoab_oE/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Ho7avoab_oE",
    duration: "12:50",
    views: "68K views",
    type: "youtube",
    creator: "Hatchery Feed Tech",
    publishDate: "1 month ago",
    category: "Feeding",
    likes: 1950
  },
  {
    id: "feed-yt-6",
    title: "Impact of Water Temperature & Dissolved Oxygen on Feeding Rates",
    description: "Why fish stop feeding when oxygen drops below 4 ppm or temperatures spike, and how to prevent organic waste buildup.",
    thumbnail: "https://img.youtube.com/vi/VRRy6XBfLQc/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/VRRy6XBfLQc",
    duration: "15:10",
    views: "59K views",
    type: "youtube",
    creator: "Aqua Nutrition Hub",
    publishDate: "3 weeks ago",
    category: "Feeding",
    likes: 1780
  }
];

// Data structures for the Feeding System guidelines
interface AgeWiseStage {
  id: string;
  stage: string;
  ageDays: string;
  averageWeight: string;
  pelletSize: string;
  proteinRequired: string;
  feedRatePct: string;
  frequency: string;
  description: string;
}

interface NutritionComponent {
  name: string;
  percentage: string;
  role: string;
  subComponents: string[];
  color: string;
  icon: any;
}

interface FishFeedingConfig {
  species: string;
  feedType: string;
  growoutProtein: string;
  fcrRange: string;
  dailyRateRange: string;
  frequency: string;
  optimalTemp: string;
  keyStrategy: string;
  details: string;
}

const AGE_WISE_STAGES: AgeWiseStage[] = [
  {
    id: "spawn",
    stage: "Spawn / Hatchlings",
    ageDays: "1 - 10 Days",
    averageWeight: "< 0.05 grams",
    pelletSize: "Micro-dust / Powder (< 0.3mm)",
    proteinRequired: "45% - 50%",
    feedRatePct: "15% - 20% of Biomass",
    frequency: "6 - 8 times / day",
    description: "Larval nutrition requires ultra-high water-soluble protein and highly digestible amino acids. Sieve powder finely to prevent gill choking."
  },
  {
    id: "fry",
    stage: "Early Fry Stage",
    ageDays: "11 - 30 Days",
    averageWeight: "0.05 - 2.0 grams",
    pelletSize: "Starter Crumble (0.5mm - 0.8mm)",
    proteinRequired: "40% - 45%",
    feedRatePct: "10% - 15% of Biomass",
    frequency: "5 - 6 times / day",
    description: "Rapid skeletal development occurs during this phase. High calcium, phosphorus, and vitamin C levels are vital to avoid skeletal deformities."
  },
  {
    id: "fingerling",
    stage: "Fingerlings (Nursery)",
    ageDays: "31 - 60 Days",
    averageWeight: "2.0 - 15.0 grams",
    pelletSize: "1.2mm - 1.5mm Micro Pellets",
    proteinRequired: "38% - 40%",
    feedRatePct: "6% - 10% of Biomass",
    frequency: "4 times / day",
    description: "Active transition phase where digestive enzymes mature. Begin utilizing highly stable floating starter feeds."
  },
  {
    id: "juvenile",
    stage: "Juveniles / Advanced Fingerlings",
    ageDays: "61 - 90 Days",
    averageWeight: "15.0 - 50.0 grams",
    pelletSize: "1.8mm - 2.5mm Floating Pellets",
    proteinRequired: "32% - 35%",
    feedRatePct: "4% - 6% of Biomass",
    frequency: "3 - 4 times / day",
    description: "Peak muscle fiber recruitment. Maintain highly oxidized lipid sources and balanced protein-to-energy ratios for fat-free growth."
  },
  {
    id: "growout",
    stage: "Active Grow-Out Phase",
    ageDays: "91 - 150 Days",
    averageWeight: "50.0 - 250.0 grams",
    pelletSize: "3.0mm - 4.0mm Floating/Sinking",
    proteinRequired: "30% - 32%",
    feedRatePct: "2.5% - 4% of Biomass",
    frequency: "2 - 3 times / day",
    description: "Standard commercial growth period. Pellets must have excellent water stability (at least 20 minutes) to prevent nutrient leaching."
  },
  {
    id: "finisher",
    stage: "Finishing / Pre-Harvest",
    ageDays: "151+ Days",
    averageWeight: "250.0 - 600.0+ grams",
    pelletSize: "4.5mm - 6.0mm Large Pellets",
    proteinRequired: "28% - 30%",
    feedRatePct: "1.5% - 2.5% of Biomass",
    frequency: "2 times / day",
    description: "Optimized for market muscle retention. Avoid excessive carbohydrates in this phase to prevent oily flesh and improve shelf life."
  }
];

const NUTRITION_COMPONENTS: NutritionComponent[] = [
  {
    name: "Crude Protein",
    percentage: "28% - 48%",
    role: "The structural foundation of fish tissues. Dictates weight gain and feed conversion efficiency.",
    subComponents: [
      "Essential Amino Acids (Lysine, Methionine)",
      "Highly digestible fish meal (anchovy/herring)",
      "Premium soybean meal protein isolates"
    ],
    color: "emerald",
    icon: Layers
  },
  {
    name: "Crude Lipids & Fats",
    percentage: "5% - 12%",
    role: "Primary concentrated energy source. Spares proteins from being metabolized for energy.",
    subComponents: [
      "Highly Unsaturated Fatty Acids (HUFA)",
      "Omega-3 & Omega-6 marine fish oils",
      "Phospholipids (Lecithin) for cell membrane fluidness"
    ],
    color: "sky",
    icon: Droplet
  },
  {
    name: "Carbohydrates",
    percentage: "15% - 25%",
    role: "Supplies metabolic energy. Serves as a binder for feed pellet structural buoyancy.",
    subComponents: [
      "Extruded corn starch & wheat flour",
      "Gelatinized carbohydrates for optimal digestibility",
      "Strict control: excess triggers liver fat storage"
    ],
    color: "amber",
    icon: Zap
  },
  {
    name: "Minerals & Ash",
    percentage: "8% - 11%",
    role: "Crucial for bone density, osmotic pressure, and heavy enzyme pathways.",
    subComponents: [
      "Mono-calcium phosphate (highly bioavailable)",
      "Divalent trace elements (Iron, Zinc, Manganese)",
      "Electrolytes (Sodium, Potassium) for cellular equilibrium"
    ],
    color: "indigo",
    icon: Scale
  },
  {
    name: "Vitamins & Trace Nutrients",
    percentage: "1.5% - 3%",
    role: "Fortifies the immune barrier, disease resistance, and prevents skin/gill lesions.",
    subComponents: [
      "Stable L-ascorbyl-2-polyphosphate (Vitamin C)",
      "Alpha-tocopherol acetate (Vitamin E - antioxidant)",
      "B-Complex mix (metabolic speed & cell division)"
    ],
    color: "rose",
    icon: HeartPulse
  },
  {
    name: "Growth Boosters & Immuno-Stimulants",
    percentage: "0.5% - 1.5%",
    role: "Triggers macrophage cell response and thickens mucous slime coat layers.",
    subComponents: [
      "Yeast Beta-Glucans (brewing origin)",
      "Mannan-oligosaccharides (MOS) gut prebiotic",
      "Probiotic blends (Bacillus subtilis, Lactobacillus)"
    ],
    color: "purple",
    icon: Sparkles
  }
];

const FISH_WISE_CONFIGS: FishFeedingConfig[] = [
  {
    species: "Nile Tilapia (Surface Feeder)",
    feedType: "Floating",
    growoutProtein: "30% - 32%",
    fcrRange: "1.2 - 1.4",
    dailyRateRange: "2.0% - 3.5% body wt",
    frequency: "2 - 3 times / day",
    optimalTemp: "26°C - 31°C",
    keyStrategy: "Satiation feeding up to 80% to avoid waste. Adapts well to agricultural byproducts.",
    details: "Tilapia are aggressive surface feeders. Always use floating extruded pellets to easily monitor intake and prevent uneaten feed from sinking and spoiling biofloc/pond beds. Feed should be split across morning (9:00 AM) and mid-afternoon (3:00 PM) sessions."
  },
  {
    species: "Pangasius Catfish (Column/Bottom)",
    feedType: "Sinking / Slow-sinking",
    growoutProtein: "26% - 28%",
    fcrRange: "1.3 - 1.5",
    dailyRateRange: "1.8% - 3.0% body wt",
    frequency: "2 times / day",
    optimalTemp: "27°C - 32°C",
    keyStrategy: "Steady dispersion over a wider surface. Prone to fat build-up if overfed high-protein feeds.",
    details: "Pangasius are extremely high-density bottom and water column feeders. Sinking or slow-sinking pellets are preferred to match their native bottom scavenging instincts. Avoid overfeeding as they have an incredibly fast digestion cycle, but high conversion variance."
  },
  {
    species: "Rohu / Catla (Indian Major Carps)",
    feedType: "Sinking / Slow-sinking",
    growoutProtein: "28% - 32%",
    fcrRange: "1.5 - 1.8",
    dailyRateRange: "2.0% - 3.0% body wt",
    frequency: "2 - 3 times / day",
    optimalTemp: "24°C - 30°C",
    keyStrategy: "Maintain stable plankton blooms to supplement commercial feeds with natural micro-fauna.",
    details: "Rohu and Catla are polyculture staples. Catla feeds mostly at the surface (can accept floating), while Rohu is a column feeder. Ensure sinking crumbles are placed on designated underwater feeding trays or broadcast uniformly to minimize sediment waste."
  },
  {
    species: "Asian Seabass (Barramundi - Carnivorous)",
    feedType: "High-Energy Floating",
    growoutProtein: "42% - 45%",
    fcrRange: "1.1 - 1.3",
    dailyRateRange: "1.5% - 2.5% body wt",
    frequency: "1 - 2 times / day",
    optimalTemp: "26°C - 30°C",
    keyStrategy: "Strict sizing matching; carnivorous behavior triggers severe cannibalism if sizes vary.",
    details: "Seabass require highly specialized, marine-sourced fishmeal protein with high lipid energy (8-12%). Feed is highly expensive, so automated timer feeders are recommended to provide precise portions. Perform frequent grading of stock to keep sizes uniform."
  },
  {
    species: "Common Carp (Bottom Forager)",
    feedType: "Sinking",
    growoutProtein: "30% - 34%",
    fcrRange: "1.4 - 1.6",
    dailyRateRange: "2.0% - 3.0% body wt",
    frequency: "2 times / day",
    optimalTemp: "22°C - 28°C",
    keyStrategy: "Avoid dusty/crumbled sinking feeds; pellets must be highly compact and clay-bound.",
    details: "Common carps are bottom rooters that sift sediment. Use hard-pressed sinking pellets that do not disintegrate instantly on contact with water. High carbohydrate levels (up to 30%) are acceptable due to their highly developed intestinal amylase activity."
  }
];

export default function FeedingPage({ onBackToDashboard, onVideoClick }: FeedingPageProps) {
  const [activeTab, setActiveTab] = useState<"stages" | "nutrition" | "species" | "calibrator">("stages");

  // Fish Food Sales & Quotation Inquiry States
  const [inquirySpecies, setInquirySpecies] = useState("Tilapia & Pangasius");
  const [inquiryFeedType, setInquiryFeedType] = useState("32% - 38% Extruded Floating Pellets");
  const [inquiryQuantity, setInquiryQuantity] = useState("1 Ton Bulk");
  const [inquiryLocation, setInquiryLocation] = useState("");
  const [inquiryContact, setInquiryContact] = useState("");
  const [inquiryNotes, setInquiryNotes] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedContact(type);
      setTimeout(() => setCopiedContact(null), 2500);
    }
  };

  const getWhatsAppInquiryUrl = () => {
    const msg = `Hello Modern Fisheries Team,\n\nI want to get the best price quotation for Fish Food Supply:\n\n• Fish Species: ${inquirySpecies}\n• Feed Type: ${inquiryFeedType}\n• Required Quantity: ${inquiryQuantity}\n• Delivery Location: ${inquiryLocation || "Not specified"}\n• Contact Info: ${inquiryContact || "Direct WhatsApp"}\n• Additional Notes: ${inquiryNotes || "N/A"}\n\nPlease share your best quotation & delivery terms. Thank you!`;
    return `https://wa.me/919748952342?text=${encodeURIComponent(msg)}`;
  };

  const getEmailInquiryUrl = () => {
    const subject = `Fish Food Wholesale Quotation Inquiry - ${inquirySpecies}`;
    const body = `Hello Modern Fisheries Sales Team,\n\nI would like to request a quotation for purchasing commercial fish food:\n\n- Fish Species: ${inquirySpecies}\n- Feed Type: ${inquiryFeedType}\n- Required Quantity: ${inquiryQuantity}\n- Delivery Location / Pin Code: ${inquiryLocation || "N/A"}\n- Phone / WhatsApp: ${inquiryContact || "N/A"}\n- Specific Requirements: ${inquiryNotes || "N/A"}\n\nPlease reply with the best price quotation and product specifications.\n\nThank you!`;
    return `mailto:mf@owncircles.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Video slider states
  const [feedingVideos, setFeedingVideos] = useState<Video[]>(INITIAL_FEEDING_VIDEOS);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef<number>(0);
  const [isVideosHovered, setIsVideosHovered] = useState<boolean>(false);
  const [showViralOnly, setShowViralOnly] = useState<boolean>(false);

  const isVideoViral = (v: Video) => {
    const viewsStr = v.views.toLowerCase();
    if (viewsStr.includes("m")) return true;
    const num = parseFloat(viewsStr);
    if (!isNaN(num) && num >= 50) return true;
    return false;
  };

  const scrollVideos = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = 340;
      const newScrollLeft = direction === "left" 
        ? el.scrollLeft - scrollAmount 
        : el.scrollLeft + scrollAmount;
      
      el.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
      scrollPosRef.current = newScrollLeft;
    }
  };

  // Continuous smooth auto-scroll effect
  useEffect(() => {
    let animationFrameId: number;

    const updateSliding = () => {
      if (!isVideosHovered && scrollRef.current) {
        const el = scrollRef.current;
        const halfWidth = el.scrollWidth / 2;

        if (halfWidth > 0) {
          scrollPosRef.current += 0.8;

          if (scrollPosRef.current >= halfWidth) {
            scrollPosRef.current -= halfWidth;
          } else if (scrollPosRef.current < 0) {
            scrollPosRef.current += halfWidth;
          }

          el.scrollLeft = Math.round(scrollPosRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(updateSliding);
    };

    animationFrameId = requestAnimationFrame(updateSliding);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVideosHovered]);

  useEffect(() => {
    async function loadDynamicFeedingVideos() {
      try {
        const liveTopic1 = await fetchTrendingTopicVideos(false, "fish feeding FCR growth management");
        const liveTopic2 = await fetchTrendingTopicVideos(false, "fish feed pellets nutrition aquaculture");
        const combined = [...liveTopic1, ...liveTopic2];

        if (combined.length > 0) {
          const feedSpecific = combined.filter(v => {
            const text = (v.title + " " + v.description).toLowerCase();
            const hasFeedKeywords = text.includes("feeding") || text.includes("fcr") || text.includes("pellet") || text.includes("fish feed") || text.includes("feed management") || text.includes("nutrition") || text.includes("biomass feed") || text.includes("diet");
            const isIrrelevant = text.includes("biofloc setup") || text.includes("ras construction") || text.includes("pond construction") || text.includes("disease treatment");
            return hasFeedKeywords && !isIrrelevant;
          });

          if (feedSpecific.length > 0) {
            // Deduplicate by ID
            const uniqueMap = new Map<string, Video>();
            [...feedSpecific, ...INITIAL_FEEDING_VIDEOS].forEach(v => {
              if (!uniqueMap.has(v.id)) {
                uniqueMap.set(v.id, v);
              }
            });
            setFeedingVideos(Array.from(uniqueMap.values()).slice(0, 10));
          }
        }
      } catch (e) {
        // Fallback to initial
      }
    }
    loadDynamicFeedingVideos();
  }, []);

  // Calibrator Input State
  const [species, setSpecies] = useState<string>("Tilapia");
  const [totalFish, setTotalFish] = useState<number>(5000);
  const [avgWeight, setAvgWeight] = useState<number>(120); // in grams
  const [temp, setTemp] = useState<number>(27); // in Celsius

  // Calculation Logic for interactive Feed Calibrator
  const runCalibrations = () => {
    // 1. Determine Feed Rate % based on species and average weight
    let baseRate = 3.0; // default 3%
    let pelletSize = "3.0 mm";
    let proteinPct = "32%";
    let type = "Floating";

    if (species === "Tilapia") {
      type = "Floating Extruded";
      if (avgWeight < 5) { baseRate = 12.0; pelletSize = "0.5mm Crumble"; proteinPct = "45%"; }
      else if (avgWeight < 20) { baseRate = 8.0; pelletSize = "1.2mm Nursery"; proteinPct = "40%"; }
      else if (avgWeight < 100) { baseRate = 5.0; pelletSize = "1.8mm Grower"; proteinPct = "35%"; }
      else if (avgWeight < 300) { baseRate = 3.0; pelletSize = "3.0mm Grower-1"; proteinPct = "32%"; }
      else { baseRate = 2.0; pelletSize = "4.0mm Finisher"; proteinPct = "30%"; }
    } else if (species === "Pangasius Catfish") {
      type = "Sinking / Slow-sinking";
      if (avgWeight < 5) { baseRate = 10.0; pelletSize = "0.6mm Crumble"; proteinPct = "40%"; }
      else if (avgWeight < 20) { baseRate = 6.5; pelletSize = "1.5mm Nursery"; proteinPct = "35%"; }
      else if (avgWeight < 100) { baseRate = 4.0; pelletSize = "2.0mm Micro"; proteinPct = "32%"; }
      else if (avgWeight < 300) { baseRate = 2.5; pelletSize = "3.5mm Grower"; proteinPct = "28%"; }
      else { baseRate = 1.8; pelletSize = "4.5mm Finisher"; proteinPct = "26%"; }
    } else if (species === "Asian Seabass") {
      type = "High-Energy Floating";
      if (avgWeight < 5) { baseRate = 15.0; pelletSize = "0.5mm Starter"; proteinPct = "50%"; }
      else if (avgWeight < 20) { baseRate = 10.0; pelletSize = "1.2mm Nursery"; proteinPct = "48%"; }
      else if (avgWeight < 100) { baseRate = 4.5; pelletSize = "2.2mm Grower"; proteinPct = "45%"; }
      else if (avgWeight < 300) { baseRate = 2.5; pelletSize = "3.5mm Developer"; proteinPct = "42%"; }
      else { baseRate = 1.6; pelletSize = "5.0mm Finisher"; proteinPct = "40%"; }
    } else { // Carps / Others
      type = "Sinking Compact";
      if (avgWeight < 5) { baseRate = 10.0; pelletSize = "0.5mm Crumble"; proteinPct = "42%"; }
      else if (avgWeight < 20) { baseRate = 7.0; pelletSize = "1.2mm Nursery"; proteinPct = "38%"; }
      else if (avgWeight < 100) { baseRate = 4.0; pelletSize = "2.0mm Pellet"; proteinPct = "32%"; }
      else if (avgWeight < 300) { baseRate = 2.8; pelletSize = "3.0mm Pellet"; proteinPct = "30%"; }
      else { baseRate = 1.8; pelletSize = "4.0mm Pellet"; proteinPct = "28%"; }
    }

    // 2. Adjust rate based on temperature (metabolic modifier)
    let tempFactor = 1.0;
    let tempWarning = "";
    if (temp < 18) {
      tempFactor = 0.15;
      tempWarning = "Cold water! Fish metabolism has halted. Reduce feed drastically to prevent water contamination.";
    } else if (temp < 22) {
      tempFactor = 0.55;
      tempWarning = "Suboptimal cool water. Slow digestion detected. Reduce feed to 55% of standard rate.";
    } else if (temp > 33) {
      tempFactor = 0.40;
      tempWarning = "Extreme hot water! Danger of oxygen depletion and stress. Suspend feed or reduce to 40%.";
    } else if (temp >= 26 && temp <= 31) {
      tempFactor = 1.05; // Peak metabolic speed
    }

    const finalRate = baseRate * tempFactor;
    const totalBiomassKg = (totalFish * avgWeight) / 1000;
    const dailyFeedKg = (totalBiomassKg * (finalRate / 100));
    const feedPerSession = dailyFeedKg / (avgWeight < 15 ? 4 : 2);

    return {
      totalBiomassKg: Math.round(totalBiomassKg),
      feedRatePct: parseFloat(finalRate.toFixed(2)),
      dailyFeedKg: parseFloat(dailyFeedKg.toFixed(2)),
      feedPerSession: parseFloat(feedPerSession.toFixed(2)),
      pelletSize,
      proteinPct,
      type,
      tempWarning
    };
  };

  const calcs = runCalibrations();

  return (
    <div className="bg-slate-50 min-h-screen">  
    {/* Hero Section */}
        <div className="relative bg-emerald-950 text-white p-4 sm:p-8 md:p-12  overflow-hidden shadow-2xl border border-emerald-900">
 
          <div className="relative z-10 max-w-3xl space-y-4 text-left">
            <span className="bg-yellow-400/20 text-yellow-300 font-mono text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full">
              ★ Technical Expert Factsheet
            </span>
            <h1 className="font-serif italic font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Feeding & Nutrition Management System
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Precision feeding is the thin line between profitability and financial loss. Master feed pellet sizing, progressive protein ratios, and metabolic water temperature adjustments for sustainable grow-out cycles.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-semibold text-emerald-200">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Good Growth Standard</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span>Immunological Safety</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
                <Activity className="w-4 h-4 text-sky-400" />
                <span>FCR Optimization</span>
              </div>
            </div>
          </div>
        </div>
        
      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        
        

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

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/60 p-1.5 rounded-2xl mb-8">
          <button
            onClick={() => setActiveTab("stages")}
            className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all ${
              activeTab === "stages"
                ? "bg-white text-emerald-950 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Age-Wise Chart</span>
          </button>
          
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all ${
              activeTab === "nutrition"
                ? "bg-white text-emerald-950 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Protein Composition</span>
          </button>

          <button
            onClick={() => setActiveTab("species")}
            className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all ${
              activeTab === "species"
                ? "bg-white text-emerald-950 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <Fish className="w-4 h-4" />
            <span>Fish-Wise Sizing</span>
          </button>

          <button
            onClick={() => setActiveTab("calibrator")}
            className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all ${
              activeTab === "calibrator"
                ? "bg-white text-emerald-950 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Live Calibrator</span>
          </button>
        </div>

        {/* Tab 1: Age-wise feeding stages */}
        {activeTab === "stages" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                <div className="space-y-1">
                  <h3 className="font-sans font-black text-slate-950 text-lg tracking-tight">
                    Progressive Sizing and Feeding Rate Protocols
                  </h3>
                  <p className="text-slate-500 text-xs">
                    As fish mature, their absolute weight increases but metabolic energy requirements per gram decline.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 shrink-0 uppercase tracking-widest">
                  ⏱ Hatchery to grow-out schedules
                </span>
              </div>

              {/* Responsive Cards/Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AGE_WISE_STAGES.map((stage, i) => (
                  <div key={stage.id} className="bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-5 border border-slate-200/70 shadow-2xs hover:shadow-sm transition-all space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-100/60 px-2 py-0.5 rounded-md">
                          Stage 0{i + 1} • {stage.ageDays}
                        </span>
                        <h4 className="font-sans font-extrabold text-slate-900 text-sm leading-tight">
                          {stage.stage}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-black text-slate-400 bg-slate-100 border border-slate-200 w-6 h-6 flex items-center justify-center rounded-full shrink-0">
                        {i + 1}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed min-h-[48px]">
                      {stage.description}
                    </p>

                    <div className="pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="block text-xs sm:text-[13px] text-slate-500 font-bold uppercase tracking-wide">Avg Fish Wt</span>
                        <span className="font-extrabold text-slate-900 text-base sm:text-lg">{stage.averageWeight}</span>
                      </div>
                      <div>
                        <span className="block text-xs sm:text-[13px] text-slate-500 font-bold uppercase tracking-wide">Pellet Size</span>
                        <span className="font-extrabold text-slate-900 text-base sm:text-lg">{stage.pelletSize}</span>
                      </div>
                      <div className="pt-1">
                        <span className="block text-xs sm:text-[13px] text-slate-500 font-bold uppercase tracking-wide">Protein Target</span>
                        <span className="font-extrabold text-emerald-800 text-base sm:text-lg">{stage.proteinRequired}</span>
                      </div>
                      <div className="pt-1">
                        <span className="block text-xs sm:text-[13px] text-slate-500 font-bold uppercase tracking-wide">Daily Feed Pct</span>
                        <span className="font-extrabold text-blue-700 text-base sm:text-lg">{stage.feedRatePct}</span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-150 flex items-center gap-2 text-[11px] text-slate-600">
                      <Activity className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Frequency: <strong>{stage.frequency}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crucial Feed Practices Banner */}
            <div className="bg-emerald-50 border border-emerald-100/80 rounded-3xl p-6 flex flex-col md:flex-row gap-5 items-start">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-2 text-slate-700">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Optimal Feed Transition Guideline</h4>
                <p className="text-xs leading-relaxed">
                  Never change feed pellet sizes abruptly. Mix the older pellet size with the new size (e.g., 75/25, 50/50, 25/75 ratio) over a span of <strong>4 - 6 days</strong>. This ensures the fish digestive systems adapt to the altered hardness, swelling coefficients, and sink rates of different sized pellets, preventing bloating or localized stress.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Protein Composition & Nutrient formulas */}
        {activeTab === "nutrition" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-sans font-black text-slate-950 text-lg tracking-tight">
                  Commercial Feed Nutrient Breakdown & Composition Formula
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Each pellet is a complete biochemical packet. Understanding ingredient quality is key to high growth rates and strong immunity.
                </p>
              </div>

              {/* Bento Grid layout of Nutritional Components */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {NUTRITION_COMPONENTS.map((comp, idx) => {
                  const Icon = comp.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 shadow-2xs">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100`}>
                            <Icon className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="font-mono font-black text-slate-800 text-xs sm:text-sm bg-slate-100/80 px-2.5 py-1 rounded-full">
                            {comp.percentage}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-sans font-extrabold text-slate-900 text-sm">
                            {comp.name}
                          </h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed">
                            {comp.role}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 space-y-1.5">
                        <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">Key Elements:</span>
                        <ul className="text-[10px] text-slate-600 space-y-1">
                          {comp.subComponents.map((sub, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0" />
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feed Storage Protocol */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-sans font-extrabold text-slate-900 text-sm mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Good Storage and Security Practices (Anti-Mold)</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-xs space-y-1.5">
                    <span className="font-bold text-amber-800 uppercase text-[9px] tracking-wider block">1. Zero Moisture Contact</span>
                    <p className="text-slate-600 leading-relaxed">
                      Store bags on wooden pallets elevated 15cm off the floor and away from brick walls to prevent damp condensation and toxic Aflatoxin/molds.
                    </p>
                  </div>
                  <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 text-xs space-y-1.5">
                    <span className="font-bold text-sky-800 uppercase text-[9px] tracking-wider block">2. First-In, First-Out (FIFO)</span>
                    <p className="text-slate-600 leading-relaxed">
                      Vitamin C and lipid contents degrade gradually over time. Always use older inventory first. Discard feeds older than 90 days from manufacture.
                    </p>
                  </div>
                  <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 text-xs space-y-1.5">
                    <span className="font-bold text-rose-800 uppercase text-[9px] tracking-wider block">3. Temp & Pest Guard</span>
                    <p className="text-slate-600 leading-relaxed">
                      Keep feed warehouse temperatures below 28°C. Ensure tight physical rat/rodent proofing and use standard insect screen mesh.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Fish-Wise feeding guidelines */}
        {activeTab === "species" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-sans font-black text-slate-950 text-lg tracking-tight">
                  Species-Specific Sizing & Feeding Guidelines
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Every fish group has adapted oral dimensions and feeding behaviors. Customize density-rate ratios to eliminate wastage.
                </p>
              </div>

              {/* Species Feeding cards */}
              <div className="space-y-6">
                {FISH_WISE_CONFIGS.map((config, idx) => (
                  <div key={idx} className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col lg:flex-row gap-6">
                    {/* Left block - title */}
                    <div className="lg:w-1/3 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <Fish className="w-5 h-5" />
                        </div>
                        <h4 className="font-sans font-black text-slate-900 text-base">
                          {config.species}
                        </h4>
                      </div>
                      
                      <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span className="text-slate-400 text-[10px] uppercase">Pellet Nature:</span>
                          <span className="font-bold text-slate-800">{config.feedType}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-1">
                          <span className="text-slate-400 text-[10px] uppercase">Protein target:</span>
                          <span className="font-bold text-emerald-800">{config.growoutProtein}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-[10px] uppercase">Target FCR:</span>
                          <span className="font-bold text-blue-700">{config.fcrRange}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right block - details and strategies */}
                    <div className="lg:w-2/3 space-y-4">
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {config.details}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs">
                          <span className="block font-bold text-slate-800 text-[11px] mb-1">Key Growth Strategy:</span>
                          <span className="text-slate-500 leading-relaxed block text-[11px]">{config.keyStrategy}</span>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs font-mono grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="block text-[9px] text-slate-400 uppercase">Optimal Temp</span>
                            <span className="font-bold text-slate-800 text-[11px]">{config.optimalTemp}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-slate-400 uppercase">Daily Rate</span>
                            <span className="font-bold text-slate-800 text-[11px]">{config.dailyRateRange}</span>
                          </div>
                          <div className="col-span-2 pt-1 border-t border-slate-100">
                            <span className="block text-[9px] text-slate-400 uppercase">Frequency</span>
                            <span className="font-bold text-slate-800 text-[11px]">{config.frequency}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Live Calibrator Tool */}
        {activeTab === "calibrator" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Sliders Block */}
              <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="font-sans font-black text-slate-950 text-base flex items-center gap-2">
                    <Scale className="w-5 h-5 text-emerald-600" />
                    <span>Calibrator Controls</span>
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-1">Adjust parameters to calculate physical feeding needs.</p>
                </div>

                {/* Species Choice */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">Species Selection</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {["Tilapia", "Pangasius Catfish", "Asian Seabass", "Carps / Others"].map((spec) => (
                      <button
                        key={spec}
                        onClick={() => setSpecies(spec)}
                        className={`py-2 px-2 rounded-xl text-xs font-sans font-bold border transition-all ${
                          species === spec
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider: Total Fish Stock */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Total Fish Stock</label>
                    <span className="text-xs font-mono font-black text-emerald-700">{totalFish.toLocaleString()} fish</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="50000"
                    step="100"
                    value={totalFish}
                    onChange={(e) => setTotalFish(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                {/* Slider: Avg Fish Weight */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Average Weight</label>
                    <span className="text-xs font-mono font-black text-emerald-700">{avgWeight} grams</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="1000"
                    step="1"
                    value={avgWeight}
                    onChange={(e) => setAvgWeight(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                    <span>1g (Early Fry)</span>
                    <span>1000g (Large Harvest)</span>
                  </div>
                </div>

                {/* Slider: Water Temperature */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Water Temperature</label>
                    <span className="text-xs font-mono font-black text-emerald-700">{temp} °C</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="36"
                    step="1"
                    value={temp}
                    onChange={(e) => setTemp(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                    <span>Cold (12°C)</span>
                    <span>Hot (36°C)</span>
                  </div>
                </div>
              </div>

              {/* Output Results Block */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Main calculation summary */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-sans font-black text-slate-950 text-base">
                      Precise Feed Requirement Result
                    </h3>
                    <p className="text-slate-400 text-[11px] mt-1">Calculations matched to real-world metabolic standards.</p>
                  </div>

                  {/* Temperature alert if any */}
                  {calcs.tempWarning && (
                    <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex gap-3 text-xs items-start">
                      <Thermometer className="w-5 h-5 text-amber-700 shrink-0 animate-bounce" />
                      <div className="text-slate-700 leading-relaxed">
                        <strong className="block text-amber-800">Metabolic Guard Alert:</strong>
                        {calcs.tempWarning}
                      </div>
                    </div>
                  )}

                  {/* High level visual cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-center space-y-1">
                      <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wide">Daily Feed Weight</span>
                      <span className="font-mono font-black text-emerald-800 text-2xl sm:text-3xl">{calcs.dailyFeedKg} <span className="text-sm font-bold">Kg</span></span>
                      <span className="block text-[9px] text-slate-500 font-medium">({((calcs.dailyFeedKg * 1000) / totalFish).toFixed(2)} g / fish)</span>
                    </div>

                    <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 text-center space-y-1">
                      <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wide">Pellet Dimension</span>
                      <span className="font-mono font-black text-sky-800 text-xl sm:text-2xl">{calcs.pelletSize}</span>
                      <span className="block text-[9px] text-sky-600 font-medium font-mono">{calcs.type}</span>
                    </div>

                    <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 text-center space-y-1">
                      <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wide">Protein Target</span>
                      <span className="font-mono font-black text-purple-800 text-xl sm:text-2xl">{calcs.proteinPct}</span>
                      <span className="block text-[9px] text-slate-500 font-medium">Crude Protein</span>
                    </div>
                  </div>

                  {/* Detailed Math parameters */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 space-y-3 font-mono text-xs text-slate-600">
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span>Total Farmed Biomass:</span>
                      <strong className="text-slate-800">{calcs.totalBiomassKg.toLocaleString()} Kg</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span>Effective Feed Rate (% body weight):</span>
                      <strong className="text-slate-800">{calcs.feedRatePct}%</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span>Feed Per Session ({avgWeight < 15 ? "4 sessions" : "2 sessions"}):</span>
                      <strong className="text-slate-800">{calcs.feedPerSession} Kg</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Water Oxygen Consumption:</span>
                      <span className="text-slate-500 font-bold">~{((calcs.dailyFeedKg * 0.25)).toFixed(1)} Kg of Oxygen/day</span>
                    </div>
                  </div>
                </div>

                {/* Practical tips */}
                <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 space-y-3">
                  <h4 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-700" />
                    <span>Scientific Feeding Tips</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                    <li>Maintain strong aeration (DO above 5 ppm) while feeding. Metabolic activity increases fish respiration rates.</li>
                    <li>If water transparency drops below <strong>25 cm</strong>, reduce feed dosage by 30% to prevent organic loading crashes.</li>
                    <li>Avoid feeding during peak mid-day heat or heavy rains, when sudden water parameter spikes are likely.</li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        )}

      {/* Commercial Fish Food Sales & Wholesale Quotation Inquiry Card */}
      <div id="feed-supply-card" className="mt-10 mb-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        {/* Background Ambient Glow & Patterns */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 -top-16 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          {/* Top Banner Header & Direct Contact Quick Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-emerald-500/20 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Package className="w-4 h-4 text-emerald-400" />
                <span>Modern Fisheries Direct Factory Sales</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                High-Protein Commercial Fish Food & Bulk Supply
              </h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Direct factory supply of high-grade extruded floating and sinking pellets (28% to 45% crude protein). Specially formulated to minimize Feed Conversion Ratio (FCR 1.1–1.3), boost fish immunity, and keep water clean.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://wa.me/919748952342?text=Hello%20Modern%20Fisheries,%20I%20am%20interested%20in%20purchasing%20Fish%20Food.%20Please%20send%20me%20the%20best%20price%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-slate-950 fill-current" />
                <span>WhatsApp: +91 97489 52342</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="mailto:mf@owncircles.com?subject=Inquiry%20for%20Fish%20Food%20Bulk%20Quotation"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-sans font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>mf@owncircles.com</span>
              </a>
            </div>
          </div>

          {/* Fish Species & Detailed Specifications Grid (To Attract Farmers) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-sans font-bold text-base sm:text-lg text-emerald-300 flex items-center gap-2">
                <Fish className="w-5 h-5 text-emerald-400" />
                <span>Specially Formulated Feeds by Fish Species</span>
              </h4>
              <span className="text-xs text-emerald-200/60 hidden sm:inline-block font-mono">
                Factory Direct • Minimum FCR • 4+ Hours Floating
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Species Card 1 */}
              <div className="bg-slate-900/90 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-400/50 transition-all hover:bg-slate-900 shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      32% - 38% Protein
                    </span>
                    <span className="text-[10px] font-sans text-slate-400 font-semibold">Floating Pellets</span>
                  </div>
                  <h5 className="font-sans font-bold text-base text-white">
                    Tilapia & Pangasius Grower Feed
                  </h5>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Extruded floating feed with high digestibility. Non-water polluting formula enriched with digestive enzymes and liver protectants.
                  </p>
                  <ul className="text-[11px] text-emerald-200/80 space-y-1 pt-1">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Pellet Sizes: 2mm, 3mm, 4mm, 6mm</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Target FCR: 1.15 to 1.35</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-mono font-bold">25 kg / 40 kg Bags</span>
                  <button
                    onClick={() => {
                      setInquirySpecies("Tilapia & Pangasius");
                      setInquiryFeedType("32% - 38% Floating Pellets");
                      const el = document.getElementById("quote-inquiry-form");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-emerald-300 hover:text-white font-bold text-xs underline cursor-pointer"
                  >
                    Get Quote →
                  </button>
                </div>
              </div>

              {/* Species Card 2 */}
              <div className="bg-slate-900/90 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-400/50 transition-all hover:bg-slate-900 shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      28% - 34% Protein
                    </span>
                    <span className="text-[10px] font-sans text-slate-400 font-semibold">Floating / Sinking</span>
                  </div>
                  <h5 className="font-sans font-bold text-base text-white">
                    Indian Major Carps (Rohu / Katla / Mrigal)
                  </h5>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Balanced protein-to-energy ratio formulated for polyculture and earthen pond carp farming. High phytase for maximum phosphorus absorption.
                  </p>
                  <ul className="text-[11px] text-emerald-200/80 space-y-1 pt-1">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Pellet Sizes: 2mm, 3mm, 4mm</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Low Dissolution & High Yield</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-mono font-bold">500 kg to Bulk Tons</span>
                  <button
                    onClick={() => {
                      setInquirySpecies("Rohu / Katla / Carps");
                      setInquiryFeedType("28% - 34% Carp Feed");
                      const el = document.getElementById("quote-inquiry-form");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-emerald-300 hover:text-white font-bold text-xs underline cursor-pointer"
                  >
                    Get Quote →
                  </button>
                </div>
              </div>

              {/* Species Card 3 */}
              <div className="bg-slate-900/90 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-400/50 transition-all hover:bg-slate-900 shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      38% - 42% Protein
                    </span>
                    <span className="text-[10px] font-sans text-slate-400 font-semibold">High Protein Booster</span>
                  </div>
                  <h5 className="font-sans font-bold text-base text-white">
                    Catfish / Magur / Singhi Feed
                  </h5>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Carnivorous high-energy feed packed with marine fishmeal, essential amino acids, and lipids for rapid growth in high-density tanks.
                  </p>
                  <ul className="text-[11px] text-emerald-200/80 space-y-1 pt-1">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Pellet Sizes: 1.5mm, 2mm, 3mm</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Fast Body Weight Gain</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-mono font-bold">Ultra High-Growth</span>
                  <button
                    onClick={() => {
                      setInquirySpecies("Catfish / Magur / Singhi");
                      setInquiryFeedType("38% - 42% High Protein");
                      const el = document.getElementById("quote-inquiry-form");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-emerald-300 hover:text-white font-bold text-xs underline cursor-pointer"
                  >
                    Get Quote →
                  </button>
                </div>
              </div>

              {/* Species Card 4 */}
              <div className="bg-slate-900/90 border border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-400/50 transition-all hover:bg-slate-900 shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      40% - 45% Protein
                    </span>
                    <span className="text-[10px] font-sans text-slate-400 font-semibold">Micro Crumble</span>
                  </div>
                  <h5 className="font-sans font-bold text-base text-white">
                    Hatchery Fry Starter & Shrimp Feed
                  </h5>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Micro-extruded crumbles & slow-sinking pellets for Biofloc tanks, RAS nurseries, and shrimp culture. Enriched with spirulina & gut probiotics.
                  </p>
                  <ul className="text-[11px] text-emerald-200/80 space-y-1 pt-1">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Mesh Sizes: 0.5mm, 0.8mm, 1.2mm</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> High Fry Survival Rate</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-mono font-bold">Nursery Grade</span>
                  <button
                    onClick={() => {
                      setInquirySpecies("Biofloc / Fry Starter / Shrimp");
                      setInquiryFeedType("40% - 45% Starter Crumble");
                      const el = document.getElementById("quote-inquiry-form");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-emerald-300 hover:text-white font-bold text-xs underline cursor-pointer"
                  >
                    Get Quote →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Quotation & Bulk Inquiry Form */}
          <div id="quote-inquiry-form" className="bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
              <div>
                <h4 className="font-sans font-black text-lg sm:text-xl text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>Send Inquiry for the Best Price Quotation</span>
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Select your fish details and quantity below to get an instant tailored quotation directly via WhatsApp or Email.
                </p>
              </div>

              {/* Direct Quick Contact Info Box */}
              <div className="flex items-center gap-3 bg-slate-950/80 border border-emerald-500/20 px-3.5 py-2 rounded-xl shrink-0">
                <div className="text-right text-xs">
                  <div className="text-slate-400 text-[10px] uppercase tracking-wider font-mono">Contact Sales Directly</div>
                  <div className="text-emerald-300 font-bold font-mono">+91 97489 52342</div>
                  <div className="text-slate-300 text-[11px]">mf@owncircles.com</div>
                </div>
                <button
                  onClick={() => handleCopy("+919748952342", "phone")}
                  className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
                  title="Copy Phone Number"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* Fish Species Selection */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Target Fish Species <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={inquirySpecies}
                  onChange={(e) => setInquirySpecies(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-white font-sans outline-none transition-colors cursor-pointer"
                >
                  <option value="Tilapia & Pangasius">Tilapia & Pangasius</option>
                  <option value="Rohu / Katla / Carps">Indian Major Carps (Rohu, Katla, Mrigal)</option>
                  <option value="Catfish / Magur / Singhi">Catfish / Magur / Singhi</option>
                  <option value="Biofloc / Fry Starter / Shrimp">Biofloc / Hatchery Fry / Shrimp</option>
                  <option value="Asian Seabass / Barramundi">Asian Seabass / Barramundi</option>
                  <option value="Custom Mixed Species">Custom / Polyculture Mix</option>
                </select>
              </div>

              {/* Feed Type / Pellet Size */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Feed Grade & Pellet Size
                </label>
                <select
                  value={inquiryFeedType}
                  onChange={(e) => setInquiryFeedType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-white font-sans outline-none transition-colors cursor-pointer"
                >
                  <option value="32% - 38% Extruded Floating Pellets">32% - 38% Extruded Floating Pellets (2mm-6mm)</option>
                  <option value="28% - 34% Carp Sinking Feed">28% - 34% Carp Sinking Feed (2mm-4mm)</option>
                  <option value="38% - 42% High Protein Catfish Feed">38% - 42% High Protein Catfish Feed</option>
                  <option value="40% - 45% Hatchery Starter Crumble">40% - 45% Hatchery Starter Crumble (0.5mm-1.5mm)</option>
                  <option value="Probiotic & Vitamin Feed Additives">Probiotic & Vitamin Feed Additives</option>
                </select>
              </div>

              {/* Required Quantity */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Estimated Quantity Needed <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={inquiryQuantity}
                  onChange={(e) => setInquiryQuantity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-white font-sans outline-none transition-colors cursor-pointer"
                >
                  <option value="250 kg Trial Batch">250 kg (Trial Batch)</option>
                  <option value="500 kg Bags">500 kg (Small Farm)</option>
                  <option value="1 Ton Bulk">1 Ton (Standard Commercial)</option>
                  <option value="5 Tons Wholesale">5 Tons (Wholesale Order)</option>
                  <option value="10+ Tons Container Bulk">10+ Tons (Factory Bulk Shipment)</option>
                </select>
              </div>

              {/* Delivery Location */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Delivery Location / District / State
                </label>
                <input
                  type="text"
                  placeholder="e.g. West Bengal, Assam, Andhra Pradesh, Kerala..."
                  value={inquiryLocation}
                  onChange={(e) => setInquiryLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-white font-sans outline-none transition-colors placeholder:text-slate-600"
                />
              </div>

              {/* Contact Phone / WhatsApp */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Your Phone / WhatsApp Number
                </label>
                <input
                  type="text"
                  placeholder="+91 Mobile number..."
                  value={inquiryContact}
                  onChange={(e) => setInquiryContact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-white font-sans outline-none transition-colors placeholder:text-slate-600"
                />
              </div>

              {/* Notes / Special Requests */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Specific Requirements / Remarks
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need FCR guarantee, sample batch, bulk discount..."
                  value={inquiryNotes}
                  onChange={(e) => setInquiryNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-white font-sans outline-none transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Action Buttons & Direct Channels */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fast response within 1 hour. Factory-direct pricing & shipping support.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                <a
                  href={getWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setInquirySubmitted(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Inquiry via WhatsApp</span>
                  <Send className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href={getEmailInquiryUrl()}
                  onClick={() => setInquirySubmitted(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-sans font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-700 transition-all active:scale-95 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Send via Email</span>
                </a>
              </div>
            </div>

            {copiedContact && (
              <div className="mt-3 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 py-1.5 rounded-lg border border-emerald-500/20">
                ✓ Contact information copied to clipboard!
              </div>
            )}

            {inquirySubmitted && (
              <div className="mt-3 p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Inquiry generated! If your browser did not open automatically, please contact us directly on WhatsApp <strong>+91 97489 52342</strong> or Email <strong>mf@owncircles.com</strong>.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* YouTube Guide Carousel Slider Section */}
      <div id="youtube-feeding-slider" className="mt-12 pt-8 px-2 sm:px-4 border-t border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 animate-pulse" />
              <span>Nutrition & Feeding Video Masterclasses</span>
            </div>
            <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
              Feeding & Growth Management Guides
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Watch expert tutorials on FCR calculations, automatic feeders, pellet sizing, and high-density feeding routines.
            </p>
          </div>

          {/* Scroll Navigation Controls & Viral Filter */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto">
            <button
              id="feeding-viral-toggle-btn"
              onClick={() => setShowViralOnly(!showViralOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                showViralOnly 
                  ? "bg-amber-500 border-amber-500 text-white shadow-xs" 
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${showViralOnly ? "fill-current animate-pulse text-red-100" : "text-amber-500"}`} />
              <span>Only Viral (50K+)</span>
              {showViralOnly && <Check className="w-3 h-3 stroke-[3px]" />}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                id="feeding-slide-left-btn"
                onClick={() => scrollVideos("left")}
                className="p-1.5 sm:p-2 rounded-xl border border-emerald-100 bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                id="feeding-slide-right-btn"
                onClick={() => scrollVideos("right")}
                className="p-1.5 sm:p-2 rounded-xl border border-emerald-100 bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrolling Carousel */}
        <div className="relative">
          <div
            id="feeding-video-scroll-container"
            ref={scrollRef}
            onMouseEnter={() => setIsVideosHovered(true)}
            onMouseLeave={() => setIsVideosHovered(false)}
            onTouchStart={() => setIsVideosHovered(true)}
            onTouchEnd={() => setIsVideosHovered(false)}
            className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-emerald-100 scrollbar-track-transparent select-none animate-fade-in"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', scrollBehavior: 'auto' }}
          >
            {(() => {
              const displayedVideos = showViralOnly ? feedingVideos.filter(isVideoViral) : feedingVideos;
              const listToRender = displayedVideos.length > 0 ? displayedVideos : feedingVideos;
              return [...listToRender, ...listToRender].map((video, index) => (
                <div 
                  key={`${video.id}-feeding-clone-${index}`} 
                  className="w-[240px] xs:w-[270px] sm:w-[320px] shrink-0"
                >
                  <VideoCard 
                    video={video} 
                    onVideoClick={(v) => {
                      if (onVideoClick) {
                        onVideoClick(v);
                      }
                    }} 
                  />
                </div>
              ));
            })()}
          </div>
          
          {/* Fade Overlays */}
          <div className="absolute top-0 bottom-4 left-0 w-8 bg-gradient-to-r from-slate-50/50 to-transparent pointer-events-none hidden sm:block"></div>
          <div className="absolute top-0 bottom-4 right-0 w-8 bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none hidden sm:block"></div>
        </div>
      </div>

          </div>
          <div className="hidden xl:block shrink-0 sticky top-20">
            <RightSidebarAd reloadKey="feeding-sidebar-ad" />
          </div>
        </div>

      </div>
    </div>
  );
}
