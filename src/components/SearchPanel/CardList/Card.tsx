import type { ReactNode } from 'react';
import type { CardProps } from '../../../types/interfaces';
import { upperFirstLetter } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';

export function Card(props: CardProps): ReactNode {
  const { name, image } = props.data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <li onClick={handleClick} className="item">
      <h3>{upperFirstLetter(name)}</h3>
      <div>{image ? <img src={image} alt={name} /> : ''}</div>
    </li>
  );
}
