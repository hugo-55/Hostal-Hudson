'use client';
import WhatsAppButton, { Footer } from '../components/Chrome';
import Slideshow from '../components/Slideshow';
import BookingBar from '../components/BookingBar';
import ReservaCTA from '../components/ReservaCTA';
import { TestimonialCarousel, CountUp } from '../components/Widgets';
import { useLang } from '../lib/i18n';
import { SERVICES, TESTIMONIALS, waLink, MAPS_URL, HOSTAL_PHONE_DISPLAY, PAGESPEED_URL } from '../lib/site';

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
  const { t } = useLang();
  return (
    <div>
      <div className="hero-full">
        <Slideshow slides={SLIDES} />
        <div className="hero-full-text">
          <div className="hero-kicker gold">{t.hero.kicker}</div>
          <h1>{t.hero.titleA}<br />{t.hero.titleB}</h1>
          <p>{t.hero.sub}</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 0 }}>
        <BookingBar />

        <div className="stats-band">
          <div><CountUp to={2} /><span>{t.stats.plaza}</span></div>
          <div><CountUp to={24} /><span>{t.stats.reception}</span></div>
          <div><CountUp to={6} suffix="/6" /><span>{t.stats.included}</span></div>
          <div><CountUp to={1} /><span>{t.stats.bookMin}</span></div>
        </div>

        <h2 className="section-title">{t.servicesTitle}</h2>
        <p className="section-sub">{t.servicesSub}</p>
        <div className="grid">
          {SERVICES.map((s) => (
            <div className="card service" key={s.key}>
              <div className="service-icon">{s.icon}</div>
              <strong>{t.services[s.key].name}</strong>
              <p className="muted">{t.services[s.key].desc}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title">{t.roomsTitle}</h2>
        <div className="grid">
          {t.roomCards.map((r, k) => (
            <div className="card room" key={r.name}>
              <img src={ROOM_IMGS[k]} alt={r.name} loading="lazy" />
              <strong>{r.name}</strong>
              <p className="muted">{r.desc}</p>
              <a href="/habitaciones">{t.roomsCta}</a>
            </div>
          ))}
        </div>

        <div className="dark-section">
          <h2>{t.reviewsTitle}</h2>
          <TestimonialCarousel items={TESTIMONIALS} />
          <p style={{ marginTop: 18 }}>
            <a className="btn btn-green" href={waLink('Hola Hostal Hudson, quiero reservar')} target="_blank">{t.wantBook}</a>
          </p>
        </div>

        <h2 className="section-title">{t.visitTitle}</h2>
        <p className="section-sub">{t.visitSub}</p>
        <div className="visit-strip">
          {VISIT.map((v) => (
            <a key={v.src} href="/galeria" className="visit-card">
              <img src={v.src} alt={v.alt} loading="lazy" />
              <span>{v.alt}</span>
            </a>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 18 }}>
          <div className="card">
            <h3>📍 {t.locationTitle}</h3>
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

        <p className="muted" style={{ marginTop: 20 }}>
          {t.renewed} {HOSTAL_PHONE_DISPLAY}.{' '}
          <a href={PAGESPEED_URL} target="_blank">{t.compareSpeed}</a>
        </p>

        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}
