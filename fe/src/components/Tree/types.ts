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

export type NodeProps<T extends TreeNode> = { node: T };

export type Node<T extends TreeNode> = ComponentType<NodeProps<T>>;

export type NodeIconProps<T extends TreeNode> = NodeProps<T> & RevealState;

export type NodeIcon<T extends TreeNode> = ComponentType<NodeIconProps<T>>;
