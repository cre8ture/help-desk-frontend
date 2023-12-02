import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router';
import { MyContextProvider } from './utils/Context'; // Import your context provider
import './App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {/* Wrap your router with the context provider */}
      <MyContextProvider>
        <AppRouter />
      </MyContextProvider>
  </React.StrictMode>,
);
