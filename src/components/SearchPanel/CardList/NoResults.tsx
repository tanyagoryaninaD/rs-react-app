import { useContext, type ReactNode } from 'react';
import { PokemonListContext } from '../../../utils/contexts';
import Image from 'next/image';

export function NoResults(): ReactNode {
  const { error } = useContext(PokemonListContext);

  return (
    <div className="no-results">
      {error || 'No results found'}
      <Image src="/not-results.gif" alt="Pikachu" width={100} height={100} />;
    </div>
  );
}
