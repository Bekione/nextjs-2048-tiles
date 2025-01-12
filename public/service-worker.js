const CACHE_NAME = "2048-tiles-cache-v1.0";
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
      console.log("Caching files during install:", urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Immediately activate the new service worker
});

// Fetch and serve cached resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((networkResponse) => {
          // Cache new resources dynamically
          if (event.request.url.includes("/gifs/")) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
      );
    }).catch(() => {
      // Fallback for GIFs when offline
      if (event.request.destination === "image") {
        return caches.match("/fallback-image.png");
      }
    })
  );
});

// Activate and clear old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
