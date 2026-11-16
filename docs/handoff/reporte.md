# Reporte de handoff — Refinamiento de Ruta A (Base seleccionada)

Fecha: 2026-11-16  
Rama: `rediseno/2026-11`  
Base anterior en rama: `92f0538`  
Autor: Antigravity (exploración visual y refinamiento sobre Ruta A)

---

## 1. Qué cambió

Se tomó la **Ruta A (`docs/diseno/rutas/a-editorial-sobrio/`)** como base definitiva manteniendo intacta su dirección general (sistema editorial sobrio, paleta `#F7F4EE` / `#191714` / `#6B655D` / `#24413C` / `#9A3B26`, reglas finas de `1 px`, retícula de 12 columnas y láminas en paspartú) y se aplicaron los siete ajustes solicitados:

1. **Limpieza total de textos internos en todas las rutas (`A`, `B`, `C` y `docs/diseno/rutas/index.html`)**:
   - Eliminadas todas las menciones a `"800×500 PX"`, `"TOMA REAL"`, `"FOTO REAL"`, `"FIG."` y el enlace `"Comparador de rutas visuales"` / `"Comparador de las 3 rutas"` de todos los pies de foto, barras y footers.
2. **Reemplazo de placeholders técnicos por copy orientado a huéspedes**:
   - En la tercera ficha (*Habitación Familiar y Vista al Río*) se reemplazaron los rótulos `[HUECO FOTOGRÁFICO · TOMA PENDIENTE]` y `[HUECO DOCUMENTAL · FOTOGRAFÍA EN PREPARACIÓN]` en todas las rutas por una invitación directa al huésped para consultar disponibilidad, distribución de camas y solicitar fotografías actuales por WhatsApp.
3. **Eliminación de `IBM Plex Mono`**:
   - Se removió `IBM Plex Mono` de `a-editorial-sobrio/index.html`, `a-editorial-sobrio/habitaciones.html`, `a-editorial-sobrio/styles.css` y `docs/diseno/rutas/index.html`.
   - Todos los rótulos, encabezados de tabla, pies de foto y etiquetas de sección en Ruta A usan ahora `Inter` en mayúsculas (`0.78rem`, `font-weight: 600`, sin tracking decorativo).
4. **Incorporación del tono cercano de Ruta B y cita de reseña en el Hero**:
   - El hero de Ruta A adopta voz en primera persona (*"Te recibimos en nuestra casa..."*) e incluye la cita real de **Rodrigo Valenzuela** (reseña de Google sobre calefacción, vista al río y desayuno) inmediatamente debajo de las acciones principales.
   - La sección `01 / LA CASA Y EL DESAYUNO` incorpora la voz en primera persona y los tres momentos clave traídos de la Ruta B (*Llegar a cualquier hora sin apuro*, *El desayuno de la mañana y la cocina* y *Piezas limpias antes del mediodía*).
5. **Menú móvil con botón burger**:
   - En `<= 768 px` (cubre tanto `768 px` como `360 px`), la cabecera de la Ruta A muestra el botón **MENÚ** (`min-height: 44px`, SVG lineal propio de tres barras y atributos `aria-expanded` / `aria-controls`) que despliega verticalmente los enlaces de navegación y el CTA principal de WhatsApp sin desbordamiento horizontal.
   - En `1440 px`, la cabecera (`span 4` marca + `span 8` navegación) mantiene todos los enlaces y el botón `Reservar por WhatsApp` en una sola línea horizontal.
6. **Reubicación de "Transferencia Banco BCI" fuera del hero**:
   - El ledger del hero muestra únicamente `UBICACIÓN` (Teniente Merino 1080), `RECEPCIÓN` (24 h, llaves en mano) e `INCLUIDO` (desayuno continental, Wi-Fi y estacionamiento).
   - La confirmación mediante **Transferencia Banco BCI** pasó a la zona de reservas (`06 / RESERVA DIRECTA SIN INTERMEDIARIOS` en Home, con los pasos `PASO 01 · WHATSAPP DIRECTO` y `PASO 02 · CONFIRMACIÓN`, y al bloque de tarifas/reservas de `habitaciones.html`).
7. **Re-captura completa en `360`, `768` y `1440 px`**:
   - Regeneradas las 18 capturas de Home y Habitaciones de las tres rutas, recortadas exactamente al alto real del documento.

*(No se modificó ningún archivo en `app/`, `components/` ni `lib/`, no se tocó `main` y no se realizó commit).*

---

## 2. Archivos tocados

- **Ruta A (Base seleccionada)**:
  - `docs/diseno/rutas/a-editorial-sobrio/styles.css`
  - `docs/diseno/rutas/a-editorial-sobrio/index.html`
  - `docs/diseno/rutas/a-editorial-sobrio/habitaciones.html`
  - `docs/diseno/rutas/a-editorial-sobrio/notas.md`
  - `docs/diseno/rutas/a-editorial-sobrio/capturas/{home,habitaciones}-{360,768,1440}.png`
- **Limpieza de textos y re-capturas en Rutas B, C y comparador**:
  - `docs/diseno/rutas/b-casa-de-familia/index.html`
  - `docs/diseno/rutas/b-casa-de-familia/habitaciones.html`
  - `docs/diseno/rutas/b-casa-de-familia/capturas/{home,habitaciones}-{360,768,1440}.png`
  - `docs/diseno/rutas/c-refugio-patagonico/index.html`
  - `docs/diseno/rutas/c-refugio-patagonico/habitaciones.html`
  - `docs/diseno/rutas/c-refugio-patagonico/capturas/{home,habitaciones}-{360,768,1440}.png`
  - `docs/diseno/rutas/index.html`
