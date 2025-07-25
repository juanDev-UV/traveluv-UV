import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GoogleMapsProvider from './components/GoogleMapsProvider'; // ⬅️ el que creamos

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleMapsProvider> {/* ⬅️ aquí envolvemos todo */}
      <App />
    </GoogleMapsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
