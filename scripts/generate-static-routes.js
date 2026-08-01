import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://mf.owncircles.com';
const TODAY = new Date().toISOString().split('T')[0];

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Error: index.html not found in dist directory.');
  process.exit(1);
}

const baseIndexHtml = fs.readFileSync(indexPath, 'utf-8');

// Helper for slug generation
function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract videos from src/data.ts
function extractVideos() {
  const dataPath = path.resolve('src/data.ts');
  if (!fs.existsSync(dataPath)) return [];
  const content = fs.readFileSync(dataPath, 'utf-8');
  const videos = [];
  const regex = /\{\s*id:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'](?:[\s\S]*?description:\s*["']([^"']+)["'])?(?:[\s\S]*?category:\s*["']([^"']+)["'])?/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    videos.push({
      id: match[1],
      title: match[2],
      description: match[3] || 'Aquaculture technical video guide produced by Modern Fisheries.',
      category: match[4] || 'Aquaculture',
    });
  }
  return videos;
}

const videos = extractVideos();
console.log(`✓ Extracted ${videos.length} videos from src/data.ts for SEO route generation.`);

// SEO Metadata Dictionary for Main Pages
const PAGE_METADATA = [
  {
    path: '/',
    canonical: `${BASE_URL}/`,
    title: 'Modern Fisheries | Fish Feed Supply & Seed Supplier | RAS Design, Biofloc & Aquaculture Consultancy',
    description: 'Modern Fisheries provides certified fish seed supplies, commercial fish feed supply, turnkey RAS design, expert aquaculture consultancy, Biofloc technology guides, Aquaponics, and precision feed calculation tools.',
    keywords: 'modern fisheries, RAS design, aquaculture consultancy, fish feed supply, fish seeds supplier, biofloc technology, recirculating aquaculture system, aquaponics, hydroponics, fish farming, fcr calculator',
    h1: 'Modern Fisheries - Turnkey Aquaculture Solutions & Consultancy',
    bodyText: 'Premier aquaculture portal for turn-key RAS design, professional aquaculture consultancy, high-protein fish feed supply, certified fish seeds, Biofloc technology guides, and precision farm calculation tools.',
    changefreq: 'daily',
    priority: '1.0',
    isPrimary: true
  },
  {
    path: '/aquaponics-farming',
    aliases: ['/aquaponics'],
    canonical: `${BASE_URL}/aquaponics-farming`,
    title: 'Aquaponics Farming Systems & Commercial Setup | Modern Fisheries',
    description: 'Integrated Aquaponics guides combining aquaculture and hydroponic crop production. Dual-revenue sustainable farming setups, bell siphon design, media beds, and DWC channels.',
    keywords: 'aquaponics farming, dual culture fish vegetables, deep water culture, bell siphon, media bed, aquaponics design, commercial aquaponics',
    h1: 'Aquaponics Farming Systems & Commercial Sizing',
    bodyText: 'Learn to design and construct high-efficiency commercial aquaponics systems integrating fish culture with soilless plant farming. Detailed calculations for stocking densities, biofilter media, and siphon mechanisms.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/bioflock',
    aliases: ['/biofloc-farming', '/biofloc'],
    canonical: `${BASE_URL}/bioflock`,
    title: 'Biofloc Technology (BFT) Fish Farming Guide & Setup | Modern Fisheries',
    description: 'Master Biofloc Technology (BFT) fish culture. Calculate C:N ratio, floc volume, molasses inoculation, aeration requirements, and high-density biofloc tank sizing.',
    keywords: 'biofloc technology, BFT fish farming, carbon nitrogen ratio, floc volume, biofloc calculator, tarpaulin tank, modern fisheries',
    h1: 'Biofloc Technology (BFT) High-Density Fish Farming',
    bodyText: 'Comprehensive technical handbook and tools for Biofloc technology. Calculate carbon-to-nitrogen ratios, maintain 15-25 ml/L floc volume, select aeration blowers, and manage probiotic water inoculation.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/aquaponic',
    aliases: ['/ras-farming', '/ras'],
    canonical: `${BASE_URL}/aquaponic`,
    title: 'Recirculating Aquaculture System (RAS) Design & Setup | Modern Fisheries',
    description: 'Complete guide to Recirculating Aquaculture Systems (RAS). Learn mechanical & biological filtration, oxygenation, stocking density, drum filters, biofilters, and commercial indoor setup.',
    keywords: 'RAS fish farming, recirculating aquaculture system, mechanical filtration, biofilter, drum filter, indoor aquaculture, modern fisheries',
    h1: 'Recirculating Aquaculture System (RAS) Design & Setup',
    bodyText: 'Turn-key indoor Recirculating Aquaculture System engineering. Includes drum filtration, MBBR biofilters, oxygen cones, UV sterilizers, degassers, and biosecurity protocols for commercial fish hatcheries.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/hydroponic',
    aliases: ['/hydroponics-farming', '/hydroponics'],
    canonical: `${BASE_URL}/hydroponic`,
    title: 'Hydroponics System Management & Nutrient Solutions | Modern Fisheries',
    description: 'Soil-less hydroponic farming guides. NFT channels, DWC technique, nutrient solution formulas, EC and pH balancing, and commercial crop production.',
    keywords: 'hydroponics system, NFT hydroponics, nutrient film technique, DWC, EC pH balance, indoor farming, soilless culture, modern fisheries',
    h1: 'Hydroponics System Management & Nutrient Balancing',
    bodyText: 'Master commercial hydroponics production using NFT channels and Deep Water Culture (DWC). Guidance on nutrient A/B formulation, electrical conductivity (EC) control, and pH stabilization.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/pond-farming',
    aliases: ['/pond'],
    canonical: `${BASE_URL}/pond-farming`,
    title: 'Earthen Pond Fish Farming & Ecosystem Management | Modern Fisheries',
    description: 'Comprehensive pond fish culture guides: liming, organic fertilization, stocking density, water quality testing, plankton bloom, and natural productivity optimization.',
    keywords: 'earthen pond fish culture, pond liming, plankton bloom, fish stocking density, pond management, rohu carp tilapia, modern fisheries',
    h1: 'Earthen Pond Fish Farming & Water Management',
    bodyText: 'Step-by-step guides for earthen pond construction, soil liming, organic manuring, natural plankton culture, multi-species carp stocking, and harvest management.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/fish-diseases',
    aliases: ['/diseases'],
    canonical: `${BASE_URL}/fish-diseases`,
    title: 'Fish Disease Diagnosis, Prevention & Treatment | Modern Fisheries',
    description: 'Identify and treat bacterial, parasitic, fungal, and viral fish diseases. Biosecurity protocols, water parameter thresholds, and treatment dosages for commercial aquaculture.',
    keywords: 'fish diseases diagnosis, ich disease, tail rot, red spot disease, aquaculture biosecurity, fish treatment, water quality',
    h1: 'Fish Disease Diagnosis & Pathogen Treatment Guide',
    bodyText: 'Diagnostic tools and treatment protocols for common freshwater fish diseases including White Spot (Ich), Gill Flukes, Bacterial Tail Rot, Saprolegnia Fungal infections, and Ammonia Toxicity.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/feeding-management',
    aliases: ['/feed'],
    canonical: `${BASE_URL}/feeding-management`,
    title: 'Aquaculture Feed Management & FCR Optimization | Modern Fisheries',
    description: 'Optimize Feed Conversion Ratio (FCR) and fish nutrition. Feeding rate charts, protein requirements, floating vs sinking feed, and biomass growth calculations.',
    keywords: 'FCR calculator, fish feed management, protein percentage, floating fish feed, feeding rate chart, feed supply, modern fisheries',
    h1: 'Aquaculture Feed Management & FCR Sizing',
    bodyText: 'Professional feeding management guides. Calculate body-weight feeding percentages, crude protein requirements across growth stages, and optimize Feed Conversion Ratios (FCR) for higher profitability.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/calculators',
    canonical: `${BASE_URL}/calculators`,
    title: 'Aquaculture Calculators: FCR, Tank Volume & Stocking Density | Modern Fisheries',
    description: 'Free online aquaculture calculators for fish farmers: FCR, tank volume, biomass growth, C:N ratio, stocking rate, and feed requirement tools.',
    keywords: 'aquaculture calculator, FCR calculator, tank volume calculator, fish biomass calculator, stocking density, biofloc C:N calculator',
    h1: 'Precision Aquaculture Calculators & Engineering Tools',
    bodyText: 'Interactive calculators for aquaculture practitioners: Feed Conversion Ratio (FCR) solver, biofloc C:N ratio balance, circular & rectangular tank volume, stocking density, and daily feed charts.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/ourservices',
    aliases: ['/services'],
    canonical: `${BASE_URL}/ourservices`,
    title: 'Aquaculture Consultancy, RAS Design & Commercial Fish Feed Supply | Modern Fisheries',
    description: 'Professional aquaculture consultancy services: turn-key RAS design, commercial fish feed supply, certified fish seed distribution, disease diagnostics, and farm setup.',
    keywords: 'aquaculture consultancy, RAS design, fish feed supply, fish seeds supplier, farm setup, water testing, modern fisheries services',
    h1: 'Turn-key Aquaculture Consultancy & Feed Supply Services',
    bodyText: 'Modern Fisheries provides commercial consultation, certified fingerlings & seeds, premium floating fish feed distribution, water quality laboratory analysis, and custom RAS system fabrication.',
    changefreq: 'monthly',
    priority: '0.8',
    isPrimary: true
  },
  {
    path: '/about-us',
    aliases: ['/about'],
    canonical: `${BASE_URL}/about-us`,
    title: 'About Modern Fisheries | Premier Aquaculture Solutions & Consultancy',
    description: "Learn about Modern Fisheries - India's leading aquaculture innovation portal, offering turn-key RAS design, commercial fish feed supply, technical training, and modern farming solutions.",
    keywords: 'about modern fisheries, aquaculture company india, modern farming, RAS design, aquaculture consultancy',
    h1: 'About Modern Fisheries',
    bodyText: 'Modern Fisheries is a leading technology-driven aquaculture innovation platform providing sustainable fish farming systems, technical education, certified inputs, and commercial farm setup guidance.',
    changefreq: 'monthly',
    priority: '0.8',
    isPrimary: true
  },
  {
    path: '/farming-videos',
    aliases: ['/videos'],
    canonical: `${BASE_URL}/farming-videos`,
    title: 'Aquaculture Video Tutorials & Technical Guides | Modern Fisheries',
    description: 'Watch high-definition video tutorials on RAS design, Biofloc, Aquaponics, Fish Health, and Feeding Strategies produced by Modern Fisheries.',
    keywords: 'aquaculture videos, fish farming tutorials, biofloc video guide, modern fisheries videos',
    h1: 'Aquaculture Technical Video Library',
    bodyText: 'Explore practical video masterclasses covering pond harvesting, biofloc tank preparation, roots blower aeration grid setup, drum filter fabrication, and fish feeding techniques.',
    changefreq: 'daily',
    priority: '0.8',
    isPrimary: true
  },
  {
    path: '/frequently-asked-questions',
    aliases: ['/faq'],
    canonical: `${BASE_URL}/frequently-asked-questions`,
    title: 'Fish Farming FAQ & Aquaculture Knowledge Base | Modern Fisheries',
    description: 'Frequently Asked Questions about Biofloc C:N ratios, RAS design & biofiltration, fish stocking densities, disease management, and feed schedules.',
    keywords: 'fish farming faq, biofloc questions, RAS design questions, fish disease treatment, FCR calculator, modern fisheries faq',
    h1: 'Aquaculture Knowledge Base & FAQ',
    bodyText: 'Get expert answers to common questions regarding biofloc C:N ratio calculations, RAS biofilter sizing, oxygen levels, feed conversion optimization, and disease treatments.',
    changefreq: 'weekly',
    priority: '0.8',
    isPrimary: true
  },
  {
    path: '/privacy-policy',
    aliases: ['/privacy'],
    canonical: `${BASE_URL}/privacy-policy`,
    title: 'Privacy Policy & AdSense Disclosures | Modern Fisheries',
    description: 'Privacy policy, Google AdSense cookie disclosures, data protection guidelines, and technical aquaculture disclaimers for Modern Fisheries.',
    keywords: 'privacy policy, adsense disclosures, cookie policy, modern fisheries privacy',
    h1: 'Privacy Policy & Terms of Service',
    bodyText: 'Our privacy commitment, data protection guidelines, technical disclaimers, and Google AdSense cookie compliance statements.',
    changefreq: 'yearly',
    priority: '0.3',
    isPrimary: true
  }
];

