/*
|==============================================================================
| DOMAIN / PERSONA / INDEX
|==============================================================================
|
| Punto de entrada público del dominio persona.
|
| Objetivo:
| ---------
| Permitir que el resto de la app importe tipos del dominio persona
| desde un único lugar, sin tener que conocer la estructura interna
| de archivos del módulo.
|
|==============================================================================
*/

/*
|--------------------------------------------------------------------------
| ENTIDAD PRINCIPAL
|--------------------------------------------------------------------------
*/

export type { Persona } from "./types";

/*
|--------------------------------------------------------------------------
| PROFILE TYPES
|--------------------------------------------------------------------------
*/

export type {
  PersonaId,
  ContactoPersona,
  DatosPersonalesPersona,
  EstadoPersona,
} from "./profile.types";

/*
|--------------------------------------------------------------------------
| TRACKING TYPES
|--------------------------------------------------------------------------
*/

export type {
  ObjetivoPersona,
  ObjetivoPersonaId,
  ArchivoPersona,
  ArchivoPersonaId,
  MedicionPersona,
  MedicionPersonaId,
  AsistenciaPersona,
  SeguimientoPersona,
} from "./tracking.types";

/*
|--------------------------------------------------------------------------
| ADMIN TYPES
|--------------------------------------------------------------------------
*/

export type {
  SituacionEconomicaPersona,
  InformacionPrivadaPersona,
} from "./admin.types";