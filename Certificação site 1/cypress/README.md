README - Testes Cypress

Projeto: Certificação Site 1
URL: https://qualidade.apprbs.com.br/certificacao
Framework: Cypress v13.17.0

==================================================

1. ESTRUTURA DO PROJETO

cypress/
  e2e/
    certificacao.cy.js    - Testes end-to-end da página de certificação
  support/
    e2e.js               - Comandos customizados e helpers
cypress.config.js         - Configuração do Cypress
package.json              - Dependências npm

==================================================

2. TESTES IMPLEMENTADOS

Total: 13 testes

2.1 Teste 01: Validar carregamento da página
    - Objetivo: Verificar se a página carrega com sucesso (HTTP 200)
    - Verifação: Status HTTP e presença de título

2.2 Teste 02: Validar estrutura do formulário
    - Objetivo: Contar e listar campos do formulário
    - Verificação: Inputs, labels, buttons encontrados

2.3 Teste 03: Validar campo Nome
    - Objetivo: Testar entrada de dados no campo Nome
    - Verificação: Visibilidade, habilitação, digitação

2.4 Teste 04: Validar campo Telefone
    - Objetivo: Testar entrada de dados no campo Telefone
    - Verificação: Visibilidade, habilitação, digitação

2.5 Teste 05: Validar campo Email
    - Objetivo: Testar entrada de dados no campo Email
    - Verificação: Visibilidade, habilitação, digitação

2.6 Teste 06: Validar checkbox de base legal
    - Objetivo: Encontrar checkbox e verificar sua descrição
    - Verificação: Existência de checkbox com texto de base legal

2.7 Teste 07: Submeter sem base legal (ESPERADO: Erro)
    - Objetivo: Validar que o sistema exige aceitar base legal
    - Verificação: Erro "É necessário informar a base legal"

2.8 Teste 08: Submeter com base legal (ESPERADO: Sucesso)
    - Objetivo: Validar submissão completa do formulário
    - Verificação: Aceitação de base legal e envio

2.9 Teste 09: Validar acessibilidade
    - Objetivo: Verificar acessibilidade do formulário
    - Verificação: Labels, aria-labels, placeholders

2.10 Teste 10: Validar responsividade
    - Objetivo: Testar em Desktop, Tablet e Mobile
    - Verificação: Visibilidade em diferentes resoluções

2.11 Teste 11: Validar campos visíveis e habilitados
    - Objetivo: Garantir que todos os campos estão funcionais
    - Verificação: Visibilidade e status desabilitado

2.12 Teste 12: Rejeitar email inválido
    - Objetivo: Testar validação de email
    - Verificação: Digitação de email inválido

2.13 Teste 13: Gerar relatório
    - Objetivo: Documentar elementos da página
    - Verificação: Contagem e listagem de componentes

==================================================

3. INSTALAÇÃO

3.1 Instalar Cypress
npm install

3.2 Abrir Cypress (modo interativo)
npm run cypress:open

3.3 Executar testes (headless)
npm run cypress:headless

3.4 Executar teste específico
npm run cypress:certificacao

==================================================

4. ERROS IDENTIFICADOS

4.1 Erro: "É necessário informar a base legal"
    Tipo: Validação de formulário
    Severidade: MÉDIA
    Quando: Ao tentar enviar formulário sem aceitar checkbox
    Esperado: Este é um comportamento correto
    Status: VERIFICADO

4.2 Erro: "No label associated with a form field"
    Tipo: Acessibilidade
    Severidade: ALTA
    Quando: Alguns campos não têm labels corretos
    Esperado: Todos os campos devem ter labels
    Status: A CORRIGIR (no servidor)

4.3 Erro: Página em Quirks Mode
    Tipo: Compatibilidade
    Severidade: BAIXA
    Quando: Versão do HTML/DOCTYPE incorreto
    Esperado: Deve usar HTML5 doctype
    Status: A CORRIGIR (no servidor)

==================================================

5. COMO EXECUTAR UM TESTE ESPECÍFICO

Exemplo 1: Apenas teste de email
cypress run cypress/e2e/certificacao.cy.js --spec "*email*"

Exemplo 2: Apenas testes com "erro"
cypress run cypress/e2e/certificacao.cy.js --spec "*error*"

Exemplo 3: Modo interativo
cypress open

==================================================

6. COMANDOS CUSTOMIZADOS DISPONÍVEIS

cy.preencherFormulario({
  nome: 'João Silva',
  telefone: '11999999999',
  email: 'joao@example.com'
})

cy.aceitarBaseLegal()

cy.verificarErro('É necessário informar a base legal')

cy.fazerLogin('email@example.com', 'senha123')

==================================================

7. CONFIGURAÇÃO DO CYPRESS

Arquivo: cypress.config.js

Principais configurações:
- baseUrl: https://qualidade.apprbs.com.br
- viewportWidth: 1280
- viewportHeight: 720
- defaultCommandTimeout: 10000
- Browser: Chrome (headless)
- chromeWebSecurity: false (para permitir requisições cross-origin)

==================================================

8. PRÓXIMOS PASSOS

1. Corrigir erro de acessibilidade no servidor (labels)
2. Atualizar DOCTYPE para HTML5
3. Adicionar mais validações de campo
4. Implementar testes de performance
5. Integrar com CI/CD

==================================================

9. CONTATO E SUPORTE

QA Team
Data: 27/02/2026
Versão: 1.0
Status: Em desenvolvimento

==================================================
