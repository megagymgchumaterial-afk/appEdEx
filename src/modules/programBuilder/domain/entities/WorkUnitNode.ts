import { TrainingNode } from "./TrainingNode";

export class WorkUnitNode extends TrainingNode {
  readonly type = "group" as const;

  constructor(
    id: string,
    parentId: string | null,
    order: number,

    public children: TrainingNode[] = [],

    public rounds: number = 1,

    public restAfterRound: number = 0,

    notes: string = ""
  ) {
    super(id, parentId, order, notes);
  }

  clone(): WorkUnitNode {
    const cloned = new WorkUnitNode(
      crypto.randomUUID(),

      this.parentId,

      this.order,

      [],

      this.rounds,

      this.restAfterRound,

      this.notes
    );

    cloned.children = this.children.map((child) => {
      const copy = child.clone();
      copy.parentId = cloned.id;
      return copy;
    });

    return cloned;
  }
}