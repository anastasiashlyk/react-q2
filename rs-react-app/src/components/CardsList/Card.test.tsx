import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';
import { MOCK_CARD } from '../../test-utils/mockData';

describe('Card', () => {
  it('renders the Pokemon name', () => {
    render(<Card info={MOCK_CARD} />);
    expect(screen.getByText(/Name: bulbasaur/i)).toBeInTheDocument();
  });

  it('renders height and weight', () => {
    render(<Card info={MOCK_CARD} />);
    expect(screen.getByText(/Height: 7/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 69/i)).toBeInTheDocument();
  });

  it('renders image when image URL is provided', () => {
    render(<Card info={MOCK_CARD} />);
    const img = screen.getByRole('img', { name: /bulbasaur/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', MOCK_CARD.image);
  });

  it('does not render image when image is empty string', () => {
    const cardNoImage = { ...MOCK_CARD, image: '' };
    render(<Card info={cardNoImage} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
