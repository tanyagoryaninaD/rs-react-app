import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SearchControls } from '../../../components/SearchPanel/Search/SearchControls';
import userEvent from '@testing-library/user-event';
import { PokemonListContext } from '../../../utils/contexts';
import { contextMock } from '../../mocks/data';
import { MockProvider } from '../../mocks/MockProvider';

describe('SearchControls component', () => {
  it('renders with form elements', () => {
    contextMock.query = '';
    contextMock.loading = false;

    render(
      MockProvider(
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      )
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
      MockProvider(
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      )
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
      MockProvider(
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      )
    );

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('change input value should call onChange', async () => {
    contextMock.query = '';
    contextMock.loading = false;

    render(
      MockProvider(
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      )
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
      MockProvider(
        <PokemonListContext value={contextMock}>
          <SearchControls />
        </PokemonListContext>
      )
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
