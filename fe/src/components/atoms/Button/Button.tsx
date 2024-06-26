import { Icon } from 'src/components/atoms/Icon.tsx';
import { cx } from 'src/utils';

import {
  ButtonHTMLAttributes,
  forwardRef,
  KeyboardEvent,
  PropsWithChildren,
  Ref,
  useState,
} from 'react';
import styles from './Button.module.scss';

export interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'ghost' | 'outline' | 'filled';
  kind?: 'normal' | 'primary' | 'danger';
  icon?: Icon;
  iconPosition?: 'start' | 'end';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { children, className, icon, iconPosition, variant, kind, ...rest } =
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
      'data-variant': variant,
      'data-kind': kind,
      ...(pressed && { 'data-active': {} }),
    };

    return (
      <button
        ref={ref}
        {...rest}
        className={cx(
          styles.button,
          variant === 'filled' ? styles.filled : styles.unfilled,
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
  },
);

export default Button;
