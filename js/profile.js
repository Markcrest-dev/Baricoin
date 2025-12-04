// ============================================
// PROFILE PAGE FUNCTIONALITY
// ============================================

let currentUser = null;
let bankAccounts = [];

document.addEventListener('DOMContentLoaded', () => {
    // Load user data
    loadUserData();

    // Load bank accounts
    loadBankAccounts();

    // Load KYC status
    loadKYCStatus();

    // Load activity log
    loadActivityLog();

    // Set up event listeners
    setupEventListeners();
});

// Load user data
function loadUserData() {
    const stored = localStorage.getItem('baricoinUser');
    if (stored) {
        try {
            currentUser = JSON.parse(stored);

            // Update profile header
            document.getElementById('profileName').textContent = currentUser.name || 'User';
            document.getElementById('profileEmail').textContent = currentUser.email || 'user@example.com';
            document.getElementById('avatarInitial').textContent = (currentUser.name || 'U').charAt(0).toUpperCase();
            document.getElementById('userInitial').textContent = (currentUser.name || 'U').charAt(0).toUpperCase();

            // Update member since
            const joinDate = new Date(currentUser.joinedDate || Date.now());
            document.getElementById('memberSince').textContent = joinDate.getFullYear();

            // Update personal info form
            document.getElementById('fullName').value = currentUser.name || '';
            document.getElementById('email').value = currentUser.email || '';
            document.getElementById('phone').value = currentUser.phone || '';
            document.getElementById('dateOfBirth').value = currentUser.dateOfBirth || '';
            document.getElementById('address').value = currentUser.address || '';

            // Calculate and update profile completion
            updateProfileCompletion();

            // Show verified badge if verified
            if (currentUser.verified) {
                document.getElementById('verifiedBadge').style.display = 'inline-flex';
            }

            // Update 2FA toggle
            document.getElementById('twoFactorToggle').checked = currentUser.twoFactorEnabled || false;
        } catch (e) {
            console.error('Error loading user data:', e);
        }
    }
}

// Update profile completion percentage
function updateProfileCompletion() {
    let completedFields = 0;
    const totalFields = 7; // name, email, phone, dob, address, avatar, bank

    if (currentUser.name) completedFields++;
    if (currentUser.email) completedFields++;
    if (currentUser.phone) completedFields++;
    if (currentUser.dateOfBirth) completedFields++;
    if (currentUser.address) completedFields++;
    if (currentUser.avatar) completedFields++;
    if (bankAccounts.length > 0) completedFields++;

    const percentage = Math.round((completedFields / totalFields) * 100);

    document.getElementById('completionFill').style.width = percentage + '%';
    document.getElementById('completionPercentage').textContent = percentage + '%';
}

// Setup event listeners
function setupEventListeners() {
    // Personal info form
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', handlePersonalInfoSubmit);
    }

    // Avatar upload
    const avatarInput = document.getElementById('avatarInput');
    if (avatarInput) {
        avatarInput.addEventListener('change', handleAvatarUpload);
    }

    // Add bank button
    const addBankBtn = document.getElementById('addBankBtn');
    if (addBankBtn) {
        addBankBtn.addEventListener('click', () => showModal('addBankModal'));
    }

    // Bank modal buttons
    const cancelBankBtn = document.getElementById('cancelBankBtn');
    const saveBankBtn = document.getElementById('saveBankBtn');

    if (cancelBankBtn) {
        cancelBankBtn.addEventListener('click', () => hideModal('addBankModal'));
    }

    if (saveBankBtn) {
        saveBankBtn.addEventListener('click', handleAddBank);
    }

    // Account number verification
    const modalAccountNumber = document.getElementById('modalAccountNumber');
    if (modalAccountNumber) {
        modalAccountNumber.addEventListener('input', handleAccountNumberVerification);
    }

    // Security buttons
    document.getElementById('changePasswordBtn')?.addEventListener('click', handleChangePassword);
    document.getElementById('changePinBtn')?.addEventListener('click', handleChangePin);
    document.getElementById('twoFactorToggle')?.addEventListener('change', handleTwoFactorToggle);
}

