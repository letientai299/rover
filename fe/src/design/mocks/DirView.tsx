import { IconType } from 'react-icons';
import { FiColumns, FiGift, FiGrid, FiMenu, FiSearch } from 'react-icons/fi';
import { Button } from 'src/components';
import { Expand } from 'src/components/atoms';
import Split from 'src/components/atoms/Split/Split.tsx';
import { AddressBar } from 'src/design/mocks/AddressBar.tsx';

import styles from 'src/design/mocks/DirView.module.scss';
import FileList from 'src/design/mocks/FileList.tsx';
import { FileProperties } from 'src/design/mocks/FileProperties';

function DirContent() {
  return (
    <Split direction={'vertical'} className={styles.dirContent}>
      <FileList />
      <FileProperties />
    </Split>
  );
}

function DirInfo() {
  return (
    <div className={styles.dirInfo}>
      <AddressBar path={'/Users/tai/Developer/mine/rover/fe/mock'} />
      <ToolBar />
    </div>
  );
}

export function DirView() {
  return (
    <div className={styles.dirView}>
      <DirInfo />
      <DirContent />
    </div>
  );
}

const ToolBar = () => {
  const options: [IconType, string, boolean?][] = [
    [FiGrid, 'Grid'],
    [FiMenu, 'List'],
    [FiColumns, 'Columns', true], // disabled
    [FiGift, 'Other'], // disabled
  ];

  return (
    <div className={styles.dirToolbar}>
      {options.map((opt) => {
        const mode = opt[1];
        return (
          <Button
            key={mode}
            kind={mode === 'Grid' ? 'primary' : 'normal'}
            icon={opt[0]}
            disabled={opt[2] ?? false}
          >
            {mode}
          </Button>
        );
      })}
      <Expand />
      <Button icon={FiSearch}>Find</Button>
    </div>
  );
};

export default ToolBar;
