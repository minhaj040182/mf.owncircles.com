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
  ras: "/recirculating-aquaculture-system",
  biofloc: "/biofloc-technology",
  aquaponics: "/aquaponics-farming",
  hydroponics: "/hydroponics-system",
  pond: "/pond-farming",
  diseases: "/fish-diseases",
  feed: "/feeding-management",
  calculators: "/aquaculture-calculators",
  services: "/aquaculture-services",
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

export function parseUrlPath(pathname: string, allVideos: Video[]): { page: PageType; video: Video | null } {
  const normalized = pathname.trim().toLowerCase();

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
  if (normalized.includes("recirculating") || normalized.includes("ras")) return { page: "ras", video: null };
  if (normalized.includes("biofloc")) return { page: "biofloc", video: null };
  if (normalized.includes("aquaponics")) return { page: "aquaponics", video: null };
  if (normalized.includes("hydroponics")) return { page: "hydroponics", video: null };
  if (normalized.includes("pond")) return { page: "pond", video: null };
  if (normalized.includes("disease")) return { page: "diseases", video: null };
  if (normalized.includes("feed")) return { page: "feed", video: null };
  if (normalized.includes("calculator")) return { page: "calculators", video: null };
  if (normalized.includes("service")) return { page: "services", video: null };
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

export function getSeoMetaData(page: PageType, video?: Video | null): SeoMetaData {
  if (video) {
    return {
      title: `${video.title} | Modern Fisheries Video Guides`,
      description: (video.description || "Watch expert aquaculture video guide by Modern Fisheries").slice(0, 160),
      keywords: `${video.category}, aquaculture video, fish farming tutorial, modern fisheries`,
    };
  }

  switch (page) {
    case "ras":
      return {
        title: "Recirculating Aquaculture System (RAS) Design & Setup | Modern Fisheries",
        description: "Complete guide to Recirculating Aquaculture Systems (RAS). Learn mechanical & biological filtration, oxygenation, stocking density, and commercial setup.",
        keywords: "RAS fish farming, recirculating aquaculture system, mechanical filtration, biofilter, indoor aquaculture, modern fisheries",
      };
    case "biofloc":
      return {
        title: "Biofloc Technology (BFT) Fish Farming Guide | Modern Fisheries",
        description: "Master Biofloc Technology (BFT) fish culture. Calculate C:N ratio, floc volume, aeration requirements, and high-density biofloc tank sizing.",
        keywords: "biofloc technology, BFT fish farming, carbon nitrogen ratio, floc volume, biofloc calculator, modern fisheries",
      };
    case "aquaponics":
      return {
        title: "Aquaponics Farming Systems & Commercial Sizing | Modern Fisheries",
        description: "Integrated Aquaponics guides combining aquaculture and hydroponic crop production. Dual-revenue sustainable farming setups and biofiltration.",
        keywords: "aquaponics farming, dual culture fish vegetables, deep water culture, media bed, aquaponics design",
      };
    case "hydroponics":
      return {
        title: "Hydroponics System Management & Nutrients | Modern Fisheries",
        description: "Soil-less hydroponic farming guides. NFT, DWC, nutrient solutions, EC/pH balancing, and commercial crop production.",
        keywords: "hydroponics system, NFT hydroponics, nutrient film technique, DWC, EC pH balance, indoor farming",
      };
    case "pond":
      return {
        title: "Earthen Pond Fish Farming & Ecosystem Management | Modern Fisheries",
        description: "Comprehensive pond fish culture guides: liming, fertilization, stocking density, water quality testing, and natural productivity optimization.",
        keywords: "earthen pond fish culture, pond liming, plankton bloom, fish stocking density, pond management",
      };
    case "diseases":
      return {
        title: "Fish Disease Diagnosis, Prevention & Treatment | Modern Fisheries",
        description: "Identify and treat bacterial, parasitic, fungal, and viral fish diseases. Biosecurity protocols, water parameter thresholds, and treatment dosages.",
        keywords: "fish diseases diagnosis, ich disease, tail rot, red spot disease, aquaculture biosecurity, fish treatment",
      };
    case "feed":
      return {
        title: "Aquaculture Feed Management & FCR Optimization | Modern Fisheries",
        description: "Optimize Feed Conversion Ratio (FCR) and fish nutrition. Feeding rate charts, protein requirements, floating vs sinking feed, and biomass calculations.",
        keywords: "FCR calculator, fish feed management, protein percentage, floating fish feed, feeding rate chart",
      };
    case "calculators":
      return {
        title: "Aquaculture Calculators: FCR, Tank Volume & Stocking Density | Modern Fisheries",
        description: "Free online aquaculture calculators for fish farmers: FCR, tank volume, biomass growth, C:N ratio, stocking rate, and feed requirement tools.",
        keywords: "aquaculture calculator, FCR calculator, tank volume calculator, fish biomass calculator, stocking density",
      };
    case "services":
      return {
        title: "Aquaculture Consultancy, RAS Design & Fish Feed Supply | Modern Fisheries",
        description: "Professional aquaculture consultancy services: turn-key RAS design, commercial fish feed supply, certified fish seed distribution, disease diagnostics, and farm setup.",
        keywords: "aquaculture consultancy, RAS design, fish feed supply, fish seeds supplier, farm setup, water testing, modern fisheries services",
      };
    case "about":
      return {
        title: "About Modern Fisheries | Premier Aquaculture Solutions & Consultancy",
        description: "Learn about Modern Fisheries - India's leading aquaculture innovation portal, offering turn-key RAS design, commercial fish feed supply, technical training, and modern farming solutions.",
        keywords: "about modern fisheries, aquaculture company india, modern farming, RAS design, aquaculture consultancy",
      };
    case "privacy":
      return {
        title: "Privacy Policy & AdSense Disclosures | Modern Fisheries",
        description: "Privacy policy, Google AdSense cookie disclosures, data protection guidelines, and technical aquaculture disclaimers for Modern Fisheries.",
        keywords: "privacy policy, adsense disclosures, cookie policy, modern fisheries privacy",
      };
    case "videos":
      return {
        title: "Aquaculture Video Tutorials & Technical Guides | Modern Fisheries",
        description: "Watch high-definition video tutorials on RAS design, Biofloc, Aquaponics, Fish Health, and Feeding Strategies produced by Modern Fisheries.",
        keywords: "aquaculture videos, fish farming tutorials, biofloc video guide, modern fisheries videos",
      };
    case "faq":
      return {
        title: "Fish Farming FAQ & Aquaculture Knowledge Base | Modern Fisheries",
        description: "Frequently Asked Questions about Biofloc C:N ratios, RAS design & biofiltration, fish stocking densities, disease management, and feed schedules.",
        keywords: "fish farming faq, biofloc questions, RAS design questions, fish disease treatment, FCR calculator, modern fisheries faq",
      };
    case "home":
    default:
      return {
        title: "Modern Fisheries | RAS Design, Aquaculture Consultancy & Fish Feed Supply",
        description: "Modern Fisheries is your premier destination for turn-key RAS design, professional aquaculture consultancy, commercial fish feed supply, certified fish seeds, Biofloc technology guides, and precision tools.",
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
  const fullUrl = `${window.location.origin}${getPathForPage(page, video)}`;
  canonical.setAttribute("href", fullUrl);
}
