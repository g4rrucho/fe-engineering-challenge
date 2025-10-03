import React from 'react';

import { Button } from '@/components/ui/button';
import { TFilterState } from '@/components/Pokedex/Filters';

type TPokedexFilterSortOrderProps = {
  sortOrder: TFilterState['sortOrder'];
  updateFilters: (newFilters: Partial<{ sortOrder: 'asc' | 'desc' }>) => void;
};

const PokedexFilterSortOrder: React.FC<TPokedexFilterSortOrderProps> = ({
  sortOrder,
  updateFilters,
}) => (
  <Button
    variant="outline"
    size="sm"
    onClick={() =>
      updateFilters({
        sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
      })
    }
    className="w-20"
  >
    {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
  </Button>
);

export default PokedexFilterSortOrder;
