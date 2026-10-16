import WhatsAppButton, { Footer } from '../../components/Chrome';
import ReservaCTA from '../../components/ReservaCTA';
import { ADDRESS, EMAIL, HOSTAL_PHONE_DISPLAY, MAPS_URL } from '../../lib/site';

export default function Reservas() {
  return (
    <div className="container">
      <h1>Reservas directas, sin vueltas</h1>
      <p className="muted">Completa y tu reserva llega a nuestro WhatsApp. Respondemos a la brevedad, recepción 24 h.</p>
      <ReservaCTA />
      <div className="card">
        <h3>📞 Contacto directo</h3>
        <p>{ADDRESS}<br />Tel/WhatsApp: {HOSTAL_PHONE_DISPLAY}<br />Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <p><a className="btn btn-outline" href={MAPS_URL} target="_blank">Ver mapa →</a></p>
      </div>
      <div className="card faq">
        <h3>Dudas frecuentes</h3>
        <details><summary>¿A qué hora puedo llegar?</summary><p>Recepción 24 h con entrega de llaves. Sin restricción de horario de ingreso.</p></details>
        <details><summary>¿Cómo confirmo mi reserva?</summary><p>Por WhatsApp coordinamos y confirmas con transferencia al Banco BCI. Envíanos el comprobante.</p></details>
        <details><summary>¿Incluye desayuno y estacionamiento?</summary><p>Sí, ambos incluidos sin costo adicional.</p></details>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
