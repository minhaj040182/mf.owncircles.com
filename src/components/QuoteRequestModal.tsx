import React, { useState } from "react";
import { X, CheckCircle2, Send, ShieldCheck, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";
import { FarmingSystemId, QuoteRequestInquiry } from "../types";
import { FARMING_SYSTEMS } from "../data/equipmentData";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEquipmentSlug?: string;
  initialEquipmentName?: string;
  supplierName?: string;
  farmingSystem?: FarmingSystemId;
  farmVolumeM3?: number;
}

const OFFICIAL_PHONE = "+91 97489 52342";
const OFFICIAL_PHONE_CLEAN = "919748952342";
const OFFICIAL_EMAIL = "mf@owncircles.com";

export default function QuoteRequestModal({
  isOpen,
  onClose,
  initialEquipmentSlug,
  initialEquipmentName,
  supplierName,
  farmingSystem = "biofloc",
  farmVolumeM3 = 50
}: QuoteRequestModalProps) {
  const [farmerName, setFarmerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("West Bengal");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState("");

  if (!isOpen) return null;

  const systemName = FARMING_SYSTEMS.find((s) => s.id === farmingSystem)?.name || farmingSystem;
  const eqTarget = initialEquipmentName || "General Aquaculture Machinery";

  const buildInquiryMessage = () => {
    let msg = `*Aquaculture Equipment Inquiry - Modern Fisheries*\n`;
    msg += `------------------------------------\n`;
    msg += `• *Equipment:* ${eqTarget}\n`;
    msg += `• *Farming System:* ${systemName}\n`;
    if (farmVolumeM3) {
      msg += `• *Water Volume:* ${farmVolumeM3} m³ (~${(farmVolumeM3 * 1000).toLocaleString()} Litres)\n`;
    }
    msg += `• *Farmer/Enterprise:* ${farmerName.trim() || "Interested Farmer"}\n`;
    msg += `• *Phone:* ${phone.trim() || "Provided on request"}\n`;
    if (email.trim()) msg += `• *Email:* ${email.trim()}\n`;
    msg += `• *Location:* ${city.trim() ? `${city.trim()}, ` : ""}${state}, India\n`;
    if (notes.trim()) {
      msg += `• *Requirements / Sizing Questions:*\n${notes.trim()}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `Please provide technical specification benchmarks, pricing, and freight delivery timeline.`;
    return msg;
  };

  const getWhatsAppUrl = () => {
    return `https://wa.me/${OFFICIAL_PHONE_CLEAN}?text=${encodeURIComponent(buildInquiryMessage())}`;
  };

  const getEmailUrl = () => {
    const subject = `Equipment Inquiry: ${eqTarget} (${systemName}) - ${state}`;
    return `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildInquiryMessage())}`;
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    recordSubmission();
    window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  const handleSendViaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    recordSubmission();
    window.location.href = getEmailUrl();
  };

  const recordSubmission = () => {
    const newId = `INQ-${Date.now().toString().slice(-6)}`;
    const inquiry: QuoteRequestInquiry = {
      id: newId,
      timestamp: new Date().toISOString(),
      farmerName: farmerName.trim() || "Farmer",
      phone: phone.trim() || "Direct Contact",
      email: email.trim(),
      state,
      city: city.trim() || "Local",
      farmingSystem,
      equipmentSlugs: initialEquipmentSlug ? [initialEquipmentSlug] : [],
      notes: notes.trim(),
      farmVolumeM3
    };

    try {
      const stored = localStorage.getItem("mf_equipment_inquiries");
      const list = stored ? JSON.parse(stored) : [];
      list.push(inquiry);
      localStorage.setItem("mf_equipment_inquiries", JSON.stringify(list));
    } catch (err) {
      // Ignore localStorage errors
    }

    setInquiryId(newId);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFarmerName("");
    setPhone("");
    setEmail("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-fade-in">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Modern Fisheries Inquiry Desk</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black font-sans text-white">
            Send Equipment &amp; Sizing Inquiry
          </h3>

          <p className="text-slate-300 text-xs mt-1">
            Target Equipment: <strong className="text-white">{eqTarget}</strong>
          </p>
        </div>

        {/* Quick Instant Channels Strip */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-600">Quick Connect:</span>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${OFFICIAL_PHONE_CLEAN}?text=${encodeURIComponent(`Hello Modern Fisheries, I am inquiring regarding ${eqTarget}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(`Inquiry for ${eqTarget}`)}`}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-teal-300" />
              <span>Email Direct</span>
            </a>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg font-black text-slate-900">Inquiry Ready to Dispatch</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Reference: <strong className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{inquiryId}</strong>
                </p>
                <p className="text-xs text-slate-600 max-w-sm mx-auto pt-1">
                  Choose how you would like to send your inquiry directly to the Modern Fisheries Engineering Desk:
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 97489 52342)</span>
                </a>

                <a
                  href={getEmailUrl()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  <Mail className="w-4 h-4 text-teal-300" />
                  <span>Send via Email ({OFFICIAL_EMAIL})</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name / Farm Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Patel"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. farmer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State / Region
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Assam">Assam</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Other">Other Indian State</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City / District / Pin Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vijayawada, Burdwan, Surat"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>

              {/* Technical Specifications Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Selected System:</span>
                  <span className="text-emerald-800 uppercase font-bold">{systemName}</span>
                </div>
                {farmVolumeM3 && (
                  <div className="flex justify-between">
                    <span>Target Farm Volume:</span>
                    <span className="font-mono text-slate-800 font-bold">{farmVolumeM3} m³ (~{(farmVolumeM3 * 1000).toLocaleString()} Litres)</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Requirements or Motor Phase Details
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need single-phase 220V blower, delivery estimate to our farm district, or quotation for complete aeration manifold..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>

              <div className="text-[10px] text-slate-500 flex items-start gap-1.5 pt-1">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Modern Fisheries provides non-commercial peer engineering guidance. We connect inquiries directly with certified aquaculture manufacturers and precision fabricators across India.
                </span>
              </div>

              {/* Two Direct Action Send Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-sans shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaEmail}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold font-sans shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-teal-300" />
                  <span>Send via Email</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