// Handle personal info form submission
function handlePersonalInfoSubmit(e) {
    e.preventDefault();

    if (!currentUser) return;

    // Update user data
    currentUser.name = document.getElementById('fullName').value;
    currentUser.phone = document.getElementById('phone').value;
    currentUser.dateOfBirth = document.getElementById('dateOfBirth').value;
    currentUser.address = document.getElementById('address').value;

    // Save to localStorage
    localStorage.setItem('baricoinUser', JSON.stringify(currentUser));

    // Update profile header
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('avatarInitial').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('userInitial').textContent = currentUser.name.charAt(0).toUpperCase();

    // Update completion
    updateProfileCompletion();

    // Show success message
    showSuccess('Profile updated successfully!');

    // Add to activity log
    addActivity('profile_update', 'Updated personal information');
}

// Handle avatar upload
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please select an image file');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showError('Image size must be less than 5MB');
        return;
    }

    // Read and display image
    const reader = new FileReader();
    reader.onload = (event) => {
        const imageUrl = event.target.result;

        // Update avatar display
        const avatarLarge = document.getElementById('profileAvatarLarge');
        avatarLarge.style.backgroundImage = `url(${imageUrl})`;
        avatarLarge.style.backgroundSize = 'cover';
        avatarLarge.style.backgroundPosition = 'center';
        avatarLarge.querySelector('span').style.display = 'none';

        // Save to user data
        if (currentUser) {
            currentUser.avatar = imageUrl;
            localStorage.setItem('baricoinUser', JSON.stringify(currentUser));
            updateProfileCompletion();
        }

        // Add to activity log
        addActivity('avatar_update', 'Updated profile picture');

        showSuccess('Profile picture updated successfully!');
    };

    reader.readAsDataURL(file);
}

// Load bank accounts
function loadBankAccounts() {
    bankAccounts = JSON.parse(localStorage.getItem('baricoinBankAccounts') || '[]');
    const container = document.getElementById('bankAccountsList');

    if (bankAccounts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 2rem;">No bank accounts added yet</p>';
        return;
    }

    container.innerHTML = bankAccounts.map((bank, index) => `
        <div class="bank-account-item">
            <div class="bank-info">
                <h3 class="bank-name">${bank.name}</h3>
                <p class="account-number">${bank.accountNumber} • ${bank.accountName}</p>
            </div>
            <div class="bank-actions">
                <button class="icon-btn delete-btn" onclick="deleteBankAccount(${index})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    updateProfileCompletion();
}

// Handle account number verification
function handleAccountNumberVerification(e) {
    const accountNumber = e.target.value;
    const accountNameEl = document.getElementById('modalAccountName');

    if (accountNumber.length === 10) {
        accountNameEl.value = 'Verifying...';

        // Simulate API call
        setTimeout(() => {
            accountNameEl.value = currentUser?.name?.toUpperCase() || 'ACCOUNT HOLDER NAME';
        }, 1000);
    } else {
        accountNameEl.value = '';
    }
}

// Handle add bank
function handleAddBank() {
    const bankName = document.getElementById('modalBankName').value;
    const accountNumber = document.getElementById('modalAccountNumber').value;
    const accountName = document.getElementById('modalAccountName').value;

    // Validation
    if (!bankName || !accountNumber || !accountName || accountName === 'Verifying...') {
        showError('Please fill in all fields and wait for verification');
        return;
    }

    // Add to bank accounts
    bankAccounts.push({
        name: bankName,
        accountNumber,
        accountName
    });

    // Save to localStorage
    localStorage.setItem('baricoinBankAccounts', JSON.stringify(bankAccounts));

    // Reload bank accounts display
    loadBankAccounts();

    // Close modal and reset form
    hideModal('addBankModal');
    document.getElementById('modalBankName').value = '';
    document.getElementById('modalAccountNumber').value = '';
    document.getElementById('modalAccountName').value = '';

    // Add to activity log
    addActivity('bank_added', `Added ${bankName} account`);

    showSuccess('Bank account added successfully!');
}

// Delete bank account
function deleteBankAccount(index) {
    if (confirm('Are you sure you want to remove this bank account?')) {
        const bankName = bankAccounts[index].name;
        bankAccounts.splice(index, 1);
        localStorage.setItem('baricoinBankAccounts', JSON.stringify(bankAccounts));
        loadBankAccounts();

        // Add to activity log
        addActivity('bank_removed', `Removed ${bankName} account`);

        showSuccess('Bank account removed successfully!');
    }
}

// Load KYC status
function loadKYCStatus() {
    const kycStatus = currentUser?.kycStatus || 'unverified';
    const container = document.getElementById('kycStatusContainer');

    const statusConfig = {
        unverified: {
            class: 'unverified',
            title: 'Verification Required',
            description: 'Complete KYC verification to unlock full features',
            buttonText: 'Start Verification',
            action: 'startKYC'
        },
        pending: {
            class: 'pending',
            title: 'Verification Pending',
            description: 'Your documents are being reviewed. This usually takes 24-48 hours.',
            buttonText: 'View Status',
            action: 'viewKYCStatus'
        },
        verified: {
            class: 'verified',
            title: 'Account Verified',
            description: 'Your account is fully verified. You can access all features.',
            buttonText: 'View Details',
            action: 'viewKYCDetails'
        }
    };

    const config = statusConfig[kycStatus];

    container.innerHTML = `
        <div class="kyc-status ${config.class}">
            <div class="kyc-info">
                <h3>${config.title}</h3>
                <p>${config.description}</p>
            </div>
            <button class="kyc-action-btn" onclick="${config.action}()">${config.buttonText}</button>
        </div>
    `;
}

// KYC actions
function startKYC() {
    alert('KYC verification process would start here. This would typically open a modal with document upload forms.');
    addActivity('kyc_started', 'Started KYC verification process');
}

function viewKYCStatus() {
    alert('View KYC status details');
}

function viewKYCDetails() {
    alert('View verified KYC details');
}

// Load activity log
function loadActivityLog() {
    const activities = JSON.parse(localStorage.getItem('baricoinProfileActivity') || '[]');
    const container = document.getElementById('activityLog');

    if (activities.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 2rem;">No recent activity</p>';
        return;
    }

    const iconMap = {
        profile_update: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
        avatar_update: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>',
        bank_added: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',
        bank_removed: '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>',
        security_update: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
        kyc_started: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>'
    };

    container.innerHTML = activities.slice(0, 5).map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    ${iconMap[activity.type] || iconMap.profile_update}
                </svg>
            </div>
            <div class="activity-details">
                <p class="activity-title">${activity.description}</p>
                <p class="activity-time">${formatActivityTime(activity.timestamp)}</p>
            </div>
        </div>
    `).join('');
}

