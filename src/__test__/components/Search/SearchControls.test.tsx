import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchControls } from '../../../components/SearchPanel/Search/SearchControls';
import userEvent from '@testing-library/user-event';

const mockOnSearch = vi.fn();
const mockOnChange = vi.fn();

describe('SearchControls component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with form elements', () => {
    render(
      <SearchControls
        query={''}
        isLoading={false}
        onSearch={mockOnSearch}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /Search/,
      })
    ).toBeInTheDocument();
  });

  it('during loading the button text content should be changed', () => {
    render(
      <SearchControls
        query={''}
        isLoading={true}
        onSearch={mockOnSearch}
        onChange={mockOnChange}
      />
    );

    expect(
      screen.getByRole('button', {
        name: /Searching.../,
      })
    ).toBeInTheDocument();
  });

  it('renders input with last query', () => {
    render(
      <SearchControls
        query={'test'}
        isLoading={false}
        onSearch={mockOnSearch}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('clicks on button should call onSearch', async () => {
    render(
      <SearchControls
        query={''}
        isLoading={false}
        onSearch={mockOnSearch}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByRole('button', {
      name: /Search/,
    });

    await userEvent.click(button);

    expect(mockOnSearch).toBeCalled();
  });

  it('change input value should call onChange', async () => {
    render(
      <SearchControls
        query={''}
        isLoading={false}
        onSearch={mockOnSearch}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'query');

    expect(mockOnChange).toHaveBeenCalledTimes(5);
    expect(mockOnChange).toHaveBeenLastCalledWith('y');
  });
});
