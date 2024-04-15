import { Button } from 'src/components';
import { FiFile, FiFolder } from 'react-icons/fi';

import styles from './FileList.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';
import { Core, useCommandHandlers } from './core/cmds.ts';
import { clampIn } from '../../utils/numbers';

const files = new Array(12).fill(0).map((_, i) => `a_${i}.json`);
const dirs = new Array(12).fill(0).map((_, i) => `some_dir_${i}`);
const content = [...files, ...dirs];

function FileList() {
  const [index, setIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useCommandHandlers(
    ref,
    [Core.movement.up.id, () => setIndex((v) => clampIn(content, v - 1))],
    [Core.movement.down.id, () => setIndex((v) => clampIn(content, v + 1))],
  );

  const kids = content
    .sort(dirFist)
    .map((name, i) => (
      <FileItem
        key={name}
        name={name}
        kind={isFile(name)}
        selected={i === index}
        onSelect={() => setIndex(i)}
      />
    ));

  return (
    <div className={styles.fileList} ref={ref} tabIndex={0}>
      {kids}
    </div>
  );
}

function dirFist(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  if (isFile(a) === isFile(b)) {
    return a.localeCompare(b);
  }

  if (isFile(a) === 'dir') {
    return -1;
  }

  return 1;
}

function FileItem(props: {
  name: string;
  kind: 'dir' | 'file';
  selected: boolean;
  onSelect: () => void;
}) {
  const { name, kind, selected, onSelect } = props;
  const ref = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;

    if (selected) {
      ref.current.scrollIntoView();
      ref.current.focus();
    } else {
      ref.current.blur();
    }
  }, [ref, selected]);
  return (
    <Button
      ref={ref}
      icon={kind === 'dir' ? FiFolder : FiFile}
      onClick={onSelect}
      tabIndex={-1}
    >
      {name}
    </Button>
  );
}

function isFile(name: string): 'dir' | 'file' {
  return name.endsWith('.json') ? 'file' : 'dir';
}

export default FileList;
