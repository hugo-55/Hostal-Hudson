'use client';
import { useEffect, useState } from 'react';
import { RESERVAS_READ_URL } from '../../lib/site';

const DEMO_ROWS = [
  { fecha_registro: '2026-10-20T15:00:00', nombre: 'María G. (ejemplo)', llegada: '2026-11-05', noches: 2, personas: 2 },
  { fecha_registro: '2026-10-21T10:30:00', nombre: 'John S. (ejemplo)', llegada: '2026-11-12', noches: 3, personas: 1 },
];

function monthGrid(year, month, busy, toggle) {
  const startPad = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let k = 0; k < startPad; k++) cells.push(<span key={`p${k}`} />);
  for (let d = 1; d <= days; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push(
      <button key={iso} className={busy.has(iso) ? 'cal-busy' : 'cal-free'} onClick={() => toggle(iso)} title={iso}>
        {d}
      </button>
    );
  }
  return cells;
}

// Panel privado del dueño: reservas, disponibilidad y estado. Solo español.
export default function Admin() {
  const [key, setKey] = useState('');
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('bookings');
  const [rows, setRows] = useState(null);
  const [demo, setDemo] = useState(false);
  const [busy, setBusy] = useState(new Set());
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('hostal-admin') === '1') setOpen(true);
      const saved = localStorage.getItem('hostal-busy');
      if (saved) setBusy(new Set(JSON.parse(saved)));
    } catch {}
    fetch('/api/status').then((r) => r.json()).then(setStatus).catch(() => {});
  }, []);

  function login(e) {
    e.preventDefault();
    if (key === (process.env.NEXT_PUBLIC_ADMIN_KEY || 'hudson123')) {
      setOpen(true);
      try { sessionStorage.setItem('hostal-admin', '1'); } catch {}
    } else alert('Clave incorrecta');
  }

  function loadBookings() {
    if (!RESERVAS_READ_URL) { setRows(DEMO_ROWS); setDemo(true); return; }
    fetch(RESERVAS_READ_URL)
      .then((r) => r.json())
      .then((d) => { setRows(d.rows || []); setDemo(false); })
      .catch(() => { setRows(DEMO_ROWS); setDemo(true); });
  }
  useEffect(() => { if (open) loadBookings(); }, [open ]);

  function toggle(iso) {
    setBusy((prev) => {
      const next = new Set(prev);
      if (next.has(iso)) next.delete(iso);
      else next.add(iso);
      try { localStorage.setItem('hostal-busy', JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  function copyCSV() {
    const csv = 'fecha,estado\n' + [...busy].sort().map((d) => `${d},ocupado`).join('\n');
    navigator.clipboard.writeText(csv).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!open) {
    return (
      <div className="container" style={{ maxWidth: 420 }}>
        <h1>🔒 Panel del dueño</h1>
        <p className="muted">Zona privada de Hostal Hudson. Si eres pasajero, <a href="/reservas">reserva aquí</a>.</p>
        <form onSubmit={login}>
          <label>Clave</label>
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Clave del panel" />
          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  const now = new Date();
  const months = [0, 1].map((d) => new Date(now.getFullYear(), now.getMonth() + d, 1));

  return (
    <div className="container">
      <h1>📋 Panel del dueño</h1>
      <p>
        <button className={`btn ${tab === 'bookings' ? '' : 'btn-outline'}`} onClick={() => setTab('bookings')}>Reservas</button>{' '}
        <button className={`btn ${tab === 'avail' ? '' : 'btn-outline'}`} onClick={() => setTab('avail')}>Disponibilidad</button>{' '}
        <button className={`btn ${tab === 'state' ? '' : 'btn-outline'}`} onClick={() => setTab('state')}>Estado</button>
      </p>

      {tab === 'bookings' && (
        <div className="card">
          <h3>Últimas reservas {demo && <span className="badge badge-warn">datos de ejemplo — conecta RESERVAS_READ_URL</span>}</h3>
          {!rows ? <p>Cargando...</p> : rows.length === 0 ? <p>No hay reservas todavía.</p> : (
            <table>
              <thead><tr><th>Nombre</th><th>Llegada</th><th>Noches</th><th>Personas</th></tr></thead>
              <tbody>
                {rows.map((r, k) => (
                  <tr key={k}><td>{r.nombre}</td><td>{r.llegada}</td><td>{r.noches}</td><td>{r.personas}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          <p><button className="btn btn-outline" onClick={loadBookings}>↻ Actualizar</button></p>
        </div>
      )}

      {tab === 'avail' && (
        <div className="card">
          <h3>Marca tus días ocupados (clic para cambiar)</h3>
          <div className="grid-2">
            {months.map((m) => (
              <div key={m.toISOString()}>
                <strong style={{ textTransform: 'capitalize' }}>
                  {m.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}
                </strong>
                <div className="mini-cal">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => <span key={d} className="cal-head">{d}</span>)}
                  {monthGrid(m.getFullYear(), m.getMonth(), busy, toggle)}
                </div>
              </div>
            ))}
          </div>
          <p>
            <button className="btn btn-green" onClick={copyCSV}>{copied ? '✅ Copiado' : 'Copiar CSV para Sheets'}</button>
          </p>
          <p className="muted">Pega ese texto en tu hoja `Disponibilidad` (reemplazando todo) y la web muestra los rojos. Guía: AVAILABILITY-SETUP.md</p>
        </div>
      )}

      {tab === 'state' && (
        <div className="card">
          <h3>Integraciones</h3>
          {!status ? <p>Cargando...</p> : (
            <ul className="check">
              <li>{status.sheet ? '✅' : '⬜'} Reservas → Sheets</li>
              <li>{status.notify ? '✅' : '⬜'} Aviso WhatsApp automático</li>
              <li>{status.availability ? '✅' : '⬜'} Calendario de disponibilidad</li>
              <li>{status.review ? '✅' : '⬜'} Link de reseñas Google</li>
            </ul>
          )}
          <p className="muted">Cada ⬜ tiene su guía .md en el repo con pasos de 5-10 min.</p>
        </div>
      )}
    </div>
  );
}
