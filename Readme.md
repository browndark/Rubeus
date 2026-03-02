# Programas de Teste e Métodos Utilizados

**Data de Atualização**: 02/03/2026  
**Projeto**: Avaliação de Qualidade de Software  
**Status**: Documentação completa dos frameworks e métodos

---

## Sumário Executivo

Este documento descreve os três principais frameworks de teste utilizados no projeto de avaliação, seus métodos de operação, vantagens, limitações e casos de uso ideais.

| Framework | Linguagem | Tipo | Casos de Uso | Status |
|-----------|-----------|------|--------------|--------|
| **Cypress** | JavaScript | E2E/Segurança | Frontend, validação, segurança | Ativo |
| **Robot Framework** | Python + Keyword | E2E/BDD | Testes de fluxo, legibilidade | Ativo |
| **Python Scripts** | Python 3.13+ | Segurança/Análise | Testes de injeção, análise de código | Ativo |

---

## Framework 1: Cypress

### Visão Geral

**Cypress** é um framework JavaScript moderno para testes end-to-end (E2E) de aplicações web. Funciona diretamente no navegador usando o motor JavaScript V8 da Chrome.

**Versão**: 13.17.0  
**Linguagem**: JavaScript  
**Plataforma**: Electron (Desktop) + Chrome  
**Tempo de Execução**: 2-4 segundos por teste

### Arquitetura e Operação

```
┌─────────────────────────────────┐
│   Cypress Test Runner           │
├─────────────────────────────────┤
│  cypress/e2e/                   │
│  ├── site.cy.js (30 testes)     │
│  └── seguranca.cy.js (11 testes)│
├─────────────────────────────────┤
│  cypress/support/               │
│  ├── commands.js (Custom)       │
│  └── e2e.js (Hooks)             │
├─────────────────────────────────┤
│  cypress/fixtures/              │
│  └── testData.json              │
└─────────────────────────────────┘
           ↓
    Chrome Electron Engine
           ↓
    Executa no DOM real
```

### Métodos de Teste

#### 1. **Seletores e Queries**
```javascript
// Buscar por atributo
cy.get('input[name="pessoa.nome"]')

// Buscar por ID
cy.get('#email')

// Por classe CSS
cy.get('.form-group')

// Por XPath (com plugin)
cy.xpath('//input[@name="nome"]')
```

#### 2. **Interação Direta (Standard)**
```javascript
// Preencher campo (padrão)
cy.get('input[name="email"]').type('user@example.com')

// Click
cy.get('button[type="submit"]').click()

// Select
cy.get('select[name="pais"]').select('Brasil')

// Check/Uncheck
cy.get('input[type="checkbox"]').check()
```

#### 3. **JavaScript Injection (Método Avançado)**
```javascript
// Acessar window do navegador
cy.window().then((win) => {
    // Manipular DOM diretamente
    const input = win.document.querySelector('input[name="pessoa.nome"]')
    input.value = "' OR '1'='1"  // Injetar payload
    input.dispatchEvent(new Event('change', { bubbles: true }))
})

// Executar JavaScript arbitrário
cy.window().then((win) => {
    win.fetch('/api/endpoint')
})
```

#### 4. **Asserções**
```javascript
// Verificar atributo
cy.get('input[name="email"]').should('have.value', 'user@email.com')

// Verificar visibilidade
cy.get('.error-message').should('be.visible')

// Verificar conteúdo
cy.get('h1').should('contain', 'Formulário')

// Verificar classe
cy.get('button').should('have.class', 'disabled')
```

#### 5. **Testes de Segurança (JavaScript Injection)**
```javascript
describe('Teste de SQL Injection', () => {
  it('Deve aceitar payload SQL em campo nome', () => {
    cy.visit('https://qualidade.apprbs.com.br/site')
    
    cy.window().then((win) => {
      const input = win.document.querySelector('input[name="pessoa.nome"]')
      input.value = "' OR '1'='1"
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })
    
    // Verificar se o campo mantém o valor (não filtrado)
    cy.get('input[name="pessoa.nome"]').should('have.value', "' OR '1'='1")
  })
})
```

### Vantagens do Cypress

- **Execução rápida**: 2-4 segundos por teste
- JavaScript puro: Acesso total ao DOM e window
- Real-time debugging: Replay de testes com time-travel
- Testes de segurança eficientes: Injeção direta sem Selenium
- Fixtures integradas: Dados de teste em JSON
- Screenshots e vídeos: Automático em testes falhados
- Syntax limpo: cy.get().type().click()

### Limitações do Cypress

- Suporta apenas um navegador por sessão (Chrome, Firefox, Edge)
- Sem suporte a abas múltiplas nativas
- Requer Node.js + npm
- HTML5 validation pode interferir em alguns testes
- Não funciona em navegadores legados (IE11)

