import { THEMES } from '../utils/constants';
import { ApiRequest } from './api';
import { MyPokemon } from './pokemon-components';

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export interface PokemonListContextState {
  query: string;
  currentApiRequest: ApiRequest | null;
  results: MyPokemon[];
  page: number | null;
  pageNext: string | null;
  pagePrev: string | null;
  details: string | null;
  error: string | null;
  loading: boolean;
}

export interface PokemonListContextProps extends PokemonListContextState {
  updateContext: (data: Partial<PokemonListContextState>) => void;
}
