import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = ''; // Leave this empty to use the same host as the frontend.

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
