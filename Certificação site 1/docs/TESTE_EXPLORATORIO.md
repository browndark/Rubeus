TESTE EXPLORATÓRIO - Página de Certificação

URL: https://qualidade.apprbs.com.br/certificacao
Data: 27/02/2026
Framework: Cypress
Tipo: Teste Exploratório (Exploratory Testing)

==================================================

RESUMO EXECUTIVO

Total de Testes Exploratórios: 14
Categorias Testadas: 13
Técnicas Utilizadas: 12+
Status: Pronto para execução

Técnicas de teste exploratório aplicadas:
- Teste de funcionalidade básica
- Teste de campos e validação
- Teste de comportamento de erros
- Teste de interatividade (Hover/Focus)
- Teste de conteúdo e estrutura
- Teste de SEO e meta tags
- Teste de acessibilidade
- Teste de estilos CSS
- Teste de responsividade
- Teste de performance
- Teste de segurança básica
- Teste de erros de console

==================================================

[TESTE 01] Carregamento e Elementos Visíveis

Objetivo: Verificar carregamento básico da página

O que é testado:
- URL está correta (/certificacao)
- Página carregou sem erros
- Presença de títulos (h1, h2, h3)
- Presença de palavra-chave "Certificação"
- Total de elementos da página

Esperado:
✓ URL contém /certificacao
✓ Body está visível
✓ Títulos encontrados
✓ Palavra "Certificação" mencionada
✓ Contagem de elementos > 10

Técnicas:
- Verificação de URL
- Verificação de visibilidade
- Busca de texto
- Contagem de DOM elements

Logs:
- Status da URL
- Quantidade e conteúdo de títulos
- Presença de palavra-chave
- Total de elementos

==================================================

[TESTE 02] Explorar Formulário - Campos Disponíveis

Objetivo: Mapear todos os campos do formulário

O que é testado:
- Total de formulários na página
- Inputs em cada formulário (type, name, placeholder, id, required)
- Textareas presentes
- Select/dropdowns
- Checkboxes
- Botões

Esperado:
✓ Identificar todos os inputs de texto
✓ Identificar campos de telefone
✓ Identificar campos de email
✓ Identificar checkboxes de validação
✓ Contar botões de ação

Técnicas:
- Seleção de elementos específicos
- Iteração através de collections
- Extração de atributos

Resultados documentados:
- Tipo de input
- Nome do atributo
- Placeholder
- ID
- Se é requerido

==================================================

[TESTE 03] Validação de Entrada - Teste de Limites

Objetivo: Explorar comportamento de validação de campos

Campos testados:
- Campo Nome
- Campo Telefone
- Campo Email

Cenários para cada campo:
1. Campo vazio (sem input)
2. Dados muito curtos
3. Dados com números (quando deveria ser letras)
4. Caracteres especiais
5. Dados válidos completos

Esperado:
⚠ Explorar comportamento (não há validação pré-definida)
O sistema pode aceitar ou rejeitar inputs

Técnicas:
- Type action
- Blur action
- Clear action
- Value assertion

Dados de teste:
- Nome: A, 123456, !@#$%^&*(), João Silva Santos
- Telefone: (vazio), abc, 123, 11987654321
- Email: (vazio), emailinvalido, email@, email @example .com, usuario.teste@example.com

==================================================

[TESTE 04] Comportamento de Erros

Objetivo: Explorar como o sistema exibe erros de validação

O que é testado:
- Submissão de formulário vazio
- Apresentação de mensagens de erro
- Lokalizacao de elementos de alerta
- Conteúdo da mensagem de erro

Esperado:
? Sistema pode exibir:
  - Mensagens inline (dentro do campo)
  - Mensagens no topo do formulário
  - Toast/alert notifications
  - Destaque visual do campo com erro

Elementos procurados:
- .error (classe de erro)
- .alert (classe de alerta)
- .alert-danger (Bootstrap)
- [role="alert"] (ARIA)
- .form-error (genérico)

Informações coletadas:
- Quantidade de alertas
- Conteúdo da mensagem
- Localização na página

==================================================

[TESTE 05] Interatividade - Hover e Focus

Objetivo: Testar comportamento interativo dos elementos

O que é testado:
- Mudança visual no hover de botão
- Mudança visual no focus de input
- Navegação com TAB entre inputs

Esperado:
✓ Botões mudam cor/estilo ao passar mouse
✓ Inputs têm border ou highlight ao ganhar focus
✓ Teclado pode navegar entre inputs

Técnicas:
- Trigger mouseover
- Focus action
- Tab key press
- CSS color comparison

==================================================

