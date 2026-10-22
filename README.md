# Hostal Hudson — versión renovada (demo con permiso de los dueños)

Repo: https://github.com/hugo-55/Hostal-Hudson — destino: https://www.hostalhudson.cl/

Rebuild rápido del sitio 2016 (Joomla) en Next.js estático.
**Estado**: la versión nueva todavía no está en producción; el dominio
`www.hostalhudson.cl` hoy lo sirve el sitio anterior (Joomla, en Index
Patagonia). La guía para el cambio está en
[PUBLICAR-DOMINIO.md](./PUBLICAR-DOMINIO.md).

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

### Publicar en el dominio
El dominio `hostalhudson.cl` está registrado a nombre del dueño del hostal
(titular en NIC Chile, pagado hasta 2031); el desarrollador anterior solo
administra el panel del hosting, donde vive el DNS. Para poner esta web en
`www.hostalhudson.cl` hay que cambiar 3 registros DNS (sin tocar el `MX`, para
que el correo siga funcionando) y después pasar las variables
`SITE_PREVIEW` / `CANONICAL_REDIRECT`. Todo el detalle, los registros exactos
y el modelo de correo al desarrollador están en
[PUBLICAR-DOMINIO.md](./PUBLICAR-DOMINIO.md).

### Env vars (solo para el panel del dueño `/admin` y las reservas reales)
- `ADMIN_KEY` — clave (contraseña) del panel. Ya está definida en tu `.env.local`
  (archivo que no se sube a git). **Para que funcione en producción hay que copiarla
  a Vercel**: Settings → Environment Variables → `ADMIN_KEY` → Redeploy. Sin ella el
  login falla cerrado (503) y `/admin` no abre: es a propósito, antes la contraseña
  `hudson123` estaba escrita en el código y cualquiera que viera el repo entraba.
- `ADMIN_STATE_URL` — URL del Apps Script que guarda reservas/notas/estados y la
  clave nueva del panel. Vacío = el estado se guarda solo en el navegador.
- Detalle paso a paso en [RESERVAS-SETUP.md](./RESERVAS-SETUP.md).

## Contenido
Textos, fotos, testimonios y datos de transferencia: reales del sitio original, usados con permiso de los dueños.
WhatsApp reservas: +56 9 9439 1571 (número real del hostal).
