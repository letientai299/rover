import FlexRow from '@/components/atoms/Flex/FlexRow.tsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './shell.module.scss';

interface ShellProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export function Shell(props: ShellProps) {
  return <FlexRow className={styles.shell}>{props.children}</FlexRow>;
}
