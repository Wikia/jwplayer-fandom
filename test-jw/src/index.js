import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> Strict mode renders the component twice in dev causes weird issues
    <App />
  // </React.StrictMode>
);
