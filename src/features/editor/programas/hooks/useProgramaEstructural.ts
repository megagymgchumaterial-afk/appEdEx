import { useState } from "react";

import type {
  Programa,
  EntrenamientoPrograma,
  EjercicioPrograma,
  GrupoPrograma,
  ItemPrograma,
  EjercicioDraft,
  ConfiguracionAvanzada,
  ValorConfiguracion,
} from "../../domain/programa";

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN BASE
|--------------------------------------------------------------------------
|
| Estado inicial para ejercicios y grupos.
|
*/

const configuracionBase: ConfiguracionAvanzada = {
  overrideActivo: false,
  overrideProgresiones: [],
  rir: null,
  tempo: null,
  descansoSegundos: null,
  usarTimer: false,
  warmup: false,
  dropset: false,
  cluster: false,
  restPause: false,
  myoReps: false,
};

/*
|--------------------------------------------------------------------------
| DRAFT BASE
|--------------------------------------------------------------------------
|
| Estado inicial del ejercicio temporal.
|
*/

const draftBase: EjercicioDraft = {
  ejercicioId: "",
  materialId: "",
  notas: "",
  configuracion: {
    ...configuracionBase,
  },
};

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {
  programaInicial?: Programa;
};

/*
|--------------------------------------------------------------------------
| HELPERS RECURSIVOS
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| ACTUALIZAR GRUPO RECURSIVAMENTE
|--------------------------------------------------------------------------
*/

function actualizarGrupoRecursivo(
  items: ItemPrograma[],
  grupoId: string,
  updater: (grupo: GrupoPrograma) => GrupoPrograma
): ItemPrograma[] {
  return items.map((item) => {
    if (item.tipo === "grupo") {
      if (item.contenido.id === grupoId) {
        return {
          ...item,
          contenido: updater(item.contenido),
        };
      }

      return {
        ...item,
        contenido: {
          ...item.contenido,
          items: actualizarGrupoRecursivo(
            item.contenido.items,
            grupoId,
            updater
          ),
        },
      };
    }

    return item;
  });
}

/*
|--------------------------------------------------------------------------
| ACTUALIZAR EJERCICIO RECURSIVAMENTE
|--------------------------------------------------------------------------
*/

function actualizarEjercicioRecursivo(
  items: ItemPrograma[],
  ejercicioId: string,
  updater: (ejercicio: EjercicioPrograma) => EjercicioPrograma
): ItemPrograma[] {
  return items.map((item) => {
    if (item.tipo === "ejercicio") {
      if (item.contenido.id === ejercicioId) {
        return {
          ...item,
          contenido: updater(item.contenido),
        };
      }

      return item;
    }

    return {
      ...item,
      contenido: {
        ...item.contenido,
        items: actualizarEjercicioRecursivo(
          item.contenido.items,
          ejercicioId,
          updater
        ),
      },
    };
  });
}

/*
|--------------------------------------------------------------------------
| ELIMINAR GRUPO RECURSIVAMENTE
|--------------------------------------------------------------------------
|
| Elimina un grupo por id en cualquier nivel del árbol.
|
*/

function eliminarGrupoRecursivo(
  items: ItemPrograma[],
  grupoId: string
): ItemPrograma[] {
  return items
    .filter((item) => {
      if (item.tipo !== "grupo") {
        return true;
      }

      return item.contenido.id !== grupoId;
    })
    .map((item) => {
      if (item.tipo !== "grupo") {
        return item;
      }

      return {
        ...item,
        contenido: {
          ...item.contenido,
          items: eliminarGrupoRecursivo(
            item.contenido.items,
            grupoId
          ),
        },
      };
    });
}

/*
|--------------------------------------------------------------------------
| ELIMINAR EJERCICIO RECURSIVAMENTE
|--------------------------------------------------------------------------
|
| Elimina un ejercicio por id en cualquier nivel del árbol.
|
*/

