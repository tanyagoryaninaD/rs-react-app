import { useContext, type ReactNode } from 'react';
import gif from '../../../assets/not-results.gif';
import { PokemonListContext } from '../../../types/contexts';

export function NoResults(): ReactNode {
  const { error } = useContext(PokemonListContext);

  return (
    <div className="no-results">
      {error || 'No results found'}
      <img src={gif} alt="Pikachu" />
    </div>
  );
}
