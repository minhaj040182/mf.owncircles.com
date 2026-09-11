import React, { useState } from "react";
import { 
  Mail, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Fish, 
  Wrench, 
  HelpCircle, 
  MessageSquare, 
  Layers, 
  Globe, 
  Clock, 
  BookOpen, 
  FileText, 
  Calculator, 
  ArrowRight
} from "lucide-react";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";
import BrandLogo from "./BrandLogo";

interface AboutUsPageProps {
  onBackToDashboard?: () => void;
}

export default function AboutUsPage({ onBackToDashboard }: AboutUsPageProps = {}) {
  const [selectedService, setSelectedService] = useState<string>("agronomy");
  const [contactSubject, setContactSubject] = useState<string>("Aquaculture Engineering Specification Inquiry");
  const [userQuery, setUserQuery] = useState<string>("");
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  const researchVerticals = [
    {
      id: "agronomy",
      title: "Precision Agronomy & Water Diagnostics",
      tagline: "Empirical Water Chemistry & Biosecurity Protocols",
      icon: MessageSquare,
      color: "from-blue-600 to-indigo-700",
      bgLight: "bg-blue-50 border-blue-100 text-blue-900",
      description: "Computational diagnostic models and empirical research on ammonia-nitrite equilibrium, microbial floc kinetics, and chemical parameter tolerances across intensive aquaculture species.",
      highlights: [
        "Open-access TAN, NH3, and NO2 mathematical modeling calculators",
        "Biosecurity barrier design and quarantine quarantine trial metrics",
        "Empirical DO saturation curves across temperature and salinity gradients",
        "Microbial species composition and Bacillus strain evaluation datasets"
      ]
    },
    {
      id: "blueprints",
      title: "Educational Blueprint Matrices for RAS & Biofloc",
      tagline: "Hydraulic Recirculation Loops & Civil Layout Matrices",
      icon: Wrench,
      color: "from-emerald-600 to-teal-700",
      bgLight: "bg-emerald-50 border-emerald-100 text-emerald-900",
      description: "Peer-reviewed engineering specifications for circular tarpaulin geometry, swirl separator hydraulics, MBBR bio-carrier volume sizing, and zero-water exchange biosecurity loops.",
      highlights: [
        "Circular tarpaulin tank hydrostatic pressure & stress calculations",
        "Moving Bed Biofilm Reactor (MBBR) biological surface kinetics",
        "CO2 stripping cascade and multi-stage degassing schematics",
        "Closed-loop zero-discharge recirculation filtration blueprints"
      ]
    },
    {
      id: "nutrition",
      title: "Fish Nutrition, FCR Optimization & Protein Metrics",
      tagline: "Open-Access Nutritional Science & Amino Acid Kinetics",
      icon: Fish,
      color: "from-amber-600 to-orange-700",
      bgLight: "bg-amber-50 border-amber-100 text-amber-900",
      description: "Nutritional trial data evaluating apparent digestibility coefficients, essential amino acid profiles, crude protein thresholds, and feed conversion efficiency in warmwater teleosts.",
      highlights: [
        "Species-specific crude protein & lipid optimization charts",
        "Feed Conversion Ratio (FCR) empirical tracking datasets",
        "Microbial single-cell protein assimilation in heterotrophic floc",
        "Comparative growth rate curves across pelleted feed formulations"
      ]
    },
    {
      id: "instrumentation",
      title: "Aquaculture Instrumentation & Engineering Standards",
      tagline: "Aeration Dynamics, Optical DO Sensors & Bio-Media",
      icon: Layers,
      color: "from-purple-600 to-indigo-800",
      bgLight: "bg-purple-50 border-purple-100 text-purple-900",
      description: "Technical evaluations and calibration standards for optical dissolved oxygen sensors, high-pressure regenerative blowers, venture injectors, and fluidised media carriers.",
      highlights: [
        "Standard Aeration Efficiency (SAE) benchmarking methodologies",
        "Optical luminescent DO sensor calibration & maintenance guides",
        "Specific surface area (SSA) metrics for K1 and K3 MBBR carriers",
        "Submersible electrical safety and grounding fault mitigation protocols"
      ]
    }
  ];

  const handleCopyEmailText = () => {
    const text = `To: mf@owncircles.com\nSubject: ${contactSubject}\nInquiry Details: ${userQuery || "Technical inquiry regarding aquaculture engineering specifications and research datasets."}`;
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Banner Header */}
      <div className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white py-6 sm:py-10 px-3 sm:px-6 lg:px-8 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[10px] sm:text-xs font-mono uppercase tracking-widest font-black px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              Open-Access Aquaculture Engineering & Research Portal
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tight text-white leading-tight">
              Modern Fisheries & Research
            </h1>
            <p className="text-blue-100/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-sans">
              India's authoritative digital journal and technical knowledge hub dedicated to precision aquaculture engineering, recirculating system blueprints, biological water diagnostics, and feed conversion science.
            </p>
          </div>

          {/* Editorial Desk Quick Overview Box */}
          <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl sm:rounded-3xl backdrop-blur-md self-start md:self-center w-full md:w-auto flex flex-col gap-2 text-left">
            <div>
              <span className="block text-[10px] font-mono tracking-widest uppercase text-blue-300 font-bold mb-0.5">Editorial Correspondence</span>
              <a href="mailto:mf@owncircles.com" className="block font-mono font-bold text-sm sm:text-base text-emerald-300 hover:underline">
                mf@owncircles.com
              </a>
            </div>
            <div className="pt-1.5 border-t border-white/10">
              <span className="block text-[10px] font-mono tracking-widest uppercase text-blue-300 font-bold mb-0.5">Academic Review Desk</span>
              <span className="block font-sans text-xs text-slate-300">
                Kolkata Research Bureau &bull; West Bengal, India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Advertisement Banner */}
      <div className="bg-slate-50/95 backdrop-blur-md py-0.5 my-1 transition-all border-y border-slate-200/80 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <AdBanner reloadKey="aboutus-main-ad" />
        </div>
      </div>

      {/* Mobile Announcement Card */}
      <div className="lg:hidden max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 my-1">
        <OwnCirclesAnnouncement mode="mobile" />
      </div>

      {/* Content Body Container */}
      <main className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 items-start">
          
          <div className="flex-1 min-w-0 space-y-8 sm:space-y-12 w-full">

            {/* SECTION 1: EDITORIAL & RESEARCH OVERVIEW */}
            <section className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-xs">
              {/* Official Brand Identity Banner */}
              <BrandLogo variant="full" className="mb-2" />

              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-[10px] font-mono text-blue-700 font-extrabold uppercase tracking-widest block">Journal Mission & Research Scope</span>
                <h2 className="text-xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight leading-snug">
                  Advancing Scientific Rigor in High-Density Aquaculture Engineering
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Modern Fisheries serves as an independent technical portal bridging the gap between microbiological research, hydraulic engineering, and practical aquaculture agronomy. Our research contributors investigate high-density recirculating systems (RAS), biofloc microbial ecology, empirical Feed Conversion Ratios (FCR), and water chemistry equilibrium to establish verifiable benchmarks for the South Asian aquaculture industry.
                </p>
              </div>

              {/* Core Values 3-Column Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">Empirical Methodology</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Technical matrices and calculators are grounded in verified biochemical formulas, FAO standards, and controlled trials.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">Open-Access Knowledge</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    All diagnostic algorithms, blueprint schematics, and nutrient matrices are publicly accessible to students, researchers, and agronomists.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">Regional Agro-Climatic Data</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Research models incorporate tropical and subtropical thermal variations specific to Indian river basins and coastal systems.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: OUR 4 CORE RESEARCH VERTICALS */}
            <section className="space-y-4">
              <div className="text-left space-y-1">
                <span className="text-[10px] font-mono text-blue-700 font-extrabold uppercase tracking-widest block">Technical Matrices & Disciplines</span>
                <h2 className="text-xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight">
                  Core Research Focus Areas
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Detailed technical frameworks developed for precision aquaculture practitioners and academic researchers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {researchVerticals.map((vertical) => {
                  const Icon = vertical.icon;
                  return (
                    <div 
                      key={vertical.id}
                      className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-r ${vertical.color} text-white shadow-xs`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                            Research Pillar
                          </span>
                        </div>

                        <div>
                          <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg tracking-tight">
                            {vertical.title}
                          </h3>
                          <p className="text-xs font-semibold text-blue-700 font-mono mt-0.5">
                            {vertical.tagline}
                          </p>
                        </div>

                        <p className="text-slate-600 text-xs leading-relaxed font-sans">
                          {vertical.description}
                        </p>

                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                          <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-wider block">Key Specifications:</span>
                          {vertical.highlights.map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-start text-[11px] text-slate-700 font-sans">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedService(vertical.id);
                          setContactSubject(`Technical Inquiry: ${vertical.title}`);
                          const el = document.getElementById("contact-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="mt-4 w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-900 text-white rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Inquire Regarding Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: ENGINEERING BLUEPRINT METHODOLOGY */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-md">
              <div className="space-y-1.5 border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono text-blue-300 font-extrabold uppercase tracking-widest block">Systematic Peer Review</span>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight">
                  The Aquaculture Blueprint Methodology
                </h2>
                <p className="text-xs text-blue-100/70">
                  How our engineering desk verifies biological models, hydraulic equations, and nutritional parameters before publication.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    step: "01",
                    title: "Parameter Baseline",
                    desc: "Verifying water source alkalinity, dissolved iron, calcium hardness, and environmental bacterial populations."
                  },
                  {
                    step: "02",
                    title: "Mathematical Sizing",
                    desc: "Deriving stoichiometric carbon dosing equations, hydraulic retention times (HRT), and total gas pressure balances."
                  },
                  {
                    step: "03",
                    title: "Biological Validation",
                    desc: "Evaluating nitrifying biofilm maturation curves, ammonia conversion rates, and teleost growth metrics under controlled density."
                  },
                  {
                    step: "04",
                    title: "Open-Access Matrix",
                    desc: "Compiling verified datasets into interactive calculation matrices, diagnostic wizards, and downloadable specifications."
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
                <span className="text-[10px] font-mono text-blue-700 font-extrabold uppercase tracking-widest block">Editorial & Technical Correspondence Desk</span>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-slate-900 tracking-tight">
                  Academic Inquiries & Research Correspondence
                </h2>
                <p className="text-xs text-slate-500">
                  Submit technical queries, calculation reviews, or collaborative research proposals to our editorial agronomy desk.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Official Info Panel */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-50 border border-slate-100 p-4 sm:p-5 rounded-2xl space-y-4">
                    <h3 className="font-sans font-bold text-slate-900 text-sm border-b border-slate-200/60 pb-2">
                      Editorial Headquarters Details
                    </h3>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 text-blue-800 rounded-lg shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Official Editorial Email</span>
                        <a 
                          href="mailto:mf@owncircles.com" 
                          className="font-mono font-bold text-blue-700 hover:underline text-xs sm:text-sm block truncate select-all"
                        >
                          mf@owncircles.com
                        </a>
                      </div>
                    </div>

                    {/* Administrative Telephone */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Administrative Helpline (Secretariat)</span>
                        <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm block select-all">
                          +91 97489 52342
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans block">
                          Official administrative desk inquiries only
                        </span>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-100 text-indigo-800 rounded-lg shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Editorial Office Address</span>
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
                        <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Desk Review Hours</span>
                        <p className="text-xs text-slate-700 font-sans">
                          Monday – Friday: 9:00 AM – 5:00 PM (IST)
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Research Inquiry Form / Generator */}
                <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-4 sm:p-6 rounded-2xl space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-sans font-black text-slate-900 text-sm sm:text-base">
                      Technical Research & Specification Request
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Submit your research inquiry, parameter dataset, or engineering specification question to our editorial desk.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Specification Topic:</label>
                      <select 
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="Aquaculture Engineering Specification Inquiry">Aquaculture Engineering Specification Inquiry</option>
                        <option value="Biofloc & RAS Blueprint Matrix Request">Biofloc & RAS Blueprint Matrix Request</option>
                        <option value="Fish Nutrition & FCR Optimization Research">Fish Nutrition & FCR Optimization Research</option>
                        <option value="Water Diagnostic Algorithm Review">Water Diagnostic Algorithm Review</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Technical Parameters / Inquiry Details:</label>
                      <textarea
                        rows={3}
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        placeholder="E.g. Inquiring regarding stoichiometric C:N calculations for 35% protein feed in a 20,000L circular tarpaulin tank..."
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <a
                        href={`mailto:mf@owncircles.com?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(userQuery || "Hello Modern Fisheries Research Team, Please provide technical specification details and reference datasets.")}`}
                        className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Submit Specification Request via Email</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyEmailText}
                        className="py-2.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Copy Inquiry Text</span>
                      </button>
                    </div>

                    {copiedNotice && (
                      <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold text-center animate-fade-in">
                        ✓ Copied inquiry template to clipboard!
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
            <section className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b border-slate-100 pb-3 space-y-1">
                <span className="text-[10px] font-mono text-blue-700 font-extrabold uppercase tracking-widest block">Knowledge Base & FAQ</span>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-500">
                  Key details on how our educational blueprints, computational tools, and technical publications are organized.
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans text-slate-700">
                {[
                  {
                    q: "How are the technical calculators and diagnostic models verified?",
                    a: "Our interactive calculators (such as the Biofloc C:N Carbon Dosing Calculator and Total Ammonia Nitrogen (TAN) Equilibrium Matrix) are based on established biochemical stoichiometry and peer-reviewed literature published in aquaculture engineering journals."
                  },
                  {
                    q: "What types of aquaculture blueprints are published on this portal?",
                    a: "We publish educational blueprint matrices for Recirculating Aquaculture Systems (RAS), zero-water exchange Biofloc tarpaulin tanks, coupled Aquaponic systems, and earthen pond hydraulics tailored for warmwater teleost species."
                  },
                  {
                    q: "Can university researchers and agronomists contribute data?",
                    a: "Yes. Researchers, doctoral fellows, and licensed aquaculture engineers can submit empirical trial findings, water chemistry datasets, and FCR telemetry for peer review and editorial publication by contacting our desk at mf@owncircles.com."
                  },
                  {
                    q: "Are the engineering blueprints and nutrient matrices free to access?",
                    a: "Yes. Modern Fisheries is committed to open-access educational dissemination. All design matrices, dosing formulas, and species management guides are publicly available for non-commercial educational use."
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
