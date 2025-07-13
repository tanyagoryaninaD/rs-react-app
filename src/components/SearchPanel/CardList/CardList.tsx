import React from 'react';
import type { CardListProps } from '../../../types/interfaces';

class CardList extends React.Component<CardListProps> {
  public render() {
    console.log(this.props.results);
    return (
      <>
        <ul>
          {this.props.results.length > 0
            ? this.props.results[0].name
            : 'Not found'}
        </ul>
      </>
    );
  }
}

export default CardList;
