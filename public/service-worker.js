const CACHE_NAME = "2048-tiles-cache-v1.0";
let cloudinaryBaseUrl = ""; // Placeholder for dynamic Cloudinary base URL

// Listen for messages from the client
self.addEventListener("message", (event) => {
  if (event.data && event.data.cloudinaryBaseUrl) {
    cloudinaryBaseUrl = event.data.cloudinaryBaseUrl;
    console.log("Cloudinary Base URL set:", cloudinaryBaseUrl);
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files during install");
      return cache.addAll([
        "/", // Static assets
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
      ]);
    })
  );
  self.skipWaiting();
});

// Listen for the uninstall event to clear localStorage
self.addEventListener("uninstall", (event) => {
  event.waitUntil(
    // Inform the client to clear localStorage
    new Promise((resolve) => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ action: "clearLocalStorage" });
        });
      });
      resolve();
    })
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      // Handle dynamic caching for Cloudinary-hosted images
      if (cloudinaryBaseUrl && request.url.startsWith(cloudinaryBaseUrl)) {
        return fetch(request)
          .then((networkResponse) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse.clone());
            });
            return networkResponse;
          })
          .catch(() => caches.match("/fallback-image.png"));
      }

      // Default behavior for other requests
      return fetch(request);
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
