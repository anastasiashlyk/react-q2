import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import usePokemon from './usePokemon';
import {
  MOCK_LIST_RESPONSE,
  MOCK_SINGLE_RESPONSE,
} from '../test-utils/mockData';

vi.mock('../api/requests');

import { getPokemonList, getPokemonByName } from '../api/requests';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('usePokemon', () => {
  it('fetches a list when searchTerm is empty', async () => {
    vi.mocked(getPokemonList).mockResolvedValue(MOCK_LIST_RESPONSE);
    const { result } = renderHook(() => usePokemon('', 1));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.results).toHaveLength(2);
    expect(result.current.total).toBe(1302);
    expect(result.current.error).toBeNull();
  });

  it('fetches a single pokemon when searchTerm is provided', async () => {
    vi.mocked(getPokemonByName).mockResolvedValue(MOCK_SINGLE_RESPONSE);
    const { result } = renderHook(() => usePokemon('bulbasaur', 1));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('bulbasaur');
  });

  it('sets isLoading to true while fetching', () => {
    vi.mocked(getPokemonList).mockResolvedValue(MOCK_LIST_RESPONSE);
    const { result } = renderHook(() => usePokemon('', 1));
    expect(result.current.isLoading).toBe(true);
  });

  it('sets error on fetch failure', async () => {
    vi.mocked(getPokemonByName).mockRejectedValue(new Error('Not found'));
    const { result } = renderHook(() => usePokemon('unknown', 1));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Not found');
    expect(result.current.results).toHaveLength(0);
  });
});
