<div align="center">

# 🚀 Installation Guide

**Detailed installation instructions for Neverland Studio. For a quick overview, see [README.md](README.md).**

</div>

---

## 💻 System Preparation

### 🪟 Windows

1. Install [Git for Windows](https://git-scm.com)
2. Install [Node.js LTS](https://nodejs.org)
3. Install [PHP 8.3+](https://windows.php.net/download/)
4. Install [MySQL/MariaDB](https://mariadb.org/download/)
5. *(Recommended)* Install [VS Code](https://code.visualstudio.com)

### 🍎 macOS

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git
brew install git

# Install Node.js
brew install node

# Install PHP and extensions
brew install php@8.3
brew install composer

# Install MySQL/MariaDB
brew install mysql
# or
brew install mariadb
```

### 🐧 Linux (Ubuntu / Debian)

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

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

# Install MySQL/MariaDB
sudo apt install -y mysql-server
# or
sudo apt install -y mariadb-server
```

---

## 🛠️ Installation Instructions

### Step 1 — Clone the Repository

```bash
git clone https://github.com/MuhammadIsakiPrananda1/portfolio-neverland-studio-v2.git
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
*Output is in the `dist/` directory.*

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

---

## 🚀 Deploy ke VPS / Server

### Step 1 — Persiapan Server

Pastikan server Ubuntu/Debian memiliki:
- **Nginx** (`sudo apt install nginx`)
- **PHP 8.2+ & PHP-FPM** (`sudo apt install php8.2-fpm php8.2-mbstring php8.2-xml php8.2-curl php8.2-mysql`)
- **Composer** (`curl -sS https://getcomposer.org/installer | php`)
- **Node.js 22+** (`curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash - && sudo apt install nodejs`)
- **MariaDB / MySQL** (`sudo apt install mariadb-server`)

### Step 2 — Clone & Build di Server

```bash
cd /var/www
git clone https://github.com/MuhammadIsakiPrananda1/portfolio-neverland-studio-v2.git portfolio-neverland-studio
cd portfolio-neverland-studio

# Build frontend
npm install
npm run build

# Setup backend
cd backend
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
```

### Step 3 — Konfigurasi Database

```bash
# Buat database
mysql -u root -p -e "CREATE DATABASE neverland_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Edit .env sesuai kredensial database
nano backend/.env
# Isi: DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD, APP_URL, FRONTEND_URL

# Jalankan migrasi
php artisan migrate --seed
php artisan optimize
```

### Step 4 — Permission Folder

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data /var/www/portfolio-neverland-studio
```

### Step 5 — Konfigurasi Nginx

```bash
sudo nano /etc/nginx/sites-available/neverland-frontend
```

```nginx
# Frontend
server {
    listen 80;
    server_name neverlandstudio.com www.neverlandstudio.com;
    root /var/www/portfolio-neverland-studio/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
sudo nano /etc/nginx/sites-available/neverland-backend
```

```nginx
# Backend API
server {
    listen 80;
    server_name api.neverlandstudio.com;
    root /var/www/portfolio-neverland-studio/backend/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

```bash
# Aktifkan konfigurasi
sudo ln -s /etc/nginx/sites-available/neverland-frontend /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/neverland-backend /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Step 6 — WebSocket Server (Reverb) dengan Supervisor

```bash
sudo apt install supervisor
sudo nano /etc/supervisor/conf.d/reverb.conf
```

```ini
[program:reverb]
process_name=%(program_name)s
command=php /var/www/portfolio-neverland-studio/backend/artisan reverb:start --host=0.0.0.0 --port=8080
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/supervisor/reverb.log
```

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start reverb
```

### Step 7 — SSL dengan Certbot (Opsional tapi Direkomendasikan)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d neverlandstudio.com -d www.neverlandstudio.com
sudo certbot --nginx -d api.neverlandstudio.com
```

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
Need help? Open a <a href="https://github.com/MuhammadIsakiPrananda1/portfolio-neverland-studio-v2/issues">GitHub issue</a> or email: <b>Arlianto032@gmail.com</b>
</div>
