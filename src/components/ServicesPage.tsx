import React, { useState } from "react";
import { Briefcase, Calendar, ShieldCheck, CheckCircle2, Award, Clock, Users, Mail, AlertCircle, Phone, ChevronLeft } from "lucide-react";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface ServiceItem {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  benefits: string[];
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: "serv-1",
    title: "Virtual Agronomy & Research Consultation",
    duration: "45 Minutes",
    price: "Request Details",
    description: "Discuss aquaculture biology, disease diagnosis protocols (e.g. columnaris, fin rot mitigation), FCR optimization models, or water quality calibration parameters with aquaculture researchers.",
    benefits: ["Detailed diagnostic action plan", "Prescriptive treatment protocols", "Post-session research summary & FCR modeling spreadsheets"]
  },
  {
    id: "serv-2",
    title: "Water Chemistry Laboratory Diagnostic Evaluation",
    duration: "2-3 Days Review",
    price: "Request Details",
    description: "Submit water quality parameters (pH, Dissolved Oxygen, TAN, Nitrite, Alkalinity) for certified biochemical analysis with precise probiotic and liming equations.",
    benefits: ["Complete water chemistry report", "Tailored bacterial dosing index", "Toxic ammonia mitigation guidelines"]
  },
  {
    id: "serv-3",
    title: "Educational Blueprint Matrix for RAS Engineering",
    duration: "Engineering Reference",
    price: "Request Details",
    description: "Engineering schematics and mass-balance flow calculations. Includes piping hydraulic schedules, pump head calibrations, drum filter sizing algorithms, and bio-media surface area ratios.",
    benefits: ["CAD layout schematics (round & rectangular)", "Total power demand computations", "Emergency aeration biosecurity sizing"]
  }
];

interface ServicesPageProps {
  onBackToDashboard?: () => void;
}

export default function ServicesPage({ onBackToDashboard }: ServicesPageProps = {}) {
  const [selectedService, setSelectedService] = useState<string>("serv-1");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");

  const activeServiceDetails = ALL_SERVICES.find((s) => s.id === selectedService) || ALL_SERVICES[0];

  return (
      <div className="bg-slate-50 min-h-screen">    
      
      {/* Banner */}
      <div className="relative bg-emerald-950 text-white p-8 sm:p-12 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-800/40 via-emerald-950 to-emerald-950"></div>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">         
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-700 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
            Modern Fisheries Technical Blueprints
          </span>
          <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">
            Engineering Specifications &amp; Technical Matrices
          </h1>
          <p className="text-emerald-150/90 text-sm sm:text-base leading-relaxed">
            Open-access engineering matrices and peer-reviewed technical specifications for modern aquaculture systems. Designed for researchers, commercial farm engineers, and aquaculture scholars.
          </p>
        </div>
      </div>

       {/* Sticky Top Advertisement Banner */}
        <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-0.5 my-1 transition-all border-y border-slate-200/80 shadow-xs -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 w-auto">
          <div className="max-w-[1440px] mx-auto">
            <AdBanner reloadKey="feeding-main-ad" />
          </div>
        </div>

        {/* Mobile Announcement Card */}
        <div className="lg:hidden my-1">
          <OwnCirclesAnnouncement mode="mobile" />
        </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start p-12">
        <div className="flex-1 min-w-0 space-y-12">

      {/* Services Portfolio */}
      <div className="space-y-6 p-8">
        <div>
          <h2 className="font-sans font-extrabold text-slate-900 text-xl flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            Engineering &amp; Diagnostic Specifications Index
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Review the peer-reviewed engineering schematics and laboratory frameworks below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ALL_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`p-6 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                selectedService === service.id
                  ? "bg-white border-emerald-600 ring-1 ring-emerald-600 shadow-md scale-[1.01]"
                  : "bg-slate-50 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/10"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg leading-tight">
                    {service.title}
                  </h4>
                  <a 
                    href="#contact-panel"
                    onClick={(e) => {
                      e.stopPropagation();
                      const el = document.getElementById("contact-panel");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-sans text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full shrink-0 border border-emerald-200/80 transition-colors"
                  >
                    {service.price}
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-mono">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>

                <p className="text-slate-600 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bullet benefits */}
              <div className="border-t border-slate-100 pt-3 mt-4 space-y-1.5">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-600 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Static Specification Panel */}
      <div id="contact-panel" className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-150 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Active Service Info Summary */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Selected Technical Specification</span>
          <h4 className="font-sans font-black text-slate-900 text-sm leading-tight">
            {activeServiceDetails.title}
          </h4>
          <div className="flex justify-between items-center text-xs border-y border-slate-200/60 py-2 my-2 font-mono">
            <span className="text-slate-400">Duration index:</span>
            <span className="font-bold text-slate-700">{activeServiceDetails.duration}</span>
          </div>
          <div className="flex justify-between items-center text-xs border-b border-slate-200/60 pb-2 mb-2 font-mono">
            <span className="text-slate-400">Access Tier:</span>
            <span className="font-bold text-emerald-700 underline cursor-pointer">{activeServiceDetails.price}</span>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Technical parameters included</span>
            {activeServiceDetails.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Static Technical Request Desk */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              Educational Research Portal
            </span>
            <h3 className="font-sans font-black text-slate-900 text-xl tracking-tight">
              Request Technical Blueprint Specifications
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-sans">
              To request full CAD plumbing schematics, mass-balance biofilter formulas, or peer-reviewed educational datasets, contact our editorial research desk.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
            <h4 className="font-sans font-bold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-200 pb-2">Editorial Desk Inquiries:</h4>
            
            <div className="space-y-3 font-sans text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="block font-bold text-slate-800">Academic &amp; Engineering Desk</span>
                  <p className="mb-1">Send blueprint specifications and technical research questions to:</p>
                  <a 
                    href="mailto:mf@owncircles.com?subject=Technical%20Blueprint%20Specification%20Inquiry"
                    className="font-mono font-bold text-emerald-700 text-sm hover:underline select-all bg-white px-2 py-0.5 rounded border border-slate-200 inline-block"
                  >
                    mf@owncircles.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

        </div>
        <div className="hidden xl:block shrink-0 sticky top-20">
          <RightSidebarAd reloadKey="services-sidebar-ad" />
        </div>
      </div>
    </div>
  );
}
