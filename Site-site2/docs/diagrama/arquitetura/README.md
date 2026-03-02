# Diagramas - Arquitetura

Diagramas PlantUML que ilustram a arquitetura técnica do projeto.

## Arquivos

### arquitetura_projeto.puml
Visão geral da arquitetura:
- **Testes Automatizados**: Robot Framework + Python Scripts
- **Recursos**: ChromeDriver, Selenium, Python
- **Documentação**: Issues, Relatórios, Resultados
- **Saída**: Relatórios HTML, screenshots, XML

Mostra como os diferentes componentes se integram.

### componentes.puml
Diagrama de componentes detalhado:
- VS Code (Editor)
- Python 3.13 (Runtime)
- Robot Framework + Selenium (Execução)
- WebDriver Manager (Gerenciamento de driver)
- Chrome WebDriver (Navegador)
- Workspace (Estrutura de pastas)

Ilustra as dependências entre componentes.

## Estrutura do Workspace

```
Site-site2/
├── robot/
│   ├── tests/site_tests.robot (23 testes)
│   ├── keywords/site_keywords.robot (8 keywords)
│   └── resources/variables.robot (seletores)
├── docs/
│   ├── ISSUES.md (8 issues)
│   └── diagrama/ (este arquivo)
├── results/ (relatórios e screenshots)
├── teste_seguranca_completo.py
├── testes_exploratorios.py
└── README.md
```

## Tecnologias

- **Robot Framework**: v7.0
- **Selenium**: v4.15.2
- **Python**: 3.13.7
- **Google Chrome**: Latest

## Como Usar

1. Instalar dependências:
```bash
pip install -r requirements-robot.txt
```

2. Executar testes:
```bash
robot robot/tests/site_tests.robot
```

3. Executar testes de segurança:
```bash
python teste_seguranca_completo.py
```
