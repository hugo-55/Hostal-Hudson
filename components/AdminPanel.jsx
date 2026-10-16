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
function addDays(iso, n) {
  const d = new Date(iso);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function todayISO() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}
const rowKey = (r) => r.id || `${r.nombre}|${r.llegada}`;

// Pestaña Conexiones: qué hace cada una, en qué modo está y cómo activarla.
const GUIDES = {
  sheet: 'https://github.com/hugo-55/Hostal-Hudson/blob/main/RESERVAS-SETUP.md',
  availability: 'https://github.com/hugo-55/Hostal-Hudson/blob/main/AVAILABILITY-SETUP.md',
};

function Connections({ status }) {
  if (!status) return <div className="card"><p>Cargando...</p></div>;
  const items = [
    {
      on: status.sheet,
      name: 'Registro de reservas',
      ok: 'Cada reserva queda guardada en tu planilla Google automáticamente.',
      off: 'APAGADO: las reservas solo llegan por WhatsApp y no quedan registradas. Actívalo con la guía de 15 min.',
      guide: GUIDES.sheet,
    },
    {
      on: status.notify,
      name: 'Aviso WhatsApp automático',
      ok: 'Te llega un WhatsApp a tu celular con cada reserva nueva.',
      off: 'APAGADO: tienes que revisar la planilla a mano. Se activa con CallMeBot (gratis) o UltraMsg.',
      guide: GUIDES.sheet,
    },
    {
      on: status.availability,
      name: 'Calendario de disponibilidad',
      ok: 'Los pasajeros ven en la web qué fechas están ocupadas.',
      off: 'APAGADO: la web dice "consulta por WhatsApp". Marca tus ocupados en Sheets (10 min).',
      guide: GUIDES.availability,
    },
    {
      on: status.review,
      name: 'Opiniones de Google',
      ok: 'El botón lleva a tu perfil de Google a dejar reseña.',
      off: 'APAGADO: el botón pide el link por WhatsApp. Pega tu link de reseñas en 1 minuto.',
      guide: null,
    },
  ];
  const done = items.filter((i) => i.on).length;
  return (
    <div className="card">
      <h3>Conexiones: {done} de {items.length} activas</h3>
      <div className="bar-row">
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${Math.round((done / items.length) * 100)}%` }} />
        </div>
        <span className="bar-val">{Math.round((done / items.length) * 100)}%</span>
      </div>
      {done < items.length && (
        <p className="muted">Mientras algo esté apagado, esa parte funciona en <strong>modo demo</strong>: la web anda igual, pero ese paso lo haces tú a mano.</p>
      )}
      {items.map((i) => (
        <div key={i.name} className="card" style={{ margin: '10px 0', borderLeft: `5px solid ${i.on ? '#16a34a' : '#d97706'}` }}>
          <p><strong>{i.on ? '🟢' : '🟡'} {i.name}</strong></p>
          <p className="muted">{i.on ? i.ok : i.off}</p>
          {!i.on && i.guide && <p><a className="btn btn-outline" href={i.guide} target="_blank">Ver guía paso a paso →</a></p>}
        </div>
      ))}
    </div>
  );
}

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
  const [notas, setNotas] = useState({});
  const [noteOpen, setNoteOpen] = useState(null);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const [q, setQ] = useState('');
  const [fEstado, setFEstado] = useState('todas');
  const [fOrigen, setFOrigen] = useState('todos');
  const [showNew, setShowNew] = useState(false);
  const [manual, setManual] = useState([]);
  const [form, setForm] = useState({ nombre: '', llegada: '', noches: 1, personas: 2, telefono: '', nota: '' });
  const [saving, setSaving] = useState(false);
  const [repMonth, setRepMonth] = useState(() => { const t = new Date(); return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}`; });

  useEffect(() => {
    try {
      if (sessionStorage.getItem('hostal-admin') === '1') setOpen(true);
      const saved = localStorage.getItem('hostal-busy');
      if (saved) setBusy(new Set(JSON.parse(saved)));
      const es = localStorage.getItem('hostal-estados');
      if (es) setEstados(JSON.parse(es));
      const mn = localStorage.getItem('hostal-manual');
      if (mn) setManual(JSON.parse(mn));
      const nt = localStorage.getItem('hostal-notas');
      if (nt) setNotas(JSON.parse(nt));
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
  const notaDe = (r) => notas[rowKey(r)] || '';
  function setNota(r, v) {
    setNotas((prev) => {
      const next = { ...prev, [rowKey(r)]: v };
      try { localStorage.setItem('hostal-notas', JSON.stringify(next)); } catch {}
      return next;
    });
  }
  function setEstado(r, v) {
    setEstados((prev) => {
      const next = { ...prev, [rowKey(r)]: v };
      try { localStorage.setItem('hostal-estados', JSON.stringify(next)); } catch {}
      return next;
    });
  }

  // Filas visibles: planilla + manuales (las manuales siempre, con insignia).
  const allRows = useMemo(() => {
    const base = (rows || []).map((r) => ({ ...r, origen: r.origen || 'web' }));
    return [...base, ...manual];
  }, [rows, manual]);

  const kpis = useMemo(() => {
    const list = allRows;
    const activas = list.filter((r) => estadoDe(r) !== 'cancelada');
    const prox7 = activas.filter((r) => { const d = daysUntil(r.llegada); return d >= 0 && d <= 7; });
    const noches = activas.reduce((a, r) => a + (Number(r.noches) || 0), 0);
    const ingreso = activas.reduce((a, r) => a + (Number(r.noches) || 0) * (Number(r.personas) || 0) * RATE_PER_PERSON_NIGHT, 0);
    const hoy = todayISO();
    const lleganHoy = activas.filter((r) => String(r.llegada).slice(0, 10) === hoy);
    const salenHoy = activas.filter((r) => addDays(String(r.llegada).slice(0, 10), Number(r.noches) || 0) === hoy);
    const enCasa = activas.filter((r) => {
      const l = String(r.llegada).slice(0, 10);
      const s = addDays(l, Number(r.noches) || 0);
      return l <= hoy && hoy < s;
    });
    const byMonth = {};
    activas.forEach((r) => {
      const m = String(r.llegada || '').slice(0, 7);
      if (!/^\d{4}-\d{2}$/.test(m)) return;
      byMonth[m] = (byMonth[m] || 0) + (Number(r.noches) || 0) * (Number(r.personas) || 0) * RATE_PER_PERSON_NIGHT;
    });
    const months = Object.keys(byMonth).sort().slice(-4);
    const maxM = Math.max(1, ...months.map((m) => byMonth[m]));
    return { total: list.length, prox7: prox7.length, noches, ingreso, proxList: prox7.slice(0, 5), byMonth, months, maxM, lleganHoy, salenHoy, enCasa };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRows, estados]);

  const filtered = useMemo(() => {
    const list = allRows;
    return list.filter((r) => {
      const okQ = !q || `${r.nombre} ${r.llegada}`.toLowerCase().includes(q.toLowerCase());
      const okE = fEstado === 'todas' || estadoDe(r) === fEstado;
      const okO = fOrigen === 'todos' || (r.origen || 'web') === fOrigen;
      return okQ && okE && okO;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRows, estados, q, fEstado, fOrigen]);

  function waTo(r, text) {
    if (!r.telefono) return null;
    return `https://wa.me/${r.telefono}?text=${encodeURIComponent(text)}`;
  }
  const TPL = {
    llegada: (r) => `Hola ${r.nombre}, te escribimos de Hostal Hudson. ¡Te esperamos el ${fmtDate(r.llegada)}! Avísanos tu hora aproximada de llegada.`,
    gracias: (r) => `Hola ${r.nombre}, gracias por alojarte en Hostal Hudson. Si nos dejas una opinión en Google nos ayudas un montón.`,
  };
  function printReport() {
    const list = (rows || []).filter((r) => String(r.llegada || '').slice(0, 7) === repMonth && estadoDe(r) !== 'cancelada');
    const canc = (rows || []).filter((r) => String(r.llegada || '').slice(0, 7) === repMonth && estadoDe(r) === 'cancelada').length;
    const noches = list.reduce((a, r) => a + (Number(r.noches) || 0), 0);
    const ingreso = list.reduce((a, r) => a + (Number(r.noches) || 0) * (Number(r.personas) || 0) * RATE_PER_PERSON_NIGHT, 0);
    const fmt = (n) => `$${Number(n).toLocaleString('es-CL')}`;
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>Reporte ${repMonth} - Hostal Hudson</title></head><body style="font-family:sans-serif">
      <h1>Hostal Hudson — reporte ${repMonth}</h1>
      <p>Reservas: <strong>${list.length}</strong> · Noches: <strong>${noches}</strong> · Ingreso estimado: <strong>${fmt(ingreso)}</strong> · Canceladas: <strong>${canc}</strong></p>
      <table border="1" cellpadding="6" cellspacing="0"><tr><th>Nombre</th><th>Llegada</th><th>Noches</th><th>Personas</th><th>Estado</th></tr>
      ${list.map((r) => `<tr><td>${r.nombre}</td><td>${r.llegada}</td><td>${r.noches}</td><td>${r.personas}</td><td>${estadoDe(r)}</td></tr>`).join('')}
      </table><p><small>Tarifa referencial. Generado desde el panel.</small></p>
      <script>window.print()<\/script></body></html>`);
    w.document.close();
  }
  async function saveManual(e) {
    e.preventDefault();
    const f = form;
    if (!f.nombre.trim() || !f.llegada) return alert('Completa nombre y llegada');
    if (f.llegada < todayISO()) return alert('La llegada no puede ser pasada');
    setSaving(true);
    const entry = {
      id: `m${Date.now()}`,
      origen: 'manual',
      nombre: f.nombre.trim().slice(0, 80),
      llegada: f.llegada.slice(0, 10),
      noches: Math.max(1, Math.min(60, Number(f.noches) || 1)),
      personas: Math.max(1, Math.min(20, Number(f.personas) || 1)),
      telefono: String(f.telefono || '').replace(/\D/g, '').slice(0, 15),
    };
    try {
      await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: entry.nombre, llegada: entry.llegada, noches: entry.noches, personas: entry.personas, telefono: entry.telefono }),
      });
    } catch {}
    setManual((prev) => {
      const next = [...prev, entry];
      try { localStorage.setItem('hostal-manual', JSON.stringify(next)); } catch {}
      return next;
    });
    if (f.nota.trim()) setNota(entry, f.nota.trim());
    setEstado(entry, 'confirmada');
    setForm({ nombre: '', llegada: '', noches: 1, personas: 2, telefono: '', nota: '' });
    setSaving(false);
    setShowNew(false);
  }

  function exportCSV() {    const head = 'nombre,llegada,noches,personas,telefono,estado';
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
        <button className={`btn ${tab === 'state' ? '' : 'btn-outline'}`} onClick={() => setTab('state')}>Conexiones</button>
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

          <div className="card" style={{ borderLeft: '5px solid #0e7490' }}>
            <h3>🏠 Hoy en el hostal ({fmtDate(todayISO())})</h3>
            <div className="grid">
              <div><strong>🛬 Llegan ({kpis.lleganHoy.length})</strong><p className="muted">{kpis.lleganHoy.length ? kpis.lleganHoy.map((r) => `${r.nombre} (${r.personas}p)`).join(' · ') : 'Nadie hoy.'}</p></div>
              <div><strong>🛫 Se van ({kpis.salenHoy.length})</strong><p className="muted">{kpis.salenHoy.length ? kpis.salenHoy.map((r) => `${r.nombre} (${r.personas}p)`).join(' · ') : 'Nadie hoy.'}</p></div>
              <div><strong>🛏️ En casa ({kpis.enCasa.length})</strong><p className="muted">{kpis.enCasa.length ? kpis.enCasa.map((r) => r.nombre).join(' · ') : 'Vacío hoy.'}</p></div>
            </div>
          </div>

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
              <p className="no-print">
                <label>Reporte del mes</label>
                <input type="month" value={repMonth} onChange={(e) => setRepMonth(e.target.value)} style={{ maxWidth: 220 }} />
                {' '}<button className="btn" onClick={printReport}>🖨 Imprimir reporte</button>
              </p>
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
            <div className="grid-2">
              <div>
                <label>Origen</label>
                <select value={fOrigen} onChange={(e) => setFOrigen(e.target.value)}>
                  <option value="todos">Todos</option>
                  <option value="web">🌐 Web</option>
                  <option value="manual">📞 Directa</option>
                </select>
              </div>
            </div>
            <p className="no-print">
              <button className="btn btn-green" onClick={() => setShowNew(!showNew)}>＋ Nueva reserva directa</button>{' '}
              <button className="btn btn-outline" onClick={loadBookings}>↻ Actualizar</button>{' '}
              <button className="btn btn-outline" onClick={exportCSV}>⬇ Exportar CSV</button>{' '}
              <button className="btn btn-outline" onClick={() => window.print()}>🖨 Imprimir llegadas</button>
            </p>
            {showNew && (
              <form onSubmit={saveManual} className="card" style={{ border: '2px solid #16a34a', background: '#f0fdf4' }}>
                <h3>📞 Nueva reserva directa</h3>
                <p className="muted">Para pasajeros que reservaron por teléfono, WhatsApp o presencial. Queda en estado <strong>confirmada</strong>.</p>
                <div className="grid-2">
                  <div>
                    <label>Nombre *</label>
                    <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre del pasajero" />
                  </div>
                  <div>
                    <label>WhatsApp</label>
                    <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="+56 9 ..." inputMode="tel" />
                  </div>
                  <div>
                    <label>Llegada *</label>
                    <input type="date" min={todayISO()} value={form.llegada} onChange={(e) => setForm({ ...form, llegada: e.target.value })} />
                  </div>
                  <div>
                    <label>Noches</label>
                    <input type="number" min="1" max="60" value={form.noches} onChange={(e) => setForm({ ...form, noches: Number(e.target.value) })} />
                  </div>
                </div>
                <label>Personas</label>
                <input type="number" min="1" max="20" value={form.personas} onChange={(e) => setForm({ ...form, personas: Number(e.target.value) })} style={{ maxWidth: 200 }} />
                <label>Nota (opcional)</label>
                <input value={form.nota} onChange={(e) => setForm({ ...form, nota: e.target.value })} placeholder="Ej. paga al llegar..." />
                <p>
                  <button className="btn btn-green" type="submit" disabled={saving}>{saving ? 'Guardando...' : '✓ Guardar reserva'}</button>{' '}
                  <button className="btn btn-outline" type="button" onClick={() => setShowNew(false)}>Cancelar</button>
                </p>
              </form>
            )}
            {!rows && manual.length === 0 ? <p>Cargando...</p> : filtered.length === 0 ? <p>Sin resultados.</p> : (
              <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Nombre</th><th>Llegada</th><th>Estado</th><th>Msg</th></tr></thead>
                <tbody>
                  {filtered.map((r, k) => {
                    const rk = rowKey(r);
                    const wa1 = waTo(r, TPL.llegada(r));
                    const wa2 = waTo(r, TPL.gracias(r));
                    return (
                      <>
                        <tr key={rk}>
                          <td className="name-cell">
                            <strong>{r.nombre}</strong>{' '}
                            <span title={r.origen === 'manual' ? 'Reserva directa (teléfono/presencial)' : 'Reserva por la web'}>{r.origen === 'manual' ? '📞' : '🌐'}</span>
                            {notaDe(r) ? <div className="note-preview">📝 {notaDe(r).slice(0, 60)}{notaDe(r).length > 60 ? '…' : ''}</div> : null}
                            <button className="btn btn-outline note-btn" onClick={() => setNoteOpen(noteOpen === rk ? null : rk)}>
                              {notaDe(r) ? '✏️ Editar nota' : '＋ Nota'}
                            </button>
                          </td>
                          <td>{fmtDate(r.llegada)}<br /><span className="muted">{r.noches}n · {r.personas}p</span></td>
                          <td>
                            <select value={estadoDe(r)} onChange={(e) => setEstado(r, e.target.value)} style={{ margin: 0, padding: '6px' }}>
                              {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="msg-cell" style={{ whiteSpace: 'nowrap' }}>
                            {wa1 ? (
                              <>
                                <a className="btn btn-green" style={{ padding: '6px 10px' }} href={wa1} target="_blank" title="Te esperamos mañana">🛬</a>{' '}
                                <a className="btn btn-outline" style={{ padding: '6px 10px' }} href={wa2} target="_blank" title="Gracias + pide opinión">👋</a>
                              </>
                            ) : <span className="muted" title="Sin teléfono registrado">—</span>}
                          </td>
                        </tr>
                        {noteOpen === rk && (
                          <tr key={`${rk}-n`} className="note-row">
                            <td colSpan={4}>
                              <label>📝 Nota privada <span className="muted">— solo visible en este navegador</span></label>
                              <textarea rows={2} value={notaDe(r)} onChange={(e) => setNota(r, e.target.value)} placeholder="Ej. viene con mascota, paga al llegar, alérgico al polvo..." style={{ marginBottom: 4 }} />
                              <div>
                                <button className="btn btn-green" style={{ padding: '8px 16px' }} onClick={() => setNoteOpen(null)}>✓ Guardar y cerrar</button>{' '}
                                {notaDe(r) && <button className="btn btn-outline" style={{ padding: '8px 16px' }} onClick={() => { setNota(r, ''); setNoteOpen(null); }}>Borrar</button>}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
              </div>
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
        <Connections status={status} />
      )}
    </div>
  );
}
