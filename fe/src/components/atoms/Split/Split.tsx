import { cx } from '@/utils';
import React, {
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';

import styles from './split.module.scss';

// TODO:
//  - resizable using keyboard shortcuts
//  - make Split remembers its children sizes on load/resume.
//  - should we allow tab to focus the divider
//  - should we add something like ctr-shift-r to start resizing mode (divider
//  gets focus after shortcut trigger and can handle arrow keys then)

type Direction = 'horizontal' | 'vertical';

const DIVIDER_ROLE = 'separator';

type ResizingPair = {
  a: HTMLElement;
  aSize: number;
  b: HTMLElement;
  bSize: number;
};

type Point = {
  X: number;
  Y: number;
};

const Split = (props: SplitProps) => {
  const { style, className, direction, children, ...rest } = props;
  const isVerticalDivider = direction === 'vertical';
  const ref = useRef<HTMLDivElement>(null);
  const resizing = useRef<{ pair: ResizingPair | null }>({ pair: null });
  const mousePos = useRef<{ pos: Point | null }>({ pos: null });

  const getChildElements = useCallback(
    (split: HTMLDivElement) =>
      [...split.children].filter((el) => el.role !== DIVIDER_ROLE),
    [],
  );

  const isResizing = () => {
    return resizing.current.pair && mousePos.current.pos;
  };

  // on resize start, convert all the percentage value of the flex grow
  // in the inline style of all child elements into concrete size in pixels,
  // so that irrelevant elements won't be resized.
  const resizeStart = () => {
    const split = ref.current;
    if (!split) {
      return;
    }

    getChildElements(split).forEach((e) => {
      const elem = e as HTMLElement;
      const computed = window.getComputedStyle(elem);
      if (isVerticalDivider) {
        elem.style.width = computed.width;
      } else {
        elem.style.height = computed.height;
      }
      elem.style.flexGrow = `0`; // clear inline width set by resize function
    });
  };

  // during resizing, update the size of relevant pair of elements via
  // inline style.
  const resize = (e: MouseEvent) => {
    if (!isResizing()) {
      return;
    }

    const pair = resizing.current.pair!;
    const pos = mousePos.current.pos!;
    // compute delta between mouse move using screenX/Y because movementX/Y
    // unit is browser specific.
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX
    const moved = isVerticalDivider ? e.screenX - pos.X : e.screenY - pos.Y;

    if (pair.aSize - moved < 0 || pair.bSize + moved < 0) {
      return; // ignore invalid resize
    }

    mousePos.current.pos = { X: e.screenX, Y: e.screenY };

    pair.aSize = pair.aSize - moved;
    pair.bSize = pair.bSize + moved;

    if (isVerticalDivider) {
      pair.a.style.width = `${pair.aSize}px`;
      pair.b.style.width = `${pair.bSize}px`;
    } else {
      pair.a.style.height = `${pair.aSize}px`;
      pair.b.style.height = `${pair.bSize}px`;
    }
  };

  // adjust all child elements inline style to use percentage value instead of
  // fixed width/height, so that the flex layout will be responsive against
  // browser window resizing.
  const resizeEnd = () => {
    const split = ref.current;
    if (!split) {
      return;
    }

    const total = totalSize(split, isVerticalDivider);
    getChildElements(split).forEach((e) => {
      const elem = e as HTMLElement;
      const computed = window.getComputedStyle(elem);
      const size = parseSize(
        isVerticalDivider ? computed.width : computed.height,
      );
      const percent = (size * 100) / total;
      elem.style.flexGrow = `${percent}`;
      // clear inline width set by resize function
      if (isVerticalDivider) {
        elem.style.width = `0`;
      } else {
        elem.style.height = `0`;
      }
    });
    // .reduce((a, all) => all + a, 0);

    resizing.current.pair = null;
    mousePos.current.pos = null;
  };

  const startDragging = (pos: Point, d: HTMLElement) => {
    // guaranteed to be not null
    const a = d.nextElementSibling! as HTMLElement;
    // guaranteed to be not null
    const b = d.previousElementSibling! as HTMLElement;
    const aStyle = window.getComputedStyle(a);
    const bStyle = window.getComputedStyle(b);

    resizing.current.pair = {
      a: a,
      aSize: parseSize(isVerticalDivider ? aStyle.width : aStyle.height),
      b: b,
      bSize: parseSize(isVerticalDivider ? bStyle.width : bStyle.height),
    };

    mousePos.current.pos = pos;
    resizeStart();
  };

  const initChildPercentage = useCallback(() => {
    if (!ref.current) {
      return;
    }

    if (!Array.isArray(children)) {
      return; // no need to init size when there's not many children.
    }

    const stats = getChildElements(ref.current).reduce(
      (stats, re) => {
        const e = re as HTMLElement;
        const elemStyle = e.style;
        if (elemStyle.flexGrow === '') {
          stats.newElems.push(e);
          return stats;
        }

        stats.currentGrowSum += parseFloat(elemStyle.flexGrow);
        return stats;
      },
      // find all new elements that need to have reasonable initial flexGrow,
      // and the sum of all current elements flexGrow.
      { newElems: [] as HTMLElement[], currentGrowSum: 0 },
    );

    const grow =
      children.length === stats.newElems.length
        ? // if all elements are new, all will grow to be equal.
          100 / children.length
        : // otherwise, those new elements get an equal fraction of total sizes,
          // which is based on the current total grow sum.
          stats.currentGrowSum / (children.length - stats.newElems.length);

    stats.newElems.forEach((elem) => {
      elem.style.flexGrow = `${grow}`;
      if (isVerticalDivider) {
        elem.style.width = '0';
      } else {
        elem.style.height = '0';
      }
    });
  }, [children, getChildElements, isVerticalDivider]);

  useLayoutEffect(initChildPercentage, [initChildPercentage]);

  const stopDragging = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) {
      return; // not the primary button (i.e. left for right-handed users)
    }

    e.stopPropagation();
    e.preventDefault();
    resizeEnd();
  };

  const mouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (isResizing()) {
      stopDragging(e);
    }
  };

  const mouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (isResizing()) {
      stopDragging(e);
    }
  };

  const kids = addDividers(children, isVerticalDivider, startDragging);

  return (
    <div
      ref={ref}
      style={style}
      {...rest}
      className={cx(styles.split, className)}
      data-split-direction={direction}
      onMouseUp={mouseUp}
      onMouseLeave={mouseLeave}
      onMouseMove={resize}
    >
      {kids}
    </div>
  );
};

