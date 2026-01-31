FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Development
FROM base AS development
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
RUN pnpm prisma generate
EXPOSE 4000
CMD ["pnpm", "dev"]

# Build
FROM base AS build
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# Production
FROM base AS production
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 4000
CMD ["pnpm", "start"]
