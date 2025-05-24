
// Service Worker for handling share targets

const CACHE_NAME = 'accio-v1';
const urlsToCache = [
  '/',
  '/save',
  '/dashboard'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Handle share target
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHARE_TARGET') {
    const { url, title, text } = event.data;
    
    // Open the app with shared data
    const shareUrl = `/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || '')}&text=${encodeURIComponent(text || '')}`;
    
    event.waitUntil(
      clients.openWindow(shareUrl)
    );
  }
});
