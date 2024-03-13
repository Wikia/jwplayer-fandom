import React from 'react';
import ReactDOM from 'react-dom/client';
import { recordOnce } from '@fandom/tracking-metrics/timing/timings';

import App from './App';

// simulate the event that is triggered by the client (e.g. UCP)
recordOnce('featured-video-init');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
