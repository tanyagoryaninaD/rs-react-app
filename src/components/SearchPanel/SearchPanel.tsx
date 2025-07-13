import React from 'react';
import SearchControls from './Search/SearchControls';
import SearchError from './Error/SearchError';
import CardList from './CardList/CardList';
import type { AppsState, SearchResult } from '../../types/interfaces';

class SearchPanel extends React.Component<Record<string, never>, AppsState> {
  state: AppsState;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      query: '',
      results: [],
      error: null,
      isLoading: false,
    };
  }

  public componentDidMount(): void {
    const data = window.localStorage.getItem('tg-last-search');

    if (data) {
      const parse: AppsState = JSON.parse(data);
      this.setState(parse);
    }
  }

  public render() {
    return (
      <div>
        <SearchControls
          query={this.state.query}
          isLoading={this.state.isLoading}
          setLocalStorage={this.setLocalStorage}
          onSearch={this.handleSearch}
          onChange={this.handleQueryChange}
        />
        <CardList results={this.state.results} />
        <SearchError error={this.state.error} />
      </div>
    );
  }

  private setLocalStorage(): void {
    //window.localStorage.setItem('tg-last-search', JSON.stringify(this.state));
  }

  private handleSearch = (results: SearchResult[] | Error): void => {
    if (results instanceof Error) {
      this.setState({ results: [], error: results.message, isLoading: false });
    } else {
      this.setState({ results, error: null, isLoading: false });
    }
  };

  private handleQueryChange = (query: string): void => {
    this.setState({ query });
  };
}

export default SearchPanel;
