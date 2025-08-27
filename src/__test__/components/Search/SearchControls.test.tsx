import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { SearchControls } from '../../../components/SearchPanel/Search/SearchControls';
import userEvent from '@testing-library/user-event';
import { PokemonListContext } from '../../../types/contexts';
import { contextMock } from '../../mocks/data';
import { MockProvider } from '../../mocks/MockProvider';
import type { PokemonListContextProps } from '../../../types/interfaces';

describe('SearchControls component', () => {
  let context: PokemonListContextProps;

  beforeEach(() => {
    context = { ...contextMock };
  });

  it('renders with form elements', () => {
    context.query = '';
    context.loadingButtonSearch = false;

    render(
      MockProvider(
        <PokemonListContext value={context}>
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
    context.query = '';
    context.loadingButtonSearch = true;

    render(
      MockProvider(
        <PokemonListContext value={context}>
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
    context.query = 'test';
    context.loadingButtonSearch = false;

    render(
      MockProvider(
        <PokemonListContext value={context}>
          <SearchControls />
        </PokemonListContext>
      )
    );

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('change input value should call onChange', async () => {
    context.query = '';
    context.loadingButtonSearch = false;

    render(
      MockProvider(
        <PokemonListContext value={context}>
          <SearchControls />
        </PokemonListContext>
      )
    );

    const input = screen.getByTestId('search-input');

    await userEvent.type(input, 'query');

    expect(context.updateContext).toHaveBeenCalledTimes(5);
    expect(context.updateContext).toHaveBeenLastCalledWith({ query: 'y' });
  });

  it('clicks on button should call onSearch', async () => {
    context.query = 'test-2';
    context.loadingButtonSearch = false;

    render(
      MockProvider(
        <PokemonListContext value={context}>
          <SearchControls />
        </PokemonListContext>
      )
    );

    const button = screen.getByRole('button', {
      name: /Search/,
    });

    await userEvent.click(button);

    expect(context.updateContext).toHaveBeenLastCalledWith({
      loadingButtonSearch: true,
      currentApiRequest: { apiRequest: 'test-2' },
      results: [],
      page: null,
      pageNext: null,
      pagePrev: null,
      error: null,
    });
  });
});
