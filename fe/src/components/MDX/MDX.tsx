import './MDX.css';
import { ReactElement, Suspense } from 'react';

interface MDXProps {
  children: ReactElement;
}

function MDX(props: MDXProps) {
  const { children } = props;
  return (
    <article className={'markdown-body'}>
      <Suspense>
        {children}
      </Suspense>
    </article>
  );
}

export default MDX;