// Add activity
function addActivity(type, description) {
    const activities = JSON.parse(localStorage.getItem('baricoinProfileActivity') || '[]');

    activities.unshift({
        type,
        description,
        timestamp: new Date().toISOString()
    });

    // Keep only last 10
    if (activities.length > 10) {
        activities.pop();
    }

    localStorage.setItem('baricoinProfileActivity', JSON.stringify(activities));
    loadActivityLog();
}

// Format activity time
function formatActivityTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
}

// Security handlers
function handleChangePassword() {
    const newPassword = prompt('Enter new password:');
    if (newPassword && newPassword.length >= 6) {
        if (currentUser) {
            currentUser.password = newPassword; // In production, this would be hashed
            localStorage.setItem('baricoinUser', JSON.stringify(currentUser));
            addActivity('security_update', 'Changed account password');
            showSuccess('Password changed successfully!');
        }
    } else if (newPassword) {
        showError('Password must be at least 6 characters');
    }
}

function handleChangePin() {
    const newPin = prompt('Enter new 4-digit PIN:');
    if (newPin && /^\d{4}$/.test(newPin)) {
        if (currentUser) {
            currentUser.pin = newPin;
            localStorage.setItem('baricoinUser', JSON.stringify(currentUser));
            addActivity('security_update', 'Updated transaction PIN');
            showSuccess('PIN updated successfully!');
        }
    } else if (newPin) {
        showError('PIN must be exactly 4 digits');
    }
}

function handleTwoFactorToggle(e) {
    const enabled = e.target.checked;
    if (currentUser) {
        currentUser.twoFactorEnabled = enabled;
        localStorage.setItem('baricoinUser', JSON.stringify(currentUser));
        addActivity('security_update', enabled ? 'Enabled 2FA' : 'Disabled 2FA');
        showSuccess(`Two-factor authentication ${enabled ? 'enabled' : 'disabled'}!`);
    }
}

// Modal utilities
function showModal(modalId) {
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

// Show success
function showSuccess(message) {
    alert(message); // In production, use a better notification system
}

// Show error
function showError(message) {
    alert(message); // In production, use a better notification system
}

console.log('Profile page loaded');
