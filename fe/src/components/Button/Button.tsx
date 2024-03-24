import styles from './button.module.css';

import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { cx } from '@/utils';

export interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variation?: 'ghost' | 'outline';
  kind?: 'normal' | 'primary' | 'danger';
  icon?: IconType;
  iconPosition?: 'start' | 'end';
}

const Button = (props: ButtonProps) => {
  const { children, className, icon, iconPosition, variation, kind, ...rest } =
    props;
  const pos = iconPosition ?? 'start';
  const Icon = icon;

  return (
    <button
      {...rest}
      className={cx(className, styles.button)}
      data-variation={variation}
      data-kind={kind}
    >
      {pos === 'start' && Icon && <Icon className={styles.icon} />}
      {children}
      {pos === 'end' && Icon && <Icon className={styles.icon} />}
    </button>
  );
};

export default Button;
