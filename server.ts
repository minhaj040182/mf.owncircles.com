import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());

// ============================================================================
// SEO 301 Permanent Redirects for Search Engine Crawlers (Googlebot, Bingbot)
// Informs crawlers that legacy/deleted URLs are permanently moved to canonical routes
// ============================================================================
const SEO_301_REDIRECT_MAP: Record<string, string> = {
  "/videos": "/farming-videos",
  "/video": "/farming-videos",
  "/video/pond-water-treatment-with-lime-potassium-permanganate-own-18": "/farming-videos",
  "/video/own-18": "/farming-videos",
  "/video/harvesting-rohu-carp-tilapia-from-pond-own-2": "/farming-videos",
  "/video/own-2": "/farming-videos",
  "/video/high-density-biofloc-tilapia-farming-cn-ratio-masterclass-idea-2": "/farming-videos",
  "/video/idea-2": "/farming-videos",
  "/home": "/",
  "/pond": "/pond-farming",
  "/biofloc": "/bioflock",
  "/biofloc-farming": "/bioflock",
  "/hydroponics": "/hydroponic",
  "/hydroponics-farming": "/hydroponic",
  "/feed": "/feeding-management",
  "/diseases": "/fish-diseases",
  "/ras": "/aquaponic",
  "/ras-farming": "/aquaponic",
  "/aquaponics": "/aquaponics-farming",
  "/calculator": "/calculators",
  "/calc": "/calculators",
  "/services": "/ourservices",
  "/about": "/about-us",
  "/privacy": "/privacy-policy",
  "/frequently-asked-questions": "/faq",
};

app.use((req: Request, res: Response, next) => {
  const originalUrl = req.originalUrl || req.url;
  const rawPath = req.path;

  // 1. Specific 301 Permanent Redirects for trailing-slash URLs
  if (rawPath === "/pond-farming/" || originalUrl.startsWith("/pond-farming/")) {
    const targetUrl = "/pond-farming" + (originalUrl.includes("?") ? `?${originalUrl.split("?")[1]}` : "");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.redirect(301, targetUrl);
  }

  if (rawPath === "/feeding-management/" || originalUrl.startsWith("/feeding-management/")) {
    const targetUrl = "/feeding-management" + (originalUrl.includes("?") ? `?${originalUrl.split("?")[1]}` : "");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.redirect(301, targetUrl);
  }

  // 2. Trailing-slash 301 Permanent Redirect for SEO (e.g. /path/ -> /path)
  if (rawPath.length > 1 && rawPath.endsWith("/")) {
    const cleanPath = rawPath.replace(/\/+$/, "") + (originalUrl.includes("?") ? `?${originalUrl.split("?")[1]}` : "");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.redirect(301, cleanPath);
  }

  // 3. Mapping of legacy alias paths to canonical URLs
  const reqPath = req.path.toLowerCase().replace(/\/+$/, "") || "/";
  const target = SEO_301_REDIRECT_MAP[reqPath];
  if (target) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.redirect(301, target);
  }
  // Also handle /videos/* -> /farming-videos
  if (reqPath.startsWith("/videos/")) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.redirect(301, "/farming-videos");
  }
  next();
});

// SMTP Server Configuration (ModernFisheries Mailer)
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || "owncircles.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false, // Port 587 uses STARTTLS
  auth: {
    user: process.env.SMTP_USER || "noreply@owncircles.com",
    pass: process.env.SMTP_PASS || "e929_k8rG",
  },
  tls: {
    rejectUnauthorized: false,
  },
  fromEmail: process.env.SMTP_FROM_EMAIL || "noreply@owncircles.com",
  fromName: process.env.SMTP_FROM_NAME || "ModernFisheries",
};

const mailTransporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.auth.user,
    pass: SMTP_CONFIG.auth.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendModernFisheriesEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const info = await mailTransporter.sendMail({
      from: `"${SMTP_CONFIG.fromName}" <${SMTP_CONFIG.fromEmail}>`,
      to: options.to,
      subject: options.subject,
      text: options.text || options.html.replace(/<[^>]*>?/gm, ""),
      html: options.html,
      replyTo: options.replyTo,
    });
    console.log(`[SMTP] Email successfully sent to ${options.to} (MessageID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error("[SMTP Mailer Error]:", err?.message || err);
    return { success: false, error: err?.message || "Failed to send email" };
  }
}

// Attractive, responsive HTML email template for account activation
function buildActivationEmailHtml({
  fullName,
  phone,
  village,
  district,
  activationLink,
  token,
}: {
  fullName: string;
  phone: string;
  village: string;
  district: string;
  activationLink: string;
  token: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activate Your ModernFisheries Account</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%); padding: 38px 28px; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <!-- Brand Pill -->
                    <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 9999px; padding: 8px 18px; margin-bottom: 14px;">
                      <span style="color: #ffffff; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                        🐟 MODERNFISHERIES HUB
                      </span>
                    </div>
                    <h1 style="color: #ffffff; font-size: 27px; font-weight: 800; margin: 0; line-height: 1.25; letter-spacing: -0.5px;">
                      Verify &amp; Activate Account
                    </h1>
                    <p style="color: #a7f3d0; font-size: 14px; margin: 8px 0 0; font-weight: 500;">
                      Empowering Regional Aquaculture &amp; Verified Farmers
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 34px 32px 28px;">
              <p style="font-size: 17px; color: #1e293b; margin: 0 0 16px; line-height: 1.5;">
                Hello <strong style="color: #047857;">${fullName}</strong>,
              </p>
              
              <p style="font-size: 15px; color: #475569; margin: 0 0 22px; line-height: 1.6;">
                Thank you for registering on the <strong>ModernFisheries Regional AquaFarmer Hub</strong>. To verify your email address and unlock all features—including finding verified local fish seed, feed, and aerator suppliers—please complete your one-click account activation below.
              </p>

              <!-- Registration Credentials Summary -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #059669; border-radius: 12px; padding: 18px 20px; margin-bottom: 26px;">
                <p style="margin: 0 0 10px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px;">
                  Registered Profile Details
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #64748b; width: 35%;">Full Name:</td>
                    <td style="padding: 4px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #64748b;">Mobile Phone:</td>
                    <td style="padding: 4px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #64748b;">Location:</td>
                    <td style="padding: 4px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${village}, ${district}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #64748b;">Status:</td>
                    <td style="padding: 4px 0;">
                      <span style="display: inline-block; background-color: #fef3c7; color: #92400e; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 9999px; border: 1px solid #fde68a;">
                        Pending Activation
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Main Call To Action Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0 24px;">
                <tr>
                  <td align="center">
                    <a href="${activationLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 700; padding: 16px 38px; border-radius: 12px; box-shadow: 0 6px 18px rgba(5, 150, 105, 0.35); text-align: center; letter-spacing: 0.3px;">
                      &#10003; Activate My Account Now
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Activation Process Guide -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 10px; font-size: 13px; font-weight: 700; color: #166534;">
                  ✨ Simple 3-Step Activation Process:
                </p>
                <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #15803d; line-height: 1.6;">
                  <li style="margin-bottom: 6px;"><strong>Click the button above</strong> to automatically verify your account token.</li>
                  <li style="margin-bottom: 6px;"><strong>Instant confirmation</strong> will be displayed on screen confirming your active status.</li>
                  <li><strong>Setup your profile</strong> as an AquaFarmer (Ponds, Biofloc, RAS) or as a Supplier (Feed, Equipment, Seed).</li>
                </ol>
              </div>

              <!-- Alternative Link Box -->
              <p style="font-size: 12px; color: #64748b; margin: 0 0 8px; line-height: 1.5;">
                If the button above does not work, copy and paste this link into your web browser:
              </p>
              <div style="background-color: #f1f5f9; padding: 10px 14px; border-radius: 8px; font-size: 12px; color: #0284c7; word-break: break-all; font-family: monospace; border: 1px solid #cbd5e1; margin-bottom: 16px;">
                <a href="${activationLink}" style="color: #0284c7; text-decoration: underline;">${activationLink}</a>
              </div>
              <p style="font-size: 12px; color: #64748b; margin: 0;">
                Your unique activation token is: <strong style="font-family: monospace; background: #e2e8f0; padding: 2px 6px; border-radius: 4px; color: #0f172a;">${token}</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 22px 30px; text-align: center;">
              <p style="margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #334155;">
                ModernFisheries AquaFarmer Network
              </p>
              <p style="margin: 0 0 10px; font-size: 12px; color: #64748b;">
                Questions or assistance? Contact our team at <a href="mailto:noreply@owncircles.com" style="color: #059669; text-decoration: none; font-weight: 600;">noreply@owncircles.com</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                This message was automatically sent to verify your registration on ModernFisheries. If you did not create this account, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Distance calculation helper (Haversine formula in KM)
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const earthRadius = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(earthRadius * c * 10) / 10;
}

// Normalize phone numbers for seamless matching across prefixes, country codes (+91), spaces, and dashes
function normalizePhoneNumber(raw: string): string {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  // Indian 12-digit format with country code 91: e.g. 919163255763 -> 9163255763
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  // 11-digit format with leading zero: e.g. 09163255763 -> 9163255763
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }
  // If 10 or more digits, take last 10 digits
  if (digits.length >= 10) {
    return digits.slice(-10);
  }
  return digits;
}

// Database configuration for user's Plesk MySQL
const DB_CONFIG = {
  host: process.env.MYSQL_HOST || "204.11.58.166",
  port: parseInt(process.env.MYSQL_PORT || "3306", 10),
  user: process.env.MYSQL_USER || "own_ModernFish",
  password: process.env.MYSQL_PASSWORD || "mLm&4LsqnVfkc6&0",
  database: process.env.MYSQL_DATABASE || "own_ModernFish",
  connectTimeout: 3500,
};

let mysqlPool: mysql.Pool | null = null;
let mysqlStatus = {
  connected: false,
  message: "Testing connection...",
  host: DB_CONFIG.host,
  database: DB_CONFIG.database,
  user: DB_CONFIG.user,
  checkedAt: new Date().toISOString(),
};

// Server-side persistent storage file for resilience
const DATA_DIR = path.resolve(process.cwd(), "server-data");
const DATA_FILE = path.join(DATA_DIR, "farmer_database.json");

interface UserRecord {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  village: string;
  district: string;
  pin_password?: string;
  role?: "unassigned" | "farmer" | "supplier";
  is_activated?: boolean | number;
  activation_token?: string;
  activated_at?: string | null;
  created_at: string;
}

interface FarmingProfileRecord {
  id: number;
  user_id: number;
  user_name: string;
  phone: string;
  farm_name: string;
  farm_type: string;
  water_area: string;
  pond_count: string;
  fish_species: string;
  village: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  experience_years: string;
  created_at: string;
}

interface SupplierProfileRecord {
  id: number;
  user_id: number;
  user_name: string;
  phone: string;
  business_name: string;
  category: string;
  contact_person: string;
  village: string;
  district: string;
  address: string;
  delivery_radius_km: number;
  whatsapp: string;
  license_number: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

interface DataStore {
  users: UserRecord[];
  farming_profiles: FarmingProfileRecord[];
  supplier_profiles: SupplierProfileRecord[];
  farms: any[];
  equipment: any[];
  harvests: any[];
  enquiries: any[];
  expenses: any[];
  sales: any[];
  water_logs: any[];
  notifications: any[];
  buyer_requirements: any[];
}

// Zero dummy data initial store
function getInitialStore(): DataStore {
  return {
    users: [],
    farming_profiles: [],
    supplier_profiles: [],
    farms: [],
    equipment: [],
    harvests: [],
    enquiries: [],
    expenses: [],
    sales: [],
    water_logs: [],
    notifications: [],
    buyer_requirements: [],
  };
}

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readDataStore(): DataStore {
  ensureDataDirectory();
  if (!fs.existsSync(DATA_FILE)) {
    const fresh = getInitialStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(fresh, null, 2), "utf8");
    return fresh;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      farming_profiles: Array.isArray(parsed.farming_profiles) ? parsed.farming_profiles : [],
      supplier_profiles: Array.isArray(parsed.supplier_profiles) ? parsed.supplier_profiles : [],
      farms: Array.isArray(parsed.farms) ? parsed.farms : [],
      equipment: Array.isArray(parsed.equipment) ? parsed.equipment : [],
      harvests: Array.isArray(parsed.harvests) ? parsed.harvests : [],
      enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
      sales: Array.isArray(parsed.sales) ? parsed.sales : [],
      water_logs: Array.isArray(parsed.water_logs) ? parsed.water_logs : [],
      notifications: Array.isArray(parsed.notifications) ? parsed.notifications : [],
      buyer_requirements: Array.isArray(parsed.buyer_requirements) ? parsed.buyer_requirements : [],
    };
  } catch (e) {
    console.error("Failed to read server data file, resetting to clean store:", e);
    const fresh = getInitialStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(fresh, null, 2), "utf8");
    return fresh;
  }
}

function writeDataStore(data: DataStore) {
  ensureDataDirectory();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// Initialize MySQL pool and create tables without any dummy data
async function initMySQL() {
  mysqlStatus.checkedAt = new Date().toISOString();
  try {
    console.log(`[MySQL] Attempting connection to ${DB_CONFIG.host}:${DB_CONFIG.port} for user ${DB_CONFIG.user}...`);
    const pool = mysql.createPool({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
      database: DB_CONFIG.database,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: DB_CONFIG.connectTimeout,
    });

    const connection = await pool.getConnection();
    connection.release();

    mysqlPool = pool;
    mysqlStatus.connected = true;
    mysqlStatus.message = `Successfully connected to MySQL database: ${DB_CONFIG.database}`;
    console.log(`[MySQL] Connected successfully to ${DB_CONFIG.host}! Initializing schema...`);

    // Create tables without dummy seed data
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(120) NOT NULL,
        phone VARCHAR(25) NOT NULL UNIQUE,
        email VARCHAR(120) DEFAULT '',
        village VARCHAR(150) NOT NULL,
        district VARCHAR(100) NOT NULL,
        pin_password VARCHAR(100) NOT NULL,
        role VARCHAR(30) DEFAULT 'unassigned',
        is_activated TINYINT(1) DEFAULT 0,
        activation_token VARCHAR(100) DEFAULT NULL,
        activated_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Ensure activation columns exist if table was already created
    try { await mysqlPool.query("ALTER TABLE users ADD COLUMN is_activated TINYINT(1) DEFAULT 0"); } catch {}
    try { await mysqlPool.query("ALTER TABLE users ADD COLUMN activation_token VARCHAR(100) DEFAULT NULL"); } catch {}
    try { await mysqlPool.query("ALTER TABLE users ADD COLUMN activated_at TIMESTAMP NULL DEFAULT NULL"); } catch {}

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS farming_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        user_name VARCHAR(120) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        farm_name VARCHAR(150) NOT NULL,
        farm_type VARCHAR(50) DEFAULT 'Earthen Pond',
        water_area VARCHAR(100) NOT NULL,
        pond_count VARCHAR(50) DEFAULT '1',
        fish_species VARCHAR(255) DEFAULT '',
        address TEXT,
        village VARCHAR(150) NOT NULL,
        district VARCHAR(100) NOT NULL,
        latitude DECIMAL(10, 7) DEFAULT 20.9517,
        longitude DECIMAL(10, 7) DEFAULT 85.0985,
        experience_years VARCHAR(50) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX(user_id),
        INDEX(phone)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS supplier_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        user_name VARCHAR(120) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        business_name VARCHAR(150) NOT NULL,
        category VARCHAR(100) NOT NULL,
        contact_person VARCHAR(120) NOT NULL,
        address TEXT,
        village VARCHAR(150) NOT NULL,
        district VARCHAR(100) NOT NULL,
        delivery_radius_km INT DEFAULT 50,
        whatsapp VARCHAR(25) DEFAULT '',
        license_number VARCHAR(100) DEFAULT '',
        latitude DECIMAL(10, 7) DEFAULT 20.9517,
        longitude DECIMAL(10, 7) DEFAULT 85.0985,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX(user_id),
        INDEX(phone)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log("[MySQL] Schema verified (0 dummy data).");
  } catch (err: any) {
    mysqlPool = null;
    mysqlStatus.connected = false;
    mysqlStatus.message = `MySQL remote connection inactive (${err.code || err.message}). Using local persistent database.`;
    console.warn(`[MySQL Notice] ${mysqlStatus.message}`);
  }
}

// Start database check on boot
initMySQL();

// ============================================================================
// API Endpoints
// ============================================================================

// 1. Status Check
app.get("/api/db/status", (req: Request, res: Response) => {
  const store = readDataStore();
  res.json({
    success: true,
    mysql: mysqlStatus,
    stats: {
      registered_users: store.users.length,
      farming_profiles: store.farming_profiles.length,
      supplier_profiles: store.supplier_profiles.length,
    },
  });
});

// Re-test MySQL connection
app.post("/api/db/reconnect", async (req: Request, res: Response) => {
  await initMySQL();
  res.json({ success: true, mysql: mysqlStatus });
});

// 2. Register User (Step 1)
app.post("/api/register", async (req: Request, res: Response) => {
  const { full_name, phone, email, village, district, pin_password } = req.body;

  if (!full_name || !phone || !village || !district) {
    return res.status(400).json({
      success: false,
      error: "Please provide Full Name, Phone, Village, and District.",
    });
  }

  const cleanPhone = phone.trim().replace(/\s+/g, "");
  const cleanName = full_name.trim();
  const cleanVillage = village.trim();
  const cleanDistrict = district.trim();
  const cleanEmail = (email || "").trim();
  const cleanPin = (pin_password || "1234").trim();

  // Generate unique secure activation token
  const activationToken = crypto.randomBytes(24).toString("hex");

  // Determine current application host URL for dynamic activation link
  const forwardedHost = req.get("x-forwarded-host");
  const directHost = req.get("host") || "localhost:3000";
  const effectiveHost = forwardedHost || directHost;
  const proto = req.get("x-forwarded-proto") || req.protocol || "https";
  const baseUrl = `${proto}://${effectiveHost}`;
  const activationLink = `${baseUrl}/activate?token=${activationToken}`;

  // Try MySQL first
  if (mysqlPool) {
    try {
      const normalizedDigits = normalizePhoneNumber(cleanPhone);
      const [existing]: any = await mysqlPool.query(
        "SELECT * FROM users WHERE phone = ? OR phone = ? OR phone LIKE ? OR (email IS NOT NULL AND email != '' AND LOWER(email) = LOWER(?)) LIMIT 1",
        [cleanPhone, normalizedDigits, `%${normalizedDigits}`, cleanEmail]
      );
      if (existing && existing.length > 0) {
        // User already exists, return existing user and profiles
        const existingUser = existing[0];
        const [farming]: any = await mysqlPool.query("SELECT * FROM farming_profiles WHERE user_id = ? OR phone = ?", [existingUser.id, existingUser.phone]);
        const [supplier]: any = await mysqlPool.query("SELECT * FROM supplier_profiles WHERE user_id = ? OR phone = ?", [existingUser.id, existingUser.phone]);
        return res.json({
          success: true,
          message: "Welcome back! Account found and loaded successfully.",
          user: existingUser,
          farming_profile: farming[0] || null,
          supplier_profile: supplier[0] || null,
          isExisting: true,
        });
      }

      const [insertResult]: any = await mysqlPool.query(
        "INSERT INTO users (full_name, phone, email, village, district, pin_password, role, is_activated, activation_token) VALUES (?, ?, ?, ?, ?, ?, 'unassigned', 0, ?)",
        [cleanName, cleanPhone, cleanEmail, cleanVillage, cleanDistrict, cleanPin, activationToken]
      );

      const [createdRows]: any = await mysqlPool.query("SELECT * FROM users WHERE id = ?", [insertResult.insertId]);

      if (cleanEmail && cleanEmail.includes("@")) {
        sendModernFisheriesEmail({
          to: cleanEmail,
          subject: "Activate Your ModernFisheries Account - Action Required",
          html: buildActivationEmailHtml({
            fullName: cleanName,
            phone: cleanPhone,
            village: cleanVillage,
            district: cleanDistrict,
            activationLink,
            token: activationToken,
          }),
        }).catch((e) => console.error("Registration email dispatch error:", e));
      }

      return res.json({
        success: true,
        message: cleanEmail
          ? "Registration successful! An activation link has been sent to your email. Please click the link to activate your account."
          : "Registration successful! Now please create your Farming Profile or Supplier Profile.",
        user: createdRows[0],
        activationToken,
        activationLink,
        emailSent: Boolean(cleanEmail),
        isExisting: false,
      });
    } catch (e: any) {
      console.error("MySQL query failed in register, falling back to local store:", e);
    }
  }

  // Persistent fallback store
  const store = readDataStore();
  const normalizedPhone = normalizePhoneNumber(cleanPhone);
  const existing = store.users.find(
    (u) =>
      u.phone === cleanPhone ||
      (normalizedPhone && normalizePhoneNumber(u.phone) === normalizedPhone) ||
      (cleanEmail && u.email && u.email.trim().toLowerCase() === cleanEmail.toLowerCase())
  );
  if (existing) {
    const farming = store.farming_profiles.find((p) => p.user_id === existing.id || p.phone === existing.phone) || null;
    const supplier = store.supplier_profiles.find((p) => p.user_id === existing.id || p.phone === existing.phone) || null;
    return res.json({
      success: true,
      message: "Welcome back! Account found and loaded successfully.",
      user: existing,
      farming_profile: farming,
      supplier_profile: supplier,
      isExisting: true,
    });
  }

  const newId = store.users.length > 0 ? Math.max(...store.users.map((u) => u.id)) + 1 : 1;
  const newUser: UserRecord = {
    id: newId,
    full_name: cleanName,
    phone: cleanPhone,
    email: cleanEmail,
    village: cleanVillage,
    district: cleanDistrict,
    pin_password: cleanPin,
    role: "unassigned",
    is_activated: 0,
    activation_token: activationToken,
    created_at: new Date().toISOString(),
  };

  store.users.push(newUser);
  writeDataStore(store);

  if (cleanEmail && cleanEmail.includes("@")) {
    sendModernFisheriesEmail({
      to: cleanEmail,
      subject: "Activate Your ModernFisheries Account - Action Required",
      html: buildActivationEmailHtml({
        fullName: cleanName,
        phone: cleanPhone,
        village: cleanVillage,
        district: cleanDistrict,
        activationLink,
        token: activationToken,
      }),
    }).catch((e) => console.error("Registration email dispatch error:", e));
  }

  return res.json({
    success: true,
    message: cleanEmail
      ? "Registration successful! An activation link has been sent to your email. Please click the link to activate your account."
      : "Registration successful! Now please create your Farming Profile or Supplier Profile.",
    user: newUser,
    activationToken,
    activationLink,
    emailSent: Boolean(cleanEmail),
    isExisting: false,
  });
});

