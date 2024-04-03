import { Tabs } from '@/components';
import FlexCol from '@/components/atoms/Flex/FlexCol.tsx';
import FlexRow from '@/components/atoms/Flex/FlexRow.tsx';
import Split from '@/components/atoms/Split/Split.tsx';
import { Activity } from '@/design/mocks/Activity';
import { ActivityNav } from '@/design/mocks/ActivityNav.tsx';
import { StatusBar } from '@/design/mocks/StatusBar.tsx';
import { AiOutlineLock } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa6';
import { FiFolder } from 'react-icons/fi';
import { LuFileJson2 } from 'react-icons/lu';

import styles from './shell.module.scss';

function WorkBench() {
  return (
    <Split direction={'horizontal'}>
      <DirView />
      <DirView />
    </Split>
  );
}

function DirView() {
  return (
    <ul
      style={{
        flexGrow: 1,
      }}
    >
      <li>address</li>
      <li>toolbar</li>
      <li>files/dirs</li>
      <li>optional: properties pane</li>
    </ul>
  );
}

export function Shell() {
  return (
    <FlexRow className={styles.shell}>
      <ActivityNav />
      <FlexCol>
        <FlexRow>
          <Activity />
          <Tabs
            tabs={[
              { title: 'bin', icon: FiFolder, content: <WorkBench /> },
              {
                title: 'GDrive',
                icon: FaGoogle,
                content: <>Google Drive folder</>,
              },
              {
                title: 'config.json',
                icon: LuFileJson2,
                content: <>Some file</>,
              },
              {
                title: 'SSH remote',
                icon: AiOutlineLock,
                content: <>Some remote connection</>,
              },
            ]}
          />
        </FlexRow>
        <StatusBar />
      </FlexCol>
    </FlexRow>
  );
}
