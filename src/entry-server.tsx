import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { ALL_VIDEOS } from "./data";
import { FAQ_DATA } from "./components/FaqSection";
import { getPathForPage, getSeoMetaData, parseUrlPath, type PageType } from "./utils/seoRouting";

const SITE_URL = "https://modernfisheriese.com";

const pageNames: Record<PageType, string> = {
  home: "Modern Fisheries",
  ras: "Recirculating Aquaculture Systems",
  biofloc: "Biofloc Fish Farming",
  aquaponics: "Aquaponics Farming",
  hydroponics: "Hydroponics Farming",
  pond: "Pond Fish Farming",
  diseases: "Fish Diseases",
  feed: "Feeding Management",
  calculators: "Aquaculture Calculators",
  services: "Aquaculture Services",
  videos: "Aquaculture Videos",
  faq: "Fish Farming FAQ",
  about: "About Modern Fisheries",
  privacy: "Privacy Policy",
  "404": "Page Not Found",
  "410": "Resource Gone",
};

export function render(path: string) {
  return renderToString(<App initialPath={path} />);
}

export function getStaticPaths() {
  const mainPaths = [
    "/", "/ras-farming", "/bioflock", "/aquaponics-farming", "/hydroponic",
    "/pond-farming", "/fish-diseases", "/feeding-management", "/calculators",
    "/services", "/videos", "/faq", "/about-us", "/privacy-policy",
  ];
  const videoPaths = ALL_VIDEOS.map((video) => getPathForPage("videos", video));
  return [...mainPaths, ...videoPaths];
}

export function getDocumentData(path: string) {
  const route = parseUrlPath(path, ALL_VIDEOS);
  const meta = getSeoMetaData(route.page, route.video);
  const canonicalPath = getPathForPage(route.page, route.video);
  const canonical = `${SITE_URL}${canonicalPath}`;
  const pageName = route.video?.title || pageNames[route.page];
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Modern Fisheries",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo1.png`,
      email: "mf@owncircles.com",
      telephone: "+91-97489-52342",
      sameAs: [
        "https://www.youtube.com/channel/UChChDXzRMI9g1lgcTo5KA3A",
        "https://www.facebook.com/modernfisheries/",
      ],
    },
    {
      "@type": route.page === "services" ? "Service" : route.video ? "VideoObject" : "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: pageName,
      description: meta.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      provider: { "@id": `${SITE_URL}/#organization` },
      ...(route.video ? {
        thumbnailUrl: route.video.thumbnail,
        embedUrl: route.video.videoUrl,
        uploadDate: route.video.publishDate,
      } : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: canonicalPath === "/" ? [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      ] : [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: pageName, item: canonical },
      ],
    },
  ];

  if (route.page === "faq") {
    graph.push({
      "@type": "FAQPage",
      mainEntity: FAQ_DATA.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return {
    ...meta,
    page: route.page,
    canonical,
    canonicalPath,
    noindex: route.page === "404" || route.page === "410",
    image: route.video?.thumbnail || `${SITE_URL}/logo1.png`,
    structuredData: { "@context": "https://schema.org", "@graph": graph },
  };
}
