import WhatsAppButton, { Footer } from '../components/Chrome';
import ReservaCTA from '../components/ReservaCTA';
import { SERVICES, TESTIMONIALS, waLink, MAPS_URL, HOSTAL_PHONE_DISPLAY, PAGESPEED_URL } from '../lib/site';

export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <img src="/img/slide1.jpg" alt="Hostal Hudson frente al río Aysén" />
        <div className="hero-text">
          <span className="badge">📍 Pleno centro de Puerto Aysén</span>
          <span className="badge">🌉 Vista al puente Ibáñez</span>
          <h1>Descansa frente al río Aysén, a pasos de todo</h1>
          <p>Hostal familiar con desayuno incluido, Wi-Fi gratis y recepción 24 h. Reserva por WhatsApp en 1 minuto.</p>
          <div className="hero-cta">
            <a className="btn btn-green" href={waLink('Hola Hostal Hudson, quiero consultar disponibilidad')} target="_blank">
              Reservar por WhatsApp
            </a>
            <a className="btn btn-white" href="/habitaciones">Ver habitaciones</a>
          </div>
        </div>
      </div>

      <h2 className="section-title">Todo incluido, sin sorpresas</h2>
      <div className="grid">
        {SERVICES.map((s) => (
          <div className="card" key={s.name}>
            <div style={{ fontSize: 32 }}>{s.icon}</div>
            <strong>{s.name}</strong>
            <p className="muted">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>📍 Ubicación privilegiada</h3>
          <p>Teniente Merino 1080 — a 2 cuadras de la plaza de armas, a orillas del río Aysén, frente al puente Presidente Ibáñez. Cerca de bancos, oficinas y comercio.</p>
          <p><a className="btn btn-outline" href={MAPS_URL} target="_blank">Cómo llegar →</a></p>
        </div>
        <div className="card">
          <img src="/img/slide2.jpg" alt="Vista al río desde el hostal" style={{ borderRadius: 10 }} />
        </div>
      </div>

      <h2 className="section-title">Lo que dicen nuestros pasajeros</h2>
      <div className="grid-2">
        {TESTIMONIALS.map((t) => (
          <div className="card" key={t.name}>
            <p className="quote">“{t.text}”</p>
            <p><strong>{t.name}</strong> <span className="muted">· {t.tag}</span></p>
          </div>
        ))}
      </div>

      <ReservaCTA />

      <div className="card">
        <h3>¿Por qué renovamos el sitio?</h3>
        <p className="muted">
          La web anterior tardaba en cargar, no se veía bien en celular y reservar era un formulario sin respuesta.
          Esta versión carga en menos de 1 segundo y la reserva cae directo al WhatsApp {HOSTAL_PHONE_DISPLAY}.{' '}
          <a href={PAGESPEED_URL} target="_blank">Compara la velocidad aquí →</a>
        </p>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
