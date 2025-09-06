import { describe, it, expect } from 'vitest';
import { isListPokemon } from '../../utils/helpers';
import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';

describe('isListPokemon:', () => {
  it('return true', () => {
    const result = isListPokemon({
      count: 0,
      next: '',
      previous: '',
      results: [{} as Pokemon],
    } as NamedApiResourceList<Pokemon>);

    expect(result).toBeTruthy();
  });

  it('return false', () => {
    const resultPokemon = isListPokemon({} as Pokemon);
    const result = isListPokemon(undefined);

    expect(resultPokemon).toBeFalsy();
    expect(result).toBeFalsy();
  });
});
