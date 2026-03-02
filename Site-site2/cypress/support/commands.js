// cypress/support/commands.js
// Comandos customizados para Site-site2

// Comando para preencher campo por nome
Cypress.Commands.add('preencherCampoNome', (valor) => {
  cy.get('input[name="pessoa.nome"]')
    .should('be.visible')
    .clear()
    .type(valor)
    .should('have.value', valor);
});

// Comando para preencher campo email
Cypress.Commands.add('preencherCampoEmail', (valor) => {
  cy.get('input[name="pessoa.emailPrincipal"]')
    .should('be.visible')
    .clear()
    .type(valor)
    .should('have.value', valor);
});

// Comando para preencher campo telefone
Cypress.Commands.add('preencherCampoTelefone', (valor) => {
  cy.get('input[name="pessoa.telefonePrincipal"]')
    .should('be.visible')
    .clear()
    .type(valor)
    .should('have.value', valor);
});

// Comando para submeter formulário
Cypress.Commands.add('submeterFormulario', () => {
  cy.get('button').eq(1).should('be.visible').click();
});

// Comando para limpar campo
Cypress.Commands.add('limparCampo', (selector) => {
  cy.get(selector).clear().should('have.value', '');
});

// Comando para validar elemento visível
Cypress.Commands.add('validarVisivel', (selector) => {
  cy.get(selector).should('be.visible');
});

// Comando para validar elemento existe
Cypress.Commands.add('validarExiste', (selector) => {
  cy.get(selector).should('exist');
});

// Comando para testar injeção SQL
Cypress.Commands.add('testarSQLInjection', (campo, payload) => {
  cy.get(`input[name="${campo}"]`)
    .then(($input) => {
      // Usar JavaScript para injetar sem sanitização
      cy.window().then((win) => {
        win.document.querySelector(`input[name="${campo}"]`).value = payload;
      });
    })
    .get(`input[name="${campo}"]`)
    .should('have.value', payload);
});

// Comando para testar XSS
Cypress.Commands.add('testarXSS', (campo, payload) => {
  cy.get(`input[name="${campo}"]`)
    .then(($input) => {
      cy.window().then((win) => {
        win.document.querySelector(`input[name="${campo}"]`).value = payload;
      });
    })
    .get(`input[name="${campo}"]`)
    .should('have.value', payload);
});

// Comando para validar label associada
Cypress.Commands.add('validarLabelAssociada', (forValue) => {
  cy.get(`label[for="${forValue}"]`).should('exist');
});

// Comando para validar H1
Cypress.Commands.add('validarH1', () => {
  cy.get('h1').should('exist').should('be.visible');
});

// Comando para validar DOCTYPE
Cypress.Commands.add('validarDOCTYPE', () => {
  cy.document().should('have.property', 'doctype');
});
