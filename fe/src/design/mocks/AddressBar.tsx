import { Button, IconButton } from '@/components';
import { HTMLAttributes, PropsWithChildren } from 'react';
import { FaComputer } from 'react-icons/fa6';
import { FiChevronRight } from 'react-icons/fi';

import styles from './addressBar.module.scss';

interface AddressBarProps extends HTMLAttributes<HTMLDivElement> {
  path: string;
}

export function AddressBar(props: AddressBarProps) {
  const { path, ...rest } = props;
  const pathSegments = path
    .split('/')
    .splice(1)
    .map((dir, i) => <Segment key={`${i}-${dir}`} dir={dir} />);
  return (
    <div {...rest} className={styles.addressBar}>
      <IconButton icon={FaComputer} className={styles.extensionIcon} />
      <div className={styles.pathSegments}>{pathSegments}</div>
    </div>
  );
}

type SegmentProps = PropsWithChildren & {
  dir: string;
};

const Segment = (props: SegmentProps) => {
  return (
    <Button
      icon={FiChevronRight}
      iconPosition={'end'}
      className={styles.segment}
    >
      {props.dir}
    </Button>
  );
};
