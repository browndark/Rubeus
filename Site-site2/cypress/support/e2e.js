// cypress/support/e2e.js
// Suporte geral para testes Cypress

import './commands'

// Configurar timeout
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, { ...options, timeout: 30000 })
})

// Hook antes de cada teste
beforeEach(() => {
  cy.clearCookies()
  cy.clearLocalStorage()
})

// Capturar erros não capturados
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false para não falhar o teste em erros de JavaScript
  return false
})

// Adicionar suporte a tab navegação
Cypress.Commands.add('tab', () => {
  cy.focused().trigger('keydown', { keyCode: 9, which: 9, key: 'Tab' })
})

// Suporte a login (se necessário)
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

// Verificar status HTTP (necessita backend)
Cypress.Commands.add('status', function() {
  return cy.request({ url: '/', failOnStatusCode: false }).then((resp) => {
    return resp.status
  })
})
