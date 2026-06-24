import { useState } from "react";

import type {
  Programa,
  ProgresionBloque,
} from "../../domain/programa";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
|
| Si se recibe un programa inicial, el hook entra en modo edición
| y precarga los valores ya guardados.
|
| Si no se recibe, actúa como constructor para un programa nuevo.
|
*/

type Props = {
  programaInicial?: Programa;
};

/*
|--------------------------------------------------------------------------
| HOOK
|--------------------------------------------------------------------------
|
| Maneja los datos generales del programa:
|
| - persona asignada
| - fecha de inicio
| - cantidad de bloques
| - entrenamientos por bloque
| - progresión global
|
| Este hook NO administra la estructura interna del programa
| (ejercicios, grupos, entrenamientos, etc.).
|
*/

export function useConstructorPrograma({
  programaInicial,
}: Props) {
  /*
  |--------------------------------------------------------------------------
  | PERSONA
  |--------------------------------------------------------------------------
  */

  const [personaId, setPersonaId] = useState<string>(
    programaInicial?.personaId ?? ""
  );

  /*
  |--------------------------------------------------------------------------
  | FECHA DE INICIO
  |--------------------------------------------------------------------------
  */

  const [fechaInicio, setFechaInicio] = useState<string>(
    programaInicial?.fechaInicio ?? ""
  );

  /*
  |--------------------------------------------------------------------------
  | CANTIDAD DE BLOQUES
  |--------------------------------------------------------------------------
  */

  const [cantidadBloques, setCantidadBloques] = useState<number | null>(
    programaInicial?.cantidadBloques ?? null
  );

  /*
  |--------------------------------------------------------------------------
  | ENTRENAMIENTOS POR BLOQUE
  |--------------------------------------------------------------------------
  */

  const [
    entrenamientosPorBloque,
    setEntrenamientosPorBloque,
  ] = useState<number | null>(
    programaInicial?.entrenamientosPorBloque ?? null
  );

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  */

  const [progresionGlobal, setProgresionGlobal] = useState<ProgresionBloque[]>(
    programaInicial?.progresionGlobal ?? []
  );

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {
    /*
    |----------------------------------------------------------------------
    | PERSONA
    |----------------------------------------------------------------------
    */

    personaId,
    setPersonaId,

    /*
    |----------------------------------------------------------------------
    | FECHA
    |----------------------------------------------------------------------
    */

    fechaInicio,
    setFechaInicio,

    /*
    |----------------------------------------------------------------------
    | ESTRUCTURA
    |----------------------------------------------------------------------
    */

    cantidadBloques,
    setCantidadBloques,

    entrenamientosPorBloque,
    setEntrenamientosPorBloque,

    /*
    |----------------------------------------------------------------------
    | PROGRESIÓN
    |----------------------------------------------------------------------
    */

    progresionGlobal,
    setProgresionGlobal,
  };
}