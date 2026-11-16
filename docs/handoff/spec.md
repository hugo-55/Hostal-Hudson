# Spec — Rediseño Hostal Hudson, primer corte

Autor: opencode (equipo personal)
Fecha: 2026-11-16
Estado: listo para exploración visual en Antigravity
Rama: `rediseno/2026-11`
Plan completo: `memory/proyectos/hostal-hudson-rediseno-2026-11-16.md` (en el
workspace del agente, no en este repo)

## Objetivo

Rehacer el sistema visual y la home del sitio para que se lea como el hostal
real y no como una plantilla. Primer corte: tokens + home + página de
habitaciones. El resto de las páginas viene después, con el mismo sistema.

No se publica hasta el final: un solo push y un solo redespliegue.

## Contexto

- Next.js 14 App Router, React 18, JavaScript sin TypeScript, CSS global en
  `app/globals.css`. Sin lint ni tests: el gate es `npm run build`.
- Producción: `https://www.hostalhudson.cl`. `main` no se toca.
- Contenido ES/EN en `lib/i18n.js`; datos en `lib/site.js`; páginas en
  `app/` y `components/pages/`.
- El flujo de reserva es WhatsApp. No hay pagos online y este corte no los
  agrega.

## Material real disponible

Fotos actuales, todas provisionales:

| Archivo | Tamaño | Qué muestra realmente |
|---|---|---|
| `slide1.jpg` | 1920×850 | Coliseo/edificio público al otro lado del río. **No es el hostal.** |
| `slide2.jpg` | 1920×850 | Pérgola de la plaza. |
| `slide3.jpg` | 1920×850 | Puente Presidente Ibáñez. |
| `slide4.jpg` | 1920×850 | Cascada. |
| `gal-hostal-exterior1.jpg` | 800×500 | Entrada real del hostal con el letrero de madera. **La única foto del hostal.** |
| `gal-hostal-interior1.jpg` | 800×500 | Living con sillones floridos. |
| `gal-hostal-interior2.jpg` | 800×500 | Living/comedor con TV y panel de madera. |
| `gal-hostal-interior3.jpg` | 800×500 | Habitación individual, cama azul. |
| `gal-hostal-interior4.jpg` | 800×500 | Habitación con dos camas. |
| `gal-hostal-interior5.jpg` | 800×500 | Sillones floridos, detalle. |

Problemas concretos:

- El hero actual muestra el coliseo, la plaza, el puente y la cascada, no el
  hostal. El `alt` de `slide1` dice "Hostal Hudson frente al río Aysén" y es
  falso.
- Dos de las tres tarjetas de habitaciones usan fotos de living
  (`interior1`, `interior2`). Solo `interior4` es una habitación.
- Ninguna foto llega a 1600 px de ancho. No se pueden usar a sangre completa ni
  ampliar sin que se vean blandas.

Datos confirmados: teléfono `+56 9 9439 1571`, dirección Teniente Merino 1080,
correo `hostalhudson@gmail.com`, servicios (wifi, TV, estacionamiento,
recepción 24 h, desayuno, limpieza), **todas las habitaciones con baño
privado** (confirmado por el usuario el 2026-11-16) y seis reseñas de Google ya
publicadas.

Datos **no** confirmados: tarifas reales por habitación y temporada, horarios de
check-in/out, política de cancelación, abonos, nombres de los anfitriones,
distancias y tiempos. `RATE_PER_PERSON_NIGHT = 25000` es referencial: no se
muestra como precio cerrado.

El resto de los datos del hostal llega más adelante; no se inventa nada para
completar fichas.

## Dirección de arte

La primera propuesta, "Cuaderno de Patagonia", se descartó tras la revisión del
dueño: demasiado texto y sensación de blog. La dirección vigente es **foto
primero**: foto real grande, una línea honesta, CTA de reserva visible y muy
poco texto por pantalla. Se apoya en la anatomía de sitios de hostal que
convierten (HostelMate) y en referencias como Ecomama Amsterdam, Calle 11,
Spin Designer Hostel, Kex y Hostel Kucha.

