import { describe, it, expect, vi } from 'vitest';
import { getPokemon } from '../server/Loader';
import { bulbasaurResponse, ivysaurResponse } from './mocks/data';

describe('getPokemon', () => {
  it('should call fetch with query', async () => {
    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => bulbasaurResponse,
    } as Response);

    await getPokemon({ query: 'bulbasaur' });

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
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
          results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => bulbasaurResponse,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ivysaurResponse,
      } as Response);

    await getPokemon({ query: '' });

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0'
    );
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
    expect(fetch).toHaveBeenNthCalledWith(
      3,
      'https://pokeapi.co/api/v2/pokemon/ivysaur'
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
