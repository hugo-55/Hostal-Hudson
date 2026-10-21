// Límite de intentos de login por IP (en memoria del proceso).
// En Vercel cada instancia tiene su propio mapa, pero frena el ataque
// automatizado básico contra la clave del panel.
import 'server-only';

const MAX_INTENTOS = 8;
const VENTANA_MS = 10 * 60 * 1000; // 10 minutos

const intentos = new Map(); // ip -> { n, hasta }

export function ipDe(req) {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'desconocida';
}

export function estaBloqueado(ip) {
  const reg = intentos.get(ip);
  if (!reg) return false;
  if (Date.now() > reg.hasta) {
    intentos.delete(ip);
    return false;
  }
  return reg.n >= MAX_INTENTOS;
}

export function registrarFallo(ip) {
  const reg = intentos.get(ip);
  if (!reg || Date.now() > reg.hasta) {
    intentos.set(ip, { n: 1, hasta: Date.now() + VENTANA_MS });
    return;
  }
  reg.n += 1;
}

export function limpiarFallos(ip) {
  intentos.delete(ip);
}
