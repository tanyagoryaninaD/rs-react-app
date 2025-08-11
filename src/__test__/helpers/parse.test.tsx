import { describe, expect, it } from 'vitest';
import { parsePokemonData } from '../../utils/helpers';
import type { Pokemon } from 'pokeapi-typescript';
import { bulbasaur, bulbasaurResponse } from '../mocks/data';

describe('parsePokemonData: ', () => {
  it('should return parse data', () => {
    const result = parsePokemonData(bulbasaurResponse as Pokemon);

    expect(result).toEqual(bulbasaur);
  });

  it('should return parse data without abilities and moves', () => {
    bulbasaurResponse.abilities = undefined;
    bulbasaurResponse.moves = undefined;

    const result = parsePokemonData(bulbasaurResponse as Pokemon);

    expect(result.abilities).toEqual([]);
    expect(result.moves).toEqual([]);
  });

  it('should return parse data with front_default', () => {
    bulbasaurResponse.sprites.other.dream_world.front_default = '';

    const result = parsePokemonData(bulbasaurResponse as Pokemon);

    expect(result.image).toBe('front_default.png');
  });
});
