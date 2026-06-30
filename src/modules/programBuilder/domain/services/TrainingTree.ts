import { TrainingNode } from "../entities/TrainingNode";
import { WorkUnitNode } from "../entities/WorkUnitNode";

export class TrainingTree {
  constructor(private readonly rootNodes: TrainingNode[]) {}

  /**
   * Devuelve los nodos raíz del árbol.
   */
  get nodes(): readonly TrainingNode[] {
    return this.rootNodes;
  }

  /**
   * Busca un nodo por id.
   */
  findNode(id: string): TrainingNode | null {
    return this.findRecursive(this.rootNodes, id);
  }

  /**
   * Busca el WorkUnit padre de un nodo.
   * Devuelve null si el nodo está en la raíz.
   */
  findParent(id: string): WorkUnitNode | null {
    return this.findParentRecursive(this.rootNodes, id);
  }

  /**
   * Agrega un nodo.
   * Si parentId es null, se agrega como nodo raíz.
   */
  addNode(node: TrainingNode, parentId: string | null = null): void {
    if (!parentId) {
      node.parentId = null;
      node.order = this.rootNodes.length;

      this.rootNodes.push(node);

      return;
    }

    const parent = this.findNode(parentId);

    if (!(parent instanceof WorkUnitNode)) {
      throw new Error("Parent node is not a WorkUnit.");
    }

    node.parentId = parent.id;
    node.order = parent.children.length;

    parent.children.push(node);
  }

  /**
   * Elimina un nodo completo.
   */
  removeNode(id: string): boolean {
    return this.removeRecursive(this.rootNodes, id);
  }

  /**
   * Reemplaza un nodo existente.
   */
  replaceNode(node: TrainingNode): boolean {
    return this.replaceRecursive(this.rootNodes, node);
  }

  /**
   * Mueve un nodo a otro WorkUnit
   * o a la raíz.
   */
  moveNode(nodeId: string, newParentId: string | null): void {
    const node = this.findNode(nodeId);

    if (!node) {
      throw new Error("Node not found.");
    }

    this.removeNode(nodeId);

    this.addNode(node, newParentId);
  }

  /**
   * Recorre el árbol completo.
   */
  walk(callback: (node: TrainingNode) => void): void {
    this.walkRecursive(this.rootNodes, callback);
  }

  /**
   * Devuelve todos los nodos en un único array.
   */
  flatten(): TrainingNode[] {
    const result: TrainingNode[] = [];

    this.walk((node) => result.push(node));

    return result;
  }

  /**
   * Duplica una rama completa.
   */
  cloneBranch(nodeId: string): TrainingNode {
    const node = this.findNode(nodeId);

    if (!node) {
      throw new Error("Node not found.");
    }

    return node.clone();
  }

  // ======================================================
  // PRIVADOS
  // ======================================================

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

        if (found) {
          return found;
        }
      }
    }

    return null;
  }

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

      if (found) {
        return found;
      }
    }

    return null;
  }

  private removeRecursive(
    nodes: TrainingNode[],
    id: string
  ): boolean {
    const index = nodes.findIndex((node) => node.id === id);

    if (index >= 0) {
      nodes.splice(index, 1);

      this.normalizeOrder(nodes);

      return true;
    }

    for (const node of nodes) {
      if (!(node instanceof WorkUnitNode)) continue;

      if (this.removeRecursive(node.children, id)) {
        this.normalizeOrder(node.children);

        return true;
      }
    }

    return false;
  }

  private replaceRecursive(
    nodes: TrainingNode[],
    replacement: TrainingNode
  ): boolean {
    const index = nodes.findIndex(
      (node) => node.id === replacement.id
    );

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

  private walkRecursive(
    nodes: TrainingNode[],
    callback: (node: TrainingNode) => void
  ): void {
    for (const node of nodes) {
      callback(node);

      if (node instanceof WorkUnitNode) {
        this.walkRecursive(node.children, callback);
      }
    }
  }

  private normalizeOrder(nodes: TrainingNode[]): void {
    nodes.forEach((node, index) => {
      node.order = index;
    });
  }
}