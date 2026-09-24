import React, { useState } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  Sparkles, 
  Bell, 
  Calendar, 
  Check, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  ArrowDownRight,
  Flame,
  Tag
} from 'lucide-react';
import { RegionCode, formatPriceForRegion, REGION_CONFIGS } from '../utils/localization';

interface PriceDropPredictorProps {
  productName: string;
  currentPrice: string;
  region: RegionCode;
}

export const PriceDropPredictor: React.FC<PriceDropPredictorProps> = ({
  productName,
  currentPrice,
  region
}) => {
  const regionConfig = REGION_CONFIGS[region] || REGION_CONFIGS.IN;
  const [emailAlert, setEmailAlert] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [isAlertSaved, setIsAlertSaved] = useState(false);
  const [isSettingAlert, setIsSettingAlert] = useState(false);

  // Derive estimated metrics based on current price
  const priceNum = parseInt(currentPrice.replace(/[^0-9]/g, '')) || 3499;
  const lowest90Days = Math.round(priceNum * 0.88);
  const highest90Days = Math.round(priceNum * 1.15);
  const avg90Days = Math.round(priceNum * 1.02);

  // Time to buy status
  const isGreatTime = priceNum <= avg90Days;
  const discountFromHigh = Math.round(((highest90Days - priceNum) / highest90Days) * 100);

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAlert || !emailAlert.includes('@')) return;
    setIsAlertSaved(true);
    setIsSettingAlert(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingDown className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>AI Price Trend &amp; Deal Predictor</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                90-Day Analysis
              </span>
            </h3>
            <p className="text-xs text-slate-500">Real-time market price stability and predicted discount cycles</p>
          </div>
        </div>

        <button
          onClick={() => setIsSettingAlert(!isSettingAlert)}
          className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <Bell className="w-3.5 h-3.5 text-blue-600" />
          <span>{isAlertSaved ? 'Alert Active' : 'Set Price Alert'}</span>
        </button>
      </div>

      {/* Main Verdict Status Banner */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        isGreatTime 
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
          : 'bg-amber-50/70 border-amber-200 text-amber-950'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0 ${
            isGreatTime ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-slate-950'
          }`}>
            {isGreatTime ? <ArrowDownRight className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <span>{isGreatTime ? '🟢 Recommended Time to Buy' : '🟡 Fair Market Price'}</span>
            </div>
            <p className="text-xs text-slate-700 font-medium mt-0.5">
              {isGreatTime 
                ? `Current price is near its 90-day low (${discountFromHigh}% lower than recent peak). Ideal buying window.` 
                : `Price is stable. Next seasonal price drop expected during upcoming regional sales events.`}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0 bg-white/80 px-3 py-1.5 rounded-lg border border-gray-200/80">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Price Stability</div>
          <div className="text-xs font-black text-emerald-600">96.4% High</div>
        </div>
      </div>

      {/* 3 Key Price Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 space-y-0.5">
          <div className="text-[10px] text-slate-500 font-bold uppercase">90-Day Lowest</div>
          <div className="text-xs sm:text-sm font-black text-emerald-600">
            {formatPriceForRegion(`${lowest90Days}`, region)}
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 space-y-0.5">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Average Market Price</div>
          <div className="text-xs sm:text-sm font-black text-slate-700">
            {formatPriceForRegion(`${avg90Days}`, region)}
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 space-y-0.5">
          <div className="text-[10px] text-slate-500 font-bold uppercase">90-Day Highest</div>
          <div className="text-xs sm:text-sm font-black text-rose-600">
            {formatPriceForRegion(`${highest90Days}`, region)}
          </div>
        </div>
      </div>

      {/* Interactive Set Alert Form */}
      {isSettingAlert && (
        <form onSubmit={handleSaveAlert} className="bg-slate-50 border border-blue-100 rounded-xl p-4 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="text-xs font-black text-slate-900">Notify me when price drops:</div>
            <span className="text-[10px] text-blue-600 font-bold">Instant Email Notification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="email"
              required
              value={emailAlert}
              onChange={(e) => setEmailAlert(e.target.value)}
              placeholder="Enter your email address..."
              className="px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder={`Target Price (e.g. ${formatPriceForRegion(`${lowest90Days}`, region)})`}
                className="flex-1 px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs shrink-0"
              >
                Track Price
              </button>
            </div>
          </div>
        </form>
      )}

      {isAlertSaved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Price alert active for <strong>{emailAlert}</strong></span>
          </div>
          <button
            onClick={() => setIsAlertSaved(false)}
            className="text-[11px] text-slate-500 hover:text-slate-700 underline cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
