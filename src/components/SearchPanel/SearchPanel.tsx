import { useCallback, useEffect, useRef } from 'react';
import { SearchControls } from './Search/SearchControls';
import { CardList } from './CardList/CardList';
import type { PokemonListContextState } from '../../types/interfaces';
import { GenerateError } from './Error/GenerateError';
import { useLocalStorage } from '../../utils/localStorage';
import { useSearchParams } from 'react-router-dom';
import { PokemonListContext } from '../../types/contexts';

export function SearchPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1') || null;
  const details = searchParams.get('details');
  const firstRender = useRef(true);

  const [context, setContext] = useLocalStorage<PokemonListContextState>(
    'tg-last-search',
    {
      query: '',
      currentApiRequest: {},
      results: [],
      page: currentPage,
      pageNext: null,
      pagePrev: null,
      details: details,
      loading: false,
      error: null,
    }
  );

  const updateContext = useCallback(
    (newContext: Partial<PokemonListContextState>) => {
      setContext((prev) => ({
        ...prev,
        ...newContext,
      }));

      if (newContext.details) {
        searchParams.set('details', newContext.details);
      }

      if (newContext.details === null) {
        searchParams.delete('details');
      }

      if (newContext.page) {
        searchParams.set('page', newContext.page.toString());
      }

      if (newContext.page === null) {
        searchParams.delete('page');
      }

      setSearchParams(searchParams);
    },
    [searchParams, setContext, setSearchParams]
  );

  useEffect(() => {
    if (firstRender.current) {
      setContext((prev) => ({
        ...prev,
        page: currentPage,
        details,
        currentApiRequest: context.query
          ? { apiRequest: context.query }
          : { offset: ((currentPage || 1) - 1) * 10 },
      }));

      firstRender.current = false;
    }
  }, [context.query, currentPage, details, setContext]);

  return (
    <div>
      <PokemonListContext value={{ ...context, updateContext }}>
        <SearchControls />
        <CardList />
        <GenerateError />
      </PokemonListContext>
    </div>
  );
}
