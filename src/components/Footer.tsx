import React from 'react';
import { Sparkles, Home, Dumbbell, Utensils, Shield, FileText, Info, Mail, Lock } from 'lucide-react';

interface FooterProps {
  onOpenLegal?: (tab: 'privacy' | 'terms' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const handleLegalClick = (e: React.MouseEvent, tab: 'privacy' | 'terms' | 'about' | 'contact', url: string) => {
    if (onOpenLegal) {
      e.preventDefault();
      onOpenLegal(tab);
    }
  };

  return (
    <footer className="bg-slate-100 border-t border-gray-200 text-slate-600 py-10 px-4 mt-16 text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tight">
                Trend<span className="text-blue-600">Pulse</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              YouTube video curation for household innovations, daily exercise gear, and trending home gadgets with extracted product reviews, genuine buyer sentiment analysis, and regional currency localization.
            </p>
          </div>

          {/* Legal & Compliance Links (Google AdSense Required) */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Transparency &amp; Legal</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleLegalClick(e, 'privacy', '/privacy-policy')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Privacy Policy &amp; Cookie Rights</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleLegalClick(e, 'terms', '/terms')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span>Terms of Service &amp; FTC Disclosure</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLegalClick(e, 'about', '/about')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3 h-3 text-slate-400" />
                  <span>About Us &amp; Review Standards</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLegalClick(e, 'contact', '/contact')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>Contact Us &amp; Publisher Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Categories & Crawler Index */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Trending Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-blue-600" /> Household
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Gadgets
              </span>
              <span className="flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-blue-600" /> Fitness
              </span>
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-blue-600" /> Kitchen
              </span>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <a href="/sitemap.xml" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">
                XML Sitemap
              </a>
              <span className="text-slate-300">&bull;</span>
              <a href="/ads.txt" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">
                ads.txt
              </a>
            </div>
          </div>

        </div>

        {/* Amazon Associates Legal Compliance & Disclaimer */}
        <div className="pt-6 border-t border-gray-200 space-y-3">
          <div className="bg-amber-500/10 border border-amber-200/80 rounded-xl p-4 text-xs text-slate-700 leading-relaxed space-y-2">
            <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
              <span>🛡️ Amazon Associates Program Legal Disclosure</span>
            </p>
            <p>
              TrendPulse is a participant in the <strong>Amazon Services LLC Associates Program</strong> and regional Amazon affiliate networks (including Amazon.in, Amazon.co.uk, Amazon.ca, Amazon.de, Amazon.com.au), an affiliate advertising program designed to provide a means for sites to earn advertising fees and sales commissions by advertising and linking to Amazon websites.
            </p>
            <p className="text-[11px] text-slate-500">
              Product pricing, promotional discounts, and stock availability displayed on this platform are updated periodically and are subject to change on Amazon at any time without prior notice.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-2">
            <p>
              As an Amazon Associate, TrendPulse earns from qualifying purchases made through converted affiliate links. Outbound commercial links are designated with rel=&quot;sponsored nofollow&quot;.
            </p>
            <p>
              TrendPulse &copy; {new Date().getFullYear()} OwnCircles Network. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};


