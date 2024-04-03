import { Shell } from '@/design/mocks/Shell.tsx';
import Window, { Platform } from '@/design/mocks/Window.tsx';

interface MockAppProps {
  platform: Platform;
}

const MockApp = (props: MockAppProps) => {
  return (
    <Window platform={props.platform}>
      <Shell />
    </Window>
  );
};

export default MockApp;
