<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $farmId = isset($_GET['farm_id']) ? intval($_GET['farm_id']) : 1;
    $stmt = $pdo->prepare("SELECT * FROM harvest_sales WHERE farm_id = ? ORDER BY sale_date DESC");
    $stmt->execute([$farmId]);
    $sales = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $sales]);
    exit();
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['fish_species']) || empty($input['quantity_kg']) || empty($input['price_per_kg'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide fish species, quantity, and price/kg']);
        exit();
    }

    $qty = floatval($input['quantity_kg']);
    $price = floatval($input['price_per_kg']);
    $total = isset($input['total_amount']) ? floatval($input['total_amount']) : ($qty * $price);

    $stmt = $pdo->prepare("
        INSERT INTO harvest_sales (farm_id, sale_date, fish_species, quantity_kg, price_per_kg, total_amount, buyer_name, buyer_phone, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        isset($input['farm_id']) ? intval($input['farm_id']) : 1,
        !empty($input['sale_date']) ? $input['sale_date'] : date('Y-m-d'),
        trim($input['fish_species']),
        $qty,
        $price,
        $total,
        isset($input['buyer_name']) ? trim($input['buyer_name']) : '',
        isset($input['buyer_phone']) ? trim($input['buyer_phone']) : '',
        isset($input['notes']) ? trim($input['notes']) : ''
    ]);

    $newId = $pdo->lastInsertId();
    echo json_encode(['success' => true, 'message' => 'Fish sale recorded', 'id' => $newId]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
