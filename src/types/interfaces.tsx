export interface CardProps {
  key: number;
  data: MyPokemon;
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

export interface SearchControlsProps extends SearchState {
  setLocalStorage: () => void;
  onSearch: (data: MyPokemon[] | Error) => void;
  onChange: (query: string) => void;
}

export interface CardListProps extends SearchErrorProps {
  results: MyPokemon[];
}

export interface SearchErrorProps {
  error: string | null;
}

export interface AppsState
  extends SearchState,
    CardListProps,
    SearchErrorProps {}

export interface Table extends Omit<MyPokemon, 'id'> {
  description?: string;
}
