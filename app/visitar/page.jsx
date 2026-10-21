import VisitarClient from '../../components/pages/VisitarClient';
import { SEO, openGraph } from '../../lib/seo';
import { SITE_URL, BUSINESS_ID } from '../../lib/site';
import { SPOTS_ES } from '../../lib/contenido';

export const metadata = {
  title: { absolute: SEO.visitar.es.title },
  description: SEO.visitar.es.description,
  alternates: { canonical: '/visitar' },
  openGraph: openGraph(SEO.visitar.es, '/visitar'),
};

// Los lugares se declaran como ItemList de TouristAttraction: el hostal no es
// un attraction, es el punto de partida. Los textos salen del mismo contenido
// que se ve en pantalla (lib/contenido.js).
const SPOTS = Object.entries(SPOTS_ES).map(([key, s]) => ({ key, ...s }));

const VISITAR_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Qué visitar desde Hostal Hudson',
  description: 'Lugares para visitar desde el hostal en Puerto Aysén, Patagonia chilena.',
  url: `${SITE_URL}/visitar`,
  publisher: { '@id': BUSINESS_ID },
  numberOfItems: SPOTS.length,
  itemListElement: SPOTS.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'TouristAttraction',
      name: s.name,
      description: s.desc,
      image: `${SITE_URL}${s.img}`,
    },
  })),
};

export default function VisitarPage() {
  return (
    <>
      <VisitarClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(VISITAR_LD) }}
      />
    </>
  );
}
