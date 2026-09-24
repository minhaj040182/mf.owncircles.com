import React, { useState } from 'react';
import { 
  Building2, 
  ShoppingBag, 
  ExternalLink, 
  Star, 
  Check, 
  ArrowRight, 
  SlidersHorizontal,
  Award,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Product, VideoItem } from '../types';
import { RegionCode, formatPriceForRegion, getLocalizedAffiliateUrl, REGION_CONFIGS } from '../utils/localization';

interface CompareAlternativesProps {
  currentProduct?: Product;
  currentTitle: string;
  category: string;
  region: RegionCode;
  allVideos?: VideoItem[];
  onSelectAlternativeVideo?: (video: VideoItem) => void;
}

export const CompareAlternatives: React.FC<CompareAlternativesProps> = ({
  currentProduct,
  currentTitle,
  category,
  region,
  allVideos = [],
  onSelectAlternativeVideo
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'budget' | 'premium'>('all');
  const regionConfig = REGION_CONFIGS[region] || REGION_CONFIGS.IN;

  // Generate or find 2-3 matching alternative products in the same category
  const sameCategoryVideos = allVideos
    .filter(v => v.title !== currentTitle && (v.category === category || category === 'all'))
    .slice(0, 3);

  // Generate comparison items
  const basePriceNum = currentProduct?.estimatedPrice ? parseInt(currentProduct.estimatedPrice.replace(/[^0-9]/g, '')) || 4999 : 4999;

  const alternatives = [
    {
      id: 'alt_current',
      name: currentProduct?.name || currentTitle,
      tier: 'Editor Pick (This Item)',
      badgeColor: 'bg-blue-600 text-white',
      price: currentProduct?.estimatedPrice || `${basePriceNum}`,
      rating: 4.8,
      keyFeature: 'Best balance of performance, user reviews & features',
      bestFor: 'Daily heavy use & best consensus score',
      pros: ['Highest verified satisfaction', 'Fast regional delivery'],
      isCurrent: true,
      url: currentProduct ? getLocalizedAffiliateUrl(currentProduct.affiliateUrl, currentProduct.name, region) : '#'
    },
    {
      id: 'alt_budget',
      name: sameCategoryVideos[0]?.products?.[0]?.name || `Budget Alternative for ${currentTitle.slice(0, 20)}`,
      tier: 'Best Value Pick',
      badgeColor: 'bg-emerald-600 text-white',
      price: `${Math.round(basePriceNum * 0.72)}`,
      rating: 4.5,
      keyFeature: 'Affordable entry point with essential capabilities',
      bestFor: 'Cost-conscious buyers',
      pros: ['Lowest price tag', 'Solid basic build'],
      isCurrent: false,
      videoItem: sameCategoryVideos[0],
      url: getLocalizedAffiliateUrl('', sameCategoryVideos[0]?.products?.[0]?.name || 'Alternative', region)
    },
    {
      id: 'alt_premium',
      name: sameCategoryVideos[1]?.products?.[0]?.name || `Pro Upgrade for ${currentTitle.slice(0, 20)}`,
      tier: 'Premium Flagship',
      badgeColor: 'bg-purple-600 text-white',
      price: `${Math.round(basePriceNum * 1.35)}`,
      rating: 4.9,
      keyFeature: 'Enhanced materials, longer warranty & advanced features',
      bestFor: 'Enthusiasts wanting zero compromises',
      pros: ['Top-tier material finishing', 'Extra accessories included'],
      isCurrent: false,
      videoItem: sameCategoryVideos[1],
      url: getLocalizedAffiliateUrl('', sameCategoryVideos[1]?.products?.[0]?.name || 'Pro Upgrade', region)
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>Compare with Top Market Alternatives</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-full">
                Spec Breakdown
              </span>
            </h3>
            <p className="text-xs text-slate-500">Side-by-side comparison to help you find the perfect match for your budget</p>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-gray-200 px-3 py-1.5 rounded-xl">
          Category: <span className="text-slate-900 capitalize">{category}</span>
        </span>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alternatives.map((item) => {
          const formattedPrice = formatPriceForRegion(item.price, region);
          return (
            <div
              key={item.id}
              className={`rounded-2xl p-4.5 transition-all flex flex-col justify-between space-y-4 relative ${
                item.isCurrent
                  ? 'bg-blue-50/60 border-2 border-blue-500 shadow-md ring-4 ring-blue-500/10'
                  : 'bg-slate-50 hover:bg-white border border-gray-200 shadow-2xs hover:shadow-xs'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.8 rounded-full ${item.badgeColor}`}>
                  {item.tier}
                </span>

                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-slate-900 line-clamp-2 leading-snug">
                  {item.name}
                </h4>
                <div className="text-base font-black text-emerald-600 flex items-center gap-1">
                  <span>{regionConfig.flag}</span>
                  <span>{formattedPrice}</span>
                </div>
              </div>

              {/* USP & Best For */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-gray-200/80 space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Standout Feature</div>
                  <p className="text-[11px] text-slate-700 font-semibold leading-tight">{item.keyFeature}</p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Best Suited For:</div>
                  <div className="text-[11px] text-slate-800 font-medium">{item.bestFor}</div>
                </div>

                <div className="space-y-1">
                  {item.pros.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  className={`w-full py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-2xs ${
                    item.isCurrent
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy on {regionConfig.storeName} ({formattedPrice})</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {!item.isCurrent && item.videoItem && onSelectAlternativeVideo && (
                  <button
                    onClick={() => onSelectAlternativeVideo(item.videoItem!)}
                    className="w-full py-1.5 text-blue-600 hover:text-blue-800 font-bold text-[11px] flex items-center justify-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Read Full AI Review</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
