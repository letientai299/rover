import { cx } from '@/utils';
import { Either } from '@/utils/types.ts';
import { HTMLAttributes } from 'react';

import styles from './Progress.module.scss';

export type ProgressProps = Either<
  IndeterminateProps & { kind: 'indeterminate' },
  DeterminateProps & { kind: 'determinate' }
>;

type Info = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export type DeterminateProps = Info & {
  value: number;

  /**
   * We only support displaying value (and label) inside the loader.
   * For other placement (start, end, top, bottom, ...), it's better to let the
   * parent component to control the layout.
   */
  showValueInside?: boolean;
  min?: number;
  max?: number;
};

export type IndeterminateProps = Info;

const normalize = (v: number, min: number, max: number) => {
  return Math.min(100, Math.max(0, (v - min) / (max - min)));
};

const Determinate = (props: DeterminateProps) => {
  const percent = normalize(props.value, props.min ?? 0, props.max ?? 100);
  return (
    <div
      className={cx(styles.filler, styles.determinate)}
      style={{ '--percent': percent } as never}
    ></div>
  );
};

const Indeterminate = (props: IndeterminateProps) => {
  return (
    <div
      className={cx(styles.filler, styles.indeterminate)}
      style={{ '--percent': 0.7 } as never}
      {...props}
    ></div>
  );
};

const Progress = (props: ProgressProps) => {
  const { kind, ...rest } = props;
  const bar =
    kind === 'determinate' ? (
      <Determinate {...(rest as DeterminateProps)} />
    ) : (
      <Indeterminate {...(rest as IndeterminateProps)} />
    );

  let label = props.label ?? '';
  if ('showValueInside' in props) {
    const max = props.max ?? 100;
    label = `${label} ${Math.min(max, props.value)}/${max}`;
  }

  return (
    <div className={styles.progress}>
      {bar}
      {label !== '' && (
        <span className={styles.value} id={'sdfasf'}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Progress;
