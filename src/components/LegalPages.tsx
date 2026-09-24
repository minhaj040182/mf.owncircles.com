import React, { useState } from 'react';
import { Shield, FileText, Info, Mail, ArrowLeft, CheckCircle, ExternalLink, Lock, HelpCircle } from 'lucide-react';

export type LegalPageType = 'privacy' | 'terms' | 'about' | 'contact';

interface LegalPagesProps {
  initialPage?: LegalPageType;
  onClose?: () => void;
  inline?: boolean;
}

export const LegalPages: React.FC<LegalPagesProps> = ({
  initialPage = 'privacy',
  onClose,
  inline = false
}) => {
  const [activeTab, setActiveTab] = useState<LegalPageType>(initialPage);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('General Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;
    setContactSubmitted(true);
  };

  const handleTabChange = (tab: LegalPageType) => {
    setActiveTab(tab);
    const pathMap: Record<LegalPageType, string> = {
      privacy: '/privacy-policy',
      terms: '/terms',
      about: '/about',
      contact: '/contact'
    };
    if (window.location.pathname !== pathMap[tab]) {
      window.history.pushState(null, '', pathMap[tab]);
    }
  };

  return (
    <div className={inline ? 'w-full py-8' : 'fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto'}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden my-auto animate-fadeIn">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Go back to Home"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>TrendPulse Legal & Transparency Center</span>
              </h2>
              <p className="text-xs text-slate-400">
                Google AdSense, FTC Affiliate Disclosures &amp; Consumer Privacy Guidelines
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-sm font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 border-b border-gray-200 px-4 py-2 flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => handleTabChange('privacy')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => handleTabChange('terms')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => handleTabChange('about')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About Us &amp; Review Standards</span>
          </button>

          <button
            onClick={() => handleTabChange('contact')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'contact'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us &amp; Support</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto text-slate-700 text-sm leading-relaxed space-y-6">
          
          {/* TAB 1: PRIVACY POLICY (AdSense, GDPR, CCPA Compliant) */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Legal Compliance</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">Privacy Policy</h3>
                <p className="text-xs text-slate-500 mt-0.5">Last updated: September 17, 2026</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 text-xs">
                <strong>Summary for Visitors:</strong> TrendPulse (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your personal information and privacy rights. We do not sell your personal data. We utilize industry-standard analytics, regional preference caching, and advertising partners that comply with Google AdSense and international privacy regulations.
              </div>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">1. Google AdSense &amp; Third-Party Advertising Cookies</h4>
                <p>
                  We may partner with third-party advertising vendors, including Google LLC, to serve advertisements when you visit our website.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>
                    <strong>Third-Party Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to this website or other websites on the internet.
                  </li>
                  <li>
                    <strong>Google DART Cookie:</strong> Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to our site and/or other sites on the Internet.
                  </li>
                  <li>
                    <strong>Opt-Out Rights:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendors&rsquo; use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.aboutads.info</a> or <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Your Online Choices</a>.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">2. Amazon Associates &amp; Commercial Affiliate Disclosures</h4>
                <p>
                  TrendPulse is a participant in the <strong>Amazon Services LLC Associates Program</strong> and affiliated regional partner programs (including Amazon India, Amazon UK, Amazon Canada, Amazon Germany, and Amazon Australia).
                </p>
                <p className="text-xs text-slate-600">
                  These affiliate advertising programs allow us to earn referral commissions when users click on converted product links and finalize qualifying purchases on Amazon. Amazon and related merchant partners may use tracking cookies or web beacons to identify the referral source. These cookies do not store personally identifiable consumer payment data.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">3. Information We Collect Automatically</h4>
                <p>
                  When you access or interact with TrendPulse, we may automatically collect standard non-personally identifiable technical information:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Browser type, operating system, device screen dimensions, and language preferences.</li>
                  <li>Approximate regional geolocation (country level) used strictly to deliver correct localized Amazon store links (e.g. Amazon.in vs Amazon.com) and regional currency formatting.</li>
                  <li>Aggregated interaction telemetry, such as product view counts, video playback events, and search query filters.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">4. Client-Side Local Storage &amp; Cache</h4>
                <p className="text-xs text-slate-600">
                  We store user interface preferences (such as your chosen regional currency, saved bookmarked deals, and cookie banner consent status) directly in your browser&rsquo;s <code>localStorage</code>. This data never leaves your personal device and can be cleared at any time through your browser settings.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">5. GDPR (European Economic Area &amp; UK) Rights</h4>
                <p className="text-xs text-slate-600">
                  If you reside in the EEA or UK, you have legal rights under the General Data Protection Regulation (GDPR), including the right to access, rectify, or request erasure of your data, as well as the right to restrict or object to processing. Because TrendPulse does not require user accounts or store private personal profiles, we do not retain identifiable personal databases.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">6. CCPA / CPRA (California Residents) Notice</h4>
                <p className="text-xs text-slate-600">
                  Under the California Consumer Privacy Act (CCPA), California residents have the right to request disclosure of personal information collected, request deletion, and opt out of the sale or sharing of personal data. TrendPulse does not sell consumer personal information.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">7. Changes to This Privacy Policy</h4>
                <p className="text-xs text-slate-600">
                  We reserve the right to modify this Privacy Policy at any time. Any changes will be reflected with an updated date at the top of this document. Continued use of TrendPulse constitutes acceptance of the revised terms.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">User Agreement</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">Terms of Service</h3>
                <p className="text-xs text-slate-500 mt-0.5">Last updated: September 17, 2026</p>
              </div>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h4>
                <p className="text-xs text-slate-600">
                  By accessing and using TrendPulse (located at <code>trends.owncircles.com</code>), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you are prohibited from using this platform.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">2. Intellectual Property &amp; Video Content Attribution</h4>
                <p className="text-xs text-slate-600">
                  TrendPulse is an independent video review curation and analysis hub. All third-party video content, trademarks, logos, brand names, and creator handles displayed on TrendPulse remain the exclusive intellectual property of their respective owners and YouTube creators. Video embeds utilize the official YouTube IFrame Player API in compliance with YouTube Developer Terms of Service. TrendPulse does not claim ownership over embedded videos.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">3. Product Information, Pricing &amp; Availability Disclaimer</h4>
                <p className="text-xs text-slate-600">
                  Product descriptions, pricing estimates, discounts, and availability displayed on TrendPulse are aggregated for informational purposes only. While our algorithms update prices hourly, prices and stock levels on external marketplaces (such as Amazon) fluctuate rapidly and without notice. TrendPulse makes no warranties or guarantees regarding the accuracy, timeliness, or completeness of product listings on merchant sites.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">4. FTC Affiliate Disclosure</h4>
                <p className="text-xs text-slate-600">
                  In compliance with the Federal Trade Commission (FTC) guidelines, please be advised that outbound links leading to Amazon and other e-commerce retailers may be affiliate links. TrendPulse may receive a commission on purchases made through these links at zero additional cost to the purchaser.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">5. Limitation of Liability</h4>
                <p className="text-xs text-slate-600">
                  In no event shall TrendPulse, its operators, affiliates, or licensors be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this site, or from any products purchased from third-party retailers through referral links.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">6. Governing Law</h4>
                <p className="text-xs text-slate-600">
                  These terms shall be governed by and construed in accordance with applicable laws, without giving effect to any principles of conflicts of law.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: ABOUT US & EDITORIAL STANDARDS */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Editorial Standards</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">About TrendPulse</h3>
                <p className="text-xs text-slate-500 mt-0.5">Mission, Methodology &amp; Review Verification Framework</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Our Mission</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Consumers are inundated with thousands of sponsored video reviews and unverified claims. TrendPulse solves this by synthesizing genuine creator benchmarks, audience sentiment, and real-time retail pricing across global markets.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">How We Review</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We aggregate verified hands-on tests from reputable tech, home, and fitness reviewers. We analyze thousands of real buyer comments to score durability, noise levels, performance, and value for money.
                  </p>
                </div>
              </div>

              <section className="space-y-3">
                <h4 className="text-base font-bold text-slate-900">The 4-Pillar AI Curation Framework</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <strong className="text-slate-900">1. Transcript &amp; Benchmark Extraction:</strong> We parse technical specifications, decibel ratings, battery life measurements, and heat outputs reported in creator lab tests.
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <strong className="text-slate-900">2. Buyer Comment Sentiment Analysis:</strong> We extract genuine buyer questions and recurring complaints from active comment threads to highlight authentic pros and cons.
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <strong className="text-slate-900">3. Multi-Regional Deal Matching:</strong> We link products directly to their official merchant listings across 8 geographical regions (India, USA, UK, Canada, Australia, Germany, Pakistan, Bangladesh).
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <strong className="text-slate-900">4. Transparent Editorial Independence:</strong> Retailers and creators cannot pay for higher placement or skewed sentiment scores.
                  </div>
                </div>
              </section>

              <section className="space-y-2 border-t border-gray-200 pt-4">
                <h4 className="text-base font-bold text-slate-900">Publisher &amp; Ownership Information</h4>
                <p className="text-xs text-slate-600">
                  TrendPulse is operated as an independent consumer technology review network under the OwnCircles digital publishing infrastructure (<code>trends.owncircles.com</code>). For editorial questions, copyright inquiries, or partnership discussions, please reach out via our contact page.
                </p>
              </section>
            </div>
          )}

          {/* TAB 4: CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Publisher Support</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">Contact Us</h3>
                <p className="text-xs text-slate-500 mt-0.5">We are here to assist with editorial inquiries, DMCA notices, or technical feedback.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">Email Inquiries</h4>
                  <p className="text-sm font-semibold text-slate-900">support@owncircles.com</p>
                  <p className="text-[11px] text-slate-500 mt-1">Typical response time: 24 to 48 business hours.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">Publisher Domain</h4>
                  <p className="text-sm font-semibold text-slate-900">trends.owncircles.com</p>
                  <p className="text-[11px] text-slate-500 mt-1">TrendPulse Consumer Technology &amp; Home Hub</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">Copyright / DMCA</h4>
                  <p className="text-sm font-semibold text-slate-900">dmca@owncircles.com</p>
                  <p className="text-[11px] text-slate-500 mt-1">Immediate review of attribution or take-down notices.</p>
                </div>
              </div>

              {contactSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Message Sent Successfully</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Thank you for reaching out to TrendPulse. Our team has received your communication and will reply to <strong>{contactEmail}</strong> shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-slate-900 text-sm">Send a Direct Message</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Editorial Correction">Editorial Correction / Product Data Update</option>
                      <option value="Creator Attribution / DMCA">Creator Attribution or DMCA Notice</option>
                      <option value="Advertising & Partnerships">Advertising &amp; Partnerships</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Please provide specific details regarding your inquiry..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 border-t border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <span>TrendPulse &copy; {new Date().getFullYear()} OwnCircles Network. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" className="text-blue-600 hover:underline">Sitemap</a>
            <a href="/ads.txt" className="text-slate-500 hover:underline">ads.txt</a>
          </div>
        </div>

      </div>
    </div>
  );
};
