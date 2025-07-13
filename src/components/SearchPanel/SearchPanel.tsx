import React from 'react';
import SearchControls from './Search/SearchControls';
import SearchResults from './Results/SearchReasults';
import SearchError from './Error/SearchError';

class SearchPanel extends React.Component {
  public render() {
    return (
      <div>
        <SearchControls></SearchControls>
        <SearchResults></SearchResults>
        <SearchError></SearchError>
      </div>
    );
  }
}

export default SearchPanel;
