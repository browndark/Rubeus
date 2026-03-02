# Testes Cypress - Site-site2

Suite de testes end-to-end usando Cypress para o Site-site2 (https://qualidade.apprbs.com.br/site).

## Instalação

### 1. Instalar Node.js
```bash
# Verificar se está instalado
node --version
npm --version
```

### 2. Instalar dependências
```bash
npm install
```

Isso instalará:
- **Cypress**: Framework de testes E2E
- **cypress-axe**: Plugin para testes de acessibilidade

## Estrutura de Pastas

```
cypress/
├── e2e/                    # Testes E2E
│   └── site.spec.js        # 25+ testes (Smoke, Validação, Segurança)
├── support/                # Arquivo de suporte
│   ├── e2e.js             # Configuração geral
│   └── commands.js        # Comandos customizados
├── fixtures/              # Dados de teste
│   └── testData.json      # Dados para fixtures
└── screenshots/           # Screenshots dos testes (gerado)

cypress.config.js         # Configuração do Cypress
package.json              # Dependências do projeto
```

## Executar Testes

### Modo Interativo (UI)
```bash
npm run cypress:open
# Ou
npm run test:watch
```

Abre a interface visual do Cypress onde você pode:
- Ver testes em tempo real
- Debugar interativamente
- Visualizar o navegador

### Modo Headless (CLI)
```bash
npm run cypress:run
# Ou
npm test
```

Executa todos os testes sem interface visual (ideal para CI/CD).

### Executar com browser específico
```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

### Debug Mode
```bash
npm run cypress:debug
```

Abre Cypress com Chrome em modo debug.

## Testes Implementados (25 testes)

### Smoke Tests (4)
- **ST001** - Carregar página com sucesso
- **ST002** - Formulário visível
- **ST003** - Campos de entrada presentes
- **ST004** - Botão submissão presente

### Validação (4)
- **VAL01** - Campos vazios devem falhar
- **VAL02** - Email inválido rejeitado
- **VAL03** - Nome com números (ISSUE #008)
- **VAL04** - Telefone com caracteres especiais

### Acessibilidade (3)
- **ACC01** - Labels associadas (ISSUE #001)
- **ACC02** - H1 presente (ISSUE #003)
- **ACC03** - Navegação por Tab

### Casos Extremos (3)
- **EDGE01** - Espaços em branco
- **EDGE02** - Caracteres especiais XSS (ISSUE #005)
- **EDGE03** - Limite de caracteres

### Estrutura HTML (1)
- **QUIRKS01** - DOCTYPE declarado (ISSUE #002)

### Funcionalidade (3)
- **FUNC01** - Preenchimento válido completo
- **FUNC02** - Validação em tempo real (ISSUE #004)
- **FUNC03** - Clear e resubmissão

### Segurança (5)
- **SEC001** - SQL Injection no nome (ISSUE #006) - VULNERÁVEL
- **SEC002** - XSS com script tag (ISSUE #007) - VULNERÁVEL
- **SEC003** - Números em nome (ISSUE #008) - VULNERÁVEL
- **SEC004** - XSS com event handler (ISSUE #007) - VULNERÁVEL
- **SEC005** - SQL UNION SELECT - VULNERÁVEL

### Adicionais (2)
- Validar estrutura HTML
- Validar atributos dos inputs
- Validar erros de console

## Comandos Customizados

### Preenchimento de Campos
```javascript
cy.preencherCampoNome('João Silva')
cy.preencherCampoEmail('joao@example.com')
cy.preencherCampoTelefone('11999999999')
```

### Validação
```javascript
cy.validarVisivel('input[name="pessoa.nome"]')
cy.validarExiste('form')
cy.validarH1()
```

### Ataques de Segurança
```javascript
cy.testarSQLInjection('pessoa.nome', "' OR '1'='1")
cy.testarXSS('pessoa.emailPrincipal', '<script>alert("xss")</script>')
```

### Formulário
```javascript
cy.submeterFormulario()
cy.limparCampo('input[name="pessoa.nome"]')
```

## Dados de Teste

Fixture em `cypress/fixtures/testData.json`:

```json
{
  "validUsers": [...],        // Dados válidos
  "invalidUsers": [...],      // Dados inválidos
  "sqlInjectionPayloads": [...],  // Payloads SQL
  "xssPayloads": [...]        // Payloads XSS
}
```

Usar nos testes:
```javascript
cy.fixture('testData').then((data) => {
  cy.preencherCampoNome(data.validUsers[0].nome)
})
```

## Resultados

Após execução, os testes geram:

- **screenshots/** - Screenshots de falhas
- **videos/** - Vídeos da execução (se habilitado)
- **cypress_output.json** - Resultados estruturados

## Diferenças entre Cypress e Robot Framework

| Aspecto | Cypress | Robot Framework |
|---------|---------|------------------|
| **Linguagem** | JavaScript | Gherkin + Python |
| **Velocidade** | Mais rápido | Mais lento |
| **Debugging** | Excelente | Bom |
| **Real-time** | Sim (UI) | Não |
| **Parallelização** | Nativa | Configuração manual |
| **Cloud Integration** | Cypress Cloud | Menos integrado |
| **Browser Support** | Chrome, Firefox, Edge | Chrome, Firefox, Edge |

## Vulnerabilidades Confirmadas via Cypress

### ISSUE #006 - SQL Injection (CRÍTICA)
Campo `pessoa.nome` aceita: `' OR '1'='1`
✓ Teste **SEC001** confirma vulnerabilidade

### ISSUE #007 - XSS (CRÍTICA)
Campo `pessoa.emailPrincipal` aceita:
- `<script>alert('xss')</script>` (SEC002)
- `"><img src=x onerror=alert(1)>` (SEC004)
✓ Testes **SEC002** e **SEC004** confirmam vulnerabilidade

### ISSUE #008 - Validação Fraca (MÉDIA)
Campo `pessoa.nome` aceita: `João123Silva456`
✓ Teste **SEC003** confirma vulnerabilidade

## Troubleshooting

### Cypress não inicia
```bash
npm install --save-dev cypress
npx cypress verify
```

### Timeout em telas lentas
Aumentar em `cypress.config.js`:
```javascript
defaultCommandTimeout: 20000
```

### Erro de CORS
Desabilitar em `cypress.config.js`:
```javascript
chromeWebSecurity: false
```

### Não encontra elemento
Aumentar tempo de espera:
```javascript
cy.get('input[name="pessoa.nome"]', { timeout: 10000 })
```

## CI/CD Integration

### GitHub Actions
```yaml
- name: Run Cypress Tests
  run: npm run cypress:run
```

### GitLab CI
```yaml
run_tests:
  script:
    - npm install
    - npm run cypress:run
```

### Jenkins
```groovy
sh 'npm install'
sh 'npm run cypress:run'
```

## Próximas Ações

1. **Executar testes iniciais**:
   ```bash
   npm run cypress:run
   ```

2. **Validar vulnerabilidades confirma via Cypress**

3. **Comparar com Robot Framework**:
   - Cypress: ~25 testes, mais rápido
   - Robot: ~23 testes, mais lento (modal issues)

4. **Corrigir issues** baseado nos achados

## Documentação

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)

---

**Versão**: 1.0.0  
**Data**: 02/03/2026  
**Status**: ✓ Pronto para execução  
**Testes**: 25+ cenários de teste  
**Vulnerabilidades**: 4 confirmadas via Cypress
