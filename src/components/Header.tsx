import React, { useState, useEffect, useRef } from "react";
import { Fish, Video, Calculator, Droplet, Home, Info, Phone, Menu, X, ExternalLink, Sparkles, Sprout, Waves, HeartPulse, Layers, ShoppingBag, ZoomIn, ZoomOut, Type, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import LanguageTranslator from "./LanguageTranslator";
import logoUrl from "../logo1.png";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: "home" | "ras" | "biofloc" | "aquaponics" | "hydroponics" | "pond" | "diseases" | "feed" | "calculators" | "services" | "about" | "privacy" | "videos" | "faq") => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    // Re-check after layout/render
    const timer = setTimeout(checkScroll, 200);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScrollLeft = () => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  // Font size scale state (in percent: 85%, 92.5%, 100%, 110%, 120%, 130%)
  const [fontLevel, setFontLevel] = useState<number>(100);

  useEffect(() => {
    try {
      const parsed = parseFloat(localStorage.getItem("mf_font_size_percent") || "100");
      if (!isNaN(parsed) && parsed >= 80 && parsed <= 140) setFontLevel(parsed);
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.style.fontSize = `${fontLevel}%`;
      localStorage.setItem("mf_font_size_percent", fontLevel.toString());
    } catch (e) {
      // Ignore
    }
  }, [fontLevel]);

  const increaseFontSize = () => {
    setFontLevel((prev) => Math.min(130, Math.round((prev + 7.5) * 10) / 10));
  };

  const decreaseFontSize = () => {
    setFontLevel((prev) => Math.max(85, Math.round((prev - 7.5) * 10) / 10));
  };

  const resetFontSize = () => {
    setFontLevel(100);
  };

  const handleNavClick = (page: any) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "ras", label: "RAS Aqua", icon: Layers },
    { id: "biofloc", label: "Biofloc", icon: Waves },
    { id: "aquaponics", label: "Aquaponics", icon: Sprout },
    { id: "hydroponics", label: "Hydroponics", icon: Droplet },
    { id: "pond", label: "Pond Farming", icon: Fish },
    { id: "diseases", label: "Fish Diseases", icon: HeartPulse },
    { id: "feed", label: "Feed & Sizing", icon: Calculator },
    { id: "calculators", label: "Calculators", icon: Calculator },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "services", label: "Our Services", icon: Info },
    { id: "about", label: "About Us", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-[100] bg-[#1877F2] text-white border-b border-blue-500 shadow-md w-full">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Title Bar: Brand Logo on Left, Action Controls on Right */}
        <div className="flex justify-between items-center h-14 sm:h-16 gap-2">
          
          {/* Brand Logo */}
          <a
            id="brand-logo"
            href="/"
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <img 
                src={logoUrl}
                alt="Modern Fisheries logo - Certified fish feed supplier and turnkey RAS aquaculture consultancy in India" 
                className="w-full h-full object-contain rounded-full border border-white/20 bg-white" 
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = document.getElementById("header-fallback-logo");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div 
                id="header-fallback-logo" 
                className="hidden p-1 bg-white text-[#1877F2] rounded-full shadow-inner flex items-center justify-center"
              >
                <Fish className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="font-sans font-black text-base sm:text-lg tracking-tight text-white leading-none block">
                Modern Fisheries
              </span>
              <span className="block text-[8px] sm:text-[9.5px] font-mono tracking-wider text-blue-100 uppercase font-bold mt-0.5">
                Fish & Seeds Supplier
              </span>
            </div>
          </a>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Language Translator Component */}
            <LanguageTranslator />

            {/* Font Size Adjuster Control */}
            <div className="flex items-center bg-white/10 hover:bg-white/15 border border-white/25 rounded-xl p-0.5 text-white shadow-xs backdrop-blur-xs transition-all" title="Adjust Website Text Size">
              <button
                type="button"
                onClick={decreaseFontSize}
                disabled={fontLevel <= 85}
                className="px-1.5 sm:px-2 py-1 hover:bg-white/20 disabled:opacity-35 disabled:hover:bg-transparent rounded-lg font-black text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-0.5"
                title="Decrease Text Size (A-)"
                aria-label="Decrease Font Size"
              >
                <ZoomOut className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline font-bold">A-</span>
              </button>

              <button
                type="button"
                onClick={resetFontSize}
                className={`px-1.5 sm:px-2 py-1 rounded-lg font-mono font-black text-[10px] sm:text-[11px] transition-all cursor-pointer ${
                  fontLevel === 100 
                    ? "bg-white text-[#1877F2] shadow-xs" 
                    : "hover:bg-white/20 text-blue-100"
                }`}
                title="Reset Text Size to Standard (100%)"
                aria-label="Reset Font Size"
              >
                <span>{fontLevel}%</span>
              </button>

              <button
                type="button"
                onClick={increaseFontSize}
                disabled={fontLevel >= 130}
                className="px-1.5 sm:px-2 py-1 hover:bg-white/20 disabled:opacity-35 disabled:hover:bg-transparent rounded-lg font-black text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-0.5"
                title="Increase Text Size (A+)"
                aria-label="Increase Font Size"
              >
                <span className="hidden sm:inline font-bold">A+</span>
                <ZoomIn className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 active:bg-white/20 rounded-xl transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Navigation Menu Bar placed directly below the Title row with Left & Right Slide Controls */}
        <div className="py-2 border-t border-blue-400/30 flex items-center gap-1 sm:gap-1.5">
          {/* Left Slide Button */}
          <button
            id="header-nav-scroll-left"
            type="button"
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            className={`p-1.5 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all cursor-pointer shrink-0 flex items-center justify-center ${
              !canScrollLeft ? "opacity-30 cursor-not-allowed pointer-events-none" : "opacity-100 shadow-xs"
            }`}
            title="Slide Left"
            aria-label="Slide Menu Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable Navigation Container */}
          <div
            ref={navScrollRef}
            onScroll={checkScroll}
            className="overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex items-center gap-1.5 sm:gap-2 text-xs scroll-smooth flex-1 min-w-0 py-0.5"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const pathMap: Record<string, string> = {
                home: "/",
                ras: "/ras-farming",
                biofloc: "/bioflock",
                aquaponics: "/aquaponics-farming",
                hydroponics: "/hydroponic",
                pond: "/pond-farming",
                diseases: "/fish-diseases",
                feed: "/feeding-management",
                calculators: "/calculators",
                faq: "/faq",
                services: "/services",
                about: "/about-us",
                privacy: "/privacy-policy",
                videos: "/videos",
              };
              const hrefPath = pathMap[item.id] || "/";
              return (
                <a
                  key={item.id}
                  href={hrefPath}
                  className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-sans text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    currentPage === item.id 
                      ? "bg-white text-[#1877F2] shadow-xs" 
                      : "bg-white/10 text-blue-50 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Slide Button */}
          <button
            id="header-nav-scroll-right"
            type="button"
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            className={`p-1.5 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all cursor-pointer shrink-0 flex items-center justify-center ${
              !canScrollRight ? "opacity-30 cursor-not-allowed pointer-events-none" : "opacity-100 shadow-xs"
            }`}
            title="Slide Right"
            aria-label="Slide Menu Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Overlay Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-500 bg-[#1877F2] shadow-2xl py-3 px-4 space-y-2 max-h-[80vh] overflow-y-auto">
          {/* Mobile Controls Row: Language & Text Zoom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-blue-600/60 border border-blue-400/40 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-inner">
              <span className="text-xs text-white font-bold">Language:</span>
              <LanguageTranslator />
            </div>

            <div className="bg-blue-600/60 border border-blue-400/40 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-inner">
              <div className="flex items-center gap-1.5 text-xs text-white font-bold">
                <Type className="w-4 h-4 text-blue-200 shrink-0" />
                <span>Text Zoom:</span>
              </div>
              <div className="flex items-center bg-white/10 border border-white/20 rounded-xl p-0.5 text-xs text-white">
                <button
                  type="button"
                  onClick={decreaseFontSize}
                  disabled={fontLevel <= 85}
                  className="px-2.5 py-1 hover:bg-white/20 disabled:opacity-35 rounded-lg font-black text-xs cursor-pointer flex items-center gap-1"
                  title="Decrease Font Size"
                >
                  <ZoomOut className="w-3 h-3" />
                  <span>A-</span>
                </button>
                <button
                  type="button"
                  onClick={resetFontSize}
                  className={`px-2.5 py-1 rounded-lg font-mono font-black text-xs cursor-pointer ${
                    fontLevel === 100 ? "bg-white text-[#1877F2]" : "hover:bg-white/20 text-blue-100"
                  }`}
                  title="Reset Font Size"
                >
                  {fontLevel}%
                </button>
                <button
                  type="button"
                  onClick={increaseFontSize}
                  disabled={fontLevel >= 130}
                  className="px-2.5 py-1 hover:bg-white/20 disabled:opacity-35 rounded-lg font-black text-xs cursor-pointer flex items-center gap-1"
                  title="Increase Font Size"
                >
                  <span>A+</span>
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-[10px] uppercase font-bold text-blue-200 tracking-wider px-2 pt-1">
            Aquaculture Modules & Pages
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const pathMap: Record<string, string> = {
                home: "/",
                ras: "/ras-farming",
                biofloc: "/bioflock",
                aquaponics: "/aquaponics-farming",
                hydroponics: "/hydroponic",
                pond: "/pond-farming",
                diseases: "/fish-diseases",
                feed: "/feeding-management",
                calculators: "/calculators",
                faq: "/faq",
                services: "/services",
                about: "/about-us",
                privacy: "/privacy-policy",
                videos: "/videos",
              };
              const hrefPath = pathMap[item.id] || "/";
              return (
                <a
                  key={`drawer-${item.id}`}
                  href={hrefPath}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentPage === item.id 
                      ? "bg-white text-[#1877F2]" 
                      : "text-blue-50 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
