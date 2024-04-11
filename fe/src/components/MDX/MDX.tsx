import './MDX.css';
import { useTheme } from 'src/hooks';

import { ReactElement, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

import mdDarkURL from 'github-markdown-css/github-markdown-dark.css?url';
import mdLightURL from 'github-markdown-css/github-markdown-light.css?url';
import prismDarktURL from 'prism-themes/themes/prism-one-dark.css?url';
import prismLightURL from 'prism-themes/themes/prism-one-light.css?url';


export interface MDXProps {
  children: ReactElement;
}

function MDX(props: MDXProps) {
  const [theme] = useTheme();
  const { children } = props;
  return (
    <article className={'markdown-body'}>
      {theme === 'dark' ? (
        <Helmet async={true}>
          <link
            rel={'stylesheet'}
            type={'text/css'}
            href={mdDarkURL}
          />
          <link
            rel={'stylesheet'}
            type={'text/css'}
            href={prismDarktURL}
          />
          <meta name="color-scheme" content="dark" />
        </Helmet>
      ) : (
        <Helmet>
          <link
            rel={'stylesheet'}
            type={'text/css'}
            href={mdLightURL}
          />
          <link
            rel={'stylesheet'}
            type={'text/css'}
            href={prismLightURL}
          />
          <meta name="color-scheme" content="light" />
        </Helmet>
      )}

      <Suspense>{children}</Suspense>
    </article>
  );
}

export default MDX;
