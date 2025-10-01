import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaginationControl from '@/components/PokemonList/PaginationControl';

describe('PaginationControl', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    totalCount: 200,
    hasNext: true,
    hasPrevious: false,
    onPageChange: vi.fn(),
  };

  it('renders results counter correctly', () => {
    render(<PaginationControl {...defaultProps} />);
    expect(screen.getByTestId('results-counter')).toHaveTextContent(
      'Showing 1-20 of 200'
    );
  });

  it('disables previous button on first page', () => {
    render(<PaginationControl {...defaultProps} />);
    const prevButton = screen.getByTestId('pagination-previous');
    expect(prevButton).toHaveClass('pointer-events-none opacity-50');
  });

  it('calls onPageChange when next button is clicked', async () => {
    const onPageChange = vi.fn();
    render(<PaginationControl {...defaultProps} onPageChange={onPageChange} />);

    const nextButton = screen.getByTestId('pagination-next');
    await userEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('shows current page as active', () => {
    render(<PaginationControl {...defaultProps} currentPage={3} />);
    const currentPageButton = screen.getByTestId('pagination-page-3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('calls onPageChange when page number is clicked', async () => {
    const onPageChange = vi.fn();
    render(<PaginationControl {...defaultProps} onPageChange={onPageChange} />);

    const pageButton = screen.getByTestId('pagination-page-2');
    await userEvent.click(pageButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('shows ellipsis for large page ranges', () => {
    render(
      <PaginationControl {...defaultProps} currentPage={5} totalPages={20} />
    );
    expect(screen.getAllByTestId('pagination-ellipsis').length).equal(2);
  });

  it('enables next button when hasNext is true', () => {
    render(<PaginationControl {...defaultProps} hasNext={true} />);
    const nextButton = screen.getByTestId('pagination-next');
    expect(nextButton).not.toHaveClass('pointer-events-none opacity-50');
    expect(nextButton).toHaveClass('cursor-pointer');
  });

  it('disables next button when hasNext is false', () => {
    render(<PaginationControl {...defaultProps} hasNext={false} />);
    const nextButton = screen.getByTestId('pagination-next');
    expect(nextButton).toHaveClass('pointer-events-none opacity-50');
  });
});
