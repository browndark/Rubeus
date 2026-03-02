describe('Teste Exploratório - Página de Certificação', () => {
  
  beforeEach(() => {
    cy.visit('/certificacao', { timeout: 10000 })
    cy.log('====== INICIANDO TESTE EXPLORATÓRIO ======')
  })

  // ========== TESTES DE FUNCIONALIDADE BASICA ==========
  
  it('[01] Explorar: Carregamento e elementos visíveis', () => {
    cy.log('=== TESTE 01: Verificar carregamento da página ===')
    
    // Verificar URL
    cy.url().should('include', '/certificacao')
    cy.log('✓ URL está correta: /certificacao')
    
    // Verificar se página carregou
    cy.get('body').should('be.visible')
    cy.log('✓ Página carregou corretamente')
    
    // Procurar por título
    cy.get('h1, h2, h3').then(($titles) => {
      cy.log(`✓ Encontrados ${$titles.length} títulos`)
      $titles.each((index, title) => {
        cy.log(`  - Título ${index + 1}: "${Cypress.$(title).text().substring(0, 50)}"`)
      })
    })
    
    // Procurar por texto "Certificação"
    cy.get('body').then(($body) => {
      const temCertificacao = $body.text().includes('Certificação') || $body.text().includes('certificacao')
      cy.log(temCertificacao ? '✓ Palavra "Certificação" encontrada' : '⚠ Palavra "Certificação" não encontrada')
    })
    
    // Contar elementos da página
    cy.get('*').then(($allElements) => {
      cy.log(`✓ Total de elementos na página: ${$allElements.length}`)
    })
  })

  it('[02] Explorar: Formulário - Campos disponíveis', () => {
    cy.log('=== TESTE 02: Explorar campos do formulário ===')
    
    // Procurar por formulário
    cy.get('form').then(($forms) => {
      cy.log(`✓ Total de formulários: ${$forms.length}`)
      
      $forms.each((formIndex, form) => {
        cy.wrap(form).within(() => {
          // Contar inputs
          cy.get('input').then(($inputs) => {
            cy.log(`  Formulário ${formIndex + 1}: ${$inputs.length} inputs`)
            
            $inputs.each((inputIndex, input) => {
              const $input = Cypress.$(input)
              const type = $input.attr('type')
              const name = $input.attr('name')
              const placeholder = $input.attr('placeholder')
              const id = $input.attr('id')
              const required = $input.is('[required]')
              
              cy.log(`    Input ${inputIndex + 1}:`)
              cy.log(`      - Type: ${type || 'text'}`)
              cy.log(`      - Name: ${name || 'N/A'}`)
              cy.log(`      - Placeholder: ${placeholder || 'N/A'}`)
              cy.log(`      - Required: ${required}`)
            })
          })
          
          // Procurar por textareas
          cy.get('textarea').then(($textareas) => {
            if ($textareas.length > 0) {
              cy.log(`  Formulário ${formIndex + 1}: ${$textareas.length} textareas`)
            }
          })
          
          // Procurar por selects
          cy.get('select').then(($selects) => {
            if ($selects.length > 0) {
              cy.log(`  Formulário ${formIndex + 1}: ${$selects.length} selects`)
            }
          })
          
          // Procurar por checkboxes
          cy.get('input[type="checkbox"]').then(($checkboxes) => {
            cy.log(`  Formulário ${formIndex + 1}: ${$checkboxes.length} checkboxes`)
            
            $checkboxes.each((checkIndex, checkbox) => {
              const $check = Cypress.$(checkbox)
              const label = $check.parent().text() || $check.attr('id')
              cy.log(`    Checkbox ${checkIndex + 1}: ${label}`)
            })
          })
          
          // Procurar por botões
          cy.get('button').then(($buttons) => {
            cy.log(`  Formulário ${formIndex + 1}: ${$buttons.length} botões`)
            
            $buttons.each((btnIndex, btn) => {
              const $btn = Cypress.$(btn)
              const texto = $btn.text().trim()
              const type = $btn.attr('type')
              cy.log(`    Botão ${btnIndex + 1}: "${texto}" (type: ${type || 'button'})`)
            })
          })
        })
      })
    })
  })

  it('[03] Explorar: Validação de entrada - Teste de limites', () => {
    cy.log('=== TESTE 03: Validação de entrada de dados ===')
    
    // Teste campo Nome
    cy.get('input[placeholder*="Nome"], input[name*="nome"]').first().then(($input) => {
      if ($input.length > 0) {
        cy.log('✓ Campo Nome encontrado')
        
        // Teste 1: Nome vazio
        cy.wrap($input).clear().trigger('blur')
        cy.log('  - Teste: Nome vazio (blur)')
        
        // Teste 2: Nome muito curto
        cy.wrap($input).type('A')
        cy.log('  - Teste: Nome muito curto (1 caractere)')
        
        // Teste 3: Nome com números
        cy.wrap($input).clear().type('123456')
        cy.log('  - Teste: Nome com números')
        
        // Teste 4: Nome com caracteres especiais
        cy.wrap($input).clear().type('!@#$%^&*()')
        cy.log('  - Teste: Nome com caracteres especiais')
        
        // Teste 5: Nome válido
        cy.wrap($input).clear().type('João Silva Santos')
        cy.log('  - Teste: Nome válido (completo)')
      }
    })
    
    // Teste campo Telefone
    cy.get('input[placeholder*="Telefone"], input[type="tel"]').first().then(($input) => {
      if ($input.length > 0) {
        cy.log('✓ Campo Telefone encontrado')
        
        // Teste 1: Telefone vazio
        cy.wrap($input).clear().trigger('blur')
        cy.log('  - Teste: Telefone vazio')
        
        // Teste 2: Telefone com letras
        cy.wrap($input).type('abcdefgh')
        cy.log('  - Teste: Telefone com letras')
        
        // Teste 3: Telefone muito curto
        cy.wrap($input).clear().type('123')
        cy.log('  - Teste: Telefone muito curto')
        
        // Teste 4: Telefone válido
        cy.wrap($input).clear().type('11987654321')
        cy.log('  - Teste: Telefone válido (11 dígitos)')
      }
    })
    
    // Teste campo Email
    cy.get('input[placeholder*="Email"], input[type="email"]').first().then(($input) => {
      if ($input.length > 0) {
        cy.log('✓ Campo Email encontrado')
        
        // Teste 1: Email vazio
        cy.wrap($input).clear().trigger('blur')
        cy.log('  - Teste: Email vazio')
        
        // Teste 2: Email sem @
        cy.wrap($input).type('emailinvalido')
        cy.log('  - Teste: Email sem @')
        
        // Teste 3: Email incompleto
        cy.wrap($input).clear().type('email@')
        cy.log('  - Teste: Email incompleto (sem domínio)')
        
        // Teste 4: Email com espaços
        cy.wrap($input).clear().type('email @example .com')
        cy.log('  - Teste: Email com espaços')
        
        // Teste 5: Email válido
        cy.wrap($input).clear().type('usuario.teste@example.com')
        cy.log('  - Teste: Email válido')
      }
    })
  })

  it('[04] Explorar: Comportamento de erros', () => {
    cy.log('=== TESTE 04: Explorar mensagens de erro ===')
    
    // Tentar submeter vazio
    cy.log('Tentando submeter formulário vazio...')
    cy.get('button:contains("AVANÇAR"), button:contains("Enviar"), button:contains("Cadastrar"), button[type="submit"]').first().click({ force: true })
    cy.wait(1000)
    
    // Procurar por mensagens de erro
    cy.get('body').then(($body) => {
      const temErro = $body.text().includes('obrigatório') || 
                      $body.text().includes('necessário') ||
                      $body.text().includes('inválido') ||
                      $body.text().includes('erro') ||
                      $body.text().includes('Erro')
      
      if (temErro) {
        cy.log('✓ Mensagem de erro apareceu')
        
        // Procurar por elementos de alerta
        cy.get('.error, .alert, .alert-danger, [role="alert"], .form-error').then(($alerts) => {
          cy.log(`  Total de alertas: ${$alerts.length}`)
          $alerts.each((index, alert) => {
            const texto = Cypress.$(alert).text().substring(0, 100)
            cy.log(`  Alerta ${index + 1}: "${texto}"`)
          })
        })
      } else {
        cy.log('⚠ Nenhuma mensagem de erro visual detectada')
      }
    })
  })

  it('[05] Explorar: Interatividade - Hover e Focus', () => {
    cy.log('=== TESTE 05: Testar interatividade (Hover/Focus) ===')
    
    // Hover em botões
    cy.get('button').first().then(($btn) => {
      const colorAntes = Cypress.$($btn).css('background-color')
      cy.wrap($btn).trigger('mouseover')
      cy.log('  - Hover no primeiro botão aplicado')
      const colorDepois = Cypress.$($btn).css('background-color')
      
      if (colorAntes !== colorDepois) {
        cy.log('  ✓ Cor mudou com hover')
      } else {
        cy.log('  ⚠ Nenhuma mudança visual com hover')
      }
    })
    
    // Focus em inputs
    cy.get('input').first().then(($input) => {
      cy.wrap($input).focus()
      cy.log('  - Focus aplicado no primeiro input')
      
      cy.wrap($input).should('have.focus')
      cy.log('  ✓ Input tem focus (border pode ter mudado)')
    })
    
    // Teste de tab navigation
    cy.get('input').first().tab()
    cy.log('  - Tab pressionado (navegação entre inputs)')
  })

  it('[06] Explorar: Conteúdo da página - Links e imagens', () => {
    cy.log('=== TESTE 06: Explorar conteúdo (links, imagens) ===')
    
    // Procurar por links
    cy.get('a').then(($links) => {
      cy.log(`✓ Total de links encontrados: ${$links.length}`)
      
      $links.each((index, link) => {
        const $link = Cypress.$(link)
        const href = $link.attr('href')
        const text = $link.text().substring(0, 50)
        cy.log(`  Link ${index + 1}: "${text}" -> ${href || '#'}`)
      })
    })
    
    // Procurar por imagens
    cy.get('img').then(($images) => {
      cy.log(`✓ Total de imagens: ${$images.length}`)
      
      $images.each((index, img) => {
        const $img = Cypress.$(img)
        const src = $img.attr('src')
        const alt = $img.attr('alt')
        cy.log(`  Imagem ${index + 1}:`)
        cy.log(`    - Src: ${src || 'N/A'}`)
        cy.log(`    - Alt: ${alt || '⚠ SEM ALT TEXT'}`)
      })
    })
  })

  it('[07] Explorar: Meta tags e SEO', () => {
    cy.log('=== TESTE 07: Explorar meta tags ===')
    
    // Title
    cy.title().then((title) => {
      cy.log(`✓ Title: "${title}"`)
    })
    
    // Meta description
    cy.get('meta[name="description"]').then(($meta) => {
      const content = $meta.attr('content')
      cy.log(`Meta Description: "${content || 'NÃO ENCONTRADA'}"`)
    })
    
    // Meta viewport
    cy.get('meta[name="viewport"]').then(($meta) => {
      const content = $meta.attr('content')
      cy.log(`Meta Viewport: "${content || 'NÃO ENCONTRADA'}"`)
    })
    
    // Favicon
    cy.get('link[rel="icon"]').then(($link) => {
      const href = $link.attr('href')
      cy.log(`Favicon: "${href || 'NÃO ENCONTRADO'}"`)
    })
  })

  it('[08] Explorar: Acessibilidade e estrutura HTML', () => {
    cy.log('=== TESTE 08: Validar acessibilidade ===')
    
    // Labels
    cy.get('label').then(($labels) => {
      cy.log(`✓ Total de labels: ${$labels.length}`)
    })
    
    // Inputs sem label
    cy.get('input').each(($input) => {
      const id = Cypress.$($input).attr('id')
      const ariaLabel = Cypress.$($input).attr('aria-label')
      const placeholder = Cypress.$($input).attr('placeholder')
      
      if (!id && !ariaLabel && !placeholder) {
        cy.log(`⚠ Input sem identificador: ${Cypress.$($input).attr('type')}`)
      }
    })
    
    // Headings
    cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
      cy.log(`Headings encontrados:`)
      $headings.each((index, heading) => {
        const tag = Cypress.$(heading).prop('tagName')
        const text = Cypress.$(heading).text().substring(0, 50)
        cy.log(`  ${tag}: "${text}"`)
      })
    })
    
    // Lista de acessibilidade
    cy.get('[role]').then(($roled) => {
      cy.log(`Elementos com ARIA role: ${$roled.length}`)
    })
  })

  it('[09] Explorar: Estilos CSS e tema visual', () => {
    cy.log('=== TESTE 09: Verificar estilos visuais ===')
    
    // Cores do formulário
    cy.get('form').first().then(($form) => {
      const bgColor = Cypress.$($form).css('background-color')
      const borderColor = Cypress.$($form).css('border-color')
      cy.log(`Formulário:`)
      cy.log(`  - Background: ${bgColor}`)
      cy.log(`  - Border: ${borderColor}`)
    })
    
    // Botões
    cy.get('button').first().then(($btn) => {
      const bgColor = Cypress.$($btn).css('background-color')
      const textColor = Cypress.$($btn).css('color')
      const fontSize = Cypress.$($btn).css('font-size')
      cy.log(`Botão:`)
      cy.log(`  - Background: ${bgColor}`)
      cy.log(`  - Cor do texto: ${textColor}`)
      cy.log(`  - Tamanho: ${fontSize}`)
    })
  })

  it('[10] Explorar: Responsividade - Verificar em diferentes tamanhos', () => {
    cy.log('=== TESTE 10: Testar responsividade ===')
    
    const viewports = [
      { name: 'Mobile XS', width: 320, height: 568 },
      { name: 'Mobile SM', width: 375, height: 667 },
      { name: 'Mobile MD', width: 480, height: 800 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Laptop', width: 1024, height: 768 },
      { name: 'Desktop', width: 1280, height: 720 },
      { name: 'Desktop XL', width: 1920, height: 1080 }
    ]
    
    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)
      
      // Verificar se formulário está visível
      cy.get('form').first().then(($form) => {
        const isVisible = Cypress.$($form).is(':visible')
        const width = Cypress.$($form).width()
        cy.log(`${viewport.name} (${viewport.width}x${viewport.height}):`)
        cy.log(`  - Formulário visível: ${isVisible}`)
        cy.log(`  - Largura do formulário: ${width}px`)
      })
    })
  })

  it('[11] Explorar: Performance e tempo de carregamento', () => {
    cy.log('=== TESTE 11: Verificar performance ===')
    
    // Medir tempo de carga
    cy.window().then((win) => {
      const perfData = win.performance.timing
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
      const resourcesTime = perfData.responseEnd - perfData.fetchStart
      
      cy.log(`Métricas de Performance:`)
      cy.log(`  - Tempo de carregamento total: ${pageLoadTime}ms`)
      cy.log(`  - Tempo de resposta: ${resourcesTime}ms`)
    })
    
    // Contar recursos
    cy.window().then((win) => {
      const resources = win.performance.getEntriesByType('resource')
      cy.log(`Recursos carregados: ${resources.length}`)
      
      let jsCount = 0, cssCount = 0, imgCount = 0
      resources.forEach((resource) => {
        if (resource.name.includes('.js')) jsCount++
        if (resource.name.includes('.css')) cssCount++
        if (resource.name.includes('. jpg') || resource.name.includes('.png')) imgCount++
      })
      
      cy.log(`  - Scripts: ${jsCount}`)
      cy.log(`  - Stylesheets: ${cssCount}`)
      cy.log(`  - Imagens: ${imgCount}`)
    })
  })

  it('[12] Explorar: Validação de segurança básica', () => {
    cy.log('=== TESTE 12: Verificar segurança ===')
    
    // Teste XSS no campo Nome
    cy.get('input[placeholder*="Nome"], input[name*="nome"]').first().then(($input) => {
      if ($input.length > 0) {
        cy.wrap($input).type('<script>alert("XSS")</script>')
        cy.log('Teste XSS: Injetado script em campo Nome')
        cy.log('⚠ Verificar se script foi executado (exploração)')
      }
    })
    
    // Teste SQL Injection
    cy.get('input[placeholder*="Nome"], input[name*="nome"]').first().then(($input) => {
      if ($input.length > 0) {
        cy.wrap($input).clear().type("'; DROP TABLE users; --")
        cy.log('Teste SQL Injection: Injetado query em campo Nome')
      }
    })
    
    // Verificar se há autocomplete
    cy.get('input[type="text"]').first().then(($input) => {
      const autocomplete = Cypress.$($input).attr('autocomplete')
      cy.log(`Autocomplete: ${autocomplete || 'não definido'}`)
    })
  })

  it('[13] Explorar: Console errors e warnings', () => {
    cy.log('=== TESTE 13: Verificar erros de console ===')
    
    const errors = []
    const warnings = []
    
    cy.on('window:before:load', (win) => {
      cy.spy(win.console, 'error')
      cy.spy(win.console, 'warn')
    })
    
    cy.window().then((win) => {
      if (win.console.error.called) {
        cy.log(`⚠ Erros de console detectados: ${win.console.error.callCount}`)
      } else {
        cy.log('✓ Nenhum erro de console')
      }
      
      if (win.console.warn.called) {
        cy.log(`⚠ Warnings de console: ${win.console.warn.callCount}`)
      } else {
        cy.log('✓ Nenhum warning de console')
      }
    })
  })

  it('[14] Resumo Final - Relatório Exploratório', () => {
    cy.log('====== RESUMO DO TESTE EXPLORATÓRIO ======')
    cy.log('Testes executados:')
    cy.log('  [01] Carregamento e elementos visíveis')
    cy.log('  [02] Formulário e campos disponíveis')
    cy.log('  [03] Validação de entrada de dados')
    cy.log('  [04] Comportamento de erros')
    cy.log('  [05] Interatividade (Hover/Focus)')
    cy.log('  [06] Conteúdo (links e imagens)')
    cy.log('  [07] Meta tags e SEO')
    cy.log('  [08] Acessibilidade')
    cy.log('  [09] Estilos CSS')
    cy.log('  [10] Responsividade')
    cy.log('  [11] Performance')
    cy.log('  [12] Segurança básica')
    cy.log('  [13] Erros de console')
    cy.log('====== FIM DO TESTE ======')
  })
})
