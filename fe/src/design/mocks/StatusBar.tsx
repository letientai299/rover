import { Expand } from '@/components/atoms';
import { FiBell } from 'react-icons/fi';
import styles from './statusBar.module.scss';

export function StatusBar() {
  return (
    <div className={styles.statusBar}>
      <div>
        Selected 123KB of 3/23 files: <code>a.json</code>, <code>b.txt</code>,{' '}
        <code>c.tsx</code>
      </div>
      <Expand />
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <FiBell />
      </span>
    </div>
  );
}
