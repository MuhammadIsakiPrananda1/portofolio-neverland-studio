<div align="center">

# Changelog

**All notable changes to this project are documented in this file.**

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) · Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

</div>

---

## [1.5.0] - 2026-03-15

### Added
- **Two-Factor Authentication (2FA)** — TOTP-based 2FA via Google Authenticator / Authy:
  - Setup flow: QR code scan → 6-digit verification → recovery codes generation
  - 8 single-use recovery codes (format `XXXXX-XXXXX`), stored encrypted
  - Disable flow requires current TOTP code or recovery code
  - Login challenge: if 2FA enabled, login returns temp token → user enters code → gets real auth token (5-min expiry)
  - Persistent per-account (survives sessions), disabled only by explicit user action
- **Active Sessions (real-time)** — Live session management in Settings:
  - Detects IP address, geolocation (city/region/country via ip-api.com), browser, OS, device type
  - Auto-refreshes every 30 seconds when panel is open
  - Current session highlighted with green animated dot
  - Per-session "Revoke" button + "Revoke All Other Sessions"
  - Cloudflare Tunnel aware: reads `CF-Connecting-IP` header for real IP
- **Full Auth System** (without Supabase):
  - Email/password register & login via Laravel Sanctum
  - Google OAuth login (TOTP 2FA compatible)
  - GitHub OAuth login
  - JWT token stored in localStorage, used across all API calls
  - Post-login redirects to homepage (not dashboard)
- **Google & GitHub OAuth** properly configured for HTTPS + Cloudflare Tunnel
- **Laravel backend** running at `https://portofolio.neverlandstudio.my.id/api/v1`
- **Sanctum token metadata**: IP address, User-Agent, geolocation saved on every login/register/OAuth

### Changed
- `Settings.tsx` Two-Factor toggle now connects to real backend API (not localStorage mock)
- `Settings.tsx` Active Sessions replaced mock data with real API + polling
- `AuthModal.tsx` login flow handles `two_factor_required` response → shows 2FA challenge view
- Login no longer deletes previous tokens → supports multi-device sessions
- `apiFetch` utility always sends `Accept: application/json` to prevent SPA HTML response

### Removed
- Supabase dependency completely removed from frontend and backend
- Mock session data in Settings.tsx

### Fixed
- `apiFetch` missing `Accept: application/json` header causing HTML response parsed as JSON
- `API_BASE` URL now correctly appends `/api/v1` using `VITE_API_VERSION` env var
- ModSecurity false-positive blocking password fields (SQLi rules) and OAuth `scope` param (LFI rules)
- Apache + Cloudflare Tunnel HTTPS conflict resolved with `trustProxies('*')` in Laravel bootstrap
- Laravel `env()` returning null with config cache → migrated to `config('services.*')`
- Storage directory permissions and missing PHP extensions (`php8.4-xml`)

### Security
- 2FA secrets encrypted with Laravel `encrypt()`/`decrypt()` (AES-256-CBC)
- Recovery codes are single-use and removed after consumption
- Temporary 2FA login tokens expire in 5 minutes and are single-use
- ModSecurity OWASP CRS active with targeted exclusions for auth endpoints

---

## [Unreleased]

### Planned
- [ ] Dark / Light mode toggle
- [ ] Multi-language support (English / Indonesian)
- [ ] AI-powered security vulnerability scanner
- [ ] CTF leaderboard with points system
- [ ] Machine-style challenges (HackTheBox-inspired)
- [ ] Dynamic `.ovpn` generation per user account
- [ ] Blockchain certificate verification
- [ ] Mobile app (React Native)
- [ ] PWA support

---

## [1.4.0] - 2026-03-15

### Removed
- **Docker completely removed** — `Dockerfile`, `docker-compose.yml`, `.dockerignore`, `nginx.conf` (root), `backend/Dockerfile`, `backend/docker-entrypoint.sh`, `backend/.dockerignore`, `backend/nginx.conf` semua dihapus
- Semua instruksi Docker dari `README.md`, `INSTALL.md`, `SUPPORT.md`, dan `backend/README.md`
- Docker badge dari header README dan backend README
- `DB_HOST=mariadb` (Docker service name) diganti `127.0.0.1`

