import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CardDetails } from '../../../components/SearchPanel/CardList/CardDetails';
import * as pokemonApi from '../../../server/Loader';

const mockResults = [
  {
    name: 'pikachu',
    id: 1,
    abilities: [''],
    image: '',
    moves: [''],
  },
];

const mockOnUpdateState = vi.fn();
const mockGetPokemon = vi
  .spyOn(pokemonApi, 'getPokemon')
  .mockResolvedValueOnce(mockResults);

describe('CardDetails component', () => {
  it('clicking on the "close" button should update the details status', async () => {
    render(
      <CardDetails details={'pikachu'} onUpdateState={mockOnUpdateState} />
    );

    const button = await screen.findByRole('button', { name: /Close/i });

    await userEvent.click(button);

    expect(mockGetPokemon).toBeCalledWith({ query: 'pikachu' });
    expect(mockOnUpdateState).toBeCalledWith({ details: null });

    mockGetPokemon.mockRestore();
  });
});
