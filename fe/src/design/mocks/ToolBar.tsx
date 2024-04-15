import { IconType } from 'react-icons';
import { FiGift, FiGrid, FiMenu, FiSearch, FiStar } from 'react-icons/fi';
import { useRef } from 'react';
import { Button } from 'src/components';
import styles from './Toolbar.module.scss';
import { Expand } from 'src/components/atoms';
import { Core, useCommandHandlers } from './core/cmds.ts';
import { clampIn } from '../../utils/numbers';

const ToolBar = () => {
  const left: [IconType, string, boolean?][] = [
    [FiGrid, 'Grid'],
    [FiMenu, 'List'],
    // commented to test keyboard shortcut handling
    // [FiColumns, 'Columns', true], // disabled
    [FiGift, 'Other'], // disabled
  ];

  const right: [IconType, string][] = [
    [FiSearch, 'Find'],
    [FiStar, 'Star'],
  ];

  const childRefs = useRef<Array<HTMLButtonElement>>(
    Array(left.length).fill(null),
  );
  const focus = useRef<number>(-1);

  const childFocus = (i: number) => {
    focus.current = clampIn(childRefs.current, i);
    childRefs.current[focus.current].focus();
  };

  const onFocusChild = (i: number) => {
    focus.current = i;
  };
  const ref = useRef<HTMLDivElement>(null);
  useCommandHandlers(
    ref,
    [Core.movement.left.id, () => childFocus(focus.current - 1)],
    [Core.movement.right.id, () => childFocus(focus.current + 1)],
  );

  const leftKids = left.map((opt, i) => {
    const mode = opt[1];
    return (
      <Button
        ref={(el) => {
          if (el) childRefs.current[i] = el;
        }}
        onFocus={() => onFocusChild(i)}
        key={mode}
        kind={mode === 'List' ? 'primary' : 'normal'}
        icon={opt[0]}
        disabled={opt[2] ?? false}
      >
        {mode}
      </Button>
    );
  });

  const rightKids = right.map((opt, i) => (
    <Button
      icon={opt[0]}
      onFocus={() => onFocusChild(i + left.length)}
      key={i}
      ref={(el) => {
        if (el) childRefs.current[left.length + i] = el;
      }}
    >
      {opt[1]}
    </Button>
  ));

  return (
    <div className={styles.toolbar} ref={ref}>
      {leftKids}
      <Expand />
      {rightKids}
    </div>
  );
};
export default ToolBar;
