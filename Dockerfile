# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

run npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production


FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html

EXPOSE 8080