// Function to generate customized HTML string for a page
function renderCustomPageHtml(baseHtml, meta) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`);

  // Replace Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(meta.description)}" />\n</head>`);
  }

  // Replace Keywords
  if (html.includes('<meta name="keywords"')) {
    html = html.replace(/<meta name="keywords" content=".*?" \/>/s, `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="keywords" content="${escapeHtml(meta.keywords)}" />\n</head>`);
  }

  // Replace Canonical URL
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${meta.canonical}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${meta.canonical}" />\n</head>`);
  }

  // Replace Open Graph Tags
  if (html.includes('<meta property="og:title"')) {
    html = html.replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  }
  if (html.includes('<meta property="og:description"')) {
    html = html.replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  }
  if (html.includes('<meta property="og:url"')) {
    html = html.replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${meta.canonical}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:url" content="${meta.canonical}" />\n</head>`);
  }

  // Pre-render lightweight semantic HTML inside <div id="root">
  const rootContent = `
    <div id="root">
      <div style="max-w-4xl:800px;margin:0 auto;padding:32px 16px;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
        <h1 style="font-size:28px;font-weight:700;color:#0f172a;margin-bottom:12px;">${escapeHtml(meta.h1 || meta.title)}</h1>
        <p style="font-size:16px;color:#475569;margin-bottom:24px;">${escapeHtml(meta.bodyText || meta.description)}</p>
      </div>
    </div>`.trim();

  html = html.replace(/<div id="root"><\/div>/s, rootContent);

  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Function to generate 301-style HTML redirect for alias routes to avoid duplicate title tags in search engines
