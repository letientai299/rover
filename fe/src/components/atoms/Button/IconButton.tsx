import Button, { ButtonProps } from '@/components/atoms/Button/Button.tsx';
import { cx } from '@/utils';
import styles from './button.module.scss';

export type IconButtonProps = Required<Pick<ButtonProps, 'icon'>> &
  Omit<ButtonProps, 'children' | 'iconPosition' | 'icon'>;

const IconButton = (props: IconButtonProps) => {
  const { className, icon, ...rest } = props;
  const Icon = icon;
  return (
    <Button {...rest} className={cx(styles.iconButton, className)}>
      <Icon />
    </Button>
  );
};

export default IconButton;
