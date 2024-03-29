import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

type DemoBoxProps = PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>;

function DemoBox(props: DemoBoxProps) {
  const { style, children, ...rest } = props;
  return (
    <div
      style={{
        width: '100%',
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

export default DemoBox;
