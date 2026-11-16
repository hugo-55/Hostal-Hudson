# Ruta A — Editorial Sobrio ("Cuaderno de Patagonia")

## Idea rectora
Una crónica impresa y documental de viaje en Puerto Aysén: información honesta, jerarquía tipográfica marcada, blancos amplios y reglas finas de `1px` que estructuran cada bloque como una publicación editorial.

## Tipografía
- **Títulos (`--font-display`)**: `Fraunces` (600/700), serif de alto contraste con interlínea compacta (`1.06`).
- **Texto corrido (`--font-body`)**: `Inter` (400/500/600), medida controlada de `60–65ch`.
- **Metadatos y folios (`--font-mono`)**: `IBM Plex Mono` (`0.78rem`) para numeración de capítulos (`01 / LA CASA`), pies de foto catalogados (`FIG. 01`) y tablas de especificaciones.

## Grilla
- Retícula de **12 columnas** con filetes visibles de `1px` (`#191714` y `#D5CFC3`).
- **Hero**: división asimétrica **7/5** (7 columnas de titular, bajada y ficha de datos verificados; 5 columnas para la fotografía real de la fachada contenida como documento).
- **Secciones interiores**: índice lateral fijo de **4 columnas** a la izquierda y cuerpo de **8 columnas** a la derecha.
- **Página de habitaciones**: fichas horizontales tipo expediente (`3 / 4 / 5` columnas: código de inventario, tabla técnica verificada y documento fotográfico).

## Color
- **Papel base**: `#F7F4EE`
- **Papel secundario (fichas)**: `#EFECE4`
- **Paspartú de foto**: `#FAF8F4`
- **Tinta principal**: `#191714`
- **Tinta secundaria**: `#6B655D`
- **Acentos**: Óxido `#9A3B26` ( reservado para el CTA principal y avisos documentales) y Verde profundo `#24413C` (folios e iconografía lineal).

## Tratamiento fotográfico
- **Foto como documento de archivo**: contenida dentro de un marco de paspartú (`padding: 12px; border: 1px solid #191714`), esquinas rectas (`0px`), sin superar jamás sus `800×500 px` nativos, acompañada de pie de foto catalogado.
- Donde falta foto real de dormitorio (Habitación Familiar), se declara un `[HUECO FOTOGRÁFICO · TOMA PENDIENTE]` explícito en lugar de usar fotos del living.
