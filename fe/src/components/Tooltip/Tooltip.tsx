import Float, { FloatProps, getAnchorElement } from '../Float/Float';
import { useCallback, useEffect, useState } from 'react';

import styles from './tooltip.module.css';

type TooltipProps = FloatProps & {
  delay?: number;
};

const defaultDelay = 500;

function Tooltip(props: TooltipProps) {
  const { anchor, children, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [floatHovered, setFloatHovered] = useState(false);

  const doLater = useCallback(
    (f: () => void) => {
      return setTimeout(f, props.delay ?? defaultDelay);
    },
    [props.delay],
  );

  useEffect(() => {
    const mouseover = () => setHovered(true);
    const mouseleave = () => setHovered(false);
    const elem = getAnchorElement(anchor);

    elem.addEventListener('mouseover', mouseover);
    elem.addEventListener('mouseleave', mouseleave);
    return () => {
      elem.removeEventListener('mouseover', mouseover);
      elem.removeEventListener('mouseleave', mouseleave);
    };
  }, [anchor, doLater]);

  useEffect(() => {
    const later = doLater(() => {
      setOpen(hovered || floatHovered);
    });

    return () => clearTimeout(later);
  }, [hovered, floatHovered, doLater]);

  if (!open) {
    return <></>;
  }

  return (
    <Float
      anchor={anchor}
      className={styles.tooltip}
      {...rest}
      onFocus={() => setFloatHovered(true)}
      onMouseOver={() => setFloatHovered(true)}
      onMouseLeave={() => setFloatHovered(false)}
      onBlur={() => setFloatHovered(false)}
    >
      {children}
    </Float>
  );
}

export default Tooltip;
