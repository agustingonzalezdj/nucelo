const CACHE = 'nucleo-v10';

self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Sin caché — siempre red. Así cada cambio llega inmediatamente.
self.addEventListener('fetch', e => {
  if (e.request.url.includes('anthropic.com')) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
