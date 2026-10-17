import { ADMIN_KEY } from '../../../../lib/site';

// GET  /api/admin/key → { hasOverride: boolean }
// POST /api/admin/key  { currentKey, newKey } → cambia la clave de acceso del admin
// Guarda la override en /api/admin/state para que persista entre redeploys.
export async function GET() {
  try {
    const r = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}/api/admin/state`, { next: { revalidate: 0 } });
    const d = await r.json();
    return Response.json({ hasOverride: Boolean(d.data?.adminKeyOverride) });
  } catch {
    return Response.json({ hasOverride: false });
  }
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: 'JSON inválido' }, { status: 400 }); }
  const { currentKey, newKey } = body;
  if (!currentKey || !newKey || newKey.length < 4) {
    return Response.json({ ok: false, error: 'Claves inválidas' }, { status: 400 });
  }

  // Verificar currentKey contra la env o la override guardada
  let valid = false;
  if (currentKey === ADMIN_KEY) valid = true;
  else {
    try {
      const r = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}/api/admin/state`, { next: { revalidate: 0 } });
      const d = await r.json();
      if (d.data?.adminKeyOverride === currentKey) valid = true;
    } catch {}
  }

  if (!valid) return Response.json({ ok: false, error: 'Clave actual incorrecta' }, { status: 401 });

  // Guardar nueva clave como override
  try {
    const payload = { adminKeyOverride: newKey };
    await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}/api/admin/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Si falla el servidor, seguimos (se guarda en localStorage del cliente)
  }

  return Response.json({ ok: true });
}
