import React from 'react';
import SearchControls from './Search/SearchControls';
import SearchError from './Error/SearchError';
import CardList from './CardList/CardList';
import type { AppsState, MyPokemon } from '../../types/interfaces';
import Loader from '../../server/Loader';
import type { NamedApiResource, Pokemon } from 'pokeapi-typescript';
import { parsePokemonData } from '../../utils/helpers';

class SearchPanel extends React.Component<Record<string, never>, AppsState> {
  public readonly state: AppsState;
  private readonly server: Loader;

  constructor(props: Record<string, never>) {
    super(props);
    this.server = Loader.getInstance();
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
    } else {
      this.loadPokemon();
    }
  }

  public render() {
    return (
      <div>
        <SearchControls
          query={this.state.query}
          isLoading={this.state.isLoading}
          onSearch={this.loadPokemon}
          onChange={this.handleQueryChange}
        />
        <CardList results={this.state.results} error={this.state.error} />
        <SearchError
          onSearch={this.loadPokemon}
          onChange={this.handleQueryChange}
        />
      </div>
    );
  }

  public loadPokemon = async (query?: string) => {
    try {
      const response = await this.server.getPokemon(query ?? this.state.query);
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

      this.handleSearch(results);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        this.handleSearch(error);
      }
    }
  };

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
