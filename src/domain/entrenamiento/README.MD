# Domain / Entrenamiento

Este módulo modela el entrenamiento como **sesión ejecutable / experiencia de ejecución**, diferenciándolo de la rutina editable.

Su objetivo es resolver cómo una rutina o asignación se transforma en algo que el executor pueda usar, completar y registrar.

---

# Objetivo del módulo
Representar la capa intermedia entre:
- la rutina creada por el editor
- la ejecución real del entrenamiento por parte del executor
- el progreso que queda registrado después

---

# Qué debería vivir acá
- tipos de asignación de rutina
- tipos de sesión ejecutable
- estructura del entrenamiento “listo para ejecutar”
- helpers/reglas para resolver una sesión desde una rutina asignada
- estado de una sesión en curso o pendiente si el producto lo necesita

---

# Qué no debería vivir acá
- el constructor visual de rutinas
- el registro histórico completo de progreso
- componentes de la pantalla del executor
- storage concreto de localStorage
- el listado visual del editor

---

# Principio clave del módulo
Una cosa es la **rutina editable** y otra es la **sesión ejecutable**.

La rutina puede contener una estructura general creada por el editor.
El entrenamiento, en cambio, representa lo que el executor necesita ver y hacer en un momento de ejecución:
- qué le toca hoy
- en qué orden
- con qué objetivo
- con qué instrucciones

---

# Alcance inicial del módulo
En la primera etapa, este módulo debería permitir modelar:
1. una asignación de rutina a una persona
2. una sesión de entrenamiento derivada de esa asignación
3. los ítems que la persona tiene que ejecutar
4. el estado general de la sesión

---

# Decisiones iniciales
- Este módulo será el puente entre rutina y progreso.
- No debe absorber toda la lógica del progreso.
- Debe evitar acoplarse a nombres viejos del repo legacy como “entrenado” o “alumno”.
- Puede crecer más adelante con calendario, estado de sesión, vencimientos o historial de sesiones.

---

# Archivos del módulo

## `types.ts`
Tipos principales del dominio entrenamiento.

## `repository.ts`
Contrato del repositorio del módulo.

## `service.ts`
Reglas y operaciones de entrenamiento.

## `mapper.ts`
Conversión entre dominio y persistencia si hace falta.

## `index.ts`
Exports del módulo.

---

# Pendientes a resolver
- qué tan detallada será la asignación de rutina
- cómo se decide qué sesión corresponde ejecutar
- si una sesión puede modificarse respecto de la rutina original
- si el entrenamiento necesita guardar snapshots de la rutina al momento de asignarse