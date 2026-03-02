#!/usr/bin/env python3
"""
Diagnóstico do Site - https://qualidade.apprbs.com.br/site
Detecta elementos, issues e problemas de acessibilidade
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
from datetime import datetime

URL = "https://qualidade.apprbs.com.br/site"

def diagnose():
    print("="*70)
    print("DIAGNÓSTICO DO SITE - Site-site2")
    print("="*70)
    print(f"URL: {URL}")
    print(f"Data: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
    print("="*70)
    
    driver = webdriver.Chrome()
    
    try:
        driver.get(URL)
        print("\n1. CARREGAMENTO")
        print("-"*70)
        print(f"Status: OK - Página carregada")
        print(f"Título: {driver.title}")
        print(f"URL Atual: {driver.current_url}")
        
        # Elementos de formulário
        print("\n2. ELEMENTOS DO FORMULÁRIO")
        print("-"*70)
        
        inputs = driver.find_elements(By.TAG_NAME, "input")
        print(f"Total de inputs: {len(inputs)}")
        
        for i, inp in enumerate(inputs, 1):
            name = inp.get_attribute("name")
            type_ = inp.get_attribute("type")
            placeholder = inp.get_attribute("placeholder")
            required = inp.get_attribute("required")
            
            print(f"\n  Input {i}:")
            print(f"    - name: {name}")
            print(f"    - type: {type_}")
            print(f"    - placeholder: {placeholder}")
            print(f"    - required: {required}")
            
            # Verificar label
            label = driver.find_elements(By.CSS_SELECTOR, f"label[for='{name}']")
            if label:
                print(f"    - label: SIM - {label[0].text}")
            else:
                print(f"    - label: NÃO - PROBLEMA DE ACESSIBILIDADE!")
        
        # Issues de DevTools
        print("\n3. ISSUES ENCONTRADOS")
        print("-"*70)
        
        # DOCTYPE
        doctype = driver.find_element(By.TAG_NAME, "html")
        print(f"\n  DOCTYPE:")
        logs = driver.get_log('browser')
        if logs:
            for log in logs:
                if 'Quirks Mode' in str(log):
                    print(f"    - ALERTA: Modo Quirks detectado!")
                    print(f"    - Mensagem: {log['message']}")
        
        # Headings
        print(f"\n  Headings:")
        h1 = len(driver.find_elements(By.TAG_NAME, "h1"))
        h2 = len(driver.find_elements(By.TAG_NAME, "h2"))
        h3 = len(driver.find_elements(By.TAG_NAME, "h3"))
        print(f"    - H1: {h1}")
        print(f"    - H2: {h2}")
        print(f"    - H3: {h3}")
        if h1 == 0:
            print(f"    - PROBLEMA: Sem H1 (SEO/Acessibilidade)")
        
        # Erros de console
        print(f"\n  Erros de Console:")
        logs = driver.get_log('browser')
        errors = [log for log in logs if log['level'] == 'SEVERE']
        if errors:
            print(f"    - Total de erros: {len(errors)}")
            for err in errors[:5]:  # Mostrar primeiros 5
                print(f"    - {err['message'][:80]}")
        else:
            print(f"    - Nenhum erro crítico")
        
        # Validações
        print("\n4. VALIDAÇÕES")
        print("-"*70)
        
        # Testar submissão vazia
        try:
            botao = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            print(f"\n  Botão Submissão: ENCONTRADO")
            print(f"    - Texto: {botao.text}")
            
            # Clicar para testar validação
            botao.click()
            print(f"    - Clicado - Validação ativa")
        except:
            print(f"\n  Botão Submissão: NÃO ENCONTRADO")
        
        # Validações de email
        emails = driver.find_elements(By.CSS_SELECTOR, "input[type='email']")
        print(f"\n  Inputs de Email: {len(emails)}")
        
        # Estrutura HTML
        print("\n5. ESTRUTURA HTML")
        print("-"*70)
        
        forms = driver.find_elements(By.TAG_NAME, "form")
        print(f"Total de formulários: {len(forms)}")
        
        for i, form in enumerate(forms, 1):
            form_id = form.get_attribute("id")
            form_name = form.get_attribute("name")
            print(f"\n  Formulário {i}:")
            print(f"    - ID: {form_id}")
            print(f"    - Name: {form_name}")
            
            inputs_in_form = form.find_elements(By.TAG_NAME, "input")
            print(f"    - Inputs: {len(inputs_in_form)}")
        
        print("\n" + "="*70)
        print("DIAGNÓSTICO CONCLUÍDO")
        print("="*70)
        
    except Exception as e:
        print(f"\nERRO: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    diagnose()
