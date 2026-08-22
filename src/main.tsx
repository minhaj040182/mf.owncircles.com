import {StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const staticPage = document.getElementById('static-page')!;
hydrateRoot(staticPage,
  <StrictMode>
    <App initialPath={staticPage.dataset.path || window.location.pathname} />
  </StrictMode>,
);
