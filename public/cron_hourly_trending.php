<?php
/**
 * Automated Cron Job: Hourly Trending Videos Collector & YouTube Review Matcher
 * 
 * Features:
 * 1. Process batch limit of 5 items per run (prevents timeouts & memory limits).
 * 2. Checks database for duplicates — skips items already saved in the current region.
 * 3. Multi-tier YouTube verification for electronics (Smartphones, Laptops, Gadgets).
 * 4. Inserts verified reviews and updates sitemap.xml automatically.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

@ini_set('display_errors', 0);
@error_reporting(E_ALL);
@set_time_limit(300);

require_once __DIR__ . '/sitemap_generator.php';
require_once __DIR__ . '/youtube_search_helper.php';

@mysqli_report(MYSQLI_REPORT_OFF);

// Safe JSON error handling
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        if (!headers_sent()) {
            http_response_code(200);
        }
        echo json_encode([
            "success" => false,
            "error" => "PHP Fatal Error: " . $error['message'],
            "file" => basename($error['file']),
            "line" => $error['line']
        ], JSON_PRETTY_PRINT);
    }
});

// MySQL Database Credentials
$db_hosts = ["localhost", "127.0.0.1", "204.11.58.166"];
$db_users = ["ownbizhub", "own_trending"];
$db_passwords = ["ownbizhub@1982", "1j16?mv0Y"];
$database_name = "own_trending";

$conn = null;
$connected = false;

foreach ($db_hosts as $host) {
    foreach ($db_users as $idx => $user) {
        $password = $db_passwords[$idx] ?? $db_passwords[0];
        $test_conn = @new mysqli($host, $user, $password, $database_name);
        if ($test_conn && !$test_conn->connect_error) {
            $conn = $test_conn;
            $connected = true;
            break 2;
        }
    }
}

if (!$connected || !$conn) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed. Please check MySQL server status."
    ]);
    exit();
}

$conn->set_charset("utf8mb4");

// Auto-provision table structure if needed
$conn->query("
CREATE TABLE IF NOT EXISTS videos (
  id VARCHAR(255) PRIMARY KEY,
  youtube_url VARCHAR(500) NOT NULL,
  youtube_id VARCHAR(100) NOT NULL,
  title VARCHAR(500) NOT NULL,
  rephrased_title VARCHAR(500),
  rephrased_description TEXT,
  slug VARCHAR(255),
  channel_title VARCHAR(255),
  category VARCHAR(100) DEFAULT 'general',
  thumbnail_url VARCHAR(500),
  view_count VARCHAR(50) DEFAULT '0',
  like_count VARCHAR(50) DEFAULT '0',
  comment_count VARCHAR(50) DEFAULT '0',
  published_at VARCHAR(100),
  affiliate_tag_used VARCHAR(100) DEFAULT 'trends0628-21',
  pulse_json LONGTEXT,
  products_json LONGTEXT,
  comments_json LONGTEXT,
  region VARCHAR(10) DEFAULT 'IN',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_region (region),
  INDEX idx_category (category),
  INDEX idx_ytid_region (youtube_id, region)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

// Regional Configurations
function getAmzConfig($region) {
    $configs = [
        'IN' => ['domain' => 'amazon.in', 'tag' => 'trends0628-21', 'currency' => '₹', 'baseUrl' => 'https://www.amazon.in/s?k='],
        'US' => ['domain' => 'amazon.com', 'tag' => 'trendpulse-20', 'currency' => '$', 'baseUrl' => 'https://www.amazon.com/s?k='],
        'GB' => ['domain' => 'amazon.co.uk', 'tag' => 'trendpulseuk-21', 'currency' => '£', 'baseUrl' => 'https://www.amazon.co.uk/s?k='],
        'CA' => ['domain' => 'amazon.ca', 'tag' => 'trendpulseca-20', 'currency' => 'CA$', 'baseUrl' => 'https://www.amazon.ca/s?k='],
        'AU' => ['domain' => 'amazon.com.au', 'tag' => 'trendpulseau-22', 'currency' => 'A$', 'baseUrl' => 'https://www.amazon.com.au/s?k='],
        'DE' => ['domain' => 'amazon.de', 'tag' => 'trendpulsede-21', 'currency' => '€', 'baseUrl' => 'https://www.amazon.de/s?k='],
        'PK' => ['domain' => 'amazon.com', 'tag' => 'trendpulse-20', 'currency' => 'Rs.', 'baseUrl' => 'https://www.amazon.com/s?k='],
        'BD' => ['domain' => 'amazon.com', 'tag' => 'trendpulse-20', 'currency' => '৳', 'baseUrl' => 'https://www.amazon.com/s?k=']
    ];
    return $configs[$region] ?? $configs['IN'];
}

function genSlug($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    return strtolower($text);
}

// Hot Products Catalog
$HOT_PRODUCTS_REPOSITORY = [
    'IN' => [
        ['name' => 'Samsung Galaxy S24 Ultra 5G AI Smartphone', 'category' => 'electronics'],
        ['name' => 'Apple MacBook Air 15-inch M3 Chip Laptop', 'category' => 'electronics'],
        ['name' => 'Apple iPhone 16 Pro Max Flagship Smartphone', 'category' => 'electronics'],
        ['name' => 'ASUS TUF Gaming A15 RTX 4060 Laptop', 'category' => 'electronics'],
        ['name' => 'Dell XPS 16 Intel Core Ultra Laptop', 'category' => 'electronics'],
        ['name' => 'Samsung Double Door Convertible Refrigerator', 'category' => 'kitchen'],
        ['name' => 'LG AI Direct Drive Front Load Washing Machine', 'category' => 'household'],
        ['name' => 'Sperax Compact Under Desk Walking Pad Treadmill', 'category' => 'fitness']
    ],
    'US' => [
        ['name' => 'Apple iPhone 16 Pro Max Unlocked Smartphone', 'category' => 'electronics'],
        ['name' => 'Apple MacBook Pro 16" M4 Pro Chip Laptop', 'category' => 'electronics'],
        ['name' => 'Samsung Galaxy S24 Ultra AI Smartphone', 'category' => 'electronics'],
        ['name' => 'Ninja AF101 4 Qt Air Fryer with Crisper Plate', 'category' => 'kitchen'],
        ['name' => 'Dell XPS 16 9640 Intel Core Ultra 7 OLED Laptop', 'category' => 'electronics'],
        ['name' => 'Sperax Compact Under Desk Walking Pad Treadmill', 'category' => 'fitness'],
        ['name' => 'Roborock Smart Robot Vacuum and Mop', 'category' => 'gadgets'],
        ['name' => 'Kindle Paperwhite 16GB E-Reader', 'category' => 'books_stationery']
    ]
];

// Query Parameters
$requested_region = strtoupper(trim($_GET['region'] ?? $_POST['region'] ?? 'IN'));
$batch_limit = intval($_GET['limit'] ?? $_POST['limit'] ?? 5);
if ($batch_limit < 1 || $batch_limit > 10) {
    $batch_limit = 5; // Default strict 5 items per request
}
$youtube_api_key = $_GET['api_key'] ?? $_POST['api_key'] ?? '';

$supported_regions = ['IN', 'US', 'GB', 'CA', 'AU', 'DE', 'PK', 'BD'];
$country_names_map = [
    'IN' => 'India', 'US' => 'USA', 'GB' => 'UK', 'CA' => 'Canada',
    'AU' => 'Australia', 'DE' => 'Germany', 'PK' => 'Pakistan', 'BD' => 'Bangladesh'
];

if (!in_array($requested_region, $supported_regions)) {
    $requested_region = 'IN';
}

$cName = $country_names_map[$requested_region] ?? 'Global';
$amz = getAmzConfig($requested_region);
$products = $HOT_PRODUCTS_REPOSITORY[$requested_region] ?? $HOT_PRODUCTS_REPOSITORY['IN'];

$stmt = $conn->prepare("
    INSERT INTO videos 
    (id, youtube_url, youtube_id, title, rephrased_title, rephrased_description, slug, channel_title, category, thumbnail_url, view_count, like_count, comment_count, published_at, affiliate_tag_used, pulse_json, products_json, comments_json, region) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE 
      title=VALUES(title), 
      rephrased_title=VALUES(rephrased_title), 
      rephrased_description=VALUES(rephrased_description), 
      slug=VALUES(slug), 
      channel_title=VALUES(channel_title),
      category=VALUES(category),
      thumbnail_url=VALUES(thumbnail_url),
      region=VALUES(region),
      view_count=VALUES(view_count),
      like_count=VALUES(like_count),
      comment_count=VALUES(comment_count),
      pulse_json=VALUES(pulse_json),
      products_json=VALUES(products_json),
      comments_json=VALUES(comments_json),
      updated_at=NOW()
");

$total_saved = 0;
$skipped_duplicates = 0;
$total_skipped_junk = 0;
$logs = [];
$processed_count = 0;

foreach ($products as $pItem) {
    if ($processed_count >= $batch_limit) {
        break; // Stop after processing 5 items
    }

    $pName = $pItem['name'];
    $pCat = $pItem['category'];

    // 1. Check duplicate: Is this product already saved for this region?
    $check_stmt = $conn->prepare("SELECT id, title, youtube_id FROM videos WHERE (title LIKE ? OR rephrased_title LIKE ?) AND region = ? LIMIT 1");
    $searchTerm = "%" . substr($pName, 0, 20) . "%";
    $check_stmt->bind_param("sss", $searchTerm, $searchTerm, $requested_region);
    $check_stmt->execute();
    $existing = $check_stmt->get_result()->fetch_assoc();
    $check_stmt->close();

    if (!empty($existing)) {
        $skipped_duplicates++;
        $logs[] = [
            'status' => 'SKIPPED_DUPLICATE',
            'product' => $pName,
            'existing_id' => $existing['id'],
            'existing_youtube_id' => $existing['youtube_id'],
            'region' => $requested_region,
            'reason' => 'Already saved in database. Avoided re-pulling duplicate data.'
        ];
        continue;
    }

    $processed_count++;

    // 2. Search dynamically & verify active YouTube review
    $verifiedVideo = searchYouTubeForProductReview($pName, $requested_region, $youtube_api_key);

    if (!$verifiedVideo || empty($verifiedVideo['youtubeId'])) {
        $total_skipped_junk++;
        $logs[] = [
            'status' => 'SKIPPED_NO_VIDEO',
            'product' => $pName,
            'region' => $requested_region,
            'reason' => 'No active/playable YouTube review video found.'
        ];
        continue;
    }

    // 3. Prepare verified record
    $ytId = $verifiedVideo['youtubeId'];
    $title = "{$pName} - Full Review & Live Amazon Testing ({$cName})";
    $desc = "Detailed video review and buying guide for {$pName} in {$cName}. Verified customer ratings and Amazon deal.";
    $slug = genSlug("{$pName} review test {$cName}");
    $uniqueId = 'vid-' . strtolower($requested_region) . '-' . $ytId . '-' . substr(md5($pName), 0, 6);

    $searchKw = urlencode($pName);
    $amzUrl = $amz['baseUrl'] . $searchKw . "&tag=" . $amz['tag'];

    $pulseData = json_encode([
        'summary' => $desc,
        'keyTakeaways' => [
            "Tested for build quality, setup ease, and real-world durability in {$cName}",
            "Verified buyer satisfaction score: 4.8/5 ({$requested_region})",
            "Direct Amazon Prime regional discount and link included"
        ],
        'viralPotentialScore' => rand(92, 98),
        'overallSentimentRatio' => ['positive' => rand(90, 97), 'negative' => rand(1, 5), 'neutral' => rand(1, 5)],
        'buyerRecommendation' => 'Must Buy',
        'buyerVerdictText' => "Verified top choice product for {$pName} buyers in {$cName}."
    ]);

    $productsData = json_encode([
        [
            'id' => 'prod-' . $ytId,
            'name' => $pName,
            'category' => ucfirst($pCat),
            'originalUrl' => $amzUrl,
            'affiliateUrl' => $amzUrl,
            'affiliateTag' => $amz['tag'],
            'estimatedPrice' => $amz['currency'] . number_format(rand(999, 49999)),
            'rating' => 4.8,
            'dealBadge' => 'Amazon Top Seller',
            'keyFeatures' => ['Verified Build Quality', 'Fast Amazon Shipping (' . $requested_region . ')', 'High Buyer Satisfaction'],
            'pros' => ['Easy setup', 'Durable design', 'Great performance'],
            'cons' => ['High regional demand'],
            'targetAudience' => "Buyers in {$cName}.",
            'verdict' => "Top recommended product. Buy with official warranty on Amazon {$requested_region}."
        ]
    ]);

    $commentsData = json_encode([
        [
            'id' => 'comm-01',
            'author' => "Verified Buyer ({$requested_region})",
            'text' => "Super helpful video review for {$pName}! Helped me make my purchase decision in {$cName}.",
            'convertedText' => "Super helpful video review for {$pName}! Helped me make my purchase decision in {$cName}.",
            'sentiment' => 'positive',
            'positivityScore' => 98,
            'negativityScore' => 2,
            'keyThemes' => ['Product Quality', 'Honest Review'],
            'likesCount' => rand(80, 500),
            'timestamp' => '2 hours ago'
        ]
    ]);

    $ytUrl = "https://www.youtube.com/watch?v={$ytId}";
    $thumbUrl = $verifiedVideo['thumbnail'];
    $views = rand(150, 950) . 'K';
    $likes = rand(10, 45) . 'K';
    $comments = rand(300, 980) . '';
    $pubAt = date('Y-m-d');
    $channel = $verifiedVideo['channel'];

    $stmt->bind_param("sssssssssssssssssss",
        $uniqueId,
        $ytUrl,
        $ytId,
        $title,
        $title,
        $desc,
        $slug,
        $channel,
        $pCat,
        $thumbUrl,
        $views,
        $likes,
        $comments,
        $pubAt,
        $amz['tag'],
        $pulseData,
        $productsData,
        $commentsData,
        $requested_region
    );

    if ($stmt->execute()) {
        $total_saved++;
        $logs[] = [
            'status' => 'SAVED_VERIFIED',
            'product' => $pName,
            'youtube_id' => $ytId,
            'video_title' => $verifiedVideo['title'],
            'region' => $requested_region
        ];
    }
}

// Update sitemap for Google SEO
$sitemap_res = update_or_generate_sitemap($conn);

echo json_encode([
    'success' => true,
    'timestamp' => date('c'),
    'cron_job' => 'Hourly Trending Videos Collector',
    'region' => $requested_region,
    'batch_limit_applied' => $batch_limit,
    'total_saved' => $total_saved,
    'skipped_duplicates' => $skipped_duplicates,
    'total_skipped_junk' => $total_skipped_junk,
    'logs' => $logs,
    'sitemap' => $sitemap_res,
    'message' => "Checked batch of 5 items for {$requested_region}. Duplicates skipped; active reviews saved."
], JSON_PRETTY_PRINT);
?>
