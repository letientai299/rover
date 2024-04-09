import {
  FaCommentDots,
  FaComputer,
  FaDownload,
  FaUser,
  FaWrench,
} from 'react-icons/fa6';
import { HiDocument } from 'react-icons/hi2';
import { Button } from 'src/components';
import { Icon } from 'src/components/atoms';
import Accordion from 'src/components/atoms/Accordion/Accordion.tsx';

import styles from './Activity.module.scss';

export function Activity() {
  const more = new Array(2)
    .fill(0)
    .map((_, i) => (
      <Bookmarked title={`More button - ${i}`} icon={FaCommentDots} key={i} />
    ));

  return (
    <Accordion.Root className={styles.activity} open={true}>
      <Accordion.Header className={styles.activityTitle}>
        Favorites
      </Accordion.Header>
      <Accordion.Body className={styles.activityBody}>
        <Bookmarked icon={FaComputer} title={'My PC'} />
        <Bookmarked icon={HiDocument} title={'Documents'} />
        <Bookmarked icon={FaDownload} title={'Download'} />
        <Bookmarked icon={FaUser} title={'Tai'} />
        <Bookmarked icon={FaWrench} title={'Developers'} />
        {more}
      </Accordion.Body>
    </Accordion.Root>
  );
}

interface BookmarkedProps {
  title: string;
  icon: Icon;
}

function Bookmarked({ title, icon }: BookmarkedProps) {
  return <Button icon={icon}>{title}</Button>;
}

export default Activity;
