import React, { useState } from "react";
import { 
  Building2, MapPin, CheckCircle2, ShieldCheck, 
  Truck, Phone, Mail, Globe, ArrowRight, ExternalLink, Info 
} from "lucide-react";
import { SupplierItem } from "../types";
import { EQUIPMENT_CATEGORIES } from "../data/equipmentData";

interface SupplierCardProps {
  key?: React.Key;
  supplier: SupplierItem;
  onRequestQuote: (supplier: SupplierItem) => void;
}

export default function SupplierCard({ supplier, onRequestQuote }: SupplierCardProps) {
  const [showFullDetails, setShowFullDetails] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col justify-between group">
      <div>
        {/* Header: Title and Verification Badge */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <h4 className="font-sans font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-800 transition-colors line-clamp-1">
              {supplier.businessName}
            </h4>
            <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{supplier.city}, {supplier.state}</span>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Verified</span>
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3">
          {supplier.description}
        </p>

        {/* Categories Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {supplier.equipmentCategories.map((catId) => {
            const cat = EQUIPMENT_CATEGORIES.find((c) => c.id === catId);
            return (
              <span 
                key={catId}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200/60"
              >
                {cat?.shortName || catId}
              </span>
            );
          })}
        </div>

        {/* Delivery Scope */}
        <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100 mb-4">
          <Truck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate">
            Delivery: <strong className="text-slate-800 font-semibold">{supplier.serviceArea}</strong>
          </span>
          {supplier.panIndiaDelivery && (
            <span className="ml-auto text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded shrink-0">
              PAN-INDIA
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => setShowFullDetails(!showFullDetails)}
          className="text-xs text-slate-500 hover:text-slate-800 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showFullDetails ? "Hide Info" : "Details"}</span>
        </button>

        <button
          onClick={() => onRequestQuote(supplier)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-sans transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <span>Request Info / Specs</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Expanded Details Panel */}
      {showFullDetails && (
        <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-600 space-y-2 animate-fade-in bg-slate-50/70 p-3 rounded-xl">
          <div className="flex items-start gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-700 block">Address:</span>
              <span>{supplier.address}, PIN: {supplier.pinCode}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{supplier.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{supplier.email}</span>
          </div>
          <div className="text-[10px] text-slate-400 pt-1">
            Established in {supplier.yearEstablished} • Editorial Quality Audit Passed
          </div>
        </div>
      )}
    </div>
  );
}
