/*
|==============================================================================
| DOMAIN / PROGRESO / TYPES
|==============================================================================
|
| Dominio de seguimiento, asignación y ejecución real del entrenamiento.
|
| Este módulo NO define la estructura base del programa,
| sino lo que ocurre cuando un Programa es utilizado por una Persona.
|
| Contiene 3 niveles conceptuales:
|
| 1) AsignacionPrograma
|    Relación entre:
|    - una persona
|    - un programa
|
|    Además guarda el estado macro del recorrido de esa persona
|    dentro del programa:
|    - si la asignación está activa
|    - por qué bloque va
|    - qué entrenamiento le toca / cuál fue el último
|    - cuántas sesiones registró
|
| 2) SesionEntrenamiento
|    Registro de una ejecución concreta de entrenamiento
|    dentro de una asignación.
|
| 3) Items de sesión
|    Guardan la diferencia entre:
|    - lo que el programa indicaba para ese bloque
|    - lo que la persona hizo realmente
|
| REGLA IMPORTANTE:
| -----------------
| Si el editor/instructor cambia la estructura del plan,
| eso pertenece a domain/programa.
|
| Si la persona hace algo distinto al ejecutar,
| eso pertenece a domain/progreso.
|
|==============================================================================
*/

import type {
  PersonaId,
} from "../persona";

import type {
  ProgramaId,
  EntrenamientoProgramaId,
  ItemProgramaId,
  EjercicioId,
} from "../programa";

/*
|--------------------------------------------------------------------------
| IDS
|--------------------------------------------------------------------------
*/

export type AsignacionProgramaId = string;

export type SesionEntrenamientoId = string;

/*
|--------------------------------------------------------------------------
| ESTADO DE ASIGNACIÓN
|--------------------------------------------------------------------------
|
| Estado general de una persona respecto de un programa.
|
| activa:
|   la persona está cursando este programa actualmente.
|
| pausada:
|   el programa sigue existiendo para esa persona,
|   pero momentáneamente no se está usando.
|
| completada:
|   la persona ya terminó el recorrido previsto.
|
| archivada:
|   se conserva por historial pero ya no forma parte del trabajo activo.
|
*/

export type EstadoAsignacionPrograma =
  | "activa"
  | "pausada"
  | "completada"
  | "archivada";

/*
|--------------------------------------------------------------------------
| ESTADO DE SESIÓN
|--------------------------------------------------------------------------
|
| Estado de una ejecución concreta.
|
| en_proceso:
|   la persona empezó a cargar o ejecutar la sesión
|   pero todavía no la cerró.
|
| completada:
|   la sesión se considera terminada y registrada.
|
| omitida:
|   se registra que esa sesión no se hizo o quedó saltada.
|
*/

export type EstadoSesionEntrenamiento =
  | "en_proceso"
  | "completada"
  | "omitida";

/*
|--------------------------------------------------------------------------
| PRESCRIPCIÓN RESUELTA
|--------------------------------------------------------------------------
|
| Foto de la indicación esperada para un item en el contexto
| de una sesión concreta.
|
| Esto NO reemplaza la estructura original del programa.
| Es una "instantánea" de lo que esa persona debía hacer
| en ese bloque / entrenamiento al momento de ejecutar.
|
| Guardarlo dentro de la sesión tiene dos ventajas:
|
| 1) evita recalcular retrospectivamente si el programa luego cambia
| 2) deja explícita la diferencia entre prescripción y ejecución real
|
*/

export type PrescripcionResuelta = {
  series: number | null;

  reps: number | null;

  descansoSegundos:
    number | null;

  rir: number | null;

  tempo: string | null;

  notas: string;
};

/*
|--------------------------------------------------------------------------
| EJECUCIÓN REAL DE EJERCICIO
|--------------------------------------------------------------------------
|
| Lo que la persona efectivamente realizó en la sesión.
|
| Esta estructura NO modifica el Programa base.
| Solamente registra la ejecución real de esta persona
| en esta sesión puntual.
|
*/

