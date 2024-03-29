import Progress from '@/components/atoms/progress';
import { PropsWithChildren, useEffect, useState } from 'react';

function useFakeProgress(step: number): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => {
      setVal((v) => {
        return v === 100
          ? 101  // wait 1 more step before rollback
          : v > 100 ? 0 : Math.min(100, v + step);
      });
    }, 500);
    return () => clearTimeout(id);
  }, [val, step]);
  return val;
}

function Box({ children }: PropsWithChildren<{}>) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 8,
        alignItems: 'center',
        padding: '0 20%',
      }}
    >
      {children}
    </div>
  );
}

interface DemoProps {
  withLabel?: boolean;
}

export function Demo({ withLabel }: DemoProps) {
  const val = useFakeProgress(7);
  if (!withLabel) {
    return (
      <Box>
        <span>Indeterminate</span> <Progress kind={'indeterminate'} />
        <span>Determinate</span> <Progress kind={'determinate'} value={val} />
      </Box>
    );
  }

  return (
    <Box>
      <span>Indeterminate</span>{' '}
      <Progress kind={'indeterminate'} label={'Loading'} />
      <span>Determinate</span>{' '}
      <Progress
        kind={'determinate'}
        value={val}
        label={'Loading'}
        showValueInside
      />
    </Box>
  );
}
