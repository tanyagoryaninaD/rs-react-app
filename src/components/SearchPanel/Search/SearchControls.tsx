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

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Sent:', this.state.search);
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };
}

export default SearchControls;
