import React from "react";
import { Shield, Lock, FileText, Mail, Phone, MapPin, CheckCircle2, AlertTriangle, Eye, Server, RefreshCw, ChevronLeft } from "lucide-react";
import AdBanner from "./AdBanner";
import RightSidebarAd from "./RightSidebarAd";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface PrivacyPolicyPageProps {
  onBackToDashboard?: () => void;
}

export default function PrivacyPolicyPage({ onBackToDashboard }: PrivacyPolicyPageProps = {}) {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 space-y-2">
          {onBackToDashboard && (
            <button 
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-xs font-sans font-bold tracking-tight bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs mb-2"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>&lt;- Back to Dashboard</span>
            </button>
          )}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-mono uppercase tracking-widest font-bold">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            Legal & Compliance Center
          </div>
          <h1 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-white">
            Privacy Policy & Editorial Terms
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-sans">
            Transparent information practices, Google AdSense cookie disclosures, data protection guidelines, and technical aquaculture disclaimers for Modern Fisheries.
          </p>
          <p className="text-[10px] font-mono text-slate-400 pt-1">
            Effective Date: July 2026 | Last Updated: Current Session
          </p>
        </div>
      </div>

      {/* Top Advertisement Banner (Placed AFTER the Header Banner) */}
      <div className="bg-slate-50/95 backdrop-blur-md py-0.5 my-1 transition-all border-y border-slate-200/80 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <AdBanner reloadKey="privacypolicy-main-ad" />
        </div>
      </div>

      {/* Mobile Announcement Card (Not Sticky - scrolls up naturally) */}
      <div className="lg:hidden max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 my-1">
        <OwnCirclesAnnouncement mode="mobile" />
      </div>

      {/* Main Content Layout */}
      <main className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          <div className="flex-1 min-w-0 space-y-8 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs">
            
            {/* 1. Introduction & Scope */}
            <section className="space-y-3 border-b border-slate-100 pb-6">
              <h2 className="text-lg sm:text-xl font-sans font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                1. Overview & Data Controller
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                At <strong>Modern Fisheries</strong> (accessible from modernfisheries.com), the privacy of our visitors is one of our main priorities. This Privacy Policy document contains types of information that is collected and recorded by Modern Fisheries and how we use it to provide online fisheries consultation, equipment supplies, and calculation tools.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                If you have additional questions or require more information about our Privacy Policy or AdSense compliance, do not hesitate to contact us at <a href="mailto:mf@owncircles.com" className="text-blue-700 font-bold hover:underline">mf@owncircles.com</a> or via phone/WhatsApp at <strong>+91 97489 52342</strong>.
              </p>
            </section>

            {/* 2. Google AdSense & Third-Party Cookies Disclosure */}
            <section className="space-y-3 border-b border-slate-100 pb-6">
              <h2 className="text-lg sm:text-xl font-sans font-black text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600 shrink-0" />
                2. Google AdSense & Third-Party Advertising Cookies
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Modern Fisheries displays advertisements served by third-party advertising partners, including <strong>Google AdSense</strong>. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites on the Internet.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs text-slate-700">
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>DoubleClick DART Cookie:</strong> Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Opt-Out Options:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline">Google Ad Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline">www.aboutads.info</a>.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Ad Labeling:</strong> All ad banners on Modern Fisheries are isolated in sandboxed containers in compliance with Google Publisher Policies.</span>
                </div>
              </div>
            </section>

            {/* 3. Log Files & Analytics */}
            <section className="space-y-3 border-b border-slate-100 pb-6">
              <h2 className="text-lg sm:text-xl font-sans font-black text-slate-900 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600 shrink-0" />
                3. Log Files & Browser Local Storage
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Modern Fisheries follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Our interactive aquaculture tools (such as the FCR Calculator, Biofloc Tank Sizer, and Feed Estimator) process calculations entirely inside your local browser session using client-side JavaScript. No sensitive farm financial data is saved to external servers unless you explicitly send a consultation request.
              </p>
            </section>

            {/* 4. Technical Aquaculture & Medical Disclaimer */}
            <section className="space-y-3 border-b border-slate-100 pb-6 bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl">
              <h2 className="text-base sm:text-lg font-sans font-black text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                4. Professional Aquaculture & Technical Disclaimer
              </h2>
              <p className="text-xs text-amber-900/90 leading-relaxed font-sans">
                The technical guides, disease diagnostic matrices, water parameter thresholds (pH, TAN, Nitrite, DO), and calculator tools provided on Modern Fisheries are for educational and advisory purposes only. While our protocols are derived from accredited fisheries agronomy standards, actual biological performance varies depending on local water chemistry, stocking origin, climate, and biosecurity execution.
              </p>
              <p className="text-xs text-amber-900/90 leading-relaxed font-sans">
                Fish farmers are advised to conduct small-scale water testing and consult directly with our senior agronomists before applying large-scale chemical treatments or antibiotic dosages.
              </p>
            </section>

            {/* 5. User Rights (CCPA / GDPR) */}
            <section className="space-y-3 border-b border-slate-100 pb-6">
              <h2 className="text-lg sm:text-xl font-sans font-black text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                5. Privacy Rights (CCPA & GDPR)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                We respect your data privacy rights. Under California Consumer Privacy Act (CCPA) and General Data Protection Regulation (GDPR), every user is entitled to:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-2">
                <li><strong>The right to access:</strong> Request copies of your personal data submitted via contact forms.</li>
                <li><strong>The right to rectification:</strong> Request that we correct any information you believe is inaccurate.</li>
                <li><strong>The right to erasure:</strong> Request that we erase your personal data from our advisory databases.</li>
              </ul>
            </section>

            {/* 6. Official Contact Information */}
            <section className="space-y-3 pt-2">
              <h2 className="text-lg sm:text-xl font-sans font-black text-slate-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                6. Contact Our Compliance Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                For any data requests, AdSense inquiries, or formal correspondence, please reach us through:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans pt-2">
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Official Email</span>
                  <a href="mailto:mf@owncircles.com" className="font-mono font-bold text-blue-700 hover:underline select-all block">
                    mf@owncircles.com
                  </a>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Phone & WhatsApp Support</span>
                  <a href="https://wa.me/919748952342" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-slate-900 hover:text-emerald-700 select-all block">
                    +91 97489 52342
                  </a>
                </div>

                <div className="sm:col-span-2 bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
                  <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Main Headquarters Address</span>
                  <p className="text-slate-800 font-semibold">
                    Dream City, Bakra Hat Road, Rasopunja, Joka, Kolkata 700156
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden xl:block shrink-0 sticky top-20">
            <RightSidebarAd reloadKey="privacy-sidebar-ad" />
          </div>

        </div>
      </main>

    </div>
  );
}
