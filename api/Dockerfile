FROM node:20-slim AS base
WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Production - using tsx to run TypeScript directly
FROM base AS production
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
EXPOSE 4000

# Sync database schema using direct connection, then start server with pooled connection
CMD ["sh", "-c", "DATABASE_URL=$DIRECT_URL pnpm prisma db push --skip-generate --accept-data-loss || true && pnpm dev"]