function eliminarEjercicioRecursivo(
  items: ItemPrograma[],
  ejercicioId: string
): ItemPrograma[] {
  return items
    .filter((item) => {
      if (item.tipo !== "ejercicio") {
        return true;
      }

      return item.contenido.id !== ejercicioId;
    })
    .map((item) => {
      if (item.tipo !== "grupo") {
        return item;
      }

      return {
        ...item,
        contenido: {
          ...item.contenido,
          items: eliminarEjercicioRecursivo(
            item.contenido.items,
            ejercicioId
          ),
        },
      };
    });
}

/*
|--------------------------------------------------------------------------
| HOOK
|--------------------------------------------------------------------------
|
| Administra la estructura interna del programa:
|
| - entrenamientos
| - grupos
| - ejercicios
| - draft temporal del ejercicio
| - reordenamientos
| - configuraciones y notas
|
| NO administra:
| - persona
| - fecha
| - bloques
| - progresión global
| - creación final de la entidad Programa
|
*/

export function useProgramaEstructural({
  programaInicial,
}: Props) {
  /*
  |--------------------------------------------------------------------------
  | ENTRENAMIENTOS
  |--------------------------------------------------------------------------
  */

  const [entrenamientos, setEntrenamientos] = useState<
    EntrenamientoPrograma[]
  >(programaInicial?.entrenamientos ?? []);

  /*
  |--------------------------------------------------------------------------
  | DRAFT DE EJERCICIO
  |--------------------------------------------------------------------------
  */

  const [draft, setDraft] = useState<EjercicioDraft>(draftBase);

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR DRAFT
  |--------------------------------------------------------------------------
  */

  function actualizarDraft<
    K extends keyof EjercicioDraft
  >(campo: K, valor: EjercicioDraft[K]): void {
    setDraft((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  /*
  |--------------------------------------------------------------------------
  | RESETEAR DRAFT
  |--------------------------------------------------------------------------
  */

  function resetearDraft(): void {
    setDraft({
      ejercicioId: "",
      materialId: "",
      notas: "",
      configuracion: {
        ...configuracionBase,
      },
    });
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR ENTRENAMIENTO
  |--------------------------------------------------------------------------
  */

  function agregarEntrenamiento(): void {
    const nuevoEntrenamiento: EntrenamientoPrograma = {
      id: crypto.randomUUID(),
      orden: entrenamientos.length + 1,
      items: [],
    };

    setEntrenamientos((prev) => [
      ...prev,
      nuevoEntrenamiento,
    ]);
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR ENTRENAMIENTO
  |--------------------------------------------------------------------------
  */

  function eliminarEntrenamiento(
    entrenamientoId: string
  ): void {
    setEntrenamientos((prev) =>
      prev
        .filter((entrenamiento) => entrenamiento.id !== entrenamientoId)
        .map((entrenamiento, index) => ({
          ...entrenamiento,
          orden: index + 1,
        }))
    );
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR EJERCICIO
  |--------------------------------------------------------------------------
  |
  | Inserta un ejercicio en el nivel raíz de un entrenamiento.
  |
  */

  function agregarEjercicio(
    entrenamientoId: string
  ): {
    ok: boolean;
    error?: string;
  } {
    if (!draft.ejercicioId) {
      return {
        ok: false,
        error: "Debe seleccionarse un ejercicio.",
      };
    }

    if (!draft.materialId) {
      return {
        ok: false,
        error: "Debe seleccionarse un material.",
      };
    }

    const nuevoEjercicio: EjercicioPrograma = {
      id: crypto.randomUUID(),
      ejercicioId: draft.ejercicioId,
      materialId: draft.materialId,
      notas: draft.notas,
      configuracion: {
        ...draft.configuracion,
      },
    };

    const nuevoItem: ItemPrograma = {
      tipo: "ejercicio",
      contenido: nuevoEjercicio,
    };

    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: [
            ...entrenamiento.items,
            nuevoItem,
          ],
        };
      })
    );

    resetearDraft();

    return {
      ok: true,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR GRUPO
  |--------------------------------------------------------------------------
  |
  | Inserta un grupo en el nivel raíz de un entrenamiento.
  |
  */

  function agregarGrupo(
    entrenamientoId: string,
    nombre: string,
    notas: string
  ): void {
    const nuevoGrupo: GrupoPrograma = {
      id: crypto.randomUUID(),
      nombre,
      notas,
      configuracion: {
        ...configuracionBase,
      },
      items: [],
    };

    const nuevoItem: ItemPrograma = {
      tipo: "grupo",
      contenido: nuevoGrupo,
    };

    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: [
            ...entrenamiento.items,
            nuevoItem,
          ],
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR EJERCICIO A GRUPO
  |--------------------------------------------------------------------------
  */

  function agregarEjercicioAGrupo(
    entrenamientoId: string,
    grupoId: string
  ): {
    ok: boolean;
    error?: string;
  } {
    if (!draft.ejercicioId) {
      return {
        ok: false,
        error: "Debe seleccionarse un ejercicio.",
      };
    }

    if (!draft.materialId) {
      return {
        ok: false,
        error: "Debe seleccionarse un material.",
      };
    }

    const nuevoEjercicio: EjercicioPrograma = {
      id: crypto.randomUUID(),
      ejercicioId: draft.ejercicioId,
      materialId: draft.materialId,
      notas: draft.notas,
      configuracion: {
        ...draft.configuracion,
      },
    };

    const nuevoItem: ItemPrograma = {
      tipo: "ejercicio",
      contenido: nuevoEjercicio,
    };

    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: actualizarGrupoRecursivo(
            entrenamiento.items,
            grupoId,
            (grupo) => ({
              ...grupo,
              items: [
                ...grupo.items,
                nuevoItem,
              ],
            })
          ),
        };
      })
    );

    resetearDraft();

    return {
      ok: true,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR GRUPO DENTRO DE GRUPO
  |--------------------------------------------------------------------------
  */

  function agregarGrupoDentroDeGrupo(
    entrenamientoId: string,
    grupoPadreId: string,
    nombre: string,
    notas: string
  ): void {
    const nuevoGrupoItem: ItemPrograma = {
      tipo: "grupo",
      contenido: {
        id: crypto.randomUUID(),
        nombre,
        notas,
        configuracion: {
          ...configuracionBase,
        },
        items: [],
      },
    };

    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: actualizarGrupoRecursivo(
            entrenamiento.items,
            grupoPadreId,
            (grupo) => ({
              ...grupo,
              items: [
                ...grupo.items,
                nuevoGrupoItem,
              ],
            })
          ),
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MOVER ITEM DEL ENTRENAMIENTO
  |--------------------------------------------------------------------------
  |
  | Reordena items del nivel raíz.
  |
  */

  function moverItem(
    entrenamientoId: string,
    indexActual: number,
    direccion: "arriba" | "abajo"
  ): void {
    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        const items = [...entrenamiento.items];

        const nuevoIndex =
          direccion === "arriba"
            ? indexActual - 1
            : indexActual + 1;

        if (
          nuevoIndex < 0 ||
          nuevoIndex >= items.length
        ) {
          return entrenamiento;
        }

        [items[indexActual], items[nuevoIndex]] = [
          items[nuevoIndex],
          items[indexActual],
        ];

        return {
          ...entrenamiento,
          items,
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MOVER ITEM DENTRO DE GRUPO
  |--------------------------------------------------------------------------
  */

  function moverItemGrupo(
    entrenamientoId: string,
    grupoId: string,
    indexActual: number,
    direccion: "arriba" | "abajo"
  ): void {
    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: actualizarGrupoRecursivo(
            entrenamiento.items,
            grupoId,
            (grupo) => {
              const itemsGrupo = [...grupo.items];

              const nuevoIndex =
                direccion === "arriba"
                  ? indexActual - 1
                  : indexActual + 1;

              if (
                nuevoIndex < 0 ||
                nuevoIndex >= itemsGrupo.length
              ) {
                return grupo;
              }

              [itemsGrupo[indexActual], itemsGrupo[nuevoIndex]] = [
                itemsGrupo[nuevoIndex],
                itemsGrupo[indexActual],
              ];

              return {
                ...grupo,
                items: itemsGrupo,
              };
            }
          ),
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR EJERCICIO
  |--------------------------------------------------------------------------
  */

  function eliminarEjercicio(
    entrenamientoId: string,
    ejercicioId: string
  ): void {
    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: eliminarEjercicioRecursivo(
            entrenamiento.items,
            ejercicioId
          ),
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR GRUPO
  |--------------------------------------------------------------------------
  */

  function eliminarGrupo(
    entrenamientoId: string,
    grupoId: string
  ): void {
    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: eliminarGrupoRecursivo(
            entrenamiento.items,
            grupoId
          ),
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR CONFIGURACIÓN DE EJERCICIO
  |--------------------------------------------------------------------------
  */

  function actualizarConfiguracionEjercicio(
    entrenamientoId: string,
    ejercicioId: string,
    campo: keyof ConfiguracionAvanzada,
    valor: ValorConfiguracion
  ): void {
    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: actualizarEjercicioRecursivo(
            entrenamiento.items,
            ejercicioId,
            (ejercicio) => ({
              ...ejercicio,
              configuracion: {
                ...ejercicio.configuracion,
                [campo]: valor,
              },
            })
          ),
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR CONFIGURACIÓN DE GRUPO
  |--------------------------------------------------------------------------
  */

  function actualizarConfiguracionGrupo(
    entrenamientoId: string,
    grupoId: string,
    campo: keyof ConfiguracionAvanzada,
    valor: ValorConfiguracion
  ): void {
    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: actualizarGrupoRecursivo(
            entrenamiento.items,
            grupoId,
            (grupo) => ({
              ...grupo,
              configuracion: {
                ...grupo.configuracion,
                [campo]: valor,
              },
            })
          ),
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR NOTAS DE EJERCICIO
  |--------------------------------------------------------------------------
  */

  function actualizarNotasEjercicio(
    entrenamientoId: string,
    ejercicioId: string,
    notas: string
  ): void {
    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: actualizarEjercicioRecursivo(
            entrenamiento.items,
            ejercicioId,
            (ejercicio) => ({
              ...ejercicio,
              notas,
            })
          ),
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR NOTAS DE GRUPO
  |--------------------------------------------------------------------------
  */

  function actualizarNotasGrupo(
    entrenamientoId: string,
    grupoId: string,
    notas: string
  ): void {
    setEntrenamientos((prev) =>
      prev.map((entrenamiento) => {
        if (entrenamiento.id !== entrenamientoId) {
          return entrenamiento;
        }

        return {
          ...entrenamiento,
          items: actualizarGrupoRecursivo(
            entrenamiento.items,
            grupoId,
            (grupo) => ({
              ...grupo,
              notas,
            })
          ),
        };
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {
    /*
    |----------------------------------------------------------------------
    | ESTADO
    |----------------------------------------------------------------------
    */

    entrenamientos,
    setEntrenamientos,

    draft,
    setDraft,

    /*
    |----------------------------------------------------------------------
    | DRAFT
    |----------------------------------------------------------------------
    */

    actualizarDraft,
    resetearDraft,

    /*
    |----------------------------------------------------------------------
    | ENTRENAMIENTOS
    |----------------------------------------------------------------------
    */

    agregarEntrenamiento,
    eliminarEntrenamiento,

    /*
    |----------------------------------------------------------------------
    | ESTRUCTURA
    |----------------------------------------------------------------------
    */

    agregarEjercicio,
    agregarGrupo,
    agregarEjercicioAGrupo,
    agregarGrupoDentroDeGrupo,

    /*
    |----------------------------------------------------------------------
    | ORDEN
    |----------------------------------------------------------------------
    */

    moverItem,
    moverItemGrupo,

    /*
    |----------------------------------------------------------------------
    | ELIMINACIÓN
    |----------------------------------------------------------------------
    */

    eliminarEjercicio,
    eliminarGrupo,

    /*
    |----------------------------------------------------------------------
    | CONFIGURACIÓN
    |----------------------------------------------------------------------
    */

    actualizarConfiguracionEjercicio,
    actualizarConfiguracionGrupo,

    /*
    |----------------------------------------------------------------------
    | NOTAS
    |----------------------------------------------------------------------
    */

    actualizarNotasEjercicio,
    actualizarNotasGrupo,
  };
}