FROM node:21-alpine3.19

WORKDIR /usr/src/app

# Copiar archivos package.json y package-lock.json
COPY package.json ./ 
COPY package-lock.json ./


# Instalar dependencias
RUN npm install

# Copiar todo el código fuente de la aplicación
COPY . .

# # Generar el cliente Prisma (si es que usas Prisma)
# RUN npx prisma generate

# Exponer el puerto 3001 (el puerto donde la app escucha)
EXPOSE 3001