export type SplitProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  direction: Direction;
};

function addDividers(
  all: React.ReactNode[] | React.ReactNode,
  isVertical: boolean,
  startDragging: (pos: Point, divider: HTMLElement) => void,
): React.ReactNode[] {
  const arr = Array.isArray(all) ? all : [all];
  return (
    arr
      // ensure all non-divider children must be within an HTML element
      // so that we can attach style on it later.
      .map((v, i) => {
        return ['function', 'object'].includes(typeof v) ? (
          v
        ) : (
          <div key={`split-element-${i}`}>{v}</div>
        );
      })
      // interleave with dividers
      .flatMap((v, i) => [
        v,
        <Divider
          direction={isVertical ? 'vertical' : 'horizontal'}
          key={`split-divider-after-element-${i}`}
          startDragging={startDragging}
        />,
      ])
      // remove the last divider
      .splice(0, arr.length * 2 - 1)
  );
}

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction: Direction;
  startDragging: (pos: Point, divider: HTMLElement) => void;
}

const Divider = (props: DividerProps) => {
  const { startDragging, direction, ...rest } = props;

  const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
    // 0 means the primary button, i.e. left button for right-handed users.
    if (e.button === 0) {
      startDragging({ X: e.screenX, Y: e.screenY }, e.currentTarget);
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      // start dragging when clicking onto divider
      onMouseDown={mouseDown}
      tabIndex={0}
      className={styles.divider}
      data-direction={direction}
      // set the role to follow ARIA Window Splitter Pattern,
      // (https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)
      // also use this as an indicator for Split to find non-divider children.
      role={DIVIDER_ROLE}
      {...rest}
    >
      <div className={styles.line} />
    </div>
  );
};

const totalSize = (
  split: HTMLDivElement,
  isVerticalDivider: boolean,
): number => {
  const computed = window.getComputedStyle(split);
  return parseSize(isVerticalDivider ? computed.width : computed.height);
};

const parseSize = (s: string) => parseFloat(s.replace('px', ''));

export default Split;
