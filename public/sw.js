// Service worker de Hostal Hudson
// Reglas:
// - El HTML NO se cachea en la raíz: servirlo cacheado deja la web sin hidratación
//   tras cada deploy (los chunks con hash dan 404).
// - Navegaciones: red primero, con página offline como respaldo.
// - /_next/static/*: cache-first (archivos con hash, inmutables).
// - /api/*: nunca se cachea (reservas, reseñas, panel admin).
const CACHE_NAME = 'hostal-hudson-v3';
const OFFLINE_URL = '/offline.html';
const PRECACHE = [
  OFFLINE_URL,
  '/img/logo.png',
  '/img/slide1.jpg',
  '/img/slide2.jpg',
  '/img/slide3.jpg',
  '/img/slide4.jpg',
];

const isAsset = (path) =>
  /\.(?:js|css|png|jpe?g|svg|webp|avif|gif|ico|woff2?|ttf|eot|webmanifest|xml|txt)$/i.test(path);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Datos vivos: nunca cachear.
  if (url.pathname.startsWith('/api/')) return;

  // Navegaciones: siempre red primero.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then((cached) => cached || Response.error())
      )
    );
    return;
  }

  // assets con hash: inmutables, cache-first.
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response && response.ok) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
            }
            return response;
          })
      )
    );
    return;
  }

  // resto de estáticos (imágenes, fuentes, manifest): stale-while-revalidate.
  if (isAsset(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const fromNetwork = fetch(request)
            .then((response) => {
              if (response && response.ok) cache.put(request, response.clone());
              return response;
            })
            .catch(() => null);
          return cached || fromNetwork.then((response) => response || Response.error());
        })
      )
    );
    return;
  }

  // sitemap, manifest y otros: red primero con respaldo en caché.
  event.respondWith(
    fetch(request).catch(() => caches.match(request).then((cached) => cached || Response.error()))
  );
});
