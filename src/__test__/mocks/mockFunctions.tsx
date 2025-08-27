import { vi } from 'vitest';
import { mockStore } from './store';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import createFetchMock from 'vitest-fetch-mock';

export const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

export function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={mockStore}>{children}</Provider>;
}

export const updateContext = vi.fn().mockImplementation(() => {});
export const setContext = vi.fn();
export const setSelectedItems = vi.fn();

export const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
