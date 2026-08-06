import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import VideosPage from "./components/VideosPage";
import VideoDetailView from "./components/VideoDetailView";
import AdBanner from "./components/AdBanner";
import RightSidebarAd from "./components/RightSidebarAd";
import OwnCirclesAnnouncement from "./components/OwnCirclesAnnouncement";

// Import all newly created technology & services page modules
import RasPage from "./components/RasPage";
import BioflocPage from "./components/BioflocPage";
import AquaponicsPage from "./components/AquaponicsPage";
import HydroponicsPage from "./components/HydroponicsPage";
import PondFarmingPage from "./components/PondFarmingPage";
import DiseasesPage from "./components/DiseasesPage";
import FeedingPage from "./components/FeedingPage";
import CalculatorsPage from "./components/CalculatorsPage";
import ServicesPage from "./components/ServicesPage";
import AboutUsPage from "./components/AboutUsPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import CookieConsentBanner from "./components/CookieConsentBanner";
import ProfessionalDashboard from "./components/ProfessionalDashboard";
import CommercialProductsBanner from "./components/CommercialProductsBanner";
import HomeVideos from "./components/HomeVideos";
import FaqSection from "./components/FaqSection";
import { getEnrichedVideosList } from "./utils/videoMetrics";
import { parseUrlPath, getPathForPage, updateSeoMetadata, PageType } from "./utils/seoRouting";

import { ALL_VIDEOS } from "./data";
import { Video } from "./types";
import { Sparkles, MessageSquareCode, Calculator, Droplet, ArrowRight, Waves, CheckCircle, TrendingUp, HelpCircle, ShieldAlert, Award, Sprout, ShoppingBag, Briefcase, ChevronRight, Phone, Play, Star, ExternalLink, ShieldCheck, Home, Video as VideoIcon } from "lucide-react";

