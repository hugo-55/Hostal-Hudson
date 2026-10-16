import WhatsAppButton, { Footer } from '../../components/Chrome';

const PICS = [
  { src: '/img/slide1.jpg', alt: 'Fachada y entorno del hostal' },
  { src: '/img/slide2.jpg', alt: 'Vista al río Aysén' },
  { src: '/img/slide3.jpg', alt: 'Habitaciones acogedoras' },
  { src: '/img/slide4.jpg', alt: 'Entorno y paisaje patagónico' },
];

export default function Galeria() {
  return (
    <div className="container">
      <h1>Galería</h1>
      <p className="muted">El hostal, el río y la Patagonia. Fotos reales del lugar.</p>
      <div className="gallery">
        {PICS.map((p) => (
          <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />
        ))}
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
