import Split from 'src/components/atoms/Split/Split.tsx';
import { AddressBar } from 'src/design/mocks/AddressBar.tsx';

import styles from 'src/design/mocks/DirView.module.scss';
import FileList from 'src/design/mocks/FileList.tsx';
import { FileProperties } from 'src/design/mocks/FileProperties';
import ToolBar from './ToolBar.tsx';

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
