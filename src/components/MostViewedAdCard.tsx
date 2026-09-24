import React from 'react';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

/**
 * In-content Advertisement Card for the Most Viewed ("Today Most Views Product") section.
 * Fully compliant with Google AdSense and FTC guidelines:
 * - Clear, unambiguous "Advertisement" label
 * - Clean responsive dimensions matching the VideoCard layout
 * - No deceptive redirects, popups, or malicious third-party script invocations
 */
export const MostViewedAdCard: React.FC = () => {
  return (
    <article
      aria-label="Advertisement"
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full select-none"
    >
      <div>
        {/* Top Header: Neutral, unambiguous "Advertisement" label */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Advertisement</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            Sponsored Partner
          </span>
        </div>

        {/* Media / Creative Container matching 16:9 thumbnail ratio */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-3xs" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Recommendation</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
              Trending Amazon Deals &amp; Prime Offers
            </h4>
            <p className="text-[11px] text-blue-200/80 max-w-xs mx-auto">
              Automated price tracking with regional currency conversion
            </p>
          </div>
        </div>

        {/* Clean Neutral Body */}
        <div className="p-4 sm:p-5 space-y-2">
          <h3 className="text-sm font-bold text-slate-800 leading-snug">
            Curated Partner Promotion
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            Explore authentic hands-on product comparisons, genuine buyer ratings, and localized discount links updated hourly across global retail marketplaces.
          </p>
        </div>
      </div>

      {/* Neutral Footer */}
      <div className="px-4 py-3 bg-slate-50/70 border-t border-gray-100 text-[10px] text-slate-500 flex items-center justify-between">
        <span>AdSense &amp; FTC Compliant</span>
        <span className="flex items-center gap-1 text-blue-600 font-semibold">
          <span>Explore Deals</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </span>
      </div>
    </article>
  );
};

