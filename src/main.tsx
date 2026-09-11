import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Production Best Practices: Suppress third-party deprecation warnings and non-fatal console leaks
if (import.meta.env.PROD) {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args: any[]) => {
    const msg = args[0] ? String(args[0]) : '';
    if (
      msg.includes('deprecated') ||
      msg.includes('DOMNodeInserted') ||
      msg.includes('[SafeDataWrapper]') ||
      msg.includes('YouTube API error') ||
      msg.includes('Failed to fetch')
    ) {
      return;
    }
    originalWarn(...args);
  };

  console.error = (...args: any[]) => {
    const msg = args[0] ? String(args[0]) : '';
    if (
      msg.includes('Failed loading own videos') ||
      msg.includes('Failed loading trending ideas') ||
      msg.includes('Filter fetch error') ||
      msg.includes('Error loading')
    ) {
      return;
    }
    originalError(...args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);

