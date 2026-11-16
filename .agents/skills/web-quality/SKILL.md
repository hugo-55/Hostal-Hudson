---
name: web-quality
description: Estándares de calidad para sitios y apps web (accesibilidad, performance, SEO, seguridad, responsive y definición de terminado). Usar al construir, revisar o auditar cualquier entrega web.
---

# Calidad web

Checklist única para `web`, `qa` y `ciber`. Si el proyecto define estándares
más estrictos, mandan los del proyecto.

## Definición de terminado

Una entrega está terminada cuando:

- build, lint y typecheck pasan sin errores;
- los tests pasan (si existen);
- no hay errores en consola ni requests fallidos en los flujos principales;
- cumple accesibilidad, responsive, SEO y seguridad de esta checklist;
- `qa` aprobó y, si toca auth, pagos o datos personales, `ciber` no dejó
  bloqueantes.

## Accesibilidad (WCAG 2.2 AA)

- Contraste ≥ 4.5:1 en texto normal y ≥ 3:1 en texto grande.
- Todo control se usa con teclado y tiene foco visible.
- Un solo `h1` por página; jerarquía de headings sin saltos.
- Imágenes con `alt`; decorativas con `alt=""`.
- Inputs con label asociado; errores anunciados y ligados al campo.
- Botones e inputs con nombre accesible.
- `aria-*` solo cuando el HTML nativo no alcanza.
- Sin `tabindex` positivos ni trampas de foco en modales.
- Enlaces con texto descriptivo, no "click aquí".
- `lang` correcto y `prefers-reduced-motion` respetado.

## Performance

Presupuesto objetivo en móvil y 4G:

- LCP < 2.5 s · CLS < 0.1 · INP < 200 ms.
- Lighthouse ≥ 95 en las cuatro categorías.
- JS inicial < 200 KB gzip en una landing; menos es mejor.
- Imágenes en AVIF o WebP, con dimensiones explícitas, lazy salvo
  above-the-fold.
- Fuentes locales o con `display: swap`; máximo dos familias.
- Sin librerías para cosas que el navegador ya resuelve.

## SEO técnico

- `title` y `description` únicos y descriptivos.
- `canonical` correcto.
- Open Graph y Twitter Card.
- JSON-LD cuando el tipo de negocio lo justifica.
- `sitemap.xml` y `robots.txt` coherentes.
- HTML semántico y contenido principal presente en el HTML inicial.
- 404 real; redirecciones 301/308 sin cadenas.

## Seguridad

- Validación de entrada en servidor; nunca confiar en el cliente.
- Escape de salida; nada de `dangerouslySetInnerHTML` sin sanitizar.
- Secretos solo en variables de entorno del servidor.
- Cookies de sesión `HttpOnly`, `Secure` y `SameSite=Lax/Strict`.
- Headers: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`,
  `frame-ancestors`.
- Rate limiting en login, formularios y endpoints públicos.
- Sin dependencias con vulnerabilidades altas sin mitigar.
- Sin PII en URLs ni en logs.

## Responsive

- Probar 360, 768, 1024 y 1440 px.
- Sin scroll horizontal.
- Texto legible sin zoom (16 px base como mínimo).
- Áreas táctiles ≥ 44×44 px.
- Navegación usable con una mano en móvil.

## Contenido y UX

- Textos reales, no `lorem ipsum`, en entregas.
- Estados vacíos, de carga y de error diseñados.
- Formularios con feedback inmediato y mensajes claros.
- Imágenes con peso y recorte correctos.
- Sin enlaces rotos ni rutas muertas.

## Cómo reportar

Cada hallazgo: **severidad · evidencia · fix sugerido**.

- **Bloqueante:** rompe el build, un flujo principal o pone en riesgo datos.
- **Alto:** accesibilidad grave, seguridad explotable o pérdida de datos.
- **Medio:** SEO, performance o UX con impacto real.
- **Bajo:** detalle cosmético o mejora opcional.

Sin evidencia no es hallazgo: es sospecha, y se reporta como "a verificar".
