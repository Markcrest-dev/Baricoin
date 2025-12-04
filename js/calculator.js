// ============================================
// ENHANCED RATE CALCULATOR FUNCTIONALITY
// ============================================

let currentTab = 'crypto';
let favoritePairs = [];
let rateChart = null;
let updateInterval = null;

// Rate data (in production, this would come from an API)
const rates = {
    bitcoin: { rate: 1750, change: 2.5, name: 'Bitcoin (BTC)' },
    ethereum: { rate: 580, change: -1.2, name: 'Ethereum (ETH)' },
    usdt: { rate: 1620, change: 0.5, name: 'USDT (TRC20)' },
    usdc: { rate: 1615, change: 0.3, name: 'USDC' },
    litecoin: { rate: 150, change: 3.1, name: 'Litecoin (LTC)' },
    bnb: { rate: 685, change: 1.8, name: 'BNB' },
    doge: { rate: 0.25, change: -0.5, name: 'Dogecoin (DOGE)' },
    xrp: { rate: 3.2, change: 4.2, name: 'XRP' },
    itunes: { rate: 800, change: 0, name: 'iTunes' },
    amazon: { rate: 750, change: 0, name: 'Amazon' },
    steam: { rate: 680, change: 0, name: 'Steam' },
    'google-play': { rate: 720, change: 0, name: 'Google Play' },
    ebay: { rate: 700, change: 0, name: 'eBay' },
    walmart: { rate: 690, change: 0, name: 'Walmart' },
    visa: { rate: 770, change: 0, name: 'Visa' },
    amex: { rate: 760, change: 0, name: 'American Express' }
};

document.addEventListener('DOMContentLoaded', () => {
    // Load favorites
    loadFavorites();

    // Set up event listeners
    setupEventListeners();

    // Initial calculation
    calculateRate();

    // Populate comparison table
    populateComparisonTable();

    // Initialize chart
    initializeChart();

    // Start auto-update (every 5 minutes)
    startAutoUpdate();
});

// Setup event listeners
function setupEventListeners() {
    // Tab switching
    const tabs = document.querySelectorAll('.calculator-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Switch tab
            currentTab = tab.getAttribute('data-tab');
            switchAssetType(currentTab);
        });
    });

    // Asset selection
    const assetSelect = document.getElementById('assetSelect');
    if (assetSelect) {
        assetSelect.addEventListener('change', () => {
            calculateRate();
            updateChart();
        });
    }

    // Amount input
    const amountInput = document.getElementById('amountInput');
    if (amountInput) {
        amountInput.addEventListener('input', calculateRate);
    }

    // Favorite button
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', toggleFavorite);
    }

    // Swap button
    const swapBtn = document.getElementById('swapBtn');
    if (swapBtn) {
        swapBtn.addEventListener('click', handleSwap);
    }

    // Set alert button
    const setAlertBtn = document.getElementById('setAlertBtn');
    if (setAlertBtn) {
        setAlertBtn.addEventListener('click', openAlertModal);
    }

    // Alert modal buttons
    const cancelAlertBtn = document.getElementById('cancelAlertBtn');
    const saveAlertBtn = document.getElementById('saveAlertBtn');

    if (cancelAlertBtn) {
        cancelAlertBtn.addEventListener('click', () => hideModal('rateAlertModal'));
    }

    if (saveAlertBtn) {
        saveAlertBtn.addEventListener('click', saveRateAlert);
    }

    // Chart period buttons
    const periodBtns = document.querySelectorAll('.chart-period-btn');
    periodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            periodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateChart(btn.getAttribute('data-period'));
        });
    });
}

// Switch asset type
function switchAssetType(type) {
    const cryptoOptions = document.getElementById('cryptoOptions');
    const giftcardOptions = document.getElementById('giftcardOptions');

    if (type === 'crypto') {
        cryptoOptions.style.display = 'block';
        giftcardOptions.style.display = 'none';
        document.getElementById('assetSelect').value = 'bitcoin';
    } else {
        cryptoOptions.style.display = 'none';
        giftcardOptions.style.display = 'block';
        document.getElementById('assetSelect').value = 'itunes';
    }

    calculateRate();
    updateChart();
}

