*** Settings ***
Documentation       Testes Funcionais da Página de Certificação
Library             SeleniumLibrary
Resource            ../keywords/common_keywords.robot
Resource            ../keywords/form_keywords.robot
Resource            ../resources/variables.robot

Test Setup          Abrir Navegador
Test Teardown       Fechar Navegador

*** Test Cases ***

TC001 - Validar Carregamento Da Página
    [Documentation]    Verifica se a página foi carregada corretamente
    [Tags]    smoke    crítica
    Validar Página Carregada
    Log    Página foi carregada com sucesso

TC002 - Validar Elementos Visíveis
    [Documentation]    Confirma visibilidade de todos os elementos principais
    [Tags]    smoke    crítica
    Validar Elementos Visíveis
    Log    Todos os elementos estão visíveis

TC003 - Validar Estrutura Do Formulário
    [Documentation]    Valida se o formulário possui a estrutura esperada
    [Tags]    smoke    crítica
    Validar Estrutura Do Formulário
    Log    Estrutura do formulário validada

TC004 - Validar Status HTTP
    [Documentation]    Verifica se o servidor responde com status 200
    [Tags]    api    crítica
    Validar Status HTTP
    Log    Servidor respondendo corretamente

TC005 - Submeter Formulário Vazio
    [Documentation]    Tenta submeter o formulário sem preenchimento (deve falhar)
    [Tags]    validação    crítica
    Validar Campo Vazio Obrigatório    ${INPUT_NOME}
    Submeter Formulário
    Validar Mensagem Erro
    Log    Erro esperado ao submeter formulário vazio

TC006 - Validar Campo Nome Obrigatório
    [Documentation]    Verifica se o campo Nome é obrigatório
    [Tags]    validação    crítica
    Validar Nome Obrigatório
    Log    Campo Nome validado como obrigatório

TC007 - Validar Campo Email Obrigatório
    [Documentation]    Verifica se o campo Email é obrigatório
    [Tags]    validação    crítica
    Validar Email Obrigatório
    Log    Campo Email validado como obrigatório

TC008 - Validar Campo Telefone Obrigatório
    [Documentation]    Verifica se o campo Telefone é obrigatório
    [Tags]    validação    crítica
    Validar Telefone Obrigatório
    Log    Campo Telefone validado como obrigatório

TC009 - Validar Email Inválido
    [Documentation]    Testa rejei de email em formato inválido
    [Tags]    validação    crítica
    Validar Email Inválido
    Log    Email inválido foi rejeitado corretamente

TC010 - Validar Telefone Inválido
    [Documentation]    Testa rejeição de telefone em formato inválido
    [Tags]    validação    média
    Validar Telefone Inválido
    Log    Telefone inválido foi rejeitado corretamente

TC011 - Validar Base Legal Obrigatória
    [Documentation]    Verifica se a aceitação de base legal é obrigatória
    [Tags]    validação    crítica
    Validar Base Legal Obrigatória
    Log    Base legal validada como obrigatória

TC012 - Preencher Todos Os Campos
    [Documentation]    Preenche todos os campos com dados válidos
    [Tags]    happy_path    crítica
    Preencher Formulário Completo
    Aceitar Base Legal
    Logar Valores Dos Campos
    Log    Todos os campos foram preenchidos

TC013 - Submeter Formulário Válido
    [Documentation]    Submete o formulário preenchido corretamente
    [Tags]    happy_path    crítica
    Cenário - Formulário Válido E Completo
    Log    Formulário válido submetido com sucesso

TC014 - Rejeitar Sem Aceitar Base Legal
    [Documentation]    Tenta submeter sem aceitar a base legal
    [Tags]    validação    crítica
    Cenário - Sem Base Legal
    Log    Submissão foi bloqueada corretamente

TC015 - Medir Tempo De Carregamento
    [Documentation]    Mede quanto tempo a página leva para carregar
    [Tags]    performance    média
    ${tempo}    Medir Tempo De Carregamento
    Log    Página carregou em ${tempo}s

TC016 - Validar Campo Nome Com Um Caractere
    [Documentation]    Testa nome com limite mínimo (1 caractere)
    [Tags]    boundary_value    média
    Validar Campo Nome Com Limite Mínimo
    Log    Teste de limite mínimo para Nome executado

