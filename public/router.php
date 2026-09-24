<?php
/**
 * Server-Side HTTP Route & Status Code Resolver
 * Correctly distinguishes:
 * - 200 OK: Published articles, SPA application routes, and assets
 * - 410 Gone: Permanently deleted articles and legacy slugs (No redirect!)
 * - 301 Moved Permanently: Explicitly mapped replacement URLs
 * - 404 Not Found: Unknown paths that never existed
 */

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($requestUri, PHP_URL_PATH) ?? '/';

// Trailing slash normalization: 301 redirect paths ending with slash (except root)
if ($path !== '/' && substr($path, -1) === '/') {
    $cleanPath = rtrim($path, '/');
    $query = parse_url($requestUri, PHP_URL_QUERY);
    $target = $cleanPath . ($query ? '?' . $query : '');
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $target, true, 301);
    exit;
}

$slug = trim($path, '/');

// Load registry of deleted slugs and replacements
$configPath = __DIR__ . '/deleted_slugs.json';
$deletedSlugs = [
    'vehicles-shane-van-gisbergen-on-difference-between-racing-supercars-and-nascar',
    'faltu-engineers-ep01-desi-dan-bilzenian',
    'attendance-system-smart-emp-lets-explore',
    'restoring-your-core-strength-after-pregnancy-a-gradual-and-safe-approach'
];
$deletedPrefixes = ['vehicles-'];
$redirects = [];

if (file_exists($configPath)) {
    $config = json_decode(file_get_contents($configPath), true);
    if (!empty($config['deletedSlugs'])) {
        $deletedSlugs = $config['deletedSlugs'];
    }
    if (!empty($config['deletedPrefixes'])) {
        $deletedPrefixes = $config['deletedPrefixes'];
    }
    if (!empty($config['redirects'])) {
        $redirects = $config['redirects'];
    }
}

// 1. Check for mapped 301 redirects to replacement articles
if (isset($redirects[$slug])) {
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $redirects[$slug], true, 301);
    exit;
}

// 2. Check for 410 Gone deleted articles
$isDeleted = in_array($slug, $deletedSlugs, true);
if (!$isDeleted) {
    foreach ($deletedPrefixes as $prefix) {
        if (strpos($slug, $prefix) === 0) {
            $isDeleted = true;
            break;
        }
    }
}

if ($isDeleted) {
    require __DIR__ . '/410_gone.php';
    exit;
}

// 3. Direct Static Crawler Files (sitemap.xml & robots.txt) with strict MIME types
if ($slug === 'sitemap.xml') {
    $sitemapPath = file_exists(__DIR__ . '/sitemap.xml') ? (__DIR__ . '/sitemap.xml') : (dirname(__DIR__) . '/public/sitemap.xml');
    if (file_exists($sitemapPath)) {
        header('Content-Type: application/xml; charset=UTF-8');
        header('X-Robots-Tag: noindex, follow');
        readfile($sitemapPath);
        exit;
    }
}

if ($slug === 'robots.txt') {
    $robotsPath = file_exists(__DIR__ . '/robots.txt') ? (__DIR__ . '/robots.txt') : (dirname(__DIR__) . '/public/robots.txt');
    if (file_exists($robotsPath)) {
        header('Content-Type: text/plain; charset=UTF-8');
        readfile($robotsPath);
        exit;
    }
}

if ($slug === 'ads.txt') {
    $adsPath = file_exists(__DIR__ . '/ads.txt') ? (__DIR__ . '/ads.txt') : (dirname(__DIR__) . '/public/ads.txt');
    if (file_exists($adsPath)) {
        header('Content-Type: text/plain; charset=UTF-8');
        readfile($adsPath);
        exit;
    }
}

// 4. Known valid routes -> Serve React SPA with 200 OK & Dynamic Server-Side Meta / Canonical Injection
$validAppRoutes = [
    '',
    'privacy-policy',
    'terms',
    'about',
    'contact'
];

$indexFile = null;
if (file_exists(__DIR__ . '/index.html')) {
    $indexFile = __DIR__ . '/index.html';
} elseif (file_exists(__DIR__ . '/../index.html')) {
    $indexFile = __DIR__ . '/../index.html';
} elseif (file_exists(__DIR__ . '/dist/index.html')) {
    $indexFile = __DIR__ . '/dist/index.html';
}

