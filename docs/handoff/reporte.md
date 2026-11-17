# Reporte de implementación — Ruta D v2 "Aysén vivo" en la app

Fecha: 2026-11-17
Rama: `rediseno/2026-11` (sin push; `main` intacto)
Commits: `2ac2f01` (implementación) y el commit de este reporte.
Este archivo reemplaza el reporte de exploración visual de la Ruta A: ahora
documenta el código entregado en la app Next.js.

## 1. Qué se implementó

- **F3 — Sistema visual** en `app/globals.css`, organizado en capas (tokens,
  base, utilidades, componentes globales, home/habitaciones, páginas heredadas
  y widgets). Paleta del brief: `--paper #FBFCF8`, `--paper-2 #F0F5EC`,
  `--ink #12211B`, `--muted #5A6B60`, `--forest #143D2E`,
  `--forest-2 #1F5A43`, `--moss #6E8B57`, `--wood #B9854F`, `--line #DCE5D6`.
  Se mantuvieron alias legacy (`--bg`, `--green`, `--teal-*`, `--amber`,
  `--shadow`) para que tarifas, galería, reservas, visitar, guía y privacidad
  sigan compilando y viéndose coherentes sin reescribirlas.
- **Aislamiento de /admin**: las reglas del panel (tablas, notas, stats,
  ocupación, barras, calendario de rango, responsive e impresión) se movieron a
  `app/admin/admin.css`, importado solo por `app/admin/layout.js`.
- **Header** (`components/NavBar.jsx`): logo real `public/img/logo.png`
  (179×70, 39 px desktop / 32 px móvil por CSS) arriba a la izquierda, línea
  "Puerto Aysén · Patagonia chilena", navegación con anclas
  (`/#el-hostal`, `/#resenas`, `/#ubicacion`), toggle ES/EN, botón "Reservar"
  verde bosque y menú móvil con SVG y `aria-expanded`/`aria-controls`.
- **Home** (`components/pages/HomeClient.jsx`) en el orden del brief: hero
  `aysen-puente.jpg` + panel verde con título y dos botones; franja de
  servicios; dos fichas de habitación + tarjeta verde de consulta; "El hostal"
  con `gal-hostal-exterior1.jpg` (letrero legible) y mosaico del salón; reseñas
  en verde con tarjetas blancas; ubicación con `aysen-letrero.jpg`; CTA final
  verde; footer verde con crédito de la foto.
- **Reseñas** (`components/Reviews.jsx`): rótulo "Huéspedes reales", título "Lo
  que dicen los huéspedes", bajada "6 reseñas en Google, todas de 5 estrellas.",
  tres citas reales sin editar de `lib/site.js` (Rodrigo Valenzuela, Dedy
  Lincoqueo Soto, Oscar Liendo), cinco estrellas SVG en `--wood`, fuente
  "Reseña de Google", carrusel `scroll-snap` en móvil sin autoplay y enlace a
  la búsqueda de Google Maps del hostal. Sin promedio numérico.
- **Habitaciones** (`components/pages/HabitacionesClient.jsx`): cabecera a
  sangre con `aysen-puente.jpg` y overlay verde al 55 %, título "Habitaciones
  con baño privado."; franja de servicios; filas Individual/Doble alternadas
  7/5 con etiqueta "Baño privado" en verde; banda "Familias y grupos" en verde;
  CTA final y footer verde.
- **Footer** (`components/Chrome.jsx`): verde en todo el sitio; el crédito
  "Foto del puente: Davidlohr Bueso, CC BY 2.0" enlazado a Wikimedia Commons se
  muestra solo en home y habitaciones (las páginas que usan la foto). El
  botón flotante de WhatsApp y el `StickyBook` usan SVG, sin emojis.
- **Datos**: `lib/contenido.js` agrega `ROOMS_ES` (Individual con
  `gal-hostal-interior3.jpg`, Doble con `gal-hostal-interior4.jpg`) como fuente
  única de la página y de su JSON-LD. `app/habitaciones/page.jsx` usa
  `ROOMS_ES`. `lib/seo.js` actualiza la descripción de habitaciones al
  contenido visible. `app/manifest.js` deja de usar `slide1.jpg` (coliseo) y
  toma `aysen-puente.jpg`; themeColor pasa a `#143D2E`.
- **i18n**: claves nuevas ES/EN (`facts`, `home`, `roomsPage`, `navA11y`,
  navegación) con traducción fiel del copy aprobado. No se agregaron datos.

## 2. Archivos

Modificados:

- `app/globals.css`
- `app/layout.jsx`
- `app/manifest.js`
- `app/habitaciones/page.jsx`
- `app/admin/layout.js`
- `components/NavBar.jsx`
- `components/Chrome.jsx`
- `components/Widgets.jsx`
- `components/pages/HomeClient.jsx`
- `components/pages/HabitacionesClient.jsx`
- `lib/contenido.js`
- `lib/i18n.js`
- `lib/seo.js`

Creados:

- `app/admin/admin.css`
- `components/FactsStrip.jsx`
- `components/FinalCta.jsx`
- `components/Reviews.jsx`

No se tocaron `app/api/**`, `lib/admin-config.js`, `next.config.js`,
`next.config.tablet.js` ni `node_modules/`.

## 3. Build real

Comando: `npm.cmd run build`

