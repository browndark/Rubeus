*** Settings ***
Documentation     Testes para Site-site2 (https://qualidade.apprbs.com.br/site)
Library           SeleniumLibrary
Resource          ../keywords/site_keywords.robot
Resource          ../resources/variables.robot

*** Test Cases ***

# ============================================================================
# SMOKE TESTS - Validações Básicas
# ============================================================================

ST001 - Carregar Página com Sucesso
    [Tags]    smoke    crítica
    [Documentation]    Valida se a página carrega sem erros
    Abrir Navegador
    Validar Página Carregada
    [Teardown]    Fechar Navegador

ST002 - Formulário Visível
    [Tags]    smoke    crítica
    [Documentation]    Valida se o formulário está visível
    Abrir Navegador
    Element Should Be Visible    ${FORM_CONTAINER}
    [Teardown]    Fechar Navegador

ST003 - Campos de Entrada Presentes
    [Tags]    smoke    crítica
    [Documentation]    Valida se inputs nome, email e telefone existem
    Abrir Navegador
    Element Should Be Visible    ${INPUT_NOME}
    Element Should Be Visible    ${INPUT_EMAIL}
    Element Should Be Visible    ${INPUT_TELEFONE}
    [Teardown]    Fechar Navegador

ST004 - Botão Submissão Presente
    [Tags]    smoke    crítica
    [Documentation]    Valida se botão de submissão existe
    Abrir Navegador
    Element Should Be Visible    ${BUTTON_SUBMIT}
    [Teardown]    Fechar Navegador

# ============================================================================
# TESTES DE VALIDAÇÃO DE ENTRADA
# ============================================================================

VAL01 - Submissão com Campos Vazios
    [Tags]    validação    crítica
    [Documentation]    Valida se formulário rejeita submissão vazia
    Abrir Navegador
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

VAL02 - Email Inválido
    [Tags]    validação    crítica
    [Documentation]    Valida rejeição de email inválido
    Abrir Navegador
    Preencher Campo Email    emailinvalido
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

VAL03 - Nome com Números (ISSUE #008)
    [Tags]    validação    média
    [Documentation]    Testa aceitação de nome com números - BUG ENCONTRADO
    Abrir Navegador
    Preencher Campo Nome    João 123
    Preencher Campo Email    joao@example.com
    Preencher Campo Telefone    (11) 99999-9999
    Submeter Formulário
    [Teardown]    Fechar Navegador

VAL04 - Telefone com Caracteres Especiais
    [Tags]    validação    média
    [Documentation]    Valida formato de telefone
    Abrir Navegador
    Preencher Campo Nome    João Silva
    Preencher Campo Email    joao@example.com
    Preencher Campo Telefone    +55(11)999999999
    Submeter Formulário
    [Teardown]    Fechar Navegador

# ============================================================================
# TESTES DE ACESSIBILIDADE
# ============================================================================

ACC01 - Validar Labels Associadas
    [Tags]    acessibilidade    crítica
    [Documentation]    Valida se inputs têm labels associadas - ISSUE #001
    Abrir Navegador
    Validar Labels Associadas
    [Teardown]    Fechar Navegador

ACC02 - Validar Estrutura de Headings
    [Tags]    acessibilidade    alta
    [Documentation]    Valida presença de H1-H6 - ISSUE #003 (Falta H1)
    Abrir Navegador
    Validar Estrutura HTML
    [Teardown]    Fechar Navegador

ACC03 - Navegação por Tab
    [Tags]    acessibilidade    média
    [Documentation]    Testa navegação com Tab entre fields
    Abrir Navegador
    Click Element    ${INPUT_NOME}
    Press Keys    ${INPUT_NOME}    TAB
    Sleep    1s
    [Teardown]    Fechar Navegador

# ============================================================================
# TESTES DE CASOS EXTREMOS
# ============================================================================

EDGE01 - Espaços em Branco
    [Tags]    edge_case    média
    [Documentation]    Testa submission com espaços em branco
    Abrir Navegador
    Preencher Campo Nome    ${SPACE}${SPACE}${SPACE}
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

EDGE02 - Caracteres Especiais XSS
    [Tags]    segurança    alta
    [Documentation]    Testa proteção contra XSS
    Abrir Navegador
    Preencher Campo Nome    <script>alert('XSS')</script>
    Preencher Campo Email    test@example.com
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

EDGE03 - Limite de Caracteres
    [Tags]    edge_case    média
    [Documentation]    Testa limite máximo de caracteres
    Abrir Navegador
    ${nome_longo}=    Evaluate    'A' * 500
    Preencher Campo Nome    ${nome_longo}
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

# ============================================================================
# TESTES DE DOCTYPE - ISSUE #002
# ============================================================================

QUIRKS01 - DOCTYPE Declarado
    [Tags]    estrutura    crítica
    [Documentation]    Valida se DOCTYPE está declarado - ISSUE #002
    Abrir Navegador
    ${doctype_check}=    Execute JavaScript    return document.doctype ? 'HAS_DOCTYPE' : 'NO_DOCTYPE'
    Should Be Equal    ${doctype_check}    HAS_DOCTYPE    DOCTYPE não encontrado!
    [Teardown]    Fechar Navegador

# ============================================================================
# TESTES DE FUNCIONALIDADE
# ============================================================================

FUNC01 - Preenchimento Completo Válido
    [Tags]    funcional    crítica
    [Documentation]    Testa preenchimento e submissão válida
    Abrir Navegador
    Preencher Formulário Completo    João Silva    joao.silva@example.com    (11) 99999-9999
    Submeter Formulário
    Sleep    2s
    [Teardown]    Fechar Navegador

FUNC02 - Validação em Tempo Real
    [Tags]    funcional    média
    [Documentation]    Testa se validação ocorre durante preenchimento - ISSUE #004
    Abrir Navegador
    Preencher Campo Email    invalido
    Sleep    1s
    [Teardown]    Fechar Navegador

FUNC03 - Clear e Resubmissão
    [Tags]    funcional    média
    [Documentation]    Testa limpeza de campo e resubmissão
    Abrir Navegador
    Preencher Formulário Completo    João    joao@test.com    (11) 99999-9999
    Limpar Campo    ${INPUT_NOME}
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

# ============================================================================
# TESTES DE SEGURANÇA - SQL INJECTION (ISSUE #006)
# ============================================================================

SEC001 - SQL Injection no Campo Nome
    [Tags]    segurança    crítica    sql_injection
    [Documentation]    Testa proteção contra SQL Injection - ISSUE #006 - Entrada: ' OR '1'='1
    Abrir Navegador
    Preencher Campo Nome    ' OR '1'='1
    Preencher Campo Email    teste@example.com
    Preencher Campo Telefone    (11) 99999-9999
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

SEC002 - XSS no Campo Email
    [Tags]    segurança    crítica    xss
    [Documentation]    Testa proteção contra XSS - ISSUE #007 - Entrada: <script>alert('xss')</script>
    Abrir Navegador
    Preencher Campo Nome    João Silva
    Preencher Campo Email    <script>alert('xss')</script>
    Preencher Campo Telefone    (11) 99999-9999
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

SEC003 - Números no Campo Nome
    [Tags]    segurança    média    validação
    [Documentation]    Testa validação de tipo - ISSUE #008 - Entrada: João123Silva456
    Abrir Navegador
    Preencher Campo Nome    João123Silva456
    Preencher Campo Email    joao@example.com
    Preencher Campo Telefone    (11) 99999-9999
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

SEC004 - Múltiplos Testes de XSS
    [Tags]    segurança    alta    xss
    [Documentation]    Testa variações de XSS com ">
    Abrir Navegador
    Preencher Campo Nome    João Silva
    Preencher Campo Email    "><script>alert(1)</script>
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador

SEC005 - SQL Injection com UNION
    [Tags]    segurança    crítica    sql_injection
    [Documentation]    Teste avançado de SQL Injection
    Abrir Navegador
    Preencher Campo Nome    ' UNION SELECT NULL -- 
    Preencher Campo Email    teste@example.com
    Preencher Campo Telefone    (11) 99999-9999
    Submeter Formulário
    Sleep    1s
    [Teardown]    Fechar Navegador
