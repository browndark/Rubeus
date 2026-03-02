#!/usr/bin/env python
# -*- coding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import time

options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get('https://qualidade.apprbs.com.br/site')

try:
    # Esperar pelo form álogo
    WebDriverWait(driver, 15).until(EC.presence_of_all_elements_located((By.NAME, "pessoa.nome")))
    time.sleep(2)
    
    # Verificar o corpo da página
    page_text = driver.find_element(By.TAG_NAME, 'body').text
    lines = [l for l in page_text.split('\n') if l.strip()]
    print(f"Texto da página encontrado ({len(lines)} linhas com conteúdo):")
    for i, line in enumerate(lines[:20]):
        print(f"  {line}")
    
    # Verificar visibilidade dos botões
    buttons = driver.find_elements(By.TAG_NAME, 'button')
    print(f"\nTotal de botões: {len(buttons)}")
    print(f"Visibilidade dos botões:")
    for i, btn in enumerate(buttons):
        is_displayed = btn.is_displayed()
        print(f"  Button {i}: displayed={is_displayed} type='{btn.get_attribute('type')}' text='{btn.text}'")
    
except Exception as e:
    import traceback
    print(f"Erro: {e}")
    traceback.print_exc()
finally:
    driver.quit()
