/**
 * Baricoin Notification System
 * Handles notification rendering, filtering, and management
 */

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.filter = 'all';
        this.unreadCount = 0;
        this.init();
    }

    init() {
        // Load notifications (simulated data for now)
        this.loadNotifications();

        // Render initial state
        this.renderNotifications();
        this.updateUnreadCount();

        // Setup event listeners
        this.setupEventListeners();
    }

    loadNotifications() {
        // Simulated notification data
        // In a real app, this would come from an API
        this.notifications = [
            {
                id: 1,
                type: 'success',
                category: 'transactions',
                title: 'Deposit Successful',
                message: 'Your deposit of ₦50,000 has been successfully credited to your wallet.',
                time: '2 mins ago',
                read: false,
                icon: '💰'
            },
            {
                id: 2,
                type: 'info',
                category: 'system',
                title: 'System Maintenance',
                message: 'Scheduled maintenance will occur on Dec 5th from 2:00 AM to 4:00 AM.',
                time: '1 hour ago',
                read: false,
                icon: '🛠️'
            },
            {
                id: 3,
                type: 'warning',
                category: 'account',
                title: 'Security Alert',
                message: 'New login detected from a new device (iPhone 13).',
                time: '3 hours ago',
                read: true,
                icon: '🔒'
            },
            {
                id: 4,
                type: 'error',
                category: 'transactions',
                title: 'Transaction Failed',
                message: 'Your airtime purchase of ₦1,000 failed. Amount has been refunded.',
                time: '5 hours ago',
                read: true,
                icon: '❌'
            },
            {
                id: 5,
                type: 'success',
                category: 'promotions',
                title: 'Bonus Received',
                message: 'You received a ₦500 bonus for referring a friend!',
                time: '1 day ago',
                read: true,
                icon: '🎁'
            },
            {
                id: 6,
                type: 'info',
                category: 'system',
                title: 'New Feature: Dark Mode',
                message: 'Try out the new Dark Mode in settings for a better night-time experience.',
                time: '2 days ago',
                read: true,
                icon: '🌙'
            }
        ];
    }

    setupEventListeners() {
        // Filter tabs
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');

                // Update filter and render
                this.filter = e.target.dataset.filter;
                this.renderNotifications();
            });
        });

        // Mark all as read button
        const markAllBtn = document.getElementById('markAllReadBtn');
        if (markAllBtn) {
            markAllBtn.addEventListener('click', () => {
                this.markAllAsRead();
            });
        }
    }

    getFilteredNotifications() {
        if (this.filter === 'all') {
            return this.notifications;
        } else if (this.filter === 'unread') {
            return this.notifications.filter(n => !n.read);
        } else {
            return this.notifications.filter(n => n.category === this.filter);
        }
    }

    renderNotifications() {
        const container = document.getElementById('notificationsList');
        const emptyState = document.getElementById('notificationsEmpty');

        if (!container) return;

        const filtered = this.getFilteredNotifications();

        if (filtered.length === 0) {
            container.style.display = 'none';
            if (emptyState) emptyState.style.display = 'flex';
            return;
        }

        container.style.display = 'flex';
        if (emptyState) emptyState.style.display = 'none';

        container.innerHTML = filtered.map(notification => `
            <div class="notification-card ${notification.read ? 'read' : 'unread'} ${notification.type}" onclick="notificationSystem.markAsRead(${notification.id})">
                <div class="notification-icon-wrapper">
                    <span class="notification-icon">${notification.icon}</span>
                </div>
                <div class="notification-content">
                    <div class="notification-header">
                        <h3 class="notification-title">${notification.title}</h3>
                        <span class="notification-time">${notification.time}</span>
                    </div>
                    <p class="notification-message">${notification.message}</p>
                </div>
                ${!notification.read ? '<div class="notification-dot"></div>' : ''}
            </div>
        `).join('');
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            this.updateUnreadCount();
            this.renderNotifications();

            // Optional: Show toast or feedback
            console.log(`Notification ${id} marked as read`);
        }
    }

    markAllAsRead() {
        let changed = false;
        this.notifications.forEach(n => {
            if (!n.read) {
                n.read = true;
                changed = true;
            }
        });

        if (changed) {
            this.updateUnreadCount();
            this.renderNotifications();
            alert('All notifications marked as read');
        }
    }

    updateUnreadCount() {
        this.unreadCount = this.notifications.filter(n => !n.read).length;

        // Update badge if it exists (e.g., in sidebar or header)
        // This selector might need adjustment based on actual HTML
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            if (this.unreadCount > 0) {
                badge.textContent = this.unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    }
}

// Initialize notification system
const notificationSystem = new NotificationSystem();
window.notificationSystem = notificationSystem;
