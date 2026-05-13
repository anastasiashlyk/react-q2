import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders an input with the initial term as its value', () => {
    render(<SearchBar initialTerm="pikachu" onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('renders empty input when initialTerm is empty', () => {
    render(<SearchBar initialTerm="" onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('renders a Search button', () => {
    render(<SearchBar initialTerm="" onSearch={vi.fn()} />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value as user types', async () => {
    const user = userEvent.setup();
    render(<SearchBar initialTerm="" onSearch={vi.fn()} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'eevee');
    expect(input).toHaveValue('eevee');
  });

  it('calls onSearch with the typed value on form submit', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar initialTerm="" onSearch={onSearch} />);
    await user.type(screen.getByRole('textbox'), 'snorlax');
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('snorlax');
  });

  it('trims whitespace from input before calling onSearch', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar initialTerm="  pikachu  " onSearch={onSearch} />);
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });

  it('calls onSearch with empty string when input is cleared', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar initialTerm="pikachu" onSearch={onSearch} />);
    await user.clear(screen.getByRole('textbox'));
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('');
  });
});
