import { FaComputer, FaDownload, FaUser, FaWrench } from 'react-icons/fa6';
import { FiCloudDrizzle, FiHardDrive } from 'react-icons/fi';
import { HiDocument } from 'react-icons/hi2';
import { ImDrive } from 'react-icons/im';
import { Button } from 'src/components';
import { Icon } from 'src/components/atoms';
import Accordion from 'src/components/atoms/Accordion/Accordion.tsx';

import styles from 'src/design/mocks/Sidebar.module.scss';

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Bookmarks />
      <Disks />
      <Connections />
    </div>
  );
}

function Connections() {
  const connections = [
    'tai@aws-vm1',
    'tai@github.com',
    'ftp server',
    'tai - gdrive',
  ].map((v) => <Item title={v} icon={FiCloudDrizzle} key={v} />);

  return (
    <Accordion.Root className={styles.section} open={true}>
      <Accordion.Header className={styles.title}>Connections</Accordion.Header>
      <Accordion.Body className={styles.body}>{connections}</Accordion.Body>
    </Accordion.Root>
  );
}

function Disks() {
  const internals = ['sda1', 'sda2', 'win-partition-c', 'win-partition-d'].map(
    (v) => <Item title={v} icon={FiHardDrive} key={v} />,
  );
  const pluggable = ['USB-kingston', 'Bootable Kali'].map((v) => (
    <Item title={v} icon={ImDrive} key={v} />
  ));

  return (
    <Accordion.Root className={styles.section} open={true}>
      <Accordion.Header className={styles.title}>Disk</Accordion.Header>
      <Accordion.Body className={styles.body}>
        {internals}
        {pluggable}
      </Accordion.Body>
    </Accordion.Root>
  );
}

function Bookmarks() {
  return (
    <Accordion.Root className={styles.section} open={true}>
      <Accordion.Header className={styles.title}>Favorites</Accordion.Header>
      <Accordion.Body className={styles.body}>
        <Item icon={FaComputer} title={'My PC'} />
        <Item icon={HiDocument} title={'Documents'} />
        <Item icon={FaDownload} title={'Download'} />
        <Item icon={FaUser} title={'Tai'} />
        <Item icon={FaWrench} title={'Developers'} />
      </Accordion.Body>
    </Accordion.Root>
  );
}

interface BookmarkedProps {
  title: string;
  icon: Icon;
}

function Item({ title, icon }: BookmarkedProps) {
  return <Button icon={icon}>{title}</Button>;
}

export default Sidebar;
