// Sesión del panel del dueño (solo servidor).
// La cookie lleva un token firmado con HMAC y fecha de expiración, en vez de un
// valor fijo tipo '1' (que cualquiera podía falsificar desde el navegador).
import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { ADMIN_KEY } from './admin-config';

export const DURACION_SESION_SEG = 60 * 60 * 8; // 8 horas

// Si no hay ADMIN_KEY (producción sin configurar) NO se puede firmar nada:
// el panel queda cerrado en vez de dejar entrar con una clave pública.
const claveFirma = ADMIN_KEY;

function firmar(datos) {
  if (!claveFirma) return null;
  return createHmac('sha256', claveFirma).update(datos).digest('hex');
}

function comparar(a, b) {
  if (!a || !b) return false;
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Compara dos claves (login) sin filtrar tiempos.
export function clavesIguales(a, b) {
  return comparar(a, b);
}

// Token de sesión: "<expiración_ms>.<firma>".
export function crearTokenSesion() {
  if (!claveFirma) return null;
  const exp = Date.now() + DURACION_SESION_SEG * 1000;
  return `${exp}.${firmar(String(exp))}`;
}

export function tokenSesionValido(token) {
  if (!claveFirma) return false;
  if (!token || typeof token !== 'string') return false;
  const [exp, firma] = token.split('.');
  if (!exp || !firma) return false;
  const expMs = Number(exp);
  if (!Number.isFinite(expMs) || expMs < Date.now()) return false;
  return comparar(firma, firmar(exp));
}
