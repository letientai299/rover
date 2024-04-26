import styles from './KeymapView.module.scss';
import { Fragment, useEffect, useState } from 'react';
import { Chords } from '../../system/kbe/chord.ts';
import { codeIdMap } from '../../system/kbe/codes.ts';
import { CmdRegistry } from './core/cmds.ts';

const KeymapView = () => {
  const [commands, setCommands] = useState(CmdRegistry.find());
  useEffect(
    () => CmdRegistry.subscribe(() => setCommands(CmdRegistry.find())),
    [],
  );

  const kids = commands.map((c) => (
    <Fragment key={c.id}>
      <code>{c.id}</code>
      <Keymaps keymaps={c.keymaps ?? []} />
    </Fragment>
  ));
  return <div className={styles.keymapView}>{kids}</div>;
};

function Keymaps({ keymaps }: { keymaps: Chords[] }) {
  if (keymaps.length === 0) {
    return <div>no mapping</div>;
  }

  const rows = keymaps.map((chords, i) => (
    <div
      key={`${i}:` + chords.map((c) => c.hashCode()).join('+')}
      style={{
        display: 'flex',
        gap: 4,
      }}
    >
      {chords.map((c, i) => (
        <Fragment key={`${i}:` + c.hashCode()}>
          {c.metaKey && <kbd>Meta</kbd>}
          {c.ctrlKey && <kbd>Ctrl</kbd>}
          {c.altKey && <kbd>Alt</kbd>}
          {c.shiftKey && <kbd>Shift</kbd>}
          <kbd>{codeIdMap.get(c.code)!}</kbd>
        </Fragment>
      ))}
    </div>
  ));
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {rows}
    </div>
  );
}

export default KeymapView;