### Added
- **Panduan Deploy ke VPS** lengkap di `INSTALL.md` mencakup:
  - Persiapan server (Nginx, PHP-FPM, Composer, Node.js, MariaDB)
  - Clone, build frontend, setup backend
  - Konfigurasi Nginx untuk frontend (`dist/`) dan backend API (`backend/public/`)
  - Menjalankan Reverb WebSocket dengan **Supervisor**
  - SSL otomatis dengan **Certbot**
- Contoh konfigurasi Nginx minimal untuk frontend dan backend API di `README.md`
- Instruksi Supervisor untuk menjalankan Reverb sebagai background process di VPS

### Changed
- `README.md`: Table of Contents diperbarui (Quick Start Docker → Installation & Setup), section Prerequisites hapus Docker, section Building for Production diganti instruksi VPS
- `SUPPORT.md`: Quick start diganti manual setup, tabel requirements hapus Docker
- `backend/README.md`: Installation diganti satu opsi langsung (tanpa Docker), Running the Server hapus subseksi Docker, troubleshooting VM diperbarui untuk lingkungan VPS
- `CHANGELOG.md`: Upgrade guides diperbarui, hapus `docker-compose up -d --build`

---

## [1.3.0] - 2026-03-14

### Added
- **OpenVPN Connect page** (`/playground/ovpn`) — HackTheBox-style VPN access page with:
  - Server selection card with region and Free/VIP badge
  - Protocol selector (UDP 1194 / TCP 443)
  - Download button that fetches a personalized `neverland-vpn.ovpn` from the backend
  - Live connection info card (VPN IP, rotation countdown, cipher specs, Refresh button)
  - Quick-start terminal steps (install, connect, verify IP, test gateway)
  - Bottom spec bar: AES-256-GCM · SHA-512 · TLS 1.3 · UDP 1194
- **Custom cursor** — Red glowing ring (`cursor-ring`) with canvas particle trail follows the mouse using lerp animation; all colors updated to match the red brand palette
- **Learning Tools expanded** — 23 fully client-side security tools across 7 categories:
  - Encoding: Base64, URL, Hex↔ASCII, Binary↔Text, HTML Entities
  - Cipher: ROT13, Caesar, Vigenère, Morse, XOR, Atbash
  - Hash: SHA-1/256/384/512, JWT Decoder
  - Security: Password Generator, Password Strength Checker
  - Converter: Base Converter, Timestamp, UUID Generator, Text Case
  - Network: IPv4 Subnet Calculator, Common Ports Reference
  - Text: Regex Tester, String Inspector
- Route constant `PLAYGROUND_OVPN = "/playground/ovpn"` added to `constants.ts`
- "Open VPN Connect Page →" shortcut button in the VM terminal's expired-session panel

### Changed
- **VM terminal VPN panel** — Completely redesigned to HTB-style with status cards (DISCONNECTED, Server, Protocol, IP Rotate), full-width download button, and terminal quick-start steps
- **OpenVPN Access card** (bottom of VM page) — Redesigned with header bar, separated spec grid, download button, and connection steps panel
- **Cursor ring and particle trail** — Colors updated from cyan/purple to red (`rgba(239,68,68,...)`) to match site theme
- **VM terminal** — Changed from `overflow-y-auto` (scrollable) to `overflow-hidden` (static, no scroll)
- **README.md** — Complete rewrite: 19 detailed sections, full API reference, project tree, per-feature tables, environment variable guide, troubleshooting with collapsible sections

### Fixed
- **AI Live Chat z-index** — Chat window raised from `z-50` to `z-[60]` to prevent FloatingCartButton from bleeding through the chat overlay
- **Tailwind cursor-pointer override** — `cursor: none !important` placement corrected relative to `@layer` blocks for reliable cursor hiding (later reverted to restore native cursor coexistence)

