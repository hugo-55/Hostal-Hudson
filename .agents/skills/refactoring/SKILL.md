---
name: refactoring
description: Refactor seguro de código existente sin cambiar comportamiento (tests de caracterización, pasos chicos, strangler pattern). Usar al ordenar, migrar o modernizar código.
---

# Refactoring

## Antes de tocar

- Si no hay tests, escribí tests de caracterización que capturen el
  comportamiento actual, incluidos los casos raros.
- Definí el objetivo: legibilidad, performance, migración o quitar deuda.
- Un refactor no cambia comportamiento. Si cambia, es una feature y va en otro
  commit.

## Método

1. Medir el estado actual: tests, build, tiempos, errores.
2. Elegir el corte más chico que deje el sistema verde.
3. Mover sin cambiar lógica; commits pequeños y descriptivos.
4. Correr tests después de cada paso.
5. Si algo falla, revertir el paso, no acumular.
6. Al final, comparar comportamiento y performance contra la línea base.

## Legacy

- Strangler pattern: envolver lo viejo, migrar por partes, apagar al final.
- No reescribir todo de una.
- Identificar lo que no se toca nunca y dejarlo.
- Documentar decisiones en `docs/`.

## Señales de que hace falta

- Duplicación de lógica de negocio.
- Funciones de más de 100 líneas con varias responsabilidades.
- Cambios que rompen cosas en lugares inesperados.
- Tests frágiles que fallan por detalles de implementación.

## Prohibido

- Mezclar refactor con feature o con fix.
- Cambiar formato y lógica en el mismo commit.
- "Limpiar" archivos que nadie pidió tocar.
- Refactor sin red de tests en código crítico (pagos, auth, datos).
