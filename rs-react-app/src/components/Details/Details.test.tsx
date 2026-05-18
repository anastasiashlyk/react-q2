import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Details from './Details';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { MOCK_SINGLE_RESPONSE } from '../../test-utils/mockData';

vi.mock('../../api/requests');

import { getPokemonByName } from '../../api/requests';

function renderDetails(name: string) {
  return render(
    <MemoryRouter initialEntries={[`/details/${name}`]}>
      <ErrorBoundary>
        <Routes>
          <Route path="/details/:name" element={<Details />} />
        </Routes>
      </ErrorBoundary>
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Details', () => {
  it('shows loader while fetching', () => {
    vi.mocked(getPokemonByName).mockResolvedValue(MOCK_SINGLE_RESPONSE);
    renderDetails('bulbasaur');
    expect(document.querySelector('.loader-wrapper')).toBeInTheDocument();
  });

  it('renders pokemon data after fetch', async () => {
    vi.mocked(getPokemonByName).mockResolvedValue(MOCK_SINGLE_RESPONSE);
    renderDetails('bulbasaur');

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('69')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /bulbasaur/i })).toBeInTheDocument();
  });

  it('renders a close button after fetch', async () => {
    vi.mocked(getPokemonByName).mockResolvedValue(MOCK_SINGLE_RESPONSE);
    renderDetails('bulbasaur');

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('shows error boundary when fetch fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(getPokemonByName).mockRejectedValue(new Error('Not found'));
    renderDetails('unknown');

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
