// ============================================
// DEPOSIT CRYPTO FUNCTIONALITY
// ============================================

const TOKEN_DATA = {
    BTC: {
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: '₿',
        network: 'Bitcoin Network',
        minDeposit: '0.0001 BTC',
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        confirmations: 3
    },
    ETH: {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'Ξ',
        network: 'Ethereum (ERC-20)',
        minDeposit: '0.01 ETH',
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4',
        confirmations: 12
    },
    USDT: {
        name: 'Tether',
        symbol: 'USDT',
        icon: '₮',
        network: 'Tron (TRC-20)',
        minDeposit: '10 USDT',
        address: 'TYDzsYUEpvnYmQk4zGP9JN5xk42jkyVrmP',
        confirmations: 20
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadTokenData();
    setupCopyButton();
    updateUserInitial();
});

function loadTokenData() {
    // Get token from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || 'BTC';

    const tokenData = TOKEN_DATA[token];
    if (!tokenData) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Update page content
    document.getElementById('tokenName').textContent = tokenData.name;
    document.getElementById('tokenFullName').textContent = tokenData.name;
    document.getElementById('tokenIcon').textContent = tokenData.icon;
    document.getElementById('networkBadge').textContent = tokenData.symbol;
    document.getElementById('networkInfo').textContent = tokenData.network;
    document.getElementById('minDeposit').textContent = tokenData.minDeposit;
    document.getElementById('depositAddress').textContent = tokenData.address;
    document.getElementById('warningToken').textContent = `${tokenData.name} (${tokenData.symbol})`;
    document.getElementById('confirmations').textContent = tokenData.confirmations;
}

function setupCopyButton() {
    const copyBtn = document.getElementById('copyBtn');
    const copyText = document.getElementById('copyText');
    const address = document.getElementById('depositAddress').textContent;

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(address);
                copyText.textContent = 'Copied!';
                copyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                copyBtn.style.color = 'white';

                setTimeout(() => {
                    copyText.textContent = 'Copy Address';
                    copyBtn.style.background = '';
                    copyBtn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = address;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    copyText.textContent = 'Copied!';
                    setTimeout(() => {
                        copyText.textContent = 'Copy Address';
                    }, 2000);
                } catch (err) {
                    alert('Failed to copy address');
                }
                document.body.removeChild(textArea);
            }
        });
    }
}

function updateUserInitial() {
    const stored = localStorage.getItem('baricoinUser');
    if (stored) {
        try {
            const user = JSON.parse(stored);
            const userInitialEl = document.getElementById('userInitial');
            if (userInitialEl) {
                const name = user.name || user.email.split('@')[0];
                userInitialEl.textContent = name.charAt(0).toUpperCase();
            }
        } catch (e) {
            console.error('Error loading user data:', e);
        }
    }
}

console.log('Deposit crypto page loaded');
