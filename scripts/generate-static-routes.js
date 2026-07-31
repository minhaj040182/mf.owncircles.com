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

const indexContent = fs.readFileSync(indexPath, 'utf-8');

// 1. Generate 404.html for GitHub Pages / static host SPA fallback
fs.writeFileSync(path.join(distDir, '404.html'), indexContent);
console.log('✓ Generated dist/404.html (GitHub Pages / SPA fallback)');

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
  const regex = /\{\s*id:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    videos.push({
      id: match[1],
      title: match[2],
    });
  }
  return videos;
}

const videos = extractVideos();
console.log(`✓ Found ${videos.length} videos for routing & sitemap generation.`);

// 2. Define main SEO pages
const mainPages = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/aquaponic', changefreq: 'weekly', priority: '0.9' },
  { path: '/bioflock', changefreq: 'weekly', priority: '0.9' },
  { path: '/aquaponics-farming', changefreq: 'weekly', priority: '0.9' },
  { path: '/hydroponic', changefreq: 'weekly', priority: '0.9' },
  { path: '/pond-farming', changefreq: 'weekly', priority: '0.9' },
  { path: '/fish-diseases', changefreq: 'weekly', priority: '0.9' },
  { path: '/feeding-management', changefreq: 'weekly', priority: '0.9' },
  { path: '/calculators', changefreq: 'weekly', priority: '0.9' },
  { path: '/ourservices', changefreq: 'monthly', priority: '0.8' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.8' },
  { path: '/farming-videos', changefreq: 'daily', priority: '0.8' },
  { path: '/frequently-asked-questions', changefreq: 'weekly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
];

// Generate static HTML folders for main pages
mainPages.forEach((page) => {
  if (page.path === '/') return;
  const routeName = page.path.replace(/^\//, '');
  const routeDir = path.join(distDir, routeName);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent);
  console.log(`✓ Generated static page route: dist/${routeName}/index.html`);
});

// Generate static HTML folders for video pages
const videoRoutes = [];
videos.forEach((v) => {
  const slug = createSlug(v.title);
  const fullSlugRoute = `video/${slug}-${v.id}`;
  const shortRoute = `video/${v.id}`;

  [fullSlugRoute, shortRoute].forEach((route) => {
    const routeDir = path.join(distDir, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent);
  });

  videoRoutes.push({
    path: `/${fullSlugRoute}`,
    changefreq: 'weekly',
    priority: '0.8',
  });

  console.log(`✓ Generated video route: dist/${fullSlugRoute}/index.html`);
});

// 3. Generate XML Sitemap
const allSitemapUrls = [...mainPages, ...videoRoutes];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

allSitemapUrls.forEach((item) => {
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${BASE_URL}${item.path}</loc>\n`;
  sitemapXml += `    <lastmod>${TODAY}</lastmod>\n`;
  sitemapXml += `    <changefreq>${item.changefreq}</changefreq>\n`;
  sitemapXml += `    <priority>${item.priority}</priority>\n`;
  sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>\n`;

// Write sitemap.xml to dist and public
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapXml);
console.log(`✓ Generated sitemap.xml with ${allSitemapUrls.length} indexed URLs in dist/sitemap.xml & public/sitemap.xml`);

// Ensure robots.txt is in dist
const publicRobotsPath = path.resolve('public/robots.txt');
if (fs.existsSync(publicRobotsPath)) {
  fs.copyFileSync(publicRobotsPath, path.join(distDir, 'robots.txt'));
  console.log('✓ Copied robots.txt to dist/robots.txt');
}

console.log('✓ All static SEO routes and Sitemap generation complete!');
