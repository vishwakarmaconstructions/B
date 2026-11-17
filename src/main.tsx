import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress ResizeObserver loop limit exceeded error
// This error is often benign and triggered by sub-pixel layout shifts during animations or interactions
if (typeof window !== 'undefined') {
  const resizeObserverError = 'ResizeObserver loop completed with undelivered notifications.';
  const resizeObserverLimitError = 'ResizeObserver loop limit exceeded';
  
  const originalError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (message === resizeObserverError || message === resizeObserverLimitError) {
      return true;
    }
    if (originalError) {
      return originalError(message, source, lineno, colno, error);
    }
    return false;
  };

  window.addEventListener('error', (e) => {
    if (e.message === resizeObserverError || e.message === resizeObserverLimitError) {
      e.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
