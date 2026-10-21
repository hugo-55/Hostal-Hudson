import GuiaClient from '../../components/pages/GuiaClient';
import { SEO, openGraph } from '../../lib/seo';
import { SITE_URL, BUSINESS_ID } from '../../lib/site';

export const metadata = {
  title: { absolute: SEO.guia.es.title },
  description: SEO.guia.es.description,
  alternates: { canonical: '/guia' },
  openGraph: openGraph(SEO.guia.es, '/guia', { type: 'article' }),
};

const GUIA_LD = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Guía Aysén — Hostal Hudson',
  description: 'Guía de viaje de Puerto Aysén: consejos prácticos para viajeros.',
  url: `${SITE_URL}/guia`,
  inLanguage: 'es-CL',
  publisher: { '@id': BUSINESS_ID },
  blogPost: [
    {
      '@type': 'BlogPosting',
      headline: 'Cómo llegar a Puerto Aysén',
      description: 'Avión a Balmaceda + transfer, o la Carretera Austral por tierra.',
      image: `${SITE_URL}/img/gal-quevisitar-camino.jpg`,
      author: { '@id': BUSINESS_ID },
      publisher: { '@id': BUSINESS_ID },
      mainEntityOfPage: `${SITE_URL}/guia`,
    },
    {
      '@type': 'BlogPosting',
      headline: 'Qué llevar en la mochila',
      description: 'El clima cambia 3 veces al día: capas, cortaviento e impermeable.',
      image: `${SITE_URL}/img/gal-quevisitar-cascada.jpg`,
      author: { '@id': BUSINESS_ID },
      publisher: { '@id': BUSINESS_ID },
      mainEntityOfPage: `${SITE_URL}/guia`,
    },
    {
      '@type': 'BlogPosting',
      headline: 'Aysén en 3 días desde el hostal',
      description: 'Día 1 ciudad, día 2 agua y bosque, día 3 Carretera Austral.',
      image: `${SITE_URL}/img/gal-quevisitar-puente.jpg`,
      author: { '@id': BUSINESS_ID },
      publisher: { '@id': BUSINESS_ID },
      mainEntityOfPage: `${SITE_URL}/guia`,
    },
  ],
};

export default function GuiaPage() {
  return (
    <>
      <GuiaClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(GUIA_LD) }}
      />
    </>
  );
}
