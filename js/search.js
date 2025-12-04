// ============================================
// BARICOIN ADVANCED SEARCH & AUTOCOMPLETE SYSTEM
// ============================================

class SearchManager {
    constructor() {
        this.searchIndex = {
            transactions: [],
            pages: [],
            features: [],
            giftcards: [],
            cryptocurrencies: []
        };
        this.searchHistory = [];
        this.maxHistoryItems = 10;
        this.debounceTimer = null;
        this.debounceDelay = 200; // ms

        this.init();
    }

    init() {
        // Load search history from localStorage
        this.loadSearchHistory();

        // Build search index
        this.buildSearchIndex();

        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();

        console.log('Search Manager initialized');
    }

    // ============================================
    // SEARCH INDEX BUILDING
    // ============================================

    buildSearchIndex() {
        // Index pages
        this.searchIndex.pages = [
            { name: 'Dashboard', url: 'dashboard.html', keywords: ['home', 'overview', 'wallet', 'balance'], icon: '📊', category: 'Pages' },
            { name: 'Transactions', url: 'transactions.html', keywords: ['history', 'transfers', 'payments'], icon: '💳', category: 'Pages' },
            { name: 'Gift Cards', url: 'giftcards.html', keywords: ['sell', 'trade', 'cards'], icon: '🎁', category: 'Pages' },
            { name: 'Crypto', url: 'crypto.html', keywords: ['bitcoin', 'ethereum', 'cryptocurrency'], icon: '₿', category: 'Pages' },
            { name: 'Profile', url: 'profile.html', keywords: ['account', 'settings', 'user'], icon: '👤', category: 'Pages' },
            { name: 'Settings', url: 'settings.html', keywords: ['preferences', 'configuration'], icon: '⚙️', category: 'Pages' },
            { name: 'Referrals', url: 'referral.html', keywords: ['invite', 'earn', 'bonus'], icon: '🎯', category: 'Pages' },
            { name: 'Transfer', url: 'transfer.html', keywords: ['send', 'money'], icon: '💸', category: 'Pages' },
            { name: 'Withdraw', url: 'withdraw.html', keywords: ['cashout', 'bank'], icon: '🏦', category: 'Pages' }
        ];

        // Index features/actions
        this.searchIndex.features = [
            { name: 'Transfer Money', action: 'transfer', url: 'transfer.html', keywords: ['send', 'pay'], icon: '💸', category: 'Actions' },
            { name: 'Buy Airtime', action: 'airtime', url: 'airtime.html', keywords: ['recharge', 'phone', 'credit'], icon: '📱', category: 'Actions' },
            { name: 'Pay Bills', action: 'bills', url: 'cable.html', keywords: ['cable', 'electricity', 'data'], icon: '💡', category: 'Actions' },
            { name: 'Sell Gift Card', action: 'giftcard', url: 'giftcards.html', keywords: ['trade', 'amazon', 'itunes'], icon: '🎁', category: 'Actions' },
            { name: 'Check Rates', action: 'rates', url: 'rate-calculator.html', keywords: ['calculator', 'price'], icon: '💱', category: 'Actions' },
            { name: 'Sell Crypto', action: 'crypto', url: 'crypto.html', keywords: ['bitcoin', 'sell'], icon: '₿', category: 'Actions' }
        ];

        // Index gift cards
        this.searchIndex.giftcards = [
            { name: 'Amazon', keywords: ['amazon', 'shopping'], icon: '🛒', category: 'Gift Cards' },
            { name: 'iTunes', keywords: ['apple', 'music', 'itunes'], icon: '🎵', category: 'Gift Cards' },
            { name: 'Steam', keywords: ['games', 'gaming', 'steam'], icon: '🎮', category: 'Gift Cards' },
            { name: 'Google Play', keywords: ['android', 'apps', 'google'], icon: '📱', category: 'Gift Cards' },
            { name: 'eBay', keywords: ['ebay', 'auction'], icon: '🛍️', category: 'Gift Cards' },
            { name: 'Walmart', keywords: ['walmart', 'shopping'], icon: '🏪', category: 'Gift Cards' },
            { name: 'Xbox', keywords: ['gaming', 'microsoft', 'xbox'], icon: '🎮', category: 'Gift Cards' },
            { name: 'Visa', keywords: ['visa', 'card', 'payment'], icon: '💳', category: 'Gift Cards' }
        ];

        // Index cryptocurrencies
        this.searchIndex.cryptocurrencies = [
            { name: 'Bitcoin', symbol: 'BTC', keywords: ['btc', 'bitcoin', 'crypto'], icon: '₿', category: 'Crypto' },
            { name: 'Ethereum', symbol: 'ETH', keywords: ['eth', 'ethereum', 'ether'], icon: '⟠', category: 'Crypto' },
            { name: 'USDT', symbol: 'USDT', keywords: ['tether', 'usdt', 'stablecoin'], icon: '💵', category: 'Crypto' },
            { name: 'BNB', symbol: 'BNB', keywords: ['binance', 'bnb'], icon: '🔶', category: 'Crypto' },
            { name: 'USDC', symbol: 'USDC', keywords: ['usdc', 'stablecoin', 'circle'], icon: '💵', category: 'Crypto' }
        ];
    }

