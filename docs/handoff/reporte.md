# Reporte de handoff — Exploración visual (Tres rutas de diseño)

Fecha: 2026-11-16  
Rama: `rediseno/2026-11`  
Autor: Antigravity (exploración visual para decisión con el hostal)

---

## 1. Qué se hizo

Se diseñaron y construyeron tres direcciones visuales completas e independientes (**Home** y **Habitaciones**) en HTML + CSS plano, sin tocar `app/` ni `components/`, y un comparador interactivo en `docs/diseno/rutas/index.html`.

Se respetaron todas las reglas de `AGENTS.md`, `docs/handoff/spec.md` y `.agents/skills/direccion-de-arte/SKILL.md`:
- **Cero uso de `slide1.jpg` como el hostal**: la única fotografía exterior del hostal empleada es `gal-hostal-exterior1.jpg` (entrada de madera con el cartel tallado en Teniente Merino 1080).
- **Separación honesta entre dormitorios y áreas comunes**: `gal-hostal-interior1.jpg`, `interior2.jpg` e `interior5.jpg` se presentan como lo que realmente son (sala de estar con combustión lenta y comedor revestido en madera). Para dormitorios se usan `gal-hostal-interior3.jpg` (Individual) y `gal-hostal-interior4.jpg` (Doble dos camas), mientras que la tercera ficha (Habitación Familiar / Vista al río) declara un **hueco fotográfico explícito** (`[HUECO FOTOGRÁFICO · TOMA PENDIENTE]`) en lugar de engañar con fotos del living.
- **Fotos contenidas en su resolución real (`800×500 px`)**: ninguna imagen se estira a sangre completa ni supera su ancho nativo. La estructura CSS deja preparado el contenedor del hero para pasar a mayor escala cuando el hostal entregue fotografías de alta resolución.
- **Datos verificados únicamente**: teléfono `+56 9 9439 1571`, dirección `Teniente Merino 1080`, correo `hostalhudson@gmail.com`, los 6 servicios confirmados y las 6 reseñas reales de Google. Las tarifas no se muestran como precios cerrados sino con consulta directa por WhatsApp.
- **Higiene visual (Checklist anti-plantilla / anti-IA)**: cero emojis como iconos (reemplazados por trazos vectoriales SVG monocromáticos), cero contadores animados (`count-up`), cero comparativas viejo/nuevo, cero gradientes, cero glassmorphism y cero sombras (`box-shadow` / `text-shadow`).

---

## 2. En qué se diferencian las tres rutas

