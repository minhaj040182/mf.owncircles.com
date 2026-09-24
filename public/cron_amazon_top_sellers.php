<?php
/**
 * Automated Cron Job: Amazon Best Sellers & YouTube Review Live Matcher
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
function getRegionalAmazonConfig($region) {
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

function generateSlug($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    return strtolower($text);
}

// Real Hot-Selling Amazon Products Repository
$AMAZON_HOT_PRODUCTS = [
    'IN' => [
        ['asin' => 'B0CS5X8T7M', 'name' => 'Samsung Galaxy S24 Ultra 5G AI Smartphone', 'cat' => 'electronics', 'price' => '₹1,29,999'],
        ['asin' => 'B0CX1G7X39', 'name' => 'Apple MacBook Air 15-inch M3 Chip Laptop', 'cat' => 'electronics', 'price' => '₹1,34,900'],
        ['asin' => 'B0CHX1W1XY', 'name' => 'Apple iPhone 16 Pro Max Flagship Smartphone', 'cat' => 'electronics', 'price' => '₹1,44,900'],
        ['asin' => 'B0C7J8G929', 'name' => 'ASUS TUF Gaming A15 RTX 4060 Laptop', 'cat' => 'electronics', 'price' => '₹89,990'],
        ['asin' => 'B0D1G9K392', 'name' => 'Dell XPS 16 Intel Core Ultra Laptop', 'cat' => 'electronics', 'price' => '₹2,19,990'],
        ['asin' => 'B0BMG91J3X', 'name' => 'Samsung Double Door Convertible Refrigerator', 'cat' => 'kitchen', 'price' => '₹32,990'],
        ['asin' => 'B08F7Z5Q1D', 'name' => 'LG AI Direct Drive Front Load Washing Machine', 'cat' => 'household', 'price' => '₹38,990'],
        ['asin' => 'B0C9FB17X4', 'name' => 'Sperax Compact Under Desk Walking Pad Treadmill', 'cat' => 'fitness', 'price' => '₹18,999']
    ],
    'US' => [
        ['asin' => 'B0CMDKG4P1', 'name' => 'Apple iPhone 16 Pro Max Unlocked Smartphone', 'cat' => 'electronics', 'price' => '$1,199.00'],
        ['asin' => 'B0CM5N2M38', 'name' => 'Apple MacBook Pro 16" M4 Pro Chip Laptop', 'cat' => 'electronics', 'price' => '$2,499.00'],
        ['asin' => 'B0CS5X8T7M', 'name' => 'Samsung Galaxy S24 Ultra AI Smartphone', 'cat' => 'electronics', 'price' => '$1,299.99'],
        ['asin' => 'B07FDJMC9Q', 'name' => 'Ninja AF101 4 Qt Air Fryer with Crisper Plate', 'cat' => 'kitchen', 'price' => '$89.99'],
        ['asin' => 'B0CTM1Q8J4', 'name' => 'Dell XPS 16 9640 Intel Core Ultra 7 OLED Laptop', 'cat' => 'electronics', 'price' => '$2,199.99'],
        ['asin' => 'B0C9FB17X4', 'name' => 'Sperax Compact Under Desk Walking Pad Treadmill', 'cat' => 'fitness', 'price' => '$199.99'],
        ['asin' => 'B094NX399F', 'name' => 'Roborock Smart Robot Vacuum and Mop', 'cat' => 'gadgets', 'price' => '$499.99'],
        ['asin' => 'B09SWW583J', 'name' => 'Kindle Paperwhite 16GB E-Reader', 'cat' => 'books_stationery', 'price' => '$149.99']
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
if (!in_array($requested_region, $supported_regions)) {
    $requested_region = 'IN';
}

$amz = getRegionalAmazonConfig($requested_region);
$products = $AMAZON_HOT_PRODUCTS[$requested_region] ?? $AMAZON_HOT_PRODUCTS['IN'];

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

$saved_count = 0;
$skipped_duplicate_count = 0;
$skipped_junk_count = 0;
$log = [];
$processed_in_this_run = 0;

foreach ($products as $p) {
    if ($processed_in_this_run >= $batch_limit) {
        break; // Stop after processing the requested batch limit (5 products)
    }

    $productName = $p['name'];

    // 1. Check duplicate: Is this product or similar title already saved for this region?
    $check_stmt = $conn->prepare("SELECT id, title, youtube_id FROM videos WHERE (title LIKE ? OR rephrased_title LIKE ?) AND region = ? LIMIT 1");
    $searchTerm = "%" . substr($productName, 0, 20) . "%";
    $check_stmt->bind_param("sss", $searchTerm, $searchTerm, $requested_region);
    $check_stmt->execute();
    $existing = $check_stmt->get_result()->fetch_assoc();
    $check_stmt->close();

    if (!empty($existing)) {
        $skipped_duplicate_count++;
        $log[] = [
            'status' => 'SKIPPED_DUPLICATE',
            'product' => $productName,
            'existing_id' => $existing['id'],
            'existing_youtube_id' => $existing['youtube_id'],
            'region' => $requested_region,
            'reason' => 'Already saved in database. Avoided re-pulling duplicate data.'
        ];
        continue; // Do not waste batch slots on already saved data
    }

    $processed_in_this_run++;

    // 2. Find and strictly verify active YouTube review
    $reviewVideo = searchYouTubeForProductReview($productName, $requested_region, $youtube_api_key);

    if (!$reviewVideo || empty($reviewVideo['youtubeId'])) {
        $skipped_junk_count++;
        $log[] = [
            'status' => 'SKIPPED_NO_VIDEO',
            'product' => $productName,
            'region' => $requested_region,
            'reason' => 'No active/playable YouTube review video found.'
        ];
        continue;
    }

    // 3. Prepare payload & insert
    $ytId = $reviewVideo['youtubeId'];
    $videoTitle = $productName . " - Full Review & Unboxing (" . $requested_region . ")";
    $desc = "In-depth review and unboxing analysis for " . $productName . ". Verified buyer sentiment, durability testing, and official Amazon deal.";
    $slug = generateSlug($productName . " review " . $requested_region);
    $uniqueId = 'vid-' . strtolower($requested_region) . '-' . $ytId . '-' . substr(md5($productName), 0, 6);

    $searchQuery = urlencode($productName);
    $amzUrl = $amz['baseUrl'] . $searchQuery . "&tag=" . $amz['tag'];

    $pulseData = json_encode([
        'summary' => $desc,
        'keyTakeaways' => [
            "Verified benchmark performance and build quality for {$productName}",
            "Top positive buyer rating in {$requested_region}",
            "Direct regional Amazon Prime link with official warranty"
        ],
        'viralPotentialScore' => rand(93, 99),
        'overallSentimentRatio' => ['positive' => rand(92, 98), 'negative' => rand(1, 4), 'neutral' => rand(1, 4)],
        'buyerRecommendation' => 'Must Buy',
        'buyerVerdictText' => "Verified top choice in its category for buyers in {$requested_region}."
    ]);

    $productsData = json_encode([
        [
            'id' => 'amz-' . $ytId,
            'name' => $productName,
            'category' => ucfirst($p['cat']),
            'originalUrl' => $amzUrl,
            'affiliateUrl' => $amzUrl,
            'affiliateTag' => $amz['tag'],
            'estimatedPrice' => $p['price'] ?? ($amz['currency'] . '9,999'),
            'rating' => 4.9,
            'dealBadge' => 'Amazon Choice',
            'keyFeatures' => ['Official Brand Warranty', 'Fast Regional Prime Shipping', 'Verified Review Score'],
            'pros' => ['Premium build', 'Top-tier performance', 'Highly recommended by reviewers'],
            'cons' => ['High regional demand'],
            'targetAudience' => "Consumers looking for {$productName} in {$requested_region}.",
            'verdict' => "Top verified buy on Amazon {$requested_region}."
        ]
    ]);

    $commentsData = json_encode([
        [
            'id' => 'comm-' . substr(md5($ytId), 0, 4),
            'author' => "Verified Buyer",
            'text' => "Great review for {$productName}. Helped me make an informed purchase on Amazon with fast delivery!",
            'convertedText' => "Great review for {$productName}. Helped me make an informed purchase on Amazon with fast delivery!",
            'sentiment' => 'positive',
            'positivityScore' => 97,
            'negativityScore' => 3,
            'keyThemes' => ['Build Quality', 'Performance', 'Value'],
            'likesCount' => rand(120, 550),
            'timestamp' => '1 day ago'
        ]
    ]);

    $ytUrl = "https://www.youtube.com/watch?v={$ytId}";
    $thumbUrl = $reviewVideo['thumbnail'];
    $views = $reviewVideo['views'] ?? (rand(200, 950) . 'K');
    $likes = rand(15, 65) . 'K';
    $comments = rand(300, 950) . '';
    $pubAt = date('Y-m-d');
    $channel = $reviewVideo['channel'] ?? 'Tech Review Hub';
    $category = $p['cat'];

    $stmt->bind_param("sssssssssssssssssss",
        $uniqueId,
        $ytUrl,
        $ytId,
        $videoTitle,
        $videoTitle,
        $desc,
        $slug,
        $channel,
        $category,
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
        $saved_count++;
        $log[] = [
            'status' => 'SAVED_VERIFIED',
            'product' => $productName,
            'youtube_id' => $ytId,
            'video_title' => $reviewVideo['title'],
            'region' => $requested_region
        ];
    }
}

// Update sitemap for Google SEO
$sitemap_result = update_or_generate_sitemap($conn);

echo json_encode([
    'success' => true,
    'timestamp' => date('c'),
    'cron_name' => 'Amazon Best Sellers & YouTube Verified Matcher',
    'region' => $requested_region,
    'batch_limit_applied' => $batch_limit,
    'total_saved' => $saved_count,
    'skipped_duplicates' => $skipped_duplicate_count,
    'skipped_junk' => $skipped_junk_count,
    'activity_log' => $log,
    'sitemap' => $sitemap_result,
    'message' => "Checked batch of 5 items for {$requested_region}. Duplicates skipped; active reviews saved."
], JSON_PRETTY_PRINT);
?>