- **Handoff**:
  - `docs/handoff/reporte.md`

---

## 3. Verificación

- **Auditoría estática de textos y estilos prohibidos**:
  - `Select-String -Path "docs\diseno\rutas\*\*.html", "docs\diseno\rutas\*\*.css", "docs\diseno\rutas\index.html" -Pattern "800×500|800x500|TOMA REAL|FOTO REAL|FIG\.|HUECO|IBM Plex|Plex Mono|box-shadow|text-shadow|drop-shadow|gradient\(|backdrop-filter|slide1\.jpg"` y `Select-String -Path "docs\diseno\rutas\*\*.html" -Pattern "Comparador de"` → `0` coincidencias en todos los `.html` de las tres rutas.
- **Capturas e interacción real vía Chrome Headless CDP (`capture-routes.mjs`)**:
  - **Ruta A (`a-editorial-sobrio`)**:
    - `home-360.png`: `360×10407`, `scrollWidth=360`, `broken=0` · Burger click test: `beforeOpen=0`, `afterOpen=333`, `expanded="true"`, `overflowOpen=360`, `afterClose=0`.
    - `home-768.png`: `768×9018`, `scrollWidth=768`, `broken=0` · Burger click test: `beforeOpen=0`, `afterOpen=333`, `expanded="true"`, `overflowOpen=768`, `afterClose=0`.
    - `home-1440.png`: `1440×5160`, `scrollWidth=1440`, `broken=0`.
    - `habitaciones-360.png`: `360×5648`, `scrollWidth=360`, `broken=0` · Burger click test: `beforeOpen=0`, `afterOpen=333`, `expanded="true"`, `overflowOpen=360`, `afterClose=0`.
    - `habitaciones-768.png`: `768×5455`, `scrollWidth=768`, `broken=0` · Burger click test: `beforeOpen=0`, `afterOpen=333`, `expanded="true"`, `overflowOpen=768`, `afterClose=0`.
    - `habitaciones-1440.png`: `1440×2966`, `scrollWidth=1440`, `broken=0`.
  - **Ruta B (`b-casa-de-familia`)**:
    - `home-360` (`360×10417`), `home-768` (`768×7581`), `home-1440` (`1440×5293`), `habitaciones-360` (`360×5503`), `habitaciones-768` (`768×4924`), `habitaciones-1440` (`1440×2963`) · `scrollWidth === viewportWidth`, `broken=0`.
  - **Ruta C (`c-refugio-patagonico`)**:
    - `home-360` (`360×8716`), `home-768` (`768×7683`), `home-1440` (`1440×5735`), `habitaciones-360` (`360×4915`), `habitaciones-768` (`768×5355`), `habitaciones-1440` (`1440×3867`) · `scrollWidth === viewportWidth`, `broken=0`.

---

## 5. Revisión de opencode (2026-11-16)

Después del refinamiento se corrigió lo que todavía afirmaba datos no confirmados. No se cambió la dirección de arte.

- Tercera ficha: dejó de llamarse "Habitación Familiar y Vista al Río" y de declarar "configuración familiar". Ahora es `Familias y grupos`, una consulta que no promete una tipología inexistente. Se quitó también la fila "Familiar o matrimonial (según disponibilidad)".
- Numeración: `DORMITORIO 01 / 03` y `02 / 03` afirmaban un inventario de tres habitaciones. Quedaron como `HABITACIÓN 01` y `HABITACIÓN 02`.
- Pie de foto de `interior2`: decía "comedor" y en la foto se ve un estar con dos sillones, paneles de madera y TV. Corregido a "ESTAR EN MADERA NATIVA".
- Servicio de recepción: prometía "libre horario de llegada y salida". El check-out no está confirmado; quedó "libre horario de ingreso y entrega de llaves".
- Hero: la cita de Rodrigo Valenzuela se repetía completa en el bloque de huéspedes. El hero usa ahora un fragmento de Dedy Lincoqueo Soto; las seis reseñas siguen en `04 / HUÉSPEDES`.
- Etiqueta de la banda de habitaciones: `TARIFAS Y RESERVA DIRECTA` en lugar de "por transferencia BCI", que queda en el cuerpo.
- Capturas de la Ruta A regeneradas con Playwright sobre servidor local: `1440`, `768` y `360`, `broken=0`, `scrollWidth = viewportWidth`. Prueba de burger: `aria-expanded="true"`, menú de `331 px` de alto, sin desborde.

## 6. Pendientes y pasos siguientes

1. Aprobación del dueño del hostal para pasar el sistema visual de la **Ruta A refinada** a `app/globals.css`, `app/layout.jsx`, `components/` y páginas de Next.js (`/` y `/habitaciones`).
2. Confirmar con el hostal antes de implementar en código productivo:
   - Tipologías reales de habitación: cuántas son y cuántas camas tiene cada una. El baño privado ya está confirmado para todas.
   - Si existe una pieza familiar o con vista al río, y su distribución de camas.
   - Horario de check-out y política de cancelación.
   - Tarifas por temporada.
   - Foto horizontal real del dormitorio familiar cuando esté disponible.
   - Decisiones de producto listadas en `docs/handoff/spec.md` (retiro del modo oscuro, retiro del cotizador referencial de `$25.000`, reubicación o retiro del widget de clima del hero y mantención de las 6 reseñas de Google).
