# REQUISIÇÃO INICIAL - JWT Auth WebApp

## INFORMAÇÕES BÁSICAS

**Nome da Funcionalidade**: JWT Authentication WebApp com GraphQL
**Prioridade**: Alta
**Categoria**: Full-Stack Web Development
**Estimativa de Complexidade**: 4

## FEATURE - DESCRIÇÃO DETALHADA

### Objetivo
Desenvolver um web-app completo com sistema de autenticação JWT, validação de e-mail, frontend React/Vite e backend Node.js seguindo padrões DDD, com API GraphQL contendo resolvers dinâmicos e ambiente Dockerizado.

### Contexto de Negócio
Sistema base de autenticação robusto e escalável que pode ser reutilizado em múltiplos projetos. Foco em segurança, boas práticas de arquitetura e developer experience (DX) com ferramentas modernas.

### Requisitos Funcionais
1. **Registro de Usuário**: Cadastro com nome, email e senha
2. **Validação de E-mail**: Envio de link/código de verificação por e-mail
3. **Login com JWT**: Autenticação retornando access token e refresh token
4. **Refresh Token**: Renovação automática de tokens expirados
5. **Logout**: Invalidação de tokens
6. **Reset de Senha**: Fluxo completo de recuperação via e-mail
7. **Proteção de Rotas**: Middleware de autenticação no GraphQL

### Requisitos Não-Funcionais
- **Performance**: Resposta de queries < 200ms
- **Segurança**: Senhas com bcrypt, tokens seguros, proteção contra ataques comuns
- **Escalabilidade**: Arquitetura stateless permitindo scale horizontal
- **DX**: Hot reload, codegen automático, playground interativo

## ESPECIFICAÇÕES TÉCNICAS

### Stack Tecnológico

#### Backend (API GraphQL)
- **Runtime**: Node.js 20+ com TypeScript
- **Framework**: Fastify (mais performático)
- **GraphQL**: GraphQL Yoga (The Guild - 100% free/open source)
- **ORM**: Prisma (type-safe, migrations, seeding)
- **Autenticação**: jsonwebtoken (JWT), bcryptjs
- **Validação**: zod ou class-validator
- **E-mail**: Nodemailer (com suporte a Mailtrap/SMTP)
- **Arquitetura**: DDD (Domain-Driven Design)
  - `src/domain/` - Entidades, Value Objects, Repositories (interfaces)
  - `src/application/` - Use Cases, DTOs
  - `src/infrastructure/` - Prisma, Email Service, JWT Service
  - `src/interfaces/` - GraphQL Resolvers, Middleware

#### Frontend (React/Vite)
- **Build Tool**: Vite 5+
- **Framework**: React 18+ com TypeScript
- **GraphQL Client**: Apollo Client ou urql
- **Codegen**: @graphql-codegen/cli (types + hooks automáticos)
- **Routing**: React Router v6
- **Forms**: React Hook Form + zod
- **UI**: Tailwind CSS
- **State**: Apollo Cache ou Zustand

#### Playground GraphQL
- **Altair GraphQL Client** (mais features, open source)
- Integrado via endpoint dedicado ou standalone
- Features: Visualizar schema, testar queries/mutations, histórico, headers customizados

#### Banco de Dados
- **PostgreSQL 15+**
- Schema gerenciado via Prisma Migrations
- Modelo de dados:
  - User (id, email, password, name, emailVerified, createdAt, updatedAt)
  - RefreshToken (id, token, userId, expiresAt, createdAt)
  - EmailVerification (id, token, userId, expiresAt, used)
  - PasswordReset (id, token, userId, expiresAt, used)

#### Docker
- `docker-compose.yml` com:
  - PostgreSQL container
  - API container (com hot reload em dev)
  - Frontend container (opcional, pode rodar local)
  - Mailhog/Mailtrap container para e-mails em dev
- Volumes para persistência
- Networks isoladas
- Environment variables via .env

### Resolvers Dinâmicos GraphQL
- Schema-first ou Code-first approach
- Resolvers gerados/carregados dinamicamente baseados em módulos
- Suporte a:
  - Query composition
  - Mutation handlers
  - Subscriptions (opcional para notificações real-time)
  - Custom scalars (DateTime, EmailAddress)
  - Directives customizadas (@auth, @rateLimit)

### Codegen Frontend
- Configuração `codegen.ts`:
  - Introspection do schema da API
  - Geração de types TypeScript
  - Geração de React Hooks para queries/mutations
  - Watch mode para regenerar em alterações
- Output em `src/generated/graphql.ts`

## EXAMPLES - EXEMPLOS DE REFERÊNCIA

