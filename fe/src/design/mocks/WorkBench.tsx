import Split from 'src/components/atoms/Split/Split.tsx';
import { DirView } from 'src/design/mocks/DirView.tsx';
import styles from './Workbench.module.scss';

export function WorkBench() {
  return (
    <Split direction={'vertical'} className={styles.workbench}>
      <DirView />
    </Split>
  );
}
