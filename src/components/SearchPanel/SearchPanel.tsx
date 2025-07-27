import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchControls } from './Search/SearchControls';
import { CardList } from './CardList/CardList';
import type { GetPokemon, SearchPanelState } from '../../types/interfaces';
import { GenerateError } from './Error/GenerateError';
import { getPokemon } from '../../server/Loader';
import { useLocalStorage } from '../../utils/localStorage';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from './CardList/Pagination';

export function SearchPanel() {
  const { page } = useParams();
  const currentPage = Number(page) || 1;

  const [stateStorage, setStateStorage] = useLocalStorage<SearchPanelState>(
    'tg-last-search',
    {
      query: '',
      results: [],
      error: null,
      isLoading: false,
      page: currentPage,
    }
  );

  const [state, setState] = useState<SearchPanelState>(stateStorage);
  const navigate = useNavigate();

  const loadPokemon = useCallback(
    async (dataRequest: GetPokemon): Promise<void> => {
      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));

        navigate(`/pokemon/page/${currentPage}`);

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

        navigate(`/pokemon/page/${newState.page}`, { replace: true });
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
    [currentPage, navigate, setStateStorage, state.page]
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

      loadPokemon({ query: state.query, page: currentPage });

      firstRender.current = true;
    }
  }, [currentPage, loadPokemon, state.page, state.query, stateStorage]);

  return (
    <div>
      <SearchControls
        query={state.query}
        isLoading={state.isLoading}
        onSearch={loadPokemon}
        onChange={handleQueryChange}
      />
      <div className="wrapper-panel">
        <div>
          <CardList data={state} />
          <Pagination
            onUpdateState={updateSearchPanelState}
            onSearch={loadPokemon}
          />
        </div>
        <Outlet />
      </div>
      <GenerateError />
    </div>
  );
}
