import { type ReactNode } from 'react';
import type { CardProps } from '../../../types/interfaces';
import { upperFirstLetter } from '../../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { remove, add, selectedHasItem } from '../../../utils/store';

export function Card(props: CardProps): ReactNode {
  const { name, image } = props.data;

  const dispatch = useDispatch();
  const stateHasItem = useSelector(selectedHasItem(props.data));

  const handleClick = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLInputElement) {
      return;
    }

    props.onUpdateState({ details: name });
  };

  const handleCheckboxChange = () => {
    if (stateHasItem) {
      dispatch(remove(props.data));
    } else {
      dispatch(add(props.data));
    }
  };

  return (
    <li onClick={handleClick} className="item" data-testid="card">
      <h3 data-testid="card-title">{upperFirstLetter(name)}</h3>
      <div>{image ? <img src={image} alt={name} /> : ''}</div>
      <input
        data-testid="card-checkbox"
        type="checkbox"
        className="item-checkbox"
        checked={stateHasItem}
        onChange={handleCheckboxChange}
      ></input>
    </li>
  );
}