---

## [1.2.0] - 2026-02-23

### Added
- **Learning Hub** (`/playground/learning`) — New learning section with 3 sub-pages:
  - `PlaygroundLearningWriteups` — CTF write-up library
  - `PlaygroundLearningTools` — Security tools and cheatsheets
  - `PlaygroundLearningRoadmap` — Structured learning paths
- **Cyber News page** — Real-time cybersecurity news feed with hero section and category filters
- **Dashboard redesign** — 13 dashboard pages updated: glassmorphism cards, gradient accents, Framer Motion animations; new pages: `DashboardTasks`, `DashboardMessages`, `DashboardProjects`, `DashboardServices`
- **VM Playground access control** — Auth-required gate before container provisioning
- **Real-time broadcasting** — Laravel Reverb + Laravel Echo for live dashboard event feeds

### Changed
- Playground hub restructured to include the new Learning section
- Dashboard navigation and layout made consistent across all modules

### Fixed
- Docker network configuration for reliable multi-service builds
- Removed unused database tables and redundant columns

---

## [1.1.0] - 2026-02-19

### Added
- `INSTALL.md` — Dedicated, detailed installation guide (Docker + manual)
- `SUPPORT.md` — Comprehensive support and FAQ document
- Roadmap 2026 section to `README.md`

### Changed
- Updated copyright notices to 2026 throughout
- Bumped recommended system requirements (Node.js 24.x, PHP 8.4+)
- Improved README structure and clarity

---

## [1.0.0] - 2024-01-15

### Added (Initial Release)
- **Frontend** — React 19, TypeScript, Vite, Tailwind CSS, Framer Motion; 73+ route-based pages with lazy loading and code splitting
- **Backend** — Laravel 11 REST API with PHP 8.2+; Sanctum authentication, Spatie RBAC, 2FA, activity logging
- **Docker support** — Docker Compose: Nginx, MariaDB 8.4, phpMyAdmin
- **Admin Dashboard** — Analytics, Calendar, Clients, Invoices, Reports, Team, Settings
- **CTF Playground** — 10+ challenge categories: Web, System, Crypto, Binary, Reverse, Forensics, Stegano, OSINT, Mobile, SQL
- **VM Playground** — Isolated Debian 13 Docker container with full root access (1-hour session)
- **IT Services Store** — Product listing, cart, and checkout flow

---

## Upgrade Guide

<details>
<summary><strong>v1.2.0 → v1.3.0</strong></summary>

```bash
# Pull latest code
git pull origin main

# Install new dependencies
npm install
cd backend && composer install

# Add new environment variables to backend/.env:
# VPS_IP, VPN_IP_POOL, VPN_PORT, VPN_PROTO, VPN_CA_CERT, VPN_TLS_AUTH_KEY

# Run migrations and clear cache
php artisan migrate
php artisan config:clear
php artisan cache:clear
php artisan optimize
```

</details>

<details>
<summary><strong>v1.1.0 → v1.2.0</strong></summary>

```bash
git pull origin main
npm install
cd backend && composer install
php artisan migrate
php artisan config:clear
php artisan cache:clear
php artisan optimize
```

</details>

<details>
<summary><strong>v1.0.0 → v1.1.0</strong></summary>

```bash
composer update
npm update
php artisan migrate
php artisan optimize
npm run build
```

</details>

---

> Security vulnerabilities? See [SECURITY.md](SECURITY.md) — email **Arlianto032@gmail.com** privately. Do not open a public issue.


### 🚧 Planned Features
- [ ] 🌗 Dark / Light mode toggle
- [ ] 🌐 Multi-language support (EN / ID)
- [ ] 🏷️ Blog categories and tags
- [ ] 🔍 Project filtering
- [ ] 📰 Newsletter subscription
- [ ] 💬 Live chat integration
- [ ] 📱 PWA support
- [ ] 🤖 AI-powered security threat analysis
- [ ] 🔗 Blockchain certificate verification system

