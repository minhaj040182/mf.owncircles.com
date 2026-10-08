<?php
/**
 * Modern Fisheries - PHP & MySQL Database Configuration
 * Database: own_ModernFish
 * User: own_ModernFish
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Respond to preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials
// When deployed on your Plesk hosting, the MySQL server is on 'localhost' (or '127.0.0.1')
$db_host = getenv('DB_HOST') ? getenv('DB_HOST') : 'localhost';
$db_name = getenv('DB_NAME') ? getenv('DB_NAME') : 'own_ModernFish';
$db_user = getenv('DB_USER') ? getenv('DB_USER') : 'own_ModernFish';
$db_pass = getenv('DB_PASS') ? getenv('DB_PASS') : 'mLm&4LsqnVfkc6&0';
$db_port = getenv('DB_PORT') ? getenv('DB_PORT') : '3306';

try {
    $dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage(),
        'hint' => 'Check if DB credentials match Plesk MySQL user own_ModernFish'
    ]);
    exit();
}

/**
 * Haversine formula calculation for distance in Kilometers
 */
function calculateDistanceKm($lat1, $lon1, $lat2, $lon2) {
    $earthRadius = 6371; // Earth radius in kilometers
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);
    $a = sin($dLat / 2) * sin($dLat / 2) +
         cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
         sin($dLon / 2) * sin($dLon / 2);
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    return round($earthRadius * $c, 1);
}
?>
