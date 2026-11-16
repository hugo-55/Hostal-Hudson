# Ruta D — Foto primero

Corrección de rumbo después de la revisión de la Ruta A: el dueño la encontró
"mucho texto", poco atractiva y con sensación de blog antiguo. Esta ruta parte
de cómo reservan los hostales que funcionan, no de un cuaderno editorial.

## Qué se copió de los sitios de referencia

Referencias revisadas: HostelMate (anatomía de un sitio de hostal que convierte),
Ecomama Amsterdam, Calle 11, Spin Designer Hostel, Kex y Hostel Kucha.

- Hero con foto real y una línea honesta sobre dónde está y para quién es.
- Botón de reserva visible en el header y en el hero, no escondido al final.
- Servicios en una franja corta, no en párrafos.
- Habitaciones con lo incluido y una acción clara: consultar por WhatsApp.
- Reseñas arriba, con nombres y origen reales.
- Datos prácticos y mapa al final, antes del cierre.
- Menos texto por pantalla y más peso de la imagen.

## Decisiones propias

- **Hero**: foto del frontis real (`gal-hostal-exterior1.jpg`) a la izquierda y
  panel verde profundo con el título y los dos botones a la derecha. Sin
  superposiciones ni degradados.
- **Franja de servicios**: baño privado, desayuno, Wi-Fi, estacionamiento,
  recepción 24 h y limpieza diaria, todos confirmados en `lib/i18n.js`.
- **Habitaciones**: dos fichas con foto real (individual y doble) y una tarjeta
  verde de consulta para familias. No se inventaron tipologías ni inventario.
- **Salón**: mosaico con la foto de la estufa a combustión lenta y el estar, más
  una lista breve de lo que hay (estufa, comedor, cocina equipada).
- **Reseñas**: tres de las seis reseñas reales de Google, sin promedio
  inventado. El título solo afirma lo verificable: seis reseñas, todas de cinco
  estrellas.
- **Ubicación**: el puente Presidente Ibáñez y la dirección real, con enlaces a
  Google Maps y WhatsApp.
- **Tipografía y color**: Fraunces para títulos, Inter para texto; papel
  `#F4F6EF`, verde profundo `#163A2E`, verde medio `#245143`, musgo `#7C8A57`.
  Sin sombras, gradientes, glassmorphism, emojis ni contadores animados.

## Qué se retiró respecto de la Ruta A

- La numeración de secciones tipo folleto (01 / 02 / ...).
- Los párrafos largos de presentación.
- La palabra "casa" y el tono de crónica.
- El rojo óxido.

## Pendientes de datos

- Fotos nuevas de al menos 2400 px de ancho; las actuales son 800×500 y se
  notan blandas en pantallas grandes.
- Tipologías y cantidad real de habitaciones.
- Tarifas por temporada, check-out y política de cancelación.
- Nombres de los anfitriones y distancias exactas a plaza y costanera.
