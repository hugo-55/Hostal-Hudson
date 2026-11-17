# Ruta D v2 — "Aysén vivo" (`d-foto-primero`)

Actualización de la Ruta D según `docs/handoff/brief-d-v2.md`. Mantiene la estructura foto primero aprobada por el dueño, reemplazando la sensación de catálogo impreso por una estética luminosa, limpia y con presencia real de Aysén y el verde bosque patagónico.

## Qué cambió en la v2

1. **Logo en el header (`public/img/logo.png`)**:
   - Ubicado arriba a la izquierda en `39 px` de alto en escritorio (`1440`) y `32 px` en móvil (`360`/`768`), sin duplicar el wordmark "Hostal Hudson", acompañado abajo por `Puerto Aysén · Patagonia chilena`.
   - **Nota sobre nitidez:** `logo.png` mide `179×70 px` en mapa de bits; se limita su tamaño para no ampliarlo sobre su resolución natural, pero falta el **archivo vectorial original (SVG)** para que se vea completamente nítido en pantallas retina (2x/3x).
2. **Fotos de Aysén y ubicación del frontis**:
   - **Hero de Home y cabecera de Habitaciones**: `public/img/aysen-puente.jpg` (`2400×1568 px`, Davidlohr Bueso, licencia CC BY 2.0). Aporta presencia visual y color del Puente Presidente Ibáñez sobre el río Aysén.
   - **Sección "El hostal y el desayuno" (`#el-hostal`)**: pasa aquí la fotografía del frontis real (`gal-hostal-exterior1.jpg`, encuadrada con `object-position: center bottom` para mantener legible el letrero tallado en madera) junto al mosaico interior de la estufa a combustión lenta (`gal-hostal-interior1.jpg`) y el comedor/estar (`gal-hostal-interior2.jpg`).
   - **Sección "Ubicación" (`#ubicacion`)**: `public/img/aysen-letrero.jpg` (`2400×1600 px`, Gyoanny78, licencia CC0), mostrando el letrero de Puerto Aysén con el puente detrás.
   - **Atribución obligatoria en el footer**: en Home y Habitaciones se incluye `Foto del puente: Davidlohr Bueso, CC BY 2.0` con enlace a `https://commons.wikimedia.org/wiki/File:Puente_Presidente_Ib%C3%A1%C3%B1ez.jpg` (detalle completo en `creditos.md`).
3. **Paleta "Aysén vivo" y superficies tipo app**:
   - Fondo general en blanco cálido `#FBFCF8` (`--paper`), superficies suaves `#F0F5EC` (`--paper-2`), tinta `#12211B` (`--ink`), verde bosque `#143D2E` (`--forest`), hover `#1F5A43` (`--forest-2`), musgo `#6E8B57` (`--moss`), madera del letrero `#B9854F` (`--wood`) y bordes suaves `#DCE5D6` (`--line`).
   - Header blanco sólido (`#FFFFFF`), sticky, con botón `Reservar` en verde bosque.
   - Tarjetas de habitaciones y reseñas en blanco, radio `10 px`, borde de `1 px` (`--line`) y sombra suave única (`0 1px 2px rgba(18,33,27,.06), 0 10px 30px rgba(18,33,27,.06)`).
   - Botones con radio `8 px` y `min-height: 48 px`.
   - Footer y CTA final a ancho completo en verde bosque `#143D2E`.
4. **Bloque de reseñas creíbles (`#resenas` en Home)**:
   - Fondo verde bosque `#143D2E` con rótulo `Huéspedes reales`, título `Lo que dicen los huéspedes` y bajada `6 reseñas en Google, todas de 5 estrellas.` (sin promedio numérico ni cifra total distinta).
   - Tres tarjetas blancas con 5 estrellas SVG en `--wood`, citas textuales reales de `lib/site.js` (`Rodrigo Valenzuela`, `Dedy Lincoqueo Soto`, `Oscar Liendo`), fuente `Reseña de Google`, carrusel horizontal `scroll-snap` en móvil (`<= 768 px`) sin autoplay y enlace final `Ver reseñas en Google →`.
5. **Página de habitaciones (`habitaciones.html`)**:
   - Cabecera a sangre con `aysen-puente.jpg` y overlay verde bosque al 55 % (`rgba(20, 61, 46, 0.55)`).
   - Franja de servicios en `--paper-2` con bullets en `--moss`.
   - Fichas `Individual` y `Doble` alternadas `7/5` sobre tarjetas blancas con etiqueta `Baño privado` en verde.
   - Banda `Familias y grupos` en verde bosque `#143D2E` con texto blanco y botón claro, seguida por CTA final y footer verde con el crédito de la foto del puente.

## Inventario de fotografías usadas

| Bloque / Página | Archivo usado | Resolución y licencia / origen |
|---|---|---|
| Header (Home y Habitaciones) | `public/img/logo.png` | 179×70 px · Logo del hostal |
| Hero (Home) y Cabecera (Habitaciones) | `public/img/aysen-puente.jpg` | 2400×1568 px · Davidlohr Bueso, CC BY 2.0 |
| Habitación Individual (Home y Habitaciones) | `public/img/gal-hostal-interior3.jpg` | 800×500 px · Foto real del hostal (provisional) |
| Habitación Doble (Home y Habitaciones) | `public/img/gal-hostal-interior4.jpg` | 800×500 px · Foto real del hostal (provisional) |
| El hostal — frontis y letrero (Home) | `public/img/gal-hostal-exterior1.jpg` | 800×500 px · Foto real del hostal (provisional) |
| El hostal — estar con combustión lenta (Home) | `public/img/gal-hostal-interior1.jpg` | 800×500 px · Foto real del hostal (provisional) |
| El hostal — comedor en madera (Home) | `public/img/gal-hostal-interior2.jpg` | 800×500 px · Foto real del hostal (provisional) |
| Ubicación (Home) | `public/img/aysen-letrero.jpg` | 2400×1600 px · Gyoanny78, CC0 1.0 |

## Pendientes por confirmar o entregar

- **Original vectorial del logo (SVG)**: necesario para nitidez perfecta en pantallas retina.
- **Fotos propias en alta resolución (`>= 2400 px`)**: las fotos actuales de fachada, espacios comunes y dormitorios (`gal-hostal-*.jpg`) son de `800×500 px`; falta además fotografía real del dormitorio familiar/matrimonial.
- **Datos no confirmados**: inventario completo de tipologías, tarifas por habitación/temporada, horario de check-out y política de cancelación/abonos.
