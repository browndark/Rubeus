describe('[SCANNER] Captura Completa de Erros - Browser DevTools', () => {
  
  it('[SCANNER] Scanear todos os tipos de erro do devtools', () => {
    const erros_capturados = {
      timestamp: new Date().toISOString(),
      url: 'https://qualidade.apprbs.com.br/certificacao',
      javascript_errors: [],
      console_errors: [],
      console_warnings: [],
      elementos_com_problemas: [],
      resumo: {
        total_inputs: 0,
        total_buttons: 0,
        total_scripts: 0,
        total_erros_js: 0
      }
    }

    // Capturar erros JavaScript globais
    cy.on('uncaught:exception', (err, runnable) => {
      erros_capturados.javascript_errors.push({
        mensagem: err.message,
        tipo: err.name,
        hora: new Date().toISOString()
      })
      cy.log(`🔴 JS ERROR: ${err.message}`)
      return false
    })

    // Visitar página
    cy.visit('https://qualidade.apprbs.com.br/certificacao', { failOnStatusCode: false })
    cy.wait(2000)

    cy.log('')
    cy.log('═══════════════════════════════════════════════════════════ ')
    cy.log('🔍 VARREDURA COMPLETA DE ERROS - DEVTOOLS SCANNER')
    cy.log('═══════════════════════════════════════════════════════════ ')
    cy.log('')

    // ===== ANÁLISE DE ELEMENTOS =====
    cy.log('📊 ANÁLISE DE ELEMENTOS DA PÁGINA')
    cy.log('─────────────────────────────────')
    
    cy.get('input').then(($inputs) => {
      erros_capturados.resumo.total_inputs = $inputs.length
      cy.log(`  ✅ Inputs encontrados: ${$inputs.length}`)
      
      // Check inputs com onclick
      $inputs.each((i, el) => {
        const onclick = Cypress.$(el).attr('onclick')
        if (onclick) {
          if (onclick.includes('ActionsForm')) {
            erros_capturados.elementos_com_problemas.push({
              elemento: `input[${i}]`,
              problema: 'onclick chama ActionsForm não definida',
              handler: onclick.substring(0, 60) + '...'
            })
          }
        }
      })
    })

    cy.get('button').then(($btns) => {
      erros_capturados.resumo.total_buttons = $btns.length
      cy.log(`  ✅ Buttons encontrados: ${$btns.length}`)
    })

    cy.get('script').then(($scripts) => {
      erros_capturados.resumo.total_scripts = $scripts.length
      cy.log(`  ✅ Scripts carregados: ${$scripts.length}`)
    })

    cy.log('')

    // ===== VERIFICAÇÃO DE HTML =====
    cy.log('📋 VERIFICAÇÃO DE ESTRUTURA HTML')
    cy.log('─────────────────────────────────')
    
    cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
      if ($headings.length === 0) {
        cy.log('  ⚠️ ALERTA: Nenhum heading encontrado (h1-h6)')
      } else {
        cy.log(`  ✅ Headings encontrados: ${$headings.length}`)
      }
    })

    cy.get('textarea').then(($textareas) => {
      if ($textareas.length === 0) {
        cy.log('  ⚠️ ALERTA: Nenhum textarea encontrado')
      } else {
        cy.log(`  ✅ Textareas encontrados: ${$textareas.length}`)
      }
    })

    cy.get('form').then(($forms) => {
      cy.log(`  ✅ Forms encontrados: ${$forms.length}`)
    })

    cy.log('')

    // ===== TESTES COM ELEMENTOS =====
    cy.log('⚡ TESTANDO INTERATIVIDADE (PODE DISPARAR ERROS)')
    cy.log('─────────────────────────────────────────────')
    
    cy.get('input').then(($inputs) => {
      if ($inputs.length > 0) {
        cy.log(`  Testando primeiro input...`)
        cy.wrap($inputs[0]).type('teste', { force: true, delay: 30 })
        cy.wait(300)
      }
    })

    cy.get('button').then(($btns) => {
      if ($btns.length > 0) {
        cy.log(`  Testando primeiro button...`)
        cy.wrap($btns[0]).click({ force: true })
        cy.wait(300)
      }
    })

    cy.log('')

    // ===== ANÁLISE DO WINDOW OBJECT =====
    cy.log('🪟 ANÁLISE DO WINDOW OBJECT')
    cy.log('────────────────────────────')
    
    cy.window().then((win) => {
      // Procurar por ActionsForm
      const temActionsForm = typeof win.ActionsForm !== 'undefined'
      if (temActionsForm) {
        cy.log('  ✅ ActionsForm encontrado')
      } else {
        cy.log('  🔴 CRÍTICO: ActionsForm NÃO ENCONTRADO')
        erros_capturados.elementos_com_problemas.push({
          elemento: 'window.ActionsForm',
          problema: 'Função não definida no escopo global',
          impacto: 'Bloqueará interações com forms'
        })
      }

      // Procurar bibliotecas
      const libs = {
        jQuery: typeof win.jQuery !== 'undefined',
        React: typeof win.React !== 'undefined',
        Angular: typeof win.angular !== 'undefined',
        Vue: typeof win.Vue !== 'undefined'
      }

      Object.entries(libs).forEach(([lib, existe]) => {
        if (existe) {
          cy.log(`  ✅ ${lib} detectado`)
        }
      })

      // Performance metrics
      const perf = win.performance
      if (perf && perf.timing) {
        const loadTime = perf.timing.loadEventEnd - perf.timing.navigationStart
        cy.log(`  ⏱️  Tempo de carregamento: ${loadTime}ms`)
      }
    })

    cy.log('')

    // ===== VERIFICAÇÃO META TAGS =====
    cy.log('📌 META TAGS E SEO')
    cy.log('───────────────────')
    
    cy.get('meta[charset]').then(($el) => {
      cy.log(`  ${$el.length > 0 ? '✅' : '❌'} Charset definido`)
    })

    cy.get('meta[name="viewport"]').then(($el) => {
      cy.log(`  ${$el.length > 0 ? '✅' : '❌'} Viewport meta tag`)
    })

    cy.get('meta[name="description"]').then(($el) => {
      cy.log(`  ${$el.length > 0 ? '✅' : '❌'} Description meta tag`)
    })

    cy.get('title').then(($el) => {
      cy.log(`  ${$el.length > 0 ? '✅' : '⚠️'} Título da página: "${$el.text()}"`)
    })

    cy.log('')

    // ===== DOCTYPE =====
    cy.log('📄 DOCTYPE E DECLARAÇÕES')
    cy.log('────────────────────────')
    
    cy.document().then((doc) => {
      const doctype = doc.doctype
      if (doctype) {
        cy.log(`  ✅ DOCTYPE: ${doctype.name}`)
      } else {
        cy.log(`  ⚠️ ALERTA: DOCTYPE não declarado (pode estar em Quirks Mode)`)
      }
    })

    cy.log('')

    // ===== RELATÓRIO FINAL =====
    cy.log('═══════════════════════════════════════════════════════════')
    cy.log('📊 RESUMO FINAL')
    cy.log('═══════════════════════════════════════════════════════════')
    cy.log('')
    cy.log(`Total de Inputs: ${erros_capturados.resumo.total_inputs}`)
    cy.log(`Total de Buttons: ${erros_capturados.resumo.total_buttons}`)
    cy.log(`Total de Scripts: ${erros_capturados.resumo.total_scripts}`)
    cy.log(`Total de JS Errors: ${erros_capturados.javascript_errors.length}`)
    cy.log(`Total de Problemas Encontrados: ${erros_capturados.elementos_com_problemas.length}`)
    cy.log('')

    if (erros_capturados.javascript_errors.length > 0) {
      cy.log('🔴 ERROS JAVASCRIPT ENCONTRADOS:')
      erros_capturados.javascript_errors.forEach((err, i) => {
        cy.log(`  [${i+1}] ${err.mensagem}`)
      })
      cy.log('')
    }

    if (erros_capturados.elementos_com_problemas.length > 0) {
      cy.log('⚠️ PROBLEMAS ENCONTRADOS:')
      erros_capturados.elementos_com_problemas.forEach((prob, i) => {
        cy.log(`  [${i+1}] ${prob.elemento}: ${prob.problema}`)
      })
      cy.log('')
    }

    // Salvar relatório
    cy.writeFile('cypress/scanner_results.json', erros_capturados, { flag: 'w' })
    cy.log('✅ Relatório salvo em: cypress/scanner_results.json')
    cy.log('═══════════════════════════════════════════════════════════')
  })
})
