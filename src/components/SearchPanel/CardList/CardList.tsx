import { useContext, useEffect, type ReactNode } from 'react';
import type { MyPokemon } from '../../../types/interfaces';
import { Card } from './Card';
import { LoadingIndicator } from './LoadingIndicator';
import { NoResults } from './NoResults';
import { Pagination } from './Pagination';
import { CardDetails } from './CardDetails';
import { PokemonListContext } from '../../../types/contexts';
import { useGetPokemonByPageQuery } from '../../../server/pokemonApi';
import {
  isListPokemon,
  parsePokemonData,
  parsePokemonPageData,
} from '../../../utils/helpers';

export function CardList(): ReactNode {
  const { page, results, currentApiRequest, details, updateContext } =
    useContext(PokemonListContext);
  const { data, error, isFetching } = useGetPokemonByPageQuery(
    currentApiRequest || {}
  );

  useEffect(() => {
    if (error) {
      updateContext({
        page: null,
        pagePrev: null,
        pageNext: null,
        error: 'No found results',
        results: [],
        loading: false,
      });
      return;
    }

    if (data) {
      if (isListPokemon(data)) {
        const parsedData = parsePokemonPageData(data);

        updateContext({
          results: parsedData,
          page: page ?? 1,
          pagePrev: data.previous,
          pageNext: data.next,
          loading: false,
        });
      } else {
        const parsedData = [parsePokemonData(data)];

        updateContext({
          results: parsedData,
          page: null,
          pagePrev: null,
          pageNext: null,
          loading: false,
        });
      }
    }
  }, [currentApiRequest, data, error, page, updateContext]);

  const renderList = (): ReactNode => {
    if (isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <>
        {results.map((item: MyPokemon, index) => (
          <Card key={index} name={item.name} />
        ))}
      </>
    );
  };

  return (
    <div className={details ? 'wrapper-panel' : 'wrapper-panel full'}>
      <div className="wrapper-panel-list">
        {!error || results.length ? (
          <>
            <ul className="list">{renderList()}</ul>
            {page && !isFetching && <Pagination />}
          </>
        ) : (
          <div>
            <NoResults />
          </div>
        )}
      </div>
      {details && <CardDetails />}
    </div>
  );
}
