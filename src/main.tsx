import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './app/App.tsx';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(<App />);
