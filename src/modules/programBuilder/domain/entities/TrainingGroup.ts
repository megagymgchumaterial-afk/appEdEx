import { TrainingTree } from "../services/TrainingTree";
import { TrainingNode } from "./TrainingNode";

/**
 * TrainingGroup
 *
 * Representa una unidad de entrenamiento dentro de un Block.
 *
 * Puede llamarse:
 *
 *  A
 *  B
 *  C
 *
 *  Empuje
 *  Tirón
 *  Piernas
 *
 *  Torso
 *  Full Body
 *
 * NO representa un día del calendario.
 *
 * Es simplemente un conjunto organizado de ejercicios
 * que el entrenador diseña para ser ejecutado juntos.
 */
export class TrainingGroup {

    /**
     * Árbol interno del grupo.
     *
     * Contiene ejercicios y grupos de ejercicios
     * (superseries, circuitos, biseries, etc.).
     */
    private readonly tree: TrainingTree;

    constructor(

        /**
         * Identificador único.
         */
        public readonly id: string,

        /**
         * Nombre visible.
         *
         * Ej:
         *
         * A
         * Empuje
         * Piernas
         */
        public name: string,

        /**
         * Orden dentro del bloque.
         */
        public order: number,

        /**
         * Notas generales del grupo.
         */
        public notes: string = "",

        /**
         * Nodos raíz del árbol.
         */
        nodes: TrainingNode[] = []

    ) {

        this.tree = new TrainingTree(nodes);

    }

    /**
     * Devuelve el árbol completo.
     *
     * Solo lectura.
     */
    getTree(): TrainingTree {

        return this.tree;

    }

    /**
     * Devuelve los nodos raíz.
     *
     * Útil para renderizar la UI.
     */
    get nodes(): readonly TrainingNode[] {

        return this.tree.nodes;

    }

}