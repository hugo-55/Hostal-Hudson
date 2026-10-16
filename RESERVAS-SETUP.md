# Reservas reales del hostal (15 min, una vez)

Las reservas del formulario quedan registradas en una planilla del hostal + aviso WhatsApp. Mismo sistema que la tienda, columnas distintas.

## 1. Planilla del hostal
1. Con la cuenta Google del hostal: sheets.google.com → hoja `Reservas`
2. Primera fila: `fecha_registro | nombre | llegada | noches | personas`

## 2. Apps Script (igual patrón que SHEETS-SETUP de tienda-demo)
Extensiones → Apps Script → pegar:

```gs
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Reservas') || ss.insertSheet('Reservas');
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.fecha_registro || new Date(), d.nombre || '', d.llegada || '', d.noches || 1, d.personas || 1]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

Desplegar como aplicación web (ejecutar como: yo, acceso: cualquier persona) → copiar URL `/exec` → `lib/site.js → SHEET_ENDPOINT`.

## 3. Aviso WhatsApp (opcional, ver NOTIFY-SETUP de tienda-demo)
Mismo puente, el mensaje ya viene armado: "🏨 Nueva reserva: nombre, llegada, noches, personas."

## 4. Verificar
Reserva de prueba en `/reservas` → fila en Sheets + WhatsApp al +56 9 9439 1571.
