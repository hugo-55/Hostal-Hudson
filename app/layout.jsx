import './globals.css';
import { Fraunces, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { NavBar } from '../components/NavBar';
import { StickyBook } from '../components/Widgets';
import { LangProvider } from '../lib/i18n';
import { CookieConsent } from '../components/CookieConsent';
import { SITE_URL } from '../lib/site';

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
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Hostal Hudson',
    title: 'Hostal Hudson — Descansa frente al río Aysén',
    description: 'Alojamiento familiar en Puerto Aysén. Reserva por WhatsApp en 1 minuto.',
    images: [{ url: `${SITE_URL}/img/slide1.jpg`, width: 1200, height: 800 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hostal Hudson — Descansa frente al río Aysén',
    description: 'Alojamiento familiar en Puerto Aysén. Reserva por WhatsApp en 1 minuto.',
    images: [`${SITE_URL}/img/slide1.jpg`],
  },
};

export const viewport = {
  themeColor: '#164e63',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
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
    priceRange: '$$',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratis' },
      { '@type': 'LocationFeatureSpecification', name: 'Desayuno incluido' },
      { '@type': 'LocationFeatureSpecification', name: 'Estacionamiento' },
    ],
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '¿A qué hora puedo llegar?', acceptedAnswer: { '@type': 'Answer', text: 'Recepción 24 h con entrega de llaves, sin restricción de horario.' } },
      { '@type': 'Question', name: '¿Cómo confirmo mi reserva?', acceptedAnswer: { '@type': 'Answer', text: 'Por WhatsApp y transferencia al Banco BCI con comprobante.' } },
      { '@type': 'Question', name: '¿Incluye desayuno y estacionamiento?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, ambos incluidos sin costo adicional.' } },
    ],
  };
  return (
    <html lang="es-CL" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Hostal Hudson" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#164e63" />
        <link rel="apple-touch-icon" href="/img/logo.png" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <LangProvider>
          <NavBar />
          {children}
          <StickyBook />
          <CookieConsent />
        </LangProvider>
        <Analytics />
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
      </body>
    </html>
  );
}
