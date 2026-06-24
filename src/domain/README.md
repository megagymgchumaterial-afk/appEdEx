Acá vive el negocio real:

tipos
reglas
servicios de dominio
repositorios abstractos / contratos
mappers entre storage y dominio si hace falta
Ejemplo:
resolver una sesión ejecutable desde una rutina
guardar una asignación
leer progreso de una persona
validar consistencia de una rutina

# Domain

Esta carpeta contiene el núcleo de negocio de la aplicación.

El objetivo es modelar el producto alrededor de conceptos estables del sistema, en lugar de hacerlo alrededor de pantallas, componentes o nombres históricos del proyecto legacy.

---

# Principios del dominio

## 1. El dominio representa el producto, no la UI
Acá deben vivir conceptos como:
- persona
- rutina
- sesión de entrenamiento
- progreso

y no conceptos de pantalla como:
- sidebar del editor
- formulario del constructor
- card de listado

---

## 2. El dominio no debería depender de la estructura de `app/`
El dominio debe poder existir aunque cambie completamente:
- la navegación
- la librería de UI
- la forma visual del editor
- la estructura del executor

---

## 3. El dominio no debería hablar en términos del repo legacy
La nueva arquitectura intenta evitar que el núcleo del sistema quede atado a nombres como:
- `UsuarioInstructor`
- `UsuarioEntrenado`
- `Alumno`

La idea es modelar conceptos más durables.

---

# Módulos de dominio previstos

## `persona/`
Modela la entidad persona dentro del sistema.

## `rutina/`
Modela la estructura editable de una rutina y sus partes.

## `entrenamiento/`
Modela la sesión ejecutable, asignaciones y lógica asociada a la ejecución del entrenamiento.

## `progreso/`
Modela el registro de resultados, historial y lectura de progreso.

---

# Tipos de archivo esperados por módulo

## `types.ts`
Modelos y tipos principales del dominio.

## `service.ts`
Reglas y operaciones de dominio.

## `repository.ts`
Contrato abstracto del repositorio del módulo.

## `mapper.ts`
Conversión entre shapes si hiciera falta.

## `index.ts`
Exports del módulo.

---

# Qué no debería pasar en `domain`
- componentes React
- JSX
- lógica de layout
- strings de navegación
- acceso directo desde la UI a detalles internos del storage
- mezclar la rutina editable con la sesión ejecutable y el progreso en un solo tipo

---

# Estado actual del refactor
En la primera etapa, el foco está en definir correctamente:
1. `Rutina`
2. `SesionEntrenamiento`
3. `RegistroProgreso`
4. `Persona`

Sin esos contratos, el resto del refactor corre el riesgo de apoyarse en modelos ambiguos.