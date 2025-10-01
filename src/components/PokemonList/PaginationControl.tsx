import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type TPaginationControl = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
  limit?: number;
  onPageChange: (newPage: number) => void;
};

const PaginationControl: React.FC<TPaginationControl> = ({
  currentPage,
  onPageChange,
  totalPages,
  totalCount,
  hasNext,
  hasPrevious,
  limit = 20,
}) => {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount || 0);

  const getVisiblePages = () => {
    const pages = [];
    const delta = 2;

    if (currentPage > delta + 1) {
      pages.push(1);
      if (currentPage > delta + 2) pages.push('ellipsis-start');
    }

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    )
      pages.push(i);

    if (currentPage < totalPages - delta) {
      if (currentPage < totalPages - delta - 1) pages.push('ellipsis-end');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      {totalCount && (
        <p
          className="text-muted-foreground text-sm"
          data-testid="results-counter"
        >
          Showing {startItem.toLocaleString()}-{endItem.toLocaleString()} of{' '}
          {totalCount.toLocaleString()}
        </p>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => hasPrevious && onPageChange(currentPage - 1)}
              className={
                !hasPrevious
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
              data-testid="pagination-previous"
            />
          </PaginationItem>

          {getVisiblePages().map((page, index) => (
            <PaginationItem key={index}>
              {typeof page === 'string' ? (
                <PaginationEllipsis data-testid="pagination-ellipsis" />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                  data-testid={`pagination-page-${page}`}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => hasNext && onPageChange(currentPage + 1)}
              className={
                !hasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }
              data-testid="pagination-next"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControl;
