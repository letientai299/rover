import { ActivityNav } from 'src/design/mocks/ActivityNav.tsx';
import { DummyTabs } from 'src/design/mocks/DummyTabs.tsx';
import { Shell } from 'src/design/mocks/Shell.tsx';
import Sidebar from 'src/design/mocks/Sidebar.tsx';
import { StatusBar } from 'src/design/mocks/StatusBar.tsx';
import Window, { Platform } from 'src/design/mocks/Window.tsx';

interface MockAppProps {
  platform: Platform;
}

const VSCodeLike = (props: MockAppProps) => {
  return (
    <Window platform={props.platform}>
      <Shell style={{ flexDirection: 'row' }}>
        <Content />
      </Shell>
    </Window>
  );
};

function Content() {
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
            minHeight: 0,
            flexGrow: 1,
          }}
        >
          <Sidebar />
          <DummyTabs />
        </div>
        <StatusBar />
      </div>
    </>
  );
}

export default VSCodeLike;
