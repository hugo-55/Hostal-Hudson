import { cookies } from 'next/headers';
import { ADMIN_DISPONIBLE } from '../../../../lib/admin-config';
import { tokenSesionValido } from '../../../../lib/session';
import {
  estadoRemotoDisponible,
  guardarEstadoAdmin,
  leerEstadoAdmin,
} from '../../../../lib/admin-state';

// GET  /api/admin/state → { estados, notas, busy, overrides, ... }
// POST /api/admin/state → guarda { estados, notas, busy, overrides, ... }
// Backend: Vercel Blob privado (o Sheets si algún día se configura).
// Solo el dueño del panel puede leer o escribir: la cookie de sesión va firmada
// y con expiración (no basta con mandar '1' a mano).
function autorizado() {
  if (!ADMIN_DISPONIBLE) return false;
  const token = cookies().get('hostal-session')?.value;
  return tokenSesionValido(token);
}

export async function GET() {
  if (!autorizado()) return Response.json({ ok: false, error: 'no autorizado' }, { status: 401 });
  if (!estadoRemotoDisponible()) return Response.json({ ok: true, data: {} });
  const data = await leerEstadoAdmin();
  return Response.json({ ok: true, data: data || {} });
}

export async function POST(req) {
  if (!autorizado()) return Response.json({ ok: false, error: 'no autorizado' }, { status: 401 });
  if (!estadoRemotoDisponible()) return Response.json({ ok: false, error: 'no configurado' }, { status: 400 });
  try {
    const body = await req.json();
    // Merge (no reemplazo): así el guardado automático del panel no borra la
    // clave nueva que el dueño cambió desde /admin.
    const ok = await guardarEstadoAdmin(body);
    if (!ok) throw new Error('guardado falló');
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
