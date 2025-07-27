import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { CardDetails } from '../../../components/SearchPanel/CardList/CardDetails';

describe('CardDetails component', () => {
  it('close card when clicked on button "Close"', async () => {
    render(
      <MemoryRouter initialEntries={[`/pokemon/page/1/details/test`]}>
        <Routes>
          <Route
            path="/pokemon/page/:page/details/:details"
            element={<CardDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Close/i })
      ).toBeInTheDocument();
    });

    const button = screen.getByRole('button', { name: /Close/i });
    await userEvent.click(button);

    expect(window.location.pathname).toBe('/');
  });
});
