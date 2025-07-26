import type { ReactNode } from 'react';

export interface CardProps {
  data: MyPokemon;
}

export interface CardDetailsProps {
  data: MyPokemon | null;
  isLoading: boolean;
}

export interface MyPokemon {
  id: number;
  name: string;
  image?: string;
  abilities?: string[];
  moves?: string[];
}

interface SearchState {
  query: string;
  isLoading: boolean;
}

export interface SearchControlsProps extends SearchState, EventsForm {}

export interface EventsForm {
  onChange: (query: string) => void;
  onSearch: (query?: string) => void;
}

export type ErrorState = {
  isError: boolean;
};

export interface SearchPanelState extends SearchState {
  results: MyPokemon[];
  error: string | null;
}

export interface CardListProps {
  data: SearchPanelState;
}

export interface Table extends Omit<MyPokemon, 'id'> {
  description?: string;
}

export interface NoResultsProps {
  error: string | null;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

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
  limit?: number;
  offset?: number;
}
