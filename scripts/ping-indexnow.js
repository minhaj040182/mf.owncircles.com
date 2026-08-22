import fs from "node:fs";
import path from "node:path";

const INDEXNOW_KEY = "bfeda5c9d23544d5a837a93d5fe31830";
const HOST = "modernfisheriese.com";
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const LEGACY_PATHS = [
  "/home",
  "/aquaponic",
  "/ras-farming",
  "/recirculating",
  "/aquaponics-farming",
  "/aquaponic-farming",
  "/bioflock",
  "/biofloc-farming",
  "/hydroponic",
  "/hydroponics-farming",
  "/soilless",
  "/pond",
  "/diseases",
  "/feed",
  "/calculator",
  "/calc",
  "/services",
  "/shopping",
  "/shop",
  "/about",
  "/videos",
  "/faq",
  "/privacy",
];

function getCanonicalUrls() {
  const sitemapPath = path.resolve("dist/sitemap.xml");
  const fallbackPath = path.resolve("public/sitemap.xml");
  const targetPath = fs.existsSync(sitemapPath) ? sitemapPath : fallbackPath;

  if (!fs.existsSync(targetPath)) {
    throw new Error("Build the site before submitting IndexNow URLs: sitemap.xml is missing.");
  }

  const content = fs.readFileSync(targetPath, "utf8");
  return [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((match) => match[1]);
}

function verifyKeyFile() {
  const candidates = [
    path.resolve(`dist/${INDEXNOW_KEY}.txt`),
    path.resolve(`public/${INDEXNOW_KEY}.txt`),
  ];
  const keyPath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!keyPath || fs.readFileSync(keyPath, "utf8").trim() !== INDEXNOW_KEY) {
    throw new Error(`IndexNow verification file is missing or invalid: ${INDEXNOW_KEY}.txt`);
  }
}

function getSubmissionUrls() {
  const canonicalUrls = getCanonicalUrls();
  const retiredHtmlDuplicates = canonicalUrls
    .filter((url) => url !== `${BASE_URL}/`)
    .map((url) => `${url.replace(/\/$/, "")}.html`);
  const legacyUrls = LEGACY_PATHS.map((legacyPath) => `${BASE_URL}${legacyPath}`);
  return [...new Set([...canonicalUrls, ...retiredHtmlDuplicates, ...legacyUrls])];
}

async function submitIndexNow() {
  verifyKeyFile();
  const urlList = getSubmissionUrls();
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  console.log(`Submitting ${urlList.length} updated, redirected, and canonical URLs to IndexNow.`);
  console.log(`Key location: ${KEY_LOCATION}`);

  if (process.argv.includes("--dry-run")) {
    console.log("Dry run complete; no IndexNow request was sent.");
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  console.log(`IndexNow response: ${response.status} ${response.statusText}`);
  if (![200, 202].includes(response.status)) {
    const responseBody = await response.text();
    throw new Error(`IndexNow rejected the submission${responseBody ? `: ${responseBody}` : "."}`);
  }
}

submitIndexNow().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
