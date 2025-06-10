FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

RUN npm install -g @angular/cli
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage - note the corrected path
COPY --from=build /app/dist/portfolio /usr/share/nginx/html

# Configure nginx to run on port 8080
RUN sed -i 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
