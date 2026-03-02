// Cypress support file - e2e.js
// Aqui você pode adicionar comandos customizados e helpers


// Comando customizado para preencher formulário
Cypress.Commands.add('preencherFormulario', (dados) => {
  // Preencher Nome
  if (dados.nome) {
    cy.get('input[placeholder*="Nome"], input[name*="nome"]').first().clear().type(dados.nome)
  }
  
  // Preencher Telefone
  if (dados.telefone) {
    cy.get('input[placeholder*="Telefone"], input[name*="tel"], input[type="tel"]').first().clear().type(dados.telefone)
  }
  
  // Preencher Email
  if (dados.email) {
    cy.get('input[placeholder*="Email"], input[name*="email"], input[type="email"]').first().clear().type(dados.email)
  }
})

// Comando para aceitar checkbox de base legal
Cypress.Commands.add('aceitarBaseLegal', () => {
  cy.get('input[type="checkbox"]').first().check({ force: true })
})

// Comando para verificar mensagem de erro
Cypress.Commands.add('verificarErro', (mensagem) => {
  cy.get('.error, .alert-danger, [role="alert"]').should('contain', mensagem)
})

// Comando para fazer login (se necessário)
Cypress.Commands.add('fazerLogin', (email, senha) => {
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(senha)
  cy.get('button[type="submit"]').click()
})
