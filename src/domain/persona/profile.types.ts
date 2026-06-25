/*
|==============================================================================
| DOMAIN / PERSONA / PROFILE TYPES
|==============================================================================
|
| Tipos base del perfil de la persona.
|
| Este archivo concentra la parte más estable de la entidad:
|
| - identificadores
| - contacto
| - datos personales
| - estado general del perfil
|
| No incluye:
| - objetivos
| - mediciones
| - archivos
| - asistencia
| - información económica o privada
|
| Eso vive en otros módulos del dominio persona.
|
|==============================================================================
*/

/*
|--------------------------------------------------------------------------
| IDS
|--------------------------------------------------------------------------
*/

export type PersonaId = string;

/*
|--------------------------------------------------------------------------
| CONTACTO
|--------------------------------------------------------------------------
|
| Información de contacto principal de la persona.
|
| Separarlo en un objeto permite:
| - reutilizar formularios
| - mantener la entidad principal más ordenada
| - distinguir mejor entre identidad y contacto
|
*/

export type ContactoPersona = {
  email: string;
  telefono: string;
  direccion: string;
};

/*
|--------------------------------------------------------------------------
| DATOS PERSONALES
|--------------------------------------------------------------------------
|
| Información personal básica de la persona.
|
| Nota:
| -----
| "sexo" se conserva como string | null porque así viene del legacy.
| Más adelante puede tiparse con una unión más estricta si definís
| una taxonomía cerrada o un catálogo configurable.
|
*/

export type DatosPersonalesPersona = {
  fechaNacimiento: string | null;
  sexo: string | null;
};

/*
|--------------------------------------------------------------------------
| ESTADO DEL PERFIL
|--------------------------------------------------------------------------
|
| Estado general del registro de la persona dentro del sistema.
|
| "activo" no representa necesariamente si está entrenando hoy,
| sino si el perfil sigue vigente dentro de la plataforma.
|
*/

export type EstadoPersona = {
  fechaAlta: string;
  activo: boolean;
};