// ============================================
// BARICOIN THEME SYSTEM
// ============================================

class ThemeManager {
    constructor() {
        this.currentTheme = null;
        this.systemPreference = null;
        this.init();
    }

    init() {
        // Get system preference
        this.systemPreference = this.getSystemPreference();

        // Get saved theme or use system preference
        this.currentTheme = this.getSavedTheme() || this.systemPreference;

        // Apply theme immediately (before page render to prevent flash)
        this.applyTheme(this.currentTheme, false);

        // Listen for system preference changes
        this.watchSystemPreference();

        // Listen for storage changes (theme sync across tabs)
        this.watchStorageChanges();

        console.log('Theme Manager initialized:', this.currentTheme);
    }

    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    getSavedTheme() {
        return localStorage.getItem('baricoin-theme');
    }

    saveTheme(theme) {
        localStorage.setItem('baricoin-theme', theme);
        // Also save timestamp for sync
        localStorage.setItem('baricoin-theme-updated', Date.now().toString());
    }

    applyTheme(theme, animate = true) {
        const html = document.documentElement;

        // Add transition class if animating
        if (animate) {
            html.classList.add('theme-transitioning');
        }

        // Remove old theme class
        html.classList.remove('light-theme', 'dark-theme');

        // Add new theme class
        html.classList.add(`${theme}-theme`);

        // Update current theme
        this.currentTheme = theme;

        // Save to localStorage
        this.saveTheme(theme);

        // Update any theme toggle buttons
        this.updateToggleButtons();

        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme }
        }));

        // Remove transition class after animation
        if (animate) {
            setTimeout(() => {
                html.classList.remove('theme-transitioning');
            }, 300);
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme, true);
    }

    setTheme(theme) {
        if (theme === 'light' || theme === 'dark' || theme === 'auto') {
            if (theme === 'auto') {
                this.applyTheme(this.systemPreference, true);
                localStorage.setItem('baricoin-theme-mode', 'auto');
            } else {
                this.applyTheme(theme, true);
                localStorage.setItem('baricoin-theme-mode', 'manual');
            }
        }
    }

    watchSystemPreference() {
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

            darkModeQuery.addEventListener('change', (e) => {
                this.systemPreference = e.matches ? 'dark' : 'light';

                // Only auto-switch if user has set theme to 'auto'
                const themeMode = localStorage.getItem('baricoin-theme-mode');
                if (themeMode === 'auto' || !themeMode) {
                    this.applyTheme(this.systemPreference, true);
                }
            });
        }
    }

    watchStorageChanges() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'baricoin-theme') {
                // Sync theme across tabs
                if (e.newValue && e.newValue !== this.currentTheme) {
                    this.applyTheme(e.newValue, false);
                }
            }
        });
    }

    updateToggleButtons() {
        // Update all theme toggle buttons
        const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
        toggleButtons.forEach(button => {
            const icon = button.querySelector('.theme-icon');
            if (icon) {
                if (this.currentTheme === 'dark') {
                    icon.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    `;
                } else {
                    icon.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    `;
                }
            }
        });

        // Update theme radio buttons in settings
        const themeRadios = document.querySelectorAll('input[name="theme-preference"]');
        themeRadios.forEach(radio => {
            radio.checked = radio.value === this.currentTheme;
        });
    }

    getPreview() {
        // Return theme preview colors for settings page
        return {
            light: {
                background: '#FFFFFF',
                surface: '#F8F9FA',
                text: '#1B1B1B',
                primary: '#A97458'
            },
            dark: {
                background: '#0F172A',
                surface: '#1E293B',
                text: '#F1F5F9',
                primary: '#E8C7A3'
            }
        };
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Initialize theme toggles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to all theme toggle buttons
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            themeManager.toggleTheme();
        });
    });

    // Add handlers for theme radio buttons in settings
    const themeRadios = document.querySelectorAll('input[name="theme-preference"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                themeManager.setTheme(e.target.value);
            }
        });
    });

    // Update initial button states
    themeManager.updateToggleButtons();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = themeManager;
}
