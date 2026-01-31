FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Production - using tsx to run TypeScript directly
FROM base AS production
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
EXPOSE 4000
CMD ["pnpm", "dev"]
