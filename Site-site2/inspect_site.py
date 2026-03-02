#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Inspetor de Site - Descobrir estrutura real do site
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def inspect_site():
    """Escanear a estrutura do site"""
    print("🔍 INSPECIONANDO SITE: https://qualidade.apprbs.com.br/site")
    print("="*60)
    
    options = webdriver.ChromeOptions()
    options.add_argument('--start-maximized')
    driver = webdriver.Chrome(options=options)
    
    try:
        # Acessar o site
        driver.get("https://qualidade.apprbs.com.br/site")
        time.sleep(5)
        
        print(f"\n✓ Página carregada: {driver.title}")
        print(f"✓ URL atual: {driver.current_url}")
        
        # Procurar por formulários
        print("\n📋 FORMULÁRIOS ENCONTRADOS:")
        forms = driver.find_elements(By.TAG_NAME, "form")
        print(f"  - Total: {len(forms)}")
        for i, form in enumerate(forms):
            form_id = form.get_attribute("id")
            print(f"    Form {i+1}: id='{form_id}'")
        
        # Procurar por inputs
        print("\n📝 INPUTS ENCONTRADOS:")
        inputs = driver.find_elements(By.TAG_NAME, "input")
        print(f"  - Total: {len(inputs)}")
        for i, inp in enumerate(inputs):
            inp_type = inp.get_attribute("type")
            inp_name = inp.get_attribute("name")
            inp_id = inp.get_attribute("id")
            inp_placeholder = inp.get_attribute("placeholder")
            print(f"    Input {i+1}: type='{inp_type}', name='{inp_name}', id='{inp_id}', placeholder='{inp_placeholder}'")
        
        # Procurar por botões
        print("\n🔘 BOTÕES ENCONTRADOS:")
        buttons = driver.find_elements(By.TAG_NAME, "button")
        print(f"  - Total: {len(buttons)}")
        for i, btn in enumerate(buttons):
            btn_type = btn.get_attribute("type")
            btn_text = btn.text
            btn_id = btn.get_attribute("id")
            print(f"    Button {i+1}: type='{btn_type}', text='{btn_text}', id='{btn_id}'")
        
        # Procurar por labels
        print("\n🏷️ LABELS ENCONTRADOS:")
        labels = driver.find_elements(By.TAG_NAME, "label")
        print(f"  - Total: {len(labels)}")
        for i, label in enumerate(labels):
            label_for = label.get_attribute("for")
            label_text = label.text
            print(f"    Label {i+1}: for='{label_for}', text='{label_text}'")
        
        # Procurar por headings
        print("\n📍 HEADINGS ENCONTRADOS:")
        for level in range(1, 7):
            headings = driver.find_elements(By.TAG_NAME, f"h{level}")
            if headings:
                print(f"  H{level}: {len(headings)} elementos")
                for h in headings:
                    print(f"    - {h.text[:50]}")
        
        # Verificar DOCTYPE
        print("\n🔍 DOCTYPE:")
        doctype = driver.execute_script("return document.doctype;")
        if doctype:
            print(f"  ✓ Declarado: {doctype.name}")
        else:
            print(f"  ✗ Não declarado")
        
        # Erros do console
        print("\n⚠️ ERROS NO CONSOLE:")
        logs = driver.get_log('browser')
        error_count = 0
        for log in logs:
            if log['level'] == 'SEVERE':
                error_count += 1
                print(f"  [{log['level']}] {log['message'][:100]}")
        if error_count == 0:
            print("  Nenhum erro SEVERE encontrado")
        
        # Screenshot
        print("\n📸 Capturando screenshot...")
        driver.save_screenshot("site_inspect.png")
        print("  ✓ Salvo em: site_inspect.png")
        
        # HTML completo
        print("\n💾 Salvando HTML...")
        html = driver.page_source
        with open("site_source.html", "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  ✓ Salvo em: site_source.html")
        
    except Exception as e:
        print(f"❌ ERRO: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        driver.quit()
        print("\n✓ Navegador fechado")

if __name__ == "__main__":
    inspect_site()
