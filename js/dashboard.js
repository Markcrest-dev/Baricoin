// ============================================
// DASHBOARD FUNCTIONALITY
// ============================================

// Balance visibility tracking
let balancesVisible = {
    naira: false,
    crypto: false
};

// Store actual balances
let actualBalances = {
    naira: 0,
    bonus: 2000,
    crypto: 0,
    btc: 0,
    eth: 0,
    usdt: 0
};

// Toggle balance visibility
function toggleBalance(type) {
    balancesVisible[type] = !balancesVisible[type];

    if (type === 'naira') {
        const el = document.getElementById('nairaBalance');
        if (balancesVisible.naira) {
            el.textContent = actualBalances.naira.toFixed(2);
        } else {
            el.textContent = '*******';
        }
    } else if (type === 'crypto') {
        const el = document.getElementById('cryptoBalance');
        if (balancesVisible.crypto) {
            el.textContent = actualBalances.crypto.toFixed(2);
        } else {
            el.textContent = '*******';
        }
    }
}

// Update greeting based on time of day
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');

    if (!greetingEl) return;

    if (hour < 12) {
        greetingEl.textContent = 'Good Morning';
    } else if (hour < 17) {
        greetingEl.textContent = 'Good Afternoon';
    } else {
        greetingEl.textContent = 'Good Evening';
    }
}

// Populate dashboard with user data (extended from auth.js)
function populateDashboardData(user) {
    // Update greeting
    updateGreeting();

    // Update username
    const usernameEl = document.getElementById('userName');
    const userInitialEl = document.getElementById('userInitial');

    if (usernameEl) {
        usernameEl.textContent = user.username || user.name || user.email.split('@')[0];
    }

    if (userInitialEl) {
        const name = user.name || user.email.split('@')[0];
        userInitialEl.textContent = name.charAt(0).toUpperCase();
    }

    // Store actual balances
    actualBalances.naira = user.balance || 0;
    actualBalances.bonus = user.bonusBalance || 2000;
    actualBalances.crypto = (user.cryptoBalances?.BTC || 0) + (user.cryptoBalances?.ETH || 0) + (user.cryptoBalances?.USDT || 0);
    actualBalances.btc = user.cryptoBalances?.BTC || 0;
    actualBalances.eth = user.cryptoBalances?.ETH || 0;
    actualBalances.usdt = user.cryptoBalances?.USDT || 0;

    // Update bonus display
    const bonusEl = document.getElementById('bonusBalance');
    if (bonusEl) {
        bonusEl.textContent = '₦ ' + actualBalances.bonus.toFixed(2);
    }

    // Update crypto breakdown
    const btcEl = document.getElementById('btcBalance');
    const ethEl = document.getElementById('ethBalance');
    const usdtEl = document.getElementById('usdtBalance');

    if (btcEl) btcEl.textContent = '₦ ' + actualBalances.btc.toFixed(2);
    if (ethEl) ethEl.textContent = '₦ ' + actualBalances.eth.toFixed(2);
    if (usdtEl) usdtEl.textContent = '₦ ' + actualBalances.usdt.toFixed(2);

    // Keep balances masked by default
    const nairaBalanceEl = document.getElementById('nairaBalance');
    const cryptoBalanceEl = document.getElementById('cryptoBalance');

    if (nairaBalanceEl) nairaBalanceEl.textContent = '*******';
    if (cryptoBalanceEl) cryptoBalanceEl.textContent = '*******';
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();

    // If user is logged in, populate their data
    const currentUser = localStorage.getItem('baricoinUser');
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            populateDashboardData(user);
        } catch (e) {
            console.error('Error loading user data:', e);
        }
    }
});

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

let searchTimeout;

function handleSearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();

    // If empty search, show all content
    if (!term) {
        resetSearchResults();
        return;
    }

    // Search through transactions table
    const transactionsBody = document.getElementById('transactionsBody');
    if (transactionsBody) {
        const rows = transactionsBody.querySelectorAll('tr:not(.empty-state)');
        let visibleCount = 0;

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(term)) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // Show empty state if no results
        const emptyState = transactionsBody.querySelector('.empty-state');
        if (emptyState) {
            if (visibleCount === 0 && rows.length > 0) {
                emptyState.style.display = '';
                emptyState.querySelector('.empty-transactions p').textContent = 'No matching transactions';
                emptyState.querySelector('.empty-transactions span').textContent = `No results found for "${searchTerm}"`;
            } else {
                emptyState.style.display = 'none';
            }
        }
    }

    // Search through sidebar menu items
    const menuItems = document.querySelectorAll('.menu-item, .submenu-item');
    menuItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
            item.style.opacity = '1';
            item.style.pointerEvents = 'auto';
        } else {
            item.style.opacity = '0.3';
            item.style.pointerEvents = 'none';
        }
    });

    // Highlight wallet boxes if they match
    const walletBoxes = document.querySelectorAll('.wallet-box');
    walletBoxes.forEach(box => {
        const text = box.textContent.toLowerCase();
        if (text.includes(term)) {
            box.style.transform = 'scale(1.02)';
            box.style.boxShadow = '0 8px 32px rgba(139, 92, 69, 0.3)';
        } else {
            box.style.opacity = '0.5';
        }
    });
}

