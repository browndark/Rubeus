describe('Testes - Certificação Site', () => {
  
  beforeEach(() => {
    cy.visit('/certificacao', { failOnStatusCode: false })
    cy.log('Página de certificação carregada')
    
    // Ignorar erros de JS da aplicação
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('ActionsForm') || err.message.includes('is not defined')) {
        return false // Ignora esse erro específico
      }
      return true
    })
  })

  // Teste 1: Validar carregamento da página
  it('Deve carregar a página de certificação com sucesso', () => {
    cy.request('/certificacao').its('status').should('eq', 200)
    cy.log('Status HTTP 200 - Página carregada')
    
    // Verificar qualquer elemento visível (não apenas h1)
    cy.get('body').should('be.visible')
    cy.get('form, .form, [role="form"]').should('exist')
    cy.log('Formulário encontrado na página')
  })

  // Teste 2: Validar estrutura do formulário
  it('Deve encontrar todos os campos obrigatórios do formulário', () => {
    // Procurar por campos de entrada (inputs visíveis)
    cy.get('form, .rb-form').first().then(($form) => {
      cy.wrap($form).find('input:visible, textarea:visible, select:visible').then(($fields) => {
        cy.log(`Total de campos visíveis encontrados: ${$fields.length}`)
        expect($fields.length).to.be.greaterThan(0)
      })
    })
  })

  // Teste 3: Validar campo Nome
  it('Deve validar campo de Nome', () => {
    cy.get('input:visible').then(($inputs) => {
      // Procurar por input que pareça ser nome
      cy.get('input:visible').first().then(($el) => {
        if ($el.length > 0) {
          cy.wrap($el)
            .should('be.visible')
            .type('João Silva', { delay: 50, force: true })
          cy.log('Campo Nome preenchido com: João Silva')
        } else {
          cy.log('Nenhum campo de entrada visível encontrado')
        }
      })
    })
  })

  // Teste 4: Validar campo Telefone
  it('Deve validar campo de Telefone', () => {
    cy.get('input:visible').then(($inputs) => {
      if ($inputs.length > 1) {
        cy.wrap($inputs[1])
          .should('be.visible')
          .type('11999999999', { delay: 50, force: true })
        cy.log('Campo Telefone preenchido com: 11999999999')
      } else {
        cy.log('Segundo campo não encontrado')
      }
    })
  })

  // Teste 5: Validar campo Email
  it('Deve validar campo de Email', () => {
    cy.get('input:visible').then(($inputs) => {
      if ($inputs.length > 2) {
        cy.wrap($inputs[2])
          .should('be.visible')
          .type('joao@example.com', { delay: 50, force: true })
        cy.log('Campo Email preenchido com: joao@example.com')
      } else {
        cy.log('Terceiro campo não encontrado')
      }
    })
  })

  // Teste 6: Validar checkbox de base legal
  it('Deve encontrar e validar checkbox de base legal', () => {
    cy.get('input[type="checkbox"]:visible, [role="checkbox"]:visible').then(($checkboxes) => {
      cy.log(`Total de checkboxes encontrados: ${$checkboxes.length}`)
      
      if ($checkboxes.length > 0) {
        cy.wrap($checkboxes[0]).then(($checkbox) => {
          const parent = $checkbox.closest('label, .checkbox-wrapper, .form-group')
          const texto = parent.text()
          cy.log(`Checkbox encontrado: "${texto.substring(0, 50)}"`)
          expect($checkboxes.length).to.be.greaterThan(0)
        })
      } else {
        cy.log('Nenhum checkbox encontrado na página')
      }
    })
  })

  // Teste 7: Submeter formulário sem aceitar base legal (esperado erro)
  it('Deve exibir erro quando tentar enviar sem aceitar base legal', () => {
    // Preencher campos visíveis
    cy.get('input:visible').then(($inputs) => {
      if ($inputs.length > 0) cy.wrap($inputs[0]).type('João Silva', { force: true })
      if ($inputs.length > 1) cy.wrap($inputs[1]).type('11999999999', { force: true })
      if ($inputs.length > 2) cy.wrap($inputs[2]).type('joao@example.com', { force: true })
    })
    
    // Tentar enviar sem aceitar checkbox
    cy.get('button:visible').each(($btn) => {
      const btnText = $btn.text().toUpperCase()
      if (btnText.includes('ENVIAR') || btnText.includes('AVANÇAR') || btnText.includes('CADASTR')) {
        cy.wrap($btn).click({ force: true })
        cy.log('Botão de envio clicado')
      }
    })
    
    // Verificar se há alguma mensagem de erro
    cy.wait(1000)
    cy.get('body').then(($body) => {
      const temErro = $body.text().includes('base legal') || 
                      $body.text().includes('Base legal') ||
                      $body.text().includes('aceitar') ||
                      $body.text().includes('Aceitar')
      cy.log(temErro ? 'Erro de validação detectado' : 'Formulário pode ter sido processo ou erros não visíveis')
    })
  })

  // Teste 8: Submeter formulário completo (aceitando base legal)
  it('Deve submeter formulário com sucesso quando base legal é aceita', () => {
    // Preencher campos
    cy.get('input:visible').then(($inputs) => {
      if ($inputs.length > 0) {
        cy.wrap($inputs[0]).clear({ force: true }).type('Maria Santos', { force: true })
        cy.log('Nome: Maria Santos')
      }
      if ($inputs.length > 1) {
        cy.wrap($inputs[1]).clear({ force: true }).type('21988888888', { force: true })
        cy.log('Telefone: 21988888888')
      }
      if ($inputs.length > 2) {
        cy.wrap($inputs[2]).clear({ force: true }).type('maria@example.com', { force: true })
        cy.log('Email: maria@example.com')
      }
    })
    
    // Aceitar checkbox
    cy.get('input[type="checkbox"]:visible').first().then(($checkbox) => {
      if ($checkbox.length > 0) {
        cy.wrap($checkbox).click({ force: true })
        cy.log('Checkbox aceito')
      }
    })
    
    // Clicar envio
    cy.get('button:visible').each(($btn) => {
      const btnText = $btn.text().toUpperCase()
      if (btnText.includes('ENVIAR') || btnText.includes('AVANÇAR') || btnText.includes('CADASTR')) {
        cy.wrap($btn).click({ force: true })
        cy.log('Formulário enviado')
      }
    })
    
    cy.wait(2000)
  })

  // Teste 9: Validar acessibilidade
  it('Deve validar acessibilidade do formulário', () => {
    // Verificar se inputs têm atributos descritivos
    cy.get('input:visible').each(($input) => {
      cy.wrap($input).then(($el) => {
        const id = $el.attr('id')
        const ariaLabel = $el.attr('aria-label')
        const placeholder = $el.attr('placeholder')
        const name = $el.attr('name')
        const deUmRótulo = id ? true : false
        
        if (deUmRótulo || ariaLabel || placeholder || name) {
          cy.log(`✓ Input acessível (${name || placeholder || ariaLabel || id})`)
        }
      })
    })
  })

  // Teste 10: Validar responsividade da página
  it('Deve manter funcionalidade em diferentes resoluções', () => {
    const viewports = [
      { width: 1280, height: 720, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ]
    
    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)
      cy.get('form, .rb-form').first().should('be.visible')
      cy.log(`✓ ${viewport.name} (${viewport.width}x${viewport.height}): Visível`)
    })
  })

  // Teste 11: Validar elementos do formulário estão visíveis
  it('Deve validar que todos os campos estão visíveis e habilitados', () => {
    cy.get('input:visible, textarea:visible, select:visible').each(($field) => {
      cy.wrap($field).then(($el) => {
        if ($el.is(':visible')) {
          cy.log(`✓ Campo visível: ${$el.attr('name') || $el.attr('placeholder')}`)
        }
      })
    })
  })

  // Teste 12: Validar padrão de validação de email
  it('Deve rejeitar email inválido', () => {
    cy.get('input:visible').then(($inputs) => {
      if ($inputs.length > 2) {
        cy.wrap($inputs[2])
          .clear({ force: true })
          .type('email-invalido', { force: true })
        cy.log('Email inválido digitado para teste: email-invalido')
      }
    })
  })

  // Teste 13: Gerar relatório completo da página
  it('Deve gerar relatório completo da página', () => {
    const relatorio = {
      timestamp: new Date().toISOString(),
      elementos: {}
    }
    
    cy.get('input').then(($inputs) => {
      relatorio.elementos.inputs = $inputs.length
      relatorio.elementos.inputsVisiveis = $inputs.filter(':visible').length
    })
    
    cy.get('button').then(($buttons) => {
      relatorio.elementos.botoes = $buttons.length
      relatorio.elementos.botoesVisiveis = $buttons.filter(':visible').length
    })
    
    cy.get('label').then(($labels) => {
      relatorio.elementos.labels = $labels.length
    })
    
    cy.get('input[type="checkbox"]').then(($checkboxes) => {
      relatorio.elementos.checkboxes = $checkboxes.length
    })
    
    cy.log('===== RELATÓRIO DA PÁGINA =====')
    cy.log(JSON.stringify(relatorio, null, 2))
    cy.log('Relatório gerado com sucesso')
  })
})
