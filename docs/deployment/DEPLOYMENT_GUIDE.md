# 🚀 Deployment & Installation Guide
# Portfolio Neverland Studio - Production Setup

## =====================================================================
## QUICK START (5 MINUTES)
## =====================================================================

```bash
# 1. Clone repository
cd /var/www
git clone https://github.com/MuhammadIsakiPrananda1/portofolio-neverland-studio.git
cd portofolio-neverland-studio

# 2. Setup backend
cd backend
cp ../.env .env.production
composer install --no-dev
php artisan key:generate
php artisan migrate:fresh --seed

# 3. Setup frontend
cd ..
npm install
npm run build

# 4. Configure Apache
sudo cp apache2-modsecurity-exceptions.conf /etc/apache2/conf-available/
sudo a2enconf apache2-modsecurity-exceptions
sudo a2enmod rewrite ssl proxy proxy_http
sudo systemctl reload apache2

# 5. Verify
curl http://localhost:8001/api/health/ping
curl https://portofolio.neverlandstudio.my.id
```

---

## =====================================================================
## DETAILED INSTALLATION
## =====================================================================

### Prerequisites
- Ubuntu/Debian 20.04+
- Apache 2.4+
- PHP 8.2+
- MySQL 8.0+
- Node.js 18+

### 1. Environment Setup

```bash
# Install PHP extensions (if not already installed)
sudo apt-get install php-cli php-fpm php-curl php-mysql php-mbstring php-xml php-zip php-sqlite3

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Backend Setup (Laravel)

```bash
cd /var/www/portofolio-neverland-studio/backend

# Install dependencies
composer install --no-dev --optimize-autoloader

# Copy environment file
cp .env.example .env

# Edit .env with production values
nano .env
# Key settings to update:
# - DB_HOST=192.168.20.40
# - DB_USERNAME=neverland
# - DB_PASSWORD=cysec
# - APP_DEBUG=false
# - APP_ENV=production
# - SESSION_DRIVER=database
# - LOG_LEVEL=error

# Generate application key
php artisan key:generate

# Create database session table
php artisan session:table
php artisan migrate

# Create cache table (if using database cache)
php artisan cache:table
php artisan migrate

# Seed database with challenges
php artisan migrate:fresh --seed

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 3. Frontend Setup (React + Vite)

```bash
cd /var/www/portofolio-neverland-studio

# Install dependencies
npm install

# Build for production
npm run build

# Output: dist/ directory (ready for Apache)
```

### 4. Apache Virtual Host Configuration

```bash
# Create virtual host configuration
sudo nano /etc/apache2/sites-available/portofolio.neverlandstudio.my.id.conf
```

```apache
# File: /etc/apache2/sites-available/portofolio.neverlandstudio.my.id.conf

<VirtualHost *:80>
    ServerName portofolio.neverlandstudio.my.id
    ServerAlias www.portofolio.neverlandstudio.my.id
    
    RewriteEngine On
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName portofolio.neverlandstudio.my.id
    ServerAlias www.portofolio.neverlandstudio.my.id
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/neverlandstudio.crt
    SSLCertificateKeyFile /etc/ssl/private/neverlandstudio.key
    SSLCertificateChainFile /etc/ssl/certs/chain.crt
    
    SSLProtocol TLSv1.2 TLSv1.3
    SSLCipherSuite HIGH:!aNULL:!MD5
    SSLHonorCipherOrder on
    SSLCompression off
    
    # Add HSTS Header
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    
    # Frontend Root
    DocumentRoot /var/www/portofolio-neverland-studio/dist
    
    # Proxy API to Laravel backend (port 8001)
    ProxyPreserveHost On
    ProxyPass /api http://localhost:8001/api
    ProxyPassReverse /api http://localhost:8001/api
    
    # React SPA routing
    <Directory /var/www/portofolio-neverland-studio/dist>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
        
        # Cache busting for static assets
        <FilesMatch "\.(js|css|woff|woff2)$">
            Header set Cache-Control "public, max-age=31536000"
        </FilesMatch>
        
        # No cache for HTML
        <FilesMatch "\.html$">
            Header set Cache-Control "no-cache, no-store, must-revalidate"
        </FilesMatch>
    </Directory>
    
    # Logging
    LogLevel warn
    ErrorLog ${APACHE_LOG_DIR}/portofolio.neverlandstudio.error.log
    CustomLog ${APACHE_LOG_DIR}/portofolio.neverlandstudio.access.log combined
    
    # Security
    <Directory /var/www/portofolio-neverland-studio>
        Options -Indexes -FollowSymLinks
        AllowOverride None
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
```

### 5. Enable Apache Configuration

```bash
# Enable the virtual host
sudo a2ensite portofolio.neverlandstudio.my.id.conf

# Enable required modules
sudo a2enmod rewrite ssl proxy proxy_http headers env

# Enable ModSecurity exceptions
sudo a2enconf modsecurity-exceptions

# Test Apache configuration
sudo apache2ctl -t

# Reload Apache
sudo systemctl reload apache2
```

### 6. Laravel Development Server (for Testing)

```bash
cd /var/www/portofolio-neverland-studio/backend

# Start development server on port 8001
php artisan serve --host=0.0.0.0 --port=8001

# Or use with supervisor (for production)
sudo nano /etc/supervisor/conf.d/laravel.conf
```

