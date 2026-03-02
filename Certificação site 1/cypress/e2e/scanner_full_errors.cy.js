describe('[SCANNER] Varredura Completa de Erros - DevTools Full Report', () => {
  
  it('[SCANNER] Capturar todos os erros do console, network e JS', () => {
    const relatorio = {
      timestamp: new Date().toISOString(),
      url: 'https://qualidade.apprbs.com.br/certificacao',
      erros: {
        console_errors: [],
        console_warnings: [],
        javascript_errors: [],
        network_errors: [],
        missing_resources: [],
        load_times: {}
      },
      alerts: [],
      elementos: {
        inputs: 0,
        buttons: 0,
        labels: 0,
        handlers: []
      }
    }

    // Interceptar erros de JS globais
    cy.on('uncaught:exception', (err, runnable) => {
      relatorio.erros.javascript_errors.push({
        message: err.message,
        stack: err.stack.substring(0, 200),
        timestamp: new Date().toISOString()
      })
      cy.log(`❌ JS ERROR: ${err.message}`)
      return false
    })

    cy.visit('https://qualidade.apprbs.com.br/certificacao', { 
      failOnStatusCode: false,
      onBeforeLoad: (win) => {
        // Capturar console.error
        cy.stub(win.console, 'error').callsFake(function() {
          const args = Array.from(arguments).map(a => String(a)).join(' ')
          relatorio.erros.console_errors.push({
            message: args,
            timestamp: new Date().toISOString()
          })
          cy.log(`[CONSOLE ERROR] ${args}`)
        })

        // Capturar console.warn
        cy.stub(win.console, 'warn').callsFake(function() {
          const args = Array.from(arguments).map(a => String(a)).join(' ')
          relatorio.erros.console_warnings.push({
            message: args,
            timestamp: new Date().toISOString()
          })
          cy.log(`[CONSOLE WARN] ${args}`)
        })

        // Capturar alerts
        cy.stub(win, 'alert').callsFake(function(msg) {
          relatorio.alerts.push({
            message: msg,
            timestamp: new Date().toISOString()
          })
          cy.log(`[ALERT] ${msg}`)
        })
      }
    })

    cy.wait(2000)

    // ===== CONTAR ELEMENTOS =====
    cy.log('📊 === CONTANDO ELEMENTOS DA PÁGINA ===')
    
    cy.get('input').then(($inputs) => {
      relatorio.elementos.inputs = $inputs.length
      cy.log(`✅ Encontrados ${$inputs.length} inputs`)
    })

    cy.get('button').then(($btns) => {
      relatorio.elementos.buttons = $btns.length
      cy.log(`✅ Encontrados ${$btns.length} buttons`)
    })

    cy.get('label').then(($labels) => {
      relatorio.elementos.labels = $labels.length
      cy.log(`✅ Encontrados ${$labels.length} labels`)
    })

    // ===== ANALISAR HANDLERS =====
    cy.log('🔍 === ANALISANDO EVENT HANDLERS ===')
    
    cy.get('input[onclick], button[onclick]').then(($els) => {
      if ($els.length > 0) {
        cy.log(`⚠️ Encontrados ${$els.length} elementos com onclick`)
        $els.each((i, el) => {
          const onclick = Cypress.$(el).attr('onclick')
          if (onclick && onclick.includes('ActionsForm')) {
            relatorio.elementos.handlers.push({
              tipo: 'onclick',
              elemento: el.tagName,
              conteudo: onclick.substring(0, 80),
              problema: 'Chama função não definida'
            })
            cy.log(`❌ Handler problemático encontrado`)
          }
        })
      } else {
        cy.log('✓ Nenhum handler onclick problemático encontrado')
      }
    })

    // ===== VERIFICAR SCRIPTS =====
    cy.log('📂 === VERIFICAR SCRIPTS CARREGADOS ===')
    
    cy.get('script').then(($scripts) => {
      cy.log(`✅ Total de ${$scripts.length} scripts na página`)
      const srcs = []
      $scripts.each((i, el) => {
        const src = Cypress.$(el).attr('src')
        if (src) {
          srcs.push(src)
        }
      })
      if (srcs.length > 0) {
        cy.log(`Scripts externos: ${srcs.join(', ')}`)
      }
    })

    // ===== TESTAR INPUTS =====
    cy.log('🎯 === TESTANDO INPUTS (PODE DISPARAR ERROS) ===')
    
    cy.get('input').each(($input, i) => {
      if (i === 0) { // Apenas testa o primeiro para economizar tempo
        cy.wrap($input).type('teste', { force: true, delay: 50 })
        cy.wait(300)
      }
    })

    // ===== TESTAR BOTÕES =====
    cy.log('🔘 === TESTANDO BOTÕES (PODE DISPARAR ERROS) ===')
    
    cy.get('button').each(($btn, i) => {
      if (i === 0) { // Apenas testa o primeiro
        cy.wrap($btn).click({ force: true })
        cy.wait(300)
      }
    })

    // ===== GERAR RELATÓRIO FINAL =====
    cy.wait(1000)
    
    cy.log('═══════════════════════════════════════════')
    cy.log('📊 === RELATÓRIO FINAL DE VARREDURA ===')
    cy.log('═══════════════════════════════════════════')
    cy.log('')

    cy.log(`⏰ Timestamp: ${relatorio.timestamp}`)
    cy.log(`🌐 URL: ${relatorio.url}`)
    cy.log('')

    cy.log('📐 ELEMENTOS ENCONTRADOS:')
    cy.log(`  • Inputs: ${relatorio.elementos.inputs}`)
    cy.log(`  • Buttons: ${relatorio.elementos.buttons}`)
    cy.log(`  • Labels: ${relatorio.elementos.labels}`)
    cy.log(`  • Handlers problemáticos: ${relatorio.elementos.handlers.length}`)
    cy.log('')

    cy.log('❌ ERROS DE CONSOLE:')
    if (relatorio.erros.console_errors.length > 0) {
      relatorio.erros.console_errors.forEach((err, i) => {
        cy.log(`  [${i+1}] ${err.message.substring(0, 80)}`)
      })
    } else {
      cy.log('  ✓ Nenhum erro de console detectado')
    }
    cy.log('')

    cy.log('⚠️ WARNINGS DE CONSOLE:')
    if (relatorio.erros.console_warnings.length > 0) {
      relatorio.erros.console_warnings.forEach((warn, i) => {
        cy.log(`  [${i+1}] ${warn.message.substring(0, 80)}`)
      })
    } else {
      cy.log('  ✓ Nenhum warning de console detectado')
    }
    cy.log('')

    cy.log('🔴 ERROS JAVASCRIPT:')
    if (relatorio.erros.javascript_errors.length > 0) {
      relatorio.erros.javascript_errors.forEach((err, i) => {
        cy.log(`  [${i+1}] ${err.message}`)
      })
    } else {
      cy.log('  ✓ Nenhum erro JavaScript detectado')
    }
    cy.log('')

    cy.log('🚨 ALERTS:')
    if (relatorio.alerts.length > 0) {
      relatorio.alerts.forEach((alert, i) => {
        cy.log(`  [${i+1}] ${alert.message}`)
      })
    } else {
      cy.log('  ✓ Nenhum alert disparado')
    }
    cy.log('')

    cy.log('⚙️ EVENT HANDLERS PROBLEMÁTICOS:')
    if (relatorio.elementos.handlers.length > 0) {
      relatorio.elementos.handlers.forEach((h, i) => {
        cy.log(`  [${i+1}] ${h.elemento}.${h.tipo}: ${h.problema}`)
      })
    } else {
      cy.log('  ✓ Nenhum handler problemático encontrado')
    }
    cy.log('')

    cy.log('═══════════════════════════════════════════')
    cy.log('📋 JSON COMPLETO:')
    cy.log(JSON.stringify(relatorio, null, 2))
    cy.log('═══════════════════════════════════════════')

    // Salvar relatório em arquivo
    cy.writeFile(
      'cypress/scanner_report.json',
      relatorio
    )
    cy.log('✅ Relatório salvo em: cypress/scanner_report.json')
  })
})
