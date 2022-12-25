import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCFY2AiOiV9jTaHml9s7TC8IM2BRFgZrVk',
  authDomain: 'slayinterest.firebaseapp.com',
  projectId: 'slayinterest',
  storageBucket: 'slayinterest.appspot.com',
  messagingSenderId: '88321934137',
  appId: '1:88321934137:web:9d65f52a357dea14351ee8',
  measurementId: 'G-TQWYBM5PSG',
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
