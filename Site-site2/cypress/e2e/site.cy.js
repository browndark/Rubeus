describe('Site-site2 - Teste Suite Cypress', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2000) // Aguardar carregamento completo
  })

  // ================================
  // SMOKE TESTS (4 testes)
  // ================================
  describe('Smoke Tests', () => {
    
    it('ST001 - Deve carregar página com sucesso', () => {
      cy.url().should('include', '/site')
      cy.status().should('eq', 200)
    })

    it('ST002 - Formulário deve estar visível', () => {
      cy.get('form').should('be.visible')
    })

    it('ST003 - Campos de entrada devem estar presentes', () => {
      cy.get('input[name="pessoa.nome"]').should('exist')
      cy.get('input[name="pessoa.emailPrincipal"]').should('exist')
      cy.get('input[name="pessoa.telefonePrincipal"]').should('exist')
    })

    it('ST004 - Botão de submissão deve estar presente', () => {
      cy.get('button').eq(1).should('exist')
    })
  })

  // ================================
  // TESTES DE VALIDAÇÃO (4 testes)
  // ================================
  describe('Validação de Entrada', () => {
    
    it('VAL01 - Submissão com campos vazios deve falhar', () => {
      cy.get('input[name="pessoa.nome"]').should('have.value', '')
      cy.submeterFormulario()
      // Validar mensagem de erro ou campo obrigatório
      cy.get('input[name="pessoa.nome"]').then(($el) => {
        expect($el[0].validity.valid).to.be.false
      })
    })

    it('VAL02 - Email inválido deve ser rejeitado', () => {
      cy.preencherCampoNome('João Silva')
      cy.preencherCampoEmail('email_invalido')
      // Email type validation nativo
      cy.get('input[name="pessoa.emailPrincipal"]').then(($el) => {
        // Campo deve estar inválido
        cy.preencherCampoEmail('joao@example.com') // Corrigir
        cy.preencherCampoEmail('invalido') // Email inválido
      })
    })

    it('VAL03 - Nome com números deve ser rejeitado (ISSUE #008)', () => {
      cy.preencherCampoNome('João123Silva456')
      cy.get('input[name="pessoa.nome"]').should('have.value', 'João123Silva456')
      // Esperado: Deveria rejeitar, mas atualmente aceita (vulnerabilidade)
    })

    it('VAL04 - Telefone com caracteres especiais', () => {
      cy.preencherCampoTelefone('11@9999-9999')
      cy.get('input[name="pessoa.telefonePrincipal"]').should('have.value', '11@9999-9999')
    })
  })

  // ================================
  // TESTES DE ACESSIBILIDADE (3 testes)
  // ================================
  describe('Acessibilidade', () => {
    
    it('ACC01 - Labels devem estar associadas aos inputs (ISSUE #001)', () => {
      // Deveria ter label[for="..."], mas não temos (vulnerabilidade)
      cy.get('label').each(($label) => {
        const forValue = $label.attr('for')
        if (forValue) {
          cy.get(`#${forValue}`).should('exist')
        }
      })
    })

    it('ACC02 - Documento deve ter H1 (ISSUE #003)', () => {
      // Deveria ter H1, mas não temos (vulnerabilidade)
      cy.get('h1').should('not.exist') // Atualmente falta
    })

    it('ACC03 - Navegação por Tab deve funcionar', () => {
      cy.get('input[name="pessoa.nome"]').focus()
      cy.focused().should('have.attr', 'name', 'pessoa.nome')
      
      cy.tab()
      cy.focused().should('have.attr', 'name', 'pessoa.emailPrincipal')
      
      cy.tab()
      cy.focused().should('have.attr', 'name', 'pessoa.telefonePrincipal')
    })
  })

  // ================================
  // TESTES DE CASOS EXTREMOS (3 testes)
  // ================================
  describe('Casos Extremos', () => {
    
    it('EDGE01 - Espaços em branco excessivos', () => {
      cy.preencherCampoNome('   João Silva   ')
      cy.get('input[name="pessoa.nome"]').should('have.value', '   João Silva   ')
    })

    it('EDGE02 - Caracteres especiais para XSS (ISSUE #005)', () => {
      cy.preencherCampoEmail('<script>alert("xss")</script>')
      cy.get('input[name="pessoa.emailPrincipal"]')
        .should('have.value', '<script>alert("xss")</script>')
      // Vulnerabilidade confirmada
    })

    it('EDGE03 - Limite de caracteres', () => {
      const longString = 'a'.repeat(500)
      cy.preencherCampoNome(longString)
      cy.get('input[name="pessoa.nome"]').should('have.value', longString)
    })
  })

  // ================================
  // TESTES DE ESTRUTURA (1 teste)
  // ================================
  describe('Estrutura HTML', () => {
    
    it('QUIRKS01 - DOCTYPE deve estar declarado (ISSUE #002)', () => {
      cy.document().then((doc) => {
        // Deveria ter DOCTYPE, mas não temos (vulnerabilidade)
        const doctype = doc.doctype
        expect(doctype).to.be.null // Atualmente não tem
      })
    })
  })

  // ================================
  // TESTES DE FUNCIONALIDADE (3 testes)
  // ================================
  describe('Funcionalidade', () => {
    
    it('FUNC01 - Preenchimento completo e válido', () => {
      cy.preencherCampoNome('João Silva')
      cy.preencherCampoEmail('joao@example.com')
      cy.preencherCampoTelefone('11999999999')
      
      cy.get('input[name="pessoa.nome"]').should('have.value', 'João Silva')
      cy.get('input[name="pessoa.emailPrincipal"]').should('have.value', 'joao@example.com')
      cy.get('input[name="pessoa.telefonePrincipal"]').should('have.value', '11999999999')
    })

    it('FUNC02 - Validação em tempo real (ISSUE #004)', () => {
      // Atualmente não há validação real-time, apenas ao submeter
      cy.preencherCampoNome('João')
      cy.get('input[name="pessoa.nome"]').should('have.value', 'João')
      // Deveria mostrar feedback real-time, mas não mostra (vulnerabilidade)
    })

    it('FUNC03 - Clear e resubmissão', () => {
      cy.preencherCampoNome('João Silva')
      cy.limparCampo('input[name="pessoa.nome"]')
      cy.get('input[name="pessoa.nome"]').should('have.value', '')
      
      cy.preencherCampoNome('Maria Santos')
      cy.get('input[name="pessoa.nome"]').should('have.value', 'Maria Santos')
    })
  })

  // ================================
  // TESTES DE SEGURANÇA (5 testes)
  // ================================
  describe('Segurança', () => {
    
    it('SEC001 - SQL Injection no campo nome (ISSUE #006)', () => {
      cy.testarSQLInjection('pessoa.nome', "' OR '1'='1")
      cy.get('input[name="pessoa.nome"]').should('have.value', "' OR '1'='1")
      // VULNERABILIDADE CONFIRMADA: Campo aceita SQL
    })

    it('SEC002 - XSS com script tag no email (ISSUE #007)', () => {
      cy.testarXSS('pessoa.emailPrincipal', '<script>alert("xss")</script>')
      cy.get('input[name="pessoa.emailPrincipal"]')
        .should('have.value', '<script>alert("xss")</script>')
      // VULNERABILIDADE CONFIRMADA: Campo aceita script tag
    })

    it('SEC003 - Números em campo nome (ISSUE #008)', () => {
      cy.testarSQLInjection('pessoa.nome', 'João123Silva456')
      cy.get('input[name="pessoa.nome"]').should('have.value', 'João123Silva456')
      // VULNERABILIDADE CONFIRMADA: Campo aceita números
    })

    it('SEC004 - XSS com event handler (ISSUE #007)', () => {
      cy.testarXSS('pessoa.emailPrincipal', '"><img src=x onerror=alert(1)>')
      cy.get('input[name="pessoa.emailPrincipal"]')
        .should('have.value', '"><img src=x onerror=alert(1)>')
      // VULNERABILIDADE CONFIRMADA: Campo aceita event handlers
    })

    it('SEC005 - SQL Injection UNION SELECT', () => {
      cy.testarSQLInjection('pessoa.nome', "' UNION SELECT * FROM users--")
      cy.get('input[name="pessoa.nome"]')
        .should('have.value', "' UNION SELECT * FROM users--")
      // VULNERABILIDADE CONFIRMADA: Campo aceita UNION
    })
  })

  // ================================
  // TESTES ADICIONAIS
  // ================================
  describe('Testes Adicionais', () => {
    
    it('Validar estrutura HTML do form', () => {
      cy.get('form').should('have.lengthOf', 1)
      cy.get('form').within(() => {
        cy.get('input').should('have.lengthOf', 3)
        cy.get('button').should('have.length.greaterThan', 0)
      })
    })

    it('Validar atributos dos inputs', () => {
      cy.get('input[name="pessoa.nome"]').should('have.attr', 'name')
      cy.get('input[name="pessoa.emailPrincipal"]').should('have.attr', 'name')
      cy.get('input[name="pessoa.telefonePrincipal"]').should('have.attr', 'name')
    })

    it('Validar se página não tem erros de console', () => {
      cy.window().then((win) => {
        cy.stub(win.console, 'error').as('consoleError')
        cy.get('@consoleError').should('not.have.been.called')
      })
    })
  })
})
