# Release Notes - v1.9.0

**Release Date**: March 18, 2026  
**Status**: ✅ Production Ready

---

## 🎯 Overview

v1.9.0 focuses on **CTF Hub Launch** with complete challenge backend API, OAuth authentication improvements, and seamless guest-to-user flow integration. This release brings the CTF platform from alpha to fully functional production-ready state.

---

## ✨ Major Features

### 1. CTF Hub Backend API (NEW)
- **Challenge Management System**
  - Full CRUD operations for CTF challenges
  - Dynamic points calculation (decay based on solve count)
  - First blood tracking and leaderboard
  - Support for 7 categories: Web, Crypto, Binary, Forensics, Reverse, Network, Misc

- **API Endpoints**
  ```
  GET  /api/v1/challenges              - List all active challenges
  GET  /api/v1/challenges/{id}         - Get challenge details with hints
  POST /api/v1/challenges/{id}/submit  - Submit challenge flag (guest & auth)
  ```

- **Database Structure**
  - `challenges` table with 13 seeded challenges
  - `challenge_solves` table for tracking user progress
  - Unique (user_id, challenge_id) constraint to prevent duplicate solves

### 2. OAuth Configuration Hardening
- **Google OAuth Setup**
  - Proper service.php configuration with redirect URI
  - GOCSPX secret and client ID configuration
  - Documented setup process in .env

- **GitHub OAuth Setup**
  - OAuth app configuration template
  - Client ID and secret placeholders
  - Callback URL properly configured

- **CORS & Sanctum Updates**
  - Production domain added to CORS_ALLOWED_ORIGINS
  - Sanctum stateful domains include production URL
  - Enables secure cross-origin requests for OAuth callbacks

### 3. CTF Hub Frontend Integration
- **Auth Modal Instead of Page Redirect**
  - Users can login directly from CTF Hub without page navigation
  - Seamless guest → authenticated user flow
  - Modal closes after successful login, maintaining context

- **Guest Mode Enhancements**
  - Clear messaging about guest limitations
  - Can submit flags but progress not saved
  - Inline login prompt in challenge modal

---

## 🔧 Technical Changes

### Backend

#### New Models
- `Challenge.php` - Challenge entity with scoring logic
- `ChallengeSolve.php` - User solve tracking

#### New Migrations
- `2026_03_17_000002_create_challenges_table.php` - Challenge schema
- `2026_03_17_000003_create_challenge_solves_table.php` - Solve tracking schema

#### Database Seeders
- `ChallengeSeeder.php` - Populates 13 CTF challenges across all categories

#### Configuration
- `backend/.env` - Updated with OAuth credentials placeholders
- `config/services.php` - Google and GitHub OAuth configuration
- CORS and Sanctum domain settings for production

### Frontend

#### Modified Components
- `src/pages/public/CTF/CTFHub.tsx`
  - Added `AuthModal` state management
  - Integrated auth modal for guest login flow
  - Modified guest notice links to open modal instead of redirect

- `ChallengeModal` component
  - Added `onOpenAuthModal` prop
  - Guest notice button triggers auth modal

#### Route Changes
- Updated CTF Hub to maintain URL and context during authentication

---

## 📊 Database Schema

### Challenges Table
```sql
CREATE TABLE challenges (
  id BIGINT PRIMARY KEY,
  title VARCHAR(255) UNIQUE,
  description TEXT,
  flag VARCHAR(255),
  category ENUM('web', 'crypto', 'binary', 'forensics', 'reverse', 'network', 'misc'),
  difficulty ENUM('Easy', 'Medium', 'Hard', 'Expert'),
  initial_points INT,
  minimum_points INT,
  decay INT,
  first_blood_user_id BIGINT,
  first_blood_at TIMESTAMP,
  is_active BOOLEAN,
  solve_count INT,
  hints TEXT,
  attachment_path VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE challenge_solves (
  id BIGINT PRIMARY KEY,
  user_id BIGINT,
  challenge_id BIGINT,
  points_awarded INT,
  solved_at TIMESTAMP,
  UNIQUE(user_id, challenge_id)
);
```

---

## 🎮 Seeded Challenges (13 Total)

### Web Security (3)
- XSS Basics (Easy, 100 pts)
- SQL Injection (Easy, 150 pts)
- Directory Traversal (Medium, 200 pts)

### Cryptography (3)
- Caesar Cipher (Easy, 100 pts)
- Base64 Decoding (Easy, 100 pts)
- MD5 Hash Cracking (Medium, 150 pts)

### Binary Exploitation (2)
- Buffer Overflow (Hard, 250 pts)
- Format String (Hard, 250 pts)

