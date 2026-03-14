<div align="center">

# Neverland Studio

*Securing the Digital Future · Engineering Secure IT Systems*

**A full-stack cybersecurity portfolio platform — React 19 front-end, Laravel 11 REST API, Docker-orchestrated infrastructure, real-time dashboard, interactive CTF playground, and an OpenVPN access layer.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

> **Last Updated: March 2026**

</div>

---

## Table of Contents

1. [Overview](#1-overview)
2. [Live Features](#2-live-features)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Prerequisites](#5-prerequisites)
6. [Quick Start — Docker](#6-quick-start--docker-recommended)
7. [Manual Setup — Without Docker](#7-manual-setup--without-docker)
8. [Environment Variables](#8-environment-variables)
9. [Running the Application](#9-running-the-application)
10. [Building for Production](#10-building-for-production)
11. [API Reference](#11-api-reference)
12. [Playground & CTF Hub](#12-playground--ctf-hub)
13. [OpenVPN Access](#13-openvpn-access)
14. [Customization](#14-customization)
15. [Troubleshooting](#15-troubleshooting)
16. [Roadmap](#16-roadmap)
17. [Contributing](#17-contributing)
18. [License](#18-license)
19. [Contact](#19-contact)

---

## 1. Overview

**Neverland Studio** is a professional portfolio platform for a Cyber Security & IT company. It is not a static site — it is a full-stack product with:

- A **React + TypeScript SPA** with 73+ route-based pages, animated transitions, and a custom cursor effect.
- A **Laravel 11 REST API** with Sanctum authentication, 2FA, role-based access control, activity logging, and real-time broadcasting via Laravel Reverb.
- A **CTF Playground** with 11 challenge categories, an isolated VM environment, a SQL injection lab, and an interactive learning hub with 23 client-side security tools.
- An **OpenVPN access layer** that generates personalized `.ovpn` configs with hourly IP rotation.
- A full-featured **Admin Dashboard** with analytics, invoice management, task tracking, and live event feeds.

### Vision & Mission

| | |
|---|---|
| **Vision** | To be a trusted partner in securing the digital transformation of businesses worldwide. |
| **Mission** | To deliver innovative, integrated Cyber Security and IT solutions that are reliable, scalable, and forward-thinking. |

---

## 2. Live Features

### Frontend

| Feature | Details |
|---|---|
| **Custom Cursor** | Glowing red ring that follows the mouse with lerp animation + canvas particle trail |
| **Responsive Design** | Mobile-first, works on all screen sizes from 320px to 4K |
| **Page Transitions** | Framer Motion `AnimatePresence` on all route changes |
| **Lazy Loading** | Every page is code-split and loaded on demand |
| **Type Safety** | TypeScript strict mode throughout the entire codebase |
| **Atomic Design** | Components organized as atoms → molecules → organisms → pages |
| **AI Live Chat** | Floating chat widget powered by AI, with correct z-index layering |
| **Floating Cart** | Persistent cart button on the IT Services Store |

### Backend

| Feature | Details |
|---|---|
| **Authentication** | Laravel Sanctum — stateful sessions + API token support |
| **Two-Factor Auth** | TOTP via Google Authenticator (QR code provisioning) |
| **RBAC** | Spatie Permission — granular roles and permissions |
| **Activity Logging** | Spatie Activitylog — full audit trail |
| **Real-Time Events** | Laravel Reverb (WebSocket) + Laravel Echo on the front-end |
| **Rate Limiting** | Per-route throttling configured in `routes/api.php` |
| **CORS** | Configurable allowed origins for multi-domain deployment |

### Security Playground

| Feature | Details |
|---|---|
| **CTF Challenges** | 11 categories: Web, System, Crypto, Binary, Reverse, Forensics, Stegano, OSINT, Mobile, SQL, CVE |
| **Virtual Machine** | Spawn an isolated Debian 13 Docker container with full root access (1-hour session) |
| **SQL Injection Lab** | Practice SQL injection safely in a sandboxed environment |
| **Learning Tools** | 23 fully client-side security tools (see [Section 12](#12-playground--ctf-hub)) |
| **CTF Write-ups** | Community-style write-up browser |
| **Learning Roadmap** | Structured cybersecurity learning path |
| **OpenVPN Connect** | Download a personalized `.ovpn` config; IP rotates every hour |

### Admin Dashboard

| Module | Features |
|---|---|
| **Analytics** | Real-time visitor stats, chart breakdowns |
| **Projects** | Project creation, status tracking, client assignment |
| **Clients** | Client profiles, contact info, project history |
| **Invoices** | Invoice creation, PDF export, payment status |
| **Tasks** | Kanban-style task management |
| **Team** | Member management with role assignment |
| **Messages** | In-app messaging system |
| **Settings** | Profile, password, 2FA, notification preferences |

---

## 3. Tech Stack

### Frontend

| Package | Version | Purpose |
|---|---|---|
| React | 19.2 | UI library |
| TypeScript | 5.9 | Static typing |
| Vite | 7.2.5 | Build tool & dev server |
| Tailwind CSS | 3.4.19 | Utility-first styling |
| Framer Motion | 12.33 | Animations & transitions |
| React Router | 7.13 | Client-side routing |
| Lucide React | latest | Icon library |
| Axios | latest | HTTP client |
| Laravel Echo | latest | WebSocket client |

### Backend

| Package | Version | Purpose |
|---|---|---|
| Laravel | 11 | PHP web framework |
| PHP | 8.2+ | Server-side runtime |
| MySQL / MariaDB | 8.4 | Relational database |
| Laravel Reverb | 1.x | WebSocket broadcasting server |
| Spatie Permission | 6.x | Role-based access control |
| Spatie Activitylog | 4.x | Audit logging |
| Laravel Sanctum | 4.x | API authentication |

### Infrastructure

| Tool | Purpose |
|---|---|
| Docker + Docker Compose | Container orchestration |
| Nginx | Web server and reverse proxy |
| phpMyAdmin | Database management UI |
| OpenVPN | Client VPN with hourly IP rotation |

---

## 4. Project Structure

<details>
<summary><strong>Click to expand full project tree</strong></summary>

```
portfolio-neverland-studio/
│
├── src/                                  # React + TypeScript frontend
│   ├── components/                       # Reusable UI (Atomic Design)
│   │   ├── atoms/                        # Button, Badge, Input, Spinner…
│   │   ├── molecules/                    # SectionTitle, Card, Modal…
│   │   └── organisms/                    # Navbar, Footer, AILiveChat, FloatingCartButton…
│   │
│   ├── pages/                            # Route-level page components (73+ pages)
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Services/
│   │   │   ├── NetworkSecurity/
│   │   │   ├── NetworkInfrastructure/
│   │   │   ├── Virtualization/
│   │   │   └── …(10 service pages)
│   │   ├── Playground/
│   │   │   ├── Playground/               # CTF hub index
│   │   │   ├── PlaygroundVM/             # Isolated VM terminal
│   │   │   ├── PlaygroundOVPN/           # OpenVPN Connect page
│   │   │   ├── PlaygroundSQL/
│   │   │   ├── PlaygroundWeb/
│   │   │   ├── PlaygroundCrypto/
│   │   │   ├── PlaygroundBinary/
│   │   │   ├── PlaygroundReverse/
│   │   │   ├── PlaygroundForensics/
│   │   │   ├── PlaygroundSteganography/
│   │   │   ├── PlaygroundOSINT/
│   │   │   ├── PlaygroundMobile/
│   │   │   ├── PlaygroundCVE/
│   │   │   └── PlaygroundLearning/
│   │   │       ├── PlaygroundLearningTools/   # 23 security tools
│   │   │       ├── PlaygroundLearningWriteups/
│   │   │       └── PlaygroundLearningRoadmap/
│   │   ├── Dashboard/                    # Admin dashboard (10 modules)
│   │   └── ITServicesStore/
│   │
│   ├── config/
│   │   ├── constants.ts                  # App-wide route constants
│   │   └── routes.config.tsx             # Lazy-loaded route definitions
│   │
│   ├── hooks/                            # Custom React hooks
│   ├── services/                         # Axios API service modules
│   ├── utils/                            # Helpers and animation presets
│   ├── styles/
│   │   └── globals.css                   # Tailwind directives + global overrides
│   ├── CustomCursor.jsx                  # Red ring cursor + particle trail
│   ├── custom-cursor.css                 # Cursor styles (AES-256-GCM red theme)
│   └── App.tsx                           # Root component + router
│
├── backend/                              # Laravel 11 REST API
│   ├── app/
│   │   ├── Http/Controllers/             # API controllers
│   │   │   └── VMController.php          # VM lifecycle + VPN config endpoints
│   │   ├── Models/                       # Eloquent models
│   │   └── Policies/                     # Authorization policies
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   ├── routes/
│   │   └── api.php                       # All API route definitions
│   ├── .env.example                      # Environment template
│   └── composer.json
│
├── docker-compose.yml                    # Multi-container orchestration
├── .env.example                          # Frontend environment template
├── vite.config.ts                        # Vite + path aliases config
├── tailwind.config.js                    # Tailwind theme config
├── tsconfig.json
└── package.json
```

</details>

---

## 5. Prerequisites

| Component | Minimum | Recommended |
|---|---|---|
| OS | Ubuntu 20.04 / Windows 10 / macOS 11 | Ubuntu 22.04 LTS |
| RAM | 4 GB | 8 GB+ |
| Disk | 5 GB free | 10 GB+ free |
| Node.js | 22.x | 24.x (LTS) |
| PHP | 8.2 | 8.3+ |
| Composer | 2.x | latest |
| Docker | 24.x | 25.x+ |
| Docker Compose | v2 plugin | v2.24+ |
| Git | 2.x | latest |

> **Windows users:** Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and make sure it is running before executing any `docker` commands.

---

## 6. Quick Start — Docker (Recommended)

The fastest way to get the entire stack (frontend, backend, database, phpMyAdmin) running locally.

```bash
# 1. Clone the repository
git clone https://github.com/MuhammadIsakiPrananda1/portfolio-neverland-studio-v2.git
cd portfolio-neverland-studio

# 2. Create the shared Docker network
docker network create app-network

# 3. Copy environment file and review it
cp .env.example .env

# 4. Build and start all containers in the background
docker-compose up -d --build

# 5. Run database migrations
docker exec -it neverland-backend php artisan migrate --seed
```

Once complete, the following services are available:

| Service | URL |
|---|---|
| Frontend (dev) | http://localhost:5173 |
| Backend API | http://localhost:8001 |
| WebSocket (Reverb) | ws://localhost:8080 |
| phpMyAdmin | http://localhost:8081 |

> First build takes 3–8 minutes depending on your machine and internet speed.

---

## 7. Manual Setup — Without Docker

Use this if you prefer running services directly on your machine.

### Step 1 — Clone

```bash
git clone https://github.com/MuhammadIsakiPrananda1/portfolio-neverland-studio-v2.git
cd portfolio-neverland-studio
```

### Step 2 — Frontend

```bash
# Install dependencies
npm install

# Copy and edit environment
cp .env.example .env
# Set VITE_API_URL=http://localhost:8001 in .env

# Start the dev server
npm run dev
```

Frontend available at **http://localhost:5173**

### Step 3 — Backend

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env
# Edit .env: Set DB_*, APP_KEY, FRONTEND_URL, REVERB_* values

# Generate the application encryption key
php artisan key:generate

# Create the database
mysql -u root -p -e "CREATE DATABASE neverland_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations and seed initial data
php artisan migrate --seed

# Start the API server
php artisan serve --host=0.0.0.0 --port=8001
```

Backend available at **http://localhost:8001**

### Step 4 — WebSocket Server (Real-Time Features)

```bash
cd backend
php artisan reverb:start
```

---

## 8. Environment Variables

### Frontend `.env`

```env
# Backend API base URL (no trailing slash)
VITE_API_URL=http://localhost:8001/api

# Application display name
VITE_APP_NAME=Neverland Studio

# Frontend URL (used for OAuth callbacks etc.)
VITE_APP_URL=http://localhost:5173

# Laravel Reverb WebSocket (real-time dashboard)
VITE_REVERB_APP_KEY=your_reverb_app_key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

### Backend `backend/.env` (key variables)

```env
# Application
APP_NAME="Neverland Studio API"
APP_ENV=local
APP_KEY=                          # Generated by: php artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost:8001
FRONTEND_URL=http://localhost:5173

# Database
DB_CONNECTION=mysql
DB_HOST=mariadb                   # Use 'mariadb' inside Docker, '127.0.0.1' locally
DB_PORT=3306
DB_DATABASE=neverland_portfolio
DB_USERNAME=root
DB_PASSWORD=root

# Real-Time Broadcasting (Laravel Reverb)
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=your_app_id
REVERB_APP_KEY=your_app_key
REVERB_APP_SECRET=your_app_secret
REVERB_HOST=0.0.0.0
REVERB_PORT=8080
REVERB_SCHEME=http

# Mail (for contact form)
MAIL_MAILER=smtp
MAIL_HOST=smtp.yourprovider.com
MAIL_PORT=587
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=yourpassword
MAIL_FROM_ADDRESS=noreply@neverlandstudio.my.id

# OpenVPN (for /playground/ovpn)
VPS_IP=your.vps.ip.address
VPN_IP_POOL=1.2.3.4,5.6.7.8      # Comma-separated IPs — rotates automatically every hour
VPN_PORT=1194
VPN_PROTO=udp
VPN_CA_CERT=                      # PEM-encoded CA certificate from your OpenVPN server
VPN_TLS_AUTH_KEY=                 # tls-auth static key from your OpenVPN server
```

> **Security note:** Never commit `.env` files to version control. Add them to `.gitignore`.

---

## 9. Running the Application

### Docker

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View live logs
docker-compose logs -f

# Restart a single service
docker-compose restart backend
```

### Without Docker

```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — Backend API
cd backend && php artisan serve --port=8001

# Terminal 3 — WebSocket Server
cd backend && php artisan reverb:start
```

### Default Admin Credentials

> ⚠️ **Change these immediately after your first login.**

```
Email:    admin@neverlandstudio.com
Password: password
```

---

## 10. Building for Production

### Frontend

```bash
# Type-check and build
npm run build

# Preview the production build locally
npm run preview
```

The compiled output is in `dist/` and served by Nginx inside Docker.

### Backend Optimization

```bash
cd backend

# Cache config, routes, and views for performance
php artisan optimize

# Or step by step:
composer dump-autoload -o
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Docker Production Deploy

```bash
docker-compose up -d --build

# Confirm all containers are healthy
docker-compose ps

# Follow logs
docker-compose logs -f backend
```

---

## 11. API Reference

All endpoints are prefixed with `/api/v1/`.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | — | Create a new user account |
| `POST` | `/auth/login` | — | Log in, receive Sanctum token |
| `POST` | `/auth/logout` | ✅ | Invalidate the current token |
| `GET` | `/user` | ✅ | Get the authenticated user profile |
| `POST` | `/auth/2fa/enable` | ✅ | Enable two-factor authentication |
| `POST` | `/auth/2fa/verify` | ✅ | Verify a TOTP code |

### Virtual Machine

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/vm/start` | ✅ | Spawn a new Debian 13 Docker container |
| `POST` | `/vm/{id}/stop` | ✅ | Terminate a container session |
| `GET` | `/vm/{id}/status` | ✅ | Get container status and resource usage |
| `POST` | `/vm/{id}/execute` | ✅ | Execute a shell command inside the container |
| `POST` | `/vm/{id}/extend` | ✅ | Extend session by 30 minutes |
| `GET` | `/vm/vpn-config` | — | Get current VPN IP, rotation time, and cipher specs |
| `GET` | `/vm/vpn-config/download` | — | Download `neverland-vpn.ovpn` config file |

### General

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | — | Service health check |
| `GET` | `/services` | — | List all offered services |
| `GET` | `/projects` | — | List portfolio projects |
| `POST` | `/contact` | — | Submit a contact form message |

---

## 12. Playground & CTF Hub

### CTF Challenge Categories

| Category | Path |
|---|---|
| Web Security | `/playground/web-security` |
| System Exploitation | `/playground/system-exploitation` |
| Cryptography | `/playground/cryptography` |
| Binary Exploitation | `/playground/binary-exploitation` |
| Reverse Engineering | `/playground/reverse-engineering` |
| Forensics | `/playground/forensics` |
| Steganography | `/playground/steganography` |
| OSINT | `/playground/osint` |
| Mobile Security | `/playground/mobile-security` |
| CVE Labs | `/playground/cve-labs` |
| SQL Injection | `/playground/sql-injection` |

### Virtual Machine — `/playground/virtual-machine`

- Spawns an isolated **Debian 13 (Trixie)** container in privileged mode via Docker.
- Each authenticated user gets one free **1-hour session**.
- Full interactive terminal in the browser (no SSH client needed).
- After session expires, the page redirects to the OpenVPN connect flow.

### Learning Tools — `/playground/learning/tools`

23 fully client-side tools organized into 7 categories — no server calls required:

| Category | Tools |
|---|---|
| **Encoding** | Base64 Encoder/Decoder, URL Encoder/Decoder, Hex ↔ ASCII, Binary ↔ Text, HTML Entities |
| **Cipher** | ROT13, Caesar Cipher, Vigenère Cipher, Morse Code, XOR Cipher, Atbash |
| **Hash** | Hash Generator (SHA-1/256/384/512), JWT Decoder |
| **Security** | Password Generator, Password Strength Checker |
| **Converter** | Number Base Converter, Timestamp Converter, UUID Generator, Text Case Converter |
| **Network** | IPv4 Subnet Calculator, Common Ports Reference |
| **Text** | Regex Tester, String Inspector |

---

## 13. OpenVPN Access

The `/playground/ovpn` page provides a HackTheBox-style VPN connect experience.

### How It Works

1. Visit **http://localhost:5173/playground/ovpn**
2. Select a server and protocol (UDP 1194 or TCP 443)
3. Click **Download neverland-vpn.ovpn** — a personalized config is generated by the backend
4. Connect using any OpenVPN client:

```bash
# Install client
sudo apt install openvpn -y

# Connect
sudo openvpn --config neverland-vpn.ovpn

# Verify your VPN IP
curl -s ifconfig.me

# Test the gateway
ping 10.10.0.1
```

### IP Rotation

The backend selects the active VPN server IP from `VPN_IP_POOL` based on the current hour:

```
IP = VPN_IP_POOL[current_hour % pool_size]
```

A different IP is picked at the top of every hour automatically. No manual action is needed.

### Cipher Specs

| Parameter | Value |
|---|---|
| Cipher | AES-256-GCM |
| HMAC Auth | SHA-512 |
| TLS Version | 1.3 minimum |
| TLS Cipher | TLS-AES-256-GCM-SHA384 |
| Compression | lz4-v2 |
| Protocol | UDP 1194 (default) |

---

## 14. Customization

### Theme Colors

Edit `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary:   '#ef4444',   // Red-500 — main brand color
        secondary: '#dc2626',   // Red-600 — hover states
        accent:    '#b91c1c',   // Red-700 — active/focus states
      }
    }
  }
}
```

### Custom Cursor

The cursor ring and particle trail are styled in `src/custom-cursor.css`. To change the color:

```css
/* Replace rgba(239, 68, 68, ...) with your desired color */
.cursor-ring {
  border: 1.5px solid rgba(239, 68, 68, 0.85);
}
```

The trail hue is controlled in `src/CustomCursor.jsx`:

```javascript
const hue = 0; // 0 = red, 195 = cyan, 270 = purple
```

### Adding a New Route

1. Create the page: `src/pages/MyFeature/MyFeature.tsx`
2. Create the export: `src/pages/MyFeature/index.ts`
3. Add the constant to `src/config/constants.ts`:
   ```typescript
   MY_FEATURE = '/my-feature',
   ```
4. Register in `src/config/routes.config.tsx`:
   ```typescript
   export const MyFeature = lazyLoad(() => import('@pages/MyFeature'));
   // ...
   { path: AppRoutes.MY_FEATURE, element: MyFeature },
   ```

---

## 15. Troubleshooting

<details>
<summary><strong>Docker Desktop not running</strong></summary>

```
Error: cannot connect to the Docker daemon
```

**Fix:** Open **Docker Desktop** from the Start Menu / Applications and wait for it to show "Engine running" before retrying.

</details>

<details>
<summary><strong>Port already in use</strong></summary>

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux / macOS
lsof -i :5173
kill -9 <PID>
```

</details>

<details>
<summary><strong>Database migration errors</strong></summary>

```bash
cd backend
php artisan config:clear
php artisan migrate:fresh --seed   # ⚠️ This wipes all existing data
```

</details>

<details>
<summary><strong>node_modules issues</strong></summary>

```bash
rm -rf node_modules package-lock.json
npm install
```

</details>

<details>
<summary><strong>Composer dependency issues</strong></summary>

```bash
cd backend
composer clear-cache
rm -rf vendor
composer install --no-interaction
```

</details>

<details>
<summary><strong>Full Docker reset</strong></summary>

```bash
docker-compose down -v --rmi all
docker-compose build --no-cache
docker-compose up -d
```

</details>

<details>
<summary><strong>Real-time dashboard not updating</strong></summary>

1. Confirm Reverb is running:
   ```bash
   cd backend && php artisan reverb:start
   ```
2. Check your `.env` files match on both sides:
   ```bash
   grep REVERB backend/.env
   grep VITE_REVERB .env
   ```
3. Make sure `BROADCAST_CONNECTION=reverb` is set in `backend/.env`.

</details>

<details>
<summary><strong>VPN config download returns 404 or connection refused</strong></summary>

1. Ensure the backend container is running: `docker ps | grep neverland-backend`
2. Check that `VPS_IP` and `VPN_IP_POOL` are set in `backend/.env`
3. Verify `VPN_CA_CERT` and `VPN_TLS_AUTH_KEY` are populated with valid OpenVPN credentials

</details>

---

## 16. Roadmap

Planned features and improvements for 2026:

- [ ] AI-powered security vulnerability scanner
- [ ] Blockchain certificate verification for completed challenges
- [ ] Mobile app (iOS & Android) — React Native
- [ ] Dark / Light mode toggle
- [ ] Multi-language support (English / Indonesian)
- [ ] CTF leaderboard with points system
- [ ] Machine-style challenges (like HackTheBox)
- [ ] Dynamic `.ovpn` generation per user

---

## 17. Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow, code standards, and pull request process.

By participating in this project, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

**Key rules:**
- Always branch off `main` and open a PR against `main`.
- Run `npm run lint` and `npm run type-check` before opening a PR.
- Write clear commit messages in English.
- Document any new `.env` variables in `.env.example`.

---

## 18. License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 19. Contact

| Channel | Details |
|---|---|
| **Email** | Arlianto032@gmail.com |
| **Website** | [portfolio.neverlandstudio.my.id](https://portfolio.neverlandstudio.my.id) |
| **GitHub** | [@MuhammadIsakiPrananda1](https://github.com/MuhammadIsakiPrananda1) |
| **Issues** | [GitHub Issues](https://github.com/MuhammadIsakiPrananda1/portfolio-neverland-studio-v2/issues) |

---

<div align="center">

Made with dedication by **Neverland Studio**

*Securing the Digital Future*

Copyright © 2026 Neverland Studio. All rights reserved.

</div>
