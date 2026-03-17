# Usage Guide

> How to navigate, use, and get the most out of Neverland Studio.

---

## Table of Contents

1. [Public Website](#1-public-website)
2. [Authentication](#2-authentication)
3. [Security Playground & CTF Hub](#3-security-playground--ctf-hub)
4. [IT Services Store](#4-it-services-store)
5. [Admin Dashboard](#5-admin-dashboard)
6. [Settings & Profile](#6-settings--profile)
7. [API Usage](#7-api-usage)

---

## 1. Public Website

The public-facing website is accessible at your configured `VITE_APP_URL` without logging in.

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Landing page with animated hero section |
| About | `/about` | Company overview and team |
| Services | `/services` | IT & cybersecurity service catalogue |
| Portfolio | `/portfolio` | Completed project showcase |
| Contact | `/contact` | Contact form and office details |

### Navigation

- The **sticky navigation bar** collapses into a hamburger menu on mobile.
- A **glowing custom cursor** follows your mouse on desktop.
- **Framer Motion** page transitions animate between routes.

---

## 2. Authentication

### Register

1. Click **Get Started** or navigate to `/auth/register`.
2. Fill in your name, email, and password (min. 8 characters).
3. Submit — you will be logged in immediately.

### Login

1. Navigate to `/auth/login`.
2. Enter your email and password.
3. If **Two-Factor Authentication (2FA)** is enabled on your account, you will be prompted for your 6-digit TOTP code.

### Social Login (OAuth)

- **Google** — Click *Continue with Google* on the login/register page.
- **GitHub** — Click *Continue with GitHub* on the login/register page.

### Logout

Click your avatar in the top-right corner and select **Sign Out**.  
All active tokens for the current device are invalidated.

---

## 3. Security Playground & CTF Hub

Navigate to `/playground` to access the CTF environment.

### Challenge Categories

| Category | Path | Description |
|----------|------|-------------|
| Web Security | `/playground/web` | XSS, CSRF, IDOR challenges |
| Cryptography | `/playground/crypto` | Cipher, hash, encoding puzzles |
| Binary Exploitation | `/playground/binary` | Buffer overflow, format strings |
| Reverse Engineering | `/playground/reverse` | Binary analysis challenges |
| Digital Forensics | `/playground/forensics` | File carving, memory dumps |
| Steganography | `/playground/steganography` | Hidden data in images/audio |
| OSINT | `/playground/osint` | Open-source intelligence |
| Mobile Security | `/playground/mobile` | APK analysis |
| SQL Injection Lab | `/playground/sql` | Safe sandbox SQL injection practice |
| CVE Research | `/playground/cve` | Real-world CVE walkthroughs |

### Virtual Machine

1. Navigate to `/playground/vm`.
2. Click **Spawn Machine** — an isolated Debian container starts.
3. Interact via the browser-based terminal (xterm.js).
4. Sessions are **auto-terminated after 1 hour**.

### OpenVPN Connect

1. Navigate to `/playground/ovpn`.
2. Download your personalized `.ovpn` configuration file.
3. Import into your OpenVPN client to connect.
4. The IP address rotates **every hour**.

### Learning Tools

Navigate to `/playground/learning/tools` for **23 client-side security tools** — all run locally in your browser with no data sent to the server:

- Base64 / Hex encoder–decoder
- Hash generator (MD5, SHA-1, SHA-256, SHA-512)
- JWT decoder
- URL encoder / decoder
- IP CIDR calculator
- Password strength checker
- And more…

---

## 4. IT Services Store

Navigate to `/store` to browse available IT services and packages.

1. Browse service packages by category.
2. Click **Add to Cart** to add items to your cart.
3. The **floating cart button** (bottom-right) shows your cart count.
4. Proceed to checkout and fill in your project requirements.
5. Submit the order — the team will follow up within 1–2 business days.

---

## 5. Admin Dashboard

> **Requires:** Admin or Manager role.

Navigate to `/dashboard` after logging in with an authorized account.

### Modules

| Module | Path | Description |
|--------|------|-------------|
| Analytics | `/dashboard/analytics` | Real-time visitor stats and charts |
| Projects | `/dashboard/projects` | Create, edit, and track projects |
| Clients | `/dashboard/clients` | Client profiles and contact info |
| Invoices | `/dashboard/invoices` | Create invoices, export to PDF |
| Tasks | `/dashboard/tasks` | Kanban-style task board |
| Team | `/dashboard/team` | Member management and role assignment |
| Messages | `/dashboard/messages` | In-app messaging system |
| Settings | `/dashboard/settings` | Account and application settings |

### Real-Time Updates

The dashboard receives live updates via **Laravel Reverb (WebSockets)**. Ensure Reverb is running and `VITE_PUSHER_*` environment variables are configured correctly.

---

## 6. Settings & Profile

Navigate to `/dashboard/settings`.

### Profile

- Update display name, email, and avatar.

### Password

- Change your password (requires current password).

### Two-Factor Authentication (2FA)

1. Click **Enable 2FA**.
2. Scan the QR code with **Google Authenticator** or **Authy**.
3. Enter the 6-digit code to verify.
4. **Save your 8 recovery codes** in a safe place — they are shown only once.

To disable 2FA, enter your current TOTP code or a recovery code.

### Active Sessions

- View all logged-in devices (IP, location, browser, OS).
- Click **Revoke** to terminate a specific session.
- Click **Revoke All Other Sessions** to sign out all other devices.

---

## 7. API Usage

The REST API is available at `VITE_API_URL/api/v1`.

### Authentication

All protected endpoints require a Bearer token:

```http
Authorization: Bearer <your-sanctum-token>
Accept: application/json
```

Obtain a token by calling:

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

### Common Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/register` | Register a new account |
| `POST` | `/api/v1/auth/login` | Login and receive token |
| `POST` | `/api/v1/auth/logout` | Revoke current token |
| `GET` | `/api/v1/user` | Get authenticated user |
| `GET` | `/api/v1/projects` | List projects |
| `POST` | `/api/v1/contact` | Submit a contact message |

For full API documentation, see [docs/API.md](API.md).

---

*See [docs/installation.md](installation.md) for setup and [docs/development.md](DEVELOPMENT.md) for contributing.*
