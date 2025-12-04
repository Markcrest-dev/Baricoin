// ============================================
// TRANSFER FUNCTIONALITY - ENHANCED
// ============================================

let currentUser = null;
let transferData = {};
let searchTimeout = null;

// Sample users for search (in production, this would come from an API)
const sampleUsers = [
    { username: 'john.doe', email: 'john.doe@example.com', name: 'John Doe' },
    { username: 'jane.smith', email: 'jane.smith@example.com', name: 'Jane Smith' },
    { username: 'mike.jones', email: 'mike.jones@example.com', name: 'Mike Jones' },
    { username: 'sarah.williams', email: 'sarah.williams@example.com', name: 'Sarah Williams' },
    { username: 'david.brown', email: 'david.brown@example.com', name: 'David Brown' }
];

document.addEventListener('DOMContentLoaded', () => {
    // Load user data
    loadUserData();

    // Set up event listeners
    setupEventListeners();

    // Load frequent recipients
    loadFrequentRecipients();

    // Load recent transfers
    loadRecentTransfers();
});

// Load user data and display balance
function loadUserData() {
    const stored = localStorage.getItem('baricoinUser');
    if (stored) {
        try {
            currentUser = JSON.parse(stored);
            const balanceEl = document.getElementById('availableBalance');
            if (balanceEl) {
                balanceEl.textContent = (currentUser.balance || 0).toFixed(2);
            }

            // Update user initial
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

// Setup event listeners
function setupEventListeners() {
    // Transfer type toggle
    const transferTypeInputs = document.querySelectorAll('input[name="transferType"]');
    transferTypeInputs.forEach(input => {
        input.addEventListener('change', handleTransferTypeChange);
    });

    // User search with autocomplete
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', handleUserSearch);
        usernameInput.addEventListener('blur', () => {
            // Delay hiding to allow click on results
            setTimeout(() => hideSearchResults(), 200);
        });
    }

    // Account number validation
    const accountNumber = document.getElementById('accountNumber');
    if (accountNumber) {
        accountNumber.addEventListener('input', handleAccountNumber);
    }

    // Amount input
    const amountInput = document.getElementById('amount');
    if (amountInput) {
        amountInput.addEventListener('input', updateSummary);
    }

    // Form submission
    const form = document.getElementById('transferForm');
    if (form) {
        form.addEventListener('submit', handleTransferSubmit);
    }

    // Modal buttons
    const cancelBtn = document.getElementById('cancelTransfer');
    const confirmBtn = document.getElementById('confirmTransfer');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            hideModal('confirmModal');
            document.getElementById('transferPin').value = ''; // Clear PIN
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', processTransfer);
    }
}

// Handle user search with autocomplete
function handleUserSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');

    if (!query) {
        hideSearchResults();
        return;
    }

    // Clear previous timeout
    clearTimeout(searchTimeout);

    // Debounce search
    searchTimeout = setTimeout(() => {
        const matches = sampleUsers.filter(user =>
            user.username.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.name.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            searchResults.innerHTML = matches.map(user => `
                <div class="search-result-item" onclick="selectUser('${user.username}', '${user.email}', '${user.name}')">
                    <div class="user-avatar-small">${user.name.charAt(0)}</div>
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
                        <div class="user-email">@${user.username}</div>
                    </div>
                </div>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="no-results">No users found</div>';
            searchResults.style.display = 'block';
        }
    }, 300);
}

// Select user from search results
function selectUser(username, email, name) {
    document.getElementById('username').value = username;
    hideSearchResults();
}

// Hide search results
function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Handle transfer type change
function handleTransferTypeChange(e) {
    const userRecipient = document.getElementById('userRecipient');
    const bankRecipient = document.getElementById('bankRecipient');

    if (e.target.value === 'user') {
        userRecipient.style.display = 'block';
        bankRecipient.style.display = 'none';
    } else {
        userRecipient.style.display = 'none';
        bankRecipient.style.display = 'block';
    }
}

// Handle account number input
function handleAccountNumber(e) {
    const accountNumber = e.target.value;
    const accountNameEl = document.getElementById('accountName');

    // Only validate if we have 10 digits
    if (accountNumber.length === 10) {
        // Simulate account name lookup
        accountNameEl.value = 'Verifying...';

        setTimeout(() => {
            // In a real app, this would be an API call
            accountNameEl.value = 'JOHN DOE'; // Simulated result
        }, 1000);
    } else {
        accountNameEl.value = '';
    }
}

// Update summary
function updateSummary() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const fee = 10; // Fixed fee
    const total = amount + fee;

    document.getElementById('summaryAmount').textContent = amount.toFixed(2);
    document.getElementById('summaryFee').textContent = fee.toFixed(2);
    document.getElementById('summaryTotal').textContent = total.toFixed(2);
}

// Handle form submission
function handleTransferSubmit(e) {
    e.preventDefault();

    const transferType = document.querySelector('input[name="transferType"]:checked').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const saveRecipient = document.getElementById('saveRecipient')?.checked || false;

    // Validation
    if (!amount || amount < 100) {
        showError('Minimum transfer amount is ₦100');
        return;
    }

    const balance = currentUser?.balance || 0;
    const total = amount + 10; // Including fee

    if (total > balance) {
        showError('Insufficient balance. You need ₦' + total.toFixed(2));
        return;
    }

    let recipient = '';
    let recipientData = {};

    if (transferType === 'user') {
        recipient = document.getElementById('username').value.trim();
        if (!recipient) {
            showError('Please enter recipient username or email');
            return;
        }

        // Find user details
        const user = sampleUsers.find(u => u.username === recipient || u.email === recipient);
        if (user) {
            recipientData = { username: user.username, email: user.email, name: user.name };
        } else {
            recipientData = { username: recipient, email: recipient, name: recipient };
        }
    } else {
        const bankName = document.getElementById('bankName').value;
        const accountNumber = document.getElementById('accountNumber').value;
        const accountName = document.getElementById('accountName').value;

        if (!bankName || !accountNumber || !accountName) {
            showError('Please fill in all bank details');
            return;
        }

        recipient = `${accountName} - ${bankName.toUpperCase()}`;
    }

    // Store transfer data
    transferData = {
        type: transferType,
        recipient,
        recipientData,
        amount,
        fee: 10,
        total,
        description,
        saveRecipient,
        timestamp: new Date()
    };

    // Show confirmation modal
    showConfirmationModal();
}

// Show confirmation modal
function showConfirmationModal() {
    document.getElementById('confirmRecipient').textContent = transferData.recipient;
    document.getElementById('confirmAmount').textContent = transferData.amount.toFixed(2);
    document.getElementById('confirmFee').textContent = transferData.fee.toFixed(2);
    document.getElementById('confirmTotal').textContent = transferData.total.toFixed(2);

    // Show/hide note
    const noteRow = document.getElementById('confirmNoteRow');
    const noteEl = document.getElementById('confirmNote');
    if (transferData.description) {
        noteEl.textContent = transferData.description;
        noteRow.style.display = 'flex';
    } else {
        noteRow.style.display = 'none';
    }

    // Clear PIN input
    document.getElementById('transferPin').value = '';

    showModal('confirmModal');
}

// Process transfer
function processTransfer() {
    const pin = document.getElementById('transferPin').value;

    // Validate PIN
    if (!pin || pin.length !== 4) {
        showError('Please enter your 4-digit PIN');
        return;
    }

    // Simulate PIN verification (in production, verify against stored PIN)
    const storedPin = currentUser?.pin || '1234'; // Default PIN for demo
    if (pin !== storedPin) {
        showError('Incorrect PIN. Please try again.');
        return;
    }

    hideModal('confirmModal');

    // Update user balance
    if (currentUser) {
        currentUser.balance = (currentUser.balance || 0) - transferData.total;
        localStorage.setItem('baricoinUser', JSON.stringify(currentUser));

        // Update balance display
        document.getElementById('availableBalance').textContent = currentUser.balance.toFixed(2);
    }

    // Save to frequent recipients if requested
    if (transferData.saveRecipient && transferData.recipientData) {
        saveFrequentRecipient(transferData.recipientData);
    }

    // Save transfer to history
    saveTransferToHistory();

    // Show success modal
    document.getElementById('successAmount').textContent = transferData.amount.toFixed(2);
    showModal('successModal');

    // Reset form
    document.getElementById('transferForm').reset();
    updateSummary();

    // Reload sections
    loadRecentTransfers();
    loadFrequentRecipients();

    // Store transfer receipt in localStorage for viewing later
    const receiptId = Date.now();
    localStorage.setItem('lastTransferReceipt', JSON.stringify({
        ...transferData,
        receiptId,
        status: 'completed'
    }));
}

// Save frequent recipient
function saveFrequentRecipient(recipientData) {
    let recipients = JSON.parse(localStorage.getItem('baricoinFrequentRecipients') || '[]');

    // Check if recipient already exists
    const exists = recipients.some(r => r.username === recipientData.username);
    if (!exists) {
        recipients.unshift(recipientData);

        // Keep only last 5
        if (recipients.length > 5) {
            recipients = recipients.slice(0, 5);
        }

        localStorage.setItem('baricoinFrequentRecipients', JSON.stringify(recipients));
    }
}

// Load frequent recipients
function loadFrequentRecipients() {
    const recipients = JSON.parse(localStorage.getItem('baricoinFrequentRecipients') || '[]');
    const container = document.getElementById('frequentRecipients');
    const card = document.getElementById('frequentRecipientsCard');

    if (recipients.length === 0) {
        card.style.display = 'none';
        return;
    }

    card.style.display = 'block';
    container.innerHTML = recipients.map(recipient => `
        <div class="recipient-item" onclick="fillRecipient('${recipient.username}')">
            <div class="user-avatar-medium">${recipient.name.charAt(0)}</div>
            <div>
                <h3 style="margin: 0 0 0.25rem 0; font-size: 0.9375rem;">${recipient.name}</h3>
                <p style="margin: 0; font-size: 0.75rem; color: #64748b;">@${recipient.username}</p>
            </div>
            <button class="quick-select-btn">Select</button>
        </div>
    `).join('');
}

// Fill recipient from frequent list
function fillRecipient(username) {
    document.getElementById('username').value = username;
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Save transfer to history
function saveTransferToHistory() {
    const history = JSON.parse(localStorage.getItem('baricoinTransferHistory') || '[]');
    history.unshift({
        id: Date.now(),
        ...transferData,
        status: 'completed'
    });

    // Keep only last 10 transfers
    if (history.length > 10) {
        history.pop();
    }

    localStorage.setItem('baricoinTransferHistory', JSON.stringify(history));
}

// Load recent transfers
function loadRecentTransfers() {
    const history = JSON.parse(localStorage.getItem('baricoinTransferHistory') || '[]');
    const container = document.getElementById('recentTransfers');

    if (history.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 2rem;">No recent transfers</p>';
        return;
    }

    container.innerHTML = history.map(transfer => `
        <div class="setting-item" style="margin-bottom: 0.75rem;">
            <div>
                <h3 style="margin: 0 0 0.25rem 0;">${transfer.recipient}</h3>
                <p style="margin: 0; font-size: 0.75rem; color: #64748b;">
                    ${new Date(transfer.timestamp).toLocaleDateString()} at ${new Date(transfer.timestamp).toLocaleTimeString()}
                    ${transfer.description ? `• ${transfer.description}` : ''}
                </p>
            </div>
            <div style="text-align: right;">
                <p style="margin: 0; font-weight: 700; color: #1B1B1B; font-size: 1.125rem;">₦${transfer.amount.toFixed(2)}</p>
                <span style="display: inline-block; padding: 0.125rem 0.5rem; background: rgba(16, 185, 129, 0.1); color: #059669; border-radius: 12px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize;">${transfer.status}</span>
            </div>
        </div>
    `).join('');
}

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Hide modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Show error
function showError(message) {
    alert(message); // In production, use a better notification system
}

console.log('Enhanced transfer page loaded');
