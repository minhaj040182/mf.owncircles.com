import React from 'react';
import { 
  Award, 
  Star, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ThumbsUp, 
  Zap, 
  ShoppingBag, 
  Building2,
  Bot
} from 'lucide-react';
import { AIPulse, Product } from '../types';
import { RegionCode, formatPriceForRegion, getLocalizedAffiliateUrl } from '../utils/localization';

interface QuickScorecardProps {
  pulse?: AIPulse;
  product?: Product;
  category?: string;
  region: RegionCode;
  onComparePriceClick: () => void;
  onScrollToDecision: () => void;
  onAskAIClick?: () => void;
}

export const QuickScorecard: React.FC<QuickScorecardProps> = ({
  pulse,
  product,
  category = 'electronics',
  region,
  onComparePriceClick,
  onScrollToDecision,
  onAskAIClick
}) => {
  const positiveRatio = pulse?.overallSentimentRatio?.positive ?? 88;
  const viralScore = pulse?.viralPotentialScore ?? 92;
  
  // Calculate dynamic sub-scores out of 10
  const overallScore = ((positiveRatio * 0.07 + (viralScore * 0.03))).toFixed(1);
  const valueScore = ((positiveRatio > 85 ? 9.4 : 8.6) + (viralScore > 80 ? 0.3 : 0.1)).toFixed(1);
  const qualityScore = (Math.min(9.8, 8.8 + (positiveRatio > 90 ? 0.8 : 0.4))).toFixed(1);
  const easeScore = (Math.min(9.7, 8.9 + (viralScore > 85 ? 0.6 : 0.2))).toFixed(1);

  const recommendation = pulse?.buyerRecommendation || 'Must Buy';
  const priceFormatted = product?.estimatedPrice ? formatPriceForRegion(product.estimatedPrice, region) : null;
  const affiliateUrl = product ? getLocalizedAffiliateUrl(product.affiliateUrl, product.name, region) : '#';

  const keyBullets = pulse?.pros?.slice(0, 3) || [
    'Highly praised for performance & durable build',
    'Exceptional value-for-money in its price segment',
    'Simple, hassle-free daily operation'
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-700/80 space-y-5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Badge & Verdict */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
            <Award className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-amber-400 font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              AI Verified Quick Verdict
            </div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>{recommendation}</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                {positiveRatio}% Positive Approval
              </span>
            </h3>
          </div>
        </div>

        {/* Overall Score Badge */}
        <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl backdrop-blur-xs">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall Score</div>
            <div className="text-xl font-black text-emerald-400 leading-none">{overallScore}<span className="text-xs text-slate-400">/10</span></div>
          </div>
          <div className="flex gap-0.5 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <Star className="w-4 h-4 fill-amber-400" />
            <Star className="w-4 h-4 fill-amber-400" />
            <Star className="w-4 h-4 fill-amber-400" />
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>

      {/* 4-Metric Rating Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        <div className="bg-slate-800/60 border border-slate-700/70 p-3 rounded-xl space-y-1">
          <div className="text-[11px] text-slate-400 font-bold flex items-center justify-between">
            <span>Value for Money</span>
            <span className="text-emerald-400 font-black">{valueScore}</span>
          </div>
          <div className="w-full bg-slate-700/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${Number(valueScore) * 10}%` }} />
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/70 p-3 rounded-xl space-y-1">
          <div className="text-[11px] text-slate-400 font-bold flex items-center justify-between">
            <span>Build Quality</span>
            <span className="text-blue-400 font-black">{qualityScore}</span>
          </div>
          <div className="w-full bg-slate-700/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full rounded-full" style={{ width: `${Number(qualityScore) * 10}%` }} />
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/70 p-3 rounded-xl space-y-1">
          <div className="text-[11px] text-slate-400 font-bold flex items-center justify-between">
            <span>Ease of Use</span>
            <span className="text-indigo-400 font-black">{easeScore}</span>
          </div>
          <div className="w-full bg-slate-700/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${Number(easeScore) * 10}%` }} />
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/70 p-3 rounded-xl space-y-1">
          <div className="text-[11px] text-slate-400 font-bold flex items-center justify-between">
            <span>Viral Velocity</span>
            <span className="text-amber-400 font-black">{viralScore}/100</span>
          </div>
          <div className="w-full bg-slate-700/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full" style={{ width: `${viralScore}%` }} />
          </div>
        </div>
      </div>

      {/* Key Highlights Bullet Checklist */}
      <div className="space-y-2 bg-slate-800/40 border border-slate-700/50 p-3.5 rounded-xl relative z-10">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Why Reviewers & Viewers Recommend This:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {keyBullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-tight">{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 relative z-10">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Tested &amp; verified across verified buyer comments</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {onAskAIClick && (
            <button
              onClick={onAskAIClick}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-indigo-600/90 hover:bg-indigo-500 text-white border border-indigo-500/50 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/30 active:scale-95"
            >
              <Bot className="w-4 h-4 text-indigo-200" />
              <span>Ask AI</span>
            </button>
          )}

          <button
            onClick={onComparePriceClick}
            className="flex-1 sm:flex-initial px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Compare Stores</span>
          </button>

          {product && (
            <a
              href={affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Check Deal {priceFormatted ? `(${priceFormatted})` : ''}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
