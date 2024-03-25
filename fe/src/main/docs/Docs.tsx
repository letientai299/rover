import { Button, MDX } from '@/components';
import { lazy } from 'react';
import { Link, Redirect, Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import { FiMoon, FiSun } from 'react-icons/fi';
import styles from './docs.module.css';
import { useTheme } from '@/hooks';

const files = import.meta.glob('../../**/*.md*');

const docsMap = new Map(
  [...Object.entries(files)].map(([k, v]) => [k.replace('../..', 'docs'), v]),
);

function ThemeButton() {
  const [isDark, toggle] = useTheme();

  return (
    <Button
      icon={isDark ? FiMoon : FiSun}
      onClick={() => toggle()}
    >
      {isDark ? 'Light mode' : 'Dark mode'}
    </Button>
  );
}

function Nav() {
  const links = Array.from(docsMap.keys()).map((s) => {
    return (
      <li key={s}>
        <Link to={s}>{s}</Link>
      </li>
    );
  });

  return (
    <nav>
      <ul>
        {links}
      </ul>
    </nav>
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
