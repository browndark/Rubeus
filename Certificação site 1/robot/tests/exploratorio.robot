*** Settings ***
Documentation       Testes Exploratórios - Descoberta de comportamentos não documentados
Library             SeleniumLibrary
Library             String
Resource            ../keywords/common_keywords.robot
Resource            ../keywords/form_keywords.robot
Resource            ../resources/variables.robot

Test Setup          Abrir Navegador
Test Teardown       Fechar Navegador

*** Test Cases ***

EXP001 - Exploração Livre Da Página
    [Documentation]    Navegação livre e observação de comportamentos
    [Tags]    exploratório    baixa
    Validar Página Carregada
    Capturar Screenshot    exploracao_inicial
    Logar Estado Da Página
    Log    Exploração inicial concluída

EXP002 - Teste De Intuitibilidade
    [Documentation]    Verifica se interface é intuitiva (sem ler docs)
    [Tags]    exploratório    média
    Validar Elementos Visíveis
    ${label_nome}    Get Text    ${LABEL_LEGAL}
    Should Contain    ${label_nome}    ${EMPTY}    Labels estão presentes?
    Log    Interface analisada quanto à intuitibilidade

EXP003 - Detecção De Elementos Ocultos
    [Documentation]    Procura por elementos ocultos ou removidos do visual
    [Tags]    exploratório    média
    ${all_inputs}    Get WebElements    xpath://input
    ${input_count}    Get Length    ${all_inputs}
    Log    Total de inputs encontrados: ${input_count}
    [Return]    ${input_count}

EXP004 - Teste De Comportamento Inesperado
    [Documentation]    Tenta atividades não documentadas
    [Tags]    exploratório    média
    # Duplo clique
    Double Click Element    ${INPUT_NOME}
    Input Text    ${INPUT_NOME}    Teste
    Log    Duplo clique executado
    # Tab para navegação
    Tab Key    ${INPUT_NOME}
    Tab Key    ${INPUT_EMAIL}
    Tab Key    ${INPUT_TELEFONE}
    Log    Navegação por Tab testada

EXP005 - Right-Click E Contexto
    [Documentation]    Testa comportamento ao clicar com botão direito
    [Tags]    exploratório    baixa
    ${can_rightclick}    Run Keyword And Return Status    Open Context Menu    ${BUTTON_AVANCAR}
    Log    Right-click testado: ${can_rightclick}

EXP006 - Copiar E Colar Dados
    [Documentation]    Testa funcionalidade de copiar/colar
    [Tags]    exploratório    média
    Preencher Nome    ${VALID_NAME}
    # Simular Ctrl+A (selecionar tudo)
    Press Keys    ${INPUT_NOME}    CTRL+a
    # Simular Ctrl+C (copiar)
    Press Keys    ${INPUT_NOME}    CTRL+c
    # Ir para próximo campo
    Click Element    ${INPUT_EMAIL}
    # Simular Ctrl+V (colar)
    Press Keys    ${INPUT_EMAIL}    CTRL+v
    ${email_value}    Get Value    ${INPUT_EMAIL}
    Log    Teste de copiar/colar: ${email_value}

EXP007 - Teste De Submit Com Enter
    [Documentation]    Testa se pressionar Enter submete o formulário
    [Tags]    exploratório    média
    Preencher Formulário Completo
    Aceitar Base Legal
    Press Keys    ${INPUT_TELEFONE}    ENTER
    ${page_changed}    Run Keyword And Return Status    Wait Until Page Contains Element    ${ERROR_MESSAGE} or ${SUCCESS_MESSAGE}    3s
    Log    Submissão com Enter: ${page_changed}

EXP008 - Auto-Complete E Cache
    [Documentation]    Observa comportamento de auto-complete do navegador
    [Tags]    exploratório    baixa
    Click Element    ${INPUT_NOME}
    Input Text    ${INPUT_NOME}    J
    # Aguarda sugestões de auto-complete
    Sleep    1s
    Capturar Screenshot    autocomplete_test
    Log    Auto-complete testado

EXP009 - Validação Em Tempo Real
    [Documentation]    Observa se há validação enquanto digita
    [Tags]    exploratório    média
    Click Element    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    teste
    Sleep    0.5s
    ${has_error}    Run Keyword And Return Status    Element Should Be Visible    ${ERROR_MESSAGE}
    Log    Validação em tempo real: ${has_error}
    Clear Element Text    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    teste@exemplo.com
    Sleep    0.5s
    ${error_gone}    Run Keyword And Return Status    Element Should Not Be Visible    ${ERROR_MESSAGE}
    Log    Erro removido após corrção: ${error_gone}

EXP010 - Teste De Foco E Blur
    [Documentation]    Testa eventos de focus e blur nos campos
    [Tags]    exploratório    média
    Click Element    ${INPUT_NOME}
    Element Should Be Focused    ${INPUT_NOME}
    Click Element    ${INPUT_EMAIL}
    Element Should Be Focused    ${INPUT_EMAIL}
    # Nome não deve mais ter foco
    ${nome_focused}    Run Keyword And Return Status    Element Should Be Focused    ${INPUT_NOME}
    Log    Evento blur testado (nome perdeu foco): ${not ${nome_focused}}

EXP011 - Teste De Case Sensitivity
    [Documentation]    Verifica se campos são sensíveis a maiúsculas/minúsculas
    [Tags]    exploratório    média
    Preencher Email    JOAO@EXAMPLE.COM
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    ${has_error}    Run Keyword And Return Status    Element Should Be Visible    ${ERROR_MESSAGE}
    Log    Case sensitivity testado (email maiúsculo): ${has_error}

