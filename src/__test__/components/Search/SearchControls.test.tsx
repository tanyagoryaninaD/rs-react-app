import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SearchControls } from '../../../components/SearchPanel/Search/SearchControls';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { PokemonListContext } from '../../../types/contexts';
import { contextMock } from '../../mocks/data';
import { mockStore } from '../../mocks/store';

describe('SearchControls component', () => {
  it('renders with form elements', () => {
    contextMock.query = '';
    contextMock.loading = false;

    render(
      <Provider store={mockStore}>
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      </Provider>
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /Search/,
      })
    ).toBeInTheDocument();
  });

  it('during loading the button text content should be changed', () => {
    contextMock.query = '';
    contextMock.loading = true;

    render(
      <Provider store={mockStore}>
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      </Provider>
    );

    expect(
      screen.getByRole('button', {
        name: /Searching.../,
      })
    ).toBeInTheDocument();
  });

  it('renders input with last query', () => {
    contextMock.query = 'test';
    contextMock.loading = false;

    render(
      <Provider store={mockStore}>
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      </Provider>
    );

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('change input value should call onChange', async () => {
    contextMock.query = '';
    contextMock.loading = false;

    render(
      <Provider store={mockStore}>
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      </Provider>
    );

    const input = screen.getByTestId('search-input');

    await userEvent.type(input, 'query');

    expect(contextMock.updateContext).toHaveBeenCalledTimes(5);
    expect(contextMock.updateContext).toHaveBeenLastCalledWith({ query: 'y' });
  });

  it('clicks on button should call onSearch', async () => {
    contextMock.query = 'test-2';
    contextMock.loading = false;

    render(
      <Provider store={mockStore}>
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      </Provider>
    );

    const button = screen.getByRole('button', {
      name: /Search/,
    });

    await userEvent.click(button);

    expect(contextMock.updateContext).toHaveBeenLastCalledWith({
      loading: true,
      currentApiRequest: { apiRequest: 'test-2' },
      results: [],
      page: null,
      pageNext: null,
      pagePrev: null,
      error: null,
    });
  });
});
