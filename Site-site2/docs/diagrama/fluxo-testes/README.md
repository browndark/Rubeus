# Diagramas - Fluxo de Testes

Diagramas PlantUML que ilustram o fluxo de execução dos testes.

## Arquivos

### fluxo_execucao.puml
Fluxo sequencial de todos os 23 testes Robot Framework, divididos por categoria:
- Smoke Tests (4)
- Validação (4)
- Acessibilidade (3)
- Casos Extremos (3)
- Estrutura/DOCTYPE (1)
- Funcionalidade (3)
- Segurança (5)

**Como visualizar:**
```bash
# Online em PlantUML
# Copie o conteúdo do arquivo em: https://www.plantuml.com/plantuml/uml/

# Ou instale localmente
npm install -g plantuml
plantuml fluxo_execucao.puml
```

### fluxo_robot_vs_python.puml
Comparação entre:
- Robot Framework com Selenium (testes de funcionalidade)
- Python com JavaScript execute_script (testes de segurança)

Mostra porque o Robot Framework falhou em acessar a modal e como Python/JavaScript resolveu.

## Uso

1. Copie o código `.puml` 
2. Cole em https://www.plantuml.com/plantuml/uml/
3. Visualize o diagrama em tempo real

Ou use aplicativos como:
- VS Code Extension: PlantUML
- IntelliJ IDEA: Built-in
- Lucidchart: Importar PlantUML
