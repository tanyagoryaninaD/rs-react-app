export interface SearchResult {
  name: string;
  image: string;
}

interface SearchState {
  query: string;
  isLoading: boolean;
}

export interface SearchControlsProps extends SearchState {
  setLocalStorage: () => void;
  onSearch: (data: SearchResult[] | Error) => void;
  onChange: (query: string) => void;
}

export interface CardListProps {
  results: SearchResult[];
}

export interface SearchErrorProps {
  error: string | null;
}

export interface AppsState
  extends SearchState,
    CardListProps,
    SearchErrorProps {}
