/*
|==============================================================================
| DOMAIN / PERSONA / ADMIN TYPES
|==============================================================================
|
| Tipos vinculados a información privada o administrativa de la persona.
|
| Esta información no forma parte del seguimiento del entrenamiento en sí,
| pero sí del contexto de gestión de la relación con la persona.
|
| Ejemplos:
| - notas privadas del instructor
| - estado económico / administrativo
|
| Idealmente, no toda esta información debería ser visible
| para cualquier rol del sistema.
|
|==============================================================================
*/

/*
|--------------------------------------------------------------------------
| SITUACIÓN ECONÓMICA
|--------------------------------------------------------------------------
|
| Información administrativa/económica de la persona.
|
| Regla de negocio sugerida:
| - visible para admin
| - opcionalmente visible o editable para instructor, según tu criterio
| - no visible para el executor/persona entrenada
|
*/

export type SituacionEconomicaPersona = {
  estado:
    | "al_dia"
    | "deuda";

  plan: string;

  ultimoPago: string | null;

  observaciones: string;
};

/*
|--------------------------------------------------------------------------
| INFORMACIÓN PRIVADA
|--------------------------------------------------------------------------
|
| Información que no debería mezclarse con el perfil público/general
| de la persona.
|
*/

export type InformacionPrivadaPersona = {
  /*
  |----------------------------------------------------------------------
  | NOTAS DEL INSTRUCTOR / ADMIN
  |----------------------------------------------------------------------
  |
  | Espacio para registrar observaciones privadas sobre la persona
  | que no forman parte del contenido visible general del perfil.
  |
  */

  notasInstructor: string;

  /*
  |----------------------------------------------------------------------
  | INFORMACIÓN ECONÓMICA
  |----------------------------------------------------------------------
  */

  situacionEconomica: SituacionEconomicaPersona;
};