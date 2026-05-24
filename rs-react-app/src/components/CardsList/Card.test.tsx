import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import Card from './Card';
import { MOCK_CARD } from '../../test-utils/mockData';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import selectedItemsReducer from '../../store/selectedItemsSlice';

function LocationDisplay() {
  const loc = useLocation();
  return <div data-testid="location">{loc.pathname + loc.search}</div>;
}

describe('Card', () => {
  it('renders the Pokemon name', () => {
    renderWithProviders(<Card info={MOCK_CARD} currentPage={1} />);
    expect(screen.getByText(/Name: bulbasaur/i)).toBeInTheDocument();
  });

  it('renders height and weight', () => {
    renderWithProviders(<Card info={MOCK_CARD} currentPage={1} />);
    expect(screen.getByText(/Height: 7/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 69/i)).toBeInTheDocument();
  });

  it('renders image when image URL is provided', () => {
    renderWithProviders(<Card info={MOCK_CARD} currentPage={1} />);
    const img = screen.getByRole('img', { name: /bulbasaur/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', MOCK_CARD.image);
  });

  it('does not render image when image is empty string', () => {
    const cardNoImage = { ...MOCK_CARD, image: '' };
    renderWithProviders(<Card info={cardNoImage} currentPage={1} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('navigates to the details page with name and page on click', async () => {
    const store = configureStore({
      reducer: { selectedItems: selectedItemsReducer },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Card info={MOCK_CARD} currentPage={2} />
          <LocationDisplay />
        </MemoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByText(/Name: bulbasaur/i));
    expect(screen.getByTestId('location').textContent).toBe(
      '/details/bulbasaur?page=2'
    );
  });
});
