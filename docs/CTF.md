# CTF System - Dokumentasi & Akses

## 🎯 Cara Akses CTF

### 1. **Via Web URL (Playground)**
- Buka: `https://portofolio.neverlandstudio.my.id/playground`
- Scroll ke bagian **"CTF Challenges"**
- Local challenges (JavaScript-based)

### 2. **API Endpoints** (Production/Backend)

#### **Get All Challenges** (Public)
```bash
GET /v1/challenges
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "XSS Basics",
      "description": "Find and exploit a reflected XSS vulnerability",
      "category": "web",
      "difficulty": "Easy",
      "points": 100,
      "is_solved": false,
      "first_blood": {
        "user_id": null,
        "username": null,
        "solved_at": null
      }
    },
    ...
  ]
}
```

#### **Get Single Challenge**
```bash
GET /v1/challenges/{challenge_id}
```

#### **Submit Flag** (Authenticated)
```bash
POST /v1/challenges/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "challenge_id": 1,
  "flag": "flag{xss_is_dangerous}"
}
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "Flag correct! You earned 100 points",
  "points_awarded": 100,
  "total_score": 250,
  "is_first_blood": true,
  "first_blood_bonus": 10
}
```

#### **Get User's Solved Challenges** (Authenticated)
```bash
GET /v1/challenges/user/solved
Authorization: Bearer {token}
```

#### **Get User Progress** (Authenticated)
```bash
GET /v1/challenges/user/progress
Authorization: Bearer {token}
```

**Response:**
```json
{
  "total_challenges": 13,
  "solved_count": 5,
  "total_points": 450,
  "by_category": {
    "web": { "total": 5, "solved": 3, "points": 250 },
    "crypto": { "total": 4, "solved": 2, "points": 200 },
    "binary": { "total": 2, "solved": 0, "points": 0 },
    "forensics": { "total": 2, "solved": 0, "points": 0 }
  }
}
```

#### **Get Scoreboard** (Public)
```bash
GET /v1/scoreboard
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "rank": 1,
      "user_id": 5,
      "username": "admin",
      "score": 1250,
      "solved_count": 10
    },
    ...
  ],
  "total": 13,
  "per_page": 10,
  "current_page": 1
}
```

#### **Get Category Leaderboard**
```bash
GET /v1/scoreboard/category/web
```

#### **Get First Blood Leaderboard**
```bash
GET /v1/scoreboard/first-blood
```

#### **Get Challenge Statistics**
```bash
GET /v1/scoreboard/stats
```

## 📊 Database Structure

### Challenges Table
```
id | title | description | flag | category | difficulty | initial_points | minimum_points | decay | first_blood_user_id | first_blood_at | is_active | solve_count | hints | attachment_path
```

### Challenge Solves Table
```
id | user_id | challenge_id | points_awarded | solved_at
```

### Submissions Table (Audit Log)
```
id | user_id | challenge_id | submitted_flag | status | ip_address | user_agent | created_at
```

### Users Table (Updated)
```
... | score | (added integer column to track points)
```

## 🔒 Security Features

✅ **Rate Limiting**: Max 10 submissions/minute per user
✅ **Brute Force Protection**: 50 wrong attempts = 5 minute block
✅ **First Blood Tracking**: +10% bonus points for first solver
✅ **Dynamic Scoring**: Points decrease as more users solve (formula: max(minimum_points, initial_points - solve_count*decay))
✅ **Submission Audit Trail**: Every attempt logged with IP & User-Agent
✅ **Unique Solve Constraint**: User can solve challenge only once

## 🚀 Testing the API

```bash
# Get all challenges
curl http://portofolio.neverlandstudio.my.id/v1/challenges

# Get scoreboard
curl http://portofolio.neverlandstudio.my.id/v1/scoreboard

# Submit flag (requires auth token)
curl -X POST http://portofolio.neverlandstudio.my.id/v1/challenges/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"challenge_id": 1, "flag": "flag{xss_is_dangerous}"}'
```

## 📈 Sample Challenges Seeded

1. **XSS Basics** (Easy, 100pts)
2. **SQL Injection in Login** (Easy, 150pts)
3. **Directory Traversal** (Medium, 200pts)
4. **Command Injection RCE** (Hard, 300pts)
5. **Authentication Bypass** (Hard, 350pts)
6. **Caesar Cipher Decryption** (Easy, 75pts)
7. **Base64 Decoding** (Easy, 100pts)
8. **MD5 Hash Cracking** (Medium, 150pts)
9. **RSA Encryption Weakness** (Hard, 250pts)
10. **Buffer Overflow Basic** (Hard, 300pts)
11. **Format String Vulnerability** (Hard, 350pts)
12. **Hidden File Recovery** (Medium, 200pts)
13. **PCAP Analysis** (Medium, 250pts)

## 🔧 Adding More Challenges

Edit `/backend/database/seeders/ChallengeSeeder.php` and run:
```bash
php artisan db:seed --class=ChallengeSeeder
```

## ⚙️ Configuration

Edit `/backend/.env`:
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

---

**Status**: ✅ Production Ready
**Last Updated**: March 17, 2026
