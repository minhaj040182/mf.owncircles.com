import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Heart, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Fish, 
  Wrench, 
  Truck, 
  HelpCircle, 
  MessageSquare, 
  ExternalLink, 
  ChevronRight, 
  Star, 
  Compass, 
  Layers, 
  Droplet,
  Globe,
  Clock,
  Zap,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface AboutUsPageProps {
  onBackToDashboard?: () => void;
}

export default function AboutUsPage({ onBackToDashboard }: AboutUsPageProps = {}) {
  const [selectedService, setSelectedService] = useState<string>("consultation");
  const [contactSubject, setContactSubject] = useState<string>("Online Consultation");
  const [userQuery, setUserQuery] = useState<string>("");
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  const servicesList = [
    {
      id: "consultation",
      title: "Online Expert Consultation",
      tagline: "1-on-1 Agronomist Guidance & Water Diagnostics",
      icon: MessageSquare,
      color: "from-blue-600 to-indigo-700",
      bgLight: "bg-blue-50 border-blue-100 text-blue-900",
      description: "Direct online video and voice consultation with senior aquaculture engineers. We analyze your water chemistry, disease outbreaks, stocking density, and feed conversion ratios (FCR) remotely with actionable remedy reports.",
      highlights: [
        "24/7 WhatsApp emergency diagnostic support",
        "Custom feed schedule & biomass calculation",
        "Water quality parameters optimization (pH, DO, TAN, NO2)",
        "Disease identification & bio-security protocol"
      ]
    },
    {
      id: "farmsetup",
      title: "Turnkey Farm Setup & Engineering",
      tagline: "Biofloc, RAS, Aquaponics, Hydroponics & Earthen Ponds",
      icon: Wrench,
      color: "from-emerald-600 to-teal-700",
      bgLight: "bg-emerald-50 border-emerald-100 text-emerald-900",
      description: "End-to-end commercial farm layout design, structural construction, pipeline hydraulics, and biological commissioning. We build scalable high-density fish farms suited for urban land or rural acreage.",
      highlights: [
        "Biofloc circular tarpaulin tank installation",
        "Recirculating Aquaculture System (RAS) filtration loops",
        "Commercial earthen pond excavation & dyke planning",
        "Solar-powered aeration & automated backup systems"
      ]
    },
    {
      id: "feed",
      title: "Premium Fish Food & Feed Supply",
      tagline: "High-Protein Floating & Sinking Formulations",
      icon: Fish,
      color: "from-amber-600 to-orange-700",
      bgLight: "bg-amber-50 border-amber-100 text-amber-900",
      description: "Scientifically tested fish feeds enriched with essential amino acids, probiotics, and immunostimulants. Designed for optimal digestibility, maximum growth velocity, and low water pollution.",
      highlights: [
        "Micro-pellets for fingerlings (0.5mm - 1.2mm)",
        "High-protein grower pellets (28% - 40% crude protein)",
        "Species-specific feed for Tilapia, Pangasius, Carp, Catfish, Seabass",
        "Bulk wholesale supply with pan-India & global delivery"
      ]
    },
    {
      id: "tools",
      title: "Aquaculture Tools & Heavy Equipment",
      tagline: "Aerators, Water Testing Kits, Bio-Media & Nets",
      icon: ShoppingBag,
      color: "from-purple-600 to-indigo-800",
      bgLight: "bg-purple-50 border-purple-100 text-purple-900",
      description: "Industrial-grade equipment engineered for continuous 24/7 aquatic operation. From root blowers and paddlewheel aerators to digital optical DO meters and K1 MBBR bio-media.",
      highlights: [
        "Paddlewheel & Submersible Jet Aerators (1HP - 5HP)",
        "Digital pH, EC, TDS, Temperature & Optical DO Meters",
        "High surface area K1/K3 MBBR bio-filter media",
        "Heavy-duty harvesting seine nets & automatic feeders"
      ]
    }
  ];

  const handleCopyWhatsAppText = () => {
    const text = `Hello Modern Fisheries Team,\nI am interested in: ${contactSubject}.\nDetails: ${userQuery || "Please provide consultation and price catalog."}\nContact Email: mf@owncircles.com`;
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Banner Header */}
      <div className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[10px] sm:text-xs font-mono uppercase tracking-widest font-black px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              Trusted Aquaculture Partner & Consultancy
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tight text-white leading-tight">
              Modern Fisheries & Advisory
            </h1>
            <p className="text-blue-100/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-sans">
              Your premier one-stop destination for expert online fish farming consultation, turnkey farm engineering, high-protein fish feed supply, and industrial aquaculture equipment.
            </p>
          </div>

          {/* Quick Metrics & Direct Contact Box */}
          <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl sm:rounded-3xl backdrop-blur-md self-start md:self-center w-full md:w-auto flex flex-col gap-2 text-left">
            <div>
              <span className="block text-[10px] font-mono tracking-widest uppercase text-blue-300 font-bold mb-0.5">Phone & WhatsApp Support</span>
              <a href="https://wa.me/919748952342" target="_blank" rel="noopener noreferrer" className="block font-sans font-black text-lg sm:text-xl text-white hover:text-emerald-300 transition-colors">
                +91 97489 52342
              </a>
            </div>
            <div className="pt-1.5 border-t border-white/10">
              <span className="block text-[10px] font-mono tracking-widest uppercase text-blue-300 font-bold mb-0.5">Official Email</span>
              <a href="mailto:mf@owncircles.com" className="block font-mono font-bold text-xs sm:text-sm text-emerald-300 hover:underline">
                mf@owncircles.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Top Advertisement Banner (Placed AFTER the Hero Banner Header) */}
      <div className="bg-slate-50/95 backdrop-blur-md py-0.5 my-1 transition-all border-y border-slate-200/80 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <AdBanner reloadKey="aboutus-main-ad" />
        </div>
      </div>

      {/* Mobile Announcement Card (Not Sticky - scrolls up naturally) */}
      <div className="lg:hidden max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 my-1">
        <OwnCirclesAnnouncement mode="mobile" />
      </div>

      {/* Content Body Container */}
      <main className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 items-start">
          
          <div className="flex-1 min-w-0 space-y-8 sm:space-y-12 w-full">

            {/* SECTION 1: EXECUTIVE CORPORATE OVERVIEW */}
            <section className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-[10px] font-mono text-blue-700 font-extrabold uppercase tracking-widest block">Company Profile & Vision</span>
                <h2 className="text-xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight leading-snug">
                  Transforming Aquaculture Into a High-Yield, Predictable Business
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                  At Modern Fisheries, we bridge the gap between traditional fish culture and scientific precision engineering. Whether you are launching a homestead Biofloc system or managing a multi-hectare commercial RAS facility, our agronomists and supply networks ensure maximum Feed Conversion Ratio (FCR) and zero-water collapse.
                </p>
              </div>

              {/* Core Values 3-Column Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">Certified Agronomy</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    All consultation protocols adhere strictly to FAO aquaculture guidelines and biosecurity standards.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">Guaranteed Quality</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    100% genuine feeds, tested aerators, and heavy-duty farm equipment with full warranty support.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">Pan-India & Export</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Seamless logistics network delivering fish feed, seed, and equipment directly to your farm gate.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: OUR 4 CORE COMMERCIAL SERVICES */}
            <section className="space-y-4">
              <div className="text-left space-y-1">
                <span className="text-[10px] font-mono text-blue-700 font-extrabold uppercase tracking-widest block">Comprehensive Solutions</span>
                <h2 className="text-xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight">
                  Our Professional Services & Products
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Explore our four specialized verticals designed for modern commercial fish farmers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {servicesList.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div 
                      key={service.id}
                      className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-r ${service.color} text-white shadow-xs`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                            Core Vertical
                          </span>
                        </div>

                        <div>
                          <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg tracking-tight">
                            {service.title}
                          </h3>
                          <p className="text-xs font-semibold text-blue-700 font-mono mt-0.5">
                            {service.tagline}
                          </p>
                        </div>

                        <p className="text-slate-600 text-xs leading-relaxed font-sans">
                          {service.description}
                        </p>

                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                          <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-wider block">Key Features:</span>
                          {service.highlights.map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-start text-[11px] text-slate-700 font-sans">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedService(service.id);
                          setContactSubject(service.title);
                          const el = document.getElementById("contact-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="mt-4 w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-900 text-white rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Inquire About {service.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: TURNKEY FARM SETUP PROCESS (E-E-A-T & SEO) */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-md">
              <div className="space-y-1.5 border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono text-blue-300 font-extrabold uppercase tracking-widest block">Step-By-Step Execution</span>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight">
                  How We Setup Your Commercial Fish Farm
                </h2>
                <p className="text-xs text-blue-100/70">
                  Our systematic engineering workflow guarantees optimal biological stability and maximum financial returns.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    step: "01",
                    title: "Site & Water Audit",
                    desc: "Testing soil clay ratios, water source parameters (pH, iron, hardness), and electrical grid feasibility."
                  },
                  {
                    step: "02",
                    title: "Blueprint & CAD Layout",
                    desc: "Designing tank sizes, drainage hydraulics, air line distribution, and power backup circuits."
                  },
                  {
                    step: "03",
                    title: "Equipment & Piping",
                    desc: "Installing heavy-duty HDPE tarpaulins, root blowers, venture aerators, and biological filtration media."
                  },
                  {
                    step: "04",
                    title: "Bio-Inoculation & Stocking",
                    desc: "Conditioning water with nitrifying bacteria, fish stocking guidance, and staff training."
                  }
                ].map((s, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2 relative">
                    <span className="text-2xl font-mono font-black text-blue-400 block">{s.step}</span>
                    <h3 className="font-sans font-bold text-white text-xs sm:text-sm">{s.title}</h3>
                    <p className="text-blue-100/70 text-[11px] leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: CONTACT & INQUIRY HELPDESK */}
            <section id="contact-section" className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <span className="text-[10px] font-mono text-blue-700 font-extrabold uppercase tracking-widest block">Direct Communications Desk</span>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-slate-900 tracking-tight">
                  Get In Touch For Orders & Consultations
                </h2>
                <p className="text-xs text-slate-500">
                  Connect directly with our senior fisheries agronomists via phone, email, or WhatsApp.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Official Info Panel */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-50 border border-slate-100 p-4 sm:p-5 rounded-2xl space-y-4">
                    <h3 className="font-sans font-bold text-slate-900 text-sm border-b border-slate-200/60 pb-2">
                      Headquarters & Support Details
                    </h3>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 text-blue-800 rounded-lg shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Official Email</span>
                        <a 
                          href="mailto:mf@owncircles.com"
                          className="font-mono font-bold text-blue-700 hover:underline text-xs sm:text-sm block truncate select-all"
                        >
                          mf@owncircles.com
                        </a>
                      </div>
                    </div>

                    {/* Phone & WhatsApp */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Phone & WhatsApp Support</span>
                        <a 
                          href="https://wa.me/919748952342" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-mono font-bold text-slate-900 hover:text-emerald-700 text-xs sm:text-sm block select-all"
                        >
                          +91 97489 52342
                        </a>
                        <span className="text-[10px] text-emerald-700 font-sans block font-semibold">
                          Click to chat on WhatsApp
                        </span>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-100 text-indigo-800 rounded-lg shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Main Office Address</span>
                        <p className="text-xs text-slate-700 font-sans leading-relaxed">
                          Dream City, Bakra Hat Road, Rasopunja, Joka, Kolkata 700156
                        </p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Working Hours</span>
                        <p className="text-xs text-slate-700 font-sans">
                          Monday – Saturday: 9:00 AM – 6:00 PM (IST)
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Quick Consultation Request Form / Builder */}
                <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-4 sm:p-6 rounded-2xl space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-sans font-black text-slate-900 text-sm sm:text-base">
                      Quick Order / Consultation Inquiry Generator
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Select your interest and enter details to copy a ready-to-send template for WhatsApp or Email.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Service Interest:</label>
                      <select 
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="Online Expert Consultation">Online Expert Consultation</option>
                        <option value="Turnkey Farm Setup (Biofloc/RAS/Pond)">Turnkey Farm Setup (Biofloc/RAS/Pond)</option>
                        <option value="Fish Food & Feed Supply Inquiry">Fish Food & Feed Supply Inquiry</option>
                        <option value="Aquaculture Tools & Aerator Purchase">Aquaculture Tools & Aerator Purchase</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Your Requirements / Location / Questions:</label>
                      <textarea
                        rows={3}
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        placeholder="E.g. I want to setup a 5-tank Biofloc farm in Bihar and need 32% protein floating feed..."
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <a
                        href={`https://wa.me/919748952342?text=${encodeURIComponent(`Hello Modern Fisheries Team,\nInquiry: ${contactSubject}\nRequirements: ${userQuery || "Please send consultation details."}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </a>

                      <a
                        href={`mailto:mf@owncircles.com?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(userQuery || "Hello Modern Fisheries Team, Please send me consultation and catalog info.")}`}
                        className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send Email</span>
                      </a>
                    </div>

                    {copiedNotice && (
                      <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold text-center animate-fade-in">
                        ✓ Copied template to clipboard!
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (SEO & AdSense Optimization) */}
            <section className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b border-slate-100 pb-3 space-y-1">
                <span className="text-[10px] font-mono text-blue-700 font-extrabold uppercase tracking-widest block">Knowledge Base & FAQ</span>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-500">
                  Everything you need to know about our consultancy, farm setup engineering, and equipment shipping.
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans text-slate-700">
                {[
                  {
                    q: "How does the online fish farming consultation work?",
                    a: "You can book an online consultation via WhatsApp or video call. Our senior agronomists inspect your farm photos, water test values (pH, DO, TAN), and fish symptoms to deliver customized water treatment protocols and feed schedule calibrations."
                  },
                  {
                    q: "What types of fish farm setups do you engineer?",
                    a: "We engineer turn-key Recirculating Aquaculture Systems (RAS), Biofloc tarpaulin tanks, Aquaponics green houses, Hydroponics channels, and traditional Earthen Ponds tailored for Tilapia, Pangasius, Murrel, Carp, Catfish, and Shrimp."
                  },
                  {
                    q: "How can I order fish feed and equipment in bulk?",
                    a: "You can contact us via email at mf@owncircles.com or WhatsApp (+91 97489 52342) with your location and quantity requirements. We dispatch high-protein floating pellets and heavy machinery nationwide."
                  },
                  {
                    q: "Do you offer warranty on aerators and water testing equipment?",
                    a: "Yes, all our paddlewheel aerators, root blowers, and digital water meters come with official manufacturer warranties and replacement support."
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-1.5">
                    <h3 className="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      {faq.q}
                    </h3>
                    <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden xl:block shrink-0 sticky top-20">
            <RightSidebarAd reloadKey="about-sidebar-ad" />
          </div>

        </div>
      </main>

    </div>
  );
}
