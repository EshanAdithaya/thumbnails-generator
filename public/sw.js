// Simple service worker for ThumbGen
const CACHE_NAME = 'thumb-gen-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Optional: Add offline support
self.addEventListener('fetch', (event) => {
  // For now, just fetch normally
  event.respondWith(fetch(event.request));
});