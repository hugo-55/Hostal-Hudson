import './globals.css';
import { Fraunces, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { NavBar } from '../components/NavBar';
import { StickyBook } from '../components/Widgets';
import { LangProvider } from '../lib/i18n';
import { CookieConsent } from '../components/CookieConsent';
import { SITE_URL, BUSINESS_ID, MAPS_URL, OG_IMAGE } from '../lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700'] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hostal Hudson — Alojamiento en Puerto Aysén',
    template: '%s | Hostal Hudson',
  },
  description:
    'Hostal familiar en pleno centro de Puerto Aysén, frente al río y a 2 cuadras de la plaza. Wi-Fi gratis, desayuno incluido, recepción 24 h. Reserva por WhatsApp.',
  keywords: ['hostal puerto aysén', 'alojamiento aysén', 'hospedaje patagonia', 'hostal hudson'],
  authors: [{ name: 'Hostal Hudson' }],
  creator: 'Hostal Hudson',
  publisher: 'Hostal Hudson',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Hostal Hudson',
    title: 'Hostal Hudson — Descansa frente al río Aysén',
    description: 'Alojamiento familiar en Puerto Aysén. Reserva por WhatsApp en 1 minuto.',
    images: [OG_IMAGE],
  },
  // Sin bloque "twitter": Next lo arma solo con el openGraph de cada página
  // (si lo definiéramos acá, se copiaría el título de la portada a todas).
  // Mientras el sitio anterior siga publicado en el dominio, el sitio nuevo
  // queda en noindex (SITE_PREVIEW=1). Se quita el día del cutover.
  // Ojo: /admin define su propio robots y no se ve afectado.
  robots:
    process.env.SITE_PREVIEW === '1'
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

export const viewport = {
  themeColor: '#164e63',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  // El service worker solo en producción: en dev sirve contenido viejo y rompe el hot reload.
  const isProd = process.env.NODE_ENV === 'production';
  // Entidad canónica del negocio: las páginas la referencian con {"@id": BUSINESS_ID}
  // en vez de volver a declararla (Google ignoraba los datos duplicados).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': BUSINESS_ID,
    name: 'Hostal Hudson',
    description: 'Hostal familiar en Puerto Aysén frente al río, con desayuno incluido y recepción 24 h.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teniente Merino 1080',
      addressLocality: 'Puerto Aysén',
      addressRegion: 'Aysén',
      addressCountry: 'CL',
    },
    telephone: '+56994391571',
    url: SITE_URL,
    hasMap: MAPS_URL,
    priceRange: '$$',
    sameAs: ['https://www.hostalhudson.cl'],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratis' },
      { '@type': 'LocationFeatureSpecification', name: 'Desayuno incluido' },
      { '@type': 'LocationFeatureSpecification', name: 'Estacionamiento' },
      { '@type': 'LocationFeatureSpecification', name: 'Recepción 24 h' },
    ],
  };
  // El FAQPage se emite en app/reservas/page.jsx: Google exige que el texto
  // marcado esté visible en la misma página.
  return (
    <html lang="es-CL" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Hostal Hudson" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#164e63" />
        <link rel="apple-touch-icon" href="/img/icon-192.png" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LangProvider>
          <NavBar />
          {children}
          <StickyBook />
          <CookieConsent />
        </LangProvider>
        <Analytics />
        {isProd && (
          <script
            id="sw-register"
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js').then((reg) => {
                      console.log('SW registered:', reg.scope);
                    }).catch((err) => {
                      console.log('SW registration failed:', err);
                    });
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
