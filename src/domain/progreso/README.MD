# Domain / Progreso

Este módulo modela el **registro del progreso** dentro del sistema.

Su foco no es la rutina editable ni la sesión en sí misma, sino el resultado que queda guardado después de la ejecución o del seguimiento.

---

# Objetivo del módulo
Representar cómo se almacena y organiza la información de progreso de una persona en relación con sus entrenamientos.

---

# Qué debería vivir acá
- tipos de registro de progreso
- estructura del historial
- resultados por sesión o por ejercicio si aplica
- notas o métricas guardadas
- contratos de repositorio del progreso

---

# Qué no debería vivir acá
- la definición de la rutina editable
- la composición visual de la pantalla de progreso
- el constructor del editor
- el layout del executor
- branding visible

---

# Principio clave del módulo
El progreso no debería confundirse con:
- la rutina original
- la sesión a ejecutar
- la UI del historial

Es el **registro persistente** de lo que se hizo, cómo salió o qué métricas quedaron guardadas.

---

# Alcance inicial del módulo
En la primera etapa, este módulo debería permitir modelar:
1. un registro de progreso vinculado a una persona
2. el vínculo de ese registro con una rutina/asignación/sesión si corresponde
3. los resultados de ejecución más relevantes
4. notas u observaciones generales

---

# Decisiones iniciales
- El progreso se modela como entidad separada de la sesión ejecutable.
- Más adelante puede crecer con métricas, historial por ejercicio, cumplimiento, observaciones, etc.
- La estructura inicial debe ser lo bastante flexible como para soportar distintos niveles de detalle sin reescribir todo.

---

# Archivos del módulo

## `types.ts`
Tipos principales del dominio progreso.

## `repository.ts`
Contrato del repositorio de progreso.

## `service.ts`
Operaciones y reglas del módulo progreso.

## `mapper.ts`
Conversión entre dominio y persistencia si hace falta.

## `index.ts`
Exports del módulo.

---

# Pendientes a resolver
- qué datos exactos se registran por ejercicio o por sesión
- cómo se vincula el progreso con la asignación y la rutina original
- qué parte del historial necesita el editor vs qué parte necesita el executor