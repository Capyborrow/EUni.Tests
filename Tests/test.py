from playwright.sync_api import sync_playwright
from pages.sign_up import SignUpPage

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # Відкриває браузер у видимому режимі
    page = browser.new_page()

    signup_page = SignUpPage(page)
    signup_page.navigate()

    input("Натисни Enter, щоб закрити браузер...")  # Чекає на введення перед закриттям
    browser.close()
