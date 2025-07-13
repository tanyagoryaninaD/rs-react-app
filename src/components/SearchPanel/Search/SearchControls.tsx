import React from 'react';
import Loader from '../../../server/Loader';
import type { SearchControlsProps } from '../../../types/interfaces';
import { parsePokemonData } from '../../../utils/helpers';

class SearchControls extends React.Component<SearchControlsProps> {
  private readonly server: Loader;

  constructor(props: SearchControlsProps) {
    super(props);
    this.server = Loader.getInstance();
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="search__input"
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

  private handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    this.props.setLocalStorage();

    try {
      const response = await this.server.getResult(this.props.query);

      response.json().then((data) => {
        console.log(parsePokemonData(data.results));
        this.props.onSearch(data);
      });
    } catch {
      console.error('Ooops. Not found');
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(event.target.value);
  };
}

export default SearchControls;
