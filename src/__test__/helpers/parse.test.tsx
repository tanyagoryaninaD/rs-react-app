import { describe, expect, it } from 'vitest';
import { parsePokemonData, parsePokemonPageData } from '../../utils/helpers';
import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';
import { bulbasaurFetch } from '../moks/data';

describe('parse Pokemon data: ', () => {
  describe('parsePokemonData: ', () => {
    it('should return parse data', () => {
      const result = parsePokemonData(bulbasaurFetch as Pokemon);

      expect(result).toEqual({
        name: 'bulbasaur',
        id: 1,
        image: 'dream_world.svg',
        abilities: [
          'ability-1',
          'ability-2',
          'ability-3',
          'ability-4',
          'ability-5',
        ],
        moves: ['move-1', 'move-2', 'move-3', 'move-4', 'move-5'],
      });
    });

    it('should return parse data without abilities and moves', () => {
      bulbasaurFetch.abilities = undefined;
      bulbasaurFetch.moves = undefined;

      const result = parsePokemonData(bulbasaurFetch as Pokemon);

      expect(result.abilities).toEqual([]);
      expect(result.moves).toEqual([]);
    });

    it('should return parse data with front_default', () => {
      bulbasaurFetch.sprites.other.dream_world.front_default = '';

      const result = parsePokemonData(bulbasaurFetch as Pokemon);

      expect(result.image).toBe('front_default.png');
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
