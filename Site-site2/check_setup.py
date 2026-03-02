#!/usr/bin/env python3
"""
Verificação Rápida - Site-site2
Testa se a estrutura e dependências estão configuradas
"""

import os
import sys
from pathlib import Path

def check_structure():
    print("="*70)
    print("VERIFICAÇÃO DE ESTRUTURA - Site-site2")
    print("="*70)
    
    base_path = Path(__file__).parent
    
    # Diretórios esperados
    dirs = {
        'robot': 'Testes Robot Framework',
        'robot/tests': 'Testes',
        'robot/keywords': 'Keywords',
        'robot/resources': 'Recursos',
        'docs': 'Documentação'
    }
    
    print("\n1. ESTRUTURA DE DIRETÓRIOS")
    print("-"*70)
    
    all_ok = True
    for dir_name, desc in dirs.items():
        dir_path = base_path / dir_name
        exists = dir_path.exists()
        status = "OK" if exists else "FALTA"
        color = "\033[92m" if exists else "\033[91m"  # Green or Red
        print(f"{color}{status}\033[0m - {dir_name:<30} ({desc})")
        all_ok = all_ok and exists
    
    # Arquivos esperados
    print("\n2. ARQUIVOS PRINCIPAIS")
    print("-"*70)
    
    files = {
        'README.md': 'Documentação principal',
        'requirements-robot.txt': 'Dependências Python',
        'diagnose_site.py': 'Script de diagnóstico',
        'robot/tests/site_tests.robot': 'Testes Robot',
        'robot/keywords/site_keywords.robot': 'Keywords',
        'robot/resources/variables.robot': 'Variáveis',
        'docs/ISSUES.md': 'Issues encontradas',
        'docs/README.md': 'Documentação de docs'
    }
    
    for file_name, desc in files.items():
        file_path = base_path / file_name
        exists = file_path.exists()
        status = "OK" if exists else "FALTA"
        color = "\033[92m" if exists else "\033[91m"
        size = f"({file_path.stat().st_size} bytes)" if exists else ""
        print(f"{color}{status}\033[0m - {file_name:<40} {size}")
        all_ok = all_ok and exists
    
    # Sumário
    print("\n" + "="*70)
    if all_ok:
        print("\033[92mESTRUTURA COMPLETA E PRONTA!\033[0m")
        print("\nPróximos passos:")
        print("  1. pip install -r requirements-robot.txt")
        print("  2. python diagnose_site.py")
        print("  3. robot robot/tests/site_tests.robot")
    else:
        print("\033[91mALGUNS ARQUIVOS ESTÃO FALTANDO!\033[0m")
        return False
    
    print("="*70)
    return True

if __name__ == "__main__":
    success = check_structure()
    sys.exit(0 if success else 1)
