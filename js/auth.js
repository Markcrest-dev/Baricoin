// ============================================
// AUTHENTICATION SYSTEM - Flipex Style Multi-Step Flow
// ============================================

// Check if user is logged in on page load
function checkAuth() {
    const currentUser = localStorage.getItem('baricoinUser');
    const currentPage = window.location.pathname.split('/').pop();

    // If on login/signup pages and already logged in, redirect to dashboard
    if (currentUser && (currentPage === 'login.html' || currentPage === 'signup.html')) {
        window.location.href = 'dashboard.html';
        return;
    }

    // If on dashboard and not logged in, redirect to login
    if (!currentUser && currentPage === 'dashboard.html') {
        window.location.href = 'login.html';
        return;
    }

    // If on dashboard and logged in, populate user data
    if (currentUser && currentPage === 'dashboard.html') {
        const user = JSON.parse(currentUser);
        populateUserData(user);
    }
}

// Initialize demo account for testing
function initDemoAccount() {
    const existingUsers = JSON.parse(localStorage.getItem('baricoinUsers') || '[]');
    const demoExists = existingUsers.some(u => u.email === 'demo@baricoin.com');

    if (!demoExists) {
        const demoUser = {
            name: 'Demo User',
            username: 'demo_user',
            email: 'demo@baricoin.com',
            phone: '+234 800 000 0000',
            password: 'Demo123!',
            referral: '',
            verificationCode: '000000',
            verified: true,
            pin: '1234',
            balance: 50000,
            bonusBalance: 2000,
            cryptoBalances: {
                BTC: 0.05,
                ETH: 0.5,
                USDT: 1000
            },
            createdAt: new Date().toISOString()
        };

        existingUsers.push(demoUser);
        localStorage.setItem('baricoinUsers', JSON.stringify(existingUsers));
        console.log('Demo account initialized: demo@baricoin.com / Demo123!');
    }
}


// Populate dashboard with user data
function populateUserData(user) {
    // Top bar
    const userNameEl = document.getElementById('userName');
    const userInitialEl = document.getElementById('userInitial');

    // Account info
    const userEmailEl = document.getElementById('userEmail');
    const userUsernameEl = document.getElementById('userUsername');
    const userPhoneEl = document.getElementById('userPhone');
    const memberSinceEl = document.getElementById('memberSince');

    // Wallet balances
    const nairaBalanceEl = document.getElementById('nairaBalance');
    const bonusBalanceEl = document.getElementById('bonusBalance');
    const btcBalanceEl = document.getElementById('btcBalance');
    const ethBalanceEl = document.getElementById('ethBalance');
    const usdtBalanceEl = document.getElementById('usdtBalance');

    // Populate name and initial
    if (userNameEl) userNameEl.textContent = user.name || user.email.split('@')[0];
    if (userInitialEl) {
        const name = user.name || user.email.split('@')[0];
        userInitialEl.textContent = name.charAt(0).toUpperCase();
    }

    // Populate account info
    if (userEmailEl) userEmailEl.textContent = user.email;
    if (userUsernameEl) userUsernameEl.textContent = user.username || 'Not set';
    if (userPhoneEl) userPhoneEl.textContent = user.phone || 'Not provided';
    if (memberSinceEl) {
        const date = new Date(user.createdAt);
        memberSinceEl.textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Populate wallet balances
    if (nairaBalanceEl) nairaBalanceEl.textContent = (user.balance || 0).toFixed(2);
    if (bonusBalanceEl) bonusBalanceEl.textContent = (user.bonusBalance || 0).toFixed(2);

    // Populate crypto balances
    if (btcBalanceEl) btcBalanceEl.textContent = (user.cryptoBalances?.BTC || 0).toFixed(2);
    if (ethBalanceEl) ethBalanceEl.textContent = (user.cryptoBalances?.ETH || 0).toFixed(2);
    if (usdtBalanceEl) usdtBalanceEl.textContent = (user.cryptoBalances?.USDT || 0).toFixed(2);
}

// Generate 6-digit verification code
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Handle Signup - Step 1: Create account and redirect to verification
function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const referral = document.getElementById('referral')?.value || '';

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('baricoinUsers') || '[]');
    const userExists = existingUsers.some(u => u.email === email || u.username === username);

    if (userExists) {
        alert('An account with this email or username already exists. Please login instead.');
        window.location.href = 'login.html';
        return;
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();

    // Create temporary user object
    const tempUser = {
        name,
        username,
        email,
        phone,
        password,
        referral,
        verificationCode,
        verified: false,
        pin: null,
        balance: 0,
        bonusBalance: 2000,
        cryptoBalances: {
            BTC: 0,
            ETH: 0,
            USDT: 0
        },
        createdAt: new Date().toISOString()
    };

    // Store temporarily
    localStorage.setItem('tempSignupData', JSON.stringify(tempUser));
    localStorage.setItem('tempSignupEmail', email);
    localStorage.setItem('verificationCode', verificationCode);

    // Log code for demo purposes
    console.log('=================================');
    console.log('Verification Code:', verificationCode);
    console.log('=================================');

    alert(`Account created! Verification code sent to ${email}\n\nFor demo: Check console for code (F12)`);

    // Redirect to verification page
    window.location.href = `verify.html?email=${encodeURIComponent(email)}`;
}

