README - Testes Postman

Projeto: Certificação Site 1 - API Tests
URL: https://qualidade.apprbs.com.br/certificacao
Cliente: Postman

==================================================

1. ESTRUTURA DO PROJETO POSTMAN

postman/
  certificacao_tests.json    - Collection com todos os testes de API

==================================================

2. TESTES IMPLEMENTADOS

Total: 7 requisições

2.1 GET - Página de Certificação
    Método: GET
    URL: https://qualidade.apprbs.com.br/certificacao
    Objetivo: Validar acesso à página principal
    Headers: Accept (text/html), User-Agent
    Esperado: Status 200

2.2 POST - Submeter Formulário (Sem Base Legal)
    Método: POST
    URL: https://qualidade.apprbs.com.br/certificacao/submit
    Objetivo: Testar rejeição sem base legal
    Dados:
      - nome: João Silva
      - telefone: 11999999999
      - email: joao@example.com
      - Sem baseLegal
    Esperado: Erro "É necessário informar a base legal"

2.3 POST - Submeter Formulário (Com Base Legal)
    Método: POST
    URL: https://qualidade.apprbs.com.br/certificacao/submit
    Objetivo: Testar submissão completa
    Dados:
      - nome: Maria Santos
      - telefone: 21988888888
      - email: maria@example.com
      - baseLegal: true
      - aceitar: on
    Esperado: Status 200 ou redirect

2.4 POST - Validar Email Inválido
    Método: POST
    URL: https://qualidade.apprbs.com.br/certificacao/submit
    Objetivo: Testar rejeição de email inválido
    Email: email-invalido
    Esperado: Erro de validação

2.5 POST - Validar Telefone Inválido
    Método: POST
    URL: https://qualidade.apprbs.com.br/certificacao/submit
    Objetivo: Testar rejeição de telefone muito curto
    Telefone: 123
    Esperado: Erro de validação

2.6 POST - Campo Nome Vazio
    Método: POST
    URL: https://qualidade.apprbs.com.br/certificacao/submit
    Objetivo: Testar rejeição de nome vazio
    Nome: (vazio)
    Esperado: Erro "Campo obrigatório"

2.7 GET - Verificar Headers de Resposta
    Método: GET
    URL: https://qualidade.apprbs.com.br/certificacao
    Objetivo: Validar headers HTTP
    Testes Automáticos:
      - Status code = 200
      - Content-Type contém text/html
      - Resposta não está vazia

==================================================

3. COMO IMPORTAR NO POSTMAN

3.1 Abrir Postman
3.2 File > Import
3.3 Selecionar: postman/certificacao_tests.json
3.4 Confirmar import
3.5 Collection aparecerá na aba Collections

==================================================

4. COMO EXECUTAR OS TESTES

4.1 Via Postman UI
    1. Clicar na collection "Certificação Site 1 - API Tests"
    2. Clicar no botão "Run" (play icon)
    3. Selecionar testes desejados
    4. Clicar "Run"

4.2 Via Postman CLI (Newman)
    npm install -g newman
    newman run postman/certificacao_tests.json --delay 500

4.3 Coletar dados de variáveis de ambiente
    newman run postman/certificacao_tests.json \
      --environment variables.json

==================================================

5. VARIÁVEIS DE AMBIENTE (OPCIONAL)

Se desejar usar variáveis de ambiente, criar arquivo variables.json:

{
  "id": "1",
  "name": "Certificacao_Env",
  "values": [
    {
      "key": "base_url",
      "value": "https://qualidade.apprbs.com.br",
      "enabled": true
    },
    {
      "key": "nome_teste",
      "value": "João Silva",
      "enabled": true
    },
    {
      "key": "telefone_teste",
      "value": "11999999999",
      "enabled": true
    },
    {
      "key": "email_teste",
      "value": "joao@example.com",
      "enabled": true
    }
  ]
}

==================================================

6. ERROS ENCONTRADOS E VALIDAÇÕES

6.1 Erro: "É necessário informar a base legal"
    Severidade: MÉDIA
    Quando: Ao submeter sem checkbox base legal
    Status: ESPERADO (Comportamento correto)

6.2 Validação: Email inválido
    Esperado: Rejeição de email sem @
    Status: A TESTAR

6.3 Validação: Telefone inválido
    Esperado: Rejeição de telefone < 10 dígitos
    Status: A TESTAR

6.4 Validação: Campos obrigatórios
    Esperado: Rejeição de formulário vazio
    Status: A TESTAR

==================================================

7. ESTRUTURA DE RESPOSTA ESPERADA

Sucesso (200):
{
  "status": "success",
  "message": "Cadastro realizado com sucesso",
  "data": {
    "id": 123,
    "email": "exemplo@example.com"
  }
}

Erro de Validação (400):
{
  "status": "error",
  "message": "É necessário informar a base legal",
  "errors": [
    {
      "field": "baseLegal",
      "message": "Campo obrigatório"
    }
  ]
}

Erro de Servidor (500):
{
  "status": "error",
  "message": "Erro interno do servidor"
}

==================================================

8. TESTES AUTOMÁTICOS INCLUSOS

Teste: Status code é 200
Script: pm.expect(pm.response.status).to.equal(200);

Teste: Content-Type contém text/html
Script: pm.expect(pm.response.headers.get('Content-Type')).to.include('text/html');

Teste: Resposta não está vazia
Script: pm.expect(pm.response.text().length).to.be.greaterThan(0);

==================================================

9. PRÓXIMAS MELHORIAS

1. Adicionar autenticação (Bearer token)
2. Implementar testes de performance
3. Adicionar validação de response schema
4. Integrar com CI/CD pipeline
5. Testes de carga e stress

==================================================

10. CONTATO E SUPORTE

QA Team
Data: 27/02/2026
Versão: 1.0
Status: Em desenvolvimento

==================================================