export type EjecucionRealEjercicio = {
  seriesRealizadas:
    number | null;

  repsRealizadas:
    number | null;

  descansoRealSegundos:
    number | null;

  rirReal: number | null;

  /*
  |----------------------------------------------------------------------
  | CARGA REAL
  |----------------------------------------------------------------------
  |
  | Se deja como string para permitir formatos flexibles:
  | - "80 kg"
  | - "2 mancuernas de 22,5"
  | - "peso corporal"
  |
  | Si más adelante querés un modelo analítico más fuerte,
  | esto puede evolucionar a una estructura más formal.
  |
  */

  cargaReal: string | null;

  notas: string;
};

/*
|--------------------------------------------------------------------------
| EJECUCIÓN REAL DE GRUPO
|--------------------------------------------------------------------------
|
| Datos reales asociados a un grupo completo.
|
| No siempre será necesario cargar datos a nivel grupo,
| porque muchas veces lo importante vive en cada ejercicio hijo.
|
| Aun así, conviene dejar este espacio por si querés registrar:
| - notas del circuito
| - tiempo total
| - percepción global
| - ajustes del grupo
|
*/

export type EjecucionRealGrupo = {
  notas: string;
};

/*
|--------------------------------------------------------------------------
| ITEM DE SESIÓN: EJERCICIO
|--------------------------------------------------------------------------
|
| Registro ejecutable de un ejercicio dentro de una sesión.
|
| Contiene:
| - referencia al item original del programa
| - la prescripción esperada
| - la ejecución real realizada por la persona
|
| IMPORTANTE:
| -----------
| Si la persona hizo otra cosa, se guarda en "ejecucion".
| El programa base no se toca.
|
*/

export type SesionEjercicioItem = {
  tipo: "ejercicio";

  /*
  |----------------------------------------------------------------------
  | REFERENCIAS AL PROGRAMA
  |----------------------------------------------------------------------
  */

  itemProgramaId: ItemProgramaId;

  ejercicioId: EjercicioId;

  /*
  |----------------------------------------------------------------------
  | IDENTIDAD VISIBLE
  |----------------------------------------------------------------------
  */

  nombreEjercicio: string;

  /*
  |----------------------------------------------------------------------
  | INDICACIÓN ESPERADA
  |----------------------------------------------------------------------
  */

  prescripcion:
    PrescripcionResuelta;

  /*
  |----------------------------------------------------------------------
  | EJECUCIÓN REAL
  |----------------------------------------------------------------------
  */

  ejecucion:
    EjecucionRealEjercicio;
};

/*
|--------------------------------------------------------------------------
| ITEM DE SESIÓN: GRUPO
|--------------------------------------------------------------------------
|
| Representa un grupo ejecutado dentro de la sesión.
|
| Un grupo conserva:
| - referencia al nodo del programa
| - nombre visible
| - prescripción del grupo (si aplica)
| - ejecución real del grupo
| - sus items hijos ya resueltos como sesión
|
| Nota:
| -----
| Los hijos del grupo en sesión se modelan como una lista de
| SesionItemEntrenamiento, lo que permite anidamiento.
|
*/

export type SesionGrupoItem = {
  tipo: "grupo";

  itemProgramaId: ItemProgramaId;

  nombre: string;

  prescripcion:
    PrescripcionResuelta;

  ejecucion:
    EjecucionRealGrupo;

  items:
    SesionItemEntrenamiento[];
};

/*
|--------------------------------------------------------------------------
| ITEM DE SESIÓN
|--------------------------------------------------------------------------
|
| Unión discriminada de nodos ejecutables dentro de una sesión.
|
| Se mantiene la lógica de árbol del programa,
| pero ahora desde la perspectiva de la ejecución real.
|
*/

export type SesionItemEntrenamiento =
  | SesionEjercicioItem
  | SesionGrupoItem;

