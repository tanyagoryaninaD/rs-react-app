import React from 'react';
import type { CardListProps } from '../../../types/interfaces';
import Card from './Card';
import { upperFirstLetter } from '../../../utils/helpers';

class CardList extends React.Component<CardListProps> {
  public render() {
    const { results, error } = this.props;

    return (
      <>
        <table>
          <thead>
            <tr>
              {Array.isArray(results) &&
                results.length > 0 &&
                Object.keys(results[0]).map((key) => {
                  if (key !== 'id') {
                    return <th key={key}>{upperFirstLetter(key)}</th>;
                  }
                  return null;
                })}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(results) && results.length > 0 ? (
              results.map((item) => <Card key={item.id} data={item} />)
            ) : (
              <tr>
                <td>{error ?? 'No results found'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default CardList;
