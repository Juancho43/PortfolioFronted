FROM node:18-alpine

# Install nginx
RUN apk add --no-cache nginx

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (incluye devDependencies para el build)
RUN npm ci --include=dev

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy source code
COPY . .

# Build the application
RUN ng build --configuration=production

# Copy built files to nginx directory
RUN cp -r dist/portfolio/* /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Create nginx directories
RUN mkdir -p /run/nginx

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
