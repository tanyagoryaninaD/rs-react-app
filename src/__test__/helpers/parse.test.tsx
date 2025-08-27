import { beforeEach, describe, expect, it } from 'vitest';
import { parsePokemonData, parsePokemonPageData } from '../../utils/helpers';
import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';
import { bulbasaur, bulbasaurResponse, type MockPokemon } from '../mocks/data';

describe('parse Pokemon data: ', () => {
  describe('parsePokemonData: ', () => {
    let mockResponse: MockPokemon;

    beforeEach(() => {
      mockResponse = structuredClone(bulbasaurResponse);
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

    it('should return empty object', () => {
      const result = parsePokemonData(undefined);

      expect(result).toEqual({});
    });
  });

  describe('parsePokemonPageData: ', () => {
    it('should return parse data', () => {
      const mockList = {
        count: 1,
        next: '',
        previous: '',
        results: [{ name: 'bulbasaur' }],
      } as NamedApiResourceList<Pokemon>;
      const result = parsePokemonPageData(mockList);

      expect(result).toEqual([
        {
          name: 'bulbasaur',
          abilities: [],
          id: undefined,
          image: undefined,
          moves: [],
        },
      ]);
    });

    it('should return empty array', () => {
      const result = parsePokemonPageData(undefined);

      expect(result).toEqual([]);
    });
  });
});
