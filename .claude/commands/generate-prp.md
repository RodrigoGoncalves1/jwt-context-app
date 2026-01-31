# Comando: Gerar PRP (Prompt de Requisitos de Produto)

Você recebeu o comando `/generate-prp` com o arquivo de requisição inicial como argumento: `$ARGUMENTS`

## 🎯 OBJETIVO
Gerar um Prompt de Requisitos de Produto (PRP) abrangente e otimizado para implementação autônoma, baseado no arquivo INITIAL.md fornecido.

## 📋 PROCESSO DE EXECUÇÃO

### ETAPA 1: LEITURA E ANÁLISE INICIAL
1. **LER** o arquivo INITIAL.md fornecido em `$ARGUMENTS`
2. **VERIFICAR** se todas as seções obrigatórias estão preenchidas
3. **IDENTIFICAR** gaps de informação que precisam ser pesquisados
4. **DETERMINAR** quais sub-agentes especializados devem ser acionados

### ETAPA 2: GESTÃO DE CONTEXTO
1. **CRIAR/ATUALIZAR** `doc/task/context-session.md` com:
   - Resumo do projeto e objetivos
   - Tecnologias identificadas
   - Dependências conhecidas
   - Timeline e prioridades
2. **DEFINIR** estrutura para relatórios de pesquisa em `doc/research_reports/`

### ETAPA 3: ORQUESTRAÇÃO DE SUB-AGENTES
Para cada área que necessita pesquisa especializada, acione os sub-agentes apropriados:

#### DevOps Agent
- **QUANDO**: Infraestrutura, CI/CD, containerização, deploy
- **PESQUISAR**: 
  - Arquiteturas de deployment
  - Best practices de infraestrutura
  - Ferramentas de CI/CD apropriadas
  - Estratégias de monitoramento
- **SALVAR EM**: `doc/research_reports/devops_agent/`

#### ML Agent  
- **QUANDO**: Machine Learning, pipelines de dados, modelos
- **PESQUISAR**:
  - Algoritmos e frameworks apropriados
  - Pipelines de dados e feature engineering
  - Model serving e monitoring
  - Métricas de avaliação
- **SALVAR EM**: `doc/research_reports/ml_agent/`

#### Security Agent
- **QUANDO**: Segurança, compliance, autenticação
- **PESQUISAR**:
  - Vulnerabilidades conhecidas
  - Best practices de segurança
  - Compliance requirements
  - Estratégias de autenticação/autorização
- **SALVAR EM**: `doc/research_reports/security_agent/`

#### Documentation Agent
- **QUANDO**: APIs externas, bibliotecas, standards
- **PESQUISAR**:
  - Documentação oficial atualizada
  - Exemplos de implementação
  - Limitações e gotchas conhecidos
  - Versioning e compatibility
- **SALVAR EM**: `doc/research_reports/documentation_agent/`

### ETAPA 4: SÍNTESE E CRIAÇÃO DO PRP
1. **COMPILAR** resultados de pesquisa dos sub-agentes
2. **REFERENCIAR** (não incluir completamente) conteúdo detalhado dos relatórios
3. **CRIAR** blueprint detalhado com base no template PRP
4. **INCLUIR** todo.md integrado para manter foco durante implementação
5. **DEFINIR** validações e testes específicos

## 📄 TEMPLATE PRP A SEGUIR

Crie o arquivo `PRPs/{nome-da-feature}.md` seguindo esta estrutura:

```markdown
# PRP: [Nome da Funcionalidade]

## 📋 CONTEXTO E OBJETIVOS

### Resumo Executivo
[Baseado no INITIAL.md, resumo claro dos objetivos]

### Contexto do Negócio
[Por que esta funcionalidade é importante]

### Referências de Pesquisa
- DevOps: `doc/research_reports/devops_agent/{feature}_report.md`
- ML: `doc/research_reports/ml_agent/{feature}_report.md`  
- Security: `doc/research_reports/security_agent/{feature}_report.md`
- Documentation: `doc/research_reports/documentation_agent/{feature}_report.md`

## 🏗️ ARQUITETURA E DESIGN

### Arquitetura Geral
[Diagrama textual e descrição da arquitetura]

### Stack Tecnológico Final
[Decisões finais baseadas na pesquisa]

### Padrões de Design
[Patterns arquiteturais a serem seguidos]

## 📝 TODO.MD INTEGRADO

### Objetivos Principais
- [ ] [Objetivo 1 - específico e mensurável]
- [ ] [Objetivo 2 - específico e mensurável]
- [ ] [Objetivo 3 - específico e mensurável]

### Fases de Implementação
#### Fase 1: Setup e Infraestrutura
- [ ] [Tarefa específica 1]
- [ ] [Tarefa específica 2]

#### Fase 2: Core Implementation  
- [ ] [Tarefa específica 1]
- [ ] [Tarefa específica 2]

#### Fase 3: Testing e Validação
- [ ] [Tarefa específica 1]
- [ ] [Tarefa específica 2]

#### Fase 4: Deploy e Monitoramento
- [ ] [Tarefa específica 1]
- [ ] [Tarefa específica 2]

### Próximos Passos Imediatos
1. [Primeira ação concreta]
2. [Segunda ação concreta]
3. [Terceira ação concreta]

## 🔧 IMPLEMENTAÇÃO DETALHADA

### Componente 1: [Nome do Componente]
**Arquivo**: `src/components/component1.py`
**Responsabilidade**: [Descrição clara]
**Dependências**: [Lista de dependências]

**Implementação**:
```python
# Estrutura esperada com comentários
```

**Testes**:
- Unit tests em `tests/unit/test_component1.py`
- Integration tests em `tests/integration/test_component1_integration.py`

### Componente 2: [Nome do Componente]
[Repetir estrutura...]

## 🧪 ESTRATÉGIA DE TESTES

### Testes Unitários
[Especificações dos testes unitários]

### Testes de Integração  
[Especificações dos testes de integração]

### Testes End-to-End
[Especificações dos testes E2E]

### Performance Tests
[Benchmarks e métricas esperadas]

## 🚨 TRATAMENTO DE ERROS

### Cenários de Erro Conhecidos
1. [Erro 1]: [Como tratar]
2. [Erro 2]: [Como tratar]

### Logging e Monitoramento
[Estratégia de logs e métricas]

### Recovery Strategies
[Estratégias de recuperação automática]

## ✅ CRITÉRIOS DE VALIDAÇÃO

### Funcionalidade
- [ ] [Critério mensurável 1]
- [ ] [Critério mensurável 2]

### Performance
- [ ] [Métrica de performance 1]
- [ ] [Métrica de performance 2]

### Segurança
- [ ] [Requisito de segurança 1]
- [ ] [Requisito de segurança 2]

### Qualidade de Código
- [ ] Cobertura de testes > 80%
- [ ] Linting sem erros
- [ ] Security scan clean

## 🚀 PLANO DE DEPLOY

### Environments
[Estratégia de deployment]

### Rollback Strategy
[Plano de rollback]

### Monitoring Post-Deploy
[Métricas a monitorar após deploy]

## 📊 MÉTRICAS DE SUCESSO

### Métricas Técnicas
[KPIs técnicos]

### Métricas de Negócio
[KPIs de negócio]

---

**INSTRUÇÕES PARA EXECUÇÃO**: 
Use o comando `/execute-prp PRPs/{nome-da-feature}.md` para implementar este PRP de forma autônoma.
```

## 🎯 RESULTADO ESPERADO

Ao final deste comando, você deve ter:
1. ✅ Arquivo PRP completo em `PRPs/{nome-da-feature}.md`
2. ✅ Context session atualizado em `doc/task/context-session.md`
3. ✅ Relatórios de pesquisa detalhados em `doc/research_reports/`
4. ✅ Todo.md integrado para manter foco durante implementação
5. ✅ Validações e testes claramente definidos

## 🔄 PRÓXIMOS PASSOS

Após gerar o PRP:
1. **REVISAR** o PRP gerado para accuracy e completude
2. **AJUSTAR** se necessário baseado em conhecimento específico do domínio
3. **EXECUTAR** usando `/execute-prp PRPs/{nome-da-feature}.md`

---

**LEMBRE-SE**: Mantenha o prefixo do prompt estável para otimizar KV-cache. Referencie arquivos externos em vez de incluir conteúdo completo. Use sub-agentes para pesquisa especializada e retorne resumos concisos.