[TESTE 06] Conteúdo da Página - Links e Imagens

Objetivo: Explorar todo conteúdo visual e navegacional

O que é testado:
- Total de links (<a> tags)
- Texto e href de cada link
- Total de imagens (<img> tags)
- Atributos src e alt de imagens
- Acessibilidade (alt text)

Esperado:
✓ Links funcionam (href não vazio)
✓ Links têm texto descritivo
✓ Imagens têm alt text
? Imagens podem estar faltando alt text (acessibilidade)

Informações coletadas:
- Lista completa de links com destino
- Lista de imagens com src
- Aviso: Imagens sem alt text

==================================================

[TESTE 07] Meta Tags e SEO

Objetivo: Verificar configurações de SEO da página

O que é testado:
- Title da página (importante para ranking)
- Meta description (exibida nos resultados de busca)
- Meta viewport (responsividade)
- Favicon (ícone da página)

Esperado:
✓ Title é significativo e descritivo
✓ Description contém palavras-chave
✓ Viewport correct para mobile
✓ Favicon está presente

Impacto:
- Title: Aparece na aba do navegador e resultados Google
- Description: Exibida no Google Search
- Viewport: Essencial para mobile
- Favicon: Identidade visual

==================================================

[TESTE 08] Acessibilidade e Estrutura HTML

Objetivo: Avaliar acessibilidade para usuários com deficiência

O que é testado:
- Presença de labels (<label> tags)
- Inputs com identificadores (id ou aria-label)
- Estrutura de headings (h1, h2, h3...)
- Elementos com ARIA roles

Esperado:
✓ Cada input tem label associado
✓ Labels têm atributo "for" correto
✓ Inputs têm id ou aria-label
✓ Headings em ordem lógica
✓ Elementos com role definido

WCAG 2.1 Level AA:
- 1.1.1 Text Alternatives (alt text em imagens)
- 1.3.1 Info and Relationships (labels associadas)
- 2.1.1 Keyboard (navegação com teclado)
- 2.4.3 Focus Order (ordem de focus logicamente sensata)

==================================================

[TESTE 09] Estilos CSS e Tema Visual

Objetivo: Explorar design e estilo visual da página

O que é testado:
- Cor de fundo do formulário
- Cor de borda do formulário
- Cor de fundo dos botões
- Cor do texto dos botões
- Tamanho da fonte dos botões

Informações coletadas:
- CSS computed values
- RGB/HEX colors
- Font sizes
- Border styles

Útil para:
- Documentar design da página
- Comparar com brand guidelines
- Verificar consistência visual
- Validar contraste (acessibilidade)

==================================================

[TESTE 10] Responsividade - Diferentes Tamanhos

Objetivo: Testar funcionalidade em diferentes tamanhos de tela

Viewports testadas:
1. Mobile XS: 320x568 (iPhone 5)
2. Mobile SM: 375x667 (iPhone 8)
3. Mobile MD: 480x800 (Samsung Galaxy)
4. Tablet: 768x1024 (iPad)
5. Laptop: 1024x768
6. Desktop: 1280x720 (padrão)
7. Desktop XL: 1920x1080 (4K)

O que é verificado:
- Formulário está visível em cada tamanho
- Largura do formulário se adapta
- Elementos não ficam fora da tela

Esperado:
✓ Funciona em mobile (< 480px)
✓ Funciona em tablet (480-1024px)
✓ Funciona em desktop (> 1024px)

Técnicas:
- cy.viewport() para mudar tamanho
- Verificação de visibilidade
- Medição de elementos

==================================================

[TESTE 11] Performance e Tempo de Carregamento

Objetivo: Analisar métricas de performance da página

O que é testado:
- Tempo total de carregamento
- Tempo de resposta do servidor
- Quantidade de recursos carregados
- Tipo de recursos (JS, CSS, imagens)

Informações coletadas:
- Tempo de carga (navigationStart até loadEventEnd)
- Tempo de resposta (fetchStart até responseEnd)
- Contagem de scripts carregados
- Contagem de stylesheets
- Contagem de imagens

Performance esperada:
< 3000ms - Excelente
3000-5000ms - Aceitável
> 5000ms - Lento (investigar)

Otimizações (se necessário):
- Minificar CSS/JS
- Comprimir imagens
- Lazy loading
- Cache

==================================================

[TESTE 12] Validação de Segurança Básica

Objetivo: Explorar protecções contra ataques comuns

Testes de injeção:
1. XSS (Cross-Site Scripting)
   - Injetar: <script>alert("XSS")</script>
   - Esperado: Script não executa (HTML escaped)

