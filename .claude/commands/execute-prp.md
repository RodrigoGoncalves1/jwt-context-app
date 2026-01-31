# Comando: Executar PRP (Prompt de Requisitos de Produto)

Você recebeu o comando `/execute-prp` com o arquivo PRP como argumento: `$ARGUMENTS`

## 🎯 OBJETIVO
Implementar de forma autônoma e completa a funcionalidade descrita no PRP, seguindo todos os padrões de qualidade, testes e documentação estabelecidos.

## 📋 PROCESSO DE EXECUÇÃO

### ETAPA 1: CARREGAMENTO DE CONTEXTO
1. **LER** o arquivo PRP especificado em `$ARGUMENTS`
2. **LER** `doc/task/context-session.md` para contexto global do projeto
3. **CARREGAR** relatórios de pesquisa referenciados no PRP
4. **VERIFICAR** dependências e pré-requisitos listados

### ETAPA 2: PLANEJAMENTO DETALHADO
1. **EXTRAIR** todo.md do PRP para manter foco
2. **CRIAR** plano de execução detalhado baseado nas fases
3. **IDENTIFICAR** ordem de implementação ótima
4. **DEFINIR** checkpoints de validação para cada componente

### ETAPA 3: SETUP E PREPARAÇÃO
1. **VERIFICAR** estrutura de diretórios necessária
2. **CRIAR** diretórios ausentes conforme arquitetura definida
3. **CONFIGURAR** ferramentas de desenvolvimento (linting, testing)
4. **PREPARAR** ambiente de desenvolvimento

## 🔧 IMPLEMENTAÇÃO ITERATIVA

Para cada componente definido no PRP:

### Implementação do Componente
1. **CRIAR** arquivo principal do componente
2. **IMPLEMENTAR** lógica core seguindo padrões arquiteturais
3. **APLICAR** patterns de error handling definidos
4. **ADICIONAR** logging estruturado
5. **DOCUMENTAR** código com docstrings apropriadas

### Validação Imediata
1. **EXECUTAR** testes unitários para o componente
2. **VERIFICAR** linting e formatação
3. **EXECUTAR** type checking (se aplicável)
4. **VALIDAR** performance básica

### Integração
1. **INTEGRAR** componente com sistema existente
2. **EXECUTAR** testes de integração
3. **VERIFICAR** impacto em outros componentes
4. **ATUALIZAR** documentação de APIs

## 🧪 PROCESSO DE TESTING

### Testes Unitários
- **CRIAR** testes para cada função/método público
- **IMPLEMENTAR** mocks para dependências externas
- **VERIFICAR** edge cases e error conditions
- **GARANTIR** cobertura mínima definida no PRP

### Testes de Integração
- **CONFIGURAR** ambiente de teste integrado
- **TESTAR** interações entre componentes
- **VALIDAR** integrações com APIs externas
- **VERIFICAR** fluxos end-to-end críticos

### Testes de Performance
- **IMPLEMENTAR** benchmarks conforme especificado
- **EXECUTAR** load testing se requerido
- **VERIFICAR** memory usage e resource consumption
- **VALIDAR** SLAs definidos no PRP

## 🔍 LOOPS DE VALIDAÇÃO E CORREÇÃO

### Para Cada Iteração:
1. **EXECUTAR** suite completa de testes
2. **ANALISAR** resultados e identificar falhas
3. **REGISTRAR** erros em `errors/{feature}_error_log.md`
4. **CORRIGIR** problemas identificados
5. **RE-EXECUTAR** testes para validar correções
6. **CONTINUAR** até todos os critérios serem atendidos

### Critérios de Qualidade:
- ✅ Todos os testes passando
- ✅ Cobertura de testes >= threshold definido
- ✅ Linting sem warnings críticos
- ✅ Security scan clean
- ✅ Performance benchmarks atendidos

## 📊 GESTÃO DE CONTEXTO DURANTE EXECUÇÃO

### Atualização Contínua do Todo.md
À medida que tarefas são completadas:
1. **MARCAR** tarefas como concluídas no todo.md
2. **ATUALIZAR** próximos passos imediatos
3. **ADICIONAR** novos itens descobertos durante implementação
4. **MANTER** foco nos objetivos principais

