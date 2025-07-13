import React from 'react';
import Loader from '../../../server/Loader';
import type { MyPokemon, SearchControlsProps } from '../../../types/interfaces';
import { parsePokemonData } from '../../../utils/helpers';
import type { NamedApiResource, Pokemon } from 'pokeapi-typescript';

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

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.requestToServer();
  };

  private requestToServer = async (): Promise<void> => {
    try {
      const response = await this.server.getPokemon(this.props.query);
      const data = await response.json();
      let results: MyPokemon[] = [];

      if (data.results) {
        const pokemons: Pokemon[] = await Promise.all(
          data.results.map(async (item: NamedApiResource<Pokemon>) => {
            const response = await this.server.getPokemon(item.name);
            return await response.json();
          })
        );

        results = pokemons.map((item) => parsePokemonData(item));
      } else {
        results = [parsePokemonData(data)];
      }

      this.props.onSearch(results);
    } catch (error) {
      if (error instanceof Error) {
        console.log('🚀 ~ SearchControls ~ error:', error);
        this.props.onSearch(error);
      }
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(event.target.value);
  };
}

export default SearchControls;
