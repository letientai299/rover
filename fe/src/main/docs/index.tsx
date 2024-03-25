import React from 'react';
import ReactDOM from 'react-dom/client';
import { Docs } from '@/main/docs/Docs.tsx';

import '../../styles/index.css';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Docs />
    </HelmetProvider>
  </React.StrictMode>,
);
