// Baricoin PWA Manager
// Handles service worker registration, installation prompts, and network status

class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.swRegistration = null;
        this.isOnline = navigator.onLine;

        this.init();
    }

    async init() {
        // Check if already installed
        this.checkInstallStatus();

        // Register service worker
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }

        // Listen for install prompt
        this.setupInstallPrompt();

        // Monitor network status
        this.setupNetworkMonitoring();

        // Check for updates periodically
        this.setupUpdateCheck();
    }

    // Register the service worker
    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            this.swRegistration = registration;

            console.log('[PWA] Service Worker registered:', registration);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        this.showUpdateNotification();
                    }
                });
            });

        } catch (error) {
            console.error('[PWA] Service Worker registration failed:', error);
        }
    }

    // Setup install prompt capture
    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent default install prompt
            e.preventDefault();

            // Store for later use
            this.deferredPrompt = e;

            console.log('[PWA] Install prompt available');

            // Show custom install UI if on dashboard
            if (window.location.pathname.includes('dashboard')) {
                this.showInstallBanner();
            }
        });

        // Track successful installation
        window.addEventListener('appinstalled', () => {
            console.log('[PWA] App installed successfully');
            this.isInstalled = true;
            this.hideInstallBanner();

            // Store installation status
            localStorage.setItem('pwa-installed', 'true');

            // Track installation
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pwa_install', {
                    method: 'browser'
                });
            }
        });
    }

    // Show install banner
    showInstallBanner() {
        // Check if already dismissed or installed
        if (localStorage.getItem('pwa-install-dismissed') === 'true' ||
            localStorage.getItem('pwa-installed') === 'true') {
            return;
        }

        const banner = document.createElement('div');
        banner.id = 'pwa-install-banner';
        banner.className = 'pwa-install-banner';
        banner.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-icon">
          <img src="/images/icons/icon-72.png" alt="Baricoin">
        </div>
        <div class="pwa-banner-text">
          <strong>Install Baricoin</strong>
          <p>Get quick access and work offline</p>
        </div>
        <div class="pwa-banner-actions">
          <button class="pwa-btn-install">Install</button>
          <button class="pwa-btn-dismiss">✕</button>
        </div>
      </div>
    `;

        document.body.appendChild(banner);

        // Setup event listeners
        banner.querySelector('.pwa-btn-install').addEventListener('click', () => {
            this.promptInstall();
        });

        banner.querySelector('.pwa-btn-dismiss').addEventListener('click', () => {
            this.hideInstallBanner();
            localStorage.setItem('pwa-install-dismissed', 'true');
        });

        // Animate in
        setTimeout(() => banner.classList.add('show'), 100);
    }

    // Hide install banner
    hideInstallBanner() {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        }
    }

    // Prompt user to install
    async promptInstall() {
        if (!this.deferredPrompt) {
            console.log('[PWA] Install prompt not available');
            return false;
        }

        // Show the install prompt
        this.deferredPrompt.prompt();

        // Wait for user response
        const { outcome } = await this.deferredPrompt.userChoice;

        console.log('[PWA] User choice:', outcome);

        if (outcome === 'accepted') {
            this.hideInstallBanner();
        }

        // Clear the deferred prompt
        this.deferredPrompt = null;

        return outcome === 'accepted';
    }

    // Check if app is already installed
    checkInstallStatus() {
        // Check display mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isInstalled = localStorage.getItem('pwa-installed') === 'true';

        this.isInstalled = isStandalone || isInstalled;

        if (this.isInstalled) {
            console.log('[PWA] App is installed');
        }
    }

    // Setup network status monitoring
    setupNetworkMonitoring() {
        const updateOnlineStatus = () => {
            const wasOffline = !this.isOnline;
            this.isOnline = navigator.onLine;

            console.log('[PWA] Network status:', this.isOnline ? 'Online' : 'Offline');

            // Update UI
            this.updateNetworkIndicator();

            // Show notification when coming back online
            if (wasOffline && this.isOnline) {
                this.showToast('Back online!', 'success');
            } else if (!this.isOnline) {
                this.showToast('You are offline', 'warning');
            }

            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('networkstatuschange', {
                detail: { online: this.isOnline }
            }));
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Initial check
        updateOnlineStatus();
    }

    // Update network status indicator in UI
    updateNetworkIndicator() {
        let indicator = document.getElementById('network-status-indicator');

        if (!indicator && !this.isOnline) {
            // Create indicator if offline
            indicator = document.createElement('div');
            indicator.id = 'network-status-indicator';
            indicator.className = 'network-status-indicator offline';
            indicator.innerHTML = `
        <span class="status-dot"></span>
        <span class="status-text">Offline Mode</span>
      `;
            document.body.appendChild(indicator);

            setTimeout(() => indicator.classList.add('show'), 100);
        } else if (indicator && this.isOnline) {
            // Remove indicator if online
            indicator.classList.remove('show');
            setTimeout(() => indicator.remove(), 300);
        }
    }

    // Show update notification
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'pwa-update-notification';
        notification.innerHTML = `
      <div class="update-content">
        <span>🎉 A new version is available!</span>
        <button class="btn-update">Update Now</button>
      </div>
    `;

        document.body.appendChild(notification);

        notification.querySelector('.btn-update').addEventListener('click', () => {
            this.updateApp();
        });

        setTimeout(() => notification.classList.add('show'), 100);
    }

    // Update the app
    async updateApp() {
        if (!this.swRegistration || !this.swRegistration.waiting) {
            return;
        }

        // Tell the service worker to skip waiting
        this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });

        // Reload when the new service worker takes control
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }

    // Setup periodic update checks
    setupUpdateCheck() {
        // Check for updates every 60 minutes
        setInterval(() => {
            if (this.swRegistration) {
                this.swRegistration.update();
            }
        }, 60 * 60 * 1000);
    }

    // Clear all caches (for settings page)
    async clearCache() {
        try {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            );

            console.log('[PWA] All caches cleared');
            this.showToast('Cache cleared successfully', 'success');

            // Reload the page
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error('[PWA] Failed to clear cache:', error);
            this.showToast('Failed to clear cache', 'error');
        }
    }

    // Show toast notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `pwa-toast pwa-toast-${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Get installation status
    getInstallStatus() {
        return {
            isInstalled: this.isInstalled,
            canInstall: this.deferredPrompt !== null,
            isOnline: this.isOnline
        };
    }
}

// Initialize PWA Manager
const pwaManager = new PWAManager();

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.pwaManager = pwaManager;
}
