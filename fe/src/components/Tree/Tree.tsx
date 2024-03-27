import styles from './tree.module.css';

import { HTMLAttributes, useEffect, useState } from 'react';
import { Node, NodeIcon, Reveal, TreeNode } from '@/components/Tree/types.ts';
import { match } from 'ts-pattern';
import DefaultNodeIcon from '@/components/Tree/DefaultNodeIcon.tsx';
import { cx } from '@/utils';

type CommonProps<T extends TreeNode> = {
  open?: boolean;
  render: Node<T>;
  renderIcon?: NodeIcon<T>;
};

export type TreeProps<T extends TreeNode> = {
  data: T | T[];
} & HTMLAttributes<HTMLDivElement> &
  CommonProps<T>;

const Tree = <T extends TreeNode>(props: TreeProps<T>) => {
  const { data, open, render, renderIcon, ...rest } = props;
  const nodes = Array.isArray(data) ? data : [data];

  return (
    <div className={styles.tree} {...rest}>
      {nodes.map((node, i) => (
        <Branch
          key={i}
          visible
          level={1}
          node={node}
          open={open ?? false}
          render={render}
          renderIcon={renderIcon}
        />
      ))}
    </div>
  );
};

type BranchProps<T extends TreeNode> = CommonProps<T> & {
  level: number;
  node: T;
  visible: boolean;
};

const Branch = <T extends TreeNode>(props: BranchProps<T>) => {
  const { level, node, open, render, renderIcon } = props;
  const [kids, setKids] = useState<T[]>([]);
  const [reveal, setReveal] = useState<Reveal>(!open ? 'close' : 'loading');
  const childVisible = reveal === 'open';

  // reveal state machine: close -> loading -> open -> close
  useEffect(() => {
    match(reveal)
      .with('loading', () => {
        if (kids.length > 0) {
          setReveal('open');
          return;
        }

        node.childNodes().then((kids) => {
          setKids(kids as T[]);
          setReveal('open');
        });
      })
      .with('open', () => {})
      .with('close', () => {})
      // .with('close', () => setKids([]))
      .exhaustive();
  }, [kids, node, reveal]);

  const Node = render;
  const Icon =
    renderIcon ??
    (() => <DefaultNodeIcon reveal={reveal} setReveal={setReveal} />);

  const children = kids.map((kid, i) => (
    <Branch
      visible={childVisible}
      render={Node}
      renderIcon={renderIcon}
      key={i}
      open={open}
      level={level + 1}
      node={kid as T}
    />
  ));

  return (
    <div
      className={cx(styles.branch, props.visible ? '' : styles.hidden)}
      // set the level to make CSS indention work
      style={{ '--level': level } as never}
    >
      <Icon node={node} reveal={reveal} setReveal={setReveal} />
      <Node node={node} />
      {children}
    </div>
  );
};

export default Tree;
