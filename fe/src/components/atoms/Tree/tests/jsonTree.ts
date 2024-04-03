import { TreeNode } from '@/components/atoms/Tree/types.ts';
import rawTasks from '@/components/atoms/Tree/tests/tasks.json';

export class JsonTree implements TreeNode {
  constructor(
    readonly content: string,
    readonly data: object,
  ) {}

  static parse(obj: object) {
    return Object.entries(obj).map(([key, value]) => new JsonTree(key, value));
  }

  childNodes(): Promise<ThisType<this>[]> {
    return new Promise((resolve) => {
      const kids = JsonTree.parse(this.data);
      if (kids.length > 0) {
        setTimeout(() => resolve(kids), 400);
      } else {
        resolve(kids);
      }
    });
  }
}

export const taskData = JsonTree.parse(rawTasks);
