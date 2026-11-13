const CACHE_NAME = 'akumu-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/settings.html',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

self.addEventListener('activate', e => {
  caches.keys().then(keys => {
    keys.forEach(key => { if (key !== CACHE_NAME) caches.delete(key); });
  });
});