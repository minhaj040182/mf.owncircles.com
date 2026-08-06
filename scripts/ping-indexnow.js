import fs from 'fs';
import path from 'path';

const INDEXNOW_KEY = 'bfeda5c9d23544d5a837a93d5fe31830';
const HOST = 'mf.owncircles.com';
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

function getUrlsFromSitemap() {
  const sitemapPath = path.resolve('dist/sitemap.xml');
  const fallbackPath = path.resolve('public/sitemap.xml');
  const targetPath = fs.existsSync(sitemapPath) ? sitemapPath : fallbackPath;

  if (!fs.existsSync(targetPath)) {
    console.warn(`Sitemap not found at ${targetPath}. Using core static URLs.`);
    return [
      `${BASE_URL}/`,
      `${BASE_URL}/aquaponics-farming`,
      `${BASE_URL}/bioflock`,
      `${BASE_URL}/aquaponic`,
      `${BASE_URL}/hydroponic`,
      `${BASE_URL}/pond-farming`,
      `${BASE_URL}/fish-diseases`,
      `${BASE_URL}/feeding-management`,
      `${BASE_URL}/calculators`,
      `${BASE_URL}/ourservices`,
      `${BASE_URL}/about-us`,
      `${BASE_URL}/farming-videos`,
      `${BASE_URL}/frequently-asked-questions`,
      `${BASE_URL}/privacy-policy`
    ];
  }

  const content = fs.readFileSync(targetPath, 'utf-8');
  const urls = [];
  const regex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function submitIndexNow() {
  const urls = getUrlsFromSitemap();
  console.log(`\n🚀 Submitting ${urls.length} URLs to IndexNow for host: ${HOST}...`);
  console.log(`Key location: ${KEY_LOCATION}\n`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Pinging ${endpoint}...`);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
      console.log(`  └ Status: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error(`  └ Failed to submit to ${endpoint}:`, err.message);
    }
  }
  console.log('\n✓ IndexNow submission complete!\n');
}

submitIndexNow();
