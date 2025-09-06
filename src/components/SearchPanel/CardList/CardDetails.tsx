import { useContext, useEffect, useState, type ReactNode } from 'react';
import { parsePokemonData, upperFirstLetter } from '../../../utils/helpers';
import { LoadingIndicator } from './LoadingIndicator';
import { useGetPokemonByNameQuery } from '../../../server/pokemonApi';
import { PokemonListContext } from '../../../utils/contexts';
import type { CardDetailsState } from '../../../types/pokemon-components';
import { useTranslations } from 'next-intl';

export function CardDetails(): ReactNode {
  const t = useTranslations('homePage');
  const { details, updateContext } = useContext(PokemonListContext);
  const { data } = useGetPokemonByNameQuery(details || '');

  const [state, setState] = useState<CardDetailsState>({
    data: parsePokemonData(data),
    isLoading: false,
  });

  useEffect(() => {
    const parsedData = parsePokemonData(data);
    setState({ data: parsedData, isLoading: false });
  }, [data, updateContext]);

  const abilities = (): ReactNode | null => {
    return state.data?.abilities?.length ? (
      <div className="wrapper-list" data-testis="abilities">
        <h3 className="list-title">{t('details.abilities')}</h3>
        <ul>
          {state.data.abilities.map((item) => (
            <li key={item}>{upperFirstLetter(item)}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };

  const moves = (): ReactNode | null => {
    return state.data?.moves?.length ? (
      <div className="wrapper-list" data-testis="moves">
        <h3 className="list-title">{t('details.moves')}</h3>
        <ul>
          {state.data.moves.map((item) => (
            <li key={item}>{upperFirstLetter(item)}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };

  const handleClick = () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    updateContext({ details: null });
  };

  return (
    <>
      <div className="card-details">
        {state.isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <h2 data-testid="card-details-title">
              {upperFirstLetter(state.data?.name)}
            </h2>
            <div className="wrapper-image">
              {state.data?.image && (
                <img src={state.data?.image} alt={state.data?.name} />
              )}
            </div>
            <div className="wrapper-lists">
              {abilities()}
              {moves()}
            </div>
            <button onClick={handleClick}>{t('buttons.close')}</button>
          </>
        )}
      </div>
    </>
  );
}
