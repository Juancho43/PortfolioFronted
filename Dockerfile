# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción con Apache
FROM httpd:2.4-alpine

# Habilitar mod_rewrite
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Permitir .htaccess
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf

# Copiar archivos construidos al directorio de Apache
COPY --from=build /app/dist/tu-app-name /usr/local/apache2/htdocs/

EXPOSE 8080

# Cambiar puerto de Apache
RUN sed -i 's/Listen 80/Listen 8080/g' /usr/local/apache2/conf/httpd.conf

CMD ["httpd-foreground"]
