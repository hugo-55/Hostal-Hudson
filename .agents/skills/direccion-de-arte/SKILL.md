---
name: direccion-de-arte
description: Criterio editorial y dirección de arte para sitios que no deben parecer plantillas ni hechos con IA (tipografía, fotografía, retícula, copy, motion y uso de Antigravity). Usar al diseñar o rediseñar un sitio.
---

# Dirección de arte

## Principio

Un sitio se ve profesional cuando alguien tomó decisiones y las sostuvo. El
"look IA" no viene del código: viene de acumular gestos seguros y genéricos.
Menos elementos, mejor ejecutados, con una idea que se note.

## Antes de diseñar

- Brief de una página: negocio, quién atiende, qué ofrece, a quién, qué fotos
  existen, qué datos están confirmados y qué no se puede afirmar.
- Inventario real de fotos, textos, precios, horarios y políticas. Si falta un
  dato, se marca el hueco; no se rellena con invento.
- Referencias: cinco sitios del mismo rubro que se vean bien y tres que se vean
  mal, con una razón concreta de cada uno. Referencias de diseño, no de
  competencia.

## Sistema visual

- Una idea rectora que se pueda decir en una frase ("editorial patagónico",
  "casa de familia", "refugio de montaña"). Si no se puede, no está definida.
- Dos familias tipográficas como máximo, cuatro tamaños y una escala
  consistente. Sin tracking decorativo.
- Tres a cinco colores: fondo, tinta, un neutro y un acento. El acento se usa
  poco; si aparece en cada botón, deja de ser acento.
- Retícula de 12 columnas, texto de 60-72 caracteres, asimetría intencional
  (7/5, 8/4). No grids de tres tarjetas iguales por reflejo.
- Radios de 0-6 px o ninguno. Sombras solo si hay elevación real. Reglas de
  1 px para separar.
- Iconos SVG propios o un set consistente. Nunca emojis como iconos.

## Fotografía

- Documental, luz natural, misma hora y mismo tratamiento para toda la serie.
- Encuadres repetibles: fachada, acceso, cada habitación (cama, baño, ventana),
  desayuno, zona común, entorno y un detalle de oficio.
- Nada de stock ni imágenes generadas de un lugar que existe: es publicidad
  engañosa.
- AVIF/WebP, tres tamaños, `srcset` y dimensiones explícitas.
- El hero es una foto, no un collage ni un video de fondo de 20 MB.

## Copy

- Voz del lugar, concreta, en primera persona del negocio.
- Solo datos verificables; sin fuente no se escribe.
- Prohibido: "sumérgete", "descubre", "vive la experiencia", "el paraíso te
  espera", "sin intermediarios" repetido, "los mejores", "calidad premium".
- Títulos cortos, párrafos de dos o tres líneas, una acción principal por
  página.
- El dueño del negocio revisa y aprueba los textos antes de publicar.

## Motion

- Un gesto por página como máximo: un fade corto del hero o transiciones de
  150-200 ms.
- Nada de count-up, ken burns, parallax ni reveal en cada bloque.
- `prefers-reduced-motion` respetado siempre.

## Checklist "esto lo hizo una IA"

- Emojis como iconos.
- Estadísticas con animación de conteo.
- Hero con chips de vidrio esmerilado.
- Grid de tres tarjetas idénticas en todas las secciones.
- Gradiente violeta/azul, glassmorphism o glow.
- Sección oscura redondeada para testimonios.
- Copy con superlativos y promesas de velocidad o SEO.
- Animación de entrada en cada bloque.
- Fotos de stock sonriendo a cámara.
- Comparativa "antes/después" del propio sitio.

Si aparecen dos o más señales, hay que rehacer, no retocar.

## Antigravity como mesa de arte

Antigravity sirve para explorar dirección visual, no para entregar código.

1. Brief cerrado y fotos reales. Nunca subir reservas, nombres de huéspedes,
   `/admin`, datos de pago ni credenciales.
2. Pedir tres rutas visuales distintas, no diez variantes del mismo hero. Cada
   una con home, una página interior y móvil.
3. Prohibido generar fotos del lugar o de personas reales. Si faltan fotos, se
   marca el hueco con un placeholder honesto.
4. Guardar capturas y notas de decisiones (tipografía, grilla, color) en
   `docs/diseno/` del proyecto.
5. `web` implementa el sistema elegido; `qa` compara contra las capturas con
   Playwright en 360, 768 y 1440.
6. El login de Antigravity no se conecta a opencode. El material se copia a
   mano.

## Criterios de aceptación

- Prueba a ciegas: tres personas ajenas al proyecto no identifican el sitio
  como generado por IA.
- Cero emojis-icono, cero count-up, cero comparativa del propio sitio, cero
  claims sin fuente.
- Misma serie fotográfica en todas las páginas.
- Una idea y una acción principal por página.
- La marca se reconoce sin el logo: color, tipografía y foto alcanzan.
