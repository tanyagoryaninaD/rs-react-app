import React from 'react';
import type { SearchState } from '../../../types/types';

class SearchControls extends React.Component<
  Record<string, never>,
  SearchState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { search: '' };
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Enter your search term"
        />
        <button type="submit">Search</button>
      </form>
    );
  }

  public componentDidMount(): void {
    const data = window.localStorage.getItem('tg-last-search');

    if (data) {
      this.setState({ search: data });
    }
  }

  private setLocalStorage(): void {
    window.localStorage.setItem('tg-last-search', this.state.search);
  }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.setLocalStorage();
    console.log('Sent:', this.state.search);
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: event.target.value });
  };
}

export default SearchControls;
