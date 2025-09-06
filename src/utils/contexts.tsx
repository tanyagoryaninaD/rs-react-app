import React from 'react';
import { THEMES } from './constants';
import { ThemeContextProps, PokemonListContextProps } from '../types/context';

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
