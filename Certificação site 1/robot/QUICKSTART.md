## QuickStart - Robot Framework (5 minutos)

### 1. Instalação Rápida

```bash
# Windows
pip install -r requirements-robot.txt
python -m webdrivermanager chrome

# Linux/Mac
pip3 install -r requirements-robot.txt
python3 -m webdrivermanager chrome
```

### 2. Executar Testes (Primeiro Teste em 30 segundos)

```bash
# Qualquer um desses comandos
robot robot/tests/certificacao.robot
npm run robot:all
npm run robot:critica
```

### 3. Ver os Resultados

Após executar, você terá:
- `robot/results/log.html` - Log detalhado
- `robot/results/report.html` - Relatório com gráficos

Para abrir:
```bash
npm run robot:report
# ou manualmente
start robot/results/report.html
```

### 4. Entender a Estrutura

```
robot/
├── tests/
│   ├── certificacao.robot       <- 30 testes funcionais
│   └── exploratorio.robot       <- 25 testes exploratórios
├── keywords/
│   ├── common_keywords.robot    <- Keywords genéricas
│   └── form_keywords.robot      <- Keywords do formulário
├── resources/
│   └── variables.robot          <- Seletores XPath
└── results/                     <- Saída de testes (criado automaticamente)
```

### 5. Rodar Teste Específico

```bash
# Apenas um teste
robot --test "TC001*" robot/tests/certificacao.robot

# Apenas críticos
robot --include crítica robot/tests/

# Apenas funcionais (10 segundos cada)
robot robot/tests/certificacao.robot

# Apenas exploratórios
robot robot/tests/exploratorio.robot
```

### 6. Sintaxe Básica

Vira em um arquivo `.robot`:

```robot
*** Test Cases ***
Meu Primeiro Teste
    Log    Hello World!

Preencher Formulário
    [Tags]    crítica
    Abrir Navegador
    Preencher Nome    João Silva
    Preencher Email    joao@example.com
    Submeter Formulário
```

### 7. Arquivos Importantes

| Arquivo | O Quê? |
|---------|--------|
| `robot/keywords/form_keywords.robot` | Código dos testes |
| `robot/resources/variables.robot` | Seletores (XPath) |
| `robot/tests/certificacao.robot` | Testes funcionais |
| `robot/tests/exploratorio.robot` | Testes exploratórios |

### 8. Editar Testes

Abrir em qualquer editor de texto:
```bash
# VS Code
code robot/tests/certificacao.robot

# Sublime
subl robot/tests/certificacao.robot

# Vi/Vim
vim robot/tests/certificacao.robot
```

### 9. Sintaxe de Seletor

Os seletores estão em `robot/resources/variables.robot`:

```robot
${INPUT_NOME}      xpath://input[@placeholder*='Nome']
${BUTTON_AVANCAR}  xpath://button[contains(text(), 'Avançar')]
```

Para encontrar novos seletores, use DevTools do Chrome (F12).

### 10. Problemas Comuns

```bash
# ChromeDriver não encontrado?
python -m webdrivermanager chrome

# Timeouts (página lenta)?
Aumentar timeout em resources/variables.robot:
${EXPLICIT_WAIT}    20s

# Elemento não encontrado?
Executar com DEBUG:
robot --loglevel DEBUG robot/tests/certificacao.robot

# Teste ficando preso?
Usar --timeout:
robot --timeout 30s robot/tests/certificacao.robot
```

### Próximos Passos

- [ ] Rodar todos os testes: `npm run robot:all`
- [ ] Ver relatório gráfico: `npm run robot:report`
- [ ] Editar um teste: abrir `robot/tests/certificacao.robot`
- [ ] Ler guia completo: [robot/README.md](robot/README.md)
- [ ] Aprender sintaxe: [robotframework.org](https://robotframework.org/robotframework/)

---

**Tempo total de setup: 5 minutos**  
**Testes disponíveis: 55**  
**Exemplos: 35+ keywords prontas para usar**
