# Documentação - Projeto QA Certificação

Índice centralizado de toda a documentação do projeto de Quality Assurance.

---

## Estrutura de Documentação

```
docs/
├── README.md                      ← Você está aqui
├── ISSUES.md                      Problemas catalogados (7 issues)
└── TESTE_EXPLORATORIO.md          Guia de testes exploratórios (14 casos)
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

## Resumo de Documentação

| Documento | Tipo | Atualizado | Status |
|-----------|------|-----------|--------|
| ISSUES.md | Rastreador | 27/02/2026 | 7 issues |
| TESTE_EXPLORATORIO.md | Guia | 27/02/2026 | 14 casos |

