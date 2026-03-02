*** Settings ***
Documentation       Keywords específicas para o formulário de Certificação
Library             SeleniumLibrary
Library             String
Resource            ../resources/variables.robot
Resource            common_keywords.robot

*** Keywords ***

# ============================================================================
# PREENCHIMENTO DO FORMULÁRIO
# ============================================================================

Preencher Nome
    [Arguments]    ${nome}=${VALID_NAME}
    [Documentation]    Preenche o campo Nome
    Preencher Campo    ${INPUT_NOME}    ${nome}
    Log    Nome preenchido: ${nome}

Preencher Email
    [Arguments]    ${email}=${VALID_EMAIL}
    [Documentation]    Preenche o campo Email
    Preencher Campo    ${INPUT_EMAIL}    ${email}
    Log    Email preenchido: ${email}

Preencher Telefone
    [Arguments]    ${telefone}=${VALID_PHONE}
    [Documentation]    Preenche o campo Telefone
    Preencher Campo    ${INPUT_TELEFONE}    ${telefone}
    Log    Telefone preenchido: ${telefone}

Preencher CPF
    [Arguments]    ${cpf}=${VALID_CPF}
    [Documentation]    Preenche o campo CPF (se existir)
    ${exists}    Run Keyword And Return Status    Element Should Be Visible    ${INPUT_CPF}
    Run Keyword If    ${exists}    Preencher Campo    ${INPUT_CPF}    ${cpf}
    Run Keyword Unless    ${exists}    Log    Campo CPF não existe na página

Preencher Formulário Completo
    [Arguments]    ${nome}=${VALID_NAME}    ${email}=${VALID_EMAIL}    ${telefone}=${VALID_PHONE}
    [Documentation]    Preenche todos os campos do formulário
    Preencher Nome       ${nome}
    Preencher Email      ${email}
    Preencher Telefone   ${telefone}
    Log    Formulário preenchido com dados válidos

Limpar Formulário
    [Documentation]    Limpa todos os campos do formulário
    Limpar Campo    ${INPUT_NOME}
    Limpar Campo    ${INPUT_EMAIL}
    Limpar Campo    ${INPUT_TELEFONE}
    Log    Formulário limpo

# ============================================================================
# ACEITAÇÃO DE TERMOS
# ============================================================================

Aceitar Base Legal
    [Documentation]    Marca o checkbox de base legal/termos
    Wait Until Element Is Visible    ${CHECKBOX_LEGAL}    ${EXPLICIT_WAIT}
    Marcar Checkbox    ${CHECKBOX_LEGAL}
    Log    Base legal aceita

Rejeitar Base Legal
    [Documentation]    Desmarca o checkbox de base legal
    Wait Until Element Is Visible    ${CHECKBOX_LEGAL}    ${EXPLICIT_WAIT}
    Desmarcar Checkbox    ${CHECKBOX_LEGAL}
    Log    Base legal rejeitada

# ============================================================================
# SUBMISSÃO E NAVEGAÇÃO
# ============================================================================

Submeter Formulário
    [Documentation]    Clica no botão Avançar/Enviar para submeter o formulário
    Wait Until Element Is Visible    ${BUTTON_AVANCAR}    ${EXPLICIT_WAIT}
    Clicar Em Elemento    ${BUTTON_AVANCAR}
    Log    Formulário submetido

Submeter Formulário E Esperar Resposta
    [Arguments]    ${timeout}=10s
    [Documentation]    Submete o formulário e aguarda uma resposta (erro ou sucesso)
    Submeter Formulário
    Wait Until Element Is Visible    ${ERROR_MESSAGE} or ${SUCCESS_MESSAGE}    ${timeout}
    Log    Resposta do formulário recebida

# ============================================================================
# VALIDAÇÃO DE CAMPOS INDIVIDUAIS
# ============================================================================

Validar Nome Obrigatório
    [Documentation]    Testa submissão sem preenchimento do campo Nome
    Limpar Formulário
    Preencher Email       ${VALID_EMAIL}
    Preencher Telefone    ${VALID_PHONE}
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro

Validar Email Obrigatório
    [Documentation]    Testa submissão sem preenchimento do campo Email
    Limpar Formulário
    Preencher Nome        ${VALID_NAME}
    Preencher Telefone    ${VALID_PHONE}
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro

Validar Telefone Obrigatório
    [Documentation]    Testa submissão sem preenchimento do Telefone
    Limpar Formulário
    Preencher Nome    ${VALID_NAME}
    Preencher Email   ${VALID_EMAIL}
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro

Validar Email Inválido
    [Documentation]    Testa submissão com email de formato inválido
    Limpar Formulário
    Preencher Nome             ${VALID_NAME}
    Preencher Email            ${INVALID_EMAIL}
    Preencher Telefone         ${VALID_PHONE}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro      ${MSG_INVALID_EMAIL}

Validar Telefone Inválido
    [Documentation]    Testa submissão com telefone de formato inválido
    Limpar Formulário
    Preencher Nome             ${VALID_NAME}
    Preencher Email            ${VALID_EMAIL}
    Preencher Telefone         ${INVALID_PHONE}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro      ${MSG_INVALID_PHONE}

Validar Base Legal Obrigatória
    [Documentation]    Verifica se base legal é obrigatória
    Limpar Formulário
    Preencher Formulário Completo
    Rejeitar Base Legal
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro    ${MSG_LEGAL_REQUIRED}

# ============================================================================
# CENÁRIOS COMPLETOS
# ============================================================================

Cenário - Formulário Válido E Completo
    [Documentation]    Cenário positivo: Preenche tudo corretamente e submete
    [Tags]    criticidade_alta    happy_path
    Limpar Formulário
    Preencher Formulário Completo
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Sucesso

Cenário - Sem Base Legal
    [Documentation]    Cenário negativo: Rejeita base legal
    [Tags]    criticidade_alta    validation
    Limpar Formulário
    Preencher Formulário Completo
    Rejeitar Base Legal
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro    ${MSG_LEGAL_REQUIRED}

Cenário - Campo Vazio
    [Documentation]    Cenário negativo: Deixa campo obrigatório vazio
    [Tags]    criticidade_alta    validation
    Abrir Navegador
    Validar Página Carregada
    Submeter Formulário
    Validar Mensagem Erro

Cenário - Dados Inválidos
    [Documentation]    Cenário negativo: Submete dados em formato inválido
    [Tags]    criticidade_média    validation
    Limpar Formulário
    Preencher Nome             ${VALID_NAME}
    Preencher Email            ${INVALID_EMAIL}
    Preencher Telefone         ${INVALID_PHONE}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro

# ============================================================================
# BOUNDARY VALUE TESTING
# ============================================================================

Validar Campo Nome Com Limite Mínimo
    [Documentation]    Testa nome com 1 caractere (mínimo)
    Limpar Formulário
    Preencher Nome             A
    Preencher Email            ${VALID_EMAIL}
    Preencher Telefone         ${VALID_PHONE}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Log    Teste de limite mínimo para Nome executado

Validar Campo Nome Com Limite Máximo
    [Documentation]    Testa nome com múltiplos caracteres (máximo)
    ${nome_longo}    Set Variable    ${"A" * 100}
    Limpar Formulário
    Preencher Nome             ${nome_longo}
    Preencher Email            ${VALID_EMAIL}
    Preencher Telefone         ${VALID_PHONE}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Log    Teste de limite máximo para Nome executado

Validar Email Com Caracteres Especiais
    [Documentation]    Testa email com caracteres especiais
    Limpar Formulário
    Preencher Nome             ${VALID_NAME}
    Preencher Email            test+alias@example.com
    Preencher Telefone         ${VALID_PHONE}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Log    Teste com email especial executado

Validar Telefone Com Vários Formatos
    [Arguments]    ${formato}
    [Documentation]    Testa telefone com diferentes formatos
    Limpar Formulário
    Preencher Nome             ${VALID_NAME}
    Preencher Email            ${VALID_EMAIL}
    Preencher Telefone         ${formato}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Log    Teste com formato de telefone: ${formato}

# ============================================================================
# TESTE DE SEGURANÇA
# ============================================================================

Validar Defesa Contra XSS
    [Documentation]    Testa injeção de script no campo Nome
    ${script_xss}    Set Variable    <script>alert('XSS')</script>
    Limpar Formulário
    Preencher Nome       ${script_xss}
    Preencher Email      ${VALID_EMAIL}
    Preencher Telefone   ${VALID_PHONE}
    Aceitar Base Legal
    Submeter Formulário
    ${page_source}    Get Source
    Should Not Contain    ${page_source}    alert    Defesa XSS funcionando
    Log    Teste XSS concluído - Script não executado

Validar Defesa Contra SQL Injection
    [Documentation]    Testa injeção SQL no campo Email
    ${sql_injection}    Set Variable    test' OR '1'='1
    Limpar Formulário
    Preencher Nome       ${VALID_NAME}
    Preencher Email      ${sql_injection}
    Preencher Telefone   ${VALID_PHONE}
    Aceitar Base Legal
    Submeter Formulário E Esperar Resposta
    Validar Mensagem Erro    ${MSG_INVALID_EMAIL}
    Log    Teste SQL Injection concluído - Query não executada
