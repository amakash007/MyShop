import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Ensure this is correctly imported
import { StrictMode } from 'react';
import './index.css';
import App from './App.jsx';
import ShopContextProvider from './context/ShopContext.jsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in the DOM.");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>
);
