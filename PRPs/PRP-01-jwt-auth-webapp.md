# PRP: JWT Authentication WebApp com GraphQL

**Versão**: 1.0
**Data**: 2026-01-31
**Status**: Aprovado para Implementação

---

## CONTEXTO E OBJETIVOS

### Resumo Executivo
Sistema completo de autenticação JWT com validação de e-mail, construído com React/Vite no frontend e Node.js/GraphQL Yoga no backend, seguindo padrões DDD. Ambiente totalmente containerizado com Docker.

### Valor Entregue
- Boilerplate reutilizável para projetos com auth
- Type-safety end-to-end com GraphQL Codegen
- Developer Experience otimizada (hot reload, playground, codegen watch)
- Segurança robusta (JWT best practices, bcrypt, validação)

### Stack Tecnológico Final

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Frontend | React + Vite + TypeScript | 18.x / 5.x |
| UI | Tailwind CSS | 3.x |
| GraphQL Client | Apollo Client | 3.x |
| Codegen | @graphql-codegen/cli | 5.x |
| Backend | Node.js + Fastify + TypeScript | 20.x / 4.x |
| GraphQL Server | GraphQL Yoga | 5.x |
| ORM | Prisma | 5.x |
| Database | PostgreSQL | 15.x |
| Auth | jsonwebtoken + bcryptjs | - |
| Email | Nodemailer | 6.x |
| Playground | Altair GraphQL | - |
| Container | Docker + Docker Compose | - |

---

## ARQUITETURA E DESIGN

### Diagrama de Arquitetura
```
┌─────────────────────────────────────────────────────────────────┐
│                         DOCKER COMPOSE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────────┐    ┌───────────────┐   │
│  │   WEB       │    │      API        │    │  PostgreSQL   │   │
│  │  (React)    │───▶│  (GraphQL Yoga) │───▶│    :5432      │   │
│  │   :5173     │    │     :4000       │    │               │   │
│  └─────────────┘    └─────────────────┘    └───────────────┘   │
│         │                   │                                   │
│         │                   ▼                                   │
│         │           ┌─────────────────┐                        │
│         │           │    Mailhog      │                        │
│         │           │  SMTP: 1025     │                        │
│         │           │  Web:  8025     │                        │
│         └──────────▶└─────────────────┘                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Altair Playground                     │   │
│  │                  http://localhost:4000/altair            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Arquitetura Backend (DDD)
```
api/
├── src/
│   ├── domain/                     # Camada de Domínio (Core)
│   │   ├── entities/
│   │   │   ├── User.ts            # Entidade User
│   │   │   ├── RefreshToken.ts    # Entidade RefreshToken
│   │   │   └── VerificationToken.ts
│   │   ├── repositories/           # Interfaces (Ports)
│   │   │   ├── IUserRepository.ts
│   │   │   └── ITokenRepository.ts
│   │   ├── value-objects/
│   │   │   ├── Email.ts           # VO com validação
│   │   │   ├── Password.ts        # VO com hash
│   │   │   └── UserId.ts
│   │   └── errors/
│   │       └── DomainError.ts
│   │
│   ├── application/                # Camada de Aplicação (Use Cases)
│   │   ├── use-cases/
│   │   │   ├── auth/
│   │   │   │   ├── RegisterUserUseCase.ts
│   │   │   │   ├── AuthenticateUserUseCase.ts
│   │   │   │   ├── RefreshTokenUseCase.ts
│   │   │   │   └── LogoutUseCase.ts
│   │   │   ├── email/
│   │   │   │   ├── VerifyEmailUseCase.ts
│   │   │   │   ├── SendVerificationEmailUseCase.ts
│   │   │   │   └── RequestPasswordResetUseCase.ts
│   │   │   └── user/
│   │   │       └── GetCurrentUserUseCase.ts
│   │   ├── dtos/
│   │   │   ├── AuthDTO.ts
│   │   │   └── UserDTO.ts
│   │   └── interfaces/             # Ports para serviços
│   │       ├── IEmailService.ts
│   │       ├── IJwtService.ts
│   │       └── IHashService.ts
│   │
│   ├── infrastructure/             # Camada de Infraestrutura (Adapters)
│   │   ├── database/
│   │   │   ├── prisma/
│   │   │   │   ├── schema.prisma
│   │   │   │   ├── migrations/
│   │   │   │   └── seed.ts
│   │   │   └── PrismaClient.ts
│   │   ├── repositories/           # Implementações
│   │   │   ├── PrismaUserRepository.ts
│   │   │   └── PrismaTokenRepository.ts
│   │   ├── services/
│   │   │   ├── JwtService.ts
│   │   │   ├── BcryptHashService.ts
│   │   │   └── NodemailerEmailService.ts
│   │   └── config/
│   │       └── env.ts
│   │
│   └── interfaces/                 # Camada de Interface (GraphQL)
│       └── graphql/
│           ├── schema/
│           │   ├── typeDefs/
│           │   │   ├── user.graphql
│           │   │   ├── auth.graphql
│           │   │   └── index.ts
│           │   └── resolvers/
│           │       ├── userResolvers.ts
│           │       ├── authResolvers.ts
│           │       └── index.ts
│           ├── directives/
│           │   └── authDirective.ts
│           ├── scalars/
│           │   ├── DateTime.ts
│           │   └── EmailAddress.ts
│           ├── context.ts
│           ├── schema.ts           # Schema builder dinâmico
│           └── server.ts           # GraphQL Yoga setup
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── Dockerfile
├── tsconfig.json
└── package.json
```

### Arquitetura Frontend
```
web/
├── src/
│   ├── generated/
│   │   └── graphql.ts              # Auto-generated types + hooks
│   │
│   ├── graphql/
│   │   ├── fragments/
│   │   │   └── user.graphql
│   │   ├── queries/
│   │   │   └── me.graphql
│   │   └── mutations/
│   │       ├── register.graphql
│   │       ├── login.graphql
│   │       ├── verifyEmail.graphql
│   │       ├── refreshToken.graphql
│   │       ├── requestPasswordReset.graphql
│   │       ├── resetPassword.graphql
│   │       └── logout.graphql
│   │
│   ├── lib/
│   │   ├── apollo.ts               # Apollo Client config
│   │   └── auth.ts                 # Token management
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx         # Auth state + provider
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useProtectedRoute.ts
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   └── VerifyEmail.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Alert.tsx
│   │       └── Loading.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── VerifyEmail.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetPassword.tsx
│   │   └── Dashboard.tsx           # Protected
│   │
│   ├── routes/
│   │   ├── index.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                   # Tailwind imports
│
├── codegen.ts
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── Dockerfile
└── package.json
```

---

## SCHEMA GRAPHQL

### Types
```graphql
# src/interfaces/graphql/schema/typeDefs/user.graphql

