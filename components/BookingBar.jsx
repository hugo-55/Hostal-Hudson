'use client';
import { useState } from 'react';
import { waLink } from '../lib/site';

// Barra de reserva estilo hotel: llegada + salida + personas → calcula noches → WhatsApp.
export default function BookingBar() {
  const [llegada, setLlegada] = useState('');
  const [salida, setSalida] = useState('');
  const [personas, setPersonas] = useState(2);
  const [name, setName] = useState('');

  const nights =
    llegada && salida
      ? Math.max(0, Math.round((new Date(salida) - new Date(llegada)) / 86400000))
      : 0;

  const msg = `Hola Hostal Hudson, soy ${name || '...'}. Quiero reservar: llegada ${llegada || '...'}, salida ${salida || '...'} (${nights} noche(s)), ${personas} persona(s). ¿Tienen disponibilidad?`;
  const valid = name.trim() && llegada && salida && nights > 0;

  return (
    <div className="booking-bar">
      <div className="bb-field">
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
      </div>
      <div className="bb-field">
        <label>Llegada</label>
        <input type="date" value={llegada} onChange={(e) => setLlegada(e.target.value)} />
      </div>
      <div className="bb-field">
        <label>Salida</label>
        <input type="date" value={salida} onChange={(e) => setSalida(e.target.value)} />
      </div>
      <div className="bb-field">
        <label>Personas</label>
        <input type="number" min="1" max="20" value={personas} onChange={(e) => setPersonas(Number(e.target.value))} />
      </div>
      <div className="bb-action">
        {nights > 0 && <span className="bb-nights">{nights} noche{nights > 1 ? 's' : ''}</span>}
        {valid ? (
          <a className="btn btn-green" href={waLink(msg)} target="_blank">Reservar →</a>
        ) : (
          <span className="btn btn-disabled">Completa fechas</span>
        )}
      </div>
    </div>
  );
}
