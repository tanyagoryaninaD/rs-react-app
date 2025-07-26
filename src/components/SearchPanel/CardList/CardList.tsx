import { type ReactNode } from 'react';
import type { CardListProps } from '../../../types/interfaces';
import { Card } from './Card';
import { LoadingIndicator } from './LoadingIndicator';
import { NoResults } from './NoResults';

export function CardList(props: CardListProps): ReactNode {
  const { isLoading } = props.data;

  const renderList = (): ReactNode => {
    const { results, error } = props.data;

    if (isLoading) {
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