scalar DateTime
scalar EmailAddress

type User {
  id: ID!
  email: EmailAddress!
  name: String!
  emailVerified: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type AuthPayload {
  accessToken: String!
  refreshToken: String!
  user: User!
}

type MessagePayload {
  success: Boolean!
  message: String!
}
```

### Inputs
```graphql
# src/interfaces/graphql/schema/typeDefs/auth.graphql

input RegisterInput {
  email: EmailAddress!
  password: String!
  name: String!
}

input LoginInput {
  email: EmailAddress!
  password: String!
}

input ResetPasswordInput {
  token: String!
  newPassword: String!
}
```

### Queries & Mutations
```graphql
type Query {
  me: User @auth
}

type Mutation {
  # Auth
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
  refreshToken(token: String!): AuthPayload!
  logout: MessagePayload! @auth

  # Email Verification
  verifyEmail(token: String!): MessagePayload!
  resendVerificationEmail: MessagePayload! @auth

  # Password Reset
  requestPasswordReset(email: EmailAddress!): MessagePayload!
  resetPassword(input: ResetPasswordInput!): MessagePayload!
}
```

### Directive @auth
```graphql
directive @auth on FIELD_DEFINITION
```

---

## PRISMA SCHEMA

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  name          String
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  refreshTokens      RefreshToken[]
  verificationTokens VerificationToken[]
  passwordResets     PasswordReset[]

  @@map("users")
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  revoked   Boolean  @default(false)

  @@index([userId])
  @@index([token])
  @@map("refresh_tokens")
}

model VerificationToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  used      Boolean  @default(false)

  @@index([token])
  @@map("verification_tokens")
}

model PasswordReset {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  used      Boolean  @default(false)

  @@index([token])
  @@map("password_resets")
}
```

---

## DOCKER CONFIGURATION

### docker-compose.yml
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: jwt-auth-db
    environment:
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres}
      POSTGRES_DB: ${DB_NAME:-jwt_auth}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - jwt-auth-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  mailhog:
    image: mailhog/mailhog:latest
    container_name: jwt-auth-mail
    ports:
      - "1025:1025"   # SMTP
      - "8025:8025"   # Web UI
    networks:
      - jwt-auth-network

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
      target: development
    container_name: jwt-auth-api
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://${DB_USER:-postgres}:${DB_PASSWORD:-postgres}@postgres:5432/${DB_NAME:-jwt_auth}
      JWT_ACCESS_SECRET: ${JWT_ACCESS_SECRET:-super-secret-access-key-change-in-production}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET:-super-secret-refresh-key-change-in-production}
      JWT_ACCESS_EXPIRES_IN: 15m
      JWT_REFRESH_EXPIRES_IN: 7d
      SMTP_HOST: mailhog
      SMTP_PORT: 1025
      SMTP_USER: ""
      SMTP_PASS: ""
      SMTP_FROM: noreply@jwt-auth.local
      APP_URL: http://localhost:5173
      API_PORT: 4000
    volumes:
      - ./api:/app
      - /app/node_modules
    ports:
      - "4000:4000"
    networks:
      - jwt-auth-network
    depends_on:
      postgres:
        condition: service_healthy
      mailhog:
        condition: service_started
    command: npm run dev

  web:
    build:
      context: ./web
      dockerfile: Dockerfile
      target: development
    container_name: jwt-auth-web
    environment:
      VITE_API_URL: http://localhost:4000/graphql
    volumes:
      - ./web:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    networks:
      - jwt-auth-network
    depends_on:
      - api
    command: npm run dev -- --host

