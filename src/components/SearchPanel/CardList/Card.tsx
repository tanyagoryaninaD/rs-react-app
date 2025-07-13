import React from 'react';
import type { CardProps } from '../../../types/interfaces';

class Card extends React.Component<CardProps> {
  public render() {
    const { name, image, abilities, moves } = this.props.data;

    return (
      <tr>
        <td>{name}</td>
        <td>{image ? <img src={image} alt={name} /> : ''}</td>
        <td>{abilities?.join(',')}</td>
        <td>{moves?.join(',')}</td>
      </tr>
    );
  }
}

export default Card;
