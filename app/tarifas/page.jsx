import TarifasClient from '../../components/pages/TarifasClient';
import { SEO, openGraph } from '../../lib/seo';
import { SITE_URL, BUSINESS_ID, RATE_PER_PERSON_NIGHT } from '../../lib/site';

export const metadata = {
  title: { absolute: SEO.tarifas.es.title },
  description: SEO.tarifas.es.description,
  alternates: { canonical: '/tarifas' },
  openGraph: openGraph(SEO.tarifas.es, '/tarifas'),
};

// La tarifa es por persona y noche, no precio de habitación: se modela así
// para no publicar un precio engañoso.
const TARIFAS_LD = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Tarifas de Hostal Hudson',
  url: `${SITE_URL}/tarifas`,
  publisher: { '@id': BUSINESS_ID },
  itemListElement: [
    {
      '@type': 'Offer',
      name: 'Estadía por persona y noche',
      description:
        'Tarifa referencial por persona y noche, con desayuno incluido. La tarifa final se confirma por WhatsApp.',
      price: RATE_PER_PERSON_NIGHT,
      priceCurrency: 'CLP',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/tarifas`,
      seller: { '@id': BUSINESS_ID },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: RATE_PER_PERSON_NIGHT,
        priceCurrency: 'CLP',
        unitText: 'por persona por noche',
      },
    },
  ],
};

export default function TarifasPage() {
  return (
    <>
      <TarifasClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TARIFAS_LD) }}
      />
    </>
  );
}
