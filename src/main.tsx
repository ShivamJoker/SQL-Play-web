import React from 'react';
import ReactDOM from 'react-dom';
import '@styles/index.scss';
import App from '@components/App';
import { AppProvider } from '@contexts/AppContext';
import { registerSW } from 'virtual:pwa-register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './utils/db';

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
      <ToastContainer />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