| Dimensión | Ruta A — Editorial Sobrio (*"Cuaderno de Patagonia"*) | Ruta B — Casa de Familia (*"Mesa Puesta en Aysén"*) | Ruta C — Refugio Patagónico (*"Orilla del Río Aysén"*) |
|---|---|---|---|
| **Idea rectora** | Crónica impresa de viaje y archivo documental: rigor informativo, blancos amplios y filetes de `1px`. | Hospitalidad doméstica: foco en quién abre la puerta a las 24 h, el calor de la combustión lenta y el desayuno casero. | Base serena frente al clima patagónico: diálogo entre la lluvia/río exterior y el refugio templado interior, con gran silencio visual. |
| **Tipografía** | **Fraunces** (600/700, alto contraste) + **Inter** (texto) + **IBM Plex Mono** (folios, códigos y tablas técnicas). | **Lora** (500/600 con cursivas expresivas para la voz de los dueños) + **Plus Jakarta Sans** (lectura cálida y abierta). | **Instrument Serif** (400, vertical, fina y silenciosa a gran escala) + **Inter** (geométrica con coordenadas geográficas). |
| **Grilla y arquitectura** | **12 columnas con filetes visibles de `1px`**. Hero 7/5; secciones interiores con columna fija de índice (`4 col`) + desarrollo (`8 col`). En `/habitaciones`: expedientes horizontales `3/4/5` con tabla técnica. | **Bandas cálidas 5/7 y bloques en zigzag alternado 6/6**. Pone el *Libro de visitas* (reseñas reales) y la rutina de la casa en el corazón de la página antes del catálogo. | **8 columnas con 35% de espacio libre (silencio visual)**. Apertura en bloque verde profundo (`5/3`), secciones `3/5` con margen de aire y módulos de dormitorio contenidos. |
| **Paleta de color** | Papel `#F7F4EE`, ficha `#EFECE4`, tinta `#191714`, neutro `#6B655D`, verde `#24413C` y óxido `#9A3B26`. | Trigo cálido `#F4ECE1`, lino `#EAE0D0`, madera tostada `#382419`, tinta leña `#261A13`, terracota `#8F3923` y pino `#284A3B`. | Verde bosque `#1B322C`, niebla mineral `#EEF2EE`, piedra `#E1E8E2`, pizarra `#13231E` y acento óxido puente Ibáñez `#9A3B26`. |
| **Tratamiento de foto** | **Documento de archivo**: paspartú de papel (`padding: 12px; border: 1px solid #191714`), esquinas a `0px` y pie catalogado (`FIG. 01 — 800×500 PX`). | **Álbum familiar enmarcado en lino**: marco cálido de `14px` (`#FAF5ED`), borde `#CBB9A3`, radios de `4px` y pie narrativo en cursiva en primera persona. | **Dípticos Exterior / Interior al ras**: pares comparativos (`EXTERIOR · RÍO AYSÉN` vs `REFUGIO · TENIENTE MERINO 1080`) con barra superior técnica y radio `2px`. |

---

## 3. Recomendación y justificación

**Recomendación técnica y editorial: Ruta A (*Editorial Sobrio*), integrando el enfoque humano de la sección "La casa y el desayuno" de la Ruta B.**

### Por qué:
1. **Resuelve mejor la limitación de las fotos actuales (`800×500 px`)**: al tratar cada fotografía como un *documento enmarcado en paspartú* con pie técnico, el tamaño contenido de `800×500 px` se percibe como una decisión de diseño deliberada (como una lámina en una revista o cuaderno de viaje) y no como una carencia técnica.
2. **Alineación directa con la Spec ("Cuaderno de Patagonia")**: utiliza exactamente la dupla tipográfica ya instalada en el proyecto (`Fraunces` + `Inter` en `app/layout.jsx`) y los tokens propuestos en `docs/handoff/spec.md` (`#F7F4EE`, `#191714`, `#6B655D`, `#24413C`, `#9A3B26`), lo que permite pasar a implementación en Next.js sin cargar fuentes adicionales ni romper el presupuesto de performance.
3. **Claridad de conversión y lectura rápida**: para el viajero que llega a Puerto Aysén buscando datos concretos desde el celular (dirección exacta, recepción 24 h, estacionamiento, desayuno y botón directo de WhatsApp), la estructura de fichas y tablas con filetes de `1px` en `360px` es inmediata de escanear.
4. **Qué vale la pena tomar prestado de la Ruta B**: el tono cercano en primera persona al describir el estar con combustión lenta y el desayuno en el comedor de madera, que conecta directamente con lo que más elogian las 6 reseñas reales de Google.

*(No obstante, las tres rutas están completas y listas para que el equipo y el hostal elijan cualquiera de las tres o una combinación).*

---

## 4. Decisiones pendientes de aprobación (con el hostal y opencode)

1. **Elección de la ruta visual definitiva (A, B o C)**: definir con el hostal cuál de las tres personalidades los representa mejor antes de pasar el diseño a `app/globals.css` y `components/`.
2. **Confirmar datos faltantes de las habitaciones para completar las fichas**:
   - ¿Las habitaciones Individual, Doble y Familiar tienen baño privado o compartido?
   - ¿Cuáles son todas las tipologías reales que ofrece el hostal (matrimonial, triple, familiar) y cuántas camas tiene cada una?
   - ¿Existe un horario referencial de check-out al mediodía (manteniendo la recepción 24 h para el ingreso)?
