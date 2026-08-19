import fs from 'fs';
import path from 'path';

/**
 * Modern Fisheries - Standalone XML Sitemap Generator
 * 
 * Generates an SEO-optimized sitemap.xml in compliance with sitemaps.org 0.9 schema.
 * Discovers and includes all primary sub-pages and video guides while strictly
 * excluding decommissioned PDF ebooks, legacy aliases, and 404/410 endpoints.
 */

const BASE_URL = 'https://modernfisheriese.com';
const TODAY = new Date().toISOString().split('T')[0];

// Helper for SEO Slug generation matching application routing
function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 1. Primary Canonical Sub-Pages
const PRIMARY_PAGES = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0',
    title: 'Modern Fisheries Home & Aquaculture Hub'
  },
  {
    path: '/aquaponics-farming',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Commercial Aquaponics Farming Systems'
  },
  {
    path: '/bioflock',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Biofloc Technology (BFT) Fish Farming'
  },
  {
    path: '/aquaponic',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Recirculating Aquaculture System (RAS)'
  },
  {
    path: '/hydroponic',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Hydroponic System Management & Nutrients'
  },
  {
    path: '/pond-farming',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Earthen Pond Fish Farming & Ecosystem'
  },
  {
    path: '/fish-diseases',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Fish Disease Diagnosis & Treatments'
  },
  {
    path: '/feeding-management',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Fish Feed Management & FCR Sizing'
  },
  {
    path: '/calculators',
    changefreq: 'weekly',
    priority: '0.95',
    title: 'Precision Aquaculture Calculators & FCR Sizing'
  },
  {
    path: '/ourservices',
    changefreq: 'monthly',
    priority: '0.85',
    title: 'Commercial Consultancy, Turnkey RAS & Feed Supply'
  },
  {
    path: '/about-us',
    changefreq: 'monthly',
    priority: '0.7',
    title: 'About Modern Fisheries'
  },
  {
    path: '/privacy-policy',
    changefreq: 'monthly',
    priority: '0.5',
    title: 'Privacy Policy & Terms of Service'
  },
  {
    path: '/farming-videos',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Aquaculture Video Tutorials & Farm Guides'
  },
  {
    path: '/frequently-asked-questions',
    changefreq: 'weekly',
    priority: '0.8',
    title: 'Aquaculture FAQ & Knowledge Base'
  }
];

// 2. Blacklist / Excluded URLs (Decommissioned PDFs, 404/410, and redirect aliases)
const EXCLUDED_PATTERNS = [
  /assets\/docs/i,
  /\.pdf$/i,
  /\/404/i,
  /\/410/i,
  /\/home$/i,
  /\/ras$/i,
  /\/biofloc$/i,
  /\/hydroponics$/i,
  /\/pond$/i,
  /\/diseases$/i,
  /\/feed$/i,
  /\/calculator$/i,
  /\/calc$/i,
  /\/services$/i,
  /\/shopping$/i,
  /\/shop$/i,
  /\/about$/i,
  /\/videos$/i,
  /\/faq$/i,
  /\/privacy$/i
];

// 3. Extract Video Sub-pages dynamically from src/data.ts
function extractVideos() {
  const dataPath = path.resolve('src/data.ts');
  if (!fs.existsSync(dataPath)) {
    console.warn('Warning: src/data.ts not found. Video routes skipped.');
    return [];
  }
  const content = fs.readFileSync(dataPath, 'utf-8');
  const videoList = [];
  const regex = /\{\s*id:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'](?:[\s\S]*?description:\s*["']([^"']+)["'])?(?:[\s\S]*?category:\s*["']([^"']+)["'])?/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    videoList.push({
      id: match[1],
      title: match[2],
      description: match[3] || '',
      category: match[4] || 'Aquaculture'
    });
  }
  return videoList;
}

function isUrlExcluded(url) {
  return EXCLUDED_PATTERNS.some((pattern) => pattern.test(url));
}

export function generateSitemap() {
  console.log('----------------------------------------------------');
  console.log('🚀 Modern Fisheries - Sitemap.xml Generator');
  console.log('----------------------------------------------------');

  const sitemapEntries = [];

  // Add Primary Pages
  PRIMARY_PAGES.forEach((page) => {
    const fullUrl = `${BASE_URL}${page.path === '/' ? '/' : page.path}`;
    if (!isUrlExcluded(fullUrl)) {
      sitemapEntries.push({
        loc: fullUrl,
        lastmod: TODAY,
        changefreq: page.changefreq,
        priority: page.priority,
        type: 'Page'
      });
    }
  });

  // Add Video Guides
  const videos = extractVideos();
  console.log(`✓ Found ${videos.length} aquaculture video tutorials in src/data.ts`);

  videos.forEach((v) => {
    const slug = createSlug(v.title);
    const videoUrl = `${BASE_URL}/video/${slug}-${v.id}`;
    if (!isUrlExcluded(videoUrl)) {
      sitemapEntries.push({
        loc: videoUrl,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.8',
        type: 'Video'
      });
    }
  });

  // Construct XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  sitemapEntries.forEach((entry) => {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  // Write to public/sitemap.xml
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml, 'utf-8');
  console.log(`✓ Generated: ${publicSitemapPath}`);

  // Write to dist/sitemap.xml if dist exists
  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xml, 'utf-8');
    console.log(`✓ Generated: ${distSitemapPath}`);
  }

  console.log('----------------------------------------------------');
  console.log(`✅ Successfully generated sitemap.xml with ${sitemapEntries.length} total indexable URLs:`);
  console.log(`   • ${PRIMARY_PAGES.length} Primary Pillar Pages`);
  console.log(`   • ${videos.length} Video Masterclass URLs`);
  console.log(`   • 0 Removed PDF/Legacy URLs (All strictly excluded)`);
  console.log('----------------------------------------------------');

  return xml;
}

// Execute if run directly via Node
if (process.argv[1] && process.argv[1].endsWith('generate-sitemap.js')) {
  generateSitemap();
}
