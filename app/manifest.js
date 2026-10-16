export default function manifest() {
  return {
    name: 'Hostal Hudson — Puerto Aysén',
    short_name: 'Hostal Hudson',
    description: 'Reserva tu estadía en Puerto Aysén por WhatsApp.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafaf9',
    theme_color: '#164e63',
    lang: 'es-CL',
    icons: [{ src: '/img/logo.png', sizes: 'any', type: 'image/png' }],
  };
}
