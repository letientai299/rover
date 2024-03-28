import styles from './tree.module.scss';

import { HTMLAttributes, useEffect, useState } from 'react';
import { Reveal, Row, TreeNode } from '@/components/Tree/types.ts';
import { match } from 'ts-pattern';
import { cx } from '@/utils';
import RowIconFactory, {
  RowIconKind,
} from '@/components/Tree/RowIconFactory.tsx';

type CommonProps<T extends TreeNode> = {
  open?: boolean;
  render: Row<T>;
  rowIcon?: RowIconKind<T>;
};

export type TreeProps<T extends TreeNode> = {
  data: T | T[];
} & HTMLAttributes<HTMLDivElement> &
  CommonProps<T>;

const Tree = <T extends TreeNode>(props: TreeProps<T>) => {
  const { data, open, render, rowIcon, ...rest } = props;
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
          rowIcon={rowIcon}
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
  const { level, node, open, render, rowIcon } = props;
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
      .exhaustive();
  }, [kids, node, reveal]);

  const Node = render;

  const toggle = () => {
    setReveal((v) =>
      match(v)
        .returnType<Reveal>()
        .with('close', () => 'loading')
        .with('loading', () => 'open')
        .with('open', () => 'close')
        .exhaustive(),
    );
  };

  const children = kids.map((kid, i) => (
    <Branch
      visible={childVisible}
      render={Node}
      rowIcon={rowIcon}
      key={i}
      open={open}
      level={level + 1}
      node={kid as T}
    />
  ));

  return (
    <div
      className={cx(styles.branch, props.visible ? '' : styles.hidden)}
      data-level={level}
    >
      <RowIconFactory
        node={node}
        reveal={reveal}
        toggleReveal={toggle}
        kind={rowIcon || 'none'}
      />
      <Node node={node} reveal={reveal} toggleReveal={toggle} />
      {children}
    </div>
  );
};

export default Tree;
