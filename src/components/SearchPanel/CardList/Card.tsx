import type { ReactNode } from 'react';
import type { CardProps } from '../../../types/interfaces';
import { upperFirstLetter } from '../../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';

export function Card(props: CardProps): ReactNode {
  const { name, image } = props.data;
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = Number(page) || 1;

  const handleClick = () => {
    navigate(`/pokemon/page/${currentPage}/details/${name}`);
  };

  return (
    <li onClick={handleClick} className="item">
      <h3>{upperFirstLetter(name)}</h3>
      <div>{image ? <img src={image} alt={name} /> : ''}</div>
    </li>
  );
}
