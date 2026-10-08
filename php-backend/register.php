<?php
/**
 * Modern Fisheries - Farmer Hub User Registration & Login API
 * Compatible with PHP 7.4+ / 8.x and MySQL 5.7+ / 8.0+
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
require_once __DIR__ . '/mailer.php';

$pdo = getDbConnection();
if (!$pdo) {
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed. Check config.php settings.'
    ]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// Handle POST: Register new user or Login existing
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $action = isset($input['action']) ? trim($input['action']) : 'register';

    if ($action === 'login') {
        $phone = isset($input['phone']) ? trim(preg_replace('/\s+/', '', $input['phone'])) : '';
        if (empty($phone)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Phone number is required.']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT * FROM users WHERE phone = ? LIMIT 1");
        $stmt->execute([$phone]);
        $user = $stmt->fetch();

        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'No registered account found with this phone.']);
            exit;
        }

        // Fetch associated profiles
        $farmStmt = $pdo->prepare("SELECT * FROM farming_profiles WHERE user_id = ? OR phone = ? LIMIT 1");
        $farmStmt->execute([$user['id'], $phone]);
        $farmingProfile = $farmStmt->fetch();

        $supStmt = $pdo->prepare("SELECT * FROM supplier_profiles WHERE user_id = ? OR phone = ? LIMIT 1");
        $supStmt->execute([$user['id'], $phone]);
        $supplierProfile = $supStmt->fetch();

        echo json_encode([
            'success' => true,
            'user' => $user,
            'farming_profile' => $farmingProfile ?: null,
            'supplier_profile' => $supplierProfile ?: null
        ]);
        exit;
    }

    // Default: Register
    $fullName = isset($input['full_name']) ? trim($input['full_name']) : '';
    $phone = isset($input['phone']) ? trim(preg_replace('/\s+/', '', $input['phone'])) : '';
    $email = isset($input['email']) ? trim($input['email']) : '';
    $village = isset($input['village']) ? trim($input['village']) : '';
    $district = isset($input['district']) ? trim($input['district']) : '';
    $pin = isset($input['pin_password']) ? trim($input['pin_password']) : '1234';

    if (empty($fullName) || empty($phone) || empty($village) || empty($district)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Full Name, Phone, Village, and District are required.']);
        exit;
    }

    // Check if user already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE phone = ? LIMIT 1");
    $stmt->execute([$phone]);
    $existing = $stmt->fetch();

    if ($existing) {
        echo json_encode([
            'success' => true,
            'message' => 'Account already exists. Logged in successfully.',
            'user' => $existing,
            'isExisting' => true
        ]);
        exit;
    }

    // Generate unique activation token
    $activationToken = bin2hex(random_bytes(24));

    // Construct activation URL
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost';
    $baseUrl = $protocol . $host;
    $activationLink = $baseUrl . "/activate?token=" . $activationToken;

    $insert = $pdo->prepare("INSERT INTO users (full_name, phone, email, village, district, pin_password, role, is_activated, activation_token) VALUES (?, ?, ?, ?, ?, ?, 'unassigned', 0, ?)");
    $insert->execute([$fullName, $phone, $email, $village, $district, $pin, $activationToken]);
    $userId = $pdo->lastInsertId();

    $fetch = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $fetch->execute([$userId]);
    $newUser = $fetch->fetch();

    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mailSubject = "Activate Your ModernFisheries Account - Action Required";
        $mailHtml = '
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Activate Your Account</title></head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 32px 12px;">
    <tr><td align="center">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
        <tr>
          <td style="background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%); padding: 38px 28px; text-align: center;">
            <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 9999px; padding: 8px 18px; margin-bottom: 14px;">
              <span style="color: #ffffff; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">🐟 MODERNFISHERIES HUB</span>
            </div>
            <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; line-height: 1.25;">Verify &amp; Activate Account</h1>
            <p style="color: #a7f3d0; font-size: 14px; margin: 8px 0 0;">Empowering Regional Aquaculture &amp; Verified Farmers</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 34px 32px 28px;">
            <p style="font-size: 17px; color: #1e293b; margin: 0 0 16px;">Hello <strong style="color: #047857;">' . htmlspecialchars($fullName) . '</strong>,</p>
            <p style="font-size: 15px; color: #475569; margin: 0 0 22px; line-height: 1.6;">Thank you for registering on <strong>ModernFisheries Regional AquaFarmer Hub</strong>. To verify your email and unlock all features, please activate your account below.</p>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #059669; border-radius: 12px; padding: 18px 20px; margin-bottom: 26px;">
              <p style="margin: 0 0 10px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Registered Profile Details</p>
              <p style="margin: 4px 0; font-size: 14px; color: #0f172a;"><strong>Full Name:</strong> ' . htmlspecialchars($fullName) . '</p>
              <p style="margin: 4px 0; font-size: 14px; color: #0f172a;"><strong>Mobile:</strong> ' . htmlspecialchars($phone) . '</p>
              <p style="margin: 4px 0; font-size: 14px; color: #0f172a;"><strong>Location:</strong> ' . htmlspecialchars($village) . ', ' . htmlspecialchars($district) . '</p>
            </div>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0 24px;">
              <tr><td align="center">
                <a href="' . $activationLink . '" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 700; padding: 16px 38px; border-radius: 12px; box-shadow: 0 6px 18px rgba(5, 150, 105, 0.35);">&#10003; Activate My Account Now</a>
              </td></tr>
            </table>
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px 18px; margin-bottom: 20px;">
              <p style="margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #166534;">Simple 3-Step Process:</p>
              <p style="margin: 0; font-size: 13px; color: #15803d; line-height: 1.5;">1. Click the button &bull; 2. Instant verification confirmation &bull; 3. Setup your Farming or Supplier Profile.</p>
            </div>
            <p style="font-size: 12px; color: #64748b; margin: 0 0 6px;">Direct Link: <a href="' . $activationLink . '" style="color: #0284c7;">' . $activationLink . '</a></p>
            <p style="font-size: 12px; color: #64748b; margin: 0;">Token: <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">' . $activationToken . '</code></p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 24px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #64748b;">ModernFisheries Support &bull; <a href="mailto:noreply@owncircles.com" style="color: #059669;">noreply@owncircles.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>';
        @sendEmail($email, $mailSubject, $mailHtml);
    }

    echo json_encode([
        'success' => true,
        'message' => !empty($email) ? 'Registration successful! An activation link has been sent to your email.' : 'Registration successful! Now please select to create Farming Profile or Supplier Profile.',
        'user' => $newUser,
        'activationToken' => $activationToken,
        'activationLink' => $activationLink,
        'isExisting' => false
    ]);
    exit;
}

// GET: Check user by phone
if ($method === 'GET') {
    $phone = isset($_GET['phone']) ? trim(preg_replace('/\s+/', '', $_GET['phone'])) : '';
    if (empty($phone)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Phone parameter is required.']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE phone = ? LIMIT 1");
    $stmt->execute([$phone]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'User not found.']);
        exit;
    }

    $farmStmt = $pdo->prepare("SELECT * FROM farming_profiles WHERE user_id = ? OR phone = ? LIMIT 1");
    $farmStmt->execute([$user['id'], $phone]);
    $farmingProfile = $farmStmt->fetch();

    $supStmt = $pdo->prepare("SELECT * FROM supplier_profiles WHERE user_id = ? OR phone = ? LIMIT 1");
    $supStmt->execute([$user['id'], $phone]);
    $supplierProfile = $supStmt->fetch();

    echo json_encode([
        'success' => true,
        'user' => $user,
        'farming_profile' => $farmingProfile ?: null,
        'supplier_profile' => $supplierProfile ?: null
    ]);
    exit;
}
