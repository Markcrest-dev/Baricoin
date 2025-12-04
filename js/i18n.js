// ============================================
// BARICOIN INTERNATIONALIZATION (i18n) SYSTEM
// ============================================

class I18nManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.supportedLanguages = {
            'en': { name: 'English', flag: '🇬🇧', direction: 'ltr' },
            'fr': { name: 'Français', flag: '🇫🇷', direction: 'ltr' },
            'es': { name: 'Español', flag: '🇪🇸', direction: 'ltr' },
            'yo': { name: 'Yorùbá', flag: '🇳🇬', direction: 'ltr' }
        };
        this.init();
    }

    async init() {
        // Get saved language or detect browser language
        this.currentLanguage = this.getSavedLanguage() || this.detectBrowserLanguage();

        // Load the language translations
        await this.loadLanguage(this.currentLanguage);

        // Apply translations to page
        this.translatePage();

        // Listen for storage changes (language sync across tabs)
        this.watchStorageChanges();

        console.log('i18n Manager initialized:', this.currentLanguage);
    }

    getSavedLanguage() {
        return localStorage.getItem('baricoin-language');
    }

    saveLanguage(lang) {
        localStorage.setItem('baricoin-language', lang);
        localStorage.setItem('baricoin-language-updated', Date.now().toString());
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0]; // Get 'en' from 'en-US'

        // Return if supported, otherwise default to English
        return this.supportedLanguages[langCode] ? langCode : 'en';
    }

    async loadLanguage(lang) {
        try {
            // Check if already loaded
            if (this.translations[lang]) {
                return this.translations[lang];
            }

            // Load from JSON file
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json`);
            }

            const data = await response.json();
            this.translations[lang] = data;
            return data;
        } catch (error) {
            console.error(`Error loading language ${lang}:`, error);

            // Fallback to English if not already English
            if (lang !== 'en') {
                console.log('Falling back to English');
                return await this.loadLanguage('en');
            }

            return {};
        }
    }

    translate(key, lang = this.currentLanguage) {
        const translation = this.translations[lang];
        if (!translation) {
            console.warn(`Translations for ${lang} not loaded`);
            return key;
        }

        // Support nested keys with dot notation: "common.welcome"
        const keys = key.split('.');
        let value = translation;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value;
    }

    async setLanguage(lang) {
        if (!this.supportedLanguages[lang]) {
            console.error(`Unsupported language: ${lang}`);
            return;
        }

        // Load language if not already loaded
        await this.loadLanguage(lang);

        // Update current language
        this.currentLanguage = lang;

        // Save to localStorage
        this.saveLanguage(lang);

        // Apply text direction
        document.documentElement.setAttribute('dir', this.supportedLanguages[lang].direction);
        document.documentElement.setAttribute('lang', lang);

        // Translate the page
        this.translatePage();

        // Update language selector buttons
        this.updateLanguageSelectors();

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    translatePage() {
        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);

            // Check if we should update innerHTML or placeholder
            if (element.hasAttribute('data-i18n-placeholder')) {
                element.placeholder = translation;
            } else if (element.hasAttribute('data-i18n-title')) {
                element.title = translation;
            } else {
                element.textContent = translation;
            }
        });
    }

    updateLanguageSelectors() {
        // Update all language selector dropdowns
        const selectors = document.querySelectorAll('[data-language-selector]');

        selectors.forEach(selector => {
            const buttons = selector.querySelectorAll('[data-lang]');
            buttons.forEach(button => {
                const lang = button.getAttribute('data-lang');
                if (lang === this.currentLanguage) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        });

        // Update language dropdown current text
        const currentLangElements = document.querySelectorAll('.current-language');
        currentLangElements.forEach(el => {
            const langInfo = this.supportedLanguages[this.currentLanguage];
            el.innerHTML = `${langInfo.flag} ${langInfo.name}`;
        });
    }

    watchStorageChanges() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'baricoin-language') {
                // Sync language across tabs
                if (e.newValue && e.newValue !== this.currentLanguage) {
                    this.setLanguage(e.newValue);
                }
            }
        });
    }

    // Helper method to get formatted date in current language
    formatDate(date, options = {}) {
        const locale = this.getLocaleCode();
        return new Intl.DateTimeFormat(locale, options).format(date);
    }

    // Helper method to format numbers/currency in current language
    formatNumber(number, options = {}) {
        const locale = this.getLocaleCode();
        return new Intl.NumberFormat(locale, options).format(number);
    }

    formatCurrency(amount, currency = 'NGN') {
        const locale = this.getLocaleCode();
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    getLocaleCode() {
        // Map language codes to full locale codes
        const localeMap = {
            'en': 'en-US',
            'fr': 'fr-FR',
            'es': 'es-ES',
            'yo': 'yo-NG'
        };
        return localeMap[this.currentLanguage] || 'en-US';
    }
}

// Initialize i18n manager
const i18n = new I18nManager();

// Initialize language selector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to language selector buttons
    const languageButtons = document.querySelectorAll('[data-lang]');
    languageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            i18n.setLanguage(lang);
        });
    });

    // Add change handler for settings page language selector dropdown
    const languageSelect = document.getElementById('language-selector');
    if (languageSelect) {
        // Set initial value
        languageSelect.value = i18n.currentLanguage;

        // Add change listener
        languageSelect.addEventListener('change', (e) => {
            i18n.setLanguage(e.target.value);
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdowns = document.querySelectorAll('.language-dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
