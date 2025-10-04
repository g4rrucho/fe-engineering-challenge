import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './index.css';
import App from './App.tsx';
import { queryClient } from '@/lib/queryClient.ts';
import { PokedexProvider } from '@/contexts/PokedexContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/fe-engineering-challenge/">
      <QueryClientProvider client={queryClient}>
        <PokedexProvider>
          <App />
        </PokedexProvider>
        {import.meta.env.VITE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
