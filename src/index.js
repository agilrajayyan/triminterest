import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAjVUOx3Sf74Ft-8qPlEbJkgzLxpaA9xMk',
  authDomain: 'triminterest.firebaseapp.com',
  projectId: 'triminterest',
  storageBucket: 'triminterest.appspot.com',
  messagingSenderId: '198124821997',
  appId: '1:198124821997:web:76c701ef8940d0d2e45be4',
  measurementId: 'G-ZRKY1BSMTB',
};
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
