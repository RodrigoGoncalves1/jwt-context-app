# Comando: Pesquisa Especializada por Sub-agente

Você recebeu o comando `/research` com parâmetros: `$ARGUMENTS`

## 🎯 OBJETIVO
Delegar pesquisa especializada para sub-agentes apropriados, otimizando uso de tokens e obtendo expertise específica de domínio.

## 📋 PROCESSO DE EXECUÇÃO

### ETAPA 1: ANÁLISE DA REQUISIÇÃO
1. **PARSE** dos argumentos: `/research <topic> <domain> [--depth=<level>] [--output=<format>]`
2. **IDENTIFICAR** domínio de especialização necessário
3. **DETERMINAR** sub-agente apropriado
4. **DEFINIR** escopo e profundidade da pesquisa

### ETAPA 2: PREPARAÇÃO DO CONTEXTO
1. **LER** `doc/task/context-session.md` para contexto global
2. **IDENTIFICAR** pesquisas relacionadas já realizadas
3. **EVITAR** duplicação de esforços
4. **PREPARAR** brief específico para o sub-agente

### ETAPA 3: DELEGAÇÃO PARA SUB-AGENTE

#### Para DevOps Research:
```bash
# Exemplo: /research "kubernetes monitoring best practices" devops --depth=comprehensive
```
- **FOCO**: Infrastructure, CI/CD, containerização, monitoramento
- **FONTES**: Documentação oficial, CNCF, GitHub repos, best practices
- **DELIVERABLE**: `doc/research_reports/devops_agent/{topic}_report.md`

#### Para ML Research:
```bash
# Exemplo: /research "drift detection algorithms" ml --depth=detailed
```
- **FOCO**: Algoritmos ML, pipelines de dados, model operations
- **FONTES**: Papers, bibliotecas ML, documentação técnica
- **DELIVERABLE**: `doc/research_reports/ml_agent/{topic}_report.md`

#### Para Security Research:
```bash
# Exemplo: /research "OAuth2 implementation patterns" security --depth=practical
```
- **FOCO**: Segurança, compliance, vulnerabilidades, autenticação
- **FONTES**: OWASP, CVE databases, security frameworks
- **DELIVERABLE**: `doc/research_reports/security_agent/{topic}_report.md`

#### Para Documentation Research:
```bash
# Exemplo: /research "FastAPI async patterns" documentation --depth=examples
```
- **FOCO**: APIs, bibliotecas, documentação técnica, standards
- **FONTES**: Documentação oficial, tutoriais, exemplos
- **DELIVERABLE**: `doc/research_reports/documentation_agent/{topic}_report.md`

### ETAPA 4: SÍNTESE E INTEGRAÇÃO

1. **COMPILAR** resultados da pesquisa
2. **EXTRAIR** insights-chave e recomendações
3. **IDENTIFICAR** impactos no projeto atual
4. **ATUALIZAR** `doc/task/context-session.md` com resumo executivo
5. **NOTIFICAR** conclusão da pesquisa

## 📄 TEMPLATE DE RELATÓRIO DE PESQUISA

```markdown
# Relatório de Pesquisa: {TOPIC}

**Sub-agente**: {AGENT_NAME}
**Data**: {TIMESTAMP}
**Profundidade**: {DEPTH_LEVEL}
**Solicitado por**: {REQUESTER}

## 📋 RESUMO EXECUTIVO

### Principais Descobertas
- {KEY_FINDING_1}
- {KEY_FINDING_2}
- {KEY_FINDING_3}

### Recomendações Imediatas
1. {RECOMMENDATION_1}
2. {RECOMMENDATION_2}
3. {RECOMMENDATION_3}

### Impacto no Projeto
{PROJECT_IMPACT_ANALYSIS}

## 🔍 PESQUISA DETALHADA

### Metodologia
{RESEARCH_METHODOLOGY}

### Fontes Consultadas
- {SOURCE_1} - {URL} - {RELEVANCE}
- {SOURCE_2} - {URL} - {RELEVANCE}
- {SOURCE_3} - {URL} - {RELEVANCE}

### Análise Técnica
{TECHNICAL_ANALYSIS}

### Prós e Contras
**Vantagens:**
- {PRO_1}
- {PRO_2}

**Desvantagens:**
- {CON_1}
- {CON_2}

### Comparação de Alternativas
{ALTERNATIVES_COMPARISON}

## 🛠️ IMPLEMENTAÇÃO

### Requisitos Técnicos
{TECHNICAL_REQUIREMENTS}

### Dependências
{DEPENDENCIES}

### Estimativa de Esforço
{EFFORT_ESTIMATION}

### Riscos Identificados
{IDENTIFIED_RISKS}

## 📚 RECURSOS ADICIONAIS

### Documentação
- {DOC_LINK_1}
- {DOC_LINK_2}

### Tutoriais e Exemplos
- {TUTORIAL_1}
- {EXAMPLE_1}

### Ferramentas Recomendadas
- {TOOL_1} - {DESCRIPTION}
- {TOOL_2} - {DESCRIPTION}

## 🔄 PRÓXIMOS PASSOS

1. {NEXT_STEP_1}
2. {NEXT_STEP_2}
3. {NEXT_STEP_3}

---

**Para Implementação**: Use este relatório como referência durante criação do PRP correspondente.
```

## 🎯 OTIMIZAÇÕES DE CONTEXTO

### Token Efficiency:
- **EVITE** duplicar informação já disponível
- **REFERENCIE** arquivos externos em vez de incluir conteúdo
- **USE** resumos executivos para informação de alto nível
- **MANTENHA** detalhes técnicos em arquivos separados

### Cache Optimization:
- **REUTILIZE** pesquisas existentes quando possível
- **VERSIONAMENTO** de relatórios para tracking de mudanças
- **ÍNDICE** de pesquisas realizadas para fácil descoberta

### Context Sharing:
- **ATUALIZE** context-session.md com insights relevantes
- **NOTIFIQUE** outros agentes sobre descobertas relevantes
- **MANTENHA** histórico de decisões baseadas em pesquisa

## 🔄 FLUXO DE TRABALHO

### 1. Recebimento da Requisição
```bash
/research "microservices communication patterns" devops --depth=comprehensive --output=implementation-guide
```

### 2. Análise e Delegação
- Identifica DevOps Agent como apropriado
- Verifica se há pesquisas similares recentes
- Prepara brief específico com contexto do projeto

### 3. Execução da Pesquisa
- Sub-agente realiza pesquisa focada
- Consolida informações de múltiplas fontes
- Aplica filtros baseados no contexto do projeto

### 4. Entrega e Integração
- Relatório salvo em `doc/research_reports/devops_agent/microservices_communication_patterns_report.md`
- Resumo executivo adicionado ao context-session.md
- Notificação de conclusão enviada

## 📊 MÉTRICAS DE QUALIDADE

### Para Cada Pesquisa:
- **Relevância**: Score 1-10 baseado em aplicabilidade
- **Completude**: Cobertura dos aspectos solicitados
- **Atualidade**: Idade das fontes consultadas
- **Actionability**: Clareza das recomendações

### Tracking:
- Número de pesquisas por domínio
- Tempo médio de pesquisa por complexidade
- Utilização dos relatórios em PRPs
- Feedback de qualidade dos usuários

---

**LEMBRE-SE**: O objetivo é otimizar tokens fornecendo expertise especializada. Sub-agentes devem retornar resumos concisos com referências detalhadas, não dumps de informação.
