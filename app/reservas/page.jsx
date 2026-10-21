import ReservasClient from '../../components/pages/ReservasClient';
import { SEO, openGraph } from '../../lib/seo';
import { SITE_URL, BUSINESS_ID } from '../../lib/site';
import { FAQ_ES } from '../../lib/contenido';

export const metadata = {
  title: { absolute: SEO.reservas.es.title },
  description: SEO.reservas.es.description,
  alternates: { canonical: '/reservas' },
  openGraph: openGraph(SEO.reservas.es, '/reservas'),
};

// El negocio se referencia por @id: la entidad LodgingBusiness se declara
// una sola vez en app/layout.jsx.
const RESERVAS_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Reserva directa en Hostal Hudson',
  serviceType: 'Alojamiento y reservas',
  provider: { '@id': BUSINESS_ID },
  areaServed: { '@type': 'City', name: 'Puerto Aysén' },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${SITE_URL}/reservas`,
    servicePhone: {
      '@type': 'ContactPoint',
      telephone: '+56994391571',
      contactType: 'reservations',
      availableLanguage: ['es', 'en'],
    },
  },
  url: `${SITE_URL}/reservas`,
};

// El FAQ va aquí (y no en el layout) porque el texto marcado tiene que estar
// visible en la misma página. Sale del mismo contenido que se muestra
// (lib/contenido.js), así que nunca se desincroniza.
const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ES.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function ReservasPage() {
  return (
    <>
      <ReservasClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RESERVAS_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />
    </>
  );
}