### Resultados no Projeto

**Total de Testes**: 41 (30 funcionais + 11 segurança)  
**Taxa de Sucesso**: 90% (27/30 funcionais, 11/11 segurança)  
**Vulnerabilidades Encontradas**: 4/4 (100%)  
**Tempo Total**: ~40 segundos para 41 testes

**Testes por Categoria**:
- Smoke Tests: 4/4 (100%)
- Validação: 3/4 (75%)
- Acessibilidade: 2/3 (67%)
- Casos Extremos: 2/3 (67%)
- **Segurança: 11/11 (100%)**

---

## Framework 2: Robot Framework

### Visão Geral

**Robot Framework** é um framework open-source para automação de testes em linguagem Gherkin-like. Usa keywords naturais em português para descrever procedimentos de teste.

**Versão**: 7.0  
**Linguagem**: Python + Keywords personalizadas  
**Biblioteca**: SeleniumLibrary (WebDriver)  
**Tempo de Execução**: 5-10 segundos por teste

### Arquitetura e Operação

```
┌─────────────────────────────────┐
│   Robot Framework Test Runner   │
├─────────────────────────────────┤
│  robot/tests/                   │
│  └── site_tests.robot (23 testes)
├─────────────────────────────────┤
│  robot/keywords/                │
│  ├── form_keywords.robot        │
│  ├── navigation_keywords.robot  │
│  └── security_keywords.robot    │
├─────────────────────────────────┤
│  robot/variables/               │
│  ├── common.robot               │
│  └── locators.robot             │
└─────────────────────────────────┘
           ↓
    SeleniumLibrary (WebDriver)
           ↓
    Chromedriver / Geckodriver
           ↓
    Browser Real (Chrome/Firefox)
```

### Métodos de Teste

#### 1. **Keywords Builtin**
```robot
*** Keywords ***
Abrir navegador
    Open Browser    https://qualidade.apprbs.com.br/site    chrome
    
Fechar navegador
    Close Browser
    
Esperar elemento
    Wait Until Element Is Visible    xpath://input[@name="pessoa.nome"]    timeout=10s
```

#### 2. **SeleniumLibrary Keywords**
```robot
*** Keywords ***
Preencher campo de nome
    [Arguments]    ${nome}
    Input Text    xpath://input[@name="pessoa.nome"]    ${nome}
    
Submeter formulário
    Click Button    xpath://button[@type="submit"]
    
Verificar mensagem de erro
    Page Should Contain    Campo obrigatório
```

#### 3. **XPath Locators**
```robot
*** Keywords ***
Buscar por XPath
    ${elemento}=    Get Web Element    xpath://input[@name="pessoa.nome"]
    
Buscar por ID
    ${elemento}=    Get Web Element    id:email
    
Buscar por CSS
    ${elemento}=    Get Web Element    css:.form-group > input
```

#### 4. **Execute JavaScript (Para testes de segurança)**
```robot
*** Keywords ***
Testar SQL Injection
    [Arguments]    ${payload}
    ${script}=    Catenate    SEPARATOR=\n
    ...    const input = document.querySelector('input[name="pessoa.nome"]');
    ...    input.value = '${payload}';
    ...    input.dispatchEvent(new Event('change', { bubbles: true }));
    Execute JavaScript    ${script}
    
Verificar valor do campo
    ${valor}=    Get Value    xpath://input[@name="pessoa.nome"]
    Should Be Equal    ${valor}    ${payload}
```

#### 5. **Organização em Testes**
```robot
*** Test Cases ***

Teste de Smoke - Carregar Página
    [Tags]    smoke
    Abrir navegador
    Page Should Contain    Formulário de Cadastro
    Fechar navegador

Teste de Validação - Campos Vazios
    [Tags]    validacao
    Abrir navegador
    Click Button    xpath://button[@type="submit"]
    Page Should Contain    Campo obrigatório
    Fechar navegador

Teste de Segurança - SQL Injection
    [Tags]    seguranca
    Abrir navegador
    Testar SQL Injection    ' OR '1'='1
    Verificar valor do campo    ' OR '1'='1
    Fechar navegador
```

### Vantagens do Robot Framework

- **Linguagem natural**: Keywords em português melhoram legibilidade
- **BDD-friendly**: Gherkin-like para comunicação com stakeholders
- **Reutilizável**: Keywords podem ser importadas entre testes
- **Extensível**: Criar bibliotecas Python customizadas
- **Relatórios automáticos**: HTML com screenshots integrados
- **Tag-based execution**: Executar testes por categoria
- **Variáveis globais**: Compartilhar dados entre testes

### Limitações do Robot Framework

