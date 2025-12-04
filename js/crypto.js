// ============================================
// CRYPTO SELL FUNCTIONALITY
// ============================================

const CRYPTO_RATES = {
    btc: { name: 'Bitcoin', rate: 50000000, min: 50 },  // 1 BTC = 50M Naira
    eth: { name: 'Ethereum', rate: 3500000, min: 20 },  // 1 ETH = 3.5M Naira
    usdt: { name: 'Tether', rate: 1450, min: 10 },      // 1 USDT = 1450 Naira
    bnb: { name: 'Binance Coin', rate: 550000, min: 20 },
    usdc: { name: 'USD Coin', rate: 1450, min: 10 }
};

let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    handleURLParameters();
    setupEventListeners();
});

function loadUserData() {
    const stored = localStorage.getItem('baricoinUser');
    if (stored) {
        try {
            currentUser = JSON.parse(stored);
            const userInitialEl = document.getElementById('userInitial');
            if (userInitialEl) {
                const name = currentUser.name || currentUser.email.split('@')[0];
                userInitialEl.textContent = name.charAt(0).toUpperCase();
            }
        } catch (e) {
            console.error('Error loading user data:', e);
        }
    }
}

function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const action = urlParams.get('action');

    if (token && action === 'sell') {
        // Pre-select the coin
        const coinSelect = document.getElementById('coin');
        if (coinSelect) {
            coinSelect.value = token.toLowerCase();

            // Trigger change event to update calculations
            const event = new Event('change');
            coinSelect.dispatchEvent(event);
        }
    }
}

function setupEventListeners() {
    const coinSelect = document.getElementById('coin');
    const amountInput = document.getElementById('amount');
    const form = document.querySelector('.service-form');

    if (coinSelect) {
        coinSelect.addEventListener('change', updateCalculation);
    }

    if (amountInput) {
        amountInput.addEventListener('input', updateCalculation);
    }

    if (form) {
        form.addEventListener('submit', handleSellSubmit);
    }
}

function updateCalculation() {
    const coin = document.getElementById('coin').value;
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const youGetEl = document.getElementById('youGet');

    if (!coin || !amount) {
        youGetEl.textContent = '₦ 0.00';
        return;
    }

    const rate = CRYPTO_RATES[coin]?.rate || 0;
    const nairaAmount = amount * rate;

    youGetEl.textContent = '₦ ' + nairaAmount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function handleSellSubmit(e) {
    e.preventDefault();

    const coin = document.getElementById('coin').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!coin) {
        alert('Please select a cryptocurrency');
        return;
    }

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    const cryptoData = CRYPTO_RATES[coin];
    const minAmount = cryptoData?.min || 10;

    if (amount < minAmount) {
        alert(`Minimum sell amount is $${minAmount} USD`);
        return;
    }

    const nairaAmount = amount * (cryptoData?.rate || 0);

    // Show confirmation
    const confirmed = confirm(
        `Sell ${amount} USD worth of ${cryptoData.name}?\n\n` +
        `You will receive: ₦${nairaAmount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n` +
        `Click OK to proceed.`
    );

    if (!confirmed) return;

    // Process sale
    processSale(coin, amount, nairaAmount);
}

function processSale(coin, amount, nairaAmount) {
    // Update user balance
    if (currentUser) {
        currentUser.balance = (currentUser.balance || 0) + nairaAmount;
        localStorage.setItem('baricoinUser', JSON.stringify(currentUser));
    }

    // Save to transaction history (if you have that feature)
    const transaction = {
        id: Date.now(),
        type: 'crypto_sell',
        coin: coin.toUpperCase(),
        amount: amount,
        nairaAmount: nairaAmount,
        timestamp: new Date(),
        status: 'completed'
    };

    // Show success message
    alert(
        `✅ Sale Successful!\n\n` +
        `Sold: ${amount} USD worth of ${CRYPTO_RATES[coin].name}\n` +
        `Received: ₦${nairaAmount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n` +
        `Your wallet has been credited.`
    );

    // Reset form
    document.querySelector('.service-form').reset();
    document.getElementById('youGet').textContent = '₦ 0.00';

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

console.log('Crypto sell page loaded');
