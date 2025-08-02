import { useEffect, type ReactNode } from 'react';
import type { CardListProps } from '../../../types/interfaces';
import { Card } from './Card';
import { LoadingIndicator } from './LoadingIndicator';
import { NoResults } from './NoResults';
import { Pagination } from './Pagination';
import { CardDetails } from './CardDetails';

export function CardList(props: CardListProps): ReactNode {
  const { page, results, isLoading, details, error } = props.data;
  const updateState = props.onUpdateState;

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
        {!error || results.length > 0 ? (
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
    </div>
  );
}
