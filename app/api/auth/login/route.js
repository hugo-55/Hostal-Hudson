import { NextResponse } from 'next/server';
import { ADMIN_KEY } from '../../../../lib/site';

// POST /api/auth/login  { key } → setea cookie HttpOnly si la clave es correcta
export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ ok: false }, { status: 400 }); }
  if (body.key !== ADMIN_KEY) return Response.json({ ok: false }, { status: 401 });

  // NextResponse (no Response) para poder setear la cookie de sesión.
  const res = NextResponse.json({ ok: true });
  res.cookies.set('hostal-session', '1', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 horas
  });
  return res;
}