// Account Activation Verification Endpoint (POST)
app.post("/api/activate", async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token || typeof token !== "string" || !token.trim()) {
    return res.status(400).json({ success: false, error: "Activation token is required." });
  }

  const cleanToken = token.trim();

  // Try MySQL first
  if (mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query("SELECT * FROM users WHERE activation_token = ? LIMIT 1", [cleanToken]);
      if (rows && rows.length > 0) {
        const user = rows[0];
        const alreadyActive = Boolean(user.is_activated);

        if (!alreadyActive) {
          await mysqlPool.query(
            "UPDATE users SET is_activated = 1, activated_at = CURRENT_TIMESTAMP WHERE id = ?",
            [user.id]
          );
        }

        const [refreshed]: any = await mysqlPool.query("SELECT * FROM users WHERE id = ?", [user.id]);
        return res.json({
          success: true,
          message: alreadyActive
            ? "Your account is already activated!"
            : "Congratulations! Your ModernFisheries account has been successfully activated.",
          alreadyActive,
          user: refreshed[0],
        });
      }
    } catch (e: any) {
      console.error("MySQL query failed in activate, checking local store:", e);
    }
  }

  // Persistent fallback store
  const store = readDataStore();
  const user = store.users.find((u) => u.activation_token === cleanToken);
  if (user) {
    const alreadyActive = Boolean(user.is_activated);
    user.is_activated = 1;
    user.activated_at = new Date().toISOString();
    writeDataStore(store);

    return res.json({
      success: true,
      message: alreadyActive
        ? "Your account is already activated!"
        : "Congratulations! Your ModernFisheries account has been successfully activated.",
      alreadyActive,
      user,
    });
  }

  return res.status(404).json({
    success: false,
    error: "Invalid or expired activation token. Please ensure you copied the complete link or contact support.",
  });
});

// Account Activation Browser Redirect (GET /api/activate?token=XXXX -> /activate?token=XXXX)
app.get("/api/activate", (req: Request, res: Response) => {
  const token = req.query.token as string;
  if (token) {
    return res.redirect(`/activate?token=${encodeURIComponent(token)}`);
  }
  return res.redirect("/activate");
});

// 3. User Login by Phone or Email
app.post("/api/login", async (req: Request, res: Response) => {
  const { phone, identifier, email, pin_password } = req.body;
  const rawId = (identifier || phone || email || "").toString().trim();
  if (!rawId) {
    return res.status(400).json({ success: false, error: "Please enter your registered mobile number or email address." });
  }

  const isEmail = rawId.includes("@");
  const cleanPhone = rawId.replace(/\s+/g, "");
  const normalizedDigits = normalizePhoneNumber(rawId);

  if (mysqlPool) {
    try {
      let users: any = [];
      if (isEmail) {
        const [rows]: any = await mysqlPool.query("SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1", [rawId]);
        users = rows;
      } else {
        const [rows]: any = await mysqlPool.query(
          "SELECT * FROM users WHERE phone = ? OR phone = ? OR phone LIKE ? LIMIT 1",
          [cleanPhone, normalizedDigits, `%${normalizedDigits}`]
        );
        users = rows;
      }

      if (users && users.length > 0) {
        const user = users[0];

        // PIN / password check if user provided pin
        if (pin_password && pin_password.toString().trim() && user.pin_password) {
          const entered = pin_password.toString().trim();
          const stored = (user.pin_password || "").toString().trim();
          if (entered !== stored && stored !== "1234" && stored !== "") {
            return res.status(401).json({
              success: false,
              error: "Incorrect PIN or password. Please verify and try again.",
            });
          }
        }

        // Fetch existing profiles if any
        const [farming]: any = await mysqlPool.query("SELECT * FROM farming_profiles WHERE user_id = ? OR phone = ?", [user.id, user.phone]);
        const [supplier]: any = await mysqlPool.query("SELECT * FROM supplier_profiles WHERE user_id = ? OR phone = ?", [user.id, user.phone]);
        return res.json({
          success: true,
          message: `Welcome back, ${user.full_name}!`,
          user,
          farming_profile: farming[0] || null,
          supplier_profile: supplier[0] || null,
        });
      }
      return res.status(404).json({
        success: false,
        error: isEmail
          ? "No registered account found with this email. Please check your spelling or register a new account."
          : "No registered account found with this mobile number. Please register first.",
      });
    } catch (e: any) {
      console.error("MySQL login query failed, falling back to local store:", e);
    }
  }

  const store = readDataStore();
  const user = store.users.find((u) => {
    if (isEmail && u.email && u.email.trim().toLowerCase() === rawId.toLowerCase()) {
      return true;
    }
    if (u.phone === cleanPhone) return true;
    if (normalizedDigits && normalizedDigits.length >= 7) {
      const uNorm = normalizePhoneNumber(u.phone);
      if (uNorm === normalizedDigits) return true;
    }
    if (u.email && u.email.trim().toLowerCase() === rawId.toLowerCase()) {
      return true;
    }
    return false;
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: isEmail
        ? "No registered account found with this email. Please check your spelling or register a new account."
        : "No registered account found with this mobile number. Please register first.",
    });
  }

  // PIN / password check if user provided pin
  if (pin_password && pin_password.toString().trim() && user.pin_password) {
    const entered = pin_password.toString().trim();
    const stored = (user.pin_password || "").toString().trim();
    if (entered !== stored && stored !== "1234" && stored !== "") {
      return res.status(401).json({
        success: false,
        error: "Incorrect PIN or password. Please verify and try again.",
      });
    }
  }

  const farming = store.farming_profiles.find((p) => p.user_id === user.id || p.phone === user.phone) || null;
  const supplier = store.supplier_profiles.find((p) => p.user_id === user.id || p.phone === user.phone) || null;

  return res.json({
    success: true,
    message: `Welcome back, ${user.full_name}!`,
    user,
    farming_profile: farming,
    supplier_profile: supplier,
  });
});

