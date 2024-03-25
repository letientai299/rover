import './MDX.css';

import { ReactElement, Suspense } from 'react';
import { useTheme } from '@/hooks';
import { Helmet } from 'react-helmet-async';

interface MDXProps {
  children: ReactElement;
}

function MDX(props: MDXProps) {
  const [isDark] = useTheme();
  const { children } = props;
  return <article className={'markdown-body'}>
    {isDark ?
      <Helmet async={true}>
        <link rel={'stylesheet'} type={'text/css'}
              href={'node_modules/github-markdown-css/github-markdown-dark.css'} />
        <link rel={'stylesheet'} type={'text/css'}
              href={'node_modules/prism-themes/themes/prism-one-dark.css'} />
        <meta name="color-scheme" content="dark" />
      </Helmet>
      :
      <Helmet>
        <link rel={'stylesheet'} type={'text/css'}
              href={'node_modules/github-markdown-css/github-markdown-light.css'} />
        <link rel={'stylesheet'} type={'text/css'}
              href={'node_modules/prism-themes/themes/prism-one-light.css'} />
        <meta name="color-scheme" content="light" />
      </Helmet>
    }

    <Suspense>
      {children}
    </Suspense>
  </article>;
}

export default MDX;
