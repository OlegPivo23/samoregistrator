# Используем Node.js для сборки
FROM node:18 AS build-stage

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и yarn.lock в контейнер
COPY package.json yarn.lock ./


COPY . .
RUN ls -la
RUN yarn install

# Собираем Quasar-приложение
RUN yarn build

# Production stage: используем NGINX для отдачи собранного фронтенда
FROM nginx:alpine AS production-stage

# Копируем собранные файлы из build-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html



# Открываем порт 80
EXPOSE 80

# Запускаем NGINX
CMD ["nginx", "-g", "daemon off;"]
