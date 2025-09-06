import type { Pokemon } from 'pokeapi-typescript';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isListPokemon } from '../utils/helpers';
import { ApiRequest, GetPokemonByPage } from '../types/api';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  tagTypes: ['Pokemon', 'PokemonList'],
  endpoints: (build) => ({
    getPokemonByName: build.query<Pokemon, string>({
      query: (query) => `/${query}`,
      providesTags: (result) => [{ type: 'Pokemon', id: result?.name }],
    }),
    getPokemonByPage: build.query<GetPokemonByPage, ApiRequest>({
      query: ({ apiRequest, offset = 0 }: ApiRequest) => {
        return apiRequest
          ? apiRequest?.split('pokemon')[1] || `/${apiRequest}`
          : `?offset=${offset}&limit=10`;
      },
      providesTags: (result, _error, query) =>
        isListPokemon(result)
          ? [
              ...result.results.map(({ name }) => ({
                type: 'PokemonList' as const,
                id: name,
              })),
              { type: 'PokemonList', id: JSON.stringify(query) },
            ]
          : [
              {
                type: 'Pokemon',
                id: result?.name,
              },
            ],
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonByPageQuery } =
  pokemonApi;