function renderRedirectPageHtml(primaryCanonical, pageTitle) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Redirecting to ${escapeHtml(pageTitle)}</title>
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0;url=${primaryCanonical}" />
    <link rel="canonical" href="${primaryCanonical}" />
    <script type="text/javascript">
      window.location.replace("${primaryCanonical}");
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="${primaryCanonical}">${escapeHtml(pageTitle)}</a>...</p>
  </body>
</html>`;
}

// 1. Generate 404.html for GitHub Pages / static host SPA fallback
fs.writeFileSync(path.join(distDir, '404.html'), baseIndexHtml);
console.log('✓ Generated dist/404.html (GitHub Pages / SPA fallback)');

// 2. Generate static HTML folders for all main pages & aliases
const sitemapUrls = [];

PAGE_METADATA.forEach((page) => {
  // Primary route
  if (page.path === '/') {
    // Overwrite dist/index.html with root SEO metadata
    const customRootHtml = renderCustomPageHtml(baseIndexHtml, page);
    fs.writeFileSync(indexPath, customRootHtml);
  } else {
    const routeName = page.path.replace(/^\//, '');
    const routeDir = path.join(distDir, routeName);
    fs.mkdirSync(routeDir, { recursive: true });

    const customHtml = renderCustomPageHtml(baseIndexHtml, page);
    fs.writeFileSync(path.join(routeDir, 'index.html'), customHtml);
    console.log(`✓ Generated primary static route: dist/${routeName}/index.html`);
  }

  // Generate 301 redirects for aliases so search engine crawlers don't flag duplicate titles
  if (page.aliases && page.aliases.length > 0) {
    page.aliases.forEach((aliasPath) => {
      const aliasName = aliasPath.replace(/^\//, '');
      const aliasDir = path.join(distDir, aliasName);
      fs.mkdirSync(aliasDir, { recursive: true });

      const redirectHtml = renderRedirectPageHtml(page.canonical, page.title);
      fs.writeFileSync(path.join(aliasDir, 'index.html'), redirectHtml);
      console.log(`✓ Generated alias redirect (no-duplicate): dist/${aliasName}/index.html -> ${page.canonical}`);
    });
  }

  // Add primary page URL to sitemap
  sitemapUrls.push({
    url: page.canonical,
    changefreq: page.changefreq,
    priority: page.priority
  });
});

// 3. Generate static HTML folders for video pages (full slug primary, short alias redirect)
videos.forEach((v) => {
  const slug = createSlug(v.title);
  const fullSlugRoute = `video/${slug}-${v.id}`;
  const shortRoute = `video/${v.id}`;
  const videoCanonical = `${BASE_URL}/${fullSlugRoute}`;

  const videoMeta = {
    title: `${v.title} | Modern Fisheries Video Guides`,
    description: v.description || 'Watch expert aquaculture video guide produced by Modern Fisheries.',
    keywords: `${v.category}, aquaculture video, fish farming tutorial, modern fisheries`,
    canonical: videoCanonical,
    h1: v.title,
    bodyText: v.description
  };

  // Primary full slug video page
  const customVideoHtml = renderCustomPageHtml(baseIndexHtml, videoMeta);
  const primaryVideoDir = path.join(distDir, fullSlugRoute);
  fs.mkdirSync(primaryVideoDir, { recursive: true });
  fs.writeFileSync(path.join(primaryVideoDir, 'index.html'), customVideoHtml);

  // Short ID alias redirect to primary slug URL
  const shortVideoDir = path.join(distDir, shortRoute);
  fs.mkdirSync(shortVideoDir, { recursive: true });
  const redirectVideoHtml = renderRedirectPageHtml(videoCanonical, v.title);
  fs.writeFileSync(path.join(shortVideoDir, 'index.html'), redirectVideoHtml);

  sitemapUrls.push({
    url: videoCanonical,
    changefreq: 'weekly',
    priority: '0.8'
  });

  console.log(`✓ Generated video route: dist/${fullSlugRoute}/index.html`);
});

// 4. Generate XML Sitemap
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

sitemapUrls.forEach((item) => {
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${item.url}</loc>\n`;
  sitemapXml += `    <lastmod>${TODAY}</lastmod>\n`;
  sitemapXml += `    <changefreq>${item.changefreq}</changefreq>\n`;
  sitemapXml += `    <priority>${item.priority}</priority>\n`;
  sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>\n`;

// Write sitemap.xml to dist and public
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapXml);
console.log(`✓ Generated sitemap.xml with ${sitemapUrls.length} indexed URLs in dist/sitemap.xml & public/sitemap.xml`);

// 5. Ensure robots.txt is in dist
const publicRobotsPath = path.resolve('public/robots.txt');
if (fs.existsSync(publicRobotsPath)) {
  fs.copyFileSync(publicRobotsPath, path.join(distDir, 'robots.txt'));
  console.log('✓ Copied robots.txt to dist/robots.txt');
}

console.log('✓ All static SEO routes, unique metadata, and Sitemap generation complete!');
