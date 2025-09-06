import React from 'react';
import type {
  PokemonListContextProps,
  ThemeContextProps,
} from '../types/interfaces';
import { THEMES } from './constants';

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: THEMES.LIGHT,
  toggleTheme: () => {},
});

export const PokemonListContext = React.createContext<PokemonListContextProps>({
  query: '',
  currentApiRequest: null,
  results: [],
  page: null,
  pageNext: null,
  pagePrev: null,
  details: null,
  loading: false,
  error: null,
  updateContext: () => {},
});