if ($indexFile && (in_array($slug, $validAppRoutes, true) || strpos($slug, 'video/') === 0 || strpos($slug, 'api/') === 0)) {
    http_response_code(200);
    header('Content-Type: text/html; charset=UTF-8');
    $html = file_get_contents($indexFile);

    // Centralized Host & Brand Detection using explicit recognized hosts
    $rawHost = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
    $isTrendPulse = in_array($rawHost, ['trends.owncircles.com', 'owncircles.com', 'www.owncircles.com'], true);

    if ($isTrendPulse) {
        $siteDomain = 'https://trends.owncircles.com';
        $siteBrand = 'TrendPulse';
    } else {
        $proto = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
        $siteDomain = !empty($_SERVER['HTTP_HOST']) ? ($proto . $_SERVER['HTTP_HOST']) : 'https://trends.owncircles.com';
        $siteBrand = 'TrendPulse';
    }

    // Dynamic metadata replacement for /video/<slug> requests (screen previews)
    if (strpos($slug, 'video/') === 0) {
        $videoSlug = trim(substr($slug, 6), '/');
        $canonicalUrl = 'https://trends.owncircles.com/video/' . htmlspecialchars($videoSlug, ENT_QUOTES, 'UTF-8');
        
        $cleanTitle = ucwords(str_replace('-', ' ', $videoSlug));
        $videoTitle = $cleanTitle . ' | TrendPulse Review';
        $videoDesc = 'Watch video review, hands-on tests, buyer ratings, and price checks for ' . htmlspecialchars($cleanTitle, ENT_QUOTES, 'UTF-8') . ' on TrendPulse.';
        
        // Infer default YouTube thumbnail from slug keywords
        $lowerSlug = strtolower($videoSlug);
        $ytId = 'bCXhRtb16mk';
        if (strpos($lowerSlug, 'pet') !== false || strpos($lowerSlug, 'dog') !== false || strpos($lowerSlug, 'cat') !== false || strpos($lowerSlug, 'litter') !== false) {
            $ytId = 'GMx4sXjtul8';
        } elseif (strpos($lowerSlug, 'phone') !== false || strpos($lowerSlug, 'laptop') !== false || strpos($lowerSlug, 'screen') !== false || strpos($lowerSlug, 'tv') !== false || strpos($lowerSlug, 'mobile') !== false) {
            $ytId = '2QkS5j6bH_g';
        } elseif (strpos($lowerSlug, 'kitchen') !== false || strpos($lowerSlug, 'grinder') !== false || strpos($lowerSlug, 'cook') !== false || strpos($lowerSlug, 'blender') !== false || strpos($lowerSlug, 'fryer') !== false) {
            $ytId = 'PRgy1nnm3fg';
        } elseif (strpos($lowerSlug, 'treadmill') !== false || strpos($lowerSlug, 'walking') !== false || strpos($lowerSlug, 'fitness') !== false || strpos($lowerSlug, 'workout') !== false) {
            $ytId = '1fbUlzz2zfY';
        } elseif (strpos($lowerSlug, 'vacuum') !== false || strpos($lowerSlug, 'clean') !== false || strpos($lowerSlug, 'mop') !== false) {
            $ytId = 'bCXhRtb16mk';
        } elseif (strpos($lowerSlug, 'power') !== false || strpos($lowerSlug, 'anker') !== false || strpos($lowerSlug, 'gadget') !== false || strpos($lowerSlug, 'charger') !== false) {
            $ytId = 'VadYsrjOusY';
        } elseif (strpos($lowerSlug, 'dyson') !== false || strpos($lowerSlug, 'airwrap') !== false || strpos($lowerSlug, 'hair') !== false) {
            $ytId = 'LDL_dhnQF8Y';
        } elseif (strpos($lowerSlug, 'carseat') !== false || strpos($lowerSlug, 'baby') !== false || strpos($lowerSlug, 'doona') !== false) {
            $ytId = 'tfIvPh3Q7UM';
        }
        $videoThumb = "https://i.ytimg.com/vi/{$ytId}/hqdefault.jpg";

        // Attempt to fetch exact title & thumbnail from database
        $db_hosts = ["localhost", "127.0.0.1", "204.11.58.166"];
        $db_users = ["ownbizhub", "own_trending"];
        $db_passwords = ["ownbizhub@1982", "1j16?mv0Y"];
        $db_name = "own_trending";

        foreach ($db_hosts as $h) {
            foreach ($db_users as $i => $u) {
                $p = $db_passwords[$i] ?? $db_passwords[0];
                $test_db = @new mysqli($h, $u, $p, $db_name);
                if ($test_db && !$test_db->connect_error) {
                    $stmt = $test_db->prepare("SELECT title, rephrased_title, rephrased_description, thumbnail_url, youtube_id FROM videos WHERE slug = ? OR id = ? OR youtube_id = ? OR slug LIKE ? LIMIT 1");
                    if ($stmt) {
                        $likeSlug = '%' . $videoSlug . '%';
                        $stmt->bind_param("ssss", $videoSlug, $videoSlug, $videoSlug, $likeSlug);
                        $stmt->execute();
                        $res = $stmt->get_result();
                        if ($res && $row = $res->fetch_assoc()) {
                            $vTitle = $row['rephrased_title'] ?: $row['title'];
                            if ($vTitle) {
                                $videoTitle = $vTitle . ' | TrendPulse Review';
                            }
                            if (!empty($row['rephrased_description'])) {
                                $videoDesc = substr($row['rephrased_description'], 0, 200);
                            }
                            if (!empty($row['thumbnail_url'])) {
                                $videoThumb = $row['thumbnail_url'];
                            } elseif (!empty($row['youtube_id'])) {
                                $videoThumb = "https://i.ytimg.com/vi/" . $row['youtube_id'] . "/hqdefault.jpg";
                            }
                        }
                    }
                    $test_db->close();
                    break 2;
                }
            }
        }

        // Replace canonical, title, description, and OpenGraph/Twitter Screen Preview Meta
        $html = preg_replace('/<link\s+rel=["\']canonical["\'][^>]*>/i', '<link rel="canonical" href="' . $canonicalUrl . '" />', $html);
        $html = preg_replace('/<title>.*?<\/title>/i', '<title>' . htmlspecialchars($videoTitle, ENT_QUOTES, 'UTF-8') . '</title>', $html);
        $html = preg_replace('/<meta\s+name=["\']description["\'][^>]*>/i', '<meta name="description" content="' . htmlspecialchars($videoDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:title["\'][^>]*>/i', '<meta property="og:title" content="' . htmlspecialchars($videoTitle, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:description["\'][^>]*>/i', '<meta property="og:description" content="' . htmlspecialchars($videoDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:url["\'][^>]*>/i', '<meta property="og:url" content="' . $canonicalUrl . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:type["\'][^>]*>/i', '<meta property="og:type" content="video.other" />', $html);
        
        $ogImageTags = '<meta property="og:image" content="' . htmlspecialchars($videoThumb, ENT_QUOTES, 'UTF-8') . '" />' . "\n" .
                       '    <meta property="og:image:secure_url" content="' . htmlspecialchars($videoThumb, ENT_QUOTES, 'UTF-8') . '" />' . "\n" .
                       '    <meta property="og:image:width" content="1280" />' . "\n" .
                       '    <meta property="og:image:height" content="720" />' . "\n" .
                       '    <meta property="og:image:type" content="image/jpeg" />' . "\n" .
                       '    <meta property="og:image:alt" content="' . htmlspecialchars($videoTitle, ENT_QUOTES, 'UTF-8') . '" />';
        $html = preg_replace('/<meta\s+property=["\']og:image["\'][^>]*>/i', $ogImageTags, $html);

        $html = preg_replace('/<meta\s+name=["\']twitter:title["\'][^>]*>/i', '<meta name="twitter:title" content="' . htmlspecialchars($videoTitle, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+name=["\']twitter:description["\'][^>]*>/i', '<meta name="twitter:description" content="' . htmlspecialchars($videoDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+name=["\']twitter:image["\'][^>]*>/i', '<meta name="twitter:image" content="' . htmlspecialchars($videoThumb, ENT_QUOTES, 'UTF-8') . '" />', $html);
    } elseif ($slug === 'privacy-policy') {
        $pageTitle = 'Privacy Policy & Cookie Rights | TrendPulse';
        $pageDesc = 'TrendPulse privacy policy detailing Google AdSense, third-party advertising cookies, Amazon Associates affiliate participation, and GDPR/CCPA privacy rights.';
        $canonicalUrl = $siteDomain . '/privacy-policy';

        $html = preg_replace('/<link\s+rel=["\']canonical["\'][^>]*>/i', '<link rel="canonical" href="' . $canonicalUrl . '" />', $html);
        $html = preg_replace('/<title>.*?<\/title>/i', '<title>' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '</title>', $html);
        $html = preg_replace('/<meta\s+name=["\']description["\'][^>]*>/i', '<meta name="description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:title["\'][^>]*>/i', '<meta property="og:title" content="' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:description["\'][^>]*>/i', '<meta property="og:description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:url["\'][^>]*>/i', '<meta property="og:url" content="' . $canonicalUrl . '" />', $html);
    } elseif ($slug === 'terms') {
        $pageTitle = 'Terms of Service & FTC Disclosure | TrendPulse';
        $pageDesc = 'Terms of service, user agreement, and FTC affiliate commission disclosure for TrendPulse review hub.';
        $canonicalUrl = $siteDomain . '/terms';

        $html = preg_replace('/<link\s+rel=["\']canonical["\'][^>]*>/i', '<link rel="canonical" href="' . $canonicalUrl . '" />', $html);
        $html = preg_replace('/<title>.*?<\/title>/i', '<title>' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '</title>', $html);
        $html = preg_replace('/<meta\s+name=["\']description["\'][^>]*>/i', '<meta name="description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:title["\'][^>]*>/i', '<meta property="og:title" content="' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:description["\'][^>]*>/i', '<meta property="og:description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:url["\'][^>]*>/i', '<meta property="og:url" content="' . $canonicalUrl . '" />', $html);
    } elseif ($slug === 'about') {
        $pageTitle = 'About Us - Editorial Standards & AI Sentiment Methodology | TrendPulse';
        $pageDesc = 'Learn about TrendPulse, our 4-pillar review curation framework, AI sentiment analysis of YouTube reviews, and transparent affiliate standards.';
        $canonicalUrl = $siteDomain . '/about';

        $html = preg_replace('/<link\s+rel=["\']canonical["\'][^>]*>/i', '<link rel="canonical" href="' . $canonicalUrl . '" />', $html);
        $html = preg_replace('/<title>.*?<\/title>/i', '<title>' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '</title>', $html);
        $html = preg_replace('/<meta\s+name=["\']description["\'][^>]*>/i', '<meta name="description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:title["\'][^>]*>/i', '<meta property="og:title" content="' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:description["\'][^>]*>/i', '<meta property="og:description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:url["\'][^>]*>/i', '<meta property="og:url" content="' . $canonicalUrl . '" />', $html);
    } elseif ($slug === 'contact') {
        $pageTitle = 'Contact Us & Publisher Support | TrendPulse';
        $pageDesc = 'Contact TrendPulse editorial support, DMCA inquiries, or advertising feedback.';
        $canonicalUrl = $siteDomain . '/contact';

        $html = preg_replace('/<link\s+rel=["\']canonical["\'][^>]*>/i', '<link rel="canonical" href="' . $canonicalUrl . '" />', $html);
        $html = preg_replace('/<title>.*?<\/title>/i', '<title>' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '</title>', $html);
        $html = preg_replace('/<meta\s+name=["\']description["\'][^>]*>/i', '<meta name="description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:title["\'][^>]*>/i', '<meta property="og:title" content="' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:description["\'][^>]*>/i', '<meta property="og:description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:url["\'][^>]*>/i', '<meta property="og:url" content="' . $canonicalUrl . '" />', $html);
    } else {
        // TrendPulse Homepage metadata injection
        $pageTitle = 'TrendPulse | Viral Product Reviews & Verified Amazon Deals';
        $pageDesc = 'Discover AI-curated YouTube product reviews, buyer sentiment scores, pros and cons, and verified Amazon deals for trending home, kitchen, tech, and fitness gear.';
        $canonicalUrl = $siteDomain . '/';

        $html = preg_replace('/<link\s+rel=["\']canonical["\'][^>]*>/i', '<link rel="canonical" href="' . $canonicalUrl . '" />', $html);
        $html = preg_replace('/<title>.*?<\/title>/i', '<title>' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '</title>', $html);
        $html = preg_replace('/<meta\s+name=["\']description["\'][^>]*>/i', '<meta name="description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:title["\'][^>]*>/i', '<meta property="og:title" content="' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:description["\'][^>]*>/i', '<meta property="og:description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+property=["\']og:url["\'][^>]*>/i', '<meta property="og:url" content="' . $canonicalUrl . '" />', $html);
        $html = preg_replace('/<meta\s+name=["\']twitter:title["\'][^>]*>/i', '<meta name="twitter:title" content="' . htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') . '" />', $html);
        $html = preg_replace('/<meta\s+name=["\']twitter:description["\'][^>]*>/i', '<meta name="twitter:description" content="' . htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') . '" />', $html);
    }

    echo $html;
    exit;
}

// 4. Unknown route that never existed -> 404 Not Found
require __DIR__ . '/404_not_found.php';
exit;
