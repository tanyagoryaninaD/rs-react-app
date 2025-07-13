import React from 'react';
import SearchControls from './Search/SearchControls';
import SearchError from './Error/SearchError';
import CardList from './CardList/CardList';
import type { AppsState, MyPokemon } from '../../types/interfaces';

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

    if (data && data !== undefined) {
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
          onSearch={this.handleSearch}
          onChange={this.handleQueryChange}
        />
        <CardList results={this.state.results} error={this.state.error} />
        <SearchError error={this.state.error} />
      </div>
    );
  }

  private setLocalStorage = (): void => {
    const json = JSON.stringify(this.state);
    window.localStorage.setItem('tg-last-search', json);
  };

  private handleSearch = (results: MyPokemon[] | Error): void => {
    this.setState(
      () => {
        if (results instanceof Error) {
          return { results: [], error: results.message, isLoading: false };
        }
        return { results, error: null, isLoading: false };
      },
      () => {
        this.setLocalStorage();
      }
    );
  };

  private handleQueryChange = (query: string): void => {
    this.setState({ query });
  };
}

export default SearchPanel;
