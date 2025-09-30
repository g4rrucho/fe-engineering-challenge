import React from 'react';

type TPokemonListPaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (newPage: number) => void;
};

const PokemonListPaginationControls: React.FC<
  TPokemonListPaginationControlsProps
> = ({ currentPage, onPageChange, totalPages, hasNext, hasPrevious }) => {
  return (
    <div className="flex justify-between gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};

export default PokemonListPaginationControls;
