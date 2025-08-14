import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  useGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
} from '../server/pokemonApi';
import { renderHook, waitFor } from '@testing-library/react';
import { bulbasaurResponse } from './mocks/data';
import { wrapper } from './mocks/mocks';
import type { NamedApiResource } from 'pokeapi-typescript/dist/interfaces/Utility/NamedApiResourceList';
import type { Pokemon } from 'pokeapi-typescript';
import { mockStore } from './mocks/store';
import type { QueryCacheKey } from '@reduxjs/toolkit/query';

describe('pokemonApi', () => {
  const pokemon = 'bulbasaur';
  const data = bulbasaurResponse;

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
      () => useGetPokemonByPageQuery({ apiRequest: 'bulbasaur' }),
      {
        wrapper,
      }
    );

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

    const keysTags = mockStore.getState().pokemonApi.provided.keys;
    const key =
      'getPokemonByPage({"apiRequest":"bulbasaur"})' as unknown as QueryCacheKey;
    expect(keysTags[key][0].type).toBe('Pokemon');
  });

  it('should set tags PokemonList', async () => {
    fetchMock.resetMocks();
    fetchMock.mockOnceIf(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({
          name: '',
          url: '',
        } as NamedApiResource<Pokemon>),
      })
    );

    const { result } = renderHook(() => useGetPokemonByPageQuery({}), {
      wrapper,
    });

    await waitFor(() => expect(result.current.data).toBeTruthy());

    const keysTags = mockStore.getState().pokemonApi.provided.keys;
    const key = 'getPokemonByPage({})' as unknown as QueryCacheKey;
    expect(keysTags[key][0].type).toBe('PokemonList');
  });
});
