import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

export interface RegionalMarketplaceConfig {
  code: string;
  name: string;
  domain: string;
  currency: string;
  symbol: string;
  usdRate: number;
  affiliateTag: string;
}

export const REGIONAL_MARKETPLACES: Record<string, RegionalMarketplaceConfig> = {
  IN: { code: 'IN', name: 'India', domain: 'amazon.in', currency: 'INR', symbol: '₹', usdRate: 83.50, affiliateTag: 'trends0628-21' },
  US: { code: 'US', name: 'United States', domain: 'amazon.com', currency: 'USD', symbol: '$', usdRate: 1.00, affiliateTag: 'trends0628-20' },
  GB: { code: 'GB', name: 'United Kingdom', domain: 'amazon.co.uk', currency: 'GBP', symbol: '£', usdRate: 0.79, affiliateTag: 'trends0628-21' },
  CA: { code: 'CA', name: 'Canada', domain: 'amazon.ca', currency: 'CAD', symbol: '$', usdRate: 1.36, affiliateTag: 'trends0628-20' },
  AU: { code: 'AU', name: 'Australia', domain: 'amazon.com.au', currency: 'AUD', symbol: '$', usdRate: 1.52, affiliateTag: 'trends0628-22' },
  DE: { code: 'DE', name: 'Germany', domain: 'amazon.de', currency: 'EUR', symbol: '€', usdRate: 0.92, affiliateTag: 'trends0628-21' },
  PK: { code: 'PK', name: 'Pakistan', domain: 'amazon.com', currency: 'PKR', symbol: '₨', usdRate: 278.00, affiliateTag: 'trends0628-20' },
  BD: { code: 'BD', name: 'Bangladesh', domain: 'amazon.com', currency: 'BDT', symbol: '৳', usdRate: 118.00, affiliateTag: 'trends0628-20' }
};

export const isSearchBotOrCrawler = (): boolean => {
  if (typeof window === 'undefined' || !window.navigator) {
    return true;
  }
  const ua = (window.navigator.userAgent || '').toLowerCase();
  const botPatterns = [
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'baiduspider',
    'sogou',
    'slurp',
    'facebookexternalhit',
    'linkedinbot',
    'twitterbot',
    'applebot',
    'crawler',
    'spider',
    'lighthouse',
    'chrome-lighthouse',
    'headlesschrome',
    'prerender'
  ];
  return botPatterns.some((bot) => ua.includes(bot)) || Boolean((window as unknown as { __PRERENDER_INJECTED?: boolean }).__PRERENDER_INJECTED);
};