    // ============================================
    // FUZZY SEARCH ALGORITHM
    // ============================================

    fuzzyMatch(query, target) {
        if (!query || !target) return 0;

        query = query.toLowerCase().trim();
        target = target.toLowerCase();

        // Exact match gets highest score
        if (target === query) return 1000;

        // Starts with query gets high score
        if (target.startsWith(query)) return 900;

        // Contains query gets medium score
        if (target.includes(query)) return 700;

        // Fuzzy matching with scoring
        let score = 0;
        let queryIndex = 0;
        let consecutiveMatches = 0;

        for (let i = 0; i < target.length && queryIndex < query.length; i++) {
            if (target[i] === query[queryIndex]) {
                // Earlier matches score higher
                score += (100 - i) + (consecutiveMatches * 10);
                queryIndex++;
                consecutiveMatches++;
            } else {
                consecutiveMatches = 0;
            }
        }

        // Only return score if all query characters were found
        return queryIndex === query.length ? score : 0;
    }

    // ============================================
    // SEARCH EXECUTION
    // ============================================

    search(query, options = {}) {
        if (!query || query.trim().length === 0) {
            return this.getRecentSearches();
        }

        const {
            limit = 10,
            categories = ['transactions', 'pages', 'features', 'giftcards', 'cryptocurrencies']
        } = options;

        const results = {
            query: query,
            categories: {}
        };

        // Search each category
        categories.forEach(category => {
            const items = this.searchIndex[category] || [];
            const matches = [];

            items.forEach(item => {
                let maxScore = 0;

                // Check name
                const nameScore = this.fuzzyMatch(query, item.name);
                maxScore = Math.max(maxScore, nameScore);

                // Check keywords
                if (item.keywords) {
                    item.keywords.forEach(keyword => {
                        const keywordScore = this.fuzzyMatch(query, keyword);
                        maxScore = Math.max(maxScore, keywordScore);
                    });
                }

                // Check symbol (for crypto)
                if (item.symbol) {
                    const symbolScore = this.fuzzyMatch(query, item.symbol);
                    maxScore = Math.max(maxScore, symbolScore);
                }

                if (maxScore > 0) {
                    matches.push({
                        ...item,
                        score: maxScore,
                        matchText: this.highlightMatch(item.name, query)
                    });
                }
            });

            // Sort by score and limit results
            matches.sort((a, b) => b.score - a.score);
            results.categories[category] = matches.slice(0, limit);
        });

        return results;
    }

    // ============================================
    // TEXT HIGHLIGHTING
    // ============================================

