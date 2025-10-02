import React, { useState } from 'react';

import {
  TFilterState,
  TPokedexFiltersProps,
} from '@/components/Pokedex/Filters/types';

import PokedexFilterType from '@/components/Pokedex/Filters/PokedexFilterType';
import PokedexFilterName from '@/components/Pokedex/Filters/PokedexFilterName';
import PokedexFilterHeight from '@/components/Pokedex/Filters/PokedexFilterHeight';
import PokedexFilterSortBy from '@/components/Pokedex/Filters/PokedexFilterSortBy';
import PokedexFilterSortOrder from '@/components/Pokedex/Filters/PokedexFilterSortOrder';

const PokedexFilters: React.FC<TPokedexFiltersProps> = ({
  onFiltersChange,
  availableTypes,
}) => {
  const [filters, setFilters] = useState<TFilterState>({
    search: '',
    type: 'all',
    minHeight: '',
    maxHeight: '',
    sortBy: 'timestamp',
    sortOrder: 'desc',
  });

  const updateFilters = (newFilters: Partial<TFilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        <PokedexFilterName
          search={filters.search}
          updateFilters={updateFilters}
        />

        <PokedexFilterType
          availableTypes={availableTypes}
          type={filters.type}
          updateFilters={updateFilters}
        />

        <PokedexFilterHeight
          filters={{
            maxHeight: filters.maxHeight,
            minHeight: filters.minHeight,
          }}
          updateFilters={updateFilters}
        />

        <PokedexFilterSortBy
          sortBy={filters.sortBy}
          updateFilters={updateFilters}
        />

        <PokedexFilterSortOrder
          sortOrder={filters.sortOrder}
          updateFilters={updateFilters}
        />
      </div>
    </div>
  );
};

export default PokedexFilters;
