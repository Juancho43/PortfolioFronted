# Etapa 1: Build de la aplicación Angular
FROM node:20-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias con flag para resolver conflictos
RUN npm ci --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Configurar Node.js para ejecutar SSR
FROM node:20-alpine

WORKDIR /app

# Copiar package.json Y package-lock.json
COPY --from=build /app/package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev --legacy-peer-deps

# Copiar la aplicación construida
COPY --from=build /app/dist/portfolio ./dist/portfolio

# Exponer puerto 4000 (puerto predeterminado para SSR)
EXPOSE 4000

# Comando para iniciar el servidor SSR
CMD ["node", "dist/portfolio/server/server.mjs"]
