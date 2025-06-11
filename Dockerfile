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

# Copy custom apache config if needed
# COPY ./apache.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]