    highlightMatch(text, query) {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // ============================================
    // SEARCH HISTORY
    // ============================================

    loadSearchHistory() {
        try {
            const history = localStorage.getItem('baricoin-search-history');
            this.searchHistory = history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('Error loading search history:', error);
            this.searchHistory = [];
        }
    }

    saveSearchHistory() {
        try {
            localStorage.setItem('baricoin-search-history', JSON.stringify(this.searchHistory));
        } catch (error) {
            console.error('Error saving search history:', error);
        }
    }

    addToHistory(query) {
        if (!query || query.trim().length === 0) return;

        // Remove if it already exists
        this.searchHistory = this.searchHistory.filter(item => item !== query);

        // Add to beginning
        this.searchHistory.unshift(query);

        // Limit to max items
        if (this.searchHistory.length > this.maxHistoryItems) {
            this.searchHistory.pop();
        }

        this.saveSearchHistory();
    }

    getRecentSearches() {
        return {
            query: '',
            categories: {
                recent: this.searchHistory.map(query => ({
                    name: query,
                    icon: '🕒',
                    category: 'Recent',
                    isHistory: true
                }))
            }
        };
    }

    clearHistory() {
        this.searchHistory = [];
        this.saveSearchHistory();
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearchModal();
            }

            // Escape to close search
            if (e.key === 'Escape') {
                this.closeSearchModal();
            }
        });
    }

    // ============================================
    // SEARCH MODAL CONTROL
    // ============================================

    openSearchModal() {
        const modal = document.getElementById('globalSearchModal');
        if (modal) {
            modal.classList.add('active');
            const input = document.getElementById('globalSearchInput');
            if (input) {
                input.focus();
                input.value = '';
                // Show recent searches
                this.displayResults(this.getRecentSearches());
            }
        }

        // Dispatch event
        window.dispatchEvent(new CustomEvent('searchModalOpened'));
    }

    closeSearchModal() {
        const modal = document.getElementById('globalSearchModal');
        if (modal) {
            modal.classList.remove('active');
        }

        // Dispatch event
        window.dispatchEvent(new CustomEvent('searchModalClosed'));
    }

    // ============================================
    // RESULTS DISPLAY
    // ============================================

    displayResults(results) {
        const container = document.getElementById('searchResults');
        if (!container) return;

        // Clear previous results
        container.innerHTML = '';

        // Display each category
        Object.entries(results.categories).forEach(([categoryName, items]) => {
            if (items.length === 0) return;

            const categorySection = document.createElement('div');
            categorySection.className = 'search-category';

            // Category header
            const header = document.createElement('div');
            header.className = 'search-category-header';
            header.textContent = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
            categorySection.appendChild(header);

            // Results
            const resultsDiv = document.createElement('div');
            resultsDiv.className = 'search-category-results';

            items.forEach((item, index) => {
                const resultItem = this.createResultItem(item, index);
                resultsDiv.appendChild(resultItem);
            });

            categorySection.appendChild(resultsDiv);
            container.appendChild(categorySection);
        });

        // Show empty state if no results
        if (Object.values(results.categories).every(items => items.length === 0)) {
            container.innerHTML = `
                <div class="search-empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No results found</h3>
                    <p>Try searching for transactions, pages, or features</p>
                </div>
            `;
        }
    }

    createResultItem(item, index) {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.setAttribute('data-index', index);

        const icon = document.createElement('span');
        icon.className = 'search-result-icon';
        icon.textContent = item.icon || '📄';

        const content = document.createElement('div');
        content.className = 'search-result-content';

        const name = document.createElement('div');
        name.className = 'search-result-name';
        name.innerHTML = item.matchText || item.name;

        const category = document.createElement('div');
        category.className = 'search-result-category';
        category.textContent = item.category;

        content.appendChild(name);
        content.appendChild(category);

        div.appendChild(icon);
        div.appendChild(content);

        // Add click handler
        div.addEventListener('click', () => {
            this.selectResult(item);
        });

        return div;
    }

    selectResult(item) {
        // Add to history if not a history item
        if (!item.isHistory) {
            this.addToHistory(item.name);
        }

        // Navigate to URL if available
        if (item.url) {
            window.location.href = item.url;
        }

        // Close modal
        this.closeSearchModal();
    }

    // ============================================
    // DEBOUNCED SEARCH
    // ============================================

    debouncedSearch(query, callback) {
        clearTimeout(this.debounceTimer);

        this.debounceTimer = setTimeout(() => {
            const results = this.search(query);
            if (callback) callback(results);
        }, this.debounceDelay);
    }
}

// Initialize search manager
const searchManager = new SearchManager();

// Setup search input listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            searchManager.debouncedSearch(query, (results) => {
                searchManager.displayResults(results);
            });
        });

        // Handle Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                // Select first result
                const firstResult = document.querySelector('.search-result-item');
                if (firstResult) {
                    firstResult.click();
                }
            }
        });
    }

    // Setup modal close button
    const closeBtn = document.getElementById('closeSearchModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            searchManager.closeSearchModal();
        });
    }

    // Close on backdrop click
    const modal = document.getElementById('globalSearchModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                searchManager.closeSearchModal();
            }
        });
    }

    // Trigger search on existing dashboard search input
    const dashboardSearch = document.getElementById('dashboardSearch');
    if (dashboardSearch) {
        dashboardSearch.addEventListener('click', () => {
            searchManager.openSearchModal();
        });

        dashboardSearch.addEventListener('focus', () => {
            searchManager.openSearchModal();
        });
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = searchManager;
}
