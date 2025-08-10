import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { mockStore } from './store';
import React from 'react';
import type { PokemonListContextProps } from '../../types/interfaces';
import { contextMock } from './data';

export const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

export function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={mockStore}>{children}</Provider>;
}

export const MockContext =
  React.createContext<Partial<PokemonListContextProps>>(contextMock);

export const updateContext = vi.fn().mockImplementation(() => {});
