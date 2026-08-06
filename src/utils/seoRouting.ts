import { Video } from "../types";

export type PageType = 
  | "home" 
  | "ras" 
  | "biofloc" 
  | "aquaponics" 
  | "hydroponics" 
  | "pond" 
  | "diseases" 
  | "feed" 
  | "calculators" 
  | "services" 
  | "about" 
  | "privacy"
  | "videos"
  | "faq";

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const PAGE_SEO_PATHS: Record<PageType, string> = {
  home: "/",
  ras: "/aquaponic",
  biofloc: "/bioflock",
  aquaponics: "/aquaponics-farming",
  hydroponics: "/hydroponic",
  pond: "/pond-farming",
  diseases: "/fish-diseases",
  feed: "/feeding-management",
  calculators: "/calculators",
  services: "/ourservices",
  about: "/about-us",
  privacy: "/privacy-policy",
  videos: "/farming-videos",
  faq: "/frequently-asked-questions",
};

export function getPathForPage(page: PageType, video?: Video | null): string {
  if (video) {
    const slug = createSlug(video.title);
    return `/video/${slug}-${video.id}`;
  }
  return PAGE_SEO_PATHS[page] || "/";
}

export function parseUrlPath(pathnameOrHash: string, allVideos: Video[]): { page: PageType; video: Video | null } {
  let raw = pathnameOrHash || "/";
  if (raw.includes("#")) {
    const parts = raw.split("#");
    raw = parts[parts.length - 1] || "/";
  }
  const normalized = raw.trim().toLowerCase();

  // Video route matching: /video/:slug-id or /video/:id
  if (normalized.startsWith("/video/")) {
    const segments = normalized.replace(/^\/video\//, "").split("-");
    const potentialId = segments[segments.length - 1];
    
    // Search by ID or matching title slug
    const foundVideo = allVideos.find((v) => {
      if (String(v.id) === potentialId) return true;
      const vSlug = createSlug(v.title);
      return normalized.includes(vSlug);
    });

    if (foundVideo) {
      return { page: "videos", video: foundVideo };
    }
  }

  // Exact or legacy path matches
  if (normalized === "/" || normalized === "") return { page: "home", video: null };
  if (normalized.includes("aquaponics") || normalized.includes("aquaponic-farming")) return { page: "aquaponics", video: null };
  if (normalized.includes("recirculating") || normalized.includes("ras") || normalized.includes("aquaponic")) return { page: "ras", video: null };
  if (normalized.includes("biofloc") || normalized.includes("bioflock")) return { page: "biofloc", video: null };
  if (normalized.includes("hydroponic") || normalized.includes("soilless")) return { page: "hydroponics", video: null };
  if (normalized.includes("pond")) return { page: "pond", video: null };
  if (normalized.includes("disease")) return { page: "diseases", video: null };
  if (normalized.includes("feed")) return { page: "feed", video: null };
  if (normalized.includes("calculator")) return { page: "calculators", video: null };
  if (normalized.includes("ourservice") || normalized.includes("service")) return { page: "services", video: null };
  if (normalized.includes("about")) return { page: "about", video: null };
  if (normalized.includes("privacy")) return { page: "privacy", video: null };
  if (normalized.includes("video")) return { page: "videos", video: null };
  if (normalized.includes("faq") || normalized.includes("frequently")) return { page: "faq", video: null };

  return { page: "home", video: null };
}

export interface SeoMetaData {
  title: string;
  description: string;
  keywords: string;
}

export function formatSeoTitle(baseTitle: string, categorySuffix: string = "Modern Fisheries"): string {
  let fullTitle = `${baseTitle} | ${categorySuffix}`;
  if (fullTitle.length >= 50 && fullTitle.length <= 60) {
    return fullTitle;
  }
  if (fullTitle.length < 50) {
    // Expand title to reach 50-60 character optimal SEO length
    fullTitle = `${baseTitle} Video Guide | ${categorySuffix}`;
    if (fullTitle.length < 50) {
      fullTitle = `${baseTitle} Aquaculture Tutorial | ${categorySuffix}`;
    }
  }
  if (fullTitle.length > 60) {
    // Trim baseTitle cleanly at word boundary
    const maxBaseLen = 60 - categorySuffix.length - 3;
    let trimmed = baseTitle.slice(0, maxBaseLen);
    const lastSpace = trimmed.lastIndexOf(" ");
    if (lastSpace > 20) {
      trimmed = trimmed.slice(0, lastSpace);
    }
    fullTitle = `${trimmed} | ${categorySuffix}`;
  }
  return fullTitle;
}

export function formatSeoDescription(
  desc?: string | null,
  suffix: string = "Watch expert aquaculture video tutorials & guides by Modern Fisheries."
): string {
  let text = (desc || "").trim().replace(/\s+/g, " ");
  if (!text) {
    return "Watch high-definition aquaculture video tutorials on RAS design, Biofloc systems, Aquaponics, fish health, and feeding strategies by Modern Fisheries."; // 155 chars
  }

  if (text.length >= 150 && text.length <= 160) {
    return text;
  }

  if (text.length > 160) {
    let truncated = text.slice(0, 154);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 110) {
      truncated = truncated.slice(0, lastSpace);
    }
    return truncated.trim() + "...";
  }

  // If text < 150, pad with context
  let combined = `${text} ${suffix}`;
  if (combined.length >= 150 && combined.length <= 160) {
    return combined;
  }

  if (combined.length > 160) {
    let truncated = combined.slice(0, 154);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 110) {
      truncated = truncated.slice(0, lastSpace);
    }
    return truncated.trim() + "...";
  }

  const paddingSuffix = " Learn complete fish culture methods and farm management at Modern Fisheries.";
  combined = `${text}${paddingSuffix}`;
  if (combined.length > 160) {
    let truncated = combined.slice(0, 154);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 110) {
      truncated = truncated.slice(0, lastSpace);
    }
    return truncated.trim() + "...";
  }

  return combined.padEnd(152, ".");
}

