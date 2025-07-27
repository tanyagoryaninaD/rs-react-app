import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchControls } from './Search/SearchControls';
import { CardList } from './CardList/CardList';
import type { GetPokemon, SearchPanelState } from '../../types/interfaces';
import { GenerateError } from './Error/GenerateError';
import { getPokemon } from '../../server/Loader';
import { useLocalStorage } from '../../utils/localStorage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from './CardList/Pagination';

export function SearchPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const [stateStorage, setStateStorage] = useLocalStorage<SearchPanelState>(
    'tg-last-search',
    {
      query: '',
      results: [],
      error: null,
      isLoading: false,
      page: page,
    }
  );

  const [state, setState] = useState<SearchPanelState>(stateStorage);
  const navigator = useNavigate();

  const loadPokemon = useCallback(
    async (dataRequest: GetPokemon): Promise<void> => {
      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));

        const data = await getPokemon(dataRequest);

        setState((prevState) => ({
          ...prevState,
          results: data,
          error: null,
          isLoading: false,
          page: dataRequest.page ?? prevState.page,
        }));

        setStateStorage((prevState) => ({
          ...prevState,
          results: data,
          error: null,
          isLoading: false,
          page: dataRequest.page ?? prevState.page,
        }));

        setSearchParams(`?page=${state.page}`);
        navigator(`/pokemon/`, { replace: true });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          setState((prevState) => ({
            ...prevState,
            results: [],
            error: error.message,
            isLoading: false,
            page: 1,
          }));

          setStateStorage((prevState) => ({
            ...prevState,
            results: [],
            error: error.message,
            isLoading: false,
            page: 1,
          }));
        }
      }
    },
    [navigator, setSearchParams, setStateStorage, state]
  );

  const handleQueryChange = (query: string): void => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
  };

  const updateSearchPanelState = (newState: Partial<SearchPanelState>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const firstRender = useRef(false);

  useEffect(() => {
    if (!firstRender.current) {
      setState((prevState) => ({
        ...prevState,
        ...stateStorage,
      }));

      loadPokemon({ query: state.query, page: state.page });

      firstRender.current = true;
    }
  }, [loadPokemon, state.page, state.query, stateStorage]);

  return (
    <div>
      <SearchControls
        query={state.query}
        isLoading={state.isLoading}
        onSearch={loadPokemon}
        onChange={handleQueryChange}
      />
      <CardList data={state} />
      <Pagination
        page={state.page}
        onUpdateState={updateSearchPanelState}
        onSearch={loadPokemon}
      />
      <GenerateError />
    </div>
  );
}
