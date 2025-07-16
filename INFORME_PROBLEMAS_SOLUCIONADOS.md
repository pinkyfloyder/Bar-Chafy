# Informe de Problemas Solucionados - Bar Chafy

## 1. Error 419 (CSRF Token Mismatch) en Autenticación
**Causa:** El frontend no enviaba correctamente el token CSRF al backend Laravel, lo que provocaba el error 419 al intentar autenticarse.
**Solución:** Se ajustó el flujo de autenticación para obtener y enviar el token CSRF usando la ruta `/sanctum/csrf-cookie` antes de cualquier petición protegida. Se configuró correctamente el middleware y las cabeceras en las peticiones fetch/axios.

---

## 2. Error 422 (Unprocessable Entity) en Login/Registro
**Causa:** El backend respondía con error 422 por datos inválidos o formato incorrecto en las peticiones de login/registro.
**Solución:** Se corrigió el formato de los datos enviados desde el frontend y se forzó la respuesta JSON en los errores de validación en Laravel, permitiendo mostrar mensajes claros en el frontend.

---

## 3. Problemas con la Integración del Build de React en Laravel
**Causa:** Las rutas de los assets generados por React (JS/CSS/imágenes) no coincidían con las rutas públicas de Laravel, causando errores de carga.
**Solución:** Se automatizó la actualización de referencias a los archivos generados en el blade (`react-assets.blade.php`) y se copió el build de React a la carpeta pública de Laravel (`backend/public/build`).

---

## 4. Navegación SPA y Rutas Internas
**Causa:** La navegación interna de la SPA fallaba porque Laravel no tenía una ruta catch-all para servir el blade de React.
**Solución:** Se agregó una ruta catch-all en `routes/web.php` para que cualquier ruta no API sirva el blade de React, permitiendo la navegación SPA sin errores 404.

---

## 5. Problemas con el Logo de la Navbar (No era Interactivo)
**Causa:** El logo aparecía como texto estático (`<div>`) en vez de un enlace (`<a>`), porque el JS de React no se estaba ejecutando correctamente. Esto se debía a referencias desactualizadas a los archivos del build en el blade.
**Solución:** Se actualizaron las referencias en `react-assets.blade.php` para apuntar a los archivos JS y CSS generados en el último build. Al recargar, React montó la SPA correctamente y el logo se renderizó como enlace interactivo.

---

## 6. Problemas de Caché y Build Desactualizado
**Causa:** El build de React no se copiaba correctamente a la carpeta pública de Laravel, o el blade seguía apuntando a archivos viejos.
**Solución:** Se eliminó el build anterior, se generó uno nuevo (`npm run build`) y se copió a la carpeta pública. Se actualizaron las rutas en el blade para reflejar los nombres correctos de los archivos.

---

## Recomendaciones para el Futuro
- Siempre verifica que las rutas de los assets en el blade coincidan con los archivos generados en el último build.
- Si la SPA no se monta, revisa que el JS principal se cargue y ejecute correctamente.
- Ante errores de autenticación, revisa el flujo CSRF y los datos enviados.
- Mantén una ruta catch-all en Laravel para servir la SPA.
- Automatiza la actualización de assets en el blade tras cada build.