volumes:
  postgres_data:

networks:
  jwt-auth-network:
    driver: bridge
```

### API Dockerfile
```dockerfile
# api/Dockerfile

FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Development
FROM base AS development
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm prisma generate
EXPOSE 4000
CMD ["pnpm", "dev"]

# Build
FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# Production
FROM base AS production
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 4000
CMD ["pnpm", "start"]
```

### Web Dockerfile
```dockerfile
# web/Dockerfile

FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Development
FROM base AS development
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev", "--host"]

# Build
FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Production
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## TODO.MD INTEGRADO

### Objetivos Principais
- [ ] Implementar sistema de autenticação JWT completo
- [ ] Configurar ambiente Docker com todos os serviços
- [ ] Garantir type-safety end-to-end com Codegen

### Fase 1: Setup e Infraestrutura
- [ ] 1.1 Criar estrutura de pastas do projeto
- [ ] 1.2 Configurar docker-compose.yml
- [ ] 1.3 Configurar API com Fastify + GraphQL Yoga
- [ ] 1.4 Configurar Prisma com schema inicial
- [ ] 1.5 Configurar Frontend com Vite + React + Tailwind
- [ ] 1.6 Configurar GraphQL Codegen
- [ ] 1.7 Integrar Altair Playground

### Fase 2: Domain Layer (Backend)
- [ ] 2.1 Criar entidades (User, RefreshToken, VerificationToken)
- [ ] 2.2 Criar Value Objects (Email, Password, UserId)
- [ ] 2.3 Definir interfaces de repositórios
- [ ] 2.4 Criar erros de domínio

### Fase 3: Infrastructure Layer (Backend)
- [ ] 3.1 Implementar PrismaUserRepository
- [ ] 3.2 Implementar PrismaTokenRepository
- [ ] 3.3 Implementar JwtService
- [ ] 3.4 Implementar BcryptHashService
- [ ] 3.5 Implementar NodemailerEmailService
- [ ] 3.6 Configurar variáveis de ambiente

### Fase 4: Application Layer (Backend)
- [ ] 4.1 Implementar RegisterUserUseCase
- [ ] 4.2 Implementar AuthenticateUserUseCase
- [ ] 4.3 Implementar RefreshTokenUseCase
- [ ] 4.4 Implementar LogoutUseCase
- [ ] 4.5 Implementar VerifyEmailUseCase
- [ ] 4.6 Implementar SendVerificationEmailUseCase
- [ ] 4.7 Implementar RequestPasswordResetUseCase
- [ ] 4.8 Implementar ResetPasswordUseCase
- [ ] 4.9 Implementar GetCurrentUserUseCase

