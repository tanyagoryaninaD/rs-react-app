import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';

export type Theme = 'light' | 'dark';

export type GetPokemonByPage = NamedApiResourceList<Pokemon> | Pokemon;
