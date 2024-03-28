import Button, { ButtonProps } from '@/components/Button/Button.tsx';
import styles from './button.module.scss';

export type IconButtonProps = Required<Pick<ButtonProps, 'icon'>> &
  Omit<ButtonProps, 'children' | 'iconPosition' | 'icon'>;

const IconButton = (props: IconButtonProps) => {
  return <Button {...props} className={styles.iconButton} />;
};

export default IconButton;
