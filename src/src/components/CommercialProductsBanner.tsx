import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, Package, Fish, Wrench, MessageCircle, Mail, Phone, 
  ChevronLeft, ChevronRight, Sparkles, CheckCircle2, ExternalLink, 
  Send, Copy, Truck, Zap, Clock, ArrowRight, ShoppingBag, ShieldAlert, Award
} from "lucide-react";

export interface ProductSlide {
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
  pricingHint: string;
  whatsappMessage: string;
  emailSubject: string;
  emailBody: string;
}

const PRODUCT_SLIDES: ProductSlide[] = [
  {
    id: "tanks",
    category: "Tarpaulin Tanks",
    badge: "Biofloc & RAS Heavy-Duty Tanks",
    title: "HDPE & PVC Tarpaulin Biofloc Tanks",
    subtitle: "650+ GSM Multi-layer Food-Grade Waterproof Tanks",
    description: "Factory-fabricated round and rectangular tarpaulin tanks designed for high-density Biofloc, RAS, and hatchery fish farming. Engineered with 100% UV-stabilized virgin PVC, double-welded leakproof seams, and galvanized protective steel mesh.",
    gradient: "from-slate-900 via-emerald-950 to-slate-950",
    accentColor: "emerald",
    borderColor: "border-emerald-500/30",
    bgGlow: "bg-emerald-500/15",
    icon: ShieldCheck,
    specs: [
      { label: "Material Grade", detail: "650 to 900 GSM Heavy PVC" },
      { label: "Durability", detail: "5+ Years UV Stabilized" },
      { label: "Available Sizes", detail: "3,000L to 40,000L (2m - 5m Dia)" },
      { label: "Frame & Outlet", detail: "Galvanized Mesh + Bottom Purge" }
    ],
    bulletPoints: [
      "100% Non-toxic food grade layer safe for Tilapia, Catfish & Prawns",
      "Reinforced bottom drain valve for rapid sludge flushing",
      "Turnkey bundle includes steel mesh frame, protective liner & drain kit"
    ],
    pricingHint: "Factory Wholesale Rates • Sizes Custom Tailored",
    whatsappMessage: "Hello Modern Fisheries Team,\n\nI am interested in purchasing Tarpaulin Tanks for my fish farm.\n• Required Tank Size/Capacity: \n• Location: \n• Contact Number: \n\nPlease send me the best price quotation and technical specifications.",
    emailSubject: "Inquiry for Tarpaulin Tanks Wholesale Quotation",
    emailBody: "Hello Modern Fisheries Sales Team,\n\nI am looking to buy heavy-duty Tarpaulin Tanks for Biofloc/RAS farming.\n\n- Tank Capacity/Diameter needed:\n- Quantity:\n- Delivery Location / Pin Code:\n- Phone / WhatsApp:\n\nPlease share your best factory quotation and delivery timeframe.\n\nThank you!"
  },
  {
    id: "food",
    category: "Fish Foods",
    badge: "High Protein Floating & Sinking Feeds",
    title: "Commercial High-Protein Fish Food Pellets",
    subtitle: "28% to 45% Crude Protein • Minimal FCR Formula",
    description: "Direct factory supply of premium extruded floating and sinking pellets formulated with fishmeal, essential amino acids, spirulina, and gut probiotics. Speeds up fish growth while keeping tank and pond water crystal clean.",
    gradient: "from-slate-900 via-teal-950 to-slate-950",
    accentColor: "teal",
    borderColor: "border-teal-500/30",
    bgGlow: "bg-teal-500/15",
    icon: Package,
    specs: [
      { label: "Protein Range", detail: "28% to 45% Crude Protein" },
      { label: "Target FCR", detail: "1.10 - 1.30 Conversion Ratio" },
      { label: "Pellet Sizes", detail: "0.5mm Fry Crumble to 6mm Pellets" },
      { label: "Packaging", detail: "Bulk 25kg & 40kg Sealed Bags" }
    ],
    bulletPoints: [
      "4+ Hours floating stability prevents organic water pollution",
      "Formulated for Tilapia, Pangasius, Rohu/Carps, Magur & Seabass",
      "Enriched with digestive enzymes for maximum nutrient absorption"
    ],
    pricingHint: "Direct Bulk Wholesale Pricing • Fast Dispatch",
    whatsappMessage: "Hello Modern Fisheries Team,\n\nI am interested in purchasing Commercial Fish Food Pellets.\n• Fish Species: \n• Feed Type/Protein %: \n• Required Quantity (kg/tons): \n• Location: \n\nPlease share your best wholesale price quotation.",
    emailSubject: "Inquiry for Bulk Commercial Fish Food Quotation",
    emailBody: "Hello Modern Fisheries Sales Team,\n\nI would like to request a quotation for purchasing commercial fish food:\n\n- Fish Species:\n- Required Protein % / Pellet Size:\n- Required Quantity (Tons/Bags):\n- Delivery Location:\n- Contact Number:\n\nPlease reply with your best quotation.\n\nThank you!"
  },
  {
    id: "fingerlings",
    category: "Fish Fingerlings",
    badge: "High Survival Seed & Fingerlings",
    title: "Certified Fast-Growing Fish Fingerlings",
    subtitle: "100% Monosex Tilapia, Pangasius, Carps & Catfish Seed",
    description: "Nursery-reared, disease-screened high-genetics fish seeds and fingerlings. Treated for stress resistance and packed in oxygen-infused oxygenated bags for safe nationwide transportation with 95%+ survival guarantee.",
    gradient: "from-slate-900 via-cyan-950 to-slate-950",
    accentColor: "cyan",
    borderColor: "border-cyan-500/30",
    bgGlow: "bg-cyan-500/15",
    icon: Fish,
    specs: [
      { label: "Available Seed", detail: "Monosex Tilapia, Pangasius, Carps, Magur" },
      { label: "Survival Guarantee", detail: "95%+ Safe Transit Delivery" },
      { label: "Seed Size Range", detail: "1 inch (Line 100) to 3+ inches" },
      { label: "Packaging", detail: "Oxygen-Charged Multi-wall Bags" }
    ],
    bulletPoints: [
      "Genetically selected fast-growth broodstock for rapid harvest",
      "Screened for parasites, bacterial pathogens, and body lesions",
      "Complete acclimatization guide & stocking assistance included"
    ],
    pricingHint: "Live Stocking Guarantees • All India Shipping",
    whatsappMessage: "Hello Modern Fisheries Team,\n\nI want to purchase Fish Fingerlings/Seed for my farm.\n• Fish Variety: \n• Quantity Needed (Pieces): \n• Size Required: \n• Delivery Location: \n\nPlease send me the price quotation and availability.",
    emailSubject: "Inquiry for Fish Fingerlings / Seed Supply",
    emailBody: "Hello Modern Fisheries Seed Desk,\n\nI would like to inquire about purchasing fish seed/fingerlings:\n\n- Fish Species needed:\n- Quantity (Pcs):\n- Target Stocking Date:\n- Delivery Location / Airport / Station:\n- Phone / WhatsApp:\n\nPlease share availability and best price.\n\nThank you!"
  },
  {
    id: "equipment",
    category: "Equipment",
    badge: "Turnkey RAS, Biofloc & Pond Automation",
    title: "Commercial Aquaculture Equipment & Spares",
    subtitle: "Aeration Systems, Auto Feeders, Sludge Pumps & Test Kits",
    description: "Complete range of heavy-duty aeration blowers, nanobubble aero-tubes, paddlewheel aerators, solar digital automatic feeders, and water testing meters. Built for 24/7 continuous operation in intensive fish farming.",
    gradient: "from-slate-900 via-blue-950 to-slate-950",
    accentColor: "blue",
    borderColor: "border-blue-500/30",
    bgGlow: "bg-blue-500/15",
    icon: Wrench,
    specs: [
      { label: "Aeration Systems", detail: "Roots Blowers, Ring Blowers, Aero-Tubes" },
      { label: "Automated Feeding", detail: "Solar Timer Feeders (1-14 Meals/Day)" },
      { label: "Pond Aerators", detail: "1HP - 3HP Electric Paddlewheels" },
      { label: "Water Quality", detail: "Digital DO, pH, EC & TAN Test Kits" }
    ],
    bulletPoints: [
      "Energy-efficient aeration setups reducing electricity bills by 30%",
      "Solar auto-feeders eliminate manual labor and prevent overfeeding",
      "Full 1-Year manufacturer warranty & spare parts availability"
    ],
    pricingHint: "Turnkey Hardware Solutions • Warranty Backed",
    whatsappMessage: "Hello Modern Fisheries Team,\n\nI need a quotation for Aquaculture Equipment.\n• Equipment Needed (Blower/Feeder/Aerator/Test Kit): \n• Specifications/HP: \n• Delivery Location: \n\nPlease share your best prices.",
    emailSubject: "Inquiry for Aquaculture Equipment & Aerators",
    emailBody: "Hello Modern Fisheries Equipment Division,\n\nI am looking to buy aquaculture equipment:\n\n- Product(s) required:\n- Specifications/Pond Size:\n- Delivery Location:\n- Contact Number:\n\nPlease send product catalog and price quote.\n\nThank you!"
  }
];

