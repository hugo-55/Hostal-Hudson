'use client';
import { useState } from 'react';
import { waLink, HOSTAL_PHONE_DISPLAY } from '../lib/site';

// Reserva en 4 campos → queda registrada + abre WhatsApp del hostal.
export default function ReservaCTA({ title = 'Reserva por WhatsApp en 1 minuto' }) {
  const [name, setName] = useState('');
  const [llegada, setLlegada] = useState('');
  const [noches, setNoches] = useState(1);
  const [personas, setPersonas] = useState(2);
  const [state, setState] = useState('idle'); // idle|sending|done|error
  const [detail, setDetail] = useState('');

  const msg = `Hola Hostal Hudson, soy ${name || '...'}. Quiero reservar: llegada ${llegada || '...'}, ${noches} noche(s), ${personas} persona(s). ¿Tienen disponibilidad?`;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !llegada) return alert('Completa tu nombre y la fecha de llegada');
    setState('sending');
    setDetail('');
    try {
      const r = await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, llegada, noches, personas }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Error');
      const live = data.sheetMode === 'live' || data.notifyMode === 'live';
      setState('done');
      setDetail(live ? 'live' : 'demo');
    } catch {
      setState('demo');
    }
  }

  if (state === 'done' || state === 'demo') {
    return (
      <div className="card" style={{ border: '2px solid #16a34a' }}>
        <h3>✅ ¡Reserva enviada, {name}!</h3>
        <p>
          {detail === 'live'
            ? 'Quedó registrada en nuestro sistema y te contactaremos a la brevedad.'
            : 'Ahora confirma por WhatsApp para asegurar tu fecha:'}
        </p>
        <a className="btn btn-green" href={waLink(msg)} target="_blank">Confirmar por WhatsApp ({HOSTAL_PHONE_DISPLAY})</a>
        <p><button className="btn btn-outline" onClick={() => setState('idle')}>Hacer otra reserva</button></p>
      </div>
    );
  }

  return (
    <div className="card" style={{ border: '2px solid #16a34a' }}>
      <h3>{title}</h3>
      <p className="muted">Completa y tu reserva queda registrada. Después la confirmas por WhatsApp ({HOSTAL_PHONE_DISPLAY}).</p>
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-green" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Enviando...' : 'Enviar reserva'}
        </button>
      </form>
    </div>
  );
}
