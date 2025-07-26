import { describe, it, expect, vi } from 'vitest';
import Loader from '../server/Loader';

describe('Loader', () => {
  it('should return Loader', async () => {
    const loader = Loader.getInstance();

    expect(loader).toBeInstanceOf(Loader);
  });

  it('should call fetch with query', async () => {
    const loader = Loader.getInstance();

    const mockFetch = () => {
      return vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => vi.fn(),
      });
    };

    globalThis.fetch = mockFetch();
    loader.getPokemon('test');

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/test/?limit=10&offset=0}'
    );
  });

  it('should get an error when the server crashes', async () => {
    const loader = Loader.getInstance();

    const mockFetch = () => {
      return vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => vi.fn(),
      });
    };

    globalThis.fetch = mockFetch();

    await expect(loader.getPokemon('')).rejects.toThrow(
      'Problems on the server side'
    );
  });

  it('should get an error if the request is incorrect', async () => {
    const loader = Loader.getInstance();

    const mockFetch = () => {
      return vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => vi.fn().mockResolvedValue({ results: [] }),
      });
    };

    globalThis.fetch = mockFetch();

    await expect(loader.getPokemon('')).rejects.toThrow('No results found');
  });
});
