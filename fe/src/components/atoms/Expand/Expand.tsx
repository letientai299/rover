import { ReactNode } from 'react';

import styles from './expand.module.scss';

const Expand = (props: { children?: ReactNode }) => {
  return <div className={styles.expand}>{props.children}</div>;
};

export default Expand;
