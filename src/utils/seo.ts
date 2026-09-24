/**
 * SEO & Unique Content Generation Utilities
 * 
 * Provides functions to:
 * 1. Convert titles into clean, hyphenated SEO slugs for unique URLs.
 * 2. Rephrase titles and descriptions to avoid Google Search duplicate content penalties.
 * 3. Dynamically set HTML metadata (title, description, canonical URL) for search engine indexing.
 */

import { VideoItem } from '../types';

/**
 * Converts any string or title into a full, descriptive, hyphenated URL slug.
 * Preserves the full descriptive title while removing special characters and sanitizing spaces into hyphens.
 * Example: "Comprehensive Buyer Guide & Performance Test: 25 Best Luxury Amazon Pet Gadgets That Everyone Is Buying"
 * Returns: "comprehensive-buyer-guide-performance-test-25-best-luxury-amazon-pet-gadgets-that-everyone-is-buying"
 */
export function toFullSlug(text: string): string {
  if (!text) return 'trending-product-review';
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, ' ')
    .replace(/[:\/\\#\?\[\]@!$&'()*+,;=.]/g, ' ')
    .replace(/[^\w\s-]/g, ' ')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'trending-product-review';
}

/**
 * Converts title into a clean search-engine and social-friendly URL slug.
 */
export function generateSlug(text: string): string {
  return toFullSlug(text);
}

export const RECOGNIZED_PRODUCTION_HOSTS: Record<string, { domain: string; brand: string }> = {
  'trends.owncircles.com': { domain: 'https://trends.owncircles.com', brand: 'TrendPulse' },
  'owncircles.com': { domain: 'https://trends.owncircles.com', brand: 'TrendPulse' },
  'www.owncircles.com': { domain: 'https://trends.owncircles.com', brand: 'TrendPulse' },
};

/**
 * Returns the explicit production canonical domain for recognized production hosts.
 * On development/staging/preview/localhost hosts, returns the local origin to avoid
 * emitting misleading production canonical URLs during local testing and development.
 */
export function getCanonicalDomain(): string {
  if (typeof window !== 'undefined' && window.location?.hostname) {
    const host = window.location.hostname.toLowerCase();
    if (RECOGNIZED_PRODUCTION_HOSTS[host]) {
      return RECOGNIZED_PRODUCTION_HOSTS[host].domain;
    }
    if (window.location.origin && window.location.origin !== 'null') {
      return window.location.origin;
    }
  }
  return 'https://trends.owncircles.com';
}

/**
 * Returns the explicit brand name for recognized production hosts.
 */
export function getSiteBrandName(): string {
  if (typeof window !== 'undefined' && window.location?.hostname) {
    const host = window.location.hostname.toLowerCase();
    if (RECOGNIZED_PRODUCTION_HOSTS[host]) {
      return RECOGNIZED_PRODUCTION_HOSTS[host].brand;
    }
  }
  return 'TrendPulse';
}

/**
 * Generates the website's public shareable URL for a video (e.g. https://domain.com/video/slug).
 * Ensures sharing always points to the website review page rather than YouTube,
 * formatted cleanly with the full descriptive slug.
 */
export function getVideoShareUrl(video: { slug?: string; title?: string; rephrasedTitle?: string }): string {
  const displayTitle = video.rephrasedTitle || video.title || '';
  const slug = video.slug || toFullSlug(displayTitle);
  let domain = getCanonicalDomain();
  if (typeof window !== 'undefined' && window.location?.origin) {
    if (window.location.hostname.includes('owncircles.com') || (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1'))) {
      domain = window.location.origin;
    }
  }
  return `${domain}/video/${slug}`;
}

/**
 * Rephrases original titles into unique, search-engine-friendly titles.
 */
export function rephraseTitle(originalTitle: string, category: string = 'household'): string {
  let cleaned = originalTitle
    .replace(/\(.*?\)/g, '') // Remove parenthetical tags like (Viral Household Tools)
    .replace(/\[.*?\]/g, '')
    .trim();

  const prefixes: Record<string, string[]> = {
    household: [
      'Tested & Reviewed: ',
      'Expert Insight: ',
      'Home Cleaning Breakthrough: ',
      'Top Household Innovations: '
    ],
    kitchen: [
      'Kitchen Tech Guide: ',
      'Cooking Speed Upgrade: ',
      'Culinary Innovation Review: ',
      'Essential Kitchen Tools: '
    ],
    fitness: [
      'Home Fitness Gear Review: ',
      'Compact Workout Solution: ',
      'Daily Fitness Innovation: ',
      'Apartment Cardio Breakthrough: '
    ],
    gadgets: [
      'Smart Tech Deep Dive: ',
      'Next-Gen Home Automation: ',
      'Viral Tech Review: ',
      'Living Space Upgrade: '
    ],
    reviews: [
      'Comprehensive Product Breakdown: ',
      'Unbiased Hands-On Review: ',
      'Buyer Guide 2026: '
    ]
  };

  const options = prefixes[category] || prefixes.household;
  const prefix = options[Math.floor(Math.abs(hashString(cleaned)) % options.length)];

  // Rephrase common phrases to guarantee unique content
  cleaned = cleaned
    .replace(/Incredible/gi, 'Top-Rated')
    .replace(/Viral/gi, 'High-Demand')
    .replace(/You Need in 2026/gi, 'For Modern Living')
    .replace(/Must-Have/gi, 'Essential')
    .replace(/That Save You Hours/gi, 'For Maximum Efficiency')
    .replace(/Every Week/gi, 'In Daily Routines');

  return `${prefix}${cleaned}`;
}

/**
 * Rephrases or generates a unique, search-engine-optimized description (140-160 chars)
 * avoiding duplicate content penalties on Google.
 */
export function rephraseDescription(originalTitle: string, rawSummary?: string, category: string = 'household'): string {
  if (rawSummary && rawSummary.length > 50) {
    // Enhance existing summary to create a unique meta description
    return `In-depth analysis and viewer sentiment review: ${rawSummary} Discover full product specs, user ratings, and verified buying options.`;
  }

  const categoryDescriptions: Record<string, string> = {
    household: `Detailed review and viewer consensus on top-rated household cleaning gadgets and smart vacuum systems. Discover pros, cons, and performance tests.`,
    kitchen: `Comprehensive buyer guide and performance review of time-saving kitchen appliances and rapid cooking technology tested by real home cooks.`,
    fitness: `Expert breakdown and sentiment analysis of compact home exercise equipment designed for small spaces and daily workout routines.`,
    gadgets: `Explore in-depth specifications, user feedback, and value analysis for trending smart home automation gadgets and ambient lighting.`,
    reviews: `Unbiased review and sentiment scoring for top-selling consumer products with verified customer feedback and price breakdowns.`
  };

  return categoryDescriptions[category] || categoryDescriptions.household;
}

/**
 * Simple string hash function for deterministic variations
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/**
 * Dynamically updates document metadata for SEO (title, meta description, canonical URL, OG tags).
 */
export function updateNotFoundSeo(attemptedPath?: string, isDeleted: boolean = false) {
  const brand = getSiteBrandName();
  document.title = isDeleted 
    ? `410 Content Removed or Permanently Deleted | ${brand}`
    : `404 Page Not Found | ${brand}`;

  // Set meta robots to noindex, follow so search engines drop the deleted URL but can follow links to valid content
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', 'noindex, follow');

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute(
    'content',
    isDeleted
      ? `The requested product review or article has been permanently deleted. Browse active trending gear reviews and Amazon deals on ${brand}.`
      : `The link or product review you are looking for does not exist or has been moved on ${brand}.`
  );

  // Remove canonical link so search engines do not canonicalize to homepage or non-existent URLs
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.remove();
  }

  // Remove any product-level JSON-LD schema
  const schemaScript = document.querySelector('script[id="json-ld-schema"]');
  if (schemaScript) {
    const errorSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": isDeleted ? "410 Content Removed" : "Page Not Found",
      "description": isDeleted
        ? "The requested article or resource has been permanently deleted."
        : "The requested URL is not available or has been moved."
    };
    schemaScript.textContent = JSON.stringify(errorSchema);
  }
}

