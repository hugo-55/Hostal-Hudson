'use client';
import WhatsAppButton, { Footer } from '../Chrome';
import LightboxGallery from '../Lightbox';
import { Breadcrumb } from '../Widgets';
import { useLang } from '../../lib/i18n';
import { useSeo } from '../../lib/useSeo';
import { SEO } from '../../lib/seo';

const HOSTAL = [
  { src: '/img/hostal-entrada-01.jpg', alt: 'Entrada de Hostal Hudson con banco de madera y letrero hacia la plaza' },
  { src: '/img/hostal-living-01.jpg', alt: 'Living de Hostal Hudson con estufa a combustión lenta y sillones verdes' },
  { src: '/img/hostal-comedor-01.jpg', alt: 'Comedor de madera de Hostal Hudson con mesas servidas para el desayuno' },
  { src: '/img/hostal-comedor-02.jpg', alt: 'Comedor de madera y cocina de Hostal Hudson' },
  { src: '/img/hostal-desayuno-01.jpg', alt: 'Desayuno continental servido en Hostal Hudson' },
  { src: '/img/hostal-desayuno-02.jpg', alt: 'Mesa de desayuno con pan, fruta y café en Hostal Hudson' },
  { src: '/img/hostal-matrimonial-01.jpg', alt: 'Habitación matrimonial con cama de dos plazas y cabecera de madera' },
  { src: '/img/hostal-matrimonial-02.jpg', alt: 'Habitación matrimonial con cama de dos plazas y pared azul' },
  { src: '/img/hostal-doble-01.jpg', alt: 'Habitación doble con dos camas de una plaza' },
  { src: '/img/hostal-doble-02.jpg', alt: 'Habitación doble con dos camas de una plaza y ventana al río' },
  { src: '/img/hostal-familiar-01.jpg', alt: 'Habitación familiar con una cama de dos plazas y una de una plaza' },
  { src: '/img/hostal-familiar-02.jpg', alt: 'Habitación familiar con camas para tres personas' },
  { src: '/img/hostal-bano-01.jpg', alt: 'Baño privado con ducha, lavamanos e inodoro en Hostal Hudson' },
  { src: '/img/hostal-pasillo-01.jpg', alt: 'Pasillo de Hostal Hudson con puertas de madera y chapas electrónicas' },
  { src: '/img/hostal-pasillo-02.jpg', alt: 'Detalle de la chapa electrónica de una habitación' },
  { src: '/img/hostal-rio-01.jpg', alt: 'Vista del río Aysén y los cerros desde Hostal Hudson' },
  { src: '/img/gal-hostal-exterior1.jpg', alt: 'Fachada y letrero de madera de Hostal Hudson' },
];

const ZONA = [
  { src: '/img/gal-quevisitar-caleta.jpg', alt: 'Caleta de pescadores' },
  { src: '/img/gal-quevisitar-camino.jpg', alt: 'Carretera Austral' },
  { src: '/img/gal-quevisitar-cascada.jpg', alt: 'Cascada de la región' },
  { src: '/img/gal-quevisitar-pan.jpg', alt: 'Vista panorámica de Aysén' },
  { src: '/img/gal-quevisitar-plaza1.jpg', alt: 'Plaza de Puerto Aysén' },
  { src: '/img/gal-quevisitar-plaza2.jpg', alt: 'Centro de Puerto Aysén' },
  { src: '/img/gal-quevisitar-puente.jpg', alt: 'Puente Presidente Ibáñez' },
];

export default function GaleriaClient() {
  const { t } = useLang();

  useSeo(SEO.galeria.es, SEO.galeria.en);

  return (
    <div className="container">
      <Breadcrumb trail={[t.galleryTitle]} />
      <h1>{t.galleryTitle}</h1>
      <p className="muted">{t.gallerySub}</p>
      <h2 className="section-title">{t.galleryHostal}</h2>
      <LightboxGallery photos={HOSTAL} />
      <h2 className="section-title">{t.galleryZone}</h2>
      <LightboxGallery photos={ZONA} />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
