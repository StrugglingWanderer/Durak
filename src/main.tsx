import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from 'styled';
import { ErrorBoundary } from 'components';
import { StateProvider } from 'contexts/StateContext';
import App from '@/App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <ErrorBoundary>
      <GlobalStyle />

      <StateProvider>
        <App />
      </StateProvider>
    </ErrorBoundary>
  </StrictMode>,
);
