import { NextResponse } from 'next/server';
import { ADMIN_KEY, ADMIN_DISPONIBLE } from '../../../../lib/admin-config';
import { leerEstadoAdmin } from '../../../../lib/admin-state';
import { crearTokenSesion, DURACION_SESION_SEG, clavesIguales } from '../../../../lib/session';
import { ipDe, estaBloqueado, registrarFallo, limpiarFallos } from '../../../../lib/login-limit';

// POST /api/auth/login  { key } → setea cookie HttpOnly si la clave es correcta
export async function POST(req) {
  // Sin ADMIN_KEY en el servidor no se puede entrar: falla cerrado en vez de
  // dejar pasar con la clave por defecto (que además está en el código).
  if (!ADMIN_DISPONIBLE) {
    return Response.json(
      { ok: false, error: 'ADMIN_KEY no está configurada en el servidor' },
      { status: 503 }
    );
  }

  const ip = ipDe(req);

  let body;
  try { body = await req.json(); } catch { return Response.json({ ok: false }, { status: 400 }); }
  const key = body?.key;

  // Vale la clave del servidor o la que el dueño cambió desde el panel.
  let valida = clavesIguales(key, ADMIN_KEY);
  if (!valida) {
    const estado = await leerEstadoAdmin();
    valida = clavesIguales(key, estado.adminKeyOverride);
  }
  if (!valida) {
    // Después de varios intentos fallidos se frena la IP (fuerza bruta).
    // La clave correcta siempre pasa: si te equivocaste, no te quedas fuera.
    if (estaBloqueado(ip)) {
      return Response.json(
        { ok: false, error: 'Demasiados intentos fallidos. Espera unos minutos.' },
        { status: 429 }
      );
    }
    registrarFallo(ip);
    return Response.json({ ok: false }, { status: 401 });
  }
  limpiarFallos(ip);

  // NextResponse (no Response) para poder setear la cookie de sesión.
  const res = NextResponse.json({ ok: true });
  res.cookies.set('hostal-session', crearTokenSesion(), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: DURACION_SESION_SEG,
  });
  return res;
}
