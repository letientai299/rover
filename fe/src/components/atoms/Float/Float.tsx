import {
  HTMLAttributes,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from 'src/utils';

import styles from './float.module.scss';

export type Placement =
  | 'over'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

export interface FloatProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  /**
   * Anchor to decides where the Float should appear.
   * Could be an ID or a ref to a specific element.
   */
  anchor: string | HTMLElement;
  place?: Placement;
}

const Float = (props: FloatProps) => {
  const { className, children, ...rest } = props;
  const place = props.place ?? 'bottom-start';
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const recompute = () => {
      if (ref.current) {
        const pos = computePosition(props.anchor, place);
        Object.assign(ref.current.style, convertPosition(pos));
      }
    };

    window.addEventListener('resize', recompute);
    window.addEventListener('scroll', recompute, true); // capture all scroll
    recompute();

    return () => {
      window.removeEventListener('resize', recompute);
      window.removeEventListener('scroll', recompute, true);
    };
  }, [place, props.anchor]);

  return createPortal(
    <div
      ref={ref}
      className={cx(styles.float, className)}
      data-place={place}
      {...rest}
    >
      {children}
    </div>,
    document.body,
  );
};

type Position = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  translate?: string;
};

function convertPosition(pos: Position) {
  return {
    translate: pos.translate,
    ...(pos.top && { top: pos.top + 'px' }),
    ...(pos.left && { left: pos.left + 'px' }),
    ...(pos.right && { right: pos.right + 'px' }),
    ...(pos.bottom && { bottom: pos.bottom + 'px' }),
  };
}

function computePosition(
  anchor: string | HTMLElement,
  place: string,
): Position {
  const ww = window.innerWidth;
  const wh = window.innerHeight;

  const translateY = (percent: number) => `0 ${percent}%`;
  const translateX = (percent: number) => `${percent}% 0`;

  const { top, left, bottom, right } = locate(anchor);
  const w = right - left;
  const h = bottom - top;

  switch (place) {
    case 'over':
      return {
        left: left + w / 2,
        top: top + h / 2,
        translate: `-50% -50%`,
      };

    case 'left':
      return {
        right: ww - left,
        top: top + h / 2,
        translate: translateY(-50),
      };

    case 'left-start':
      return { right: ww - left, top: top };

    case 'left-end':
      return { right: ww - left, bottom: wh - top - h };

    case 'right':
      return {
        left: right,
        top: top + h / 2,
        translate: translateY(-50),
      };

    case 'right-start':
      return { left: right, top: top };

    case 'right-end':
      return { left: right, bottom: wh - top - h };

    case 'top':
      return {
        left: left + w / 2,
        bottom: wh - top,
        translate: translateX(-50),
      };

    case 'top-start':
      return { left: left, bottom: wh - top };

    case 'top-end':
      return { right: ww - left - w, bottom: wh - top };

    case 'bottom':
      return { left: left + w / 2, top: top + h, translate: translateX(-50) };

    case 'bottom-start':
      return { left: left, top: top + h };

    case 'bottom-end':
      return { right: ww - left - w, top: top + h };
  }

  return {};
}

export function getAnchorElement(anchor: string | HTMLElement) {
  let elem =
    typeof anchor === 'string' ? document.getElementById(anchor) : anchor;

  if (elem === null) {
    elem = document.body;
  }
  return elem;
}

function locate(anchor: string | HTMLElement) {
  const elem = getAnchorElement(anchor);
  const rect = elem.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
  };
}

export default Float;
