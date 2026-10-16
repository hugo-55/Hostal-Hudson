'use client';
import { useEffect, useMemo, useState } from 'react';
import { RESERVAS_READ_URL, RATE_PER_PERSON_NIGHT } from '../lib/site';

const DEMO_ROWS = [
  { fecha_registro: '2026-10-20T15:00:00', nombre: 'María G. (ejemplo)', llegada: '2026-11-05', noches: 2, personas: 2, telefono: '' },
  { fecha_registro: '2026-10-21T10:30:00', nombre: 'John S. (ejemplo)', llegada: '2026-11-12', noches: 3, personas: 1, telefono: '' },
];

const ESTADOS = ['pendiente', 'confirmada', 'check-in', 'check-out', 'cancelada'];
const ESTADO_COLOR = { pendiente: 'badge-warn', confirmada: 'ok-pill', 'check-in': 'ok-pill', 'check-out': '', cancelada: 'low-pill' };

function fmtDate(iso) {
  try { return new Date(iso).toLocaleDateString('es-CL'); } catch { return String(iso).slice(0, 10); }
}
function daysUntil(iso) {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  return Math.round((new Date(iso).setHours(0, 0, 0, 0) - t) / 86400000);
}
const rowKey = (r) => `${r.nombre}|${r.llegada}`;

// Tira de ocupación 30 días: rojo = marcado ocupado, verde = llega pasajero.
function Occupancy({ rows, busy }) {
  const days = [];
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const arrivals = {};
  (rows || []).forEach((r) => {
    const d = String(r.llegada || '').slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) arrivals[d] = (arrivals[d] || 0) + 1;
  });
  for (let k = 0; k < 30; k++) {
    const d = new Date(t);
    d.setDate(d.getDate() + k);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days.push({ iso, label: d.getDate(), busy: busy.has(iso), arr: arrivals[iso] || 0, today: k === 0 });
  }
  const occ = Math.round((days.filter((d) => d.busy).length / 30) * 100);
  return (
    <>
      <p className="muted">Ocupación marcada: <strong>{occ}%</strong> · 🟢 = llegada ese día</p>
      <div className="occ-strip">
        {days.map((d) => (
          <span key={d.iso} title={`${d.iso}${d.arr ? ` · ${d.arr} llegada(s)` : ''}`} className={`occ-day${d.busy ? ' busy' : ''}${d.today ? ' today' : ''}`}>
            {d.label}{d.arr > 0 && <i>●</i>}
          </span>
        ))}
      </div>
    </>
  );
}

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

