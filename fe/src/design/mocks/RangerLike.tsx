import { DummyTabs } from 'src/design/mocks/DummyTabs.tsx';
import { Shell } from 'src/design/mocks/Shell.tsx';
import { Sidebar } from 'src/design/mocks/Sidebar.tsx';
import { StatusBar } from 'src/design/mocks/StatusBar.tsx';
import Window from 'src/design/mocks/Window.tsx';

const RangerLike = () => {
  return (
    <Window platform={'linux'}>
      <Shell style={{ flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            minHeight: 0,
          }}
        >
          <Sidebar />
          <DummyTabs />
        </div>
        <StatusBar />
      </Shell>
    </Window>
  );
};

export default RangerLike;
