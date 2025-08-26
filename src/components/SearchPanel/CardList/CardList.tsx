import { useEffect, useRef, type ReactNode } from 'react';
import type { CardListProps, MyPokemon } from '../../../types/interfaces';
import { Card } from './Card';
import { LoadingIndicator } from './LoadingIndicator';
import { NoResults } from './NoResults';
import { Pagination } from './Pagination';
import { CardDetails } from './CardDetails';
import { selectItems, setState } from '../../../utils/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../../utils/localStorage';
import { Flyout } from '../../components/Flyout';

export function CardList(props: CardListProps): ReactNode {
  const { page, results, isLoading, details, error } = props.data;
  const updateState = props.onUpdateState;

  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const stateItems = useSelector(selectItems);
  const [selectedItems, setSelectedItems] = useLocalStorage<MyPokemon[]>(
    'tg-selected-items',
    []
  );

  useEffect(() => {
    if (!firstRender.current) {
      return;
    }

    dispatch(setState(selectedItems));
    firstRender.current = false;
  }, [dispatch, selectedItems]);

  useEffect(() => {
    setSelectedItems(stateItems);
  }, [setSelectedItems, stateItems]);

  useEffect(() => {
    if (error) {
      updateState({ page: null });
    }
  }, [error, updateState]);

  const renderList = (): ReactNode => {
    if (isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <>
        {results.map((item) => (
          <Card key={item.id} data={item} onUpdateState={props.onUpdateState} />
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
            {page ? (
              <Pagination
                page={page}
                onUpdateState={props.onUpdateState}
                onSearch={props.onSearch}
              />
            ) : (
              ''
            )}
          </>
        ) : (
          <div>
            <NoResults error={error} />
          </div>
        )}
      </div>
      {details ? (
        <CardDetails details={details} onUpdateState={props.onUpdateState} />
      ) : (
        ''
      )}
      {stateItems.length ? <Flyout /> : ''}
    </div>
  );
}
