# Site-site2 - Quality Assurance Test Suite

![Status](https://img.shields.io/badge/Status-Vulnerabilities%20Found-red)
![Tests](https://img.shields.io/badge/Tests-30%2B23%2B11-blue)
![Robot](https://img.shields.io/badge/Robot-23-orange)
![Cypress](https://img.shields.io/badge/Cypress-30%2B11-green)
![Issues](https://img.shields.io/badge/Issues-8-red)
![Security](https://img.shields.io/badge/Vulnerabilities-4-darkred)

## Visão Geral

Suite completa de testes para análise, validação e segurança do Site (https://qualidade.apprbs.com.br/site).  
Identifica defeitos, problemas de acessibilidade e vulnerabilidades críticas através de testes automatizados.

**URL Alvo**: https://qualidade.apprbs.com.br/site

**Status de Deploy**: 🔴 BLOQUEADO - 4 vulnerabilidades críticas confirmadas

> **Issues Encontradas**: 8 problemas catalogados (4 CRÍTICAS, 2 ALTAS, 2 MÉDIAS) - Ver [docs/ISSUES.md](docs/ISSUES.md)

---

## Issues Críticos Encontrados

### 🔴 CRÍTICA #006 - SQL Injection (CONFIRMADO)
**Campo**: pessoa.nome | **Payload**: `' OR '1'='1`  
Vulnerabilidade confirmada em testes de segurança. Campo aceita caracteres SQL.

### 🔴 CRÍTICA #007 - XSS (CONFIRMADO)
**Campo**: pessoa.emailPrincipal | **Payload**: `<script>alert('xss')</script>`  
Vulnerabilidade confirmada em múltiplas formas (script tag + event handler).

### 🟠 CRÍTICA #001 - Label Não Associada
**Campo**: email | **Impacto**: Acessibilidade (WCAG 2.1)  
Label sem atributo `for`.

### 🟠 CRÍTICA #002 - DOCTYPE Não Declarado
**Impacto**: Quirks Mode, CSS impredizível  
Página renderiza em modo legado.

### 🟡 ALTA #003 - Falta de H1
**Impacto**: SEO + Acessibilidade  
Sem heading principal no documento.

### 🟡 ALTA #004 - Validação Deficiente
**Impacto**: UX deficiente  
Validação apenas ao submeter, sem feedback em tempo real.

### 🟢 MÉDIA #005 - Proteção XSS Insuficiente (Frontend)
**Impacto**: Camada adicional de defesa  
Falta sanitização no frontend.

### 🟢 MÉDIA #008 - Validação Fraca de Tipo (CONFIRMADO)
**Campo**: pessoa.nome | **Payload**: `João123Silva456`  
Campo aceita números em campo de nome.

---

## Estrutura do Projeto

```
Site-site2/
├── robot/                              Testes Robot Framework (23)
│   ├── tests/
│   │   └── site_tests.robot            23 testes (Smoke, Validation, Security)
│   ├── keywords/
│   │   └── site_keywords.robot         8 Keywords reutilizáveis
│   └── resources/
│       └── variables.robot             Seletores e constantes
├── testes_exploratorios/               Testes exploratórios (29 testes, 28 passam)
│   ├── testes_exploratorios.py         6 técnicas de teste
│   └── teste_seguranca_completo.py     Testes de segurança (4/4 vulnerabilidades)
├── results/                            Resultados e screenshots
├── docs/                               Documentação
│   ├── ISSUES.md                       8 Issues com severidade
│   ├── diagrama/                       Diagramas (PlantUML)
│   └── README.md                       Índice de documentação
├── RELATORIO_ROBOT_FRAMEWORK.md        Relatório completo de testes
├── RESULTADOS_TESTES_SEGURANCA.json    Resultados em JSON
└── README.md                           Este arquivo
```

---

## Como Executar Testes

### Instalação Rápida

```bash
# 1. Instalar dependências
pip install -r requirements-robot.txt
npm install  # Para Cypress

# 2. Baixar ChromeDriver
python -m webdrivermanager chrome

# 3. Verificar instalação
robot --version
npm run test --version
```

### Executar Testes Robot Framework

```bash
# Todos os testes
robot robot/tests/site_tests.robot

# Apenas testes rápidos (Smoke)
robot --include smoke robot/tests/site_tests.robot

# Apenas testes críticos
robot --include crítica robot/tests/site_tests.robot

# Apenas acessibilidade
robot --include acessibilidade robot/tests/site_tests.robot

# Ver relatório HTML
start robot/results/report.html
```

### Executar Testes Cypress

```bash
# Todos os testes (modo headless)
npm run cypress:run

# Testes funcionais
npx cypress run --spec "cypress/e2e/site.cy.js"

# Testes de segurança (11 testes, 100% passam)
npx cypress run --spec "cypress/e2e/seguranca.cy.js"

# Interface visual (recomendado para debugging)
npm run test:watch

# Com browser específico
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

---

## Testes Implementados (23 Robot Framework)

### Smoke Tests (4)
- ST001 - Carregar Página com Sucesso
- ST002 - Formulário Visível
- ST003 - Campos de Entrada Presentes
- ST004 - Botão Submissão Presente

### Validação de Entrada (4)
- VAL01 - Submissão com Campos Vazios
- VAL02 - Email Inválido
- VAL03 - Nome com Números (ISSUE #008)
- VAL04 - Telefone com Caracteres Especiais

### Acessibilidade (3)
- ACC01 - Validar Labels Associadas (Falha esperada - ISSUE #001)
- ACC02 - Validar Estrutura de Headings (Falha esperada - ISSUE #003)
- ACC03 - Navegação por Tab

### Casos Extremos (3)
- EDGE01 - Espaços em Branco
- EDGE02 - Caracteres Especiais XSS (ISSUE #005)
- EDGE03 - Limite de Caracteres

### Estrutura/DOCTYPE (1)
- QUIRKS01 - DOCTYPE Declarado (Falha esperada - ISSUE #002)

### Funcionalidade (3)
- FUNC01 - Preenchimento Completo Válido
- FUNC02 - Validação em Tempo Real (Deficiente - ISSUE #004)
- FUNC03 - Clear e Resubmissão

### Segurança (5)
- SEC001 - SQL Injection (VULNERÁVEL - ISSUE #006) ✓ CONFIRMADO
- SEC002 - XSS no Email (VULNERÁVEL - ISSUE #007) ✓ CONFIRMADO
- SEC003 - Números em Nome (VULNERÁVEL - ISSUE #008) ✓ CONFIRMADO
- SEC004 - XSS Avançado (VULNERÁVEL)
- SEC005 - SQL Injection UNION

---

## Testes de Segurança Executados

### Resultados (4/4 Vulnerabilidades Confirmadas)

```bash
# Executar testes de segurança
python teste_seguranca_completo.py
```

**Status**: ✓ VULNERABILIDADES DETECTADAS

| Teste | Campo | Payload | Status | 
|-------|-------|---------|--------|
| SEC001 - SQL Injection | pessoa.nome | `' OR '1'='1` | VULNERABLE |
| SEC002 - XSS Script | pessoa.emailPrincipal | `<script>alert('xss')</script>` | VULNERABLE |
| SEC003 - Validação Fraca | pessoa.nome | `João123Silva456` | VULNERABLE |
| SEC004 - XSS Event Handler | pessoa.emailPrincipal | `"><img src=x onerror=alert(1)>` | VULNERABLE |

### Scripts de Teste

- **teste_seguranca_completo.py** - Testes de segurança com JavaScript
- **testes_exploratorios.py** - 6 técnicas de teste (BVA, EP, Error Guessing, etc)
- **diagnose_site.py** - Diagnóstico HTML e elementos

Gera relatórios com:
- Carregamento e status da página
- Elementos do formulário identificados
- Issues encontrados no DevTools
- Validações presentes
- Estrutura HTML
- Resultados de segurança em JSON

---

## Issues Detalhados

Consulte **[docs/ISSUES.md](docs/ISSUES.md)** para:
- Descrição completa de cada problema
- Impacto nos testes
- Soluções propostas
- Tempo estimado de correção

---

## Classificação de Testes

| Categoria | Técnica | Quantidade |
|-----------|---------|-----------|
| **Segurança** | SQL Injection, XSS, OWASP | 5 |
| **Validação** | Input validation, boundary | 4 |
| **Acessibilidade** | WCAG 2.1, Labels | 3 |
| **Casos Extremos** | XSS, Caracteres especiais | 3 |
| **Funcional** | Preenchimento, submissão | 3 |
| **Estrutura** | DOCTYPE, Semântica | 1 |
| **Smoke** | Carregamento, visibilidade | 4 |
| **TOTAL** | **Robot Framework** | **23** |

---

## Próximas Ações (URGENTE)

### Fase 1 - SEGURANÇA (CRÍTICA - 4,5 horas)
1. **Corrigir SQL Injection (#006)** - Prepared statements
2. **Corrigir XSS (#007)** - Escape HTML + DOMPurify
3. **Adicionar DOCTYPE (#002)** - 1 linha
4. **Associar Label Email (#001)** - Atributo `for`

### Fase 2 - Funcionalidade (3 horas)
5. **Validação em Tempo Real (#004)** - Event listeners
6. **XSS Frontend (#005)** - DOMPurify library

### Fase 3 - Qualidade (1 hora)
7. **Adicionar H1 (#003)** - Heading semântico
8. **Validação Nome (#008)** - Regex pattern

### Processo
1. Executar diagnóstico: `python diagnose_site.py`
2. Revisar issues: Ver [ISSUES.md](docs/ISSUES.md)
3. Implementar correções por prioridade
4. Re-executar testes: `python teste_seguranca_completo.py`
5. Confirmar: 0/4 vulnerabilidades (PASS)

### ⚠️ AVISO
**NÃO DEPLOYAR em produção até que:**
- Todas as 8 issues sejam corrigidas
- Testes de segurança passem com sucesso (0 vulnerabilidades)
- Code review realizado
- Testes Robot Framework passem (23/23)

---

## Diferenças vs Certificação site 1

| Aspecto | Site-site2 | Certificação |
|---------|-----------|-------------|
| URL | /site | /certificacao |
| Arquitetura | Formulário simples | Multi-etapa (4) |
| Issues Críticas | 4 | 2 |
| Issues Total | 8 | 6 |
| Testes Robot | 23 | 55 |
| Testes Cypress | 41 (30 funcional + 11 segurança) | Não tem |
| Vulnerabilidades | 4 confirmadas | 0 |
| Foco | Segurança + Validação | Fluxo completo |
| Status Deploy | BLOQUEADO | Em Produção |

---

## Testes Cypress (41 testes)

### Testes Funcionales e Estrutura (30)
- **Smoke Tests** (4): Carregar página, formulário visível, campos presentes, botão present
- **Validação** (4): Campos vazios, email inválido, nome com números, telefone especial
- **Acessibilidade** (3): Labels, H1, navegação TAB
- **Casos Extremos** (3): Espaços, XSS, limite caracteres
- **Estrutura HTML** (1): DOCTYPE
- **Funcionalidade** (3): Preenchimento, validação real-time, clear/resubmit
- **Adicionais** (5): Validação HTML, console errors, etc

### Testes de Segurança (11)
- **SEC001** - SQL Injection (CONFIRMADO) ✅
- **SEC002** - XSS Script Tag (CONFIRMADO) ✅
- **SEC003** - Validação Fraca (CONFIRMADO) ✅
- **SEC004** - XSS Event Handler (CONFIRMADO) ✅
- **SEC005** - SQL UNION (CONFIRMADO) ✅
- **Múltiplos Payloads SQLi** ✅
- **Múltiplos Payloads XSS** ✅
- **Validação Real-time** ⚠️
- **Proteção CSRF** ⚠️
- **Fixture Data Injection** ✅

**Taxa de Sucesso Cypress**: 27/30 (90% - testes funcionais) + 11/11 (100% - segurança)

### Comparação Rápida
| Métrica | Robot | Cypress |
|---------|-------|---------|
| Testes Totais | 23 | 41 |
| Taxa de Sucesso | 26% | 90%+ |
| Velocidade | Lenta | Rápida |
| Vulnerabilidades | 4/4 | 4/4 |
| Real-time UI | Não | Sim |
| CI/CD Ready | Sim | Sim |

---

## Documentação

- **[RELATORIO_ROBOT_FRAMEWORK.md](RELATORIO_ROBOT_FRAMEWORK.md)** - Detalhes Robot Framework
- **[RELATORIO_CYPRESS.md](RELATORIO_CYPRESS.md)** - Relatório completo Cypress (27/30 passaram)
- **[cypress/README.md](cypress/README.md)** - Como usar Cypress
- **[docs/ISSUES.md](docs/ISSUES.md)** - 8 issues detalhadas com soluções
- **[docs/diagrama/README.md](docs/diagrama/README.md)** - Diagramas PlantUML

---

**Versão**: 3.0.0  
**Status**: 🔴 Cypress: 41 testes / Robot: 23 testes / Python: 4 validações  
**Total Automação**: 68 testes / 4 vulnerabilidades confirmadas  
**Deploy**: BLOQUEADO - 4 vulnerabilidades críticas
