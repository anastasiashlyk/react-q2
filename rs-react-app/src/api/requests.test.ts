import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPokemonList, getPokemonByName } from './requests';
import { mockFetchSuccess, mockFetchHttpError } from '../test-utils/fetchMock';

const MOCK_DETAIL = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: { front_default: 'https://example.com/bulbasaur.png' },
};

const MOCK_LIST_RESPONSE = {
  count: 1302,
  next: null,
  previous: null,
  results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
};

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

describe('getPokemonByName', () => {
  it('returns card data for a valid Pokemon name', async () => {
    mockFetchSuccess(MOCK_DETAIL);
    const result = await getPokemonByName('bulbasaur');
    expect(result.total).toBe(1);
    expect(result.items[0]).toEqual({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      image: 'https://example.com/bulbasaur.png',
    });
  });
});

describe('getPokemonList', () => {
  it('returns list of cards and total count', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(MOCK_LIST_RESPONSE),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(MOCK_DETAIL),
      } as Response);

    const result = await getPokemonList(20, 0);
    expect(result.total).toBe(1302);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('bulbasaur');
  });
});

describe('fetchJson error handling', () => {
  it('throws a 400 Bad Request error', async () => {
    mockFetchHttpError(400);
    await expect(getPokemonByName('test')).rejects.toThrow('Bad request');
  });

  it('throws a 404 Not Found error', async () => {
    mockFetchHttpError(404);
    await expect(getPokemonByName('test')).rejects.toThrow('Not found');
  });

  it('throws a 429 Too Many Requests error', async () => {
    mockFetchHttpError(429);
    await expect(getPokemonByName('test')).rejects.toThrow('Too many requests');
  });

  it('throws a 500 Server Error', async () => {
    mockFetchHttpError(500);
    await expect(getPokemonByName('test')).rejects.toThrow('Server error');
  });

  it('throws a 504 Gateway Timeout error', async () => {
    mockFetchHttpError(504);
    await expect(getPokemonByName('test')).rejects.toThrow(
      'temporarily unavailable'
    );
  });

  it('throws a generic error for unknown status codes', async () => {
    mockFetchHttpError(503, 'Service Unavailable');
    await expect(getPokemonByName('test')).rejects.toThrow(
      'Unexpected error: 503'
    );
  });
});
