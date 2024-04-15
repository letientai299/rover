import { AiOutlineLock } from 'react-icons/ai';
import { FaKeyboard } from 'react-icons/fa6';
import { FiFolder, FiSettings } from 'react-icons/fi';
import { Tabs } from 'src/components';
import Menu from 'src/components/atoms/Menu/Menu.tsx';
import { WorkBench } from 'src/design/mocks/WorkBench.tsx';
import KeymapView from './KeymapView.tsx';

export function DummyTabs() {
  return (
    <Tabs
      selectedIndex={2}
      menu={<Menu />}
      tabs={[
        { title: 'bin', icon: FiFolder, content: <WorkBench /> },
        {
          title: 'Settings',
          icon: FiSettings,
          content: <>Some settings</>,
        },
        {
          title: 'Keymap',
          icon: FaKeyboard,
          content: <KeymapView />,
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
