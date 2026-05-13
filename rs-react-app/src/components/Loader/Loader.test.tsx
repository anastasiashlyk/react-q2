import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';

describe('Loader', () => {
  it('renders loader-wrapper container', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.loader-wrapper')).toBeInTheDocument();
  });

  it('renders loader element inside wrapper', () => {
    const { container } = render(<Loader />);
    expect(
      container.querySelector('.loader-wrapper .loader')
    ).toBeInTheDocument();
  });
});
