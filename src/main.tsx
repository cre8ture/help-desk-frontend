import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './Router' // Import AppRouter instead of App
import './index.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <AppRouter /> {/* Render AppRouter instead of App */}
    </Theme>
  </React.StrictMode>,
)