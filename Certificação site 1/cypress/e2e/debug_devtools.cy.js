describe('Debug DevTools - Análise Completa da Página', () => {
  
  beforeEach(() => {
    // Capturar todos os logs do console
    const logs = {
      errors: [],
      warnings: [],
      logs: []
    }
    
    cy.window().then((win) => {
      cy.stub(win.console, 'error').callsFake((message) => {
        logs.errors.push(message)
      })
      cy.stub(win.console, 'warn').callsFake((message) => {
        logs.warnings.push(message)
      })
      cy.stub(win.console, 'log').callsFake((message) => {
        logs.logs.push(message)
      })
    })
  })

  it('[DEBUG] Carregar página e capturar erros de console', () => {
    cy.visit('/certificacao', { failOnStatusCode: false })
    cy.log('=== PÁGINA CARREGADA ===')
    
    // Aguardar um pouco para scripts carregarem
    cy.wait(2000)
    
    // Capturar erros de JS
    cy.on('uncaught:exception', (err, runnable) => {
      cy.log(`❌ ERRO JS DETECTADO: ${err.message}`)
      cy.log(`Stack: ${err.stack}`)
      return false // Não falha o teste, apenas log
    })
    
    cy.window().then((win) => {
      cy.log('📊 === ANÁLISE DO WINDOW ===')
      cy.log(`URL: ${win.location.href}`)
      cy.log(`User Agent: ${win.navigator.userAgent}`)
      cy.log(`Language: ${win.navigator.language}`)
    })
  })

  it('[DEBUG] Analisar estrutura do HTML', () => {
    cy.visit('/certificacao', { failOnStatusCode: false })
    cy.wait(1000)
    
    cy.log('🔍 === ANÁLISE DE ELEMENTOS ===')
    
    // Contar elementos
    cy.get('*').then(($all) => {
      cy.log(`Total de elementos: ${$all.length}`)
    })
    
    // Verificar formulários
    cy.get('form, [role="form"]').then(($forms) => {
      cy.log(`Formulários encontrados: ${$forms.length}`)
      if ($forms.length > 0) {
        cy.log(`IDs de formulários: ${$forms.map((i, el) => el.id).get().join(', ')}`)
      }
    })
    
    // Verificar inputs
    cy.get('input').then(($inputs) => {
      cy.log(`Total de inputs: ${$inputs.length}`)
      cy.log('Detalhes dos inputs:')
      $inputs.each((i, el) => {
        const type = el.getAttribute('type')
        const name = el.getAttribute('name')
        const id = el.getAttribute('id')
        const placeholder = el.getAttribute('placeholder')
        const visible = Cypress.$(el).is(':visible')
        cy.log(`  [${i}] type=${type} | name=${name} | id=${id} | placeholder=${placeholder} | visible=${visible}`)
      })
    })
    
    // Verificar buttons
    cy.get('button').then(($buttons) => {
      cy.log(`Total de botões: ${$buttons.length}`)
      cy.log('Detalhes dos botões:')
      $buttons.each((i, el) => {
        const text = el.textContent.trim()
        const type = el.getAttribute('type')
        const onclick = el.getAttribute('onclick')
        const visible = Cypress.$(el).is(':visible')
        cy.log(`  [${i}] text="${text.substring(0, 30)}" | type=${type} | onclick=${onclick ? 'SIM' : 'NÃO'} | visible=${visible}`)
      })
    })
    
    // Verificar labels
    cy.get('label').then(($labels) => {
      cy.log(`Total de labels: ${$labels.length}`)
      if ($labels.length > 0) {
        cy.log('Texto dos labels:')
        $labels.each((i, el) => {
          const text = el.textContent.trim()
          const forAttr = el.getAttribute('for')
          cy.log(`  [${i}] "${text.substring(0, 50)}" | for="${forAttr}"`)
        })
      }
    })
  })

  it('[DEBUG] Analisar CSS e estilos', () => {
    cy.visit('/certificacao', { failOnStatusCode: false })
    cy.wait(1000)
    
    cy.log('🎨 === ANÁLISE DE CSS ===')
    
    // Verificar classes globais
    cy.get('body').then(($body) => {
      const classes = $body.attr('class')
      cy.log(`Classes do body: ${classes || 'NENHUMA'}`)
    })
    
    // Procurar por Quirks Mode
    cy.window().then((win) => {
      const doctype = win.document.doctype
      if (doctype) {
        cy.log(`DOCTYPE: ${doctype.name}`)
      } else {
        cy.log(`⚠️  QUIRKS MODE DETECTADO! DOCTYPE faltando`)
      }
      
      const mode = win.document.compatMode
      cy.log(`Modo de compatibilidade: ${mode}`)
    })
    
    // Analisar inputs visíveis
    cy.get('input:visible').then(($inputs) => {
      cy.log(`Inputs visíveis: ${$inputs.length}`)
      $inputs.each((i, el) => {
        const computed = win.getComputedStyle(el)
        const display = computed.display
        const visibility = computed.visibility
        const opacity = computed.opacity
        cy.log(`  Input[${i}]: display=${display} | visibility=${visibility} | opacity=${opacity}`)
      })
    })
  })

  it('[DEBUG] Inspecionar Network e Performance', () => {
    cy.visit('/certificacao', { failOnStatusCode: false })
    
    cy.log('📡 === ANÁLISE DE PERFORMANCE ===')
    
    cy.window().then((win) => {
      // Performance metrics
      const perf = win.performance
      const navTiming = perf.timing
      
      if (navTiming) {
        const pageLoadTime = navTiming.loadEventEnd - navTiming.navigationStart
        const domContentLoaded = navTiming.domContentLoadedEventEnd - navTiming.navigationStart
        const firstByte = navTiming.responseStart - navTiming.navigationStart
        
        cy.log(`Tempo total de carregamento: ${pageLoadTime}ms`)
        cy.log(`DOMContentLoaded: ${domContentLoaded}ms`)
        cy.log(`Primeiro byte: ${firstByte}ms`)
      }
      
      // Resources
      const resources = perf.getEntriesByType('resource')
      cy.log(`Recursos carregados: ${resources.length}`)
      
      // Agrupar por tipo
      const types = {}
      resources.forEach(r => {
        const ext = r.name.split('.').pop()
        types[ext] = (types[ext] || 0) + 1
      })
      
      Object.entries(types).forEach(([ext, count]) => {
        cy.log(`  .${ext}: ${count} arquivos`)
      })
    })
  })

  it('[DEBUG] Verificar scripts e bibliotecas', () => {
    cy.visit('/certificacao', { failOnStatusCode: false })
    cy.wait(1000)
    
    cy.log('📝 === ANÁLISE DE SCRIPTS ===')
    
    // Listar scripts carregados
    cy.get('script').then(($scripts) => {
      cy.log(`Total de scripts: ${$scripts.length}`)
      cy.log('Scripts detectados:')
      $scripts.each((i, el) => {
        const src = el.getAttribute('src')
        const type = el.getAttribute('type') || 'text/javascript'
        const inline = !src
        if (src) {
          cy.log(`  [${i}] src="${src.substring(0, 60)}"`)
        }
      })
    })
    
    // Verificar bibliotecas globais
    cy.window().then((win) => {
      cy.log('Bibliotecas globais detectadas:')
      
      const libs = {
        'jQuery': win.jQuery,
        'React': win.React,
        'Angular': win.angular,
        'Vue': win.Vue,
        'Axios': win.axios,
        'Fetch API': !!win.fetch,
        '$': win.$
      }
      
      Object.entries(libs).forEach(([name, exists]) => {
        if (exists) {
          cy.log(`  ✓ ${name}`)
        }
      })
    })
  })

  it('[DEBUG] Inspecionar Storage', () => {
    cy.visit('/certificacao', { failOnStatusCode: false })
    
    cy.log('💾 === ANÁLISE DE STORAGE ===')
    
    cy.window().then((win) => {
      // LocalStorage
      const localStorageKeys = Object.keys(win.localStorage)
      cy.log(`LocalStorage items: ${localStorageKeys.length}`)
      if (localStorageKeys.length > 0) {
        localStorageKeys.slice(0, 10).forEach(key => {
          const value = win.localStorage.getItem(key)
          cy.log(`  ${key}: ${value.substring(0, 50)}...`)
        })
      }
      
      // SessionStorage
      const sessionStorageKeys = Object.keys(win.sessionStorage)
      cy.log(`SessionStorage items: ${sessionStorageKeys.length}`)
      if (sessionStorageKeys.length > 0) {
        sessionStorageKeys.slice(0, 10).forEach(key => {
          const value = win.sessionStorage.getItem(key)
          cy.log(`  ${key}: ${value.substring(0, 50)}...`)
        })
      }
      
      // Cookies
      cy.log(`Cookies: ${win.document.cookie}`)
    })
  })

  it('[DEBUG] Capturar screenshot da página', () => {
    cy.visit('/certificacao', { failOnStatusCode: false })
    cy.wait(1500)
    
    // Screenshot da página inteira
    cy.screenshot('0-pagina-completa', { capture: 'fullPage' })
    cy.log('✓ Screenshot 1: Página completa capturada')
    
    // Screenshot do viewport
    cy.screenshot('1-viewport-padrao', { capture: 'viewport' })
    cy.log('✓ Screenshot 2: Viewport padrão capturado')
    
    // Screenshot em diferentes resoluções
    const viewports = [
      { width: 1920, height: 1080, name: '3-desktop-1920' },
      { width: 1280, height: 720, name: '4-desktop-1280' },
      { width: 768, height: 1024, name: '5-tablet-768' },
      { width: 375, height: 667, name: '6-mobile-375' }
    ]
    
    viewports.forEach((vp) => {
      cy.viewport(vp.width, vp.height)
      cy.wait(500)
      cy.screenshot(vp.name, { capture: 'viewport' })
      cy.log(`✓ Screenshot: ${vp.name} (${vp.width}x${vp.height})`)
    })
  })

  it('[DEBUG] Relatório Final Completo', () => {
    cy.visit('/certificacao', { failOnStatusCode: false })
    cy.wait(2000)
    
    cy.log('════════════════════════════════════')
    cy.log('📋 RELATÓRIO FINAL DE DEBUG')
    cy.log('════════════════════════════════════')
    cy.log('')
    
    const relatorio = {
      timestamp: new Date().toISOString(),
      url: 'https://qualidade.apprbs.com.br/certificacao',
      resultado: {
        elementos: {},
        performance: {},
        problemas: []
      }
    }
    
    cy.get('input').then(($inputs) => {
      relatorio.resultado.elementos.inputs = $inputs.length
      relatorio.resultado.elementos.inputsVisiveis = $inputs.filter(':visible').length
    })
    
    cy.get('button').then(($buttons) => {
      relatorio.resultado.elementos.botoes = $buttons.length
      relatorio.resultado.elementos.botoesVisiveis = $buttons.filter(':visible').length
    })
    
    cy.get('form').then(($forms) => {
      relatorio.resultado.elementos.formularios = $forms.length
    })
    
    cy.get('label').then(($labels) => {
      relatorio.resultado.elementos.labels = $labels.length
    })
    
    cy.window().then((win) => {
      const timing = win.performance.timing
      if (timing) {
        relatorio.resultado.performance.tempoTotal = timing.loadEventEnd - timing.navigationStart
        relatorio.resultado.performance.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart
      }
    })
    
    cy.log('')
    cy.log('═══ RESUMO ═══')
    cy.log(`Total de inputs: ${relatorio.resultado.elementos.inputs} (${relatorio.resultado.elementos.inputsVisiveis} visíveis)`)
    cy.log(`Total de botões: ${relatorio.resultado.elementos.botoes} (${relatorio.resultado.elementos.botoesVisiveis} visíveis)`)
    cy.log(`Total de formulários: ${relatorio.resultado.elementos.formularios}`)
    cy.log(`Total de labels: ${relatorio.resultado.elementos.labels}`)
    cy.log('')
    cy.log('═══ SCREENSHOTS CAPTURADOS ═══')
    cy.log('✓ 0-pagina-completa.png')
    cy.log('✓ 1-viewport-padrao.png')
    cy.log('✓ 3-desktop-1920.png')
    cy.log('✓ 4-desktop-1280.png')
    cy.log('✓ 5-tablet-768.png')
    cy.log('✓ 6-mobile-375.png')
    cy.log('')
    cy.log('════════════════════════════════════')
    cy.log(JSON.stringify(relatorio, null, 2))
  })
})
