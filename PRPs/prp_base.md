# TEMPLATE BASE PARA PRP (Prompt de Requisitos de Produto)

**INSTRUÇÕES DE USO**: Este template é preenchido automaticamente pelo comando `/generate-prp` baseado no arquivo INITIAL.md. Não edite manualmente este template.

---

# PRP: {FEATURE_NAME}

## 📋 CONTEXTO E OBJETIVOS

### Resumo Executivo
{EXECUTIVE_SUMMARY}

### Contexto do Negócio
{BUSINESS_CONTEXT}

### Valor Entregue
{VALUE_PROPOSITION}

### Referências de Pesquisa
- **DevOps Research**: `doc/research_reports/devops_agent/{feature}_report.md`
- **ML Research**: `doc/research_reports/ml_agent/{feature}_report.md`  
- **Security Research**: `doc/research_reports/security_agent/{feature}_report.md`
- **Documentation Research**: `doc/research_reports/documentation_agent/{feature}_report.md`
- **Testing Strategy**: `doc/research_reports/testing_agent/{feature}_report.md`

## 🏗️ ARQUITETURA E DESIGN

### Arquitetura Geral
```
{ARCHITECTURE_DIAGRAM}
```

### Stack Tecnológico Final
{TECH_STACK}

### Padrões de Design
{DESIGN_PATTERNS}

### Integrações Necessárias
{INTEGRATIONS}

## 📝 TODO.MD INTEGRADO

### 🎯 Objetivos Principais
- [ ] {OBJECTIVE_1}
- [ ] {OBJECTIVE_2}
- [ ] {OBJECTIVE_3}

### 🚀 Fases de Implementação

#### Fase 1: Setup e Infraestrutura
- [ ] {INFRASTRUCTURE_TASK_1}
- [ ] {INFRASTRUCTURE_TASK_2}
- [ ] {INFRASTRUCTURE_TASK_3}

#### Fase 2: Core Implementation  
- [ ] {CORE_TASK_1}
- [ ] {CORE_TASK_2}
- [ ] {CORE_TASK_3}

#### Fase 3: Testing e Validação
- [ ] {TESTING_TASK_1}
- [ ] {TESTING_TASK_2}
- [ ] {TESTING_TASK_3}

#### Fase 4: Deploy e Monitoramento
- [ ] {DEPLOY_TASK_1}
- [ ] {DEPLOY_TASK_2}
- [ ] {DEPLOY_TASK_3}

### ⚡ Próximos Passos Imediatos
1. {IMMEDIATE_STEP_1}
2. {IMMEDIATE_STEP_2}
3. {IMMEDIATE_STEP_3}

## 🔧 IMPLEMENTAÇÃO DETALHADA

### Componente 1: {COMPONENT_1_NAME}
**Arquivo**: `{COMPONENT_1_PATH}`
**Responsabilidade**: {COMPONENT_1_RESPONSIBILITY}
**Dependências**: {COMPONENT_1_DEPENDENCIES}

**Estrutura Esperada**:
```python
{COMPONENT_1_CODE_STRUCTURE}
```

**Testes**:
- Unit tests: `{COMPONENT_1_UNIT_TESTS_PATH}`
- Integration tests: `{COMPONENT_1_INTEGRATION_TESTS_PATH}`

### Componente 2: {COMPONENT_2_NAME}
**Arquivo**: `{COMPONENT_2_PATH}`
**Responsabilidade**: {COMPONENT_2_RESPONSIBILITY}
**Dependências**: {COMPONENT_2_DEPENDENCIES}

**Estrutura Esperada**:
```python
{COMPONENT_2_CODE_STRUCTURE}
```

**Testes**:
- Unit tests: `{COMPONENT_2_UNIT_TESTS_PATH}`
- Integration tests: `{COMPONENT_2_INTEGRATION_TESTS_PATH}`

### Componente N: {COMPONENT_N_NAME}
[Repetir estrutura para cada componente...]

## 🧪 ESTRATÉGIA DE TESTES

### Testes Unitários
{UNIT_TESTING_STRATEGY}

### Testes de Integração  
{INTEGRATION_TESTING_STRATEGY}

### Testes End-to-End
{E2E_TESTING_STRATEGY}

### Performance Tests
{PERFORMANCE_TESTING_STRATEGY}

### Security Tests
{SECURITY_TESTING_STRATEGY}

## 🚨 TRATAMENTO DE ERROS

### Cenários de Erro Conhecidos
{ERROR_SCENARIOS}

### Logging e Monitoramento
{LOGGING_STRATEGY}

### Recovery Strategies
{RECOVERY_STRATEGIES}

### Circuit Breakers e Timeouts
{CIRCUIT_BREAKER_CONFIG}

## 🔒 SEGURANÇA E COMPLIANCE

### Autenticação e Autorização
{AUTH_STRATEGY}

### Proteção de Dados
{DATA_PROTECTION}

### Audit Trail
{AUDIT_REQUIREMENTS}

### Compliance Requirements
{COMPLIANCE_CHECKLIST}

## ✅ CRITÉRIOS DE VALIDAÇÃO

### Funcionalidade
{FUNCTIONAL_CRITERIA}

### Performance
{PERFORMANCE_CRITERIA}

### Segurança
{SECURITY_CRITERIA}

### Qualidade de Código
- [ ] Cobertura de testes > {TEST_COVERAGE_THRESHOLD}%
- [ ] Linting sem erros críticos
- [ ] Security scan sem vulnerabilidades críticas
- [ ] Code review aprovado
- [ ] Documentação atualizada

### Operacional
{OPERATIONAL_CRITERIA}

## 🚀 PLANO DE DEPLOY

### Ambientes
{DEPLOYMENT_ENVIRONMENTS}

### Strategy de Deploy
{DEPLOYMENT_STRATEGY}

### Rollback Strategy
{ROLLBACK_STRATEGY}

### Database Migrations
{DB_MIGRATION_STRATEGY}

### Feature Flags
{FEATURE_FLAGS_CONFIG}

### Monitoring Post-Deploy
{POST_DEPLOY_MONITORING}

## 📊 MÉTRICAS DE SUCESSO

### Métricas Técnicas
{TECHNICAL_METRICS}

### Métricas de Negócio
{BUSINESS_METRICS}

### SLAs e SLOs
{SLA_DEFINITIONS}

### Alerting Rules
{ALERTING_CONFIG}

## 📚 DOCUMENTAÇÃO NECESSÁRIA

### API Documentation
{API_DOCS_REQUIREMENTS}

### Runbooks
{RUNBOOK_REQUIREMENTS}

### User Documentation
{USER_DOCS_REQUIREMENTS}

### Architecture Decision Records
{ADR_REQUIREMENTS}

## 🔄 MANUTENÇÃO E EVOLUÇÃO

### Maintenance Tasks
{MAINTENANCE_TASKS}

### Future Enhancements
{FUTURE_ENHANCEMENTS}

### Technical Debt
{TECH_DEBT_CONSIDERATIONS}

### Deprecation Strategy
{DEPRECATION_PLAN}

---

## 🎯 INSTRUÇÕES PARA EXECUÇÃO

**Comando de Execução**: 
```
/execute-prp PRPs/{feature_name}.md
```

**Pré-requisitos**:
{PREREQUISITES}

**Estimativa de Tempo**: {TIME_ESTIMATE}

**Recursos Necessários**: {REQUIRED_RESOURCES}

---

**Context Engineering 2.0** - Este PRP foi gerado para implementação autônoma seguindo best practices de otimização de tokens e gestão de contexto.