export const extractAmazonAsin = (rawString: string = ''): string | null => {
  if (!rawString) return null;
  const asinMatch = rawString.match(/(?:dp\/|gp\/product\/|asin\/|d\/|ASIN=|\/)([A-Z0-9]{10})(?:[/?&#]|$)/i);
  return asinMatch ? asinMatch[1].toUpperCase() : null;
};

export const calculateWilsonConfidenceScore = (positiveCount: number = 0, totalCount: number = 0): number => {
  if (totalCount <= 0) return 0.85;
  const z = 1.96;
  const p = positiveCount / totalCount;
  const denominator = 1 + (z * z) / totalCount;
  const centerAdjusted = p + (z * z) / (2 * totalCount);
  const spread = z * Math.sqrt((p * (1 - p) + (z * z) / (4 * totalCount)) / totalCount);
  return Math.max(0, Math.min(1, (centerAdjusted - spread) / denominator));
};

export interface ProcessedScraperItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnailUrl: string;
  activeRegion: string;
  isStub?: boolean;
  primaryPrice: {
    amount: number;
    formatted: string;
    currency: string;
  };
  primaryAffiliateUrl: string;
  regionalLinks: Record<string, string>;
  regionalPrices: Record<string, { amount: number; formatted: string; currency: string }>;
  sentiment: {
    positivePercentage: number;
    wilsonScore: number;
    starRating: number;
    sampleSize: number;
  };
  aspectScores: {
    buildQuality: number;
    valueForMoney: number;
    usability: number;
  };
  schemaLd: {
    '@type': string;
    name: string;
    url: string;
    image?: string;
    offers: {
      '@type': string;
      price: number;
      priceCurrency: string;
      availability: string;
    };
  };
}

export const processScraperItem = (rawItem: Record<string, unknown>, activeRegion: string = 'IN'): ProcessedScraperItem => {
  const title = String(rawItem.title || rawItem.name || 'Featured Product Review');
  const cleanTitle = title.replace(/\s+/g, ' ').trim();
  const rawUrl = String(rawItem.url || rawItem.affiliateUrl || rawItem.description || '');
  const asin = extractAmazonAsin(rawUrl);

  let baseUsd = 49.99;
  if (typeof rawItem.price === 'number' && rawItem.price > 0) {
    baseUsd = rawItem.price;
  } else if (typeof rawItem.price === 'string') {
    const parsed = parseFloat(rawItem.price.replace(/[^0-9.]/g, ''));
    if (!isNaN(parsed) && parsed > 0) {
      baseUsd = rawItem.price.includes('₹') ? parsed / 83.5 : parsed;
    }
  }

  const regionalLinks: Record<string, string> = {};
  const regionalPrices: Record<string, { amount: number; formatted: string; currency: string }> = {};

  Object.values(REGIONAL_MARKETPLACES).forEach((mkt) => {
    const convertedLocal = Math.round(baseUsd * mkt.usdRate);
    regionalPrices[mkt.code] = {
      amount: convertedLocal,
      formatted: `${mkt.symbol}${convertedLocal.toLocaleString()}`,
      currency: mkt.currency
    };

    if (asin) {
      regionalLinks[mkt.code] = `https://www.${mkt.domain}/dp/${asin}?tag=${mkt.affiliateTag}`;
    } else {
      const searchEncoded = encodeURIComponent(cleanTitle.slice(0, 50));
      regionalLinks[mkt.code] = `https://www.${mkt.domain}/s?k=${searchEncoded}&tag=${mkt.affiliateTag}`;
    }
  });

  const comments = Array.isArray(rawItem.comments) ? rawItem.comments : [];
  const positiveComments = comments.filter((c: { positivityScore?: number; negativityScore?: number; sentiment?: string }) => 
    (c.positivityScore || 0) >= (c.negativityScore || 0) || c.sentiment === 'positive'
  );
  const positiveRatio = comments.length > 0 ? (positiveComments.length / comments.length) : 0.88;
  const wilsonScore = calculateWilsonConfidenceScore(positiveComments.length, comments.length);
  const mappedStarRating = Math.min(5, Math.max(1, +(wilsonScore * 5).toFixed(1)));

  const slug = String(rawItem.slug || cleanTitle.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)
    .replace(/^-+|-+$/g, '')) || 'trending-product-review';

  const defaultPrice = regionalPrices[activeRegion] || regionalPrices.IN;
  const defaultAffiliateUrl = regionalLinks[activeRegion] || regionalLinks.IN;

  return {
    id: String(rawItem.id || rawItem.ytId || slug),
    title: cleanTitle,
    slug,
    category: String(rawItem.category || 'electronics'),
    thumbnailUrl: String(rawItem.thumbnailUrl || rawItem.image || `https://i.ytimg.com/vi/${rawItem.ytId}/hqdefault.jpg`),
    activeRegion,
    primaryPrice: defaultPrice,
    primaryAffiliateUrl: defaultAffiliateUrl,
    regionalLinks,
    regionalPrices,
    sentiment: {
      positivePercentage: Math.round(positiveRatio * 100),
      wilsonScore,
      starRating: mappedStarRating,
      sampleSize: Math.max(comments.length, 34)
    },
    aspectScores: {
      buildQuality: Math.min(10, Math.max(7, Math.round(mappedStarRating * 2))),
      valueForMoney: Math.min(10, Math.max(6, Math.round((positiveRatio * 9) + 1))),
      usability: Math.min(10, Math.max(7, Math.round(mappedStarRating * 1.9 + 0.5)))
    },
    schemaLd: {
      '@type': 'Product',
      name: cleanTitle,
      url: `https://trends.owncircles.com/video/${slug}`,
      image: String(rawItem.thumbnailUrl || ''),
      offers: {
        '@type': 'Offer',
        price: defaultPrice.amount,
        priceCurrency: defaultPrice.currency,
        availability: 'https://schema.org/InStock'
      }
    }
  };
};

export interface UseAsyncScraperDataOptions {
  activeRegion?: string;
  batchSize?: number;
  maxTimeout?: number;
}

export function useAsyncScraperData(
  rawItems: Record<string, unknown>[] = [],
  options: UseAsyncScraperDataOptions = {}
) {
  const { activeRegion = 'IN', batchSize = 3, maxTimeout = 1500 } = options;

  const isCrawler = useMemo(() => isSearchBotOrCrawler(), []);

  const initialData = useMemo(() => {
    if (!Array.isArray(rawItems) || rawItems.length === 0) return [];
    if (isCrawler) {
      return rawItems.map(item => processScraperItem(item, activeRegion));
    }
    return rawItems.slice(0, Math.min(rawItems.length, 2)).map(item => ({
      id: String(item.id || item.ytId || 'skeleton-stub'),
      title: String(item.title || item.name || 'Loading verified review...'),
      slug: 'loading',
      category: String(item.category || 'all'),
      thumbnailUrl: String(item.thumbnailUrl || item.image || ''),
      activeRegion,
      isStub: true,
      primaryPrice: { formatted: 'Checking...', amount: 0, currency: 'USD' },
      primaryAffiliateUrl: String(item.affiliateUrl || item.url || '#'),
      regionalLinks: {},
      regionalPrices: {},
      sentiment: { positivePercentage: 85, wilsonScore: 0.85, starRating: 4.5, sampleSize: 20 },
      aspectScores: { buildQuality: 8, valueForMoney: 8, usability: 8 },
      schemaLd: { '@type': 'Product', name: '', url: '', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', availability: 'https://schema.org/InStock' } }
    }));
  }, [rawItems, activeRegion, isCrawler]);

  const [data, setData] = useState<ProcessedScraperItem[]>(initialData);
  const [isPending, setIsPending] = useState<boolean>(!isCrawler);
  const [progress, setProgress] = useState<number>(isCrawler ? 100 : 0);
  const [error, setError] = useState<Error | null>(null);

  const idleCallbackHandleRef = useRef<number | ReturnType<typeof setTimeout> | null>(null);
  const currentIndexRef = useRef<number>(0);
  const accumulatedDataRef = useRef<ProcessedScraperItem[]>([]);

  const processNextSlice = useCallback((deadline?: { timeRemaining: () => number }) => {
    try {
      const total = rawItems.length;
      if (total === 0) {
        setIsPending(false);
        setProgress(100);
        return;
      }

      while (
        currentIndexRef.current < total &&
        (deadline ? deadline.timeRemaining() > 3.5 : true)
      ) {
        const sliceEnd = Math.min(currentIndexRef.current + batchSize, total);
        for (let i = currentIndexRef.current; i < sliceEnd; i++) {
          const processed = processScraperItem(rawItems[i], activeRegion);
          accumulatedDataRef.current.push(processed);
        }
        currentIndexRef.current = sliceEnd;

        if (!deadline) break;
      }

      const currentProgress = Math.round((currentIndexRef.current / total) * 100);
      setProgress(currentProgress);

      if (currentIndexRef.current < total) {
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          idleCallbackHandleRef.current = (window as unknown as { requestIdleCallback: (cb: (d: { timeRemaining: () => number }) => void, opt: { timeout: number }) => number }).requestIdleCallback(processNextSlice, { timeout: maxTimeout });
        } else {
          idleCallbackHandleRef.current = setTimeout(() => processNextSlice(), 16);
        }
      } else {
        setData([...accumulatedDataRef.current]);
        setIsPending(false);
        setProgress(100);
      }
    } catch (err) {
      console.error('[useAsyncScraperData] Processing failure in worker loop:', err);
      setError(err as Error);
      setIsPending(false);
      setData(rawItems.map(item => processScraperItem(item, activeRegion)));
    }
  }, [rawItems, activeRegion, batchSize, maxTimeout]);

  useEffect(() => {
    if (isCrawler) {
      return;
    }

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      setData([]);
      setIsPending(false);
      setProgress(100);
      return;
    }

    currentIndexRef.current = 0;
    accumulatedDataRef.current = [];
    setIsPending(true);
    setProgress(0);
    setError(null);

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleCallbackHandleRef.current = (window as unknown as { requestIdleCallback: (cb: (d: { timeRemaining: () => number }) => void, opt: { timeout: number }) => number }).requestIdleCallback(processNextSlice, { timeout: maxTimeout });
    } else {
      idleCallbackHandleRef.current = setTimeout(() => processNextSlice(), 16);
    }

    return () => {
      if (idleCallbackHandleRef.current) {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window && typeof idleCallbackHandleRef.current === 'number') {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleCallbackHandleRef.current);
        } else {
          clearTimeout(idleCallbackHandleRef.current as ReturnType<typeof setTimeout>);
        }
      }
    };
  }, [rawItems, activeRegion, isCrawler, processNextSlice, maxTimeout]);

  return {
    data,
    isPending,
    isCrawler,
    progress,
    error,
    totalItems: rawItems ? rawItems.length : 0,
    processedCount: data ? data.length : 0
  };
}

export default useAsyncScraperData;
