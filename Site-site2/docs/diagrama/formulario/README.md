# Diagramas - Formulário

Diagramas PlantUML que ilustram a estrutura e localização de elementos do formulário.

## Arquivos

### estrutura_html.puml
Estrutura completa do formulário HTML com mapeamento de issues:

**Elementos principais:**
- `<form>` - Contenedor principal
  - ISSUE #002: Falta DOCTYPE
  
- `<label>` - Rótulo Nome
  - ISSUE #001: Sem atributo `for`
  
- `<input name="pessoa.nome">` - Campo Nome
  - ISSUE #006: SQL Injection vulnerável
  - ISSUE #008: Validação fraca (aceita números)
  
- `<label>` - Rótulo Email
  - ISSUE #001: Sem atributo `for`
  
- `<input name="pessoa.emailPrincipal">` - Campo Email
  - ISSUE #007: XSS vulnerável (script tags)
  - ISSUE #007: Aceita event handlers (onerror)
  
- `<input name="pessoa.telefonePrincipal">` - Campo Telefone
  - Status: OK
  
- `<button type="submit">` - Botão Enviar
  - Locator: (//button)[2]
  
- `<h1>` - Heading Principal
  - ISSUE #003: Faltando (impacto SEO + a11y)

### seletores.puml
Localizadores para cada elemento:

```
Input Nome:       //input[@name="pessoa.nome"]
Input Email:      //input[@name="pessoa.emailPrincipal"]
Input Telefone:   //input[@name="pessoa.telefonePrincipal"]
Botão Submit:     (//button)[2] ou (//button)[3]
Form:             //form
```

## Issues Mapeadas

| Issue | Elemento | Problema | Severidade |
|-------|----------|----------|-----------|
| #001 | Label Email | Sem atributo `for` | CRÍTICA |
| #002 | Form | Sem DOCTYPE | CRÍTICA |
| #003 | H1 | Faltando | ALTA |
| #006 | Input Nome | SQL Injection | CRÍTICA |
| #007 | Input Email | XSS | CRÍTICA |
| #008 | Input Nome | Validação Fraca | MÉDIA |

## Seletores de Teste

Usado em Robot Framework:

```robot
*** Keywords ***
Preencher Campo Nome
    Input Text    //input[@name="pessoa.nome"]    ${VALOR}

Preencher Campo Email
    Input Text    //input[@name="pessoa.emailPrincipal"]    ${VALOR}

Submeter Formulário
    Click Button    (//button)[2]
```