// Calculate rate
function calculateRate() {
    const assetSelect = document.getElementById('assetSelect');
    const amountInput = document.getElementById('amountInput');
    const resultAmount = document.getElementById('resultAmount');
    const currentRateEl = document.getElementById('currentRate');
    const rateChangeEl = document.getElementById('rateChange');

    const asset = assetSelect.value;
    const amount = parseFloat(amountInput.value) || 0;
    const rateData = rates[asset];

    if (!rateData) return;

    const total = amount * rateData.rate;
    resultAmount.textContent = `₦ ${total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    currentRateEl.textContent = `₦${rateData.rate.toLocaleString('en-NG')}/USD`;

    // Update rate change
    const change = rateData.change;
    rateChangeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
    rateChangeEl.className = `rate-change ${change >= 0 ? 'positive' : 'negative'}`;

    // Update favorite button state
    updateFavoriteButton(asset);
}

// Toggle favorite
function toggleFavorite() {
    const asset = document.getElementById('assetSelect').value;
    const index = favoritePairs.indexOf(asset);

    if (index > -1) {
        // Remove from favorites
        favoritePairs.splice(index, 1);
    } else {
        // Add to favorites
        favoritePairs.push(asset);
    }

    // Save to localStorage
    localStorage.setItem('baricoinFavoritePairs', JSON.stringify(favoritePairs));

    // Update UI
    updateFavoriteButton(asset);
    loadFavorites();
}

// Update favorite button state
function updateFavoriteButton(asset) {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const isFavorite = favoritePairs.includes(asset);

    if (isFavorite) {
        favoriteBtn.classList.add('active');
        favoriteBtn.querySelector('svg').setAttribute('fill', 'currentColor');
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.querySelector('svg').setAttribute('fill', 'none');
    }
}

// Load favorites
function loadFavorites() {
    favoritePairs = JSON.parse(localStorage.getItem('baricoinFavoritePairs') || '[]');
    const favoritesSection = document.getElementById('favoritesSection');
    const favoritesGrid = document.getElementById('favoritesGrid');

    if (favoritePairs.length === 0) {
        favoritesSection.style.display = 'none';
        return;
    }

    favoritesSection.style.display = 'block';
    favoritesGrid.innerHTML = favoritePairs.map(asset => {
        const rateData = rates[asset];
        if (!rateData) return '';

        return `
            <div class="favorite-card" onclick="selectFavorite('${asset}')">
                <div class="favorite-header">
                    <h5>${rateData.name}</h5>
                    <button class="remove-favorite" onclick="event.stopPropagation(); removeFavorite('${asset}')" title="Remove">×</button>
                </div>
                <div class="favorite-rate">₦${rateData.rate.toLocaleString('en-NG')}</div>
                <div class="favorite-change ${rateData.change >= 0 ? 'positive' : 'negative'}">${rateData.change >= 0 ? '+' : ''}${rateData.change.toFixed(1)}%</div>
            </div>
        `;
    }).join('');
}

// Select favorite
function selectFavorite(asset) {
    document.getElementById('assetSelect').value = asset;

    // Switch tab if needed
    const assetData = rates[asset];
    if (asset.startsWith('bitcoin') || asset.startsWith('ethereum') || asset === 'usdt' || asset === 'usdc' || asset === 'litecoin' || asset === 'bnb' || asset === 'doge' || asset === 'xrp') {
        if (currentTab !== 'crypto') {
            document.querySelector('[data-tab="crypto"]').click();
        }
    } else {
        if (currentTab !== 'giftcard') {
            document.querySelector('[data-tab="giftcard"]').click();
        }
    }

    calculateRate();
    updateChart();

    // Scroll to calculator
    document.querySelector('.calculator-widget').scrollIntoView({ behavior: 'smooth' });
}

// Remove favorite
function removeFavorite(asset) {
    const index = favoritePairs.indexOf(asset);
    if (index > -1) {
        favoritePairs.splice(index, 1);
        localStorage.setItem('baricoinFavoritePairs', JSON.stringify(favoritePairs));
        loadFavorites();
        updateFavoriteButton(document.getElementById('assetSelect').value);
    }
}

// Populate comparison table
function populateComparisonTable() {
    const tbody = document.getElementById('comparisonTableBody');

    // Get all crypto assets
    const cryptoAssets = Object.keys(rates).filter(key =>
        ['bitcoin', 'ethereum', 'usdt', 'usdc', 'litecoin', 'bnb', 'doge', 'xrp'].includes(key)
    );

    tbody.innerHTML = cryptoAssets.map(asset => {
        const data = rates[asset];
        const change = data.change;
        const status = getBestRateStatus(data.rate, cryptoAssets);

        return `
            <tr onclick="selectFromTable('${asset}')">
                <td><strong>${data.name}</strong></td>
                <td>₦${data.rate.toLocaleString('en-NG')}</td>
                <td class="${change >= 0 ? 'positive' : 'negative'}">${change >= 0 ? '+' : ''}${change.toFixed(1)}%</td>
                <td>${status}</td>
            </tr>
        `;
    }).join('');
}

// Get best rate status
function getBestRateStatus(rate, assets) {
    const maxRate = Math.max(...assets.map(a => rates[a].rate));
    if (rate === maxRate) {
        return '<span class="best-rate-badge">Best Rate 🏆</span>';
    }
    return '<span class="good-rate-badge">Good</span>';
}

// Select from table
function selectFromTable(asset) {
    document.getElementById('assetSelect').value = asset;
    if (currentTab !== 'crypto') {
        document.querySelector('[data-tab="crypto"]').click();
    }
    calculateRate();
    updateChart();
    document.querySelector('.calculator-widget').scrollIntoView({ behavior: 'smooth' });
}

// Initialize chart
function initializeChart() {
    const ctx = document.getElementById('rateChart');
    if (!ctx) return;

    const labels = generateDateLabels(7);
    const data = generateHistoricalData(7);

    rateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Rate (₦/USD)',
                data,
                borderColor: '#A97458',
                backgroundColor: 'rgba(169, 116, 88, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1B1B1B',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: (context) => `₦${context.parsed.y.toLocaleString('en-NG')}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: (value) => `₦${value.toLocaleString()}`
                    }
                }
            }
        }
    });
}

