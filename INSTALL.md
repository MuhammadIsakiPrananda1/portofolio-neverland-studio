<div align="center">

# 🚀 Installation Guide

**Detailed installation instructions for Neverland Studio. For a quick overview, see [README.md](README.md).**

</div>

---

## ⚡ Quick Start (Docker — 5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2.git
cd portofolio-neverland-studio

# 2. Create Docker network
docker network create app-network

# 3. Copy environment file
cp .env.example .env

# 4. Start all services
docker-compose up -d --build

# 5. Done!
# 🟢 Dev frontend:  http://localhost:5173
# 🔵 Prod frontend: http://localhost:3000
# 🔴 Backend API:   http://localhost:8001
# 🟠 phpMyAdmin:    http://localhost:8080
```

---

## 💻 System Preparation

### 🪟 Windows

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install [Git for Windows](https://git-scm.com)
3. Install [Node.js LTS](https://nodejs.org)
4. *(Recommended)* Install [VS Code](https://code.visualstudio.com)

### 🍎 macOS

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Docker Desktop
brew install --cask docker

# Install Git
brew install git

# Install Node.js
brew install node
```

### 🐧 Linux (Ubuntu / Debian)

<details>
<summary><b>Click to expand Linux Setup Steps</b></summary>

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# Install Docker Compose (plugin)
sudo apt install -y docker-compose-plugin

# Install Git
sudo apt install -y git

# Install Node.js 22.x
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install PHP 8.3+ and extensions
sudo apt install -y php php-cli php-mbstring php-xml php-curl php-pdo php-mysql

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

</details>

---

## 🛠️ Full Installation (Without Docker)

### Step 1 — Clone the Repository

```bash
git clone https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2.git
cd portofolio-neverland-studio
```

### Step 2 — Frontend Setup

```bash
# Install npm dependencies
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env: set VITE_API_URL to your backend URL

# Start development server
npm run dev
```

Frontend available at **http://localhost:5173**

### Step 3 — Backend Setup

```bash
cd backend

# Install PHP dependencies
composer install

# Copy and configure environment
cp .env.example .env
# Edit .env: set DB_*, APP_KEY, FRONTEND_URL, REVERB_* values

# Generate application key
php artisan key:generate

# Create the database
mysql -u root -p -e "CREATE DATABASE neverland_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run all migrations
php artisan migrate

# Seed with initial data (optional)
php artisan db:seed

# Start the API server
php artisan serve --host=0.0.0.0 --port=8001
```

Backend API available at **http://localhost:8001**

### Step 4 — Start WebSocket Server (Real-Time Features)

```bash
cd backend
php artisan reverb:start
```

---

## ⚙️ Post-Installation Setup

### 🔑 Default Admin Credentials

> ⚠️ **IMPORTANT: Change these immediately after your first login!**

```text
Email:    admin@neverlandstudio.com
Password: password
```

### ✅ Initial Configuration Checklist

1. **Change Admin Password**
   - Log in to the dashboard
   - Navigate to **Settings → Security**
   - Update your password

2. **Configure Email (for contact form)**
   - Edit `backend/.env` with your SMTP credentials:
     ```env
     MAIL_MAILER=smtp
     MAIL_HOST=smtp.yourprovider.com
     MAIL_PORT=587
     MAIL_USERNAME=your@email.com
     MAIL_PASSWORD=yourpassword
     MAIL_FROM_ADDRESS=noreply@neverlandstudio.my.id
     ```
   - Clear config cache: `php artisan config:clear`

3. **Enable Two-Factor Authentication (2FA)** *(Recommended)*
   - Navigate to **Settings → Security**
   - Scan the QR code with Google Authenticator
   - Save your backup codes securely

4. **Configure CORS** (if hosted on a custom domain)
   - Edit `backend/config/cors.php`
   - Add your production frontend domain to `allowed_origins`

---

## 📦 Building for Production

### 🎨 Frontend

```bash
# Type-check and build
npm run build

# Preview the build locally
npm run preview
```
*Output is in the `dist/` directory, served by Nginx in Docker.*

### 🐘 Backend

```bash
cd backend

# Cache config, routes, and views for production
php artisan optimize

# Or step by step:
composer dump-autoload -o
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 🐋 Docker Production Deployment

```bash
# Build and start production containers
docker-compose up -d --build

# Check all containers are running
docker-compose ps

# View logs
docker-compose logs -f
```

---

## 🚑 Troubleshooting

<details>
<summary><b>View Common Errors & Solutions</b></summary>

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux / macOS
lsof -i :5173
kill -9 <PID>
```

### Database Error
```bash
cd backend
php artisan config:clear
php artisan migrate:fresh --seed  # ⚠️ destroys existing data
```

### Node Modules Error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Composer Error
```bash
cd backend
composer clear-cache
rm -rf vendor
composer install --no-interaction
```

### Docker Build Issues
```bash
docker-compose down -v --rmi all
docker-compose build --no-cache
docker-compose up -d
```

### Real-Time Dashboard Not Updating
```bash
php artisan reverb:start
cat backend/.env | grep REVERB
cat .env | grep VITE_REVERB
```

</details>

---

## ⏭️ Next Steps

After a successful installation:
1. Read [README.md](README.md) for a full project overview
2. Explore the **API Reference** located in the `README.md`
3. Read [CONTRIBUTING.md](CONTRIBUTING.md) if you'd like to contribute

<div align="center">
<br/>
Need help? Open a <a href="https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2/issues">GitHub issue</a> or email: <b>Arlianto032@gmail.com</b>
</div>