### Fase 5: Interface Layer - GraphQL (Backend)
- [ ] 5.1 Criar typeDefs (schema GraphQL)
- [ ] 5.2 Criar custom scalars (DateTime, EmailAddress)
- [ ] 5.3 Implementar @auth directive
- [ ] 5.4 Implementar authResolvers
- [ ] 5.5 Implementar userResolvers
- [ ] 5.6 Configurar schema builder dinâmico
- [ ] 5.7 Configurar GraphQL Yoga server
- [ ] 5.8 Configurar context com auth

### Fase 6: Frontend - Core
- [ ] 6.1 Configurar Apollo Client
- [ ] 6.2 Criar AuthContext e Provider
- [ ] 6.3 Implementar token management (storage, refresh)
- [ ] 6.4 Criar hook useAuth
- [ ] 6.5 Criar ProtectedRoute component

### Fase 7: Frontend - Components
- [ ] 7.1 Criar componentes base (Button, Input, Alert, Loading)
- [ ] 7.2 Criar Layout components (Header, Footer, Layout)
- [ ] 7.3 Criar LoginForm
- [ ] 7.4 Criar RegisterForm
- [ ] 7.5 Criar ForgotPasswordForm
- [ ] 7.6 Criar ResetPasswordForm
- [ ] 7.7 Criar VerifyEmail component

### Fase 8: Frontend - Pages
- [ ] 8.1 Criar página Home
- [ ] 8.2 Criar página Login
- [ ] 8.3 Criar página Register
- [ ] 8.4 Criar página VerifyEmail
- [ ] 8.5 Criar página ForgotPassword
- [ ] 8.6 Criar página ResetPassword
- [ ] 8.7 Criar página Dashboard (protegida)
- [ ] 8.8 Configurar React Router

### Fase 9: Testing
- [ ] 9.1 Testes unitários para Use Cases
- [ ] 9.2 Testes unitários para Value Objects
- [ ] 9.3 Testes de integração para Resolvers
- [ ] 9.4 Testes E2E para fluxos de auth

### Fase 10: Finalização
- [ ] 10.1 Revisar segurança (CORS, rate limiting)
- [ ] 10.2 Documentar API no README
- [ ] 10.3 Criar scripts de seed para dev
- [ ] 10.4 Validar docker-compose up funciona corretamente
- [ ] 10.5 Testar fluxo completo de registro → verificação → login

---

## CRITÉRIOS DE VALIDAÇÃO

### Funcionalidade
- [ ] Registro cria usuário e envia e-mail de verificação
- [ ] Verificação de e-mail marca usuário como verificado
- [ ] Login retorna access e refresh tokens
- [ ] Refresh token renova access token
- [ ] Logout invalida refresh token
- [ ] Reset de senha funciona end-to-end
- [ ] Query `me` retorna usuário autenticado
- [ ] Rotas protegidas bloqueiam usuários não autenticados

### Performance
- [ ] Queries GraphQL < 200ms
- [ ] Codegen em watch mode funcionando
- [ ] Hot reload em dev para API e Web

### Segurança
- [ ] Senhas hasheadas com bcrypt (cost 12)
- [ ] Access token expira em 15min
- [ ] Refresh token expira em 7 dias
- [ ] Tokens de verificação expiram em 24h
- [ ] Tokens de reset expiram em 1h
- [ ] CORS configurado corretamente

### Developer Experience
- [ ] `docker-compose up` inicia todo o ambiente
- [ ] Altair acessível em http://localhost:4000/altair
- [ ] Mailhog acessível em http://localhost:8025
- [ ] Types gerados automaticamente no frontend

---

## INSTRUÇÕES PARA EXECUÇÃO

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 20+ (para desenvolvimento local)
- pnpm (gerenciador de pacotes)

### Comandos

```bash
# Iniciar ambiente completo
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Executar migrations
docker-compose exec api pnpm prisma migrate dev

# Seed do banco
docker-compose exec api pnpm prisma db seed

# Regenerar types no frontend
cd web && pnpm codegen

# Parar ambiente
docker-compose down
```

### URLs de Desenvolvimento
- **Frontend**: http://localhost:5173
- **API GraphQL**: http://localhost:4000/graphql
- **Altair Playground**: http://localhost:4000/altair
- **Mailhog (emails)**: http://localhost:8025

---

**Context Engineering 2.0** - PRP gerado para implementação autônoma seguindo best practices de DDD, GraphQL e autenticação JWT.
