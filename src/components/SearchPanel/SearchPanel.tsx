import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchControls } from './Search/SearchControls';
import { CardList } from './CardList/CardList';
import type { SearchPanelState } from '../../types/interfaces';
import { GenerateError } from './Error/GenerateError';
import { getPokemon } from '../../server/Loader';

export function SearchPanel() {
  const getLocalStorage = useCallback((): SearchPanelState => {
    const data = window.localStorage.getItem('tg-last-search');

    if (data) {
      const parsed: SearchPanelState = JSON.parse(data);
      return parsed;
    }

    return {
      query: '',
      results: [],
      isLoading: false,
      error: '',
    };
  }, []);

  const [state, setState] = useState<SearchPanelState>(getLocalStorage());

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
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        setState((prevState) => ({
          ...prevState,
          results: [],
          error: error.message,
          isLoading: false,
        }));
      }
    }
  }, [state.query]);

  const handleQueryChange = (query: string): void => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
  };

  const setLocalStorage = useCallback((): void => {
    const json = JSON.stringify(state);
    window.localStorage.setItem('tg-last-search', json);
  }, [state]);

  const firstRender = useRef(false);

  useEffect(() => {
    if (!firstRender.current) {
      const data = getLocalStorage();

      setState((prevState) => ({
        ...prevState,
        ...data,
      }));

      loadPokemon();

      firstRender.current = true;
    }
  }, [getLocalStorage, loadPokemon]);

  useEffect(() => {
    setLocalStorage();
  }, [state, setLocalStorage]);

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
