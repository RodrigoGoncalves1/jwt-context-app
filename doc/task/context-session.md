# Context Session - JWT Auth WebApp

**Projeto**: JWT Authentication WebApp com GraphQL
**Iniciado**: 2026-01-31
**Status**: PRP Gerado - Pronto para Implementação

## Resumo do Projeto

Web-app full-stack com:
- **Frontend**: React/Vite + Apollo Client + Codegen + Tailwind CSS
- **Backend**: Node.js + Fastify + GraphQL Yoga + DDD
- **Auth**: JWT com validação de e-mail
- **DB**: PostgreSQL via Prisma
- **Infra**: Docker Compose
- **Playground**: Altair GraphQL

## Decisões Finalizadas

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| UI Library | Tailwind CSS | Escolha do dev |
| GraphQL Server | GraphQL Yoga | 100% free/open source |
| Playground | Altair | Mais features, open source |
| Package Manager | pnpm | Performance, disk space |
| Auth Storage | httpOnly cookies | Segurança contra XSS |

## Stack Definida

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Frontend | React, Vite, TypeScript | 18.x, 5.x |
| UI | Tailwind CSS | 3.x |
| GraphQL Client | Apollo Client | 3.x |
| Codegen | @graphql-codegen/cli | 5.x |
| Backend | Node.js, Fastify, TypeScript | 20.x, 4.x |
| GraphQL Server | GraphQL Yoga | 5.x |
| ORM | Prisma | 5.x |
| Database | PostgreSQL | 15.x |
| Auth | jsonwebtoken, bcryptjs | - |
| Email | Nodemailer + Mailhog | 6.x |
| Playground | Altair GraphQL | - |
| Container | Docker, Docker Compose | - |

## Arquitetura DDD (Backend)

```
domain/         → Entidades, Value Objects, Interfaces de Repos
application/    → Use Cases, DTOs, Interfaces de Services
infrastructure/ → Prisma, JWT, Bcrypt, Nodemailer
interfaces/     → GraphQL Resolvers, Directives, Schema
```

## Próximos Passos

1. [x] Gerar PRP completo
2. [ ] Executar implementação (`/execute-prp`)
3. [ ] Validar fluxos de autenticação
4. [ ] Testar ambiente Docker

## Arquivos Importantes

- `INITIAL.md` - Especificação inicial
- `PRPs/PRP-01-jwt-auth-webapp.md` - PRP completo para execução
- `CLAUDE.md` - Regras para agentes de IA
- `.ai-context.md` - Mapa de contexto

## URLs de Desenvolvimento (após docker-compose up)

- Frontend: http://localhost:5173
- API GraphQL: http://localhost:4000/graphql
- Altair Playground: http://localhost:4000/altair
- Mailhog: http://localhost:8025
