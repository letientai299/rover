import { Button } from '@/components';
import { FaComputer, FaDownload } from 'react-icons/fa6';
import { HiDocument } from 'react-icons/hi2';
import { MdMore, MdWork } from 'react-icons/md';

import styles from './activity.module.scss';

export function Activity() {
  const itemStyle = { marginLeft: '0.5em' };
  const more = new Array(20).fill(0).map((_, i) => (
    <Button key={i} icon={MdMore} style={itemStyle}>
      More button - {i + 1}
    </Button>
  ));

  return (
    <div className={styles.activity}>
      <span className={styles.activityTitle}>Favorites</span>
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
    </div>
  );
}

export default Activity;
