/** @type {import('next').NextConfig} */

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

const nextConfig = {
  async redirects() {
    if (process.env.CANONICAL_REDIRECT !== '1') return [];
    return [
      {
        source: '/:path*',
        destination: `${CANONICAL}/:path*`,
        permanent: true, // 308
        has: [{ type: 'host', value: VERCEL_HOST }],
      },
    ];
  },
};

module.exports = nextConfig;
