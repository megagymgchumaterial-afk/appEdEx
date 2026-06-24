export type BrandingRoleLabels = {
  /**
   * Nombre visible del rol/editor dentro de la UI.
   * Ejemplo inicial: "Editor"
   */
  editor: string;

  /**
   * Nombre visible del rol/executor dentro de la UI.
   * Ejemplo inicial: "Executor"
   */
  executor: string;
};

export type BrandingEntityLabels = {
  /**
   * Nombre visible plural de las personas dentro de la app.
   * Puede cambiarse en el futuro si la estrategia del producto lo requiere.
   */
  personas: string;

  /**
   * Nombre visible plural de las rutinas.
   */
  rutinas: string;

  /**
   * Nombre visible plural de los ejercicios.
   */
  ejercicios: string;

  /**
   * Nombre visible de la sección de progreso.
   */
  progreso: string;

  /**
   * Nombre visible de la sección de entrenamiento.
   */
  entrenamiento: string;
};

export type BrandingNavigationLabels = {
  /**
   * Labels de navegación del editor.
   */
  editor: {
    dashboard: string;
    personas: string;
    rutinas: string;
    ejercicios: string;
    progreso: string;
    configuracion: string;
    branding: string;
  };

  /**
   * Labels de navegación del executor.
   */
  executor: {
    dashboard: string;
    entrenamiento: string;
    progreso: string;
    perfil: string;
  };
};

export type BrandingAppInfo = {
  /**
   * Nombre visible del producto o marca.
   */
  appName: string;

  /**
   * Subtítulo o claim visible opcional.
   */
  appSubtitle?: string;
};

export type AppBranding = {
  app: BrandingAppInfo;
  roles: BrandingRoleLabels;
  entities: BrandingEntityLabels;
  navigation: BrandingNavigationLabels;
};