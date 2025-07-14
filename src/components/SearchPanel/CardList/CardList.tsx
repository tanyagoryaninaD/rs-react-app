import React from 'react';
import type { CardListProps } from '../../../types/interfaces';
import Card from './Card';
import LoadingIndicator from './LoadingIndicator';
import NoResults from './NoResults';
import { upperFirstLetter } from '../../../utils/helpers';

class CardList extends React.Component<CardListProps> {
  public render() {
    return (
      <table>
        {this.renderTableHeader()}
        {this.renderTableBody()}
      </table>
    );
  }

  private renderTableHeader() {
    const { results } = this.props;

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
  }

  private renderTableBody() {
    const { results, isLoading, error } = this.props;

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
  }
}

export default CardList;
