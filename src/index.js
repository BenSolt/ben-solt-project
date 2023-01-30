import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppNew from './AppNew';

import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AppNew />
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals(sendToVercelAnalytics);
