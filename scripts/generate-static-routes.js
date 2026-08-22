import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = "https://modernfisheriese.com";
const distDir = path.resolve("dist");
const shellPath = path.join(distDir, "index.html");
const serverBundle = path.resolve(".ssr/entry-server.js");

if (!fs.existsSync(shellPath) || !fs.existsSync(serverBundle)) {
  throw new Error("Client or server build is missing. Run the complete build command.");
}

const shell = fs.readFileSync(shellPath, "utf8");
const { render, getDocumentData, getStaticPaths } = await import(pathToFileURL(serverBundle).href);

function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function createHead(data) {
  const robots = data.noindex ? "noindex, follow" : "index, follow, max-image-preview:large";
  const jsonLd = JSON.stringify(data.structuredData).replace(/</g, "\\u003c");
  return `
    <meta name="description" content="${escapeAttribute(data.description)}" />
    <meta name="keywords" content="${escapeAttribute(data.keywords)}" />
    <meta name="robots" content="${robots}" />
    <meta name="googlebot" content="${robots}" />
    <link rel="canonical" href="${escapeAttribute(data.canonical)}" />
    <meta property="og:type" content="${data.page === "videos" ? "video.other" : "website"}" />
    <meta property="og:site_name" content="Modern Fisheries" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="${escapeAttribute(data.title)}" />
    <meta property="og:description" content="${escapeAttribute(data.description)}" />
    <meta property="og:url" content="${escapeAttribute(data.canonical)}" />
    <meta property="og:image" content="${escapeAttribute(data.image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(data.title)}" />
    <meta name="twitter:description" content="${escapeAttribute(data.description)}" />
    <meta name="twitter:image" content="${escapeAttribute(data.image)}" />
    <script type="application/ld+json">${jsonLd}</script>`;
}

function createDocument(urlPath) {
  const data = getDocumentData(urlPath);
  const appHtml = render(urlPath);
  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(data.title)}</title>`)
    .replace(
      /<!--static-head-start-->[\s\S]*?<!--static-head-end-->/,
      `<!--static-head-start-->${createHead(data)}<!--static-head-end-->`,
    )
    .replace(
      /<!--static-page-start-->[\s\S]*?<!--static-page-end-->/,
      `<!--static-page-start--><div id="static-page" data-path="${escapeAttribute(urlPath)}">${appHtml}</div><!--static-page-end-->`,
    );
}

function writeRoute(urlPath, html) {
  if (urlPath === "/") {
    fs.writeFileSync(shellPath, html);
    return;
  }
  const relative = urlPath.replace(/^\//, "");
  const routeDir = path.join(distDir, relative);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, "index.html"), html);
}

const paths = getStaticPaths();
for (const urlPath of paths) writeRoute(urlPath, createDocument(urlPath));

// Consolidate previously published .html duplicates into their clean canonical URLs.
const redirectsPath = path.join(distDir, "_redirects");
if (fs.existsSync(redirectsPath)) {
  const legacyHtmlRedirects = paths
    .filter((urlPath) => urlPath !== "/")
    .map((urlPath) => `${urlPath}.html  ${urlPath}  301!`)
    .join("\n");
  fs.appendFileSync(redirectsPath, `\n# Previously generated duplicate HTML files\n${legacyHtmlRedirects}\n`);
}

// Keep the repository root index.html as a complete, readable Home document too.
// Vite still transforms its /src/main.tsx reference during production builds.
const sourceIndexPath = path.resolve("index.html");
const sourceIndex = fs.readFileSync(sourceIndexPath, "utf8");
const sourceHomeHtml = render("/");
const sourceHomeData = getDocumentData("/");
const populatedSourceIndex = sourceIndex
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(sourceHomeData.title)}</title>`)
  .replace(
    /<!--static-head-start-->[\s\S]*?<!--static-head-end-->/,
    `<!--static-head-start-->${createHead(sourceHomeData)}<!--static-head-end-->`,
  )
  .replace(
    /<!--static-page-start-->[\s\S]*?<!--static-page-end-->/,
    `<!--static-page-start--><div id="static-page" data-path="/">${sourceHomeHtml}</div><!--static-page-end-->`,
  );
fs.writeFileSync(sourceIndexPath, populatedSourceIndex);

writeRoute("/404", createDocument("/404"));
writeRoute("/410", createDocument("/410"));
fs.copyFileSync(path.join(distDir, "404", "index.html"), path.join(distDir, "404.html"));
fs.copyFileSync(path.join(distDir, "410", "index.html"), path.join(distDir, "410.html"));

const logoSource = path.resolve("logo1.png");
if (fs.existsSync(logoSource)) fs.copyFileSync(logoSource, path.join(distDir, "logo1.png"));

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...paths.map((urlPath) => {
    const data = getDocumentData(urlPath);
    const priority = urlPath === "/" ? "1.0" : urlPath.startsWith("/video/") ? "0.6" : "0.8";
    const frequency = urlPath === "/" || urlPath === "/videos" ? "weekly" : "monthly";
    return `  <url><loc>${data.canonical}</loc><lastmod>${today}</lastmod><changefreq>${frequency}</changefreq><priority>${priority}</priority></url>`;
  }),
  "</urlset>",
  "",
].join("\n");
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.resolve("public/sitemap.xml"), sitemap);

console.log(`Generated ${paths.length} crawler-visible static pages plus 404 and 410 documents.`);
