import { NodeIconProps, TreeNode } from '@/components/Tree/types.ts';
import { IconButton } from '@/components';
import { match } from 'ts-pattern';

import styles from '@/components/Tree/tree.module.scss';

const DefaultNodeIcon = <T extends TreeNode>({
  reveal,
  toggleReveal,
}: NodeIconProps<T>) => {
  return (
    <IconButton
      icon={match(reveal)
        .with('open', () => Sub)
        .with('close', () => Add)
        .with('loading', () => Loader)
        .exhaustive()}
      className={styles.prefix}
      onClick={toggleReveal}
      disabled={reveal === 'loading'}
    />
  );
};

const Add = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-plus-circle"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );
};

const Sub = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-minus-circle"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );
};

const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-loader-circle"
      style={{
        animationName: 'spin',
        animationDuration: '500ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export default DefaultNodeIcon;
