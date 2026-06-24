# Domain / Persona

Este módulo modela la entidad **Persona** dentro del sistema.

No representa una pantalla específica ni un formulario concreto, sino el concepto de negocio de una persona vinculada a la aplicación.

---

# Objetivo del módulo
Definir la estructura base de una persona dentro del producto y dejar preparada la capa para que, más adelante, esa persona pueda relacionarse con:
- rutinas asignadas
- progreso
- historial
- preferencias o configuración asociada si el producto lo requiere

---

# Qué debería vivir acá
- tipo principal `Persona`
- estado de la persona dentro del sistema
- metadatos de creación/actualización
- contratos del repositorio de personas
- reglas mínimas del módulo persona si aparecen

---

# Qué no debería vivir acá
- formularios React de alta/edición
- layout de listado de personas
- lógica visual del editor
- datos específicos de una tarjeta de UI
- lógica de sesión de entrenamiento

---

# Alcance inicial del módulo
En esta primera etapa, el objetivo no es modelar todos los detalles posibles de una persona, sino definir una base suficientemente clara para:
1. identificar a la persona
2. guardar datos básicos de perfil
3. distinguir si está activa o archivada
4. poder vincularla luego con rutinas, entrenamiento y progreso

---

# Decisiones iniciales
- `Persona` es una entidad de dominio y no un “alumno” o “usuario entrenado” como nombre estructural.
- El módulo evita, por ahora, asumir demasiados datos clínicos o de negocio hasta revisar el repo legacy y el alcance real del producto.
- El tipo base debe ser estable y crecer sin obligar a reescribir el resto del dominio.

---

# Archivos del módulo

## `types.ts`
Define los tipos base del módulo persona.

## `repository.ts`
Contrato abstracto del repositorio de personas.

## `service.ts`
Reglas y operaciones del módulo persona.

## `mapper.ts`
Conversión entre dominio y persistencia si hace falta.

## `index.ts`
Exports del módulo.

---

# Pendientes a resolver
- qué campos reales necesita una persona en esta app
- si la persona tendrá datos de contacto, objetivos, observaciones o tags
- cómo se vincula con rutinas asignadas
- si hace falta distinguir perfiles o estados más específicos