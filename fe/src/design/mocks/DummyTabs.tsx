import { AiOutlineLock } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa6';
import { FiFolder } from 'react-icons/fi';
import { LuFileJson2 } from 'react-icons/lu';
import { Tabs } from 'src/components';
import Menu from 'src/components/atoms/Menu/Menu.tsx';
import { WorkBench } from 'src/design/mocks/WorkBench.tsx';

export function DummyTabs() {
  return (
    <Tabs
      menu={<Menu />}
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
  );
}