---

## 🚀 [1.2.0] - 2026-02-23

### ✨ Added
- **Learning Hub** (`/playground/learning`) — New section with CTF write-ups, tools & cheatsheets, and learning roadmaps.
  - `PlaygroundLearning` — Learning hub overview page.
  - `PlaygroundLearningWriteups` — CTF write-up library.
  - `PlaygroundLearningTools` — Security tools and cheatsheets.
  - `PlaygroundLearningRoadmap` — Structured learning roadmaps for cybersecurity.
- **Cyber News** page — Real-time cybersecurity news feed with hero section and category filtering.
- **Dashboard redesign** — All 13 dashboard pages updated with glassmorphism, gradients, and Framer Motion animations.
  - `DashboardTasks`, `DashboardMessages`, `DashboardProjects`, `DashboardServices` — New pages.
  - Full redesign on Analytics, Calendar, Clients, Invoices, Reports, Resources, Team, Settings.
- **VM Playground access control** — Authentication-required gate for virtual machine provisioning.
- **Real-time broadcasting** — Laravel Reverb + Laravel Echo integration for live dashboard updates.

### 🔄 Changed
- Dashboard navigation and layout refined for consistency across all pages.
- Playground hub restructured to accommodate the new Learning section.
- Security Tools playground polished with updated UI.

### 🐛 Fixed
- Docker network configuration for stable multi-service builds.
- Database cleanup: removed unused tables and redundant columns.

---

## 🛠️ [1.1.0] - 2026-02-19

### ✨ Added
- Roadmap 2026 section to `README.md`.
- `INSTALL.md` — Dedicated, detailed installation guide.
- `SUPPORT.md` — Comprehensive support resources document.

### 🔄 Changed
- Updated all copyright notices to 2026.
- Bumped recommended system requirements (Node.js 24.x, PHP 8.4+).
- Improved README structure and clarity.

---

## 🎉 [1.0.0] - 2024-01-15

### ✨ Added (Initial Release)
- **Initial release** — Full portfolio website for Neverland Studio.
- **Frontend** — React 19, TypeScript, Vite, Tailwind CSS, Framer Motion.
- **Backend** — Laravel 11 REST API with PHP 8.2+.
- **Docker support** — Docker Compose with multi-container orchestration (Nginx, MariaDB, phpMyAdmin).

### 🚀 Key Features Include
- JWT / Sanctum token-based authentication.
- Role-based access control (Spatie Permission).
- Two-factor authentication via Google Authenticator.
- Activity logging (Spatie Activitylog).
- Admin dashboard (Analytics, Calendar, Clients, Invoices, Reports, etc.).
- CTF Playground with 10+ challenge categories.
- Security Tools: password generator, hash calculator, encoding.
- Isolated SQL and VM Practice environments.

---

## 🔝 Upgrade Guide

<details>
<summary><b>v1.1.0 → v1.2.0</b></summary>

1. Pull the latest code:
   ```bash
   git pull origin main
   ```
2. Install new dependencies:
   ```bash
   npm install
   cd backend && composer install
   ```
3. Run new migrations & clear caches:
   ```bash
   php artisan migrate
   php artisan config:clear
   php artisan cache:clear
   ```
4. Optimize backend:
   ```bash
   php artisan optimize
   ```

</details>

<details>
<summary><b>v1.0.0 → v1.1.0</b></summary>

1. Back up your database.
2. Update all dependencies:
   ```bash
   composer update
   npm update
   ```
3. Run migrations and clear cache:
   ```bash
   php artisan migrate
   php artisan optimize
   npm run build
   ```

</details>

---

## 🛡️ Security

If you discover a security vulnerability, please refer to our [SECURITY.md](SECURITY.md) and email **Arlianto032@gmail.com**. **Do not open a public issue.**

<div align="center">
<i>This changelog follows <a href="https://keepachangelog.com">Keep a Changelog</a> principles.</i>
</div>
