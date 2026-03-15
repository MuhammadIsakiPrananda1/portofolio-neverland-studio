-- MySQL Initialization Script for Neverland Studio
-- This script runs automatically when MySQL container starts for the first time

-- Create additional database if needed
-- CREATE DATABASE IF NOT EXISTS `neverland_portfolio_test` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Grant privileges
GRANT ALL PRIVILEGES ON `neverland_portfolio`.* TO 'neverland'@'%';
GRANT ALL PRIVILEGES ON `neverland_portfolio_%`.* TO 'neverland'@'%';

FLUSH PRIVILEGES;

-- Set timezone
SET GLOBAL time_zone = '+00:00';

-- Optimize MySQL settings
SET GLOBAL max_allowed_packet = 67108864; -- 64MB
SET GLOBAL max_connections = 200;

SELECT 'MySQL initialized successfully for Neverland Studio!' AS Message;
