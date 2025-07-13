import React from 'react';
import type { SearchControlsProps } from '../../../types/interfaces';

class SearchControls extends React.Component<SearchControlsProps> {
  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="search-input"
          type="text"
          name="search"
          value={this.props.query}
          onChange={this.handleChange}
          placeholder="Enter your search term"
          disabled={this.props.isLoading}
        />
        <button type="submit" disabled={this.props.isLoading}>
          {this.props.isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    );
  }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.onSearch();
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(event.target.value);
  };
}

export default SearchControls;