// 4. Create Farming Profile
app.post("/api/profile/farming", async (req: Request, res: Response) => {
  const {
    user_id,
    user_name,
    phone,
    farm_name,
    farm_type,
    water_area,
    pond_count,
    fish_species,
    village,
    district,
    address,
    latitude,
    longitude,
    experience_years,
  } = req.body;

  if (!farm_name || !water_area) {
    return res.status(400).json({ success: false, error: "Please provide Farm Name and Water Area / Capacity." });
  }

  const record: FarmingProfileRecord = {
    id: Date.now(),
    user_id: parseInt(user_id, 10) || 0,
    user_name: (user_name || "").trim(),
    phone: (phone || "").trim(),
    farm_name: farm_name.trim(),
    farm_type: (farm_type || "Earthen Pond").trim(),
    water_area: water_area.trim(),
    pond_count: (pond_count || "1").trim(),
    fish_species: (fish_species || "Rohu, Catla, Tilapia").trim(),
    village: (village || "").trim(),
    district: (district || "").trim(),
    address: (address || "").trim(),
    latitude: parseFloat(latitude) || 20.9517,
    longitude: parseFloat(longitude) || 85.0985,
    experience_years: (experience_years || "").trim(),
    created_at: new Date().toISOString(),
  };

  if (mysqlPool) {
    try {
      const [result]: any = await mysqlPool.query(
        `INSERT INTO farming_profiles 
          (user_id, user_name, phone, farm_name, farm_type, water_area, pond_count, fish_species, village, district, address, latitude, longitude, experience_years) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          record.user_id,
          record.user_name,
          record.phone,
          record.farm_name,
          record.farm_type,
          record.water_area,
          record.pond_count,
          record.fish_species,
          record.village,
          record.district,
          record.address,
          record.latitude,
          record.longitude,
          record.experience_years,
        ]
      );
      record.id = result.insertId;

      // Update user role to 'farmer'
      if (record.user_id > 0) {
        await mysqlPool.query("UPDATE users SET role = 'farmer' WHERE id = ?", [record.user_id]);
      }

      return res.json({
        success: true,
        message: "Farming Profile created and saved in MySQL database successfully!",
        profile: record,
      });
    } catch (e: any) {
      console.error("MySQL farming profile insert failed, falling back to local store:", e);
    }
  }

  const store = readDataStore();
  record.id = store.farming_profiles.length > 0 ? Math.max(...store.farming_profiles.map((p) => p.id)) + 1 : 1;

  // Replace or add
  const existingIdx = store.farming_profiles.findIndex((p) => p.user_id === record.user_id || p.phone === record.phone);
  if (existingIdx >= 0) {
    store.farming_profiles[existingIdx] = record;
  } else {
    store.farming_profiles.push(record);
  }

  const user = store.users.find((u) => u.id === record.user_id || u.phone === record.phone);
  if (user) {
    user.role = "farmer";
  }

  writeDataStore(store);

  return res.json({
    success: true,
    message: "Farming Profile created and saved successfully!",
    profile: record,
  });
});

// 5. Create Supplier Profile
app.post("/api/profile/supplier", async (req: Request, res: Response) => {
  const {
    user_id,
    user_name,
    phone,
    business_name,
    category,
    contact_person,
    village,
    district,
    address,
    delivery_radius_km,
    whatsapp,
    license_number,
    latitude,
    longitude,
  } = req.body;

  if (!business_name || !category) {
    return res.status(400).json({ success: false, error: "Please provide Business Name and Supply Category." });
  }

  const record: SupplierProfileRecord = {
    id: Date.now(),
    user_id: parseInt(user_id, 10) || 0,
    user_name: (user_name || "").trim(),
    phone: (phone || "").trim(),
    business_name: business_name.trim(),
    category: (category || "General Aquaculture Supplies").trim(),
    contact_person: (contact_person || user_name || "").trim(),
    village: (village || "").trim(),
    district: (district || "").trim(),
    address: (address || "").trim(),
    delivery_radius_km: parseInt(delivery_radius_km, 10) || 50,
    whatsapp: (whatsapp || phone || "").trim(),
    license_number: (license_number || "").trim(),
    latitude: parseFloat(latitude) || 20.9517,
    longitude: parseFloat(longitude) || 85.0985,
    created_at: new Date().toISOString(),
  };

  if (mysqlPool) {
    try {
      const [result]: any = await mysqlPool.query(
        `INSERT INTO supplier_profiles 
          (user_id, user_name, phone, business_name, category, contact_person, village, district, address, delivery_radius_km, whatsapp, license_number, latitude, longitude) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          record.user_id,
          record.user_name,
          record.phone,
          record.business_name,
          record.category,
          record.contact_person,
          record.village,
          record.district,
          record.address,
          record.delivery_radius_km,
          record.whatsapp,
          record.license_number,
          record.latitude,
          record.longitude,
        ]
      );
      record.id = result.insertId;

      // Update user role to 'supplier'
      if (record.user_id > 0) {
        await mysqlPool.query("UPDATE users SET role = 'supplier' WHERE id = ?", [record.user_id]);
      }

      return res.json({
        success: true,
        message: "Supplier Profile created and saved in MySQL database successfully!",
        profile: record,
      });
    } catch (e: any) {
      console.error("MySQL supplier profile insert failed, falling back to local store:", e);
    }
  }

  const store = readDataStore();
  record.id = store.supplier_profiles.length > 0 ? Math.max(...store.supplier_profiles.map((p) => p.id)) + 1 : 1;

  // Replace or add
  const existingIdx = store.supplier_profiles.findIndex((p) => p.user_id === record.user_id || p.phone === record.phone);
  if (existingIdx >= 0) {
    store.supplier_profiles[existingIdx] = record;
  } else {
    store.supplier_profiles.push(record);
  }

  const user = store.users.find((u) => u.id === record.user_id || u.phone === record.phone);
  if (user) {
    user.role = "supplier";
  }

  writeDataStore(store);

  return res.json({
    success: true,
    message: "Supplier Profile created and saved successfully!",
    profile: record,
  });
});

// 6. User Profile Details by ID or Phone
app.get("/api/user-profile/:phone", async (req: Request, res: Response) => {
  const rawId = decodeURIComponent(req.params.phone || "").trim();
  const isEmail = rawId.includes("@");
  const cleanPhone = rawId.replace(/\s+/g, "");
  const normalizedDigits = normalizePhoneNumber(rawId);

  if (mysqlPool) {
    try {
      let users: any = [];
      if (isEmail) {
        const [rows]: any = await mysqlPool.query("SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1", [rawId]);
        users = rows;
      } else {
        const [rows]: any = await mysqlPool.query(
          "SELECT * FROM users WHERE phone = ? OR phone = ? OR phone LIKE ? LIMIT 1",
          [cleanPhone, normalizedDigits, `%${normalizedDigits}`]
        );
        users = rows;
      }

      if (users && users.length > 0) {
        const user = users[0];
        const [farming]: any = await mysqlPool.query("SELECT * FROM farming_profiles WHERE user_id = ? OR phone = ?", [user.id, user.phone]);
        const [supplier]: any = await mysqlPool.query("SELECT * FROM supplier_profiles WHERE user_id = ? OR phone = ?", [user.id, user.phone]);
        return res.json({
          success: true,
          user,
          farming_profile: farming[0] || null,
          supplier_profile: supplier[0] || null,
        });
      }
    } catch (e: any) {
      console.error("MySQL query failed in user-profile:", e);
    }
  }

  const store = readDataStore();
  const user = store.users.find((u) => {
    if (isEmail && u.email && u.email.trim().toLowerCase() === rawId.toLowerCase()) return true;
    if (u.phone === cleanPhone) return true;
    if (normalizedDigits && normalizedDigits.length >= 7) {
      if (normalizePhoneNumber(u.phone) === normalizedDigits) return true;
    }
    if (u.email && u.email.trim().toLowerCase() === rawId.toLowerCase()) return true;
    return false;
  });

  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  const farming = store.farming_profiles.find((p) => p.user_id === user.id || p.phone === user.phone) || null;
  const supplier = store.supplier_profiles.find((p) => p.user_id === user.id || p.phone === user.phone) || null;

  return res.json({
    success: true,
    user,
    farming_profile: farming,
    supplier_profile: supplier,
  });
});

// ============================================================================
// DASHBOARD ENDPOINTS: PONDS, EXPENSES, WATER QUALITY, HARVESTS, SUPPLIER CATALOG
// ============================================================================

// --- PONDS / TANKS MANAGEMENT ---
app.get("/api/farms/ponds", (req: Request, res: Response) => {
  const { phone, user_id } = req.query;
  const store = readDataStore();
  const cleanPhone = phone ? normalizePhoneNumber(phone.toString()) : "";
  const uid = user_id ? parseInt(user_id.toString(), 10) : 0;

  const ponds = store.farms.filter((p: any) => {
    if (uid && p.user_id === uid) return true;
    if (cleanPhone && normalizePhoneNumber(p.phone) === cleanPhone) return true;
    return false;
  });

  return res.json({ success: true, ponds });
});

app.post("/api/farms/ponds", (req: Request, res: Response) => {
  const {
    user_id,
    phone,
    pond_name,
    culture_type,
    water_area,
    depth_m,
    species,
    stocked_count,
    stocking_date,
    avg_weight_g,
    target_weight_g,
    notes,
  } = req.body;

  if (!pond_name) {
    return res.status(400).json({ success: false, error: "Pond or Tank name is required." });
  }

  const store = readDataStore();
  const newPond = {
    id: Date.now(),
    user_id: parseInt(user_id, 10) || 0,
    phone: (phone || "").trim(),
    pond_name: pond_name.trim(),
    culture_type: (culture_type || "Earthen Grow-Out").trim(),
    water_area: (water_area || "1 Acre").trim(),
    depth_m: parseFloat(depth_m) || 1.5,
    species: (species || "Rohu, Catla").trim(),
    stocked_count: parseInt(stocked_count, 10) || 0,
    stocking_date: stocking_date || new Date().toISOString().split("T")[0],
    avg_weight_g: parseFloat(avg_weight_g) || 50,
    target_weight_g: parseFloat(target_weight_g) || 1000,
    notes: (notes || "").trim(),
    created_at: new Date().toISOString(),
  };

  store.farms.push(newPond);
  writeDataStore(store);

  return res.json({ success: true, message: "Pond / Tank added successfully!", pond: newPond });
});

app.delete("/api/farms/ponds/:id", (req: Request, res: Response) => {
  const pondId = parseInt(req.params.id, 10);
  const store = readDataStore();
  store.farms = store.farms.filter((p: any) => p.id !== pondId);
  writeDataStore(store);
  return res.json({ success: true, message: "Pond removed successfully." });
});

// --- DAILY FARM EXPENSES & FINANCIALS ---
app.get("/api/expenses", (req: Request, res: Response) => {
  const { phone, user_id } = req.query;
  const store = readDataStore();
  const cleanPhone = phone ? normalizePhoneNumber(phone.toString()) : "";
  const uid = user_id ? parseInt(user_id.toString(), 10) : 0;

  const expenses = store.expenses.filter((e: any) => {
    if (uid && e.user_id === uid) return true;
    if (cleanPhone && normalizePhoneNumber(e.phone) === cleanPhone) return true;
    return false;
  });

  // Calculate summary metrics
  const totalAmount = expenses.reduce((sum: number, e: any) => sum + (parseFloat(e.amount) || 0), 0);
  const categoryBreakdown: Record<string, number> = {};
  for (const e of expenses) {
    const cat = e.category || "General";
    categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + (parseFloat(e.amount) || 0);
  }

  return res.json({ success: true, expenses, totalAmount, categoryBreakdown });
});

app.post("/api/expenses", (req: Request, res: Response) => {
  const {
    user_id,
    phone,
    category,
    title,
    amount,
    date,
    pond_name,
    vendor_name,
    receipt_no,
    notes,
  } = req.body;

  if (!title || !amount) {
    return res.status(400).json({ success: false, error: "Expense title and amount are required." });
  }

  const store = readDataStore();
  const newExpense = {
    id: Date.now(),
    user_id: parseInt(user_id, 10) || 0,
    phone: (phone || "").trim(),
    category: (category || "Feed").trim(),
    title: title.trim(),
    amount: parseFloat(amount) || 0,
    date: date || new Date().toISOString().split("T")[0],
    pond_name: (pond_name || "All Ponds").trim(),
    vendor_name: (vendor_name || "").trim(),
    receipt_no: (receipt_no || "").trim(),
    notes: (notes || "").trim(),
    created_at: new Date().toISOString(),
  };

  store.expenses.push(newExpense);
  writeDataStore(store);

  return res.json({ success: true, message: "Expense logged successfully!", expense: newExpense });
});

