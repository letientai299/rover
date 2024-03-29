import { Docs } from '@/main/docs/Docs.tsx';

import '@/styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Docs />
    </HelmetProvider>
  </React.StrictMode>,
);