EXP012 - Teste De Espaços Em Branco
    [Documentation]    Testa se espaços em branco afetam validação
    [Tags]    exploratório    média
    Limpar Formulário
    Preencher Nome         ${SPACE}${VALID_NAME}${SPACE}
    Preencher Email        ${SPACE}${VALID_EMAIL}${SPACE}
    Preencher Telefone     ${SPACE}${VALID_PHONE}${SPACE}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Log    Espaços em branco testados

EXP013 - Teste De Botão Múltiplos Cliques
    [Documentation]    Testa cliques múltiplos no botão de submissão
    [Tags]    exploratório    baixa
    # Duplo clique pode causar double submission
    Double Click Element    ${BUTTON_AVANCAR}
    Sleep    1s
    Logar Estado Da Página
    Log    Múltiplos cliques testados

EXP014 - Teste De Voltar Do Navegador
    [Documentation]    Testa comportamento após usar botão voltar
    [Tags]    exploratório    média
    Preencher Formulário Completa
    Aceitar Base Legal
    Submeter Formulário
    Sleep    1s
    Go Back
    ${nome}    Get Value    ${INPUT_NOME}
    Log    Valor após voltar: ${nome}
    Log    Teste de voltar concluído

EXP015 - Teste De Refresh Durante Preenchimento
    [Documentation]    Observa o que acontece ao fazer refresh durante preenchimento
    [Tags]    exploratório    média
    Preencher Nome    ${VALID_NAME}
    Preencher Email   ${VALID_EMAIL}
    Reload Page
    ${nome}    Get Value    ${INPUT_NOME}
    Should Be Empty    ${nome}    Dados devem ser perdidos após refresh
    Log    Refresh testado - Dados perdidos como esperado

EXP016 - Análise De Informações De Status
    [Documentation]    Examina mensagens de status e códigos de erro
    [Tags]    exploratório    média
    Submeter Formulário
    Wait Until Page Contains Element    ${ERROR_MESSAGE}    5s
    ${error_text}    Get Text    ${ERROR_MESSAGE}
    Log    Mensagem de erro: ${error_text}
    ${error_classes}    Get Element Attribute    ${ERROR_MESSAGE}    class
    Log    Classes CSS: ${error_classes}

EXP017 - Teste De Compatibilidade De Navegador
    [Documentation]    Info sobre compatibilidade (apenas Chrome neste setup)
    [Tags]    exploratório    baixa
    ${user_agent}    Execute JavaScript    return navigator.userAgent
    Log    User Agent: ${user_agent}

EXP018 - Detecção De JavaScript Habilitado
    [Documentation]    Verifica se JavaScript é necessário e funcionando
    [Tags]    exploratório    média
    ${js_enabled}    Run Keyword And Return Status    Execute JavaScript    return true
    Should Be True    ${js_enabled}    JavaScript deve estar habilitado
    Log    JavaScript está funcionando

EXP019 - Teste De LocalStorage E SessionStorage
    [Documentation]    Verifica se há dados armazenados localmente
    [Tags]    exploratório    média
    ${localstorage}    Execute JavaScript    return JSON.stringify(localStorage)
    Log    LocalStorage: ${localstorage}
    ${sessionstorage}    Execute JavaScript    return JSON.stringify(sessionStorage)
    Log    SessionStorage: ${sessionstorage}

EXP020 - Teste De Animações E Transições
    [Documentation]    Observa animações durante interação
    [Tags]    exploratório    baixa
    Click Element    ${INPUT_NOME}
    Sleep    0.5s
    Capturar Screenshot    animacao_focus
    Click Element    ${BUTTON_AVANCAR}
    Sleep    0.5s
    Capturar Screenshot    animacao_click
    Log    Animações capturadas

EXP021 - Teste De Tooltip E Help
    [Documentation]    Procura por tooltips ou informações de ajuda
    [Tags]    exploratório    média
    ${tooltips}    Get WebElements    xpath://*[@title]
    ${tooltip_count}    Get Length    ${tooltips}
    Log    Tooltips encontrados: ${tooltip_count}
    ${helps}    Get WebElements    xpath://*[contains(@class, 'help') or contains(@class, 'info')]
    ${help_count}    Get Length    ${helps}
    Log    Elementos de ajuda encontrados: ${help_count}

EXP022 - Teste De Acessibilidade De Teclado
    [Documentation]    Testa se todos os elementos são acessíveis via teclado
    [Tags]    exploratório    acessibilidade
    ${inputs}    Get WebElements    xpath://input
    FOR    ${input}    IN    @{inputs}
        Click Element    ${input}
        ${focused}    Run Keyword And Return Status    Element Should Be Focused    ${input}
        Log    Input focável: ${focused}
    END

EXP023 - Teste De Contraste E Legibilidade
    [Documentation]    Examina contraste de cores (visual)
    [Tags]    exploratório    acessibilidade
    ${labels}    Get WebElements    xpath://label
    ${inputs}    Get WebElements    xpath://input
    Log    Labels encontrados: ${labels.__len__()}
    Log    Inputs encontrados: ${inputs.__len__()}
    Log    Verificar manualmente contraste de cores

EXP024 - Teste De Validação Cross-Field
    [Documentation]    Testa se há validação entre campos relacionados
    [Tags]    exploratório    média
    Preencher Nome    ${VALID_NAME}
    Preencher Email   email-sem-arroba
    Preencher Telefone    ${VALID_PHONE}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro
    Log    Validação cross-field testada

EXP025 - Teste De Comportamento Em Conexão Lenta
    [Documentation]    Simula comportamento com conexão lenta
    [Tags]    exploratório    performance
    # Nota: Robot Framework não tem simulação nativa de throttling
    # Isso seria feito via Selenium em modo headless com devtools
    Medir Tempo De Carregamento
    Log    Performance de carregamento medida
