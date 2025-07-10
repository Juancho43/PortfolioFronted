# Etapa 1: Build de la aplicación Angular
FROM node:18-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Configurar Node.js para ejecutar SSR
FROM node:18-alpine

WORKDIR /app

# Copiar solo los archivos necesarios para ejecutar la aplicación
COPY --from=build /app/dist/portfolio /app/dist/portfolio
COPY --from=build /app/package.json /app/

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Exponer puerto 4000 (puerto predeterminado para SSR)
EXPOSE 4000

# Comando para iniciar el servidor SSR
CMD ["node", "dist/portfolio/server/server.mjs"]
