import React, { useState, useEffect, useRef } from 'react';
import { Star, ExternalLink, Play, ShoppingBag, ShieldCheck, TrendingUp, Check } from 'lucide-react';

/**
 * Checks synchronously whether the executing environment is an automated crawler or SSR engine.
 * Ensures headless search bots (e.g., Googlebot) receive the fully populated DOM immediately.
 */
const checkIsCrawler = () => {
  if (typeof window === 'undefined' || !window.navigator) {
    return true;
  }
  const ua = (window.navigator.userAgent || '').toLowerCase();
  const botSignatures = [
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'baiduspider',
    'lighthouse',
    'chrome-lighthouse',
    'headlesschrome',
    'prerender'
  ];
  return botSignatures.some((sig) => ua.includes(sig)) || Boolean(window.__PRERENDER_INJECTED);
};

/**
 * DeferredProductCard Component
 *
 * A performance-engineered product review card designed for Core Web Vitals (CLS = 0, optimal TBT).
 * - Native lazy image loading and asynchronous decoding.
 * - IntersectionObserver viewport-based hydration to defer memory and event loops.
 * - Semantic flat HTML anchors with descriptive strings and nofollow/noreferrer attributes.
 */
export const DeferredProductCard = ({
  id,
  title = 'Featured Product Review',
  slug = 'trending-product-review',
  category = 'electronics',
  thumbnailUrl = 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=640&q=80',
  price = '$49.99',
  originalPrice,
  discountPercentage,
  rating = 4.7,
  sentimentScore = 88,
  sampleSize = 420,
  affiliateUrl = 'https://www.amazon.com',
  regionCode = 'US',
  regionName = 'United States',
  aspectHighlights = [
    'Verified Lab Build Quality',
    'Competitive Market Value',
    'High Durability Rating'
  ]
}) => {
  const cardRef = useRef(null);
  const isBot = checkIsCrawler();
  const [isVisible, setIsVisible] = useState(isBot);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    if (isVisible || isBot) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      {
        rootMargin: '250px 0px', // Preload slightly before scrolling into view
        threshold: 0.01
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVisible, isBot]);

  const reviewUrl = `/video/${slug}`;
  const priceDisplay = typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  return (
    <article
      ref={cardRef}
      id={`product-card-${id || slug}`}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full contain-content"
    >
      {/* 1. NATIVE LAZY LOADED MEDIA HEADER (Explicit dimensions prevent CLS) */}
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden shrink-0">
        <a
          href={reviewUrl}
          title={`Watch verified lab review: ${title}`}
          className="block w-full h-full group"
        >
          <img
            src={thumbnailUrl}
            alt={`Detailed video review and durability assessment for ${title}`}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setIsImgLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              isImgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

          {/* Quick Play Indicator Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/75 backdrop-blur-xs text-white rounded-lg text-xs font-semibold">
            <Play className="w-3.5 h-3.5 fill-white text-white" />
            <span>Watch Lab Review</span>
          </div>

          {/* Category Tag */}
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-slate-800 rounded-md text-[11px] font-bold uppercase tracking-wider">
            {category.replace('_', ' ')}
          </div>
        </a>
      </div>

      {/* 2. CARD BODY (Hydrated once visible in viewport) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Rating & Verified Buyer Sentiment */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({sampleSize} verified)</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-[11px]">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>{sentimentScore}% Positive</span>
            </div>
          </div>

          {/* Title Link */}
          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
            <a href={reviewUrl} title={`Read complete benchmark review for ${title}`}>
              {title}
            </a>
          </h3>

          {/* Deferred Technical Highlights (Only heavy markup mounts when visible) */}
          {isVisible ? (
            <ul className="space-y-1 pt-1 border-t border-slate-100 text-xs text-slate-600">
              {aspectHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-1.5 line-clamp-1">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-12 bg-slate-50 animate-pulse rounded-lg" />
          )}
        </div>

        {/* 3. FLAT SEMANTIC AFFILIATE ACTION FOOTER */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">
                {priceDisplay}
              </span>
              {originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            {discountPercentage && (
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Save {discountPercentage}%
              </span>
            )}
          </div>

          {/* Direct Crawlable Outbound Affiliate Anchor */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            title={`Check verified price and availability on Amazon ${regionName}`}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Check Deal on Amazon - {regionName}</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
          </a>

          {/* Verification Badge */}
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tested & Verified Pricing ({regionCode})</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DeferredProductCard;
