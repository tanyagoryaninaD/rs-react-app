import Header from './components/Header';
import ErrorBoundary from './components/SearchPanel/Error/ErrorBoundary';
import SearchPanel from './components/SearchPanel/SearchPanel';
import './styles/App.css';
import React from 'react';

class App extends React.Component {
  public render() {
    return (
      <>
        <ErrorBoundary>
          <Header />
          <SearchPanel />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
