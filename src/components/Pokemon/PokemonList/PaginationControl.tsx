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
  isVisible: boolean;
  onPageChange: (newPage: number) => void;
};

const PaginationControl: React.FC<TPaginationControl> = ({
  currentPage,
  onPageChange,
  totalPages,
  totalCount,
  hasNext,
  isVisible,
  hasPrevious,
  limit = 20,
}) => {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount || 0);

  const getVisiblePages = () => {
    const pages = [];

    pages.push(1);

    let middleStart = Math.max(2, currentPage - 1);
    let middleEnd = Math.min(totalPages - 1, currentPage + 1);

    if (middleEnd - middleStart < 2) {
      if (middleStart === 2) {
        middleEnd = Math.min(totalPages - 1, middleStart + 2);
      } else {
        middleStart = Math.max(2, middleEnd - 2);
      }
    }

    for (let i = middleStart; i <= middleEnd; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (!isVisible) return null;

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