// Handle Email Verification - Step 2
function handleVerifyEmail(e) {
    e.preventDefault();

    const enteredCode = document.getElementById('code').value;
    const savedCode = localStorage.getItem('verificationCode');
    const tempUser = JSON.parse(localStorage.getItem('tempSignupData'));

    if (!tempUser) {
        alert('Session expired. Please sign up again.');
        window.location.href = 'signup.html';
        return;
    }

    if (enteredCode !== savedCode) {
        alert('Invalid verification code. Please try again.');
        return;
    }

    // Mark as verified
    tempUser.verified = true;
    localStorage.setItem('tempSignupData', JSON.stringify(tempUser));

    alert('Email verified successfully! Now set your PIN.');

    // Redirect to PIN setup
    window.location.href = 'set-pin.html';
}

// Handle PIN Setup - Step 3
function handlePinSetup(e) {
    e.preventDefault();

    const pin = document.getElementById('pin').value;
    const confirmPin = document.getElementById('confirmPin').value;

    // Validate PIN
    if (pin.length !== 4 || isNaN(pin)) {
        alert('Please enter a valid 4-digit PIN');
        return;
    }

    if (pin !== confirmPin) {
        alert('PINs do not match. Please try again.');
        return;
    }

    const tempUser = JSON.parse(localStorage.getItem('tempSignupData'));

    if (!tempUser || !tempUser.verified) {
        alert('Session expired or email not verified. Please start again.');
        window.location.href = 'signup.html';
        return;
    }

    // Save PIN
    tempUser.pin = pin;

    // Move to permanent users list
    const existingUsers = JSON.parse(localStorage.getItem('baricoinUsers') || '[]');
    existingUsers.push(tempUser);
    localStorage.setItem('baricoinUsers', JSON.stringify(existingUsers));

    // Set as current user
    localStorage.setItem('baricoinUser', JSON.stringify(tempUser));

    // Clean up temp data
    localStorage.removeItem('tempSignupData');
    localStorage.removeItem('tempSignupEmail');
    localStorage.removeItem('verificationCode');

    alert(`Welcome to Baricoin, ${tempUser.name}! You have received ₦2,000 bonus!`);

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Get all users
    const existingUsers = JSON.parse(localStorage.getItem('baricoinUsers') || '[]');

    // Find user
    const user = existingUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Invalid email or password. Please try again.');
        return;
    }

    if (!user.verified) {
        alert('Please verify your email first.');
        window.location.href = `verify.html?email=${encodeURIComponent(email)}`;
        return;
    }

    // Set as current user
    localStorage.setItem('baricoinUser', JSON.stringify(user));

    // Show success and redirect
    alert(`Welcome back, ${user.name}!`);
    window.location.href = 'dashboard.html';
}

// Handle Logout
function handleLogout(e) {
    if (e) e.preventDefault();

    localStorage.removeItem('baricoinUser');
    // Optional: Show a brief toast or just redirect immediately
    // alert('You have been logged out successfully.'); 
    window.location.href = 'index.html';
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize demo account first
    initDemoAccount();

    // Then check auth status
    checkAuth();

    // Setup form handlers
    const signupForm = document.getElementById('signupForm');
    const verifyForm = document.getElementById('verifyForm');
    const setPinForm = document.getElementById('setPinForm');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (verifyForm) {
        verifyForm.addEventListener('submit', handleVerifyEmail);
    }

    if (setPinForm) {
        setPinForm.addEventListener('submit', handlePinSetup);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

console.log('Authentication system loaded - Multi-step flow active');