### Documentação de Progresso
1. **ATUALIZAR** `doc/task/context-session.md` com progresso
2. **REGISTRAR** decisões técnicas importantes tomadas
3. **DOCUMENTAR** desvios do plano original e justificativas
4. **MANTER** histórico de problemas resolvidos

## 🚨 TRATAMENTO DE ERROS E PROBLEMAS

### Quando Erros Ocorrem:
1. **NÃO APAGAR** erros ou stack traces
2. **REGISTRAR** em `errors/{feature}_error_log.md`:
   - Timestamp do erro
   - Contexto completo da operação
   - Stack trace completo
   - Tentativas de resolução
   - Solução final (quando encontrada)

### Aprendizado Implícito:
- **ANALISAR** padrões de erro para evitar repetição
- **APLICAR** lições aprendidas em componentes similares
- **ATUALIZAR** estratégias de implementação baseadas em erros

## 📝 DOCUMENTAÇÃO E DEPLOY

### Documentação Final:
1. **ATUALIZAR** README principal do projeto
2. **GERAR** documentação de API (OpenAPI/Swagger)
3. **CRIAR** runbooks para operação
4. **DOCUMENTAR** troubleshooting comum

### Preparação para Deploy:
1. **CONFIGURAR** pipeline de CI/CD
2. **PREPARAR** configurações por ambiente
3. **IMPLEMENTAR** health checks
4. **CONFIGURAR** monitoramento e alertas

### Deploy Strategy:
1. **SEGUIR** estratégia definida no PRP
2. **EXECUTAR** deploy em ambiente de staging primeiro
3. **VALIDAR** funcionalidade em ambiente real
4. **PREPARAR** rollback se necessário

## ✅ CRITÉRIOS DE CONCLUSÃO

### Validação Final:
- [ ] Todos os critérios de aceitação do PRP atendidos
- [ ] Suite completa de testes passando
- [ ] Documentação atualizada e completa
- [ ] Pipeline de CI/CD funcionando
- [ ] Monitoramento configurado
- [ ] Rollback strategy testada

### Entregáveis:
1. ✅ Código fonte implementado e testado
2. ✅ Testes automatizados com cobertura adequada
3. ✅ Documentação técnica atualizada
4. ✅ Pipeline de deploy configurado
5. ✅ Monitoramento e alertas funcionando
6. ✅ Runbooks operacionais criados

## 🔄 PÓS-IMPLEMENTAÇÃO

### Finalização:
1. **ATUALIZAR** `doc/task/context-session.md` com status final
2. **ARQUIVAR** relatórios de pesquisa se aplicável
3. **LIMPAR** arquivos temporários de desenvolvimento
4. **PREPARAR** handover para time de operações

### Métricas e Monitoramento:
1. **CONFIGURAR** dashboards para métricas definidas
2. **ESTABELECER** baselines de performance
3. **CONFIGURAR** alertas para SLAs
4. **DOCUMENTAR** KPIs e como interpretá-los

---

## 🎯 RESULTADO ESPERADO

Ao final deste comando, você deve ter:
1. ✅ Funcionalidade completamente implementada e testada
2. ✅ Todos os critérios de aceitação do PRP atendidos
3. ✅ Pipeline de CI/CD configurado e funcionando
4. ✅ Documentação técnica completa e atualizada
5. ✅ Monitoramento e alertas operacionais
6. ✅ Sistema pronto para produção

## 🔧 PRINCÍPIOS DURANTE EXECUÇÃO

### Otimização de Contexto:
- **MANTENHA** referências a arquivos externos em vez de conteúdo completo
- **USE** context-session.md como fonte central de verdade
- **ATUALIZE** todo.md constantemente para manter foco
- **REGISTRE** mas não apague erros para aprendizado

### Qualidade:
- **NUNCA** comprometa qualidade por velocidade
- **SEMPRE** execute testes antes de prosseguir
- **VALIDE** cada componente antes de integrar
- **DOCUMENTE** decisões técnicas importantes

---

**LEMBRE-SE**: Este comando é para execução autônoma. Use loops de validação para autocorreção e mantenha o foco nos objetivos através do todo.md integrado.
