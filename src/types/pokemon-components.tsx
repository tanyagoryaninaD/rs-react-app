import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit/react';

export interface CardProps {
  name: string;
}

export interface CardDetailsState {
  data: MyPokemon;
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

export interface MyPokemon {
  id: number;
  name: string;
  image?: string;
  abilities?: string[];
  moves?: string[];
}

export interface Table extends Omit<MyPokemon, 'id'> {
  description?: string;
}