export function getSeoMetaData(page: PageType, video?: Video | null): SeoMetaData {
  if (video) {
    return {
      title: formatSeoTitle(video.title, "Modern Fisheries"),
      description: formatSeoDescription(video.description),
      keywords: `${video.category}, aquaculture video, fish farming tutorial, modern fisheries`,
    };
  }

  switch (page) {
    case "ras":
      return {
        title: "Recirculating Aquaculture System (RAS) | Modern Fisheries", // 57 chars
        description: "Complete guide to Recirculating Aquaculture Systems (RAS). Master mechanical & biological filtration, oxygenation, stocking density, and commercial setups.", // 156 chars
        keywords: "RAS fish farming, recirculating aquaculture system, mechanical filtration, biofilter, indoor aquaculture, modern fisheries",
      };
    case "biofloc":
      return {
        title: "Biofloc Technology (BFT) Fish Farming | Modern Fisheries", // 56 chars
        description: "Master Biofloc Technology (BFT) fish culture. Learn carbon-nitrogen ratio calculations, floc management, aeration grid setup, and high-density tank setup.", // 154 chars
        keywords: "biofloc technology, BFT fish farming, carbon nitrogen ratio, floc volume, biofloc calculator, modern fisheries",
      };
    case "aquaponics":
      return {
        title: "Commercial Aquaponics Farming Systems | Modern Fisheries", // 56 chars
        description: "Integrated commercial Aquaponics guides combining aquaculture and hydroponic crop production. Learn dual-revenue sustainable farming setups & biofiltration.", // 155 chars
        keywords: "aquaponics farming, dual culture fish vegetables, deep water culture, media bed, aquaponics design",
      };
    case "hydroponics":
      return {
        title: "Hydroponic System Management & Nutrients | Modern Fisheries", // 58 chars
        description: "Comprehensive soil-less hydroponic farming guides. Master NFT channels, Deep Water Culture, custom nutrient solutions, EC/pH balance, and crop yields.", // 154 chars
        keywords: "hydroponics system, NFT hydroponics, nutrient film technique, DWC, EC pH balance, indoor farming",
      };
    case "pond":
      return {
        title: "Earthen Pond Fish Farming & Ecosystem | Modern Fisheries", // 56 chars
        description: "Comprehensive earthen pond fish culture guides. Master pond liming, organic fertilization, stocking density, water quality testing, and natural productivity.", // 158 chars
        keywords: "earthen pond fish culture, pond liming, plankton bloom, fish stocking density, pond management",
      };
    case "diseases":
      return {
        title: "Fish Disease Diagnosis & Prevention Guide | Modern Fisheries", // 60 chars
        description: "Identify and treat bacterial, parasitic, fungal, and viral fish diseases. Master biosecurity protocols, water parameter thresholds, and treatment dosages.", // 156 chars
        keywords: "fish diseases diagnosis, ich disease, tail rot, red spot disease, aquaculture biosecurity, fish treatment",
      };
    case "feed":
      return {
        title: "Aquaculture Feed Management & FCR Sizing | Modern Fisheries", // 58 chars
        description: "Optimize Feed Conversion Ratio (FCR) and fish nutrition. Detailed feeding rate charts, protein requirements, floating feed selection, and biomass growth.", // 154 chars
        keywords: "FCR calculator, fish feed management, protein percentage, floating fish feed, feeding rate chart",
      };
    case "calculators":
      return {
        title: "Aquaculture Calculators & FCR Sizing | Modern Fisheries", // 56 chars
        description: "Free online precision aquaculture calculators for fish farmers. Instant calculation tools for FCR, tank volume, biomass growth, C:N ratio, and feed rates.", // 155 chars
        keywords: "aquaculture calculator, FCR calculator, tank volume calculator, fish biomass calculator, stocking density",
      };
    case "services":
      return {
        title: "Aquaculture Consultancy & Feed Supply | Modern Fisheries", // 56 chars
        description: "Professional aquaculture consultancy services: turnkey RAS system design, commercial fish feed supply, certified seed distribution, and farm diagnostics.", // 154 chars
        keywords: "aquaculture consultancy, RAS design, fish feed supply, fish seeds supplier, farm setup, water testing, modern fisheries services",
      };
    case "about":
      return {
        title: "About Modern Fisheries | Aquaculture Solutions & Services", // 57 chars
        description: "Learn about Modern Fisheries - India's premier aquaculture portal offering turnkey RAS design, commercial fish feed supply, seed distribution & consultancy.", // 156 chars
        keywords: "about modern fisheries, aquaculture company india, modern farming, RAS design, aquaculture consultancy",
      };
    case "privacy":
      return {
        title: "Privacy Policy & Terms of Service | Modern Fisheries", // 52 chars
        description: "Official privacy policy, Google AdSense cookie disclosures, user data protection guidelines, and technical aquaculture disclaimers for Modern Fisheries.", // 152 chars
        keywords: "privacy policy, adsense disclosures, cookie policy, modern fisheries privacy",
      };
    case "videos":
      return {
        title: "Aquaculture Video Tutorials & Farm Guides | Modern Fisheries", // 59 chars
        description: "Watch high-definition aquaculture video tutorials on RAS design, Biofloc systems, Aquaponics, fish disease diagnosis, and feeding by Modern Fisheries.", // 153 chars
        keywords: "aquaculture videos, fish farming tutorials, biofloc video guide, modern fisheries videos",
      };
    case "faq":
      return {
        title: "Fish Farming FAQ & Knowledge Base Guide | Modern Fisheries", // 58 chars
        description: "Get expert answers to Frequently Asked Questions about Biofloc C:N ratios, RAS design, biofilter sizing, fish stocking density, and disease treatments.", // 152 chars
        keywords: "fish farming faq, biofloc questions, RAS design questions, fish disease treatment, FCR calculator, modern fisheries faq",
      };
    case "home":
    default:
      return {
        title: "Modern Fisheries | Turnkey RAS Design & Fish Feed Supply", // 56 chars
        description: "Premier online portal for turnkey RAS design, expert aquaculture consultancy, commercial fish feed supply, certified seeds, and precision calculation tools.", // 156 chars
        keywords: "modern fisheries, RAS design, aquaculture consultancy, fish feed supply, biofloc, aquaponics, hydroponics, fish farming india, FCR calculator",
      };
  }
}

export function updateSeoMetadata(page: PageType, video?: Video | null) {
  const meta = getSeoMetaData(page, video);

  // Update Title
  document.title = meta.title;

  // Update or create Description tag
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement("meta");
    descTag.setAttribute("name", "description");
    document.head.appendChild(descTag);
  }
  descTag.setAttribute("content", meta.description);

  // Update or create Keywords tag
  let kwTag = document.querySelector('meta[name="keywords"]');
  if (!kwTag) {
    kwTag = document.createElement("meta");
    kwTag.setAttribute("name", "keywords");
    document.head.appendChild(kwTag);
  }
  kwTag.setAttribute("content", meta.keywords);

  // Update OpenGraph Title & Description
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute("content", meta.title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement("meta");
    ogDesc.setAttribute("property", "og:description");
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute("content", meta.description);

  // Update Canonical link tag
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  const relativePath = getPathForPage(page, video);
  const fullUrl = `https://mf.owncircles.com${relativePath}`;
  canonical.setAttribute("href", fullUrl);
}
