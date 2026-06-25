/*
|==============================================================================
| DOMAIN / PERSONA / TYPES
|==============================================================================
|
| Entidad principal del dominio persona.
|
| "Persona" reemplaza al antiguo concepto de "Alumno" del legacy.
|
| Se usa como entidad central del seguimiento individual dentro del sistema:
|
| - recibe programas personalizados
| - registra objetivos
| - guarda mediciones
| - almacena archivos
| - permite seguimiento de asistencia
|
| La elección de "Persona" busca desacoplar el dominio interno
| de etiquetas visibles como:
|
| - alumno
| - entrenado
| - paciente
|
| De esta manera, el branding visible puede cambiar en el futuro
| sin obligar a renombrar la base del dominio.
|
|==============================================================================
*/

import type {
  PersonaId,
  ContactoPersona,
  DatosPersonalesPersona,
  EstadoPersona,
} from "./profile.types";

import type {
  SeguimientoPersona,
} from "./tracking.types";

import type {
  InformacionPrivadaPersona,
} from "./admin.types";

/*
|--------------------------------------------------------------------------
| PERSONA
|--------------------------------------------------------------------------
|
| Entidad principal del dominio persona.
|
| Contiene:
| - identificación
| - contacto
| - datos personales
| - observaciones generales
| - estado del perfil
| - información de seguimiento
| - información privada / administrativa
|
*/

export type Persona = {
  /*
  |----------------------------------------------------------------------
  | IDENTIFICACIÓN
  |----------------------------------------------------------------------
  */

  id: PersonaId;
  nombre: string;
  apellido: string;
  nrodoc: string;

  /*
  |----------------------------------------------------------------------
  | CONTACTO
  |----------------------------------------------------------------------
  */

  contacto: ContactoPersona;

  /*
  |----------------------------------------------------------------------
  | DATOS PERSONALES
  |----------------------------------------------------------------------
  */

  datosPersonales: DatosPersonalesPersona;

  /*
  |----------------------------------------------------------------------
  | OBSERVACIONES GENERALES
  |----------------------------------------------------------------------
  |
  | Campo libre general del perfil.
  | No reemplaza notas privadas del instructor.
  |
  */

  observaciones: string;

  /*
  |----------------------------------------------------------------------
  | ESTADO
  |----------------------------------------------------------------------
  */

  estado: EstadoPersona;

  /*
  |----------------------------------------------------------------------
  | SEGUIMIENTO
  |----------------------------------------------------------------------
  */

  seguimiento: SeguimientoPersona;

  /*
  |----------------------------------------------------------------------
  | INFORMACIÓN PRIVADA
  |----------------------------------------------------------------------
  */

  privada: InformacionPrivadaPersona;
};