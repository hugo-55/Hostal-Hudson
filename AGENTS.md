# AGENTS.md — Hostal Hudson

Sitio web del Hostal Hudson (Puerto Aysén, Chile). Next.js 14 App Router, React 18,
JavaScript (sin TypeScript). Deploy estático en Vercel sin variables de entorno
obligatorias. Contenido y datos son reales, usados con permiso de los dueños.

- Producción: https://hostal-hudson.vercel.app/
- Repo: https://github.com/hugo-55/Hostal-Hudson

## Comandos

```bash
npm install
npm run dev     # desarrollo en http://localhost:3000
npm run build   # verificación de producción
npm run start   # servir el build
```

No hay lint ni test configurados. Verificá con `npm run build` o navegando las
rutas en `npm run dev`.

## Entorno Android / Termux (tablet)

El tablet corre Android arm64 y los binarios nativos de SWC no corren en esa
plataforma. Para que funcione localmente se usa el fallback WASM:

- `next.config.tablet.js` (LOCAL, en `.gitignore`) declara
  `experimental.useWasmBinary: true`. El `next.config.js` que sí se commitea lo
  carga con un `require()` protegido y queda limpio: cuando el archivo no
  existe (PC, Vercel), el config no lleva nada del parche WASM.
- `node_modules/next/dist/build/swc/index.js` está parcheado localmente
  (`loadBindings(useWasmBinary = true)`) y `@next/swc-wasm-nodejs` instalado
  (la última versión publicada, 14.2.33).
- **IMPORTANTE:** el parche SWC se re-aplica después de cada `npm install` o
  upgrade de Next, porque reinstalar reescribe `node_modules/`.
  `@next/swc-wasm-nodejs` solo existe en npm hasta 14.2.33: si se sube Next más
  allá, el fallback WASM queda sin binario y el tablet no compila.

**IMPORTANTE:** no commitear `next.config.tablet.js`. Al commitear usá
`git add <archivo>` selectivo y nunca `git add -A` / `git add .`.
`node_modules/`, `.next/` y `.env*` ya están en `.gitignore`
(`.env.example` sí se commitea).

## Estructura

- `app/` — rutas App Router: `/`, `/habitaciones`, `/tarifas`, `/galeria`,
  `/reservas`, `/visitar`, `/guia`, `/admin`.
- `app/api/` — endpoints: `reserva`, `reviews`, `status`, `auth/login`,
  `auth/session`, `admin/key`, `admin/state`.
- `app/layout.jsx` — metadata global, fuentes, JSON-LD, Analytics.
- `app/sitemap.js`, `app/manifest.js`, `app/icon.png` — SEO/PWA.
- `components/` — UI reutilizable (NavBar, BookingBar, AdminPanel,
  Availability, CookieConsent, Schema, SmartImg, Widgets, etc.).
- `lib/site.js` — **fuente de datos del sitio**: teléfono, dirección, email,
  tarifa referencial, servicios, testimonios, endpoints de reservas/estado y
  `ADMIN_KEY`.
- `lib/i18n.js` — diccionario ES/EN y `LangProvider`.
- `public/` — imágenes y assets.
- Documentos de setup: `AVAILABILITY-SETUP.md`, `RESERVAS-SETUP.md`,
  `GOOGLE-REVIEWS-SETUP.md`.

## Datos y configuración

- Todo dato editable (precios, teléfono, textos de contacto, testimonios,
  endpoints) vive en `lib/site.js`; no lo dupliques en componentes.
- `lib/site.js` indica qué valores están pendientes de reemplazar por datos
  reales (p. ej. `RATE_PER_PERSON_NIGHT`, `AVAILABILITY_CSV`, `SHEET_ENDPOINT`).
- **Nunca inventes** precios, teléfonos, direcciones, reseñas ni datos de
  transferencia. Si falta un dato, dejalo configurable/vacío y avisá.
- La clave de admin va en `ADMIN_KEY` (servidor). No la expongas al cliente ni
  la commitees. Para pruebas locales va en `.env.local`.

## Convenciones

- Contenido en español (Chile), tono cercano y claro; mantener el tono actual.
- Mobile-first: la mayoría del tráfico es celular.
- No agregues comentarios en el código salvo que se pidan.
- Seguí los patrones existentes de componentes y estilos (`app/globals.css`,
  CSS modules/inline según el archivo).
- Mantené accesibilidad (alt, aria, foco, contraste) y SEO (metadata,
  encabezados, enlaces internos, JSON-LD) al editar.
- Reservas: el flujo principal es WhatsApp (`waLink` en `lib/site.js`).

## Git

1. `git pull` antes de empezar a trabajar.
2. `git status` y `git diff` antes de commitear.
3. `git add <archivos>` selectivo (excluir `next.config.tablet.js` y `node_modules/`).
4. Commits descriptivos en español, siguiendo el estilo del historial.
5. No commitear secretos, `.env*`, `node_modules/` ni `.next/`.
