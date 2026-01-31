# /export - Exportar Projeto Completo

## Objetivo
Exportar o projeto em um relatorio Excel consolidado ou em formatos para ferramentas de gestao (Jira, Trello, Notion).

---

## Instrucoes para a IA

### 1. Coletar Todos os Dados do Projeto

```
Ler em paralelo:
- CLAUDE.md (regras e nome do projeto)
- .ai-context.md (tech stack e arquitetura)
- doc/task/context-session.md (status atual)
- PRPs/*.md (todos os PRPs)
- PRPs/*-todo.md (progresso)
- PRPs/*-validacao.md (decisoes)
```

### 2. Perguntar Formato

```markdown
## Exportar Projeto

Qual formato voce precisa?

| # | Formato | Descricao |
|---|---------|-----------|
| 1 | **Excel** | Relatorio completo com todas as abas (recomendado) |
| 2 | **Jira** | CSV para import de epicos e stories |
| 3 | **Trello** | JSON para criar board |
| 4 | **Notion** | Markdown para database |
| 5 | **JSON** | Dados estruturados para integracoes |

Digite o numero:
```

---

## FORMATO 1: Excel Consolidado (Recomendado)

Gerar arquivo `exports/[projeto]-report.xlsx` com as seguintes abas:

### Aba 1: Dashboard

| Campo | Valor |
|-------|-------|
| **Projeto** | Nome do Projeto |
| **Fase Atual** | Development (3/6) |
| **Health** | GOOD |
| **Progresso Geral** | 60% |
| **Data Geracao** | 2026-01-26 10:00 |

| Metricas | Total | Done | Active | Pending | % |
|----------|-------|------|--------|---------|---|
| Epics | 5 | 2 | 1 | 2 | 40% |
| Stories | 23 | 14 | 4 | 5 | 61% |
| Tasks | 67 | 42 | 8 | 17 | 63% |

| Blockers Ativos | Impacto | Acao |
|-----------------|---------|------|
| Rate limiting indefinido | STORY-004 | Definir com PO |

| Proximas Acoes |
|----------------|
| 1. Resolver blocker rate limiting |
| 2. Completar STORY-004 |
| 3. Iniciar STORY-006 |

### Aba 2: Roadmap

| Fase | Nome | Status | Progresso | Inicio | Fim | Dias |
|------|------|--------|-----------|--------|-----|------|
| 1 | Discovery | Done | 100% | Jan 10 | Jan 15 | 5 |
| 2 | Design | Done | 100% | Jan 15 | Jan 20 | 5 |
| 3 | Development | Active | 50% | Jan 20 | Feb 15 | 26 |
| 4 | Testing | Pending | 0% | Feb 15 | Feb 25 | 10 |
| 5 | Deploy | Pending | 0% | Feb 25 | Mar 01 | 4 |
| 6 | Launch | Pending | 0% | Mar 01 | Mar 15 | 14 |

| Milestone | Data Planejada | Status | Notas |
|-----------|----------------|--------|-------|
| M1: Setup | Jan 15 | Done | |
| M2: Design | Jan 20 | Done | |
| M3: MVP | Feb 10 | In Progress | 70% completo |
| M4: Tests | Feb 20 | Pending | |
| M5: Deploy | Mar 01 | Pending | |

### Aba 3: Epics

| ID | Titulo | Descricao | Status | Priority | Stories | Progress | Depende De | Bloqueia |
|----|--------|-----------|--------|----------|---------|----------|------------|----------|
| EPIC-001 | Setup & Config | Configuracao inicial do projeto | Done | High | 4 | 100% | - | EPIC-002, EPIC-004 |
| EPIC-002 | Core API | Endpoints principais da API | Active | Critical | 6 | 50% | EPIC-001 | EPIC-003, EPIC-005 |
| EPIC-003 | Processing | Pipeline de processamento | Pending | High | 5 | 0% | EPIC-002 | EPIC-005 |
| EPIC-004 | Storage | Sistema de armazenamento | Pending | Medium | 4 | 0% | EPIC-001 | EPIC-005 |
| EPIC-005 | Search | Busca semantica | Pending | Medium | 4 | 0% | EPIC-003, EPIC-004 | - |

### Aba 4: User Stories

| ID | Epic | Titulo | Descricao | Status | Priority | Points | Tasks | Progress | Criterios Aceitacao |
|----|------|--------|-----------|--------|----------|--------|-------|----------|---------------------|
| STORY-001 | EPIC-001 | Setup inicial | Como dev, quero projeto configurado | Done | High | 3 | 5 | 100% | Repo criado; CI/CD; Deps |
| STORY-002 | EPIC-001 | Database schema | Como dev, quero schema do banco | Done | High | 5 | 8 | 100% | Models; Migrations; Seeds |
| STORY-004 | EPIC-002 | Upload endpoint | Como usuario, quero fazer upload | Active | Critical | 8 | 12 | 50% | POST /documents; Validacao; Progress |
| STORY-005 | EPIC-002 | Processing queue | Como sistema, quero processar async | Active | High | 5 | 8 | 25% | BackgroundTasks; Status; Retry |

