import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, X, ExternalLink } from "lucide-react";

interface CookieConsentBannerProps {
  onOpenPrivacyPolicy?: () => void;
}

export default function CookieConsentBanner({ onOpenPrivacyPolicy }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem("mf_cookie_consent_accepted");
    if (!consent) {
      // Small delay for smooth entry animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("mf_cookie_consent_accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-2 sm:p-4 transition-all duration-500 ease-in-out transform translate-y-0 animate-slide-up">
      <div className="max-w-7xl mx-auto bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Content Area */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-xl shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 animate-pulse" />
          </div>
          
          <div className="space-y-1 text-left min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-sans font-black text-sm sm:text-base text-white tracking-tight">
                Cookie & Data Privacy Transparency
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Zero Personal Data Stored
              </span>
            </div>

            <p className="text-xs sm:text-xs text-slate-300 leading-relaxed font-sans max-w-4xl">
              Modern Fisheries <strong>does NOT collect, store, or track any personal user data</strong>, computer-generated program data, or private user profiles. However, standard 3rd-party integration tools — such as <strong>Google AdSense advertisements</strong> and embedded media providers — may place anonymized 3rd-party cookies on your browser to serve relevant ads and maintain site security.
            </p>

            {onOpenPrivacyPolicy && (
              <button
                onClick={onOpenPrivacyPolicy}
                className="text-[11px] font-mono text-blue-300 hover:text-blue-200 underline font-semibold inline-flex items-center gap-1 pt-0.5 cursor-pointer"
              >
                <span>Read Full Privacy Policy & AdSense Disclosures</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <button
            onClick={handleAcceptAll}
            className="w-full md:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-sans font-extrabold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <span>Accept All</span>
          </button>
        </div>

      </div>
    </div>
  );
}
