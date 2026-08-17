import React, { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

interface LanguageTranslatorProps {
  className?: string;
}

const LANGUAGE_INFO: Record<string, { name: string; flag: string; code: string }> = {
  en: { name: "English", flag: "🇺🇸", code: "EN" },
  bn: { name: "বাংলা", flag: "🇮🇳", code: "BN" },
  hi: { name: "हिन्दी", flag: "🇮🇳", code: "HI" },
  es: { name: "Español", flag: "🇪🇸", code: "ES" },
  fr: { name: "Français", flag: "🇫🇷", code: "FR" },
  ar: { name: "العربية", flag: "🇸🇦", code: "AR" },
  vi: { name: "Tiếng Việt", flag: "🇻🇳", code: "VI" },
  id: { name: "Indonesian", flag: "🇮🇩", code: "ID" },
  th: { name: "ไทย", flag: "🇹🇭", code: "TH" },
  "zh-CN": { name: "中文", flag: "🇨🇳", code: "ZH" },
  pt: { name: "Português", flag: "🇵🇹", code: "PT" },
  de: { name: "Deutsch", flag: "DE", code: "DE" },
};

export default function LanguageTranslator({ className = "" }: LanguageTranslatorProps) {
  const [selectedLang, setSelectedLang] = useState<string>("en");

  // Helper to trigger translation on Google Translate select element without setting redirecting cookies
  const applyTranslation = (langCode: string) => {
    try {
      const selectElem = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      const targetVal = langCode === "en" ? "" : langCode;

      if (selectElem) {
        if (selectElem.value !== targetVal) {
          selectElem.value = targetVal;
          selectElem.dispatchEvent(new Event("change", { bubbles: true }));
          selectElem.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    } catch (e) {
      // Ignore
    }
  };

  // Clean up any redirecting googtrans cookie on mount to prevent reload loops
  useEffect(() => {
    try {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
    } catch (e) {}
  }, []);

  // Listen for changes on the Google Translate combo element
  useEffect(() => {
    const handleComboChange = (e: Event) => {
      const target = e.target as HTMLSelectElement;
      if (target && target.classList.contains("goog-te-combo")) {
        const val = target.value;
        const newLang = val || "en";
        setSelectedLang(newLang);
      }
    };

    document.addEventListener("change", handleComboChange);
    return () => document.removeEventListener("change", handleComboChange);
  }, []);

  // Initialize Google Translate script safely
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,bn,hi,es,fr,ar,vi,id,th,zh-CN,pt,de",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        } catch (e) {
          // Ignore
        }
      }
    };

    // Load Google Translate script if not present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        // Silently handle offline/blocked errors
      };
      document.body.appendChild(script);
    }
  }, []);

  // Close translator and reset back to original language (English)
  const resetTranslation = () => {
    setSelectedLang("en");
    try {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (e) {}

    applyTranslation("en");
  };

  const currentLang = LANGUAGE_INFO[selectedLang] || LANGUAGE_INFO["en"];

  return (
    <div className={`inline-flex items-center gap-2 bg-slate-900/70 hover:bg-slate-900/90 border border-slate-700/70 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-sm transition-all ${className}`}>
      {/* Language Selector Pill */}
      <div className="relative flex items-center gap-1.5 cursor-pointer">
        {/* Flag + Code + Dropdown Arrow */}
        <div className="flex items-center gap-1 text-slate-100 font-bold text-xs shrink-0 select-none pointer-events-none">
          <span className="text-sm leading-none">{currentLang.flag}</span>
          <span className="text-[11px] font-bold text-slate-200 tracking-wide">{currentLang.code}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Invisible Google Translate Select Overlay */}
        <div
          id="google_translate_element"
          className="absolute inset-0 opacity-0 z-10 cursor-pointer [&_select]:w-full [&_select]:h-full [&_select]:cursor-pointer [&_select]:opacity-0"
        />
      </div>

      {/* Close Translator Button (visible when a translation is active) */}
      {selectedLang !== "en" && (
        <button
          type="button"
          onClick={resetTranslation}
          className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
          title="Close Translator & Restore Original English"
          aria-label="Close Translator"
        >
          <X className="w-3.5 h-3.5" />
          <span className="text-[10px]">Close</span>
        </button>
      )}
    </div>
  );
}
