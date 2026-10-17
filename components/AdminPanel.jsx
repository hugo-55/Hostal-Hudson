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

// Calendario mensual con soporte de selección por rango (click + drag).
function monthGrid(year, month, busy, toggle, rangeStart, rangeEnd, dragging, onRangeStart, onRangeSelect, onDragEnd) {
  const startPad = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let k = 0; k < startPad; k++) cells.push(<span key={`p${k}`} />);
  for (let d = 1; d <= days; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isBusy = busy.has(iso);
    const inRange = rangeStart && rangeEnd
      ? new Date(iso) >= new Date(rangeStart) && new Date(iso) <= new Date(rangeEnd)
      : false;
    cells.push(
      <button
        key={iso}
        className={`cal-day ${isBusy ? 'cal-busy' : 'cal-free'} ${inRange ? 'cal-range' : ''} ${dragging && inRange ? 'cal-dragging' : ''}`}
        onMouseDown={(e) => { e.preventDefault(); onRangeStart(iso); }}
        onMouseEnter={() => { if (dragging) onRangeSelect(iso); }}
        onMouseUp={onDragEnd}
        onClick={() => toggle(iso)}
        title={iso}
      >
        {d}
      </button>
    );
  }
  return cells;
}

// Panel privado del dueño.
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
  const [overrides, setOverrides] = useState({});
  const [form, setForm] = useState({ nombre: '', llegada: '', noches: 1, personas: 2, telefono: '', nota: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [saving, setSaving] = useState(false);
  const [repMonth, setRepMonth] = useState(() => { const t = new Date(); return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}`; });

  // Auditoría
  const [auditLog, setAuditLog] = useState([]);
  // Cambio de clave
  const [showKeyChange, setShowKeyChange] = useState(false);
  const [ckey, setCkey] = useState('');
  const [nkey, setNkey] = useState('');
  const [ckey2, setCkey2] = useState('');
  const [keyMsg, setKeyMsg] = useState('');
  // Calendario por rango
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    let mounted = true;
    // Verificar sesión con el servidor antes de mostrar cualquier cosa
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((d) => { if (mounted) setOpen(Boolean(d.ok)); })
      .catch(() => { if (mounted) setOpen(false); });

    // Cargar estado guardado en el servidor (si hay URL configurada)
    fetch('/api/admin/state')
      .then((r) => r.json())
      .then((d) => {
        if (!mounted || !d.ok || !d.data) return;
        const data = d.data;
        if (data.estados) { setEstados(data.estados); try { localStorage.setItem('hostal-estados', JSON.stringify(data.estados)); } catch {} }
        if (data.notas) { setNotas(data.notas); try { localStorage.setItem('hostal-notas', JSON.stringify(data.notas)); } catch {} }
        if (data.busy) { setBusy(new Set(data.busy)); try { localStorage.setItem('hostal-busy', JSON.stringify(data.busy)); } catch {} }
        if (data.overrides) { setOverrides(data.overrides); try { localStorage.setItem('hostal-overrides', JSON.stringify(data.overrides)); } catch {} }
        if (data.manual) { setManual(data.manual); try { localStorage.setItem('hostal-manual', JSON.stringify(data.manual)); } catch {} }
        if (data.auditLog) { setAuditLog(data.auditLog); try { localStorage.setItem('hostal-audit', JSON.stringify(data.auditLog)); } catch {} }
      })
      .catch(() => {});

    // Cargar del navegador (fallback / primera vez)
    try {
      if (sessionStorage.getItem('hostal-admin') === '1') setOpen(true);
      const saved = localStorage.getItem('hostal-busy');
      if (saved) setBusy(new Set(JSON.parse(saved)));
      const es = localStorage.getItem('hostal-estados');
      if (es) setEstados(JSON.parse(es));
      const mn = localStorage.getItem('hostal-manual');
      if (mn) setManual(JSON.parse(mn));
      const ov = localStorage.getItem('hostal-overrides');
      if (ov) setOverrides(JSON.parse(ov));
      const nt = localStorage.getItem('hostal-notas');
      if (nt) setNotas(JSON.parse(nt));
      const al = localStorage.getItem('hostal-audit');
      if (al) setAuditLog(JSON.parse(al));
    } catch {}
    fetch('/api/status').then((r) => r.json()).then(setStatus).catch(() => {});
    return () => { mounted = false; };
  }, []);

  // Guarda en servidor (si está configurado) y localStorage tras cualquier cambio
  useEffect(() => {
    let t;
    t = setTimeout(() => saveState(), 800);
    return () => clearTimeout(t);
  }, [estados, notas, busy, manual, overrides, auditLog]);

  async function saveState() {
    try {
      const payload = { manual, estados, notas, busy: [...busy], overrides, auditLog };
      await fetch('/api/admin/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {}
    try {
      localStorage.setItem('hostal-manual', JSON.stringify(manual));
      localStorage.setItem('hostal-estados', JSON.stringify(estados));
      localStorage.setItem('hostal-notas', JSON.stringify(notas));
      localStorage.setItem('hostal-busy', JSON.stringify([...busy]));
      localStorage.setItem('hostal-overrides', JSON.stringify(overrides));
      localStorage.setItem('hostal-audit', JSON.stringify(auditLog));
    } catch {}
  }

  function audit(accion, objetivo, detalle = '') {
    const entrada = { fecha: new Date().toISOString(), accion, objetivo: String(objetivo), detalle };
    setAuditLog((prev) => [entrada, ...prev].slice(0, 200));
    try {
      const guardado = localStorage.getItem('hostal-audit');
      const arr = guardado ? JSON.parse(guardado) : [];
      arr.unshift(entrada);
      localStorage.setItem('hostal-audit', JSON.stringify(arr.slice(0, 200)));
    } catch {}
  }

  async function login(e) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
    const d = await res.json().catch(() => ({ ok: false }));
    if (d.ok) {
      setOpen(true);
      audit('login', 'panel', 'Sesión iniciada');
      try { sessionStorage.setItem('hostal-admin', '1'); } catch {}
    } else {
      audit('login_fallido', 'panel', 'Clave incorrecta');
      alert('Clave incorrecta');
    }
  }

  async function changeKey() {
    if (!nkey || nkey.length < 4) return setKeyMsg('La clave nueva debe tener al menos 4 caracteres');
    if (nkey !== ckey2) return setKeyMsg('Las claves nuevas no coinciden');
    setKeyMsg('');
    const res = await fetch('/api/admin/key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentKey: ckey, newKey: nkey }),
    });
    const d = await res.json().catch(() => ({ ok: false }));
    if (d.ok) {
      audit('cambio_clave', 'panel', 'Clave de acceso cambiada');
      setKeyMsg('Clave actualizada. Úsala la próxima vez que entres.');
      setCkey(''); setNkey(''); setCkey2('');
      setShowKeyChange(false);
    } else {
      setKeyMsg(d.error || 'No se pudo cambiar la clave');
    }
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
    audit('nota', r.nombre, v ? `Nota agregada` : 'Nota borrada');
  }
  function setEstado(r, v) {
    setEstados((prev) => {
      const next = { ...prev, [rowKey(r)]: v };
      try { localStorage.setItem('hostal-estados', JSON.stringify(next)); } catch {}
      return next;
    });
    audit('estado', r.nombre, `${estadoDe(r)} → ${v}`);
  }

  // Filas visibles: planilla (+ correcciones locales) + manuales.
  const allRows = useMemo(() => {
    const base = (rows || []).map((r) => {
      const ov = overrides[rowKey(r)];
      return ov ? { ...r, ...ov, editada: true } : { ...r, origen: r.origen || 'web' };
    });
    return [...base, ...manual];
  }, [rows, manual, overrides]);

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
      <table border="1" cellpadding="6" cellspacing="0"><tr><th>Nombre</th><th>Llegada</th><th>Noches</th><th>Personas</th><th>Estado</th><th>Nota</th></tr>
      ${list.map((r) => `<tr><td>${r.nombre}</td><td>${r.llegada}</td><td>${r.noches}</td><td>${r.personas}</td><td>${estadoDe(r)}</td><td>${notaDe(r) || ''}</td></tr>`).join('')}
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
    if (editingId) {
      const isManual = manual.some((m) => m.id === editingId);
      const patch = {
        nombre: f.nombre.trim().slice(0, 80),
        llegada: f.llegada.slice(0, 10),
        noches: Math.max(1, Math.min(60, Number(f.noches) || 1)),
        personas: Math.max(1, Math.min(20, Number(f.personas) || 1)),
        telefono: String(f.telefono || '').replace(/\D/g, '').slice(0, 15),
      };
      if (isManual) {
        setManual((prev) => {
          const next = prev.map((m) => m.id === editingId ? { ...m, ...patch } : m);
          try { localStorage.setItem('hostal-manual', JSON.stringify(next)); } catch {}
          return next;
        });
      } else {
        const okey = editingKey || editingId;
        setOverrides((prev) => {
          const next = { ...prev, [okey]: patch };
          try { localStorage.setItem('hostal-overrides', JSON.stringify(next)); } catch {}
          return next;
        });
      }
      const target = { id: editingKey || editingId, nombre: patch.nombre, llegada: patch.llegada };
      if (f.nota.trim()) setNota(target, f.nota.trim());
      audit('edicion', patch.nombre, isManual ? 'Reserva manual editada' : 'Reserva web corregida localmente');
      setEditingId(null);
      setEditingKey(null);
      setForm({ nombre: '', llegada: '', noches: 1, personas: 2, telefono: '', nota: '' });
      setSaving(false);
      setShowNew(false);
      return;
    }
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
    audit('nueva_reserva', entry.nombre, 'Reserva directa creada desde el panel');
    setForm({ nombre: '', llegada: '', noches: 1, personas: 2, telefono: '', nota: '' });
    setSaving(false);
    setShowNew(false);
  }

  function startEdit(r) {
    setForm({ nombre: r.nombre, llegada: String(r.llegada).slice(0, 10), noches: r.noches, personas: r.personas, telefono: r.telefono || '', nota: notaDe(r) });
    setEditingId(r.id || rowKey(r));
    setEditingKey(rowKey(r));
    setShowNew(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function deleteManual(r) {
    if (!confirm(`¿Eliminar la reserva de ${r.nombre}?`)) return;
    setManual((prev) => {
      const next = prev.filter((m) => m.id !== r.id);
      try { localStorage.setItem('hostal-manual', JSON.stringify(next)); } catch {}
      return next;
    });
    setEstados((prev) => { const n = { ...prev }; delete n[rowKey(r)]; try { localStorage.setItem('hostal-estados', JSON.stringify(n)); } catch {} return n; });
    setNotas((prev) => { const n = { ...prev }; delete n[rowKey(r)]; try { localStorage.setItem('hostal-notas', JSON.stringify(n)); } catch {} return n; });
    audit('eliminar_reserva', r.nombre, 'Reserva manual eliminada');
  }
  function shiftSummary() {
    const L = [`🏠 Turno Hostal Hudson — ${fmtDate(todayISO())}`, ''];
    L.push(`🛬 Llegan (${kpis.lleganHoy.length}): ${kpis.lleganHoy.map((r) => `${r.nombre} ${r.personas}p`).join(', ') || '—'}`);
    L.push(`🛫 Se van (${kpis.salenHoy.length}): ${kpis.salenHoy.map((r) => `${r.nombre} ${r.personas}p`).join(', ') || '—'}`);
    L.push(`🛏️ En casa (${kpis.enCasa.length}): ${kpis.enCasa.map((r) => r.nombre).join(', ') || '—'}`);
    const withNotes = kpis.enCasa.map((r) => ({ r, n: notaDe(r) })).filter((x) => x.n);
    if (withNotes.length) { L.push('', '📝 Notas:'); withNotes.forEach((x) => L.push(`· ${x.r.nombre}: ${x.n}`)); }
    return `https://wa.me/?text=${encodeURIComponent(L.join('\n'))}`;
  }
  function backup() {
    const data = { manual, estados, notas, busy: [...busy], overrides, auditLog, fecha: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `respaldo-hostal-${todayISO()}.json`;
    a.click();
    audit('respaldo', 'panel', 'Backup descargado');
  }
  function restore(e) {
    const f = e.target.files[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const d = JSON.parse(rd.result);
        if (d.manual) { setManual(d.manual); localStorage.setItem('hostal-manual', JSON.stringify(d.manual)); }
        if (d.estados) { setEstados(d.estados); localStorage.setItem('hostal-estados', JSON.stringify(d.estados)); }
        if (d.notas) { setNotas(d.notas); localStorage.setItem('hostal-notas', JSON.stringify(d.notas)); }
        if (d.busy) { setBusy(new Set(d.busy)); localStorage.setItem('hostal-busy', JSON.stringify(d.busy)); }
        if (d.overrides) { setOverrides(d.overrides); localStorage.setItem('hostal-overrides', JSON.stringify(d.overrides)); }
        if (d.auditLog) { setAuditLog(d.auditLog); localStorage.setItem('hostal-audit', JSON.stringify(d.auditLog)); }
        alert('Respaldo restaurado');
        audit('restaurar', 'panel', 'Backup restaurado');
      } catch { alert('Archivo inválido'); }
    };
    rd.readAsText(f);
    e.target.value = '';
  }

  function exportCSV() {
    const head = 'nombre,llegada,noches,personas,telefono,estado,nota';
    const lines = filtered.map((r) => [r.nombre, r.llegada, r.noches, r.personas, r.telefono || '', estadoDe(r), notaDe(r)].map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));
    const blob = new Blob([[head, ...lines].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'reservas.csv';
    a.click();
    audit('exportar_csv', 'panel', `${filtered.length} filas exportadas`);
  }

  function toggle(iso) {
    const antes = busy.has(iso);
    setBusy((prev) => {
      const next = new Set(prev);
      if (next.has(iso)) next.delete(iso);
      else next.add(iso);
      try { localStorage.setItem('hostal-busy', JSON.stringify([next])); } catch {}
      return next;
    });
    audit('toggle_ocupado', iso, antes ? 'Liberado' : 'Marcado como ocupado');
  }
  // toggle con rango
  function toggleRange(startIso, endIso) {
    const start = new Date(startIso);
    const end = new Date(endIso);
    const days = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
    }
    setBusy((prev) => {
      const next = new Set(prev);
      let added = 0, removed = 0;
      days.forEach((iso) => {
        if (next.has(iso)) { next.delete(iso); removed++; }
        else { next.add(iso); added++; }
      });
      try { localStorage.setItem('hostal-busy', JSON.stringify([...next])); } catch {}
      audit('toggle_rango', `${startIso} al ${endIso}`, `${added} días ocupados, ${removed} liberados`);
      return next;
    });
    setRangeStart(null); setRangeEnd(null); setDragging(false);
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
        <button className={`btn ${tab === 'state' ? '' : 'btn-outline'}`} onClick={() => setTab('state')}>Conexiones</button>{' '}
        <button className={`btn ${tab === 'historial' ? '' : 'btn-outline'}`} onClick={() => setTab('historial')}>Historial</button>{' '}
        <button className={`btn ${tab === 'clave' ? '' : 'btn-outline'}`} onClick={() => setTab('clave')}>Clave</button>
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
              <div>
                <strong>🛬 Llegan ({kpis.lleganHoy.length})</strong>
                {kpis.lleganHoy.length === 0 ? <p className="muted">Nadie hoy.</p> : kpis.lleganHoy.map((r) => (
                  <p key={rowKey(r)}>{r.nombre} ({r.personas}p){' '}
                    <button className="btn btn-green" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setEstado(r, 'check-in')}>✓ Check-in</button>
                  </p>
                ))}
              </div>
              <div>
                <strong>🛫 Se van ({kpis.salenHoy.length})</strong>
                {kpis.salenHoy.length === 0 ? <p className="muted">Nadie hoy.</p> : kpis.salenHoy.map((r) => (
                  <p key={rowKey(r)}>{r.nombre} ({r.personas}p){' '}
                    <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setEstado(r, 'check-out')}>✓ Check-out</button>
                  </p>
                ))}
              </div>
              <div>
                <strong>🛏️ En casa ({kpis.enCasa.length})</strong>
                <p className="muted">{kpis.enCasa.length ? kpis.enCasa.map((r) => r.nombre).join(' · ') : 'Vacío hoy.'}</p>
                <p><a className="btn btn-green" style={{ padding: '8px 14px' }} href={shiftSummary()} target="_blank">📤 Resumen de turno</a></p>
              </div>
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
              <button className="btn btn-green" onClick={() => { setEditingId(null); setEditingKey(null); setForm({ nombre: '', llegada: '', noches: 1, personas: 2, telefono: '', nota: '' }); setShowNew(!showNew); }}>＋ Nueva reserva directa</button>{' '}
              <button className="btn btn-outline" onClick={loadBookings}>↻ Actualizar</button>{' '}
              <button className="btn btn-outline" onClick={exportCSV}>⬇ Exportar CSV</button>{' '}
              <button className="btn btn-outline" onClick={() => window.print()}>🖨 Imprimir llegadas</button>{' '}
              <button className="btn btn-outline" onClick={backup}>💾 Respaldo</button>{' '}
              <label className="btn btn-outline" style={{ cursor: 'pointer' }}>📥 Restaurar<input type="file" accept=".json" onChange={restore} style={{ display: 'none' }} /></label>
            </p>
            {showNew && (
              <form onSubmit={saveManual} className="card" style={{ border: '2px solid #16a34a', background: '#f0fdf4' }}>
                <h3>{editingId ? '✏️ Editar reserva' : '📞 Nueva reserva directa'}</h3>
                {!editingId && <p className="muted">Para pasajeros que reservaron por teléfono, WhatsApp o presencial. Queda en estado <strong>confirmada</strong>.</p>}
                {editingId && !String(editingId).startsWith('m') && <p className="muted">Corrección local de una reserva web: la planilla original no cambia.</p>}
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
                  <button className="btn btn-outline" type="button" onClick={() => { setShowNew(false); setEditingId(null); setEditingKey(null); }}>Cancelar</button>
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
                            <span title={r.origen === 'manual' ? 'Reserva directa (teléfono/presencial)' : 'Reserva por la web'}>{r.origen === 'manual' ? '📞' : '🌐'}</span>{' '}
                            {r.editada && <span className="badge badge-warn" title="Corregida desde el panel (la planilla original no cambia)">✏️ editada</span>}
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
                            <button className="btn btn-outline" style={{ padding: '6px 10px' }} onClick={() => startEdit(r)} title="Editar">✏️</button>{' '}
                            {r.origen === 'manual' && (
                              <button className="btn btn-outline" style={{ padding: '6px 10px' }} onClick={() => deleteManual(r)} title="Eliminar">🗑️</button>
                            )}{' '}
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
          <h3>Marca tus días ocupados (clic individual, o click + arrastre para rango)</h3>
          <div className="grid-2">
            {months.map((m) => (
              <div key={m.toISOString()}>
                <strong style={{ textTransform: 'capitalize' }}>
                  {m.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}
                </strong>
                <div className="mini-cal">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => <span key={d} className="cal-head">{d}</span>)}
                  {monthGrid(m.getFullYear(), m.getMonth(), busy, toggle, rangeStart, rangeEnd, dragging, setRangeStart, (iso) => setRangeEnd(iso), () => setDragging(false))}
                </div>
                <p className="muted" style={{ marginTop: 6 }}>
                  {rangeStart && rangeEnd ? `Rango seleccionado: ${rangeStart} → ${rangeEnd}` : ''}
                  <button className="btn btn-green" style={{ padding: '4px 10px', fontSize: 12, marginLeft: 8 }} onClick={() => toggleRange(rangeStart, rangeEnd)} disabled={!rangeStart || !rangeEnd}>
                    Aplicar rango
                  </button>
                  <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 12, marginLeft: 6 }} onClick={() => { setRangeStart(null); setRangeEnd(null); setDragging(false); }}>
                    Cancelar
                  </button>
                </p>
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

      {tab === 'historial' && (
        <div className="card">
          <h3>📜 Historial de cambios (auditoría)</h3>
          <p className="muted">Últimas 200 acciones guardadas en este navegador y sincronizadas si configuraste ADMIN_STATE_URL.</p>
          {auditLog.length === 0 ? (
            <p className="muted">Sin registros aún.</p>
          ) : (
            <div style={{ maxHeight: 500, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, background: '#f9fafb' }}>
              {auditLog.map((e, i) => (
                <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #eee', fontSize: 13, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#6b7280', whiteSpace: 'nowrap' }}>{new Date(e.fecha).toLocaleString('es-CL')}</span>
                  <span style={{ fontWeight: 600, color: '#1f2937' }}>{e.accion}</span>
                  <span style={{ color: '#4b5563' }}>{e.objetivo}</span>
                  {e.detalle && <span style={{ color: '#6b7280' }}>· {e.detalle}</span>}
                </div>
              ))}
            </div>
          )}
          <p style={{ marginTop: 10 }}>
            <button className="btn btn-outline" onClick={() => { setAuditLog([]); localStorage.removeItem('hostal-audit'); audit('limpiar_historial', 'panel', 'Historial borrado'); }}>🗑️ Vaciar historial</button>
          </p>
        </div>
      )}

      {tab === 'clave' && (
        <div className="card">
          <h3>🔑 Cambiar clave de acceso del admin</h3>
          <p className="muted">La clave se guarda en el servidor (no en el código). Si olvidas la clave, tendrás que redeployar con una nueva ADMIN_KEY.</p>
          {keyMsg && <p style={{ color: keyMsg.startsWith('Clave actualizada') ? '#16a34a' : '#dc2626', marginBottom: 10 }}>{keyMsg}</p>}
          <form onChange={(e) => {}} className="grid-2" style={{ gap: 12 }}>
            <div>
              <label>Clave actual</label>
              <input type="password" value={ckey} onChange={(e) => setCkey(e.target.value)} placeholder="Clave actual" />
            </div>
            <div>
              <label>Clave nueva</label>
              <input type="password" value={nkey} onChange={(e) => setNkey(e.target.value)} placeholder="Mínimo 4 caracteres" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label>Confirmar clave nueva</label>
              <input type="password" value={ckey2} onChange={(e) => setCkey2(e.target.value)} placeholder="Repite la clave nueva" />
            </div>
          </form>
          <p style={{ marginTop: 10 }}>
            <button className="btn btn-green" onClick={changeKey} disabled={!ckey || !nkey || !ckey2}>✓ Cambiar clave</button>{' '}
            <button className="btn btn-outline" onClick={() => { setShowKeyChange(false); setCkey(''); setNkey(''); setCkey2(''); setKeyMsg(''); }}>Cancelar</button>
          </p>
        </div>
      )}
    </div>
  );
}
