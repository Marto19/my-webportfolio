import { translations } from './translations.js';

let currentLang = 'en';

export function initializeLanguageSwitcher() {
    // Create language switcher button
    const switcher = document.createElement('button');
    switcher.className = 'lang-switch';
    switcher.textContent = 'BG';
    switcher.setAttribute('title', 'Switch Language / Смени езика');
    
    // Add it to the navigation
    const nav = document.querySelector('.nav');
    nav.appendChild(switcher);

    // Add event listener
    switcher.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'bg' : 'en';
        switcher.textContent = currentLang === 'en' ? 'BG' : 'EN';
        updateContent();
        // Dispatch language change event
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: currentLang } 
        }));
    });
}

function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
}
