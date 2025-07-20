import { describe, expect, it } from 'vitest';
import { parsePokemonData } from '../../utils/helpers';
import type { Pokemon } from 'pokeapi-typescript';

type MockPokemon = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  abilities:
    | {
        ability: {
          name: string;
        };
      }[]
    | undefined;
  moves:
    | {
        move: {
          name: string;
        };
      }[]
    | undefined;
};

const mockPokemon: MockPokemon = {
  name: 'pokemon',
  id: 1,
  sprites: {
    front_default: 'https://example.com/front_default.png',
    other: {
      dream_world: {
        front_default: 'https://example.com/dream_world.png',
      },
    },
  },
  abilities: [
    { ability: { name: 'ability-1' } },
    { ability: { name: 'ability-2' } },
    { ability: { name: 'ability-3' } },
    { ability: { name: 'ability-4' } },
  ],
  moves: [
    { move: { name: 'move-1' } },
    { move: { name: 'move-2' } },
    { move: { name: 'move-3' } },
    { move: { name: 'move-4' } },
  ],
};

describe('parsePokemonData: ', () => {
  it('should return parse data', () => {
    const result = parsePokemonData(mockPokemon as Pokemon);

    expect(result).toEqual({
      name: 'pokemon',
      id: 1,
      image: 'https://example.com/dream_world.png',
      abilities: ['ability-1', 'ability-2', 'ability-3', 'ability-4'],
      moves: ['move-1', 'move-2', 'move-3', 'move-4'],
    });
  });

  it('should return parse data', () => {
    if (mockPokemon.abilities && mockPokemon.moves) {
      mockPokemon.abilities.push(
        { ability: { name: 'ability-5' } },
        { ability: { name: 'ability-6' } }
      );
      mockPokemon.moves.push(
        { move: { name: 'move-5' } },
        { move: { name: 'move-6' } }
      );
    }
    const result = parsePokemonData(mockPokemon as Pokemon);

    expect(result).toEqual({
      name: 'pokemon',
      id: 1,
      image: 'https://example.com/dream_world.png',
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
    mockPokemon.abilities = undefined;
    mockPokemon.moves = undefined;

    const result = parsePokemonData(mockPokemon as Pokemon);

    expect(result.abilities).toEqual([]);
    expect(result.moves).toEqual([]);
  });

  it('should return parse data with front_default', () => {
    mockPokemon.sprites.other.dream_world.front_default = '';

    const result = parsePokemonData(mockPokemon as Pokemon);

    expect(result.image).toBe('https://example.com/front_default.png');
  });
});
