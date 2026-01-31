# /sprint - Gerenciar Sprints

## Objetivo
Gerenciar sprints de desenvolvimento: planning, execucao, review e retrospectiva.

---

## Instrucoes para a IA

### Subcomandos

```bash
/sprint              # Status do sprint atual
/sprint start        # Iniciar novo sprint
/sprint plan         # Planning colaborativo
/sprint review       # Review das entregas
/sprint retro        # Retrospectiva
/sprint close        # Fechar sprint
```

---

## /sprint (Status Atual)

### Coletar Dados
- `doc/project/manifest.json` (sprint atual)
- `doc/sprints/sprint-[N]/` (dados do sprint)
- `PRPs/*-todo.md` (progresso das stories)

### Formato de Saida

```
================================================================================
                         SPRINT [N] STATUS
================================================================================

  Period: [data inicio] - [data fim]
  Goal: [objetivo do sprint]
  Days remaining: [X]

--------------------------------------------------------------------------------
                              BURNDOWN
--------------------------------------------------------------------------------

Points |████████████████████████████████████████| 30 planned
       |████████████████████-------------------|  18 done
       |████████████---------------------------|  12 remaining

  Day   1    2    3    4    5    6    7    8    9   10
       [====|====|====|====|====|    |    |    |    |    ]
                              ^ today

  Velocity: On track (1.8 pts/day vs 1.5 planned)

--------------------------------------------------------------------------------
                              STORIES
--------------------------------------------------------------------------------

| Story | Title              | Points | Status      | Progress |
|-------|--------------------| -------|-------------|----------|
| S-004 | Upload endpoint    | 8      | In Progress | ████---- |
| S-005 | Processing queue   | 5      | In Progress | ██------ |
| S-006 | Status endpoint    | 5      | To Do       | -------- |
| S-007 | Error handling     | 3      | To Do       | -------- |

  Total: 21 points | Done: 0 | In Progress: 13 | To Do: 8

--------------------------------------------------------------------------------
                              BLOCKERS
--------------------------------------------------------------------------------

  ! [BLOCKER] Rate limiting definition needed
    Impact: S-004 blocked at 50%
    Owner: PO
    Action: Meeting scheduled for tomorrow

================================================================================
```

---

## /sprint start

### Fluxo Interativo

```
Iniciando novo sprint...

Sprint anterior: Sprint 1 (DONE)
  - Velocity: 18 pts entregues
  - Stories: 4/4 done

Novo sprint:

1. Duracao? (default: 2 semanas)
   > [dev escolhe: 1-4 semanas]

2. Data de inicio? (default: hoje)
   > [dev confirma ou ajusta]

3. Goal do sprint?
   > [dev descreve objetivo]

Perfeito! Sprint 2 criado:
- Period: Jan 27 - Feb 10 (2 weeks)
- Goal: [objetivo]

Proximo passo: /sprint plan
```

---

## /sprint plan

### Fluxo de Planning

```
================================================================================
                         SPRINT PLANNING
================================================================================

Sprint 2 | Capacity: ~20 points (based on velocity)

--------------------------------------------------------------------------------
                         BACKLOG DISPONIVEL
--------------------------------------------------------------------------------

| PRP    | Story | Title              | Points | Priority |
|--------|-------|--------------------| -------|----------|
| PRP-01 | S-004 | Upload endpoint    | 8      | Critical |
| PRP-01 | S-005 | Processing queue   | 5      | High     |
| PRP-01 | S-006 | Status endpoint    | 5      | High     |
| PRP-01 | S-007 | Error handling     | 3      | Medium   |
| PRP-01 | S-008 | Rate limiting      | 5      | Medium   |
| PRP-02 | S-009 | /status command    | 3      | High     |

Total backlog: 29 points

--------------------------------------------------------------------------------

Selecione as stories para o sprint:

[1] Adicionar story por ID (ex: S-004)
[2] Adicionar todas de prioridade Critical/High
[3] Sugerir baseado na velocity
[4] Finalizar planning

> 3

Sugestao baseada em velocity (20 pts):
- S-004: Upload endpoint (8 pts) - Critical
- S-005: Processing queue (5 pts) - High
- S-006: Status endpoint (5 pts) - High
- S-009: /status command (3 pts) - High

Total: 21 points (ligeiramente acima, ok?)

> sim

Sprint 2 planejado!

================================================================================
                         SPRINT 2 BACKLOG
================================================================================

| Story | Title              | Points | Owner |
|-------|--------------------| -------|-------|
| S-004 | Upload endpoint    | 8      | -     |
| S-005 | Processing queue   | 5      | -     |
| S-006 | Status endpoint    | 5      | -     |
| S-009 | /status command    | 3      | -     |

Total: 21 points | Goal: [objetivo]

Pronto para comecar! Use /sprint para acompanhar.
================================================================================
```

