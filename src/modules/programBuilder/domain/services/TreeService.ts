import { TrainingNode } from "../entities/TrainingNode";
import { WorkUnitNode } from "../entities/WorkUnitNode";

export class TreeService {
  constructor(private readonly nodes: TrainingNode[]) {}

  getTree(): TrainingNode[] {
    return this.nodes;
  }

  findNode(id: string): TrainingNode | null {
    return this.findRecursive(this.nodes, id);
  }

  findParent(id: string): WorkUnitNode | null {
    return this.findParentRecursive(this.nodes, id);
  }

  walk(callback: (node: TrainingNode) => void): void {
    this.walkRecursive(this.nodes, callback);
  }

  flatten(): TrainingNode[] {
    const result: TrainingNode[] = [];

    this.walk((node) => result.push(node));

    return result;
  }

  // ------------------------------------------------

  private findRecursive(
    nodes: TrainingNode[],
    id: string
  ): TrainingNode | null {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }

      if (node instanceof WorkUnitNode) {
        const found = this.findRecursive(node.children, id);

        if (found) return found;
      }
    }

    return null;
  }

  // ------------------------------------------------

  private findParentRecursive(
    nodes: TrainingNode[],
    childId: string
  ): WorkUnitNode | null {
    for (const node of nodes) {
      if (!(node instanceof WorkUnitNode)) continue;

      if (node.children.some((child) => child.id === childId)) {
        return node;
      }

      const found = this.findParentRecursive(node.children, childId);

      if (found) return found;
    }

    return null;
  }

  // ------------------------------------------------

  private walkRecursive(
    nodes: TrainingNode[],
    callback: (node: TrainingNode) => void
  ) {
    for (const node of nodes) {
      callback(node);

      if (node instanceof WorkUnitNode) {
        this.walkRecursive(node.children, callback);
      }
    }
  }
}

addNode(
    node: TrainingNode,
    parentId?: string
): void {

    if (!parentId) {

        this.nodes.push(node);

        return;

    }

    const parent = this.findNode(parentId);

    if (!(parent instanceof WorkUnitNode)) {

        throw new Error("Parent node is not a WorkUnit.");

    }

    node.parentId = parent.id;

    parent.children.push(node);

}

removeNode(id: string): boolean {

    return this.removeRecursive(this.nodes, id);

}

private removeRecursive(
    nodes: TrainingNode[],
    id: string
): boolean {

    const index = nodes.findIndex(n => n.id === id);

    if (index >= 0) {

        nodes.splice(index, 1);

        return true;

    }

    for (const node of nodes) {

        if (!(node instanceof WorkUnitNode)) continue;

        if (this.removeRecursive(node.children, id)) {

            return true;

        }

    }

    return false;

}

replaceNode(node: TrainingNode): boolean {

    return this.replaceRecursive(this.nodes, node);

}

private replaceRecursive(
    nodes: TrainingNode[],
    replacement: TrainingNode
): boolean {

    const index = nodes.findIndex(n => n.id === replacement.id);

    if (index >= 0) {

        nodes[index] = replacement;

        return true;

    }

    for (const node of nodes) {

        if (!(node instanceof WorkUnitNode)) continue;

        if (this.replaceRecursive(node.children, replacement)) {

            return true;

        }

    }

    return false;

}

moveNode(
    nodeId: string,
    newParentId: string | null
) {

    const node = this.findNode(nodeId);

    if (!node) {

        throw new Error("Node not found.");

    }

    this.removeNode(nodeId);

    node.parentId = newParentId;

    this.addNode(node, newParentId ?? undefined);

}

