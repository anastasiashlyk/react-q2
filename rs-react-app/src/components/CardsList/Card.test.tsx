import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Card from './Card';
import { MOCK_CARD } from '../../test-utils/mockData';

function LocationDisplay() {
  const loc = useLocation();
  return <div data-testid="location">{loc.pathname + loc.search}</div>;
}

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Card', () => {
  it('renders the Pokemon name', () => {
    renderWithRouter(<Card info={MOCK_CARD} currentPage={1} />);
    expect(screen.getByText(/Name: bulbasaur/i)).toBeInTheDocument();
  });

  it('renders height and weight', () => {
    renderWithRouter(<Card info={MOCK_CARD} currentPage={1} />);
    expect(screen.getByText(/Height: 7/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 69/i)).toBeInTheDocument();
  });

  it('renders image when image URL is provided', () => {
    renderWithRouter(<Card info={MOCK_CARD} currentPage={1} />);
    const img = screen.getByRole('img', { name: /bulbasaur/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', MOCK_CARD.image);
  });

  it('does not render image when image is empty string', () => {
    const cardNoImage = { ...MOCK_CARD, image: '' };
    renderWithRouter(<Card info={cardNoImage} currentPage={1} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('navigates to the details page with name and page on click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Card info={MOCK_CARD} currentPage={2} />
        <LocationDisplay />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByText(/Name: bulbasaur/i));
    expect(screen.getByTestId('location').textContent).toBe(
      '/details/bulbasaur?page=2'
    );
  });
});
