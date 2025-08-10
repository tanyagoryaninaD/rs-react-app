import { useContext, type ReactNode } from 'react';
import type { CardProps, MyStore } from '../../../types/interfaces';
import { parsePokemonData, upperFirstLetter } from '../../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { remove, add } from '../../../store/reducers/selectedItems';
import { useGetPokemonByNameQuery } from '../../../server/pokemonApi';
import { PokemonListContext } from '../../../types/contexts';

export function Card(props: CardProps): ReactNode {
  const { updateContext } = useContext(PokemonListContext);
  const { data, error, isFetching } = useGetPokemonByNameQuery(props.name);
  const parseData = parsePokemonData(data);

  const stateSelectedItems = useSelector(
    (state: MyStore) => state.selectedItems.items
  );
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLInputElement) {
      return;
    }

    updateContext({ details: parseData.name });
  };

  const handleCheckboxChange = () => {
    if (Object.keys(stateSelectedItems).includes(parseData.name || '')) {
      dispatch(remove({ key: parseData.name || '' }));
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
            {parseData.image && (
              <img src={parseData.image} alt={parseData.name} />
            )}
          </div>
          <input
            data-testid="card-checkbox"
            type="checkbox"
            className="item-checkbox"
            checked={Object.keys(stateSelectedItems).includes(parseData.name)}
            onChange={handleCheckboxChange}
          ></input>
        </li>
      )}
    </>
  );
}
