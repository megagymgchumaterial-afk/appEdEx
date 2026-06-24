/*
|==============================================================================
| DOMAIN / PROGRAMA / TYPES
|==============================================================================
|
| Entidad principal del seguimiento de entrenamiento.
|
| Un Programa representa un plan de entrenamiento personalizado
| asignado a una persona concreta.
|
| Incluye:
| - estructura de entrenamientos
| - ejercicios
| - grupos
| - progresión global por bloques
| - configuración avanzada
| - estado del programa
|
| No incluye:
| - ejecución puntual de una sesión
| - progreso histórico registrado
| - métricas derivadas
|
| Eso pertenece a otros dominios del sistema.
|
|==============================================================================
*/

import type { PersonaId } from "../persona";

/*
|--------------------------------------------------------------------------
| IDS
|--------------------------------------------------------------------------
*/

export type ProgramaId = string;
export type EntrenamientoProgramaId = string;
export type ItemProgramaId = string;
export type EjercicioId = string;
export type MaterialId = string;

/*
|--------------------------------------------------------------------------
| PROGRESIÓN GLOBAL DEL BLOQUE
|--------------------------------------------------------------------------
|
| Configuración general del programa por bloque.
|
| Define cómo evolucionan variables base
| a lo largo del programa.
|
| Ejemplo:
| - bloque 1: 3 x 10
| - bloque 2: 4 x 8
|
*/

export type ProgresionBloque = {
  bloque: number;
  series: number;
  reps: number;
  descansoSegundos: number | null;
};

/*
|--------------------------------------------------------------------------
| OVERRIDE DE PROGRESIÓN
|--------------------------------------------------------------------------
|
| Permite que un ejercicio o un grupo utilicen
| una progresión distinta a la progresión global del programa.
|
| Ejemplo:
| - el programa define 4x8 para el bloque 2
| - pero un ejercicio puntual usa 3x12 en ese bloque
|
*/

export type OverrideProgresion = {
  bloque: number;
  series: number;
  reps: number;
  descansoSegundos: number | null;
};

/*
|--------------------------------------------------------------------------
| VALORES POSIBLES DE CONFIGURACIÓN
|--------------------------------------------------------------------------
|
| Unión de valores que pueden ser manipulados
| desde formularios dinámicos del editor.
|
| No representa una entidad del dominio en sí,
| sino el rango de valores admitidos por los setters
| y configuradores genéricos.
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
| Configuración adicional aplicable tanto a:
| - ejercicios
| - grupos
|
| Centraliza:
| - overrides de progresión
| - intensidad
| - descanso
| - técnicas de entrenamiento
|
*/

export type ConfiguracionAvanzada = {
  /*
  |----------------------------------------------------------------------
  | OVERRIDES
  |----------------------------------------------------------------------
  */

  overrideActivo: boolean;
  overrideProgresiones: OverrideProgresion[];

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

  descansoSegundos: number | null;
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
| Instancia concreta de un ejercicio
| dentro de un programa.
|
| No representa el catálogo general de ejercicios,
| sino el nodo ya insertado dentro del árbol del programa.
|
*/

export type EjercicioPrograma = {
  id: ItemProgramaId;
  ejercicioId: EjercicioId;
  materialId: MaterialId;
  notas: string;
  configuracion: ConfiguracionAvanzada;
};

/*
|--------------------------------------------------------------------------
| ITEM EJERCICIO
|--------------------------------------------------------------------------
*/

export interface EjercicioProgramaItem {
  tipo: "ejercicio";
  contenido: EjercicioPrograma;
}

/*
|--------------------------------------------------------------------------
| GRUPO DEL PROGRAMA
|--------------------------------------------------------------------------
|
| Nodo agrupador dentro de un entrenamiento.
|
| Permite estructuras anidadas del tipo:
|
| Grupo
| ├─ Ejercicio
| ├─ Ejercicio
| └─ Grupo
|    ├─ Ejercicio
|    └─ Ejercicio
|
| Esto habilita:
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
  configuracion: ConfiguracionAvanzada;
  items: ItemPrograma[];
}

/*
|--------------------------------------------------------------------------
| ITEM GRUPO
|--------------------------------------------------------------------------
*/

export interface GrupoProgramaItem {
  tipo: "grupo";
  contenido: GrupoPrograma;
}

/*
|--------------------------------------------------------------------------
| ITEM DEL PROGRAMA
|--------------------------------------------------------------------------
|
| Unidad mínima renderizable/manipulable dentro del árbol.
|
| Toda la lógica de construcción del programa
| debería trabajar con esta unión discriminada.
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
| Se utiliza mientras el editor configura un ejercicio
| antes de insertarlo definitivamente en el programa.
|
| A diferencia de EjercicioPrograma,
| el draft todavía no necesita un id de nodo persistido.
|
*/

export type EjercicioDraft = {
  ejercicioId: EjercicioId;
  materialId: MaterialId;
  notas: string;
  configuracion: ConfiguracionAvanzada;
};

/*
|--------------------------------------------------------------------------
| ENTRENAMIENTO DEL PROGRAMA
|--------------------------------------------------------------------------
|
| Unidad principal de organización del programa.
|
| Cada entrenamiento contiene una lista ordenada de items
| (ejercicios y/o grupos).
|
*/

export type EntrenamientoPrograma = {
  id: EntrenamientoProgramaId;
  orden: number;
  items: ItemPrograma[];
};

/*
|--------------------------------------------------------------------------
| ESTADO DEL PROGRAMA
|--------------------------------------------------------------------------
|
| "en_proceso" y "completa" preservan la semántica actual del legacy.
|
| Más adelante podría evolucionar a algo más expresivo, por ejemplo:
| - borrador
| - activo
| - pausado
| - finalizado
|
*/

export type EstadoPrograma =
  | "en_proceso"
  | "completa";

/*
|--------------------------------------------------------------------------
| PROGRAMA
|--------------------------------------------------------------------------
|
| Entidad principal del dominio.
|
| Representa un plan de entrenamiento personalizado
| asignado a una persona.
|
| Conserva la lógica central del legacy "Rutina",
| pero desacoplada de nombres como "alumno" o "rutina".
|
*/

export type Programa = {
  /*
  |----------------------------------------------------------------------
  | IDENTIFICACIÓN
  |----------------------------------------------------------------------
  */

  id: ProgramaId;

  personaId: PersonaId;

  /*
  |----------------------------------------------------------------------
  | FECHAS
  |----------------------------------------------------------------------
  */

  fechaInicio: string;
  fechaUltimaEdicion: string;

  /*
  |----------------------------------------------------------------------
  | ESTRUCTURA
  |----------------------------------------------------------------------
  */

  cantidadBloques: number;
  entrenamientosPorBloque: number;

  /*
  |----------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |----------------------------------------------------------------------
  */

  progresionGlobal: ProgresionBloque[];

  /*
  |----------------------------------------------------------------------
  | ESTADO
  |----------------------------------------------------------------------
  */

  activa: boolean;
  estado: EstadoPrograma;

  /*
  |----------------------------------------------------------------------
  | CONTENIDO
  |----------------------------------------------------------------------
  */

  entrenamientos: EntrenamientoPrograma[];
};