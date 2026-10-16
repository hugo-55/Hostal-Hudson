'use client';
import WhatsAppButton, { Footer } from '../../components/Chrome';
import LightboxGallery from '../../components/Lightbox';
import { PageTitle, Breadcrumb } from '../../components/Widgets';
import { useLang } from '../../lib/i18n';

const HOSTAL = [
  { src: '/img/gal-hostal-exterior1.jpg', alt: 'Exterior de Hostal Hudson' },
  { src: '/img/gal-hostal-interior1.jpg', alt: 'Interior acogedor del hostal' },
  { src: '/img/gal-hostal-interior2.jpg', alt: 'Habitación cómoda' },
  { src: '/img/gal-hostal-interior3.jpg', alt: 'Espacios del hostal' },
  { src: '/img/gal-hostal-interior4.jpg', alt: 'Detalle de habitación' },
  { src: '/img/gal-hostal-interior5.jpg', alt: 'Ambiente familiar' },
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

export default function Galeria() {
  const { t } = useLang();
  return (
    <div className="container">
      <PageTitle title={t.galleryTitle} />
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
