import { Button, MDX } from '@/components';
import { useTheme } from '@/hooks';
import Nav from '@/main/docs/Nav';
import { Notes } from '@/main/docs/notes';
import { lazy } from 'react';

import { FiMoon, FiSun } from 'react-icons/fi';
import { Redirect, Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import styles from './docs.module.scss';

function ThemeButton() {
  const [theme, toggle] = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button icon={isDark ? FiMoon : FiSun} onClick={() => toggle()}>
      {isDark ? 'Light mode' : 'Dark mode'}
    </Button>
  );
}

export const Docs = () => {
  const defaultPage = [...Notes.map.keys()].filter((k) =>
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
            {[...Notes.map.entries()].map(([k, v]) => {
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
