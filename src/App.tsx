import type { ReactNode } from 'react';
import ErrorBoundary from './components/SearchPanel/Error/ErrorBoundary';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import './styles/App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { About } from './components/About/About';
import { NotFound } from './components/NotFound/NotFound';
import { Main } from './components/Main';

export function App(): ReactNode {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<SearchPanel />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFound />} />\
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}
