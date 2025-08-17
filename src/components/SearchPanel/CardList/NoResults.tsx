import { useContext, type ReactNode } from 'react';
import { PokemonListContext } from '../../../utils/contexts';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function NoResults(): ReactNode {
  const t = useTranslations('homePage');
  const { error } = useContext(PokemonListContext);

  return (
    <div className="no-results">
      {error || t('errors.results')}
      <Image src="/not-results.gif" alt="Pikachu" width={100} height={100} />;
    </div>
  );
}
