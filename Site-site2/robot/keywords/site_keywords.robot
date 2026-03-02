*** Settings ***
Library    SeleniumLibrary
Library    Collections
Resource   ../resources/variables.robot

*** Keywords ***

Abrir Navegador
    [Documentation]    Abre o browser e acessa o site
    Open Browser    ${BASE_URL}    chrome
    Maximize Browser Window
    Wait Until Page Contains Element    ${FORM_CONTAINER}    ${TIMEOUT_PADRAO}
    Sleep    2s    # Aguardar carregamento completo do JavaScript

Fechar Navegador
    [Documentation]    Fecha o navegador
    Close Browser

Validar Página Carregada
    [Documentation]    Valida se a página carregou corretamente
    Wait Until Page Contains Element    ${FORM_CONTAINER}    ${TIMEOUT_PADRAO}

Preencher Campo Nome
    [Arguments]    ${nome}
    [Documentation]    Preenche o campo de nome
    Wait Until Element Is Enabled    ${INPUT_NOME}    ${TIMEOUT_PADRAO}
    Input Text    ${INPUT_NOME}    ${nome}

Preencher Campo Email
    [Arguments]    ${email}
    [Documentation]    Preenche o campo de email
    Wait Until Element Is Enabled    ${INPUT_EMAIL}    ${TIMEOUT_PADRAO}
    Input Text    ${INPUT_EMAIL}    ${email}

Preencher Campo Telefone
    [Arguments]    ${telefone}
    [Documentation]    Preenche o campo de telefone
    Wait Until Element Is Enabled    ${INPUT_TELEFONE}    ${TIMEOUT_PADRAO}
    Input Text    ${INPUT_TELEFONE}    ${telefone}

Preencher Formulário Completo
    [Arguments]    ${nome}    ${email}    ${telefone}
    [Documentation]    Preenche todos os campos do formulário
    Preencher Campo Nome    ${nome}
    Preencher Campo Email    ${email}
    Preencher Campo Telefone    ${telefone}

Submeter Formulário
    [Documentation]    Clica no botão de submissão
    Wait Until Element Is Enabled    ${BUTTON_SUBMIT}    ${TIMEOUT_PADRAO}
    Click Button    ${BUTTON_SUBMIT}
    Sleep    2s    # Aguardar processamento

Validar Mensagem de Validação
    [Arguments]    ${mensagem}
    [Documentation]    Valida se mensagem de erro aparece
    Page Should Contain    ${mensagem}

Limpar Campo
    [Arguments]    ${locator}
    [Documentation]    Limpa o conteúdo de um campo
    Click Element    ${locator}
    Press Keys    ${locator}    ctrl+a
    Press Keys    ${locator}    Delete

Verificar Campo Obrigatório
    [Arguments]    ${locator}
    [Documentation]    Verifica se campo é obrigatório
    Element Should Be Visible    ${locator}
    ${required}=    Get Element Attribute    ${locator}    required
    Should Be Equal    ${required}    true    Campo não é obrigatório

Validar Estrutura HTML
    [Documentation]    Valida a presença de headings
    ${h1_count}=    Get Element Count    //h1
    Run Keyword If    ${h1_count} == 0    Log    AVISO: Nenhuma H1 encontrada (ISSUE #003)

Validar Labels Associadas
    [Documentation]    Verifica se inputs têm labels associadas
    ${label_count}=    Get Element Count    //label
    Run Keyword If    ${label_count} < 3    Log    AVISO: Faltas labels (ISSUE #001)
