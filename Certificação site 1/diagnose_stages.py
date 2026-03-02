#!/usr/bin/env python3
"""
Script para diagnosticar a estrutura multi-etapas do formulário
"""
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--start-maximized')

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=chrome_options
)

try:
    print("🔍 DIAGNÓSTICO DE ETAPAS DO FORMULÁRIO\n")
    print("=" * 80)
    
    driver.get("https://qualidade.apprbs.com.br/certificacao")
    time.sleep(3)
    
    # Encontrar todas as etapas
    forms = driver.find_elements(By.TAG_NAME, "form")
    print(f"\n📋 Total de formulários encontrados: {len(forms)}\n")
    
    for i, form in enumerate(forms):
        form_id = form.get_attribute("id")
        form_display = form.get_attribute("style") or "visible"
        
        # Verificar se o formulário está visível
        try:
            is_visible = form.is_displayed()
        except:
            is_visible = False
            
        print(f"\n🔹 FORMULÁRIO #{i+1}: {form_id}")
        print(f"   Visível: {'✅' if is_visible else '❌'}")
        
        if is_visible:
            # Inputs
            inputs = form.find_elements(By.TAG_NAME, "input")
            print(f"   Inputs: {len(inputs)}")
            for inp in inputs:
                name = inp.get_attribute("name")
                type_attr = inp.get_attribute("type")
                placeholder = inp.get_attribute("placeholder")
                if placeholder:
                    print(f"      • {type_attr} (name={name}): {placeholder}")
                elif type_attr != "hidden":
                    print(f"      • {type_attr} (name={name})")
            
            # Checkboxes específicos
            checkboxes = form.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
            if checkboxes:
                print(f"   Checkboxes: {len(checkboxes)}")
                for chk in checkboxes:
                    label_elem = None
                    chk_id = chk.get_attribute("id")
                    if chk_id:
                        try:
                            label_elem = driver.find_element(By.CSS_SELECTOR, f"label[for='{chk_id}']")
                        except:
                            pass
                    
                    label_text = label_elem.text if label_elem else "N/A"
                    print(f"      • id={chk_id} | {label_text}")
            
            # Buttons neste formulário
            buttons = form.find_elements(By.TAG_NAME, "button")
            if buttons:
                print(f"   Buttons: {len(buttons)}")
                for btn in buttons:
                    button_id = btn.get_attribute("id")
                    button_text = btn.text.strip()[:30] if btn.text else "(sem texto)"
                    button_type = btn.get_attribute("type")
                    print(f"      • [{button_type}] {button_id}: {button_text}")
            
            # Verificar se há submit button
            submit_btn = None
            try:
                submit_btn = form.find_element(By.CSS_SELECTOR, "button[type='submit']")
            except:
                pass
            
            print(f"   Submit: {'✅ Sim' if submit_btn else '❌ Não'}")
    
    print("\n" + "=" * 80)
    print("\n✅ Diagnóstico de etapas concluído!")
    
finally:
    driver.quit()