// Panel privado del dueño. Solo español.
// Límite honesto: los estados viven en este navegador (ideal 1 PC del hostal).
export default function AdminPanel() {
  const [key, setKey] = useState('');
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('bookings');
  const [rows, setRows] = useState(null);
  const [demo, setDemo] = useState(false);
  const [busy, setBusy] = useState(new Set());
  const [estados, setEstados] = useState({});
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const [q, setQ] = useState('');
  const [fEstado, setFEstado] = useState('todas');

  useEffect(() => {
    try {
      if (sessionStorage.getItem('hostal-admin') === '1') setOpen(true);
      const saved = localStorage.getItem('hostal-busy');
      if (saved) setBusy(new Set(JSON.parse(saved)));
      const es = localStorage.getItem('hostal-estados');
      if (es) setEstados(JSON.parse(es));
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

  const estadoDe = (r) => estados[rowKey(r)] || 'pendiente';
  function setEstado(r, v) {
    setEstados((prev) => {
      const next = { ...prev, [rowKey(r)]: v };
      try { localStorage.setItem('hostal-estados', JSON.stringify(next)); } catch {}
      return next;
    });
  }

  const kpis = useMemo(() => {
    const list = rows || [];
    const activas = list.filter((r) => estadoDe(r) !== 'cancelada');
    const prox7 = activas.filter((r) => { const d = daysUntil(r.llegada); return d >= 0 && d <= 7; });
    const noches = activas.reduce((a, r) => a + (Number(r.noches) || 0), 0);
    const ingreso = activas.reduce((a, r) => a + (Number(r.noches) || 0) * (Number(r.personas) || 0) * RATE_PER_PERSON_NIGHT, 0);
    const byMonth = {};
    activas.forEach((r) => {
      const m = String(r.llegada || '').slice(0, 7);
      if (!/^\d{4}-\d{2}$/.test(m)) return;
      byMonth[m] = (byMonth[m] || 0) + (Number(r.noches) || 0) * (Number(r.personas) || 0) * RATE_PER_PERSON_NIGHT;
    });
    const months = Object.keys(byMonth).sort().slice(-4);
    const maxM = Math.max(1, ...months.map((m) => byMonth[m]));
    return { total: list.length, prox7: prox7.length, noches, ingreso, proxList: prox7.slice(0, 5), byMonth, months, maxM };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, estados]);

  const filtered = useMemo(() => {
    const list = rows || [];
    return list.filter((r) => {
      const okQ = !q || `${r.nombre} ${r.llegada}`.toLowerCase().includes(q.toLowerCase());
      const okE = fEstado === 'todas' || estadoDe(r) === fEstado;
      return okQ && okE;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, estados, q, fEstado]);

  function exportCSV() {
    const head = 'nombre,llegada,noches,personas,telefono,estado';
    const lines = filtered.map((r) => [r.nombre, r.llegada, r.noches, r.personas, r.telefono || '', estadoDe(r)].map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));
    const blob = new Blob([[head, ...lines].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'reservas.csv';
    a.click();
  }

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
  const fmtCLP = (n) => `$${Number(n).toLocaleString('es-CL')}`;

  return (
    <div className="container">
      <h1>📋 Panel del dueño</h1>
      <p>
        <button className={`btn ${tab === 'bookings' ? '' : 'btn-outline'}`} onClick={() => setTab('bookings')}>Reservas</button>{' '}
        <button className={`btn ${tab === 'avail' ? '' : 'btn-outline'}`} onClick={() => setTab('avail')}>Disponibilidad</button>{' '}
        <button className={`btn ${tab === 'state' ? '' : 'btn-outline'}`} onClick={() => setTab('state')}>Estado</button>
      </p>

      {tab === 'bookings' && (
        <>
          <div className="grid">
            <div className="stat"><b>{kpis.total}</b><span>reservas totales</span></div>
            <div className="stat"><b>{kpis.prox7}</b><span>llegan en 7 días</span></div>
            <div className="stat"><b>{kpis.noches}</b><span>noches vendidas</span></div>
            <div className="stat"><b>{fmtCLP(kpis.ingreso)}</b><span>ingreso estimado*</span></div>
          </div>
          <p className="muted">*Con tarifa referencial actual. {demo && 'Datos de ejemplo — conecta RESERVAS_READ_URL.'}</p>

          <div className="card">
            <h3>Ocupación próximos 30 días</h3>
            <Occupancy rows={rows || []} busy={busy} />
          </div>

          {kpis.months.length > 0 && (
            <div className="card">
              <h3>Ingreso estimado por mes</h3>
              {kpis.months.map((m) => (
                <div key={m} className="bar-row">
                  <span className="bar-label">{m}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${Math.round((kpis.byMonth[m] / kpis.maxM) * 100)}%` }} />
                  </div>
                  <span className="bar-val">{fmtCLP(kpis.byMonth[m])}</span>
                </div>
              ))}
            </div>
          )}

          {kpis.proxList.length > 0 && (
            <div className="alert-low" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#166534' }}>
              🛎️ Próximas llegadas: {kpis.proxList.map((r) => `${r.nombre} (${fmtDate(r.llegada)})`).join(' · ')}
            </div>
          )}

          <div className="card">
            <div className="grid-2">
              <div>
                <label>Buscar</label>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nombre o fecha..." />
              </div>
              <div>
                <label>Estado</label>
                <select value={fEstado} onChange={(e) => setFEstado(e.target.value)}>
                  <option value="todas">Todas</option>
                  {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <p className="no-print">
              <button className="btn btn-outline" onClick={loadBookings}>↻ Actualizar</button>{' '}
              <button className="btn btn-outline" onClick={exportCSV}>⬇ Exportar CSV</button>{' '}
              <button className="btn btn-outline" onClick={() => window.print()}>🖨 Imprimir llegadas</button>
            </p>
            {!rows ? <p>Cargando...</p> : filtered.length === 0 ? <p>Sin resultados.</p> : (
              <table>
                <thead><tr><th>Nombre</th><th>Llegada</th><th>N/P</th><th>Estado</th><th></th></tr></thead>
                <tbody>
                  {filtered.map((r, k) => (
                    <tr key={k}>
                      <td><strong>{r.nombre}</strong></td>
                      <td>{fmtDate(r.llegada)}<br /><span className="muted">{r.noches}n · {r.personas}p</span></td>
                      <td>{r.noches}/{r.personas}</td>
                      <td>
                        <select value={estadoDe(r)} onChange={(e) => setEstado(r, e.target.value)} style={{ margin: 0, padding: '6px' }}>
                          {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td>{r.telefono ? <a className="btn btn-green" style={{ padding: '6px 10px' }} href={`https://wa.me/${r.telefono}?text=${encodeURIComponent(`Hola ${r.nombre}, te escribimos de Hostal Hudson por tu reserva del ${fmtDate(r.llegada)}.`)}`} target="_blank">WA</a> : <span className="muted">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <p className="muted">Los estados se guardan en este navegador (ideal: PC del hostal).</p>
          </div>
        </>
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
