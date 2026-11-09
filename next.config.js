/** @type {import('next').NextConfig} */

// En el tablet (ProRoot) un archivo LOCAL next.config.tablet.js (gitignored)
// agrega experimental.useWasmBinary, porque el binario nativo de SWC no corre.
// Si ese archivo no existe (PC, Vercel), el require falla y tablet queda vacío:
// el config committable no lleva nada del parche WASM.
const tablet = (() => {
  try { return require('./next.config.tablet.js'); } catch { return {}; }
})();

// Dominio canónico (ver lib/site.js). El .vercel.app es una URL alterna:
// cuando el dominio real ya está apuntando a este proyecto, el .vercel.app
// debe redirigir (308) al canónico para no tener dos URLs para el mismo sitio.
//
// IMPORTANTE: el redirect está apagado por defecto (CANONICAL_REDIRECT=1 lo
// enciende) porque antes del cutover el dominio real lo sirve el sitio
// anterior, y mandaría al .vercel.app de vuelta al sitio viejo. Se enciende
// el mismo día del corte. Ver PUBLICAR-DOMINIO.md.
const CANONICAL = 'https://www.hostalhudson.cl';
const VERCEL_HOST = 'hostal-hudson.vercel.app';

// Redirecciones permanentes del sitio viejo (Joomla) al sitio nuevo.
// Tarea T-014. El sitio viejo sirve el contenido en español sin prefijo y el
// inglés con /index.php/en/, con slugs técnicos de menú (p. ej. /index.php/2016-01-15-14-52-35).
// Tabla URL vieja → página nueva:
//   /index.php/ y /index.php/en/                        (portada)        → /
//   /index.php/{,en/}2016-01-15-14-52-35 (Habitaciones)                  → /habitaciones
//   /index.php/{,en/}2016-01-15-14-53-28 (Tarifas)                       → /tarifas
//   /index.php/{,en/}2016-01-15-14-54-32 (Servicios, hoy en la portada)  → /
//   /index.php/{,en/}2016-01-15-14-55-57 (Qué Visitar)                   → /visitar
//   /index.php/{,en/}2016-01-15-14-56-39 (Galería)                       → /galeria
//   /index.php/{,en/}2016-01-15-14-57-08 (Comentarios, hoy en portada)   → /
//   /index.php/{,en/}contact             (Reservas)                      → /reservas
// Lo que no aguante arriba (feeds RSS, búsqueda, variaciones nuevas) cae al
// catch-all /index.php/:path* → /. No se tocan /admin ni /api.
const REDIRECTS_JOOMLA = [
  { source: '/index.php/en/contact', destination: '/reservas', permanent: true },
  { source: '/index.php/contact', destination: '/reservas', permanent: true },
  { source: '/index.php/en/2016-01-15-14-52-35', destination: '/habitaciones', permanent: true },
  { source: '/index.php/2016-01-15-14-52-35', destination: '/habitaciones', permanent: true },
  { source: '/index.php/en/2016-01-15-14-53-28', destination: '/tarifas', permanent: true },
  { source: '/index.php/2016-01-15-14-53-28', destination: '/tarifas', permanent: true },
  { source: '/index.php/en/2016-01-15-14-54-32', destination: '/', permanent: true },
  { source: '/index.php/2016-01-15-14-54-32', destination: '/', permanent: true },
  { source: '/index.php/en/2016-01-15-14-55-57', destination: '/visitar', permanent: true },
  { source: '/index.php/2016-01-15-14-55-57', destination: '/visitar', permanent: true },
  { source: '/index.php/en/2016-01-15-14-56-39', destination: '/galeria', permanent: true },
  { source: '/index.php/2016-01-15-14-56-39', destination: '/galeria', permanent: true },
  { source: '/index.php/en/2016-01-15-14-57-08', destination: '/', permanent: true },
  { source: '/index.php/2016-01-15-14-57-08', destination: '/', permanent: true },
  { source: '/index.php/en', destination: '/', permanent: true },
  { source: '/index.php', destination: '/', permanent: true },
  // Catch-all SIEMPRE al final: los específicos van antes.
  { source: '/index.php/:path*', destination: '/', permanent: true },
];

// Cabeceras de seguridad. La CSP es conservadora: el 'unsafe-inline' de
// script-src responde al JSON-LD inline (app/layout.jsx y páginas, script
// type="application/ld+json") y al registro del service worker, que Next
// mantiene inline. https://va.vercel-scripts.com es el script de Vercel
// Analytics (app/layout.jsx); ese script envía sus beacons a
// https://va.vercel-insights.com (por eso va en connect-src). base-uri y
// form-action quedan limitados al origen propio. Se valida visualmente en
// staging antes del cutover.
const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.open-meteo.com https://docs.google.com https://script.google.com https://script.googleusercontent.com https://va.vercel-insights.com; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; base-uri 'self'; form-action 'self'";

const nextConfig = {
  experimental: {
    ...(tablet.experimental || {}),
  },
  async redirects() {
    // Primero el canónico (.vercel.app → dominio real, solo el día del corte)
    // y luego el mapeo del sitio viejo, con los específicos antes del catch-all.
    // /api y /admin quedan excluidos del redirect canónico.
    const base = [...REDIRECTS_JOOMLA];
    if (process.env.CANONICAL_REDIRECT !== '1') return base;
    return [
      {
        source: '/:path((?!api(?:/|$)|admin(?:/|$)).*)',
        destination: `${CANONICAL}/:path`,
        permanent: true, // 308
        has: [{ type: 'host', value: VERCEL_HOST }],
      },
      ...base,
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
