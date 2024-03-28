import { IconButton, Tree } from '@/components';
import { RowIconProps } from '@/components/Tree/types.ts';
import { match } from 'ts-pattern';
import { FiArrowDown, FiArrowRight, FiLoader } from 'react-icons/fi';
import { PropsWithChildren } from 'react';
import { JsonTree, taskData } from '@/components/Tree/tests/jsonTree.ts';
import { strCut } from '@/utils';
import { BiNote } from 'react-icons/bi';

const Task = ({ node }: { node: JsonTree }) => {
  const { first: task, second: remark, found } = strCut(node.content, '->');
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span>{task}</span>
      {found && (
        <span
          style={{
            color: 'var(--colors-neutral-secondary)',
            fontSize: '0.9em',
            display: 'flow',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <BiNote style={{ translate: '0 20%' }} />
          {remark}
        </span>
      )}
    </div>
  );
};

const TaskIcon = (props: RowIconProps<JsonTree>) => {
  const { toggleReveal, reveal } = props;
  const loading = reveal === 'loading';
  const icon = match(reveal)
    .with('loading', () => FiLoader)
    .with('open', () => FiArrowDown)
    .with('close', () => FiArrowRight)
    .exhaustive();

  return <IconButton icon={icon} onClick={toggleReveal} disabled={loading} />;
};

function Demo() {
  return (
    <section>
      <h2>Examples</h2>
      <p>
        All below tree are rendered from the same data with different config
      </p>

      <Part title={'Without default (i.e none) row icons and no custom icons'}>
        <Tree data={taskData} render={Task} rowIcon={'none'} />
      </Part>

      <Part title={'With default row icons'}>
        <Tree data={taskData} render={Task} rowIcon={'default'} />
      </Part>

      <Part title={'With custom icons'}>
        <Tree data={taskData} render={Task} rowIcon={TaskIcon} />
      </Part>

      <Part title={'With custom icons and open by default'}>
        <Tree data={taskData} render={Task} rowIcon={TaskIcon} open />
      </Part>
    </section>
  );
}

function Part(props: PartProps) {
  const { title, children } = props;
  return (
    <>
      <h3>{title}</h3>
      {children}
      <br />
    </>
  );
}

type PartProps = PropsWithChildren<{ title: string }>;

export default Demo;
