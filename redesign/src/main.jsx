import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './portfolio.css';
import App from './App.jsx';
import './product-journey.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
