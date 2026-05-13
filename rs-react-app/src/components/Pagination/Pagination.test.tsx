import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders the current page and total pages', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('disables the previous button on page 1', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[1]).toBeDisabled();
  });

  it('enables both buttons on a middle page', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });

  it('calls onPageChange with page - 1 when previous is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with page + 1 when next is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('does not call onPageChange when previous is clicked on page 1', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when next is clicked on the last page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={5} totalPages={5} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