export default function App() {
  // Parse initial SEO URL path/hash on load
  const initialRoute = parseUrlPath(window.location.pathname + window.location.hash, ALL_VIDEOS);
  const [currentPage, setCurrentPage] = useState<PageType>(initialRoute.page);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(initialRoute.video);
  const [showCallModal, setShowCallModal] = useState<boolean>(false);

  // Quick Home Calculator states
  const [homeFeedWeight, setHomeFeedWeight] = useState<number>(10);
  const [homeFishGain, setHomeFishGain] = useState<number>(6.5);
  const [homeRadius, setHomeRadius] = useState<number>(3);
  const [homeDepth, setHomeDepth] = useState<number>(1.2);

  const calculatedFCR = homeFishGain > 0 ? (homeFeedWeight / homeFishGain).toFixed(2) : "0.00";
  const calculatedVolume = (Math.PI * Math.pow(homeRadius, 2) * homeDepth * 1000).toFixed(0);

  // Synchronize SEO URL, Document Title & Meta Tags on navigation
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateSeoMetadata(currentPage, selectedVideo);

      const targetPath = getPathForPage(currentPage, selectedVideo);
      const currentFull = window.location.pathname + (window.location.hash || "");

      if (currentFull !== targetPath && window.history) {
        try {
          if (window.location.hash) {
            // Clean up legacy hash URL (e.g. /#/aquaponics-farming -> /aquaponics-farming)
            window.history.replaceState(null, "", targetPath);
          } else {
            window.history.pushState(null, "", targetPath);
          }
        } catch (err) {
          // Ignore sandboxed iframe history restriction errors
        }
      }
    } catch (e) {
      // Ignore
    }
  }, [currentPage, selectedVideo]);

  // Support Browser Back/Forward navigation & Hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseUrlPath(window.location.pathname + window.location.hash, ALL_VIDEOS);
      setCurrentPage(route.page);
      setSelectedVideo(route.video);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const handlePageChange = (page: PageType) => {
    setSelectedVideo(null); // Clear video player when changing menu sections
    setCurrentPage(page);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleBackToGallery = () => {
    setSelectedVideo(null);
  };

  // Get other videos for recommendations, prioritizing same category
  const getRelatedVideos = (currentVideo: Video) => {
    const validVideos = ALL_VIDEOS.filter(
      (v) => (v.type === "own" || (v.creator || "").toLowerCase() === "modern fisheries") && v.id !== currentVideo.id
    );
    const sameCategory = validVideos.filter(
      (v) => v.category === currentVideo.category
    );
    if (sameCategory.length >= 6) {
      return sameCategory.slice(0, 6);
    }
    const otherCategories = validVideos.filter(
      (v) => v.category !== currentVideo.category
    );
    return [...sameCategory, ...otherCategories].slice(0, 6);
  };

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-800 flex flex-col font-sans selection:bg-green-100 selection:text-green-900 pb-16 md:pb-0 w-full max-w-full">
      
      {/* Sticky Navigation Header */}
      <Header currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Main Container Content */}
      <main className="flex-1 w-full max-w-full">
        {selectedVideo ? (
          // Video Player Page takes priority with responsive sticky sidebar placement
          <div className="w-full">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
              <div className="flex flex-col xl:flex-row gap-8 items-start">
                <div className="flex-1 min-w-0 space-y-6">
                  <VideoDetailView
                    video={selectedVideo}
                    relatedVideos={getRelatedVideos(selectedVideo)}
                    onBack={handleBackToGallery}
                    onSelectVideo={handleVideoSelect}
                  />
                  <AdBanner reloadKey={`video-${selectedVideo.id}`} />
                </div>
                <div className="hidden xl:block shrink-0">
                  <RightSidebarAd reloadKey={`video-sidebar-${selectedVideo.id}`} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Sub-pages routing engine
          <>
            {currentPage === "home" && (
              <div className="space-y-0 w-full">
                
                {/* 1. Immersive Modern Responsive Hero Banner */}
                <section id="hero-showcase" className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950 text-white overflow-hidden py-8 sm:py-12 border-b border-emerald-900/50">
                  {/* Subtle water texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-emerald-950/80 to-slate-950/90 z-0"></div>
                  <img 
                    src="banner.png" 
                    alt="Modern Fisheries Water Pond"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1600&q=80";
                    }}
                  />
                  
                  <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto space-y-4 text-center flex flex-col items-center justify-center">
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                        <span>Advanced Aquaculture Engineering & Solutions</span>
                      </div>

                      <div className="space-y-1.5">
                        <h1 className="font-serif italic font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                          Modern Fisheries
                        </h1>
                        <p className="text-yellow-300 font-sans font-extrabold text-xs sm:text-sm sm:text-base tracking-widest uppercase">
                          A modern way of farming
                        </p>
                      </div>

                      <p className="text-slate-300 font-sans text-xs sm:text-sm max-w-2xl leading-relaxed text-center mx-auto px-2">
                        Providing high-density biofloc tank setups, energy-efficient recirculating aquatic setups (RAS), expert consultation, and interactive calculation tools.
                      </p>

                      {/* Banner Action Buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                          onClick={() => setShowCallModal(true)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-sans font-extrabold text-xs sm:text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
                        >
                          <Phone className="w-4 h-4 text-white animate-bounce shrink-0" />
                          <span>Contact Desk (+919748952342)</span>
                        </button>
                        <button
                          onClick={() => handlePageChange("calculators")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
                        >
                          <Calculator className="w-4 h-4 text-yellow-300 shrink-0" />
                          <span>Calculators Lab</span>
                        </button>
                        <a
                          href="https://www.amazon.in/shop/trends0628/list/181W960PYPC2?tag=onamztrends06-21&ref_=aip_sf_list_spv_ons_mixed_d"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
                        >
                          <ShoppingBag className="w-4 h-4 text-amber-300 shrink-0" />
                          <span>Shopping</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70" />
                        </a>
                        <button
                          onClick={() => handlePageChange("videos")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-sans font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer shadow-md"
                        >
                          <VideoIcon className="w-4 h-4 text-white shrink-0" />
                          <span>Videos</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </section>

                {/* 2. Responsive Social Strip */}
                <div className="bg-slate-900 text-white py-2.5 px-4 border-b border-slate-800 shadow-sm w-full">
                  <div className="max-w-[1440px] mx-auto px-2 sm:px-4 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                    <span className="text-slate-400 text-[10px] sm:text-xs font-mono uppercase tracking-wider">
                      Trusted Aquaculture Knowledge & Innovation Network
                    </span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-slate-400 text-[10px] uppercase font-mono tracking-widest hidden sm:inline">Follow Us:</span>
                      <a href="https://www.youtube.com/channel/UChChDXzRMI9g1lgcTo5KA3A" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-red-600 rounded-full hover:bg-red-700 transition-all flex items-center justify-center hover:scale-105" title="Subscribe on YouTube">
                        <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                      <a href="https://www.facebook.com/modernfisheries/" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-[#1877F2] rounded-full hover:bg-blue-600 transition-all flex items-center justify-center hover:scale-105" title="Follow on Facebook">
                        <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. Top Advertisement Banner (Sticky under header on scroll) */}
                <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
                  <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-0.5">
                    <AdBanner reloadKey="home-top-ad" />
                  </div>
                </div>

                {/* Mobile Sliding Announcement (Not sticky - scrolls up naturally) */}
                <div className="lg:hidden max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-1">
                  <OwnCirclesAnnouncement mode="mobile" />
                </div>

                {/* Main Page Content Grid */}
                <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full min-w-0">
                    <div className="lg:col-span-8 xl:col-span-9 min-w-0 space-y-8 sm:space-y-12">
                      {/* Professional Dashboard Section */}
                      <ProfessionalDashboard
                        onVideoClick={handleVideoSelect}
                        onNavigate={handlePageChange}
                        trendingVideos={ALL_VIDEOS}
                      />

                      {/* Commercial Factory Direct Sales Banner Card */}
                      <CommercialProductsBanner />

                      {/* Home Videos Portal (Modern Fisheries Exclusive Videos + YouTube Best Ideas Pane) */}
                      <HomeVideos 
                        onVideoClick={handleVideoSelect}
                        onViewMore={() => handlePageChange("videos")}
                      />
                    </div>

                    <div className="hidden lg:block lg:col-span-4 xl:col-span-3 min-w-0 space-y-6 lg:sticky lg:top-20">
                      <RightSidebarAd reloadKey="home-sidebar" />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Subpages Navigation Router */}
            {currentPage === "ras" && <RasPage onVideoClick={handleVideoSelect} onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "biofloc" && <BioflocPage onVideoClick={handleVideoSelect} onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "aquaponics" && <AquaponicsPage onVideoClick={handleVideoSelect} onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "hydroponics" && <HydroponicsPage onVideoClick={handleVideoSelect} onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "pond" && <PondFarmingPage onVideoClick={handleVideoSelect} onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "diseases" && <DiseasesPage onVideoClick={handleVideoSelect} onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "feed" && <FeedingPage onVideoClick={handleVideoSelect} onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "calculators" && <CalculatorsPage onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "faq" && (
              <FaqSection onContactClick={() => setShowCallModal(true)} onBackToDashboard={() => setCurrentPage("home")} />
            )}
            {currentPage === "services" && <ServicesPage onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "about" && <AboutUsPage onBackToDashboard={() => setCurrentPage("home")} />}
            {currentPage === "privacy" && <PrivacyPolicyPage onBackToDashboard={() => setCurrentPage("home")} />}

            {currentPage === "videos" && (
              <VideosPage onVideoSelect={handleVideoSelect} onBackToDashboard={() => setCurrentPage("home")} />
            )}
          </>
        )}
      </main>

       {/* Modern Fisheries Call Modal/Popup */}
       {showCallModal && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
           <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-green-100 shadow-2xl space-y-4 animate-slide-in text-center">
             <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
               <Phone className="w-6 h-6 animate-pulse" />
             </div>
             <div className="space-y-1">
               <h3 className="font-sans font-black text-slate-900 text-base">Connect with Us</h3>
               <p className="text-slate-500 text-xs">Reach out to our seed supplying desk and technical consult team directly.</p>
             </div>
             
             <div className="space-y-3 pt-2 text-left text-xs text-slate-600">
               <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                 <span className="block font-bold text-slate-700 uppercase tracking-wider text-[9px] mb-1">WhatsApp Support (No call-link)</span>
                 <span className="font-mono font-black text-slate-900 text-base select-all">+919748952342</span>
               </div>
               
               <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                 <span className="block font-bold text-slate-700 uppercase tracking-wider text-[9px] mb-1">Email Helpline</span>
                 <a 
                   href="mailto:mf@owncircles.com"
                   className="font-mono font-black text-emerald-800 text-base hover:underline select-all block"
                   title="Click to open default mail client"
                 >
                   mf@owncircles.com
                 </a>
               </div>
             </div>

             <div className="text-[10px] text-slate-400 font-sans pt-1">
               Office Hours: Monday - Saturday (09:00 AM - 06:00 PM IST)
             </div>

             <button 
               onClick={() => setShowCallModal(false)}
               className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold font-sans transition-colors cursor-pointer"
             >
               Dismiss
             </button>
           </div>
         </div>
       )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mb-16 lg:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            {/* Logo and Copyright */}
            <div>
              <span className="font-sans font-black text-slate-900 tracking-tight text-base flex items-center gap-2">
                <Waves className="w-4 h-4 text-emerald-600" />
                <span>Modern Fisheries Solutions</span>
              </span>
              <p className="text-slate-400 text-xs mt-1">
                © {new Date().getFullYear()} Modern Fisheries. All rights reserved. Powered by modernfisheries.com.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-sans text-slate-500">
              <a href="/" onClick={(e) => { e.preventDefault(); handlePageChange("home"); }} className="hover:text-emerald-700 cursor-pointer">Home</a>
              <a href="/aquaponic" onClick={(e) => { e.preventDefault(); handlePageChange("ras"); }} className="hover:text-emerald-700 cursor-pointer">RAS</a>
              <a href="/bioflock" onClick={(e) => { e.preventDefault(); handlePageChange("biofloc"); }} className="hover:text-emerald-700 cursor-pointer">Biofloc</a>
              <a href="/aquaponics-farming" onClick={(e) => { e.preventDefault(); handlePageChange("aquaponics"); }} className="hover:text-emerald-700 cursor-pointer">Aquaponics</a>
              <a href="/hydroponic" onClick={(e) => { e.preventDefault(); handlePageChange("hydroponics"); }} className="hover:text-emerald-700 cursor-pointer">Hydroponics</a>
              <a href="/calculators" onClick={(e) => { e.preventDefault(); handlePageChange("calculators"); }} className="hover:text-emerald-700 cursor-pointer">Calculators</a>
              <a href="/ourservices" onClick={(e) => { e.preventDefault(); handlePageChange("services"); }} className="hover:text-emerald-700 cursor-pointer">Services</a>
              <a href="/about-us" onClick={(e) => { e.preventDefault(); handlePageChange("about"); }} className="hover:text-emerald-700 cursor-pointer">About Us</a>
              <a 
                href="https://www.amazon.in/shop/trends0628/list/181W960PYPC2?tag=onamztrends06-21&ref_=aip_sf_list_spv_ons_mixed_d" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-amber-700 font-bold text-amber-600 cursor-pointer"
              >
                Shopping
              </a>
              <a href="/farming-videos" onClick={(e) => { e.preventDefault(); handlePageChange("videos"); }} className="hover:text-red-700 font-bold text-red-600 cursor-pointer">Videos</a>
              <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); handlePageChange("privacy"); }} className="hover:text-emerald-700 cursor-pointer font-bold text-slate-700">Privacy Policy</a>
            </div>

          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Navigation Dock (1-thumb touch navigation on phones) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-xl px-2 py-1.5 flex items-center justify-around text-slate-600">
        <button
          onClick={() => handlePageChange("home")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
            currentPage === "home" ? "text-emerald-700 font-bold bg-emerald-50" : "hover:text-slate-900"
          }`}
        >
          <Home className="w-5 h-5 shrink-0" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handlePageChange("calculators")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
            currentPage === "calculators" ? "text-emerald-700 font-bold bg-emerald-50" : "hover:text-slate-900"
          }`}
        >
          <Calculator className="w-5 h-5 shrink-0" />
          <span className="text-[10px]">Calculators</span>
        </button>

        <button
          onClick={() => handlePageChange("ras")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
            currentPage === "ras" ? "text-emerald-700 font-bold bg-emerald-50" : "hover:text-slate-900"
          }`}
        >
          <Waves className="w-5 h-5 shrink-0" />
          <span className="text-[10px]">RAS</span>
        </button>

        <button
          onClick={() => handlePageChange("biofloc")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
            currentPage === "biofloc" ? "text-emerald-700 font-bold bg-emerald-50" : "hover:text-slate-900"
          }`}
        >
          <Sprout className="w-5 h-5 shrink-0" />
          <span className="text-[10px]">Biofloc</span>
        </button>

        <button
          onClick={() => setShowCallModal(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-emerald-800 bg-emerald-100 font-bold active:scale-95 transition-all"
        >
          <Phone className="w-5 h-5 shrink-0 text-emerald-700 animate-pulse" />
          <span className="text-[10px]">Call</span>
        </button>
      </nav>

      {/* Cookie Consent Banner */}
      <CookieConsentBanner onOpenPrivacyPolicy={() => handlePageChange("privacy")} />

    </div>
  );
}
