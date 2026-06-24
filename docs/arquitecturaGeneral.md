# Arquitectura general del proyecto

## Objetivo del proyecto
Construir una aplicación de entrenamiento y seguimiento con dos grandes superficies de uso:

- **Editor**: quien crea, organiza, asigna y revisa el entrenamiento.
- **Executor**: quien recibe, ejecuta y registra el entrenamiento.

La aplicación debe poder escalar sin mezclar la lógica de ambas superficies, sin atar el dominio a nombres visibles de rol y sin hardcodear branding en la interfaz.

---

# Principios de arquitectura

## 1. Separar superficie, feature, dominio e infraestructura
La aplicación se divide en capas con responsabilidades distintas:

- `app/` → rutas, layouts y composición de páginas
- `features/` → lógica de pantalla / módulos de UI
- `domain/` → negocio central y modelos del producto
- `branding/` → textos, labels y branding configurable visible
- `infrastructure/` → persistencia concreta (por ahora storage local)
- `shared/` → piezas reutilizables neutrales

---

## 2. El dominio no depende de la UI
Los conceptos centrales del producto deben modelarse en `domain/` y no depender de:
- componentes React
- rutas
- layouts
- nombre visual del rol
- textos visibles del branding

Por ejemplo:
- `Rutina`
- `SesionEntrenamiento`
- `RegistroProgreso`
- `Persona`

deben existir aunque cambie completamente la UI.

---

## 3. Editor y Executor son superficies, no el dominio
El proyecto no debería estructurarse alrededor de nombres como `UsuarioInstructor` o `UsuarioEntrenado` dentro del núcleo del sistema.

La lógica central debería modelar conceptos más estables:
- persona
- rutina
- asignación
- sesión
- progreso

Luego la app expone esos conceptos en dos superficies:
- `editor`
- `executor`

---

## 4. Branding configurable, no hardcodeado
Los textos visibles y parte del branding deben depender de una capa específica de branding, no quedar embebidos directamente en las pantallas.

Esto busca permitir:
- personalización futura
- cambio de naming visible sin romper el dominio
- evitar textos repetidos y desordenados

---

## 5. El repo viejo se usa como fuente, no como verdad
El proyecto actual/legacy se toma como referencia funcional y fuente de migración, pero no como estructura definitiva.

Cada archivo del repo viejo debe entrar al repo nuevo bajo uno de estos criterios:
1. **Copiar casi tal cual** → si es UI genérica o utilidad pura
2. **Copiar y adaptar** → si la idea sirve pero está acoplada a nombres viejos o responsabilidades mezcladas
3. **Usar como referencia y reescribir** → si mezcla dominio, UI, storage y conceptos de ambos perfiles

---

# Capas del proyecto

## `src/app/`
Define la navegación y composición de páginas usando App Router.

### Responsabilidad
- rutas
- `page.tsx`
- `layout.tsx`
- composición de pantallas
- lectura de params de ruta

### No debería contener
- lógica de dominio compleja
- acceso directo a localStorage
- modelos centrales del producto
- reglas de negocio de rutinas, progreso o sesiones

---

## `src/features/`
Contiene la lógica de pantalla y módulos funcionales de la interfaz.

### Responsabilidad
- componentes específicos de una feature
- hooks de pantalla
- estado de formularios
- composición visual de una feature

### Ejemplos
- constructor de rutina
- listado de personas
- pantalla de progreso del editor
- pantalla de entrenamiento del executor

### No debería contener
- la definición principal de `Rutina`, `SesionEntrenamiento` o `RegistroProgreso`
- persistencia directa acoplada a localStorage si puede abstraerse
- branding global del sistema

---

## `src/domain/`
Representa el negocio central de la aplicación.

### Responsabilidad
- modelos del producto
- contratos de repositorio
- servicios de dominio
- mappers entre dominio y persistencia si hiciera falta
- reglas estructurales del producto

### Módulos previstos
- `persona`
- `rutina`
- `entrenamiento`
- `progreso`

---

## `src/branding/`
Capa para branding y naming visible configurable.

### Responsabilidad
- labels visibles
- textos y nombres configurables
- defaults de branding
- helpers/hooks para resolver branding

### No debería contener
- lógica de entrenamiento
- lógica de asignación
- modelos de progreso
- persistencia del dominio

---

## `src/infrastructure/`
Implementaciones concretas de persistencia o integraciones externas.

### Responsabilidad actual
- almacenamiento local (`localStorage`) de:
  - personas
  - rutinas
  - progreso
  - datos de entrenamiento si aplica

---

## `src/shared/`
Todo lo reutilizable y neutro.

### Ejemplos
- componentes UI genéricos
- hooks compartidos
- helpers reutilizables
- constantes neutras
- tipos realmente compartidos y no de dominio

---

# Modelo conceptual inicial del producto

## Núcleo de conceptos
El dominio base del proyecto se organizará alrededor de estos conceptos:

- **Persona**: entidad vinculada al seguimiento o a la ejecución
- **Rutina**: estructura editable creada por el editor
- **Entrenamiento / Sesión**: representación ejecutable derivada de una rutina o asignación
- **Progreso**: registro e historial de ejecución

---

# Relación entre superficies y dominio

## Editor
Usa el dominio para:
- crear rutinas
- editar rutinas
- organizar ejercicios
- ver personas
- revisar progreso
- configurar branding

## Executor
Usa el dominio para:
- ver su entrenamiento
- ejecutar sesiones
- registrar progreso
- consultar su historial o perfil

---

# Criterio de migración del repo legacy

## Regla general
No migrar por carpetas “porque sí”. Migrar por **valor estructural**.

### Orden sugerido
1. Branding base
2. Dominio `rutina`
3. Dominio `entrenamiento`
4. Dominio `progreso`
5. Dominio `persona`
6. Primer vertical real del editor (rutinas)
7. Recién después, features del executor

---

# Estado actual del refactor
Este documento debe ir actualizándose a medida que:
- se cierren los contratos del dominio
- se definan decisiones de branding
- se migren módulos del repo viejo
- se descarten conceptos o estructuras anteriores

---

# Decisiones abiertas por resolver
- shape final de `Rutina`
- shape final de `SesionEntrenamiento`
- relación entre rutina editable y sesión ejecutable
- qué parte del branding será configurable por usuario
- estrategia de persistencia a corto plazo (solo local o preparada para backend)