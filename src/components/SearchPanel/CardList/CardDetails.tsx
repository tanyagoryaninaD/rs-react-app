import { useEffect, useState, type ReactNode } from 'react';
import { getPokemon } from '../../../server/Loader';
import type {
  CardDetailsProps,
  CardDetailsState,
} from '../../../types/interfaces';
import { upperFirstLetter } from '../../../utils/helpers';
import { LoadingIndicator } from './LoadingIndicator';

export function CardDetails(props: CardDetailsProps): ReactNode {
  const [state, setState] = useState<CardDetailsState>({
    data: null,
    isLoading: false,
  });
  const updateState = props.onUpdateState;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        if (props.details) {
          setState({ data: null, isLoading: true });
          const results = await getPokemon({ query: props.details });
          setState({ data: results[0], isLoading: false });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('Not found');
        }

        updateState({ details: null });
      }
    };

    fetchPokemon();
  }, [props.details, updateState]);

  const abilities = (): ReactNode | null => {
    return state.data?.abilities ? (
      <div className="wrapper-list">
        <h3 className="list-title">Abilities</h3>
        <ul>
          {state.data.abilities.map((item) => (
            <li key={item}>{upperFirstLetter(item)}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };

  const moves = (): ReactNode | null => {
    return state.data?.moves ? (
      <div className="wrapper-list">
        <h3 className="list-title">Moves</h3>
        <ul>
          {state.data.moves.map((item) => (
            <li key={item}>{upperFirstLetter(item)}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };

  const handleClick = () => {
    props.onUpdateState({ details: null });
  };

  return (
    <>
      <div className="card-details">
        {state.isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <h2 data-testid="card-details-title">
              {upperFirstLetter(state.data?.name || '')}
            </h2>
            <div className="wrapper-image">
              {state.data?.image ? (
                <img src={state.data?.image} alt={state.data?.name} />
              ) : (
                ''
              )}
            </div>
            <div className="wrapper-lists">
              {abilities()}
              {moves()}
            </div>
            <button onClick={handleClick}>Close</button>
          </>
        )}
      </div>
    </>
  );
}
