// ============================================
// ENHANCED CHAT WIDGET FUNCTIONALITY
// ============================================

let chatOpen = false;
let chatMessages = [];
let isTyping = false;

// Load chat history from localStorage
function loadChatHistory() {
    const stored = localStorage.getItem('baricoinChatHistory');
    if (stored) {
        try {
            chatMessages = JSON.parse(stored);
        } catch (e) {
            chatMessages = [];
        }
    }
}

// Save chat history to localStorage
function saveChatHistory() {
    localStorage.setItem('baricoinChatHistory', JSON.stringify(chatMessages));
}

// Auto-responses for common queries
const autoResponses = {
    balance: {
        keywords: ['balance', 'wallet', 'money', 'funds', 'account'],
        response: 'You can check your balance on the dashboard. To add funds, click on "Deposit" or sell crypto/giftcards to credit your naira wallet. 💰'
    },
    withdraw: {
        keywords: ['withdraw', 'withdrawal', 'cash out', 'transfer'],
        response: 'To withdraw funds, go to your dashboard and click the "Withdraw" button on your Naira wallet. You can choose bank transfer or other available methods. Withdrawals typically process within 1-2 business days. 🏦'
    },
    crypto: {
        keywords: ['crypto', 'bitcoin', 'btc', 'eth', 'ethereum', 'usdt', 'sell crypto'],
        response: 'To sell crypto, navigate to the Crypto page from your dashboard. Select the coin you want to sell, enter the amount, and submit. We offer competitive rates for BTC, ETH, and USDT! 🪙'
    },
    giftcard: {
        keywords: ['giftcard', 'gift card', 'itunes', 'amazon', 'steam'],
        response: 'To sell gift cards, go to the Giftcards page. Select the card type, enter the amount, upload clear images of your card, and submit. We accept various gift cards with instant payment! 🎁'
    },
    support: {
        keywords: ['help', 'support', 'contact', 'issue', 'problem', 'error'],
        response: 'I\'m here to help! For urgent issues, please email support@baricoin.com or call our hotline. For general queries, feel free to ask here and I\'ll do my best to assist you. 📞'
    },
    rates: {
        keywords: ['rate', 'price', 'how much', 'cost'],
        response: 'Our rates are competitive and updated in real-time! Check the Rate Calculator page for current rates on crypto and gift cards. Rates may vary based on market conditions. 📊'
    },
    verification: {
        keywords: ['verify', 'verification', 'kyc', 'identity'],
        response: 'To verify your account, go to Settings and complete the verification process. You\'ll need a valid ID and a selfie. Verification unlocks higher transaction limits! ✅'
    }
};

// Get auto-response based on message content
function getAutoResponse(message) {
    const lowerMessage = message.toLowerCase();

    for (const [key, data] of Object.entries(autoResponses)) {
        if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return data.response;
        }
    }

    return 'Thanks for your message! A support agent will respond shortly. For immediate assistance, please call our hotline or email support@baricoin.com. 😊';
}

// Format timestamp
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Create chat popup HTML
function createChatPopup() {
    const chatPopup = document.createElement('div');
    chatPopup.className = 'chat-popup';
    chatPopup.id = 'chatPopup';
    chatPopup.innerHTML = `
        <div class="chat-header">
            <div class="chat-header-content">
                <h3>Customer Support</h3>
                <p class="chat-status">
                    <span class="status-indicator"></span>
                    Online - We typically reply in under 2 minutes
                </p>
            </div>
            <button class="chat-close-btn" id="chatCloseBtn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="chat-body" id="chatBody">
            <div class="chat-messages" id="chatMessages">
                <!-- Messages will be inserted here -->
            </div>
            <div class="typing-indicator" id="typingIndicator" style="display: none;">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
        <div class="chat-footer">
            <div class="chat-input-wrapper">
                <button class="chat-attachment-btn" id="attachmentBtn" title="Coming soon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                    </svg>
                </button>
                <input type="text" class="chat-input" id="chatInput" placeholder="Type your message...">
                <button class="chat-send-btn" id="chatSendBtn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    `;

    return chatPopup;
}

// Add message to chat
function addMessage(text, sender = 'user') {
    const message = {
        text,
        sender,
        time: new Date()
    };

    chatMessages.push(message);
    saveChatHistory();
    renderMessages();
}

// Render messages
function renderMessages() {
    const messagesEl = document.getElementById('chatMessages');
    if (!messagesEl) return;

    messagesEl.innerHTML = chatMessages.map(msg => `
        <div class="chat-message ${msg.sender}">
            <div class="message-bubble">
                <p>${msg.text}</p>
                <span class="message-time">${formatTime(msg.time)}</span>
            </div>
        </div>
    `).join('');

    // Scroll to bottom
    const chatBody = document.getElementById('chatBody');
    if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// Show typing indicator
function showTyping() {
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) {
        typingEl.style.display = 'flex';
        const chatBody = document.getElementById('chatBody');
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
}

// Hide typing indicator
function hideTyping() {
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) {
        typingEl.style.display = 'none';
    }
}

// Send message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    showTyping();

    // Simulate bot response delay
    setTimeout(() => {
        hideTyping();
        const response = getAutoResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

// Toggle chat popup
function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');

    if (!chatPopup) {
        // Create popup if it doesn't exist
        const popup = createChatPopup();
        document.body.appendChild(popup);

        // Load chat history and render
        loadChatHistory();
        renderMessages();

        // Add close button handler
        setTimeout(() => {
            document.getElementById('chatCloseBtn').addEventListener('click', toggleChat);

            // Add send button handler
            document.getElementById('chatSendBtn').addEventListener('click', sendMessage);

            // Add Enter key handler
            document.getElementById('chatInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            // Add attachment button handler (show coming soon message)
            document.getElementById('attachmentBtn').addEventListener('click', () => {
                addMessage('File upload feature is coming soon! For now, you can describe your issue or email us at support@baricoin.com', 'bot');
            });
        }, 100);
    }

    chatOpen = !chatOpen;
    const popup = document.getElementById('chatPopup');

    if (chatOpen) {
        popup.classList.add('active');
        // Focus input
        setTimeout(() => {
            const input = document.getElementById('chatInput');
            if (input) input.focus();
        }, 100);
    } else {
        popup.classList.remove('active');
    }
}

// Initialize chat widget
document.addEventListener('DOMContentLoaded', () => {
    const chatToggleBtn = document.getElementById('chatToggleBtn');

    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', toggleChat);
    }
});

console.log('Enhanced chat widget loaded');
