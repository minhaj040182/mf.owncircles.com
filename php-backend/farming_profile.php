<?php
/**
 * Modern Fisheries - Farming Profile API
 * Creates and retrieves Farming Profiles in MySQL database
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
    $farmName = isset($input['farm_name']) ? trim($input['farm_name']) : '';
    $farmType = isset($input['farm_type']) ? trim($input['farm_type']) : 'Earthen Pond';
    $waterArea = isset($input['water_area']) ? trim($input['water_area']) : '';
    $pondCount = isset($input['pond_count']) ? trim($input['pond_count']) : '1';
    $fishSpecies = isset($input['fish_species']) ? trim($input['fish_species']) : '';
    $village = isset($input['village']) ? trim($input['village']) : '';
    $district = isset($input['district']) ? trim($input['district']) : '';
    $address = isset($input['address']) ? trim($input['address']) : '';
    $latitude = isset($input['latitude']) ? (float)$input['latitude'] : 20.9517;
    $longitude = isset($input['longitude']) ? (float)$input['longitude'] : 85.0985;
    $experienceYears = isset($input['experience_years']) ? trim($input['experience_years']) : '';

    if (empty($farmName) || empty($waterArea)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Farm Name and Water Area are required.']);
        exit;
    }

    $stmt = $pdo->prepare(
        "INSERT INTO farming_profiles 
          (user_id, user_name, phone, farm_name, farm_type, water_area, pond_count, fish_species, village, district, address, latitude, longitude, experience_years) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->execute([
        $userId,
        $userName,
        $phone,
        $farmName,
        $farmType,
        $waterArea,
        $pondCount,
        $fishSpecies,
        $village,
        $district,
        $address,
        $latitude,
        $longitude,
        $experienceYears
    ]);

    $profileId = $pdo->lastInsertId();

    if ($userId > 0) {
        $updateUser = $pdo->prepare("UPDATE users SET role = 'farmer' WHERE id = ?");
        $updateUser->execute([$userId]);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Farming Profile saved in MySQL database successfully.',
        'profile_id' => $profileId,
        'profile' => [
            'id' => $profileId,
            'user_id' => $userId,
            'user_name' => $userName,
            'phone' => $phone,
            'farm_name' => $farmName,
            'farm_type' => $farmType,
            'water_area' => $waterArea,
            'pond_count' => $pondCount,
            'fish_species' => $fishSpecies,
            'village' => $village,
            'district' => $district,
            'address' => $address,
            'experience_years' => $experienceYears
        ]
    ]);
    exit;
}

if ($method === 'GET') {
    $userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;
    $phone = isset($_GET['phone']) ? trim(preg_replace('/\s+/', '', $_GET['phone'])) : '';

    if ($userId > 0) {
        $stmt = $pdo->prepare("SELECT * FROM farming_profiles WHERE user_id = ? ORDER BY id DESC LIMIT 1");
        $stmt->execute([$userId]);
    } elseif (!empty($phone)) {
        $stmt = $pdo->prepare("SELECT * FROM farming_profiles WHERE phone = ? ORDER BY id DESC LIMIT 1");
        $stmt->execute([$phone]);
    } else {
        $stmt = $pdo->query("SELECT * FROM farming_profiles ORDER BY id DESC");
        $all = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $all]);
        exit;
    }

    $profile = $stmt->fetch();
    echo json_encode(['success' => true, 'profile' => $profile ?: null]);
    exit;
}
