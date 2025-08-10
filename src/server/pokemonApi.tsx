import type { Pokemon } from 'pokeapi-typescript';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GetPokemonByPage } from '../types/types';
import type { ApiRequest } from '../types/interfaces';
import { isListPokemon, isPokemon } from '../utils/helpers';

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
      providesTags: (result) =>
        isListPokemon(result)
          ? [
              ...result.results.map(({ name }) => ({
                type: 'PokemonList' as const,
                id: name,
              })),
              { type: 'PokemonList', id: 'PokemonList' },
            ]
          : [
              {
                type: 'PokemonList',
                id: isPokemon(result) ? result?.name : 'PokemonList',
              },
            ],
    }),
    resetPokemonPage: build.mutation({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['PokemonList'],
    }),
    resetAllPokemon: build.mutation({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['Pokemon'],
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
  useResetAllPokemonMutation,
  useResetPokemonPageMutation,
} = pokemonApi;
