import { BlockProgression } from "./BlockProgression";
import { TrainingGroup } from "./TrainingGroup";

/**
 * Block
 *
 * Representa una etapa del programa.
 *
 * Puede equivaler a:
 *
 * Semana 1
 * Semana 2
 * Adaptación
 * Intensificación
 * Descarga
 *
 * El nombre es completamente configurable.
 */
export class Block {

    constructor(

        /**
         * Identificador único.
         */
        public readonly id: string,

        /**
         * Nombre del bloque.
         */
        public name: string,

        /**
         * Orden dentro del programa.
         */
        public order: number,

        /**
         * Progresión general.
         */
        public progression: BlockProgression = new BlockProgression(),

        /**
         * Grupos de entrenamiento.
         */
        public trainingGroups: TrainingGroup[] = [],

        /**
         * Notas del bloque.
         */
        public notes: string = ""

    ) {}

    /**
     * Agrega un grupo.
     */
    addTrainingGroup(group: TrainingGroup): void {

        group.order = this.trainingGroups.length;

        this.trainingGroups.push(group);

    }

    /**
     * Elimina un grupo.
     */
    removeTrainingGroup(groupId: string): void {

        this.trainingGroups =
            this.trainingGroups.filter(g => g.id !== groupId);

        this.normalizeOrder();

    }

    /**
     * Busca un grupo.
     */
    findTrainingGroup(groupId: string): TrainingGroup | undefined {

        return this.trainingGroups.find(g => g.id === groupId);

    }

    /**
     * Reordena los grupos.
     */
    private normalizeOrder(): void {

        this.trainingGroups.forEach((group, index) => {

            group.order = index;

        });

    }

}