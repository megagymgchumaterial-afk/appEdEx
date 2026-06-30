import { TrainingNodeType } from "../types/TrainingNodeType";

export abstract class TrainingNode {
  abstract readonly type: TrainingNodeType;

  constructor(
    public readonly id: string,
    public parentId: string | null,
    public order: number,
    public notes: string = ""
  ) {}

  abstract clone(): TrainingNode;
}