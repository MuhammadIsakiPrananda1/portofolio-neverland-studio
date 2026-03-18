<div align="center">

# Changelog

**All notable changes to this project are documented in this file.**

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) · Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

</div>

---

## [1.7.0] - 2026-03-18

### Changed
- **Sidebar Layout Cleanup** — Enhanced UI/UX with improved alignment, spacing, and visual consistency:
  - Standardized padding and vertical spacing across all navigation items
  - Improved icon-to-text alignment with centered positioning
  - Consistent gap spacing between icon and label (2.5rem standard)
  - Better hierarchical indentation for nested menu items with calculated margins
  - Enhanced vertical rhythm with harmonized `space-y` values (2-6rem)
  - Improved sub-item styling with better visual distinction
  - Cleaner code structure with better CSS organization
  - Maintained 100% functional compatibility and responsive behavior

---

## [1.6.0] - 2026-03-17

### Added
- **Virtual Machine Lab (VM Lab)** — Docker-based XFCE4 Linux environment with remote desktop access:
  - Debian 13 Linux desktop environment with XFCE4 GUI
  - X11VNC server for native VNC protocol support
  - WebSocket VNC proxy (websockify) for browser-based access (port 6080)
  - One-time VM per user with 5-minute auto-cleanup for idle sessions
  - Dynamic port allocation: VNC port (5901), Web port (6080) per user
  - Real-time container health status tracking (starting → running → stopped)
  - Pre-built Docker image (1.34GB) for instant deployment
- **Challenge System (CTF Mode)** — Persistent cybersecurity challenges with progress tracking:
  - Challenge categories: Web Security, Network Security, Cryptography, Reverse Engineering, Forensics
  - Dynamic difficulty levels with point scaling
  - Flag-based submission with validation against challenge backend
  - Per-user solve history and solve count (survives logout/refresh)
  - First blood tracking (first user to solve gets bonus)
  - Challenge completion badges and achievements
- **Scoreboard API** — Real-time leaderboards and statistics:
  - Ranked user list by total score and solve count
  - Per-challenge solve count and difficulty heat map
  - User detailed stats: challenges solved, total points, solve rate, achievements
  - Auto-updating rankings (refreshes every 30 seconds on client)
- **VM Lab API Endpoints** (`/v1/vm/*`):
  - `POST /v1/vm/start` → Start user's VM (allocates port, creates container)
  - `GET /v1/vm/status` → Get VM current status + container info
  - `POST /v1/vm/stop` → Stop running VM gracefully
  - `GET /v1/vm/connect-url` → Get WebSocket VNC connection URL + token
  - `DELETE /v1/vm/delete` → Permanently delete VM and free ports
  - `GET /v1/vm/logs` → Get container logs for debugging
  - `POST /v1/vm/update-activity` → Update last activity time (for idle tracking)
- **Challenge API Endpoints** (`/v1/challenges/*`):
  - `GET /v1/challenges` → List all challenges with metadata
  - `POST /v1/challenges/{id}/submit` → Submit flag for challenge
  - `GET /v1/challenges/{id}/status` → Get solve status for current user
- **Scoreboard API Endpoints** (`/v1/leaderboard`):
  - `GET /v1/leaderboard` → Top 100 users with scores and solve counts
  - `GET /v1/scoreboard/stats` → Overall platform statistics
- **Docker Infrastructure**:
  - Dockerfile for XFCE4 + VNC + WebSocket proxy
  - Docker Compose configuration for local development
  - Automated container cleanup scheduler (removes idle VMs after 5 minutes)
  - Network isolation via `neverland-lab` bridge network
- **NoVNC Web Interface** — Browser-based VM desktop access without Java/plugins:
  - Full-screen embedded VNC viewer in VM Lab page
  - Automatic viewport scaling for different screen sizes
  - Clipboard synchronization (experimental)
- **Architecture Documentation**:
  - Added comprehensive API documentation (`docs/API.md`)
  - Challenge system design document (`docs/CHALLENGE_SOLVE_SYSTEM.md`)
  - VM Lab deployment guide
  - CTF platform guidelines
- **GitHub Actions CI/CD** — Automated testing and deployment:
  - Pulls triggered on `pull_request` and `push` to main
  - PHP lint, composer validation, database migration tests
  - Issue templates for bug reports and feature requests
