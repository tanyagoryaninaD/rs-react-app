'use client';

import { useCallback, useEffect, useRef } from 'react';
import { SearchControls } from './Search/SearchControls';
import { CardList } from './CardList/CardList';
import type { PokemonListContextState } from '../../types/interfaces';
import { GenerateError } from './Error/GenerateError';
import { useLocalStorage } from '../../utils/localStorage';
import { PokemonListContext } from '../../utils/contexts';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (newContext.details) {
        newSearchParams.set('details', newContext.details);
      }

      if (newContext.details === null) {
        newSearchParams.delete('details');
      }

      if (newContext.page) {
        newSearchParams.set('page', newContext.page.toString());
      }

      if (newContext.page === null) {
        newSearchParams.delete('page');
      }

      router.push(`?${newSearchParams.toString()}`);
    },
    [router, searchParams, setContext]
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
