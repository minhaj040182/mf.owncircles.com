<?php
/**
 * ModernFisheries Mailer Implementation
 * 
 * Supports Direct SMTP via Sockets with STARTTLS on Port 587
 * Features automatic port fallback (587, 465, 25, 2525) and multi-host candidates.
 */

require_once __DIR__ . '/smtp_config.php';

function sendEmail($to, $subject, $htmlBody, $plainBody = '', $replyTo = '') {
    $hosts = defined('SMTP_HOST_CANDIDATES') ? SMTP_HOST_CANDIDATES : [SMTP_HOST];
    $ports = defined('SMTP_FALLBACK_PORTS') ? SMTP_FALLBACK_PORTS : [SMTP_PORT];
    
    $lastError = '';

    foreach ($hosts as $host) {
        foreach ($ports as $port) {
            $result = sendViaSocketSmtp($host, $port, $to, $subject, $htmlBody, $plainBody, $replyTo);
            if ($result['success']) {
                return [
                    'success' => true,
                    'message' => 'Email sent successfully via ' . $host . ':' . $port,
                    'host' => $host,
                    'port' => $port
                ];
            } else {
                $lastError = $result['error'];
            }
        }
    }

    // If socket failed across all fallbacks, try native PHP mail() if allowed
    if (function_exists('mail')) {
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM_EMAIL . ">\r\n";
        if (!empty($replyTo)) {
            $headers .= "Reply-To: " . $replyTo . "\r\n";
        }
        $headers .= "X-Mailer: ModernFisheries-Mailer/1.0\r\n";

        if (@mail($to, $subject, $htmlBody, $headers)) {
            return [
                'success' => true,
                'message' => 'Email dispatched via local mail() fallback',
                'method' => 'mail()'
            ];
        }
    }

    return [
        'success' => false,
        'error' => 'Failed to send email through all SMTP candidates: ' . $lastError
    ];
}

function sendViaSocketSmtp($host, $port, $to, $subject, $htmlBody, $plainBody = '', $replyTo = '') {
    $timeout = 10;
    $isSsl = ($port == 465);
    $socketHost = $isSsl ? 'ssl://' . $host : $host;

    $socket = @fsockopen($socketHost, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        return ['success' => false, 'error' => "Cannot connect to $host:$port ($errstr)"];
    }

    $readResponse = function() use ($socket) {
        $response = "";
        while ($str = fgets($socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ") break;
        }
        return $response;
    };

    $sendCommand = function($cmd) use ($socket, $readResponse) {
        fputs($socket, $cmd . "\r\n");
        return $readResponse();
    };

    $initial = $readResponse();
    if (empty($initial) || substr($initial, 0, 3) !== '220') {
        fclose($socket);
        return ['success' => false, 'error' => "Bad initial response: $initial"];
    }

    // EHLO
    $ehlo = $sendCommand("EHLO " . (gethostname() ?: 'modernfisheries.local'));

    // STARTTLS for port 587, 25, 2525
    if (!$isSsl && (SMTP_SECURE_MODE === 'tls' || $port == 587)) {
        $tlsResponse = $sendCommand("STARTTLS");
        if (substr($tlsResponse, 0, 3) === '220') {
            $cryptoMethod = STREAM_CRYPTO_METHOD_TLS_CLIENT;
            if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
                $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
            }
            if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
                $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
            }

            stream_context_set_option($socket, 'ssl', 'verify_peer', false);
            stream_context_set_option($socket, 'ssl', 'verify_peer_name', false);
            stream_context_set_option($socket, 'ssl', 'allow_self_signed', true);

            if (!stream_socket_enable_crypto($socket, true, $cryptoMethod)) {
                fclose($socket);
                return ['success' => false, 'error' => "TLS crypto handshake failed"];
            }
            // Re-EHLO after STARTTLS
            $sendCommand("EHLO " . (gethostname() ?: 'modernfisheries.local'));
        }
    }

    // AUTH LOGIN
    if (!empty(SMTP_USER) && !empty(SMTP_PASS)) {
        $authResp = $sendCommand("AUTH LOGIN");
        if (substr($authResp, 0, 3) !== '334') {
            fclose($socket);
            return ['success' => false, 'error' => "AUTH LOGIN rejected: $authResp"];
        }

        $userResp = $sendCommand(base64_encode(SMTP_USER));
        if (substr($userResp, 0, 3) !== '334') {
            fclose($socket);
            return ['success' => false, 'error' => "Username rejected: $userResp"];
        }

        $passResp = $sendCommand(base64_encode(SMTP_PASS));
        if (substr($passResp, 0, 3) !== '235') {
            fclose($socket);
            return ['success' => false, 'error' => "Password rejected: $passResp"];
        }
    }

    // MAIL FROM
    $fromEmail = SMTP_FROM_EMAIL;
    $mailFromResp = $sendCommand("MAIL FROM:<$fromEmail>");
    if (substr($mailFromResp, 0, 3) !== '250') {
        fclose($socket);
        return ['success' => false, 'error' => "MAIL FROM failed: $mailFromResp"];
    }

    // RCPT TO
    $rcptResp = $sendCommand("RCPT TO:<$to>");
    if (substr($rcptResp, 0, 3) !== '250') {
        fclose($socket);
        return ['success' => false, 'error' => "RCPT TO failed: $rcptResp"];
    }

    // DATA
    $dataResp = $sendCommand("DATA");
    if (substr($dataResp, 0, 3) !== '354') {
        fclose($socket);
        return ['success' => false, 'error' => "DATA rejected: $dataResp"];
    }

    // Construct MIME message
    $boundary = "----=_Part_" . md5(uniqid(time()));
    $headers  = "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM_EMAIL . ">\r\n";
    $headers .= "To: <" . $to . ">\r\n";
    if (!empty($replyTo)) {
        $headers .= "Reply-To: " . $replyTo . "\r\n";
    }
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "Date: " . date("r") . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";

    $messageBody  = "--$boundary\r\n";
    $messageBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $messageBody .= chunk_split(base64_encode(!empty($plainBody) ? $plainBody : strip_tags($htmlBody))) . "\r\n";

    $messageBody .= "--$boundary\r\n";
    $messageBody .= "Content-Type: text/html; charset=UTF-8\r\n";
    $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $messageBody .= chunk_split(base64_encode($htmlBody)) . "\r\n";
    $messageBody .= "--$boundary--\r\n";

    fputs($socket, $headers . "\r\n" . $messageBody . "\r\n.\r\n");
    $sendResult = $readResponse();

    $sendCommand("QUIT");
    fclose($socket);

    if (substr($sendResult, 0, 3) === '250') {
        return ['success' => true];
    }

    return ['success' => false, 'error' => "Message dispatch rejected: $sendResult"];
}
?>
