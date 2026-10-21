// Única fuente del manifest PWA. Next inyecta el <link rel="manifest"> automáticamente,
// por eso no debe existir también public/manifest.webmanifest (provoca error 500).
export default function manifest() {
  return {
    name: 'Hostal Hudson — Puerto Aysén',
    short_name: 'Hostal Hudson',
    description:
      'Reserva tu estadía en Puerto Aysén por WhatsApp. Desayuno incluido, recepción 24 h, frente al río Aysén.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#fafaf9',
    theme_color: '#164e63',
    lang: 'es-CL',
    dir: 'ltr',
    categories: ['lodging', 'travel', 'hotel'],
    icons: [
      { src: '/img/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/img/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      { src: '/img/logo.png', sizes: 'any', type: 'image/png', purpose: 'any' },
    ],
    screenshots: [
      {
        src: '/img/slide1.jpg',
        sizes: '1920x850',
        type: 'image/jpeg',
        label: 'Hostal Hudson frente al río Aysén',
        form_factor: 'wide',
      },
    ],
    shortcuts: [
      {
        name: 'Reservar',
        url: '/reservas',
        description: 'Reserva por WhatsApp en 1 minuto',
        icons: [{ src: '/img/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'Habitaciones',
        url: '/habitaciones',
        description: 'Ver habitaciones disponibles',
        icons: [{ src: '/img/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'Tarifas',
        url: '/tarifas',
        description: 'Tarifas y formas de pago',
        icons: [{ src: '/img/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
    ],
  };
}
