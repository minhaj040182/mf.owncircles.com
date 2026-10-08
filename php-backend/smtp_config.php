<?php
/**
 * ModernFisheries Mailer & SMTP Configuration
 * 
 * Configured for owncircles.com on Port 587 (EnableSsl: false / STARTTLS compatible)
 */

// SMTP Server Configuration
if (!defined('SMTP_HOST')) define('SMTP_HOST', 'owncircles.com');
if (!defined('SMTP_PORT')) define('SMTP_PORT', 587); // Primary working port: 587
if (!defined('SMTP_ENABLE_SSL')) define('SMTP_ENABLE_SSL', false); // EnableSsl: false matching .NET SmtpClient
if (!defined('SMTP_USER')) define('SMTP_USER', 'noreply@owncircles.com');
if (!defined('SMTP_PASS')) define('SMTP_PASS', 'e929_k8rG');
if (!defined('SMTP_FROM_EMAIL')) define('SMTP_FROM_EMAIL', 'noreply@owncircles.com');
if (!defined('SMTP_FROM_NAME')) define('SMTP_FROM_NAME', 'ModernFisheries');
if (!defined('SMTP_SECURE_MODE')) define('SMTP_SECURE_MODE', 'tls'); // 'tls', 'ssl', or 'plain'

// Programmatic multi-port fallback order (587 first, then 465 SSL, 25, 2525)
if (!defined('SMTP_FALLBACK_PORTS')) {
    define('SMTP_FALLBACK_PORTS', [587, 465, 25, 2525]);
}

// Multi-host candidates
if (!defined('SMTP_HOST_CANDIDATES')) {
    define('SMTP_HOST_CANDIDATES', [
        'owncircles.com',
        'mail.owncircles.com',
        'localhost',
        '127.0.0.1'
    ]);
}

// Incoming Mail Server Reference (POP3 / IMAP)
if (!defined('INCOMING_MAIL_HOST')) define('INCOMING_MAIL_HOST', 'owncircles.com');
if (!defined('POP3_HOST')) define('POP3_HOST', 'owncircles.com');
if (!defined('POP3_PORT')) define('POP3_PORT', 110);
if (!defined('POP3_SSL_PORT')) define('POP3_SSL_PORT', 995);
if (!defined('IMAP_HOST')) define('IMAP_HOST', 'owncircles.com');
if (!defined('IMAP_PORT')) define('IMAP_PORT', 143);
if (!defined('IMAP_SSL_PORT')) define('IMAP_SSL_PORT', 993);

// Programmatic Dispatch Policies (No hard blocking limitations)
if (!defined('PROGRAMMATIC_THROTTLE_ENABLED')) define('PROGRAMMATIC_THROTTLE_ENABLED', false);
if (!defined('MAX_EMAILS_PER_WINDOW')) define('MAX_EMAILS_PER_WINDOW', 1000);
if (!defined('RATE_LIMIT_WINDOW_SECONDS')) define('RATE_LIMIT_WINDOW_SECONDS', 3600);
if (!defined('TOKEN_EXPIRY_SECONDS')) define('TOKEN_EXPIRY_SECONDS', 86400); // 24 hours flexible verification window

// Application Base URL (Auto-detected if blank)
if (!defined('APP_DEFAULT_URL')) define('APP_DEFAULT_URL', '');
?>
