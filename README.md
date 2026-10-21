# Hostal Hudson — versión renovada (demo con permiso de los dueños)

Vivo en: https://hostal-hudson.vercel.app/ — Repo: https://github.com/hugo-55/Hostal-Hudson

Rebuild rápido del sitio 2016 (Joomla) en Next.js estático.

## Qué mejora vs el original
- Carga <1s vs varios segundos, 100% mobile-first
- Reserva por WhatsApp en 1 minuto (antes: formulario sin respuesta clara)
- Tarifas y transferencia a la vista, sin buscar en subpáginas
- Testimonios reales, mapa, FAQ y botón flotante siempre visible

## Rutas
- `/` portada con fotos reales + reserva
- `/habitaciones` `/tarifas` `/galeria` `/reservas`

## Correr / deploy
npm install / npm run dev — igual que tienda-demo (Vercel, sin env vars).

### Env vars (solo para el panel del dueño `/admin` y las reservas reales)
- `ADMIN_KEY` — clave del panel. **Obligatoria en producción**: sin ella el login
  falla cerrado (503). En local la clave por defecto es `hudson123`.
- `ADMIN_STATE_URL` — URL del Apps Script que guarda reservas/notas/estados y la
  clave nueva del panel. Vacío = el estado se guarda solo en el navegador.
- Detalle paso a paso en [RESERVAS-SETUP.md](./RESERVAS-SETUP.md).

## Contenido
Textos, fotos, testimonios y datos de transferencia: reales del sitio original, usados con permiso de los dueños.
WhatsApp reservas: +56 9 9439 1571 (número real del hostal).
