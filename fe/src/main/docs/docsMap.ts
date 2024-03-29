import type { TreeNode } from '@/components';
import * as Strings from '@/utils/strings';

const files = import.meta.glob('../../**/*.md*');

export const docsMap = new Map(
  [...Object.entries(files)].map(([k, v]) => [k.replace('../../', ''), v]),
);

export class DocModel implements TreeNode {
  kids: Map<string, DocModel> | undefined = undefined;
  readonly name: string;

  constructor(
    readonly path: string,
    readonly kind: 'dir' | 'file',
    readonly content?: unknown,
  ) {
    this.name = path.slice(path.lastIndexOf('/') + 1);
  }

  childNodes(): Promise<ThisType<this>[]> {
    return new Promise<ThisType<this>[]>((resolve) => {
      if (this.kind == 'dir' && this.kids !== undefined) {
        resolve([...this.kids.values()]);
      } else {
        resolve([]);
      }
    });
  }

  add(name: string, content: unknown) {
    this.internalAdd(this.path, name, content);
  }

  internalAdd(parent: string, name: string, content: unknown) {
    if (this.kids === undefined) {
      this.kids = new Map();
    }

    const { first: dir, second: rest, found } = Strings.cut(name, '/');

    if (!found) {
      // path is a file, just add to the kids list
      const fullPath = [parent, name].join('/');
      this.kids.set(name, new DocModel(fullPath, 'file', content));
      return;
    }

    const fullPath = [parent, dir].join('/');
    const kid = this.kids.has(fullPath)
      ? this.kids.get(fullPath)!
      : new DocModel(fullPath, 'dir');

    kid.add(rest, content);
    this.kids.set(fullPath, kid);
  }

  // for debugging only
  print(level: number = 0) {
    console.log('  '.repeat(level), this.name, '|', this.path);
    if (this.kids) {
      [...this.kids.values()].forEach((k) => k.print(level + 1));
    }
  }
}

function buildDocsTree() {
  const root = new DocModel('', 'dir');
  const files = import.meta.glob('../../**/*.md*');
  Object.entries(files).forEach(([k, v]) => {
    const path = k.replace('../../', '');
    root.add(path, v);
  });

  return [...root.kids!.values()];
}

export const docsTree = buildDocsTree();