```
▲ Next.js 14.2.35

Creating an optimized production build ...
✓ Compiled successfully
Linting and checking validity of types ...
Collecting page data ...
✓ Generating static pages (22/22)
Finalizing page optimization ...
Collecting build traces ...

Route (app)                              Size     First Load JS
┌ ○ /                                    3.93 kB         108 kB
├ ○ /_not-found                          138 B          87.5 kB
├ ƒ /admin                               11.5 kB        98.8 kB
├ ƒ /api/admin/key                       0 B                0 B
├ ƒ /api/admin/state                     0 B                0 B
├ ƒ /api/auth/login                      0 B                0 B
├ ƒ /api/auth/session                    0 B                0 B
├ ƒ /api/reserva                         0 B                0 B
├ ○ /api/reviews                         0 B                0 B
├ ○ /api/status                          0 B                0 B
├ ○ /galeria                             1.2 kB          108 kB
├ ○ /guia                                735 B           108 kB
├ ○ /habitaciones                        3.16 kB         107 kB
├ ○ /icon.png                            0 B                0 B
├ ○ /manifest.webmanifest                0 B                0 B
├ ○ /privacidad                          2.94 kB         102 kB
├ ○ /reservas                            4.13 kB         103 kB
├ ○ /sitemap.xml                         0 B                0 B
├ ○ /tarifas                             4.26 kB         103 kB
└ ○ /visitar                             2.69 kB         110 kB
```

Sin warnings de build. Las 22 rutas se generan; `/admin` y los endpoints
requieren request (ƒ), como corresponde.

## 4. Verificación de rutas

Con `npm.cmd run start` en `localhost:3000`, respuesta HTTP comprobada:

| Ruta | Estado |
| --- | --- |
| `/` | 200 |
| `/habitaciones` | 200 |
| `/tarifas` | 200 |
| `/galeria` | 200 |
| `/reservas` | 200 |
| `/visitar` | 200 |
| `/guia` | 200 |
| `/privacidad` | 200 |
| `/admin` | 200 |

El HTML de la home se revisó por HTTP: incluye `aysen-puente`, el título del
hero, "Lo que dicen los huéspedes" y el crédito de Davidlohr Bueso.

**No verificado en esta ronda:** capturas y pruebas de navegador en 360, 768,
1024 y 1440 (el intento con Playwright falló porque el navegador se cerró).
Tampoco se probó el menú móvil ni el cambio ES/EN en navegador. Queda para QA
con Playwright antes de aprobar el corte.

## 5. Decisiones y ambigüedades resueltas

- El botón "Reservar" del header lleva a `/reservas` (página interna con el
  formulario que abre WhatsApp), no directo a `wa.me` como el prototipo. Se
  mantiene la navegación existente y el flujo sigue terminando en WhatsApp.
- La franja de servicios usa "Limpieza diaria" (copy del prototipo aprobado) en
  lugar de "Mucama diaria" (clave previa), misma realidad.
- El footer verde se aplicó a todo el sitio desde el componente compartido; el
  crédito de la foto solo aparece donde se usa la foto del puente.
- Se retiró el interruptor de modo oscuro del header (estaba listado como
  decisión pendiente en `docs/handoff/spec.md` y el rediseño aprobado es claro).
  No queda código que active `body[data-theme="dark"]`.
- El botón "Reservar" y los CTA de WhatsApp no muestran precios ni
  disponibilidad: todo se confirma por WhatsApp, como en el copy aprobado.

## 6. Huecos pendientes (no inventados)

- **Fotos en alta resolución (≥2400 px)**: fachada, interiores y dormitorios
  siguen en 800×500; falta foto real del dormitorio familiar/matrimonial.
- **Logo vectorial (SVG)**: `logo.png` es 179×70; se limita su tamaño para no
  ampliarlo, pero en retina se verá blando hasta tener el original vectorial.
- **Datos no confirmados**: tarifas reales por habitación/temporada, horario de
  check-out, política de cancelación/abonos, inventario completo de tipologías.
- **Componentes sin uso en la nueva home** (se conservan en el repo):
  `BookingBar`, `Slideshow`, `Weather`, `ReviewsLive`, `CountUp` y `Reveal`.
  No se borraron; solo dejaron de montarse en `/`.
- `ROOM_CARDS_ES` se conserva por compatibilidad, pero la página de
  habitaciones y su JSON-LD usan `ROOMS_ES`.
- **QA pendiente**: capturas 360/768/1024/1440, desborde horizontal, tap
  targets, foco visible, contraste AA y navegación por teclado en la app real.

## 7. Correcciones post-QA (2026-11-17)

QA rechazó la ronda anterior por dos fallos. Corregidos:

- **B1 (bloqueante), header desbordaba en móvil** (`scrollWidth 428` vs 360; el botón de menú caía fuera de pantalla): en `@media (max-width: 900px)` se agregó `min-width:0` a `.site-header-inner`, `min-width:0; overflow:hidden` a `.brand`, truncado con ellipsis en `.brand-place`, logo limitado a `max-width:120px`, `gap:6px` en `.header-end`, `padding:0 10px` en `.nav-toggle` y su texto `Menú` oculto (el botón conserva `aria-label`). `app/globals.css`.
- **A1 (axe serious), carrusel de reseñas no operable con teclado**: `.quote-cards` ahora tiene `tabIndex={0}`, `role="group"` y `aria-label` ("Reseñas de huéspedes" / "Guest reviews"). `components/Reviews.jsx`, clave nueva `home.reviewsA11y` en `lib/i18n.js` (ES/EN).
- **C2, warning del manifest**: se sacó `logo.png` (179×70) de los iconos; quedan `icon-192.png` y `icon-512.png`. `app/manifest.js`.

Build: `npm.cmd run build` verde, 22 rutas generadas. Las capturas de QA quedaron commiteadas en `docs/diseno/rutas/d-foto-primero/capturas-v2/`.

Pendiente y no tocado: C6 (barra fija "Reservar" se superpone a contenido en móvil; es el comportamiento normal de una barra fija y corregirlo requiere decisión de diseño), C1 (banner de cookies modal tapa el hero, preexistente), C3 (`.wa-float` fuera de landmark), C5 (enlaces internos con `<a>`, recarga completa).
