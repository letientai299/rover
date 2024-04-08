import { Button } from '@/components';
import { Expand } from '@/components/atoms';
import FlexCol from '@/components/atoms/Flex/FlexCol.tsx';
import Split from '@/components/atoms/Split/Split.tsx';
import { AddressBar } from '@/design/mocks/AddressBar.tsx';
import FileList from '@/design/mocks/FileList.tsx';
import { IconType } from 'react-icons';
import { FiColumns, FiGift, FiGrid, FiMenu, FiSearch } from 'react-icons/fi';

import styles from './dirView.module.scss';

function DirContent() {
  return (
    <Split direction={'vertical'} className={styles.dirContent}>
      <FileList />
      <FileList />
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
    <FlexCol className={styles.dirView}>
      <DirInfo />
      <DirContent />
    </FlexCol>
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
      <Button icon={FiSearch} disabled>
        Find
      </Button>
    </div>
  );
};

export default ToolBar;
