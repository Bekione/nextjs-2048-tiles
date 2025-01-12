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
  "/gifs/32.gif",
  "/gifs/64.gif",
  "/gifs/128.gif",
  "/gifs/1024.gif",
  "/gifs/2048.gif",
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
      return response || fetch(event.request);
    })
  );
});
