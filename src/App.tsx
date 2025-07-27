import type { ReactNode } from 'react';
import { Header } from './components/Header';
import ErrorBoundary from './components/SearchPanel/Error/ErrorBoundary';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import './styles/App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { About } from './components/About/About';
import { NotFound } from './components/NotFound/NotFound';
import { CardDetails } from './components/SearchPanel/CardList/CardDetails';

export function App(): ReactNode {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<SearchPanel />} />
            <Route path="/pokemon/page/:page" element={<SearchPanel />}>
              <Route path="details/:details" element={<CardDetails />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}