app.delete("/api/expenses/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const store = readDataStore();
  store.expenses = store.expenses.filter((e: any) => e.id !== id);
  writeDataStore(store);
  return res.json({ success: true, message: "Expense entry deleted." });
});

// --- WATER QUALITY & FEEDING / FCR LOGS ---
app.get("/api/water-logs", (req: Request, res: Response) => {
  const { phone, user_id, pond_name } = req.query;
  const store = readDataStore();
  const cleanPhone = phone ? normalizePhoneNumber(phone.toString()) : "";
  const uid = user_id ? parseInt(user_id.toString(), 10) : 0;

  const logs = (store.water_logs || []).filter((l: any) => {
    if (pond_name && l.pond_name !== pond_name) return false;
    if (uid && l.user_id === uid) return true;
    if (cleanPhone && normalizePhoneNumber(l.phone) === cleanPhone) return true;
    return false;
  });

  return res.json({ success: true, logs });
});

app.post("/api/water-logs", (req: Request, res: Response) => {
  const {
    user_id,
    phone,
    pond_name,
    do_ppm,
    ph_level,
    temp_c,
    ammonia_ppm,
    feed_kg,
    notes,
    date,
  } = req.body;

  const store = readDataStore();
  store.water_logs = store.water_logs || [];

  const newLog = {
    id: Date.now(),
    user_id: parseInt(user_id, 10) || 0,
    phone: (phone || "").trim(),
    pond_name: (pond_name || "Main Pond").trim(),
    do_ppm: parseFloat(do_ppm) || 5.5,
    ph_level: parseFloat(ph_level) || 7.5,
    temp_c: parseFloat(temp_c) || 28.0,
    ammonia_ppm: parseFloat(ammonia_ppm) || 0.02,
    feed_kg: parseFloat(feed_kg) || 0,
    notes: (notes || "").trim(),
    date: date || new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  };

  store.water_logs.unshift(newLog);
  writeDataStore(store);

  return res.json({ success: true, message: "Water quality & feed logged successfully!", log: newLog });
});

// --- READY-FOR-HARVEST BROADCASTING (FARMER -> BUYER MARKETPLACE) ---
app.get("/api/harvests", (req: Request, res: Response) => {
  const { phone, lat, lon, radius_km } = req.query;
  const store = readDataStore();
  const cleanPhone = phone ? normalizePhoneNumber(phone.toString()) : "";

  // If specific phone requested, return farmer's own broadcasts
  if (cleanPhone) {
    const myHarvests = (store.harvests || []).filter(
      (h: any) => normalizePhoneNumber(h.phone) === cleanPhone
    );
    return res.json({ success: true, harvests: myHarvests });
  }

  // Otherwise, return all active broadcasts, with distance calculation if coords provided
  const userLat = lat ? parseFloat(lat.toString()) : null;
  const userLon = lon ? parseFloat(lon.toString()) : null;
  const maxRadius = radius_km ? parseFloat(radius_km.toString()) : 50;

  const enriched = (store.harvests || [])
    .filter((h: any) => h.status !== "Cancelled")
    .map((h: any) => {
      let distanceKm: number | null = null;
      if (userLat !== null && userLon !== null && h.latitude && h.longitude) {
        distanceKm = calculateDistanceKm(userLat, userLon, h.latitude, h.longitude);
      }
      return { ...h, distanceKm };
    })
    .filter((h: any) => {
      if (userLat !== null && userLon !== null && h.distanceKm !== null) {
        return h.distanceKm <= maxRadius;
      }
      return true;
    });

  return res.json({ success: true, harvests: enriched });
});

app.post("/api/harvests", (req: Request, res: Response) => {
  const {
    farmer_id,
    farmer_name,
    phone,
    pond_name,
    species,
    ready_quantity_kg,
    avg_weight_kg,
    price_per_kg,
    harvest_start_date,
    harvest_end_date,
    village,
    district,
    latitude,
    longitude,
    pickup_road_access,
    notes,
  } = req.body;

  if (!species || !ready_quantity_kg) {
    return res.status(400).json({ success: false, error: "Fish species and ready quantity are required." });
  }

  const store = readDataStore();
  store.harvests = store.harvests || [];

  const newHarvest = {
    id: Date.now(),
    farmer_id: parseInt(farmer_id, 10) || 0,
    farmer_name: (farmer_name || "").trim(),
    phone: (phone || "").trim(),
    pond_name: (pond_name || "Main Pond").trim(),
    species: species.trim(),
    ready_quantity_kg: parseFloat(ready_quantity_kg) || 0,
    avg_weight_kg: parseFloat(avg_weight_kg) || 1.0,
    price_per_kg: parseFloat(price_per_kg) || 0,
    harvest_start_date: harvest_start_date || new Date().toISOString().split("T")[0],
    harvest_end_date: harvest_end_date || "",
    village: (village || "").trim(),
    district: (district || "").trim(),
    latitude: parseFloat(latitude) || 20.9517,
    longitude: parseFloat(longitude) || 85.0985,
    pickup_road_access: pickup_road_access || "Direct Truck Access to Pond Side",
    notes: (notes || "").trim(),
    status: "Active - Ready for Harvest",
    inquiries_count: 0,
    created_at: new Date().toISOString(),
  };

  store.harvests.unshift(newHarvest);
  writeDataStore(store);

  return res.json({
    success: true,
    message: "Harvest broadcast live to 50 KM regional buyers!",
    harvest: newHarvest,
  });
});

app.put("/api/harvests/:id/status", (req: Request, res: Response) => {
  const harvestId = parseInt(req.params.id, 10);
  const { status } = req.body;
  const store = readDataStore();
  const harvest = (store.harvests || []).find((h: any) => h.id === harvestId);
  if (!harvest) {
    return res.status(404).json({ success: false, error: "Harvest listing not found." });
  }
  harvest.status = status || harvest.status;
  writeDataStore(store);
  return res.json({ success: true, message: "Status updated.", harvest });
});

app.delete("/api/harvests/:id", (req: Request, res: Response) => {
  const harvestId = parseInt(req.params.id, 10);
  const store = readDataStore();
  store.harvests = (store.harvests || []).filter((h: any) => h.id !== harvestId);
  writeDataStore(store);
  return res.json({ success: true, message: "Harvest listing deleted." });
});

function getDefaultEquipmentSeed(): any[] {
  return [
    {
      id: 101,
      supplier_id: 1,
      seller_name: "Bengal AquaTech Machinery",
      phone: "9831102941",
      title: "2 HP 4-Impeller Electric Paddle Wheel Aerator",
      category: "Aeration & Motors",
      description: "100% pure copper winding motor, 4 UV-resistant reinforced nylon impellers, 304 stainless steel frame. Standard aeration rate: 2.6 kg O2/hr. Ideal for 1-acre intensive carp and shrimp ponds.",
      price: 28500,
      unit: "set",
      in_stock: true,
      village: "Barasat",
      district: "North 24 Parganas",
      delivery_radius_km: 150,
      whatsapp: "9831102941",
      latitude: 22.7230,
      longitude: 88.4812,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 102,
      supplier_id: 2,
      seller_name: "Royal Apex Aqua Feeds",
      phone: "9433201852",
      title: "32% Crude Protein Extruded Floating Fish Feed (2mm & 3mm)",
      category: "Aqua Feed & Nutrition",
      description: "Formulated with premium marine fish meal, toasted soybean, and vitamins. FCR 1.25 - 1.45. Minimum 98% water stability floating for 12 hours. Tested for high growth in Tilapia and Pangasius.",
      price: 2350,
      unit: "per 40kg bag",
      in_stock: true,
      village: "Naihati",
      district: "North 24 Parganas",
      delivery_radius_km: 100,
      whatsapp: "9433201852",
      latitude: 22.8914,
      longitude: 88.4239,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 103,
      supplier_id: 3,
      seller_name: "Maa Tara Fish Hatchery & Nursery",
      phone: "9163255763",
      title: "Certified Disease-Free Rohu, Catla & Mrigal Fingerlings (3 - 4 Inch)",
      category: "Seeds & Fingerlings",
      description: "Acclimatized, disease-resistant fingerlings with vigorous swimming activity. Conditioned with oxygen packing for 24-hour transport. 98%+ survival rate guaranteed.",
      price: 4.5,
      unit: "per piece",
      in_stock: true,
      village: "Kalyani",
      district: "Nadia",
      delivery_radius_km: 200,
      whatsapp: "9163255763",
      latitude: 22.9751,
      longitude: 88.4344,
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 104,
      supplier_id: 4,
      seller_name: "BlueGreen Aquatic Instruments",
      phone: "9830554120",
      title: "Digital Optical Dissolved Oxygen (DO) & Temperature Meter",
      category: "Water Testing & Instruments",
      description: "Luminescent optical DO sensor requiring zero membrane replacement and zero electrolyte refilling. Range 0.0 - 20.0 mg/L with ±0.2 mg/L precision. IP67 waterproof housing.",
      price: 14800,
      unit: "unit",
      in_stock: true,
      village: "Salt Lake Sector V",
      district: "Kolkata",
      delivery_radius_km: 250,
      whatsapp: "9830554120",
      latitude: 22.5804,
      longitude: 88.4378,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 105,
      supplier_id: 5,
      seller_name: "BioAqua Biotech Formulations",
      phone: "9748119234",
      title: "Concentrated Bacillus Probiotic Blend (Water & Soil Conditioner)",
      category: "Biofloc & Probiotics",
      description: "High-potency consortium of Bacillus subtilis, licheniformis, and megaterium (5 × 10^9 CFU/g). Rapidly degrades pond bottom sludge, converts ammonia/nitrite, and prevents toxic gas build-up.",
      price: 1250,
      unit: "per 1kg pack",
      in_stock: true,
      village: "Madhyamgram",
      district: "North 24 Parganas",
      delivery_radius_km: 120,
      whatsapp: "9748119234",
      latitude: 22.7008,
      longitude: 88.4552,
      created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 106,
      supplier_id: 6,
      seller_name: "National Polymers & Tarpaulins",
      phone: "9836771120",
      title: "500 Micron UV-Stabilized HDPE Geomembrane Pond Liner",
      category: "Liners & Tanks",
      description: "Virgin raw material with carbon black UV inhibitors. Puncture resistance > 240 N. Tested 10-year outdoor lifespan for zero seepage earthen fish ponds and biofloc round tank installations.",
      price: 42,
      unit: "per sq meter",
      in_stock: true,
      village: "Dankuni",
      district: "Hooghly",
      delivery_radius_km: 300,
      whatsapp: "9836771120",
      latitude: 22.6868,
      longitude: 88.2936,
      created_at: new Date(Date.now() - 86400000 * 6).toISOString()
    },
    {
      id: 107,
      supplier_id: 7,
      seller_name: "Delta Aqua Engineering",
      phone: "9830099881",
      title: "3 HP Three-Phase Roots Air Blower with Aerotube Diffusers",
      category: "Aeration & Motors",
      description: "Continuous duty positive displacement rotary lobe blower delivering 1,800 L/min air volume at 0.035 MPa. Complete with silencer, pressure gauge, and 100m nanobubble aerotube.",
      price: 46000,
      unit: "complete kit",
      in_stock: true,
      village: "Howrah",
      district: "Howrah",
      delivery_radius_km: 150,
      whatsapp: "9830099881",
      latitude: 22.5958,
      longitude: 88.2636,
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 108,
      supplier_id: 8,
      seller_name: "Hooghly Net & Tackle Depot",
      phone: "9831448822",
      title: "Commercial Knotless HDPE Drag Harvest Net (80 ft × 18 ft)",
      category: "Pumps, Nets & Hardware",
      description: "Heavy lead sinkers, durable EVA foam floats, double-stitched border ropes. Mesh size 25mm suitable for market-size harvest of Indian Major Carps and Tilapia without gill injury.",
      price: 7800,
      unit: "per net",
      in_stock: true,
      village: "Bandel",
      district: "Hooghly",
      delivery_radius_km: 100,
      whatsapp: "9831448822",
      latitude: 22.9238,
      longitude: 88.3846,
      created_at: new Date(Date.now() - 86400000 * 8).toISOString()
    }
  ];
}

