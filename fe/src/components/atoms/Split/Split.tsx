import { cx } from '@/utils';
import {
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

import styles from './split.module.scss';

// TODO:
//  - resizable using keyboard shortcuts
//  - resizable using mouse drag
//  - make Split remembers its children sizes on load/resume.
//  - should we allow tab to focus the divider
//  - should we add something like ctr-shift-r to start resizing mode (divider
//  gets focus after shortcut trigger and can handle arrow keys then)

type Direction = 'horizontal' | 'vertical';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction: Direction;
}

const Divider = (props: DividerProps) => {
  return (
    <div
      tabIndex={-1}
      className={styles.divider}
      data-direction={props.direction}
    />
  );
};

function interleave<T>(all: T[] | T, x: T): T[] {
  const arr = Array.isArray(all) ? all : [all];
  return arr.flatMap((v) => [v, x]).splice(0, arr.length * 2 - 1);
}

const Split = (props: SplitProps) => {
  const { className, direction, children, ...rest } = props;
  const isHorizontal = direction === 'horizontal';
  const style: CSSProperties = {
    flexDirection: isHorizontal ? 'row' : 'column',
  };

  const divider = (
    <Divider direction={isHorizontal ? 'vertical' : 'horizontal'} />
  );

  console.log(children);
  const kids = interleave<ReactNode>(children, divider);
  console.log(kids);

  return (
    <div style={style} {...rest} className={cx(styles.split, className)}>
      {kids}
    </div>
  );
};

export type SplitProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  direction: Direction;
};

export default Split;
