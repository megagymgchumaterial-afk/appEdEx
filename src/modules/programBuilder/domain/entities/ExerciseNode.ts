import { TrainingNode } from "./TrainingNode";

export interface ExerciseConfiguration {
  tempo?: string;
  rest?: number;
  rir?: number;
  rpe?: number;
  warmup?: boolean;
  dropset?: boolean;
  observations?: string;
}

export interface ExerciseOverride {
  sets?: number;
  reps?: number;
  tempo?: string;
  rir?: number;
  rpe?: number;
  rest?: number;
}

export class ExerciseNode extends TrainingNode {
  readonly type = "exercise" as const;

  constructor(
    id: string,
    parentId: string | null,
    order: number,

    public exerciseId: string,

    public materialId: string | null = null,

    public configuration: ExerciseConfiguration = {},

    public override: ExerciseOverride | null = null,

    notes: string = ""
  ) {
    super(id, parentId, order, notes);
  }

  clone(): ExerciseNode {
    return new ExerciseNode(
      crypto.randomUUID(),

      this.parentId,

      this.order,

      this.exerciseId,

      this.materialId,

      structuredClone(this.configuration),

      structuredClone(this.override),

      this.notes
    );
  }
}