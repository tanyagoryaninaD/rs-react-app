import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CardDetails } from '../../../components/SearchPanel/CardList/CardDetails';
import { bulbasaur } from '../../mocks/data';
import { mockOnUpdateState } from '../../mocks/mockFunctions';
import * as pokemonApi from '../../../server/Loader';

describe('CardDetails component', () => {
  it('clicking on the "close" button should update the details status', async () => {
    const mockGetPokemon = vi
      .spyOn(pokemonApi, 'getPokemon')
      .mockResolvedValueOnce([bulbasaur]);

    render(
      <CardDetails details={'bulbasaur'} onUpdateState={mockOnUpdateState} />
    );

    const button = await screen.findByRole('button', { name: /Close/i });

    await userEvent.click(button);

    expect(mockGetPokemon).toBeCalledWith({ query: 'bulbasaur' });
    expect(mockOnUpdateState).toBeCalledWith({ details: null });

    mockGetPokemon.mockRestore();
  });
});
