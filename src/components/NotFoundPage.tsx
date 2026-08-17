import React from "react";
import { Home, Calculator, Waves, Sprout, Briefcase, Video as VideoIcon, ArrowLeft, AlertTriangle, Compass, Phone } from "lucide-react";
import { PageType } from "../utils/seoRouting";

interface NotFoundPageProps {
  onNavigate?: (page: PageType) => void;
  onBackToDashboard: () => void;
}

export default function NotFoundPage({ onNavigate, onBackToDashboard }: NotFoundPageProps) {
  const quickLinks = [
    {
      page: "home" as PageType,
      label: "Home Dashboard",
      desc: "Return to Modern Fisheries main overview and farm updates.",
      icon: Home,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200 hover:border-emerald-400"
    },
    {
      page: "calculators" as PageType,
      label: "Aquaculture Calculators",
      desc: "Precision FCR, pond volume, stocking density & feed sizing tools.",
      icon: Calculator,
      color: "text-blue-600 bg-blue-50 border-blue-200 hover:border-blue-400"
    },
    {
      page: "ras" as PageType,
      label: "RAS Technology (Aquaponic)",
      desc: "Recirculating Aquaculture System design, MBBR biofilters & aeration.",
      icon: Waves,
      color: "text-cyan-600 bg-cyan-50 border-cyan-200 hover:border-cyan-400"
    },
    {
      page: "biofloc" as PageType,
      label: "Biofloc Farming (BFT)",
      desc: "C:N ratio management, tarpaulin tank setups & probiotics.",
      icon: Sprout,
      color: "text-green-600 bg-green-50 border-green-200 hover:border-green-400"
    },
    {
      page: "services" as PageType,
      label: "Consultancy & Feed Supply",
      desc: "High-protein fish feed, certified fingerlings & turnkey setup.",
      icon: Briefcase,
      color: "text-amber-600 bg-amber-50 border-amber-200 hover:border-amber-400"
    },
    {
      page: "videos" as PageType,
      label: "Video Tutorials",
      desc: "Step-by-step masterclasses and harvest field recordings.",
      icon: VideoIcon,
      color: "text-red-600 bg-red-50 border-red-200 hover:border-red-400"
    }
  ];

  const handleLinkClick = (page: PageType) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      onBackToDashboard();
    }
  };

  return (
    <div className="w-full bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8 min-h-[75vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Main 404 Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm text-center space-y-5">
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mx-auto shadow-xs">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase">
              HTTP 404 • Page Not Found
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
              The page you are looking for does not exist
            </h1>
            <p className="text-slate-600 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              The requested URL was either moved, deleted, or entered incorrectly. Please check the address or explore our popular aquaculture tools and guides below.
            </p>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-sans font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Homepage</span>
            </button>
            <button
              onClick={() => handleLinkClick("calculators")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-sans font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Open Calculators</span>
            </button>
          </div>

        </div>

        {/* Quick Access Grid to Key Resources */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold font-mono tracking-wider text-slate-500 uppercase px-1">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Recommended Aquaculture Destinations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.page}
                  onClick={() => handleLinkClick(item.page)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 bg-white shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between group ${item.color}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-white/80 border border-current shadow-2xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h2 className="font-sans font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                      {item.label}
                    </h2>
                  </div>
                  <p className="text-slate-500 text-xs leading-normal">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Need Help Strip */}
        <div className="bg-emerald-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-sans font-bold text-sm text-emerald-100 flex items-center justify-center sm:justify-start gap-2">
              <Phone className="w-4 h-4 text-yellow-300" />
              <span>Looking for commercial consultation or fish seed supply?</span>
            </h3>
            <p className="text-emerald-300/80 text-xs">
              Reach out to our technical aquaculture desk directly at +919748952342 or mf@owncircles.com.
            </p>
          </div>
          <button
            onClick={() => handleLinkClick("services")}
            className="shrink-0 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            Contact Desk
          </button>
        </div>

      </div>
    </div>
  );
}
