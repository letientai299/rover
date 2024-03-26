import styles from './button.module.css';

import {
  ButtonHTMLAttributes,
  KeyboardEvent,
  PropsWithChildren,
  useState,
} from 'react';
import { IconType } from 'react-icons';
import { cx } from '@/utils';

export interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variation?: 'ghost' | 'outline' | 'filled';
  kind?: 'normal' | 'primary' | 'danger';
  icon?: IconType;
  iconPosition?: 'start' | 'end';
}

const Button = (props: ButtonProps) => {
  const { children, className, icon, iconPosition, variation, kind, ...rest } =
    props;
  const pos = iconPosition ?? 'start';
  const Icon = icon;
  const [pressed, setPressed] = useState(false);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!pressed && (e.code === 'Enter' || e.code === 'Space')) {
      setPressed(true);
    }
    setTimeout(() => {
      setPressed(false);
    }, 200);
  };

  const onKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (pressed && (e.code === 'Enter' || e.code === 'Space')) {
      setPressed(false);
    }
  };

  const dataAttributes = {
    'data-variation': variation,
    'data-kind': kind,
    ...(pressed && { 'data-active': {} }),
  };

  return (
    <button
      {...rest}
      className={cx(
        styles.button,
        variation === 'filled' ? styles.filled : styles.unfilled,
        className,
      )}
      {...dataAttributes}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {pos === 'start' && Icon && <Icon className={styles.icon} />}
      {children}
      {pos === 'end' && Icon && <Icon className={styles.icon} />}
    </button>
  );
};

export default Button;
