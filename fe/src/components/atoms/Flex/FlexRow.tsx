import { cx } from '@/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './flex.module.scss';

export type FlexRowProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const FlexRow = (props: FlexRowProps) => {
  const { className, children, ...rest } = props;
  return (
    <div className={cx(styles.flex, styles.row, className)} {...rest}>
      {children}
    </div>
  );
};

export default FlexRow;
