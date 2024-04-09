import { AiOutlineLock } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa6';
import { FiFolder } from 'react-icons/fi';
import { LuFileJson2 } from 'react-icons/lu';
import { Tabs } from 'src/components';
import Activity from 'src/design/mocks/Activity.tsx';
import { ActivityNav } from 'src/design/mocks/ActivityNav.tsx';
import { Shell } from 'src/design/mocks/Shell.tsx';
import { StatusBar } from 'src/design/mocks/StatusBar.tsx';
import Window, { Platform } from 'src/design/mocks/Window.tsx';
import { WorkBench } from 'src/design/mocks/WorkBench.tsx';

interface MockAppProps {
  platform: Platform;
}

const MockApp = (props: MockAppProps) => {
  return (
    <Window platform={props.platform}>
      <Shell>
        <VSCodeLike />
      </Shell>
    </Window>
  );
};

function VSCodeLike() {
  return (
    <>
      <ActivityNav />
      <div
        style={{
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            minWidth: 0,
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
          }}
        >
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
        </div>
        <StatusBar />
      </div>
    </>
  );
}

export default MockApp;
