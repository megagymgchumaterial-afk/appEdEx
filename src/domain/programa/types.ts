/*
|==============================================================================
| DOMAIN / PROGRAMA / TYPES
|==============================================================================
|
| Dominio de definición estructural del programa de entrenamiento.
|
| Este módulo representa la PRESCRIPCIÓN BASE diseñada por el editor /
| instructor, independiente de una persona concreta.
|
| Un Programa define:
| - cantidad de bloques
| - entrenamientos por bloque
| - progresión global por bloque
| - ejercicios y grupos
| - configuración avanzada
| - overrides estructurales de progresión
|
| Este módulo NO guarda:
| - progreso real de una persona
| - pesos realmente usados
| - repeticiones efectivamente realizadas
| - cumplimiento de sesiones
| - avance actual dentro del programa
|
| Todo eso pertenece al dominio de PROGRESO / EJECUCIÓN.
|
|==============================================================================
*/

/*
|--------------------------------------------------------------------------
| IDS
|--------------------------------------------------------------------------
|
| Identificadores del dominio programa.
|
| ProgramaId:
|   identifica un programa completo.
|
| EntrenamientoProgramaId:
|   identifica un entrenamiento/día dentro del programa.
|
| ItemProgramaId:
|   identifica un nodo del árbol del programa
|   (ejercicio o grupo).
|
| EjercicioId / MaterialId:
|   referencian entidades de catálogo externas al programa.
|
*/

export type ProgramaId = string;

export type EntrenamientoProgramaId = string;

export type ItemProgramaId = string;

export type EjercicioId = string;

export type MaterialId = string;

/*
|--------------------------------------------------------------------------
| ESTADO DEL PROGRAMA
|--------------------------------------------------------------------------
|
| Estado editorial del programa.
|
| No representa el avance de una persona dentro del programa,
| sino el estado del objeto Programa dentro del editor.
|
| en_proceso:
|   el programa todavía está siendo armado o ajustado.
|
| completa:
|   el programa ya tiene una estructura lista para usarse / asignarse.
|
*/

export type EstadoPrograma =
  | "en_proceso"
  | "completa";

/*
|--------------------------------------------------------------------------
| PROGRESIÓN GLOBAL DEL BLOQUE
|--------------------------------------------------------------------------
|
| Define la progresión general esperada para un bloque.
|
| En tu lógica de negocio:
| - bloque ~= semana / etapa
| - entrenamiento ~= día / sesión distinta
|
| Entonces cada bloque puede tener una progresión global diferente
| que luego aplica sobre los entrenamientos de ese bloque,
| salvo que un ejercicio o grupo tenga un override propio.
|
| Ejemplo:
| - bloque 1: 3 x 12, 60 s
| - bloque 2: 4 x 10, 75 s
| - bloque 3: 4 x 8, 90 s
|
*/

export type ProgresionBloque = {
  bloque: number;

  series: number;

  reps: number;

  descansoSegundos:
    number | null;
};

/*
|--------------------------------------------------------------------------
| OVERRIDE DE PROGRESIÓN
|--------------------------------------------------------------------------
|
| Permite que un ejercicio o un grupo utilicen una progresión
| distinta a la progresión global del bloque.
|
| Ejemplo:
| - el bloque 2 del programa dice 4 x 10
| - pero sentadilla usa 5 x 5
|
| Esto forma parte de la PRESCRIPCIÓN estructural del programa,
| no de la ejecución real del entrenado.
|
*/

export type OverrideProgresion = {
  bloque: number;

  series: number;

  reps: number;

  descansoSegundos:
    number | null;
};

/*
|--------------------------------------------------------------------------
| VALORES POSIBLES DE CONFIGURACIÓN
|--------------------------------------------------------------------------
|
| Unión de valores admitidos por setters / formularios dinámicos
| de configuración avanzada.
|
| No representa una entidad del dominio por sí sola.
|
*/

