---
name: performance
description: Optimización web basada en medición (Core Web Vitals, bundle, imágenes, fuentes, caching y base de datos). Usar cuando el sitio está lento o antes de publicar.
---

# Performance

## Medir antes de optimizar

- Lighthouse o PageSpeed Insights en móvil.
- Datos reales si existen (Vercel Analytics, RUM).
- Perfil de red y CPU en el navegador.
- Tiempo de respuesta del servidor y consultas lentas.

Sin medición, "optimizar" es adivinar.

## Presupuesto

- LCP < 2.5 s · CLS < 0.1 · INP < 200 ms en móvil 4G.
- JS inicial < 200 KB gzip en una landing.
- Imágenes: ninguna mayor a 300 KB sin justificación.
- Fuentes: máximo dos familias y subsets necesarios.

## Palancas por impacto

1. **Imágenes:** AVIF/WebP, dimensiones, `srcset`, lazy salvo el hero.
2. **JavaScript:** quitar librerías, dividir bundles, cargar en cliente solo lo
   necesario.
3. **Servidor:** cachear lo público, evitar waterfalls, consultas en paralelo.
4. **Base de datos:** índices, paginación, evitar N+1, `select` solo columnas
   usadas.
5. **Fuentes:** `swap`, precarga de la principal, subset latino.
6. **CSS:** evitar frameworks pesados para poco uso; purgar.

## E-commerce

- La página de producto y el checkout son las críticas.
- El carrito debe responder sin recargar.
- No bloquear el render con scripts de analítica o chat.
- Cuidado con imágenes de catálogo: son el mayor peso habitual.

## Verificación

- Comparar antes y después con la misma red y dispositivo.
- No declarar mejora sin números.
- Vigilar que la optimización no rompa accesibilidad ni SEO.
