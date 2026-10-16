import WhatsAppButton, { Footer } from '../components/Chrome';
import Slideshow from '../components/Slideshow';
import ReservaCTA from '../components/ReservaCTA';
import { SERVICES, TESTIMONIALS, waLink, MAPS_URL, HOSTAL_PHONE_DISPLAY, PAGESPEED_URL } from '../lib/site';

const SLIDES = [
  { src: '/img/slide1.jpg', alt: 'Hostal Hudson frente al río Aysén' },
  { src: '/img/slide2.jpg', alt: 'Vista al río desde el hostal' },
  { src: '/img/slide3.jpg', alt: 'Habitaciones acogedoras' },
  { src: '/img/slide4.jpg', alt: 'Paisaje patagónico' },
];

export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <Slideshow slides={SLIDES} />
        <div className="hero-text">
          <div className="hero-kicker">Puerto Aysén · Patagonia chilena</div>
          <h1>Duerme frente al río, despierta en la Patagonia</h1>
          <p>Hostal familiar a 2 cuadras de la plaza, con desayuno incluido y recepción 24 h. Reserva directa por WhatsApp, sin comisiones.</p>
          <div className="hero-cta">
            <a className="btn btn-green" href={waLink('Hola Hostal Hudson, quiero consultar disponibilidad')} target="_blank">
              Reservar por WhatsApp
            </a>
            <a className="btn btn-white" href="/habitaciones">Ver habitaciones</a>
          </div>
          <div className="trustbar">
            <span>⭐ 4 testimonios reales</span>
            <span>🛎️ Recepción 24 h</span>
            <span>☕ Desayuno incluido</span>
          </div>
        </div>
      </div>

      <h2 className="section-title">Todo incluido en tu estadía</h2>
      <p className="section-sub">Sin cargos ocultos ni letra chica: esto viene con cada noche.</p>
      <div className="grid">
        {SERVICES.map((s) => (
          <div className="card" key={s.name}>
            <div className="service-icon">{s.icon}</div>
            <strong>{s.name}</strong>
            <p className="muted">{s.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">A pasos de todo, frente al río</h2>
      <div className="grid-2">
        <div className="card">
          <h3>📍 Teniente Merino 1080</h3>
          <p>A 2 cuadras de la plaza de armas, a orillas del río Aysén y frente al puente Presidente Ibáñez, Monumento Nacional. Cerca de bancos, oficinas públicas y comercio.</p>
          <div className="stats-row">
            <div><b>2</b><span>cuadras a la plaza</span></div>
            <div><b>24 h</b><span>recepción</span></div>
            <div><b>6/6</b><span>servicios incluidos</span></div>
          </div>
          <p><a className="btn btn-outline" href={MAPS_URL} target="_blank">Cómo llegar →</a></p>
        </div>
        <div className="card" style={{ padding: 10 }}>
          <iframe
            title="Mapa Hostal Hudson"
            src="https://www.google.com/maps?q=Teniente+Merino+1080,+Puerto+Ays%C3%A9n&output=embed"
            style={{ border: 0, borderRadius: 10, width: '100%', height: '100%', minHeight: 300 }}
            loading="lazy"
          />
        </div>
      </div>

      <h2 className="section-title">Pasajeros que volvieron contentos</h2>
      <p className="section-sub">Opiniones reales publicadas en nuestro sitio.</p>
      <div className="grid-2">
        {TESTIMONIALS.map((t) => (
          <div className="card" key={t.name}>
            <div className="review-stars">★★★★★</div>
            <p className="quote">“{t.text}”</p>
            <p><strong>{t.name}</strong> <span className="muted">· {t.tag}</span></p>
          </div>
        ))}
      </div>

      <ReservaCTA />

      <div className="card">
        <h3>Sitio renovado, misma calidez</h3>
        <p className="muted">
          La web anterior tardaba en cargar y reservar era un formulario sin respuesta.
          Ahora carga en menos de 1 segundo y tu reserva cae directo a nuestro WhatsApp {HOSTAL_PHONE_DISPLAY}.{' '}
          <a href={PAGESPEED_URL} target="_blank">Ver comparativa de velocidad →</a>
        </p>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
