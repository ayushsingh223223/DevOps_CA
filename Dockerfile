FROM mcr.microsoft.com/devcontainers/typescript-node:1-22 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM mcr.microsoft.com/devcontainers/typescript-node:1-22 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM mcr.microsoft.com/devcontainers/typescript-node:1-22 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
