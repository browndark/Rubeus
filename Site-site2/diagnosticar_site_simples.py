#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para diagnóstico rápido da estrutura do site
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import time

def diagnosticar_site():
    """Diagnostica a estrutura do site"""
    try:
        options = webdriver.ChromeOptions()
        options.add_argument('--start-maximized')
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        
        print("[✓] Acessando site...")
        driver.get("https://qualidade.apprbs.com.br/site")
        time.sleep(3)  # Esperar carregamento
        
        print(f"[✓] Título da página: {driver.title}")
        print(f"[✓] URL atual: {driver.current_url}")
        print(f"[✓] Tamanho da página: {len(driver.page_source)} caracteres")
        
        # Procurar por formulários
        forms = driver.find_elements(By.TAG_NAME, "form")
        print(f"\n[✓] Formulários encontrados: {len(forms)}")
        
        # Procurar todos os inputs
        inputs = driver.find_elements(By.TAG_NAME, "input")
        print(f"[✓] Campos input encontrados: {len(inputs)}")
        
        for i, inp in enumerate(inputs):
            nome = inp.get_attribute("name")
            tipo = inp.get_attribute("type")
            id_attr = inp.get_attribute("id")
            placeholder = inp.get_attribute("placeholder")
            print(f"  [{i+1}] Name: {nome} | Type: {tipo} | ID: {id_attr} | Placeholder: {placeholder}")
        
        # Procurar labels
        labels = driver.find_elements(By.TAG_NAME, "label")
        print(f"\n[✓] Labels encontrados: {len(labels)}")
        for label in labels:
            print(f"  - {label.text}")
        
        # Procurar botões
        botoes = driver.find_elements(By.TAG_NAME, "button")
        print(f"\n[✓] Botões encontrados: {len(botoes)}")
        for botao in botoes:
            print(f"  - {botao.text} (type: {botao.get_attribute('type')})")
        
        # Procurar por headers
        h1s = driver.find_elements(By.TAG_NAME, "h1")
        print(f"\n[✓] H1 encontrados: {len(h1s)}")
        for h1 in h1s:
            print(f"  - {h1.text}")
        
        # Verificar DOCTYPE
        doctype = driver.execute_script("return document.doctype ? document.doctype.name : 'NOT FOUND'")
        print(f"\n[✓] DOCTYPE: {doctype}")
        
        # Screenshot da página
        print("\n[✓] Capturando screenshot...")
        driver.save_screenshot("site_screenshot.png")
        print("[✓] Screenshot salvo: site_screenshot.png")
        
        driver.quit()
        print("\n[✓] Diagnóstico concluído!")
        
    except Exception as e:
        print(f"[✗] Erro: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    diagnosticar_site()
