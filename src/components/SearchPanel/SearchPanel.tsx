import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchControls } from './Search/SearchControls';
import { CardList } from './CardList/CardList';
import type { GetPokemon, SearchPanelState } from '../../types/interfaces';
import { GenerateError } from './Error/GenerateError';
import { getPokemon } from '../../server/Loader';
import { useLocalStorage } from '../../utils/localStorage';
import { useSearchParams } from 'react-router-dom';

export function SearchPanel() {
  const firstRender = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const details = searchParams.get('details');

  const [stateStorage, setStateStorage] = useLocalStorage<SearchPanelState>(
    'tg-last-search',
    {
      query: '',
      results: [],
      error: null,
      isLoading: false,
      page: null,
      details: details,
    }
  );

  const [state, setState] = useState<SearchPanelState>(stateStorage);

  const updateSearchPanelState = useCallback(
    (newState: Partial<SearchPanelState>) => {
      setState((prevState) => ({
        ...prevState,
        ...newState,
      }));

      if (newState.details) {
        searchParams.set('details', newState.details);
      }

      if (newState.details === null) {
        searchParams.delete('details');
      }

      if (newState.page) {
        searchParams.set('page', newState.page.toString());
      }

      if (newState.page === null) {
        searchParams.delete('page');
      }

      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const loadPokemon = useCallback(
    async (dataRequest: GetPokemon): Promise<void> => {
      try {
        updateSearchPanelState({
          query: dataRequest.query || '',
          isLoading: true,
        });

        const newPage =
          !dataRequest.query && dataRequest.page
            ? dataRequest.page
            : dataRequest.query
              ? null
              : currentPage;

        const data = await getPokemon({
          query: dataRequest.query,
          page: newPage ?? undefined,
        });

        if (data.length === 0) {
          throw new Error('No results found');
        }

        const newState = {
          results: data,
          error: null,
          isLoading: false,
          page: dataRequest.page ?? newPage,
          details: state.details,
        };

        updateSearchPanelState(newState);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          updateSearchPanelState({
            results: [],
            error: error.message,
            isLoading: false,
            page: null,
            details: state.details,
          });
        }
      }
    },
    [currentPage, state.details, updateSearchPanelState]
  );

  const handleQueryChange = (query: string): void => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
  };

  useEffect(() => {
    if (firstRender.current) {
      return;
    }

    updateSearchPanelState(stateStorage);

    loadPokemon({
      query: state.query,
      page: currentPage,
    });

    firstRender.current = true;
  }, [
    currentPage,
    loadPokemon,
    searchParams,
    state.query,
    stateStorage,
    updateSearchPanelState,
  ]);

  useEffect(() => {
    setStateStorage((prevState) => ({
      ...prevState,
      ...state,
    }));
  }, [setStateStorage, state]);

  return (
    <div>
      <SearchControls
        query={state.query}
        isLoading={state.isLoading}
        onSearch={loadPokemon}
        onChange={handleQueryChange}
      />
      <CardList
        data={state}
        onUpdateState={updateSearchPanelState}
        onSearch={loadPokemon}
      />
      <GenerateError />
    </div>
  );
}