### Aba 5: Tasks

| ID | Story | Titulo | Descricao | Status | Assignee | DoD | Notas |
|----|-------|--------|-----------|--------|----------|-----|-------|
| TASK-001 | STORY-001 | Criar repo | Inicializar repositorio Git | Done | Dev1 | Repo existe; README | |
| TASK-023 | STORY-004 | File validation | Validar tipo e tamanho arquivo | Done | Dev1 | Valida PDF; Max 25MB | |
| TASK-024 | STORY-004 | Upload progress | Mostrar progresso do upload | Done | Dev1 | % visivel; Atualiza | |
| TASK-025 | STORY-004 | Rate limiting | Implementar limite de requests | Blocked | - | 100 req/min | Aguardando definicao |

### Aba 6: Decisoes

| ID | PRP | Decisao | Pergunta | Opcoes | Escolha | Motivo | Data | Dev |
|----|-----|---------|----------|--------|---------|--------|------|-----|
| DEC-001 | PRP-01 | Processamento | Sync ou Async? | Sync; Async | Async (BackgroundTasks) | Melhor UX | Jan 22 | Ciro |
| DEC-002 | PRP-01 | Arquivo original | Guardar ou descartar? | Guardar; Descartar | Guardar | Pode precisar depois | Jan 22 | Ciro |
| DEC-003 | PRP-01 | Chunk size | Quantos tokens? | 256; 500; 1000 | 500 + 50 overlap | Balanco qualidade/custo | Jan 22 | Ciro |
| DEC-004 | PRP-01 | Limite upload | Qual tamanho max? | 5MB; 10MB; 25MB | 25MB (configuravel) | Manuais tecnicos grandes | Jan 22 | Ciro |
| DEC-005 | PRP-01 | Migrations | Alembic ou manual? | Alembic; Manual | Alembic | Padrao do mercado | Jan 22 | Ciro |
| DEC-006 | PRP-01 | Formatos | Quais formatos? | PDF; Todos | 8 formatos (Unstructured) | Flexibilidade | Jan 22 | Ciro |

### Aba 7: Metricas

| Metrica | Valor Atual | Meta | Status | Tendencia |
|---------|-------------|------|--------|-----------|
| Progresso Geral | 60% | 100% | On Track | ↑ |
| Velocidade | 15 pts/sprint | 15 | On Track | → |
| Test Coverage | 85% | 80% | Acima | ↑ |
| Code Quality | A (92) | B+ (85) | Acima | → |
| Tech Debt Items | 3 | <5 | OK | → |
| Bugs Abertos | 2 | 0 | Atencao | ↓ |
| PRs Pendentes | 1 | <3 | OK | → |

| Sprint | Pts Planejados | Pts Entregues | Velocidade | Notas |
|--------|----------------|---------------|------------|-------|
| Sprint 1 | 25 | 28 | 28 | Setup completo |
| Sprint 2 | 30 | 18* | - | Em andamento |

### Aba 8: Riscos e Blockers

| ID | Tipo | Severidade | Descricao | Impacto | Mitigacao | Status | Owner |
|----|------|------------|-----------|---------|-----------|--------|-------|
| RISK-001 | Risco | High | API externa instavel | EPIC-003 atrasado | Implementar fallback | Monitorando | Dev1 |
| RISK-002 | Risco | Medium | Performance nao testada | Pode precisar otimizar | Load test em Sprint 3 | Planejado | Dev2 |
| BLOCK-001 | Blocker | High | Rate limiting indefinido | STORY-004 parado | Reuniao com PO | Ativo | PO |

### Aba 9: Timeline

| Data | Evento | Tipo | Status |
|------|--------|------|--------|
| Jan 10 | Inicio do projeto | Marco | Done |
| Jan 15 | Setup completo | Marco | Done |
| Jan 20 | Design aprovado | Marco | Done |
| Jan 22 | PRP-01 validado | Decisao | Done |
| Jan 26 | Hoje | Atual | - |
| Feb 10 | MVP Ready | Marco | Pending |
| Feb 20 | Testes completos | Marco | Pending |
| Mar 01 | Deploy producao | Marco | Pending |
| Mar 15 | Lancamento | Marco | Pending |

### Aba 10: Tech Stack

| Categoria | Tecnologia | Versao | Motivo | Docs |
|-----------|------------|--------|--------|------|
| Backend | Python | 3.11+ | Performance, typing | python.org |
| Framework | FastAPI | 0.109+ | Async, OpenAPI auto | fastapi.tiangolo.com |
| Database | PostgreSQL | 15+ | JSONB, performance | postgresql.org |
| ORM | SQLAlchemy | 2.0+ | Async support | sqlalchemy.org |
| Migrations | Alembic | 1.13+ | Padrao mercado | alembic.sqlalchemy.org |
| Queue | BackgroundTasks | - | Simples para MVP | fastapi docs |
| Processing | Unstructured | 0.12+ | Multi-formato | unstructured.io |
| Embeddings | OpenAI | - | Qualidade | openai.com |
| Vector DB | pgvector | 0.5+ | Integrado PG | github.com/pgvector |