// Update chart
function updateChart(period = '7d') {
    if (!rateChart) return;

    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const labels = generateDateLabels(days);
    const data = generateHistoricalData(days);

    rateChart.data.labels = labels;
    rateChart.data.datasets[0].data = data;
    rateChart.update();
}

// Generate date labels
function generateDateLabels(days) {
    const labels = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }));
    }
    return labels;
}

// Generate historical data
function generateHistoricalData(days) {
    const asset = document.getElementById('assetSelect').value;
    const baseRate = rates[asset]?.rate || 1750;
    const data = [];

    for (let i = 0; i < days; i++) {
        // Simulate fluctuation
        const variation = (Math.random() - 0.5) * (baseRate * 0.05);
        data.push(baseRate + variation);
    }

    return data;
}

// Handle swap
function handleSwap() {
    alert('Swap functionality coming soon! This would allow you to quickly exchange between different cryptocurrencies.');
}

// Open alert modal
function openAlertModal() {
    const asset = document.getElementById('assetSelect').value;
    const assetData = rates[asset];

    document.getElementById('alertAsset').value = assetData.name;
    document.getElementById('alertTargetRate').value = assetData.rate;

    showModal('rateAlertModal');
}

// Save rate alert
function saveRateAlert() {
    const targetRate = document.getElementById('alertTargetRate').value;
    const email = document.getElementById('alertEmail').value;

    if (!targetRate || !email) {
        alert('Please fill in all fields');
        return;
    }

    // Save alert (in production, this would be sent to a backend)
    const alerts = JSON.parse(localStorage.getItem('baricoinRateAlerts') || '[]');
    alerts.push({
        asset: document.getElementById('alertAsset').value,
        targetRate: parseFloat(targetRate),
        email,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('baricoinRateAlerts', JSON.stringify(alerts));

    alert('Rate alert set successfully! You\'ll be notified when the rate reaches your target.');
    hideModal('rateAlertModal');

    // Clear form
    document.getElementById('alertTargetRate').value = '';
    document.getElementById('alertEmail').value = '';
}

// Start auto-update
function startAutoUpdate() {
    // Update rates every 5 minutes (300000ms)
    updateInterval = setInterval(() => {
        // Simulate rate updates
        Object.keys(rates).forEach(asset => {
            const variation = (Math.random() - 0.5) * 2;
            rates[asset].change = parseFloat(variation.toFixed(1));
        });

        calculateRate();
        populateComparisonTable();
        loadFavorites();
    }, 300000); // 5 minutes
}

// Modal utilities
function showModal(modal Id) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

console.log('Enhanced calculator loaded');
