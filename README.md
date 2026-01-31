# JWT Auth WebApp

Sistema completo de autenticação JWT com validação de e-mail, construído com React/Vite no frontend e Node.js/GraphQL Yoga no backend, seguindo padrões DDD.

## Stack

### Backend
- **Runtime**: Node.js 20 + TypeScript
- **Framework**: Fastify
- **GraphQL**: GraphQL Yoga (The Guild)
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **Email**: Nodemailer

### Frontend
- **Build**: Vite 5
- **Framework**: React 18 + TypeScript
- **UI**: Tailwind CSS
- **GraphQL**: Apollo Client
- **Codegen**: @graphql-codegen/cli

### Infraestrutura
- **Database**: PostgreSQL 15
- **Email (dev)**: Mailhog
- **Container**: Docker + Docker Compose
- **Playground**: Altair GraphQL

## Quick Start

### 1. Clone e configure

```bash
cd jwt-auth-webapp
cp .env.example .env
```

### 2. Inicie com Docker

```bash
docker-compose up -d
```

### 3. Execute migrations

```bash
docker-compose exec api pnpm prisma migrate dev
```

### 4. (Opcional) Seed do banco

```bash
docker-compose exec api pnpm prisma db seed
```

## URLs

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API GraphQL | http://localhost:4000/graphql |
| Altair Playground | http://localhost:4000/altair |
| Mailhog (emails) | http://localhost:8025 |

## Desenvolvimento Local (sem Docker)

### API

```bash
cd api
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm dev
```

### Web

```bash
cd web
pnpm install
pnpm codegen  # Gera types do GraphQL
pnpm dev
```

## GraphQL Codegen

O frontend usa codegen para gerar types TypeScript automaticamente:

```bash
cd web
pnpm codegen        # Gera uma vez
pnpm codegen:watch  # Watch mode
```

Os types são gerados em `web/src/generated/graphql.ts`.

## Arquitetura DDD (Backend)

```
api/src/
├── domain/           # Entidades, Value Objects, Interfaces
├── application/      # Use Cases, DTOs
├── infrastructure/   # Prisma, JWT, Email services
└── interfaces/       # GraphQL resolvers, directives
```

## Fluxos de Autenticação

### Registro
1. Usuário envia nome, email, senha
2. Senha é validada e hasheada
3. Token de verificação é criado
4. Email de verificação é enviado
5. Tokens JWT são retornados

### Login
1. Usuário envia email e senha
2. Credenciais são validadas
3. Access token (15min) e refresh token (7 dias) são gerados
4. Tokens são retornados

### Refresh Token
1. Cliente envia refresh token
2. Token é validado
3. Token antigo é revogado (rotation)
4. Novos tokens são gerados

### Reset de Senha
1. Usuário solicita reset
2. Token de reset é criado (1h validade)
3. Email com link é enviado
4. Usuário define nova senha
5. Todos os refresh tokens são revogados

## Variáveis de Ambiente

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/jwt_auth

# JWT
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# SMTP
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_FROM=noreply@jwt-auth.local

# App
APP_URL=http://localhost:5173
API_PORT=4000
```

## Scripts

### API
- `pnpm dev` - Desenvolvimento com hot reload
- `pnpm build` - Build para produção
- `pnpm start` - Inicia em produção
- `pnpm prisma:migrate` - Executa migrations
- `pnpm prisma:studio` - Abre Prisma Studio

### Web
- `pnpm dev` - Desenvolvimento
- `pnpm build` - Build para produção
- `pnpm codegen` - Gera types GraphQL
- `pnpm codegen:watch` - Codegen em watch mode

## Licença

MIT
