# Program Builder
Versión: 1.0

---

# Objetivo

El Program Builder es el módulo encargado de construir la planificación completa de un entrenamiento.

No tiene ninguna responsabilidad sobre:

- autenticación
- almacenamiento
- ejecución del atleta
- historial
- estadísticas

Su única responsabilidad es construir programas.

---

# Filosofía

El instructor nunca crea "pantallas".

El instructor construye una planificación.

La planificación siempre posee esta estructura:

Programa

    Bloques

        Grupos de entrenamiento

            Unidades de trabajo

                Ejercicios

---

# Estructura

Program

↓

Block

↓

TrainingGroup

↓

WorkUnit

↓

ExercisePlan

---

# Programa

Representa una planificación completa.

Ejemplo

Hipertrofia

Powerbuilding

Rehabilitación

Fuerza

---

Propiedades

id

organizationId

name

description

status

version

notes

createdAt

updatedAt

---

Acciones

crear

editar

duplicar

archivar

publicar

---

No conoce atletas.

No conoce historial.

No conoce pesos.

---

# Bloque

Representa una etapa de la planificación.

No representa una semana del calendario.

Puede llamarse:

Semana 1

Semana 2

Semana 3

Fase A

Bloque Inicial

etc.

El nombre es únicamente visual.

---

Propiedades

id

programId

name

order

defaultProgression

trainingGroups[]

---

Responsabilidades

Guardar la progresión general.

Ordenar los grupos.

---

# Progresión

La progresión pertenece al bloque.

Nunca al ejercicio.

---

Propiedades

sets

reps

tempo

rest

rir

rpe

---

Todo ejercicio hereda automáticamente esta progresión.

---

Override

Un ejercicio puede reemplazar únicamente los valores necesarios.

Ejemplo

Bloque

4 x 10

↓

Sentadilla

5 x 5

---

Nunca modifica el resto.

---

# Grupo de entrenamiento

Representa una unidad lógica del programa.

Puede llamarse

A

B

C

Empuje

Pierna

Torso

Día 1

Día 2

No afecta la lógica.

---

Propiedades

id

blockId

name

order

workUnits[]

notes

---

Responsabilidades

Ordenar el entrenamiento.

---

# Unidad de trabajo

Representa un conjunto de ejercicios ejecutados sin descanso.

Puede contener

1 ejercicio

o

muchos ejercicios.

No existen

Superseries

Triseries

Circuitos

como entidades.

Todo eso es una Unidad de Trabajo.

---

Propiedades

id

trainingGroupId

order

rounds

restAfterRound

notes

exercisePlans[]

---

Reglas

Si contiene

1 ejercicio

↓

Individual

Si contiene

2 o más

↓

Grupo

El tipo se calcula automáticamente.

Nunca se guarda.

---

# Ejercicio planificado

Representa un ejercicio dentro de una Unidad de Trabajo.

---

Propiedades

id

exerciseId

materialId

order

configuration

override

notes

---

No guarda

peso

historial

series realizadas

fecha

---

Configuración

Puede contener

material

tempo

amplitud

pausas

observaciones

etc.

---

# Material

Siempre pertenece al ejercicio planificado.

Nunca al ejercicio maestro.

Ejemplo

Press banca

↓

Barra Olímpica

o

Smith

o

Mancuernas

---

# Flujo de creación

Crear Programa

↓

Agregar Bloque

↓

Configurar progresión general

↓

Crear Grupo de entrenamiento

↓

Agregar ejercicio

↓

Elegir material

↓

Guardar

↓

Agregar otro ejercicio

↓

Opcional

Agrupar ejercicios

↓

Guardar

---

# Agrupar ejercicios

El instructor nunca crea un grupo vacío.

Primero crea ejercicios individuales.

Luego puede seleccionar uno de ellos.

Acción

Agrupar

↓

Overlay

↓

Buscar ejercicio

↓

Elegir material

↓

Agregar

↓

Repetir las veces necesarias

↓

Guardar

---

Resultado

Unidad de trabajo

↓

Press banca

Remo

Press militar

---

# Desagrupar

Debe existir la acción

Desagrupar

La Unidad desaparece.

Los ejercicios vuelven a ser individuales.

---

# Reordenar

Debe permitirse mover

Bloques

↓

Grupos

↓

Unidades

↓

Ejercicios

mediante Drag & Drop.

---

# Vista del instructor

Mientras construye el entrenamiento siempre debe visualizar

Programa

↓

Bloque

↓

Grupo

↓

Ejercicios

en tiempo real.

Nunca trabaja mediante formularios separados.

---

# Estado del editor

El editor nunca modifica directamente el repositorio.

Siempre trabaja sobre un Draft.

Program

↓

Draft

↓

Edición

↓

Guardar

↓

Repository.save()

---

Esto permite

Cancelar cambios

Validar

Versionar

Undo / Redo (futuro)

---

# Casos de uso

Crear Programa

Editar Programa

Duplicar Programa

Publicar Programa

Archivar Programa

Crear Bloque

Eliminar Bloque

Mover Bloque

Configurar Progresión

Crear Grupo

Eliminar Grupo

Mover Grupo

Agregar Ejercicio

Eliminar Ejercicio

Cambiar Material

Agregar Override

Eliminar Override

Agrupar Ejercicios

Desagrupar Ejercicios

Mover Ejercicio

Duplicar Grupo

Duplicar Bloque

Duplicar Programa

Asignar Programa

---

# Reglas del negocio

La progresión siempre pertenece al Bloque.

Los ejercicios heredan la progresión.

Los Overrides solamente modifican un ejercicio.

Los grupos no poseen nombre obligatorio.

Los ejercicios nunca almacenan peso.

Los pesos pertenecen únicamente a la ejecución del atleta.

La Unidad de Trabajo representa una ejecución continua.

El tipo Individual o Grupo nunca se almacena.

Siempre se calcula.

---

# Fuera del alcance

El Program Builder NO conoce

Usuarios

Atletas

Historial

Resultados

Sesiones realizadas

Notificaciones

Supabase

LocalStorage

Todo eso pertenece a otros módulos.