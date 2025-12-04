// Baricoin Service Worker
// Version 1.0.0

const CACHE_VERSION = 'baricoin-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const OFFLINE_PAGE = '/offline.html';

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
    // Offline fallback
    '/offline.html',

    // Core HTML pages
    '/dashboard.html',
    '/transactions.html',
    '/crypto.html',
    '/giftcards.html',
    '/settings.html',

    // CSS files
    '/css/style.css',
    '/css/dashboard.css',

    // JavaScript files
    '/js/theme.js',
    '/js/i18n.js',
    '/js/rates.js',
    '/js/charts.js',
    '/js/search.js',
    '/js/pwa.js',

    // Essential images
    '/images/logo.png',
    '/images/favicon.png',

    // Fonts (if external, they'll be cached dynamically)
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[ServiceWorker] Pre-caching static assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('[ServiceWorker] Installation complete');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('[ServiceWorker] Pre-cache failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete old caches that don't match current version
                        if (cacheName.startsWith('baricoin-') && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Activation complete');
                return self.clients.claim(); // Take control immediately
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome extensions and other protocols
    if (!url.protocol.startsWith('http')) {
        return;
    }

    event.respondWith(
        handleFetch(request)
    );
});

// Fetch handling strategy
async function handleFetch(request) {
    const url = new URL(request.url);

    // Strategy 1: Cache-first for static assets (CSS, JS, images)
    if (isStaticAsset(url.pathname)) {
        return cacheFirst(request);
    }

    // Strategy 2: Network-first for HTML pages (with cache fallback)
    if (isHTMLPage(url.pathname)) {
        return networkFirst(request);
    }

    // Strategy 3: Network-first for external resources (APIs, CDNs)
    if (url.origin !== location.origin) {
        return networkFirst(request);
    }

    // Default: Network-first
    return networkFirst(request);
}

// Cache-first strategy: Try cache, fallback to network
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            console.log('[ServiceWorker] Cache hit:', request.url);
            return cachedResponse;
        }

        console.log('[ServiceWorker] Cache miss, fetching:', request.url);
        const networkResponse = await fetch(request);

        // Cache the new response for future use
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('[ServiceWorker] Cache-first failed:', error);
        return new Response('Offline - Resource not available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Network-first strategy: Try network, fallback to cache
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);

        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('[ServiceWorker] Network failed, trying cache:', request.url);

        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        // If HTML page and not cached, show offline page
        if (isHTMLPage(new URL(request.url).pathname)) {
            const offlineResponse = await caches.match(OFFLINE_PAGE);
            if (offlineResponse) {
                return offlineResponse;
            }
        }

        return new Response('Offline - No cached version available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Helper: Check if request is for static asset
function isStaticAsset(pathname) {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.woff', '.woff2', '.ttf', '.eot'];
    return staticExtensions.some(ext => pathname.endsWith(ext));
}

// Helper: Check if request is for HTML page
function isHTMLPage(pathname) {
    return pathname === '/' || pathname.endsWith('.html');
}

// Message event - handle commands from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName.startsWith('baricoin-')) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    }
});
