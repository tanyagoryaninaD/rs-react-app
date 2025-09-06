import { useDispatch } from 'react-redux';
import { pokemonApi } from '../../server/pokemonApi';
import { useTranslations } from 'next-intl';

export function ResetCache(): React.ReactNode {
  const t = useTranslations('homePage');
  const dispatch = useDispatch();

  const handleResetCashPokemonPage = () => {
    dispatch(pokemonApi.util.invalidateTags(['PokemonList']));
  };

  const handleResetCashAllPokemon = () => {
    dispatch(pokemonApi.util.invalidateTags(['Pokemon']));
  };

  return (
    <div className="resets">
      <button
        data-testid="reset-cache-page"
        onClick={handleResetCashPokemonPage}
      >
        {t('buttons.resets.page')}
      </button>
      <button
        data-testid="reset-cache-all-pokemon"
        onClick={handleResetCashAllPokemon}
      >
        {t('buttons.resets.allPokemons')}
      </button>
    </div>
  );
}
