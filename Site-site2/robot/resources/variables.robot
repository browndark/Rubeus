*** Variables ***

# URL
${BASE_URL}                     https://qualidade.apprbs.com.br/site

# Formulário - Seletores (Atualizados com seletores corretos)
${INPUT_NOME}                   //input[@name="pessoa.nome"]
${INPUT_EMAIL}                  //input[@name="pessoa.emailPrincipal"]
${INPUT_TELEFONE}               //input[@name="pessoa.telefonePrincipal"]

${BUTTON_SUBMIT}                (//button)[2]

${FORM_CONTAINER}               //form

# Mensagens de Validação
${MSG_PREENCHIMENTO}            Preencha este
${MSG_EMAIL_INVALIDO}           Email inválido
${MSG_CAMPO_OBRIGATORIO}        Campo obrigatório

# Labels (encontrados no HTML)
${LABEL_NOME}                   //label[contains(., 'Nome')]
${LABEL_EMAIL}                  //label[contains(., 'Email')]
${LABEL_TELEFONE}               //label[contains(., 'Telefone')]

# Tempo padrão
${TIMEOUT_PADRAO}               10s
${TIMEOUT_LONGO}                20s