```ini
# File: /etc/supervisor/conf.d/laravel.conf

[program:laravel-api]
process_name=%(program_name)s_%(process_num)02d
command=php artisan serve --host=0.0.0.0 --port=8001
autostart=true
autorestart=true
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/portofolio-neverland-studio/backend/storage/logs/supervisor.log
directory=/var/www/portofolio-neverland-studio/backend
```

```bash
# Reload supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-api
```

### 7. SSL Certificate Setup (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-apache

# Generate certificate
sudo certbot certonly --apache -d portofolio.neverlandstudio.my.id -d www.portofolio.neverlandstudio.my.id

# Auto-renew (should be automatically set up)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Verify renewal
sudo certbot renew --dry-run
```

### 8. Database Backup Setup

```bash
# Create backup script
sudo nano /usr/local/bin/backup-db.sh
```

```bash
#!/bin/bash
# File: /usr/local/bin/backup-db.sh

BACKUP_DIR="/backups/mysql"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
FILENAME="neverland_portfolio_${TIMESTAMP}.sql"

mkdir -p $BACKUP_DIR

mysqldump -h 192.168.20.40 -u neverland -p"cysec" neverland_portfolio \
  > "$BACKUP_DIR/$FILENAME"

# Compress
gzip "$BACKUP_DIR/$FILENAME"

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_DIR/${FILENAME}.gz"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-db.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-db.sh >> /var/log/backup.log 2>&1
```

### 9. Verify Installation

```bash
# Test health check endpoint
curl http://localhost:8001/api/health/ping
# Expected: {"status":"ok"}

# Test challenges endpoint
curl http://localhost:8001/api/v1/challenges
# Expected: JSON array with 108 challenges

# Test frontend
curl -I https://portofolio.neverlandstudio.my.id
# Expected: HTTP/2 200 OK

# Verify ModSecurity
sudo apache2ctl -M | grep security
# Expected: security3_module (shared)

# Test database connection
php artisan tinker
> DB::connection()->getPdo()
# Expected: PDOConnection object
```

---

## =====================================================================
## MONITORING & MAINTENANCE
## =====================================================================

### Daily Checks
```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check error logs
tail -20 /var/log/apache2/portofolio.neverlandstudio.error.log
tail -20 /var/www/portofolio-neverland-studio/backend/storage/logs/laravel.log

# Check database
mysql -h 192.168.20.40 -u neverland -p"cysec" -e "SHOW PROCESSLIST;"
```

### Weekly Tasks
```bash
# Update packages
sudo apt-get update && sudo apt-get upgrade

# Check backup integrity
ls -lh /backups/mysql/

# Review security logs
grep "ERROR\|WARN" /var/log/apache2/modsecurity_audit.log | tail -50
```

### Monthly Tasks
```bash
# Update Laravel packages
composer update

# Update npm dependencies
npm update

# Review failed logins
grep "password_incorrect\|account_locked" /var/www/portofolio-neverland-studio/backend/storage/logs/laravel.log

# Database optimization
mysql -h 192.168.20.40 -u neverland -p"cysec" -e "OPTIMIZE TABLE neverland_portfolio.*;"
```

---

## =====================================================================
## TROUBLESHOOTING
## =====================================================================

### 502 Bad Gateway
```bash
# Check backend server
curl http://localhost:8001/api/health/ping

# Restart backend
sudo supervisorctl restart laravel-api

# Check Apache proxy
sudo apache2ctl -t
```

### Database Connection Failed
```bash
# Test connection
mysql -h 192.168.20.40 -u neverland -p"cysec" -e "SELECT 1"

# Check Laravel config
php artisan config:show database

# Reconnect
php artisan cache:clear
```

### ModSecurity Blocking Requests
```bash
# Check logs
tail -f /var/log/apache2/modsecurity_audit.log

# Disable specific rule
# Edit: /etc/apache2/conf-available/modsecurity-exceptions.conf
# Add: SecRuleRemoveById <RULE_ID>

# Reload
sudo systemctl reload apache2
```

### SSL Certificate Issues
```bash
# Check certificate
openssl x509 -in /etc/ssl/certs/neverlandstudio.crt -text -noout

# Test SSL
curl -v https://portofolio.neverlandstudio.my.id

# Renew manually
sudo certbot renew --force-renewal
```

---

## =====================================================================
## POST-DEPLOYMENT VERIFICATION
## =====================================================================

✅ **Checklist:**
- [ ] Backend API responding (curl localhost:8001/api/health/ping)
- [ ] Frontend building without errors (npm run build)
- [ ] Database migrations successful
- [ ] SSL certificate installed and working
- [ ] ModSecurity loaded and configured
- [ ] All 108 challenges in database
- [ ] Login/registration working
- [ ] CTF challenge submission working
- [ ] Rate limiting active
- [ ] Logs being written correctly
- [ ] Backups scheduled and running
- [ ] Monitoring and alerting configured

---

## =====================================================================
## ROLLBACK PROCEDURE
## =====================================================================

If issues occur after deployment:

```bash
# 1. Revert code
git revert <commit-hash>
git push origin main

# 2. Rollback database
# Restore from backup
mysql -h 192.168.20.40 -u neverland -p"cysec" neverland_portfolio < backup.sql

# 3. Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# 4. Restart services
sudo systemctl restart php-fpm
sudo systemctl reload apache2

# 5. Verify
curl https://portofolio.neverlandstudio.my.id
```

---

**Last Updated:** March 18, 2026  
**Maintained By:** DevOps Team  
**Support:** [Your Support Email]
