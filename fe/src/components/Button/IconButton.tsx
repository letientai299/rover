import Button, { ButtonProps } from '@/components/Button/Button.tsx';

export type IconButtonProps = Omit<ButtonProps, 'children' | 'iconPosition'>;

const IconButton = (props: IconButtonProps) => {
  return <Button {...props} />;
};

export default IconButton;
