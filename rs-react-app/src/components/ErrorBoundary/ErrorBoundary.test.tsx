import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('test error message');
  return <div>child content</div>;
}

// Controls its own throw state so children are freshly mounted after ErrorBoundary resets
function ThrowOnAction() {
  const [shouldThrow, setShouldThrow] = useState(false);
  if (shouldThrow) throw new Error('action error');
  return (
    <>
      <div>child content</div>
      <button onClick={() => setShouldThrow(true)}>trigger error</button>
    </>
  );
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('renders fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Oops, something went wrong')).toBeInTheDocument();
  });

  it('displays the error message in the fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('test error message')).toBeInTheDocument();
  });

  it('calls console.error when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(console.error).toHaveBeenCalled();
  });

  it('resets to showing children after clicking "Try again"', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <ThrowOnAction />
      </ErrorBoundary>
    );
    await user.click(screen.getByRole('button', { name: /trigger error/i }));
    expect(screen.getByText('Oops, something went wrong')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /try again/i }));

    // After reset, ThrowOnAction is remounted fresh with shouldThrow=false
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});