export function updatePageSeo(video: VideoItem | null) {
  const baseUrl = getCanonicalDomain();
  const brand = getSiteBrandName();

  // Restore robots to index, follow when viewing valid pages
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (metaRobots) {
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  }

  if (video) {
    const displayTitle = video.rephrasedTitle || video.title;
    const displayDesc = video.rephrasedDescription || video.pulse.summary;
    const slug = video.slug || generateSlug(displayTitle);

    document.title = `${displayTitle} | ${brand} Review`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', displayDesc);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${baseUrl}/video/${slug}`);

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', displayTitle);

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', displayDesc);

    // OpenGraph Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', video.thumbnailUrl);

    // Twitter Card Tags
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', displayTitle);
    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', displayDesc);
    let twImg = document.querySelector('meta[name="twitter:image"]');
    if (twImg) twImg.setAttribute('content', video.thumbnailUrl);

    // Schema.org JSON-LD (Product + VideoObject Structured Data)
    const topProduct = video.products && video.products[0];
    const ratingVal = (video.pulse?.overallSentimentRatio?.positive ? (video.pulse.overallSentimentRatio.positive / 20).toFixed(1) : "4.7");
    const reviewCount = video.comments ? Math.max(video.comments.length * 12, 85) : 120;

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "name": topProduct ? topProduct.name : displayTitle,
          "image": [video.thumbnailUrl],
          "description": displayDesc,
          "category": video.category,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingVal,
            "reviewCount": reviewCount,
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": topProduct ? (topProduct.estimatedPrice.includes('₹') ? 'INR' : 'USD') : 'USD',
            "price": topProduct ? topProduct.estimatedPrice.replace(/[^0-9.]/g, '') || '49.99' : '49.99',
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "url": topProduct ? topProduct.affiliateUrl : `${baseUrl}/video/${slug}`,
            "seller": {
              "@type": "Organization",
              "name": "Amazon"
            }
          }
        },
        {
          "@type": "VideoObject",
          "name": displayTitle,
          "description": displayDesc,
          "thumbnailUrl": [video.thumbnailUrl],
          "uploadDate": "2026-01-01T08:00:00+00:00",
          "embedUrl": `https://www.youtube.com/embed/${video.youtubeId}`
        }
      ]
    };

    let schemaScript = document.querySelector('script[id="json-ld-schema"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'json-ld-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemaData);

  } else {
    document.title = 'TrendPulse | Viral Product Reviews & Verified Amazon Deals';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Discover AI-curated YouTube product reviews, buyer sentiment scores, pros and cons, and verified Amazon deals for trending home, kitchen, tech, and fitness gear.'
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${baseUrl}/`);
    }

    // Default WebSite & Organization JSON-LD Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "TrendPulse",
      "url": `${baseUrl}/`,
      "description": "YouTube product video curation hub with AI sentiment analysis and converted Amazon affiliate deals.",
      "publisher": {
        "@type": "Organization",
        "name": "TrendPulse"
      }
    };

    let schemaScript = document.querySelector('script[id="json-ld-schema"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'json-ld-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(websiteSchema);
  }
}