---

## FORMATO 2: Jira CSV

Gerar `exports/jira-import.csv`:

```csv
Summary,Description,Issue Type,Priority,Epic Link,Story Points,Acceptance Criteria,Labels
"[EPIC] Core API Development","Endpoints principais da API REST",Epic,Critical,,,,"backend,api"
"Como usuario, quero fazer upload de documentos","Endpoint POST /documents para upload de arquivos PDF ate 25MB",Story,Critical,EPIC-002,8,"- Aceitar PDF ate 25MB
- Mostrar progresso
- Validar formato","upload,mvp"
"Implementar validacao de arquivo","Validar tipo MIME e tamanho antes de processar",Sub-task,High,,2,"- Validar PDF
- Max 25MB
- Erro claro",
```

**Instrucoes de Import:**
```
1. Jira > Project Settings > External System Import > CSV
2. Mapear campos conforme cabecalho
3. Criar custom field "Acceptance Criteria" se nao existir
4. Executar import
5. Ajustar Epic Links manualmente se necessario
```

---

## FORMATO 3: Trello JSON

Gerar `exports/trello-board.json`:

```json
{
  "name": "RAG Document API",
  "lists": [
    {"name": "Backlog", "cards": [...]},
    {"name": "To Do", "cards": [...]},
    {"name": "In Progress", "cards": [...]},
    {"name": "Review", "cards": []},
    {"name": "Done", "cards": [...]}
  ],
  "labels": [
    {"name": "Epic", "color": "purple"},
    {"name": "Story", "color": "blue"},
    {"name": "Bug", "color": "red"},
    {"name": "Critical", "color": "red"},
    {"name": "High", "color": "orange"}
  ]
}
```

**Instrucoes de Import:**
```
1. Instalar Power-Up "Import/Export" no Trello
2. Board > Menu > More > Import from JSON
3. Selecionar arquivo trello-board.json
4. Ajustar labels e membros
```

---

## FORMATO 4: Notion Markdown

Gerar `exports/notion-database.md`:

```markdown
# RAG Document API - Backlog

## Database Properties
| Property | Type | Options |
|----------|------|---------|
| Status | Select | Backlog, To Do, In Progress, Review, Done |
| Type | Select | Epic, Story, Task, Bug |
| Priority | Select | Critical, High, Medium, Low |
| Points | Number | |
| Epic | Relation | |
| Assignee | Person | |

---

## Epics

### EPIC-002: Core API Development
| Property | Value |
|----------|-------|
| Status | In Progress |
| Priority | Critical |
| Progress | 50% |

**Description:** Endpoints principais da API REST

**Stories:**
- STORY-004: Upload endpoint
- STORY-005: Processing queue
- STORY-006: Status endpoint

---

## Stories

### STORY-004: Como usuario, quero fazer upload
| Property | Value |
|----------|-------|
| Epic | EPIC-002 |
| Status | In Progress |
| Priority | Critical |
| Points | 8 |
| Progress | 50% |

**Acceptance Criteria:**
- [ ] Aceitar PDF ate 25MB
- [ ] Mostrar progresso do upload
- [ ] Validar formato antes de processar
- [ ] Erro claro se falhar
```

**Instrucoes de Import:**
```
1. Criar Database no Notion com propriedades listadas
2. Copiar/colar conteudo ou arrastar arquivo .md
3. Converter para database items
4. Configurar relations entre Epic e Stories
```

---

## FORMATO 5: JSON

Gerar `exports/project-data.json`:

```json
{
  "meta": {
    "version": "1.0",
    "exported_at": "2026-01-26T10:00:00Z",
    "tool": "CE-Context-Engineering/hitit"
  },
  "project": {...},
  "dashboard": {...},
  "roadmap": {...},
  "epics": [...],
  "stories": [...],
  "tasks": [...],
  "decisions": [...],
  "metrics": {...},
  "risks": [...],
  "tech_stack": [...]
}
```

---

## Uso

```bash
# Export Excel completo (recomendado)
/export
/export excel

# Export para ferramenta especifica
/export jira
/export trello
/export notion

# Export JSON para integracoes
/export json

# Export todos os formatos
/export all
```

---

## Arquivos Gerados

```
exports/
├── [projeto]-report.xlsx      # Excel completo (10 abas)
├── jira-import.csv            # Para Jira
├── trello-board.json          # Para Trello
├── notion-database.md         # Para Notion
├── project-data.json          # Para integracoes
└── README.md                  # Instrucoes de uso
```

---

**Context Engineering 2.1** - Exportacao completa para qualquer ferramenta.
