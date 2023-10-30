import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import customTheme from './styles/theme.ts';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
