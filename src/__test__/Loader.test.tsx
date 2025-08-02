import { describe, it, expect, vi } from 'vitest';
import { getPokemon } from '../server/Loader';

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

describe('getPokemon', () => {
  it('should call fetch with query', async () => {
    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockPokemon1,
    } as Response);

    await getPokemon({ query: 'ivysaur' });

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/ivysaur'
    );

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

    await getPokemon({ query: '' });

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0'
    );
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://pokeapi.co/api/v2/pokemon/ivysaur'
    );
    expect(fetch).toHaveBeenNthCalledWith(
      3,
      'https://pokeapi.co/api/v2/pokemon/venusaur'
    );

    mockFetch.mockRestore();
  });

  it('should get an error when the server crashes', async () => {
    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    await expect(getPokemon({ query: '' })).rejects.toThrow(
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

    await expect(getPokemon({ query: '' })).rejects.toThrow('No results found');

    mockFetch.mockRestore();
  });
});
