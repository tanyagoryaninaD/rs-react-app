import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { add, remove, selectedItemsSlice } from '../../../utils/store';
import { Card } from '../../../components/SearchPanel/CardList/Card';

const mockPokemon = {
  name: 'pikachu',
  id: 1,
  abilities: [''],
  image: '',
  moves: [''],
};
const mockOnUpdateState = vi.fn();

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});

const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

describe('Card component', () => {
  it('clicks on the checkbox should update stateSelectedItems', async () => {
    render(
      <Provider store={mockStore}>
        <Card data={mockPokemon} onUpdateState={mockOnUpdateState} />
      </Provider>
    );

    await userEvent.click(screen.getByTestId('card-checkbox'));

    expect(mockOnUpdateState).not.toBeCalled();
    expect(dispatchSpy).toBeCalledWith(add(mockPokemon));

    await userEvent.click(screen.getByTestId('card-checkbox'));
    expect(dispatchSpy).toBeCalledWith(remove({ key: mockPokemon.name }));

    dispatchSpy.mockRestore();
  });
});
