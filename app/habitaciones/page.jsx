import WhatsAppButton, { Footer } from '../../components/Chrome';
import ReservaCTA from '../../components/ReservaCTA';
import { waLink } from '../../lib/site';

const ROOMS = [
  { img: '/img/slide2.jpg', name: 'Habitación con vista al río', desc: 'Despierta con el río Aysén y el puente Ibáñez. Cama cómoda, TV cable y Wi-Fi gratis.' },
  { img: '/img/slide3.jpg', name: 'Habitación familiar', desc: 'Espacio para descansar en familia, ambiente acogedor y atención personalizada.' },
  { img: '/img/slide4.jpg', name: 'Habitación de trabajo', desc: 'Ideal para viajes laborales: tranquila, calefaccionada y cerca de oficinas públicas.' },
];

export default function Habitaciones() {
  return (
    <div className="container">
      <h1>Habitaciones acogedoras para un descanso reparador</h1>
      <p className="muted">Todas incluyen desayuno continental, Wi-Fi gratis, TV cable y limpieza diaria. Consulta disponibilidad por WhatsApp.</p>
      <div className="grid">
        {ROOMS.map((r) => (
          <div className="card" key={r.name}>
            <img src={r.img} alt={r.name} style={{ borderRadius: 10, height: 200, width: '100%', objectFit: 'cover', marginBottom: 10 }} />
            <strong>{r.name}</strong>
            <p className="muted">{r.desc}</p>
            <a className="btn btn-green" href={waLink(`Hola, consulto disponibilidad: ${r.name}`)} target="_blank">Consultar esta habitación</a>
          </div>
        ))}
      </div>
      <ReservaCTA title="¿Vienes a Aysén? Reserva aquí" />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
