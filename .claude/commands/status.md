# /status - Dashboard Rapido do Projeto

## Objetivo
Mostrar um resumo rapido e acionavel do estado atual do projeto.

---

## Instrucoes para a IA

### 1. Coletar Dados

Ler em paralelo:
- `CLAUDE.md` (nome do projeto)
- `.ai-context.md` (tech stack)
- `doc/task/context-session.md` (status atual)
- `doc/project/manifest.json` (se existir)
- `doc/project/progress.json` (se existir)
- `PRPs/*-todo.md` (progresso de cada PRP)

### 2. Gerar Dashboard

---

## Formato de Saida

### Dashboard Padrao

```
================================================================================
                              PROJECT STATUS
================================================================================

  Project: [Nome do Projeto]
  Phase: [Fase atual] ([X]/6)
  Health: [====] GOOD

--------------------------------------------------------------------------------
                               QUICK STATS
--------------------------------------------------------------------------------

  Overall Progress    |████████████--------| 60%

  Epics      5 total   [##---]  2 done, 1 active, 2 pending
  Stories   23 total   [####-] 14 done, 4 active, 5 pending
  Tasks     67 total   [####-] 42 done, 8 active, 17 pending

--------------------------------------------------------------------------------
                              CURRENT FOCUS
--------------------------------------------------------------------------------

  Active Epic: [Nome do Epic]

  In Progress:
    > [Story 1] (50%)
    > [Story 2] (25%)

  Blockers:
    ! [Descricao do blocker]

--------------------------------------------------------------------------------
                              NEXT ACTIONS
--------------------------------------------------------------------------------

  1. [ ] [Acao 1]
  2. [ ] [Acao 2]
  3. [ ] [Acao 3]

--------------------------------------------------------------------------------
                            RECENT ACTIVITY
--------------------------------------------------------------------------------

  Today:
    + [O que foi feito]

  Yesterday:
    + [O que foi feito]

================================================================================
  Last updated: [timestamp] | Run /roadmap for timeline
================================================================================
```

### Health Indicators

```
[====] GOOD     - Sem blockers, no prazo
[===!] WARNING  - Blockers menores ou pequeno atraso
[==!!] AT RISK  - Blockers significativos
[!!!!] CRITICAL - Problemas graves, acao imediata
```

---

## Variacoes

### /status --mini
Uma linha apenas:
```
[Projeto] | Phase 3 | [====] | 60% | 1 blocker | Next: [acao]
```

### /status --prp [id]
Status de um PRP especifico:
```
================================================================================
                          PRP-01: [Nome]
================================================================================

  Status: In Progress
  Progress: |████████████--------| 60%

  Decisions: 6/6 approved
  Tasks: 18/30 done

  Current:
    > [O que esta sendo feito]

  Next:
    1. [Proxima tarefa]
================================================================================
```

### /status --executive
Resumo para stakeholders:
```
================================================================================
                         EXECUTIVE SUMMARY
================================================================================

  [Projeto] - Status Report
  Date: [data]

  STATUS: ON TRACK [====]

  Progress: 60% complete
  Timeline: On schedule for [data] launch

  Key Achievements:
  - [Conquista 1]
  - [Conquista 2]

  Upcoming Milestones:
  - [Milestone 1]: [data]
  - [Milestone 2]: [data]

  Needs Attention:
  - [Item que precisa atencao]

================================================================================
```

---

## Calculos

### Progresso
```
task_progress = tasks_done / total_tasks
story_progress = sum(task.progress) / len(tasks)
epic_progress = sum(story.progress * story.points) / sum(points)
overall = sum(phase.progress * phase.weight) / sum(weights)
```

### Health Score
```
blockers_score = max(0, 100 - blockers * 25)
progress_score = (actual / planned) * 100
health = (blockers_score + progress_score) / 2

>= 90: GOOD
>= 70: WARNING
>= 50: AT RISK
< 50: CRITICAL
```

---

## Interacao Pos-Status

```
Acoes rapidas:

[1] Ver detalhes do blocker
[2] Abrir roadmap
[3] Ver PRP atual
[4] Exportar relatorio

Digite numero ou 'q' para sair:
```

---

## Exemplo de Uso

```bash
/status              # Dashboard completo
/status --mini       # Uma linha
/status --prp PRP-01 # Status de PRP especifico
/status --executive  # Para stakeholders
```

---

**Context Engineering 2.1** - Visibilidade instantanea do projeto.
