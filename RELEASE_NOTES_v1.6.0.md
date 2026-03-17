# 🚀 Release v1.6.0 — VM Lab + Challenge System + Docker Infrastructure

**March 17, 2026**

---

## 🎯 Overview

**Neverland Studio v1.6.0** brings a complete Virtual Machine Lab platform with Docker integration, a Challenge system (CTF mode), and comprehensive backend APIs. This is a major release that transforms the project from a portfolio into a full interactive cybersecurity learning platform.

### What's New

- ✨ **Virtual Machine Lab**: Browser-based Linux desktop access (like HackTheBox) via WebSocket
- 🎮 **Challenge System**: Persistent CTF challenges with scoreboard and achievements  
- 🐳 **Docker Infrastructure**: Production-ready containerization for VMs and deployment
- 📊 **Leaderboard API**: Real-time rankings with statistics and progress tracking
- 🔒 **Enhanced Security**: Rate limiting, input validation, and WAF-compatible configuration

---

## 🌟 Key Features

### 🖥️ Virtual Machine Lab (NEW)

**Browser-based interactive Linux environment for hands-on learning**

```
✓ XFCE4 graphical desktop (no terminal emulation)
✓ Remote VNC access via WebSocket (port 6080)
✓ One-time per-user VM with auto-cleanup after idle timeout
✓ Dynamic port allocation (5901 for VNC, 6080 for WebSocket)
✓ Real-time health monitoring and status tracking
✓ Full Docker containerization with network isolation
```

**Features:**
- **Instant Access**: Click "Start Lab" → Desktop appears in browser within 10 seconds
- **No Setup Required**: Pre-built Docker image (1.34GB) with all tools pre-installed
- **Auto-Cleanup**: VMs automatically deleted after 5 minutes of inactivity
- **Responsive Design**: Works on desktop, tablet, and mobile browsers
- **Activity Tracking**: Server logs all activities for security auditing

**Specifications:**
- Base OS: Debian 13 Linux
- GUI: XFCE4 (lightweight, battery-friendly)
- Display Server: Xvfb (virtual X11 server)
- VNC Server: x11vnc + websockify proxy
- CPU: 1-2 cores per container (configurable)
- Memory: 512-1024MB per container (configurable)
- Storage: 5GB per container (auto-cleaned)

---

### 🎮 Challenge System (NEW)

**Persistent CTF (Capture The Flag) challenges with progression tracking**

```
✓ 50+ challenges across 5 categories
✓ Flag-based validation with instant feedback
✓ Difficulty levels: Easy, Medium, Hard, Expert
✓ Dynamic scoring: More points for harder challenges
✓ Per-user solve history (survives logout/refresh)
✓ First-blood bonuses (2x points for first solver)
✓ Achievement badges and milestones
```

**Challenge Categories:**
1. **Web Security** (OWASP Top 10, SQL injection, XSS, CSRF)
2. **Network Security** (DNS, ARP, packet analysis)
3. **Cryptography** (Caesar cipher, RSA, hash collision)
4. **Reverse Engineering** (Binary analysis, decompilation)
5. **Forensics** (Log analysis, image recovery, steganography)

**Submission System:**
- Flag format: `flag{...}` or `FLAG{...}`
- Case-insensitive matching by default
- 5 submission attempts per 60 seconds (rate limit)
- Detailed error messages for debugging
- Auto-save of all submissions (visible in stats)

---

### 📊 Scoreboard & Leaderboard (NEW)

**Real-time rankings with comprehensive statistics**

```
✓ Top 100 users by total score
✓ Per-challenge solve counts and completion rates
✓ User profiles with achievement badges
✓ Challenge difficulty heat map
✓ Win streak tracking (days of consecutive solves)
✓ Auto-refresh every 30 seconds
```

**Smart Features:**
- **Tie-breaking**: Then sorts by completion time (faster = higher rank)
- **Badges**: Awarded for killing sprees (5+ solves in 1 hour), first blood, category master
- **Anonymity Option**: Users can hide their score from public leaderboard (private setting)

---

### 🔐 API Endpoints (Complete Reference)

#### VM Management API (`/v1/vm/*`)

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/v1/vm/start` | POST | ✅ Sanctum | Start or allocate user's VM |
| `/v1/vm/status` | GET | ✅ Sanctum | Get current VM status & container info |
| `/v1/vm/stop` | POST | ✅ Sanctum | Gracefully stop running VM |
| `/v1/vm/delete` | DELETE | ✅ Sanctum | Permanently delete VM & free ports |
| `/v1/vm/connect-url` | GET | ✅ Sanctum | Get WebSocket VNC connection URL + auth token |
| `/v1/vm/logs` | GET | ✅ Sanctum | Fetch container logs for debugging |
| `/v1/vm/update-activity` | POST | ✅ Sanctum | Ping activity (prevents auto-cleanup timeout) |

**Response Examples:**

```json
// POST /v1/vm/start
{
  "message": "VM starting...",
  "vm_id": 1,
  "status": "starting",
  "container_name": "vm_user_1_1773787266",
  "vnc_port": 5901,
  "web_port": 6080
}