// --- SUPPLIER PRODUCT CATALOGUE (EQUIPMENT, SEED, FEED) ---
app.get("/api/equipment", (req: Request, res: Response) => {
  const { phone, supplier_id, lat, lon, radius_km, category, search } = req.query;
  const store = readDataStore();
  const cleanPhone = phone ? normalizePhoneNumber(phone.toString()) : "";

  // If equipment is empty, populate with rich default catalog items
  if (!store.equipment || store.equipment.length === 0) {
    store.equipment = getDefaultEquipmentSeed();
    writeDataStore(store);
  }

  const userLat = lat ? parseFloat(lat.toString()) : null;
  const userLon = lon ? parseFloat(lon.toString()) : null;
  const maxRadius = radius_km ? parseFloat(radius_km.toString()) : null;
  const targetCategory = category ? category.toString().toLowerCase() : null;
  const searchQuery = search ? search.toString().toLowerCase().trim() : null;

  const enriched = (store.equipment || [])
    .filter((e: any) => {
      if (targetCategory && targetCategory !== "all" && !e.category.toLowerCase().includes(targetCategory)) {
        return false;
      }
      if (searchQuery) {
        const matchTitle = (e.title || "").toLowerCase().includes(searchQuery);
        const matchDesc = (e.description || "").toLowerCase().includes(searchQuery);
        const matchCat = (e.category || "").toLowerCase().includes(searchQuery);
        const matchSeller = (e.seller_name || "").toLowerCase().includes(searchQuery);
        const matchDist = (e.district || "").toLowerCase().includes(searchQuery);
        if (!matchTitle && !matchDesc && !matchCat && !matchSeller && !matchDist) {
          return false;
        }
      }
      return true;
    })
    .map((e: any) => {
      let distanceKm: number | null = null;
      if (userLat !== null && userLon !== null && e.latitude && e.longitude) {
        distanceKm = calculateDistanceKm(userLat, userLon, e.latitude, e.longitude);
      }
      return { ...e, distanceKm };
    })
    .filter((e: any) => {
      if (userLat !== null && userLon !== null && e.distanceKm !== null && maxRadius !== null) {
        return e.distanceKm <= maxRadius;
      }
      return true;
    });

  let myProducts: any[] = [];
  if (cleanPhone) {
    myProducts = (store.equipment || []).filter(
      (e: any) => normalizePhoneNumber(e.phone) === cleanPhone
    );
  }

  return res.json({ success: true, products: enriched, my_products: myProducts });
});

app.post("/api/equipment", (req: Request, res: Response) => {
  const {
    supplier_id,
    seller_name,
    phone,
    title,
    category,
    description,
    price,
    unit,
    in_stock,
    village,
    district,
    delivery_radius_km,
    whatsapp,
    latitude,
    longitude,
  } = req.body;

  if (!title || !price || !category) {
    return res.status(400).json({ success: false, error: "Title, category, and price are required." });
  }

  const store = readDataStore();
  store.equipment = store.equipment || [];

  const newProduct = {
    id: Date.now(),
    supplier_id: parseInt(supplier_id, 10) || 0,
    seller_name: (seller_name || "").trim(),
    phone: (phone || "").trim(),
    title: title.trim(),
    category: (category || "Feed").trim(),
    description: (description || "").trim(),
    price: parseFloat(price) || 0,
    unit: (unit || "per Unit").trim(),
    in_stock: in_stock !== false,
    village: (village || "").trim(),
    district: (district || "").trim(),
    delivery_radius_km: parseInt(delivery_radius_km, 10) || 50,
    whatsapp: (whatsapp || phone || "").trim(),
    latitude: parseFloat(latitude) || 20.9517,
    longitude: parseFloat(longitude) || 85.0985,
    created_at: new Date().toISOString(),
  };

  store.equipment.unshift(newProduct);
  writeDataStore(store);

  return res.json({
    success: true,
    message: "Product added to your Supplier Catalogue!",
    product: newProduct,
  });
});

app.delete("/api/equipment/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const store = readDataStore();
  store.equipment = (store.equipment || []).filter((e: any) => e.id !== id);
  writeDataStore(store);
  return res.json({ success: true, message: "Product deleted from catalogue." });
});

// --- INQUIRIES & BUYER OFFERS ---
app.get("/api/enquiries", (req: Request, res: Response) => {
  const { phone } = req.query;
  const store = readDataStore();
  const cleanPhone = phone ? normalizePhoneNumber(phone.toString()) : "";

  const enquiries = (store.enquiries || []).filter((enq: any) => {
    if (!cleanPhone) return true;
    return (
      normalizePhoneNumber(enq.sender_phone) === cleanPhone ||
      normalizePhoneNumber(enq.receiver_phone) === cleanPhone
    );
  });

  return res.json({ success: true, enquiries });
});

app.post("/api/enquiries", (req: Request, res: Response) => {
  const {
    sender_name,
    sender_phone,
    receiver_phone,
    type,
    item_id,
    item_title,
    offered_price,
    quantity,
    message,
  } = req.body;

  if (!sender_phone || !receiver_phone) {
    return res.status(400).json({ success: false, error: "Sender and receiver phones are required." });
  }

  const store = readDataStore();
  store.enquiries = store.enquiries || [];

  const newEnquiry = {
    id: Date.now(),
    sender_name: (sender_name || "Aquafarmer").trim(),
    sender_phone: sender_phone.trim(),
    receiver_phone: receiver_phone.trim(),
    type: type || "harvest_offer", // 'harvest_offer' or 'supply_quote'
    item_id: item_id || null,
    item_title: (item_title || "").trim(),
    offered_price: offered_price ? parseFloat(offered_price) : null,
    quantity: (quantity || "").trim(),
    message: (message || "").trim(),
    status: "Pending Response",
    created_at: new Date().toISOString(),
  };

  store.enquiries.unshift(newEnquiry);

  // If related to a harvest, increment harvest inquiries
  if (item_id && type === "harvest_offer") {
    const harvest = (store.harvests || []).find((h: any) => h.id === item_id);
    if (harvest) {
      harvest.inquiries_count = (harvest.inquiries_count || 0) + 1;
    }
  }

  // Create notification for receiver (TradeIndia B2B lead alert)
  store.notifications = store.notifications || [];
  store.notifications.unshift({
    id: Date.now() + 1,
    user_phone: receiver_phone.trim(),
    title: type === "harvest_offer" ? `New Purchase Offer for ${item_title || "Fish Harvest"}` : `New Quote Request for ${item_title || "Catalogue Item"}`,
    message: `${sender_name || "A buyer/farmer"} sent an inquiry${quantity ? ` (${quantity})` : ""}${offered_price ? ` offering ₹${offered_price}` : ""}.`,
    type: "inquiry",
    reference_id: newEnquiry.id,
    is_read: false,
    created_at: new Date().toISOString(),
  });

  writeDataStore(store);

  return res.json({
    success: true,
    message: "Enquiry / offer transmitted successfully!",
    enquiry: newEnquiry,
  });
});

// --- NOTIFICATIONS & TRADE ALERTS (TRADEINDIA STYLE) ---
app.get("/api/notifications", (req: Request, res: Response) => {
  const { phone } = req.query;
  const store = readDataStore();
  const cleanPhone = phone ? normalizePhoneNumber(phone.toString()) : "";

  let userNotifications = (store.notifications || []).filter((n: any) => {
    if (!cleanPhone) return true;
    return normalizePhoneNumber(n.user_phone) === cleanPhone;
  });

  // If user has no notifications yet, provide welcoming onboarding alerts
  if (userNotifications.length === 0 && cleanPhone) {
    const defaultAlerts = [
      {
        id: Date.now() - 3600000,
        user_phone: cleanPhone,
        title: "Welcome to ModernFisheries Trade & Farm Hub",
        message: "Your dual account is active! Manage daily expenses & ponds, or list items in your Supplier Catalogue for 50 KM buyers.",
        type: "system",
        is_read: false,
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: Date.now() - 1800000,
        user_phone: cleanPhone,
        title: "50 KM Local Network Active",
        message: "Your location radius is set to 50 KM. Check the regional ecosystem for nearby suppliers and ready fish harvests.",
        type: "network",
        is_read: false,
        created_at: new Date(Date.now() - 1800000).toISOString(),
      },
    ];
    store.notifications = [...defaultAlerts, ...(store.notifications || [])];
    writeDataStore(store);
    userNotifications = defaultAlerts;
  }

  const unreadCount = userNotifications.filter((n: any) => !n.is_read).length;
  return res.json({ success: true, notifications: userNotifications, unreadCount });
});

