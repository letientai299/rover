import Split from '@/components/atoms/Split/Split.tsx';
import { DirView } from '@/design/mocks/DirView.tsx';
import styles from './workbench.module.scss';

export function WorkBench() {
  return (
    <Split direction={'vertical'} className={styles.workbench}>
      <DirView />
    </Split>
  );
}
