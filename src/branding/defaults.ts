import type { AppBranding } from "./types.ts";

export const DEFAULT_BRANDING: AppBranding = {
  app: {
    appName: "App Entrenador",
    appSubtitle: "Planificación, ejecución y seguimiento del entrenamiento",
  },

  roles: {
    editor: "Editor",
    executor: "Executor",
  },

  entities: {
    personas: "Personas",
    rutinas: "Rutinas",
    ejercicios: "Ejercicios",
    progreso: "Progreso",
    entrenamiento: "Entrenamiento",
  },

  navigation: {
    editor: {
      dashboard: "Inicio",
      personas: "Personas",
      rutinas: "Rutinas",
      ejercicios: "Ejercicios",
      progreso: "Progreso",
      configuracion: "Configuración",
      branding: "Branding",
    },

    executor: {
      dashboard: "Inicio",
      entrenamiento: "Entrenamiento",
      progreso: "Progreso",
      perfil: "Perfil",
    },
  },
};