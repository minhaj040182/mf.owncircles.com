<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $category = isset($_GET['category']) ? trim($_GET['category']) : '';
    $userLat = isset($_GET['lat']) ? floatval($_GET['lat']) : 20.9517;
    $userLon = isset($_GET['lon']) ? floatval($_GET['lon']) : 85.0985;
    $maxKm = isset($_GET['max_km']) ? floatval($_GET['max_km']) : 50.0;

    if ($category !== '' && $category !== 'All') {
        $stmt = $pdo->prepare("SELECT * FROM equipment_listings WHERE is_available = 1 AND category = ? ORDER BY id DESC");
        $stmt->execute([$category]);
    } else {
        $stmt = $pdo->query("SELECT * FROM equipment_listings WHERE is_available = 1 ORDER BY id DESC");
    }
    $items = $stmt->fetchAll();

    $results = [];
    foreach ($items as $item) {
        $distance = calculateDistanceKm($userLat, $userLon, floatval($item['latitude']), floatval($item['longitude']));
        $item['distance_km'] = $distance;
        $item['is_within_50km'] = ($distance <= $maxKm);
        $results[] = $item;
    }

    echo json_encode(['success' => true, 'data' => $results, 'count' => count($results)]);
    exit();
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['title']) || empty($input['seller_name']) || empty($input['phone']) || empty($input['price'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide equipment title, seller name, phone, and price']);
        exit();
    }

    $stmt = $pdo->prepare("
        INSERT INTO equipment_listings (farm_id, seller_name, phone, title, category, description, price, condition_type, village, latitude, longitude, is_available)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    ");

    $stmt->execute([
        isset($input['farm_id']) ? intval($input['farm_id']) : null,
        trim($input['seller_name']),
        trim($input['phone']),
        trim($input['title']),
        isset($input['category']) ? trim($input['category']) : 'General Equipment',
        isset($input['description']) ? trim($input['description']) : '',
        floatval($input['price']),
        isset($input['condition_type']) ? trim($input['condition_type']) : 'New',
        isset($input['village']) ? trim($input['village']) : 'Local Area',
        isset($input['latitude']) ? floatval($input['latitude']) : 20.9517,
        isset($input['longitude']) ? floatval($input['longitude']) : 85.0985
    ]);

    $newId = $pdo->lastInsertId();
    echo json_encode(['success' => true, 'message' => 'Equipment listed successfully', 'id' => $newId]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