function resetSearchResults() {
    // Reset transactions
    const transactionsBody = document.getElementById('transactionsBody');
    if (transactionsBody) {
        const rows = transactionsBody.querySelectorAll('tr:not(.empty-state)');
        rows.forEach(row => {
            row.style.display = '';
        });

        const emptyState = transactionsBody.querySelector('.empty-state');
        if (emptyState && rows.length === 0) {
            emptyState.style.display = '';
            emptyState.querySelector('.empty-transactions p').textContent = 'No transactions yet';
            emptyState.querySelector('.empty-transactions span').textContent = 'Your transaction history will appear here';
        }
    }

    // Reset menu items
    const menuItems = document.querySelectorAll('.menu-item, .submenu-item');
    menuItems.forEach(item => {
        item.style.opacity = '1';
        item.style.pointerEvents = 'auto';
    });

    // Reset wallet boxes
    const walletBoxes = document.querySelectorAll('.wallet-box');
    walletBoxes.forEach(box => {
        box.style.transform = '';
        box.style.boxShadow = '';
        box.style.opacity = '1';
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('dashboardSearch');

    if (searchInput) {
        // Handle input with debouncing
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                handleSearch(e.target.value);
            }, 300);
        });

        // Handle keyboard shortcuts
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                resetSearchResults();
            }
        });
    }

    // Handle notification button click
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            window.location.href = 'notifications.html';
        });
    }

    // Update notification badge
    updateNotificationBadge();
});

// Update notification badge count
function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (!badge) return;

    // Get unread notifications count from localStorage
    const notifications = JSON.parse(localStorage.getItem('baricoinNotifications') || '[]');
    const unreadCount = notifications.filter(n => !n.read).length;

    if (unreadCount > 0) {
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// ============================================
// CRYPTO FUNCTIONALITY
// ============================================

// Handle deposit crypto button
document.addEventListener('DOMContentLoaded', () => {
    const depositBtn = document.getElementById('depositCryptoBtn');
    const sellBtn = document.getElementById('sellCryptoBtn');

    if (depositBtn) {
        depositBtn.addEventListener('click', () => showTokenSelector('deposit'));
    }

    if (sellBtn) {
        sellBtn.addEventListener('click', () => showTokenSelector('sell'));
    }
});

// Show token selector modal
function showTokenSelector(action) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('tokenSelectorModal');
    if (!modal) {
        modal = createTokenSelectorModal();
        document.body.appendChild(modal);
    }

    // Store action type
    modal.dataset.action = action;

    // Update modal title
    const title = modal.querySelector('h3');
    if (title) {
        title.textContent = action === 'deposit' ? 'Select Token to Deposit' : 'Select Token to Sell';
    }

    // Show modal
    modal.style.display = 'flex';
}

// Create token selector modal
function createTokenSelectorModal() {
    const modal = document.createElement('div');
    modal.id = 'tokenSelectorModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Select Token</h3>
            <div class="modal-body">
                <div class="token-selector">
                    <div class="token-card" data-token="BTC">
                        <div class="token-icon">₿</div>
                        <div class="token-name">Bitcoin</div>
                        <div class="token-symbol">BTC</div>
                    </div>
                    <div class="token-card" data-token="ETH">
                        <div class="token-icon">Ξ</div>
                        <div class="token-name">Ethereum</div>
                        <div class="token-symbol">ETH</div>
                    </div>
                    <div class="token-card" data-token="USDT">
                        <div class="token-icon">₮</div>
                        <div class="token-name">Tether</div>
                        <div class="token-symbol">USDT</div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="hideTokenSelector()">Cancel</button>
            </div>
        </div>
    `;

    // Add click handlers to token cards
    setTimeout(() => {
        modal.querySelectorAll('.token-card').forEach(card => {
            card.addEventListener('click', () => handleTokenSelection(card.dataset.token));
        });
    }, 100);

    return modal;
}

// Handle token selection
function handleTokenSelection(token) {
    const modal = document.getElementById('tokenSelectorModal');
    const action = modal?.dataset.action;

    hideTokenSelector();

    if (action === 'deposit') {
        // Navigate to deposit page with token parameter
        window.location.href = `deposit-crypto.html?token=${token}`;
    } else if (action === 'sell') {
        // Navigate to crypto sell page with token parameter
        window.location.href = `crypto.html?token=${token}&action=sell`;
    }
}

// Hide token selector
function hideTokenSelector() {
    const modal = document.getElementById('tokenSelectorModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ============================================
// QUICK ACTIONS KEYBOARD SHORTCUTS
// ============================================

// Handle keyboard shortcuts for quick actions
document.addEventListener('keydown', (e) => {
    // Only trigger shortcuts if:
    // - Alt key is pressed
    // - Not in an input field
    // - Not in a textarea
    const isInInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';

    if (e.altKey && !isInInput) {
        switch (e.key.toLowerCase()) {
            case 'a':
                e.preventDefault();
                window.location.href = 'airtime.html';
                break;
            case 'b':
                e.preventDefault();
                window.location.href = 'cable.html';
                break;
            case 'g':
                e.preventDefault();
                window.location.href = 'giftcards.html';
                break;
            case 'r':
                e.preventDefault();
                window.location.href = 'rate-calculator.html';
                break;
        }
    }
});

console.log('Dashboard functionality loaded');

