const CACHE = 'mc-v2';
const CACHE_FILES = [
  '/Minecraft/',
  '/Minecraft/index.html',
  '/Minecraft/game.html',
  '/Minecraft/icons/icon-192.png',
  '/Minecraft/icons/icon-512.png',
  '/Minecraft/icons/icon-180.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(CACHE_FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(k => k \!== CACHE).map(k => caches.delete(k)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});