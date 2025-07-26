import type { ReactNode } from 'react';
import type { CardProps } from '../../../types/interfaces';
import { upperFirstLetter } from '../../../utils/helpers';

export function Card(props: CardProps): ReactNode {
  const { name, image } = props.data;

  return (
    <li className="item">
      <h3>{upperFirstLetter(name)}</h3>
      <div>{image ? <img src={image} alt={name} /> : ''}</div>
    </li>
  );
}
