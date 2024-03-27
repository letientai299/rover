import { IconButton, Tree } from '@/components';
import { NodeIconProps, Reveal } from '@/components/Tree/types.ts';
import { match } from 'ts-pattern';
import { FiArrowDown, FiArrowRight, FiLoader } from 'react-icons/fi';
import { PropsWithChildren } from 'react';
import { JsonTree, taskData } from '@/components/Tree/tests/jsonTree.ts';
import { LuInfo } from 'react-icons/lu';

const Task = ({ node }: { node: JsonTree }) => {
  const [task, remark] = node.content.split('->', 2);
  return (
    <div
      style={{
        display: 'flex',
        verticalAlign: 'bottom',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 8,
      }}
    >
      <span>{task}</span>
      {remark && (
        <span
          style={{
            color: 'var(--colors-neutral-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <LuInfo />
          {remark}
        </span>
      )}
    </div>
  );
};

const TaskIcon = (props: NodeIconProps<JsonTree>) => {
  const { setReveal, reveal } = props;
  const loading = reveal === 'loading';
  const toggle = () => {
    setReveal((v) =>
      match(v)
        .returnType<Reveal>()
        .with('close', () => 'loading')
        .with('loading', () => 'open')
        .with('open', () => 'close')
        .exhaustive(),
    );
  };

  const icon = match(reveal)
    .with('loading', () => FiLoader)
    .with('open', () => FiArrowDown)
    .with('close', () => FiArrowRight)
    .exhaustive();

  return <IconButton icon={icon} onClick={toggle} disabled={loading} />;
};

function Demo() {
  return (
    <section>
      <Part title={'With default icons'}>
        <Tree data={taskData} render={Task} />
      </Part>

      <Part title={'With custom icons'}>
        <Tree data={taskData} render={Task} renderIcon={TaskIcon} />
      </Part>

      <Part title={'With custom icons and open by default'}>
        <Tree data={taskData} render={Task} renderIcon={TaskIcon} open />
      </Part>
    </section>
  );
}

function Part(props: PartProps) {
  const { title, children } = props;
  return (
    <>
      <h2>{title}</h2>
      {children}
      <br />
    </>
  );
}

type PartProps = PropsWithChildren<{ title: string }>;

export default Demo;
