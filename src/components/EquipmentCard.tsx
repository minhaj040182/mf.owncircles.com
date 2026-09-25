import React, { useState } from "react";
import { 
  CheckCircle2, AlertTriangle, Zap, Wrench, ShieldAlert, 
  ArrowRight, ExternalLink, Calculator, BookOpen, ChevronDown, 
  ChevronUp, Sliders, Cpu, Sparkles, MessageCircle, Mail,
  Camera, Maximize2, X
} from "lucide-react";
import { EquipmentItem, SupplierItem } from "../types";
import { EQUIPMENT_CATEGORIES } from "../data/equipmentData";

interface EquipmentCardProps {
  key?: React.Key;
  equipment: EquipmentItem;
  farmVolumeM3: number;
  biomassKg: number;
  fishCount: number;
  onOpenCalculator?: (calcId: string) => void;
  onNavigateArticle?: (path: string) => void;
  onRequestQuote: (equipment: EquipmentItem) => void;
  relevantSuppliers?: SupplierItem[];
}

export default function EquipmentCard({
  equipment,
  farmVolumeM3,
  biomassKg,
  fishCount,
  onOpenCalculator,
  onNavigateArticle,
  onRequestQuote,
  relevantSuppliers = []
}: EquipmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Dynamic capacity calculation based on user's input
  const capacityResult = equipment.calculateRecommendedCapacity 
    ? equipment.calculateRecommendedCapacity(farmVolumeM3, biomassKg, fishCount)
    : null;

  const categoryMeta = EQUIPMENT_CATEGORIES.find((c) => c.id === equipment.category);

  return (
    <>
      <div 
        id={`eq-${equipment.slug}`}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
      >
        
        {/* Top Header Card */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/70 to-white">
          
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono uppercase bg-slate-100 text-slate-700 border border-slate-200">
                {categoryMeta?.name || equipment.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono uppercase ${
                equipment.importanceTier.includes("Essential") 
                  ? "bg-red-50 text-red-800 border border-red-200" 
                  : equipment.importanceTier.includes("Recommended")
                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}>
                {equipment.importanceTier}
              </span>
            </div>

            <span className="text-[11px] font-mono text-slate-400">
              ID: {equipment.slug}
            </span>
          </div>

          {/* Equipment Title & Tagline */}
          <h3 className="font-sans font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-snug">
            {equipment.name}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
            {equipment.tagline}
          </p>

          {/* Equipment Photographic Showcase */}
          {equipment.imageUrl && !imgError && (
            <div 
              onClick={() => setIsZoomOpen(true)}
              className="relative mt-4 mb-2 rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-950 group cursor-pointer shadow-xs transition-all hover:shadow-md"
              title="Click to view full-resolution equipment inspection photo"
            >
              <div className="w-full h-48 sm:h-64 relative overflow-hidden bg-slate-900">
                <img 
                  src={equipment.imageUrl} 
                  alt={`${equipment.name} - Commercial Aquaculture Machinery`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Photo Overlay Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono uppercase px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1 shadow-xs">
                  <Camera className="w-3 h-3 text-emerald-400" />
                  <span>Commercial Hardware</span>
                </span>
              </div>

              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Specification Verified</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 transition-all">
                  <Maximize2 className="w-3 h-3" />
                  <span>Enlarge Photo</span>
                </span>
              </div>
            </div>
          )}

          {/* Dynamic Sizing Recommendation Callout */}
        {capacityResult && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block">
                  Calculated Sizing for Your {farmVolumeM3} m³ Setup
                </span>
                <span className="text-xs sm:text-sm font-black font-sans text-emerald-950 block">
                  {capacityResult.specification} — <span className="font-semibold text-emerald-800">{capacityResult.unit}</span>
                </span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 sm:text-right max-w-xs font-sans">
              {capacityResult.rationale}
            </p>
          </div>
        )}
      </div>

      {/* Primary Educational Content */}
      <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        {/* Purpose & Why Required */}
        <div className="space-y-1.5">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Operational Function &amp; Biology</span>
          </h4>
          <p className="text-slate-600 text-xs leading-relaxed">
            {equipment.purpose}
          </p>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700 text-xs mt-2">
            <strong className="text-slate-900">Why Critical:</strong> {equipment.whyRequired}
          </div>
        </div>

        {/* Threshold Rule: When is it needed */}
        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-xl p-3 text-xs text-blue-950">
          <Sliders className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-[11px] font-mono uppercase tracking-wider text-blue-800">Deployment Threshold</strong>
            <span>{equipment.whenRequired}</span>
          </div>
        </div>

        {/* Expandable Technical Deep Dive (AdSense Educational Gold) */}
        {isExpanded && (
          <div className="space-y-4 pt-3 border-t border-slate-100 animate-fade-in">
            
            {/* Specification Guidance */}
            <div className="space-y-1">
              <strong className="text-slate-900 text-xs font-mono uppercase tracking-wider block">
                Technical Specification Benchmarks:
              </strong>
              <p className="text-slate-600 text-xs">
                {equipment.specificationGuidance}
              </p>
            </div>

            {/* Power & Duty Considerations */}
            <div className="flex items-start gap-2 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950">
              <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[11px] font-mono uppercase tracking-wider text-amber-800">Power &amp; Continuous Duty Consideration</strong>
                <span>{equipment.powerConsiderations}</span>
              </div>
            </div>

            {/* Maintenance Checklist */}
            <div className="space-y-1.5">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 text-slate-800">
                <Wrench className="w-3.5 h-3.5 text-slate-500" />
                <span>Preventative Maintenance Protocol</span>
              </h5>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                {equipment.maintenanceGuidance.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>

            {/* Common Buying Mistakes to Avoid */}
            <div className="bg-red-50/60 border border-red-200/70 rounded-xl p-3 text-xs text-red-950 space-y-1.5">
              <div className="flex items-center gap-1.5 text-red-800 font-bold font-mono text-[11px] uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                <span>Common Buying Mistakes to Avoid</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-red-900 text-xs">
                {equipment.commonMistakes.map((mistake, idx) => (
                  <li key={idx}>{mistake}</li>
                ))}
              </ul>
            </div>

            {/* Buyer Checklist */}
            <div className="space-y-1.5">
              <strong className="text-slate-900 text-xs font-mono uppercase tracking-wider block">
                Procurement Checklist:
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {equipment.buyingChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Calculator & Editorial Blueprint */}
            {(equipment.relatedCalculatorId || equipment.relatedArticlePath) && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {equipment.relatedCalculatorId && onOpenCalculator && (
                  <button
                    onClick={() => onOpenCalculator(equipment.relatedCalculatorId!)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-900 border border-yellow-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5 text-yellow-700" />
                    <span>Open Related Calculator</span>
                  </button>
                )}

                {equipment.relatedArticlePath && onNavigateArticle && (
                  <button
                    onClick={() => onNavigateArticle(equipment.relatedArticlePath!)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                    <span>{equipment.relatedArticleTitle || "Read Research Guide"}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                )}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Footer Actions & Supplier Drawer */}
      <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Toggle Expand Specs */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <span>{isExpanded ? "Collapse Specs & Checklist" : "View Full Specifications & Maintenance"}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Action Buttons: Direct WhatsApp & Email Inquiry */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href={`https://wa.me/919748952342?text=${encodeURIComponent(`Hello Modern Fisheries, I am inquiring about the technical specifications, sizing, and pricing for: ${equipment.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            title="Instant WhatsApp Inquiry to +91 97489 52342"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp Inquiry</span>
          </a>

          <button
            type="button"
            onClick={() => onRequestQuote(equipment)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold font-sans transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-teal-300" />
            <span>Send Email Inquiry</span>
          </button>
        </div>
      </div>
    </div>

    {/* Lightbox / Zoom Modal for Equipment Photo */}
    {isZoomOpen && equipment.imageUrl && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
        onClick={() => setIsZoomOpen(false)}
      >
        <div 
          className="relative max-w-4xl w-full bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 bg-slate-900/90 text-white">
            <div className="flex items-center gap-3 min-w-0">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {equipment.category.toUpperCase()}
              </span>
              <h4 className="font-bold text-sm sm:text-base text-white truncate">
                {equipment.name}
              </h4>
            </div>
            <button 
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
              title="Close Photo Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Image Body */}
          <div className="relative bg-slate-950 flex items-center justify-center p-2 sm:p-4 max-h-[72vh] overflow-hidden">
            <img 
              src={equipment.imageUrl} 
              alt={`${equipment.name} - Commercial Aquaculture Equipment`}
              className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
            />
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-300 text-xs">
            <div className="space-y-1">
              <p className="font-semibold text-white">
                {equipment.tagline}
              </p>
              <p className="text-[11px] text-slate-400">
                High-efficiency commercial specification verified for aquaculture bio-engineering standards.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://wa.me/919748952342?text=${encodeURIComponent(`Hello Modern Fisheries, I am inquiring about the technical specifications, sizing, and pricing for: ${equipment.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white" />
                <span>Inquire on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsZoomOpen(false);
                  onRequestQuote(equipment);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-teal-300" />
                <span>Request Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
}
