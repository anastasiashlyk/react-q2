import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { getPokemonList, getPokemonByName } from './api/requests';
import {
  MOCK_LIST_RESPONSE,
  MOCK_SINGLE_RESPONSE,
} from './test-utils/mockData';

vi.mock('./api/requests');

const mockGetPokemonList = vi.mocked(getPokemonList);
const mockGetPokemonByName = vi.mocked(getPokemonByName);

describe('App', () => {
  beforeEach(() => {
    mockGetPokemonList.mockResolvedValue(MOCK_LIST_RESPONSE);
    mockGetPokemonByName.mockResolvedValue(MOCK_SINGLE_RESPONSE);
  });

  it('renders SearchBar, Pagination, and ErrorButton', async () => {
    render(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
    await screen.findByText(/Name: bulbasaur/i);
  });

  it('calls getPokemonList on mount when no localStorage term', async () => {
    render(<App />);
    await screen.findByText(/Name: bulbasaur/i);
    expect(mockGetPokemonList).toHaveBeenCalledWith(20, 0);
  });

  it('calls getPokemonByName on mount when localStorage has a search term', async () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    render(<App />);
    await screen.findByText(/Name: bulbasaur/i);
    expect(mockGetPokemonByName).toHaveBeenCalledWith('bulbasaur');
  });

  it('displays results after successful API call', async () => {
    render(<App />);
    expect(await screen.findByText(/Name: bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: charmander/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching', async () => {
    let resolve: (v: typeof MOCK_LIST_RESPONSE) => void;
    mockGetPokemonList.mockReturnValue(
      new Promise((res) => {
        resolve = res;
      })
    );
    const { container } = render(<App />);
    expect(container.querySelector('.loader-wrapper')).toBeInTheDocument();
    resolve!(MOCK_LIST_RESPONSE);
    await screen.findByText(/Name: bulbasaur/i);
  });

  it('displays error message when API call fails', async () => {
    mockGetPokemonList.mockRejectedValue(
      new Error('Server error. Please try again later.')
    );
    render(<App />);
    expect(
      await screen.findByText('Server error. Please try again later.')
    ).toBeInTheDocument();
  });

  it('searches by name when a new search term is submitted', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/Name: bulbasaur/i);

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'charmander');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(mockGetPokemonByName).toHaveBeenCalledWith('charmander');
    });
  });

  it('saves new search term to localStorage when searching', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/Name: bulbasaur/i);

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'mewtwo');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('mewtwo');
    });
  });

  it('does not re-fetch when the same search term is submitted', async () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/Name: bulbasaur/i);

    const callCountBefore = mockGetPokemonByName.mock.calls.length;
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(mockGetPokemonByName.mock.calls.length).toBe(callCountBefore);
    });
  });

  it('fetches next page when pagination next button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/Name: bulbasaur/i);

    // Button order: [Search, Prev(disabled on p1), Next, Throw Error]
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[2];
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockGetPokemonList).toHaveBeenCalledWith(20, 20);
    });
  });

  it('displays error when search API call fails', async () => {
    mockGetPokemonByName.mockRejectedValue(
      new Error('Not found. The Pokémon you searched for does not exist.')
    );
    localStorage.setItem('searchTerm', 'unknownmon');
    render(<App />);
    expect(
      await screen.findByText(
        'Not found. The Pokémon you searched for does not exist.'
      )
    ).toBeInTheDocument();
  });
});
