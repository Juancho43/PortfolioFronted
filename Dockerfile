# Stage 0: compile angular frontend
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 1: serve app with apache
FROM httpd:latest
# Remove default apache welcome page
RUN rm -rf /usr/local/apache2/htdocs/*

# Copy built files to apache html directory
COPY --from=build /app/dist/portfolio/browser /usr/local/apache2/htdocs/

# Enable required Apache modules
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf

# Add custom apache config for Angular routing
RUN echo '<Directory "/usr/local/apache2/htdocs/">\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
    RewriteEngine On\n\
    RewriteBase /\n\
    RewriteRule ^index\.html$ - [L]\n\
    RewriteCond %{REQUEST_FILENAME} !-f\n\
    RewriteCond %{REQUEST_FILENAME} !-d\n\
    RewriteRule . /index.html [L]\n\
</Directory>' > /usr/local/apache2/conf/extra/angular.conf

# Include the Angular config
RUN echo 'Include conf/extra/angular.conf' >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]
