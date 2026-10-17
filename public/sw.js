// Service worker básico para PWA de Hostal Hudson
const CACHE_NAME = 'hostal-hudson-v1';
const ASSETS = [
  '/',
  '/img/logo.png',
  '/img/slide1.jpg',
  '/img/slide2.jpg',
  '/img/slide3.jpg',
  '/img/slide4.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