app.post("/api/notifications/mark-all-read", (req: Request, res: Response) => {
  const { phone } = req.body;
  const cleanPhone = phone ? normalizePhoneNumber(phone.toString()) : "";
  const store = readDataStore();
  (store.notifications || []).forEach((n: any) => {
    if (!cleanPhone || normalizePhoneNumber(n.user_phone) === cleanPhone) {
      n.is_read = true;
    }
  });
  writeDataStore(store);
  return res.json({ success: true, message: "All notifications marked as read." });
});

app.put("/api/notifications/:id/read", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const store = readDataStore();
  const notif = (store.notifications || []).find((n: any) => n.id === id);
  if (notif) {
    notif.is_read = true;
    writeDataStore(store);
  }
  return res.json({ success: true, notif });
});

function getDefaultSupplierProfilesSeed(): any[] {
  return [
    {
      id: 201,
      user_id: 101,
      business_name: "Bengal AquaTech Machinery & Aerators",
      category: "Aerators & Machinery",
      contact_person: "Ashok Ghosh",
      phone: "9831102941",
      village: "Barasat",
      district: "North 24 Parganas",
      address: "Jessore Road, Near Duckbungalow More, Barasat",
      delivery_radius_km: 150,
      whatsapp: "9831102941",
      license_number: "WB-IND-2023-AQUA-092",
      latitude: 22.7230,
      longitude: 88.4812,
      created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
      id: 202,
      user_id: 102,
      business_name: "Royal Apex Commercial Aqua Feeds",
      category: "Fish Feed & Nutrition",
      contact_person: "Manoj Saha",
      phone: "9433201852",
      village: "Naihati",
      district: "North 24 Parganas",
      address: "Station Road, Naihati Industrial Area",
      delivery_radius_km: 100,
      whatsapp: "9433201852",
      license_number: "WB-FEED-2022-771",
      latitude: 22.8914,
      longitude: 88.4239,
      created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
    },
    {
      id: 203,
      user_id: 103,
      business_name: "Maa Tara Fish Seed Hatchery & Nursery",
      category: "Seeds & Fingerlings",
      contact_person: "Bikash Biswas",
      phone: "9163255763",
      village: "Kalyani",
      district: "Nadia",
      address: "Block B, Fish Seed Farm Road, Kalyani",
      delivery_radius_km: 200,
      whatsapp: "9163255763",
      license_number: "WB-FISH-HATCH-2021-04",
      latitude: 22.9751,
      longitude: 88.4344,
      created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    },
    {
      id: 204,
      user_id: 104,
      business_name: "BlueGreen Aquatic Testing & Sensors",
      category: "Water Testing & Instruments",
      contact_person: "Dr. Anirban Mukherjee",
      phone: "9830554120",
      village: "Salt Lake Sector V",
      district: "Kolkata",
      address: "Webel Bhavan, Salt Lake Electronics Complex",
      delivery_radius_km: 250,
      whatsapp: "9830554120",
      license_number: "WB-INST-2023-559",
      latitude: 22.5804,
      longitude: 88.4378,
      created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
    {
      id: 205,
      user_id: 105,
      business_name: "BioAqua Biotech Formulations",
      category: "Chemicals & Probiotics",
      contact_person: "Suman Sengupta",
      phone: "9748119234",
      village: "Madhyamgram",
      district: "North 24 Parganas",
      address: "Sodepur Road, Madhyamgram",
      delivery_radius_km: 120,
      whatsapp: "9748119234",
      license_number: "WB-BIO-2022-110",
      latitude: 22.7008,
      longitude: 88.4552,
      created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    },
    {
      id: 206,
      user_id: 106,
      business_name: "National Polymers & HDPE Pond Liners",
      category: "Tarpaulins & Tanks",
      contact_person: "Ranjan Paul",
      phone: "9836771120",
      village: "Dankuni",
      district: "Hooghly",
      address: "Delhi Road, Dankuni Industrial Zone",
      delivery_radius_km: 300,
      whatsapp: "9836771120",
      license_number: "WB-POLY-2021-992",
      latitude: 22.6868,
      longitude: 88.2936,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: 207,
      user_id: 107,
      business_name: "Delta Aqua Engineering & Pumps",
      category: "Pumps & Hardware",
      contact_person: "Prabir Datta",
      phone: "9830099881",
      village: "Howrah",
      district: "Howrah",
      address: "Kona Expressway, Howrah",
      delivery_radius_km: 150,
      whatsapp: "9830099881",
      license_number: "WB-ENG-2022-384",
      latitude: 22.5958,
      longitude: 88.2636,
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    }
  ];
}

// --- PUBLIC & VERIFIED SUPPLIERS DIRECTORY ---
app.get("/api/suppliers", (req: Request, res: Response) => {
  const { category, search, lat, lon, radius_km } = req.query;
  const store = readDataStore();
  if (!store.supplier_profiles || store.supplier_profiles.length === 0) {
    store.supplier_profiles = getDefaultSupplierProfilesSeed();
    writeDataStore(store);
  }

  const userLat = lat ? parseFloat(lat.toString()) : 22.65;
  const userLon = lon ? parseFloat(lon.toString()) : 88.40;
  const maxRadius = radius_km && radius_km !== "all" ? parseFloat(radius_km.toString()) : null;
  const targetCategory = category && category !== "all" && category !== "All" ? category.toString().toLowerCase() : null;
  const searchQuery = search ? search.toString().toLowerCase().trim() : null;

  const suppliers = (store.supplier_profiles || [])
    .filter((s: any) => {
      if (targetCategory && !s.category.toLowerCase().includes(targetCategory)) return false;
      if (searchQuery) {
        const matchName = (s.business_name || "").toLowerCase().includes(searchQuery);
        const matchContact = (s.contact_person || "").toLowerCase().includes(searchQuery);
        const matchCat = (s.category || "").toLowerCase().includes(searchQuery);
        const matchDist = (s.district || "").toLowerCase().includes(searchQuery);
        const matchVil = (s.village || "").toLowerCase().includes(searchQuery);
        if (!matchName && !matchContact && !matchCat && !matchDist && !matchVil) return false;
      }
      return true;
    })
    .map((s: any) => {
      let distanceKm: number | null = null;
      if (s.latitude && s.longitude) {
        distanceKm = calculateDistanceKm(userLat, userLon, s.latitude, s.longitude);
      }
      return { ...s, distanceKm };
    })
    .filter((s: any) => {
      if (maxRadius !== null && s.distanceKm !== null) {
        return s.distanceKm <= maxRadius;
      }
      return true;
    })
    .sort((a: any, b: any) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));

  return res.json({ success: true, suppliers });
});

// --- 50 KM REGIONAL AGGREGATOR ---
app.get("/api/ecosystem/50km", (req: Request, res: Response) => {
  const { lat, lon, radius_km } = req.query;
  const store = readDataStore();

  // Ensure default seeds if empty
  if (!store.supplier_profiles || store.supplier_profiles.length === 0) {
    store.supplier_profiles = getDefaultSupplierProfilesSeed();
    writeDataStore(store);
  }
  if (!store.equipment || store.equipment.length === 0) {
    store.equipment = getDefaultEquipmentSeed();
    writeDataStore(store);
  }

  const userLat = lat ? parseFloat(lat.toString()) : 22.65;
  const userLon = lon ? parseFloat(lon.toString()) : 88.40;
  const maxRadius = radius_km && radius_km !== "all" ? parseFloat(radius_km.toString()) : 50;

  // Nearby Suppliers
  const nearbySuppliers = (store.supplier_profiles || [])
    .map((s: any) => {
      const distanceKm = calculateDistanceKm(userLat, userLon, s.latitude, s.longitude);
      return { ...s, distanceKm };
    })
    .filter((s: any) => s.distanceKm <= maxRadius)
    .sort((a: any, b: any) => a.distanceKm - b.distanceKm);

  // Nearby Products in Stock
  const nearbyProducts = (store.equipment || [])
    .map((p: any) => {
      const distanceKm = calculateDistanceKm(userLat, userLon, p.latitude, p.longitude);
      return { ...p, distanceKm };
    })
    .filter((p: any) => p.distanceKm <= maxRadius)
    .sort((a: any, b: any) => a.distanceKm - b.distanceKm);

  // Nearby Ready Harvests
  const nearbyHarvests = (store.harvests || [])
    .filter((h: any) => h.status !== "Cancelled" && h.status !== "Harvest Completed")
    .map((h: any) => {
      const distanceKm = calculateDistanceKm(userLat, userLon, h.latitude, h.longitude);
      return { ...h, distanceKm };
    })
    .filter((h: any) => h.distanceKm <= maxRadius)
    .sort((a: any, b: any) => a.distanceKm - b.distanceKm);

  return res.json({
    success: true,
    radius_km: maxRadius,
    center: { latitude: userLat, longitude: userLon },
    suppliers: nearbySuppliers,
    products: nearbyProducts,
    harvests: nearbyHarvests,
  });
});

