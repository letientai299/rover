import { cx } from '@/utils';

import { HTMLAttributes, useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import RowIconFactory, { RowIconKind } from './RowIconFactory';
import styles from './tree.module.scss';
import { Reveal, Row, RowProps, TreeNode } from './types.ts';

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
  }, [kids.length, node, reveal]);

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
      key={i}
      visible={childVisible}
      node={kid as T}
      level={level + 1}
      render={render}
      rowIcon={rowIcon}
      open={open}
    />
  ));

  return (
    <div
      className={cx(styles.branch, props.visible ? '' : styles.hidden)}
      data-level={level}
      style={{ '--level': level } as never}
    >
      <RowContainer
        reveal={reveal}
        toggleReveal={toggle}
        render={render}
        rowIcon={rowIcon}
        node={node}
      />
      {children}
    </div>
  );
};

type RowContainerProps<T extends TreeNode> = RowProps<T> &
  Omit<CommonProps<T>, 'open'>;

const RowContainer = <T extends TreeNode>(props: RowContainerProps<T>) => {
  const { reveal, toggleReveal, node, rowIcon, render } = props;
  const Node = render;
  return (
    <div className={styles.rowContainer}>
      <RowIconFactory
        node={node}
        reveal={reveal}
        toggleReveal={toggleReveal}
        kind={rowIcon || 'none'}
      />
      <Node node={node} reveal={reveal} toggleReveal={toggleReveal} />
    </div>
  );
};

export default Tree;
