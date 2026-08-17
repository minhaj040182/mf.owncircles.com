import React from "react";
import { FileX, Home, Calculator, Waves, Sprout, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { PageType } from "../utils/seoRouting";

interface Gone410PageProps {
  onNavigate?: (page: PageType) => void;
  onBackToDashboard: () => void;
}

export default function Gone410Page({ onNavigate, onBackToDashboard }: Gone410PageProps) {
  const replacedGuides = [
    {
      oldName: "AquaponicseBook.pdf",
      title: "Recirculating Aquaculture System (RAS) & Aquaponics",
      targetPage: "ras" as PageType,
      desc: "Replaced with interactive biofilter sizing, solids removal, and nitrification cycling guides.",
      icon: Waves,
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200"
    },
    {
      oldName: "Bioflocebooks.pdf",
      title: "Biofloc Technology (BFT) Operational Guide",
      targetPage: "biofloc" as PageType,
      desc: "Replaced with C:N ratio calculations, carbon dosing guidelines, and probiotic inoculation protocols.",
      icon: Sprout,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      oldName: "catfish.pdf & Feed Manuals",
      title: "Commercial Aquaculture Calculators & Feed Management",
      targetPage: "calculators" as PageType,
      desc: "Replaced with real-time FCR calculators, daily feeding tables, and stocking density algorithms.",
      icon: Calculator,
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      oldName: "Hydroponicsebook.pdf & Feasibility",
      title: "Commercial Hydroponics & Soilless Cultivation",
      targetPage: "hydroponics" as PageType,
      desc: "Replaced with NFT, DWC crop parameters, EC/pH monitoring ranges, and setup cost frameworks.",
      icon: Sprout,
      badgeColor: "bg-green-50 text-green-700 border-green-200"
    }
  ];

  const handleNavigate = (page: PageType) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      onBackToDashboard();
    }
  };

  return (
    <div className="w-full bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8 min-h-[75vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Main 410 Status Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm text-center space-y-5">
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 mx-auto shadow-xs">
            <FileX className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold tracking-wider uppercase">
              <span>HTTP 410 • Resource Permanently Removed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
              Decommissioned Document or E-Book
            </h1>
            <p className="text-slate-600 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              The requested PDF file, legacy document, or e-book has been <strong>permanently removed</strong> from our servers and will not be reinstated. All technical farming knowledge has been upgraded to modern, live interactive web tools and guides.
            </p>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-sans font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Go to Modern Fisheries Home</span>
            </button>
            <button
              onClick={() => handleNavigate("calculators")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-sans font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Launch Aquaculture Calculators</span>
            </button>
          </div>

          {/* Crawler Purge Notice */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Search Engine Status: 410 Gone response sent to purge index cache</span>
            </div>
          </div>

        </div>

        {/* Replacement Guide Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-bold font-mono tracking-wider text-slate-500 uppercase">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Access Upgraded Online Guides Replacing Legacy PDFs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {replacedGuides.map((guide) => {
              const IconComp = guide.icon;
              return (
                <button
                  key={guide.oldName}
                  onClick={() => handleNavigate(guide.targetPage)}
                  className="text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all duration-200 group flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border ${guide.badgeColor}`}>
                        Replaced: {guide.oldName}
                      </span>
                      <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>
                    <h2 className="font-sans font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {guide.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                    <span>Explore Live Interactive Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