- **Deployment Improvements**:
  - VPS deployment guide for Cloudflare Tunnel + Nginx
  - Environment configuration via `.env` (API keys, database, secrets)
  - Database seeders for demo challenges

### Changed
- `PlaygroundVM.tsx` — Completely redesigned with noVNC integration:
  - Removed SSH terminal emulator mode
  - Added embedded WebSocket VNC viewer for full desktop GUI access
  - Real-time VM status indicator (starting/running/stopped)
  - Connection logs for debugging VNC issues
  - Responsive layout for tablet/mobile
- VM database schema: added `container_name`, `status`, `vnc_port`, `web_port`, `health_check_at`, `last_activity_at`
- API route prefix: all VM/Challenge endpoints now at `/v1/*` (no `/api/v1/*/` prefix per Laravel 11 config)
- Environment variables: Pusher config, Docker registry, noVNC proxy URL now configurable
- Router improvements: added `ProtectedRoute` wrapper for authenticated-only pages
- Component structure: moved `CustomCursor` to atoms folder for better organization
- Removed deprecated Supabase authentication module from frontend

### Fixed
- Docker network initialization: ensures `neverland-lab` bridge exists before creating containers
- VNC authentication: X11 authority file creation for x11vnc server
- Supervisord configuration: fixed `-n` flag syntax (was `-nodaemon`, causing crashes)
- API error handling: proper HTTP status codes (500 vs 409 for VM conflicts)
- Challenge flag submission: case-insensitive comparison option
- CORS configuration: Docker containers can now reach API via Cloudflare Tunnel
- Rate limiting: added per-IP and per-user limits on flag submissions

### Security
- Docker containers run unprivileged (lab user, not root for GUI)
- VNC server restricted to localhost (6080 port only, not 5901)
- X11 socket permissions: 1777 (world-writable temp directory)
- Challenge flag submissions rate-limited: 5 attempts per 60 seconds
- Input validation: sanitized challenge names, user inputs, Docker image names
- Secret management: API keys, database credentials now in `.env` (never in code)
- Added `DecodeBase64Token` middleware for WAF bypass (ModSecurity CRS compatible)

### Removed
- Docker support from 1.4.0 (completely reimplemented in 1.6.0)
- Supabase authentication (replaced with Laravel Sanctum)
- `useAuthState.ts` hook (replaced with API-based auth)
- Old `supabase-auth.service.ts` module
- Hardcoded setup scripts (now use Docker Compose + environment config)

### Performance
- Challenge queries optimized with eager loading (prevent N+1)
- Scoreboard caching: refresh every 30s on client (not real-time)
- Docker image layered for caching: base OS → packages → user setup → entrypoint
- VNC WebSocket compression enabled for lower bandwidth usage

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
- **Docker completely removed** — `Dockerfile`, `docker-compose.yml`, `.dockerignore`, `nginx.conf` (root), `backend/Dockerfile`, `backend/docker-entrypoint.sh`, `backend/.dockerignore`, `backend/nginx.conf` all deleted
- All Docker instructions from `README.md`, `INSTALL.md`, `SUPPORT.md`, and `backend/README.md`
- Docker badges from the README and backend README headers
- `DB_HOST=mariadb` (Docker service name) replaced with `127.0.0.1`

### Added
- **Full VPS deployment guide** in `INSTALL.md` covering:
  - Server preparation (Nginx, PHP-FPM, Composer, Node.js, MariaDB)
  - Clone, build frontend, configure backend
  - Nginx configuration for frontend (`dist/`) and backend API (`backend/public/`)
  - Running Reverb WebSocket via **Supervisor**
  - Automatic SSL with **Certbot**
- Minimal Nginx configuration examples for frontend and backend API in `README.md`
- Supervisor instructions for running Reverb as a background process on VPS

### Changed
- `README.md`: Table of Contents updated (Quick Start Docker → Installation & Setup), Prerequisites section removes Docker, Building for Production replaced with VPS instructions
- `SUPPORT.md`: Quick start replaced with manual setup, requirements table removes Docker
- `backend/README.md`: Installation simplified to direct VPS setup (no Docker), Running the Server removes Docker subsection, troubleshooting updated for VPS environment
- `CHANGELOG.md`: Upgrade guides updated, removed `docker-compose up -d --build`

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
