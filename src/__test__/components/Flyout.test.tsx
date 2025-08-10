import { render, screen } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  type MockInstance,
  beforeEach,
  afterEach,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  selectedItemsSlice,
  removeAll,
} from '../../store/reducers/selectedItems';
import { Flyout } from '../../components/components/Flyout';
import * as helpers from '../../utils/helpers';
import type { MyPokemon } from '../../types/interfaces';

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});

const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

describe('Flyout component', () => {
  let parseToСsvUrlSpy: MockInstance<
    (data: { [key: string]: MyPokemon }) => string
  >;

  beforeEach(() => {
    parseToСsvUrlSpy = vi
      .spyOn(helpers, 'parseToСsvUrl')
      .mockImplementation(() => 'url');
  });
  afterEach(() => {
    dispatchSpy.mockRestore();
    parseToСsvUrlSpy.mockRestore();
  });

  it('clicks on the "Unselect all" should call removeAll()', async () => {
    render(
      <Provider store={mockStore}>
        <Flyout />
      </Provider>
    );

    await userEvent.click(screen.getByTestId('flyout-unselect'));

    expect(dispatchSpy).toBeCalledWith(removeAll());
  });

  it('anchor "Download" should call parseToСsvUrl() ans contains "download" attribute ', () => {
    render(
      <Provider store={mockStore}>
        <Flyout />
      </Provider>
    );

    const link = screen.getByTestId('flyout-download') as HTMLAnchorElement;

    expect(parseToСsvUrlSpy).toBeCalledWith({});
    expect(link).toHaveAttribute('href');
    expect(link.download).toMatch('.csv');
  });
});
