import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  selectedItemsSlice,
  add,
  remove,
  removeAll,
  getLocalStorage,
} from '../../store/reducers/selectedItems';

const mockPokemon = {
  name: 'pikachu',
  id: 1,
  abilities: [''],
  image: '',
  moves: [''],
};

describe('store:', () => {
  const mockStore = configureStore({
    reducer: {
      selectedItems: selectedItemsSlice.reducer,
    },
  });

  const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

  beforeEach(() => {
    const handleAdd = () => mockStore.dispatch(add(mockPokemon));
    const handleRemove = () =>
      mockStore.dispatch(remove({ key: mockPokemon.name }));
    const handleRemoveAll = () => mockStore.dispatch(removeAll());
    const handleGetLS = () => mockStore.dispatch(getLocalStorage());

    render(
      <Provider store={mockStore}>
        <button data-testid="add" onClick={handleAdd} />
        <button data-testid="remove" onClick={handleRemove} />
        <button data-testid="removeAll" onClick={handleRemoveAll} />
        <button data-testid="getLocalStorage" onClick={handleGetLS} />
      </Provider>
    );
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  it('add: should added data to items', async () => {
    await userEvent.click(screen.getByTestId('add'));

    expect(mockStore.getState().selectedItems.items).toEqual({
      pikachu: mockPokemon,
    });
    expect(mockStore.getState().selectedItems.size).toBe(1);
  });

  it('remove: should removed data to items', async () => {
    await userEvent.click(screen.getByTestId('remove'));

    expect(mockStore.getState().selectedItems.items).toEqual({});
    expect(mockStore.getState().selectedItems.size).toBe(0);
  });

  it('removeAll: should removed data to items', async () => {
    await userEvent.click(screen.getByTestId('add'));
    await userEvent.click(screen.getByTestId('removeAll'));

    expect(mockStore.getState().selectedItems.items).toEqual({});
    expect(mockStore.getState().selectedItems.size).toBe(0);
  });

  it('getLocalStorage: should get data from LocalStorage and added data to items', async () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(
        JSON.stringify({ items: { pikachu: mockPokemon }, size: 1 })
      );

    await userEvent.click(screen.getByTestId('getLocalStorage'));

    expect(mockStore.getState().selectedItems.items).toEqual({
      pikachu: mockPokemon,
    });
    expect(mockStore.getState().selectedItems.size).toBe(1);

    getItemSpy.mockRestore();
  });

  it('getLocalStorage: should get data from LocalStorage with error and reset data to items', async () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockRejectedValueOnce(() => {
        throw new Error('test');
      });
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await userEvent.click(screen.getByTestId('getLocalStorage'));

    expect(mockStore.getState().selectedItems.items).toEqual({});
    expect(mockStore.getState().selectedItems.size).toBe(0);
    expect(consoleError).toHaveBeenCalled();

    getItemSpy.mockRestore();
    consoleError.mockRestore();
  });
});
