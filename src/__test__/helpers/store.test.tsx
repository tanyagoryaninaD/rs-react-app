import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { add, remove, removeAll, getLocalStorage } from '../../utils/store';
import { mockStore } from '../mocks/store';
import { bulbasaur } from '../mocks/data';
import { dispatchSpy } from '../mocks/mocks';
import { MockProvider } from '../mocks/MockProvider';

describe('store:', () => {
  beforeEach(() => {
    const handleAdd = () => mockStore.dispatch(add(bulbasaur));
    const handleRemove = () =>
      mockStore.dispatch(remove({ key: bulbasaur.name }));
    const handleRemoveAll = () => mockStore.dispatch(removeAll());
    const handleGetLS = () => mockStore.dispatch(getLocalStorage());

    render(
      MockProvider(
        <>
          <button data-testid="add" onClick={handleAdd} />
          <button data-testid="remove" onClick={handleRemove} />
          <button data-testid="removeAll" onClick={handleRemoveAll} />
          <button data-testid="getLocalStorage" onClick={handleGetLS} />
        </>
      )
    );
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  it('add: should added data to items', async () => {
    await userEvent.click(screen.getByTestId('add'));

    expect(mockStore.getState().selectedItems.items).toEqual({
      bulbasaur,
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
      .mockReturnValueOnce(JSON.stringify({ items: { bulbasaur }, size: 1 }));

    await userEvent.click(screen.getByTestId('getLocalStorage'));

    expect(mockStore.getState().selectedItems.items).toEqual({
      bulbasaur,
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
