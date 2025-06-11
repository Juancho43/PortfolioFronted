# Stage 0: compile angular frontend
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 1: serve app with nginx
FROM nginx:alpine
# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files to nginx html directory
COPY --from=build /app/dist/portfolio /usr/share/nginx/html/
RUN mkdir -p /etc/nginx/ssl
COPY ssl/cert.pem ssl/key.pem /etc/nginx/ssl/
# Configure nginx for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
