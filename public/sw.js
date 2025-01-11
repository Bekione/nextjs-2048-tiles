const CACHE_NAME = '2048-game-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '2.webp',
  '4.webp',
  '8.webp',
  '16.webp',
  '32.gif',
  '64.gif',
  '128.gif',
  '1028.gif',
  '2048.gif'
  
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

