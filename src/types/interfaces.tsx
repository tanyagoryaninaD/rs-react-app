import type { ReactNode } from 'react';

interface OnUpdateState {
  onUpdateState: (newState: Partial<SearchPanelState>) => void;
}

export interface CardDetailsProps extends OnUpdateState {
  details: string | null;
}

export interface CardProps extends OnUpdateState {
  data: MyPokemon;
}

export interface CardDetailsState {
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

export interface SearchControlsProps
  extends SearchState,
    Pick<CardListProps, 'onSearch'> {
  onChange: (query: string) => void;
}

export type ErrorState = {
  isError: boolean;
};

export interface SearchPanelState extends SearchState {
  results: MyPokemon[];
  error: string | null;
  page: number | null;
  details: string | null;
}
export interface PaginationProps
  extends OnUpdateState,
    Pick<SearchPanelState, 'page'> {
  onSearch: (data: GetPokemon) => Promise<void>;
}

export interface CardListProps extends Omit<PaginationProps, 'page'> {
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
  page?: number;
}
