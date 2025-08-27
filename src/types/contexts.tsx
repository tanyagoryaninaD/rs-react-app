import React from 'react';
import type { PokemonListContextProps, ThemeContextProps } from './interfaces';

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: 'light',
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
  error: null,
  updateContext: () => {},
});
