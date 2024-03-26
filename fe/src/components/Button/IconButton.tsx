import Button, { ButtonProps } from '@/components/Button/Button.tsx';
import styles from './button.module.css';

export type IconButtonProps = Omit<ButtonProps, 'children' | 'iconPosition'>;

const IconButton = (props: IconButtonProps) => {
  return <Button {...props} className={styles.iconButton} />;
};

export default IconButton;
