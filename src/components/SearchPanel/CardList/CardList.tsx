import { useEffect, useState, type ReactNode } from 'react';
import type { CardListProps } from '../../../types/interfaces';
import { Card } from './Card';
import { LoadingIndicator } from './LoadingIndicator';
import { NoResults } from './NoResults';

export function CardList(props: CardListProps): ReactNode {
  const { isLoading } = props;
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(isLoading);

  useEffect(() => {
    setTimeout(() => {
      setShowLoadingIndicator(isLoading);
    }, 100);
  }, [isLoading]);

  const renderList = (): ReactNode => {
    const { results, isLoading, error } = props;

    if (isLoading && showLoadingIndicator) {
      return <LoadingIndicator />;
    }

    if (results.length === 0) {
      return (
        <li>
          <NoResults error={error} />
        </li>
      );
    }

    return (
      <>
        {results.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </>
    );
  };

  return <ul className="list">{renderList()}</ul>;
}
