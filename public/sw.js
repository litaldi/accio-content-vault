
// Enhanced Service Worker for offline content access

const CACHE_NAME = 'accio-v2';
const STATIC_CACHE = 'accio-static-v2';
const DYNAMIC_CACHE = 'accio-dynamic-v2';

// Static resources to cache
const staticAssets = [
  '/',
  '/save',
  '/dashboard',
  '/offline',
  '/search',
  '/collections'
];

// Dynamic content patterns
const contentPatterns = [
  /\/api\/content/,
  /\.(jpg|jpeg|png|gif|webp|svg)$/,
  /\.(pdf|doc|docx)$/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(staticAssets);
      }),
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('[SW] Dynamic cache initialized');
        return cache;
      })
    ])
  );
  
  // Force activation of new service worker
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages
      return self.clients.claim();
    })
  );
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Skip requests to other domains (except for content)
  if (url.origin !== self.location.origin && !isContentRequest(request)) {
    return;
  }

  event.respondWith(handleRequest(request));
});

// Handle different types of requests
async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Static assets - cache first
    if (isStaticAsset(request)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Content requests - network first with cache fallback
    if (isContentRequest(request)) {
      return await networkFirstWithCache(request, DYNAMIC_CACHE);
    }
    
    // API requests - network first
    if (isAPIRequest(request)) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }
    
    // Default: network first for navigation
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('[SW] Request failed:', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE);
      const offlinePage = await cache.match('/offline');
      return offlinePage || new Response('Offline', { status: 503 });
    }
    
    // Return generic offline response
    return new Response('Offline', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Cache strategies
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    console.log('[SW] Cache hit:', request.url);
    return cached;
  }
  
  console.log('[SW] Cache miss, fetching:', request.url);
  const response = await fetch(request);
  
  if (response.ok) {
    cache.put(request, response.clone());
  }
  
  return response;
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}

async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      // Clone the response before caching
      cache.put(request, response.clone());
      console.log('[SW] Cached content:', request.url);
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed for content, trying cache:', request.url);
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      console.log('[SW] Serving cached content:', request.url);
      return cached;
    }
    
    throw error;
  }
}

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url);
  return staticAssets.some(path => url.pathname === path) ||
         url.pathname.includes('/assets/') ||
         url.pathname.includes('/node_modules/') ||
         /\.(css|js|woff|woff2|ttf|eot)$/.test(url.pathname);
}

function isContentRequest(request) {
  const url = new URL(request.url);
  return contentPatterns.some(pattern => pattern.test(url.pathname)) ||
         url.pathname.includes('/content/') ||
         url.searchParams.has('content') ||
         request.headers.get('accept')?.includes('image/') ||
         request.headers.get('accept')?.includes('application/pdf');
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') ||
         url.pathname.includes('/supabase/') ||
         url.hostname.includes('supabase');
}

// Handle share targets
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHARE_TARGET') {
    const { url, title, text } = event.data;
    
    // Open the app with shared data
    const shareUrl = `/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || '')}&text=${encodeURIComponent(text || '')}`;
    
    event.waitUntil(
      clients.openWindow(shareUrl)
    );
  }
  
  // Handle manual cache updates
  if (event.data && event.data.type === 'CACHE_CONTENT') {
    const { url } = event.data;
    event.waitUntil(
      cacheContent(url)
    );
  }
});

// Manual content caching
async function cacheContent(url) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = await fetch(url);
    
    if (response.ok) {
      await cache.put(url, response);
      console.log('[SW] Manually cached:', url);
    }
  } catch (error) {
    console.error('[SW] Failed to cache content:', error);
  }
}

// Periodic cache cleanup
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEANUP_CACHE') {
    event.waitUntil(cleanupCache());
  }
});

async function cleanupCache() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
  const now = Date.now();
  
  for (const request of requests) {
    const response = await cache.match(request);
    const dateHeader = response?.headers.get('date');
    
    if (dateHeader) {
      const age = now - new Date(dateHeader).getTime();
      if (age > maxAge) {
        await cache.delete(request);
        console.log('[SW] Cleaned up old cache entry:', request.url);
      }
    }
  }
}