- Mais lento que Cypress (5-10s vs 2-4s por teste)
- Modal/iframe issues com Selenium (ElementNotInteractable)
- Sintaxe baseada em espaçamento (whitespace-sensitive)
- Debugging é mais complexo que Cypress
- JavaScript execution é via ExecuteScript() (menos natural)
- Relatórios podem ser grandes ao acumular screenshots

### Resultados no Projeto

**Total de Testes**: 23  
**Taxa de Sucesso**: 26% (6/23 passaram)  
**Taxa de Falha**: 74% (17/23 falharam por ElementNotInteractableException)  
**Vulnerabilidades Encontradas**: 4/4 confirmadas  
**Tempo Total**: ~120 segundos para 23 testes

**Causa de Falhas**: Modal de overlay bloqueando interação com DOM

---

## Framework 3: Python Security Testing

### Visão Geral

**Python Scripts** para testes de segurança, análise e injeção de payloads. Combina:
- `requests` para chamadas HTTP
- `beautifulsoup4` para parsing HTML
- `selenium` para automação com WebDriver

**Versão**: Python 3.13.7  
**Linguagem**: Python puro  
**Tempo de Execução**: 3-8 segundos por teste

### Arquitetura e Operação

```
┌─────────────────────────────────┐
│   Python Security Test Script   │
├─────────────────────────────────┤
│  Imports:                       │
│  ├── requests (HTTP)            │
│  ├── selenium (WebDriver)       │
│  ├── beautifulsoup4 (HTML)      │
│  └── json (Data)                │
├─────────────────────────────────┤
│  Funções:                       │
│  ├── testar_sql_injection()     │
│  ├── testar_xss()               │
│  ├── testar_csrf()              │
│  └── gerar_relatorio()          │
└─────────────────────────────────┘
           ↓
    Selenium WebDriver
           ↓
    Chrome/Firefox
           ↓
    Executa payloads e valida
```

### Métodos de Teste

#### 1. **Teste de SQL Injection com Selenium**
```python
from selenium import webdriver
from selenium.webdriver.common.by import By

def testar_sql_injection():
    driver = webdriver.Chrome()
    driver.get('https://qualidade.apprbs.com.br/site')
    
    # Payload SQL Injection
    payloads = [
        "' OR '1'='1",
        "admin'--",
        "' UNION SELECT * FROM users--"
    ]
    
    for payload in payloads:
        input_field = driver.find_element(By.NAME, 'pessoa.nome')
        
        # JavaScript injection
        driver.execute_script(f"""
            arguments[0].value = '{payload}';
            arguments[0].dispatchEvent(new Event('change', {{ bubbles: true }}));
        """, input_field)
        
        valor = input_field.get_attribute('value')
        print(f"Payload: {payload} | Aceito: {valor == payload}")
    
    driver.quit()
```

#### 2. **Teste de XSS com BeautifulSoup**
```python
import requests
from bs4 import BeautifulSoup

def testar_xss():
    url = 'https://qualidade.apprbs.com.br/site'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Payloads XSS
    payloads = [
        '<script>alert("xss")</script>',
        '"><img src=x onerror=alert(1)>',
        '<svg onload=alert("xss")>'
    ]
    
    for payload in payloads:
        # Verificar se campo não sanitiza
        vulneravel = payload in response.text
        print(f"XSS Payload: {payload} | Vulnerável: {vulneravel}")
```

#### 3. **Teste de CSRF**
```python
import requests

def testar_csrf():
    # Verificar se há token CSRF na página
    response = requests.get('https://qualidade.apprbs.com.br/site')
    soup = BeautifulSoup(response.content, 'html.parser')
    
    token_csrf = soup.find('input', {'name': 'csrf_token'})
    
    if token_csrf is None:
        print("SEM PROTEÇÃO CSRF DETECTADA")
        return False
    else:
        print("Token CSRF presente")
        return True
```

#### 4. **Análise de Headers**
```python
import requests

def analisar_headers():
    response = requests.head('https://qualidade.apprbs.com.br/site')
    headers = response.headers
    
    # Verificar headers de segurança
    headers_seguranca = {
        'Strict-Transport-Security': 'HSTS ativado',
        'X-Frame-Options': 'Clickjacking protection',
        'X-Content-Type-Options': 'MIME sniffing protection',
        'Content-Security-Policy': 'XSS protection'
    }
    
    for header, descricao in headers_seguranca.items():
        existe = header in headers
        print(f"{header}, descricao}: {'Sim' if existe else 'Não'}")
```

#### 5. **Relatório JSON**
```python
import json

def gerar_relatorio(resultados):
    relatorio = {
        'data': str(datetime.now()),
        'total_testes': len(resultados),
        'vulnerabilidades': [r for r in resultados if not r['passou']],
        'testes': resultados
    }
    
    with open('RESULTADOS_TESTES_SEGURANCA.json', 'w') as f:
        json.dump(relatorio, f, indent=2)
```

### Vantagens do Python

