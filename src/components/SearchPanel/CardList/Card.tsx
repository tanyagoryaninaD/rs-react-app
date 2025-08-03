import type { ReactNode } from 'react';
import type { CardProps, MyStore } from '../../../types/interfaces';
import { upperFirstLetter } from '../../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { remove, add } from '../../../utils/store';

export function Card(props: CardProps): ReactNode {
  const { name, image } = props.data;
  const stateSelectedItems = useSelector(
    (state: MyStore) => state.selectedItems.items
  );
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLInputElement) {
      return;
    }

    props.onUpdateState({ details: name });
  };

  const handleCheckboxChange = () => {
    if (Object.keys(stateSelectedItems).includes(name)) {
      dispatch(remove({ key: name }));
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
        checked={Object.keys(stateSelectedItems).includes(name)}
        onChange={handleCheckboxChange}
      ></input>
    </li>
  );
}
