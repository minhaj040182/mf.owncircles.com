# Modern Fisheries - PHP & MySQL Backend for Plesk Hosting

This folder contains the native PHP backend and MySQL schema for Modern Fisheries Farmer Hub.

## Database Credentials (Plesk MySQL)
- **Host**: `localhost` (when hosted directly on your Plesk Apache/Nginx) or `204.11.58.166`
- **Database**: `own_ModernFish`
- **User**: `own_ModernFish`
- **Password**: `mLm&4LsqnVfkc6&0`

## Tables Included in `schema.sql` (Zero Dummy Data)
1. **`users`**: Registered farmer and supplier accounts (name, phone, location, password/PIN, role).
2. **`farming_profiles`**: Farming profiles (farm name, pond type, water area, fish varieties, location coordinates).
3. **`supplier_profiles`**: Supplier profiles (shop/company name, category, contact person, WhatsApp, 50 KM delivery radius).

## Deployment to Plesk:
1. Open **Plesk Panel** -> **Databases** -> **phpMyAdmin** for `own_ModernFish`.
2. Click **Import** and upload `schema.sql`. (Tables will be created cleanly with 0 dummy records).
3. Upload all `.php` files to your Plesk web folder (e.g. `/httpdocs/api/`).
4. Ensure `config.php` has the correct database credentials.

## API Endpoints:
- `POST /api/register.php` - Register a new farmer or supplier user (or login, with automated welcome email).
- `GET /api/register.php?phone=XXXX` - Fetch user details by phone.
- `POST /api/farming_profile.php` - Save a new Farming Profile.
- `GET /api/farming_profile.php?phone=XXXX` - Get Farming Profile details.
- `POST /api/supplier_profile.php` - Save a new Supplier Profile.
- `GET /api/supplier_profile.php?phone=XXXX` - Get Supplier Profile details.
- `POST /api/send_mail.php` - Send emails using ModernFisheries SMTP configuration.
- `GET /api/send_mail.php` - View SMTP status and configured host/port settings.

## SMTP Email Configuration (`smtp_config.php` & `mailer.php`)
- **Host**: `owncircles.com` (Port 587 STARTTLS)
- **User**: `noreply@owncircles.com`
- **Pass**: `e929_k8rG`
- **From**: `ModernFisheries <noreply@owncircles.com>`
- **Fallback Ports**: `[587, 465, 25, 2525]`
- **Helper Function**: `sendEmail($to, $subject, $htmlBody, $plainBody, $replyTo)`

