import { cx } from '@/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './flex.module.scss';

export type FlexColProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const FlexCol = (props: FlexColProps) => {
  const { className, children, ...rest } = props;
  return (
    <div className={cx(styles.flex, styles.col, className)} {...rest}>
      {children}
    </div>
  );
};

export default FlexCol;
