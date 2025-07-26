import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchControls } from './Search/SearchControls';
import { CardList } from './CardList/CardList';
import type { SearchPanelState } from '../../types/interfaces';
import { GenerateError } from './Error/GenerateError';
import { getPokemon } from '../../server/Loader';
import { useLocalStorage } from '../../utils/localStorage';

export function SearchPanel() {
  const [stateStorage, setStateStorage] = useLocalStorage<SearchPanelState>(
    'tg-last-search',
    {
      query: '',
      results: [],
      error: null,
      isLoading: false,
    }
  );

  const [state, setState] = useState<SearchPanelState>(stateStorage);

  const loadPokemon = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const data = await getPokemon({ query: state.query });

      setState((prevState) => ({
        ...prevState,
        results: data,
        error: null,
        isLoading: false,
      }));

      setStateStorage(state);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        setState((prevState) => ({
          ...prevState,
          results: [],
          error: error.message,
          isLoading: false,
        }));

        setStateStorage(state);
      }
    }
  }, [setStateStorage, state]);

  const handleQueryChange = (query: string): void => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
  };

  const firstRender = useRef(false);

  useEffect(() => {
    if (!firstRender.current) {
      setState((prevState) => ({
        ...prevState,
        ...stateStorage,
      }));

      loadPokemon();

      firstRender.current = true;
    }
  }, [loadPokemon, stateStorage]);

  return (
    <div>
      <SearchControls
        query={state.query}
        isLoading={state.isLoading}
        onSearch={loadPokemon}
        onChange={handleQueryChange}
      />
      <CardList
        results={state.results}
        isLoading={state.isLoading}
        error={state.error}
      />
      <GenerateError />
    </div>
  );
}
