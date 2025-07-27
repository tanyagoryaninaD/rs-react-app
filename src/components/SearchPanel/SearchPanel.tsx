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
      page,
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

        const newState = {
          results: data,
          error: null,
          isLoading: false,
          page: dataRequest.page ?? state.page,
        };

        setState((prevState) => ({
          ...prevState,
          ...newState,
        }));

        setStateStorage((prevState) => ({
          ...prevState,
          ...newState,
        }));

        setSearchParams({ page: String(newState.page) });
        navigator(`/pokemon/?page=${newState.page}`, { replace: true });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          const newState = {
            results: [],
            error: error.message,
            isLoading: false,
            page: 1,
          };

          setState((prevState) => ({
            ...prevState,
            ...newState,
          }));

          setStateStorage((prevState) => ({
            ...prevState,
            ...newState,
          }));
        }
      }
    },
    [navigator, setSearchParams, setStateStorage, state.page]
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

      loadPokemon({ query: state.query, page: page });

      firstRender.current = true;
    }
  }, [loadPokemon, page, state.page, state.query, stateStorage]);

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
