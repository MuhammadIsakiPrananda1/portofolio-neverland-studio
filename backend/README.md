<div align="center">

# Neverland Studio — Backend API

**Laravel 11 REST API powering the Neverland Studio portfolio platform.**

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net)
[![MySQL](https://img.shields.io/badge/MariaDB-8.4-003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.org)
[![Docker](https://img.shields.io/badge/Docker-Nginx-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](../LICENSE)

> Part of the [Neverland Studio](../README.md) full-stack project. For frontend setup see the root [`README.md`](../README.md).

</div>

---

## Table of Contents

1. [Overview](#1-overview)
2. [Features](#2-features)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Prerequisites](#5-prerequisites)
6. [Installation](#6-installation)
7. [Environment Variables](#7-environment-variables)
8. [Running the Server](#8-running-the-server)
9. [API Reference](#9-api-reference)
10. [Authentication](#10-authentication)
11. [Virtual Machine & VPN](#11-virtual-machine--vpn)
12. [Real-Time Broadcasting](#12-real-time-broadcasting)
13. [Database](#13-database)
14. [Production Deployment](#14-production-deployment)
15. [Testing](#15-testing)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. Overview

The Neverland Studio backend is a **RESTful API** built with Laravel 11. It handles:

- User authentication (Sanctum tokens + 2FA)
- Role-based access control for the admin dashboard
- Portfolio content management (services, projects, blog)
- Contact form processing and messaging
- Docker container lifecycle management (VM Playground)
- OpenVPN config generation with hourly IP rotation
- Real-time event broadcasting via Laravel Reverb (WebSocket)
- Analytics tracking and audit logging

**Base URL:** `http://localhost:8001/api/v1`

---

## 2. Features

| Feature | Package / Implementation |
|---|---|
| Token-based authentication | Laravel Sanctum |
| Two-factor authentication (TOTP) | Google Authenticator / `pragmarx/google2fa` |
| Role & permission management | `spatie/laravel-permission` |
| Activity / audit logging | `spatie/laravel-activitylog` |
| Real-time broadcasting | Laravel Reverb (WebSocket server) |
| VM container management | PHP `exec()` + Docker CLI via socket |
| OpenVPN config generation | Custom `generateOpenVpnConfig()` — AES-256-GCM, SHA-512, TLS 1.3 |
| Hourly VPN IP rotation | Hour-modulo pool selection from `VPN_IP_POOL` env |
| Rate limiting | Laravel built-in throttle middleware |
| CORS | `fruitcake/laravel-cors` |
| Mail | Laravel Mailer (SMTP) |
| Queue | Database driver (upgradeable to Redis) |

---

## 3. Tech Stack

| Package | Version | Purpose |
|---|---|---|
| Laravel | 11 | Core framework |
| PHP | 8.2+ | Runtime |
| MariaDB / MySQL | 8.4 | Primary database |
| Laravel Reverb | 1.x | WebSocket server |
| Laravel Sanctum | 4.x | API authentication |
| Laravel Echo | — | Front-end WebSocket listener |
| Spatie Permission | 6.x | RBAC |
| Spatie Activitylog | 4.x | Audit trail |
| Monolog | — | Logging |
| GuzzleHTTP | 7.x | HTTP client |

---

## 4. Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php          # Register, login, logout, 2FA
│   │   │   ├── VMController.php            # VM lifecycle + VPN config
│   │   │   ├── ProjectController.php
│   │   │   ├── ServiceController.php
│   │   │   ├── ContactController.php
│   │   │   ├── AnalyticsController.php
│   │   │   ├── MessageController.php
│   │   │   └── DashboardController.php
│   │   ├── Middleware/
│   │   │   ├── Authenticate.php
│   │   │   └── EnsureEmailIsVerified.php
│   │   └── Requests/                       # Form Request validation classes
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── Project.php
│   │   ├── Service.php
│   │   ├── ContactMessage.php
│   │   └── …
│   │
│   ├── Policies/                           # Model authorization policies
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── BroadcastServiceProvider.php
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   │   ├── DatabaseSeeder.php
│   │   ├── UserSeeder.php
│   │   └── RolePermissionSeeder.php
│   └── factories/
│
├── routes/
│   ├── api.php                             # All v1 API routes
│   ├── channels.php                        # Broadcast channel auth
│   └── web.php
│
├── config/
│   ├── broadcasting.php
│   ├── cors.php
│   ├── sanctum.php
│   └── reverb.php
│
├── .env.example                            # Environment variable template
├── composer.json
└── Dockerfile
```

---

## 5. Prerequisites

| Requirement | Minimum | Notes |
|---|---|---|
| PHP | 8.2 | Extensions: `mbstring`, `xml`, `curl`, `pdo`, `pdo_mysql`, `sockets` |
| Composer | 2.x | Package manager |
| MySQL / MariaDB | 8.4 | Or run via Docker |
| Docker | 24.x | Required for VM Playground (Docker socket access) |

---

## 6. Installation

### Option A — Docker (Recommended)

From the **project root** (not the `backend/` folder):

```bash
docker network create app-network
cp .env.example .env
docker-compose up -d --build

# Run migrations and seed initial data
docker exec -it neverland-backend php artisan migrate --seed
```

The API is available at **http://localhost:8001**.

### Option B — Local (Without Docker)

```bash
cd backend

# Install PHP dependencies
composer install

# Copy and configure environment
cp .env.example .env
# Edit .env: set DB_*, APP_KEY, FRONTEND_URL, REVERB_* values

# Generate application encryption key
php artisan key:generate

# Create the database
mysql -u root -p -e "CREATE DATABASE neverland_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations
php artisan migrate

# Seed initial data (creates admin user, roles, permissions)
php artisan db:seed

# Create storage symlink
php artisan storage:link

# Start the API
php artisan serve --host=0.0.0.0 --port=8001
```

---

## 7. Environment Variables

Copy `.env.example` to `.env` and fill in the values below.

```env
# ── Application ────────────────────────────────────────────────
APP_NAME="Neverland Studio API"
APP_ENV=local                        # local | production
APP_KEY=                             # generated by: php artisan key:generate
APP_DEBUG=true                       # set false in production
APP_URL=http://localhost:8001
FRONTEND_URL=http://localhost:5173

# ── Database ───────────────────────────────────────────────────
DB_CONNECTION=mysql
DB_HOST=mariadb                      # use 'mariadb' inside Docker, '127.0.0.1' locally
DB_PORT=3306
DB_DATABASE=neverland_portfolio
DB_USERNAME=root
DB_PASSWORD=root

# ── CORS ───────────────────────────────────────────────────────
CORS_ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000"
CORS_SUPPORTS_CREDENTIALS=true
SANCTUM_STATEFUL_DOMAINS="localhost:5173,localhost:3000"

# ── Broadcasting (Laravel Reverb) ─────────────────────────────
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=your_app_id
REVERB_APP_KEY=your_app_key
REVERB_APP_SECRET=your_app_secret
REVERB_HOST=0.0.0.0
REVERB_PORT=8080
REVERB_SCHEME=http

# ── Queue & Cache ──────────────────────────────────────────────
QUEUE_CONNECTION=database
CACHE_DRIVER=file
SESSION_DRIVER=database

# ── Mail (contact form) ────────────────────────────────────────
MAIL_MAILER=smtp
MAIL_HOST=smtp.yourprovider.com
MAIL_PORT=587
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=yourpassword
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@neverlandstudio.my.id
MAIL_FROM_NAME="Neverland Studio"

# ── OpenVPN ────────────────────────────────────────────────────
VPS_IP=your.vps.ip.address
VPN_IP_POOL=1.2.3.4,5.6.7.8         # comma-separated IPs, rotates every hour
VPN_PORT=1194
VPN_PROTO=udp
VPN_CA_CERT=                         # PEM-encoded CA certificate
VPN_TLS_AUTH_KEY=                    # tls-auth static key
```

---

## 8. Running the Server

### Docker

```bash
# Start backend only
docker-compose up -d backend

# View logs
docker-compose logs -f backend

# Run artisan commands inside container
docker exec -it neverland-backend php artisan <command>
```

### Local

```bash
# Terminal 1 — HTTP API
php artisan serve --host=0.0.0.0 --port=8001

# Terminal 2 — WebSocket server (real-time features)
php artisan reverb:start

# Terminal 3 — Queue worker (mail, jobs)
php artisan queue:work
```

---

## 9. API Reference

All routes are prefixed with `/api/v1/`. Protected routes require a `Bearer` token in the `Authorization` header.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | — | Create a new user account |
| `POST` | `/auth/login` | — | Authenticate and receive a Sanctum token |
| `POST` | `/auth/logout` | ✅ | Revoke the current token |
| `GET` | `/user` | ✅ | Return the authenticated user profile |
| `PUT` | `/auth/profile` | ✅ | Update profile details |
| `PUT` | `/auth/password` | ✅ | Change password |
| `POST` | `/auth/2fa/enable` | ✅ | Generate 2FA QR code |
| `POST` | `/auth/2fa/verify` | ✅ | Verify a TOTP code |
| `POST` | `/auth/2fa/disable` | ✅ | Disable two-factor authentication |

### Public

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service health check |
| `GET` | `/services` | List all offered services |
| `GET` | `/projects` | List portfolio projects |
| `GET` | `/team` | List team members |
| `GET` | `/testimonials` | List testimonials |
| `POST` | `/contact` | Submit a contact form message |

### Virtual Machine

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/vm/start` | ✅ | Provision a new Debian 13 Docker container |
| `POST` | `/vm/{id}/stop` | ✅ | Terminate the container and clean up |
| `GET` | `/vm/{id}/status` | ✅ | Get container status and resource usage |
| `POST` | `/vm/{id}/execute` | ✅ | Execute a shell command in the container |
| `POST` | `/vm/{id}/extend` | ✅ | Extend the session by 30 minutes |

### OpenVPN

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/vm/vpn-config` | — | Return current VPN IP, rotation time, and cipher specs as JSON |
| `GET` | `/vm/vpn-config/download` | — | Stream `neverland-vpn.ovpn` as a file download |

### Dashboard (Protected — Admin)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/analytics/overview` | Dashboard summary stats |
| `GET` | `/analytics/visitors` | Visitor counts and trends |
| `GET` | `/messages` | List contact messages |
| `PUT` | `/messages/{id}/read` | Mark a message as read |
| `POST` | `/messages/{id}/reply` | Reply to a message |
| `GET` | `/dashboard/projects` | Admin project list |
| `POST` | `/projects` | Create a new project |
| `PUT` | `/projects/{id}` | Update a project |
| `DELETE` | `/projects/{id}` | Delete a project |

---

## 10. Authentication

This API uses **Laravel Sanctum** for token-based authentication.

### Login Flow

```bash
# 1. Login to receive a token
curl -X POST http://localhost:8001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@neverlandstudio.com","password":"password"}'

# Response:
# { "token": "1|abc123...", "user": { ... } }

# 2. Use the token on protected routes
curl http://localhost:8001/api/v1/user \
  -H "Authorization: Bearer 1|abc123..."
```

### Two-Factor Authentication (2FA)

1. Call `POST /auth/2fa/enable` → receive a QR code URI
2. Scan with **Google Authenticator** or any TOTP app
3. Verify setup: `POST /auth/2fa/verify` with a valid 6-digit code
4. On subsequent logins, the API will require the TOTP code

### Default Credentials

> ⚠️ **Change these immediately after first login.**

```
Admin:   admin@neverlandstudio.com  / password
Editor:  editor@neverlandstudio.com / password
```

---

## 11. Virtual Machine & VPN

### VM Lifecycle

The `VMController` manages Debian 13 Docker containers via the Docker CLI through the mounted socket (`/var/run/docker.sock`).

```
POST /vm/start
  → Runs: docker run -d --privileged --name {id} debian:trixie ...
  → Returns: { container_id, password, expires_at }

POST /vm/{id}/execute
  → Runs: docker exec {id} bash -c "{command}"
  → Returns: { output, exit_code }

POST /vm/{id}/stop
  → Runs: docker stop {id} && docker rm {id}
```

Each user is limited to **one active 1-hour session**. A `403 vpn_required` response is returned if a session has already been consumed.

### VPN Config Generation

The `downloadVpnConfig` method generates a `.ovpn` file on demand:

```
GET /vm/vpn-config/download
  → Selects IP: VPN_IP_POOL[current_hour % pool_size]
  → Builds OpenVPN config with AES-256-GCM, SHA-512, TLS 1.3
  → Returns: neverland-vpn.ovpn (Content-Disposition: attachment)
```

**IP rotation** happens automatically at the top of every hour — no cron job needed. The active IP is always `VPN_IP_POOL[hour % count]`.

### Required `.env` for VPN

```env
VPS_IP=203.0.113.10
VPN_IP_POOL=203.0.113.10,198.51.100.5,192.0.2.20
VPN_PORT=1194
VPN_PROTO=udp
VPN_CA_CERT=-----BEGIN CERTIFICATE-----
<paste full CA cert here>
-----END CERTIFICATE-----
VPN_TLS_AUTH_KEY=-----BEGIN OpenVPN Static key V1-----
<paste full tls-auth key here>
-----END OpenVPN Static key V1-----
```

---

## 12. Real-Time Broadcasting

Laravel Reverb provides the WebSocket layer. The frontend connects via **Laravel Echo**.

### Start Reverb

```bash
php artisan reverb:start
# WebSocket available at ws://localhost:8080
```

### Example — Broadcast an event

```php
// In a controller or job:
broadcast(new DashboardUpdated($data))->toOthers();
```

### Environment (must match frontend)

```env
# backend/.env
BROADCAST_CONNECTION=reverb
REVERB_APP_KEY=your_app_key
REVERB_HOST=0.0.0.0
REVERB_PORT=8080

# .env (frontend root)
VITE_REVERB_APP_KEY=your_app_key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
```

---

## 13. Database

### Connection

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1     # or 'mariadb' inside Docker
DB_PORT=3306
DB_DATABASE=neverland_portfolio
DB_USERNAME=root
DB_PASSWORD=root
```

### Common Artisan Commands

```bash
# Run all pending migrations
php artisan migrate

# Fresh migration + seed (⚠️ destroys all data)
php artisan migrate:fresh --seed

# Check migration status
php artisan migrate:status

# Roll back last batch
php artisan migrate:rollback

# Access Tinker (interactive REPL)
php artisan tinker
```

### Key Tables

| Table | Contents |
|---|---|
| `users` | User accounts with 2FA fields |
| `roles` / `permissions` | Spatie RBAC tables |
| `model_has_roles` | User ↔ role assignments |
| `activity_log` | Full audit trail (Spatie Activitylog) |
| `sessions` | Database session storage |
| `jobs` | Queue job table |
| `personal_access_tokens` | Sanctum API tokens |

---

## 14. Production Deployment

### Checklist

```env
APP_ENV=production
APP_DEBUG=false
APP_KEY=<strong-random-key>
```

### Optimize

```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### Cron (Laravel Scheduler)

Add to server crontab:

```bash
* * * * * cd /var/www/html && php artisan schedule:run >> /dev/null 2>&1
```

### Queue Worker (Supervisor recommended)

```bash
php artisan queue:work --tries=3 --timeout=90
```

### Production Security Hardening

- Set `SESSION_SECURE_COOKIE=true` (HTTPS only)
- Set proper `CORS_ALLOWED_ORIGINS` (no wildcard `*`)
- Add `APP_URL` with your production domain
- Enable rate limiting on all auth routes
- Rotate `APP_KEY` and all secrets before go-live

---

## 15. Testing

```bash
# Run all tests
php artisan test

# Run with coverage report
php artisan test --coverage

# Run a specific test file
php artisan test tests/Feature/AuthTest.php

# Run a specific test method
php artisan test --filter test_user_can_login
```

---

## 16. Troubleshooting

<details>
<summary><strong>php artisan key:generate — APP_KEY missing</strong></summary>

```bash
cp .env.example .env
php artisan key:generate
```

</details>

<details>
<summary><strong>Database connection refused</strong></summary>

- Local: confirm MySQL / MariaDB is running on port 3306
- Docker: confirm `DB_HOST=mariadb` (not `127.0.0.1`) in `backend/.env`
- Run: `php artisan config:clear` after changing `.env`

</details>

<details>
<summary><strong>CORS errors from the frontend</strong></summary>

Ensure `CORS_ALLOWED_ORIGINS` and `SANCTUM_STATEFUL_DOMAINS` include your frontend URL:

```env
CORS_ALLOWED_ORIGINS="http://localhost:5173"
SANCTUM_STATEFUL_DOMAINS="localhost:5173"
```

Then clear config: `php artisan config:clear`

</details>

<details>
<summary><strong>VM start fails — docker: command not found</strong></summary>

The Docker socket must be mounted in the container. Verify `docker-compose.yml` has:

```yaml
volumes:
  - /var/run/docker.sock:/var/run/docker.sock
```

</details>

<details>
<summary><strong>Reverb WebSocket not connecting</strong></summary>

1. Start Reverb: `php artisan reverb:start`
2. Check port 8080 is not blocked by firewall
3. Confirm `REVERB_APP_KEY` is identical in both `backend/.env` and root `.env`

</details>

<details>
<summary><strong>VPN config download returns empty CA cert</strong></summary>

`VPN_CA_CERT` and `VPN_TLS_AUTH_KEY` must be populated in `backend/.env` with the actual OpenVPN server credentials. Without them the generated `.ovpn` will contain placeholder comments and will not connect.

</details>

<details>
<summary><strong>Full reset</strong></summary>

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
composer dump-autoload
php artisan migrate:fresh --seed
```

</details>

---

<div align="center">

Part of **Neverland Studio** · [Root README](../README.md) · [Installation Guide](../INSTALL.md)

Copyright © 2026 Neverland Studio. All rights reserved.

</div>
