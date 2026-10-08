import React, { useState } from "react";
import {
  MessageSquare,
  Phone,
  MessageCircle,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Trash2,
} from "lucide-react";

export interface EnquiryItem {
  id: number;
  sender_name: string;
  sender_phone: string;
  receiver_phone: string;
  type: string;
  item_id?: number | null;
  item_title?: string;
  offered_price?: number | null;
  quantity?: string;
  message?: string;
  status: string;
  created_at: string;
}

interface InquiriesViewProps {
  enquiries: EnquiryItem[];
  currentPhone: string;
  onRefresh: () => void;
}

export default function InquiriesView({
  enquiries,
  currentPhone,
  onRefresh,
}: InquiriesViewProps) {
  const [filter, setFilter] = useState<"all" | "received" | "sent">("all");

  const normalizedPhone = (currentPhone || "").replace(/\D/g, "");

  const filtered = enquiries.filter((enq) => {
    const sPhone = (enq.sender_phone || "").replace(/\D/g, "");
    const rPhone = (enq.receiver_phone || "").replace(/\D/g, "");

    const isReceived = rPhone.endsWith(normalizedPhone) || normalizedPhone.endsWith(rPhone);
    const isSent = sPhone.endsWith(normalizedPhone) || normalizedPhone.endsWith(sPhone);

    if (filter === "received") return isReceived;
    if (filter === "sent") return isSent;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Buyer Inquiries &amp; Buy Leads</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            TradeIndia-style quotation and lead management. Reply instantly via WhatsApp or Direct Call.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Leads ({enquiries.length})
          </button>
          <button
            onClick={() => setFilter("received")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === "received" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Received
          </button>
          <button
            onClick={() => setFilter("sent")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === "sent" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sent
          </button>
        </div>
      </div>

      {/* Leads List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Inquiries Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When buyers or local farmers send offers on your ready harvests or product catalogue, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((enq) => {
            const isReceived = (enq.receiver_phone || "").includes(normalizedPhone.slice(-8));
            return (
              <div
                key={enq.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                        isReceived
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {isReceived ? (
                        <>
                          <ArrowDownLeft className="w-3 h-3 text-emerald-600" />
                          Lead Received
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="w-3 h-3 text-blue-600" />
                          Quote Sent
                        </>
                      )}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {new Date(enq.created_at).toLocaleString()}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-600">
                    Status: <strong className="text-slate-900">{enq.status}</strong>
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-900">
                    {enq.item_title || (enq.type === "harvest_offer" ? "Fish Harvest Inquiry" : "Catalogue Product Inquiry")}
                  </h4>
                  <p className="text-xs text-slate-600">
                    Contact: <strong className="text-slate-800">{enq.sender_name}</strong> (📞 {enq.sender_phone})
                  </p>
                  {enq.message && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 italic">
                      "{enq.message}"
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/80">
                  <div className="flex items-center gap-3 text-xs">
                    {enq.quantity && (
                      <span>
                        Qty: <strong>{enq.quantity}</strong>
                      </span>
                    )}
                    {enq.offered_price && (
                      <span className="text-emerald-700 font-black">
                        Offered Rate: ₹{enq.offered_price}
                      </span>
                    )}
                  </div>

                  {/* Quick Action buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${enq.sender_phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Hello ${enq.sender_name}, responding regarding your inquiry for ${enq.item_title || "ModernFisheries"}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${enq.sender_phone}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
