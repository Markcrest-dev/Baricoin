// ============================================
// FORGOT PASSWORD FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');
    const resetFormDiv = document.getElementById('resetForm');
    const successStateDiv = document.getElementById('successState');
    const emailInput = document.getElementById('email');
    const sentEmailSpan = document.getElementById('sentEmail');
    const resendLink = document.getElementById('resendLink');

    // Handle form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();

            // Validate email
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }

            // Simulate sending reset email
            sendResetEmail(email);
        });
    }

    // Resend link handler
    if (resendLink) {
        resendLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = sentEmailSpan.textContent;
            sendResetEmail(email);

            // Show feedback
            resendLink.textContent = 'Email sent!';
            setTimeout(() => {
                resendLink.textContent = 'click here to resend';
            }, 3000);
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate sending reset email
function sendResetEmail(email) {
    const resetFormDiv = document.getElementById('resetForm');
    const successStateDiv = document.getElementById('successState');
    const sentEmailSpan = document.getElementById('sentEmail');

    // In a real app, this would make an API call
    // For now, we'll simulate a delay and show success

    // Show loading state
    const submitBtn = document.querySelector('#forgotPasswordForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Hide form, show success
        resetFormDiv.style.display = 'none';
        successStateDiv.style.display = 'block';
        sentEmailSpan.textContent = email;

        // In a real app, you might want to:
        // 1. Send email to backend API
        // 2. Backend generates reset token
        // 3. Backend sends email with reset link
        // 4. User clicks link and is taken to reset-password.html?token=xxx

        console.log('Password reset email sent to:', email);
    }, 1500);
}

// Show error message
function showError(message) {
    const emailInput = document.getElementById('email');

    // Create or update error message
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem;';
        emailInput.parentElement.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
    emailInput.style.borderColor = '#ef4444';

    // Remove error on input
    emailInput.addEventListener('input', () => {
        emailInput.style.borderColor = '';
        if (errorDiv) {
            errorDiv.remove();
        }
    }, { once: true });
}

console.log('Forgot password page loaded');
