*** Settings ***
Documentation       Keywords comuns para testes - Navegação, validações básicas
Library             SeleniumLibrary
Library             Collections
Library             String
Library             DateTime
Library             RequestsLibrary
Resource            ../resources/variables.robot

*** Keywords ***

# ============================================================================
# SETUP E TEARDOWN
# ============================================================================

Abrir Navegador
    [Documentation]    Abre o navegador Chrome e acessa a URL base
    Open Browser       ${BASE_URL}    ${BROWSER}
    Set Window Size    1280    1024
    Wait Until Page Contains Element    ${FORM_CONTAINER}    ${PAGE_LOAD_TIMEOUT}
    Log    Página carregada com sucesso: ${BASE_URL}

Fechar Navegador
    [Documentation]    Fecha o navegador e limpa as sessões
    Close All Browsers

Limpar Dados de Teste
    [Documentation]    Limpa dados temporários entre testes
    Delete All Cookies
    Clear Browser Cache

# ============================================================================
# VALIDAÇÕES DE PÁGINA
# ============================================================================

Validar Página Carregada
    [Documentation]    Verifica se a página principal carregou sem erros
    Wait Until Page Contains Element    ${FORM_CONTAINER}    ${PAGE_LOAD_TIMEOUT}
    ${title}    Get Title
    Should Contain    ${title}    Certificação    case_insensitive=True

Validar Elementos Visíveis
    [Documentation]    Confirma que os elementos principais estão visíveis
    Element Should Be Visible    ${INPUT_NOME}
    Element Should Be Visible    ${INPUT_EMAIL}
    Element Should Be Visible    ${INPUT_TELEFONE}
    Element Should Be Visible    ${BUTTON_AVANCAR}
    Log    Todos os elementos estão visíveis

Validar Estrutura Do Formulário
    [Documentation]    Valida a estrutura básica do formulário
    ${forms}    Get WebElements    ${FORM_CONTAINER}
    Length Should Be    ${forms}    1
    Element Should Be Visible    ${INPUT_NOME}
    Element Should Be Visible    ${INPUT_EMAIL}
    Element Should Be Visible    ${INPUT_TELEFONE}
    Element Should Be Visible    ${BUTTON_AVANCAR}

Validar Status HTTP
    [Documentation]    Verifica se o status HTTP é 200 OK
    [Tags]    API
    Create Session    main    ${BASE_URL}
    ${response}    Get Request    main    /
    Should Be Equal As Numbers    ${response.status_code}    200
    Log    Status HTTP 200 OK

# ============================================================================
# INTERAÇÃO COM ELEMENTOS
# ============================================================================

Clicar Em Elemento
    [Arguments]    ${locator}
    [Documentation]    Clica em um elemento com retry automático
    Wait Until Element Is Visible    ${locator}    ${EXPLICIT_WAIT}
    Click Element    ${locator}
    Log    Clicado em: ${locator}

Preencher Campo
    [Arguments]    ${locator}    ${value}
    [Documentation]    Preenche um campo de entrada de forma segura
    Wait Until Element Is Visible    ${locator}    ${EXPLICIT_WAIT}
    Clear Element Text    ${locator}
    Input Text    ${locator}    ${value}
    Log    Campo preenchido - Locator: ${locator} | Valor: ${value}

Limpar Campo
    [Arguments]    ${locator}
    [Documentation]    Limpa o conteúdo de um campo de entrada
    Click Element    ${locator}
    Clear Element Text    ${locator}
    Log    Campo limpo: ${locator}

Marcar Checkbox
    [Arguments]    ${locator}
    [Documentation]    Marca um checkbox se não estiver marcado
    ${is_checked}    Run Keyword And Return Status    Checkbox Should Be Selected    ${locator}
    Run Keyword If    not ${is_checked}    Click Element    ${locator}
    Log    Checkbox marcado: ${locator}

Desmarcar Checkbox
    [Arguments]    ${locator}
    [Documentation]    Desmarca um checkbox se estiver marcado
    ${is_checked}    Run Keyword And Return Status    Checkbox Should Be Selected    ${locator}
    Run Keyword If    ${is_checked}    Click Element    ${locator}
    Log    Checkbox desmarcado: ${locator}

# ============================================================================
# VALIDAÇÕES DE CONTEÚDO
# ============================================================================

Validar Mensagem Erro
    [Arguments]    ${pattern}=${MSG_REQUIRED_FIELD}
    [Documentation]    Valida se uma mensagem de erro aparece
    Wait Until Page Contains Element    ${ERROR_MESSAGE}    ${EXPLICIT_WAIT}
    Element Should Be Visible    ${ERROR_MESSAGE}
    ${error_text}    Get Text    ${ERROR_MESSAGE}
    Should Match Regexp    ${error_text}    ${pattern}    case_insensitive=True
    Log    Mensagem de erro validada: ${error_text}

Validar Mensagem Sucesso
    [Arguments]    ${pattern}=${MSG_SUCCESS}
    [Documentation]    Valida se uma mensagem de sucesso aparece
    Wait Until Page Contains Element    ${SUCCESS_MESSAGE}    ${EXPLICIT_WAIT}
    Element Should Be Visible    ${SUCCESS_MESSAGE}
    ${success_text}    Get Text    ${SUCCESS_MESSAGE}
    Should Match Regexp    ${success_text}    ${pattern}    case_insensitive=True
    Log    Mensagem de sucesso validada: ${success_text}

Validar Campo Vazio Obrigatório
    [Arguments]    ${locator}
    [Documentation]    Verifica se um campo obrigatório está vazio (para teste de validação)
    Wait Until Element Is Visible    ${locator}    ${EXPLICIT_WAIT}
    ${value}    Get Value    ${locator}
    Should Be Empty    ${value}
    Log    Campo vazio confirmado: ${locator}

# ============================================================================
# PERFORMANCE E TIMING
# ============================================================================

Medir Tempo De Carregamento
    [Documentation]    Mede o tempo de carregamento da página
    ${start_time}    Get Time
    Go To    ${BASE_URL}
    Wait Until Page Contains Element    ${FORM_CONTAINER}    ${PAGE_LOAD_TIMEOUT}
    ${end_time}    Get Time
    ${load_time}    Evaluate    ${end_time} - ${start_time}
    Should Be True    ${load_time} < 3    Página carregou em ${load_time}s (máximo 3s)
    Log    Tempo de carregamento: ${load_time}s
    RETURN    ${load_time}

# ============================================================================
# SCREENSHOT E DEBUG
# ============================================================================

Capturar Screenshot
    [Arguments]    ${filename}
    [Documentation]    Captura screenshot com timestamp
    ${timestamp}    Get Time    epoch
    Set Screenshot Directory    robot/results/screenshots
    Screenshot    ${filename}_${timestamp}
    Log    Screenshot capturado: ${filename}_${timestamp}

Logar Estado Da Página
    [Documentation]    Registra informações do estado atual da página
    ${title}    Get Title
    ${url}    Get Location
    ${html}    Get Source
    Log    Título: ${title}
    Log    URL: ${url}
    Log    Comprimento do HTML: ${html.__len__()}

Logar Valores Dos Campos
    [Documentation]    Mostra os valores atuais de todos os campos
    ${nome}    Get Value    ${INPUT_NOME}
    ${email}    Get Value    ${INPUT_EMAIL}
    ${telefone}    Get Value    ${INPUT_TELEFONE}
    Log    Nome: ${nome} | Email: ${email} | Telefone: ${telefone}
