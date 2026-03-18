# Production Configuration & Hardening Guide
# Untuk: Portfolio Neverland Studio
# Stack: Apache + Laravel 11 + React 19 + MySQL

## =====================================================================
## 1. ENVIRONMENT CONFIGURATION (.env)
## =====================================================================

### Critical Settings untuk Production:
```
✅ APP_ENV=production          # Enable production mode
✅ APP_DEBUG=false             # NEVER true in production (exposes secrets)
✅ APP_KEY=<SecretGeneratedKey> # Generate with: php artisan key:generate
✅ LOG_LEVEL=error             # Only log errors, not debug info
✅ SESSION_DRIVER=database      # Persistent sessions across servers
✅ SESSION_ENCRYPT=true        # Encrypt session data
✅ BCRYPT_ROUNDS=13            # Slower = more secure (12-13 recommended)
```

### Database Configuration:
```
DB_CONNECTION=mysql
DB_HOST=192.168.20.40         # Remote database server
DB_PORT=3306
DB_DATABASE=neverland_portfolio
DB_USERNAME=neverland         # Non-root user
DB_PASSWORD=cysec             # Strong password
MYSQL_ATTR_SSL_VERIFY_SERVER_CERT=false  # For SSL connections
```

### Session Settings:
```
SESSION_LIFETIME=120          # Minutes of inactivity before expiry
SESSION_ENCRYPT=true          # Encrypt session payload
SESSION_PATH=/                # Cookie path
SESSION_DOMAIN=.neverlandstudio.my.id  # Cookie domain
SESSION_SAME_SITE=Lax        # CSRF protection
SESSION_COOKIE=portal_session # Custom cookie name (avoid "LARAVEL_SESSION")
```

### Cache & Queue:
```
CACHE_STORE=database          # Use database cache (Redis preferred in production)
QUEUE_CONNECTION=database     # Database queue (for email, jobs, etc.)
```

## =====================================================================
## 2. APACHE VIRTUAL HOST CONFIGURATION
## =====================================================================

### File: /etc/apache2/sites-available/portofolio.neverlandstudio.my.id.conf

```apache
<VirtualHost *:80>
    ServerName portofolio.neverlandstudio.my.id
    ServerAlias www.portofolio.neverlandstudio.my.id
    
    # Redirect HTTP to HTTPS
    RewriteEngine On
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName portofolio.neverlandstudio.my.id
    ServerAlias www.portofolio.neverlandstudio.my.id
    
    # SSL Certificates
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/neverlandstudio.crt
    SSLCertificateKeyFile /etc/ssl/private/neverlandstudio.key
    SSLCertificateChainFile /etc/ssl/certs/chain.crt
    
    # Strong SSL/TLS Configuration
    SSLProtocol TLSv1.2 TLSv1.3
    SSLCipherSuite HIGH:!aNULL:!MD5
    SSLHonorCipherOrder on
    
    # Frontend (React)
    DocumentRoot /var/www/portfolio-neverland-studio/dist
    
    # Proxy to Laravel Backend
    ProxyPreserveHost On
    ProxyPass /api http://localhost:8001/api
    ProxyPassReverse /api http://localhost:8001/api
    
    # React SPA: Handle client-side routing
    <Directory /var/www/portfolio-neverland-studio/dist>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
        
        # Security headers
        <FilesMatch "\.html$">
            Header set Cache-Control "no-cache, no-store, must-revalidate"
            Header set Pragma "no-cache"
            Header set Expires "0"
        </FilesMatch>
    </Directory>
    
    # Backend (Laravel public)
    <Location /api>
        ProxyPassReverse !
        RewriteRule ^/api(.*)$ - [L]
    </Location>
    
    # Logging
    ErrorLog ${APACHE_LOG_DIR}/portofolio.neverlandstudio.error.log
    CustomLog ${APACHE_LOG_DIR}/portofolio.neverlandstudio.access.log combined
    
    # Disable listing directories
    <Directory /var/www/portfolio-neverland-studio>
        Options -Indexes -FollowSymLinks
        AllowOverride None
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
```

### Enable & Restart:
```bash
sudo a2ensite portofolio.neverlandstudio.my.id.conf
sudo a2enmod rewrite ssl proxy proxy_http
sudo systemctl reload apache2
```

## =====================================================================
## 3. LARAVEL API (.env) PRODUCTION CHECKLIST
## =====================================================================

```bash
# Run migrations (update database schema)
php artisan migrate:fresh --seed

# Generate app key (if not already set)
php artisan key:generate

# Cache configuration (improves performance)
php artisan config:cache

# Cache routes (improves performance)
php artisan route:cache

# Optimize autoloader
composer dump-autoload --optimize

# Clear all caches before deployment
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear
```

