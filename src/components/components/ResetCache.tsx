import { useDispatch } from 'react-redux';
import { pokemonApi } from '../../server/pokemonApi';

export function ResetCache(): React.ReactNode {
  const dispatch = useDispatch();

  const handleResetCashPokemonPage = () => {
    dispatch(pokemonApi.util.invalidateTags(['PokemonList']));
  };

  const handleResetCashAllPokemon = () => {
    dispatch(pokemonApi.util.invalidateTags(['Pokemon']));
  };

  return (
    <>
      <button
        data-testid="reset-cache-page"
        onClick={handleResetCashPokemonPage}
      >
        Reset Cache Page
      </button>
      <button
        data-testid="reset-cache-all-pokemon"
        onClick={handleResetCashAllPokemon}
      >
        Reset Cache All Pokemons
      </button>
    </>
  );
}
