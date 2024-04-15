import { HTMLAttributes, PropsWithChildren } from 'react';

interface ShellProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export function Shell(props: ShellProps) {
  const { children, style, ...rest } = props;
  const combinedStyle = {
    ...style,
    ...{
      display: 'flex',
      flexGrow: 1,
      minHeight: 0,
    },
  };

  return (
    <div style={combinedStyle} {...rest}>
      {children}
    </div>
  );
}
