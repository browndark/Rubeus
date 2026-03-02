#!/usr/bin/env python3
"""
Script de diagnóstico para encontrar seletores XPath corretos na página
"""
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# Configurar Chrome headless
chrome_options = Options()
chrome_options.add_argument('--start-maximized')
chrome_options.add_argument('--disable-notifications')

# Inicializar driver
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=chrome_options
)

try:
    # Acessar o site
    print("🔍 Acessando o site...")
    driver.get("https://qualidade.apprbs.com.br/certificacao")
    time.sleep(3)
    
    print("\n📋 DIAGNÓSTICO DE SELETORES\n")
    print("=" * 80)
    
    # 1. Inputs com placeholder
    print("\n1️⃣  INPUTS COM PLACEHOLDER:")
    try:
        inputs = driver.find_elements(By.TAG_NAME, "input")
        for i, inp in enumerate(inputs):
            placeholder = inp.get_attribute("placeholder")
            type_attr = inp.get_attribute("type")
            id_attr = inp.get_attribute("id")
            name_attr = inp.get_attribute("name")
            if placeholder or type_attr:
                print(f"   Input #{i}: placeholder='{placeholder}' | type='{type_attr}' | id='{id_attr}' | name='{name_attr}'")
    except Exception as e:
        print(f"   ❌ Erro: {e}")
    
    # 2. Buttons
    print("\n2️⃣  BUTTONS:")
    try:
        buttons = driver.find_elements(By.TAG_NAME, "button")
        for i, btn in enumerate(buttons):
            text = btn.text
            type_attr = btn.get_attribute("type")
            id_attr = btn.get_attribute("id")
            name_attr = btn.get_attribute("name")
            classes = btn.get_attribute("class")
            print(f"   Button #{i}: text='{text}' | type='{type_attr}' | id='{id_attr}' | class='{classes}'")
    except Exception as e:
        print(f"   ❌ Erro: {e}")
    
    # 3. Checkboxes
    print("\n3️⃣  CHECKBOXES:")
    try:
        checkboxes = driver.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
        for i, chk in enumerate(checkboxes):
            id_attr = chk.get_attribute("id")
            name_attr = chk.get_attribute("name")
            print(f"   Checkbox #{i}: id='{id_attr}' | name='{name_attr}'")
            # Procura label associado
            if id_attr:
                try:
                    label = driver.find_element(By.CSS_SELECTOR, f"label[for='{id_attr}']")
                    print(f"      └─ Label: '{label.text}'")
                except:
                    pass
    except Exception as e:
        print(f"   ❌ Erro: {e}")
    
    # 4. Labels
    print("\n4️⃣  LABELS:")
    try:
        labels = driver.find_elements(By.TAG_NAME, "label")
        for i, lbl in enumerate(labels):
            text = lbl.text
            for_attr = lbl.get_attribute("for")
            print(f"   Label #{i}: for='{for_attr}' | text='{text}'")
    except Exception as e:
        print(f"   ❌ Erro: {e}")
    
    # 5. Formulário
    print("\n5️⃣  FORMS:")
    try:
        forms = driver.find_elements(By.TAG_NAME, "form")
        for i, form in enumerate(forms):
            id_attr = form.get_attribute("id")
            name_attr = form.get_attribute("name")
            onsubmit = form.get_attribute("onsubmit")
            action = form.get_attribute("action")
            print(f"   Form #{i}: id='{id_attr}' | name='{name_attr}' | action='{action}'")
    except Exception as e:
        print(f"   ❌ Erro: {e}")
    
    # 6. Divs com class contendo "form", "error", "success"
    print("\n6️⃣  DIVS COM CLASSES RELEVANTES:")
    try:
        divs = driver.find_elements(By.TAG_NAME, "div")
        relevant_divs = [d for d in divs if any(x in (d.get_attribute("class") or "").lower() 
                         for x in ["form", "error", "success", "alert", "validation"])]
        for i, div in enumerate(relevant_divs[:10]):  # Limitar a 10
            classes = div.get_attribute("class")
            id_attr = div.get_attribute("id")
            print(f"   Div #{i}: id='{id_attr}' | class='{classes}'")
    except Exception as e:
        print(f"   ❌ Erro: {e}")
    
    # 7. Sugestões de seletores
    print("\n7️⃣  SUGESTÕES DE SELETORES XPATH:")
    print("   " + "=" * 70)
    
    # Inspecionar cada tipo de input
    try:
        all_inputs = driver.find_elements(By.TAG_NAME, "input")
        for inp in all_inputs:
            placeholder = inp.get_attribute("placeholder")
            if placeholder:
                # Gerar XPaths possíveis
                if "nome" in placeholder.lower():
                    print(f"\n   ✅ INPUT NOME:")
                    print(f"      • //input[@placeholder='{placeholder}']")
                    print(f"      • //input[contains(@placeholder, 'Nome') or contains(@placeholder, 'nome')]")
                    print(f"      • //input[@placeholder*='Nome']")
                elif "email" in placeholder.lower():
                    print(f"\n   ✅ INPUT EMAIL:")
                    print(f"      • //input[@placeholder='{placeholder}']")
                    print(f"      • //input[contains(@placeholder, 'Email')]")
                elif "telefone" in placeholder.lower() or "phone" in placeholder.lower():
                    print(f"\n   ✅ INPUT TELEFONE:")
                    print(f"      • //input[@placeholder='{placeholder}']")
                    print(f"      • //input[contains(@placeholder, 'Telefone')]")
                elif "cpf" in placeholder.lower():
                    print(f"\n   ✅ INPUT CPF:")
                    print(f"      • //input[@placeholder='{placeholder}']")
                    print(f"      • //input[contains(@placeholder, 'CPF')]")
    except Exception as e:
        print(f"   ❌ Erro: {e}")
    
    print("\n" + "=" * 80)
    
finally:
    print("\n🔚 Fechando navegador...")
    driver.quit()
    print("✅ Diagnóstico concluído!")
