import { TreeNode } from '@/components/Tree/types.ts';
import rawTasks from '@/components/Tree/tests/tasks.json';

export class JsonTree implements TreeNode {
  readonly content: string;
  readonly data: object;

  constructor(name: string, data: object) {
    this.content = name;
    this.data = data;
  }

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
