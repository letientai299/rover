import { lazy } from 'react';

import { FiMoon, FiSun } from 'react-icons/fi';
import { Button, MDX } from 'src/components';
import { useTheme } from 'src/hooks';
import Nav from 'src/main/docs/Nav';
import { Notes } from 'src/main/docs/notes';
import { Redirect, Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import styles from './Docs.module.scss';

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
    k.includes('mocks'),
  )[0];

  return (
    <Router hook={useHashLocation}>
      <main className={styles.main}>
        <aside>
          <Nav tree={Notes.tree} />
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
