const CACHE_NAME = "2048-tiles-cache-v1";
const urlsToCache = [
  "/",
  "/manifest.webmanifest",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/gifs/2.webp",
  "/gifs/4.webp",
  "/gifs/8.webp",
  "/gifs/16.webp",
  "/gifs/32.webp",
  "/gifs/64.webp",
  "/gifs/128.webp",
  "/gifs/1024.webp",
  "/gifs/2048.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached response if found, or fetch from network
      return (
        response ||
        fetch(event.request).then((networkResponse) => {
          // Optionally cache new requests for future use
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    }).catch(() => {
      // Fallback for failed network fetches (e.g., offline scenarios)
      if (event.request.destination === "image") {
        return caches.match("/fallback-image.png");
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
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
