import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import CardsList from './CardsList';
import { MOCK_CARDS } from '../../test-utils/mockData';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('CardsList', () => {
  it('renders Loader when isLoading is true', () => {
    const { container } = render(
      <CardsList results={[]} isLoading={true} error={null} currentPage={1} />
    );
    expect(container.querySelector('.loader-wrapper')).toBeInTheDocument();
  });

  it('renders error message when error prop is set', () => {
    render(
      <CardsList results={[]} isLoading={false} error="Something went wrong" currentPage={1} />
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders "No matches" when results are empty and not loading', () => {
    render(<CardsList results={[]} isLoading={false} error={null} currentPage={1} />);
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });

  it('renders the correct number of card items', () => {
    renderWithRouter(<CardsList results={MOCK_CARDS} isLoading={false} error={null} currentPage={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(MOCK_CARDS.length);
  });

  it('renders each Pokemon name from results', () => {
    renderWithRouter(<CardsList results={MOCK_CARDS} isLoading={false} error={null} currentPage={1} />);
    expect(screen.getByText(/Name: bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: charmander/i)).toBeInTheDocument();
  });

  it('does not render list when loading, even if results are provided', () => {
    render(<CardsList results={MOCK_CARDS} isLoading={true} error={null} currentPage={1} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
