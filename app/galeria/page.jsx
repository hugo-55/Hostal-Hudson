import GaleriaClient from '../../components/pages/GaleriaClient';
import { SEO, openGraph } from '../../lib/seo';
import { SITE_URL, BUSINESS_ID } from '../../lib/site';

export const metadata = {
  title: { absolute: SEO.galeria.es.title },
  description: SEO.galeria.es.description,
  alternates: { canonical: '/galeria' },
  openGraph: openGraph(SEO.galeria.es, '/galeria'),
};

const GALERIA_LD = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Galería de Hostal Hudson',
  description: 'Fotos reales de Hostal Hudson y de la zona de Puerto Aysén.',
  url: `${SITE_URL}/galeria`,
  publisher: { '@id': BUSINESS_ID },
  associatedMedia: [
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-hostal-exterior1.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-hostal-interior1.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-hostal-interior2.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-hostal-interior3.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-hostal-interior4.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-hostal-interior5.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-quevisitar-caleta.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-quevisitar-camino.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-quevisitar-cascada.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-quevisitar-pan.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-quevisitar-plaza1.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-quevisitar-plaza2.jpg` },
    { '@type': 'ImageObject', contentUrl: `${SITE_URL}/img/gal-quevisitar-puente.jpg` },
  ],
};

export default function GaleriaPage() {
  return (
    <>
      <GaleriaClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(GALERIA_LD) }}
      />
    </>
  );
}
