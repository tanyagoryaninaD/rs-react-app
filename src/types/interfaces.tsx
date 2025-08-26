import type { ReactNode } from 'react';
import type { Theme } from './types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from 'vitest';

export interface CardProps {
  name: string;
}

export interface CardDetailsState {
  data: MyPokemon;
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

export interface MyPokemon {
  id: number;
  name: string;
  image?: string;
  abilities?: string[];
  moves?: string[];
}

export interface Table extends Omit<MyPokemon, 'id'> {
  description?: string;
}

export type ErrorState = {
  isError: boolean;
};

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export interface GetPokemon {
  query?: string;
  page?: number;
}

export interface MyStore {
  selectedItems: MyPokemon[];
}

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
  loadingButtonSearch?: boolean;
}

export interface PokemonListContextProps extends PokemonListContextState {
  updateContext: (data: Partial<PokemonListContextState>) => void;
}

export interface ApiRequest {
  apiRequest?: string | null;
  offset?: number;
}
