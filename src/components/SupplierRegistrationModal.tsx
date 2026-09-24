import React, { useState } from "react";
import { X, CheckCircle2, Building2, ShieldAlert } from "lucide-react";
import { EquipmentCategory } from "../types";
import { EQUIPMENT_CATEGORIES } from "../data/equipmentData";
import { INDIAN_STATES } from "../data/supplierData";

interface SupplierRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupplierRegistrationModal({ isOpen, onClose }: SupplierRegistrationModalProps) {
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("Andhra Pradesh");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<EquipmentCategory[]>(["aeration"]);
  const [panIndia, setPanIndia] = useState(true);
  const [yearEstablished, setYearEstablished] = useState("2018");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleCategory = (cat: EquipmentCategory) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !phone.trim()) return;

    const registration = {
      id: `SUP-APP-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      businessName: businessName.trim(),
      contactPerson: contactPerson.trim(),
      phone: phone.trim(),
      email: email.trim(),
      state,
      city: city.trim(),
      address: address.trim(),
      equipmentCategories: selectedCategories,
      panIndiaDelivery: panIndia,
      yearEstablished: parseInt(yearEstablished, 10) || 2020,
      verificationStatus: "Pending Review" // Moderated workflow
    };

    try {
      const stored = localStorage.getItem("mf_supplier_applications");
      const list = stored ? JSON.parse(stored) : [];
      list.push(registration);
      localStorage.setItem("mf_supplier_applications", JSON.stringify(list));
    } catch (err) {
      // Ignore localStorage errors
    }

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-fade-in">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Supplier Editorial Verification Portal</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black font-sans text-white">
            Register as an Aquaculture Equipment Supplier
          </h3>

          <p className="text-slate-300 text-xs mt-1">
            Modern Fisheries connects verified manufacturers and distributors with commercial aquaculture farmers across India. Free registration under editorial quality standards.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg font-black text-slate-900">Application Submitted for Editorial Audit</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your supplier profile has been placed into <strong className="text-blue-700 font-bold">Pending Review</strong>.
                </p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto pt-2">
                  Our technical editorial team verifies GST registration, product specifications, and physical address before public listing to prevent low-value or spam submissions.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-sans transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Enterprise Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Aquaculture Machinery Pvt Ltd"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar (Sales Director)"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 94330 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sales@apexmachinery.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                  >
                    {INDIAN_STATES.filter((s) => s !== "All States (Pan-India)").map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vijayawada, Surat, Ludhiana"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Factory / Office Physical Address
                </label>
                <input
                  type="text"
                  placeholder="Plot No., Industrial Area, Road, Pin Code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>

              {/* Categories Supplied */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Equipment Categories Supplied (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {EQUIPMENT_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`text-left px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                          isSelected 
                            ? "bg-blue-50 border-blue-500 text-blue-900 font-bold" 
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="panIndiaCheck"
                  checked={panIndia}
                  onChange={(e) => setPanIndia(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="panIndiaCheck" className="text-xs text-slate-700 font-semibold cursor-pointer">
                  Our company provides Pan-India road / logistics transport delivery
                </label>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-800 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>AdSense Editorial Integrity Notice:</strong> Modern Fisheries maintains a strict no-pay-for-rank policy. Supplier ranking is purely determined by proximity to the farmer and technical relevance.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-sans shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Submit for Editorial Verification
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
