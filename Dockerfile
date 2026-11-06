# ЭТАП 1: Сборка (Build)
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и устанавливаем ВСЕ зависимости
COPY package*.json ./
RUN npm install

# Копируем код и собираем проект
COPY . .
RUN npm run build

# ЭТАП 2: Продакшн (Production)
FROM node:24-alpine

WORKDIR /app

# Копируем package.json и устанавливаем ТОЛЬКО продакшн-зависимости
COPY package*.json ./
RUN npm install --only=production

# Копируем ТОЛЬКО скомпилированный код из первого этапа
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]