2. SQL Injection
   - Injetar: '; DROP TABLE users; --
   - Esperado: Tratado como string, não executa SQL

3. Verificação de Autocomplete
   - Buscar atributo autocomplete nos inputs
   - Sensível para campos sensíveis (senha, cartão)

Importante:
- Estes são testes básicos exploratórios
- Não substituem teste de segurança completo
- Não testam autenticação ou autorização
- OWASP Top 10 não foi completamente coberto

==================================================

[TESTE 13] Erros de Console e Warnings

Objetivo: Detectar problemas técnicos na página

O que é testado:
- Console.error() chamadas
- Console.warn() chamadas
- Erros JavaScript não tratados

Possíveis problemas:
- Scripts quebrados
- CDN não acessível
- APIs falhando
- JavaScript syntax errors

Resultado:
✓ Sem erros de console
⚠ Com warnings (analisar)
✗ Com erros (investigar)

==================================================

[TESTE 14] Resumo e Catalogação

Objetivo: Documentar todos os achados

Dados coletados:
- Todos os inputs encontrados
- Todos os botões encontrados
- Todos os links
- Métricas de performance
- Estrutura HTML

Este documento e arquivo são o resultado da catalogação.

==================================================

TÉCNICAS DE TESTE EXPLORATÓRIO UTILIZADAS

1. Exploratory Testing (Teste Exploratório)
   - Executar testes sem script pré-definido
   - Aprender sobre a aplicação enquanto testa
   - Adaptar testes baseado em achados

2. User Journey Testing
   - Simular caminho de usuário real
   - Testar cenários reais de uso
   - Validar fluxo de trabalho

3. Boundary Value Testing
   - Testar limites (vazio, muito curto, muito longo)
   - Testar com dados no limite da validação

4. Error Guessing
   - Adivinhar possíveis erros
   - Testar pontos comuns de falha
   - Injeção de dados malformados

5. Security Testing (Básico)
   - XSS injection
   - SQL injection
   - Input validation bypass

6. Accessibility Testing
   - WCAG 2.1 compliance
   - Screen reader compatibility
   - Keyboard navigation

7. Cross-browser Testing
   - Testar em diferentes navegadores
   - Testar em diferentes tamanhos de tela

8. Performance Testing
   - Medir tempo de carregamento
   - Contar recursos
   - Analisar métricas

9. Visual Testing
   - Comparar cores
   - Verificar layout
   - Validar espaçamento

10. Compatibility Testing
    - Desktop
    - Tablet
    - Mobile

11. Responsive Testing
    - Breakpoints diferentes
    - Orientação (portrait/landscape)

12. Ad Hoc Testing
    - Testes não planejados
    - Baseado em curiosidade
    - Descobrir comportamentos inesperados

==================================================

COMO EXECUTAR OS TESTES

1. Via Cypress Interface (Recomendado):
   npm run cypress:open
   Selecionar: teste_exploratorio.cy.js
   Clicar: Start Testing

2. Modo Headless:
   npm run cypress:headless
   (Testes rodam automaticamente e geram relatório)

3. Teste Específico:
   npx cypress run cypress/e2e/teste_exploratorio.cy.js --browser chrome

==================================================

INTERPRETAÇÃO DOS RESULTADOS

Formato dos Logs:
✓ Teste passou (elemento encontrado, validação OK)
⚠ Aviso (possível problema, validar manualmente)
✗ Erro (teste falhou, elemento não encontrado)
- Informação (dado coletado, sem validação)

Cada teste documenta:
- O que foi testado
- Como foi testado
- Resultado encontrado
- Recomendação de ação

==================================================

RECOMENDAÇÕES PÓS-TESTE

Se tudo passou:
✓ Página está funcionando bem
✓ Formulário é responsivo
✓ Acessibilidade básica OK
✓ Performance aceitável

Se houve alertas/erros:
1. Revisar ANALISE_ERROS.md para erros conhecidos
2. Executar teste específico novamente
3. Usar DevTools do navegador para debug
4. Verificar console para JavaScript errors

Próximos passos:
- Testes funcionais detalhados (certificacao.cy.js)
- Testes de API (postman collection)
- Testes de performance avançados
- Teste de segurança completo (OWASP)

==================================================

LIMITAÇÕES DESTE TESTE

Este é um teste exploratório básico. Não cobre:
- Autenticação e autorização
- Testes de carga/stress
- Teste de penetração completo
- Teste de integração com backend
- Testes de banco de dados
- Testes de API completos
- Teste de browsers antigos (IE)

FIM DO DOCUMENTO

Data: 27/02/2026
Versão: 1.0
Status: Completo

==================================================