## =====================================================================
## 4. MOD_SECURITY & OWASP CRS
## =====================================================================

### Enable the exception configuration:
```bash
sudo a2enconf modsecurity-exceptions
sudo systemctl reload apache2
```

### Verify ModSecurity is loaded:
```bash
sudo apache2ctl -M | grep security
```

Expected output:
```
security3_module (shared)
```

### Monitor ModSecurity blocks:
```bash
# Real-time monitoring:
sudo tail -f /var/log/apache2/modsecurity_audit.log

# Search for blocks:
sudo grep "Phase 2" /var/log/apache2/modsecurity_audit.log
```

## =====================================================================
## 5. SESSION & AUTHENTICATION HARDENING
## =====================================================================

### Database Session Table:
```bash
# Create session table (run once)
php artisan session:table
php artisan migrate
```

### CSRF Protection:
```php
// Frontend: Include CSRF token in forms
<form method="POST" action="/api/v1/endpoint">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
</form>
```

### Rate Limiting:
- Login: 5 attempts per 5 minutes
- Challenge submission: 10 per 1 minute
- Password reset: 3 per 10 minutes
- API general: 100 per hour per IP

## =====================================================================
## 6. DATABASE SECURITY (MySQL)
## =====================================================================

### Connection Details:
```
Host: 192.168.20.40
User: neverland (non-root)
Password: cysec
Database: neverland_portfolio
Port: 3306
```

### Best Practices:
1. ✅ Use non-root user for application (neverland)
2. ✅ Root account (Proxmox@2) - CHANGE or secure
3. ✅ Restrict access to 192.168.20.x subnet only
4. ✅ Enable SSL for remote connections
5. ✅ Regular backups (daily)
6. ✅ Monitor slow query log

### Backup Command:
```bash
mysqldump -h 192.168.20.40 -u neverland -p neverland_portfolio > backup.sql
```

## =====================================================================
## 7. LOGGING & MONITORING
## =====================================================================

### Laravel Logs:
```
Location: /var/www/portfolio-neverland-studio/backend/storage/logs/
Format: {year}-{month}-{day}.log
Monitor: tail -f storage/logs/laravel.log
```

### Apache Logs:
```
Error Log: /var/log/apache2/portofolio.neverlandstudio.error.log
Access Log: /var/log/apache2/portofolio.neverlandstudio.access.log
ModSecurity: /var/log/apache2/modsecurity_audit.log
```

### Recommended Alerts:
- ❌ 5xx errors (server errors)
- ❌ Repeated 401/403 (authentication failures)
- ⚠️ ModSecurity blocks (matched rules)
- ⚠️ Rate limit hits (brute force attempts)

## =====================================================================
## 8. PERFORMANCE OPTIMIZATION (After Security)
## =====================================================================

```bash
# Enable compression
sudo a2enmod deflate brotli

# PHP OPcache (add to php.ini)
[opcache]
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=10000
opcache.validate_timestamps=0  # Disable in production

# Redis Cache (recommended)
CACHE_STORE=redis
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

## =====================================================================
## 9. MAINTENANCE & UPDATES
## =====================================================================

### Regular Tasks:
- [ ] Check log files (daily)
- [ ] Verify database backups (daily)
- [ ] Review failed authentication attempts (weekly)
- [ ] Update Laravel packages (monthly)
- [ ] Security audit (quarterly)

### Deployment Checklist:
```bash
# Before deploying
git pull origin main
composer install --no-dev
npm run build
php artisan migrate --force

# After deploying
php artisan cache:clear
php artisan config:cache
php artisan route:cache
systemctl restart php-fpm
systemctl reload apache2
```

## =====================================================================
## 10. SECURITY HEADERS (Applied by Middleware)
## =====================================================================

```
Content-Security-Policy: Prevent XSS attacks
X-Frame-Options: SAMEORIGIN - Prevent clickjacking
X-Content-Type-Options: nosniff - Prevent MIME sniffing
X-XSS-Protection: 1; mode=block - Legacy XSS filter
Strict-Transport-Security: HSTS for HTTPS enforcement
Referrer-Policy: strict-origin-when-cross-origin
```

## =====================================================================
## FINAL VERIFICATION
## =====================================================================

✅ All steps completed? Run:
```bash
php artisan health:check
curl -I https://portofolio.neverlandstudio.my.id
```

Expected responses:
- App: ✓ OK
- Database: ✓ OK
- Cache: ✓ OK
- HTTP: 200 OK with correct headers