export type ValorConfiguracion =
  | string
  | number
  | boolean
  | null
  | OverrideProgresion[];

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN AVANZADA
|--------------------------------------------------------------------------
|
| Configuración aplicable tanto a ejercicios como a grupos.
|
| Reúne:
| - overrides de progresión
| - intensidad
| - descanso
| - técnicas especiales
|
| IMPORTANTE:
| -----------
| Esto representa la indicación / configuración base del programa.
| Si luego la persona hace otra cosa al ejecutar,
| esa diferencia NO se guarda acá.
|
*/

export type ConfiguracionAvanzada = {
  /*
  |----------------------------------------------------------------------
  | OVERRIDES
  |----------------------------------------------------------------------
  */

  overrideActivo: boolean;

  overrideProgresiones:
    OverrideProgresion[];

  /*
  |----------------------------------------------------------------------
  | INTENSIDAD
  |----------------------------------------------------------------------
  */

  rir: number | null;

  tempo: string | null;

  /*
  |----------------------------------------------------------------------
  | DESCANSO
  |----------------------------------------------------------------------
  */

  descansoSegundos:
    number | null;

  usarTimer: boolean;

  /*
  |----------------------------------------------------------------------
  | TÉCNICAS
  |----------------------------------------------------------------------
  */

  warmup: boolean;

  dropset: boolean;

  cluster: boolean;

  /*
  |----------------------------------------------------------------------
  | FUTURAS TÉCNICAS
  |----------------------------------------------------------------------
  */

  restPause?: boolean;

  myoReps?: boolean;
};

/*
|--------------------------------------------------------------------------
| EJERCICIO DEL PROGRAMA
|--------------------------------------------------------------------------
|
| Nodo concreto de ejercicio dentro de un programa.
|
| Esto NO es el catálogo general de ejercicios,
| sino la instancia ya insertada dentro de la estructura del programa.
|
| Ejemplo:
| - ejercicioId = sentadilla trasera
| - materialId = barra
| - configuracion = override / rir / tempo / etc.
|
*/

export type EjercicioPrograma = {
  id: ItemProgramaId;

  ejercicioId: EjercicioId;

  materialId: MaterialId;

  notas: string;

  configuracion:
    ConfiguracionAvanzada;
};

/*
|--------------------------------------------------------------------------
| ITEM EJERCICIO
|--------------------------------------------------------------------------
|
| Wrapper discriminado para trabajar con un árbol uniforme
| de items dentro de un entrenamiento o grupo.
|
*/

export interface EjercicioProgramaItem {
  tipo: "ejercicio";

  contenido:
    EjercicioPrograma;
}

/*
|--------------------------------------------------------------------------
| GRUPO DEL PROGRAMA
|--------------------------------------------------------------------------
|
| Nodo agrupador dentro del programa.
|
| Permite construir estructuras anidadas del tipo:
|
| Grupo
| ├─ Ejercicio
| ├─ Ejercicio
| └─ Grupo
|    ├─ Ejercicio
|    └─ Ejercicio
|
| Casos de uso:
| - superseries
| - circuitos
| - bloques técnicos
| - agrupaciones arbitrarias
|
*/

export interface GrupoPrograma {
  id: ItemProgramaId;

  nombre: string;

  notas: string;

  configuracion:
    ConfiguracionAvanzada;

  items:
    ItemPrograma[];
}

/*
|--------------------------------------------------------------------------
| ITEM GRUPO
|--------------------------------------------------------------------------
*/

export interface GrupoProgramaItem {
  tipo: "grupo";

  contenido:
    GrupoPrograma;
}

/*
|--------------------------------------------------------------------------
| ITEM DEL PROGRAMA
|--------------------------------------------------------------------------
|
| Unidad mínima renderizable / manipulable del árbol del programa.
|
| Toda la lógica del editor debería trabajar principalmente
| con esta unión discriminada.
|
*/

