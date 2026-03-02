*** Variables ***

# URL e Configuração
${BASE_URL}    https://qualidade.apprbs.com.br/certificacao
${BROWSER}     chrome

# Timeouts
${EXPLICIT_WAIT}           10s
${IMPLICIT_WAIT}           5s
${PAGE_LOAD_TIMEOUT}       30s

# Seletores - Inputs
${INPUT_NOME}              //input[@name="pessoa.nome"]
${INPUT_EMAIL}             //input[@name="pessoa.emailPrincipal"]
${INPUT_TELEFONE}          //input[@name="pessoa.telefonePrincipal"]
${INPUT_CPF}               //input[@name="pessoa.cpf"]

# Seletores - Buttons
${BUTTON_AVANCAR}          //button[@id="rbBtnNext"]
${BUTTON_SUBMIT}           //button[@type="submit"]
${BUTTON_ENVIAR}           //button[@type="submit"]

# Seletores - Checkboxes e Labels
${CHECKBOX_LEGAL}          //input[@type="checkbox"]
${LABEL_LEGAL}             //label

# Seletores - Elementos de Validação
${ERROR_MESSAGE}           //div[contains(@class, "error")]
${SUCCESS_MESSAGE}         //div[contains(@class, "success")]
${FORM_CONTAINER}          //form[@id="rbFormEtapa1"]

# Dados de Teste - Válidos
${VALID_NAME}              João Silva Santos
${VALID_EMAIL}             joao.silva@example.com
${VALID_PHONE}             (11) 99999-9999
${VALID_CPF}               12345678901

# Dados de Teste - Inválidos
${INVALID_EMAIL}           email_invalido
${INVALID_PHONE}           123
${INVALID_CPF}             00000000000
${EMPTY_VALUE}             ${EMPTY}

# Mensagens Esperadas
${MSG_REQUIRED_FIELD}      obrigatório|required|necessário
${MSG_INVALID_EMAIL}       email|inválido|invalid
${MSG_INVALID_PHONE}       telefone|phone
${MSG_LEGAL_REQUIRED}      base legal|terms|aceitar
${MSG_SUCCESS}             sucesso|enviado|registrado|success

# Endpoints API
${API_ENDPOINT_SUBMIT}     ${BASE_URL}/submit
${API_ENDPOINT_VALIDATE}   ${BASE_URL}/validate

# Performance
${MAX_LOAD_TIME}           3s
${MAX_RESPONSE_TIME}       2s
