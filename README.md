# KNJO M — Prototipo de interfaz V0.1

## Propósito
Primera forma funcional de la experiencia KNJO M: editor de flyers con plantillas reutilizables, vista previa, exportación PNG y panel de preparación para mejoras de imagen/video. El inventario queda previsto como una fase posterior.

## Ejecutar
Abre `index.html` en un navegador moderno. No requiere instalación ni servidor para la demostración básica.

## Incluido
- Editor de texto, marca, color, estilo y formato (9:16, 1:1, 16:9).
- Tres presets visuales.
- Carga local de imagen de producto para la vista previa.
- Guardado y recuperación de plantillas mediante `localStorage`.
- Exportación PNG de vista previa.
- Interfaz de preparación para mejora de medios.

## Límites conocidos
- No es una aplicación de producción.
- La mejora real de imagen/video todavía no está implementada; el panel solo prepara la solicitud y no altera el archivo.
- No hay backend, cuentas, base de datos, sincronización, cuotas ni historial central.
- El exportador PNG es una primera aproximación: la tipografía y la composición exportada pueden diferir de la vista previa. Validar antes de uso comercial.
- La fuente web es opcional; el navegador usará fuentes de respaldo si no hay conexión.
- El símbolo KΩ del prototipo es provisional; reemplazar por el activo oficial autorizado antes de publicar.
- No contiene secretos ni credenciales.

## Siguiente fase recomendada
1. Pruebas de aceptación y revisión de accesibilidad/responsividad.
2. Definir formatos de exportación y fidelidad del diseño.
3. Seleccionar y validar motor de mejora de imagen/video, costos, límites y tratamiento de datos.
4. Incorporar biblioteca persistente y backend solo cuando el flujo y requisitos estén aprobados.
5. Agregar inventario como módulo independiente posterior, con modelo de datos propio.

## Estado de evidencia
- Implementado en este prototipo: interfaz y comportamientos locales descritos arriba.
- No implementado: mejora real con IA, procesamiento de video, sincronización multi-dispositivo, autenticación, backend y módulo de inventario.
