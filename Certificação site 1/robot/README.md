# Robot Framework - QA Test Suite

Suite completa de testes para Certificação usando Robot Framework.

## Instalação

### Pré-requisitos
- Python 3.8+
- pip

### Setup

```bash
# 1. Criar virtual environment (opcional mas recomendado)
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# 2. Instalar dependências
pip install -r requirements-robot.txt

# 3. Instalar Chrome WebDriver
python -m webdrivermanager chrome

# 4. Verificar instalação
robot --version
```

## Estrutura Do Projeto

```
robot/
├── tests/
│   ├── certificacao.robot      (30 testes funcionais)
│   └── exploratorio.robot      (25 testes exploratórios)
├── keywords/
│   ├── common_keywords.robot   (Keywords genéricas)
│   └── form_keywords.robot     (Keywords específicas do formulário)
├── resources/
│   └── variables.robot         (Variáveis e seletores)
└── results/
    ├── log.html                (Log detalhado)
    ├── report.html             (Relatório gráfico)
    ├── output.xml              (Dados estruturados)
    └── screenshots/            (Capturas de tela)
```

## Como Executar

### Opção 1: Todos os Testes (Recomendado)

```bash
robot robot/tests/
```

Gera automaticamente:
- `robot/results/log.html` - Log detalhado
- `robot/results/report.html` - Relatório com gráficos
- `robot/results/output.xml` - Dados para integração

### Opção 2: Apenas Testes Funcionais

```bash
robot robot/tests/certificacao.robot
```

### Opção 3: Apenas Testes Exploratórios

```bash
robot robot/tests/exploratorio.robot
```

### Opção 4: Por Tags (Críticos Apenas)

```bash
robot --include crítica robot/tests/
```

### Opção 5: Com Modo Headed (Ver Execução)

```bash
robot --variable HEADLESS:False robot/tests/certificacao.robot
```

### Opção 6: Modo Headless (Sem Interface)

```bash
robot --variable HEADLESS:True robot/tests/
```

### Opção 7: Apenas Falhas (Reexecute)

```bash
robot --rerunfailed robot/results/output.xml robot/tests/
```

### Opção 8: Com Threads Paralelas

```bash
robot --parallel 4 robot/tests/
```

## Filtrar Testes

### Por Tag

```bash
# Apenas críticos
robot --include crítica robot/tests/

# Apenas smoke tests
robot --include smoke robot/tests/

# Valição + Segurança
robot --include validação --include segurança robot/tests/

# Tudo exceto exploratório
robot --exclude exploratório robot/tests/

# Performance
robot --include performance robot/tests/
```

### Por Nome

```bash
# Apenas testes que contêm "Telefone"
robot --test "*Telefone*" robot/tests/

# Testes que começam com TC00
robot --test "TC00*" robot/tests/certificacao.robot
```

## Relatórios

### Abrir Relatório HTML

```bash
# Windows
start robot/results/report.html

# Linux
xdg-open robot/results/report.html

# Mac
open robot/results/report.html
```

### Combinar Múltiplos Resultados

```bash
# Executar e combinar
robot --outputdir robot/results robot/tests/certificacao.robot
robot --outputdir robot/results robot/tests/exploratorio.robot

# Gerar relatório combinado
rebot robot/results/output*.xml
```

## Scripts Úteis (Adicionar ao package.json)

```json
{
  "scripts": {
    "robot:all": "robot robot/tests/",
    "robot:funcional": "robot robot/tests/certificacao.robot",
    "robot:exploratorio": "robot robot/tests/exploratorio.robot",
    "robot:critica": "robot --include crítica robot/tests/",
    "robot:smoke": "robot --include smoke robot/tests/",
    "robot:performance": "robot --include performance robot/tests/",
    "robot:headless": "robot --variable HEADLESS:True robot/tests/",
    "robot:headed": "robot --variable HEADLESS:False robot/tests/",
    "robot:rerun": "robot --rerunfailed robot/results/output.xml robot/tests/",
    "robot:report": "start robot/results/report.html"
  }
}
```

## Sintaxe Robot Framework

### Teste Simples

```robot
*** Test Cases ***
Meu Primeiro Teste
    Log    Hello World!
```

### Com Keywords

```robot
*** Test Cases ***
Preencher Formulário
    Abrir Navegador
    Preencher Nome    João Silva
    Preencher Email    joao@example.com
    Submeter Formulário
    Validar Mensagem Sucesso
```

### Com Setup/Teardown

```robot
*** Test Cases ***
Teste Com Setup
    [Setup]    Abrir Navegador
    [Teardown]    Fechar Navegador
    Preencher Formulário Completo
```

### Com Tags

```robot
*** Test Cases ***
Teste Crítico
    [Tags]    crítica    smoke    happy_path
    Validar Página Carregada
```

### Com Argumentos

```robot
*** Keywords ***
Preencher Campo
    [Arguments]    ${locator}    ${value}
    Input Text    ${locator}    ${value}
```

## Dicas e Tricks

### 1. Log Detalhado

```bash
robot --loglevel DEBUG robot/tests/
robot --loglevel DEBUG:HTML robot/tests/  # Mais verboso
```

### 2. Modo Monitor (Watch Mode)

```bash
# Executar enquanto observa mudanças nos arquivos
robot --no-cache robot/tests/
```

### 3. Pausar Na Falha

```bash
# Pausa a execução quando um teste falha
robot --pdb robot/tests/
```

### 4. Verificação de Sintaxe

```bash
# Sem executar, apenas valida sintaxe
robot --dryrun robot/tests/
```

### 5. Timeout Global

```bash
# Define timeout para todos os testes
robot --timeout 30s robot/tests/
```

### 6. Variáveis na Linha de Comando

```bash
# Sobrescreve variáveis
robot --variable BASE_URL:https://staging.example.com robot/tests/
robot --variable BROWSER:firefox robot/tests/
```

## Troubleshooting

### Erro: "ChromeDriver not found"

```bash
python -m webdrivermanager chrome --download-path .
python -m webdrivermanager chrome --system  # Sistema-wide
```

### Erro: "Cannot find module robotframework"

```bash
pip install -r requirements-robot.txt
pip install --upgrade robotframework
```

### Teste Fica Preso ("Hangs")

```robot
# Adicionar timeout explícito
*** Test Cases ***
Teste Com Timeout
    [Timeout]    10s
    ... teste code ...
```

### Elemento Não Encontrado

```bash
# Verificar com dryrun (syntaxe sem executar)
robot --dryrun robot/tests/certificacao.robot

# Log detalhado para ver qual elemento falhou
robot --loglevel DEBUG robot/tests/certificacao.robot
```

## Integração com CI/CD

### GitHub Actions

```yaml
- name: Execute Robot Tests
  run: |
    pip install -r requirements-robot.txt
    robot --timestamp-outputs robot/tests/
    
- name: Upload Results
  uses: actions/upload-artifact@v3
  with:
    name: robot-results
    path: robot/results/
```

### Jenkins

```groovy
stage('Robot Tests') {
    steps {
        sh 'pip install -r requirements-robot.txt'
        sh 'robot --timestamp-outputs robot/tests/'
    }
}
```

## Documentação Adicional

- [Robot Framework Docs](https://robotframework.org/)
- [SeleniumLibrary](https://robotframework.org/SeleniumLibrary/)
- [RequestsLibrary](https://github.com/MarketSquare/robotframework-requests)
- [Best Practices](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html)

## Suporte

Email: qa@apprbs.com.br
Versão: 1.0.0
Data: 27/02/2026
