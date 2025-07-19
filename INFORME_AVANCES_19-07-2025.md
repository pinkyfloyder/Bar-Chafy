# INFORME DE AVANCES Y LÓGICAS IMPLEMENTADAS

## 1. Estructura y stack tecnológico
- **Frontend SPA:** React + Tailwind CSS
- **Backend:** Laravel 10 + Inertia.js
- **Empaquetado y desarrollo:** Vite
- **Persistencia local:** localStorage para estados de usuario (álbum, carrito)
- **Gestión de estado global:** Context API (álbum, carrito, pedidos, auth)

## 2. Funcionalidades principales
### Menú interactivo
- Visualización de productos por categorías.
- Añadir productos al carrito con cantidad y precio.
- Lógica de categorías para futuras recompensas.

### Carrito de compras
- Visualización y edición de productos agregados.
- Actualización de cantidades y eliminación de productos.
- Cálculo de total en tiempo real.
- Integración con sistema de recompensas: productos gratis a $0.
- Si el carrito solo tiene productos gratis, el pago se omite y se muestra “¡Pedido realizado!” directamente.
- Símbolo de moneda adaptado a $ (peso argentino).

### Álbum coleccionable y sistema de recompensas
- Visualización de progreso por categoría (matriz de cartas).
- Al completar 4 productos de una categoría, se habilita el canje de recompensa.
- Modal de canje: permite elegir un producto gratis de la categoría completada.
- Al canjear:
  - El usuario selecciona el producto gratis, que se añade al carrito a $0.
  - El estado del álbum se resetea solo para la categoría canjeada (tanto en React como en localStorage).
  - El botón de canje desaparece y el feedback visual vuelve a estado inicial.
- Animaciones y feedback visual para celebraciones y acciones clave.

### Pedidos
- Registro de pedidos realizados, con fecha, productos y total.
- Integración con el historial de pedidos.


### Otros componentes
- Modal de pago (PaymentModal) integrado con el flujo de pedidos.
- Toasts y mensajes visuales para feedback inmediato.
- Navegación y estructura SPA moderna.
- **Calendario de eventos:**
  - Visualización de eventos programados del bar en un calendario interactivo.
  - Permite ver fechas, descripciones y detalles de cada evento.
  - Integrado en la navegación principal para acceso rápido.
- **Formulario de contacto:**
  - Permite a los usuarios enviar consultas, sugerencias o reservas.
  - Incluye validación de campos y feedback visual tras el envío.
  - Los mensajes se gestionan y almacenan para seguimiento administrativo.

## 3. Lógicas y detalles técnicos implementados
- **resetCategoria:** función en AlbumContext para resetear solo la categoría canjeada, actualizando React y localStorage.
- **Condición de pago:** si el total del carrito es $0, se omite el pago y se muestra confirmación directa.
- **Símbolo de moneda:** reemplazo de € por $ en todos los totales y productos.
- **Reglas de hooks:** todos los hooks declarados al inicio de los componentes para evitar errores de React.
- **Feedback visual:** animaciones, colores y mensajes para cada acción relevante (canje, vaciado, pedido realizado).

## 4. Buenas prácticas y decisiones de arquitectura
- Separación clara de lógica y presentación.
- Uso de Context API para estados globales y lógica compartida.
- Componentes reutilizables y desacoplados.
- Persistencia local para experiencia fluida y offline.
- Código limpio, comentado y fácil de mantener.

## 5. Estado actual
- Menú, carrito, álbum, sistema de recompensas y pedidos: funcionales y robustos.
- Feedback visual y experiencia de usuario profesional.
- Sin errores críticos activos.

---

**Este informe resume los avances, lógicas y decisiones técnicas implementadas hasta la fecha. Puede ser usado como base para la tesis escrita y la documentación del proyecto.**

Fecha de cierre del informe: 19/07/2025