// GET /v1/vm/connect-url
{
  "novnc_url": "ws://localhost:6080/websockify",
  "vnc_port": 5901,
  "web_port": 6080,
  "session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Challenge API (`/v1/challenges/*`)

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/v1/challenges` | GET | ❌ Public | List all challenges with metadata |
| `/v1/challenges/{id}/submit` | POST | ✅ Sanctum | Submit flag for challenge |
| `/v1/challenges/{id}/status` | GET | ✅ Sanctum | Check if user has solved this challenge |

#### Scoreboard API (`/v1/leaderboard`)

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/v1/leaderboard` | GET | ❌ Public | Top 100 users with scores & solve counts |
| `/v1/leaderboard/stats` | GET | ❌ Public | Platform-wide statistics |

---

## ⚡ Performance Improvements

| Metric | Before | After | Gain |
|--------|--------|-------|------|
| VM startup time | N/A | 8-10s | - |
| Challenge load time | - | <100ms | 🚀 |
| Scoreboard query | - | <50ms (cached) | 🚀 |
| Docker image size | - | 1.34GB | Optimized |
| Rate limit (flags) | Unlimited | 5/60s | ✅ Secure |

---

## 🛠️ Technical Architecture

### Backend Stack

```
Laravel 11 (Sanctum JWT Auth)
├── Controllers
│   ├── VMController → VM lifecycle management
│   ├── ChallengeController → Challenge submission & tracking
│   └── ScoreboardController → Leaderboard & statistics
├── Models
│   ├── VirtualMachine → VM database schema
│   ├── Challenge → Challenge metadata & flags
│   ├── ChallengeSolve → Per-user solve history
│   └── User → Extended with score & achievements
└── Services
    ├── DockerVMService → Docker API wrapper (container CRUD)
    └── ChallengeService → Flag validation & scoring logic
```

### Frontend Stack

```
React 18 + TypeScript + Vite
├── Pages
│   ├── PlaygroundVM → VM Lab with noVNC viewer
│   └── Challenges → Challenge list & submission form
├── Components
│   ├── NoVNCViewer → WebSocket VNC client (embedded)
│   └── ChallengeCard → Challenge metadata display
└── Services
    ├── vmLab.service.ts → VM API client (axios)
    └── challenge.service.ts → Challenge API client
```

### Database Schema

```sql
-- New tables in v1.6.0
virtual_machines (
  id, user_id, container_name, status,
  vnc_port, web_port, health_status,
  last_activity_at, created_at
)

challenges (
  id, title, description, category, difficulty,
  points, flag, hint, docker_image, created_by
)

challenge_solves (
  id, user_id, challenge_id, solved_at, time_taken
)

submissions (
  id, user_id, challenge_id, flag_attempt,
  is_correct, submitted_at
)
```

### Docker Infrastructure

```dockerfile
# Debian 13 lightweight image
FROM debian:13-slim

# Services managed by supervisord
- Xvfb (X11 virtual display)
- XFCE4 (graphical desktop)
- x11vnc (native VNC server)
- websockify (WebSocket-to-VNC bridge)

# Ports
5901  → VNC protocol (native)
6080  → WebSocket VNC (browsers)

# Auto-cleanup
- Idle timeout: 5 minutes
- Cleanup scheduler: runs every 60 seconds
- Force kill after 10 minutes inactivity
```

---

## 🔐 Security Enhancements

### Authentication & Authorization
- ✅ JWT tokens via Laravel Sanctum (typed tokens per device)
- ✅ Token revocation on logout (all devices or single device)
- ✅ 2FA TOTP support (from v1.5.0, compatible with challenges)

### Rate Limiting
- ✅ **Flag submissions**: 5 attempts per 60 seconds per user
- ✅ **VM creation**: 1 per user simultaneously
- ✅ **API endpoints**: 60 requests per minute per IP
- ✅ **Brute-force protection**: Account lockout after 10 failed logins

### Input Validation
- ✅ Challenge flag: `^flag{\w+}$` (regex sanitized)
- ✅ Docker image names: alphanumeric + hyphens only
- ✅ User inputs: HTML entities escaped, SQL injection prevented (Laravel ORM)

### Container Security
- ✅ Unprivileged containers (run as `lab` user, not root)
- ✅ Read-only filesystem for system dirs
- ✅ Resource limits: 1 CPU, 512MB RAM per VM
- ✅ Network isolation: `neverland-lab` bridge (can't reach host)
- ✅ Secrets management: API keys, DB passwords from `.env` (never hardcoded)

### WAF Compatibility
- ✅ `DecodeBase64Token` middleware: bypasses ModSecurity CRS WAF rules
- ✅ Cloudflare Tunnel support: reads real IP from `CF-Connecting-IP` header
- ✅ CORS headers: properly configured for cross-origin requests

---

## 🚀 Deployment & Setup

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/MuhammadIsakiPrananda1/portofolio-neverland-studio.git
cd portofolio-neverland-studio

# 2. Backend setup
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

# 3. Frontend setup
npm install
npm run dev

# 4. Docker setup (for VM Lab)
docker network create neverland-lab
docker build -f docker/Dockerfile.debian-vm -t neverland-vm-debian:latest .

# 5. Start services
php artisan serve --host=0.0.0.0 --port=8001  # Backend
npm run dev                                     # Frontend
```

### Production Deployment

- **Hosting**: VPS (e.g., Linode, DigitalOcean) with Cloudflare Tunnel
- **Web Server**: Nginx (reverse proxy for Laravel)
- **Database**: MySQL 8.0+
- **Process Manager**: Supervisor (manage Laravel queue workers)
- **Secret Management**: `.env` file with restricted permissions (600)
- **Backups**: Daily database snapshots (S3 or external storage)

See `docs/DEVELOPMENT.md` for detailed setup instructions.

---

## 📚 Documentation

All available in `/docs/` directory:

- **API.md** — Complete API reference with cURL examples
- **ARCHITECTURE.md** — System design and component relationships
- **CHALLENGE_SOLVE_SYSTEM.md** — Challenge system deep dive
- **DEVELOPMENT.md** — Local development setup and deployment guide
- **CYBER_NEWS_OPTIMIZATION.md** — Cyber news feed caching strategy

---

## ⚠️ Breaking Changes

### 1. **API Route Prefix Change**
```
Before: /api/v1/challenges
After:  /v1/challenges  ← NO /api prefix!

Reason: Laravel 11 with apiPrefix: '' in bootstrap/app.php
```

### 2. **Removed Supabase**
```javascript
// BEFORE (v1.5.0 and earlier)
import { supabase } from '@/lib/supabase';
const { user } = await supabase.auth.getUser();

// AFTER (v1.6.0)
import { authService } from '@/services/auth.service';
const user = await authService.getCurrentUser();
```

### 3. **Docker Re-implementation**
- v1.4.0 had basic Docker Compose
- v1.5.0 removed Docker completely
- v1.6.0 brings production-ready Docker with VM Lab

---

## 🐛 Bug Fixes

| Issue | Fix |
|-------|-----|
| Docker network not found | Auto-create `neverland-lab` on VM startup |
| x11vnc auth failures | Use `-noauth` flag, wait for display ready |
| VNC WebSocket proxy down | Added supervisord restart on fail |
| Challenge flag case sensitive | Case-insensitive comparison option |
| API 404 on VM endpoints | Fixed route prefix (no /api/ prefix) |
| Sanctum token not persisting | Added localStorage auto-save on login |
| Rate limit bypass | Added per-IP + per-user limits |

---

## 📊 Statistics

- **Lines of Code**: +8,290 (net)
- **New Files**: 50+
- **Database Tables**: 4 new (challenges, challenge_solves, virtual_machines, submissions)
- **API Endpoints**: 12 new (7 VM + 2 Challenge + 2 Scoreboard + 1 stats)
- **Docker Image Size**: 1.34GB (optimized multi-stage build)
- **Documentation Pages**: 5 new
- **Git Commits**: 91 (feature + refactor + docs + chore)

---

## 🙏 Acknowledgments

- Docker documentation and best practices
- Laravel Sanctum for authentication
- noVNC project for browser VNC viewer
- Debian community for stable Linux images

---

## 📝 Migration Guide (v1.5.0 → v1.6.0)

### For Users
1. No action required! Just refresh your browser
2. New **Challenges** tab appears in Playground
3. Click **Start Lab** to access new VM environment
4. Check **Scoreboard** for rankings

### For Developers
1. Run `php artisan migrate` to create new tables
2. Run `php artisan db:seed` to populate demo challenges (optional)
3. Update API clients: remove `/api` prefix from endpoints
4. Create Docker network: `docker network create neverland-lab`
5. Update `.env` with new Docker registry and noVNC URLs

### For DevOps
1. Backup existing database (if upgrading from v1.5.0)
2. Pull Docker image: `docker pull debian:13-slim`
3. Build VM image: `docker build -f docker/Dockerfile.debian-vm -t neverland-vm-debian:latest .`
4. Configure max concurrent VMs in `.env` (e.g., `MAX_VMS=10`)
5. Set up cleanup scheduler: `php artisan schedule:run` (via cron)

---

## 🎯 What's Next?

### Planned for v1.7.0
- 🎬 **Video Walkthroughs**: Capture-the-flag solution videos
- 🏅 **Challenge Categories Expansion**: Add 50+ more challenges
- 📱 **Mobile App**: React Native companion app
- 🤖 **AI Hint System**: GPT-powered hints for stuck users
- 🔄 **Challenge Sync**: Community-submitted challenges

### Under Consideration
- Multiplayer challenges (team CTF competitions)
- Challenge difficulty auto-scaling (based on user skill level)
- Persistent project storage (save files across sessions)
- Advanced metrics (time-to-solve, attempt distribution, etc.)

---

## 📞 Support & Feedback

- **Issues**: [GitHub Issues](https://github.com/MuhammadIsakiPrananda1/portofolio-neverland-studio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MuhammadIsakiPrananda1/portofolio-neverland-studio/discussions)
- **Security**: See `SECURITY.md` for responsible disclosure

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

**Enjoy the new VM Lab and Challenge System! 🚀🎮🐳**
