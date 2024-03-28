import { ComponentType } from 'react';

/**
 * how about this
 */
export interface TreeNode {
  childNodes(): Promise<ThisType<this>[]>;
}

export type Reveal = 'open' | 'close' | 'loading';

export type RevealState = {
  reveal: Reveal;
  toggleReveal: () => void;
};

export type RowProps<T extends TreeNode> = { node: T } & RevealState;
export type RowIconProps<T extends TreeNode> = RowProps<T>;
export type Row<T extends TreeNode> = ComponentType<RowProps<T>>;
export type RowIcon<T extends TreeNode> = ComponentType<RowIconProps<T>>;
