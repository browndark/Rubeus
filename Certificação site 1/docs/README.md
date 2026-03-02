# Documentação - Projeto QA Certificação

Índice centralizado de toda a documentação do projeto de Quality Assurance.

---

## Estrutura de Documentação

```
docs/
├── README.md                      ← Você está aqui
├── ISSUES.md                      Problemas catalogados (7 issues)
├── TESTE_EXPLORATORIO.md          Guia de testes exploratórios (14 casos)
└── diagrama/                      Diagramas de arquitetura
    ├── README.md                  Índice de diagramas
    ├── fluxo-testes/              Fluxo de execução
    ├── arquitetura/               Componentes do projeto
    ├── formulario/                Estrutura da 4 etapas
    └── casos-uso/                 Casos de uso do sistema
```

---

## Documentos Principais

### 1. ISSUES.md
**Localização**: [docs/ISSUES.md](ISSUES.md)

**O que contém**:
- 7 issues catalogadas (2 CRÍTICAS + 2 ALTAS + 2 MÉDIAS + 1 DESCOBERTA)
- Severidade, Status e Prioridade de cada issue
- Impacto nos testes Robot Framework
- Soluções propostas

**Quando consultar**:
- Antes de fazer deploy (verificar bloqueadores)
- Ao considerar refatoração do código
- Para entender falhas nos testes

**Issues Catalogadas**:
- #001 - ActionsForm Não Definida (CRÍTICA)
- #002 - Falta de Headings (ALTA)
- #003 - Falta de Textarea (MÉDIA)
- #004 - DOCTYPE Não Declarado (MÉDIA)
- #005 - Checkbox Não Localizado (CRÍTICA)
- #006 - Erro de Tipagem em Handlers (ALTA)
- #007 - Formulário Multi-Etapa Sem Validação (ALTA) - **Descoberta**

---

### 2. TESTE_EXPLORATORIO.md
**Localização**: [docs/TESTE_EXPLORATORIO.md](TESTE_EXPLORATORIO.md)

**O que contém**:
- 14 casos de teste exploratório detalhados
- Descrição de cada técnica de teste
- Passos para executar
- Resultados esperados

**Técnicas Cobertas**:
1. Exploratório de Navegação
2. Exploratório de Validação
3. Exploratório de Comportamento
4. Exploratório de Intuitibilidade
5. Teste de Responsividade
6. Teste de Performance
7. Teste de Segurança
8. Teste de SEO
9. Teste de Conteúdo
10. Teste de Interatividade
11. Teste de Acessibilidade
12. DevTools Analysis

**Quando consultar**:
- Para entender o que cada teste exploratório faz
- Para adicionar novos casos de teste
- Para reproduzir falhas

---

### 3. Diagramas de Arquitetura
**Localização**: [docs/diagrama/](diagrama/)

**Subpastas**:

#### Fluxo-Testes/
- **execucao-testes.puml**: Fluxo completo de execução de testes
  - Setup até análise de resultados
  - Decisão de qual suite executar
  - Validações intermediárias

#### Arquitetura/
- **componentes.puml**: Arquitetura geral do projeto
  - Relacionamento entre frameworks
  - Integração com sistema alvo
  - Documentação de suporte

#### Formulario/
- **fluxo-4-etapas.puml**: Navegação pelo formulário multi-etapa
  - Detailhes de cada ETAPA (1-4)
  - Validações esperadas
  - Fluxo de submissão

#### Casos-Uso/
- **sistema-certificacao.puml**: Casos de uso do sistema
  - Atores: Usuário, QA, DevOps, Backend
  - Funcionalidades principais
  - Relacionamentos

**Como visualizar**:
1. Online: https://www.plantuml.com/plantuml/uml/
2. VS Code: Extensão "Plant"
3. Local: `plant diagrama/fluxo-testes/execucao-testes.puml`

---

## Guia Rápido por Caso de Uso

### Sou QA Engineer...

**Preciso entender o que foi testado**
→ Leia [TESTE_EXPLORATORIO.md](TESTE_EXPLORATORIO.md)

**Preciso saber quais problemas existem**
→ Consulte [ISSUES.md](ISSUES.md)

**Preciso visualizar a arquitetura**
→ Veja [diagrama/arquitetura/](diagrama/arquitetura/)

**Preciso entender o fluxo de testes**
→ Estude [diagrama/fluxo-testes/](diagrama/fluxo-testes/)

---

### Sou Developer...

**Preciso entender o formulário**
→ Veja [diagrama/formulario/fluxo-4-etapas.puml](diagrama/formulario/fluxo-4-etapas.puml)

**Preciso saber quais issues precisam ser corrigidas**
→ Leia [ISSUES.md](ISSUES.md) (filtrar por CRÍTICA/ALTA)

**Preciso ver as validações esperadas**
→ Consulte [TESTE_EXPLORATORIO.md](TESTE_EXPLORATORIO.md)

---

### Sou DevOps/Build...

**Preciso entender como os testes funcionam**
→ Veja [diagrama/fluxo-testes/](diagrama/fluxo-testes/)

**Preciso dos casos de uso do CI/CD**
→ Consulte [diagrama/casos-uso/](diagrama/casos-uso/)

---

## Resumo de Documentação

| Documento | Tipo | Atualizado | Status |
|-----------|------|-----------|--------|
| ISSUES.md | Rastreador | 27/02/2026 | 7 issues |
| TESTE_EXPLORATORIO.md | Guia | 27/02/2026 | 14 casos |
| diagrama/ | Diagramas | 27/02/2026 | 4 subpastas |

---

## Links Úteis

### Dentro do Projeto
- [../../README.md](../README.md) - Guia principal de testes
- [../../robot/README.md](../robot/README.md) - Robot Framework
- [../../robot/QUICKSTART.md](../robot/QUICKSTART.md) - Setup rápido Robot

### Externos
- [PlantUML Online](https://www.plantuml.com/plantuml/uml/)
- [Robot Framework Docs](https://robotframework.org/)
- [Cypress Docs](https://docs.cypress.io/)

---

## Versionamento

**Última Atualização**: 27/02/2026  
**Versão**: 1.0.0  
**Status**: Production Ready

---

## Sugestões de Documentação Futura

- [ ] Adicionar diagrama de erro/tratamento de exceções
- [ ] Documentar setup de CI/CD (Jenkins, GitHub Actions, GitLab)
- [ ] Criar glossário de termos
- [ ] Documentar padrões de nomenclatura
- [ ] Adicionar exemplos de output de testes