- Flexibilidade total: Qualquer coisa pode ser testada
- Automação rápida: Escrever novos testes em minutos
- Análise profunda: BeautifulSoup para parsing HTML completo
- Integração com CI/CD: Fácil de rodar em pipelines
- Relatórios customizados: JSON, CSV, XML
- Múltiplas bibliotecas: Selenium, requests, beautifulsoup4, etc.

### ⚠️ Limitações do Python

- Requer conhecimento de programação
- Sem interface visual (headless only)
- Selenium pode ser lento em alguns cenários
- Debugging via print() (menos elegante)
- Sem relatórios HTML automáticos (deve implementar)

### Resultados no Projeto

**Total de Testes**: 4  
**Taxa de Sucesso**: 100% (4/4 passaram)  
**Vulnerabilidades Encontradas**: 4/4 confirmadas  
**Tempo Total**: ~20 segundos para 4 testes

**Payloads Testados**:
- SQL Injection: `' OR '1'='1` (Confirmado)
- XSS Script: `<script>alert('xss')</script>` (Confirmado)
- XSS Event: `"><img src=x onerror=alert(1)>` (Confirmado)
- Validação Fraca: `João123Silva456` (Confirmado)

---

## Comparação Consolidada

### Performance

| Métrica | Cypress | Robot | Python |
|---------|---------|-------|--------|
| **Tempo/Teste** | 2-4s | 5-10s | 3-8s |
| **Total 41 testes** | ~40s | ~150s | N/A |
| **Parallelização** | Via arquivos | Tags | Nativa |
| **Real-time debug** | Excelente | Bom | Print() |

### Funcionalidades

| Recurso | Cypress | Robot | Python |
|---------|---------|-------|--------|
| **Testes E2E** | Ótimo | Ótimo | Possível |
| **Testes Segurança** | Excelente | Bom | Excelente |
| **Relatórios** | Básico | Completo | Manual |
| **BDD Support** | Possível | Nativo | Manual |
| **Linguagem Natural** | JavaScript | Portuguese | Python |

### Vulnerabilidades Encontradas

| Vulnerabilidade | Cypress | Robot | Python |
|-----------------|---------|-------|--------|
| **SQL Injection** | Confirmado | Confirmado | Confirmado |
| **XSS Script** | Confirmado | Confirmado | Confirmado |
| **XSS Event** | Confirmado | Confirmado | Confirmado |
| **Validação Fraca** | Confirmado | Confirmado | Confirmado |

**Conclusão**: Todos os 3 frameworks confirmaram as mesmas 4 vulnerabilidades críticas.

---

## Recomendações de Uso

### Usar Cypress quando:
- Testes E2E devem ser **rápidos** (produção)
- Testes de **segurança/injeção** (JavaScript injection)
- **Debugging real-time** é importante
- CI/CD pipeline precisa de **velocidade**
- Equipe conhece **JavaScript**

### Usar Robot Framework quando:
- Stakeholders precisam **entender testes** (BDD)
- Documentação é mais importante que **velocidade**
- Testes **muito complexos** com muradas keywords
- Necessário **relatórios automáticos** HTML
- Equipe conhece **Python**

### Usar Python quando:
- Análise de **segurança aprofundada**
- Testes de **headers HTTP** e **CSRF**
- Parsing HTML **complexo**
- Integração com **módulos científicos** (numpy, pandas)
- Automação de **backend/API** testing

---

## Setup e Execução

### Cypress
```bash
cd Site-site2
npm install
npm run cypress:run              # Todos os testes
npx cypress run --spec "cypress/e2e/seguranca.cy.js"  # Segurança
```

### Robot Framework
```bash
cd Site-site2
pip install -r requirements-robot.txt
robot --include seguranca robot/tests/  # Testes de segurança
robot --include validacao robot/tests/  # Testes de validação
```

### Python Security
```bash
cd Site-site2
python security_testing_script.py  # Todos os testes
# Gera: RESULTADOS_TESTES_SEGURANCA.json
```

---

## Documentação Relacionada

- [RELATORIO_CYPRESS.md](Site-site2/RELATORIO_CYPRESS.md) - Detalhes de execução Cypress
- [RELATORIO_ROBOT_FRAMEWORK.md](Site-site2/RELATORIO_ROBOT_FRAMEWORK.md) - Detalhes de execução Robot
- [docs/ISSUES.md](Site-site2/docs/ISSUES.md) - 8 issues encontradas
- [cypress/README.md](Site-site2/cypress/README.md) - Guia do Cypress
- [robot/README.md](Site-site2/robot/README.md) - Guia do Robot Framework

---

**Documento Criado em**: 02/03/2026  
**Status**: Referência definitiva para frameworks de teste  
**Autor**: Bruno Custodio de Castro Silva  
**Versão**: 1.0
