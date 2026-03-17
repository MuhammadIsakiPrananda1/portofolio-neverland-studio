# 🔐 Authentication System - Dokumentasi Lengkap

## Status Sistem Login

✅ **Email/Password Login** - Berfungsi sempurna
✅ **Google OAuth** - Dikonfigurasi dan aktif  
✅ **GitHub OAuth** - Dikonfigurasi dan aktif
✅ **2FA (TOTP)** - Tersedia
✅ **Rate Limiting** - 5 attempts per 15 minutes
✅ **Session Management** - Multi-device support

---

## 🚀 Cara Login

### 1. **Email & Password** (Tradisional)
**Endpoint:**
```bash
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://..."
  },
  "token": "base64_encoded_token",
  "message": "Login successful"
}
```

**Response (2FA Required):**
```json
{
  "two_factor_required": true,
  "two_factor_token": "temp_token_xxxxx",
  "message": "Masukkan kode 2FA dari aplikasi authenticator kamu."
}
```

**Error Responses:**
```json
{
  "errors": {
    "email": ["Email atau password salah."]
  }
}
```

### 2. **Google OAuth**

**Flow:**
1. User klik tombol "Login with Google"
2. Redirect ke: `https://your-api.com/api/v1/auth/google`
3. Google OAuth Provider menampilkan login screen
4. Setelah approval, redirect ke: `/auth/callback?token=xxx&provider=google`
5. Frontend menyimpan token dan login user

**Kondisi:**
- ✅ Google Client ID: `739120812976-...`
- ✅ Google Client Secret: Ter-setup
- ✅ Redirect URI: `https://portofolio.neverlandstudio.my.id/api/v1/auth/google/callback`

**Test Link:**
```
https://portofolio.neverlandstudio.my.id/api/v1/auth/google
```

### 3. **GitHub OAuth**

**Flow:**
1. User klik tombol "Login with GitHub"
2. Redirect ke: `https://your-api.com/api/v1/auth/github`
3. GitHub OAuth Provider menampilkan login screen
4. Setelah approval, redirect ke: `/auth/callback?token=xxx&provider=github`
5. Frontend menyimpan token dan login user

**Kondisi:**
- ✅ GitHub Client ID: `Ov23liJT4pOph289ak4h`
- ✅ GitHub Client Secret: Ter-setup
- ✅ Redirect URI: `https://portofolio.neverlandstudio.my.id/api/v1/auth/github/callback`

**Test Link:**
```
https://portofolio.neverlandstudio.my.id/api/v1/auth/github
```

**Note:** Pastikan email Anda public di GitHub settings!

---

## 📱 Two-Factor Authentication (2FA)

### Setup 2FA
```bash
GET /v1/auth/2fa/setup
Authorization: Bearer {token}
```

**Response:**
```json
{
  "secret": "JBSWY3DPEBLW64TMMQ",
  "qr_code_url": "https://...",
  "message": "Scan QR code dengan Google Authenticator atau Authy"
}
```

### Confirm 2FA
```bash
POST /v1/auth/2fa/confirm
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "123456"
}
```

### Disable 2FA
```bash
POST /v1/auth/2fa/disable
Authorization: Bearer {token}
Content-Type: application/json

{
  "password": "your_password"
}
```

### Verify 2FA During Login
```bash
POST /v1/auth/2fa/verify-login
Content-Type: application/json

{
  "two_factor_token": "temp_token_xxxxx",
  "code": "123456"
}
```

---

## 🔄 Registrasi User Baru

```bash
POST /v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```

**Response:**
```json
{
  "user": {
    "id": 2,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "base64_encoded_token",
  "message": "Registration successful"
}
```

---

## 🔑 Profile & Settings

### Get Current User
```bash
GET /v1/auth/user
Authorization: Bearer {token}
```

### Update Profile
```bash
PUT /v1/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Name",
  "avatar": "https://..."
}
```

### Update Password
```bash
PUT /v1/auth/password
Authorization: Bearer {token}
Content-Type: application/json

{
  "current_password": "old_password",
  "password": "new_password",
  "password_confirmation": "new_password"
}
```

