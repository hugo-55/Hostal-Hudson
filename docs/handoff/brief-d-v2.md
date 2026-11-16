# Brief de ejecución — Ruta D v2 "Aysén vivo"

Para Antigravity. Este documento manda sobre las capturas y notas anteriores.
La base es `docs/diseno/rutas/d-foto-primero/`. No se toca `main`; todo va en
`rediseno/2026-11`.

## Lo que el dueño aprobó y se mantiene

- El hero con la foto real del frontis y el letrero tallado con el nombre.
- La estructura foto primero: poco texto, CTA de reserva visible, franja de
  servicios, habitaciones con "consultar", reseñas reales y ubicación.
- La paleta verde de Patagonia, sin rojo.
- Cero datos, precios, fotos o testimonios inventados.

## Los cuatro cambios pedidos

### 1. Logo en el header, arriba a la izquierda

- Usar `public/img/logo.png` (179×70 px, con transparencia). Ya existe; no
  redibujar ni generar uno nuevo.
- Alto visible de 38-40 px en escritorio y 32 px en móvil. No ampliarlo más allá
  de su tamaño natural para no perder nitidez.
- El logo ya incluye el nombre "HOSTAL HUDSON": no duplicar el wordmark al lado.
- Debajo o al lado, en una línea chica: "Puerto Aysén · Patagonia chilena".
- Si el logo se ve blando en pantalla retina, dejar anotado que falta el
  original vectorial; no reemplazarlo por un dibujo improvisado.

### 2. Más color y sensación de app, no de papel

Problema: el fondo `#F4F6EF`, las líneas de 1 px y la tipografía editorial hacen
que el sitio se lea como un catálogo impreso.

Dirección: **"Aysén vivo"**. Blanco limpio, verde bosque en las zonas de marca y
fotografía de Aysén con más presencia.

Paleta nueva:

| Token | Valor | Uso |
| --- | --- | --- |
| `--paper` | `#FBFCF8` | Fondo general, blanco cálido |
| `--paper-2` | `#F0F5EC` | Secciones suaves y fichas |
| `--ink` | `#12211B` | Texto principal |
| `--muted` | `#5A6B60` | Texto secundario |
| `--forest` | `#143D2E` | Header, footer, CTA y reseñas |
| `--forest-2` | `#1F5A43` | Hover y detalles |
| `--moss` | `#6E8B57` | Estrellas, bullets y acentos |
| `--wood` | `#B9854F` | Acento cálido sacado del letrero |
| `--line` | `#DCE5D6` | Bordes |

Cambios de superficie:

- Fondo general blanco, no papel verdoso.
- Header blanco sólido, sticky, con borde inferior de 1 px y el botón "Reservar"
  en verde bosque.
- Tarjetas de habitación y reseñas en blanco, con borde de 1 px, radio de 10 px
  y sombra muy suave (`0 1px 2px rgba(18,33,27,.06), 0 10px 30px rgba(18,33,27,.06)`).
  Solo en tarjetas; nada de sombras en todos los bloques.
- Botones con radio de 8 px y altura mínima de 48 px. Primario verde bosque;
  secundario con borde; sobre fondo verde, botón blanco.
- Sección de reseñas con fondo verde bosque y tarjetas blancas: es el bloque que
  más color aporta.
- Footer verde bosque.

Lo que sigue prohibido: gradientes decorativos, glassmorphism, emojis como
iconos, count-up, ken burns, sombras duras y bordes de 1 px en todos lados.

### 3. Reseñas más creíbles y modernas

Reemplazar el bloque actual (título grande + tres citas sueltas) por:

- Rótulo: "Huéspedes reales".
- Título: "Lo que dicen los huéspedes".
- Bajada: "6 reseñas en Google, todas de 5 estrellas." No mostrar promedio
  numérico ni cantidad total distinta: no está verificado.
- Tres tarjetas blancas con:
  - cinco estrellas en `--moss` o `--wood` (SVG, no emoji);
  - la cita real, sin editar;
  - nombre real;
  - "Reseña de Google" como fuente.
- En escritorio, tres columnas. En móvil, carrusel horizontal con `scroll-snap`
  y sin autoplay. Nada de librerías.
- Enlace de cierre: "Ver reseñas en Google", a la búsqueda de Google Maps del
  hostal. No inventar una URL de perfil.
- En la home, este bloque va después de "El salón" y antes de "Ubicación", como
  está hoy.

Textos reales disponibles en `lib/site.js`. No agregar reseñas ni nombres
nuevos.

### 4. Más color en la página de habitaciones

- Cabecera de página con foto de Aysén a sangre (puente o río) y overlay verde
  bosque al 55 %, texto blanco. Título: "Habitaciones con baño privado."
- Debajo, la franja de servicios con fondo `--paper-2` y bullets musgo.
- Filas de habitaciones sobre blanco, con foto más grande (7/5), borde suave y
  una etiqueta "Baño privado" en verde.
- Banda "Familias y grupos" en verde bosque con texto blanco y botón claro.
- CTA final y footer en verde bosque.
- Usar las fotos reales de la zona que ya están en `public/img/`:
  `gal-quevisitar-puente.jpg`, `gal-quevisitar-caleta.jpg`,
  `gal-quevisitar-plaza1.jpg`, `gal-quevisitar-cascada.jpg`.
- No usar `slide1.jpg` (es el coliseo, no el hostal).

## Fotos de Aysén

- Prioridad absoluta: fotos reales del hostal y de la zona que ya están en
  `public/img/`.
- Si hace falta una foto externa, solo de Unsplash o Pexels, con licencia libre,
  y registrar autor y URL en `docs/diseno/rutas/d-foto-primero/creditos.md`.
- Nada de imágenes generadas con IA del hostal, de personas o de lugares que se
  presenten como reales.

## Estructura de la home (orden)

1. Header con logo, navegación y "Reservar".
2. Hero: foto del frontis a la izquierda, panel verde con título y dos botones.
3. Franja de servicios.
4. Habitaciones: dos fichas y tarjeta verde de consulta.
5. El salón: mosaico con estufa y estar, más lista breve.
6. Reseñas en verde con tarjetas blancas.
7. Ubicación con foto del puente y datos.
8. CTA final verde.
9. Footer verde.

## Estructura de habitaciones

1. Header con logo.
2. Cabecera con foto de Aysén y overlay verde.
3. Franja de servicios.
4. Individual y doble, alternadas 7/5.
5. Banda "Familias y grupos" en verde.
6. CTA final y footer.

## Criterios de aceptación

- Logo visible y nítido en la esquina superior izquierda en 1440, 768 y 360.
- Fondo blanco, verde en header/footer/CTA/reseñas; se percibe más color y no
  papel.
- Reseñas con estrellas, tarjetas y fuente Google; sin promedio inventado.
- Capturas 1440/768/360 sin desborde horizontal ni imágenes rotas.
- Contraste AA, foco visible y navegación por teclado.
- Sin emojis-icono, gradientes, glassmorphism ni sombras duras.
- Sin datos nuevos que no estén en este brief o en `lib/site.js`.
- `main` intacto; commits en `rediseno/2026-11`.

## Entregables de Antigravity

- `index.html`, `habitaciones.html` y `styles.css` actualizados en
  `docs/diseno/rutas/d-foto-primero/`.
- Capturas nuevas en `capturas/` para 1440, 768 y 360.
- Nota breve de decisiones en `notas.md`, incluyendo qué foto se usó en cada
  bloque y qué quedó pendiente.
- No tocar la carpeta de la Ruta A ni el comparador.
