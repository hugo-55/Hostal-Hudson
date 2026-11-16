# Equipo en Antigravity

Antigravity lee `AGENTS.md` del repo y las skills de `.agents/skills/` de forma
automática. No hace falta pegar prompts largos: alcanza con nombrar la skill.

## Qué hay acá

Copia portable de las skills canónicas del equipo, que viven en
`C:\Users\hugoc\agent\core\.opencode\skills`:

- `direccion-de-arte` — cómo evitar el look de plantilla y cómo usar Antigravity
  como mesa de arte.
- `web-quality` — definición de terminado (accesibilidad, performance, SEO).
- `nextjs` — App Router, caching, server actions.
- `ecommerce` — pagos, órdenes, stock, webhooks.
- `testing` — Vitest, Playwright, regresión.
- `debugging` — reproducir, aislar, fix mínimo.
- `performance` — medir antes de optimizar.
- `refactoring` — cambios sin romper.

## Cómo se usa

1. Abrí el repo en Antigravity.
2. Pedí: "leé `AGENTS.md` y usá la skill `direccion-de-arte`".
3. Para rediseño visual, esa skill manda. Para código Next, sumá `nextjs` y
   `web-quality`.
4. Al terminar, escribí `docs/handoff/reporte.md` con lo que cambió y cómo se
   verificó.

## Reglas

- El login de Antigravity no se conecta a opencode.
- No subir reservas, nombres de huéspedes, `/admin`, pagos ni credenciales.
- No generar fotos del hostal ni de personas con IA.
- Un solo entorno escribe a la vez: Antigravity o opencode, nunca los dos sobre
  la misma carpeta.
- `main` no se toca sin aprobación. Se trabaja en `rediseno/2026-11`.

## Actualizar las skills

Si cambia una skill en `agent/core`, se vuelve a copiar:

```powershell
$src='C:\Users\hugoc\agent\core\.opencode\skills'
$dst='C:\Users\hugoc\agent\proyectos\hostal-hudson\.agents\skills'
foreach($s in @('direccion-de-arte','web-quality','nextjs','ecommerce','testing','debugging','performance','refactoring')){
  Copy-Item -Recurse -Force "$src\$s" "$dst\$s"
}
```
