// Límite de pedidos por IP (en memoria del proceso), mismo patrón que
// lib/login-limit.js. En Vercel cada instancia tiene su propio mapa: alcanza
// para frenar el spam básico contra /api/reserva, pero con plan Pro conviene
// migrarlo a Vercel KV (estado compartido entre instancias) o a Vercel Firewall.
import 'server-only';

const MAX_PEDIDOS = 10;
const VENTANA_MS = 10 * 60 * 1000; // 10 minutos

const pedidos = new Map(); // ip -> { n, hasta }

export function ipDe(req) {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'desconocida';
}

export function excedeLimite(ip) {
  const reg = pedidos.get(ip);
  if (!reg) return false;
  if (Date.now() > reg.hasta) {
    pedidos.delete(ip);
    return false;
  }
  return reg.n >= MAX_PEDIDOS;
}

export function registrarPedido(ip) {
  const reg = pedidos.get(ip);
  if (!reg || Date.now() > reg.hasta) {
    pedidos.set(ip, { n: 1, hasta: Date.now() + VENTANA_MS });
    return;
  }
  reg.n += 1;
}