### Estrutura Backend (DDD)
```
api/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   └── Token.ts
│   │   ├── repositories/
│   │   │   ├── IUserRepository.ts
│   │   │   └── ITokenRepository.ts
│   │   └── value-objects/
│   │       ├── Email.ts
│   │       └── Password.ts
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── RegisterUser.ts
│   │   │   ├── AuthenticateUser.ts
│   │   │   ├── VerifyEmail.ts
│   │   │   └── RefreshToken.ts
│   │   └── dtos/
│   │       └── UserDTO.ts
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── prisma/
│   │   ├── services/
│   │   │   ├── JwtService.ts
│   │   │   └── EmailService.ts
│   │   └── repositories/
│   │       └── PrismaUserRepository.ts
│   └── interfaces/
│       └── graphql/
│           ├── schema/
│           ├── resolvers/
│           ├── directives/
│           └── context.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── Dockerfile
└── package.json
```

### Estrutura Frontend
```
web/
├── src/
│   ├── generated/
│   │   └── graphql.ts      # Auto-generated
│   ├── graphql/
│   │   ├── queries/
│   │   └── mutations/
│   ├── components/
│   │   ├── auth/
│   │   └── common/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── hooks/
│   ├── contexts/
│   │   └── AuthContext.tsx
│   └── lib/
│       └── apollo.ts
├── codegen.ts
├── vite.config.ts
└── package.json
```

### GraphQL Schema Example
```graphql
type User {
  id: ID!
  email: String!
  name: String!
  emailVerified: Boolean!
  createdAt: DateTime!
}

type AuthPayload {
  accessToken: String!
  refreshToken: String!
  user: User!
}

type Query {
  me: User @auth
}

type Mutation {
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
  verifyEmail(token: String!): Boolean!
  refreshToken(token: String!): AuthPayload!
  requestPasswordReset(email: String!): Boolean!
  resetPassword(token: String!, newPassword: String!): Boolean!
  logout: Boolean! @auth
}
```

## DOCUMENTATION - DOCUMENTAÇÃO EXTERNA

### APIs e Bibliotecas
- Prisma: https://www.prisma.io/docs
- Apollo Server 4: https://www.apollographql.com/docs/apollo-server/
- Apollo Client: https://www.apollographql.com/docs/react/
- GraphQL Codegen: https://the-guild.dev/graphql/codegen
- Vite: https://vitejs.dev/guide/
- React Router: https://reactrouter.com/

### Best Practices
- JWT Best Practices: https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/
- DDD in Node.js: https://khalilstemmler.com/articles/domain-driven-design-intro/
- GraphQL Security: https://graphql.org/learn/security/

## OTHER CONSIDERATIONS - CONSIDERAÇÕES ESPECIAIS

### Gotchas e Armadilhas
- JWT em cookie httpOnly vs localStorage (preferir cookie para segurança)
- Refresh token rotation para prevenir token theft
- Rate limiting em mutations de auth
- CORS configuration para GraphQL playground

### Requisitos de Autenticação
- Access Token: Curta duração (15min)
- Refresh Token: Longa duração (7 dias), armazenado no DB
- Email verification: Token válido por 24h
- Password reset: Token válido por 1h

### Dependências e Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 20+ para desenvolvimento local
- Variáveis de ambiente configuradas

## SUB-AGENTES SUGERIDOS

### Pesquisa Necessária
- [x] **DevOps Agent**: Docker setup, ambiente de desenvolvimento
- [x] **Security Agent**: JWT best practices, proteção de senhas
- [x] **Documentation Agent**: GraphQL schema design
- [x] **Testing Agent**: Estratégia de testes para auth flows

## CRITÉRIOS DE ACEITAÇÃO

### Funcionalidade Core
- [ ] Usuário pode se registrar com email e senha
- [ ] E-mail de verificação é enviado após registro
- [ ] Usuário pode verificar email através do link
- [ ] Usuário pode fazer login e receber tokens
- [ ] Tokens são renovados automaticamente
- [ ] Usuário pode fazer logout
- [ ] Fluxo de reset de senha funcional
- [ ] Rotas protegidas exigem autenticação

### Qualidade e Performance
- [ ] Testes unitários para use cases
- [ ] Testes de integração para resolvers
- [ ] Codegen funcionando em watch mode
- [ ] Types 100% inferidos do schema

### Documentação e Deploy
- [ ] docker-compose up inicia todo o ambiente
- [ ] Playground acessível em /graphql
- [ ] README com instruções de setup
- [ ] Schema GraphQL documentado

## MÉTRICAS E MONITORAMENTO

### Métricas Técnicas
- Query response time < 200ms
- Token generation < 100ms
- Email dispatch < 500ms

### Métricas de Negócio
- Signup completion rate
- Email verification rate
- Login success rate

---

## NOTAS ADICIONAIS

Este projeto serve como base/boilerplate para futuros projetos que necessitem de autenticação robusta com GraphQL. O foco é em:
1. Código limpo e testável (DDD)
2. Type-safety end-to-end (TypeScript + Codegen)
3. Developer Experience (hot reload, playground, codegen watch)
4. Segurança (JWT best practices, bcrypt, validation)
5. Containerização (Docker para ambiente reproduzível)
