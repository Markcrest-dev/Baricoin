// ============================================
// BARICOIN REAL-TIME RATE UPDATE SYSTEM
// ============================================

class RateManager {
    constructor() {
        this.rates = {};
        this.baseRates = {
            // Crypto to USD
            'BTC/USD': 65000,
            'ETH/USD': 3500,
            'USDT/USD': 1.00,
            'BNB/USD': 450,
            'SOL/USD': 120,
            'XRP/USD': 0.65,
            'ADA/USD': 0.55,
            'DOGE/USD': 0.08,

            // USD to NGN
            'USD/NGN': 1450,

            // Gift card rates (as percentage of face value)
            'AMAZON/NGN': 0.85,
            'ITUNES/NGN': 0.80,
            'STEAM/NGN': 0.82,
            'GOOGLE_PLAY/NGN': 0.78
        };

        this.volatility = {
            'BTC/USD': 0.003,   // 0.3% fluctuation
            'ETH/USD': 0.004,   // 0.4% fluctuation
            'USDT/USD': 0.0001, // Very stable
            'BNB/USD': 0.005,
            'SOL/USD': 0.006,
            'XRP/USD': 0.008,
            'ADA/USD': 0.008,
            'DOGE/USD': 0.01,
            'USD/NGN': 0.001,   // 0.1% fluctuation
            'AMAZON/NGN': 0.002,
            'ITUNES/NGN': 0.002,
            'STEAM/NGN': 0.002,
            'GOOGLE_PLAY/NGN': 0.002
        };

        this.updateInterval = 5000; // 5 seconds
        this.intervalId = null;

        this.init();
    }

    init() {
        // Load rates from localStorage or use base rates
        this.loadRates();

        // Start simulation
        this.startSimulation();

        console.log('Rate Manager initialized with', Object.keys(this.rates).length, 'pairs');
    }

    // ============================================
    // RATE SIMULATION
    // ============================================

    loadRates() {
        const savedRates = localStorage.getItem('baricoin-rates');
        if (savedRates) {
            try {
                this.rates = JSON.parse(savedRates);
                console.log('Loaded rates from localStorage');
            } catch (e) {
                this.rates = { ...this.baseRates };
            }
        } else {
            this.rates = { ...this.baseRates };
        }
    }

    saveRates() {
        localStorage.setItem('baricoin-rates', JSON.stringify(this.rates));
    }

    startSimulation() {
        // Initial update
        this.updateRates();

        // Update every interval
        this.intervalId = setInterval(() => {
            this.updateRates();
        }, this.updateInterval);
    }

    stopSimulation() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    updateRates() {
        const updates = {};

        for (const pair in this.rates) {
            const currentRate = this.rates[pair];
            const volatility = this.volatility[pair] || 0.002;

            // Random walk algorithm
            const change = currentRate * volatility * (Math.random() - 0.5) * 2;
            const newRate = currentRate + change;

            // Prevent negative rates and extreme deviations
            const baseRate = this.baseRates[pair];
            const minRate = baseRate * 0.8;
            const maxRate = baseRate * 1.2;

            this.rates[pair] = Math.max(minRate, Math.min(maxRate, newRate));

            // Calculate percentage change
            const percentChange = ((this.rates[pair] - currentRate) / currentRate) * 100;

            updates[pair] = {
                price: this.rates[pair],
                change: percentChange,
                direction: percentChange >= 0 ? 'up' : 'down'
            };
        }

        // Save to localStorage
        this.saveRates();

        // Dispatch event
        this.broadcastUpdate(updates);
    }

