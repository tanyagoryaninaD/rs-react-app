import type { ReactNode } from 'react';
import type { CardProps } from '../../../types/interfaces';

export function Card(props: CardProps): ReactNode {
  const { name, image, abilities, moves } = props.data;

  return (
    <tr>
      <td>{name}</td>
      <td>{image ? <img src={image} alt={name} /> : ''}</td>
      <td>{abilities?.join(',')}</td>
      <td>{moves?.join(',')}</td>
    </tr>
  );
}
