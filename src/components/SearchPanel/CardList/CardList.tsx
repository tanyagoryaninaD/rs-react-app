import { useContext, useEffect, useRef, type ReactNode } from 'react';
import type { MyPokemon } from '../../../types/pokemon-components';
import { Card } from './Card';
import { LoadingIndicator } from './LoadingIndicator';
import { NoResults } from './NoResults';
import { Pagination } from './Pagination';
import { CardDetails } from './CardDetails';
import { PokemonListContext } from '../../../utils/contexts';
import { useGetPokemonByPageQuery } from '../../../server/pokemonApi';
import {
  isListPokemon,
  parsePokemonData,
  parsePokemonPageData,
} from '../../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../../utils/localStorage';
import { Flyout } from '../../components/Flyout';
import { selectItems, setState } from '../../../store/reducers/selectedItems';

export function CardList(): ReactNode {
  const { page, results, currentApiRequest, details, updateContext } =
    useContext(PokemonListContext);
  const { data, error, isFetching } = useGetPokemonByPageQuery(
    currentApiRequest || {}
  );

  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const stateItems = useSelector(selectItems);
  const [selectedItems, setSelectedItems] = useLocalStorage<MyPokemon[]>(
    'tg-selected-items',
    []
  );

  useEffect(() => {
    if (firstRender.current) {
      dispatch(setState(selectedItems));

      firstRender.current = false;
    }
  }, [dispatch, selectedItems]);

  useEffect(() => {
    setSelectedItems(stateItems);
  }, [setSelectedItems, stateItems]);

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
        {results.map((item: MyPokemon) => (
          <Card key={item.name} name={item.name} />
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
      {stateItems.length ? <Flyout /> : ''}
    </div>
  );
}
