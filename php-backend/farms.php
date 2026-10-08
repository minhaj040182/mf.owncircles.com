<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Optional radius filter
    $userLat = isset($_GET['lat']) ? floatval($_GET['lat']) : 20.9517;
    $userLon = isset($_GET['lon']) ? floatval($_GET['lon']) : 85.0985;
    $maxKm = isset($_GET['max_km']) ? floatval($_GET['max_km']) : 50.0;

    $stmt = $pdo->query("SELECT * FROM farms ORDER BY id DESC");
    $allFarms = $stmt->fetchAll();

    $results = [];
    foreach ($allFarms as $farm) {
        $distance = calculateDistanceKm($userLat, $userLon, floatval($farm['latitude']), floatval($farm['longitude']));
        $farm['distance_km'] = $distance;
        $farm['is_within_50km'] = ($distance <= $maxKm);
        $results[] = $farm;
    }

    echo json_encode(['success' => true, 'data' => $results, 'count' => count($results)]);
    exit();
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['name']) || empty($input['owner_name']) || empty($input['phone']) || empty($input['village'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide farm name, owner name, phone, and village']);
        exit();
    }

    $stmt = $pdo->prepare("
        INSERT INTO farms (name, owner_name, phone, village, district, latitude, longitude, farm_type, water_area_acres, primary_species)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        trim($input['name']),
        trim($input['owner_name']),
        trim($input['phone']),
        trim($input['village']),
        isset($input['district']) ? trim($input['district']) : 'Local District',
        isset($input['latitude']) ? floatval($input['latitude']) : 20.9517,
        isset($input['longitude']) ? floatval($input['longitude']) : 85.0985,
        isset($input['farm_type']) ? trim($input['farm_type']) : 'Earthen Pond',
        isset($input['water_area_acres']) ? floatval($input['water_area_acres']) : 1.0,
        isset($input['primary_species']) ? trim($input['primary_species']) : 'Rohu, Catla, Tilapia'
    ]);

    $newId = $pdo->lastInsertId();
    echo json_encode(['success' => true, 'message' => 'Farm registered successfully', 'id' => $newId]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
