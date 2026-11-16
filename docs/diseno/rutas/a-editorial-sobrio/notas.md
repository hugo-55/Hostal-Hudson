# Ruta A — Editorial Sobrio ("Cuaderno de Patagonia") · Base Seleccionada

## Idea rectora
Una crónica sobria y honesta del Hostal Hudson en Puerto Aysén: arquitectura editorial con reglas finas de `1px`, blancos amplios y láminas en paspartú, combinada con la cercanía en primera persona de una casa atendida por sus dueños ("la casa y el desayuno").

## Tipografía
- **Títulos (`--font-display`)**: `Fraunces` (600/700), serif editorial de alto contraste con interlínea compacta (`1.06`).
- **Texto corrido y rótulos (`--font-body`)**: `Inter` (400/500/600), medida controlada de `60–65ch`. Todos los rótulos de sección, pies de foto y encabezados de tabla usan `Inter` en mayúsculas (`0.78rem`, peso `600`), eliminando `IBM Plex Mono`.

## Grilla y navegación
- Retícula de **12 columnas** con filetes visibles de `1px` (`#191714` y `#D5CFC3`).
- **Cabecera responsive**: navegación horizontal en escritorio (`> 768px`) y botón **burger (`MENÚ`)** accesible en tablet (`768px`) y móvil (`360px`) que despliega los enlaces en lista vertical táctil (`min-height: 44px`).
- **Hero**: división asimétrica **7/5** con bajada en primera persona, **fragmento real** de la reseña de Dedy Lincoqueo Soto junto al llamado a la acción y fotografía de la fachada contenida en paspartú. El detalle de confirmación por **transferencia Banco BCI** se ubica en la zona de reservas (`06 / RESERVA DIRECTA`) y no en el hero.
- **Secciones interiores**: índice lateral fijo de **4 columnas** a la izquierda y desarrollo en **8 columnas** a la derecha. La sección `01 / LA CASA Y EL DESAYUNO` incorpora los tres pilares en primera persona (llegada 24 h sin apuro, desayuno continental + cocina equipada y aseo diario).
- **Página de habitaciones**: fichas horizontales (`3 / 4 / 5` columnas) con especificaciones basadas en lo visible en las fotos y en los datos confirmados. La tercera ficha no inventa una tipología: se presenta como consulta para familias y grupos, con lo que falta por confirmar explícito.

## Revisión de opencode (2026-11-16)

Sobre la base refinada por Antigravity se corrigió lo que todavía afirmaba datos no confirmados:

- La tercera ficha dejó de llamarse "Habitación Familiar y Vista al Río" y de declarar "configuración familiar"; ahora es una consulta ("Familias y grupos") que no promete una pieza que no está verificada.
- **Baño privado en todas las habitaciones** (dato confirmado por el dueño el 16-11): reemplaza el "Consultar según habitación disponible" en las fichas y se suma a la bajada de la home y de habitaciones.
- Se quitó la numeración `DORMITORIO 02 / 03`, que afirmaba un inventario de tres habitaciones.
- El pie de la foto de `interior2` ya no dice "comedor": en la imagen se ve un estar con dos sillones, paneles de madera y TV.
- El servicio de recepción ya no promete "libre horario de salida"; el check-out no está confirmado.
- El hero usa un fragmento de Dedy Lincoqueo Soto para no repetir la misma reseña completa del bloque de huéspedes (Rodrigo Valenzuela sigue ahí).
- **Idioma**: se retiró la palabra "casa" de todo el sitio visible. El dueño la leyó como "casa de huéspedes", un downgrade frente a hostal. Ahora el relato dice hostal, piezas y estadía, y el hero abre con "Un hostal tranquilo a dos cuadras de la plaza".
- **Color**: se eliminó el rojo óxido y se pasó a una paleta verde de Patagonia (papel `#EFF2E8`, verde profundo `#1F3B31`, verde medio `#2C5446`, musgo `#6C7A4B`). El verde profundo se usa en la barra superior, el CTA y la banda de reservas a sangre.

## Color

Paleta verde de Patagonia, sin rojo. El rojo óxido de la primera versión se retiró porque el dueño lo leyó como una señal equivocada para un hostal familiar.

- **Papel base**: `#EFF2E8` (blanco verdoso)
- **Papel secundario (fichas, citas, cajas)**: `#E8ECE1`
- **Paspartú de foto**: `#FAF8F0`
- **Tinta principal**: `#16211C` (verde tinta)
- **Tinta secundaria**: `#5B675E`
- **Verde profundo (CTA, barra superior y banda de reservas)**: `#1F3B31`
- **Verde medio (rótulos e iconos)**: `#2C5446`
- **Musgo (filete de cita)**: `#6C7A4B`
- **Filetes**: `#16211C` y `#C9D1C2`

Los verdes no son decorativos: la barra superior de datos, el CTA principal y la banda de reservas usan el verde profundo como color de marca. El papel y las fichas llevan el verde en versión pálida.

## Tratamiento fotográfico
- **Foto como lámina en paspartú**: contenida dentro de un marco de papel (`padding: 12px; border: 1px solid #191714`), esquinas rectas (`0px`), sin superar sus `800×500 px` nativos y con pies de foto limpios pensados para el huésped (sin rótulos internos ni metadatos técnicos).
