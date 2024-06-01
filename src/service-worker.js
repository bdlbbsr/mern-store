/* eslint-disable no-restricted-globals */

// Install a service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Cache necessary files during installation
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js',
        // add other assets you want to cache
      ]);
    })
  );
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  const cacheWhitelist = ['my-cache'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