export default function CommercialProductsBanner() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = PRODUCT_SLIDES[activeSlideIndex];

  // Auto-play sliding banner (5-second interval)
  useEffect(() => {
    if (isPaused) return;

    autoSlideTimerRef.current = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % PRODUCT_SLIDES.length);
    }, 5500);

    return () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + PRODUCT_SLIDES.length) % PRODUCT_SLIDES.length);
  };

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % PRODUCT_SLIDES.length);
  };

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedContact(label);
      setTimeout(() => setCopiedContact(null), 2500);
    }
  };

  const getWhatsAppUrl = (msg: string) => {
    return `https://wa.me/919748952342?text=${encodeURIComponent(msg)}`;
  };

  const getEmailUrl = (subject: string, body: string) => {
    return `mailto:mf@owncircles.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const SlideIcon = activeSlide.icon;

  return (
    <div 
      id="commercial-products-banner"
      className="w-full my-6 rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 relative"
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
                Factory Direct Sales:
              </span>
              {PRODUCT_SLIDES.map((slide, index) => {
                const IconComp = slide.icon;
                const isActive = index === activeSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlideIndex(index)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans font-bold text-xs transition-all cursor-pointer ${
                      isActive
                        ? "bg-emerald-500 text-slate-950 shadow-md scale-105"
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
                title="Previous Product Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-emerald-300 px-1">
                0{activeSlideIndex + 1} / 0{PRODUCT_SLIDES.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer active:scale-95"
                title="Next Product Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Slide Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Product Information & Value Props */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                <SlideIcon className="w-4 h-4 text-emerald-400" />
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

              <p className="text-slate-200/90 text-xs sm:text-sm leading-relaxed">
                {activeSlide.description}
              </p>

              {/* Quick Bullet Feature Highlights */}
              <div className="space-y-1.5 pt-1">
                {activeSlide.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-emerald-100/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & Guarantee Hint Badge */}
              <div className="inline-flex items-center gap-2 bg-slate-950/70 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl text-xs font-mono text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                <span>{activeSlide.pricingHint}</span>
              </div>
            </div>

            {/* Right Column: Specs Card & Instant Inquiry Buttons */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="font-mono text-xs font-bold uppercase text-emerald-400 tracking-wider">
                    Product Technical Specs
                  </span>
                  <Truck className="w-4 h-4 text-emerald-400 opacity-80" />
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

                {/* Direct Action Inquiry Buttons */}
                <div className="space-y-2.5 pt-1">
                  <a
                    href={getWhatsAppUrl(activeSlide.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer group"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send Inquiry for Best Quote</span>
                    <Send className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={getEmailUrl(activeSlide.emailSubject, activeSlide.emailBody)}
                    className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-sans font-bold text-xs py-2.5 px-4 rounded-xl border border-white/15 transition-all cursor-pointer active:scale-95"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email: mf@owncircles.com</span>
                  </a>
                </div>

                {/* Direct Phone / WhatsApp Quick Copy Strip */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Desk: <strong>+91 97489 52342</strong></span>
                  </div>
                  <button
                    onClick={() => handleCopy("+919748952342", "Phone")}
                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                    title="Copy Phone Number"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Slide Indicators Bar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {PRODUCT_SLIDES.map((_, index) => (
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
              Auto-advancing • Hover to pause
            </div>
          </div>

          {copiedContact && (
            <div className="text-center text-xs font-bold text-emerald-300 bg-emerald-500/20 py-1.5 rounded-xl border border-emerald-500/30">
              ✓ {copiedContact} copied to clipboard!
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
