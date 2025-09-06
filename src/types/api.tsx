import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';

export type GetPokemonByPage = NamedApiResourceList<Pokemon> | Pokemon;

export interface GetPokemon {
  query?: string;
  page?: number;
}

export interface ApiRequest {
  apiRequest?: string | null;
  offset?: number;
}
