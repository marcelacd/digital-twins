import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const APS_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ODhkMzMyNS01MDAxLTQ1YTYtOGQ3Mi1iY2JhYTRiNzViZTciLCJpZCI6MjM4OTAzLCJpYXQiOjE3MjUzODMyODl9.8Wx-CjJuTtlNyuEHzVnGPvrFiCANy-Io6cKMR3FTmQQ';

const root = ReactDOM.createRoot(document.getElementById('root'));
if (!APS_ACCESS_TOKEN) {
    root.render(<div>Por favor especifique el <code>APS_ACCESS_TOKEN</code></div>);
} else {
    root.render(<App token={APS_ACCESS_TOKEN} />);
}
