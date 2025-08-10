import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Pagination } from '../../../components/SearchPanel/CardList/Pagination';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { contextMock } from '../../moks/data';
import { PokemonListContext } from '../../../types/contexts';
import store from '../../../store/store';

describe('Pagination component', () => {
  it('renders with button and page', () => {
    contextMock.page = 1;
    contextMock.pagePrev = null;
    contextMock.pageNext = '2';

    render(
      <Provider store={store}>
        <PokemonListContext value={contextMock}>
          <Pagination />
        </PokemonListContext>
      </Provider>
    );

    const prevButton = screen.getByRole('button', { name: /Prev/i });

    expect(prevButton).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
  });

  it('change page when clicked on Next', async () => {
    contextMock.page = 2;
    contextMock.pagePrev = '1';
    contextMock.pageNext = '3';

    render(
      <Provider store={store}>
        <PokemonListContext value={contextMock}>
          <Pagination />
        </PokemonListContext>
      </Provider>
    );

    const button = screen.getByRole('button', { name: /Next/i });

    await userEvent.click(button);

    expect(contextMock.updateContext).toHaveBeenCalledWith({
      currentApiRequest: {
        apiRequest: '3',
      },
      loading: true,
      page: 3,
    });
  });

  it('change page when clicked on Next', async () => {
    contextMock.page = null;
    contextMock.pagePrev = null;
    contextMock.pageNext = '1';

    render(
      <Provider store={store}>
        <PokemonListContext value={contextMock}>
          <Pagination />
        </PokemonListContext>
      </Provider>
    );

    const button = screen.getByRole('button', { name: /Next/i });

    await userEvent.click(button);

    expect(contextMock.updateContext).toHaveBeenCalledWith({
      currentApiRequest: {
        apiRequest: '1',
      },
      loading: true,
      page: 1,
    });
  });

  it('change page when clicked on Prev', async () => {
    contextMock.page = 2;
    contextMock.pagePrev = '1';
    contextMock.pageNext = '3';

    render(
      <Provider store={store}>
        <PokemonListContext value={contextMock}>
          <Pagination />
        </PokemonListContext>
      </Provider>
    );

    const button = screen.getByRole('button', {
      name: /Prev/i,
    });

    await userEvent.click(button);

    expect(contextMock.updateContext).toHaveBeenCalledWith({
      currentApiRequest: {
        apiRequest: '1',
      },
      loading: true,
      page: 1,
    });
  });
});
