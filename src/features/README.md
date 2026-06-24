Acá vive la lógica de pantalla / feature de UI.

Ejemplo:

listado de personas del editor
constructor visual de rutina
pantalla de progreso
dashboard del executor

Puede tener:

hooks de pantalla
componentes específicos de la feature
adaptadores UI

Pero no debería ser la fuente de verdad del dominio.

# Features

Esta carpeta contiene la lógica de pantalla y los módulos funcionales de UI de la aplicación.

A diferencia de `domain/`, que representa el negocio central del producto, `features/` organiza la experiencia de uso y la implementación visual/funcional de cada módulo.

---

# Objetivo de esta carpeta
Separar la lógica de cada feature de:
- la navegación de `app/`
- el dominio central del producto
- los componentes genéricos de `shared/`

---

# Qué debería vivir acá
- componentes específicos de una feature
- hooks de una feature
- estado y comportamiento de formularios
- composición de secciones de una pantalla
- adaptadores entre la UI y el dominio

---

# Qué no debería vivir acá
- la definición principal de `Rutina`, `SesionEntrenamiento`, `RegistroProgreso` o `Persona`
- helpers globales genéricos que no dependan de una feature
- branding global del producto
- storage concreto si puede abstraerse

---

# Organización prevista

## `editor/`
Features específicas de la superficie editor:
- dashboard
- personas
- rutinas
- ejercicios
- progreso
- branding

## `executor/`
Features específicas de la superficie executor:
- dashboard
- entrenamiento
- progreso
- perfil

---

# Relación con otras capas

## `app/`
Usa `features/` para construir páginas.

## `features/`
Usa:
- `domain/` para negocio
- `shared/` para piezas reutilizables
- `branding/` para labels y naming visible

## `domain/`
No debería depender de `features/`.

---

# Estado actual del refactor
La prioridad inicial de features no es construir todas las pantallas, sino preparar el terreno para migrar correctamente la feature de rutinas del editor una vez que el dominio y el branding base estén definidos.