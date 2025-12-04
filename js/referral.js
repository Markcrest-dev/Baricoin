// ============================================
// REFERRAL FUNCTIONALITY
// ============================================

// Generate or retrieve referral code
function getReferralCode() {
    let code = localStorage.getItem('baricoinReferralCode');

    if (!code) {
        // Generate random 8-character alphanumeric code
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        code = 'BARI';
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        localStorage.setItem('baricoinReferralCode', code);
    }

    return code;
}

// Initialize referral page
document.addEventListener('DOMContentLoaded', () => {
    // Get and display referral code
    const referralCode = getReferralCode();
    const codeEl = document.getElementById('referralCode');
    if (codeEl) {
        codeEl.textContent = referralCode;
    }

    // Generate and display referral link
    const linkEl = document.getElementById('referralLink');
    if (linkEl) {
        const baseUrl = window.location.origin;
        linkEl.value = `${baseUrl}/signup.html?ref=${referralCode}`;
    }

    // Load referral stats
    loadReferralStats();

    // Load referral history
    loadReferralHistory();

    // Set up copy buttons
    setupCopyButtons();

    // Set up social share buttons
    setupSocialShare();
});

// Load referral statistics
function loadReferralStats() {
    const stats = JSON.parse(localStorage.getItem('baricoinReferralStats') || '{"totalReferrals": 0, "totalEarnings": 0, "pendingRewards": 0}');

    const totalReferralsEl = document.getElementById('totalReferrals');
    const totalEarningsEl = document.getElementById('totalEarnings');
    const pendingRewardsEl = document.getElementById('pendingRewards');

    if (totalReferralsEl) totalReferralsEl.textContent = stats.totalReferrals;
    if (totalEarningsEl) totalEarningsEl.textContent = `₦ ${stats.totalEarnings.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (pendingRewardsEl) pendingRewardsEl.textContent = `₦ ${stats.pendingRewards.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Load referral history
function loadReferralHistory() {
    const history = JSON.parse(localStorage.getItem('baricoinReferralHistory') || '[]');
    const tbody = document.getElementById('referralHistoryBody');

    if (!tbody) return;

    if (history.length === 0) {
        // Show empty state
        tbody.innerHTML = `
            <tr class="empty-state">
                <td colspan="4">
                    <div class="empty-history">
                        <p>No referrals yet</p>
                        <span>Start sharing your referral code to earn rewards</span>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    // Populate history table
    tbody.innerHTML = history.map(item => `
        <tr>
            <td>${new Date(item.date).toLocaleDateString('en-NG')}</td>
            <td>${item.username}</td>
            <td>₦ ${item.reward.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</td>
            <td><span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span></td>
        </tr>
    `).join('');
}

// Set up copy buttons
function setupCopyButtons() {
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const copyLinkBtn = document.getElementById('copyLinkBtn');

    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const code = document.getElementById('referralCode').textContent;
            copyToClipboard(code, copyCodeBtn);
        });
    }

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            const link = document.getElementById('referralLink').value;
            copyToClipboard(link, copyLinkBtn);
        });
    }
}

// Copy to clipboard function
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const originalHTML = button.innerHTML;
        button.classList.add('copied');
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `;

        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy. Please try again.');
    });
}

// Set up social share buttons
function setupSocialShare() {
    const referralCode = getReferralCode();
    const linkEl = document.getElementById('referralLink');
    const referralLink = linkEl ? linkEl.value : '';
    const shareText = `Join me on Baricoin! Use my referral code ${referralCode} to get started. ${referralLink}`;

    // WhatsApp
    const whatsappBtn = document.getElementById('shareWhatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            window.open(url, '_blank');
        });
    }

    // Twitter
    const twitterBtn = document.getElementById('shareTwitter');
    if (twitterBtn) {
        twitterBtn.addEventListener('click', () => {
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
            window.open(url, '_blank');
        });
    }

    // Telegram
    const telegramBtn = document.getElementById('shareTelegram');
    if (telegramBtn) {
        telegramBtn.addEventListener('click', () => {
            const url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`;
            window.open(url, '_blank');
        });
    }

    // Facebook
    const facebookBtn = document.getElementById('shareFacebook');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
            window.open(url, '_blank');
        });
    }
}

// Add sample referral (for testing)
function addSampleReferral() {
    const history = JSON.parse(localStorage.getItem('baricoinReferralHistory') || '[]');
    history.push({
        date: new Date().toISOString(),
        username: 'testuser@example.com',
        reward: 500,
        status: 'Completed'
    });
    localStorage.setItem('baricoinReferralHistory', JSON.stringify(history));

    const stats = JSON.parse(localStorage.getItem('baricoinReferralStats') || '{"totalReferrals": 0, "totalEarnings": 0, "pendingRewards": 0}');
    stats.totalReferrals += 1;
    stats.totalEarnings += 500;
    localStorage.setItem('baricoinReferralStats', JSON.stringify(stats));

    loadReferralStats();
    loadReferralHistory();
}

console.log('Referral system loaded');
