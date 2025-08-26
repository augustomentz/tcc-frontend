FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build:shell

FROM node:20-slim

WORKDIR /app

COPY --from=build /app/dist/frontend-shell/browser /app

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "/app", "-p", "8080"]
