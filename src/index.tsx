import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import './configs/localization/i18n';

import NavigationProvider from './contexts/navigation';
import LanguageProvider from './contexts/localization';
import AuthProvider from './contexts/auth';
import LoadingIndicator from './components/loading/loading';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          <LanguageProvider>
            <Suspense fallback={<LoadingIndicator />}>
                <App />
            </Suspense>
          </LanguageProvider>
        </NavigationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
