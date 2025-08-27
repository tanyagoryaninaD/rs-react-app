import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';
import type store from '../store/store';

export type Theme = 'light' | 'dark';

export type GetPokemonByPage = NamedApiResourceList<Pokemon> | Pokemon;

export type RootState = ReturnType<typeof store.getState>;