- Paleta verde de Patagonia: papel `#F4F6EF`, verde profundo `#163A2E`, verde
  medio `#245143`, musgo `#7C8A57`. Sin rojo.
- Fraunces para títulos, Inter para texto. Tamaños grandes, párrafos cortos.
- Retícula 7/5 en hero y habitaciones; 3 columnas solo para grupos de fotos.
- Sin sombras, gradientes, glassmorphism, emojis ni contadores animados.
- Sin la palabra "casa": se lee como "casa de huéspedes" y baja la categoría.
- Mientras las fotos sean las actuales: foto contenida en el hero, no a sangre
  completa. La estructura permite pasar a full-bleed cuando lleguen las fotos
  nuevas (≥2400 px), sin rehacer el layout.

## Tres rutas para Antigravity

Pedir tres direcciones distintas, no variantes del mismo hero. Cada una con
home, habitaciones y móvil, usando las fotos actuales como contenido
provisional.

1. **Editorial sobrio.** Título grande, foto tratada como documento, mucho
   blanco, reglas finas. Referencia mental: revista de viaje, no catálogo.
2. **Casa de familia.** Cálida y cercana, madera y luz de interior, foco en
   "quién te recibe". Sin caer en rusticidad de folleto.
3. **Refugio patagónico.** Paisaje y clima como contexto, verde profundo,
   silencio visual. Sin postal ni épica de montaña.

Cada ruta entrega capturas 360/768/1440 y notas de tipografía, grilla y color.
No entrega código.

## Alcance del primer corte

1. Tokens y base: color, tipografía, espaciado, foco visible, reset.
2. Home completa: header, hero, la casa, habitaciones, servicios, reseñas,
   ubicación, CTA de WhatsApp y footer.
3. Página de habitaciones: una ficha por tipo, con foto y datos honestos.
4. Mantener i18n ES/EN, metadata, JSON-LD y enlaces actuales.
5. Quitar lo que ya se marcó: comparación vieja/nueva, "sitio renovado",
   enlace a PageSpeed.

Fuera de alcance: motor de reservas, pagos, `/admin`, endpoints, otras páginas.

## Reglas de implementación

- Un solo escritor a la vez. Antigravity trabaja en `rediseno/2026-11`; opencode
  revisa después.
- No agregar dependencias. Si algo no se puede con CSS propio, se consulta.
- No inventar datos, precios, horarios, testimonios ni fotos.
- No generar imágenes del hostal ni de personas con IA.
- No tocar `app/admin`, `app/api`, `lib/admin-config.js` ni variables de
  entorno.
- Si falta un dato, se escribe "consultá por WhatsApp" o se deja el hueco
  marcado.

## Decisiones pendientes de aprobación

- Quitar el modo oscuro: duplica trabajo y no aporta a este sitio.
- Quitar el cotizador basado en la tarifa referencial hasta tener tarifas
  reales.
- Mover o quitar el widget de clima del hero.
- Confirmar si se mantienen las seis reseñas con nombre y texto.

## Criterios de aceptación

- `npm run build` verde, sin warnings nuevos.
- Cero emojis como iconos, cero count-up, cero comparativa del propio sitio,
  cero promesas de velocidad o SEO.
- El hero no presenta el coliseo como si fuera el hostal.
- Una idea y una acción principal por página.
- Correcto en 360, 768, 1024 y 1440.
- Navegación por teclado y foco visible; contraste AA.
- Sin JS de cliente para contenido estático.
- Capturas en `docs/handoff/` y reporte con comandos reales.
- Al reemplazar las fotos por las nuevas, no hay que rediseñar: solo cambiar
  archivos y ajustar recortes.

## Handoff

Antigravity debe leer `AGENTS.md`, este archivo y la skill
`.agents/skills/direccion-de-arte/SKILL.md`. Al cerrar el corte, escribe
`docs/handoff/reporte.md` con qué cambió, comandos ejecutados, capturas y
pendientes. opencode corre `qa` y `ciber` antes de aprobar.
