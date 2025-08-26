import { beforeEach, describe, expect, it } from 'vitest';
import { parsePokemonData } from '../../utils/helpers';
import type { Pokemon } from 'pokeapi-typescript';
import { bulbasaur, bulbasaurResponse, type MockPokemon } from '../mocks/data';

describe('parsePokemonData: ', () => {
  let mockResponse: MockPokemon;

  beforeEach(() => {
    mockResponse = { ...bulbasaurResponse };
  });

  it('should return parse data', () => {
    const result = parsePokemonData(mockResponse as Pokemon);

    expect(result).toEqual(bulbasaur);
  });

  it('should return parse data without abilities and moves', () => {
    mockResponse.abilities = undefined;
    mockResponse.moves = undefined;

    const result = parsePokemonData(mockResponse as Pokemon);

    expect(result.abilities).toEqual([]);
    expect(result.moves).toEqual([]);
  });

  it('should return parse data with front_default', () => {
    mockResponse.sprites.other.dream_world.front_default = '';

    const result = parsePokemonData(mockResponse as Pokemon);

    expect(result.image).toBe('front_default.png');
  });
});