---

## /sprint review

### Fluxo de Review

```
================================================================================
                         SPRINT 2 REVIEW
================================================================================

Period: Jan 27 - Feb 10
Goal: Complete Core API endpoints

--------------------------------------------------------------------------------
                              RESULTS
--------------------------------------------------------------------------------

  Planned: 21 points
  Delivered: 18 points (86%)

  Status: GOOD - Goal achieved with minor adjustments

--------------------------------------------------------------------------------
                         STORIES DELIVERED
--------------------------------------------------------------------------------

[DONE] S-004: Upload endpoint (8 pts)
  - POST /documents working
  - File validation implemented
  - Tests passing

[DONE] S-005: Processing queue (5 pts)
  - BackgroundTasks configured
  - Status tracking working

[DONE] S-009: /status command (3 pts)
  - Dashboard implemented
  - All flags working

--------------------------------------------------------------------------------
                         NOT DELIVERED
--------------------------------------------------------------------------------

[PARTIAL] S-006: Status endpoint (5 pts → 2 pts delivered)
  - Basic endpoint done
  - Progress tracking pending (moved to Sprint 3)

--------------------------------------------------------------------------------
                            DEMO
--------------------------------------------------------------------------------

Features ready for demo:
1. Upload PDF document
2. Check processing status
3. View project status with /status

Quer fazer a demo agora ou documentar para depois?
================================================================================
```

---

## /sprint retro

### Fluxo de Retrospectiva

```
================================================================================
                      SPRINT 2 RETROSPECTIVE
================================================================================

Vamos refletir sobre o sprint...

--------------------------------------------------------------------------------
                         O QUE FOI BEM?
--------------------------------------------------------------------------------

Me conta o que funcionou bem nesse sprint:
> [dev escreve]

Adicionado:
+ [item 1]
+ [item 2]

Mais algum? (ou 'next' para continuar)
> next

--------------------------------------------------------------------------------
                      O QUE PODE MELHORAR?
--------------------------------------------------------------------------------

O que poderia ter sido melhor?
> [dev escreve]

Adicionado:
- [item 1]
- [item 2]

Mais algum? (ou 'next' para continuar)
> next

--------------------------------------------------------------------------------
                           ACOES
--------------------------------------------------------------------------------

Baseado no feedback, que acoes vamos tomar?
> [dev escreve]

Acoes do Sprint 3:
[ ] [acao 1]
[ ] [acao 2]

--------------------------------------------------------------------------------
                           RESUMO
--------------------------------------------------------------------------------

## Sprint 2 Retro

### O que foi bem
+ [item 1]
+ [item 2]

### O que pode melhorar
- [item 1]
- [item 2]

### Acoes para proximo sprint
[ ] [acao 1]
[ ] [acao 2]

Salvar retro em doc/sprints/sprint-02/retro.md? (s/n)
> s

Retro salva! Sprint 2 pronto para fechar com /sprint close
================================================================================
```

---

## /sprint close

### Fechar Sprint

```
================================================================================
                       CLOSING SPRINT 2
================================================================================

Checklist:
[x] Review realizado
[x] Retro documentada
[x] Stories nao entregues movidas para backlog
[ ] Metricas atualizadas

Atualizando metricas...

Sprint 2 fechado!

Metricas finais:
- Velocity: 18 points
- Commitment: 86% (18/21)
- Carryover: 1 story (3 pts)

Historico de velocidade:
  Sprint 1: 18 pts
  Sprint 2: 18 pts
  Average: 18 pts

Proximo: /sprint start para Sprint 3
================================================================================
```

---

## Arquivos Gerados

```
doc/sprints/
├── sprint-01/
│   ├── plan.md
│   ├── daily/
│   ├── review.md
│   └── retro.md
├── sprint-02/
│   ├── plan.md
│   ├── review.md
│   └── retro.md
└── metrics.json
```

---

## Exemplo de Uso

```bash
/sprint              # Status do sprint atual
/sprint start        # Iniciar novo sprint
/sprint plan         # Planning
/sprint review       # Review
/sprint retro        # Retrospectiva
/sprint close        # Fechar sprint
```

---

**Context Engineering 2.1** - Sprints guiados para entrega consistente.
