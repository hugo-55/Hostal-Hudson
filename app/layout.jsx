import './globals.css';
import { Fraunces, Inter } from 'next/font/google';
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

function Nav() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <a className="logo" href="/"><img src="/img/logo.png" alt="Hostal Hudson" /> <span>Hostal Hudson<small>Puerto Aysén · Patagonia</small></span></a>
        <nav className="nav">
          <a href="/">Inicio</a>
          <a href="/habitaciones">Habitaciones</a>
          <a href="/tarifas">Tarifas</a>
          <a href="/galeria">Galería</a>
          <a className="nav-cta" href="/reservas">Reservar</a>
        </nav>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
