import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Navbar } from './components/Navbar';
import axios from 'axios';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.body.classList.add('body');

axios.defaults.baseURL = 'http://localhost:5000';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
