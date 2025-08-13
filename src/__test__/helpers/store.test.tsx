import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { mockStore } from '../mocks/store';
import { bulbasaur } from '../mocks/data';
import { dispatchSpy } from '../mocks/mocks';
import { MockProvider } from '../mocks/MockProvider';
import {
  add,
  remove,
  removeAll,
  setState,
  selectItems,
} from '../../store/reducers/selectedItems';

describe('store:', () => {
  beforeEach(() => {
    const handleAdd = () => mockStore.dispatch(add(bulbasaur));
    const handleRemove = () => mockStore.dispatch(remove(bulbasaur));
    const handleRemoveAll = () => mockStore.dispatch(removeAll());
    const handleSetLS = () => mockStore.dispatch(setState([bulbasaur]));

    render(
      MockProvider(
        <>
          <button data-testid="add" onClick={handleAdd} />
          <button data-testid="remove" onClick={handleRemove} />
          <button data-testid="removeAll" onClick={handleRemoveAll} />
          <button data-testid="set-state" onClick={handleSetLS} />
        </>
      )
    );
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  it('add: should added data to items', async () => {
    await userEvent.click(screen.getByTestId('add'));

    const items = mockStore.getState().selectedItems;
    expect(items).toEqual([bulbasaur]);
    expect(selectItems.unwrapped(items)).toEqual([bulbasaur]);
    expect(mockStore.getState().selectedItems.length).toBe(1);

    await userEvent.click(screen.getByTestId('add'));
    expect(mockStore.getState().selectedItems.length).toBe(1);
  });

  it('remove: should removed data to items', async () => {
    await userEvent.click(screen.getByTestId('remove'));

    expect(mockStore.getState().selectedItems.length).toBe(0);

    await userEvent.click(screen.getByTestId('remove'));
    expect(mockStore.getState().selectedItems.length).toBe(0);
  });

  it('removeAll: should removed data to items', async () => {
    await userEvent.click(screen.getByTestId('add'));
    await userEvent.click(screen.getByTestId('removeAll'));

    expect(mockStore.getState().selectedItems.length).toBe(0);
  });

  it('setState: should update data to items', async () => {
    await userEvent.click(screen.getByTestId('set-state'));

    expect(mockStore.getState().selectedItems).toEqual([bulbasaur]);
    expect(mockStore.getState().selectedItems.length).toBe(1);
  });
});
