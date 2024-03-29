import { Button, MDX } from '@/components';
import { useTheme } from '@/hooks';
import { docsMap } from '@/main/docs/docsMap.ts';
import Nav from '@/main/docs/Nav.tsx';
import { lazy } from 'react';

import { FiMoon, FiSun } from 'react-icons/fi';
import { Redirect, Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import styles from './docs.module.scss';

function ThemeButton() {
  const [isDark, toggle] = useTheme();

  return (
    <Button icon={isDark ? FiMoon : FiSun} onClick={() => toggle()}>
      {isDark ? 'Light mode' : 'Dark mode'}
    </Button>
  );
}

export const Docs = () => {
  const defaultPage = [...docsMap.keys()].filter((k) =>
    k.includes('Button'),
  )[0];

  return (
    <Router hook={useHashLocation}>
      <main className={styles.main}>
        <aside>
          <Nav />
          <ThemeButton />
        </aside>
        <article className={styles.content}>
          <Switch>
            {[...docsMap.entries()].map(([k, v]) => {
              const Elem = lazy(v as never);
              const path = k.replace('#', '');
              return (
                <Route path={path} key={k}>
                  <MDX>
                    <Elem />
                  </MDX>
                </Route>
              );
            })}

            <Route path={'/'}>
              <Redirect to={defaultPage} />
            </Route>
          </Switch>
        </article>
      </main>
    </Router>
  );
};
