# ISSUES - Catalogação de Erros e Problemas

**Data da Análise:** 27/02/2026  
**Status:** 6 Issues Abertas  
**Severidade Total:** 2 Críticas + 2 Altas + 2 Médias

---

## ÍNDICE DE ISSUES

1. [ISSUE #001 - ActionsForm Não Definida (CRÍTICA)](#issue-001)
2. [ISSUE #002 - Falta de Headings HTML (ALTA)](#issue-002)
3. [ISSUE #003 - Falta de Textarea (MÉDIA)](#issue-003)
4. [ISSUE #004 - DOCTYPE Não Declarado (MÉDIA)](#issue-004)
5. [ISSUE #005 - Checkbox Não Localizado (CRÍTICA)](#issue-005)
6. [ISSUE #006 - Possível Erro de Tipagem em Handlers (ALTA)](#issue-006)

---

<a name="issue-001"></a>
## ISSUE #001 - ActionsForm Não Definida

| Campo | Valor |
|-------|-------|
| **ID** | #001 |
| **Título** | Função `ActionsForm` não está definida |
| **Severidade** | **CRÍTICA** |
| **Status** | Aberta (Não Iniciada) |
| **Impacto** | Bloqueio total de funcionalidade de formulário |
| **Estimativa** | 2-4 horas |
| **Afetados** | 6 elementos (inputs) |

### Descrição
A função `ActionsForm` é referenciada em 6 handlers `onclick` de inputs do formulário, porém a função não está definida em nenhum escopo da página (window, global, etc).

### Elementos Afetados
```
1. input[name="nome"]
   onclick: ActionsForm.manageFieldRules(this, 'string,obrigatorio,max:255')

2. input[name="telefone"]
   onclick: ActionsForm.manageFieldRules(this, 'string,obrigatorio,telefone')

3. input[name="email"]
   onclick: ActionsForm.manageFieldRules(this, 'string,obrigatorio,email')

4. input[name="empresa"]
   onclick: ActionsForm.manageFieldRules(this, 'opcional')

5. input[name="data_conclusao"]
   onclick: ActionsForm.manageFieldRules(this, 'date,opcional,data')

6. input[name="cargo"]
   onclick: ActionsForm.manageFieldRules(this, 'string,opcional')
```

### Causa Raiz
**Possibilidades (verificar em ordem):**

1. [ERRO] Arquivo de script não carregado
   - Arquivo `.js` pode estar com caminho incorreto
   - Pode retornar erro 404
   - Pode estar bloqueado por CORS

2. [ERRO] Ordem de carregamento
   - Script do `ActionsForm` carregado após script que o referencia
   - Dependência não satisfeita

3. [ERRO] Namespacing incorreto
   - Função pode estar em namespace diferente
   - Ex: `window.App.ActionsForm` ao invés de `window.ActionsForm`

4. [ERRO] Compilação/Minificação
   - Nome pode ter sido alterado durante build
   - Arquivo incorreto sendo servido

### Impacto
- [CRÍTICO] **Desenvolvedores:** Não conseguem testar validação de formulários
- [CRÍTICO] **QA:** Testes E2E falham quando tentam preencher formulários
- [CRÍTICO] **Usuários:** Validação não funciona, formulario pode ser enviado inválido
- [CRÍTICO] **Performance:** Erros JavaScript podem afetar performance

### Reprodução
1. Abrir página em navegador
2. Abrir DevTools (F12)
3. Clicar em qualquer input do formulário
4. Observar erro: `Uncaught ReferenceError: ActionsForm is not defined`

### Resolução Proposta

**Curto Prazo (Hotfix):**
```javascript
// Adicionar fallback antes dos handlers serem chamados
window.ActionsForm = window.ActionsForm || {
  manageFieldRules: function(el, rules) {
    console.warn('ActionsForm não carregou, usando validação básica', rules)
    // Implementar validação simples
  }
}
```

**Médio Prazo (Verificação):**
```bash
# 1. Verificar se o arquivo existe
curl -I https://qualidade.apprbs.com.br/js/actions-form.js

# 2. Verificar no Network tab do DevTools
# Procurar por erros 404

# 3. Buscar ActionsForm no código-fonte
grep -r "ActionsForm" .
```

**Longo Prazo (Fix Definitivo):**
```html
<!-- Opção 1: Carregar script correto -->
<script src="/path/to/actions-form.js"></script>

<!-- Opção 2: Implementar função localmente -->
<script>
window.ActionsForm = {
  manageFieldRules: function(element, rules) {
    const ruleArray = rules.split(',')
    const isRequired = ruleArray.includes('obrigatorio')
    // Implementar validação
  }
}
</script>

<!-- Opção 3: Usar biblioteca de validação -->
<script src="https://cdn.jsdelivr.net/npm/validator@13.0.0"></script>
```

### Checklist de Resolução
- [ ] Verificar Network tab para recursos não carregados
- [ ] Buscar arquivo `actions-form.js` no projeto
- [ ] Confirmar fonte correta em `<script src>`
- [ ] Testar definição de função no console
- [ ] Implementar fallback se necessário
- [ ] Testar todos os 6 inputs após fix
- [ ] Executar suite de testes
- [ ] Deploy e validação em produção

### Relacionado
- [ISSUE #006](#issue-006) - Possível erro de tipagem em handlers

---

<a name="issue-002"></a>
## ISSUE #002 - Falta de Headings HTML

| Campo | Valor |
|-------|-------|
| **ID** | #002 |
| **Título** | Nenhum heading (H1-H6) encontrado na página |
| **Severidade** | **ALTA** |
| **Status** | Não Priorizada (Pode Esperar) |
| **Impacto** | SEO ruim, acessibilidade prejudicada |
| **Estimativa** | 30 minutos |
| **Afetados** | Estrutura semântica da página |

### Descrição
A página não possui nenhum elemento heading (H1, H2, H3, H4, H5 ou H6), o que é fundamental para:
- Estrutura semântica HTML
- Acessibilidade (screen readers)
- SEO (search engines)

### Causa Raiz
- Página desenvolvida apenas com `<div>` e estilos CSS
- Falta de estrutura semântica adequada
- Possível template com estrutura inadequada

### Impacto
- [ALTO] **SEO:** Google não consegue entender hierarquia de conteúdo
- [ALTO] **Acessibilidade:** Leitores de tela não conseguem navegar por seções
- [ALTO] **UX:** Não há clareza visual de hierarquia
- [ALTO] **Manutenibilidade:** Difícil entender estrutura do documento

### Resolução Proposta

**Opção 1 - Adicionar H1 no topo:**
```html
<!-- Antes -->
<div class="titulo-pagina">Certificação Profissional</div>

<!-- Depois -->
<h1>Certificação Profissional</h1>
<div class="titulo-pagina">Certificação Profissional</div>
```

**Opção 2 - Refatorar com hierarquia completa:**
```html
<main>
  <h1>Certificação Profissional</h1>
  
  <section>
    <h2>Formulário de Cadastro</h2>
    <form>
      <h3>Dados Pessoais</h3>
      <input name="nome" placeholder="Nome" />
      
      <h3>Dados de Contato</h3>
      <input name="telefone" placeholder="Telefone" />
      <input name="email" placeholder="Email" />
    </form>
  </section>
</main>
```

**Opção 3 - Manter divs mas adicionar ARIA:**
```html
<div class="titulo-pagina" role="heading" aria-level="1">
  Certificação Profissional
</div>
```

### Checklist de Resolução
- [ ] Definir H1 principal da página
- [ ] Adicionar H2 para seções principais
- [ ] Adicionar H3 para subseções
- [ ] Validar com W3C HTML Validator
- [ ] Testar com screen reader (NVDA, JAWS)
- [ ] Validar SEO com Google Lighthouse
- [ ] Verificar estrutura em Mobile

### Relacionado
- [ISSUE #004](#issue-004) - DOCTYPE não declarado

---

<a name="issue-003"></a>
## ISSUE #003 - Falta de Textarea

| Campo | Valor |
|-------|-------|
| **ID** | #003 |
| **Título** | Elemento `<textarea>` não encontrado |
| **Severidade** | **MÉDIA** |
| **Status** | Não Iniciada (Design Decision) |
| **Impacto** | Impossível coletar comentários/descrições longas |
| **Estimativa** | 1-2 horas |
| **Contexto** | Pode ser aceitável dependendo do tipo de formulário |

### Descrição
Não há elemento textarea na página. Pode ser proposital (formulário simples) ou falta de design.

### Possíveis Cenários
1. [OK] **Página é apenas para data de conclusão** - Scenario aceitável
2. [ERRO] **Deveria ter campo de comentários** - Falta implementação
3. [ERRO] **Campo descrição foi removido** - Revert necessário

### Impacto
- Se houver necessidade de campos de texto longo, usuário não consegue preencher
- Experiência incompleta se fosse esperado ter comentários/descrição

### Resolução Proposta

**Se for necessário adicionar:**
```html
<div class="form-group">
  <label for="observacoes">Observações (Opcional)</label>
  <textarea 
    id="observacoes" 
    name="observacoes"
    placeholder="Digite aqui qualquer observação adicional..."
    rows="4"
    maxlength="500"
    onclick="ActionsForm.manageFieldRules(this, 'string,opcional,max:500')">
  </textarea>
  <small>Máximo 500 caracteres</small>
</div>
```

**Se for remover do escopo:**
```
Documentar decisão de design:
- Razão: Formulário simples, sem necessidade de comentários
- Data: 27/02/2026
- Aprovado por: [Nome do Product Manager]
```

### Checklist
- [ ] Definir se textarea é realmente necessário
- [ ] Se sim, adicionar field ao formulário
- [ ] Se não, documentar decisão de design
- [ ] Atualizar user stories
- [ ] Validar com UX/Design

---

<a name="issue-004"></a>
## ISSUE #004 - DOCTYPE Não Declarado

| Campo | Valor |
|-------|-------|
| **ID** | #004 |
| **Título** | DOCTYPE não está declarado (Quirks Mode) |
| **Severidade** | **MÉDIA** |
| **Status** | Aberta (Requer Verificação) |
| **Impacto** | Comportamento CSS/JavaScript impredizível entre navegadores |
| **Estimativa** | 15 minutos |
| **Frequência** | Afeta 100% das requisições |

### Descrição
A primeira linha do HTML não declara `<!DOCTYPE html>`, fazendo o navegador entrar em Quirks Mode em vez de Standards Mode.

### O que é Quirks Mode?
- Navegador trata o HTML como se fosse versões antigas (IE6, etc)
- CSS pode se comportar diferente
- JavaScript pode ter comportamento impredizível
- Box model pode ser diferente

### Causa Raiz
- Arquivo HTML foi criado sem declaração de DOCTYPE
- Possível template genérico sem headers corretos

### Impacto
- [MÉDIO] CSS pode renderizar diferente em Quirks vs Standards Mode
- [MÉDIO] Performance pode ser afetada
- [MÉDIO] Compatibilidade com navegadores antigos (não desejado)
- [MÉDIO] Validação W3C falha

### Resolução Proposta

**Adicionar no início do arquivo HTML:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificação Profissional</title>
    <!-- resto do head -->
</head>
<body>
    <!-- conteúdo -->
</body>
</html>
```

### Checklist
- [ ] Adicionar `<!DOCTYPE html>` na primeira linha
- [ ] Confirmar com validador W3C: https://validator.w3.org/
- [ ] Testar em múltiplos navegadores
- [ ] Verificar se CSS permanece igual
- [ ] Verificar no DevTools se deixa Standards Mode

### Validação
```bash
# Verificar se está em Standards Mode
# No DevTools Console:
console.log(document.compatMode)  # Deve retornar "CSS1Compat"
```

---

<a name="issue-005"></a>
## ISSUE #005 - Checkbox Não Localizado

| Campo | Valor |
|-------|-------|
| **ID** | #005 |
| **Título** | Elemento `<checkbox>` não encontrado (Base Legal) |
| **Severidade** | **CRÍTICA** |
| **Status** | Aberta (Bloqueador) |
| **Impacto** | Impossível aceitar termos/base legal |
| **Estimativa** | 2-3 horas |
| **Afetados** | Submissão de formulário |

### Descrição
Não foi encontrado elemento checkbox para aceitar a "base legal" ou termos de serviço. Isso é crítico se o formulário exigir aceitação de conformidade legal.

### Causa Raiz
- Campo não foi criado
- Campo foi criado com atributo `display: none`
- Usado elemento diferente (custom checkbox)
- Campo foi removido em refatoração

### Impacto
- [CRÍTICO] Impossível submeter formulário se exigir base legal
- [CRÍTICO] Risco legal se enviar dados sem consentimento
- [CRÍTICO] Testes não conseguem validar fluxo completo

### Reprodução
```javascript
// No console do DevTools
document.querySelector('input[type="checkbox"]')  // null ou undefined
```

### Resolução Proposta

**Opção 1 - Checkbox HTML simples:**
```html
<div class="form-group checkbox">
  <label>
    <input 
      type="checkbox" 
      id="base_legal" 
      name="base_legal"
      value="1"
      required
    />
    <span>Aceito a Base Legal e Termos de Serviço</span>
  </label>
  <small>
    <a href="/legal" target="_blank">Ler Base Legal completa</a>
  </small>
</div>
```

**Opção 2 - Checkbox custom (com validação):**
```html
<div class="form-group checkbox custom">
  <input 
    type="checkbox" 
    id="base_legal" 
    name="base_legal"
    class="checkbox-input"
    onclick="ActionsForm.manageFieldRules(this, 'checkbox,obrigatorio')"
  />
  <label for="base_legal" class="checkbox-label">
    <span class="checkbox-icon"></span>
    Aceito a Base Legal e Termos de Serviço
  </label>
</div>
```

**Opção 3 - Se estava com display:none, tornar visível:**
```css
/* Verificar CSS que estava ocultando */
input[type="checkbox"] {
  /* display: none; <- REMOVER */
  /* visibility: hidden; <- REMOVER */
}
```

### Checklist
- [ ] Adicionar elemento checkbox visível
- [ ] Tornar campo obrigatório
- [ ] Adicionar label descritivo
- [ ] Adicionar link para termos legais
- [ ] Testar seleção/deselecção
- [ ] Validar com `ActionsForm` (após fix)
- [ ] Testar aceitação no envio
- [ ] Testar rejeição no envio

### Relacionado
- [ISSUE #001](#issue-001) - ActionsForm não definida
- [ISSUE #006](#issue-006) - Possível erro de tipagem

---

<a name="issue-006"></a>
## ISSUE #006 - Possível Erro de Tipagem em Handlers

| Campo | Valor |
|-------|-------|
| **ID** | #006 |
| **Título** | Sintaxe dos handlers pode ter erro de tipagem |
| **Severidade** | **ALTA** |
| **Status** | Aberta (Requer Revisão Manual) |
| **Impacto** | Validação de regras pode não funcionar corretamente |
| **Estimativa** | 1-2 horas |
| **Afetados** | 6 handlers em inputs |

### Descrição
Os handlers chamam `ActionsForm.manageFieldRules()` com strings de regras potencialmente malformadas:
- `'string,obrigatorio,max:255'`
- `'string,obrigatorio,telefone'`
- `'date,opcional,data'`

Precisa verificar:
1. Se a sintaxe está correta
2. Se todas as regras são reconhecidas
3. Se há duplicatas (ex: `date` e `data`)

### Exemplos de Problemas Potenciais

**Problema 1: Duplicata de regras**
```javascript
// Input 5 tem:
'date,opcional,data'  // Tem 'date' E 'data'?

// Investigar qual está correto
```

**Problema 2: Regras não reconhecidas**
```javascript
// Verificar se 'telefone' é uma regra válida
// Pode ser 'phone', 'phone_number', ou exigir regex customizado
```

**Problema 3: Ordem das regras**
```javascript
// Ordem importa?
'string,obrigatorio,max:255'  // Tipo, depois validação, depois constraints?
```

### Resolução Proposta

**1. Documentar formato esperado:**
```javascript
// Documentação proposta
ActionsForm.manageFieldRules(element, rules)

// Formato de rules:
// 'tipo,validação,constraint'
//
// Tipos: string, number, date, email
// Validações: obrigatorio, opcional
// Constraints: max:255, min:5, pattern:regex, etc
//
// Exemplos válidos:
// 'string,obrigatorio,max:255'  ✅
// 'email,obrigatorio'            ✅
// 'date,opcional'                ✅
// 'number,obrigatorio,min:0'     ✅
```

**2. Revisar cada handler:**
```javascript
// Input 1: Nome
'string,obrigatorio,max:255'  // [OK] OK

// Input 2: Telefone
'string,obrigatorio,telefone'  // [ATENÇÃO] Verificar se 'telefone' é válido
                                // Pode ser 'pattern:telefone' ou 'phone'

// Input 3: Email
'string,obrigatorio,email'  // [ATENÇÃO] Pode ser 'email' ou 'pattern:email'?

// Input 4: Empresa
'opcional'  // [OK] OK (sem tipo = string default?)

// Input 5: Data
'date,opcional,data'  // [ATENÇÃO] DUPLICATA! 'date' E 'data'?

// Input 6: Cargo
'string,opcional'  // [OK] OK
```

**3. Corrigir se necessário:**
```html
<!-- Após investigação, corrigir para -->
<input name="telefone" 
  onclick="ActionsForm.manageFieldRules(this, 'string,obrigatorio,pattern:telefone')" />

<input name="data_conclusao" 
  onclick="ActionsForm.manageFieldRules(this, 'date,opcional')" />
```

### Checklist
- [ ] Revisar documentação de ActionsForm
- [ ] Validar todas as 6 regras
- [ ] Remover duplicatas
- [ ] Corrigir sintaxe se necessário
- [ ] Testar validação após corrigir
- [ ] Atualizar documentação
- [ ] Criar testes para cada regra

---

<a name="issue-007"></a>
## ISSUE #007 - Formulário Multi-Etapa Sem Validação Progressiva

| Campo | Valor |
|-------|-------|
| **ID** | #007 |
| **Título** | Formulário com 4 etapas, mas sem feedback de validação entre etapas |
| **Severidade** | **ALTA** |
| **Status** | Descoberta em 27/02/2026 (Robot Framework Testing) |
| **Impacto** | Usuário não recebe feedback até tentar avançar |
| **Estimativa** | 3-5 horas (refatoração) |
| **Descoberto por** | Suite de testes Robot Framework |
| **Teste Relacionado** | 12 testes falharam (TC005-TC014, TC019-TC020, TC030) |

### Descrição
O formulário é estruturado em **4 etapas ocultas** que só aparecem após navegação:
- **Etapa 1** (visível): `rbFormEtapa1` - Dados pessoais (Nome, Telefone, Email)
- **Etapa 2** (oculta): `rbFormEtapa2` - Base Legal (checkbox obrigatório)
- **Etapa 3** (oculta): `rbFormFeedbackMessage` - Confirmação
- **Etapa 4** (oculta): `rbFormPayment` - Pagamento

### Problema Descoberto
Testes Robot Framework tentavam validar campos e mensagens de erro na **Etapa 1**, mas:
1. Checkboxes (base legal) estão na **Etapa 2** (oculta)
2. Mensagens de erro não aparecem até clicar em "AVANÇAR"
3. Fluxo completo requer navegação entre etapas
4. Validação não é imediata ou inline

### Estrutura HTML Atual
```html
<!-- ETAPA 1 - VISÍVEL -->
<form id="rbFormEtapa1" name="rbFormEtapa1" 
      action="https://qualidade.apprbs.com.br/certificacao">
  <input name="pessoa.nome" type="text" />
  <input name="pessoa.telefonePrincipal" type="text" />
  <input name="pessoa.emailPrincipal" type="text" />
  <button id="rbBtnNext" type="button">AVANÇAR</button>
</form>

<!-- ETAPA 2 - OCULTA -->
<form id="rbFormEtapa2" name="rbFormEtapa2" style="display:none">
  <input type="checkbox" id="base_legal" />
  <label for="base_legal">Aceitar Base Legal</label>
  <button type="submit">ENVIAR</button>
</form>

<!-- ETAPA 3 e 4 - OCULTAS -->
<form id="rbFormFeedbackMessage" style="display:none"></form>
<form id="rbFormPayment" style="display:none"></form>
```

### Impacto no Testing
- ❌ **Testes de validação de campo** falham (campos não visíveis)
- ❌ **Testes de base legal** falham (etapa 2 requer navegação)
- ❌ **Testes de submissão** falham (checkbox na etapa oculta)
- ❌ **Testes de segurança (XSS/SQL)** falham (não conseguem acessar Etapa 2)
- ✅ **Testes de carregamento** passam (Etapa 1 visível)

### Causa Raiz
Decisão de design usar wizard multi-step, mas validação não foi pensada para teste automatizado.

### Resolução Proposta

**Opção 1: Validação Progressiva por Etapa (RECOMENDADO)**
```javascript
// Ao clicar "AVANÇAR", validar apenas campos visíveis
document.getElementById('rbBtnNext').addEventListener('click', function() {
  // Validar: nome, telefone, email
  if (!validateForm('etapa1')) {
    showErrors('etapa1')  // Mostrar erros inline
    return false
  }
  // Se OK, mostrar próxima etapa
  showStep('etapa2')
})

// Ao clicar "ENVIAR" (Etapa 2), validar base legal
document.getElementById('rbBtnNext-2').addEventListener('click', function() {
  // Validar: checkbox base legal
  if (!validateForm('etapa2')) {
    showErrors('etapa2')
    return false
  }
  submitForm()
})
```

**Opção 2: Mostrar Validação na Mesma Etapa**
```html
<!-- Adicionar mensagens de erro ao lado dos fields -->
<div class="form-group">
  <input name="pessoa.nome" type="text" 
         onchange="validateField(this)" />
  <span class="error-message" id="erro-nome"></span>  <!-- NOVO -->
</div>

<div class="form-group">
  <input name="pessoa.emailPrincipal" type="text" 
         onchange="validateField(this)" />
  <span class="error-message" id="erro-email"></span>  <!-- NOVO -->
</div>
```

**Opção 3: Resumo Antes de Submeter**
```html
<!-- Antes de submeter para Etapa 3, mostrar resumo -->
<div id="resumo-step-1" class="form-review">
  <h3>Confira seus dados:</h3>
  <p>Nome: <strong id="review-nome"></strong></p>
  <p>Email: <strong id="review-email"></strong></p>
  <p>Telefone: <strong id="review-telefone"></strong></p>
  <button>Confirmar e Prosseguir</button>
  <button>Editar</button>
</div>
```

### Checklist de Resolução
- [ ] Implementar validação por etapa ao clicar "AVANÇAR"
- [ ] Mostrar erros inline (ao lado do campo)
- [ ] Evitar avanço se validação falhar
- [ ] Adicionar resumo antes de submeter
- [ ] Testar fluxo completo com Robot Framework
- [ ] Testar com dados inválidos em cada etapa
- [ ] Testar navegação "voltar" (se aplicável)
- [ ] Validar com testes E2E (Cypress/Robot)

### Impacto nos Testes Automatizados

**Antes (Sem Navegação):**
```robot
# Falha - base legal não visível
Validar Base Legal Obrigatória
    Element Should Be Visible    ${CHECKBOX_LEGAL}  # ❌ FAIL
```

**Depois (Com Navegação):**
```robot
# Passa - navega e valida
Validar Base Legal Obrigatória
    Click Element    ${BUTTON_AVANCAR}             # Clica AVANÇAR
    Wait Until Page Contains Element    ${CHECKBOX_LEGAL}  # Espera aparecer
    Element Should Be Visible    ${CHECKBOX_LEGAL}  # ✅ PASS
```

### Relacionado
- [ISSUE #005](#issue-005) - Checkbox não localizado (Etapa 2)
- [ISSUE #001](#issue-001) - ActionsForm não define validação progressiva

### Descoberta do Robot Framework
Esta issue foi descoberta executando testes críticos do Robot Framework v7.0:
```
Testes Passando (4):
  ✅ TC001 - Carregamento da página
  ✅ TC002 - Elementos visíveis (Etapa 1)
  ✅ TC003 - Estrutura do formulário
  ✅ TC004 - Status HTTP

Testes Falhando (12):
  ❌ TC005-TC008 - Validação de campos (Etapa 1)
  ❌ TC009 - Email inválido
  ❌ TC011 - Base legal obrigatória (Etapa 2)
  ❌ TC012-TC014 - Preenchimento/submissão (Etapa 2)
  ❌ TC019-TC020 - Segurança XSS/SQL Injection
  ❌ TC030 - Dados inválidos

Causa: Formulário é multi-etapa, testes não navegam entre etapas
```

---

## RESUMO EXECUTIVO

| # | Título | Severidade | Status | Esforço |
|---|--------|-----------|--------|---------|
| #001 | ActionsForm Não Definida | Crítica | Aberta | 2-4h |
| #002 | Falta de Headings | Alta | Waiting | 30m |
| #003 | Falta de Textarea | Média | Pending | 1-2h |
| #004 | DOCTYPE Ausente | Média | Aberta | 15m |
| #005 | Checkbox Ausente | Crítica | Aberta | 2-3h |
| #006 | Erro em Handlers | Alta | Aberta | 1-2h |
| #007 | **Etapas sem Validação** | **Alta** | **Discovered** | **3-5h** |

### Prioridade de Correção
```
1º: #001 - ActionsForm (BLOQUEIA TUDO)
2º: #005 - Checkbox (BLOQUEIA ENVIO)
3º: #007 - Validação Multi-Etapa (BLOQUEIA TESTES) ⭐ NOVO
4º: #006 - Handler Rules (VALIDAÇÃO)
5º: #002 - Headings (SEO/Acessibilidade)
6º: #004 - DOCTYPE (Standards)
7º: #003 - Textarea (UX)
```

### Estimativa Total
- **Bloqueadores (Crítico):** 4-7 horas
- **Importantes (Alto):** 5-9 horas (*+3-5h para #007*)
- **Manutenção (Médio):** 2-4 horas
- **Total:** 11-20 horas de trabalho

---

## HISTÓRICO DE DESCOBERTAS

### Robot Framework Testing - 27/02/2026
**Execução:** Suite de testes críticos contra site em produção  
**Ambiente:** Chrome 145 | Robot Framework v7.0 | Python 3.13.7

**Resultados:**
- Total de Testes: 16
- ✅ Passando: 4 (25%)
- ❌ Falhando: 12 (75%)
- **Nova Issue Descoberta:** #007 - Formulário Multi-Etapa Sem Validação Progressiva

**Artefatos Gerados:**
- Suite de 55 testes Robot Framework
- 35+ keywords reutilizáveis
- Relatório HTML interativo (report.html)
- Documento executivo (RESULTADOS_ROBOT_FRAMEWORK.md)
- Diagnóstico de estrutura HTML

**Causa Raiz Identificada:**
Formulário utiliza wizard multi-step (4 etapas). Validação não é inline/progressiva.

---

## WORKFLOW

### Para cada issue:
1. [ ] Investigar causa raiz (Development)
2. [ ] Implementar fix (Development)
3. [ ] Testar localmente (QA/Dev)
4. [ ] Atualizar documentação (Tech Writing)
5. [ ] Deploy para staging (DevOps)
6. [ ] Teste final em staging (QA)
7. [ ] Deploy para produção (DevOps)
8. [ ] Validação pós-deploy (Monitoring)

### Para testes Robot Framework:
1. [ ] Implementar keywords de navegação entre etapas
2. [ ] Refatorar testes para incluir navegação
3. [ ] Executar suite completa com 4 etapas
4. [ ] Gerar relatório com cobertura 100%

---

Relatório gerado em: 27/02/2026  
**Última atualização:** 27/02/2026 (Robot Framework Results + ISSUE #007)  
Próxima revisão recomendada: Após correção de issues críticas (#001, #005, #007)
