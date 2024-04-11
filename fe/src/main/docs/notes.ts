import type { TreeNode } from 'src/components';
import * as Strings from 'src/utils/strings';

const files = import.meta.glob('../../../{src,docs}/**/*.{mdx,md}');

export class Model implements TreeNode {
  kids: Map<string, Model> | undefined = undefined;
  readonly name: string;

  constructor(
    readonly parentPath: string,
    readonly path: string,
    readonly kind: 'dir' | 'file',
    readonly content?: unknown,
  ) {
    this.name = path.replace(parentPath + '/', '');
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
      this.kids.set(name, new Model(parent, fullPath, 'file', content));
      return;
    }

    const fullPath = [parent, dir].join('/');
    const kid = this.kids.has(fullPath)
      ? this.kids.get(fullPath)!
      : new Model(parent, fullPath, 'dir');

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

  shorten(): Model {
    if (this.kind === 'file') {
      return this;
    }

    if (this.kids === null) {
      this.kids = new Map();
    }

    const newKids = [...this.kids!.entries()] //
      .map(([k, v]) => [k, v.shorten()] as const);

    if (newKids.length === 1) {
      const [k, v] = newKids[0];
      return new Model(this.parentPath, this.path + '/' + k, 'file', v.content);
    }

    this.kids = new Map(newKids);
    return this;
  }
}

function resolvePath(k: string): string {
  const topDocsPrefix = '../'.repeat(3);
  const srcPrefix = '../'.repeat(2);
  return k.includes(topDocsPrefix)
    ? k.replace(topDocsPrefix, '')
    : k.replace(srcPrefix, '');
}

function buildDocsTree() {
  const root = new Model('', '', 'dir');
  Object.entries(files).forEach(([k, v]) => {
    const path = resolvePath(k);
    root.add(path, v);
  });

  return [...root.shorten().kids!.values()];
}

export const Notes = {
  /**
   * docsTree contains {@link TreeNode} implementation of all the Markdown and
   * MDX, to be rendered as a folder structure nicely on the navigation sidebar.
   */
  tree: buildDocsTree(),

  /**
   * docsMap contains relative path to this folder, so that we can lazy
   * load those content while routing.
   */
  map: new Map([...Object.entries(files)].map(([k, v]) => [resolvePath(k), v])),
};