### Logout
```bash
POST /v1/auth/logout
Authorization: Bearer {token}
```

---

## 📋 Session Management

### List All Active Sessions
```bash
GET /v1/auth/sessions
Authorization: Bearer {token}
```

**Response:**
```json
{
  "sessions": [
    {
      "id": 1,
      "ip_address": "192.168.1.1",
      "user_agent": "Mozilla/5.0...",
      "created_at": "2026-03-17T20:56:00Z",
      "last_activity": "2026-03-17T20:56:00Z"
    },
    ...
  ]
}
```

### Revoke Single Session
```bash
DELETE /v1/auth/sessions/{session_id}
Authorization: Bearer {token}
```

### Revoke All Sessions
```bash
DELETE /v1/auth/sessions
Authorization: Bearer {token}
```

---

## 🛡️ Security Features

### Rate Limiting
- **Login Attempts**: 5 attempts per 15 minutes
- **Reset time**: Automatic setelah cooldown

### Password Security
- Minimum 8 characters
- Must contain: uppercase, lowercase, numbers, special chars
- Hashed menggunakan bcrypt

### Token Management
- Tokens di-encode dalam Base64 untuk bypass WAF
- Multi-device support (tokens tidak di-revoke saat login baru)
- Auto-expire setelah 30 hari

### Audit Trail
- Setiap login dicatat dengan IP dan User-Agent
- Stored di `personal_access_tokens` table

---

## 🐛 Troubleshooting

### "Google OAuth belum dikonfigurasi"
**Solusi:**
1. Pastikan `.env` memiliki:
   ```
   GOOGLE_CLIENT_ID=739120812976-...
   GOOGLE_CLIENT_SECRET=GOCSPX-...
   ```
2. Clear Laravel caches:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

### "GitHub: Tidak dapat mengambil email"
**Solusi:**
1. Buka https://github.com/settings/emails
2. Pastikan email Anda di-set sebagai public (umum)
3. Coba login lagi

### Token "Invalid" atau "Expired"
**Solusi:**
1. Pastikan token di-encode dengan base64
2. Cek Authorization header format: `Bearer {token}`
3. Jika masih error, lakukan logout dan login ulang

### Rate Limited - "Terlalu banyak percobaan"
**Solusi:**
1. Tunggu cooldown time (ditampilkan di error message)
2. Atau reset rate limit cache:
   ```bash
   php artisan cache:clear
   ```

---

## 📚 Environment Variables

**File:** `/backend/.env`

```env
# OAuth — Google
GOOGLE_CLIENT_ID=739120812976-6ik83bj6brc095kvp9ll5phja468r1un.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-saaQEUS570llsQhUDVht9U2dw4

# OAuth — GitHub  
GITHUB_CLIENT_ID=Ov23liJT4pOph289ak4h
GITHUB_CLIENT_SECRET=1e330b1b1ef9fdd6d157c69afbcd0588df01da77

# Frontend
FRONTEND_URL=https://portofolio.neverlandstudio.my.id
APP_URL=https://portofolio.neverlandstudio.my.id
```

---

## 🧪 Testing di Development

```bash
# 1. Test email/password login
curl -X POST http://localhost:8001/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# 2. Test Google OAuth redirect
curl -I http://localhost:8001/v1/auth/google

# 3. Test GitHub OAuth redirect
curl -I http://localhost:8001/v1/auth/github

# 4. Test get user (with token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8001/v1/auth/user
```

---

## ✅ Checklist Verifikasi

- [x] Google OAuth credentials ter-load
- [x] GitHub OAuth credentials ter-load  
- [x] Email/password login berfungsi
- [x] Rate limiting aktif
- [x] 2FA tersedia
- [x] Session management tersedia
- [x] Token encoding/decoding bekerja
- [x] Error messages user-friendly

---

**Status**: ✅ Production Ready  
**Last Updated**: March 17, 2026  
**Maintainer**: DevOps Team
