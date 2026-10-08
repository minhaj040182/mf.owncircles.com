<?php
/**
 * ModernFisheries Email Dispatch API
 * Accepts POST JSON: { "to": "...", "subject": "...", "html": "...", "reply_to": "..." }
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/mailer.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['to']) || empty($input['subject'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Recipient "to" and "subject" are required.']);
        exit();
    }

    $to = trim($input['to']);
    $subject = trim($input['subject']);
    $htmlBody = !empty($input['html']) ? $input['html'] : (!empty($input['message']) ? nl2br(htmlspecialchars($input['message'])) : 'No content');
    $plainBody = !empty($input['text']) ? $input['text'] : strip_tags($htmlBody);
    $replyTo = !empty($input['reply_to']) ? trim($input['reply_to']) : '';

    $res = sendEmail($to, $subject, $htmlBody, $plainBody, $replyTo);
    if ($res['success']) {
        echo json_encode([
            'success' => true,
            'message' => 'Email sent successfully via ModernFisheries SMTP!',
            'details' => $res
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $res['error'],
            'smtp_server' => SMTP_HOST . ':' . SMTP_PORT
        ]);
    }
    exit();
}

// GET diagnostic view
echo json_encode([
    'service' => 'ModernFisheries SMTP Mailer',
    'status' => 'ready',
    'smtp_host' => SMTP_HOST,
    'smtp_port' => SMTP_PORT,
    'from_email' => SMTP_FROM_EMAIL,
    'from_name' => SMTP_FROM_NAME,
    'secure_mode' => SMTP_SECURE_MODE,
    'fallback_ports' => SMTP_FALLBACK_PORTS
]);
?>
