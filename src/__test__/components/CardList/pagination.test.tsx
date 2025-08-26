import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Pagination } from '../../../components/SearchPanel/CardList/Pagination';
import userEvent from '@testing-library/user-event';
import { PokemonListContext } from '../../../types/contexts';
import { contextMock } from '../../mocks/data';
import { MockProvider } from '../../mocks/MockProvider';
import type { PokemonListContextProps } from '../../../types/interfaces';

describe('Pagination component', () => {
  let context: PokemonListContextProps;

  beforeEach(() => {
    context = { ...contextMock };
  });

  it('renders with button and page', () => {
    context.page = 1;
    context.pagePrev = null;
    context.pageNext = null;

    render(
      MockProvider(
        <PokemonListContext value={context}>
          <Pagination />
        </PokemonListContext>
      )
    );

    const prevButton = screen.getByRole('button', { name: /Prev/i });
    const nextButton = screen.getByRole('button', { name: /Next/i });

    expect(prevButton).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('change page when clicked on Next', async () => {
    context.page = 2;
    context.pagePrev = '1';
    context.pageNext = '3';

    render(
      MockProvider(
        <PokemonListContext value={context}>
          <Pagination />
        </PokemonListContext>
      )
    );

    const button = screen.getByRole('button', { name: /Next/i });

    await userEvent.click(button);

    expect(context.updateContext).toHaveBeenCalledWith({
      currentApiRequest: {
        apiRequest: '3',
      },
      loading: true,
      page: 3,
    });
  });

  it('change page when clicked on Prev', async () => {
    context.page = 2;
    context.pagePrev = '1';
    context.pageNext = '3';

    render(
      MockProvider(
        <PokemonListContext value={context}>
          <Pagination />
        </PokemonListContext>
      )
    );

    const button = screen.getByRole('button', {
      name: /Prev/i,
    });

    await userEvent.click(button);

    expect(context.updateContext).toHaveBeenCalledWith({
      currentApiRequest: {
        apiRequest: '1',
      },
      loading: true,
      page: 1,
    });
  });
});
