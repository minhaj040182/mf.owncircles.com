<?php
/**
 * Modern Fisheries - Supplier Profile API
 * Creates and retrieves Supplier Profiles in MySQL database
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config.php';

$pdo = getDbConnection();
if (!$pdo) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $userId = isset($input['user_id']) ? (int)$input['user_id'] : 0;
    $userName = isset($input['user_name']) ? trim($input['user_name']) : '';
    $phone = isset($input['phone']) ? trim(preg_replace('/\s+/', '', $input['phone'])) : '';
    $businessName = isset($input['business_name']) ? trim($input['business_name']) : '';
    $category = isset($input['category']) ? trim($input['category']) : 'General Aquaculture Supplies';
    $contactPerson = isset($input['contact_person']) ? trim($input['contact_person']) : $userName;
    $village = isset($input['village']) ? trim($input['village']) : '';
    $district = isset($input['district']) ? trim($input['district']) : '';
    $address = isset($input['address']) ? trim($input['address']) : '';
    $deliveryRadiusKm = isset($input['delivery_radius_km']) ? (int)$input['delivery_radius_km'] : 50;
    $whatsapp = isset($input['whatsapp']) ? trim($input['whatsapp']) : $phone;
    $licenseNumber = isset($input['license_number']) ? trim($input['license_number']) : '';
    $latitude = isset($input['latitude']) ? (float)$input['latitude'] : 20.9517;
    $longitude = isset($input['longitude']) ? (float)$input['longitude'] : 85.0985;

    if (empty($businessName) || empty($category)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Business Name and Category are required.']);
        exit;
    }

    $stmt = $pdo->prepare(
        "INSERT INTO supplier_profiles 
          (user_id, user_name, phone, business_name, category, contact_person, village, district, address, delivery_radius_km, whatsapp, license_number, latitude, longitude) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->execute([
        $userId,
        $userName,
        $phone,
        $businessName,
        $category,
        $contactPerson,
        $village,
        $district,
        $address,
        $deliveryRadiusKm,
        $whatsapp,
        $licenseNumber,
        $latitude,
        $longitude
    ]);

    $profileId = $pdo->lastInsertId();

    if ($userId > 0) {
        $updateUser = $pdo->prepare("UPDATE users SET role = 'supplier' WHERE id = ?");
        $updateUser->execute([$userId]);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Supplier Profile saved in MySQL database successfully.',
        'profile_id' => $profileId,
        'profile' => [
            'id' => $profileId,
            'user_id' => $userId,
            'user_name' => $userName,
            'phone' => $phone,
            'business_name' => $businessName,
            'category' => $category,
            'contact_person' => $contactPerson,
            'village' => $village,
            'district' => $district,
            'address' => $address,
            'delivery_radius_km' => $deliveryRadiusKm,
            'whatsapp' => $whatsapp,
            'license_number' => $licenseNumber
        ]
    ]);
    exit;
}

if ($method === 'GET') {
    $userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;
    $phone = isset($_GET['phone']) ? trim(preg_replace('/\s+/', '', $_GET['phone'])) : '';

    if ($userId > 0) {
        $stmt = $pdo->prepare("SELECT * FROM supplier_profiles WHERE user_id = ? ORDER BY id DESC LIMIT 1");
        $stmt->execute([$userId]);
    } elseif (!empty($phone)) {
        $stmt = $pdo->prepare("SELECT * FROM supplier_profiles WHERE phone = ? ORDER BY id DESC LIMIT 1");
        $stmt->execute([$phone]);
    } else {
        $stmt = $pdo->query("SELECT * FROM supplier_profiles ORDER BY id DESC");
        $all = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $all]);
        exit;
    }

    $profile = $stmt->fetch();
    echo json_encode(['success' => true, 'profile' => $profile ?: null]);
    exit;
}
