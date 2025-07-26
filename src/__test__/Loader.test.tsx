import { describe, it, expect, vi } from 'vitest';
import * as pokemonApi from '../server/Loader';

const mockPokemon1 = {
  name: 'ivysaur',
  id: 2,
  sprites: {
    front_default: 'https://example.com/front_default.png',
    other: {
      dream_world: {
        front_default: 'https://example.com/dream_world.png',
      },
    },
  },
  abilities: [{ ability: { name: 'ability-1' } }],
  moves: [{ move: { name: 'move-1' } }],
};

const mockPokemon2 = {
  name: 'venusaur',
  id: 3,
  sprites: {
    front_default: 'https://example.com/front_default.png',
    other: {
      dream_world: {
        front_default: 'https://example.com/dream_world.png',
      },
    },
  },
  abilities: [{ ability: { name: 'ability-1' } }],
  moves: [{ move: { name: 'move-1' } }],
};

const mockResults1 = {
  name: 'ivysaur',
  id: 2,
  abilities: ['ability-1'],
  image: 'https://example.com/dream_world.png',
  moves: ['move-1'],
};

const mockResults2 = {
  name: 'venusaur',
  id: 3,
  abilities: ['ability-1'],
  image: 'https://example.com/dream_world.png',
  moves: ['move-1'],
};

describe('getPokemon', () => {
  it('should call fetch with query', async () => {
    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockPokemon1,
    } as Response);

    const result = await pokemonApi.getPokemon({ query: 'ivysaur' });

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/ivysaur/?limit=10&offset=0'
    );
    expect(result).toEqual([mockResults1]);

    mockFetch.mockRestore();
  });

  it('should call fetch with empty query', async () => {
    const mockFetch = vi
      .spyOn(window, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          results: [{ name: 'ivysaur' }, { name: 'venusaur' }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPokemon1,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPokemon2,
      } as Response);

    const result = await pokemonApi.getPokemon({ query: '' });

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0'
    );
    expect(result).toEqual(expect.arrayContaining([mockResults1]));
    expect(result).toEqual(expect.arrayContaining([mockResults2]));

    mockFetch.mockRestore();
  });

  it('should get an error when the server crashes', async () => {
    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    await expect(pokemonApi.getPokemon({ query: '' })).rejects.toThrow(
      'Problems on the server side'
    );

    mockFetch.mockRestore();
  });

  it('should get an error if the request is incorrect', async () => {
    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({}),
    } as Response);

    await expect(pokemonApi.getPokemon({ query: '' })).rejects.toThrow(
      'No results found'
    );

    mockFetch.mockRestore();
  });
});
