import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders author information', () => {
    render(<AboutPage />);
    expect(screen.getByText(/author/i)).toBeInTheDocument();
  });

  it('renders a link to the RS School course', () => {
    render(<AboutPage />);
    const link = screen.getByRole('link', { name: /rs school/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('renders a link to the author github', () => {
    render(<AboutPage />);
    const link = screen.getByRole('link', { name: /@anastasiashlyk/i });
    expect(link).toBeInTheDocument();
  });
});
