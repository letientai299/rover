import { Button } from 'src/components/atoms';
import { HTMLAttributes, useRef, useState } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import Split from '../Split';

interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

export function Box(props: BoxProps) {
  const { style, children, ...rest } = props;
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        minHeight: `var(--sizes-9)`,
        border: `1px solid var(--colors-bd-clear)`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Vert() {
  return (
    <Box>
      <Split direction={'vertical'}>
        <div>Pane 1</div>
        <div>Pane 2</div>
        <div>Pane 3</div>
      </Split>
    </Box>
  );
}

export function Hor() {
  return (
    <Box>
      <Split direction={'horizontal'}>
        <div>Pane 1</div>
        <div>Pane 2</div>
        <div>Pane 3</div>
      </Split>
    </Box>
  );
}

export function Nested() {
  return (
    <Box>
      <Split direction={'vertical'}>
        <div>Pane 1</div>
        <Split direction={'horizontal'}>
          <div>Pane 1</div>
          <Split direction={'vertical'}>
            <div>Pane 1</div>
            <div>Pane 2</div>
          </Split>
          <div>Pane 3</div>
        </Split>
        <div>Pane 2</div>
      </Split>
    </Box>
  );
}

export function AddRemove() {
  const paneID = useRef(3);
  const [panes, setPanes] = useState([1, 2]);
  const add = () =>
    setPanes((v) => {
      const res = [...v, paneID.current];
      paneID.current++;
      return res;
    });

  const remove = (id: number) => setPanes((v) => v.filter((x) => x !== id));

  const children = panes.map((i) => {
    return (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 'fit-content',
        }}
      >
        <Button onClick={() => remove(i)} variant={'outline'}>
          Remove {i}
        </Button>
      </div>
    );
  });

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ borderBottom: '1px solid var(--colors-bd-clear)' }}>
        <Button onClick={add} icon={FiPlusSquare} variant={'outline'}>
          Add new pane
        </Button>
      </div>
      <Split direction={'horizontal'} style={{ flexGrow: 1 }}>
        {children}
      </Split>
    </Box>
  );
}
