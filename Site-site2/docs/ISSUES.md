# Issues Encontradas - Site (https://qualidade.apprbs.com.br/site)

## Resumo Executivo

**Total de Issues**: 8  
**CRÍTICAS**: 4 | **ALTAS**: 2 | **MÉDIAS**: 2  
**Status de Deploy**: BLOQUEADO - Vulnerabilidades críticas identificadas  
**Data de Atualização**: 02/03/2026

### Recomendação

NÃO DEPLOYAR em produção até corrigir todas as issues CRÍTICAS (#001, #002, #006, #007).

---

## ISSUE #001 - Label Não Associada ao Input de Email

**Severidade**: CRÍTICA  
**Prioridade**: 1  
**Status**: Descoberto  
**Encontrado em**: DevTools - "No label associated with a form field"

### Descrição
Campo de email não possui label corretamente associada via atributo `for`. Isso viola:
- WCAG 2.1 (Accessibility)
- HTML5 Semantic Web
- Boas práticas de UX

### Impacto
- Leitores de tela não conseguem identificar o campo
- Usuários com deficiência visual prejudicados
- Falhas em testes de acessibilidade

### Testes Afetados
- ACC01 - Validar Labels Associadas
- ACC02 - Validar Estrutura de Headings

### Solução Proposta

**Opção 1 - Label HTML (Recomendado)**
```html
<label for="email">Email *</label>
<input id="email" name="email" type="email" required />
```

**Opção 2 - ARIA Label**
```html
<input aria-label="Email" name="email" type="email" required />
```

### Estimativa
- Tempo de correção: 15-30 minutos
- Complexidade: Baixa

---

## ISSUE #002 - DOCTYPE Não Declarado

**Severidade**: CRÍTICA  
**Prioridade**: 2  
**Status**: Descoberto  
**Encontrado em**: DevTools - "Page layout may be unexpected due to Quirks Mode"

### Descrição
Página carece de declaração DOCTYPE, causando Quirks Mode. Navegador interpreta HTML de forma legada (IE5/6).

### Impacto
- Comportamento CSS impredizível
- Box-model diferente (border-box vs content-box)
- Incompatibilidade com padrões modernos

### Testes Afetados
- QUIRKS01 - DOCTYPE Declarado
- ST001 - Carregar Página com Sucesso

### Solução Proposta

Adicionar no início do arquivo HTML:
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    ...
</head>
```

### Estimativa
- Tempo de correção: 5-10 minutos
- Complexidade: Muito Baixa

---

## ISSUE #003 - Falta de H1 na Página

**Severidade**: ALTA  
**Prioridade**: 3  
**Status**: Descoberto  
**Encontrado em**: Diagnóstico HTML

### Descrição
Página não possui tag H1. Viola:
- SEO (Search Engine Optimization)
- Accessibility (WCAG 2.1)
- Estrutura semântica de documentos

### Impacto
- Motores de busca não identificam assunto principal
- Usuários de leitores de tela prejudicados
- Ranking SEO reduzido

### Testes Afetados
- ACC02 - Validar Estrutura de Headings
- QUIRKS01 - DOCTYPE Declarado

### Solução Proposta

Adicionar H1 logo após `<body>`:
```html
<h1>Formulário de Cadastro</h1>
<form>
    ...
</form>
```

### Estimativa
- Tempo de correção: 10-20 minutos
- Complexidade: Baixa

---

## ISSUE #004 - Validação em Tempo Real Insuficiente

**Severidade**: ALTA  
**Prioridade**: 4  
**Status**: Descoberto  
**Encontrado em**: Testes de Validação

### Descrição
Validação só ocorre ao submeter. Sem feedback visual durante preenchimento (onChange).

### Impacto
- UX deficiente
- Usuários não sabem se está correto antes de submeter
- Altas taxas de erro em submissão

### Testes Afetados
- FUNC02 - Validação em Tempo Real
- VAL02 - Email Inválido

### Solução Proposta

Implementar validação JavaScript no evento `oninput`:
```html
<input 
    type="email" 
    oninput="validarEmail(this.value)"
    onchange="mostrarErro()"
/>
```

### Estimativa
- Tempo de correção: 1-2 horas
- Complexidade: Média

---

## ISSUE #005 - Proteção Insuficiente contra XSS

**Severidade**: MÉDIA  
**Prioridade**: 5  
**Status**: Descoberto  
**Encontrado em**: Teste EDGE02

### Descrição
Inputs podem aceitar código JavaScript (XSS). Sem sanitização no frontend.

### Impacto
- Risco de injeção de código malicioso
- Roubo de dados/sessão de usuários
- Alteração do DOM

### Testes Afetados
- EDGE02 - Caracteres Especiais XSS

### Solução Proposta

**Frontend (Validação)**:
```javascript
function sanitizar(input) {
    return DOMPurify.sanitize(input);
}
```

**Backend (Escape HTML)**:
```javascript
const escaped = escapeHtml(dados);
```

### Estimativa
- Tempo de correção: 2-4 horas
- Complexidade: Média-Alta

---

## ISSUE #006 - SQL Injection no Campo Nome

**Severidade**: CRÍTICA  
**Prioridade**: 1  
**Status**: CONFIRMADO em Testes de Segurança  
**Encontrado em**: Teste SEC-001 (02/03/2026)

### Descrição
Campo `pessoa.nome` aceita caracteres SQL. Entrada como `' OR '1'='1` é processada sem escape ou prepared statements.

### Impacto - CRÍTICO
- Injeção de SQL possível
- Roubo de dados do banco de dados
- Modificação/exclusão de dados
- Comprometimento total da segurança da aplicação

### Teste de Confirmação
```
Entrada: ' OR '1'='1
Campo: pessoa.nome
Resultado: ACEITO (vulnerável)
Status: VULNERABILIDADE CONFIRMADA
```

### Testes Afetados
- SEC-001 - SQL Injection no Nome

### Solução Proposta

**Backend (Obrigatório - Prepared Statements)**:
```php
// INCORRETO - Vulnerável a SQL Injection
$query = "INSERT INTO pessoas (nome) VALUES ('{$nome}')";

// CORRETO - Usar prepared statements
$stmt = $pdo->prepare("INSERT INTO pessoas (nome) VALUES (?)");
$stmt->execute([$nome]);

// OU com parametrização nomeada
$stmt = $pdo->prepare("INSERT INTO pessoas (nome) VALUES (:nome)");
$stmt->execute([':nome' => $nome]);
```

**Frontend (Validação adicional)**:
```javascript
const nome = input.value.trim();
if (!/^[a-záéíóúãõç\s'-]+$/i.test(nome)) {
    throw new Error("Nome contém caracteres inválidos");
}
```

### Estimativa
- **Tempo**: 1,5-2 horas
- **Complexidade**: Média (requer revisão de TODAS as queries do sistema)

### Prioridade
**URGENTE** - Corrigir antes de qualquer deploy

---

## ISSUE #007 - XSS (Cross-Site Scripting) no Campo Email

**Severidade**: CRÍTICA  
**Prioridade**: 2  
**Status**: Descoberto em Testes Exploratórios  
**Encontrado em**: Teste ERROR GUESSING (SEC-002) - 01/03/2026

### Descrição
Campo `pessoa.emailPrincipal` aceita tags HTML e JavaScript. Entrada como `<script>alert('xss')</script>` é processada sem escape.

### Impacto
- CRÍTICO - XSS (Cross-Site Scripting) possível
- Roubo de sessões de usuários
- Redirecionamento para sites maliciosos
- Coleta de credenciais
- Distribuição de malware

### Testes Afetados
- SEC-002 - XSS no Campo Email
- EDGE02 - Caracteres Especiais XSS

### Casos de Teste
```
Entrada: <script>alert('xss')</script>
Resultado: ACEITO (deveria ser REJEITADO)
Risco: Execução de código JavaScript arbitrário
```

### Solução Proposta

**Backend (Obrigatório - Escape HTML)**:
```php
// Escapar HTML na saída
$email_safe = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');

// Ou validar rigorosamente no input
filter_var($email, FILTER_VALIDATE_EMAIL);
```

**Frontend (Validação)**:
```javascript
// Rejeitar caracteres especiais
const email = input.value;
if (/<[^>]*>/.test(email)) {
    mostrarErro("Email contém caracteres inválidos");
}
```

### Estimativa
- Tempo de correção: 1,5-2 horas
- Complexidade: Média (requer sanitização em múltiplos pontos)

---

## ISSUE #008 - Validação Fraca de Tipo de Dado (Nome Aceita Números)

**Severidade**: MÉDIA  
**Prioridade**: 6  
**Status**: Descoberto em Testes Exploratórios  
**Encontrado em**: Teste ERROR GUESSING (SEC-003) - 01/03/2026, BVA-006

### Descrição
Campo `pessoa.nome` aceita números e caracteres especiais. Entrada como `João123Silva456` é considerada válida.

### Impacto
- Dados inconsistentes no banco
- Validação de tipo fraca
- Possibilidade de dados inúteis ser cadastrados
- Problemas em relatórios e buscas

### Testes Afetados
- SEC-003 - Números no Nome
- BVA - Validação de tipo de dado
- DT-007 - Combinações inválidas

### Casos de Teste
```
Entrada: João123Silva456
Resultado: ACEITO (deveria ser REJEITADO)
Esperado: Apenas letras, espaços, hífens e apóstrofos
```

### Solução Proposta

**Backend (Validação)**:
```php
// Aceitar apenas letras, espaços, hífens e apóstrofos
if (!preg_match('/^[a-záéíóúãõç\s\'-]+$/i', $nome)) {
    throw new Exception("Nome contém caracteres inválidos");
}
```

**Frontend (Input type text com padrão)**:
```html
<input 
    type="text"
    pattern="[a-záéíóúãõç\s\'-]+"
    placeholder="João Silva"
/>
```

### Estimativa
- Tempo de correção: 30 minutos - 1 hora
- Complexidade: Baixa

---

## Resumo de Ações

| Issue | Severidade | Tempo | Prioridade |
|-------|-----------|-------|-----------|
| #001 - Label Email | CRÍTICA | 30min | 1 |
| #002 - DOCTYPE | CRÍTICA | 10min | 2 |
| #003 - H1 Faltando | ALTA | 20min | 3 |
| #004 - Validação Real | ALTA | 2h | 4 |
| #005 - XSS | MÉDIA | 3h | 5 |

**Tempo Total Estimado**: ~6 horas

---

## Próximas Ações

1. Adicionar DOCTYPE e H1 (CRÍTICAS - 30-40 minutos)
2. Associar label ao email (CRÍTICA - 30 minutos)
3. Implementar validação em tempo real (ALTA - 2 horas)
4. Implementar proteção XSS (MÉDIA - 3 horas)
5. Re-executar testes para validação

---

**Data de Análise**: 27/02/2026  
**Analista**: QA Automation Team
