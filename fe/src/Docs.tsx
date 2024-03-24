import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Link, Redirect, Route, Router, Switch } from 'wouter';
import { MDX } from '@/components';
import { useHashLocation } from 'wouter/use-hash-location';


const files = import.meta.glob('./**/*.md*');

const docsMap = new Map(
  [...Object.entries(files)].map(([k, v]) => [k.replace('.', '#'), v]),
);


function Nav() {
  const links = Array.from(docsMap.keys()).map(s => {
    return <li key={s}><Link to={s}>{s}</Link></li>;
  });

  return <nav style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minHeight: '100svh',
    borderRight: '1px solid lightgray',
    overflow: 'hidden',
  }}>
    <ul style={{ overflow: 'scroll', listStyle: 'none', margin: 0, padding: 4 }}>
      {links}
    </ul>
  </nav>;
}

export const Docs = () => {
  return <Router hook={useHashLocation}>
    <main style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
      <Nav />
      <Switch>
        {[...docsMap.entries()].map(([k, v]) => {
          const Elem = lazy(v as never);
          const path = k.replace('#', '');
          return (
            <Route path={path} key={k}>
              <MDX><Elem /></MDX>
            </Route>
          );
        })}

        <Route path={'/'}>
          <Redirect to={'/utils/util.mdx'} />
        </Route>
      </Switch>
    </main>
  </Router>;
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Docs />
  </React.StrictMode>,
);
