---
name: debugging
description: Método sistemático para reproducir, aislar y corregir bugs sin parchear a ciegas. Usar cuando algo falla y la causa no es obvia.
---

# Debugging

## Regla de oro

Primero se reproduce, después se entiende, al final se arregla. Cambiar cosas
"a ver si anda" genera dos bugs: el original y el nuevo.

## Proceso

1. **Reproducir.** Comando, ruta y pasos exactos. Si es intermitente, anotá
   frecuencia y condiciones.
2. **Capturar evidencia.** Error completo, stack trace, logs, request y
   response, estado de la base. Nada de "dice error".
3. **Aislar.** Reducir el caso. Comentar partes, probar la función sola,
   `git bisect` si apareció entre commits.
4. **Formular hipótesis.** Una sola, falsable. "Falla porque el webhook llega
   antes de que exista la orden".
5. **Confirmar.** Instrumentar justo en el punto sospechoso. Si la hipótesis no
   se confirma, descartarla y volver al paso 3.
6. **Arreglar mínimo.** El cambio más chico que corrige la causa, no el
   síntoma.
7. **Test de regresión.** Que falle antes y pase después.
8. **Verificar.** Build, tests y el flujo real.

## Pistas por capa

- **Frontend:** consola, pestaña red, estado del componente, hidratación,
  `useEffect` con dependencias mal puestas.
- **Backend:** logs con id de correlación, query exacta, timeouts, límites de
  rate.
- **Base de datos:** índices faltantes, N+1, transacciones, condiciones de
  carrera.
- **Pagos:** idempotencia, orden de webhooks, estados inconsistentes.

## Prohibido

- Silenciar errores con `try/catch` vacío.
- Subir el timeout sin entender por qué tarda.
- Deshabilitar un test para que pase.
- Mezclar el fix con un refactor.
- Reportar "arreglado" sin reproducir el caso original.
