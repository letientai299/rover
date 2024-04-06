import Split from '@/components/atoms/Split/Split.tsx';
import { DirView } from '@/design/mocks/DirView.tsx';
import styles from './workbench.module.scss';

export function WorkBench() {
  return (
    <Split direction={'horizontal'} className={styles.workbench}>
      <DirView />
      <DirView />
    </Split>
  );
}
