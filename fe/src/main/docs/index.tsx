import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Docs } from 'src/main/docs/Docs.tsx';

import 'src/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Docs />
    </HelmetProvider>
  </React.StrictMode>,
);
