import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const adEngineLoaderScript = document.createElement('script');
adEngineLoaderScript.defer = true;
adEngineLoaderScript.src = 'https://services.fandom.com/icbm/api/loader?app=f2';

document.getElementsByTagName('body')[0].appendChild(adEngineLoaderScript);

root.render(
  // <React.StrictMode> Strict mode renders the component twice in dev causes weird issues
    <App />
  // </React.StrictMode>
);
