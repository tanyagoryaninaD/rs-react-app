import { useContext, type ReactNode } from 'react';
import type { CardProps, MyStore } from '../../../types/interfaces';
import { parsePokemonData, upperFirstLetter } from '../../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import {
  remove,
  add,
  selectHasItem,
} from '../../../store/reducers/selectedItems';
import { useGetPokemonByNameQuery } from '../../../server/pokemonApi';
import { PokemonListContext } from '../../../utils/contexts';

export function Card(props: CardProps): ReactNode {
  const { updateContext } = useContext(PokemonListContext);
  const { data, error, isFetching } = useGetPokemonByNameQuery(props.name);
  const parseData = parsePokemonData(data);

  const dispatch = useDispatch();
  const stateHasItem = useSelector((state: MyStore) =>
    selectHasItem(state, parseData)
  );

  const handleClick = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLInputElement) {
      return;
    }

    updateContext({ details: parseData.name });
  };

  const handleCheckboxChange = () => {
    if (stateHasItem) {
      dispatch(remove(parseData));
    } else {
      dispatch(add(parseData));
    }
  };

  return (
    <>
      {!isFetching && !error && (
        <li onClick={handleClick} className="item" data-testid="card">
          <h3 data-testid="card-title">{upperFirstLetter(parseData.name)}</h3>
          <div>
            {parseData.image ? (
              <img src={parseData.image} alt={parseData.name} />
            ) : (
              ''
            )}
          </div>
          <input
            data-testid="card-checkbox"
            type="checkbox"
            className="item-checkbox"
            checked={stateHasItem}
            onChange={handleCheckboxChange}
          ></input>
        </li>
      )}
    </>
  );
}
