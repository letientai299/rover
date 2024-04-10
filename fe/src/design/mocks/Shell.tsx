import { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';

interface ShellProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export function Shell(props: ShellProps) {
  const { children, style, ...rest } = props;
  const combinedStyle = Object.assign(style ?? {}, {
    display: 'flex',
    flexGrow: 1,
    minHeight: 0,
  } as CSSProperties);

  return (
    <div style={combinedStyle} {...rest}>
      {props.children}
    </div>
  );
}
