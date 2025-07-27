import { useEffect, useState, type ReactNode } from 'react';
import { getPokemon } from '../../../server/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import type { CardDetailsProps } from '../../../types/interfaces';
import { upperFirstLetter } from '../../../utils/helpers';
import { LoadingIndicator } from './LoadingIndicator';

export function CardDetails(): ReactNode {
  const { details } = useParams();
  const { page } = useParams();
  const currentPage = Number(page) || 1;

  const navigate = useNavigate();

  const [state, setState] = useState<CardDetailsProps>({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        if (!details) {
          throw new Error(`Not found ${details}`);
        }

        const results = await getPokemon({ query: details });

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
  }, [details]);

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
    navigate(`/pokemon/page/${currentPage}`, { replace: true });
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
            <button onClick={handleClick}>Close</button>
          </>
        )}
      </div>
    </>
  );
}
