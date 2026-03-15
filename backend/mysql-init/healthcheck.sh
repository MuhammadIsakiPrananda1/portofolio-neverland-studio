#!/bin/bash
# MySQL Health Check Script

# Wait for MySQL to be ready
until mysql -h mysql -u neverland -ppassword -e "SELECT 1" &>/dev/null; do
    echo "Waiting for MySQL..."
    sleep 2
done

echo "MySQL is ready!"
