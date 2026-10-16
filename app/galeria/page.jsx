import WhatsAppButton, { Footer } from '../../components/Chrome';

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
  return (
    <div className="container">
      <h1>Galería</h1>
      <p className="muted">Fotos reales del hostal y de la zona. Toca para ampliar.</p>
      <h2 className="section-title">Nuestro hostal</h2>
      <div className="gallery">
        {HOSTAL.map((p) => (
          <a key={p.src} href={p.src} target="_blank" rel="noreferrer">
            <img src={p.src} alt={p.alt} loading="lazy" />
          </a>
        ))}
      </div>
      <h2 className="section-title">Aysén por descubrir</h2>
      <p className="section-sub">Todo esto a distancia de paseo desde nuestra puerta. Pregúntanos cómo llegar.</p>
      <div className="gallery">
        {ZONA.map((p) => (
          <a key={p.src} href={p.src} target="_blank" rel="noreferrer">
            <img src={p.src} alt={p.alt} loading="lazy" />
          </a>
        ))}
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
