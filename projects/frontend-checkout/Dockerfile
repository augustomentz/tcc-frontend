# Única Etapa: Build com Node.js para gerar artefatos estáticos (sem runtime)
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --Production

COPY . .

RUN npm run build --prod