    broadcastUpdate(updates) {
        const event = new CustomEvent('ratesUpdated', {
            detail: {
                rates: updates,
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(event);
    }

    // ============================================
    // PUBLIC API
    // ============================================

    getRate(pair) {
        return this.rates[pair] || 0;
    }

    getCryptoRate(crypto, currency = 'USD') {
        const pair = `${crypto}/${currency}`;
        return this.getRate(pair);
    }

    convertCrypto(amount, fromCrypto, toCurrency) {
        const rate = this.getCryptoRate(fromCrypto, toCurrency);
        return amount * rate;
    }

    convertCurrency(amount, fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) return amount;

        const pair = `${fromCurrency}/${toCurrency}`;
        const rate = this.getRate(pair);

        if (rate) {
            return amount * rate;
        }

        // Try reverse pair
        const reversePair = `${toCurrency}/${fromCurrency}`;
        const reverseRate = this.getRate(reversePair);

        if (reverseRate) {
            return amount / reverseRate;
        }

        return amount;
    }

    getAllRates() {
        return { ...this.rates };
    }

    // Format price for display
    formatPrice(price, decimals = 2) {
        if (price >= 1000) {
            return price.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
        }
        return price.toFixed(decimals);
    }

    // Format change percentage
    formatChange(change) {
        const sign = change >= 0 ? '+' : '';
        return `${sign}${change.toFixed(2)}%`;
    }
}

// ============================================
// LIVE TICKER COMPONENT
// ============================================

class LiveTicker {
    constructor(rateManager) {
        this.rateManager = rateManager;
        this.tickerElement = null;
        this.trackedPairs = ['BTC/USD', 'ETH/USD', 'BNB/USD', 'USD/NGN'];

        this.init();
    }

    init() {
        this.tickerElement = document.getElementById('liveTicker');
        if (!this.tickerElement) return;

        // Listen for rate updates
        window.addEventListener('ratesUpdated', (e) => {
            this.updateTicker(e.detail.rates);
        });

        // Initial render
        this.renderTicker();
    }

    renderTicker() {
        if (!this.tickerElement) return;

        const tickerHTML = this.trackedPairs.map(pair => {
            const rate = this.rateManager.getRate(pair);
            const [base, quote] = pair.split('/');

            return `
                <div class="ticker-item" data-pair="${pair}">
                    <span class="ticker-symbol">${base}/${quote}</span>
                    <span class="ticker-price">${this.rateManager.formatPrice(rate)}</span>
                    <span class="ticker-change">--</span>
                </div>
            `;
        }).join('');

        this.tickerElement.innerHTML = `<div class="ticker-track">${tickerHTML}</div>`;
    }

    updateTicker(updates) {
        if (!this.tickerElement) return;

        this.trackedPairs.forEach(pair => {
            const update = updates[pair];
            if (!update) return;

            const item = this.tickerElement.querySelector(`[data-pair="${pair}"]`);
            if (!item) return;

            const priceElement = item.querySelector('.ticker-price');
            const changeElement = item.querySelector('.ticker-change');

            // Update price
            priceElement.textContent = this.rateManager.formatPrice(update.price);

            // Update change
            changeElement.textContent = this.rateManager.formatChange(update.change);
            changeElement.className = `ticker-change ${update.direction}`;

            // Flash animation
            item.classList.remove('flash-up', 'flash-down');
            void item.offsetWidth; // Force reflow
            item.classList.add(`flash-${update.direction}`);
        });
    }
}

// ============================================
// RATE DISPLAY COMPONENT
// ============================================

class RateDisplay {
    constructor(rateManager) {
        this.rateManager = rateManager;
        this.init();
    }

    init() {
        // Find all elements with data-rate attribute
        this.updateDisplayElements();

        // Listen for rate updates
        window.addEventListener('ratesUpdated', () => {
            this.updateDisplayElements();
        });
    }

    updateDisplayElements() {
        const elements = document.querySelectorAll('[data-rate]');

        elements.forEach(element => {
            const pair = element.getAttribute('data-rate');
            const format = element.getAttribute('data-rate-format') || 'price';
            const rate = this.rateManager.getRate(pair);

            if (format === 'price') {
                element.textContent = this.rateManager.formatPrice(rate);
            } else if (format === 'full') {
                const [base, quote] = pair.split('/');
                element.textContent = `1 ${base} = ${this.rateManager.formatPrice(rate)} ${quote}`;
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Create global rate manager instance
const rateManager = new RateManager();

// Initialize components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRateComponents);
} else {
    initializeRateComponents();
}

function initializeRateComponents() {
    // Initialize live ticker if element exists
    if (document.getElementById('liveTicker')) {
        const liveTicker = new LiveTicker(rateManager);
    }

    // Initialize rate display
    const rateDisplay = new RateDisplay(rateManager);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { rateManager, RateManager, LiveTicker, RateDisplay };
}
