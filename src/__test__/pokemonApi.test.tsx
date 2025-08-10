import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  useGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
} from '../server/pokemonApi';
import { renderHook, waitFor } from '@testing-library/react';
import { bulbasaurFetch } from './moks/data';
import { wrapper } from './moks/moks';

describe('pokemonApi', () => {
  const pokemon = 'bulbasaur';
  const data = bulbasaurFetch;

  beforeEach(() => {
    fetchMock.mockOnceIf(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(data),
      })
    );
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should call useGetPokemonByNameQuery with query', async () => {
    const { result } = renderHook(() => useGetPokemonByNameQuery(pokemon), {
      wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'getPokemonByName',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName: 'getPokemonByName',
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });

  it('should call useGetPokemonByPageQuery with apiRequest', async () => {
    const { result } = renderHook(
      () => useGetPokemonByPageQuery({ apiRequest: pokemon }),
      {
        wrapper,
      }
    );

    console.log(result.current);
    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'getPokemonByPage',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName: 'getPokemonByPage',
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });
});
