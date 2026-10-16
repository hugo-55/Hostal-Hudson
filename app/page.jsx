import WhatsAppButton, { Footer } from '../components/Chrome';
import Slideshow from '../components/Slideshow';
import BookingBar from '../components/BookingBar';
import ReservaCTA from '../components/ReservaCTA';
import { TestimonialCarousel, CountUp } from '../components/Widgets';
import { SERVICES, TESTIMONIALS, waLink, MAPS_URL, HOSTAL_PHONE_DISPLAY, PAGESPEED_URL } from '../lib/site';

const SLIDES = [
  { src: '/img/slide1.jpg', alt: 'Hostal Hudson frente al río Aysén' },
  { src: '/img/slide2.jpg', alt: 'Vista al río desde el hostal' },
  { src: '/img/slide3.jpg', alt: 'Habitaciones acogedoras' },
  { src: '/img/slide4.jpg', alt: 'Paisaje patagónico' },
];

const VISIT = [
  { src: '/img/gal-quevisitar-puente.jpg', alt: 'Puente Presidente Ibáñez', name: 'Puente Ibáñez' },
  { src: '/img/gal-quevisitar-cascada.jpg', alt: 'Cascada de la región', name: 'Cascadas' },
  { src: '/img/gal-quevisitar-caleta.jpg', alt: 'Caleta de pescadores', name: 'Caletas' },
  { src: '/img/gal-quevisitar-camino.jpg', alt: 'Carretera Austral', name: 'Carretera Austral' },
];

export default function Home() {
  return (
    <div>
      <div className="hero-full">
        <Slideshow slides={SLIDES} />
        <div className="hero-full-text">
          <div className="hero-kicker gold">Puerto Aysén · Patagonia chilena</div>
          <h1>Duerme frente al río,<br />despierta en la Patagonia</h1>
          <p>Hostal familiar a 2 cuadras de la plaza · Desayuno incluido · Recepción 24 h</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 0 }}>
        <BookingBar />

        <div className="stats-band">
          <div><CountUp to={2} /><span>cuadras a la plaza de armas</span></div>
          <div><CountUp to={24} /><span>horas de recepción, todos los días</span></div>
          <div><CountUp to={6} suffix="/6" /><span>servicios incluidos en tu noche</span></div>
          <div><CountUp to={1} /><span>minuto para reservar por WhatsApp</span></div>
        </div>

        <h2 className="section-title">Todo incluido en tu estadía</h2>
        <p className="section-sub">Sin cargos ocultos ni letra chica.</p>
        <div className="grid">
          {SERVICES.map((s) => (
            <div className="card service" key={s.name}>
              <div className="service-icon">{s.icon}</div>
              <strong>{s.name}</strong>
              <p className="muted">{s.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title">Habitaciones que invitan a quedarse</h2>
        <div className="grid">
          {[
            { img: '/img/gal-hostal-interior1.jpg', name: 'Vista al río', desc: 'Despierta con el Aysén en la ventana.' },
            { img: '/img/gal-hostal-interior2.jpg', name: 'Familiar', desc: 'Espacio y calidez para los tuyos.' },
            { img: '/img/gal-hostal-interior4.jpg', name: 'Descanso total', desc: 'Camas cómodas y silencio nocturno.' },
          ].map((r) => (
            <div className="card room" key={r.name}>
              <img src={r.img} alt={r.name} loading="lazy" />
              <strong>{r.name}</strong>
              <p className="muted">{r.desc}</p>
              <a href="/habitaciones">Ver habitaciones →</a>
            </div>
          ))}
        </div>

        <div className="dark-section">
          <h2>Lo que dicen quienes ya durmieron aquí</h2>
          <TestimonialCarousel items={TESTIMONIALS} />
          <p style={{ marginTop: 18 }}>
            <a className="btn btn-green" href={waLink('Hola Hostal Hudson, quiero reservar')} target="_blank">Yo también quiero reservar</a>
          </p>
        </div>

        <h2 className="section-title">Aysén por descubrir</h2>
        <p className="section-sub">Todo a distancia de paseo desde nuestra puerta.</p>
        <div className="visit-strip">
          {VISIT.map((v) => (
            <a key={v.src} href="/galeria" className="visit-card">
              <img src={v.src} alt={v.alt} loading="lazy" />
              <span>{v.name}</span>
            </a>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 18 }}>
          <div className="card">
            <h3>📍 Teniente Merino 1080</h3>
            <p>A orillas del río Aysén, frente al puente Presidente Ibáñez. Cerca de bancos, oficinas y comercio.</p>
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

        <ReservaCTA />

        <p className="muted" style={{ marginTop: 20 }}>
          Sitio renovado: carga en menos de 1 segundo y la reserva cae a nuestro WhatsApp {HOSTAL_PHONE_DISPLAY}.{' '}
          <a href={PAGESPEED_URL} target="_blank">Comparar velocidad →</a>
        </p>

        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}
