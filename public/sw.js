// Recipe Box service worker
// Kept intentionally minimal: its main job is to satisfy the browser's
// installability requirement. It does not cache or intercept API calls
// to your Worker, so recipes and photos always come straight from the network.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Intentionally no event.respondWith() — every request falls through to
  // normal network handling. This listener's presence is what lets browsers
  // treat the app as installable.
});
