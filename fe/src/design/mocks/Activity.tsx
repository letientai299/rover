import { Button } from '@/components';
import Accordion from '@/components/atoms/Accordion/Accordion.tsx';
import { FaComputer, FaDownload } from 'react-icons/fa6';
import { HiDocument } from 'react-icons/hi2';
import { MdMore, MdWork } from 'react-icons/md';

import styles from './activity.module.scss';

export function Activity() {
  const itemStyle = { marginLeft: '0.5em' };
  const more = new Array(2).fill(0).map((_, i) => (
    <Button key={i} icon={MdMore} style={itemStyle}>
      More button - {i + 1}
    </Button>
  ));

  return (
    <Accordion.Root className={styles.activity} open={true}>
      <Accordion.Header className={styles.activityTitle}>
        Favorites
      </Accordion.Header>
      <Accordion.Body>
        <Button icon={FaComputer} style={itemStyle}>
          My PC
        </Button>
        <Button icon={HiDocument} style={itemStyle}>
          Documents
        </Button>
        <Button icon={FaDownload} style={itemStyle}>
          Downloads
        </Button>
        <Button icon={MdWork} style={itemStyle}>
          Projects
        </Button>
        {more}
      </Accordion.Body>
    </Accordion.Root>
  );
}

export default Activity;
