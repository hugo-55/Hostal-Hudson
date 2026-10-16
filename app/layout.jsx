import './globals.css';
import { Fraunces, Inter } from 'next/font/google';
import { NavBar } from '../components/NavBar';
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
  return (
    <html lang="es-CL" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
