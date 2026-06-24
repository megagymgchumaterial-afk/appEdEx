import { useMemo } from "react";

import { useConstructorPrograma } from "./useConstructorPrograma.ts";
import { useProgramaEstructural } from "./useProgramaEstructural.ts";

import type {
  Programa,
} from "../../domain/programa";

import {
  crearPrograma,
  validarProgramaAntesDeGuardar,
  type CrearProgramaInput,
  type ResultadoValidacionPrograma,
} from "../../domain/programa/service";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
|
| Si se recibe un programa inicial, el editor entra en modo edición.
|
*/

type Props = {
  programaInicial?: Programa;
};

/*
|--------------------------------------------------------------------------
| RESULTADO DE BUILD
|--------------------------------------------------------------------------
|
| Resultado del intento de construir el programa final.
|
*/

type BuildProgramaResult =
  | {
      ok: true;
      programa: Programa;
    }
  | {
      ok: false;
      errores: string[];
    };

/*
|--------------------------------------------------------------------------
| HOOK
|--------------------------------------------------------------------------
|
| Orquesta el editor completo del programa:
|
| - configuración general
| - estructura de entrenamientos
| - validación
| - construcción final del Programa
|
| Este hook NO persiste.
| Solo arma y valida el estado del editor.
|
*/

export function useProgramaEditor({
  programaInicial,
}: Props) {
  /*
  |--------------------------------------------------------------------------
  | CAPA 1: DATOS GENERALES
  |--------------------------------------------------------------------------
  */

  const constructor = useConstructorPrograma({
    programaInicial,
  });

  /*
  |--------------------------------------------------------------------------
  | CAPA 2: ESTRUCTURA
  |--------------------------------------------------------------------------
  */

  const estructura = useProgramaEstructural({
    programaInicial,
  });

  /*
  |--------------------------------------------------------------------------
  | INPUT CONSOLIDADO DEL PROGRAMA
  |--------------------------------------------------------------------------
  |
  | Se centraliza en un único objeto para:
  | - validar
  | - construir la entidad final
  |
  */

  const programaInput: CrearProgramaInput = useMemo(
    () => ({
      id: programaInicial?.id,
      activa: programaInicial?.activa ?? true,
      fechaUltimaEdicion: programaInicial?.fechaUltimaEdicion,

      personaId: constructor.personaId,
      fechaInicio: constructor.fechaInicio,
      cantidadBloques: constructor.cantidadBloques ?? 0,
      entrenamientosPorBloque:
        constructor.entrenamientosPorBloque ?? 0,
      progresionGlobal: constructor.progresionGlobal,

      entrenamientos: estructura.entrenamientos,
    }),
    [
      programaInicial?.id,
      programaInicial?.activa,
      programaInicial?.fechaUltimaEdicion,

      constructor.personaId,
      constructor.fechaInicio,
      constructor.cantidadBloques,
      constructor.entrenamientosPorBloque,
      constructor.progresionGlobal,

      estructura.entrenamientos,
    ]
  );

  /*
  |--------------------------------------------------------------------------
  | VALIDAR
  |--------------------------------------------------------------------------
  */

  function validarPrograma(): ResultadoValidacionPrograma {
    return validarProgramaAntesDeGuardar(
      programaInput
    );
  }

  /*
  |--------------------------------------------------------------------------
  | BUILD DEL PROGRAMA
  |--------------------------------------------------------------------------
  |
  | Valida y, si todo está correcto, devuelve la entidad final.
  |
  */

  function buildPrograma(): BuildProgramaResult {
    const validacion = validarPrograma();

    if (!validacion.valido) {
      return {
        ok: false,
        errores: validacion.errores,
      };
    }

    const programa = crearPrograma(programaInput);

    return {
      ok: true,
      programa,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {
    /*
    |----------------------------------------------------------------------
    | SUB-HOOKS COMPLETOS
    |----------------------------------------------------------------------
    |
    | Se exponen por si algún componente quiere trabajar
    | con la separación explícita entre constructor y estructura.
    |
    */

    constructor,
    estructura,

    /*
    |----------------------------------------------------------------------
    | ESTADO CONSOLIDADO
    |----------------------------------------------------------------------
    */

    programaInput,

    /*
    |----------------------------------------------------------------------
    | DATOS GENERALES
    |----------------------------------------------------------------------
    */

    personaId: constructor.personaId,
    setPersonaId: constructor.setPersonaId,

    fechaInicio: constructor.fechaInicio,
    setFechaInicio: constructor.setFechaInicio,

    cantidadBloques: constructor.cantidadBloques,
    setCantidadBloques: constructor.setCantidadBloques,

    entrenamientosPorBloque:
      constructor.entrenamientosPorBloque,
    setEntrenamientosPorBloque:
      constructor.setEntrenamientosPorBloque,

    progresionGlobal: constructor.progresionGlobal,
    setProgresionGlobal: constructor.setProgresionGlobal,

    /*
    |----------------------------------------------------------------------
    | ESTRUCTURA
    |----------------------------------------------------------------------
    */

    entrenamientos: estructura.entrenamientos,
    setEntrenamientos: estructura.setEntrenamientos,

    draft: estructura.draft,
    setDraft: estructura.setDraft,

    actualizarDraft: estructura.actualizarDraft,
    resetearDraft: estructura.resetearDraft,

    agregarEntrenamiento: estructura.agregarEntrenamiento,
    eliminarEntrenamiento: estructura.eliminarEntrenamiento,

    agregarEjercicio: estructura.agregarEjercicio,
    agregarGrupo: estructura.agregarGrupo,
    agregarEjercicioAGrupo:
      estructura.agregarEjercicioAGrupo,
    agregarGrupoDentroDeGrupo:
      estructura.agregarGrupoDentroDeGrupo,

    moverItem: estructura.moverItem,
    moverItemGrupo: estructura.moverItemGrupo,

    eliminarEjercicio: estructura.eliminarEjercicio,
    eliminarGrupo: estructura.eliminarGrupo,

    actualizarConfiguracionEjercicio:
      estructura.actualizarConfiguracionEjercicio,
    actualizarConfiguracionGrupo:
      estructura.actualizarConfiguracionGrupo,

    actualizarNotasEjercicio:
      estructura.actualizarNotasEjercicio,
    actualizarNotasGrupo:
      estructura.actualizarNotasGrupo,

    /*
    |----------------------------------------------------------------------
    | DOMINIO / BUILD
    |----------------------------------------------------------------------
    */

    validarPrograma,
    buildPrograma,
  };
}