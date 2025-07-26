import { useEffect, useState, type ReactNode } from 'react';
import { getPokemon } from '../../../server/Loader';
import { useLocation } from 'react-router-dom';
import type { CardDetailsProps } from '../../../types/interfaces';
import { upperFirstLetter } from '../../../utils/helpers';
import { LoadingIndicator } from './LoadingIndicator';

export function CardDetails(): ReactNode {
  const location = useLocation();

  const [state, setState] = useState<CardDetailsProps>({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pathname = location.pathname.split('/').pop();

        if (!pathname) {
          throw new Error(`Not found ${pathname}`);
        }

        const results = await getPokemon({ query: pathname });

        setState({ data: results[0], isLoading: false });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setState({ data: null, isLoading: false });
        } else {
          console.error('Not found');
          setState({ data: null, isLoading: false });
        }
      }
    };

    fetchPokemon();
  }, [location.pathname]);

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

  return (
    <>
      <div className="card-details">
        {state.isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <h2>{upperFirstLetter(state.data?.name || '')}</h2>
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
          </>
        )}
      </div>
    </>
  );
}