/*
|--------------------------------------------------------------------------
| ASIGNACIÓN DE PROGRAMA
|--------------------------------------------------------------------------
|
| Relación entre una persona y un programa.
|
| Esta entidad permite:
| - asignar el mismo programa a varias personas
| - que cada una tenga su propio avance
| - que cada una registre sus propias sesiones
|
| El punto central de esta entidad es guardar el ESTADO MACRO
| del recorrido de la persona dentro del programa.
|
| Como ustedes no trabajan por calendario sino por avance,
| acá se guarda el punto actual del recorrido:
| - bloque actual
| - entrenamiento actual / último entrenamiento
| - cantidad de sesiones realizadas
|
*/

export type AsignacionPrograma = {
  /*
  |----------------------------------------------------------------------
  | IDENTIFICACIÓN
  |----------------------------------------------------------------------
  */

  id: AsignacionProgramaId;

  personaId: PersonaId;

  programaId: ProgramaId;

  /*
  |----------------------------------------------------------------------
  | ESTADO GENERAL
  |----------------------------------------------------------------------
  */

  activa: boolean;

  estado:
    EstadoAsignacionPrograma;

  /*
  |----------------------------------------------------------------------
  | RECORRIDO ACTUAL
  |----------------------------------------------------------------------
  |
  | bloqueActual:
  |   bloque en el que la persona se encuentra actualmente.
  |
  | entrenamientoActualOrden:
  |   entrenamiento actual dentro del bloque.
  |
  |   Ejemplo:
  |   - 1 = entrenamiento A
  |   - 2 = entrenamiento B
  |   - 3 = entrenamiento C
  |
  | Si preferís interpretar este campo como "último entrenamiento
  | realizado" en vez de "próximo entrenamiento a realizar",
  | también sirve; lo importante es ser consistente en el service.
  |
  */

  bloqueActual: number;

  entrenamientoActualOrden:
    number | null;

  /*
  |----------------------------------------------------------------------
  | MÉTRICAS DE AVANCE
  |----------------------------------------------------------------------
  */

  sesionesRegistradas:
    number;

  /*
  |----------------------------------------------------------------------
  | METADATOS
  |----------------------------------------------------------------------
  */

  fechaAsignacion: string;

  fechaUltimaActividad:
    string | null;

  observaciones: string;
};

/*
|--------------------------------------------------------------------------
| SESIÓN DE ENTRENAMIENTO
|--------------------------------------------------------------------------
|
| Registro de una ejecución concreta dentro de una asignación.
|
| Una sesión representa "lo que pasó realmente" cuando la persona
| realizó un entrenamiento del programa.
|
| Como ustedes trabajan por bloques + entrenamientos,
| la sesión guarda explícitamente:
| - a qué bloque correspondía
| - qué entrenamiento del programa se ejecutó
|
| Esto evita depender de una fecha para entender el recorrido.
|
*/

export type SesionEntrenamiento = {
  /*
  |----------------------------------------------------------------------
  | IDENTIFICACIÓN
  |----------------------------------------------------------------------
  */

  id: SesionEntrenamientoId;

  asignacionProgramaId:
    AsignacionProgramaId;

  personaId: PersonaId;

  programaId: ProgramaId;

  /*
  |----------------------------------------------------------------------
  | CONTEXTO DENTRO DEL PROGRAMA
  |----------------------------------------------------------------------
  */

  bloqueRealizado: number;

  entrenamientoProgramaId:
    EntrenamientoProgramaId;

  entrenamientoOrden:
    number;

  /*
  |----------------------------------------------------------------------
  | ESTADO DE LA SESIÓN
  |----------------------------------------------------------------------
  */

  estado:
    EstadoSesionEntrenamiento;

  /*
  |----------------------------------------------------------------------
  | CONTENIDO EJECUTADO
  |----------------------------------------------------------------------
  */

  items:
    SesionItemEntrenamiento[];

  /*
  |----------------------------------------------------------------------
  | METADATOS DE REGISTRO
  |----------------------------------------------------------------------
  |
  | Aunque la lógica principal no dependa del calendario,
  | sigue siendo útil poder guardar timestamps de ejecución real.
  |
  */

  fechaInicio: string | null;

  fechaFin: string | null;

  observaciones: string;
};