# Convenciones del proyecto

## Objetivo
Definir reglas de naming, ubicación de archivos y criterios de arquitectura para que el refactor no vuelva a mezclar dominio, UI y persistencia.

---

# 1. Convenciones de naming

## 1.1. Superficies de app
Las superficies visibles de la app se nombran como:

- `editor`
- `executor`

Evitar usar como eje estructural del proyecto nombres como:
- `UsuarioInstructor`
- `UsuarioEntrenado`
- `Alumno`
- `Plantilla`

Estos nombres pueden existir como parte de compatibilidad temporal o branding visible, pero no deberían organizar el dominio base.

---

## 1.2. Dominio
Los módulos de dominio se nombran por concepto de negocio, no por pantalla.

Ejemplos correctos:
- `persona`
- `rutina`
- `entrenamiento`
- `progreso`

Ejemplos a evitar como eje de arquitectura:
- `entrenamientoEntrenado`
- `rutinaInstructor`
- `alumnoEntrenando`

---

## 1.3. Componentes
### Componentes React
Usar PascalCase para componentes:
- `RutinaCard.tsx`
- `PersonaForm.tsx`
- `EditorSidebar.tsx`

### Hooks
Usar prefijo `use`:
- `useBranding.ts`
- `useRutinaEditor.ts`
- `useEntrenamientoActual.ts`

### Utilidades
Usar camelCase:
- `buildRutinaResumen.ts`
- `parseStorageDate.ts`
- `resolveSesionActual.ts`

---

# 2. Ubicación de archivos

## 2.1. `app/`
Acá van solo:
- `page.tsx`
- `layout.tsx`
- composición de rutas
- wrappers de pantalla

No deberían vivir acá:
- tipos de dominio
- storage
- lógica pesada de negocio

---

## 2.2. `features/`
Acá va la lógica específica de una feature o pantalla:
- componentes de la feature
- hooks de la feature
- composición visual de módulos

Ejemplo:
- constructor de rutina
- formulario de persona
- vista de entrenamiento del executor

---

## 2.3. `domain/`
Acá viven:
- modelos del negocio
- contratos de repositorio
- servicios de dominio
- mappers entre dominio y persistencia si hace falta

No debería usarse para:
- componentes React
- formularios
- sidebars
- UI de pantallas

---

## 2.4. `branding/`
Acá vive todo lo relacionado con:
- labels visibles
- naming configurable
- defaults de branding
- helpers para resolver branding

No deberían vivir acá:
- tipos de rutina
- lógica de sesión
- progreso
- persistencia

---

## 2.5. `shared/`
Acá van piezas reutilizables y neutrales:
- UI genérica
- hooks genéricos
- utils
- constantes compartidas
- tipos genéricos

Si una pieza depende demasiado de una feature o de un módulo de dominio, probablemente no pertenece a `shared`.

---

## 2.6. `infrastructure/`
Implementaciones concretas:
- localStorage
- adapters externos
- persistencia específica

La UI no debería depender directamente de `localStorage`; idealmente pasa por repositorios o servicios.

---

# 3. Criterios de importación

## 3.1. Dependencias deseadas
### `app/`
puede depender de:
- `features/`
- `shared/`
- `branding/`

### `features/`
puede depender de:
- `domain/`
- `shared/`
- `branding/`

### `domain/`
idealmente no debería depender de:
- `app/`
- `features/`

### `shared/`
no debería depender de features concretas

### `infrastructure/`
puede depender de `domain/` para respetar contratos y shapes

---

# 4. Reglas para el refactor

## 4.1. No copiar un archivo legacy sin clasificarlo
Cada archivo del repo viejo debe caer en una de estas categorías:

### A. Copiar casi tal cual
Solo si es:
- UI genérica
- helper puro
- componente desacoplado de los nombres viejos

### B. Copiar y adaptar
Si la lógica sirve pero:
- tiene naming viejo
- mezcla un poco responsabilidades
- usa strings hardcodeados

### C. Usar como referencia y reescribir
Si mezcla:
- dominio
- UI
- storage
- lógica de editor y executor en el mismo archivo

---

## 4.2. No modelar una feature desde la UI primero si el dominio está abierto
Si todavía no está claro:
- qué es una rutina
- qué es una sesión
- qué es un registro de progreso

entonces no conviene avanzar fuerte con la pantalla final de esa feature.

---

## 4.3. Branding visible no se hardcodea en pantallas nuevas
Cualquier pantalla nueva del repo refactorizado debería tender a leer labels desde `branding/` en vez de escribir textos críticos directamente en el JSX.

---

# 5. Criterios de documentación interna

## 5.1. `README.md`
Usarlo para explicar el propósito estable de una carpeta:
- qué representa
- qué debería vivir ahí
- qué no debería vivir ahí
- dependencias permitidas
- pendientes estructurales

## 5.2. `notes.md`
Usarlo para:
- ideas
- deuda técnica
- dudas abiertas
- cosas a migrar del repo viejo
- decisiones provisorias

---

# 6. Reglas de modelado inicial

## 6.1. Evitar que un solo tipo represente todo
No usar un único tipo para mezclar:
- rutina editable
- sesión ejecutable
- registro de progreso
- shape persistido
- shape visual de UI

La idea del refactor es justamente separar esos conceptos.

---

## 6.2. Preferir nombres de dominio antes que nombres de pantalla
Ejemplo:
- `Rutina`
- `AsignacionRutina`
- `SesionEntrenamiento`
- `RegistroProgreso`

antes que:
- `RutinaPantallaEntrenado`
- `RutinaCardEditorData`
- `AlumnoEntrenamientoActivo`

---

# 7. Convención de TODOs y comentarios
Usar comentarios con intención clara.

## Ejemplo recomendado
```ts
// TODO(domain/rutina): separar la estructura editable de la estructura ejecutable