3. **Fotografía real faltante**:
   - Tomar al menos 1 foto horizontal (`>= 1600 px` idealmente, con luz de día sin flash) del dormitorio matrimonial/familiar y 1 foto exterior de la fachada completa desde la vereda para reemplazar el hueco documental.
4. **Decisiones de producto listadas en la spec**:
   - Aprobar la eliminación definitiva del **modo oscuro** (simplifica CSS y mantiene la identidad cálida/editorial).
   - Aprobar el retiro del **cotizador automático basado en `$25.000`** hasta contar con tarifas reales por habitación/temporada, priorizando la consulta directa por WhatsApp.
   - Aprobar el retiro o reubicación del **widget de clima** fuera del hero.
   - Confirmar que se mantienen las **6 reseñas actuales de Google** con nombre completo y texto íntegro.

---

## 5. Archivos creados

- Comparador general:
  - `docs/diseno/rutas/index.html`
- **Ruta A — Editorial Sobrio**:
  - `docs/diseno/rutas/a-editorial-sobrio/index.html`
  - `docs/diseno/rutas/a-editorial-sobrio/habitaciones.html`
  - `docs/diseno/rutas/a-editorial-sobrio/styles.css`
  - `docs/diseno/rutas/a-editorial-sobrio/notas.md`
  - `docs/diseno/rutas/a-editorial-sobrio/capturas/` (`home-360.png`, `home-768.png`, `home-1440.png`, `habitaciones-360.png`, `habitaciones-768.png`, `habitaciones-1440.png`)
- **Ruta B — Casa de Familia**:
  - `docs/diseno/rutas/b-casa-de-familia/index.html`
  - `docs/diseno/rutas/b-casa-de-familia/habitaciones.html`
  - `docs/diseno/rutas/b-casa-de-familia/styles.css`
  - `docs/diseno/rutas/b-casa-de-familia/notas.md`
  - `docs/diseno/rutas/b-casa-de-familia/capturas/` (`home-360.png`, `home-768.png`, `home-1440.png`, `habitaciones-360.png`, `habitaciones-768.png`, `habitaciones-1440.png`)
- **Ruta C — Refugio Patagónico**:
  - `docs/diseno/rutas/c-refugio-patagonico/index.html`
  - `docs/diseno/rutas/c-refugio-patagonico/habitaciones.html`
  - `docs/diseno/rutas/c-refugio-patagonico/styles.css`
  - `docs/diseno/rutas/c-refugio-patagonico/notas.md`
  - `docs/diseno/rutas/c-refugio-patagonico/capturas/` (`home-360.png`, `home-768.png`, `home-1440.png`, `habitaciones-360.png`, `habitaciones-768.png`, `habitaciones-1440.png`)

*(No se modificó ningún archivo en `app/`, `components/` ni `lib/`, y no se realizó commit ni push).*

---

## 6. Verificación ejecutada

- **Auditoría estática de restricciones**:
  - `Select-String -Path "docs\diseno\rutas\*\*.css", "docs\diseno\rutas\*\*.html", "docs\diseno\rutas\index.html" -Pattern "box-shadow|text-shadow|drop-shadow|gradient\(|backdrop-filter|slide1\.jpg"` → `0` usos de estilos prohibidos o de `slide1.jpg` como imagen.
- **Capturas reales en Chrome Headless vía CDP (`360px`, `768px`, `1440px`)**:
  - `node C:\Users\hugoc\.gemini\antigravity\brain\acda6d55-d6d8-4310-aae0-272cf74ffa71\scratch\capture-routes.mjs`
  - 18 capturas PNG generadas a página completa (`scrollWidth === viewportWidth`, `0` desborde horizontal, `0` imágenes rotas).
