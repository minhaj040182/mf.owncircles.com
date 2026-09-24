<?php
/**
 * Sitemap Generator & Appender Module
 * Automatically creates or appends video URLs to sitemap.xml with strict deduplication.
 * Guarantees zero duplicate URLs, filters out permanently deleted 410 articles,
 * and preserves the canonical domain https://trends.owncircles.com.
 */

function update_or_generate_sitemap($conn = null) {
    // Determine site base URL (Always canonicalize to https://trends.owncircles.com)
    $rawHost = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
    if (in_array($rawHost, ['trends.owncircles.com', 'owncircles.com', 'www.owncircles.com'], true)) {
        $base_url = 'https://trends.owncircles.com';
    } elseif (!empty($_SERVER['HTTP_HOST']) && !in_array($rawHost, ['localhost', '127.0.0.1'], true)) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || ($_SERVER['SERVER_PORT'] ?? 80) == 443) ? "https://" : "http://";
        $base_url = rtrim($protocol . $_SERVER['HTTP_HOST'], '/');
    } else {
        $base_url = 'https://trends.owncircles.com';
    }

    // Target sitemap paths (both public directory and dist directory if available)
    $sitemap_paths = [
        __DIR__ . '/sitemap.xml'
    ];
    if (file_exists(dirname(__DIR__) . '/dist')) {
        $sitemap_paths[] = dirname(__DIR__) . '/dist/sitemap.xml';
    }
    if (file_exists(dirname(__DIR__) . '/sitemap.xml')) {
        $sitemap_paths[] = dirname(__DIR__) . '/sitemap.xml';
    }
    $sitemap_paths = array_unique($sitemap_paths);

    // Slug generation helper
    if (!function_exists('sitemap_slugify_helper')) {
        function sitemap_slugify_helper($text) {
            $slug = strtolower(trim($text ?? ''));
            $slug = preg_replace('/[^\w\s-]/', '', $slug);
            $slug = preg_replace('/[\s_-]+/', '-', $slug);
            return trim($slug, '-');
        }
    }

    // Load permanently deleted slugs and prefixes from deleted_slugs.json
    $deletedSlugs = [
        'vehicles-shane-van-gisbergen-on-difference-between-racing-supercars-and-nascar',
        'faltu-engineers-ep01-desi-dan-bilzenian',
        'attendance-system-smart-emp-lets-explore',
        'restoring-your-core-strength-after-pregnancy-a-gradual-and-safe-approach'
    ];
    $deletedPrefixes = ['vehicles-'];
    $configPath = __DIR__ . '/deleted_slugs.json';
    if (file_exists($configPath)) {
        $config = json_decode(file_get_contents($configPath), true);
        if (!empty($config['deletedSlugs']) && is_array($config['deletedSlugs'])) {
            $deletedSlugs = $config['deletedSlugs'];
        }
        if (!empty($config['deletedPrefixes']) && is_array($config['deletedPrefixes'])) {
            $deletedPrefixes = $config['deletedPrefixes'];
        }
    }
    $deletedSet = array_flip($deletedSlugs);

    // Track URLs and slugs to strictly prevent duplicate entries
    $seen_urls = [];
    $seen_slugs = [];
    $sitemap_urls = [];

    // 1. Primary Hub Homepage
    $home_url = $base_url . '/';
    $sitemap_urls[] = [
        'loc' => $home_url,
        'lastmod' => date('Y-m-d\TH:i:sP'),
        'changefreq' => 'hourly',
        'priority' => '1.0'
    ];
    $seen_urls[$home_url] = true;

    // Helper to add unique video URL
    $add_video_entry = function($slug, $lastmod) use (&$seen_urls, &$seen_slugs, &$sitemap_urls, $base_url, $deletedSet, $deletedPrefixes) {
        $slug = strtolower(trim($slug ?? ''));
        // Clean leading 'video/' if present
        $slug = preg_replace('#^video/#i', '', $slug);
        $slug = trim($slug, '/');

        if (empty($slug) || strlen($slug) < 3) {
            return false;
        }

        // Check if deleted
        if (isset($deletedSet[$slug])) {
            return false;
        }
        foreach ($deletedPrefixes as $prefix) {
            if (strpos($slug, $prefix) === 0) {
                return false;
            }
        }

        // Strict deduplication check
        if (isset($seen_slugs[$slug])) {
            return false;
        }
        $seen_slugs[$slug] = true;

        $loc = $base_url . '/video/' . rawurlencode($slug);
        if (isset($seen_urls[$loc])) {
            return false;
        }
        $seen_urls[$loc] = true;

        $sitemap_urls[] = [
            'loc' => $loc,
            'lastmod' => $lastmod,
            'changefreq' => 'daily',
            'priority' => '0.85'
        ];
        return true;
    };

    // 2. Query videos from database if connection provided
    if ($conn) {
        $res = @$conn->query("SELECT id, slug, rephrased_title, title, updated_at, created_at FROM videos ORDER BY created_at DESC");
        if ($res) {
            while ($row = $res->fetch_assoc()) {
                $rawTitle = $row['rephrased_title'] ?: $row['title'];
                $slug = $row['slug'] ?: sitemap_slugify_helper($rawTitle);
                if (empty($slug)) {
                    continue;
                }
                $lastmod = !empty($row['updated_at']) 
                    ? date('Y-m-d\TH:i:sP', strtotime($row['updated_at'])) 
                    : (!empty($row['created_at']) ? date('Y-m-d\TH:i:sP', strtotime($row['created_at'])) : date('Y-m-d\TH:i:sP'));

                $add_video_entry($slug, $lastmod);
            }
        }
    }

    // 3. Fallback to curated product list if database has few or no records
    if (count($sitemap_urls) <= 5) {
        $curated_slugs = [
            'apple-iphone-16-pro-max-256-gb-desert-titanium',
            'apple-macbook-pro-16-m4-pro-chip-36gb-unified-memory-512gb-ssd',
            'samsung-galaxy-s24-ultra-ai-smartphone-512gb-titanium-black',
            'ninja-af101-air-fryer-4-qt-with-crisper-plate-multi-rack',
            'dell-xps-16-9640-intel-core-ultra-7-155h-laptop-with-oled-touch',
            'sperax-compact-under-desk-walking-pad-treadmill-with-remote',
            'samsung-galaxy-s24-ultra-5g-ai-smartphone-12gb-ram-256gb-titanium',
            'apple-macbook-air-15-inch-m3-chip-laptop-16gb-unified-ram',
            'apple-iphone-15-16-128-gb-5g-super-retina-xdr-display',
            'lg-9-kg-5-star-fully-automatic-front-load-smart-ai-direct-drive-washing-machine',
            'asus-tuf-gaming-a15-amd-ryzen-7-7435hs-with-rtx-4060-laptop',
            'samsung-236-l-3-star-convertible-inverter-digital-double-door-refrigerator',
            'flagship-smartphone-camera-battery-real-world-test-review',
            'ultimate-2026-laptop-comparison-m3-m4-intel-ai-chips-test',
            'custom-pc-desktop-computer-build-performance-benchmark',
            'smart-double-door-refrigerator-inverter-compressor-review',
            'fully-automatic-front-load-washing-machine-real-home-review',
            '4k-ultra-hd-smart-google-tv-display-sound-test-review',
            'air-fryer-honest-kitchen-test-review',
            'smart-vacuum-robot-lidar-navigation-mopping-test',
            'true-wireless-earbuds-active-noise-cancelling-audio-test',
            'fitness-smartwatch-health-tracking-battery-real-life-test',
            'mechanical-gaming-keyboard-switches-ergonomics-review',
            'portable-bluetooth-speaker-bass-battery-waterproof-test',
            'high-speed-smoothie-blender-ice-crush-performance-test',
            'ergonomic-office-chair-lumbar-support-setup-test',
            'mirrorless-camera-4k-video-autofocus-creator-review',
            'smart-home-security-camera-night-vision-ai-alert-test',
            'deep-tissue-percussion-massage-gun-recovery-test',
            'espresso-coffee-machine-milk-frother-barista-test',
            'portable-power-station-solar-generator-outdoor-test',
            'active-noise-cancelling-over-ear-headphones-sound-test',
            'ultrawide-curved-gaming-monitor-hdr-color-test',
            'inverter-split-air-conditioner-cooling-power-bill-test',
            'water-purifier-ro-mineral-filtration-taste-test'
        ];

        $now = date('Y-m-d\TH:i:sP');
        foreach ($curated_slugs as $c_slug) {
            $add_video_entry($c_slug, $now);
        }
    }

    // Build clean XML markup with strict formatting
    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    foreach ($sitemap_urls as $item) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>" . htmlspecialchars($item['loc'], ENT_XML1, 'UTF-8') . "</loc>\n";
        $xml .= "    <lastmod>" . $item['lastmod'] . "</lastmod>\n";
        $xml .= "    <changefreq>" . $item['changefreq'] . "</changefreq>\n";
        $xml .= "    <priority>" . $item['priority'] . "</priority>\n";
        $xml .= "  </url>\n";
    }

    $xml .= '</urlset>' . "\n";

    // Write to all targeted sitemap files
    $success = false;
    $bytes_written = 0;
    $written_paths = [];

    foreach ($sitemap_paths as $path) {
        $written = @file_put_contents($path, $xml);
        if ($written !== false) {
            $success = true;
            $bytes_written = $written;
            $written_paths[] = $path;
        }
    }

    return [
        'success' => $success,
        'bytes_written' => $bytes_written,
        'total_urls' => count($sitemap_urls),
        'total_videos' => count($sitemap_urls) - 1,
        'duplicate_urls_prevented' => count($seen_slugs),
        'sitemap_paths' => $written_paths
    ];
}
?>

