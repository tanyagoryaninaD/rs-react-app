import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { add, remove } from '../../../utils/store';
import { Card } from '../../../components/SearchPanel/CardList/Card';
import { mockOnUpdateState, dispatchSpy } from '../../mocks/mockFunctions';
import { MockProvider } from '../../mocks/MockProvider';
import { bulbasaur } from '../../mocks/data';

describe('Card component', () => {
  it('clicks on the checkbox should update stateSelectedItems', async () => {
    render(
      MockProvider(<Card data={bulbasaur} onUpdateState={mockOnUpdateState} />)
    );

    await userEvent.click(screen.getByTestId('card-checkbox'));

    expect(mockOnUpdateState).not.toBeCalled();
    expect(dispatchSpy).toBeCalledWith(add(bulbasaur));

    await userEvent.click(screen.getByTestId('card-checkbox'));
    expect(dispatchSpy).toBeCalledWith(remove(bulbasaur));

    dispatchSpy.mockRestore();
  });
});
