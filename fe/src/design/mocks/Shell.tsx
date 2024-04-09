import { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './Shell.module.scss';

interface ShellProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export function Shell(props: ShellProps) {
  return <div className={styles.shell}>{props.children}</div>;
}
