#!/bin/bash
# Configure Apache
mkdir -p /etc/apache2/sites-available/
cp .apache.conf /etc/apache2/sites-available/000-default.conf
a2enmod rewrite
sed -i "s/^Listen 80/Listen \${PORT:-80}/" /etc/apache2/ports.conf

# Start Apache
exec apache2ctl -D FOREGROUND
