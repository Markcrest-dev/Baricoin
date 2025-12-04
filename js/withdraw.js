// ============================================
// WITHDRAW FUNCTIONALITY
// ============================================

let currentUser = null;
let withdrawData = {};

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    setupEventListeners();
});

function loadUserData() {
    const stored = localStorage.getItem('baricoinUser');
    if (stored) {
        try {
            currentUser = JSON.parse(stored);
            document.getElementById('availableBalance').textContent = (currentUser.balance || 0).toFixed(2);
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

function setupEventListeners() {
    const accountNumber = document.getElementById('accountNumber');
    if (accountNumber) {
        accountNumber.addEventListener('input', handleAccountNumber);
    }

    const amountInput = document.getElementById('amount');
    if (amountInput) {
        amountInput.addEventListener('input', updateSummary);
    }

    const form = document.getElementById('withdrawForm');
    if (form) {
        form.addEventListener('submit', handleWithdrawSubmit);
    }

    document.getElementById('cancelWithdraw')?.addEventListener('click', () => hideModal('confirmModal'));
    document.getElementById('confirmWithdraw')?.addEventListener('click', processWithdrawal);
}

function handleAccountNumber(e) {
    const accountNumber = e.target.value;
    const accountNameEl = document.getElementById('accountName');

    if (accountNumber.length === 10) {
        accountNameEl.value = 'Verifying...';
        setTimeout(() => {
            accountNameEl.value = 'JOHN DOE'; // Simulated
        }, 1000);
    } else {
        accountNameEl.value = '';
    }
}

function updateSummary() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const fee = 50;
    const total = amount - fee;

    document.getElementById('summaryAmount').textContent = amount.toFixed(2);
    document.getElementById('summaryFee').textContent = fee.toFixed(2);
    document.getElementById('summaryTotal').textContent = Math.max(0, total).toFixed(2);
}

function handleWithdrawSubmit(e) {
    e.preventDefault();

    const bankName = document.getElementById('bankName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const accountName = document.getElementById('accountName').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!bankName || !accountNumber || !accountName) {
        alert('Please fill in all bank details');
        return;
    }

    if (!amount || amount < 1000) {
        alert('Minimum withdrawal amount is ₦1,000');
        return;
    }

    if (amount > 500000) {
        alert('Daily withdrawal limit is ₦500,000');
        return;
    }

    const balance = currentUser?.balance || 0;
    if (amount > balance) {
        alert('Insufficient balance');
        return;
    }

    withdrawData = {
        bankName: bankName.toUpperCase(),
        accountNumber,
        accountName,
        amount,
        fee: 50,
        total: amount - 50,
        timestamp: new Date()
    };

    showConfirmationModal();
}

function showConfirmationModal() {
    document.getElementById('confirmBank').textContent = withdrawData.bankName;
    document.getElementById('confirmAccount').textContent = `${withdrawData.accountName} (${withdrawData.accountNumber})`;
    document.getElementById('confirmAmount').textContent = withdrawData.amount.toFixed(2);
    document.getElementById('confirmFee').textContent = withdrawData.fee.toFixed(2);
    document.getElementById('confirmTotal').textContent = withdrawData.total.toFixed(2);
    showModal('confirmModal');
}

function processWithdrawal() {
    hideModal('confirmModal');

    if (currentUser) {
        currentUser.balance = (currentUser.balance || 0) - withdrawData.amount;
        localStorage.setItem('baricoinUser', JSON.stringify(currentUser));
        document.getElementById('availableBalance').textContent = currentUser.balance.toFixed(2);
    }

    document.getElementById('successAmount').textContent = withdrawData.total.toFixed(2);
    showModal('successModal');
    document.getElementById('withdrawForm').reset();
    updateSummary();
}

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

console.log('Withdraw page loaded');
