<?php
/**
 * ModernFisheries Account Activation Endpoint
 * 
 * Accepts POST JSON: { "token": "XXXX" }
 * Or GET /activate.php?token=XXXX
 */

require_once __DIR__ . '/config.php';

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection unavailable.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// Handle GET request (e.g. from browser click)
if ($method === 'GET') {
    $token = isset($_GET['token']) ? trim($_GET['token']) : '';
    if (!empty($token)) {
        // Redirect to React front-end activation page with token
        header("Location: /activate?token=" . urlencode($token));
        exit;
    }
}

// Handle POST request from front-end
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: [];
    $token = isset($data['token']) ? trim($data['token']) : '';

    if (empty($token)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Activation token is required.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE activation_token = ? LIMIT 1");
        $stmt->execute([$token]);
        $user = $stmt->fetch();

        if (!$user) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Invalid or expired activation link. Please ensure you copied the complete link or register again.'
            ]);
            exit;
        }

        $alreadyActive = !empty($user['is_activated']);

        if (!$alreadyActive) {
            $update = $pdo->prepare("UPDATE users SET is_activated = 1, activated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $update->execute([$user['id']]);
        }

        $refreshed = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $refreshed->execute([$user['id']]);
        $updatedUser = $refreshed->fetch();

        echo json_encode([
            'success' => true,
            'message' => $alreadyActive ? 'Your account is already activated!' : 'Congratulations! Your ModernFisheries account has been successfully activated.',
            'alreadyActive' => $alreadyActive,
            'user' => $updatedUser
        ]);
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to process activation: ' . $e->getMessage()]);
        exit;
    }
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
?>
