import type { ReactNode } from 'react';
import type { CardProps } from '../../../types/interfaces';
import { upperFirstLetter } from '../../../utils/helpers';

export function Card(props: CardProps): ReactNode {
  const { name, image } = props.data;

  const handleClick = () => {
    props.onUpdateState({ details: name });
  };

  return (
    <li onClick={handleClick} className="item" data-testid="card">
      <h3 data-testid="card-title">{upperFirstLetter(name)}</h3>
      <div>{image ? <img src={image} alt={name} /> : ''}</div>
    </li>
  );
}
