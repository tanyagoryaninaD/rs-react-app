import React from 'react';
import type { CardListProps } from '../../../types/interfaces';
import Card from './Card';
import { upperFirstLetter } from '../../../utils/helpers';

class CardList extends React.Component<CardListProps> {
  public render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              {this.props.results.length > 0 &&
                Object.keys(this.props.results[0]).map((key) => {
                  if (key !== 'id') {
                    return <th key={key}>{upperFirstLetter(key)}</th>;
                  }
                  return null;
                })}
            </tr>
          </thead>
          <tbody>
            {this.props.results.length > 0 ? (
              this.props.results.map((item) => (
                <Card key={item.id} data={item} />
              ))
            ) : (
              <tr>
                <td>{this.props.error ?? 'Not results found'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default CardList;
