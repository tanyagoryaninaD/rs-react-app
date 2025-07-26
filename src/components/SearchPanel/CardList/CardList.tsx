import { type ReactNode } from 'react';
import type { CardListProps } from '../../../types/interfaces';
import { Card } from './Card';
import { LoadingIndicator } from './LoadingIndicator';
import { NoResults } from './NoResults';
import { upperFirstLetter } from '../../../utils/helpers';

export function CardList(props: CardListProps): ReactNode {
  const renderTableHeader = (): ReactNode => {
    const { results } = props;

    if (!Array.isArray(results) || results.length === 0) {
      return null;
    }

    return (
      <thead>
        <tr>
          {Object.keys(results[0]).map((key) => {
            if (key !== 'id') {
              return <th key={key}>{upperFirstLetter(key)}</th>;
            }
            return null;
          })}
        </tr>
      </thead>
    );
  };

  const renderTableBody = (): ReactNode => {
    const { results, isLoading, error } = props;

    if (isLoading) {
      return (
        <tbody>
          <tr className="loading-row">
            <td colSpan={results[0] ? Object.keys(results[0]).length : 1}>
              <LoadingIndicator />
            </td>
          </tr>
        </tbody>
      );
    }

    if (results.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={results[0] ? Object.keys(results[0]).length : 1}>
              <NoResults error={error} />
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {results.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </tbody>
    );
  };

  return (
    <table>
      {renderTableHeader()}
      {renderTableBody()}
    </table>
  );
}
