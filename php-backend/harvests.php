<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $species = isset($_GET['species']) ? trim($_GET['species']) : '';
    $userLat = isset($_GET['lat']) ? floatval($_GET['lat']) : 20.9517;
    $userLon = isset($_GET['lon']) ? floatval($_GET['lon']) : 85.0985;
    $maxKm = isset($_GET['max_km']) ? floatval($_GET['max_km']) : 50.0;

    if ($species !== '' && $species !== 'All') {
        $stmt = $pdo->prepare("SELECT * FROM harvest_listings WHERE fish_species LIKE ? ORDER BY harvest_date ASC");
        $stmt->execute(['%' . $species . '%']);
    } else {
        $stmt = $pdo->query("SELECT * FROM harvest_listings ORDER BY harvest_date ASC");
    }
    $harvests = $stmt->fetchAll();

    $results = [];
    foreach ($harvests as $h) {
        $distance = calculateDistanceKm($userLat, $userLon, floatval($h['latitude']), floatval($h['longitude']));
        $h['distance_km'] = $distance;
        $h['is_within_50km'] = ($distance <= $maxKm);
        $results[] = $h;
    }

    echo json_encode(['success' => true, 'data' => $results, 'count' => count($results)]);
    exit();
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['farmer_name']) || empty($input['phone']) || empty($input['fish_species']) || empty($input['ready_quantity_kg']) || empty($input['price_per_kg'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide farmer name, phone, fish species, quantity, and price/kg']);
        exit();
    }

    $stmt = $pdo->prepare("
        INSERT INTO harvest_listings (farm_id, farmer_name, phone, fish_species, ready_quantity_kg, avg_weight_kg, price_per_kg, harvest_date, village, latitude, longitude, notes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Ready for Harvest')
    ");

    $stmt->execute([
        isset($input['farm_id']) ? intval($input['farm_id']) : null,
        trim($input['farmer_name']),
        trim($input['phone']),
        trim($input['fish_species']),
        floatval($input['ready_quantity_kg']),
        isset($input['avg_weight_kg']) ? floatval($input['avg_weight_kg']) : 1.0,
        floatval($input['price_per_kg']),
        !empty($input['harvest_date']) ? $input['harvest_date'] : date('Y-m-d'),
        isset($input['village']) ? trim($input['village']) : 'Local Area',
        isset($input['latitude']) ? floatval($input['latitude']) : 20.9517,
        isset($input['longitude']) ? floatval($input['longitude']) : 85.0985,
        isset($input['notes']) ? trim($input['notes']) : ''
    ]);

    $newId = $pdo->lastInsertId();
    echo json_encode(['success' => true, 'message' => 'Harvest stock listed successfully', 'id' => $newId]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
