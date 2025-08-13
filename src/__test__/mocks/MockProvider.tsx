import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockStore } from './store';

interface Options {
  initialEntries: string;
}

export const MockProvider = (children: ReactNode, options?: Options) => (
  <Provider store={mockStore}>
    <MemoryRouter initialEntries={[options?.initialEntries || '/']}>
      {children}
    </MemoryRouter>
  </Provider>
);
