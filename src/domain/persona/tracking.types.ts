/*
|==============================================================================
| DOMAIN / PERSONA / TRACKING TYPES
|==============================================================================
|
| Tipos vinculados al seguimiento de la persona.
|
| Este archivo agrupa toda la información que describe la evolución,
| adherencia y documentación asociada al proceso de entrenamiento.
|
| Incluye:
| - objetivos
| - archivos adjuntos
| - mediciones
| - asistencia
|
| No incluye:
| - datos de contacto
| - identidad del perfil
| - información administrativa o privada
|
|==============================================================================
*/

/*
|--------------------------------------------------------------------------
| IDS
|--------------------------------------------------------------------------
*/

export type ObjetivoPersonaId = string;
export type ArchivoPersonaId = string;
export type MedicionPersonaId = string;

/*
|--------------------------------------------------------------------------
| OBJETIVO DE LA PERSONA
|--------------------------------------------------------------------------
|
| Historial de objetivos planteados dentro del proceso de seguimiento.
|
| Un objetivo no debería eliminarse:
| simplemente cambia de estado a lo largo del tiempo.
|
| Ejemplos:
| - bajar porcentaje graso
| - aumentar masa muscular
| - mejorar adherencia
| - volver a entrenar 3 veces por semana
|
*/

export type ObjetivoPersona = {
  id: ObjetivoPersonaId;

  titulo: string;

  descripcion: string;

  fechaCreacion: string;

  creadoPor:
    | "persona"
    | "instructor"
    | "admin";

  estado:
    | "activo"
    | "cumplido"
    | "cancelado";
};

/*
|--------------------------------------------------------------------------
| ARCHIVO ADJUNTO
|--------------------------------------------------------------------------
|
| Archivos asociados al perfil y/o seguimiento de la persona.
|
| Ejemplos:
| - análisis clínicos
| - radiografías
| - resonancias
| - certificados
| - fotos
|
| Nota:
| -----
| El campo "url" representa la referencia al archivo ya persistido
| en algún storage externo o interno.
|
*/

export type ArchivoPersona = {
  id: ArchivoPersonaId;

  nombre: string;

  tipo:
    | "analisis"
    | "radiografia"
    | "resonancia"
    | "certificado"
    | "foto"
    | "otro";

  fechaSubida: string;

  url: string;

  observaciones?: string;
};

/*
|--------------------------------------------------------------------------
| MEDICIÓN
|--------------------------------------------------------------------------
|
| Registro de variables de seguimiento corporal.
|
| Está pensado para crecer y alimentar:
| - historial
| - gráficos
| - comparativas
| - reportes
|
| En esta etapa se conserva la estructura del legacy.
|
*/

export type MedicionPersona = {
  id: MedicionPersonaId;

  fecha: string;

  peso: number | null;

  pliegues: number | null;

  cintura: number | null;

  cuello: number | null;

  muslo: number | null;

  observaciones?: string;
};

/*
|--------------------------------------------------------------------------
| ASISTENCIA
|--------------------------------------------------------------------------
|
| Resumen simple de adherencia / asistencia.
|
| Más adelante puede evolucionar a un historial completo
| de sesiones realizadas, check-ins o cumplimiento semanal.
|
*/

export type AsistenciaPersona = {
  vecesPorSemanaObjetivo: number | null;
  promedioSemanal: number | null;
  observaciones: string;
};

/*
|--------------------------------------------------------------------------
| SEGUIMIENTO DE LA PERSONA
|--------------------------------------------------------------------------
|
| Bloque que agrupa toda la información de seguimiento
| vinculada a la persona.
|
*/

export type SeguimientoPersona = {
  objetivos: ObjetivoPersona[];
  archivos: ArchivoPersona[];
  mediciones: MedicionPersona[];
  asistencia: AsistenciaPersona;
};