/**
 * BlockProgression
 *
 * Define la progresión GENERAL de un bloque.
 *
 * Todos los ejercicios utilizarán estos valores,
 * salvo que exista un Override específico.
 */
export class BlockProgression {

    constructor(

        /**
         * Cantidad de series.
         */
        public sets: number = 3,

        /**
         * Cantidad de repeticiones.
         */
        public reps: number = 10,

        /**
         * Tempo.
         *
         * Ej:
         * 3010
         */
        public tempo: string = "",

        /**
         * Repeticiones en reserva.
         */
        public rir: number | null = null,

        /**
         * Esfuerzo percibido.
         */
        public rpe: number | null = null,

        /**
         * Descanso en segundos.
         */
        public rest: number = 60,

        /**
         * ¿Tiene series de entrada en calor?
         */
        public warmup: boolean = false,

        /**
         * ¿Utiliza Dropset?
         */
        public dropset: boolean = false

    ) {}

}