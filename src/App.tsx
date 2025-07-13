import Header from './components/Header';
import SearchPanel from './components/SearchPanel/SearchPanel';
import './styles/App.css';
import React from 'react';

class App extends React.Component {
  public render() {
    return (
      <>
        <Header></Header>
        <SearchPanel></SearchPanel>
      </>
    );
  }
}

export default App;
