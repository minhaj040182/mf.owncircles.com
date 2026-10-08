<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM enquiries ORDER BY id DESC");
    $enquiries = $stmt->fetchAll();
    echo json_encode(['success' => true, 'data' => $enquiries]);
    exit();
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['buyer_name']) || empty($input['buyer_phone']) || empty($input['listing_type']) || empty($input['listing_id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide buyer name, phone, and listing details']);
        exit();
    }

    $stmt = $pdo->prepare("
        INSERT INTO enquiries (listing_type, listing_id, target_title, seller_farmer_name, buyer_name, buyer_phone, buyer_village, quantity_requested, message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        trim($input['listing_type']),
        intval($input['listing_id']),
        isset($input['target_title']) ? trim($input['target_title']) : 'Product/Harvest Order',
        isset($input['seller_farmer_name']) ? trim($input['seller_farmer_name']) : 'Seller/Farmer',
        trim($input['buyer_name']),
        trim($input['buyer_phone']),
        isset($input['buyer_village']) ? trim($input['buyer_village']) : '',
        isset($input['quantity_requested']) ? trim($input['quantity_requested']) : '',
        isset($input['message']) ? trim($input['message']) : ''
    ]);

    $newId = $pdo->lastInsertId();
    echo json_encode(['success' => true, 'message' => 'Your order enquiry has been sent to the seller/farmer.', 'id' => $newId]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
