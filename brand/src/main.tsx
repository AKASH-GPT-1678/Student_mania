import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { BrandProvider } from './components/context/brandContext..tsx';
createRoot(document.getElementById('root')!).render(
  <BrandProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BrandProvider>

);
