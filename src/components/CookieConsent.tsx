import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacyPolicy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacyPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('trendpulse_cookie_consent');
      if (!consent) {
        // Show after a subtle delay for smooth user experience
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('trendpulse_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('trendpulse_cookie_consent', 'essential_only');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-slate-900/95 text-white border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-fadeIn"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-amber-400">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <h4 className="font-bold text-xs tracking-wide uppercase">Privacy &amp; Cookie Preferences</h4>
        </div>
        <button
          onClick={handleDecline}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
        TrendPulse uses technical cookies, local storage, and advertising partners (including Google AdSense and Amazon Associates) to deliver personalized review insights, accurate regional currency deals, and relevant advertising.
      </p>

      <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-800 text-xs">
        <button
          onClick={onOpenPrivacyPolicy}
          className="text-blue-400 hover:text-blue-300 underline font-medium text-[11px]"
        >
          Privacy Policy
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
};
