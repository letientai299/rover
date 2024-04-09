import { IconButton } from '@/components';
import { cx } from '@/utils';
import { DivAttributes } from '@/utils/types.ts';
import { createContext, ReactElement, useContext, useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import styles from './Accordion.module.scss';

interface RootProps extends Omit<DivAttributes, 'children'> {
  open?: boolean;
  children: [ReactElement<HeaderProps>, ReactElement<BodyProps>];
}

const OpenContext = createContext<{ open: boolean; toggle: () => void } | null>(
  null,
);

const Root = (props: RootProps) => {
  const { children, open = false, className, ...rest } = props;
  const [opening, setOpening] = useState(open);
  const toggle = () => setOpening((v) => !v);
  const [header, body] = children;
  return (
    <OpenContext.Provider value={{ open: opening, toggle: toggle }}>
      <div className={cx(styles.accordion, className)} {...rest}>
        {header}
        {opening && body}
      </div>
    </OpenContext.Provider>
  );
};

interface HeaderProps extends DivAttributes {}

const Header = (props: HeaderProps) => {
  const { children, className, ...rest } = props;
  const { open, toggle } = useContext(OpenContext)!;
  const Icon = open ? FiChevronDown : FiChevronRight;

  const arrow = (
    <IconButton icon={Icon} className={styles.arrow} onClick={toggle} />
  );

  return (
    <div className={cx(styles.header, className)} {...rest}>
      {children}
      {arrow}
    </div>
  );
};

interface BodyProps extends DivAttributes {}

const Body = (props: BodyProps) => {
  const { className, children, ...rest } = props;
  return (
    <div className={cx(styles.body, className)} {...rest}>
      {children}
    </div>
  );
};

export const Accordion = { Root, Header, Body };
export default Accordion;