// --- BUYER REQUIREMENTS & RFQ SYSTEM (TRADEINDIA STYLE) ---
app.get("/api/requirements", (req: Request, res: Response) => {
  const { phone, category, search, status } = req.query;
  const store = readDataStore();
  const cleanPhone = phone ? normalizePhoneNumber(phone.toString()) : "";
  const cat = category ? category.toString().toLowerCase() : "";
  const query = search ? search.toString().toLowerCase().trim() : "";
  const st = status ? status.toString().toLowerCase() : "";

  // Seed default initial requirement demands if empty so marketplace shows active requirements
  if (!store.buyer_requirements || store.buyer_requirements.length === 0) {
    store.buyer_requirements = [
      {
        id: 1710001,
        user_name: "Ramesh Mondal (Aqua Harvest Farm)",
        user_phone: "9163255763",
        title: "Require 40,000 High-Health Pangasius Fingerlings (3 Inch)",
        category: "Seeds & Fingerlings",
        quantity: "40,000",
        unit: "pieces",
        target_budget: 120000,
        delivery_location: "Barasat Road, Dattapukur",
        district: "North 24 Parganas",
        urgency: "Immediate (Within 48 hours)",
        details: "Need certified disease-free nursery conditioned fry with active feeding response. Oxygen packing required for 6-hour farm transport.",
        status: "Active",
        quotes_count: 2,
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: 1710002,
        user_name: "Debabrata Das",
        user_phone: "9831102941",
        title: "Need 2 HP Solar/Electric Paddle Wheel Aerator (4 Impeller)",
        category: "Aeration & Motors",
        quantity: "4",
        unit: "units",
        target_budget: 110000,
        delivery_location: "Near Kalyani Expressway",
        district: "Nadia",
        urgency: "Within 1 week",
        details: "Looking for heavy copper motor with bevel gear drive for two 1.5-acre carp nursery ponds. Must include SS 304 frame.",
        status: "Active",
        quotes_count: 3,
        created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
      },
      {
        id: 1710003,
        user_name: "Subir Roy Chowdhury",
        user_phone: "9433201852",
        title: "Bulk Requirement: 100 Bags 32% Protein Floating Pellets (2.5mm)",
        category: "Aqua Feed & Nutrition",
        quantity: "100",
        unit: "bags (40kg)",
        target_budget: 220000,
        delivery_location: "Bandel Farm Zone",
        district: "Hooghly",
        urgency: "Within 3 days",
        details: "Requires floating feed with minimum 12-hour water stability and low ash content for commercial Tilapia biofloc culture.",
        status: "Active",
        quotes_count: 1,
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      }
    ];
    writeDataStore(store);
  }

  let list = (store.buyer_requirements || []).filter((r: any) => {
    if (cat && cat !== "all" && !r.category.toLowerCase().includes(cat)) return false;
    if (st && st !== "all" && r.status.toLowerCase() !== st) return false;
    if (query) {
      const matchTitle = (r.title || "").toLowerCase().includes(query);
      const matchDetails = (r.details || "").toLowerCase().includes(query);
      const matchName = (r.user_name || "").toLowerCase().includes(query);
      const matchDist = (r.district || "").toLowerCase().includes(query);
      if (!matchTitle && !matchDetails && !matchName && !matchDist) return false;
    }
    return true;
  });

  // Mark which ones are mine
  list = list.map((r: any) => ({
    ...r,
    is_mine: cleanPhone ? normalizePhoneNumber(r.user_phone) === cleanPhone : false,
  }));

  const myRequirements = cleanPhone
    ? (store.buyer_requirements || []).filter(
        (r: any) => normalizePhoneNumber(r.user_phone) === cleanPhone
      )
    : [];

  return res.json({
    success: true,
    requirements: list,
    my_requirements: myRequirements,
  });
});

app.post("/api/requirements", (req: Request, res: Response) => {
  const {
    user_name,
    buyer_name,
    user_phone,
    phone,
    title,
    category,
    quantity,
    quantity_required,
    unit,
    target_budget,
    delivery_location,
    location,
    district,
    urgency,
    details,
    specs,
  } = req.body;

  const contactPhone = (user_phone || phone || "").trim();
  const contactName = (user_name || buyer_name || "Aquafarmer").trim();
  const targetQuantity = (quantity || quantity_required || "1 Unit").trim();
  const targetLocation = (delivery_location || location || "Regional 50 KM Hub").trim();
  const reqDetails = (details || specs || "").trim();

  if (!title || !contactPhone) {
    return res.status(400).json({ success: false, error: "Title and contact phone are required." });
  }

  const store = readDataStore();
  store.buyer_requirements = store.buyer_requirements || [];
  store.notifications = store.notifications || [];

  const newReq = {
    id: Date.now(),
    user_name: contactName,
    user_phone: contactPhone,
    phone: contactPhone,
    title: (title || "").trim(),
    category: (category || "Equipment").trim(),
    quantity: targetQuantity,
    quantity_required: targetQuantity,
    unit: (unit || "Unit").trim(),
    target_budget: Number(target_budget) || 0,
    delivery_location: targetLocation,
    location: targetLocation,
    district: (district || "North 24 Parganas").trim(),
    urgency: (urgency || "Standard").trim(),
    details: reqDetails,
    specs: reqDetails,
    status: "Active (Awaiting Seller Bids)",
    quotes_count: 0,
    created_at: new Date().toISOString(),
  };

  store.buyer_requirements.unshift(newReq);

  // Notify all providers / suppliers in network!
  const notifiedPhones = new Set<string>();
  const cleanSenderPhone = normalizePhoneNumber(contactPhone);

  // Gather supplier profile phones
  (store.supplier_profiles || []).forEach((sp: any) => {
    const p = normalizePhoneNumber(sp.phone);
    if (p && p !== cleanSenderPhone) notifiedPhones.add(p);
  });

  // Gather equipment sellers
  (store.equipment || []).forEach((eq: any) => {
    const p = normalizePhoneNumber(eq.phone);
    if (p && p !== cleanSenderPhone) notifiedPhones.add(p);
  });

  // Send TradeIndia-style Lead notification to providers
  notifiedPhones.forEach((phone) => {
    store.notifications.unshift({
      id: Date.now() + Math.floor(Math.random() * 10000),
      user_phone: phone,
      title: `📢 New Buyer Requirement: ${newReq.title}`,
      message: `${newReq.user_name} posted demand for ${newReq.quantity} ${newReq.unit} (${newReq.category})${newReq.target_budget ? ` with budget ₹${newReq.target_budget.toLocaleString()}` : ""}. Location: ${newReq.district || newReq.delivery_location || "Regional"}. Submit your quote!`,
      type: "buyer_requirement",
      reference_id: newReq.id,
      is_read: false,
      created_at: new Date().toISOString(),
    });
  });

  // Confirmation alert for the buyer
  store.notifications.unshift({
    id: Date.now() + 99999,
    user_phone: contactPhone,
    title: "Requirement Broadcasted Successfully",
    message: `Your requirement for "${newReq.title}" has been transmitted to verified regional suppliers. Matching providers will review specifications and contact you.`,
    type: "system",
    reference_id: newReq.id,
    is_read: false,
    created_at: new Date().toISOString(),
  });

  writeDataStore(store);

  return res.json({
    success: true,
    message: `Requirement posted! Broadcasted to ${notifiedPhones.size} regional suppliers.`,
    requirement: newReq,
    notified_suppliers_count: notifiedPhones.size,
  });
});

app.post("/api/requirements/:id/quote", (req: Request, res: Response) => {
  const reqId = parseInt(req.params.id, 10);
  const { supplier_name, supplier_phone, quote_price, delivery_time, notes } = req.body;

  if (!supplier_phone || !quote_price) {
    return res.status(400).json({ success: false, error: "Supplier phone and quote price are required." });
  }

  const store = readDataStore();
  const targetReq = (store.buyer_requirements || []).find((r: any) => r.id === reqId);
  if (!targetReq) {
    return res.status(404).json({ success: false, error: "Requirement not found." });
  }

  targetReq.quotes_count = (targetReq.quotes_count || 0) + 1;

  // Add to enquiries
  store.enquiries = store.enquiries || [];
  const quoteEnquiry = {
    id: Date.now(),
    sender_name: (supplier_name || "Regional Supplier").trim(),
    sender_phone: supplier_phone.trim(),
    receiver_phone: targetReq.user_phone.trim(),
    type: "requirement_quote",
    item_id: targetReq.id,
    item_title: targetReq.title,
    offered_price: parseFloat(quote_price) || 0,
    quantity: targetReq.quantity,
    message: `Quote for your requirement: ₹${quote_price}. Delivery: ${delivery_time || "Immediate"}. Notes: ${notes || ""}`,
    status: "Quote Submitted",
    created_at: new Date().toISOString(),
  };
  store.enquiries.unshift(quoteEnquiry);

  // Notify buyer of new quote
  store.notifications = store.notifications || [];
  store.notifications.unshift({
    id: Date.now() + 1,
    user_phone: targetReq.user_phone.trim(),
    title: `💰 New Quote Received for: ${targetReq.title}`,
    message: `${supplier_name || "A verified supplier"} quoted ₹${parseFloat(quote_price).toLocaleString()} (${delivery_time || "Ready delivery"}). Contact: ${supplier_phone}`,
    type: "quote",
    reference_id: quoteEnquiry.id,
    is_read: false,
    created_at: new Date().toISOString(),
  });

  writeDataStore(store);

  return res.json({
    success: true,
    message: "Your quotation has been sent to the buyer!",
    enquiry: quoteEnquiry,
  });
});

app.delete("/api/requirements/:id", (req: Request, res: Response) => {
  const reqId = parseInt(req.params.id, 10);
  const store = readDataStore();
  store.buyer_requirements = (store.buyer_requirements || []).filter((r: any) => r.id !== reqId);
  writeDataStore(store);
  return res.json({ success: true, message: "Requirement closed and removed." });
});

// 7. PHP Backend Code Files Exporter
app.get("/api/php-backend/files", (req: Request, res: Response) => {
  const phpDir = path.resolve(process.cwd(), "php-backend");
  if (!fs.existsSync(phpDir)) {
    return res.json({ success: false, files: [] });
  }
  const fileNames = fs.readdirSync(phpDir);
  const files = fileNames.map((name) => {
    const fullPath = path.join(phpDir, name);
    const content = fs.readFileSync(fullPath, "utf8");
    return { name, content };
  });
  return res.json({ success: true, files });
});

// 8. ModernFisheries SMTP Email Dispatch Endpoint
app.post("/api/send-email", async (req: Request, res: Response) => {
  const { to, subject, html, text, replyTo } = req.body;
  if (!to || !subject) {
    return res.status(400).json({ success: false, error: "Recipient email ('to') and 'subject' are required." });
  }

  const result = await sendModernFisheriesEmail({
    to: to.trim(),
    subject: subject.trim(),
    html: html || (text ? text.replace(/\n/g, "<br>") : "ModernFisheries Notification"),
    text,
    replyTo,
  });

  if (result.success) {
    return res.json({
      success: true,
      message: "Email sent successfully via ModernFisheries SMTP!",
      messageId: result.messageId,
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
    });
  } else {
    return res.status(500).json({
      success: false,
      error: result.error,
      smtpHost: SMTP_CONFIG.host,
      smtpPort: SMTP_CONFIG.port,
    });
  }
});

// 9. ModernFisheries SMTP Status & Diagnostics
app.get("/api/smtp/status", (_req: Request, res: Response) => {
  return res.json({
    service: "ModernFisheries SMTP Mailer",
    status: "configured",
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    user: SMTP_CONFIG.auth.user,
    fromEmail: SMTP_CONFIG.fromEmail,
    fromName: SMTP_CONFIG.fromName,
    secureMode: "STARTTLS (EnableSsl: false / Port 587 compatible)",
    fallbackPorts: [587, 465, 25, 2525],
  });
});

// ============================================================================
// Vite Middleware / Static Serving Setup
// ============================================================================
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Express] Dev/App server running on http://0.0.0.0:${PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer();
