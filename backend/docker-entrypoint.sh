#!/bin/sh
set -e

cd /var/www/html

# Allow www-data to access Docker socket if mounted
if [ -S /var/run/docker.sock ]; then
  DOCKER_GID=$(stat -c '%g' /var/run/docker.sock)
  if ! getent group docker >/dev/null 2>&1; then
    addgroup -g "$DOCKER_GID" -S docker >/dev/null 2>&1 || true
  fi
  addgroup www-data docker >/dev/null 2>&1 || true
fi

# Ensure writable directories
if [ -d storage ] && [ -d bootstrap/cache ]; then
  chown -R www-data:www-data storage bootstrap/cache || true
  chmod -R 775 storage bootstrap/cache || true
fi

exec /usr/bin/supervisord -c /etc/supervisor.d/supervisord.ini
