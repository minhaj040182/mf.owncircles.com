<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $farmId = isset($_GET['farm_id']) ? intval($_GET['farm_id']) : 1;
    $stmt = $pdo->prepare("SELECT * FROM expenses WHERE farm_id = ? ORDER BY expense_date DESC");
    $stmt->execute([$farmId]);
    $expenses = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $expenses]);
    exit();
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['category']) || empty($input['amount'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide category and amount']);
        exit();
    }

    $stmt = $pdo->prepare("
        INSERT INTO expenses (farm_id, expense_date, category, amount, notes, payment_mode)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        isset($input['farm_id']) ? intval($input['farm_id']) : 1,
        !empty($input['expense_date']) ? $input['expense_date'] : date('Y-m-d'),
        trim($input['category']),
        floatval($input['amount']),
        isset($input['notes']) ? trim($input['notes']) : '',
        isset($input['payment_mode']) ? trim($input['payment_mode']) : 'Cash'
    ]);

    $newId = $pdo->lastInsertId();
    echo json_encode(['success' => true, 'message' => 'Expense recorded', 'id' => $newId]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