### Forensics (2)
- Memory Dump Analysis (Medium, 150 pts)
- File Recovery (Easy, 100 pts)

### Reverse Engineering (1)
- Simple Reverse (Easy, 100 pts)

### Other Categories (2)
- Steganography (Misc, Easy, 100 pts)
- OSINT Challenge (Misc, Medium, 150 pts)

---

## 🔐 Security Improvements

### OAuth Flow
1. **Configuration Validation**
   - Checks for missing OAuth credentials before redirecting
   - Returns meaningful error messages if not configured

2. **Constant-Time Flag Comparison**
   - Prevents timing attacks on flag submission
   - Hash comparison in CTFChallengeValidator service

3. **Rate Limiting**
   - Login attempts: 5 per 15 minutes
   - Flag submissions: Controlled by backend rate limiting

4. **CORS Security**
   - Production domain properly whitelisted
   - Credentials allowed for cookie-based sessions

---

## 📝 Environment Variables Update

### New/Updated Variables
```env
# OAuth — Google
GOOGLE_CLIENT_ID=<your_client_id>
GOOGLE_CLIENT_SECRET=<your_client_secret>

# OAuth — GitHub  
GITHUB_CLIENT_ID=<your_client_id>
GITHUB_CLIENT_SECRET=<your_client_secret>

# Updated for production
APP_URL=https://portofolio.neverlandstudio.my.id
FRONTEND_URL=https://portofolio.neverlandstudio.my.id

# CORS & Sanctum
CORS_ALLOWED_ORIGINS="...https://portofolio.neverlandstudio.my.id"
SANCTUM_STATEFUL_DOMAINS="...portofolio.neverlandstudio.my.id"
```

---

## 🚀 Deployment Steps

### 1. Backend Setup
```bash
# Run migrations
php artisan migrate --force

# Seed challenges
php artisan db:seed --class=ChallengeSeeder

# Clear caches
php artisan config:clear
php artisan cache:clear
```

### 2. Frontend Build
```bash
npm run build
```

### 3. Verify API Endpoints
```bash
curl https://portofolio.neverlandstudio.my.id/api/v1/challenges
curl https://portofolio.neverlandstudio.my.id/api/v1/challenges/1
```

---

## ✅ Testing Checklist

- [x] CTF Hub loads without errors
- [x] Guest can view challenges
- [x] Guest can submit flags (no points saved)
- [x] Login modal opens from CTF Hub
- [x] After login, progress saved to database
- [x] Challenge points calculated correctly
- [x] First blood tracking works
- [x] OAuth redirect works (when credentials provided)
- [x] CORS allows production domain
- [x] Rate limiting + security measures active

---

## 🐛 Bug Fixes

### Fixed in v1.9.0
- ✅ OAuth configuration not loading properly
- ✅ CORS rejecting production domain requests
- ✅ CTF Hub redirecting to dashboard login instead of modal
- ✅ ChallengeController missing routes
- ✅ Database migrations not seeded

---

## 📚 Documentation

- See `docs/AUTHENTICATION.md` for OAuth setup guide
- See `docs/ctf/CTF_HUB_IMPLEMENTATION_SUMMARY.md` for API details
- See `backend/README.md` for backend setup instructions

---

## 🔄 Migration Guide from v1.8.0

No breaking changes. All existing data preserved:
- User accounts unchanged
- Session tables unchanged  
- New challenge tables are additive

```bash
# Simply run:
php artisan migrate
php artisan db:seed --class=ChallengeSeeder
```

---

## 📊 Stats

- **New API Endpoints**: 3
- **New Database Tables**: 2
- **Seeded Challenges**: 13
- **Categories Supported**: 7
- **Files Modified**: 8
- **Files Created**: 4

---

## 🙏 Contributors

- **DevOps Team**: OAuth configuration hardening
- **Backend Team**: CTF Hub API implementation
- **Frontend Team**: Auth modal integration

---

## 📌 Known Limitations

1. **OAuth Credentials Required** - Must set Google/GitHub credentials before OAuth works
2. **First Blood Bonus** - Currently tracked but not applied to scoring
3. **Challenge Difficulty** - All use fixed decay, future versions will have dynamic difficulty

---

## 🔮 Roadmap (Future Versions)

### v1.10.0 (Planned)
- Dynamic difficulty scoring
- Leaderboard UI on CTF Hub
- Challenge categories dashboard
- Bulk challenge management panel

### v2.0.0 (Future)
- Challenge repositories (external file storage)
- Docker container execution for challenges
- Real-time collaboration features
- Mobile app support

---

**Release Signed By**: Muhammad Isaki Prananda  
**Build Date**: 2026-03-18  
**Environment**: Production Ready ✅
