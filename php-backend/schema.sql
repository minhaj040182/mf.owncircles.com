-- ==============================================================================
-- Modern Fisheries - 50 KM Regional AquaFarmer Ecosystem Database Schema
-- Database: own_ModernFish
-- Engine: InnoDB, Charset: utf8mb4
-- Compatible with MySQL 5.7+ / 8.0+ / MariaDB / Plesk phpMyAdmin
-- ZERO DUMMY DATA INCLUDED
-- ==============================================================================

-- 1. Registered Users Table (Farmers & Suppliers)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(25) NOT NULL UNIQUE,
  `email` VARCHAR(120) DEFAULT '',
  `village` VARCHAR(150) NOT NULL,
  `district` VARCHAR(100) NOT NULL,
  `pin_password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(30) DEFAULT 'unassigned', -- 'unassigned', 'farmer', 'supplier'
  `is_activated` TINYINT(1) DEFAULT 0,
  `activation_token` VARCHAR(100) DEFAULT NULL,
  `activated_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (`phone`),
  INDEX (`role`),
  INDEX (`activation_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Farming Profiles Table (Fish Cultivators & Pond Operators)
CREATE TABLE IF NOT EXISTS `farming_profiles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `user_name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `farm_name` VARCHAR(150) NOT NULL,
  `farm_type` VARCHAR(50) DEFAULT 'Earthen Pond', -- 'Earthen Pond', 'Biofloc', 'RAS', 'Hatchery', 'Nursery', 'Cage Culture'
  `water_area` VARCHAR(100) NOT NULL, -- e.g. '3.5 Acres' or '50,000 Litres'
  `pond_count` VARCHAR(50) DEFAULT '1',
  `fish_species` VARCHAR(255) DEFAULT 'Rohu, Catla, Tilapia',
  `address` TEXT,
  `village` VARCHAR(150) NOT NULL,
  `district` VARCHAR(100) NOT NULL,
  `latitude` DECIMAL(10, 7) NOT NULL DEFAULT 20.9517,
  `longitude` DECIMAL(10, 7) NOT NULL DEFAULT 85.0985,
  `experience_years` VARCHAR(50) DEFAULT '',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (`user_id`),
  INDEX (`phone`),
  INDEX (`village`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Supplier Profiles Table (Equipment & Supply Vendors)
CREATE TABLE IF NOT EXISTS `supplier_profiles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `user_name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `business_name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(100) NOT NULL, -- 'Fish Feed', 'Aerators & Machinery', 'Seed / Fingerlings', 'Water Care & Medicine', 'Nets & Tanks', 'General Supplies'
  `contact_person` VARCHAR(120) NOT NULL,
  `address` TEXT,
  `village` VARCHAR(150) NOT NULL,
  `district` VARCHAR(100) NOT NULL,
  `delivery_radius_km` INT DEFAULT 50,
  `whatsapp` VARCHAR(25) DEFAULT '',
  `license_number` VARCHAR(100) DEFAULT '',
  `latitude` DECIMAL(10, 7) NOT NULL DEFAULT 20.9517,
  `longitude` DECIMAL(10, 7) NOT NULL DEFAULT 85.0985,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (`user_id`),
  INDEX (`phone`),
  INDEX (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional placeholder tables for future phases (Zero dummy data)
CREATE TABLE IF NOT EXISTS `equipment_listings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `supplier_id` INT NULL,
  `seller_name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `category` VARCHAR(80) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10, 2) NOT NULL,
  `condition_type` VARCHAR(20) DEFAULT 'New',
  `village` VARCHAR(150) NOT NULL,
  `latitude` DECIMAL(10, 7) NOT NULL DEFAULT 20.9517,
  `longitude` DECIMAL(10, 7) NOT NULL DEFAULT 85.0985,
  `is_available` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `harvest_listings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `farmer_id` INT NULL,
  `farmer_name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `fish_species` VARCHAR(100) NOT NULL,
  `ready_quantity_kg` DECIMAL(10, 2) NOT NULL,
  `avg_weight_kg` DECIMAL(6, 2) NOT NULL,
  `price_per_kg` DECIMAL(8, 2) NOT NULL,
  `harvest_date` DATE NOT NULL,
  `village` VARCHAR(150) NOT NULL,
  `latitude` DECIMAL(10, 7) NOT NULL DEFAULT 20.9517,
  `longitude` DECIMAL(10, 7) NOT NULL DEFAULT 85.0985,
  `notes` TEXT,
  `status` VARCHAR(30) DEFAULT 'Ready for Harvest',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
