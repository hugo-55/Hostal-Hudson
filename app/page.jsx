'use client';
import WhatsAppButton, { Footer } from '../components/Chrome';
import Slideshow from '../components/Slideshow';
import BookingBar from '../components/BookingBar';
import ReservaCTA from '../components/ReservaCTA';
import Weather from '../components/Weather';
import SmartImg from '../components/SmartImg';
import { TestimonialCarousel, CountUp, Reveal } from '../components/Widgets';
import { useLang } from '../lib/i18n';
import { SERVICES, TESTIMONIALS, waLink, MAPS_URL, REVIEW_URL, HOSTAL_PHONE_DISPLAY, PAGESPEED_URL } from '../lib/site';

const SLIDES = [
  { src: '/img/slide1.jpg', alt: 'Hostal Hudson frente al río Aysén' },
  { src: '/img/slide2.jpg', alt: 'Vista al río desde el hostal' },
  { src: '/img/slide3.jpg', alt: 'Habitaciones acogedoras' },
  { src: '/img/slide4.jpg', alt: 'Paisaje patagónico' },
];

const VISIT = [
  { src: '/img/gal-quevisitar-puente.jpg', alt: 'Puente Presidente Ibáñez' },
  { src: '/img/gal-quevisitar-cascada.jpg', alt: 'Cascada de la región' },
  { src: '/img/gal-quevisitar-caleta.jpg', alt: 'Caleta de pescadores' },
  { src: '/img/gal-quevisitar-camino.jpg', alt: 'Carretera Austral' },
];

const ROOM_IMGS = ['/img/gal-hostal-interior1.jpg', '/img/gal-hostal-interior2.jpg', '/img/gal-hostal-interior4.jpg'];

export default function Home() {
  const { t, lang } = useLang();
  return (
    <div>
      <div className="hero-full">
        <Slideshow slides={SLIDES} />
        <div className="hero-full-text">
          <div className="hero-kicker gold rise">{t.hero.kicker}</div>
          <h1><span className="rise d1">{t.hero.titleA}</span><br /><span className="rise d2">{t.hero.titleB}</span></h1>
          <p className="rise d3">{t.hero.sub}</p>
          <div className="hero-chips rise d3">
            <span className="hero-chip"><Weather inline /></span>
            <span className="hero-chip">⭐ {t.reviewsTitle}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 0 }}>
        <BookingBar />

        <Reveal>
          <div className="stats-band">
            <div><CountUp to={2} /><span>{t.stats.plaza}</span></div>
            <div><CountUp to={24} /><span>{t.stats.reception}</span></div>
            <div><CountUp to={6} suffix="/6" /><span>{t.stats.included}</span></div>
            <div><CountUp to={1} /><span>{t.stats.bookMin}</span></div>
          </div>
        </Reveal>

        <h2 className="section-title">{t.servicesTitle}</h2>
        <p className="section-sub">{t.servicesSub}</p>
        <Reveal>
          <div className="grid">
            {SERVICES.map((s) => (
              <div className="card service" key={s.key}>
                <div className="service-icon">{s.icon}</div>
                <strong>{t.services[s.key].name}</strong>
                <p className="muted">{t.services[s.key].desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <h2 className="section-title">{t.roomsTitle}</h2>
        <Reveal>
          <div className="grid">
            {t.roomCards.map((r, k) => (
              <div className="card room" key={r.name}>
                <SmartImg src={ROOM_IMGS[k]} alt={r.name} height={200} />
                <strong>{r.name}</strong>
                <p className="muted">{r.desc}</p>
                <a href="/habitaciones">{t.roomsCta}</a>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="dark-section">
          <h2>{t.reviewsTitle}</h2>
          <TestimonialCarousel items={TESTIMONIALS} />
          <p style={{ marginTop: 18 }}>
            <a className="btn btn-green" href={waLink('Hola Hostal Hudson, quiero reservar')} target="_blank">{t.wantBook}</a>
          </p>
        </div>

        <div className="card">
          <h3>{t.review.title}</h3>
          <p className="muted">{t.review.text}</p>
          <a className="btn btn-outline" href={REVIEW_URL || waLink('Hola, me alojé en el hostal y quiero dejar una opinión en Google')} target="_blank">{t.review.btn}</a>
        </div>

        <div className="card">
          <h3>{t.share.title}</h3>
          <p className="muted">{t.share.text}</p>
          <a className="btn btn-outline" href={waLink('Hola, les comparto mis fotos de la estadía para la galería')} target="_blank">{t.share.btn}</a>
        </div>

        <h2 className="section-title">{t.visitTitle}</h2>
        <p className="section-sub">{t.visitSub}</p>
        <div className="visit-strip">
          {VISIT.map((v) => (
            <a key={v.src} href="/galeria" className="visit-card">
              <SmartImg src={v.src} alt={v.alt} height={190} />
              <span>{v.alt}</span>
            </a>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 18 }}>
          <div className="card">
            <h3>📍 {t.locationTitle}</h3>
            <p><Weather /></p>
            <p>{t.locationText}</p>
            <p><a className="btn btn-outline" href={MAPS_URL} target="_blank">{t.directions}</a></p>
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

        <div className="card">
          <h3>{lang === 'es' ? 'Web vieja vs web nueva' : 'Old site vs new site'}</h3>
          <table>
            <thead><tr><th></th><th>❌ {lang === 'es' ? 'Antes (2016)' : 'Before (2016)'}</th><th>✅ {lang === 'es' ? 'Ahora' : 'Now'}</th></tr></thead>
            <tbody>
              <tr><td><strong>{lang === 'es' ? 'Velocidad' : 'Speed'}</strong></td><td>{lang === 'es' ? 'Varios segundos, fotos pesadas' : 'Several seconds, heavy photos'}</td><td>{lang === 'es' ? '<1 segundo, imágenes optimizadas' : '<1 second, optimized images'}</td></tr>
              <tr><td><strong>{lang === 'es' ? 'Reserva' : 'Booking'}</strong></td><td>{lang === 'es' ? 'Formulario sin respuesta clara' : 'Form with no clear reply'}</td><td>WhatsApp {lang === 'es' ? 'en 1 minuto + registro' : 'in 1 minute + record'}</td></tr>
              <tr><td><strong>{lang === 'es' ? 'Celular' : 'Mobile'}</strong></td><td>{lang === 'es' ? 'Menú roto, textos chicos' : 'Broken menu, tiny text'}</td><td>{lang === 'es' ? 'Barra de reserva siempre visible' : 'Booking bar always visible'}</td></tr>
              <tr><td><strong>{lang === 'es' ? 'Idiomas' : 'Languages'}</strong></td><td>{lang === 'es' ? 'Solo español' : 'Spanish only'}</td><td>ES/EN {lang === 'es' ? 'completo' : 'full'}</td></tr>
            </tbody>
          </table>
          <p><a href={PAGESPEED_URL} target="_blank">{t.compareSpeed}</a></p>
        </div>

        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}
