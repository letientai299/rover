import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

type BoxProps = PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>;

function Box(props: BoxProps) {
  const { style, children, ...rest } = props;
  return (
    <div
      style={{
        display: 'flex',
        minHeight: `var(--sizes-8)`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Box;
