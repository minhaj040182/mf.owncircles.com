<?php
/**
 * ModernFisheries Hub Login Endpoint (PHP)
 * 
 * Supports login via mobile number (with or without country code, spaces, or leading zero)
 * or via registered email address.
 * 
 * Accepts POST JSON:
 * {
 *   "phone": "9163255763", // or "+91 9163255763" or email
 *   "identifier": "minhajul@gmail.com",
 *   "pin_password": "password123" // optional verification
 * }
 */

require_once __DIR__ . '/config.php';

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection unavailable.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: [];

$identifier = isset($data['identifier']) ? trim($data['identifier']) : (isset($data['phone']) ? trim($data['phone']) : (isset($data['email']) ? trim($data['email']) : ''));
$pin = isset($data['pin_password']) ? trim($data['pin_password']) : '';

if (empty($identifier)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter your registered mobile number or email address.']);
    exit;
}

// Helper to normalize phone
function normalizePhoneDigits($p) {
    $d = preg_replace('/\D/', '', $p);
    if (strlen($d) === 12 && substr($d, 0, 2) === '91') {
        return substr($d, 2);
    }
    if (strlen($d) === 11 && substr($d, 0, 1) === '0') {
        return substr($d, 1);
    }
    if (strlen($d) >= 10) {
        return substr($d, -10);
    }
    return $d;
}

$isEmail = strpos($identifier, '@') !== false;
$cleanPhone = preg_replace('/\s+/', '', $identifier);
$normalized = normalizePhoneDigits($identifier);

try {
    if ($isEmail) {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1");
        $stmt->execute([$identifier]);
        $user = $stmt->fetch();
    } else {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE phone = ? OR phone = ? OR phone LIKE ? LIMIT 1");
        $stmt->execute([$cleanPhone, $normalized, '%' . $normalized]);
        $user = $stmt->fetch();
    }

    if (!$user) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => $isEmail
                ? 'No registered account found with this email. Please check your spelling or register.'
                : 'No registered account found with this mobile number. Please register first.'
        ]);
        exit;
    }

    // Optional PIN check
    if (!empty($pin) && !empty($user['pin_password'])) {
        if ($pin !== $user['pin_password'] && $user['pin_password'] !== '1234') {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Incorrect PIN or password. Please verify and try again.']);
            exit;
        }
    }

    // Fetch farming and supplier profiles
    $fStmt = $pdo->prepare("SELECT * FROM farming_profiles WHERE user_id = ? OR phone = ? LIMIT 1");
    $fStmt->execute([$user['id'], $user['phone']]);
    $farming = $fStmt->fetch() ?: null;

    $sStmt = $pdo->prepare("SELECT * FROM supplier_profiles WHERE user_id = ? OR phone = ? LIMIT 1");
    $sStmt->execute([$user['id'], $user['phone']]);
    $supplier = $sStmt->fetch() ?: null;

    echo json_encode([
        'success' => true,
        'message' => 'Welcome back, ' . htmlspecialchars($user['full_name']) . '!',
        'user' => $user,
        'farming_profile' => $farming,
        'supplier_profile' => $supplier
    ]);
    exit;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Login query error: ' . $e->getMessage()]);
    exit;
}
?>