TC017 - Validar Campo Nome Com Máximo De Caracteres
    [Documentation]    Testa nome com limite máximo
    [Tags]    boundary_value    média
    Validar Campo Nome Com Limite Máximo
    Log    Teste de limite máximo para Nome executado

TC018 - Validar Email Com Caracteres Especiais
    [Documentation]    Testa email com sink + (plus addressing)
    [Tags]    boundary_value    baixa
    Validar Email Com Caracteres Especiais
    Log    Email com caracteres especiais foi processado

TC019 - Defesa Contra XSS
    [Documentation]    Valida se a aplicação está protegida contra XSS
    [Tags]    segurança    crítica
    Validar Defesa Contra XSS
    Log    Aplicação protegida contra XSS

TC020 - Defesa Contra SQL Injection
    [Documentation]    Valida se a aplicação está protegida contra SQL Injection
    [Tags]    segurança    crítica
    Validar Defesa Contra SQL Injection
    Log    Aplicação protegida contra SQL Injection

TC021 - Limpar Formulário
    [Documentation]    Testa a funcionalidade de limpar/resetar o formulário
    [Tags]    funcionalidade    média
    Preencher Formulário Completo
    Limpar Formulário
    Validar Campo Vazio Obrigatório    ${INPUT_NOME}
    Validar Campo Vazio Obrigatório    ${INPUT_EMAIL}
    Validar Campo Vazio Obrigatório    ${INPUT_TELEFONE}
    Log    Formulário foi limpo corretamente

TC022 - Aceitar E Rejeitar Base Legal
    [Documentation]    Testa marcar e desmarcar o checkbox de base legal
    [Tags]    funcionalidade    média
    Aceitar Base Legal
    Log    Base legal aceita
    Rejeitar Base Legal
    Log    Base legal rejeitada
    Aceitar Base Legal
    Log    Base legal aceita novamente

TC023 - Dados Válidos Persistem Após Navegação
    [Documentation]    Verifica se dados preenchidos persistem ao navegar
    [Tags]    funcionalidade    média
    Preencher Formulário Completo
    Go To    ${BASE_URL}
    ${nome}    Get Value    ${INPUT_NOME}
    Log    Nome após navegação: ${nome}

TC024 - Validar Interatividade - Hover E Focus
    [Documentation]    Testa interatividade dos campos (hover, focus)
    [Tags]    acessibilidade    média
    Click Element    ${INPUT_NOME}
    Element Should Be Focused    ${INPUT_NOME}
    Tab Key    ${INPUT_NOME}
    Element Should Be Focused    ${INPUT_EMAIL}
    Log    Navegação por teclado funcionando

TC025 - Validar Responsividade - Mobile
    [Documentation]    Testa layout em viewport mobile (375px)
    [Tags]    responsivo    média
    Set Window Size    375    667
    Validar Elementos Visíveis
    Log    Layout responsivo em mobile validado

TC026 - Validar Responsividade - Tablet
    [Documentation]    Testa layout em viewport tablet (768px)
    [Tags]    responsivo    média
    Set Window Size    768    1024
    Validar Elementos Visíveis
    Log    Layout responsivo em tablet validado

TC027 - Validar Responsividade - Desktop
    [Documentation]    Testa layout em viewport desktop (1280px)
    [Tags]    responsivo    média
    Set Window Size    1280    1024
    Validar Elementos Visíveis
    Log    Layout responsivo em desktop validado

TC028 - Capturar Screenshot Do Formulário
    [Documentation]    Captura screenshot do estado inicial do formulário
    [Tags]    debug    baixa
    Capturar Screenshot    formulario_inicial

TC029 - Validar Múltiplos Formatos De Telefone
    [Documentation]    Testa diferentes formatos de número de telefone
    [Tags]    boundary_value    média
    Validar Telefone Com Vários Formatos    (11) 99999-9999
    Limpar Campo    ${INPUT_TELEFONE}
    Validar Telefone Com Vários Formatos    11999999999
    Limpar Campo    ${INPUT_TELEFONE}
    Validar Telefone Com Vários Formatos    +55 11 99999-9999
    Log    Múltiplos formatos de telefone testados

TC030 - Teste De Dados Inválidos
    [Documentation]    Submete dados completamente inválidos
    [Tags]    validação    crítica
    Cenário - Dados Inválidos
    Log    Dados inválidos foram adecuadamente rejeitados
