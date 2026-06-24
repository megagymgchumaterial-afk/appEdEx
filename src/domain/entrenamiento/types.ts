import type { PersonaId } from "../persona/types.ts";
import type {
  EjercicioId,
  EntrenamientoRutinaId,
  RutinaId,
  RutinaItemId,
} from "../programa/types.ts";

/**
 * Identificador de una asignación de rutina a una persona.
 */
export type AsignacionRutinaId = string;

/**
 * Identificador de una sesión ejecutable.
 */
export type SesionEntrenamientoId = string;

/**
 * Estado general de una asignación de rutina.
 */
export type AsignacionRutinaStatus =
  | "draft"
  | "active"
  | "paused"
  | "completed"
  | "archived";

/**
 * Estado general de una sesión de entrenamiento.
 */
export type SesionEntrenamientoStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "skipped";

/**
 * Referencia mínima a un ejercicio resuelto para ejecución.
 *
 * Esta estructura ya no representa la definición editable de la rutina,
 * sino el ejercicio tal como el executor lo va a ver dentro de una sesión.
 */
export type EjercicioSesion = {
  id: RutinaItemId;
  ejercicioId: EjercicioId;
  exerciseName: string;
  series?: number;
  reps?: string;
  restSeconds?: number;
  tempo?: string;
  rir?: string;
  load?: string;
  notes?: string;
};

/**
 * Grupo resuelto para ejecución.
 *
 * Se mantiene la idea de grupo, pero ya desde la perspectiva
 * de la sesión ejecutable.
 */
export type GrupoSesion = {
  id: RutinaItemId;
  type: "group";
  name: string;
  notes?: string;
  items: EjercicioSesion[];
};

/**
 * Ejercicio individual dentro de la sesión ejecutable.
 */
export type EjercicioSesionItem = EjercicioSesion & {
  type: "exercise";
};

/**
 * Unión de ítems posibles dentro de una sesión.
 */
export type SesionEntrenamientoItem = GrupoSesion | EjercicioSesionItem;

/**
 * Asignación de una rutina a una persona.
 *
 * Este objeto representa la relación entre:
 * - una persona
 * - una rutina base
 * - un período o estado de uso
 */
export type AsignacionRutina = {
  id: AsignacionRutinaId;
  personaId: PersonaId;
  rutinaId: RutinaId;
  status: AsignacionRutinaStatus;
  assignedAt: string;
  startsAt?: string;
  endsAt?: string;
  notes?: string;
};

/**
 * Sesión ejecutable concreta.
 *
 * En esta primera versión se modela como una sesión vinculada
 * a una asignación y a un entrenamiento puntual de la rutina.
 */
export type SesionEntrenamiento = {
  id: SesionEntrenamientoId;
  asignacionId: AsignacionRutinaId;
  personaId: PersonaId;
  rutinaId: RutinaId;
  entrenamientoRutinaId: EntrenamientoRutinaId;
  name: string;
  status: SesionEntrenamientoStatus;
  items: SesionEntrenamientoItem[];
  scheduledDate?: string;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
};