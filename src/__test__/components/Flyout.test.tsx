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
import { Flyout } from '../../components/components/Flyout';
import * as helpers from '../../utils/helpers';
import type { MyPokemon } from '../../types/pokemon-components';
import { dispatchSpy } from '../mocks/mocks';
import { MockProvider } from '../mocks/MockProvider';
import { removeAll } from '../../store/reducers/selectedItems';

describe('Flyout component', () => {
  let parseToСsvUrlSpy: MockInstance<(data: MyPokemon[]) => string>;

  beforeEach(() => {
    parseToСsvUrlSpy = vi
      .spyOn(helpers, 'parseToСsvUrl')
      .mockImplementation(() => 'url');

    render(MockProvider(<Flyout />));
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
    parseToСsvUrlSpy.mockRestore();
  });

  it('clicks on the "Unselect all" should call removeAll()', async () => {
    await userEvent.click(screen.getByTestId('flyout-unselect'));

    expect(dispatchSpy).toBeCalledWith(removeAll());
  });

  it('anchor "Download" should call parseToСsvUrl() ans contains "download" attribute ', () => {
    const link = screen.getByTestId('flyout-download') as HTMLAnchorElement;

    expect(parseToСsvUrlSpy).toBeCalledWith([]);
    expect(link).toHaveAttribute('href');
    expect(link.download).toMatch('.csv');
  });
});
