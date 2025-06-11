#!/bin/bash
# Create nginx config directory if it doesn't exist
mkdir -p /etc/nginx/conf.d

# Replace PORT variable in config and copy it
sed "s/\${PORT:-80}/$PORT/g" nginx.conf > /etc/nginx/conf.d/default.conf

# Start Nginx in foreground mode
exec nginx -g 'daemon off;'
