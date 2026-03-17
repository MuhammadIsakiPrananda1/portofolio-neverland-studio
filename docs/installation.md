# Installation Guide

> Full setup instructions for running Neverland Studio locally or deploying to a VPS.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Local Development Setup](#2-local-development-setup)
3. [Environment Variables](#3-environment-variables)
4. [VPS / Production Deployment](#4-vps--production-deployment)
5. [Nginx Configuration](#5-nginx-configuration)
6. [WebSocket (Laravel Reverb)](#6-websocket-laravel-reverb)
7. [SSL with Certbot](#7-ssl-with-certbot)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Prerequisites

| Tool | Minimum Version | Notes |
|------|----------------|-------|
| Node.js | 20 LTS | Use `nvm` for version management |
| npm | 10+ | Comes with Node.js |
| PHP | 8.2+ | Extensions: `mbstring pdo pdo_mysql bcmath xml curl zip` |
| Composer | 2.x | PHP dependency manager |
| MySQL / MariaDB | 8.0 / 10.6+ | Database |
| Git | 2.x | Version control |

---

## 2. Local Development Setup

### Clone the repository

```bash
git clone https://github.com/MuhammadIsakiPrananda1/portofolio-neverland-studio.git
cd portofolio-neverland-studio
```

### Frontend setup

```bash
# Install Node dependencies
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env — at minimum set VITE_API_URL=http://localhost:8001

# Start the Vite dev server (http://localhost:5173)
npm run dev
```

### Backend setup

```bash
cd backend

# Install PHP dependencies
composer install

# Copy and configure environment
cp .env.example .env
# Edit .env — set DB_DATABASE, DB_USERNAME, DB_PASSWORD, APP_KEY

# Generate application key
php artisan key:generate

# Run database migrations (add --seed for sample data)
php artisan migrate --seed

# Start the development server (http://localhost:8001)
php artisan serve --port=8001
```

### (Optional) Real-time events

```bash
# Start Laravel Reverb WebSocket server
php artisan reverb:start
```

---

## 3. Environment Variables

### Frontend (`.env`)

| Variable | Example | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8001` | Backend API base URL |
| `VITE_API_VERSION` | `/api/v1` | API version prefix |
| `VITE_APP_NAME` | `Neverland Studio` | Application display name |
| `VITE_APP_URL` | `http://localhost:5173` | Frontend URL |
| `VITE_PUSHER_APP_KEY` | `your-key` | Pusher/Reverb app key |
| `VITE_PUSHER_HOST` | `localhost` | WebSocket host |
| `VITE_PUSHER_PORT` | `6001` | WebSocket port |

See `.env.example` for the full list.

### Backend (`backend/.env`)

| Variable | Example | Description |
|----------|---------|-------------|
| `APP_KEY` | (generated) | Laravel encryption key |
| `APP_URL` | `http://localhost:8001` | Backend URL |
| `DB_HOST` | `127.0.0.1` | Database host |
| `DB_DATABASE` | `neverland_portfolio` | Database name |
| `DB_USERNAME` | `neverland` | Database user |
| `DB_PASSWORD` | `secret` | Database password |
| `SANCTUM_STATEFUL_DOMAINS` | `localhost:5173` | Allowed SPA domains |

See `backend/.env.example` for the full list.

---

## 4. VPS / Production Deployment

### Install system packages

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx php8.2-fpm php8.2-mbstring php8.2-pdo \
  php8.2-mysql php8.2-bcmath php8.2-xml php8.2-curl php8.2-zip \
  mysql-server nodejs npm git unzip curl
```

### Install Composer

```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### Clone and build

```bash
# Clone
git clone https://github.com/MuhammadIsakiPrananda1/portofolio-neverland-studio.git /var/www/neverland
cd /var/www/neverland

# Build frontend
npm ci
npm run build          # outputs to dist/

# Install and configure backend
cd backend
composer install --no-dev --optimize-autoloader
cp .env.example .env
# Edit .env for production values
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
sudo chown -R www-data:www-data /var/www/neverland/backend/storage
sudo chmod -R 775 /var/www/neverland/backend/storage
```

---

## 5. Nginx Configuration

### Frontend (React SPA)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/neverland/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|woff2|png|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Backend API

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/neverland/backend/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

---

## 6. WebSocket (Laravel Reverb)

Run Reverb as a background service using **Supervisor**:

```bash
sudo apt install -y supervisor
```

Create `/etc/supervisor/conf.d/reverb.conf`:

```ini
[program:reverb]
command=php /var/www/neverland/backend/artisan reverb:start --host=0.0.0.0 --port=6001
autostart=true
autorestart=true
user=www-data
stderr_logfile=/var/log/supervisor/reverb.err.log
stdout_logfile=/var/log/supervisor/reverb.out.log
```

```bash
sudo supervisorctl reread && sudo supervisorctl update
sudo supervisorctl start reverb
```

---

## 7. SSL with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
# Auto-renewal is set up automatically via systemd timer
```

---

## 8. Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page / 404 on refresh | Check Nginx `try_files` for the SPA config |
| API calls returning HTML | Ensure `Accept: application/json` header; check `VITE_API_URL` |
| 500 on Laravel | Run `php artisan config:clear` and check `storage/logs/laravel.log` |
| WebSocket not connecting | Confirm Reverb is running; check `VITE_PUSHER_*` env vars |
| Permissions error | `sudo chown -R www-data:www-data backend/storage` |
| Missing PHP extension | `sudo apt install php8.2-<extension>` |

---

*See [docs/development.md](development.md) for local debugging tips and [docs/architecture.md](ARCHITECTURE.md) for system design details.*
