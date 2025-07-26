import type { ReactNode } from 'react';
import { Header } from './components/Header';
import ErrorBoundary from './components/SearchPanel/Error/ErrorBoundary';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import './styles/App.css';

export function App(): ReactNode {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <SearchPanel />
      </ErrorBoundary>
    </>
  );
}
