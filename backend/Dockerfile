# Backend Dockerfile for Laravel API
# Composer stage
FROM composer:latest AS composer

# Main application stage
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    nginx \
    supervisor \
    mysql-client \
    netcat-openbsd \
    docker-cli

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip gd

# Install Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first
COPY composer.json ./

# Install dependencies without running scripts
RUN composer install --no-dev --no-scripts --no-autoloader --no-interaction

# Copy application files
COPY . .

# Generate autoloader and run scripts will be done in entrypoint
RUN composer dump-autoload --optimize --no-scripts

# Create required directories if they don't exist
RUN mkdir -p storage/framework/{sessions,views,cache} \
    && mkdir -p storage/logs \
    && mkdir -p bootstrap/cache

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copy supervisor configuration
RUN mkdir -p /etc/supervisor.d
COPY <<'EOF' /etc/supervisor.d/supervisord.ini
[supervisord]
nodaemon=true
user=root
logfile=/var/log/supervisor/supervisord.log
pidfile=/var/run/supervisord.pid

[program:php-fpm]
command=php-fpm -F
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true

[program:nginx]
command=nginx -g 'daemon off;'
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true

[program:reverb]
command=php artisan reverb:start --host=0.0.0.0 --port=8080
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true
EOF

# Create log directory
RUN mkdir -p /var/log/supervisor

# Expose port
EXPOSE 80

# Start with entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
