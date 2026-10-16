'use client';
import { useState } from 'react';
import { waLink, HOSTAL_PHONE_DISPLAY } from '../lib/site';

// Reserva en 4 campos → abre WhatsApp del hostal con el mensaje listo.
export default function ReservaCTA({ title = 'Reserva por WhatsApp en 1 minuto' }) {
  const [name, setName] = useState('');
  const [llegada, setLlegada] = useState('');
  const [noches, setNoches] = useState(1);
  const [personas, setPersonas] = useState(2);

  const msg = `Hola Hostal Hudson, soy ${name || '...'}. Quiero reservar: llegada ${llegada || '...'}, ${noches} noche(s), ${personas} persona(s). ¿Tienen disponibilidad?`;

  return (
    <div className="card" style={{ border: '2px solid #16a34a' }}>
      <h3>{title}</h3>
      <p className="muted">Completa y se abre WhatsApp ({HOSTAL_PHONE_DISPLAY}) con tu reserva lista. Sin formularios que nadie lee.</p>
      <label>Tu nombre</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. María" />
      <div className="grid-2">
        <div>
          <label>Fecha de llegada</label>
          <input type="date" value={llegada} onChange={(e) => setLlegada(e.target.value)} />
        </div>
        <div>
          <label>Noches</label>
          <input type="number" min="1" max="60" value={noches} onChange={(e) => setNoches(Number(e.target.value))} />
        </div>
      </div>
      <label>Personas</label>
      <input type="number" min="1" max="20" value={personas} onChange={(e) => setPersonas(Number(e.target.value))} />
      <a className="btn btn-green" href={waLink(msg)} target="_blank">Enviar reserva por WhatsApp</a>
    </div>
  );
}
