import HabitacionesClient from '../../components/pages/HabitacionesClient';
import { SEO, openGraph } from '../../lib/seo';
import { SITE_URL, BUSINESS_ID } from '../../lib/site';
import { ROOM_CARDS_ES } from '../../lib/contenido';

export const metadata = {
  title: { absolute: SEO.habitaciones.es.title },
  description: SEO.habitaciones.es.description,
  alternates: { canonical: '/habitaciones' },
  openGraph: openGraph(SEO.habitaciones.es, '/habitaciones'),
};

// Los nombres y las fotos salen del mismo contenido que se ve en pantalla
// (lib/contenido.js): el texto marcado tiene que coincidir con el visible.
const HABITACIONES_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Habitaciones de Hostal Hudson',
  numberOfItems: ROOM_CARDS_ES.length,
  publisher: { '@id': BUSINESS_ID },
  itemListElement: ROOM_CARDS_ES.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Accommodation',
      name: r.name,
      description: r.desc,
      image: `${SITE_URL}${r.img}`,
      containedInPlace: { '@id': BUSINESS_ID },
    },
  })),
};

export default function HabitacionesPage() {
  return (
    <>
      <HabitacionesClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HABITACIONES_LD) }}
      />
    </>
  );
}