export type ItemPrograma =
  | EjercicioProgramaItem
  | GrupoProgramaItem;

/*
|--------------------------------------------------------------------------
| DRAFT TEMPORAL DE EJERCICIO
|--------------------------------------------------------------------------
|
| Estructura utilizada mientras el editor configura un ejercicio
| antes de insertarlo definitivamente en el programa.
|
| A diferencia de EjercicioPrograma:
| - todavía no necesita un id persistido del nodo
|
*/

export type EjercicioDraft = {
  ejercicioId: EjercicioId;

  materialId: MaterialId;

  notas: string;

  configuracion:
    ConfiguracionAvanzada;
};

/*
|--------------------------------------------------------------------------
| ENTRENAMIENTO DEL PROGRAMA
|--------------------------------------------------------------------------
|
| Representa un entrenamiento / día dentro del programa.
|
| En tu lógica:
| - un bloque tiene X entrenamientos
| - cada entrenamiento tiene sus ejercicios / grupos
|
| Ejemplo:
| entrenamientosPorBloque = 3
|
| Entrenamiento 1:
| - tren inferior
|
| Entrenamiento 2:
| - empuje
|
| Entrenamiento 3:
| - tracción
|
| Cada entrenamiento se reutiliza conceptualmente a lo largo de
| los distintos bloques, cambiando la progresión global del bloque
| o los overrides particulares.
|
*/

export type EntrenamientoPrograma = {
  id: EntrenamientoProgramaId;

  /*
  |----------------------------------------------------------------------
  | ORDEN
  |----------------------------------------------------------------------
  |
  | Posición del entrenamiento dentro del bloque.
  |
  | Ejemplo:
  | - 1 = día A
  | - 2 = día B
  | - 3 = día C
  |
  */

  orden: number;

  /*
  |----------------------------------------------------------------------
  | IDENTIDAD VISIBLE
  |----------------------------------------------------------------------
  |
  | Permite que el editor asigne un nombre al entrenamiento
  | para hacerlo más legible.
  |
  | Ejemplos:
  | - Tren inferior
  | - Empuje
  | - Día A
  |
  */

  nombre: string;

  notas: string;

  items:
    ItemPrograma[];
};

/*
|--------------------------------------------------------------------------
| PROGRAMA
|--------------------------------------------------------------------------
|
| Entidad principal de definición del plan de entrenamiento.
|
| Representa una PRESCRIPCIÓN BASE reutilizable:
| - puede asignarse a una o varias personas
| - no guarda el avance individual
| - no guarda la ejecución real
|
| El progreso individual se resuelve desde:
| - AsignacionPrograma
| - SesionEntrenamiento
|
*/

export type Programa = {
  /*
  |----------------------------------------------------------------------
  | IDENTIFICACIÓN
  |----------------------------------------------------------------------
  */

  id: ProgramaId;

  nombre: string;

  descripcion: string;

  /*
  |----------------------------------------------------------------------
  | FECHAS EDITORIALES
  |----------------------------------------------------------------------
  |
  | No representan la fecha de ejecución de una persona,
  | sino la vida del objeto Programa dentro del editor.
  |
  */

  fechaCreacion: string;

  fechaUltimaEdicion:
    string;

  /*
  |----------------------------------------------------------------------
  | ESTRUCTURA
  |----------------------------------------------------------------------
  */

  cantidadBloques: number;

  entrenamientosPorBloque:
    number;

  /*
  |----------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |----------------------------------------------------------------------
  */

  progresionGlobal:
    ProgresionBloque[];

  /*
  |----------------------------------------------------------------------
  | ESTADO EDITORIAL
  |----------------------------------------------------------------------
  */

  activa: boolean;

  estado: EstadoPrograma;

  /*
  |----------------------------------------------------------------------
  | CONTENIDO
  |----------------------------------------------------------------------
  */

  entrenamientos:
    EntrenamientoPrograma[];
};